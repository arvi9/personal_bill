import { Validation } from "../protocols";

export class ValidationSpy implements Validation {
  input: any;
  validate(input: any): Error {
    this.input = input;
    return new Error();
  }
}
