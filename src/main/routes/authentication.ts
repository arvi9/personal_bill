import { Router, Request, Response } from "express";
import { makeAuthenticationController } from "@/main/factories/controllers/authentication-controller/make-authentication-controller";
import { adaptRouter } from "@/main/adapters";

const authenticationRouter = Router();

authenticationRouter.post("/login", async (req: Request, res: Response) => {
  return adaptRouter(req, res, makeAuthenticationController());
});

export { authenticationRouter };
