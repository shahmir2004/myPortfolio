// scripts/generate-sitemap.js
// Run this script to automatically generate sitemap.xml from projectData.js
// Usage: node scripts/generate-sitemap.js

import { projects } from '../src/projectData.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DOMAIN = 'https://shahmirahmad.vercel.app';
const TODAY = new Date().toISOString().split('T')[0];

// Define static pages
const staticPages = [
  { url: '/', priority: '1.00', changefreq: 'monthly' },
  { url: '/about', priority: '0.80', changefreq: 'monthly' },
  { url: '/projects', priority: '0.90', changefreq: 'weekly' },
  { url: '/contact', priority: '0.64', changefreq: 'monthly' }
];

// Generate XML
let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <!-- Sitemap generated: ${TODAY} -->
`;

// Add static pages
staticPages.forEach(page => {
  sitemap += `  <url>
    <loc>${DOMAIN}${page.url}</loc>
    <lastmod>${TODAY}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>
`;
});

// Add project detail pages
sitemap += `  <!-- Project detail pages (auto-generated from projectData.js) -->
`;

projects.forEach(project => {
  sitemap += `  <url>
    <loc>${DOMAIN}/projects/${project.id}</loc>
    <lastmod>${TODAY}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.64</priority>
  </url>
`;
});

sitemap += `</urlset>`;

// Write to file
const sitemapPath = path.join(__dirname, '../sitemap.xml');
fs.writeFileSync(sitemapPath, sitemap, 'utf8');

console.log('✅ Sitemap generated successfully!');
console.log(`📄 Location: ${sitemapPath}`);
console.log(`📊 Total URLs: ${staticPages.length + projects.length}`);
console.log(`   - Static pages: ${staticPages.length}`);
console.log(`   - Project pages: ${projects.length}`);
console.log(`\n🌐 Sitemap URL: ${DOMAIN}/sitemap.xml`);
console.log('\n💡 Don\'t forget to:');
console.log('   1. Submit sitemap to Google Search Console');
console.log('   2. Submit sitemap to Bing Webmaster Tools');
