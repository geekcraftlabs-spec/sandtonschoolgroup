/** @type {import('next').NextConfig} */
const nextConfig = {
  allowedDevOrigins: ['192.168.0.126', '192.168.0.200', 'localhost', '127.0.0.1', 'upset-ghosts-scream.loca.lt'],
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [],
    qualities: [75, 85],
  },
};

module.exports = nextConfig;