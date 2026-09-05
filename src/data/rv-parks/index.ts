import { DESTINATION_PHOTO_PLACEHOLDER } from "../explore-hero-reconciliation";
import type { Destination, SearchDocument, TexasRegion } from "../types";
import { RV_PARK_RAW_BIG_BEND_WEST_TEXAS } from "./big-bend-west-texas";
import { RV_PARK_RAW_GULF_COAST } from "./gulf-coast";
import { RV_PARK_RAW_HILL_COUNTRY } from "./hill-country";
import { RV_PARK_RAW_PANHANDLE_NORTH_TEXAS } from "./panhandle-north-texas";
import { RV_PARK_RAW_PINEY_WOODS_EAST_TEXAS } from "./piney-woods-east-texas";

export type RvParkSeedGroupId = "hill-country" | "gulf-coast" | "piney-woods-east-texas" | "panhandle-north-texas" | "big-bend-west-texas";
export type RvParkSeedRecord = {
  order: number;
  name: string;
  town: string;
  county: string;
  groupId: RvParkSeedGroupId;
  groupName: string;
  region: TexasRegion;
  slug: string;
  officialUrl?: string;
  sourceCheckedAt?: string;
  address?: string;
  managingAuthority?: string;
};

export const RV_PARK_SEED_IMPORTED_AT = "2026-09-05";
export const RV_PARK_SEED_COUNT = 250;

const GROUPS = [
  { id: "hill-country", name: "Texas Hill Country", region: "hill-country", parks: RV_PARK_RAW_HILL_COUNTRY },
  { id: "gulf-coast", name: "Gulf Coast", region: "gulf-coast", parks: RV_PARK_RAW_GULF_COAST },
  { id: "piney-woods-east-texas", name: "Piney Woods & East Texas", region: "piney-woods", parks: RV_PARK_RAW_PINEY_WOODS_EAST_TEXAS },
  { id: "panhandle-north-texas", name: "Panhandle Plains & North Texas", region: "prairies-lakes", parks: RV_PARK_RAW_PANHANDLE_NORTH_TEXAS },
  { id: "big-bend-west-texas", name: "Big Bend & West Texas", region: "big-bend", parks: RV_PARK_RAW_BIG_BEND_WEST_TEXAS },
] as const satisfies readonly { id: RvParkSeedGroupId; name: string; region: TexasRegion; parks: readonly (readonly [string, string, string, string, TexasRegion?])[] }[];

const SOURCE_OVERRIDES: Record<string, Pick<RvParkSeedRecord, "officialUrl" | "sourceCheckedAt" | "address" | "managingAuthority">> = {
  "caddo-lake-state-park-rv-area": {
    officialUrl: "https://tpwd.texas.gov/state-parks/caddo-lake",
    sourceCheckedAt: "2026-09-05",
    address: "245 Park Road 2, Karnack, TX 75661",
    managingAuthority: "Texas Parks and Wildlife Department",
  },
  "powell-park-resort-and-marina": {
    officialUrl: "https://www.powellpark.com/",
    sourceCheckedAt: "2026-09-05",
    address: "971 County Rd 459, Broaddus, TX 75929",
    managingAuthority: "Powell Park Marina",
  },
};

let order = 0;
export const RV_PARK_SEEDS: readonly RvParkSeedRecord[] = GROUPS.flatMap((group) =>
  group.parks.map(([name, town, county, slug, region]) => {
    order += 1;
    return {
      order,
      name,
      town,
      county,
      slug,
      groupId: group.id,
      groupName: group.name,
      region: region ?? group.region,
      ...SOURCE_OVERRIDES[slug],
    };
  }),
);

function destinationFromSeed(seed: RvParkSeedRecord): Destination {
  return {
    id: `rv-park-${seed.slug}`,
    brandId: "texasdefined",
    slug: seed.slug,
    name: seed.name,
    category: "rv-parks",
    region: seed.region,
    nearestTown: seed.town,
    county: seed.county,
    coordinates: { lat: 0, lng: 0 },
    hero: {
      src: DESTINATION_PHOTO_PLACEHOLDER,
      alt: `${seed.name} RV park or campground profile awaiting a destination-specific photograph`,
      width: 1600,
      height: 1067,
    },
    summary: `${seed.name} is listed in ${seed.town}, ${seed.county} County, in the Texas Defined RV parks and campgrounds directory. This seed profile supports trip discovery while park-specific operating details are being verified from the operator or managing agency.`,
    bestSeason: "Varies by location and weather; verify the current operating season before travel.",
    entryNote: "Confirm current RV-site availability, hookup types, rig-length limits, rates, check-in rules, pet policies and reservation requirements with the park operator or managing agency before travel.",
    highlights: [`RV camping near ${seed.town}`, `${seed.county} County`, seed.groupName],
    body: [
      `Texas Defined currently tracks ${seed.name} as an RV park or campground option around ${seed.town}. The record entered the statewide directory through the ${seed.groupName} expansion and is being reconciled with park-specific official sources before the individual profile is eligible for search indexing.`,
      "Before routing a motorhome, travel trailer or fifth wheel here, verify the current site type, electrical service, water and sewer availability, maximum rig length, check-in procedures, generator rules, pet rules and any seasonal operating restrictions directly with the operator or managing agency.",
      `Use this profile to connect the park to ${seed.county} County and the broader ${seed.groupName} travel map. Rates, availability, reservation policies and amenity claims can change, so Texas Defined does not infer those details from the directory name alone.`,
    ],
    officialUrl: seed.officialUrl,
    sourceCheckedAt: seed.sourceCheckedAt,
    address: seed.address,
    managingAuthority: seed.managingAuthority,
  };
}

export const rvParkDestinations: Destination[] = RV_PARK_SEEDS.map(destinationFromSeed);
const rvParkBySlug = new Map(rvParkDestinations.map((item) => [item.slug, item]));

export function getRvParkDestination(slug: string): Destination | undefined {
  return rvParkBySlug.get(slug);
}

export function rvParksForCounty(countySlug: string): Destination[] {
  const normalized = countySlug.trim().toLowerCase();
  return rvParkDestinations
    .filter((item) => item.county?.toLowerCase().replace(/[^a-z0-9]+/g, "-") === normalized)
    .sort((a, b) => a.nearestTown.localeCompare(b.nearestTown) || a.name.localeCompare(b.name));
}

export function buildRvParkSearchDocuments(): SearchDocument[] {
  const collection: SearchDocument = {
    id: "collection:rv-parks",
    brandId: "texasdefined",
    kind: "collection",
    title: "Texas RV Parks & Campgrounds",
    summary: "Browse 250 Texas RV parks, campgrounds and public RV camping areas by region, town and county.",
    keywords: ["Texas RV parks", "Texas campgrounds", "RV camping Texas", "RV parks by county", "RV parks by region"],
    href: "/explore/rv-parks",
  };
  return [
    collection,
    ...RV_PARK_SEEDS.map((seed): SearchDocument => ({
      id: `rv-park:${seed.slug}`,
      brandId: "texasdefined",
      kind: "guide",
      title: seed.name,
      summary: `RV park or campground directory profile near ${seed.town}, ${seed.county} County.`,
      keywords: [seed.name, seed.town, `${seed.county} County`, seed.groupName, "RV park", "campground", "Texas RV camping"],
      href: `/destination/${seed.slug}`,
    })),
  ];
}
