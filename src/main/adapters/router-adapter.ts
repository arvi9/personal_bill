import { Request, Response } from "express";
import { Controller } from "@/presentation/protocols";

export const adaptRouter = async (
  request: Request,
  response: Response,
  controller: Controller
): Promise<Response> => {
  const httpRequest = {
    body: request.body,
  };
  const { statusCode, body } = await controller.handle(httpRequest);
  return response.status(statusCode).json(body);
};
