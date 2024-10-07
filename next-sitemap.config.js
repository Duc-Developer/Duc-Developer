/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: process.env.DOMAIN,
    generateRobotsTxt: true,
    output: 'export',
    outDir: './dist',
    exclude: ['/googlebd81819de2c08696']
}