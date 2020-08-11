import {
  Controller,
  HttpRequest,
  HttpResponse,
  Validation,
  badRequest,
  serverError,
  created,
} from "@/presentation/protocols";
import { AddBill } from "@/domain/usecases";
import { ServerError } from "@/domain/errors";

export class AddBillController implements Controller {
  constructor(
    private readonly validation: Validation,
    private readonly addBill: AddBill
  ) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const validationError = this.validation.validate(httpRequest.body);
      if (validationError) {
        console.log(validationError);
        return badRequest(validationError);
      }

      const bill = await this.addBill.add(httpRequest.body);
      if (!bill) {
        return serverError(new ServerError());
      }

      return created(bill);
    } catch (error) {
      return serverError(error);
    }
  }
}
