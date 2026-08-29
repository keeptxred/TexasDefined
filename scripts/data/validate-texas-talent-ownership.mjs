import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";

const root = process.cwd();
const read = (path) => readFileSync(resolve(root, path), "utf8");
const fail = (message) => {
  console.error(`Texas Talent ownership validation failed: ${message}`);
  process.exit(1);
};
const requireCondition = (condition, message) => {
  if (!condition) fail(message);
};

const iconsServerPath = "src/data/texas-icons.server.ts";
const launchPath = "src/data/texas-talent-launch.ts";
const metadataPath = "src/data/texas-talent-launch-metadata.server.ts";
const profilePreviewPath = "src/routes/admin.texas-talent.$slug.lazy.tsx";
const readinessPath = "src/data/texas-talent-readiness.ts";
const publicRoutesPath = "src/lib/public-routes.ts";
const sitemapPath = "src/routes/sitemap[.]xml.ts";

for (const path of [iconsServerPath, launchPath, metadataPath, profilePreviewPath, readinessPath, publicRoutesPath, sitemapPath]) {
  requireCondition(existsSync(resolve(root, path)), `missing required file ${path}`);
}

const iconsServer = read(iconsServerPath);
const launch = read(launchPath);
const metadata = read(metadataPath);
const profilePreview = read(profilePreviewPath);
const readiness = read(readinessPath);
const publicRoutes = read(publicRoutesPath);
const sitemap = read(sitemapPath);

requireCondition(
  iconsServer.includes("isTexasTalentPublishable") && iconsServer.includes("texasTalentFutureCanonicalPath") && iconsServer.includes("loadTexasTalentProfilesServer"),
  "Texas Icons must resolve overlapping people through the governed Texas Talent publication boundary",
);
requireCondition(
  iconsServer.indexOf("if (talentProfile)") < iconsServer.indexOf("if (researchProfile)"),
  "Texas Talent ownership must take precedence over a competing Texas Icons research profile",
);
requireCondition(
  /if \(talentProfile\) \{[\s\S]*?const publishable = isTexasTalentPublishable\(talentProfile\);[\s\S]*?href: publishable[\s\S]*?texasTalentFutureCanonicalPath\(talentProfile\.slug\)[\s\S]*?: `\/texas-icons\/\$\{entry\.slug\}`[\s\S]*?reuseKind: publishable \? "texas-talent-ready" : "texas-talent-staged"[\s\S]*?indexableAtOwnRoute: false/s.test(iconsServer),
  "overlapping Icons entries must stay on the staged Icons route until Texas Talent is explicitly publishable, then hand canonical ownership to Texas Talent without indexing a duplicate Icons biography",
);
requireCondition(
  /talentProfile:\s*talentProfile && isTexasTalentPublishable\(talentProfile\)\s*\? talentProfile\s*:\s*null/s.test(iconsServer),
  "Texas Icons detail loading must not expose a staged Texas Talent biography as public profile content",
);
requireCondition(
  metadata.includes('export const TEXAS_TALENT_FUTURE_BASE_PATH = "/texas-talent"') && metadata.includes("return `${TEXAS_TALENT_FUTURE_BASE_PATH}/${slug}`"),
  "future Texas Talent canonical ownership must remain centralized in launch metadata",
);
requireCondition(
  launch.includes('publishable: mechanicalReady && editorialApproved') && launch.includes('profile.readiness.launchStatus === "launch-ready"'),
  "Texas Talent publication must continue to require both mechanical readiness and explicit launch-ready approval",
);

for (const requiredRendererToken of ["heroImage.credit", "heroImage.licenseLabel", "heroImage.sourceUrl", "heroImage.licenseUrl", "heroImage?.rightsNote"]) {
  requireCondition(profilePreview.includes(requiredRendererToken), `hidden Talent profile preview must render image-rights field ${requiredRendererToken}`);
}
requireCondition(profilePreview.includes('rel="noreferrer"'), "external image/source attribution links must retain safe rel handling");
requireCondition(
  readiness.includes("sourceUrl: string;") && readiness.includes("licenseLabel: string;") && readiness.includes("rightsNote: string;"),
  "Texas Talent hero-image readiness must retain source, license and rights-note fields",
);

requireCondition(
  !existsSync(resolve(root, "src/routes/texas-talent.tsx")) && !existsSync(resolve(root, "src/routes/texas-talent.lazy.tsx")),
  "public Texas Talent hub must remain absent until explicit launch work",
);
requireCondition(!publicRoutes.includes('"/texas-talent"'), "Texas Talent must remain outside public route classification before launch");
requireCondition(!sitemap.includes("texas-talent"), "Texas Talent must remain outside sitemap discovery before launch");

console.log("Texas Talent ownership contract passed: overlapping Texas Icons records defer to Talent publication governance, duplicate biographies stay non-indexable, and image-rights attribution remains visible in the editorial review surface.");
