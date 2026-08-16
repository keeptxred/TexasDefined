import fs from "node:fs";

const failures = [];
const read = (file) => fs.readFileSync(file, "utf8");
const required = [
  "src/data/fishing/report-routing.ts",
  "src/data/fishing/report-validation.ts",
  "src/data/fishing/report-directory-data.server.ts",
  "src/data/fishing/report-directory-data.functions.ts",
  "src/data/fishing/report-profile-data.server.ts",
  "src/data/fishing/report-profile-data.functions.ts",
  "src/data/fishing/report-sitemap.server.ts",
  "src/data/fishing/report-onboarding-contract.ts",
  "src/data/fishing/report-onboarding.server.ts",
  "src/data/fishing/report-onboarding.functions.ts",
  "src/components/fishing/FishingReportDirectory.tsx",
  "src/components/fishing/FishingReportProfile.tsx",
  "src/components/fishing/FishingReportOnboardingForm.tsx",
  "src/routes/fishing.reports.tsx",
  "src/routes/fishing.reports.lazy.tsx",
  "src/routes/fishing.reports.$slug.tsx",
  "src/routes/fishing.reports.submit.tsx",
  "src/routes/fishing.reports.submit.lazy.tsx",
];
for (const file of required) if (!fs.existsSync(file)) failures.push(`Missing fishing-report platform file: ${file}`);
if (!failures.length) {
  const types = read("src/data/fishing/types.ts"); const repositories = read("src/data/fishing/repositories.ts"); const reportValidation = read("src/data/fishing/report-validation.ts"); const routing = read("src/data/fishing/report-routing.ts"); const directoryServer = read("src/data/fishing/report-directory-data.server.ts"); const profileServer = read("src/data/fishing/report-profile-data.server.ts"); const directoryFn = read("src/data/fishing/report-directory-data.functions.ts"); const profileFn = read("src/data/fishing/report-profile-data.functions.ts"); const directoryUi = read("src/components/fishing/FishingReportDirectory.tsx"); const profileUi = read("src/components/fishing/FishingReportProfile.tsx"); const onboardingContract = read("src/data/fishing/report-onboarding-contract.ts"); const onboardingServer = read("src/data/fishing/report-onboarding.server.ts"); const onboardingFn = read("src/data/fishing/report-onboarding.functions.ts"); const onboardingUi = read("src/components/fishing/FishingReportOnboardingForm.tsx"); const directoryRoute = read("src/routes/fishing.reports.tsx"); const directoryLazy = read("src/routes/fishing.reports.lazy.tsx"); const profileRoute = read("src/routes/fishing.reports.$slug.tsx"); const submitRoute = read("src/routes/fishing.reports.submit.tsx"); const submitLazy = read("src/routes/fishing.reports.submit.lazy.tsx"); const search = read("src/data/fishing/search.ts"); const links = read("src/data/fishing/internal-links.ts"); const sitemap = read("src/data/fishing/sitemap.ts"); const sitemapServer = read("src/data/fishing/report-sitemap.server.ts"); const primarySitemap = read("src/routes/sitemap[.]xml.ts"); const publicRoutes = read("src/lib/public-routes.ts"); const partnerServer = read("src/data/partner-inquiry.server.ts"); const pkg = JSON.parse(read("package.json"));
  if (!types.includes("interface FishingReport") || !repositories.includes("FishingReportQuery")) failures.push("Existing FishingReport repository architecture was not reused.");
  for (const signal of ["report-published-at", "report-expiry", "report-future", "report-species-lake", "report-contributor-verification"]) if (!reportValidation.includes(signal)) failures.push(`Permanent report integrity validation missing: ${signal}`);
  if (!reportValidation.includes("isFishingRecordVerified(report)") || !reportValidation.includes('source.sourceType === "contributor"')) failures.push("Source-backed report/contributor verification gate incomplete.");
  if (!routing.includes('FISHING_REPORTS_DIRECTORY_PATH = "/fishing/reports"') || !routing.includes("fishingReportCanonicalPath") || !routing.includes('"current" | "stale" | "expired"')) failures.push("Canonical report routing/freshness contract incomplete.");
  if (!directoryServer.includes("isPublicFishingReportValid") || !profileServer.includes("isPublicFishingReportValid") || !sitemapServer.includes("isPublicFishingReportValid")) failures.push("Public report surfaces do not share the integrity gate.");
  if (!directoryUi.includes("does not create placeholder bite reports") || !profileUi.includes("not a live bite claim") || !profileUi.includes("old observations forward as current facts")) failures.push("Anti-fabrication/freshness disclosure missing.");
  if (!directoryUi.includes('name="lake"') || !directoryUi.includes('name="species"') || !directoryUi.includes('name="freshness"')) failures.push("Fishing report filters incomplete.");
  if (!profileServer.includes("guide.contributorApproved") || !profileUi.includes("verified, contributor-approved guide")) failures.push("Verified guide contributor attribution gate missing.");
  if (!directoryServer.includes("Sponsorship never changes report order") || !directoryUi.includes("Sponsored placement") || !directoryUi.includes('rel="noopener sponsored"') || !profileUi.includes("Sponsored status can never change")) failures.push("Report sponsorship/editorial independence disclosure missing.");
  if (!directoryUi.includes('fishingFoundationAnchor("lake"') || !directoryUi.includes('fishingFoundationAnchor("species"') || !profileUi.includes('fishingFoundationAnchor("lake"') || !profileUi.includes('fishingFoundationAnchor("species"')) failures.push("Report lake/species cross-linking missing.");
  if (!directoryRoute.includes('createFileRoute("/fishing/reports")') || !profileRoute.includes('createFileRoute("/fishing/reports/$slug")') || !directoryRoute.includes("canonicalLink") || !profileRoute.includes("canonicalLink")) failures.push("Report canonical route integrity missing.");
  if (!directoryLazy.includes('createLazyFileRoute("/fishing/reports")') || directoryRoute.includes("lazy(") || directoryRoute.includes("Suspense")) failures.push("Report directory must use a native TanStack lazy route boundary.");
  for (const schema of ['"@type": "CollectionPage"', '"@type": "ItemList"', '"@type": "BreadcrumbList"']) if (!directoryRoute.includes(schema)) failures.push(`Directory schema missing: ${schema}`);
  for (const schema of ['"@type": "WebPage"', '"@type": "Article"', '"@type": "BreadcrumbList"']) if (!profileRoute.includes(schema)) failures.push(`Profile schema missing: ${schema}`);
  if (!profileRoute.includes('freshness === "expired"') || !profileRoute.includes('content: "noindex, follow"')) failures.push("Expired-report indexation protection missing.");
  if (!search.includes("FISHING_REPORTS_DIRECTORY_PATH") || !search.includes("fishingReportCanonicalPath(report.slug)")) failures.push("Global report search discovery missing.");
  if (!links.includes("fishingReportCanonicalPath(report.slug)")) failures.push("Canonical report internal-link discovery missing.");
  if (!sitemap.includes("FISHING_REPORTS_DIRECTORY_PATH") || !sitemapServer.includes('fishingReportFreshness(report) !== "expired"') || !primarySitemap.includes("loadFishingReportSitemapEntriesServer") || !primarySitemap.includes("...fishingReportSitemapEntries")) failures.push("Report sitemap coverage/freshness gating incomplete.");
  if (!publicRoutes.includes('"/fishing/reports"')) failures.push("Report directory missing public-route governance.");
  if (!directoryFn.includes("createServerFn") || !profileFn.includes("createServerFn") || !profileFn.includes("inputValidator")) failures.push("Report server/client boundary incomplete.");
  for (const source of [directoryUi, profileUi, directoryRoute, profileRoute]) if (source.includes('from "@/data/fishing/index"') || source.includes("fixtures") || source.includes("repositories")) failures.push("Fishing report UI/route crosses server data boundary.");

  for (const marker of ["submit-report", "request-contributor-approval", "sourceUrls", "accuracyAttested", "authorized"]) if (!onboardingContract.includes(marker)) failures.push(`Report intake schema missing ${marker}.`);
  for (const marker of ["fishingReportSubmissionSchema.parse(input)", "isCompleteFishingLakeSlug", "120 * 24 * 60 * 60 * 1000", "parseSourceUrls", 'source_path: "/fishing/reports/submit"', "Submission is not automatically published", "Sponsorship does not affect contributor approval"]) if (!onboardingServer.includes(marker)) failures.push(`Report intake server verification missing ${marker}.`);
  if (!onboardingServer.includes("savePartnerInquiry") || !partnerServer.includes("partner_inquiries")) failures.push("Report intake must persist privately through the existing inquiry store.");
  if (onboardingServer.includes("fishingPlatform.reports.create") || onboardingServer.includes("fishingPlatform.reports.upsert")) failures.push("Report intake must never write public report records automatically.");
  if (!onboardingFn.includes("createServerFn") || !onboardingFn.includes('await import("./report-onboarding.server")')) failures.push("Report intake server function boundary is incomplete.");
  for (const marker of ["Submit a dated fishing report for verification", "not instant publishing", "Verification source URLs", "accurate to the best of my knowledge", "paid sponsorship inquiry never substitutes"]) if (!onboardingUi.includes(marker)) failures.push(`Report contributor UI missing policy marker: ${marker}`);
  if (!directoryUi.includes('to="/fishing/reports/submit"') || !directoryUi.includes("Submit a report or request contributor approval")) failures.push("Report directory does not expose contributor intake.");
  if (!submitRoute.includes('createFileRoute("/fishing/reports/submit")') || !submitRoute.includes('content: "noindex, follow"') || !submitLazy.includes('createLazyFileRoute("/fishing/reports/submit")')) failures.push("Report submission route must be noindex and native-lazy.");
  if (!publicRoutes.includes('"/fishing/reports/submit"')) failures.push("Report submission route missing non-indexable public-route governance.");

  if (!pkg.scripts?.["fishing:validate"]?.includes("validate-fishing-guide-platform.mjs") || !pkg.scripts?.["fishing:validate"]?.includes("validate-fishing-report-platform.mjs")) failures.push("Fishing guide and report validation must both be wired into npm run fishing:validate.");
}
if (failures.length) { console.error("Fishing report platform validation failed:"); failures.forEach((failure) => console.error(`- ${failure}`)); process.exit(1); }
console.log("Fishing report platform validation passed: source-backed publication, contributor intake, private persistence, anti-fabrication, freshness/expiry, lake/species integrity, sponsorship independence, native lazy routing and client/server boundaries are protected.");
