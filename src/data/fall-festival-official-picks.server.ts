import { generatedTexasEvents } from "./generated/texas-events.ts";

// Organizer-confirmed 2026 fallback dates, retained only until their end date.
// These are not counted as "verified guides" or as affiliate placements.
// A new year requires fresh organizer evidence; never shift dates by 365 days.
export const FALL_OFFICIAL_PICKS = [
  {
    name: "Texas Pumpkin Fest",
    city: "Leander",
    region: "hill-country",
    startDate: "2026-10-10",
    endDate: "2026-11-01",
    officialUrl: "https://texaspumpkinfest.com/",
    summary: "Pumpkin patch, family entertainment, carnival rides and seasonal food. Runs weekends and selected additional days; check the organizer's operating calendar.",
    sourceCheckedAt: "2026-10-26",
  },
  {
    name: "Houston Pumpkin Festival",
    city: "Houston",
    region: "gulf-coast",
    startDate: "2026-09-19",
    endDate: "2026-11-08",
    officialUrl: "https://www.houstonpumpkinfest.com/",
    summary: "Downtown Houston pumpkin displays, rides and photo opportunities at Discovery Green. Hours and tickets vary by day.",
    sourceCheckedAt: "2026-10-26",
  },
  {
    name: "Uhland Fall Fest",
    city: "Uhland",
    region: "hill-country",
    startDate: "2026-09-26",
    endDate: "2026-11-01",
    officialUrl: "https://uhlandfallfest.com/",
    summary: "Six weekends of pumpkins, farm animals, games, music and artisan vendors near Kyle and San Marcos; verify weekend hours before travel.",
    sourceCheckedAt: "2026-10-26",
  },
] as const;

export function texasToday(now: Date) {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/Chicago", year: "numeric", month: "2-digit", day: "2-digit",
  }).formatToParts(now);
  const part = (key: string) => parts.find((value) => value.type === key)?.value ?? "00";
  return `${part("year")}-${part("month")}-${part("day")}`;
}

interface GeneratedFallEvent {
  id: string;
  name: string;
  city: string;
  startDate: string;
  endDate?: string;
  officialUrl: string;
  sourceCheckedAt?: string;
  status?: string;
}

const governedOfficialFallSources = [
  { idPrefix: "official:texas-pumpkin-fest:", name: "Texas Pumpkin Fest", city: "Leander", url: "https://texaspumpkinfest.com/",
    summary: "Pumpkins, family entertainment, carnival rides and seasonal food. Check the organizer for exact operating days and admission." },
  { idPrefix: "official:houston-pumpkin-festival:", name: "Houston Pumpkin Festival", city: "Houston", url: "https://www.houstonpumpkinfest.com/",
    summary: "Pumpkin displays and family attractions at Discovery Green in downtown Houston; check the current daily operating schedule." },
  { idPrefix: "official:uhland-fall-fest:", name: "Uhland Fall Fest", city: "Uhland", url: "https://uhlandfallfest.com/",
    summary: "Pumpkins, farm animals, games, music and artisan vendors near Kyle and San Marcos. Check published weekend operating hours." },
] as const;

// The scheduled Sync Texas Events workflow produces only explicit year-stamped
// dates from these named official sources. Never infer an occurrence from the
// prior year, a third-party listing or a generic month/weekend recurrence.
export function activeOfficialFallPicks(now = new Date(), generatedRows: readonly GeneratedFallEvent[] = generatedTexasEvents) {
  const today = texasToday(now);
  const year = Number(today.slice(0, 4)) + (today.slice(5, 7) > "11" ? 1 : 0);
  const seasonStart = `${year}-09-01`;
  const seasonEnd = `${year}-11-30`;
  const stored = FALL_OFFICIAL_PICKS.map((event) => ({ ...event }));
  const seen = new Set(stored.map((event) => `${event.name}:${event.startDate.slice(0, 4)}`));
  const result = [...stored];

  for (const row of generatedRows) {
    const source = governedOfficialFallSources.find((candidate) =>
      row.id.startsWith(candidate.idPrefix)
      && row.name === candidate.name
      && row.city === candidate.city
      && row.officialUrl === candidate.url,
    );
    const endDate = row.endDate ?? row.startDate;
    // Do not allow unreviewed event rows, malformed dates, completed years or
    // unexpectedly long spans to enter this seasonal discovery collection.
    if (!source || row.status !== "published" || !row.sourceCheckedAt
      || !/^20\\d{2}-(0[1-9]|1[0-2])-([0-2]\\d|3[01])$/.test(row.startDate)
      || !/^20\\d{2}-(0[1-9]|1[0-2])-([0-2]\\d|3[01])$/.test(endDate)
      || endDate < row.startDate || endDate > seasonEnd
      || row.startDate < seasonStart) continue;
    const key = `${row.name}:${row.startDate.slice(0, 4)}`;
    // The individually reviewed 2026 records take precedence over an
    // automatically scraped range for that same edition.
    if (seen.has(key)) continue;
    seen.add(key);
    result.push({
      name: source.name,
      city: source.city,
      region: source.city === "Houston" ? "gulf-coast" : "hill-country",
      startDate: row.startDate,
      endDate,
      officialUrl: source.url,
      summary: source.summary,
      sourceCheckedAt: row.sourceCheckedAt.slice(0, 10),
    });
  }

  return result.filter((event) => event.endDate >= today && event.startDate <= seasonEnd && event.endDate >= seasonStart)
    .sort((a, b) => a.startDate.localeCompare(b.startDate) || a.name.localeCompare(b.name));
}
