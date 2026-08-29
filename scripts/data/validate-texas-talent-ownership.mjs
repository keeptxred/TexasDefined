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
const iconsRoutePath = "src/routes/texas-icons_.$slug.tsx";
const launchPath = "src/data/texas-talent-launch.ts";
const metadataPath = "src/data/texas-talent-launch-metadata.server.ts";
const profilePreviewPath = "src/routes/admin.texas-talent.$slug.lazy.tsx";
const readinessPath = "src/data/texas-talent-readiness.ts";
const publicRoutesPath = "src/lib/public-routes.ts";
const sitemapPath = "src/routes/sitemap[.]xml.ts";
const iconsSitemapPath = "src/routes/sitemap-texas-icons[.]xml.ts";

for (const path of [iconsServerPath, iconsRoutePath, launchPath, metadataPath, profilePreviewPath, readinessPath, publicRoutesPath, sitemapPath, iconsSitemapPath]) {
  requireCondition(existsSync(resolve(root, path)), `missing required file ${path}`);
}

const iconsServer = read(iconsServerPath);
const iconsRoute = read(iconsRoutePath);
const launch = read(launchPath);
const metadata = read(metadataPath);
const profilePreview = read(profilePreviewPath);
const readiness = read(readinessPath);
const publicRoutes = read(publicRoutesPath);
const sitemap = read(sitemapPath);
const iconsSitemap = read(iconsSitemapPath);

requireCondition(
  iconsServer.includes("isTexasTalentPublishable") && iconsServer.includes("texasTalentFutureCanonicalPath") && iconsServer.includes("loadTexasTalentProfilesServer"),
  "Texas Icons must resolve overlapping people through governed Texas Talent canonical ownership",
);
requireCondition(
  iconsServer.indexOf("if (talentProfile)") < iconsServer.indexOf("if (researchProfile)"),
  "Texas Talent ownership must take precedence over a competing Texas Icons research profile",
);
requireCondition(
  /if \(talentProfile\) \{[\s\S]*?const publishable = isTexasTalentPublishable\(talentProfile\);[\s\S]*?href: publishable[\s\S]*?texasTalentFutureCanonicalPath\(talentProfile\.slug\)[\s\S]*?: `\/texas-icons\/\$\{entry\.slug\}`[\s\S]*?reuseKind: publishable \? "texas-talent-ready" : "texas-talent-staged"[\s\S]*?indexableAtOwnRoute: !publishable[\s\S]*?summary: talentProfile\.dek/s.test(iconsServer),
  "completed Talent narratives must publish at the stable Icons route until the dedicated Talent route becomes the stronger canonical owner",
);
requireCondition(
  /talentProfile:\s*talentProfile && \(isTexasTalentPublishable\(talentProfile\) \|\| resolved\.reuseKind === "texas-talent-staged"\)\s*\? talentProfile\s*:\s*null/s.test(iconsServer),
  "Texas Icons detail loading must expose the written Talent narrative while Icons temporarily owns publication",
);
requireCondition(
  iconsRoute.includes("Published from Texas Talent research") && iconsRoute.includes('type: "article"'),
  "published Talent narratives on Texas Icons must render as article pages rather than hidden editorial drafts",
);
requireCondition(
  iconsSitemap.includes("icon.indexableAtOwnRoute") && iconsSitemap.includes("/texas-icons/${icon.slug}"),
  "temporary Icons-owned Talent narratives must be discoverable through the governed Texas Icons sitemap",
);
requireCondition(
  metadata.includes('export const TEXAS_TALENT_FUTURE_BASE_PATH = "/texas-talent"') && metadata.includes("return `${TEXAS_TALENT_FUTURE_BASE_PATH}/${slug}`"),
  "future Texas Talent canonical ownership must remain centralized in launch metadata",
);
requireCondition(
  launch.includes('publishable: mechanicalReady && editorialApproved') && launch.includes('profile.readiness.launchStatus === "launch-ready"'),
  "handoff to the dedicated Texas Talent canonical route must continue to require mechanical readiness and explicit launch approval",
);

for (const requiredRendererToken of ["heroImage.credit", "heroImage.licenseLabel", "heroImage.sourceUrl", "heroImage.licenseUrl", "heroImage?.rightsNote"]) {
  requireCondition(profilePreview.includes(requiredRendererToken), `hidden Talent admin preview must render image-rights field ${requiredRendererToken}`);
}
requireCondition(profilePreview.includes('rel="noreferrer"'), "external image/source attribution links must retain safe rel handling");
requireCondition(
  readiness.includes("sourceUrl: string;") && readiness.includes("licenseLabel: string;") && readiness.includes("rightsNote: string;"),
  "Texas Talent hero-image readiness must retain source, license and rights-note fields",
);

requireCondition(
  !existsSync(resolve(root, "src/routes/texas-talent.tsx")) && !existsSync(resolve(root, "src/routes/texas-talent.lazy.tsx")),
  "the dedicated Texas Talent hub must remain absent until explicit launch work; written overlaps publish through Texas Icons in the meantime",
);
requireCondition(!publicRoutes.includes('"/texas-talent"'), "the unlaunched Texas Talent route family must remain outside public route classification");
requireCondition(!sitemap.includes("texas-talent"), "the unlaunched Texas Talent route family must remain outside the primary sitemap");

console.log("Texas Talent ownership contract passed: written overlapping biographies publish through Texas Icons now, future Talent canonical handoff remains governed, duplicate biographies stay prevented, and image-rights metadata remains intact.");
