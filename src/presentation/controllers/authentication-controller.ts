import { Authenticate } from "@/domain/usecases";
import {
  HttpRequest,
  HttpResponse,
  badRequest,
} from "@/presentation/protocols/http";

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
    await this.authenticate.auth({ email, password });
  }
}
