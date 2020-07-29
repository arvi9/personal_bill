import faker from "faker";
import { GenerateAccessToken } from "@/data/protocols";

export class GenerateAccessTokenSpy implements GenerateAccessToken {
  params: any;
  generate(params: GenerateAccessToken.Params): string {
    this.params = params;
    return faker.random.uuid();
  }
}
