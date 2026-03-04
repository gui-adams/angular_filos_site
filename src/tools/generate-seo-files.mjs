import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const SITE_URL = "https://faculdadefilos.edu.br";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const root = path.resolve(__dirname, "..");

// Ajuste se seu path mudar
const coursesPath = path.resolve(root, "src/app/components/courses/courses.data.ts");

function extractSeoSlugsFromTs(fileContent) {
  const re = /seoSlug\s*:\s*['"`]([^'"`]+)['"`]/g;
  const slugs = new Set();
  let m;
  while ((m = re.exec(fileContent)) !== null) slugs.add(m[1].trim());
  return Array.from(slugs);
}

function xmlEscape(s) {
  return s
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

function buildUrlTag(loc, lastmod, changefreq, priority) {
  return `
  <url>
    <loc>${xmlEscape(loc)}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`.trim();
}

function generateSitemap(staticPaths, slugs) {
  const today = new Date().toISOString().slice(0, 10);

  const urls = [];

  // rotas fixas
  for (const p of staticPaths) {
    urls.push(buildUrlTag(`${SITE_URL}${p}`, today, "monthly", "0.6"));
  }

  // cursos
  for (const slug of slugs) {
    urls.push(buildUrlTag(`${SITE_URL}/${slug}`, today, "weekly", "0.8"));
  }

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="https://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(u => "  " + u.replaceAll("\n", "\n  ")).join("\n")}
</urlset>
`;
}

function generateRobotsTxt() {
  return `User-agent: *
Allow: /

Sitemap: ${SITE_URL}/sitemap.xml
`;
}

function generatePrerenderRoutes(staticPaths, slugs) {
  // ⚠️ aqui é caminho (sem domínio), 1 por linha
  // Inclui '/' e páginas fixas e cada '/<slug>'
  const lines = [];

  // "/" sempre é bom
  lines.push("/");

  for (const p of staticPaths) {
    if (p !== "/") lines.push(p);
  }

  for (const slug of slugs) {
    lines.push(`/${slug}`);
  }

  // remove duplicados mantendo ordem
  return Array.from(new Set(lines)).join("\n") + "\n";
}

function main() {
  if (!fs.existsSync(coursesPath)) {
    console.error("Não achei:", coursesPath);
    process.exit(1);
  }

  const content = fs.readFileSync(coursesPath, "utf8");
  const slugs = extractSeoSlugsFromTs(content);

  const staticPaths = [
    "/",
    "/sobre-nos",
    "/institucional/cpa",
    "/institucional/ouvidoria",
    "/institucional/biblioteca",
    "/faculdade-ads-aguas-lindas-go",
  ];

  // outputs
  const outSitemap = path.resolve(root, "src/sitemap.xml");
  const outRobots = path.resolve(root, "src/robots.txt");
  const outRoutes = path.resolve(root, "prerender-routes.txt"); // na raiz, fácil pro angular.json

  fs.writeFileSync(outSitemap, generateSitemap(staticPaths, slugs), "utf8");
  fs.writeFileSync(outRobots, generateRobotsTxt(), "utf8");
  fs.writeFileSync(outRoutes, generatePrerenderRoutes(staticPaths, slugs), "utf8");

  console.log("✅ sitemap:", outSitemap);
  console.log("✅ robots:", outRobots);
  console.log("✅ prerender routes:", outRoutes);
  console.log("✅ cursos:", slugs.length);
}

main();