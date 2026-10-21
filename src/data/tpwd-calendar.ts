import tpwdCalendar from "./generated/tpwd-events.json";
import type { Destination } from "./types";

export interface TpwdCalendarActivity {
  title: string;
  startDate: string;
  parkKey: string;
  officialUrl: string;
}

type ParkIdentity = Pick<Destination, "slug" | "officialUrl">;

export function texasLocalDate(now = new Date()) {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/Chicago", year: "numeric", month: "2-digit", day: "2-digit",
  }).formatToParts(now);
  const part = (type: "year" | "month" | "day") => parts.find(p => p.type === type)?.value ?? "00";
  return part("year") + "-" + part("month") + "-" + part("day");
}

export function isTpwdCalendarFresh(now = new Date()) {
  const updated = Date.parse(tpwdCalendar.generatedAt);
  return Number.isFinite(updated) && updated <= now.getTime() + 3600000
    && now.getTime() - updated < 7 * 86400000;
}

export function matchesTpwdPark(destination: ParkIdentity, eventParkKey: string) {
  const parkKey = /^https:\/\/tpwd\.texas\.gov\/state-parks\/([a-z0-9-]+)\/?(?:[?#].*)?$/i.exec(destination.officialUrl ?? "")?.[1];
  if (!parkKey) return false;
  if (eventParkKey === parkKey) return true;
  // Multiple units frequently share one park official URL. Admit a specific
  // unit ONLY when the destination's slug actually names that exact unit.
  if (!eventParkKey.startsWith(parkKey + "-")) return false;
  const unit = eventParkKey.slice(parkKey.length + 1);
  return unit.length >= 4 && ("-" + destination.slug.toLowerCase() + "-").includes("-" + unit + "-");
}

export function getTpwdActivitiesForDestination(
  destination: ParkIdentity,
  options: { onDate?: string; now?: Date; limit?: number } = {},
): TpwdCalendarActivity[] {
  const now = options.now ?? new Date();
  if (!isTpwdCalendarFresh(now)) return [];
  const today = texasLocalDate(now);
  return (tpwdCalendar.events as TpwdCalendarActivity[])
    .filter(event => (!options.onDate || event.startDate === options.onDate)
      && event.startDate >= today
      && matchesTpwdPark(destination, event.parkKey)
      && /^https:\/\/tpwd\.texas\.gov\/calendar\/[a-z0-9-]+\/[a-z0-9-]+\/\d{4}-\d{2}-\d{2}$/.test(event.officialUrl))
    .sort((a, b) => a.startDate.localeCompare(b.startDate) || a.title.localeCompare(b.title))
    .slice(0, Math.min(Math.max(options.limit ?? 24, 1), 250));
}
