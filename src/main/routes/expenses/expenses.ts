import { Router, Request, Response, NextFunction } from "express";
import { makeAddExpensesController } from "@/main/factories/controllers/add-expenses-controller/make-add-expenses-controller";
import { adaptRouter, adaptMiddleware } from "@/main/adapters";
import { makeAuthMiddleware } from "@/main/factories/middlewares/make-auth-middleware";

const expensesRouter = Router();
expensesRouter.post(
  "/expenses",
  async (req: Request, res: Response, next: NextFunction) =>
    adaptMiddleware(req, res, next, makeAuthMiddleware()),
  async (req: Request, res: Response) =>
    adaptRouter(req, res, makeAddExpensesController())
);

export { expensesRouter };
