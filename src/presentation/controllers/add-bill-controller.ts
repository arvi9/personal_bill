import {
  Controller,
  HttpRequest,
  HttpResponse,
  Validation,
  badRequest,
  serverError,
} from "@/presentation/protocols";

export class AddBillController implements Controller {
  constructor(private readonly validation: Validation) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const validationError = this.validation.validate(httpRequest.body);
      if (validationError) {
        return badRequest(validationError);
      }
      return null;
    } catch (error) {
      return serverError(error);
    }
  }
}
