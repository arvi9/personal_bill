import { SignUpController } from "@/presentation/controllers";
import { makeSignUpControllerValidation } from "./make-sign-up-controller-validation";
import { makeSignUp } from "@/main/factories/usecases";

export const makeSignUpController = (): SignUpController => {
  return new SignUpController(makeSignUpControllerValidation(), makeSignUp());
};
