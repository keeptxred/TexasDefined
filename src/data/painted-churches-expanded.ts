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
  {
    slug: "palestine-sacred-heart-catholic-church",
    name: "Sacred Heart Catholic Church",
    shortName: "Sacred Heart at Palestine",
    city: "Palestine",
    county: "Anderson",
    address: "503 N Queen St., Palestine, TX 75801",
    denomination: "Roman Catholic",
    summary: "A historic Palestine church with a documented religious mural, stained glass and decorative sanctuary, supported by primary-source photographs in the Portal to Texas History and decorative-painting research archives.",
    significance: "A strong broader-tradition Painted Church supported by primary-source interior photographs and the Buie Harwood decorative-painting research archive. Texas Defined does not represent it as part of the THC 1983 decorative-interior multiple-property group.",
    visitNote: "The parish states that the church is not open to the public outside scheduled Mass, Confession and Adoration times. Call or email the parish office ahead for a sightseeing visit.",
    sourceUrl: "https://shpalestine.org/visit",
    secondarySourceUrl: "https://texashistory.unt.edu/ark:/67531/metapth26520/",
    sourceCheckedAt: CHECKED,
  },
  {
    slug: "bandera-st-stanislaus-catholic-church",
    name: "St. Stanislaus Catholic Church",
    shortName: "St. Stanislaus at Bandera",
    city: "Bandera",
    county: "Bandera",
    address: "311 7th St., Bandera, TX 78003",
    denomination: "Roman Catholic",
    summary: "An 1876 native-limestone Polish Catholic church whose modern painted program includes evangelist symbols, Marian imagery, scenes from St. Stanislaus’s life and extensive re-marbleized devotional furnishings.",
    significance: "A Recorded Texas Historic Landmark and one of Texas’s oldest Polish Catholic parishes. The parish itself documents a major painted-interior campaign completed in 2008, so Texas Defined includes it in the broader living Painted Churches tradition while distinguishing the modern decorative campaign from the 19th-century National Register group.",
    visitNote: "This is an active parish. Check current Mass and parish schedules before visiting; worship and parish activities take priority over sightseeing.",
    sourceUrl: "https://www.ststanislausbandera.com/history-of-the-church.html",
    secondarySourceUrl: "https://atlas.thc.texas.gov/Details/5019005081",
    sourceCheckedAt: CHECKED,
    recordedTexasHistoricLandmark: true,
  },
];

for (const church of additionalVerifiedPaintedChurches) {
  if (!originalPaintedChurches.some((existing) => existing.slug === church.slug)) originalPaintedChurches.push(church);
}

export const expandedPaintedChurches: PaintedChurch[] = originalPaintedChurches;

export function expandedPaintedChurchBySlug(slug: string) {
  return expandedPaintedChurches.find((church) => church.slug === slug) ?? null;
}
