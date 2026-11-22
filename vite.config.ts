import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

// GitHub Pages project site: https://cryptotradingplatformx.github.io/household-chemistry/
export default defineConfig({
  base: "/household-chemistry/",
  plugins: [react()],
  test: {
    environment: "node",
    include: ["src/**/*.test.ts"],
  },
});
