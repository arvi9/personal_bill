import { Router, Request, Response } from "express";
import { adaptRouter } from "@/main/adapters";
import { makeSignUpController } from "@/main/factories/controllers/sign-up-controller/make-sign-up-controller";

const signUpRouter = Router();
signUpRouter.post("/signup", async (req: Request, res: Response) =>
  adaptRouter(req, res, makeSignUpController())
);

export { signUpRouter };
