import { EVENT_COLLECTIONS, EVENT_COLLECTION_BY_SLUG } from "./event-collections";
import { loadMajorEventGuideDirectoryServer } from "./major-event-directory.server";

const eventCollectionByPath = new Map(EVENT_COLLECTIONS.map((item) => [item.path, item]));

export function loadEventCollectionPageServer(slug: string) {
  const collection = EVENT_COLLECTION_BY_SLUG.get(slug);
  if (!collection) return null;

  const items = loadMajorEventGuideDirectoryServer().filter((event) =>
    collection.kind === "category"
      ? event.category === collection.value
      : event.region === collection.value,
  );

  const latestSourceCheck = items
    .map((item) => item.sourceCheckedAt)
    .filter((value): value is string => Boolean(value))
    .sort()
    .at(-1);

  const relatedCollections = collection.relatedPaths
    .map((relatedPath) => eventCollectionByPath.get(relatedPath))
    .filter((item): item is NonNullable<typeof item> => Boolean(item))
    .map(({ path, title, description }) => ({ path, title, description }));

  return {
    ...collection,
    relatedCollections,
    itemCount: items.length,
    latestSourceCheck,
    items,
  };
}
