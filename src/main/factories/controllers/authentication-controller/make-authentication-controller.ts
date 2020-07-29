import { AuthenticationController } from "@/presentation/controllers";
import { makeAuthenticate } from "@/main/factories/usecases/";
import { makeAuthenticationControllerValidation } from "./make-authentication-controller-validation";

export const makeAuthenticationController = (): AuthenticationController => {
  return new AuthenticationController(
    makeAuthenticate(),
    makeAuthenticationControllerValidation()
  );
};
