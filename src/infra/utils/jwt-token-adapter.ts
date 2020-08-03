import jwt from "jsonwebtoken";
import { GenerateAccessToken, Decrypter } from "@/data/protocols";

export class JwtTokenAdapter implements GenerateAccessToken, Decrypter {
  constructor(private readonly secretKey: string) {}

  generate(params: GenerateAccessToken.Params): string {
    return jwt.sign(params, this.secretKey);
  }

  async decrypt(token: string): Promise<string> {
    const value = jwt.verify(token, this.secretKey) as string;
    return value;
  }
}
