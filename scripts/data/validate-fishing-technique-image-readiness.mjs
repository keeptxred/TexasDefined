import fs from "node:fs";
import { fishingTechniqueImages, isFishingTechniqueHeroReady } from "../../src/data/fishing/technique-images.ts";
import { PUBLISHED_FISHING_TECHNIQUE_SLUGS } from "../../src/data/fishing/technique-routing.ts";

const server = fs.readFileSync("src/data/fishing/technique-data.server.ts", "utf8");
const sitemap = fs.readFileSync("src/data/fishing/sitemap.ts", "utf8");
const seo = fs.readFileSync("src/lib/seo.ts", "utf8");
const governance = fs.readFileSync("docs/site-image-governance.md", "utf8");
const failures = [];

const ready = PUBLISHED_FISHING_TECHNIQUE_SLUGS.filter((slug) => isFishingTechniqueHeroReady(slug));
const pending = PUBLISHED_FISHING_TECHNIQUE_SLUGS.filter((slug) => !isFishingTechniqueHeroReady(slug));

for (const slug of ready) {
  const image = fishingTechniqueImages[slug]?.hero;
  if (!image) {
    failures.push(`${slug}: ready helper returned true without a hero`);
    continue;
  }
  if (image.width < 1200) failures.push(`${slug}: hero width ${image.width}px is below the 1200px Discover floor`);
  if (image.height < 630) failures.push(`${slug}: hero height ${image.height}px is below the social-preview floor`);
  if (!image.alt.trim()) failures.push(`${slug}: hero alt text is blank`);
  if (/\.svg(?:\?|$)/i.test(image.src)) failures.push(`${slug}: SVG cannot be used as an editorial hero`);
  if (image.sourceType === "wikimedia") {
    if (!image.sourceUrl?.startsWith("https://commons.wikimedia.org/")) failures.push(`${slug}: Wikimedia hero is missing its Commons source URL`);
    if (!image.licenseLabel?.trim() || !image.licenseUrl?.startsWith("https://")) failures.push(`${slug}: Wikimedia hero is missing structured license metadata`);
  }
  if (image.sourceType === "ai-generated" && (!image.generator?.trim() || !image.generatedAt?.trim())) {
    failures.push(`${slug}: AI hero is missing generator/date provenance`);
  }
}

for (const [slug, images] of Object.entries(fishingTechniqueImages)) {
  if (images.hero && PUBLISHED_FISHING_TECHNIQUE_SLUGS.includes(slug) && !isFishingTechniqueHeroReady(slug)) {
    failures.push(`${slug}: a hero is registered but is not Discover/social ready`);
  }
}

if (ready.length !== PUBLISHED_FISHING_TECHNIQUE_SLUGS.length) failures.push(`Every published fishing technique must have a governed Discover-ready hero (${ready.length}/${PUBLISHED_FISHING_TECHNIQUE_SLUGS.length} ready; missing: ${pending.join(", ") || "none"}).`);
if (!server.includes('robots: imageReady ? undefined : "noindex, follow, max-image-preview:large"')) failures.push("Fishing technique profiles must fail closed when the hero is not image-ready.");
if (!server.includes('imageReady && images?.hero')) failures.push("Fishing technique social/schema image output must be gated by image readiness.");
if (!sitemap.includes('.filter((slug) => isFishingTechniqueHeroReady(slug))')) failures.push("Fishing technique sitemap entries must exclude image-incomplete profiles.");
for (const marker of ["og:image", "twitter:image", "max-image-preview:large"]) {
  if (!seo.includes(marker)) failures.push(`Shared SEO metadata is missing ${marker}.`);
}
for (const marker of ["Exact-subject reusable real image", "missing, blank, broken", "must not be emitted in an indexable sitemap"]) {
  if (!governance.includes(marker)) failures.push(`Image governance marker missing: ${marker}`);
}

if (failures.length) {
  console.error(`Fishing technique image/Discover readiness failed with ${failures.length} issue(s):`);
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(`Fishing technique image readiness passed: ${ready.length}/${PUBLISHED_FISHING_TECHNIQUE_SLUGS.length} Discover-ready; ${pending.length} pending (${pending.join(", ") || "none"}).`);