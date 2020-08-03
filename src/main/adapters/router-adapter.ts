import { Request } from "express";
import { Controller } from "@/presentation/protocols";
import { HttpResponse } from "@/presentation/protocols/http";

export const adaptRouter = async (
  request: Request,
  controller: Controller
): Promise<HttpResponse> => {
  const httpRequest = {
    body: request.body,
  };
  return controller.handle(httpRequest);
};
