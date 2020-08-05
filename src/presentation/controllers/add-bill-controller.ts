import {
  Controller,
  HttpRequest,
  HttpResponse,
  Validation,
} from "@/presentation/protocols";

export class AddBillController implements Controller {
  constructor(private readonly validation: Validation) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    this.validation.validate(httpRequest.body);
    return null;
  }
}
