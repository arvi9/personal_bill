import {
  Controller,
  HttpRequest,
  HttpResponse,
  Validation,
  badRequest,
} from "@/presentation/protocols";
import { SignUp } from "@/domain/usecases";

export class SignUpController implements Controller {
  constructor(
    private readonly validation: Validation,
    private readonly signUp: SignUp
  ) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    const validationError = this.validation.validate(httpRequest.body);
    if (validationError) {
      return badRequest(validationError);
    }

    const { email, name, password } = httpRequest.body;
    await this.signUp.signup({
      email,
      name,
      password,
    });
    return null;
  }
}
