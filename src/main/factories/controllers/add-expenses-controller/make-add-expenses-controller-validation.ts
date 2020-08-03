import {
  ValidationComposite,
  RequiredFieldValidation,
} from "@/validation/validators";
import { Validation } from "@/presentation/protocols";

export const makeAddExpensesControllerValidation = (): Validation => {
  return new ValidationComposite([
    new RequiredFieldValidation("value"),
    new RequiredFieldValidation("date"),
    new RequiredFieldValidation("description"),
    new RequiredFieldValidation("account"),
  ]);
};
