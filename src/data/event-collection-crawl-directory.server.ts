import { shouldIndexEvergreenEventCollection, shouldIndexTournamentCollection } from "./event-collection-indexability";
import { EVENT_COLLECTIONS } from "./event-collections";
import { TEMPORAL_EVENT_COLLECTIONS, resolveTemporalEventCollectionServer } from "./event-temporal-collections.server";
import { loadMajorEventGuideDirectoryServer } from "./major-event-directory.server";
import { TOURNAMENT_COLLECTIONS } from "./texas-tournament-collections";
import { loadTournamentCollectionItemsServer } from "./texas-tournaments.server";

export interface EventCollectionCrawlLink {
  href: string;
  title: string;
  group: "Evergreen event guides" | "Seasonal and regional guides" | "Tournament directories";
}

export function loadIndexableEventCollectionCrawlDirectoryServer(now = new Date()): EventCollectionCrawlLink[] {
  const directory = loadMajorEventGuideDirectoryServer();

  const evergreen = EVENT_COLLECTIONS
    .map((collection) => {
      const itemCount = directory.filter((event) =>
        collection.kind === "category"
          ? event.category === collection.value
          : event.region === collection.value,
      ).length;

      return shouldIndexEvergreenEventCollection(itemCount)
        ? { href: collection.path, title: collection.title, group: "Evergreen event guides" as const }
        : null;
    })
    .filter((item): item is NonNullable<typeof item> => Boolean(item));

  const temporal = TEMPORAL_EVENT_COLLECTIONS
    .map((definition) => resolveTemporalEventCollectionServer(definition.slug, directory, now))
    .filter((collection): collection is NonNullable<typeof collection> => Boolean(collection?.shouldIndex))
    .map((collection) => ({
      href: collection.path,
      title: collection.title,
      group: "Seasonal and regional guides" as const,
    }));

  const tournaments = TOURNAMENT_COLLECTIONS
    .filter((collection) => shouldIndexTournamentCollection(loadTournamentCollectionItemsServer(collection.value).length))
    .map((collection) => ({
      href: collection.path,
      title: collection.title,
      group: "Tournament directories" as const,
    }));

  const unique = new Map<string, EventCollectionCrawlLink>();
  for (const item of [...evergreen, ...temporal, ...tournaments]) unique.set(item.href, item);

  return [...unique.values()].sort((left, right) =>
    left.group.localeCompare(right.group) || left.title.localeCompare(right.title),
  );
}
