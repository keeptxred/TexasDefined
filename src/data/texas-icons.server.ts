import { loadTexasKnowledgeGraph } from "@/data/knowledge-graph";
import { canonicalEntityPath, isIndexableEntityPage } from "@/data/knowledge-graph/relationships";
import type { TexasEntityRecord } from "@/data/knowledge-graph/types";
import { TEXAS_ICON_RESEARCH_HISTORY_BATCH_1 } from "@/data/texas-icons-research-history-1.server";
import { TEXAS_ICON_RESEARCH_HISTORY_BATCH_2 } from "@/data/texas-icons-research-history-2.server";
import { TEXAS_ICON_RESEARCH_HISTORY_BATCH_3 } from "@/data/texas-icons-research-history-3.server";
import { TEXAS_ICON_RESEARCH_HISTORY_BATCH_4 } from "@/data/texas-icons-research-history-4.server";
import { TEXAS_ICON_RESEARCH_HISTORY_BATCH_5 } from "@/data/texas-icons-research-history-5.server";
import { TEXAS_ICON_RESEARCH_HISTORY_BATCH_6 } from "@/data/texas-icons-research-history-6.server";
import { TEXAS_ICON_RESEARCH_HISTORY_BATCH_7 } from "@/data/texas-icons-research-history-7.server";
import { TEXAS_ICON_RESEARCH_HISTORY_BATCH_8 } from "@/data/texas-icons-research-history-8.server";
import { TEXAS_ICON_RESEARCH_HISTORY_BATCH_9 } from "@/data/texas-icons-research-history-9.server";
import { TEXAS_ICON_RESEARCH_HISTORY_BATCH_10 } from "@/data/texas-icons-research-history-10.server";
import { TEXAS_ICON_RESEARCH_MUSIC_BATCH_1 } from "@/data/texas-icons-research-music-1.server";
import { TEXAS_ICON_RESEARCH_MUSIC_BATCH_2 } from "@/data/texas-icons-research-music-2.server";
import { TEXAS_ICON_RESEARCH_MUSIC_BATCH_3 } from "@/data/texas-icons-research-music-3.server";
import { TEXAS_ICON_RESEARCH_MUSIC_BATCH_4 } from "@/data/texas-icons-research-music-4.server";
import { TEXAS_ICON_RESEARCH_MUSIC_BATCH_5 } from "@/data/texas-icons-research-music-5.server";
import { TEXAS_ICON_RESEARCH_SPORTS_BATCH_1 } from "@/data/texas-icons-research-sports-1.server";
import { TEXAS_ICON_RESEARCH_SPORTS_BATCH_2 } from "@/data/texas-icons-research-sports-2.server";
import { TEXAS_ICON_RESEARCH_SPORTS_BATCH_3 } from "@/data/texas-icons-research-sports-3.server";
import { TEXAS_ICON_RESEARCH_SPORTS_BATCH_4 } from "@/data/texas-icons-research-sports-4.server";
import { TEXAS_ICON_RESEARCH_SPORTS_BATCH_5 } from "@/data/texas-icons-research-sports-5.server";
import { TEXAS_ICON_RESEARCH_BUSINESS_BATCH_1 } from "@/data/texas-icons-research-business-1.server";
import { TEXAS_ICON_RESEARCH_BUSINESS_BATCH_2 } from "@/data/texas-icons-research-business-2.server";
import { TEXAS_ICON_RESEARCH_BUSINESS_BATCH_3 } from "@/data/texas-icons-research-business-3.server";
import { TEXAS_ICON_RESEARCH_BUSINESS_BATCH_4 } from "@/data/texas-icons-research-business-4.server";
import { TEXAS_ICON_RESEARCH_MEDIA_BATCH_1 } from "@/data/texas-icons-research-media-1.server";
import { TEXAS_ICON_RESEARCH_MEDIA_BATCH_2 } from "@/data/texas-icons-research-media-2.server";
import { TEXAS_ICON_RESEARCH_MEDIA_BATCH_3 } from "@/data/texas-icons-research-media-3.server";
import { TEXAS_ICON_RESEARCH_MEDIA_BATCH_4 } from "@/data/texas-icons-research-media-4.server";
import { TEXAS_ICON_RESEARCH_SYMBOLS_BATCH_1 } from "@/data/texas-icons-research-symbols-1.server";
import { TEXAS_ICON_RESEARCH_SYMBOLS_BATCH_2 } from "@/data/texas-icons-research-symbols-2.server";
import { TEXAS_ICON_RESEARCH_SYMBOLS_BATCH_3 } from "@/data/texas-icons-research-symbols-3.server";
import { isTexasTalentPublishable } from "@/data/texas-talent-launch";
import { texasTalentFutureCanonicalPath } from "@/data/texas-talent-launch-metadata.server";
import { loadTexasTalentProfilesServer } from "@/data/texas-talent.server";
import {
  getRelatedTexasIcons,
  getTexasIconBySlug,
  normalizeTexasIconKey,
  TEXAS_ICON_ROSTER,
} from "@/data/texas-icons-roster.server";
import {
  TEXAS_ICON_CATEGORIES,
  type TexasIconResearchProfile,
  type TexasIconRosterEntry,
} from "@/data/texas-icons-types";

