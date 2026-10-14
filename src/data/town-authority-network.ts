import { additionalTownAuthorityDestinations } from "./small-town-authority-wave16";
import { smallTownWave17Destinations } from "./small-town-destinations-wave17";
import { smallTownWave18Destinations } from "./small-town-destinations-wave18";
import { smallTownWave1Destinations } from "./small-town-destinations-wave1";
import { smallTownWave2Destinations } from "./small-town-destinations-wave2";
import { smallTownWave3Destinations } from "./small-town-destinations-wave3";
import { smallTownWave4Destinations } from "./small-town-destinations-wave4";
import { smallTownWave8Destinations } from "./small-town-destinations-wave8";
import { smallTownWave9Destinations } from "./small-town-destinations-wave9";
import { smallTownWave5Destinations } from "./small-town-destinations-wave5";
import { smallTownWave6Destinations } from "./small-town-destinations-wave6";
import { smallTownWave7Destinations } from "./small-town-destinations-wave7";
import { smallTownWave10Destinations } from "./small-town-destinations-wave10";
import { smallTownWave11Destinations } from "./small-town-destinations-wave11";
import { smallTownWave12Destinations } from "./small-town-destinations-wave12";
import { smallTownWave13Destinations } from "./small-town-destinations-wave13";
import { smallTownWave14Destinations } from "./small-town-destinations-wave14";
import { smallTownWave15Destinations } from "./small-town-destinations-wave15";
import type { Destination } from "./types";

/** All existing researched town destinations are in scope, not a fixed shortlist.
 * Gruene is the historic district of New Braunfels rather than an independent municipality. */
export const TOWN_AUTHORITY_DIRECTORY: Destination[] = [
  ...smallTownWave1Destinations, ...smallTownWave2Destinations, ...smallTownWave3Destinations,
  ...smallTownWave4Destinations, ...smallTownWave5Destinations, ...smallTownWave6Destinations,
  ...smallTownWave7Destinations, ...smallTownWave8Destinations, ...smallTownWave9Destinations,
  ...smallTownWave10Destinations, ...smallTownWave11Destinations, ...smallTownWave12Destinations,
  ...smallTownWave13Destinations, ...smallTownWave14Destinations, ...smallTownWave15Destinations,
  ...additionalTownAuthorityDestinations,
  ...smallTownWave17Destinations,
  ...smallTownWave18Destinations,
];

const canonicalAuthority = new Map<string, Destination>();
// Earlier batches contain fuller original entries for Jefferson, Wimberley and Marfa.
// Do not let their later duplicated records overwrite their researched master records.
for (const destination of TOWN_AUTHORITY_DIRECTORY) {
  if (!canonicalAuthority.has(destination.slug)) canonicalAuthority.set(destination.slug, destination);
}
export const TOWN_AUTHORITY_SLUGS: readonly string[] = [
  ...canonicalAuthority.keys(),
  "gruene-historic-district",
];

/**
 * Enriched Supabase Explore records can be shorter than our checked-in editorial pages.
 * The locally verified guide is the editorial source of truth for these towns on
 * live detail, sitemap/search discovery and outage fallback paths.
 */
export function applyTownAuthority(destination: Destination): Destination {
  const checkedGuide = canonicalAuthority.get(destination.slug);
  return checkedGuide ? { ...destination, ...checkedGuide } : destination;
}

// Client-facing contextual linking belongs in town-authority-links.ts; never
// import this full research catalog into a browser component.
