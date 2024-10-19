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
      },
      {
        protocol: 'https',
        hostname: 'placehold.co',
      }
    ],
  },
  basePath: basePathConfig,
  env:{
    GOOGLE_BLOG_ID: process.env.GOOGLE_BLOG_ID,
    DOMAIN: process.env.DOMAIN,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
    GOOGLE_RE_CAPTCHA_KEY: process.env.GOOGLE_RE_CAPTCHA_KEY,
    GOOGLE_RE_CAPTCHA_SECRET: process.env.GOOGLE_RE_CAPTCHA_SECRET,
    AUTHOR_ID: process.env.AUTHOR_ID,
    CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
    CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,
    CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
  }
}

module.exports = nextConfig
