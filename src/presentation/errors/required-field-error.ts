export class RequiredFieldError extends Error {
  constructor(param: string) {
    super(`${param} is required`);
    this.name = "RequiredFieldError";
  }
}
