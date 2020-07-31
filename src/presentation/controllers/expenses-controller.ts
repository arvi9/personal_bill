import {
  HttpRequest,
  HttpResponse,
  badRequest,
} from "@/presentation/protocols/http";
import { Validation } from "@/presentation/protocols";

export class ExpensesController {
  constructor(private readonly validation: Validation) {}

  async store(httpRequest: HttpRequest): Promise<HttpResponse> {
    const validationError = this.validation.validate(httpRequest.body);
    if (validationError) {
      return badRequest(validationError);
    }
    return null;
  }
}
