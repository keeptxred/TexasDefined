export const MINIMUM_INDEXABLE_EVERGREEN_EVENT_ITEMS = 3;

export function shouldIndexEvergreenEventCollection(itemCount: number) {
  return itemCount >= MINIMUM_INDEXABLE_EVERGREEN_EVENT_ITEMS;
}
