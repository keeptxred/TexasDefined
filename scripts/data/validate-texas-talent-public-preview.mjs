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

const routePath = "src/routes/admin.texas-talent.preview.ts";
const clientPaths = [
  "src/routes/admin.texas-talent.preview.tsx",
  "src/routes/admin.texas-talent.preview.lazy.tsx",
];
requireCondition(existsSync(resolve(root, routePath)), `missing required preview route ${routePath}`);
for (const path of clientPaths) {
  requireCondition(!existsSync(resolve(root, path)), `preview must remain server-only; remove client route ${path}`);
}

const route = read(routePath);
const publicRoutes = read("src/lib/public-routes.ts");
const sitemap = read("src/routes/sitemap[.]xml.ts");
const editorialStatus = read("src/data/texas-talent-editorial-status.ts");

requireCondition(
  route.includes('createFileRoute("/admin/texas-talent/preview")'),
  "public-style preview must remain inside the admin namespace",
);
requireCondition(
  route.includes("server:") && route.includes("handlers:") && route.includes("GET:"),
  "preview must remain a server response route rather than a client-rendered page",
);
requireCondition(
  route.includes('"Content-Type": "text/html; charset=utf-8"'),
  "preview must serve HTML directly from the server route",
);
requireCondition(
  route.includes('"X-Robots-Tag": "noindex, nofollow, noarchive"') && route.includes('content="noindex, nofollow, noarchive"'),
  "public-style preview must remain noindex, nofollow, noarchive at both HTTP and HTML layers",
);
requireCondition(
  route.includes('/images/editorial/texas-talent-hero.webp'),
  "preview must use the approved Texas Talent banner",
);
requireCondition(
  route.includes('The Stars of Texas Shine Bright'),
  "preview must use the canonical Texas Talent tagline",
);
requireCondition(
  route.includes('Preview only · noindex') && route.includes('Still safely behind the curtain.'),
  "preview must visibly retain its non-public status",
);
requireCondition(
  route.includes('/admin/texas-talent/${encodeURIComponent(profile.slug)}'),
  "profile cards must continue to target internal drafts",
);
requireCondition(
  !route.includes('href="/texas-talent') && !route.includes('href="https://texasdefined.com/texas-talent'),
  "preview must not link to a public Texas Talent route before launch",
);
requireCondition(
  !existsSync(resolve(root, "src/routes/texas-talent.tsx")) && !existsSync(resolve(root, "src/routes/texas-talent.lazy.tsx")),
  "public Texas Talent hub route must remain absent",
);
requireCondition(!publicRoutes.includes('"/texas-talent"'), "Texas Talent must remain outside public route classification");
requireCondition(!sitemap.includes("texas-talent"), "Texas Talent must remain absent from sitemap generation");
requireCondition(!editorialStatus.includes('launch-ready'), "preview work must not grant launch-ready editorial approval");

console.log("Texas Talent public-preview contract passed: server-only public-style experience remains hidden, noindex, non-publishing and outside the client bundle.");
