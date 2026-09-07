export const MINIMUM_INDEXABLE_EVERGREEN_EVENT_ITEMS = 3;
export const MINIMUM_INDEXABLE_TOURNAMENT_ITEMS = 5;

export function shouldIndexEvergreenEventCollection(itemCount: number) {
  return itemCount >= MINIMUM_INDEXABLE_EVERGREEN_EVENT_ITEMS;
}

export function shouldIndexTournamentCollection(itemCount: number) {
  return itemCount >= MINIMUM_INDEXABLE_TOURNAMENT_ITEMS;
}

export function buildTournamentCollectionIndexabilityNote(
  itemCount: number,
  verifiedTournamentCount: number,
  shouldIndex = shouldIndexTournamentCollection(itemCount),
) {
  if (shouldIndex) {
    return `This collection is indexable as a substantive discovery directory. ${verifiedTournamentCount} entries currently link to first-party-verified tournament guides; the remaining seed entries stay at the collection layer until their current occurrence details are verified.`;
  }

  return `This tournament collection is temporarily noindex because it currently contains only ${itemCount.toLocaleString("en-US")} ${itemCount === 1 ? "entry" : "entries"}. Texas Defined opens tournament collections to search after at least ${MINIMUM_INDEXABLE_TOURNAMENT_ITEMS.toLocaleString("en-US")} entries support a substantive discovery directory. ${verifiedTournamentCount.toLocaleString("en-US")} ${verifiedTournamentCount === 1 ? "entry currently links" : "entries currently link"} to a first-party-verified tournament guide${verifiedTournamentCount === 1 ? "" : "s"}.`;
}
