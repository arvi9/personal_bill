export class AuthenticationController {
  async handle(httpRequest: any): Promise<any> {
    if (!httpRequest.body.password) {
      return {
        statusCode: 400,
        message: "Password is required",
      };
    }
  }
}
