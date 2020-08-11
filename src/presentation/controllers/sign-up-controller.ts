import {
  Controller,
  HttpRequest,
  HttpResponse,
  Validation,
  badRequest,
  serverError,
  created,
} from "@/presentation/protocols";
import { SignUp } from "@/domain/usecases";
import { EmailAlreadyInUseError } from "@/domain/errors";

export class SignUpController implements Controller {
  constructor(
    private readonly validation: Validation,
    private readonly signUp: SignUp
  ) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const validationError = this.validation.validate(httpRequest.body);
      if (validationError) {
        return badRequest(validationError);
      }

      const { email, name, password } = httpRequest.body;
      const account = await this.signUp.signup({
        email,
        name,
        password,
      });

      if (!account) {
        const error = new EmailAlreadyInUseError();
        return badRequest(error);
      }

      return created(account);
    } catch (error) {
      return serverError(error);
    }
  }
}
