import createNextIntlPlugin from "next-intl/plugin";
import type { NextConfig } from "next";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  output: "standalone", // <--- Dodana linijka wymuszająca prawidłowe budowanie dla Azure
  images: {
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 2560, 3200, 3840],
    qualities: [75, 100],
  },
};

export default withNextIntl(nextConfig);
