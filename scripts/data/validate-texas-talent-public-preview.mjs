import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";

const root = process.cwd();
const read = (path) => readFileSync(resolve(root, path), "utf8");
const fail = (message) => {
  console.error(`Texas Talent public-preview validation failed: ${message}`);
  process.exit(1);
};
const requireCondition = (condition, message) => {
  if (!condition) fail(message);
};

const routePath = "src/routes/admin.texas-talent.preview.tsx";
const pagePath = "src/routes/admin.texas-talent.preview.lazy.tsx";
for (const path of [routePath, pagePath]) {
  requireCondition(existsSync(resolve(root, path)), `missing required preview file ${path}`);
}

const route = read(routePath);
const page = read(pagePath);
const publicRoutes = read("src/lib/public-routes.ts");
const sitemap = read("src/routes/sitemap[.]xml.ts");
const editorialStatus = read("src/data/texas-talent-editorial-status.ts");

requireCondition(
  route.includes('createFileRoute("/admin/texas-talent/preview")'),
  "public-style preview must remain inside the admin namespace",
);
requireCondition(
  route.includes('noindex, nofollow, noarchive'),
  "public-style preview must remain noindex, nofollow, noarchive",
);
requireCondition(
  page.includes('/images/editorial/texas-talent-hero.webp'),
  "preview must use the approved Texas Talent banner",
);
requireCondition(
  page.includes('TEXAS_TALENT_TAGLINE'),
  "preview must use the canonical Texas Talent tagline",
);
requireCondition(
  page.includes('Preview only · noindex') && page.includes('Still safely behind the curtain.'),
  "preview must visibly retain its non-public status",
);
requireCondition(
  page.includes('to="/admin/texas-talent/$slug"'),
  "profile cards must continue to target internal drafts",
);
requireCondition(
  !/to="\/texas-talent(?:\/|\")/.test(page),
  "preview must not link to a public Texas Talent route before launch",
);
requireCondition(
  !existsSync(resolve(root, "src/routes/texas-talent.tsx")) && !existsSync(resolve(root, "src/routes/texas-talent.lazy.tsx")),
  "public Texas Talent hub route must remain absent",
);
requireCondition(!publicRoutes.includes('"/texas-talent"'), "Texas Talent must remain outside public route classification");
requireCondition(!sitemap.includes("texas-talent"), "Texas Talent must remain absent from sitemap generation");
requireCondition(!editorialStatus.includes('launch-ready'), "preview work must not grant launch-ready editorial approval");

console.log("Texas Talent public-preview contract passed: public-style experience remains hidden, noindex and non-publishing.");
