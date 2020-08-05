import {
  ValidationComposite,
  RequiredFieldValidation,
} from "@/validation/validators";
import { Validation } from "@/presentation/protocols";

export const makeAddBillControllerValidation = (): Validation => {
  return new ValidationComposite([
    new RequiredFieldValidation("value"),
    new RequiredFieldValidation("dueDate"),
    new RequiredFieldValidation("expirationDate"),
    new RequiredFieldValidation("description"),
    new RequiredFieldValidation("account"),
  ]);
};
