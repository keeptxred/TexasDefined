import type { TexasEvent } from "@/data/types";

type HomepageSelectionOptions = {
  today: string;
  limit?: number;
  maxSourceAgeDays?: number;
};

const DAY_MS = 24 * 60 * 60 * 1000;

// Evergreen event identity facts, not year-specific dates or unpublished claims.
// Each card's occurrence dates and eligibility remain governed by verified sources.
const permanentEventBlurbs: Readonly<Record<string, string>> = {
  "texas-renaissance-festival": "A costumed festival near Todd Mission with themed performances, artisans and food. It operates on selected season dates, so check the organizer's daily calendar.",
  "casi-terlingua-international-chili-championship": "Terlingua's desert chili championship brings cooks and judges together at Rancho CASI de los Chisos. Check the organizer for the daily program and visitor information.",
  "wurstfest": "New Braunfels' German-Texan festival brings food, live music and dancing together over several days. Check the official schedule before choosing a visit.",
  "texas-capital-air-show": "Watch flying performances and explore modern and historic aircraft displays at San Marcos Airport. Check official flight times, parking and tickets.",
  "austin-celtic-festival": "Traditional Celtic music, dance, Highland Games and workshops fill Pioneer Farms in North Austin. Check official ticketing and workshop schedules.",
  "johnson-city-christmas-lights-spectacular": "Holiday lights illuminate downtown Johnson City and the Pedernales Electric Cooperative oak grove. Check event-day activities separately from the nightly displays.",
  "shiner-beer-run": "Shiner's community races start around the Spoetzl Brewery. Check the official race schedule for available distances, start times and packet pickup.",
  "houston-thanksgiving-day-parade": "Downtown Houston hosts holiday floats and performances. Check the City of Houston route, timing and street closures before heading in.",
  "dickens-on-the-strand": "Galveston's historic Strand hosts a Victorian-themed holiday festival with costumed entertainment. Check individual program and ticket details.",
  "houston-livestock-show-rodeo": "At NRG Park, competitive rodeo, livestock exhibits, concerts and grounds attractions have distinct schedules and admission options.",
  "houston-livestock-show-and-rodeo": "At NRG Park, competitive rodeo, livestock exhibits, concerts and grounds attractions have distinct schedules and admission options.",
  "fiesta-san-antonio": "San Antonio's citywide celebrations include parades, neighborhood traditions and cultural programs. Choose dates from the official event calendar.",
};

function withEvergreenEventDetail(event: TexasEvent): TexasEvent {
  const baseSlug = event.slug.replace(/-\d{4}-\d{2}-\d{2}$/, "");
  const blurb = permanentEventBlurbs[baseSlug];
  return blurb ? { ...event, blurb } : event;
}

function isoDay(value: string | undefined): string | null {
  const day = value?.slice(0, 10) ?? "";
  if (!/^\d{4}-\d{2}-\d{2}$/.test(day)) return null;
  const timestamp = Date.parse(day + "T00:00:00Z");
  return Number.isFinite(timestamp) && new Date(timestamp).toISOString().slice(0, 10) === day ? day : null;
}

function normalizedIdentity(event: TexasEvent): string {
  const clean = (value: string) => value.toLocaleLowerCase("en-US").replace(/[^a-z0-9]+/g, "");
  return clean(event.name) + ":" + clean(event.city);
}

function usableEvent(event: TexasEvent, today: string, maxSourceAgeDays: number): boolean {
  const start = isoDay(event.startDate);
  const end = isoDay(event.endDate || event.startDate);
  const verified = isoDay(event.sourceCheckedAt);
  if (!start || !end || !verified || end < start || end < today || verified > today) return false;
  if ((Date.parse(today + "T00:00:00Z") - Date.parse(verified + "T00:00:00Z")) / DAY_MS > maxSourceAgeDays) return false;
  try {
    const url = new URL(event.officialUrl || "");
    return url.protocol === "https:" && Boolean(url.hostname) && Boolean(event.name.trim()) && Boolean(event.city.trim());
  } catch {
    return false;
  }
}

function isBetterSource(candidate: TexasEvent, previous: TexasEvent): boolean {
  // A source-verified, descriptive card beats the generic major-event directory
  // fallback. Never make two versions of the same event compete for home slots.
  const detailed = (event: TexasEvent) => Boolean(event.blurb && !event.blurb.startsWith("Major annual event in "));
  if (detailed(candidate) !== detailed(previous)) return detailed(candidate);
  return (candidate.sourceCheckedAt || "") > (previous.sourceCheckedAt || "");
}

/**
 * Select currently occurring and soon-to-start official events, without manually
 * maintaining a homepage calendar or rolling an old season into a new year.
 * Source age is deliberately capped; an unreviewed event becomes ineligible.
 */
export function selectHomepageEvents(events: readonly TexasEvent[], options: HomepageSelectionOptions): TexasEvent[] {
  const today = isoDay(options.today);
  if (!today) throw new Error("Homepage events require a valid Texas-local date.");
  const limit = Math.max(1, Math.min(options.limit ?? 6, 12));
  const maxSourceAgeDays = Math.max(1, options.maxSourceAgeDays ?? 180);
  const byIdentity = new Map<string, TexasEvent>();

  for (const event of events) {
    if (!usableEvent(event, today, maxSourceAgeDays)) continue;
    const key = normalizedIdentity(event);
    const previous = byIdentity.get(key);
    if (!previous) {
      byIdentity.set(key, event);
    } else if (event.startDate < previous.startDate || (event.startDate === previous.startDate && isBetterSource(event, previous))) {
      byIdentity.set(key, event);
    }
  }

  const candidates = [...byIdentity.values()];
  // Two ongoing festivals at most leave room for imminent events this week.
  const ongoing = candidates.filter((event) => event.startDate <= today)
    .sort((a, b) => (b.endDate || b.startDate).localeCompare(a.endDate || a.startDate) || a.name.localeCompare(b.name));
  const upcoming = candidates.filter((event) => event.startDate > today)
    .sort((a, b) => a.startDate.localeCompare(b.startDate) || a.name.localeCompare(b.name));
  const horizon = new Date(Date.parse(today + "T00:00:00Z") + 30 * DAY_MS).toISOString().slice(0, 10);
  const soon = upcoming.filter((event) => event.startDate <= horizon);
  const chosen = [...ongoing.slice(0, 2), ...soon].slice(0, limit);
  const used = new Set(chosen.map(normalizedIdentity));
  for (const event of [...upcoming, ...ongoing.slice(2)]) {
    if (chosen.length >= limit) break;
    if (!used.has(normalizedIdentity(event))) {
      chosen.push(event);
      used.add(normalizedIdentity(event));
    }
  }
  return chosen.map(withEvergreenEventDetail);
}
