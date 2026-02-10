import type { NextConfig } from "next";

const basePath = "/list_the_mountain";

const nextConfig: NextConfig = {
  reactCompiler: true,
  output: "export",
  basePath,
  assetPrefix: `${basePath}/`,
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
};

export default nextConfig;
