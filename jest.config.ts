import type { Config } from "jest";
//Todo if necessary

const config: Config = {
    preset: "ts-jest",
    testEnvironment: "jest-environment-jsdom", // Simulates a browser-like environment
    moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
    setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"], // For additional Jest configurations
    testMatch: ["**/__tests__/**/*.(ts|tsx)", "**/?(*.)+(spec|test).(ts|tsx)"],
    transform: {
        "^.+\\.tsx?$": "ts-jest",
    },
    moduleNameMapper: {
        // Handle module aliases
        "^@/(.*)$": "<rootDir>/src/$1",
        "\\.(css|less|scss|sass)$": "identity-obj-proxy", // Mock CSS imports
    },
    collectCoverage: true, // Enables code coverage collection
    collectCoverageFrom: ["src/**/*.{ts,tsx}", "!src/main.tsx", "!src/**/*.d.ts"],
    coverageReporters: ["json", "lcov", "text", "clover"],
};

export default config;
