import { HttpRequest, HttpResponse, badRequest } from "../protocols/http";

export class AuthenticationController {
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
  }
}
