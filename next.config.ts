import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['www.blingo.tech'],
  },
  serverExternalPackages: ["node-appwrite"],
};

export default nextConfig;
