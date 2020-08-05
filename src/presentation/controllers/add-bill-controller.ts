import {
  Controller,
  HttpRequest,
  HttpResponse,
  Validation,
  badRequest,
} from "@/presentation/protocols";

export class AddBillController implements Controller {
  constructor(private readonly validation: Validation) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    const validationError = this.validation.validate(httpRequest.body);
    if (validationError) {
      return badRequest(validationError);
    }
    return null;
  }
}
