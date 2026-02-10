import type { NextConfig } from "next";

const basePath = "/list_the_mountain";

const nextConfig: NextConfig = {
  reactCompiler: true,
  output: "export",
  basePath,
  assetPrefix: `${basePath}/`,
  images: {
    unoptimized: true,
    remotePatterns: [
      { protocol: "https", hostname: "images.squarespace-cdn.com", pathname: "/**" },
      { protocol: "http", hostname: "images.squarespace-cdn.com", pathname: "/**" },
    ],
  },
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
};

export default nextConfig;
