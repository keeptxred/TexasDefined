import type { Destination } from "./types";

/** As of 2026-10-17, NPS's Texas directory lists 18 units/designations.
 * This is an identity and provenance inventory, NOT an editorial certification.
 * Historic trails are multi-state corridors: do not manufacture single-entrance
 * coordinates, admission rules, or hotels for them.
 * https://www.nps.gov/state/tx/list.htm?program=parks
 */
export const TEXAS_NPS_DIRECTORY = [
  { slug: "alibates-flint-quarries-national-monument", npsCode: "alfl", name: "Alibates Flint Quarries National Monument", designation: "national monument" },
  { slug: "amistad-national-recreation-area", npsCode: "amis", name: "Amistad National Recreation Area", designation: "national recreation area" },
  { slug: "big-bend-national-park", npsCode: "bibe", name: "Big Bend National Park", designation: "national park" },
  { slug: "big-thicket-national-preserve", npsCode: "bith", name: "Big Thicket National Preserve", designation: "national preserve" },
  { slug: "blackwell-school-national-historic-site", npsCode: "blsc", name: "Blackwell School National Historic Site", designation: "national historic site" },
  { slug: "butterfield-overland-national-historic-trail", npsCode: "buov", name: "Butterfield Overland National Historic Trail", designation: "national historic trail" },
  { slug: "chamizal-national-memorial", npsCode: "cham", name: "Chamizal National Memorial", designation: "national memorial" },
  { slug: "el-camino-real-de-los-tejas-national-historic-trail", npsCode: "elte", name: "El Camino Real de los Tejas National Historic Trail", designation: "national historic trail" },
  { slug: "el-camino-real-de-tierra-adentro-national-historic-trail", npsCode: "elca", name: "El Camino Real de Tierra Adentro National Historic Trail", designation: "national historic trail" },
  { slug: "fort-davis-national-historic-site", npsCode: "foda", name: "Fort Davis National Historic Site", designation: "national historic site" },
  { slug: "guadalupe-mountains-national-park", npsCode: "gumo", name: "Guadalupe Mountains National Park", designation: "national park" },
  { slug: "lake-meredith-national-recreation-area", npsCode: "lamr", name: "Lake Meredith National Recreation Area", designation: "national recreation area" },
  { slug: "lyndon-b-johnson-national-historical-park", npsCode: "lyjo", name: "Lyndon B. Johnson National Historical Park", designation: "national historical park" },
  { slug: "padre-island-national-seashore", npsCode: "pais", name: "Padre Island National Seashore", designation: "national seashore" },
  { slug: "palo-alto-battlefield-national-historical-park", npsCode: "paal", name: "Palo Alto Battlefield National Historical Park", designation: "national historical park" },
  { slug: "rio-grande-wild-and-scenic-river", npsCode: "rigr", name: "Rio Grande Wild and Scenic River", designation: "wild and scenic river" },
  { slug: "san-antonio-missions-national-historical-park", npsCode: "saan", name: "San Antonio Missions National Historical Park", designation: "national historical park" },
  { slug: "waco-mammoth-national-monument", npsCode: "waco", name: "Waco Mammoth National Monument", designation: "national monument" },
] as const;

const officialSlugs = new Set<string>(TEXAS_NPS_DIRECTORY.map((item) => item.slug));
const npsCodeBySlug = new Map<string,string>(TEXAS_NPS_DIRECTORY.map((item): [string, string] => [item.slug, item.npsCode]));

/** Cross-category selection: NPS sites may be classified as history, lakes, outdoors or coast. */
export function isOfficialTexasNpsDestination(destination: Destination): boolean {
  const code = npsCodeBySlug.get(destination.slug);
  if (!code || !officialSlugs.has(destination.slug)) return false;
  try {
    const u = new URL(destination.officialUrl ?? "");
    return u.protocol === "https:" && (u.hostname === "www.nps.gov" || u.hostname === "nps.gov")
      && (u.pathname === `/${code}` || u.pathname.startsWith(`/${code}/`));
  } catch {
    return false;
  }
}
