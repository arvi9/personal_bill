import { Router } from "express";
import { authenticationRouter } from "./authentication/authentication";
import { expensesRouter } from "./expenses/expenses";
import { billsRouter } from "./bills/bills";

const router = Router();
router.use(authenticationRouter);
router.use(expensesRouter);
router.use(billsRouter);

export default router;
