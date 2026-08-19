import { paintedChurches as originalPaintedChurches, type PaintedChurch } from "./painted-churches";

const CHECKED = "2026-08-18";

export const additionalVerifiedPaintedChurches: PaintedChurch[] = [
  {
    slug: "plantersville-st-marys-catholic-church",
    name: "St. Mary’s Catholic Church",
    shortName: "St. Mary’s at Plantersville",
    city: "Plantersville",
    county: "Grimes",
    address: "8227 CR 205, Plantersville, TX",
    denomination: "Roman Catholic",
    summary: "A 1917 Gothic Revival church in Grimes County whose stained glass, painted ceiling and immigrant parish history place it firmly within the broader Painted Churches of Texas tradition.",
    significance: "A Recorded Texas Historic Landmark with German and Polish immigrant roots. THC documents the present 1917 Gothic Revival building; multiple independent sources document its painted ceiling and historic decorative interior.",
    visitNote: "This is an active Catholic church rather than a museum. Verify current parish access before traveling and do not assume that historic-tour access applies during Masses, weddings, funerals or other parish events.",
    sourceUrl: "https://atlas.thc.texas.gov/Details/5185012792",
    secondarySourceUrl: "https://www.ncregister.com/blog/take-a-peek-inside-a-historic-painted-church-of-texas",
    sourceCheckedAt: CHECKED,
    recordedTexasHistoricLandmark: true,
  },
  {
    slug: "corn-hill-holy-trinity-catholic-church",
    name: "Holy Trinity Catholic Church",
    shortName: "Holy Trinity at Corn Hill",
    city: "Corn Hill",
    county: "Williamson",
    address: "8626 FM 1105, Jarrell, TX 76537",
    denomination: "Roman Catholic",
    summary: "A Czech- and Moravian-rooted parish established in 1889, centered on a prominent twin-spired 1913 church whose painted and mural-decorated interior is included in broader modern Painted Churches travel coverage.",
    significance: "A living Central Texas immigrant parish with documented Moravian heritage and a 1913 twin-spired church. Texas Defined treats Corn Hill as part of the broader Painted Churches tradition, not as a member of the THC National Register decorative-interior multiple-property group.",
    visitNote: "The parish remains active and publishes current Masses, bulletins and office contacts. Verify access directly with Holy Trinity before making a special sightseeing trip.",
    sourceUrl: "https://holytrinityofcornhill.org/",
    secondarySourceUrl: "https://www.travellerselixir.com/texas-painted-churches-road-trip/",
    sourceCheckedAt: CHECKED,
  },
];

for (const church of additionalVerifiedPaintedChurches) {
  if (!originalPaintedChurches.some((existing) => existing.slug === church.slug)) originalPaintedChurches.push(church);
}

export const expandedPaintedChurches: PaintedChurch[] = originalPaintedChurches;

export function expandedPaintedChurchBySlug(slug: string) {
  return expandedPaintedChurches.find((church) => church.slug === slug) ?? null;
}
