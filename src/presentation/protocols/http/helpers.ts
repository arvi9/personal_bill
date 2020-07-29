import { HttpResponse } from "./http-response";
import { HttpStatusCode } from "./http-status-code";

export const badRequest = (error: Error): HttpResponse => ({
  statusCode: HttpStatusCode.badRequest,
  body: {
    message: error.message,
  },
});

export const unauthorized = (error: Error): HttpResponse => ({
  statusCode: HttpStatusCode.unauthorized,
  body: {
    message: error.message,
  },
});

export const serverError = (error: Error): HttpResponse => ({
  statusCode: HttpStatusCode.serverError,
  body: {
    message: error.message,
  },
});

export const success = (body: any): HttpResponse => ({
  statusCode: HttpStatusCode.ok,
  body,
});
