/** @type {import('next').NextConfig} */
const mode = process.env.NODE_ENV;
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
      
      }
    ],
  },
  basePath: mode === 'development' ? '' : basePathConfig
}

module.exports = nextConfig
