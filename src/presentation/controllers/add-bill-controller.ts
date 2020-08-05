import {
  Controller,
  HttpRequest,
  HttpResponse,
  Validation,
  badRequest,
  serverError,
} from "@/presentation/protocols";
import { AddBill } from "@/domain/usecases";

export class AddBillController implements Controller {
  constructor(
    private readonly validation: Validation,
    private readonly addBill: AddBill
  ) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const validationError = this.validation.validate(httpRequest.body);
      if (validationError) {
        return badRequest(validationError);
      }

      await this.addBill.add(httpRequest.body);
      return null;
    } catch (error) {
      return serverError(error);
    }
  }
}