const TEXAS_ICON_RESEARCH_PROFILES: readonly TexasIconResearchProfile[] = [
  ...TEXAS_ICON_RESEARCH_HISTORY_BATCH_1,
  ...TEXAS_ICON_RESEARCH_HISTORY_BATCH_2,
  ...TEXAS_ICON_RESEARCH_HISTORY_BATCH_3,
  ...TEXAS_ICON_RESEARCH_HISTORY_BATCH_4,
  ...TEXAS_ICON_RESEARCH_HISTORY_BATCH_5,
  ...TEXAS_ICON_RESEARCH_HISTORY_BATCH_6,
  ...TEXAS_ICON_RESEARCH_HISTORY_BATCH_7,
  ...TEXAS_ICON_RESEARCH_HISTORY_BATCH_8,
  ...TEXAS_ICON_RESEARCH_HISTORY_BATCH_9,
  ...TEXAS_ICON_RESEARCH_HISTORY_BATCH_10,
  ...TEXAS_ICON_RESEARCH_MUSIC_BATCH_1,
  ...TEXAS_ICON_RESEARCH_MUSIC_BATCH_2,
  ...TEXAS_ICON_RESEARCH_MUSIC_BATCH_3,
  ...TEXAS_ICON_RESEARCH_MUSIC_BATCH_4,
  ...TEXAS_ICON_RESEARCH_MUSIC_BATCH_5,
  ...TEXAS_ICON_RESEARCH_SPORTS_BATCH_1,
  ...TEXAS_ICON_RESEARCH_SPORTS_BATCH_2,
  ...TEXAS_ICON_RESEARCH_SPORTS_BATCH_3,
  ...TEXAS_ICON_RESEARCH_SPORTS_BATCH_4,
  ...TEXAS_ICON_RESEARCH_SPORTS_BATCH_5,
  ...TEXAS_ICON_RESEARCH_BUSINESS_BATCH_1,
  ...TEXAS_ICON_RESEARCH_BUSINESS_BATCH_2,
  ...TEXAS_ICON_RESEARCH_BUSINESS_BATCH_3,
  ...TEXAS_ICON_RESEARCH_BUSINESS_BATCH_4,
  ...TEXAS_ICON_RESEARCH_MEDIA_BATCH_1,
  ...TEXAS_ICON_RESEARCH_MEDIA_BATCH_2,
  ...TEXAS_ICON_RESEARCH_MEDIA_BATCH_3,
  ...TEXAS_ICON_RESEARCH_MEDIA_BATCH_4,
  ...TEXAS_ICON_RESEARCH_SYMBOLS_BATCH_1,
  ...TEXAS_ICON_RESEARCH_SYMBOLS_BATCH_2,
  ...TEXAS_ICON_RESEARCH_SYMBOLS_BATCH_3,
];

export type TexasIconReuseKind =
  | "editorial-canonical"
  | "knowledge-graph"
  | "texas-talent-ready"
  | "texas-talent-staged"
  | "icon-research-staged"
  | "new-starter";

type TalentProfile = ReturnType<typeof loadTexasTalentProfilesServer>[number];

