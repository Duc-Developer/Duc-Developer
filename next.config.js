/** @type {import('next').NextConfig} */
const basePathConfig = process.env.BASE_PATH;

const nextConfig = {
  distDir: 'dist',
  images: {
    dangerouslyAllowSVG: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'skillicons.dev',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
      {
        protocol: 'https',
        hostname: 'blogger.googleusercontent.com',
      }
    ],
  },
  basePath: basePathConfig,
  env:{
    GOOGLE_BLOG_ID: process.env.GOOGLE_BLOG_ID,
    DOMAIN: process.env.DOMAIN,
  }
}

module.exports = nextConfig
