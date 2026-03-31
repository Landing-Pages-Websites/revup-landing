import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "revup-team.com" },
    ],
  },
};

export default nextConfig;
