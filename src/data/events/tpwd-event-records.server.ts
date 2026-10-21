import catalog from "../generated/tpwd-events.json";
import { preservedExploreDestinations } from "../destination-preserved-catalog";
import { matchesTpwdPark, texasLocalDate } from "../tpwd-calendar";
import type { TexasEventRecord } from "./texas-event-record";

type TpwdItem = { title: string; startDate: string; parkKey: string; officialUrl: string };
const parkDestinations = [...new Map(preservedExploreDestinations
  .filter(place => place.category !== "rv-parks" &&
    /^https:\/\/tpwd\.texas\.gov\/state-parks\/[a-z0-9-]+\/?$/i.test(place.officialUrl ?? ""))
  .map(place => [place.slug, place] as const)).values()];

function matchPark(key: string) {
  // A park can have several units sharing one official home page. Unless one
  // canonical existing destination unambiguously identifies the TPWD venue,
  // omit it rather than advertising a ranger activity in the wrong park.
  const matches = parkDestinations.filter(place => matchesTpwdPark(place, key));
  return matches.length === 1 ? matches[0] : undefined;
}

/**
 * Short-lived linked discovery only; unmatched/ambiguous parks are excluded rather
 * than assigned incorrect cities/counties. No new event leaf URLs, images or schema.
 */
export function loadTpwdEventRecordsServer(now = new Date()): TexasEventRecord[] {
  if (!catalog.generatedAt || !Number.isFinite(Date.parse(catalog.generatedAt))) return [];
  if (Math.abs(now.getTime() - Date.parse(catalog.generatedAt)) > 7 * 86400000) return [];
  const today = texasLocalDate(now);
  const result: TexasEventRecord[] = [];
  for (const item of catalog.events as TpwdItem[]) {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(item.startDate) || item.startDate < today) continue;
    if (!/^https:\/\/tpwd\.texas\.gov\/calendar\/[a-z0-9-]+\/[^/?#]+\/20\d{2}-\d{2}-\d{2}$/.test(item.officialUrl)) continue;
    const park = matchPark(item.parkKey);
    if (!park) continue;
    const countyName = park.county?.replace(/\s+County$/i, "");
    const countySlug = countyName?.toLowerCase().replace(/[^a-z0-9]+/g, "-");
    const date = item.startDate;
    result.push({
      id: "tpwd:" + item.officialUrl,
      slug: "tpwd-park-activity",
      title: item.title,
      summary: "A scheduled activity at " + park.name + ". Check the official TPWD listing for registration, fees, meeting location and schedule changes.",
      guidePath: "/events?start=" + date + "&end=" + date + "#calendar",
      startDate: date,
      venueId: "destination:" + park.slug,
      venueName: park.name,
      venuePath: "/destination/" + park.slug,
      city: park.nearestTown,
      countyName: countyName ? countyName + " County" : undefined,
      countySlug,
      region: park.region,
      category: /histor|heritage|archaeolog|archeolog|culture|craft|art/i.test(item.title) ? "culture"
        : /yoga|bike|cycling|race|run\b/i.test(item.title) ? "sport" : "seasonal",
      officialEventUrl: item.officialUrl,
      status: "scheduled",
      lastVerifiedAt: catalog.generatedAt,
      lastUpdatedAt: catalog.generatedAt,
      sourceName: "Texas Parks and Wildlife Department",
    });
  }
  return result;
}
