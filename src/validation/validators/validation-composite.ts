import { Validation } from "@/presentation/protocols";

export class ValidationComposite implements Validation {
  constructor(private readonly validations: Validation[]) {}

  validate(input: any): Error {
    for (const validation of this.validations) {
      validation.validate(input);
    }
    return null;
  }
}
