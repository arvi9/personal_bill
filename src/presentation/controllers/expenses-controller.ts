import {
  HttpRequest,
  HttpResponse,
  badRequest,
} from "@/presentation/protocols/http";
import { Validation } from "@/presentation/protocols";
import { AddExpense } from "@/domain/usecases";

export class ExpensesController {
  constructor(
    private readonly validation: Validation,
    private readonly addExpense: AddExpense
  ) {}

  async store(httpRequest: HttpRequest): Promise<HttpResponse> {
    const validationError = this.validation.validate(httpRequest.body);
    if (validationError) {
      return badRequest(validationError);
    }

    await this.addExpense.add(httpRequest.body);
    return null;
  }
}
