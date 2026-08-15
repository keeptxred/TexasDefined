import { savePartnerInquiry } from "@/data/partner-inquiry.server";

import { fishingGuideSubmissionSchema } from "./guide-onboarding-contract";
import { fishingPlatform, fishingScope } from "./index";
import { isCompleteFishingLakeSlug } from "./slugs";

function normalizeWebUrl(value: string) {
  if (!value) return "";
  const parsed = new URL(value);
  if (parsed.protocol !== "https:" && parsed.protocol !== "http:") throw new Error("URLs must use http or https.");
  return parsed.toString();
}

function parseSourceUrls(value: string) {
  const urls = value.split(/\s+/).map((item) => item.trim()).filter(Boolean);
  if (!urls.length || urls.length > 12) throw new Error("Provide between 1 and 12 source URLs.");
  return urls.map(normalizeWebUrl);
}

export async function loadFishingGuideOnboardingOptionsServer() {
  const [lakes, species] = await Promise.all([
    fishingPlatform.lakes.list({ ...fishingScope, status: "published", limit: 5000 }),
    fishingPlatform.species.list({ ...fishingScope, status: "published", limit: 5000 }),
  ]);

  return {
    lakes: lakes.filter((lake) => isCompleteFishingLakeSlug(lake.slug)).map((lake) => ({ slug: lake.slug, name: lake.name, region: lake.region })).sort((a, b) => a.name.localeCompare(b.name)),
    species: species.map((fish) => ({ slug: fish.slug, name: fish.commonName, taxonKind: fish.taxonKind })).sort((a, b) => a.name.localeCompare(b.name)),
    policy: {
      verification: "Submission does not publish a listing. TexasDefined verifies business identity and claimed service relationships before a guide can appear publicly.",
      editorial: "A free verified listing and paid sponsorship are separate. Payment cannot buy verification, a favorable review, higher editorial rank or stronger fishery claims.",
      accuracy: "Only details supported by the guide's official website or other supplied source URLs are eligible to appear on a public listing.",
    },
  };
}

export async function saveFishingGuideSubmissionServer(input: unknown) {
  const data = fishingGuideSubmissionSchema.parse(input);
  if (data.addressLine2.trim()) return { ok: true };

  const [availableLakes, availableSpecies] = await Promise.all([
    fishingPlatform.lakes.list({ ...fishingScope, status: "published", limit: 5000 }),
    fishingPlatform.species.list({ ...fishingScope, status: "published", limit: 5000 }),
  ]);
  const lakeBySlug = new Map(availableLakes.filter((lake) => isCompleteFishingLakeSlug(lake.slug)).map((lake) => [lake.slug, lake]));
  const speciesBySlug = new Map(availableSpecies.map((fish) => [fish.slug, fish]));

  const unknownLakes = data.lakeSlugs.filter((slug) => !lakeBySlug.has(slug));
  const unknownSpecies = data.speciesSlugs.filter((slug) => !speciesBySlug.has(slug));
  if (unknownLakes.length || unknownSpecies.length) throw new Error("One or more selected fishing relationships are not eligible for submission.");

  const website = normalizeWebUrl(data.website);
  const bookingUrl = normalizeWebUrl(data.bookingUrl);
  const sourceUrls = parseSourceUrls(data.sourceUrls);
  const intentLabel = data.intent.replaceAll("-", " ");
  const lines = [
    `Fishing guide ${intentLabel}`,
    `Business: ${data.businessName}`,
    data.guideName ? `Guide: ${data.guideName}` : null,
    data.phone ? `Phone: ${data.phone}` : null,
    bookingUrl ? `Booking URL: ${bookingUrl}` : null,
    data.lakeSlugs.length ? `Complete lakes: ${data.lakeSlugs.map((slug) => lakeBySlug.get(slug)?.name).filter(Boolean).join(", ")}` : "Complete lakes: none selected",
    data.speciesSlugs.length ? `Species: ${data.speciesSlugs.map((slug) => speciesBySlug.get(slug)?.commonName).filter(Boolean).join(", ")}` : "Species: none selected",
    data.serviceRegions ? `Other service regions: ${data.serviceRegions}` : null,
    data.boatDescription ? `Boat: ${data.boatDescription}` : null,
    data.maxGuests ? `Max guests (submitted, not verified): ${data.maxGuests}` : null,
    data.startingPrice ? `Starting price (submitted, not verified): ${data.startingPrice}` : null,
    `Verification sources: ${sourceUrls.join(" | ")}`,
    data.notes ? `Notes: ${data.notes}` : null,
    "Submitter attested they are authorized to submit this listing request or factual correction.",
    "Editorial verification is separate from sponsorship and no payment is implied by this submission.",
  ].filter(Boolean);

  await savePartnerInquiry({
    contact_name: data.contactName,
    email: data.email.toLowerCase(),
    company: data.businessName,
    website: website || sourceUrls[0] || null,
    partnership_type: "other",
    message: lines.join("\n"),
    source_path: "/fishing/guides/submit",
  });

  return { ok: true };
}

export type FishingGuideOnboardingOptions = Awaited<ReturnType<typeof loadFishingGuideOnboardingOptionsServer>>;
