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
});
