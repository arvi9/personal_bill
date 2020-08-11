import { Router } from "express";
import { authenticationRouter } from "./authentication/authentication";
import { expensesRouter } from "./expenses/expenses";
import { billsRouter } from "./bills/bills";
import { signUpRouter } from "./sign-up/sign-up";

const router = Router();
router.use(authenticationRouter);
router.use(signUpRouter);
router.use(expensesRouter);
router.use(billsRouter);

export default router;
