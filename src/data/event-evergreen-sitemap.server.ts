import { shouldIndexEvergreenEventCollection } from "./event-collection-indexability";
import { EVENT_COLLECTIONS } from "./event-collections";
import { loadMajorEventGuideDirectoryServer } from "./major-event-directory.server";

const evergreenEventPaths = new Set(EVENT_COLLECTIONS.map((collection) => collection.path));

export function isEvergreenEventCollectionPath(path: string) {
  return evergreenEventPaths.has(path);
}

export function loadEvergreenEventSitemapEntriesServer() {
  const directory = loadMajorEventGuideDirectoryServer();

  return EVENT_COLLECTIONS.map((collection) => {
    const itemCount = directory.filter((event) =>
      collection.kind === "category"
        ? event.category === collection.value
        : event.region === collection.value,
    ).length;
    return { path: collection.path, itemCount };
  })
    .filter((entry) => shouldIndexEvergreenEventCollection(entry.itemCount))
    .map(({ path }) => ({ path }));
}
