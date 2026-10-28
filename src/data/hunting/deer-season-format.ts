import source from "./deer-season-dates.json";

export const texasDeerSeason = source;
export const deerSeasonYear = source.seasonYear;

export type DeerSeasonId = "archery" | "generalNorth" | "generalSouth" | "earlyYouth" | "lateYouthNorth" | "muzzleloader" | "specialNorth" | "specialSouth";

function displayDate(iso: string, style: "long" | "short", includeYear: boolean) {
  const date = new Date(`${iso}T12:00:00Z`);
  if (Number.isNaN(date.getTime())) throw new Error("Invalid TPWD deer date: " + iso);
  return new Intl.DateTimeFormat("en-US", {
    timeZone: "UTC",
    month: style === "long" ? "long" : "short",
    day: "numeric",
    ...(includeYear ? { year: "numeric" as const } : {}),
  }).format(date);
}

/** Display a verified, date-only TPWD range, independent of the user's time zone. */
export function deerSeasonRange(id: DeerSeasonId, style: "long" | "short" = "long") {
  const row = texasDeerSeason.rows.find((item) => item.id === id);
  if (!row) throw new Error("Unknown TPWD deer season: " + id);
  const sameYear = row.start.slice(0, 4) === row.end.slice(0, 4);
  const sameMonth = sameYear && row.start.slice(5, 7) === row.end.slice(5, 7);
  const start = displayDate(row.start, style, !sameYear);
  if (sameMonth) {
    const endDay = String(Number(row.end.slice(8)));
    return `${start}–${endDay}, ${row.end.slice(0, 4)}`;
  }
  return `${start}–${displayDate(row.end, style, true)}`;
}

/** Last official date verification is distinct from the human review of legal guidance. */
export function deerSourceCheckLabel() {
  return displayDate(texasDeerSeason.sourceCheckedAt, "long", true);
}
