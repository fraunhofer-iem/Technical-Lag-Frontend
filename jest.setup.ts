// Import jest-dom for extended matchers (e.g., .toBeInTheDocument())
import "@testing-library/jest-dom";

//Todo if necessary

// Set up test cleanup to run automatically
import { cleanup } from "@testing-library/react";
afterEach(cleanup);

// Suppress console errors in tests (useful for testing React error boundaries)
/*
beforeEach(() => {
    jest.spyOn(console, "error").mockImplementation(() => {});
});
afterEach(() => {
    jest.restoreAllMocks();
});
*/
