/** @type {import('next-sitemap').IConfig} */
const domain = process.env.DOMAIN;
module.exports = {
    siteUrl: domain,
    generateRobotsTxt: true,
}