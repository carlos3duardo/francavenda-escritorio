/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'francavenda.localhost',
      },
      {
        protocol: 'https',
        hostname: 'api.francavenda.com.br',
      },
    ],
  },
};

export default nextConfig;
