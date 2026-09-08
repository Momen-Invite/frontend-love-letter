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
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "X-DNS-Prefetch-Control",
            value: "on",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
          {
            key: "Content-Security-Policy",
            value:
              "frame-ancestors 'self' https://momeninvite.web.id https://*.momeninvite.web.id;",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
