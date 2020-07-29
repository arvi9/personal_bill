import { Router } from "express";
import { authenticationRouter } from "./authentication";

const router = Router();
router.use(authenticationRouter);

export default router;
