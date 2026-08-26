import { loadTexasKnowledgeGraph } from "@/data/knowledge-graph";
import { canonicalEntityPath } from "@/data/knowledge-graph/relationships";
import type { TexasEntityRecord } from "@/data/knowledge-graph/types";
import { isTexasTalentPublishable } from "@/data/texas-talent-launch";
import { loadTexasTalentProfilesServer } from "@/data/texas-talent.server";
import {
  getRelatedTexasIcons,
  getTexasIconBySlug,
  normalizeTexasIconKey,
  TEXAS_ICON_ROSTER,
} from "@/data/texas-icons-roster.server";
import {
  TEXAS_ICON_CATEGORIES,
  type TexasIconRosterEntry,
} from "@/data/texas-icons-types";

export type TexasIconReuseKind =
  | "editorial-canonical"
  | "knowledge-graph"
  | "texas-talent-ready"
  | "texas-talent-staged"
  | "new-starter";

type TalentProfile = ReturnType<typeof loadTexasTalentProfilesServer>[number];

export type ResolvedTexasIcon = TexasIconRosterEntry & {
  href: string;
  reuseKind: TexasIconReuseKind;
  indexableAtOwnRoute: boolean;
  summary: string;
  matchedTalentSlug?: string;
  matchedEntityId?: string;
};

type ResolutionContext = {
  talentsByKey: Map<string, TalentProfile[]>;
  entitiesByKey: Map<string, TexasEntityRecord[]>;
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

  for (const profile of talentProfiles) {
    addLookupValue(talentsByKey, profile.name, profile);
    addLookupValue(talentsByKey, profile.slug, profile);
  }

  for (const entity of graph) {
    addLookupValue(entitiesByKey, entity.name, entity);
    addLookupValue(entitiesByKey, entity.slug, entity);
    for (const alias of entity.aliases) addLookupValue(entitiesByKey, alias, entity);
  }

  return { talentsByKey, entitiesByKey };
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

function resolveTexasIcon(entry: TexasIconRosterEntry, context: ResolutionContext): {
  resolved: ResolvedTexasIcon;
  talentProfile: TalentProfile | null;
} {
  const keys = iconKeys(entry);
  const talentProfile = uniqueMatch(context.talentsByKey, keys);
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
      },
      talentProfile,
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
      },
      talentProfile,
    };
  }

  if (talentProfile) {
    const publishable = isTexasTalentPublishable(talentProfile);
    return {
      resolved: {
        ...entry,
        href: `/texas-icons/${entry.slug}`,
        reuseKind: publishable ? "texas-talent-ready" : "texas-talent-staged",
        indexableAtOwnRoute: publishable,
        summary: publishable ? talentProfile.dek : entry.rosterNote,
        matchedTalentSlug: talentProfile.slug,
      },
      talentProfile,
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
    readyAtOwnRoute: icons.filter((entry) => entry.indexableAtOwnRoute).length,
    researchQueue: icons.filter((entry) =>
      entry.reuseKind === "new-starter" || entry.reuseKind === "texas-talent-staged").length,
  };

  return { icons, categories, stats };
}

export async function loadTexasIconProfileServer(slug: string) {
  const entry = getTexasIconBySlug(slug);
  if (!entry) return null;

  const context = await buildResolutionContext();
  const { resolved, talentProfile } = resolveTexasIcon(entry, context);
  const related = getRelatedTexasIcons(entry, 8).map((candidate) =>
    resolveTexasIcon(candidate, context).resolved);

  return {
    icon: resolved,
    related,
    talentProfile:
      talentProfile && isTexasTalentPublishable(talentProfile)
        ? talentProfile
        : null,
  };
}
