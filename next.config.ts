import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  // @/components/items-selector.tsx ln 31
  // reactStrictMode: false,
  images: {
    localPatterns: [
      {
        pathname: "/img/**",
      },
    ],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "pbs.twimg.com",
      }
    ],
    unoptimized: true,
  },
};

export default withNextIntl(nextConfig);
