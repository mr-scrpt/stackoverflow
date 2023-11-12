/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // import image from outside
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*',
      },
      {
        protocol: 'http',
        hostname: '*',
      },
    ],
  },
}

module.exports = nextConfig
