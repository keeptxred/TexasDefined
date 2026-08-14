import fs from "node:fs";

const failures = [];
const read = (file) => fs.readFileSync(file, "utf8");
const required = [
  "src/data/fishing/local-routing.ts",
  "src/data/fishing/access-directory-data.server.ts",
  "src/data/fishing/access-directory-data.functions.ts",
  "src/data/fishing/access-profile-data.server.ts",
  "src/data/fishing/access-profile-data.functions.ts",
  "src/data/fishing/services-directory-data.server.ts",
  "src/data/fishing/services-directory-data.functions.ts",
  "src/data/fishing/service-profile-data.server.ts",
  "src/data/fishing/service-profile-data.functions.ts",
  "src/data/fishing/local-sitemap.server.ts",
  "src/components/fishing/FishingAccessDirectory.tsx",
  "src/components/fishing/FishingAccessProfile.tsx",
  "src/components/fishing/FishingServicesDirectory.tsx",
  "src/components/fishing/FishingServiceProfile.tsx",
  "src/routes/fishing.access.tsx",
  "src/routes/fishing.access.$slug.tsx",
  "src/routes/fishing.services.tsx",
  "src/routes/fishing.services.$slug.tsx",
];
for (const file of required) if (!fs.existsSync(file)) failures.push(`Missing Batch 8 fishing-local file: ${file}`);
if (!failures.length) {
  const routing = read("src/data/fishing/local-routing.ts");
  const accessServer = read("src/data/fishing/access-directory-data.server.ts");
  const accessProfile = read("src/data/fishing/access-profile-data.server.ts");
  const servicesServer = read("src/data/fishing/services-directory-data.server.ts");
  const serviceProfile = read("src/data/fishing/service-profile-data.server.ts");
  const queries = read("src/data/fishing/queries.ts");
  const accessUi = read("src/components/fishing/FishingAccessDirectory.tsx");
  const accessProfileUi = read("src/components/fishing/FishingAccessProfile.tsx");
  const servicesUi = read("src/components/fishing/FishingServicesDirectory.tsx");
  const serviceProfileUi = read("src/components/fishing/FishingServiceProfile.tsx");
  const accessRoute = read("src/routes/fishing.access.tsx");
  const accessProfileRoute = read("src/routes/fishing.access.$slug.tsx");
  const servicesRoute = read("src/routes/fishing.services.tsx");
  const serviceProfileRoute = read("src/routes/fishing.services.$slug.tsx");
  const search = read("src/data/fishing/search.ts");
  const links = read("src/data/fishing/internal-links.ts");
  const sitemap = read("src/data/fishing/sitemap.ts");
  const localSitemap = read("src/data/fishing/local-sitemap.server.ts");
  const primarySitemap = read("src/routes/sitemap[.]xml.ts");
  const publicRoutes = read("src/lib/public-routes.ts");
  const hub = read("src/routes/fishing.tsx");
  const pkg = JSON.parse(read("package.json"));

  if (!routing.includes('FISHING_ACCESS_DIRECTORY_PATH = "/fishing/access"') || !routing.includes('FISHING_SERVICES_DIRECTORY_PATH = "/fishing/services"') || !routing.includes("fishingAccessCanonicalPath") || !routing.includes("fishingServiceCanonicalPath")) failures.push("Canonical access/services routing contract incomplete.");
  for (const source of [accessServer, accessProfile, servicesServer, serviceProfile]) if (!source.includes("isFishingRecordVerified")) failures.push("A fishing-local public server loader is missing the verified/source-backed publication gate.");
  if (!accessServer.includes("entry.lakes.length === entry.point.lakeIds.length") || !accessProfile.includes("relatedLakes.length !== point.lakeIds.length")) failures.push("Access-to-lake relationship integrity gate missing.");
  if (!servicesServer.includes("entry.lakes.length === entry.service.lakeIds.length") || !serviceProfile.includes("relatedLakes.length !== service.lakeIds.length")) failures.push("Service-to-lake relationship integrity gate missing.");
  if (!serviceProfile.includes("if (tackle && business) return null")) failures.push("Cross-catalog fishing-service slug collision protection missing.");
  if ((queries.match(/filter\(isFishingRecordVerified\)/g) ?? []).length < 3) failures.push("All fishing-local public queries must enforce verification.");
  if (!accessUi.includes("does not create placeholder ramps") || !servicesUi.includes("does not invent businesses")) failures.push("Honest empty-state anti-fabrication copy missing.");
  if (!accessProfileUi.includes("not live operational status") || !accessProfileUi.includes("Water level, ramp usability, fees, gates, hours and temporary closures can change")) failures.push("Changing access-condition disclosure missing.");
  if (!serviceProfileUi.includes("does not guess current hours, inventory, rates, availability or reviews")) failures.push("Changing business-fact disclosure missing.");
  for (const field of ['name="lake"', 'name="kind"', 'name="city"', 'name="county"']) if (!accessUi.includes(field)) failures.push(`Access directory filter missing: ${field}`);
  for (const field of ['name="lake"', 'name="category"', 'name="city"', 'name="county"']) if (!servicesUi.includes(field)) failures.push(`Services directory filter missing: ${field}`);
  if (!accessServer.includes("Sponsorship never changes access ordering") || !servicesServer.includes("Sponsorship never changes service ordering")) failures.push("Editorial independence ordering rule missing.");
  for (const source of [accessUi, servicesUi]) if (!source.includes("Sponsored placement") || !source.includes('rel="noopener sponsored"')) failures.push("Sponsored placement disclosure/link semantics missing.");
  if (!serviceProfileUi.includes("payment can never change") || !accessUi.includes("can never change access recommendations")) failures.push("Paid-placement editorial-independence disclosure missing.");
  if (!accessUi.includes('fishingFoundationAnchor("lake"') || !accessProfileUi.includes('fishingFoundationAnchor("lake"') || !servicesUi.includes('fishingFoundationAnchor("lake"') || !serviceProfileUi.includes('fishingFoundationAnchor("lake"')) failures.push("Lake cross-linking missing from fishing-local surfaces.");
  if (!accessRoute.includes('createFileRoute("/fishing/access")') || !accessProfileRoute.includes('createFileRoute("/fishing/access/$slug")') || !servicesRoute.includes('createFileRoute("/fishing/services")') || !serviceProfileRoute.includes('createFileRoute("/fishing/services/$slug")')) failures.push("Fishing-local route registration incomplete.");
  for (const source of [accessRoute, servicesRoute]) for (const schema of ['"@type": "CollectionPage"', '"@type": "ItemList"', '"@type": "BreadcrumbList"']) if (!source.includes(schema)) failures.push(`Directory schema missing: ${schema}`);
  if (!accessProfileRoute.includes('"@type": "Place"') || !serviceProfileRoute.includes('"@type": "LocalBusiness"') || !accessProfileRoute.includes('"@type": "WebPage"') || !serviceProfileRoute.includes('"@type": "WebPage"')) failures.push("Fishing-local profile schema incomplete.");
  if (!search.includes("FISHING_ACCESS_DIRECTORY_PATH") || !search.includes("FISHING_SERVICES_DIRECTORY_PATH") || !search.includes("fishingAccessCanonicalPath(point.slug)") || !search.includes("fishingServiceCanonicalPath")) failures.push("Global fishing-local search discovery incomplete.");
  if (!links.includes("fishingAccessCanonicalPath(point.slug)") || !links.includes("fishingServiceCanonicalPath")) failures.push("Canonical fishing-local internal-link discovery incomplete.");
  if (!sitemap.includes("FISHING_ACCESS_DIRECTORY_PATH") || !sitemap.includes("FISHING_SERVICES_DIRECTORY_PATH") || !localSitemap.includes("filter(isFishingRecordVerified)") || !primarySitemap.includes("loadFishingLocalSitemapEntriesServer")) failures.push("Fishing-local sitemap coverage/verification gate incomplete.");
  if (!publicRoutes.includes('"/fishing/access"') || !publicRoutes.includes('"/fishing/services"')) failures.push("Fishing-local public-route governance incomplete.");
  if (!hub.includes('to="/fishing/access"') || !hub.includes('to="/fishing/services"')) failures.push("Fishing hub discovery links for Batch 8 missing.");
  for (const source of [accessUi, accessProfileUi, servicesUi, serviceProfileUi, accessRoute, accessProfileRoute, servicesRoute, serviceProfileRoute]) if (source.includes('from "@/data/fishing/index"') || source.includes("fixtures")) failures.push("Fishing-local UI/route crosses the server data boundary.");
  if (!pkg.scripts?.["fishing:validate"]?.includes("validate-fishing-local-platform.mjs")) failures.push("Batch 8 validation is not wired into npm run fishing:validate.");
}
if (failures.length) { console.error("Fishing Batch 8 local platform validation failed:"); failures.forEach((failure) => console.error(`- ${failure}`)); process.exit(1); }
console.log("Fishing Batch 8 validation passed: verified access/services publication, anti-fabrication, changing-condition disclosures, lake integrity, sponsorship separation, canonical discovery, schema/sitemap coverage and public-route governance are protected.");
