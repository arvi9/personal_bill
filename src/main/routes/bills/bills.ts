import { Router, Request, Response, NextFunction } from "express";
import { adaptRouter, adaptMiddleware } from "@/main/adapters";
import { makeAuthMiddleware } from "@/main/factories/middlewares/make-auth-middleware";
import { makeAddBillController } from "@/main/factories/controllers/add-bill-controller/make-add-bill-controller";

const billsRouter = Router();
billsRouter.post(
  "/bills",
  async (req: Request, res: Response, next: NextFunction) =>
    adaptMiddleware(req, res, next, makeAuthMiddleware()),
  async (req: Request, res: Response) =>
    adaptRouter(req, res, makeAddBillController())
);

export { billsRouter };
