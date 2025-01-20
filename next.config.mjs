/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.ibb.co',
      },
      {
        protocol: 'https',
        hostname: 'iili.io',
      },
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
