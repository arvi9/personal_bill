import { HttpStatusCode } from "./http-status-code";

export type HttpResponse = {
  statusCode: HttpStatusCode;
  body?: any;
};
