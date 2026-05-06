import type { NextConfig } from "next";
import { readServerApiBaseUrlFromEnv } from "./src/lib/api-env";

const upstreamApiBaseUrl = readServerApiBaseUrlFromEnv(process.env);

const nextConfig: NextConfig = {
  output: "standalone",
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.ytimg.com",
      },
    ],
  },
  async headers() {
    return [
      {
        source: "/maintenance.html",
        headers: [
          {
            key: "Cache-Control",
            value: "no-store, no-cache, must-revalidate, proxy-revalidate",
          },
          {
            key: "Pragma",
            value: "no-cache",
          },
          {
            key: "Expires",
            value: "0",
          },
          {
            key: "X-Robots-Tag",
            value: "noindex, nofollow",
          },
        ],
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: "/upload/:path*",
        destination: `${upstreamApiBaseUrl}/upload/:path*`,
      },
    ];
  },
};

export default nextConfig;
