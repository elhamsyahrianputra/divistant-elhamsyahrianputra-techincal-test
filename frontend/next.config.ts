import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "picsum.photos",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "3001",
        pathname: "/uploads/**",
      },
    ],
    dangerouslyAllowSVG: true,
    unoptimized: process.env.NODE_ENV === "development",
  },
};

export default nextConfig;
