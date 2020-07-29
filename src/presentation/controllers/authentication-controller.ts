import { Authenticate } from "@/domain/usecases";
import { Validation } from "@/presentation/protocols";
import {
  HttpRequest,
  HttpResponse,
  badRequest,
  unauthorized,
  serverError,
  success,
} from "@/presentation/protocols/http";
import { UnauthorizedError, ServerError } from "@/domain/errors";

export class AuthenticationController {
  constructor(
    private readonly authenticate: Authenticate,
    private readonly validation: Validation
  ) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      this.validation.validate(httpRequest.body);
      if (!httpRequest.body.password) {
        return badRequest({
          message: "Password is required",
        });
      }

      if (!httpRequest.body.email) {
        return badRequest({
          message: "Email is required",
        });
      }

      const { email, password } = httpRequest.body;
      const authorized = await this.authenticate.auth({ email, password });

      if (!authorized) {
        return unauthorized(new UnauthorizedError());
      }

      return success(authorized);
    } catch (error) {
      return serverError(new ServerError());
    }
  }
}