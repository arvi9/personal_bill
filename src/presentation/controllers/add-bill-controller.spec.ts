import { AddBillController } from "./add-bill-controller";
import { HttpRequest } from "@/presentation/protocols";
import { mockBill } from "@/domain/tests";
import { ValidationSpy } from "@/presentation/test";

const makeFakeRequest = (): HttpRequest => ({
  body: {
    ...mockBill(),
  },
});

describe("AddBillController", () => {
  it("should calls validation with correct input", async () => {
    const validationSpy = new ValidationSpy();
    const sut = new AddBillController(validationSpy);
    const fakeRequest = makeFakeRequest();
    await sut.handle(fakeRequest);
    expect(validationSpy.input).toEqual(fakeRequest.body);
  });
});
