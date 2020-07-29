import { Validation } from "@/presentation/protocols";
import {
  ValidationComposite,
  RequiredFieldValidation,
} from "@/validation/validators";

export const makeAuthenticationControllerValidation = (): Validation => {
  return new ValidationComposite([
    new RequiredFieldValidation("email"),
    new RequiredFieldValidation("password"),
  ]);
};
