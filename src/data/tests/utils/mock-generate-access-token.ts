import faker from "faker";
import { GenerateAccessToken } from "@/data/protocols";

export class GenerateAccessTokenSpy implements GenerateAccessToken {
  params: any;
  accessToken = faker.random.uuid();
  generate(params: GenerateAccessToken.Params): string {
    this.params = params;
    return this.accessToken;
  }
}
