import jwt from "jsonwebtoken";
import { GenerateAccessToken } from "@/data/protocols";

export class JwtTokenAdapter implements GenerateAccessToken {
  constructor(private readonly secretKey: string) {}

  generate(params: GenerateAccessToken.Params): string {
    return jwt.sign(params, this.secretKey);
  }
}
