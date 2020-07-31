import { HttpRequest, HttpResponse } from "@/presentation/protocols/http";
import { Validation } from "../protocols";

export class ExpensesController {
  constructor(private readonly validation: Validation) {}

  async store(httpRequest: HttpRequest): Promise<HttpResponse> {
    this.validation.validate(httpRequest.body);
    return null;
  }
}
