import type { Destination } from "./types";
import { viatorDestinationExpansionWave12 } from "./viator-destination-expansion-wave12.ts";

const OWNER_MEDIA_SLUG = "texas-hill-country-olive-co";
const OWNER_HERO = "/images/destinations/texas-hill-country-olive-co-bistro.webp";
const OWNER_GALLERY = "/images/destinations/texas-hill-country-olive-co-exterior.webp";
const OWNER_CREDIT = "Texas Hill Country Olive Co.";
const OWNER_SOURCE = "https://texashillcountryoliveco.com/";

/**
 * Restore only the explicitly permissioned media for the Olive Co. destination
 * after remote destination resolution. Remote editorial fields remain
 * authoritative; this prevents a valid remote row from silently dropping the
 * checked-in revocable owner-supplied gallery.
 *
 * Fail closed unless the local rights-governed record still matches the exact
 * approved hero, gallery image, credit and source URL.
 */
export function applyRestrictedOwnerDestinationMedia(destination: Destination): Destination {
  if (destination.slug !== OWNER_MEDIA_SLUG) return destination;

  const approved = viatorDestinationExpansionWave12.find((item) => item.slug === OWNER_MEDIA_SLUG);
  const gallery = approved?.gallery;
  const mediaContractValid =
    approved?.hero.src === OWNER_HERO &&
    approved.hero.credit === OWNER_CREDIT &&
    gallery?.length === 1 &&
    gallery[0]?.image.src === OWNER_GALLERY &&
    gallery[0]?.image.credit === OWNER_CREDIT &&
    gallery[0]?.sourceUrl === OWNER_SOURCE;

  if (!mediaContractValid || !approved || !gallery) return destination;

  return {
    ...destination,
    hero: approved.hero,
    gallery,
  };
}
