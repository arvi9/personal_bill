import { DbAddBill } from "./db-add-bill";
import { mockBill } from "@/domain/tests";
import { AddBillRepositorySpy } from "@/data/tests";

describe("DbAddBill", () => {
  it("should calls AddBillRepository with correct values", async () => {
    const addBillRepositorySpy = new AddBillRepositorySpy();
    const sut = new DbAddBill(addBillRepositorySpy);
    const bill = mockBill();
    await sut.add(bill);
    expect(addBillRepositorySpy.params).toEqual(bill);
  });
});
