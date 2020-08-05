import { AddBillController } from "@/presentation/controllers";
import { makeAddBillControllerValidation } from "./make-add-bill-controller-validation";
import { makeAddBill } from "@/main/factories/usecases";

export const makeAddBillController = (): AddBillController => {
  return new AddBillController(
    makeAddBillControllerValidation(),
    makeAddBill()
  );
};
