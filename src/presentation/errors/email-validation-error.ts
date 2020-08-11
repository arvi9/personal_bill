export class EmailValidationError extends Error {
  constructor(email: string) {
    super(`${email} is an invalid email`);
    this.name = "EmailValidationError";
  }
}