export type ResolvedTexasIcon = TexasIconRosterEntry & {
  href: string;
  reuseKind: TexasIconReuseKind;
  indexableAtOwnRoute: boolean;
  summary: string;
  matchedTalentSlug?: string;
  matchedEntityId?: string;
  matchedResearchSlug?: string;
};

type ResolutionContext = {
  talentsByKey: Map<string, TalentProfile[]>;
  entitiesByKey: Map<string, TexasEntityRecord[]>;
  researchByKey: Map<string, TexasIconResearchProfile[]>;
};

function addLookupValue<T>(lookup: Map<string, T[]>, key: string, value: T) {
  const normalized = normalizeTexasIconKey(key);
  if (!normalized) return;
  const existing = lookup.get(normalized) ?? [];
  if (!existing.includes(value)) existing.push(value);
  lookup.set(normalized, existing);
}

async function buildResolutionContext(): Promise<ResolutionContext> {
  const [talentProfiles, graph] = await Promise.all([
    Promise.resolve(loadTexasTalentProfilesServer()),
    loadTexasKnowledgeGraph(),
  ]);
  const talentsByKey = new Map<string, TalentProfile[]>();
  const entitiesByKey = new Map<string, TexasEntityRecord[]>();
  const researchByKey = new Map<string, TexasIconResearchProfile[]>();

  for (const profile of talentProfiles) {
    addLookupValue(talentsByKey, profile.name, profile);
    addLookupValue(talentsByKey, profile.slug, profile);
  }

  for (const entity of graph) {
    addLookupValue(entitiesByKey, entity.name, entity);
    addLookupValue(entitiesByKey, entity.slug, entity);
    for (const alias of entity.aliases) addLookupValue(entitiesByKey, alias, entity);
  }

  for (const profile of TEXAS_ICON_RESEARCH_PROFILES) {
    addLookupValue(researchByKey, profile.slug, profile);
    const rosterEntry = getTexasIconBySlug(profile.slug);
    if (rosterEntry) {
      addLookupValue(researchByKey, rosterEntry.name, profile);
      for (const alias of rosterEntry.aliases) addLookupValue(researchByKey, alias, profile);
    }
  }

  return { talentsByKey, entitiesByKey, researchByKey };
}

function iconKeys(entry: TexasIconRosterEntry) {
  return [...new Set([entry.name, entry.slug, ...entry.aliases].map(normalizeTexasIconKey).filter(Boolean))];
}

function uniqueMatch<T>(lookup: Map<string, T[]>, keys: readonly string[]) {
  const matches = new Set<T>();
  for (const key of keys) {
    for (const value of lookup.get(key) ?? []) matches.add(value);
  }
  return matches.size === 1 ? [...matches][0] : null;
}

function enrichResearchProfilePlaceLinks(
  profile: TexasIconResearchProfile,
  context: ResolutionContext,
): TexasIconResearchProfile {
  return {
    ...profile,
    texasPlaces: profile.texasPlaces.map((place) => {
      if (place.href) return place;
      const key = normalizeTexasIconKey(place.name);
      if (!key) return place;
      const entity = uniqueMatch(context.entitiesByKey, [key]);
      if (!entity || !isIndexableEntityPage(entity)) return place;
      return { ...place, href: canonicalEntityPath(entity) };
    }),
  };
}

