/** @type {import('next').NextConfig} */
const mode = process.env.MODE;
const basePathConfig = process.env.BASE_PATH;

const nextConfig = {
  output: mode === 'development' ? undefined : 'export',
  distDir: 'dist',
  images: {
    unoptimized: mode !== 'development',
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
  basePath: mode === 'development' ? '' : basePathConfig,
  env:{
    GOOGLE_BLOG_ID: process.env.GOOGLE_BLOG_ID,
    DOMAIN: process.env.DOMAIN,
  }
}

module.exports = nextConfig
