import { AddBillController } from "./add-bill-controller";
import { HttpRequest } from "@/presentation/protocols";
import { mockBill } from "@/domain/tests";
import { ValidationSpy } from "@/presentation/test";

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
});
