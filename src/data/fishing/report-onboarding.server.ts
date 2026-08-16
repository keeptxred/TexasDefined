import { savePartnerInquiry } from "@/data/partner-inquiry.server";

import { fishingReportSubmissionSchema } from "./report-onboarding-contract";
import { fishingPlatform, fishingScope } from "./index";
import { isCompleteFishingLakeSlug } from "./slugs";

function normalizeUrl(value: string) {
  const parsed = new URL(value);
  if (parsed.protocol !== "https:" && parsed.protocol !== "http:") throw new Error("URLs must use http or https.");
  return parsed.toString();
}

function parseSourceUrls(value: string) {
  const urls = value.split(/\s+/).map((item) => item.trim()).filter(Boolean);
  if (!urls.length || urls.length > 12) throw new Error("Provide between 1 and 12 source URLs.");
  return urls.map(normalizeUrl);
}

export async function loadFishingReportOnboardingOptionsServer() {
  const [lakes, species] = await Promise.all([
    fishingPlatform.lakes.list({ ...fishingScope, status: "published", limit: 5000 }),
    fishingPlatform.species.list({ ...fishingScope, status: "published", limit: 5000 }),
  ]);
  return {
    lakes: lakes.filter((lake) => isCompleteFishingLakeSlug(lake.slug)).map((lake) => ({ slug: lake.slug, name: lake.name })).sort((a, b) => a.name.localeCompare(b.name)),
    species: species.map((fish) => ({ slug: fish.slug, name: fish.commonName })).sort((a, b) => a.name.localeCompare(b.name)),
    policy: {
      publication: "Submission is private intake only. Reports publish only after contributor identity, sources, lake/species relationships and freshness rules pass editorial verification.",
      freshness: "A submitted report is a dated snapshot. TexasDefined will not silently convert it into evergreen advice or present an old report as current conditions.",
      commerce: "Contributor approval and report publication are editorial decisions. Sponsorship or payment cannot buy publication, freshness, ranking or favorable fishing claims.",
    },
  };
}

export async function saveFishingReportSubmissionServer(input: unknown) {
  const data = fishingReportSubmissionSchema.parse(input);
  if (data.addressLine2.trim()) return { ok: true };

  const reportDate = new Date(`${data.reportDate}T12:00:00Z`);
  if (Number.isNaN(reportDate.getTime())) throw new Error("Report date is invalid.");
  const now = new Date();
  if (reportDate.getTime() > now.getTime() + 24 * 60 * 60 * 1000) throw new Error("Report date cannot be in the future.");
  if (reportDate.getTime() < now.getTime() - 120 * 24 * 60 * 60 * 1000) throw new Error("Report is too old for contributor intake. Submit a report from the last 120 days.");

  const [lakes, species] = await Promise.all([
    fishingPlatform.lakes.list({ ...fishingScope, status: "published", limit: 5000 }),
    fishingPlatform.species.list({ ...fishingScope, status: "published", limit: 5000 }),
  ]);
  const lake = lakes.find((row) => row.slug === data.lakeSlug && isCompleteFishingLakeSlug(row.slug));
  if (!lake) throw new Error("Selected lake is not eligible for report intake.");
  const speciesBySlug = new Map(species.map((fish) => [fish.slug, fish]));
  if (data.speciesSlugs.some((slug) => !speciesBySlug.has(slug))) throw new Error("One or more selected species are not eligible for report intake.");

  const sourceUrls = parseSourceUrls(data.sourceUrls);
  const guideListingUrl = data.guideListingUrl ? normalizeUrl(data.guideListingUrl) : "";
  const lines = [
    `Fishing report intake: ${data.intent.replaceAll("-", " ")}`,
    `Business: ${data.businessName}`,
    guideListingUrl ? `Guide listing/source: ${guideListingUrl}` : null,
    `Lake: ${lake.name} (${lake.slug})`,
    `Species: ${data.speciesSlugs.map((slug) => speciesBySlug.get(slug)?.commonName).filter(Boolean).join(", ")}`,
    `Report date: ${data.reportDate}`,
    `Title: ${data.title}`,
    `Summary: ${data.summary}`,
    data.conditionsNotes ? `Submitted conditions notes (unverified): ${data.conditionsNotes}` : null,
    data.techniqueNotes ? `Submitted technique notes (unverified): ${data.techniqueNotes}` : null,
    `Verification sources: ${sourceUrls.join(" | ")}`,
    "Submitter attested they are authorized to provide this report and that the submission accurately represents their dated observations.",
    "Submission is not automatically published. Contributor identity, source attribution, lake/species relationships and freshness must pass editorial review.",
    "Sponsorship does not affect contributor approval, publication, freshness labels or report ordering.",
  ].filter(Boolean);

  await savePartnerInquiry({
    contact_name: data.contactName,
    email: data.email.toLowerCase(),
    company: data.businessName,
    website: guideListingUrl || sourceUrls[0] || null,
    partnership_type: "other",
    message: lines.join("\n"),
    source_path: "/fishing/reports/submit",
  });
  return { ok: true };
}

export type FishingReportOnboardingOptions = Awaited<ReturnType<typeof loadFishingReportOnboardingOptionsServer>>;
