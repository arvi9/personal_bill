import { validate } from "email-validator";
import { Validation } from "@/presentation/protocols";
import { EmailValidationError } from "@/presentation/errors";

export class EmailValidation implements Validation {
  constructor(private readonly field: string) {}

  validate(input: any): Error {
    const email = input[this.field];
    if (!validate(email)) {
      return new EmailValidationError(email);
    }
    return null;
  }
}
