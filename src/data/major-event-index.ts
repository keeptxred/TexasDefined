import type { TexasEvent, TexasRegion } from "./types";

type MajorEventSeed = readonly [
  slug: string,
  name: string,
  city: string,
  region: TexasRegion,
  category: TexasEvent["category"],
  startDate: string,
  endDate: string,
  venue: string,
  officialUrl: string,
];

// Compact client-safe occurrence metadata. Long-form guide copy, county context,
// source notes, and planning material stay server-only.
const majorEventSeeds: MajorEventSeed[] = [
  ["grapefest", "GrapeFest", "Grapevine", "prairies-lakes", "food", "2026-09-17", "2026-09-20", "Historic Downtown Grapevine", "https://www.grapevinetexasusa.com/grapefest/general-information/"],
  ["texas-renaissance-festival", "Texas Renaissance Festival", "Todd Mission", "prairies-lakes", "culture", "2026-10-10", "2026-11-29", "Texas Renaissance Festival", "https://www.texrenfest.com/"],
  ["texas-rose-festival", "Texas Rose Festival", "Tyler", "piney-woods", "culture", "2026-10-15", "2026-10-18", "Tyler", "https://www.texasrosefestival.org/"],
  ["wurstfest", "Wurstfest", "New Braunfels", "hill-country", "food", "2026-11-06", "2026-11-15", "Wurstfest grounds", "https://wurstfest.com/"],
  ["fort-worth-stock-show-rodeo", "Fort Worth Stock Show & Rodeo", "Fort Worth", "prairies-lakes", "rodeo", "2027-01-15", "2027-02-06", "Will Rogers Memorial Center and Dickies Arena", "https://www.fwssr.com/"],
  ["san-antonio-stock-show-rodeo", "San Antonio Stock Show & Rodeo", "San Antonio", "south-texas", "rodeo", "2027-02-11", "2027-02-28", "Frost Bank Center and Freeman Coliseum grounds", "https://www.sarodeo.com/"],
  ["sxsw", "South by Southwest (SXSW)", "Austin", "hill-country", "culture", "2027-03-15", "2027-03-21", "Downtown Austin venues", "https://sxsw.com/"],
  ["texas-sandfest", "Texas SandFest", "Port Aransas", "gulf-coast", "culture", "2027-04-16", "2027-04-18", "Port Aransas beach festival grounds", "https://www.texassandfest.org/"],
];

export const verifiedMajorEventOccurrences: TexasEvent[] = majorEventSeeds.map(([
  slug,
  name,
  city,
  region,
  category,
  startDate,
  endDate,
  venue,
  officialUrl,
]) => ({
  id: `authority:${slug}`,
  brandId: "texasdefined",
  slug,
  name,
  blurb: `Major annual event in ${city}. Confirm current details with the organizer before traveling.`,
  city,
  region,
  startDate,
  endDate,
  category,
  venue,
  officialUrl,
  sourceName: "Official organizer",
}));
