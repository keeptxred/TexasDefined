import { expandedPaintedChurches } from "./painted-churches-expanded";

export type PaintedChurchPreservationEventType =
  | "disaster"
  | "alteration"
  | "covering"
  | "rediscovery"
  | "restoration"
  | "reconstruction"
  | "conservation"
  | "repainting"
  | "stewardship";

export type PaintedChurchPreservationEvent = {
  id: string;
  churchSlug: string;
  year: number;
  yearLabel?: string;
  type: PaintedChurchPreservationEventType;
  summary: string;
  sourceLabel: string;
  sourceUrl: string;
  contributorSlugs?: string[];
  qualification?: string;
};

/**
 * This chronology records interventions, damage, rediscovery, restoration and
 * stewardship changes. It deliberately does not duplicate ordinary construction
 * or painting dates unless they are necessary to explain a later preservation event.
 */
export const paintedChurchPreservationEvents: PaintedChurchPreservationEvent[] = [
  {
    id: "ammannsville-1909-hurricane",
    churchSlug: "ammannsville-st-john-the-baptist",
    year: 1909,
    type: "disaster",
    summary: "A hurricane destroyed an earlier Ammannsville church, one of the destructive events that preceded the present building.",
    sourceLabel: "Austin PBS — Ammannsville",
    sourceUrl: "https://austinpbs.org/paintedchurches/ammannsville",
  },
  {
    id: "ammannsville-1917-fire",
    churchSlug: "ammannsville-st-john-the-baptist",
    year: 1917,
    type: "disaster",
    summary: "Fire destroyed the replacement church, leading directly to construction of the present sanctuary.",
    sourceLabel: "Austin PBS — Ammannsville",
    sourceUrl: "https://austinpbs.org/paintedchurches/ammannsville",
  },
  {
    id: "ammannsville-mikulik-restoration",
    churchSlug: "ammannsville-st-john-the-baptist",
    year: 1980,
    yearLabel: "late twentieth century",
    type: "restoration",
    summary: "Gene Mikulik is documented in Painted Churches research as a later restorer associated with Ammannsville's historic decorative interior.",
    sourceLabel: "Austin PBS — Painted Churches church research",
    sourceUrl: "https://austinpbs.org/paintedchurches/",
    contributorSlugs: ["gene-mikulik"],
    qualification: "The current source set supports Mikulik's restoration role but does not yet supply a single authoritative project-completion year, so the sort year is approximate.",
  },
  {
    id: "dubina-1950s-whitewash",
    churchSlug: "dubina-saints-cyril-methodius",
    year: 1955,
    yearLabel: "1950s",
    type: "covering",
    summary: "The historic decorative interior was whitewashed during the 1950s, obscuring the earlier painted scheme rather than necessarily removing every trace of it.",
    sourceLabel: "Austin PBS — Dubina",
    sourceUrl: "https://austinpbs.org/paintedchurches/dubina",
  },
  {
    id: "dubina-1980s-recovery",
    churchSlug: "dubina-saints-cyril-methodius",
    year: 1985,
    yearLabel: "1980s",
    type: "reconstruction",
    summary: "Community leaders including Ed Janecka and Butch Koenig used surviving evidence and recovered stencils to recreate the blue decorative interior, while acknowledging artistic license where evidence was incomplete.",
    sourceLabel: "Austin PBS — Dubina",
    sourceUrl: "https://austinpbs.org/paintedchurches/dubina",
    contributorSlugs: ["ed-janecka", "butch-koenig"],
  },
  {
    id: "high-hill-professional-conservation",
    churchSlug: "high-hill-nativity-of-mary",
    year: 2000,
    yearLabel: "modern conservation era",
    type: "conservation",
    summary: "Professional conservation work at High Hill has addressed the historic decorative surfaces, including the applied-canvas system that makes preservation materially different from ordinary repainting.",
    sourceLabel: "Friends of the Texas Historical Commission — Painted Churches preservation program",
    sourceUrl: "https://www.thcfriends.org/event/painted-churches-of-texas-part-2-community-and-preservation/",
    contributorSlugs: ["robert-alden-marshall"],
    qualification: "The source documents Marshall's conservation role but this record does not assign an unsupported single project year.",
  },
  {
    id: "moravia-high-integrity",
    churchSlug: "moravia-ascension-of-our-lord",
    year: 2000,
    yearLabel: "documented in modern Painted Churches research",
    type: "stewardship",
    summary: "Austin PBS describes Moravia's Donecker-family decorative program as comparatively little altered, making preservation by continuity—not a dramatic reconstruction—the key integrity story.",
    sourceLabel: "Austin PBS — Painted Churches film updates",
    sourceUrl: "https://austinpbs.org/paintedchurches/filmupdates",
    qualification: "This is a modern condition interpretation, not a claim that no maintenance has ever occurred.",
  },
  {
    id: "wallis-layered-repainting",
    churchSlug: "wallis-guardian-angel",
    year: 1983,
    yearLabel: "documented by 1983 nomination",
    type: "repainting",
    summary: "National Register documentation records alteration and repainting of the Guardian Angel decorative scheme, so surviving stars, angels and faux finishes are interpreted as a layered historic interior rather than untouched original paint.",
    sourceLabel: "National Register nomination — Church of the Guardian Angel",
    sourceUrl: "https://atlas.thc.texas.gov/NR/pdfs/83003074/83003074.pdf",
  },
  {
    id: "wesley-unfinished-1889",
    churchSlug: "wesley-brethren-church",
    year: 1889,
    type: "stewardship",
    summary: "Rev. Bohuslav Laciak's death left the 1889 decorative campaign visibly unfinished; that incompleteness survives as evidence of the original painting process rather than a preservation defect to be 'completed.'",
    sourceLabel: "Austin PBS — Wesley Brethren Church",
    sourceUrl: "https://austinpbs.org/paintedchurches/wesley",
    contributorSlugs: ["bohuslav-laciak"],
  },
  {
    id: "paris-1977-interior-renovation",
    churchSlug: "paris-first-united-methodist-church",
    year: 1977,
    type: "alteration",
    summary: "SAH Archipedia records a significant interior renovation in 1977, part of the documented change history that must be distinguished from the 1924 church design.",
    sourceLabel: "SAH Archipedia — First United Methodist Church, Paris",
    sourceUrl: "https://sah-archipedia.org/buildings/TX-02-MC40",
  },
  {
    id: "paris-1997-interior-renovation",
    churchSlug: "paris-first-united-methodist-church",
    year: 1997,
    type: "alteration",
    summary: "A further interior renovation in 1997 adds another documented layer to the Paris sanctuary's fabric history.",
    sourceLabel: "SAH Archipedia — First United Methodist Church, Paris",
    sourceUrl: "https://sah-archipedia.org/buildings/TX-02-MC40",
  },
  {
    id: "fredericksburg-1936-oidtmann",
    churchSlug: "fredericksburg-st-marys-catholic-church",
    year: 1936,
    type: "repainting",
    summary: "Oidtmann Studios carried out a major decorative campaign in 1936, substantially modifying the earlier interior and creating the layered scheme visible in later documentation.",
    sourceLabel: "Austin PBS — Fredericksburg",
    sourceUrl: "https://austinpbs.org/paintedchurches/fredericksburg",
    contributorSlugs: ["oidtmann-studios"],
  },
  {
    id: "sweet-home-1967-tornado",
    churchSlug: "sweet-home-queen-of-peace",
    year: 1967,
    type: "disaster",
    summary: "A tornado damaged the Sweet Home church and was followed by repair and interior redecorating, making the visible program a documented historic layer rather than a wholly untouched 1918 scheme.",
    sourceLabel: "National Register nomination — Queen of Peace, Sweet Home",
    sourceUrl: "https://atlas.thc.texas.gov/NR/pdfs/83003149/83003149.pdf",
  },
  {
    id: "panna-maria-1937-covering",
    churchSlug: "panna-maria-immaculate-conception",
    year: 1937,
    type: "covering",
    summary: "A 1937 remodeling campaign installed ceiling material that later concealed portions of the older painted ceiling.",
    sourceLabel: "Painted Churches field research — Panna Maria",
    sourceUrl: "https://precisionhomeremodeling.com/2023/07/03/an-experts-guide-to-the-hidden-gem-painted-churches-of-texas/",
  },
  {
    id: "panna-maria-2000-rediscovery",
    churchSlug: "panna-maria-immaculate-conception",
    year: 2000,
    type: "rediscovery",
    summary: "Removal of later ceiling tiles exposed a hand-painted ceiling with traditional Christian symbols, bringing an obscured historic layer back into view.",
    sourceLabel: "Painted Churches field research — Panna Maria",
    sourceUrl: "https://precisionhomeremodeling.com/2023/07/03/an-experts-guide-to-the-hidden-gem-painted-churches-of-texas/",
  },
  {
    id: "panna-maria-polaniak-restoration",
    churchSlug: "panna-maria-immaculate-conception",
    year: 2001,
    yearLabel: "after 2000 rediscovery",
    type: "restoration",
    summary: "Fr. Antoni Polaniak restored the rediscovered decorative work and added documented later imagery; Texas Defined therefore separates recovered historic paint from modern additions.",
    sourceLabel: "Painted Churches field research — Panna Maria",
    sourceUrl: "https://precisionhomeremodeling.com/2023/07/03/an-experts-guide-to-the-hidden-gem-painted-churches-of-texas/",
    contributorSlugs: ["antoni-polaniak"],
  },
  {
    id: "plantersville-1917-lightning-fire",
    churchSlug: "plantersville-st-marys-catholic-church",
    year: 1917,
    type: "disaster",
    summary: "Lightning and fire destroyed the earlier Plantersville church, after which the current building was erected in the same year.",
    sourceLabel: "Texas Historical Commission — St. Mary's Church Plantersville",
    sourceUrl: "https://atlas.thc.texas.gov/Details/5185012792",
  },
  {
    id: "palestine-sacred-heart-fresco-restoration",
    churchSlug: "palestine-sacred-heart-catholic-church",
    year: 1980,
    yearLabel: "during Msgr. J. T. Fleming's pastorate",
    type: "restoration",
    summary: "Portal to Texas History catalog notes record restoration of the Transfiguration fresco above Sacred Heart's main altar during Msgr. J. T. Fleming's pastorate.",
    sourceLabel: "Portal to Texas History — Sacred Heart Palestine interior",
    sourceUrl: "https://texashistory.unt.edu/ark:/67531/metapth26520/",
    qualification: "The current catalog evidence establishes the restoration and pastorate but this chronology does not assign a more precise year without a parish or conservation record.",
  },
  {
    id: "bandera-1976-interior-makeover",
    churchSlug: "bandera-st-stanislaus-catholic-church",
    year: 1976,
    type: "alteration",
    summary: "The parish records a major interior makeover in 1976, establishing an important pre-2000 layer in the church's decorative history.",
    sourceLabel: "St. Stanislaus Bandera — official church history",
    sourceUrl: "https://www.ststanislausbandera.com/history-of-the-church.html",
  },
  {
    id: "bandera-1996-remarbleizing",
    churchSlug: "bandera-st-stanislaus-catholic-church",
    year: 1996,
    type: "repainting",
    summary: "The parish records repainting of statues and Stations of the Cross and re-marbleizing of altars during the 1996 campaign.",
    sourceLabel: "St. Stanislaus Bandera — official church history",
    sourceUrl: "https://www.ststanislausbandera.com/history-of-the-church.html",
  },
  {
    id: "bandera-2003-2008-painting",
    churchSlug: "bandera-st-stanislaus-catholic-church",
    year: 2003,
    yearLabel: "2003–2008",
    type: "repainting",
    summary: "A documented modern campaign led by Fr. Antoni Polaniak and Cezary and Eva Sienkiel added the current ceiling, evangelist symbols and narrative wall scenes; Texas Defined treats this as a modern decorative campaign rather than immigrant-era original paint.",
    sourceLabel: "St. Stanislaus Bandera — official church history",
    sourceUrl: "https://www.ststanislausbandera.com/history-of-the-church.html",
    contributorSlugs: ["antoni-polaniak", "cezary-eva-sienkiel"],
  },
  {
    id: "anderson-original-ceiling-restored-sacristy",
    churchSlug: "anderson-st-stanislaus-kostka",
    year: 2000,
    yearLabel: "documented in current parish history",
    type: "restoration",
    summary: "The parish documents restoration of surviving original ceiling painting in the sacristy, preserving an older decorative layer separately from later sanctuary additions.",
    sourceLabel: "St. Stanislaus Kostka Anderson — official church history",
    sourceUrl: "https://saintstans.org/church-history",
    qualification: "The parish establishes the restoration but the current source set does not provide an exact treatment year.",
  },
  {
    id: "anderson-2014-altar-mural",
    churchSlug: "anderson-st-stanislaus-kostka",
    year: 2014,
    type: "repainting",
    summary: "A later mural above the altar was added in 2014, a modern layer explicitly separated from the restored historic ceiling painting.",
    sourceLabel: "St. Stanislaus Kostka Anderson — official church history",
    sourceUrl: "https://saintstans.org/church-history",
  },
  {
    id: "galveston-1968-parish-closure",
    churchSlug: "galveston-st-joseph-church",
    year: 1968,
    type: "stewardship",
    summary: "St. Joseph ceased functioning as an active parish in 1968 and later entered historic-site stewardship, changing the preservation context from parish maintenance to managed heritage property.",
    sourceLabel: "Galveston historical marker / heritage profile",
    sourceUrl: "https://www.galveston.com/whattodo/tours/self-guided-tours/historical-markers/st-josephs-church/",
  },
  {
    id: "galveston-ghf-stewardship",
    churchSlug: "galveston-st-joseph-church",
    year: 2024,
    type: "stewardship",
    summary: "Galveston Historical Foundation continues to preserve St. Joseph and uses special programming such as the Sacred Places Tour to support restoration of the building.",
    sourceLabel: "Galveston Historical Foundation — Sacred Places Tour",
    sourceUrl: "https://www.galvestonhistory.org/events/sacred-places-tour",
  },
  {
    id: "palestine-presbyterian-1986-restoration",
    churchSlug: "palestine-first-presbyterian-church",
    year: 1986,
    type: "restoration",
    summary: "The original sanctuary was restored in 1986; later survey documentation reported the hand-painted ceiling had not been retouched at the time of the 1989–1991 survey.",
    sourceLabel: "Portal to Texas History — Historic Resources Survey, First Presbyterian Church",
    sourceUrl: "https://texashistory.unt.edu/ark:/67531/metapth25684/",
  },
  {
    id: "houston-annunciation-2026-roof",
    churchSlug: "houston-annunciation-catholic-church",
    year: 2026,
    type: "conservation",
    summary: "Annunciation completed copper-roof valley repairs intended to prevent water intrusion and protect interior plaster and historic architectural fabric.",
    sourceLabel: "Church of the Annunciation — 2026 roof preservation",
    sourceUrl: "https://annunciationcc.org/story/roofrepair2026",
  },
  {
    id: "ihm-1944-original-stencils",
    churchSlug: "san-antonio-immaculate-heart-of-mary",
    year: 1944,
    type: "alteration",
    summary: "The documented stencil program was executed between January and May 1944 by a Mexican artist identified in the parish chronicle as Bartola.",
    sourceLabel: "Claretian Missionaries Archives — A Work of Heart",
    sourceUrl: "https://claretianmissionariesarchives.org/a-work-of-heart-a-history-of-the-painted-walls-of-immaculate-heart-of-mary-church/",
    contributorSlugs: ["bartola-ihm-san-antonio"],
  },
  {
    id: "ihm-1980s-domingo-restoration",
    churchSlug: "san-antonio-immaculate-heart-of-mary",
    year: 1985,
    yearLabel: "1980s",
    type: "restoration",
    summary: "Fr. Alberto Domingo led a major restoration of the painted interior, a later campaign that must be distinguished from Bartola's original 1944 stencil work.",
    sourceLabel: "Claretian Missionaries Archives — A Work of Heart",
    sourceUrl: "https://claretianmissionariesarchives.org/a-work-of-heart-a-history-of-the-painted-walls-of-immaculate-heart-of-mary-church/",
    contributorSlugs: ["fr-alberto-domingo"],
  },
  {
    id: "ihm-1991-arson",
    churchSlug: "san-antonio-immaculate-heart-of-mary",
    year: 1991,
    type: "disaster",
    summary: "An arson fire damaged the church and its interior, interrupting the earlier restoration history and requiring another major treatment campaign.",
    sourceLabel: "Claretian Missionaries Archives — A Work of Heart",
    sourceUrl: "https://claretianmissionariesarchives.org/a-work-of-heart-a-history-of-the-painted-walls-of-immaculate-heart-of-mary-church/",
  },
  {
    id: "ihm-1994-restoration",
    churchSlug: "san-antonio-immaculate-heart-of-mary",
    year: 1994,
    type: "restoration",
    summary: "The post-arson restoration was completed in 1994, creating the current preservation context for the church's painted walls.",
    sourceLabel: "Claretian Missionaries Archives — A Work of Heart",
    sourceUrl: "https://claretianmissionariesarchives.org/a-work-of-heart-a-history-of-the-painted-walls-of-immaculate-heart-of-mary-church/",
  },
  {
    id: "mason-painted-ceiling-covered",
    churchSlug: "mason-st-joseph-catholic-church",
    year: 1950,
    yearLabel: "mid twentieth century",
    type: "covering",
    summary: "Later acoustical tile concealed portions of Manuel Lopez's painted vaulted ceiling, temporarily hiding the historic decorative program.",
    sourceLabel: "Studio IO — St. Joseph Mason preservation project",
    sourceUrl: "https://www.studioiodesign.com/st-joseph-mason",
    qualification: "The current project history establishes the covering but this chronology does not assign a more precise installation year without a parish record.",
  },
  {
    id: "mason-1989-rediscovery",
    churchSlug: "mason-st-joseph-catholic-church",
    year: 1989,
    type: "rediscovery",
    summary: "The historic painted vault was rediscovered after removal of later covering material.",
    sourceLabel: "Studio IO — St. Joseph Mason preservation project",
    sourceUrl: "https://www.studioiodesign.com/st-joseph-mason",
  },
  {
    id: "mason-2024-restoration",
    churchSlug: "mason-st-joseph-catholic-church",
    year: 2024,
    type: "restoration",
    summary: "A major preservation campaign restored the historic church and its painted ceiling while adding complementary new decorative work that Texas Defined records separately from Manuel Lopez's 1916 scheme.",
    sourceLabel: "Studio IO — St. Joseph Mason preservation project",
    sourceUrl: "https://www.studioiodesign.com/st-joseph-mason",
  },
];

export const paintedChurchPreservationEventsBySlug = new Map(
  expandedPaintedChurches.map((church) => [
    church.slug,
    paintedChurchPreservationEvents
      .filter((event) => event.churchSlug === church.slug)
      .sort((a, b) => a.year - b.year || a.id.localeCompare(b.id)),
  ]),
);

export const paintedChurchPreservationChronologyGaps = expandedPaintedChurches
  .filter((church) => !(paintedChurchPreservationEventsBySlug.get(church.slug)?.length))
  .map((church) => ({
    slug: church.slug,
    name: church.name,
    city: church.city,
    reason: "No church-specific intervention/disaster/restoration chronology has yet cleared the source standard. This is a research gap, not evidence that the interior was never altered.",
  }));
