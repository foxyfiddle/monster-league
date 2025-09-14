/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    turbo: false, // keep Turbopack off on Next 14
  },
};

export default nextConfig;

