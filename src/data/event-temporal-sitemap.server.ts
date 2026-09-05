import { loadMajorEventGuideDirectoryServer } from "./major-event-directory.server";
import { TEMPORAL_EVENT_COLLECTIONS, resolveTemporalEventCollectionServer } from "./event-temporal-collections.server";
import { TOURNAMENT_COLLECTIONS } from "./texas-tournament-collections";
import { VERIFIED_TOURNAMENT_PROFILES } from "./tournaments/verified-profiles";

export interface TemporalEventSitemapEntry {
  path: string;
  lastmod?: string;
}

export function loadTemporalEventSitemapEntriesServer(now = new Date()): TemporalEventSitemapEntry[] {
  const events = loadMajorEventGuideDirectoryServer();
  const temporalEntries = TEMPORAL_EVENT_COLLECTIONS
    .filter((definition) => definition.indexPolicy === "qualified")
    .map((definition) => resolveTemporalEventCollectionServer(definition.slug, events, now))
    .filter((collection): collection is NonNullable<typeof collection> => Boolean(collection?.shouldIndex))
    .map((collection) => ({
      path: collection.path,
      lastmod: latestVerifiedDate(collection.items.map((item) => item.sourceCheckedAt)),
    }));
  const tournamentEntries = TOURNAMENT_COLLECTIONS.map((collection) => ({
    path: collection.path,
    lastmod: "2026-09-04",
  }));
  const verifiedTournamentEntries = VERIFIED_TOURNAMENT_PROFILES.map((profile) => ({
    path: `/tournament/${profile.slug}`,
    lastmod: profile.sourceCheckedAt,
  }));

  return [...temporalEntries, ...tournamentEntries, ...verifiedTournamentEntries];
}

function latestVerifiedDate(values: Array<string | undefined>) {
  const dates = values
    .filter((value): value is string => Boolean(value))
    .map((value) => value.slice(0, 10))
    .filter((value) => /^\d{4}-\d{2}-\d{2}$/.test(value))
    .sort();

  return dates.at(-1);
}
