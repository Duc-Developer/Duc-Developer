import { MetadataRoute } from 'next'
require('dotenv').config();
const domain = process.env.DOMAIN || 'https://david.id.vn';
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/api',
    },
    sitemap: `${domain}/sitemap/index.xml`,
  }
}