import type { Destination } from "./types";

/**
 * Optional trip questions are selected for their relevance, not printed on
 * every destination merely because the schema has a string field.
 *
 * An editor can override these conservative legacy-data defaults per place.
 */
export function showSeasonDecision(destination: Destination): boolean {
  if (typeof destination.editorialDisplay?.showSeason === "boolean")
    return destination.editorialDisplay.showSeason;
  const note = destination.bestSeason.trim();
  if (!note || /^check current conditions before visiting$/i.test(note)
    || /^(?:anytime|any time|year.round|all year|open year.round)[.! ]*$/i.test(note))
    return false;
  const indoorCollection = /\b(museum|art gallery|aquarium|science center|planetarium|indoor exhibition)\b/i.test(destination.name);
  if (indoorCollection) {
    // For indoor collections, "spring and fall are nice" is not generally a
    // reason to visit. A date-limited exhibition or schedule is.
    return /\b(seasonal|festival|holiday|special exhibition|temporary exhibit|limited dates|school break|peak crowds|outdoor program)\b/i.test(note);
  }
  return true;
}

export function showAdvancePlanningDecision(destination: Destination): boolean {
  if (typeof destination.editorialDisplay?.showEntryPlanning === "boolean")
    return destination.editorialDisplay.showEntryPlanning;
  const note = destination.entryNote.trim();
  return note.length >= 30 && !/^confirm current hours, fees, reservations, and access with the official source/i.test(note);
}
