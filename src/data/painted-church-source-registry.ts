import { paintedChurchBibliography } from "./painted-church-bibliography";
import { canonicalPaintedChurchFeaturesBySlug } from "./painted-church-feature-index";
import { paintedChurchMapPointBySlug } from "./painted-church-map-points";
import { canonicalPaintedChurchProfileBySlug } from "./painted-church-profile-index";
import { paintedChurchRegisterRecordBySlug } from "./painted-church-register-evidence";
import { canonicalPaintedChurchResearchBySlug } from "./painted-church-research-index";
import { paintedChurchVisitorStatusBySlug } from "./painted-church-visitor-status";
import { expandedPaintedChurches } from "./painted-churches-expanded";

export type PaintedChurchSourceTier = "primary-official" | "archive-register" | "scholarly-public-history" | "current-organization" | "secondary-discovery";

export type PaintedChurchSourceRecord = {
  id: string;
  url: string;
  label: string;
  tier: PaintedChurchSourceTier;
  uses: string[];
  churchSlugs: string[];
  globalReference: boolean;
  creator?: string;
  date?: string;
  checkedAt?: string;
  citationNote?: string;
};

const slugify = (value: string) => value
  .toLowerCase()
  .replace(/^https?:\/\//, "")
  .replace(/[^a-z0-9]+/g, "-")
  .replace(/^-|-$/g, "")
  .slice(0, 90);

const archiveHosts = new Set([
  "npgallery.nps.gov",
  "atlas.thc.texas.gov",
  "texashistory.unt.edu",
  "www.loc.gov",
  "loc.gov",
  "txarchives.org",
]);

const scholarlyHosts = new Set([
  "www.tshaonline.org",
  "tshaonline.org",
  "sah-archipedia.org",
  "www.sah-archipedia.org",
  "austinpbs.org",
  "www.austinpbs.org",
  "www.tamucc.edu",
  "tamucc.edu",
  "blogs.baylor.edu",
  "www.baylor.edu",
  "baylor.edu",
]);

const currentOrganizationHosts = new Set([
  "www.schulenburgchamber.org", "schulenburgchamber.org",
  "annunciationcc.org", "www.annunciationcc.org",
  "ihmsatx.org", "www.ihmsatx.org",
  "stfrancistorwaco.org", "www.stfrancistorwaco.org",
  "pcusa.org", "www.pcusa.org",
  "www.umc.org", "umc.org",
  "www.archgh.org", "archgh.org",
  "www.galvestonhistory.org", "galvestonhistory.org",
  "www.austindiocese.org", "austindiocese.org",
  "amarillodiocese.org", "www.amarillodiocese.org",
  "www.stpeterlindsay.org", "stpeterlindsay.org",
  "church.stmarysfbg.com",
  "qpcatholicchurch.com", "www.qpcatholicchurch.com",
  "shcatholicchurch.org", "www.shcatholicchurch.org",
  "sscmshiner.org", "www.sscmshiner.org",
  "www.stpaulserbin.org", "stpaulserbin.org",
  "www.pannamariachurch.com", "pannamariachurch.com",
  "holytrinityofcornhill.org", "www.holytrinityofcornhill.org",
  "shpalestine.org", "www.shpalestine.org",
  "www.ststanislausbandera.com", "ststanislausbandera.com",
  "www.sacredheartcorpus.org", "sacredheartcorpus.org",
  "www.stjsa.org", "stjsa.org",
  "saintstans.org", "www.saintstans.org",
  "www.saintlouisdaycastroville.org", "saintlouisdaycastroville.org",
  "olgtx.org", "www.olgtx.org",
]);

function hostnameOf(url: string) {
  try {
    return new URL(url).hostname.toLowerCase();
  } catch {
    return "";
  }
}

function inferTier(url: string): PaintedChurchSourceTier {
  const host = hostnameOf(url);
  if (archiveHosts.has(host)) return "archive-register";
  if (scholarlyHosts.has(host) || host.endsWith(".edu")) return "scholarly-public-history";
  if (currentOrganizationHosts.has(host)) return "current-organization";
  if (host.endsWith(".gov")) return "primary-official";
  return "secondary-discovery";
}

const sourceMap = new Map<string, PaintedChurchSourceRecord>();

type AddSourceInput = {
  url?: string;
  label: string;
  use: string;
  churchSlug?: string;
  globalReference?: boolean;
  tier?: PaintedChurchSourceTier;
  creator?: string;
  date?: string;
  checkedAt?: string;
  citationNote?: string;
};

function addSource({ url, label, use, churchSlug, globalReference = false, tier, creator, date, checkedAt, citationNote }: AddSourceInput) {
  if (!url) return;
  const existing = sourceMap.get(url);
  if (existing) {
    if (!existing.uses.includes(use)) existing.uses.push(use);
    if (churchSlug && !existing.churchSlugs.includes(churchSlug)) existing.churchSlugs.push(churchSlug);
    existing.globalReference ||= globalReference;
    if (tier && existing.tier === "secondary-discovery") existing.tier = tier;
    existing.creator ??= creator;
    existing.date ??= date;
    existing.checkedAt ??= checkedAt;
    existing.citationNote ??= citationNote;
    return;
  }
  sourceMap.set(url, {
    id: `source-${slugify(url)}`,
    url,
    label,
    tier: tier ?? inferTier(url),
    uses: [use],
    churchSlugs: churchSlug ? [churchSlug] : [],
    globalReference,
    creator,
    date,
    checkedAt,
    citationNote,
  });
}

for (const church of expandedPaintedChurches) {
  addSource({ url: church.sourceUrl, label: `${church.shortName} — controlling church/property source`, use: "property identity, history or inclusion evidence", churchSlug: church.slug, checkedAt: church.sourceCheckedAt });
  addSource({ url: church.secondarySourceUrl, label: `${church.shortName} — supporting source`, use: "supporting history, designation or visitor evidence", churchSlug: church.slug, checkedAt: church.sourceCheckedAt });

  const profile = canonicalPaintedChurchProfileBySlug(church.slug);
  for (const source of profile?.sources ?? []) addSource({ url: source.url, label: source.label, use: "canonical narrative profile", churchSlug: church.slug, checkedAt: church.sourceCheckedAt });

  const research = canonicalPaintedChurchResearchBySlug(church.slug);
  for (const source of research?.sources ?? []) addSource({
    url: source.url,
    label: source.label,
    use: source.use,
    churchSlug: church.slug,
    checkedAt: church.sourceCheckedAt,
    tier: source.tier === "official" ? "primary-official" : source.tier === "historic-register" ? "archive-register" : source.tier === "scholarly" || source.tier === "public-media" ? "scholarly-public-history" : undefined,
  });

  for (const feature of canonicalPaintedChurchFeaturesBySlug(church.slug)) addSource({ url: feature.sourceUrl, label: feature.sourceLabel, use: feature.sourceDetail ?? `object-level evidence for ${feature.name}`, churchSlug: church.slug, checkedAt: church.sourceCheckedAt });

  const visitor = paintedChurchVisitorStatusBySlug.get(church.slug);
  if (visitor) addSource({
    url: visitor.controllingSourceUrl,
    label: visitor.controllingSourceLabel,
    use: `current visitor/access evidence`,
    churchSlug: church.slug,
    checkedAt: visitor.checkedAt,
    tier: visitor.evidenceScope === "historic-property-record-only" ? "archive-register" : "current-organization",
  });

  const map = paintedChurchMapPointBySlug.get(church.slug);
  if (map) addSource({ url: map.sourceUrl, label: map.sourceLabel, use: `coordinate provenance (${map.precision})`, churchSlug: church.slug, checkedAt: church.sourceCheckedAt });

  const register = paintedChurchRegisterRecordBySlug(church.slug);
  if (register) {
    addSource({ url: register.npsUrl, label: `${register.title} — National Park Service`, use: "National Register designation metadata", churchSlug: church.slug, tier: "archive-register", creator: "National Park Service / National Register of Historic Places", date: register.listed, checkedAt: church.sourceCheckedAt });
    addSource({ url: register.thcUrl, label: `${register.title} — Texas Historical Commission`, use: "state historic-register metadata", churchSlug: church.slug, tier: "archive-register", creator: "Texas Historical Commission", checkedAt: church.sourceCheckedAt });
  }
}

for (const item of paintedChurchBibliography) addSource({
  url: item.url,
  label: item.title,
  use: item.use,
  globalReference: true,
  creator: item.creator,
  date: item.year,
  citationNote: item.note,
  checkedAt: "2026-08-20",
  tier: item.type === "primary-register" || item.type === "archive" ? "archive-register" : item.type === "official-history" ? "current-organization" : item.type === "book" || item.type === "article" || item.type === "documentary" ? "scholarly-public-history" : undefined,
});

export const paintedChurchSourceRegistry = [...sourceMap.values()].sort((a, b) => a.label.localeCompare(b.label));
export const paintedChurchSourceRegistryById = new Map(paintedChurchSourceRegistry.map((source) => [source.id, source]));

export function paintedChurchSourcesForChurch(slug: string) {
  return paintedChurchSourceRegistry.filter((source) => source.churchSlugs.includes(slug));
}
