import { Validation } from "@/presentation/protocols";

export class ValidationSpy implements Validation {
  input: any;
  validationError = null;
  validate(input: any): Error {
    this.input = input;
    return this.validationError;
  }
}
