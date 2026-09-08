import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  basePath: "/love-letter",
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.momeninvite.web.id",
      },
    ],
  },
};

export default nextConfig;
