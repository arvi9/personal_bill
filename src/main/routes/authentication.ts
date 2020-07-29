import { Router, Request, Response } from "express";
import { makeAuthenticationController } from "../factories/controllers/authentication-controller/make-authentication-controller";

const authenticationRouter = Router();

const authenticationController = makeAuthenticationController();
authenticationRouter.post("/login", async (req: Request, res: Response) => {
  const { statusCode, body } = await authenticationController.handle({
    body: req.body,
  });
  return res.status(statusCode).json(body);
});

export { authenticationRouter };
