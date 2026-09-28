import type { ShowcaseLakePrototype } from "./showcase-lakes-prototype";
import type { FishingSeason, FishingSource, LakeSpeciesProfile, LakeTechniqueProfile } from "./types";

const publishedTechniqueAliases: Readonly<Record<string, string>> = {
  "soft plastics": "soft-plastics",
  "crankbaits": "crankbaits",
  "lipless crankbaits": "crankbaits",
  "small crankbaits": "crankbaits",
  "spinnerbaits": "spinnerbaits",
  "topwater": "topwater",
  "trolling": "trolling",
  "vertical jigging": "vertical-jigging",
  "jigging spoons": "vertical-jigging",
  "live bait": "live-bait",
  "live shad": "live-bait",
  "live baitfish": "live-bait",
  "cut bait": "cut-bait",
};

const crappieTechniqueAliases = new Set(["jigs", "minnows", "live minnows"]);

function normalizeTechniqueLabel(value: string) {
  return value.trim().toLowerCase().replace(/\s+/g, " ");
}

function publishedTechniqueId(label: string, speciesId: string) {
  const normalized = normalizeTechniqueLabel(label);
  const direct = publishedTechniqueAliases[normalized];
  if (direct) return direct;
  if (crappieTechniqueAliases.has(normalized) && speciesId.includes("crappie")) return "jigs-and-minnows";
  return null;
}

function uniqueSources(sources: FishingSource[]) {
  return [...new Map(sources.map((source) => [source.url, source])).values()];
}

function newestDate(values: Array<string | undefined>) {
  return values.filter((value): value is string => Boolean(value)).sort().at(-1);
}

function inferPrototypeSeasons(labels: string[]): FishingSeason[] {
  const seasons = new Set<FishingSeason>();
  const monthToSeason: Array<[RegExp, FishingSeason]> = [
    [/\b(?:december|january|february|dec|jan|feb)\b/i, "winter"],
    [/\b(?:march|april|may|mar|apr)\b/i, "spring"],
    [/\b(?:june|july|august|jun|jul|aug)\b/i, "summer"],
    [/\b(?:september|october|november|sep|sept|oct|nov)\b/i, "fall"],
  ];

  for (const label of labels) {
    const lower = label.toLowerCase();
    if (lower.includes("year-round") || lower.includes("all year") || lower.includes("rest of year")) seasons.add("year-round");
    if (lower.includes("spring")) seasons.add("spring");
    if (lower.includes("summer")) seasons.add("summer");
    if (lower.includes("fall") || lower.includes("autumn")) seasons.add("fall");
    if (lower.includes("winter")) seasons.add("winter");
    for (const [pattern, season] of monthToSeason) if (pattern.test(lower)) seasons.add(season);
  }

  return [...seasons];
}

function sourceForPrototype(prototype: ShowcaseLakePrototype): FishingSource {
  const preferred = prototype.sources.tpwdLake ?? Object.values(prototype.sources)[0];
  return {
    id: `prototype-technique-${prototype.slug}`,
    name: preferred?.label ?? `${prototype.overview.name} fishing source`,
    url: preferred?.url ?? "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/",
    checkedAt: prototype.verifiedAt,
    sourceType: preferred?.url?.includes("tpwd.texas.gov") ? "state" : "editorial",
  };
}

function speciesSeasons(
  lakeId: string,
  speciesId: string,
  fishSeasonLabels: string[],
  lakeSpecies: LakeSpeciesProfile[],
): FishingSeason[] {
  const fromRelationship = lakeSpecies
    .filter((profile) => profile.lakeId === lakeId && profile.speciesId === speciesId)
    .flatMap((profile) => profile.seasonalPatterns.map((pattern) => pattern.season));

  const inferred = inferPrototypeSeasons(fishSeasonLabels);
  const combined = [...new Set([...fromRelationship, ...inferred])];
  return combined.length ? combined : ["year-round"];
}

export function derivePrototypeTechniqueProfiles(
  prototypes: ShowcaseLakePrototype[],
  lakeSpecies: LakeSpeciesProfile[],
): LakeTechniqueProfile[] {
  const grouped = new Map<string, {
    lakeId: string;
    techniqueId: string;
    techniqueLabel: string;
    speciesIds: Set<string>;
    seasons: Set<FishingSeason>;
    summaries: string[];
    verifiedAt: string;
    source: FishingSource;
    lakeName: string;
  }>();

  for (const prototype of prototypes) {
    const source = sourceForPrototype(prototype);
    for (const fish of prototype.fish) {
      for (const techniqueLabel of fish.techniques) {
        const techniqueId = publishedTechniqueId(techniqueLabel, fish.id);
        if (!techniqueId) continue;

        const key = `${prototype.slug}|${techniqueId}`;
        const current = grouped.get(key) ?? {
          lakeId: prototype.slug,
          techniqueId,
          techniqueLabel,
          speciesIds: new Set<string>(),
          seasons: new Set<FishingSeason>(),
          summaries: [],
          verifiedAt: prototype.verifiedAt,
          source,
          lakeName: prototype.overview.name,
        };

        current.speciesIds.add(fish.id);
        for (const season of speciesSeasons(
          prototype.slug,
          fish.id,
          fish.seasons.map((season) => season.label),
          lakeSpecies,
        )) current.seasons.add(season);
        current.summaries.push(`${fish.name}: ${fish.summary}`);
        current.verifiedAt = newestDate([current.verifiedAt, prototype.verifiedAt]) ?? prototype.verifiedAt;
        grouped.set(key, current);
      }
    }
  }

  return [...grouped.values()].map((row) => ({
    id: `prototype-${row.lakeId}-${row.techniqueId}`,
    lakeId: row.lakeId,
    techniqueId: row.techniqueId,
    speciesIds: [...row.speciesIds],
    seasons: [...row.seasons],
    summary: `${row.techniqueLabel} is documented in the verified ${row.lakeName} fishery profile. ${row.summaries.join(" ")}`,
    verifiedAt: row.verifiedAt,
    sources: [row.source],
  }));
}

export function reconcileLakeTechniqueProfiles(
  explicitProfiles: LakeTechniqueProfile[],
  prototypeProfiles: LakeTechniqueProfile[],
): LakeTechniqueProfile[] {
  const reconciled = new Map<string, LakeTechniqueProfile>();

  for (const profile of explicitProfiles) {
    reconciled.set(`${profile.lakeId}|${profile.techniqueId}`, {
      ...profile,
      speciesIds: [...profile.speciesIds],
      seasons: [...profile.seasons],
      sources: [...profile.sources],
    });
  }

  for (const prototypeProfile of prototypeProfiles) {
    const key = `${prototypeProfile.lakeId}|${prototypeProfile.techniqueId}`;
    const existing = reconciled.get(key);
    if (!existing) {
      reconciled.set(key, prototypeProfile);
      continue;
    }

    reconciled.set(key, {
      ...existing,
      speciesIds: [...new Set([...existing.speciesIds, ...prototypeProfile.speciesIds])],
      seasons: [...new Set([...existing.seasons, ...prototypeProfile.seasons])],
      verifiedAt: newestDate([existing.verifiedAt, prototypeProfile.verifiedAt]),
      sources: uniqueSources([...existing.sources, ...prototypeProfile.sources]),
    });
  }

  return [...reconciled.values()];
}
