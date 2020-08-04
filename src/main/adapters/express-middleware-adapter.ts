import { Request, Response, NextFunction } from "express";
import {
  Middleware,
  HttpRequest,
  HttpStatusCode,
} from "@/presentation/protocols";

export const adaptMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
  middleware: Middleware
) => {
  const httpRequest: HttpRequest = {
    headers: req.headers,
  };
  const httpResponse = await middleware.handle(httpRequest);
  if (httpResponse.statusCode === HttpStatusCode.ok) {
    Object.assign(req, httpResponse.body);
    next();
  } else {
    res.status(httpResponse.statusCode).json(httpResponse.body);
  }
};
