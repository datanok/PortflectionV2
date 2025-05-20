/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://www.portflection.com',
  generateRobotsTxt: true, // Automatically generates robots.txt
  generateIndexSitemap: true, // Generates a sitemap index if you have multiple sitemaps
  sitemapSize: 5000, // Optional, splits sitemaps if you have lots of URLs
  exclude: [], // Optional: paths you don't want to include
};
