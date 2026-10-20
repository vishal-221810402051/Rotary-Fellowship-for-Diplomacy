import { defineConfig, globalIgnores } from "eslint/config";
import js from "@eslint/js";
import typescript from "typescript-eslint";
import hooks from "eslint-plugin-react-hooks";

export default defineConfig([
  js.configs.recommended,
  ...typescript.configs.recommended,
  hooks.configs.flat.recommended,
  globalIgnores([".next/**", "out/**", "coverage/**", "docs/evidence/**", "next-env.d.ts"]),
]);
