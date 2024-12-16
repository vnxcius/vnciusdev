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
    unoptimized: true,
  },
  // https://r3f.docs.pmnd.rs/getting-started/installation#next.js-13.1-or-latest-version
  transpilePackages: ['three'],
};

export default withNextIntl(nextConfig);
