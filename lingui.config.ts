import type { LinguiConfig } from "@lingui/conf";
import { formatter } from "@lingui/format-json";

const config: LinguiConfig = {
  locales: ["en", "zh-cn"],
  sourceLocale: "en",
  fallbackLocales: {
    default: "en",
  },
  catalogs: [
    {
      path: "locales/{locale}",
      include: ["app/", "components/"],
    },
  ],
  format: formatter({ style: "lingui" }),
};

export default config;
