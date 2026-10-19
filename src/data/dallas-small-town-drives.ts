/** Dallas-specific editorial road-duration references (checked 2026-10-19).
 * Travelmath estimates use typical traffic, NOT live routing. Do not extrapolate mileage radii into drive-hour promises.
 * Add a town only after checking an actual Dallas-to-town road-route source.
 */
export const DALLAS_SMALL_TOWN_DRIVES = {
  "ennis": { minutes: 37, sourceUrl: "https://www.travelmath.com/driving-time/from/Dallas%2C%2BTX/to/Ennis%2C%2BTX" },
  "waxahachie": { minutes: 36, sourceUrl: "https://www.travelmath.com/driving-time/from/Dallas%2C%2BTX/to/Waxahachie%2C%2BTX" },
  "kaufman": { minutes: 36, sourceUrl: "https://www.travelmath.com/driving-time/from/Dallas%2C%2BTX/to/Kaufman%2C%2BTX" },
  "terrell": { minutes: 38, sourceUrl: "https://www.travelmath.com/driving-time/from/Dallas%2C%2BTX/to/Terrell%2C%2BTX" },
  "greenville": { minutes: 56, sourceUrl: "https://www.travelmath.com/driving-time/from/Dallas%2C%2BTX/to/Greenville%2C%2BTX" },
  "canton": { minutes: 57, sourceUrl: "https://www.travelmath.com/driving-time/from/Dallas%2C%2BTX/to/Canton%2C%2BTX" },
  "denison": { minutes: 72, sourceUrl: "https://www.travelmath.com/driving-time/from/Dallas%2C%2BTX/to/Denison%2C%2BTX" },
  "granbury": { minutes: 79, sourceUrl: "https://www.travelmath.com/driving-time/from/Dallas%2C%2BTX/to/Granbury%2C%2BTX" },
  "glen-rose": { minutes: 84, sourceUrl: "https://www.travelmath.com/driving-time/from/Dallas%2C%2BTX/to/Glen%2BRose%2C%2BTX" },
  "mineola": { minutes: 85, sourceUrl: "https://www.travelmath.com/driving-time/from/Dallas%2C%2BTX/to/Mineola%2C%2BTX" },
  "mount-vernon": { minutes: 97, sourceUrl: "https://www.travelmath.com/driving-time/from/Dallas%2C%2BTX/to/Mount%2BVernon%2C%2BTX" },
  "winnsboro": { minutes: 99, sourceUrl: "https://www.travelmath.com/driving-time/from/Dallas%2C%2BTX/to/Winnsboro%2C%2BTX" },
  "palestine": { minutes: 108, sourceUrl: "https://www.travelmath.com/driving-time/from/Dallas%2C%2BTX/to/Palestine%2C%2BTX" },
  "clifton": { minutes: 110, sourceUrl: "https://www.travelmath.com/driving-time/from/Dallas%2C%2BTX/to/Clifton%2C%2BTX" },
  "mount-pleasant": { minutes: 110, sourceUrl: "https://www.travelmath.com/driving-time/from/Dallas%2C%2BTX/to/Mount%2BPleasant%2C%2BTX" },
  "hico": { minutes: 113, sourceUrl: "https://www.travelmath.com/driving-time/from/Dallas%2C%2BTX/to/Hico%2C%2BTX" },
  "pittsburg": { minutes: 120, sourceUrl: "https://www.travelmath.com/driving-time/from/Dallas%2C%2BTX/to/Pittsburg%2C%2BTX" },
  "graham": { minutes: 124, sourceUrl: "https://www.travelmath.com/driving-time/from/Dallas%2C%2BTX/to/Graham%2C%2BTX" },
  "clarksville": { minutes: 129, sourceUrl: "https://www.travelmath.com/driving-time/from/Dallas%2C%2BTX/to/Clarksville%2C%2BTX" },
  "breckenridge": { minutes: 133, sourceUrl: "https://www.travelmath.com/driving-time/from/Dallas%2C%2BTX/to/Breckenridge%2C%2BTX" },
  "comanche": { minutes: 139, sourceUrl: "https://www.travelmath.com/driving-time/from/Dallas%2C%2BTX/to/Comanche%2C%2BTX" },
  "crockett": { minutes: 141, sourceUrl: "https://www.travelmath.com/driving-time/from/Dallas%2C%2BTX/to/Crockett%2C%2BTX" },
  "jefferson": { minutes: 152, sourceUrl: "https://www.travelmath.com/driving-time/from/Dallas%2C%2BTX/to/Jefferson%2C%2BTX" },
} as const;

export const DALLAS_DRIVES_VERIFIED_AT = "2026-10-19";

function normalizeTown(name: string) {
  return name.toLowerCase().normalize("NFKD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

export function getDallasSmallTownDrive(...names: string[]) {
  for (const name of names) {
    const key = normalizeTown(name);
    if (Object.prototype.hasOwnProperty.call(DALLAS_SMALL_TOWN_DRIVES, key)) {
      return DALLAS_SMALL_TOWN_DRIVES[key as keyof typeof DALLAS_SMALL_TOWN_DRIVES];
    }
  }
  return null;
}

export function inDallasSmallTownDriveBand(collectionSlug: string, minutes: number) {
  if (collectionSlug === "small-towns-1-hour") return minutes <= 60;
  if (collectionSlug === "small-towns-2-hours") return minutes > 60 && minutes <= 120;
  if (collectionSlug === "small-towns-3-hours") return minutes > 120 && minutes <= 180;
  return false;
}

export function dallasDriveLabel(minutes: number) {
  return `About ${Math.floor(minutes / 60) ? `${Math.floor(minutes / 60)} hr ` : ""}${minutes % 60 ? `${minutes % 60} min` : ""}`.trim();
}
