import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    globalNotFound: true,
  },
  // Projects now live on the home page.
  async redirects() {
    return [
      {
        source: "/:locale(en|pt)/projects",
        destination: "/:locale#projects-heading",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
