import { Router, Request, Response } from "express";
import { makeAddExpensesController } from "@/main/factories/controllers/add-expenses-controller/make-add-expenses-controller";
import { adaptRouter } from "@/main/adapters";

const expensesRouter = Router();
expensesRouter.post("/expenses", async (req: Request, res: Response) => {
  const { statusCode, body } = await adaptRouter(
    req,
    makeAddExpensesController()
  );
  return res.status(statusCode).json(body);
});

export { expensesRouter };
