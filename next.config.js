/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  experimental: {
    missingSuspenseWithCSRBailout: false,
  },
  images: {
    domains: [
      "m.media-amazon.com",
      "lh3.googleusercontent.com",
      "firebasestorage.googleapis.com",
      "cdn.dummyjson.com",
    ],
  },
};

module.exports = nextConfig
