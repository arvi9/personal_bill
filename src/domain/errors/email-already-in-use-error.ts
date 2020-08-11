export class EmailAlreadyInUseError extends Error {
  constructor() {
    super("This email address is already in use");
    this.name = "EmailAlreadyInUseError";
  }
}
