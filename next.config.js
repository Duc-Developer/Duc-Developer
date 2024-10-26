/** @type {import('next').NextConfig} */
const basePathConfig = process.env.BASE_PATH;

const nextConfig = {
  distDir: 'dist',
  i18n: {
    locales: ['en', 'vn'],
    defaultLocale: 'en',
    localeDetection: true,
  },
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
    CLOUDFLARE_RE_CAPTCHA_KEY: process.env.CLOUDFLARE_RE_CAPTCHA_KEY,
    CLOUDFLARE_RE_CAPTCHA_SECRET: process.env.CLOUDFLARE_RE_CAPTCHA_SECRET,
    AUTHOR_ID: process.env.AUTHOR_ID,
  }
}

module.exports = nextConfig
