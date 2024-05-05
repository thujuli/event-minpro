/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 's-light.tiket.photos',
          },
        ],
      },
}

module.exports = nextConfig
