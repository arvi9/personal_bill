import { LoadAccountByToken } from "@/domain/usecases";
import {
  Middleware,
  HttpRequest,
  HttpResponse,
  forbidden,
  success,
  serverError,
} from "@/presentation/protocols";
import { AccessDeniedError } from "@/presentation/errors";

export class AuthMiddleware implements Middleware {
  constructor(private readonly loadAccountByToken: LoadAccountByToken) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const accessToken = httpRequest.headers?.["x-access-token"];
      if (accessToken) {
        const account = await this.loadAccountByToken.load(
          httpRequest.headers["x-access-token"]
        );

        if (account) {
          return success({
            accountId: account.id,
          });
        }
      }
      return forbidden(new AccessDeniedError());
    } catch (error) {
      return serverError(error);
    }
  }
}
