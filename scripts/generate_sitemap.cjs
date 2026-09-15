const fs = require('fs');
const path = require('path');

const SITE_URL = 'https://devpulsetools.pages.dev';
const TODAY = '2026-09-13';

// Read toolsData.ts to extract all tools
const toolsDataPath = path.join(__dirname, '../src/data/toolsData.ts');
const code = fs.readFileSync(toolsDataPath, 'utf8');

const tools = [];
const blocks = code.split(/\{\s*id:\s*[\x27\x22]/);
for (let i = 1; i < blocks.length; i++) {
  const b = blocks[i];
  const idMatch = b.match(/^([a-z0-9-]+)[\x27\x22]/);
  if (!idMatch) continue;
  const id = idMatch[1];
  const slugMatch = b.match(/slug:\s*[\x27\x22]([a-z0-9-]+)[\x27\x22]/);
  const slug = slugMatch ? slugMatch[1] : id;
  const isPopular = /isPopular:\s*true/.test(b);
  const categoryMatch = b.match(/category:\s*[\x27\x22]([a-z0-9-]+)[\x27\x22]/);
  const category = categoryMatch ? categoryMatch[1] : 'developer';
  tools.push({ id, slug, isPopular, category });
}

console.log(`Extracted ${tools.length} tools from toolsData.ts`);

let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
  <!-- Homepage -->
  <url>
    <loc>${SITE_URL}/</loc>
    <lastmod>${TODAY}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>

  <!-- Featured Real Estate & Mortgage Hub (Priority Flagship) -->
  <url>
    <loc>${SITE_URL}/tools/real-estate-calculator/</loc>
    <lastmod>${TODAY}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>

  <!-- Tools Catalog & Directory -->
  <url>
    <loc>${SITE_URL}/tools/</loc>
    <lastmod>${TODAY}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>

  <!-- All 80+ Developer, Finance, Designer, Security, Data & Education Tools -->
`;

// Add each tool
for (const tool of tools) {
  if (tool.id === 'real-estate-calculator') continue; // already added above as flagship priority 1.0
  const priority = tool.isPopular ? '0.9' : '0.8';
  xml += `  <url>
    <loc>${SITE_URL}/tools/${tool.slug}/</loc>
    <lastmod>${TODAY}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${priority}</priority>
  </url>
`;
}

xml += `
  <!-- Static Information & Legal Pages -->
  <url>
    <loc>${SITE_URL}/about/</loc>
    <lastmod>${TODAY}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
  <url>
    <loc>${SITE_URL}/privacy/</loc>
    <lastmod>${TODAY}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.5</priority>
  </url>
  <url>
    <loc>${SITE_URL}/terms/</loc>
    <lastmod>${TODAY}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.5</priority>
  </url>
  <url>
    <loc>${SITE_URL}/contact/</loc>
    <lastmod>${TODAY}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
</urlset>
`;

const outputPath = path.join(__dirname, '../public/sitemap.xml');
fs.writeFileSync(outputPath, xml.trim() + '\n', 'utf8');
console.log(`Successfully generated ${outputPath}`);
