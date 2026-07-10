import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  // Proxy /backend/* calls to Express server during development
  async rewrites() {
    return [
      {
        source: '/backend/:path*',
        destination: `${process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000'}/api/:path*`,
      },
    ];
  },
  // Allow images from external sources if needed
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '**' },
    ],
  },
};

export default nextConfig;
