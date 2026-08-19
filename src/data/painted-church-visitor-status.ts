export type PaintedChurchVisitorStatus = {
  slug: string;
  status: "touring-guidance-available" | "visitors-welcome" | "arrange-ahead" | "verify-before-travel";
  summary: string;
  controllingSourceUrl?: string;
  controllingSourceLabel?: string;
  checkedAt: string;
};

const CHECKED = "2026-08-18";
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
    checkedAt: CHECKED,
  })),
  {
    slug: "panna-maria-immaculate-conception",
    status: "visitors-welcome",
    summary: "The official parish site currently states that visitors are welcome and the church is open daily. Mass and parish activity still take priority.",
    controllingSourceUrl: "https://www.pannamariachurch.com/",
    controllingSourceLabel: "Immaculate Conception Parish — Panna Maria",
    checkedAt: CHECKED,
  },
  {
    slug: "palestine-sacred-heart-catholic-church",
    status: "arrange-ahead",
    summary: "The parish states that the church is not open to the public outside scheduled Mass, Confession and Adoration; sightseeing visitors should call or email ahead.",
    controllingSourceUrl: "https://shpalestine.org/visit",
    controllingSourceLabel: "Sacred Heart Palestine — official visit guidance",
    checkedAt: CHECKED,
  },
  {
    slug: "corn-hill-holy-trinity-catholic-church",
    status: "verify-before-travel",
    summary: "Holy Trinity is an active parish. Verify current access, Masses and parish events with the official parish before making a special sightseeing trip.",
    controllingSourceUrl: "https://holytrinityofcornhill.org/",
    controllingSourceLabel: "Holy Trinity Catholic Church of Corn Hill",
    checkedAt: CHECKED,
  },
  {
    slug: "bandera-st-stanislaus-catholic-church",
    status: "verify-before-travel",
    summary: "St. Stanislaus is an active parish. Verify current worship and parish schedules before a sightseeing visit.",
    controllingSourceUrl: "https://www.ststanislausbandera.com/",
    controllingSourceLabel: "St. Stanislaus Catholic Church — Bandera",
    checkedAt: CHECKED,
  },
  {
    slug: "fredericksburg-st-marys-catholic-church",
    status: "verify-before-travel",
    summary: "St. Mary's is an active parish and a major visitor destination. Confirm current visitor guidance and liturgical schedules with the parish before travel.",
    controllingSourceUrl: "https://church.stmarysfbg.com/",
    controllingSourceLabel: "St. Mary's Catholic Church — Fredericksburg",
    checkedAt: CHECKED,
  },
];

export const paintedChurchVisitorStatusBySlug = new Map(paintedChurchVisitorStatuses.map((item) => [item.slug, item]));

export function resolvePaintedChurchVisitorStatus(slug: string): PaintedChurchVisitorStatus {
  return paintedChurchVisitorStatusBySlug.get(slug) ?? {
    slug,
    status: "verify-before-travel",
    summary: "Texas Defined does not currently have a church-controlled public-access guarantee for this property. Verify current access directly before making a special trip; active worship and private events take priority.",
    checkedAt: CHECKED,
  };
}
