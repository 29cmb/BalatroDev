import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    CLIENT_URL: "http://localhost:40312",
    SERVER_URL: "http://localhost:61735",
    PORT: "61735",
  },
  rewrites: async () => {
    return [
      {
        source: '/api/:path*',
        destination: `http://localhost:61735/api/:path*`,
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'img.icons8.com',
        port: '',
        pathname: '/**',
      },
    ],
  }
};

export default nextConfig;