function resolveTexasIcon(entry: TexasIconRosterEntry, context: ResolutionContext): {
  resolved: ResolvedTexasIcon;
  talentProfile: TalentProfile | null;
  researchProfile: TexasIconResearchProfile | null;
} {
  const keys = iconKeys(entry);
  const talentProfile = uniqueMatch(context.talentsByKey, keys);
  const researchProfile = uniqueMatch(context.researchByKey, keys);
  const graphEntity = entry.subjectType === "place"
    ? uniqueMatch(context.entitiesByKey, keys)
    : null;

  if (entry.canonicalPath) {
    return {
      resolved: {
        ...entry,
        href: entry.canonicalPath,
        reuseKind: "editorial-canonical",
        indexableAtOwnRoute: false,
        summary: entry.rosterNote,
        matchedTalentSlug: talentProfile?.slug,
        matchedEntityId: graphEntity?.id,
        matchedResearchSlug: researchProfile?.slug,
      },
      talentProfile,
      researchProfile,
    };
  }

  if (graphEntity) {
    return {
      resolved: {
        ...entry,
        href: canonicalEntityPath(graphEntity),
        reuseKind: "knowledge-graph",
        indexableAtOwnRoute: false,
        summary: graphEntity.description ?? entry.rosterNote,
        matchedTalentSlug: talentProfile?.slug,
        matchedEntityId: graphEntity.id,
        matchedResearchSlug: researchProfile?.slug,
      },
      talentProfile,
      researchProfile,
    };
  }

  // Existing Texas Talent records always win over parallel Icons research so
  // the registry cannot fork one person into two competing editorial records.
  // Until the dedicated Texas Talent route is explicitly launched, completed
  // Talent narratives publish at the stable Texas Icons route instead of
  // sitting unpublished. When Talent launches, canonical ownership transfers
  // to the governed Texas Talent path and this Icons route redirects there.
  if (talentProfile) {
    const publishable = isTexasTalentPublishable(talentProfile);
    return {
      resolved: {
        ...entry,
        href: publishable
          ? texasTalentFutureCanonicalPath(talentProfile.slug)
          : `/texas-icons/${entry.slug}`,
        reuseKind: publishable ? "texas-talent-ready" : "texas-talent-staged",
        indexableAtOwnRoute: !publishable,
        summary: talentProfile.dek,
        matchedTalentSlug: talentProfile.slug,
        matchedResearchSlug: researchProfile?.slug,
      },
      talentProfile,
      researchProfile,
    };
  }

  // A Texas Icons research profile contains finished narrative copy (overview,
  // timeline, legacy and sources). Under the written-content publication rule,
  // that article publishes at its own canonical Icons URL once it exists here.
  // Only roster/data-only starter records remain unpublished and noindex.
  if (researchProfile) {
    return {
      resolved: {
        ...entry,
        href: `/texas-icons/${entry.slug}`,
        reuseKind: "icon-research-staged",
        indexableAtOwnRoute: true,
        summary: researchProfile.dek,
        matchedResearchSlug: researchProfile.slug,
      },
      talentProfile: null,
      researchProfile,
    };
  }

  return {
    resolved: {
      ...entry,
      href: `/texas-icons/${entry.slug}`,
      reuseKind: "new-starter",
      indexableAtOwnRoute: false,
      summary: entry.rosterNote,
    },
    talentProfile: null,
    researchProfile: null,
  };
}

export async function loadTexasIconsServer() {
  const context = await buildResolutionContext();
  const icons = TEXAS_ICON_ROSTER.map((entry) => resolveTexasIcon(entry, context).resolved);
  const categories = TEXAS_ICON_CATEGORIES.map((category) => ({
    ...category,
    icons: icons.filter((entry) => entry.category === category.id),
  }));

  const stats = {
    total: icons.length,
    canonicalReused: icons.filter((entry) =>
      entry.reuseKind === "editorial-canonical" || entry.reuseKind === "knowledge-graph").length,
    talentReused: icons.filter((entry) =>
      entry.reuseKind === "texas-talent-ready" || entry.reuseKind === "texas-talent-staged").length,
    researchedStaged: icons.filter((entry) => entry.reuseKind === "icon-research-staged").length,
    readyAtOwnRoute: icons.filter((entry) => entry.indexableAtOwnRoute).length,
    researchQueue: icons.filter((entry) => entry.reuseKind === "new-starter").length,
  };

  return { icons, categories, stats };
}

export async function loadTexasIconProfileServer(slug: string) {
  const entry = getTexasIconBySlug(slug);
  if (!entry) return null;

  const context = await buildResolutionContext();
  const { resolved, talentProfile, researchProfile } = resolveTexasIcon(entry, context);
  const related = getRelatedTexasIcons(entry, 8).map((candidate) =>
    resolveTexasIcon(candidate, context).resolved);

  return {
    icon: resolved,
    related,
    talentProfile:
      talentProfile && (isTexasTalentPublishable(talentProfile) || resolved.reuseKind === "texas-talent-staged")
        ? talentProfile
        : null,
    researchProfile:
      resolved.reuseKind === "icon-research-staged" && researchProfile
        ? enrichResearchProfilePlaceLinks(researchProfile, context)
        : null,
  };
}
