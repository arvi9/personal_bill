import { LoadAccountByToken } from "@/domain/usecases";
import {
  Middleware,
  HttpRequest,
  HttpResponse,
  forbidden,
} from "@/presentation/protocols";
import { AccessDeniedError } from "../errors";

export class AuthMiddleware implements Middleware {
  constructor(private readonly loadAccountByToken: LoadAccountByToken) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    const accessToken = httpRequest.headers?.["x-access-token"];
    if (accessToken) {
      await this.loadAccountByToken.load(httpRequest.headers["x-access-token"]);
    }
    return forbidden(new AccessDeniedError());
  }
}
