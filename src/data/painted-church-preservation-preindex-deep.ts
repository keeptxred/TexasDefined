import type { PaintedChurchPreservationEvent } from "./painted-church-preservation-chronology";

/**
 * Preservation events cleared during the final pre-index authority audit.
 * Approximate sort years are used only when a source establishes the era but not
 * an exact intervention date; yearLabel and qualification preserve that uncertainty.
 */
export const paintedChurchPreindexDeepPreservationEvents: PaintedChurchPreservationEvent[] = [
  {
    id: "praha-mikulik-long-term-restoration",
    churchSlug: "praha-st-marys-assumption",
    year: 1970,
    yearLabel: "more than 30 years before 1997",
    type: "restoration",
    summary: "Local artist Gene A. Mikulik spent more than three decades tending churches around Praha, including St. Mary's. Austin PBS documents that he restored much of the statuary, added gold leaf and new paint to the altars, and created the parish's Our Lady of Victory painting.",
    sourceLabel: "Austin PBS — St. Mary's Church of the Assumption, Praha",
    sourceUrl: "https://austinpbs.org/paintedchurches/praha",
    contributorSlugs: ["gene-mikulik"],
    qualification: "Austin PBS establishes a multi-decade restoration/stewardship role and Mikulik's death in 1997, but does not provide one single project start or completion year; 1970 is used only as a sorting anchor for the documented multi-decade era.",
  },
  {
    id: "umbarger-2011-2013-conservation",
    churchSlug: "umbarger-st-marys-catholic-church",
    year: 2011,
    yearLabel: "2011–2013 conservation campaign",
    type: "conservation",
    summary: "After deterioration of the Italian POW artwork became apparent, St. Mary's commissioned Sorellas Studio to document conditions, clean and stabilize original paint, apply a reversible conservation varnish, and use separated infill only where paint had been lost, with the goal of returning the church visually to its December 1945 state.",
    sourceLabel: "Catholic Diocese of Amarillo — Restoring the Beauty of a Panhandle Treasure",
    sourceUrl: "https://amarillodiocese.org/news/restoring-the-beauty-of-a-panhandle-treasure",
    qualification: "The diocesan article documents the active conservation methodology in November 2012; later diocesan reporting describes the broader campaign as 2012–2013. The 2011 start reflects the parish decision/documentation phase described in the source.",
  },
  {
    id: "lindsay-predecessor-cyclone-rebuild",
    churchSlug: "lindsay-st-peters-catholic-church",
    year: 1918,
    type: "disaster",
    summary: "The Texas Historical Commission marker states that the present St. Peter's was erected in 1918 to replace a previous church destroyed by a cyclone. That disaster/rebuild distinction is essential context for the surviving frescoed, stained-glass and carved-altar interior.",
    sourceLabel: "Texas Historical Commission — Saint Peter's Catholic Church RTHL",
    sourceUrl: "https://atlas.thc.texas.gov/Details/5097005077",
    qualification: "The marker establishes the cyclone as the reason for replacement and dates the present church to 1918; it does not supply a separate exact date for the storm in the record used here.",
  },
  {
    id: "shiner-pre-1983-exterior-sandblasting",
    churchSlug: "shiner-saints-cyril-methodius",
    year: 1983,
    yearLabel: "documented in 1983 National Register nomination",
    type: "alteration",
    summary: "The National Register nomination records that the church's exterior brick had recently been sandblasted and was beginning to erode. Texas Defined records that intervention as part of the building's preservation history rather than implying the historic fabric reached the present unchanged.",
    sourceLabel: "National Register nomination — Sts. Cyril and Methodius Church, Shiner",
    sourceUrl: "https://atlas.thc.texas.gov/NR/pdfs/83003151/83003151.pdf",
    qualification: "This is a documented exterior-fabric intervention rather than an interior repainting event; it is included because the preservation chronology tracks the whole historic church resource.",
  },
  {
    id: "waco-1928-first-church-fire",
    churchSlug: "waco-st-francis-on-the-brazos",
    year: 1928,
    type: "disaster",
    summary: "A strong fire destroyed St. Francis on the Brazos's first wooden church in 1928, leading the Franciscan parish and its Mexican American community toward construction of the present 1931 church whose later walls received the Barceló paintings.",
    sourceLabel: "St. Francis on the Brazos — official parish history",
    sourceUrl: "https://stfrancistorwaco.org/history",
    qualification: "This event predates the present painted church, but it explains the replacement-building chronology and why the current 1931 sanctuary became the support for the later sacred-art program.",
  },
  {
    id: "corn-hill-2016-ceiling-repair-planning",
    churchSlug: "corn-hill-holy-trinity-catholic-church",
    year: 2016,
    type: "stewardship",
    summary: "Parish council minutes document an architect's recommendation to add attic insulation to address church-ceiling sweating and discuss the cost of repainting, providing a church-controlled record of modern moisture-management and repainting planning for the interior fabric.",
    sourceLabel: "Holy Trinity Catholic Church of Corn Hill — parish council minutes",
    sourceUrl: "https://holytrinityofcornhill.org/index.php/download_file/view/356/",
    qualification: "The minutes document planning and a technical recommendation; Texas Defined does not state that the repainting was completed unless a later parish record confirms it.",
  },
];
