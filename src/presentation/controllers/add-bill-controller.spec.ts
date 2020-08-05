import { AddBillController } from "./add-bill-controller";
import { HttpRequest, badRequest, serverError } from "@/presentation/protocols";
import { mockBill } from "@/domain/tests";
import { ValidationSpy } from "@/presentation/test";
import { RequiredFieldError } from "../errors";

type SutTypes = {
  sut: AddBillController;
  validationSpy: ValidationSpy;
};

const makeSut = (): SutTypes => {
  const validationSpy = new ValidationSpy();
  const sut = new AddBillController(validationSpy);
  return {
    sut,
    validationSpy,
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
});
