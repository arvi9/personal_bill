import { HttpResponse } from "./http-response";
import { HttpStatusCode } from "./http-status-code";

export const badRequest = (body?: any): HttpResponse => ({
  statusCode: HttpStatusCode.badRequest,
  body,
});
