import { AddBillController } from "./add-bill-controller";
import { HttpRequest, badRequest, serverError } from "@/presentation/protocols";
import { mockBill } from "@/domain/tests";
import { ValidationSpy, AddBillSpy } from "@/presentation/test";
import { RequiredFieldError } from "../errors";

type SutTypes = {
  sut: AddBillController;
  validationSpy: ValidationSpy;
  addBillSpy: AddBillSpy;
};

const makeSut = (): SutTypes => {
  const addBillSpy = new AddBillSpy();
  const validationSpy = new ValidationSpy();
  const sut = new AddBillController(validationSpy, addBillSpy);
  return {
    sut,
    validationSpy,
    addBillSpy,
  };
};

const makeFakeRequest = (): HttpRequest => ({
  body: {
    ...mockBill(),
  },
});

describe("AddBillController", () => {
  it("should calls validation with correct input", async () => {
    const { sut, validationSpy } = makeSut();
    const fakeRequest = makeFakeRequest();
    await sut.handle(fakeRequest);
    expect(validationSpy.input).toEqual(fakeRequest.body);
  });
  it("should returns 400 if validation fails", async () => {
    const { sut, validationSpy } = makeSut();
    validationSpy.validationError = new RequiredFieldError("Validation Error");
    const response = await sut.handle(makeFakeRequest());
    expect(response).toEqual(badRequest(validationSpy.validationError));
  });
  it("should returns 500 if validation throws", async () => {
    const { sut, validationSpy } = makeSut();
    const error = new Error("Internal Server Error");
    jest.spyOn(validationSpy, "validate").mockImplementationOnce(() => {
      throw error;
    });
    const response = await sut.handle(makeFakeRequest());
    expect(response).toEqual(serverError(error));
  });
  it("should calls AddBill with correct values", async () => {
    const { sut, addBillSpy } = makeSut();
    const fakeRequest = makeFakeRequest();
    await sut.handle(fakeRequest);
    expect(addBillSpy.params).toEqual(fakeRequest.body);
  });
  it("should returns 500 if AddBill returns null", async () => {
    const { sut, addBillSpy } = makeSut();
    addBillSpy.bill = null;
    const error = new Error("Internal Server Error");
    const response = await sut.handle(makeFakeRequest());
    expect(response).toEqual(serverError(error));
  });
});
