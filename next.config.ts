import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  i18n: {
    defaultLocale: "en-US",
    // These are all the locales supported in the application
    locales: ['en-US', 'fa-IR',],
  },
};

export default nextConfig;
