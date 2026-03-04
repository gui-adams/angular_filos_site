import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const SITE_URL = "https://faculdadefilos.edu.br";
const CITY_SUFFIX = "aguas-lindas-go";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const root = path.resolve(__dirname, "..");

// Ajuste se seu path mudar
const coursesPath = path.resolve(root, "src/app/components/courses/courses.data.ts");

function slugify(input) {
  return input
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function levelPrefix(level) {
  // mesma regra do seu withSeo()
  if (level === "graduacao") return "graduacao";
  if (level === "pos") return "pos-graduacao";
  return level; // mba etc
}

function buildAutoSlug(title, level) {
  return `${levelPrefix(level)}-${slugify(title)}-${CITY_SUFFIX}`;
}

function extractCoursesFromWithSeoTs(fileContent) {
  // pega apenas os blocos withSeo({ ... })
  const re = /withSeo\s*\(\s*\{\s*([\s\S]*?)\}\s*\)\s*,?/g;

  const titleRe = /title\s*:\s*['"`]([^'"`]+)['"`]/;
  const levelRe = /level\s*:\s*['"`](graduacao|pos|mba)['"`]/;
  const manualSeoSlugRe = /seoSlug\s*:\s*['"`]([^'"`]+)['"`]/; // se um dia você colocar manual

  const items = [];
  let m;

  while ((m = re.exec(fileContent)) !== null) {
    const body = m[1] ?? "";
    const title = titleRe.exec(body)?.[1]?.trim();
    const level = levelRe.exec(body)?.[1]?.trim();
    if (!title || !level) continue;

    const manualSeoSlug = manualSeoSlugRe.exec(body)?.[1]?.trim() ?? null;

    items.push({
      title,
      level,
      seoSlug: manualSeoSlug || buildAutoSlug(title, level),
    });
  }

  // remove duplicados mantendo ordem
  const seen = new Set();
  const unique = [];
  for (const it of items) {
    const k = `${it.level}::${it.title}`;
    if (seen.has(k)) continue;
    seen.add(k);
    unique.push(it);
  }
  return unique;
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

  for (const p of staticPaths) {
    urls.push(buildUrlTag(`${SITE_URL}${p}`, today, "monthly", "0.6"));
  }

  for (const slug of slugs) {
    urls.push(buildUrlTag(`${SITE_URL}/${slug}`, today, "weekly", "0.8"));
  }

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
  const lines = ["/"];

  for (const p of staticPaths) {
    if (p && p !== "/") lines.push(p);
  }

  for (const slug of slugs) {
    lines.push(`/${slug}`);
  }

  return Array.from(new Set(lines)).join("\n") + "\n";
}

function main() {
  if (!fs.existsSync(coursesPath)) {
    console.error("Não achei:", coursesPath);
    process.exit(1);
  }

  const content = fs.readFileSync(coursesPath, "utf8");
  const courses = extractCoursesFromWithSeoTs(content);
  const slugs = courses.map(c => c.seoSlug);

  const staticPaths = [
    "/",
    "/sobre-nos",
    "/institucional/cpa",
    "/institucional/ouvidoria",
    "/institucional/biblioteca",
    "/faculdade-ads-aguas-lindas-go",
  ];

  const outSitemap = path.resolve(root, "src/sitemap.xml");
  const outRobots = path.resolve(root, "src/robots.txt");
  const outRoutes = path.resolve(root, "prerender-routes.txt");

  fs.writeFileSync(outSitemap, generateSitemap(staticPaths, slugs), "utf8");
  fs.writeFileSync(outRobots, generateRobotsTxt(), "utf8");
  fs.writeFileSync(outRoutes, generatePrerenderRoutes(staticPaths, slugs), "utf8");

  console.log("✅ courses file:", coursesPath);
  console.log("✅ cursos:", slugs.length);

  // debug rápido (opcional)
  // console.log(slugs.slice(0, 10));

  console.log("✅ sitemap:", outSitemap);
  console.log("✅ robots:", outRobots);
  console.log("✅ prerender routes:", outRoutes);
}

main();