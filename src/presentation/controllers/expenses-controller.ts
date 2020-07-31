import {
  HttpRequest,
  HttpResponse,
  badRequest,
  serverError,
  created,
} from "@/presentation/protocols/http";
import { Validation } from "@/presentation/protocols";
import { AddExpense } from "@/domain/usecases";
import { ServerError } from "@/domain/errors";

export class ExpensesController {
  constructor(
    private readonly validation: Validation,
    private readonly addExpense: AddExpense
  ) {}

  async store(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const validationError = this.validation.validate(httpRequest.body);
      if (validationError) {
        return badRequest(validationError);
      }

      const expense = await this.addExpense.add(httpRequest.body);
      return created(expense);
    } catch {
      return serverError(new ServerError());
    }
  }
}
