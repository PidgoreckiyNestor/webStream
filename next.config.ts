import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    optimizePackageImports: ["lucide-react", "gsap"],
  },
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [384, 640, 750, 828, 1080, 1200],
    imageSizes: [256, 384],
    qualities: [70, 75],
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
    ];
  },
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
