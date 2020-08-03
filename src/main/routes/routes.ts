import { Router } from "express";
import { authenticationRouter } from "./authentication";
import { expensesRouter } from "./expenses";

const router = Router();
router.use(authenticationRouter);
router.use(expensesRouter);

export default router;
