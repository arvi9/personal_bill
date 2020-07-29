module.exports = {
  roots: ["<rootDir>/src"],
  clearMocks: true,
  collectCoverageFrom: ["<rootDir>/src/**/*.ts", "!<rootDir>/src/main/**"],
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
  testMatch: ["**/*.spec.ts"],
  moduleNameMapper: {
    "@/(.*)": "<rootDir>/src/$1",
  },
};
