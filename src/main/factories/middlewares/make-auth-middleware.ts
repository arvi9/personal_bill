import { Middleware } from "@/presentation/protocols";
import { AuthMiddleware } from "@/presentation/middlewares/auth";
import { makeDbLoadAccountByToken } from "../usecases";

export const makeAuthMiddleware = (): Middleware => {
  return new AuthMiddleware(makeDbLoadAccountByToken());
};
