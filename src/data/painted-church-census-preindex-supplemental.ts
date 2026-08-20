import type { PaintedChurchCensusEntry } from "./painted-church-census-legacy";

/**
 * Statewide leads surfaced during the final pre-index authority audit.
 * Inclusion in this ledger is not inclusion in the verified collection.
 */
export const supplementalPaintedChurchCensus: PaintedChurchCensusEntry[] = [
  {
    slug: "kosciusko-st-anns-catholic-church",
    name: "St. Ann Catholic Church",
    city: "Kosciusko",
    status: "research-lead",
    reason: "A dedicated Painted Churches photographic catalog identifies St. Ann at Kosciusko among Texas painted churches, while Wilson County and historical-marker sources independently verify the Polish/Silesian Catholic community and the current 1951 church. Texas Defined has not yet located a primary parish, diocesan, archival or preservation source that documents the exact surviving painted program, its authorship or integrity, so the church remains a research lead rather than a verified profile.",
    sourceUrls: [
      "https://www.jasonmerlo.com/gallery/painted-churches-texas/",
      "https://www.hmdb.org/m.asp?m=101865",
    ],
  },
  {
    slug: "moulton-zion-lutheran-church",
    name: "Zion Lutheran Church",
    city: "Moulton",
    status: "research-lead",
    reason: "Regional Painted Churches touring catalogs surface Zion Lutheran as a possible decorative-interior stop. Texas Defined has not yet located a church-specific primary or archival record proving a qualifying surviving painted program, so this remains discovery-stage research.",
    sourceUrls: ["https://houstonhistoricaltours.com/painted-churches-tour/"],
  },
  {
    slug: "moulton-st-joseph-catholic-church",
    name: "St. Joseph Catholic Church",
    city: "Moulton",
    status: "research-lead",
    reason: "Regional historic-church touring sources group St. Joseph at Moulton with Painted Churches travel. Exact decorative-interior evidence, authorship and present integrity still require primary or archival verification before Texas Defined will count it.",
    sourceUrls: ["https://houstonhistoricaltours.com/painted-churches-tour/"],
  },
  {
    slug: "hostyn-queen-of-the-holy-rosary",
    name: "Queen of the Holy Rosary Catholic Church",
    city: "Hostyn",
    status: "historic-loss",
    reason: "Hostyn repeatedly appears in Painted Churches and Czech Catholic heritage searches, but the historic church was destroyed by fire in 2022 and a replacement church now occupies the site. Texas Defined keeps Hostyn in the statewide ledger as a preservation/loss case rather than silently treating the present building as the same historic painted interior.",
    sourceUrls: [
      "https://www.queenholyrosaryhostyn.com/",
      "https://www.fayettecountyrecord.com/news/hostyn-church-destroyed-fire",
    ],
  },
  {
    slug: "new-ulm-sts-peter-and-paul-catholic-church",
    name: "Sts. Peter and Paul Catholic Church",
    city: "New Ulm",
    status: "research-lead",
    reason: "Broader regional church-tour catalogs surface New Ulm as a historic decorative-interior candidate. Texas Defined is retaining it as a lead until a church-specific primary or archival source establishes the painted program, date and surviving integrity.",
    sourceUrls: ["https://houstonhistoricaltours.com/painted-churches-tour/"],
  },
  {
    slug: "fayetteville-brethren-church",
    name: "Fayetteville Brethren Church",
    city: "Fayetteville",
    status: "research-lead",
    reason: "The broader Czech/Brethren heritage landscape makes Fayetteville relevant to statewide Painted Churches research, but Texas Defined has not yet verified an exact qualifying decorative-interior program. The church stays in the ledger pending church-specific evidence.",
    sourceUrls: ["https://houstonhistoricaltours.com/painted-churches-tour/"],
  },
  {
    slug: "giddings-first-presbyterian-church",
    name: "First Presbyterian Church",
    city: "Giddings",
    status: "research-lead",
    reason: "Regional Painted Churches touring material surfaces First Presbyterian in Giddings as a potential decorative-interior stop. The current evidence is discovery-level rather than sufficient for verified inclusion, so Texas Defined requires exact interior and present-condition documentation before promotion.",
    sourceUrls: ["https://houstonhistoricaltours.com/painted-churches-tour/"],
  },
];
