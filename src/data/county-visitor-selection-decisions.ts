/**
 * Editorial completion record for the supplemental, unranked county visitor
 * places directory. A county is not required to have this optional section:
 * museums, state parks, lakes, coast, towns and other topic guides render
 * independently. Absence does NOT mean the county has no attractions.
 *
 * These are the 2026-10-17 county slugs where no ADDITIONAL item met the
 * source/visitor-value/nonduplication bar in this finite research pass.
 * When an independently sourced attraction merits adding, remove that county
 * from this list in the SAME PR as the newly selected place.
 *
 * Do NOT turn this into an automatic count-filling routine or create
 * standalone authority pages based on this list.
 */
export const COUNTIES_WITH_NO_SUPPLEMENTAL_VISITOR_PLACE_SELECTED = [
  "cochran",
  "concho",
  "delta",
  "duval",
  "edwards",
  "fisher",
  "freestone",
  "frio",
  "glasscock",
  "hartley",
  "hudspeth",
  "irion",
  "jackson",
  "jim-hogg",
  "jim-wells",
  "karnes",
  "kenedy",
  "kent",
  "king",
  "leon",
  "limestone",
  "live-oak",
  "loving",
  "lynn",
  "madison",
  "martin",
  "mcmullen",
  "moore",
  "morris",
  "parmer",
  "polk",
  "rains",
  "real",
  "reeves",
  "robertson",
  "sabine",
  "san-jacinto",
  "schleicher",
  "sherman",
  "stephens",
  "sterling",
  "stonewall",
  "swisher",
  "throckmorton",
  "trinity",
  "tyler",
  "upshur",
  "upton",
  "van-zandt",
  "waller",
  "ward",
  "yoakum",
  "zapata"
] as const;

/** Count only counties intentionally handled by the optional directory. */
export const SUPPLEMENTAL_VISITOR_DIRECTORY_REVIEWED_AT = "2026-10-17";
