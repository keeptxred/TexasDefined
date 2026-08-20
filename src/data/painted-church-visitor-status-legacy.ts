export type PaintedChurchVisitorEvidenceScope =
  | "current-visitor-guidance"
  | "current-organization-information"
  | "historic-property-record-only";

export type PaintedChurchVisitorStatus = {
  slug: string;
  status: "touring-guidance-available" | "visitors-welcome" | "arrange-ahead" | "verify-before-travel";
  summary: string;
  controllingSourceUrl: string;
  controllingSourceLabel: string;
  evidenceScope: PaintedChurchVisitorEvidenceScope;
  checkedAt: string;
};

const CHECKED = "2026-08-19";
const CHAMBER = "https://www.schulenburgchamber.org/painted-churches";

const cluster = [
  "high-hill-nativity-of-mary",
  "ammannsville-st-john-the-baptist",
  "praha-st-marys-assumption",
  "dubina-saints-cyril-methodius",
  "moravia-ascension-of-our-lord",
  "st-john-texas-st-john-the-baptist",
];

export const paintedChurchVisitorStatuses: PaintedChurchVisitorStatus[] = [
  ...cluster.map((slug) => ({
    slug,
    status: "touring-guidance-available" as const,
    summary: "The Greater Schulenburg Chamber publishes current local Painted Churches touring guidance. Services, funerals, weddings, holy days and parish events still take priority.",
    controllingSourceUrl: CHAMBER,
    controllingSourceLabel: "Greater Schulenburg Chamber — Painted Churches",
    evidenceScope: "current-visitor-guidance" as const,
    checkedAt: CHECKED,
  })),
  {
    slug: "wallis-guardian-angel",
    status: "verify-before-travel",
    summary: "Guardian Angel is an active Wallis parish with current Mass, confession, adoration and parish contact information online, but Texas Defined has not located a church-controlled guarantee of sightseeing hours. Confirm access before a special visit.",
    controllingSourceUrl: "https://guardianangelwallis.org/",
    controllingSourceLabel: "Guardian Angel Catholic Church — Wallis",
    evidenceScope: "current-organization-information",
    checkedAt: CHECKED,
  },
  {
    slug: "wesley-brethren-church",
    status: "verify-before-travel",
    summary: "The Texas Historical Commission confirms the Wesley church at 9453 Wesley Church Lane and records the marker/property as publicly accessible, but Texas Defined has not located a current congregation-controlled sightseeing schedule. Verify current conditions before traveling specifically to enter the church.",
    controllingSourceUrl: "https://atlas.thc.texas.gov/Details/5477008405",
    controllingSourceLabel: "Texas Historical Commission — Wesley Brethren Church marker/property record",
    evidenceScope: "historic-property-record-only",
    checkedAt: CHECKED,
  },
  {
    slug: "amarillo-first-baptist-church",
    status: "verify-before-travel",
    summary: "The National Register/THC record confirms the historic property at 218 W. 13th Street, but Texas Defined has not verified a current public sightseeing policy or responsible visitor organization for the historic building. Treat it as a research property, not a guaranteed touring stop.",
    controllingSourceUrl: "https://atlas.thc.texas.gov/Details?atlasnumber=2083003158",
    controllingSourceLabel: "Texas Historical Commission — historic First Baptist Church property",
    evidenceScope: "historic-property-record-only",
    checkedAt: CHECKED,
  },
  {
    slug: "umbarger-st-marys-catholic-church",
    status: "verify-before-travel",
    summary: "St. Mary's is an active Umbarger parish. The Diocese of Amarillo currently publishes the parish address, website and worship schedule; verify sightseeing access with the parish before traveling specifically to study the Italian POW artwork.",
    controllingSourceUrl: "https://amarillodiocese.org/parishfinder",
    controllingSourceLabel: "Catholic Diocese of Amarillo — St. Mary's Catholic Church, Umbarger",
    evidenceScope: "current-organization-information",
    checkedAt: CHECKED,
  },
  {
    slug: "paris-first-united-methodist-church",
    status: "verify-before-travel",
    summary: "First United Methodist remains an active congregation at 322 Lamar Avenue. The United Methodist Church directory confirms the current church identity, but Texas Defined has not found congregation-published sightseeing hours for the historic interior. Contact the church before a special architecture visit.",
    controllingSourceUrl: "https://www.umc.org/en/find-a-church/church?id=001Um00000PEpKjIAL",
    controllingSourceLabel: "The United Methodist Church — First United Methodist Church of Paris",
    evidenceScope: "current-organization-information",
    checkedAt: CHECKED,
  },
  {
    slug: "lindsay-st-peters-catholic-church",
    status: "visitors-welcome",
    summary: "St. Peter's official parish site says the church is open to visitors from 8:30 a.m. to 5:00 p.m. and asks visitors not to photograph or tour during Mass or Adoration. Group tours can be arranged through the parish office and are free, with donations welcomed.",
    controllingSourceUrl: "https://stpeterlindsay.org/about-us",
    controllingSourceLabel: "St. Peter Catholic Church — Lindsay visitor guidance",
    evidenceScope: "current-visitor-guidance",
    checkedAt: CHECKED,
  },
  {
    slug: "fredericksburg-st-marys-catholic-church",
    status: "verify-before-travel",
    summary: "St. Mary's is an active parish and a major visitor destination. Confirm current visitor guidance and liturgical schedules with the parish before travel.",
    controllingSourceUrl: "https://church.stmarysfbg.com/",
    controllingSourceLabel: "St. Mary's Catholic Church — Fredericksburg",
    evidenceScope: "current-organization-information",
    checkedAt: CHECKED,
  },
  {
    slug: "sweet-home-queen-of-peace",
    status: "verify-before-travel",
    summary: "Queen of Peace is an active Sweet Home parish. Its official parish and Diocese of Victoria sources publish current church identity, contact information and liturgy schedules, but no guaranteed sightseeing hours; verify access before traveling specifically for the painted interior.",
    controllingSourceUrl: "https://qpcatholicchurch.com/about-us",
    controllingSourceLabel: "Queen of Peace Catholic Church — Sweet Home",
    evidenceScope: "current-organization-information",
    checkedAt: CHECKED,
  },
  {
    slug: "st-marys-immaculate-conception-lavaca",
    status: "verify-before-travel",
    summary: "Immaculate Conception at St. Mary remains part of the active Hallettsville-area parish network. Sacred Heart Hallettsville publishes current St. Mary liturgies and the Diocese of Victoria identifies the current clergy responsible for St. Mary. Verify church access before a special sightseeing trip.",
    controllingSourceUrl: "https://shcatholicchurch.org/liturgies",
    controllingSourceLabel: "Sacred Heart Catholic Church Hallettsville — current St. Mary liturgies",
    evidenceScope: "current-organization-information",
    checkedAt: CHECKED,
  },
  {
    slug: "shiner-saints-cyril-methodius",
    status: "visitors-welcome",
    summary: "The official Shiner parish history describes visitors from around the world stopping to photograph and tour the church. It remains an active parish, so verify current access and avoid touring during worship or private parish activity.",
    controllingSourceUrl: "https://sscmshiner.org/historical-marker",
    controllingSourceLabel: "Sts. Cyril & Methodius Catholic Church — Shiner official history",
    evidenceScope: "current-visitor-guidance",
    checkedAt: CHECKED,
  },
  {
    slug: "serbin-st-paul-lutheran-church",
    status: "verify-before-travel",
    summary: "St. Paul is an active Serbin congregation with current worship schedules and church information online. Texas Defined has not found a congregation-published sightseeing-hours guarantee; verify access before traveling specifically to study the historic interior.",
    controllingSourceUrl: "https://www.stpaulserbin.org/",
    controllingSourceLabel: "St. Paul Lutheran Church — Serbin",
    evidenceScope: "current-organization-information",
    checkedAt: CHECKED,
  },
  {
    slug: "panna-maria-immaculate-conception",
    status: "visitors-welcome",
    summary: "The official parish site currently states that visitors are welcome and the church is open daily. Mass and parish activity still take priority.",
    controllingSourceUrl: "https://www.pannamariachurch.com/",
    controllingSourceLabel: "Immaculate Conception Parish — Panna Maria",
    evidenceScope: "current-visitor-guidance",
    checkedAt: CHECKED,
  },
  {
    slug: "plantersville-st-marys-catholic-church",
    status: "verify-before-travel",
    summary: "St. Mary is an active Plantersville parish. The Archdiocese of Galveston-Houston currently confirms the church at 8227 County Road 205, its parish website and worship information; verify sightseeing access directly before a special trip.",
    controllingSourceUrl: "https://www.archgh.org/parishfinder",
    controllingSourceLabel: "Archdiocese of Galveston-Houston — St. Mary Church, Plantersville",
    evidenceScope: "current-organization-information",
    checkedAt: CHECKED,
  },
  {
    slug: "corn-hill-holy-trinity-catholic-church",
    status: "verify-before-travel",
    summary: "Holy Trinity is an active parish. Verify current access, Masses and parish events with the official parish before making a special sightseeing trip.",
    controllingSourceUrl: "https://holytrinityofcornhill.org/",
    controllingSourceLabel: "Holy Trinity Catholic Church of Corn Hill",
    evidenceScope: "current-organization-information",
    checkedAt: CHECKED,
  },
  {
    slug: "palestine-sacred-heart-catholic-church",
    status: "arrange-ahead",
    summary: "The parish states that the church is not open to the public outside scheduled Mass, Confession and Adoration; sightseeing visitors should call or email ahead.",
    controllingSourceUrl: "https://shpalestine.org/visit",
    controllingSourceLabel: "Sacred Heart Palestine — official visit guidance",
    evidenceScope: "current-visitor-guidance",
    checkedAt: CHECKED,
  },
  {
    slug: "bandera-st-stanislaus-catholic-church",
    status: "verify-before-travel",
    summary: "St. Stanislaus is an active parish. Verify current worship and parish schedules before a sightseeing visit.",
    controllingSourceUrl: "https://www.ststanislausbandera.com/",
    controllingSourceLabel: "St. Stanislaus Catholic Church — Bandera",
    evidenceScope: "current-organization-information",
    checkedAt: CHECKED,
  },
  {
    slug: "corpus-christi-sacred-heart-catholic-church",
    status: "verify-before-travel",
    summary: "Sacred Heart is an active Corpus Christi parish. Verify current Masses, parish events and sightseeing access with the official parish before making a special trip to view Antonio E. Garcia's frescoes.",
    controllingSourceUrl: "https://www.sacredheartcorpus.org/",
    controllingSourceLabel: "Sacred Heart Catholic Church — Corpus Christi",
    evidenceScope: "current-organization-information",
    checkedAt: CHECKED,
  },
  {
    slug: "san-antonio-st-joseph-catholic-church",
    status: "verify-before-travel",
    summary: "St. Joseph is an active downtown San Antonio parish. Confirm current church hours, Masses and event access with the parish before planning a sightseeing visit.",
    controllingSourceUrl: "https://www.stjsa.org/",
    controllingSourceLabel: "St. Joseph Catholic Church — San Antonio",
    evidenceScope: "current-organization-information",
    checkedAt: CHECKED,
  },
  {
    slug: "anderson-st-stanislaus-kostka",
    status: "verify-before-travel",
    summary: "St. Stanislaus Kostka is an active Grimes County parish with current Mass, confession and parish-event schedules. Verify sightseeing access before traveling specifically to view the historic decorative interior.",
    controllingSourceUrl: "https://saintstans.org/",
    controllingSourceLabel: "St. Stanislaus Kostka Catholic Church — Anderson",
    evidenceScope: "current-organization-information",
    checkedAt: CHECKED,
  },
  {
    slug: "castroville-st-louis-catholic-church",
    status: "verify-before-travel",
    summary: "St. Louis is an active Castroville parish with current Mass, confession and office schedules. Confirm church access before making a special sightseeing trip; worship and parish events take priority.",
    controllingSourceUrl: "https://www.saintlouisdaycastroville.org/",
    controllingSourceLabel: "St. Louis Catholic Church — Castroville",
    evidenceScope: "current-organization-information",
    checkedAt: CHECKED,
  },
  {
    slug: "lacoste-our-lady-of-grace",
    status: "verify-before-travel",
    summary: "Our Lady of Grace is an active La Coste parish with current Mass and office information published online. Confirm sightseeing access before traveling specifically to study the decorative interior.",
    controllingSourceUrl: "https://olgtx.org/",
    controllingSourceLabel: "Our Lady of Grace Catholic Church — La Coste",
    evidenceScope: "current-organization-information",
    checkedAt: CHECKED,
  },
  {
    slug: "galveston-st-joseph-church",
    status: "arrange-ahead",
    summary: "St. Joseph's is preserved by Galveston Historical Foundation and is available as a historic property/special-event venue rather than operating as a regular parish. Contact or check the Foundation before traveling specifically for interior access.",
    controllingSourceUrl: "https://www.galvestonhistory.org/sites/ghf-managed-properties",
    controllingSourceLabel: "Galveston Historical Foundation — 1859 St. Joseph's Church",
    evidenceScope: "current-organization-information",
    checkedAt: CHECKED,
  },
];

export const paintedChurchVisitorStatusBySlug = new Map(paintedChurchVisitorStatuses.map((item) => [item.slug, item]));

export function resolvePaintedChurchVisitorStatus(slug: string): PaintedChurchVisitorStatus {
  const result = paintedChurchVisitorStatusBySlug.get(slug);
  if (!result) throw new Error(`Missing explicit visitor-status research for verified Painted Church: ${slug}`);
  return result;
}
