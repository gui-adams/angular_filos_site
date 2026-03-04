import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const SITE_URL = "https://faculdadefilos.edu.br";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const root = path.resolve(__dirname, "..");

// ✅ paths possíveis (fallback)
const coursesPathCandidates = [
  path.resolve(root, "src/app/components/courses/courses.data.ts"),
  path.resolve(root, "src/app/components/courses/courses.data.ts"),
  path.resolve(root, "src/app/components/courses/courses.data.ts"),
];

function findCoursesPath() {
  for (const p of coursesPathCandidates) {
    if (fs.existsSync(p)) return p;
  }
  return null;
}

function extractSeoSlugsFromTs(fileContent) {
  // pega seoSlug: '...'
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
  return `<url>
  <loc>${xmlEscape(loc)}</loc>
  <lastmod>${lastmod}</lastmod>
  <changefreq>${changefreq}</changefreq>
  <priority>${priority}</priority>
</url>`;
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

  // ✅ namespace correto (padrão do protocolo)
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
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
  const lines = [];

  // "/" sempre entra 1x
  lines.push("/");

  for (const p of staticPaths) {
    if (p && p !== "/") lines.push(p);
  }

  for (const slug of slugs) {
    lines.push(`/${slug}`);
  }

  return Array.from(new Set(lines)).join("\n") + "\n";
}

function main() {
  const coursesPath = findCoursesPath();

  if (!coursesPath) {
    console.error("Não achei courses.data.ts em nenhum path conhecido. Tentei:");
    for (const p of coursesPathCandidates) console.error(" -", p);
    process.exit(1);
  }

  const content = fs.readFileSync(coursesPath, "utf8");
  const slugs = extractSeoSlugsFromTs(content);

  const staticPaths = [
    "/", // pode deixar aqui, o prerender remove duplicado e sitemap não tem problema
    "/sobre-nos",
    "/institucional/cpa",
    "/institucional/ouvidoria",
    "/institucional/biblioteca",
    "/faculdade-ads-aguas-lindas-go",
  ];

  // outputs
  const outSitemap = path.resolve(root, "src/sitemap.xml");
  const outRobots = path.resolve(root, "src/robots.txt");
  const outRoutes = path.resolve(root, "prerender-routes.txt");

  fs.writeFileSync(outSitemap, generateSitemap(staticPaths, slugs), "utf8");
  fs.writeFileSync(outRobots, generateRobotsTxt(), "utf8");
  fs.writeFileSync(outRoutes, generatePrerenderRoutes(staticPaths, slugs), "utf8");

  console.log("✅ courses file:", coursesPath);
  console.log("✅ sitemap:", outSitemap);
  console.log("✅ robots:", outRobots);
  console.log("✅ prerender routes:", outRoutes);
  console.log("✅ cursos:", slugs.length);
}

main();