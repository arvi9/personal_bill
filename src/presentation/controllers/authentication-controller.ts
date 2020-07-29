import { Authenticate } from "@/domain/usecases";
import {
  HttpRequest,
  HttpResponse,
  badRequest,
  unauthorized,
} from "@/presentation/protocols/http";
import { UnauthorizedError } from "@/domain/errors";

export class AuthenticationController {
  constructor(private readonly authenticate: Authenticate) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
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
  }
}
