import { DbAddBill } from "./db-add-bill";
import { mockBill } from "@/domain/tests";
import { AddBillRepositorySpy } from "@/data/tests";

type SutTypes = {
  sut: DbAddBill;
  addBillRepositorySpy: AddBillRepositorySpy;
};

const makeSut = (): SutTypes => {
  const addBillRepositorySpy = new AddBillRepositorySpy();
  const sut = new DbAddBill(addBillRepositorySpy);
  return {
    sut,
    addBillRepositorySpy,
  };
};

describe("DbAddBill", () => {
  it("should calls AddBillRepository with correct values", async () => {
    const { sut, addBillRepositorySpy } = makeSut();
    const bill = mockBill();
    await sut.add(bill);
    expect(addBillRepositorySpy.params).toEqual(bill);
  });
  it("should returns null if AddBillRepository returns null", async () => {
    const { sut, addBillRepositorySpy } = makeSut();
    addBillRepositorySpy.bill = null;
    const result = await sut.add(mockBill());
    expect(result).toBeNull();
  });
  it("should throws if AddBillRepository throws", () => {
    const { sut, addBillRepositorySpy } = makeSut();
    jest.spyOn(addBillRepositorySpy, "add").mockRejectedValueOnce(new Error());
    const result = sut.add(mockBill());
    expect(result).rejects.toThrow(new Error());
  });
  it("should returns the created Bill on success", async () => {
    const { sut, addBillRepositorySpy } = makeSut();
    const result = await sut.add(mockBill());
    expect(result).toEqual(addBillRepositorySpy.bill);
  });
});
