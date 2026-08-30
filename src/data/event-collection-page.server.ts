import { EVENT_COLLECTION_BY_SLUG } from "./event-collections";
import { loadMajorEventGuideDirectoryServer } from "./major-event-directory.server";

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

  return {
    ...collection,
    itemCount: items.length,
    latestSourceCheck,
    items,
  };
}
