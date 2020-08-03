import { Router } from "express";
import { authenticationRouter } from "./authentication/authentication";
import { expensesRouter } from "./expenses/expenses";

const router = Router();
router.use(authenticationRouter);
router.use(expensesRouter);

export default router;
