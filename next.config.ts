import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: "/v5", destination: "/", permanent: false },
      { source: "/v1", destination: "/", permanent: false },
      { source: "/v2", destination: "/", permanent: false },
      { source: "/v3", destination: "/", permanent: false },
      { source: "/v4", destination: "/", permanent: false },
      { source: "/original", destination: "/", permanent: false },
      { source: "/shot/:path*", destination: "/", permanent: false },
    ];
  },
};

export default nextConfig;
