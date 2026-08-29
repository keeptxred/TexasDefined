import fs from "node:fs";

const typesPath = "src/data/texas-icons-types.ts";
const hubPath = "src/routes/texas-icons.tsx";
const profilePath = "src/routes/texas-icons_.$slug.tsx";
const failures = [];

for (const path of [typesPath, hubPath, profilePath]) if (!fs.existsSync(path)) failures.push(`Missing Texas Icons authority-link contract file: ${path}`);

if (!failures.length) {
  const types = fs.readFileSync(typesPath, "utf8");
  const hub = fs.readFileSync(hubPath, "utf8");
  const profile = fs.readFileSync(profilePath, "utf8");
  const requiredMappings = [
    ['"history-politics"', 'href: "/texas-history"'],
    ['"music-culture"', 'href: "/texas-music"'],
    ["sports:", 'href: "/sports"'],
    ['"symbols-food"', 'href: "/things-unique-to-texas"'],
  ];

  if (!types.includes("TEXAS_ICON_CATEGORY_AUTHORITY_HUBS")) failures.push("Texas Icons category authority destinations must live in shared Icons metadata.");
  for (const [category, href] of requiredMappings) if (!types.includes(category) || !types.includes(href)) failures.push(`Missing required category authority mapping: ${category} -> ${href}.`);
  if (/"business-science"\s*:\s*\{\s*href:/.test(types)) failures.push("Business & Science must not be forced to an unrelated authority hub without a dedicated editorial decision.");
  if (/"media-arts"\s*:\s*\{\s*href:/.test(types)) failures.push("Media & Arts must not be forced to an unrelated authority hub without a dedicated editorial decision.");
  if (!hub.includes("TEXAS_ICON_CATEGORY_AUTHORITY_HUBS") || !hub.includes("<CategoryAuthorityLink categoryId={category.id}")) failures.push("Texas Icons hub must render the shared category authority mapping.");
  if (hub.includes("const CATEGORY_AUTHORITY_HUBS")) failures.push("Texas Icons hub must not fork a second local authority mapping.");
  if (!profile.includes("TEXAS_ICON_CATEGORY_AUTHORITY_HUBS") || !profile.includes("const authorityHub = TEXAS_ICON_CATEGORY_AUTHORITY_HUBS[icon.category]")) failures.push("Individual Texas Icon profiles must use the shared category authority mapping.");
  if (!profile.includes("authorityHub.label") || !profile.includes("authorityHub.href")) failures.push("Individual profile pages must render the shared authority destination when one exists.");
  if (!profile.includes('type: "article"') || !profile.includes("const narrativeProfile: TexasIconNarrativeProfile")) failures.push("Category authority links must remain attached only to substantive published narrative article pages.");
  if (profile.includes('"noindex, follow, max-image-preview:large"') || profile.includes("Researched draft · noindex")) failures.push("Published Texas Icons narratives must not retain the obsolete blanket noindex treatment.");
}

if (failures.length) {
  console.error("Texas Icons category authority-link validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Texas Icons category authority-link validation passed: hub and published narrative profiles share only the four high-confidence topic bridges, while data-only rows remain excluded by the route/readiness contracts.");