import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // @/components/items-selector.tsx ln 31
  // reactStrictMode: false,
  images: {
    localPatterns: [
      {
        pathname: "/img/**",
      },
    ],
    unoptimized: true,
  },
};

export default nextConfig;
