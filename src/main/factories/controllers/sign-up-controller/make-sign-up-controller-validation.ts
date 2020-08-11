import {
  ValidationComposite,
  RequiredFieldValidation,
  EmailValidation,
  CompareFieldsValidation,
} from "@/validation/validators";
import { Validation } from "@/presentation/protocols";

export const makeSignUpControllerValidation = (): Validation => {
  return new ValidationComposite([
    new RequiredFieldValidation("name"),
    new RequiredFieldValidation("email"),
    new EmailValidation("email"),
    new RequiredFieldValidation("password"),
    new RequiredFieldValidation("passwordConfirmation"),
    new CompareFieldsValidation("password", "passwordConfirmation"),
  ]);
};
