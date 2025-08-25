/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://kondax.com',
  generateRobotsTxt: true, // robots.txtも自動生成する
};
