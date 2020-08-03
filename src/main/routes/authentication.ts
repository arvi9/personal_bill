import { Router, Request, Response } from "express";
import { makeAuthenticationController } from "@/main/factories/controllers/authentication-controller/make-authentication-controller";
import { adaptRouter } from "@/main/adapters";

const authenticationRouter = Router();

const authenticationController = makeAuthenticationController();
authenticationRouter.post("/login", async (req: Request, res: Response) => {
  const { statusCode, body } = await adaptRouter(req, authenticationController);
  return res.status(statusCode).json(body);
});

export { authenticationRouter };
