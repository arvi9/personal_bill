import { Router, Request, Response } from "express";
import { makeAddExpensesController } from "@/main/factories/controllers/add-expenses-controller/make-add-expenses-controller";

const expensesRouter = Router();

const addExpensesController = makeAddExpensesController();
expensesRouter.post("/expenses", async (req: Request, res: Response) => {
  const { statusCode, body } = await addExpensesController.handle({
    body: req.body,
  });
  return res.status(statusCode).json(body);
});

export { expensesRouter };
