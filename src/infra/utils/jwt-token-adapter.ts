import jwt from "jsonwebtoken";
import { GenerateAccessToken, Decrypter } from "@/data/protocols";

export class JwtTokenAdapter implements GenerateAccessToken, Decrypter {
  constructor(private readonly secretKey: string) {}

  generate(params: GenerateAccessToken.Params): string {
    return jwt.sign(params, this.secretKey);
  }

  async decrypt(value: string): Promise<string> {
    jwt.verify(value, this.secretKey);
    return null;
  }
}
