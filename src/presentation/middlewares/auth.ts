import {
  Middleware,
  HttpRequest,
  HttpResponse,
  forbidden,
} from "@/presentation/protocols";
import { AccessDeniedError } from "../errors";

export class AuthMiddleware implements Middleware {
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    return forbidden(new AccessDeniedError());
  }
}
