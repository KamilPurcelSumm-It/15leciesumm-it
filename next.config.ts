import createNextIntlPlugin from "next-intl/plugin";
import type { NextConfig } from "next";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  output: "standalone", // <--- Dodana linijka wymuszająca prawidłowe budowanie dla Azure
};

export default withNextIntl(nextConfig);
