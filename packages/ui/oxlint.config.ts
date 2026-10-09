import { createFrontendOxlintConfig } from "@wbst/oxlint-config"
import { uiIgnorePatterns } from "@wbst/oxlint-config/frontend-config"
import { defineConfig } from "oxlint"

export default defineConfig(
  createFrontendOxlintConfig({
    ignorePatterns: uiIgnorePatterns,
  }),
)
