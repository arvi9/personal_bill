import { DbAddBill } from "./db-add-bill";
import { mockBill } from "@/domain/tests";
import { AddBillRepositorySpy } from "@/data/tests";
import { ExpenseListener } from "@/data/protocols";

type SutTypes = {
  sut: DbAddBill;
  addBillRepositorySpy: AddBillRepositorySpy;
  expenseListenerMocks: ExpenseListenerMock[];
};

const makeSut = (): SutTypes => {
  const addBillRepositorySpy = new AddBillRepositorySpy();
  const expenseListenerMocks = [
    new ExpenseListenerMock(),
    new ExpenseListenerMock(),
  ];
  const sut = new DbAddBill(addBillRepositorySpy, expenseListenerMocks);
  return {
    sut,
    addBillRepositorySpy,
    expenseListenerMocks,
  };
};

class ExpenseListenerMock implements ExpenseListener {
  params: any;
  async update(params: ExpenseListener.Params): Promise<void> {
    this.params = params;
  }
}

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
  it("should calls notifyListeners with correct data", async () => {
    const { sut, addBillRepositorySpy, expenseListenerMocks } = makeSut();
    const data = {
      account: {
        id: addBillRepositorySpy.bill.account.id,
      },
      date: addBillRepositorySpy.bill.firstPaymentDate,
      value: addBillRepositorySpy.bill.value,
      amount: addBillRepositorySpy.bill.amount,
    };
    await sut.add(mockBill());
    expect(expenseListenerMocks[0].params).toEqual(data);
    expect(expenseListenerMocks[1].params).toEqual(data);
  });
});
