import { JwtTokenAdapter } from "@/infra/utils/jwt-token-adapter";
import { GenerateAccessToken } from "@/data/protocols";

export const makeGenerateAccessToken = (): GenerateAccessToken => {
  return new JwtTokenAdapter(process.env.JWT_SECRET_KEY);
};
