export class InvalidComparationError extends Error {
  constructor() {
    super(`The fields did not match.`);
    this.name = "InvalidComparationError";
  }
}
