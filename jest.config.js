module.exports = {
  roots: ["<rootDir>/src"],
  clearMocks: true,
  collectCoverageFrom: [
    "<rootDir>/src/**/*.ts",
    "!<rootDir>/src/main/**",
    "!<rootDir>/src/infra/db/migrations/**",
  ],
  coverageDirectory: "coverage",
  transform: {
    ".+\\.ts$": "ts-jest",
  },
  testEnvironment: "node",
  setupFilesAfterEnv: ["<rootDir>/src/main/config/jest-setup.ts"],
  globals: {
    "ts-jest": {
      diagnostics: false,
    },
  },
  moduleNameMapper: {
    "@/(.*)": "<rootDir>/src/$1",
  },
};
