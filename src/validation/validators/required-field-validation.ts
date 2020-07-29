import { Validation } from "@/presentation/protocols";
import { RequiredFieldError } from "@/presentation/errors";

export class RequiredFieldValidation implements Validation {
  constructor(private readonly field: string) {}

  validate(input: any): Error {
    if (!input[this.field]) {
      return new RequiredFieldError(this.field);
    }
    return null;
  }
}
