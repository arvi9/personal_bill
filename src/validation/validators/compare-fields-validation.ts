import { Validation } from "@/presentation/protocols";
import { InvalidComparationError } from "@/presentation/errors";

export class CompareFieldsValidation implements Validation {
  constructor(
    private readonly field: string,
    private readonly comparationField: string
  ) {}

  validate(input: any): Error {
    if (input[this.field] !== input[this.comparationField]) {
      return new InvalidComparationError();
    }
    return null;
  }
}
