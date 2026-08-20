import type { PaintedChurchCensusEntry } from "./painted-church-census-legacy";

/**
 * Statewide leads surfaced during the final pre-index authority audit.
 * Inclusion in this ledger is not inclusion in the verified collection.
 */
export const supplementalPaintedChurchCensus: PaintedChurchCensusEntry[] = [
  {
    slug: "mason-st-joseph-catholic-church",
    name: "St. Joseph Catholic Church",
    city: "Mason",
    status: "candidate",
    reason: "High-priority promotion candidate with church-specific primary evidence. The active parish's own historical study states that artist Manuel Lopez painted the interior in 1916: light-blue walls, an opening-sky scene behind the altar with a hovering dove, and a ceiling filled with clouds, stars and angels. The same parish now documents a 2024 remodel, so Texas Defined is holding promotion until the current decorative integrity is reconciled against that renovation and a rights-cleared current visual record is secured. This is stronger inclusion evidence than a tourism-list mention and should be promoted once the launch package is complete.",
    sourceUrls: [
      "https://stjosephmason.org/about-us",
      "https://stjosephmason.org/photoalbums/st-joseph-church-remodel-2024",
      "https://business.masontx.org/community-calendar/Details/feast-of-saint-joseph-sicilian-dinner-fundraiser-1672519?sourceTypeId=Website",
    ],
  },
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
    reason: "Regional Painted Churches tours include Zion Lutheran, and THC verifies the 1904 German Lutheran church. Current official-history material documents the congregation and building but does not establish a church-specific surviving painted program, artist, decorative campaign or integrity classification. Until primary or archival evidence identifies the qualifying paintwork, Texas Defined keeps Zion as a discovery-stage lead rather than inferring significance from tour-list placement.",
    sourceUrls: [
      "https://atlas.thc.texas.gov/Details?atlasnumber=5285005959",
      "https://houstonhistoricaltours.com/painted.html",
    ],
  },
  {
    slug: "moulton-st-joseph-catholic-church",
    name: "St. Joseph Catholic Church",
    city: "Moulton",
    status: "research-lead",
    reason: "The active parish documents the present church, its 1924 cornerstone and renovations in 1967 and 1992, while THC confirms the German/Czech parish history. A regional Painted Churches tour includes the church, but the verified parish/THC sources currently do not identify a qualifying historic painted program, named decorative artist or surviving technique. Texas Defined therefore does not promote Moulton St. Joseph on tourism-list evidence alone.",
    sourceUrls: [
      "https://stjosephsmoulton.org/about-st-josephs",
      "https://atlas.thc.texas.gov/Details/5285005047",
      "https://houstonhistoricaltours.com/painted.html",
    ],
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
    city: "Frelsburg / New Ulm area",
    status: "research-lead",
    reason: "Current parish history verifies the historic Frelsburg Catholic community and its present church, including ornate German altars and later stained glass, while regional tours surface the church as a possible Painted Churches stop. Texas Defined has not yet located primary or archival evidence for a qualifying surviving painted wall/ceiling program, its author or date, so the church remains a research lead rather than being promoted on architectural ornament alone.",
    sourceUrls: [
      "https://peterandpaulparish.com/",
      "https://houstonhistoricaltours.com/painted.html",
    ],
  },
  {
    slug: "fayetteville-brethren-church",
    name: "Fayetteville Brethren Church",
    city: "Fayetteville",
    status: "research-lead",
    reason: "The active Brethren congregation and Unity of the Brethren records document the historic church, repeated sanctuary rededications and a historically renovated interior. Those sources have not yet produced church-specific evidence identifying a surviving decorative-painting program, artist or technique comparable to Wesley Brethren Church. Texas Defined therefore keeps Fayetteville in the ledger pending exact decorative evidence.",
    sourceUrls: [
      "https://unityofthebrethren.org/wp-content/themes/unityofthebrethren/pdf/BJ201106.pdf",
      "https://unityofthebrethren.org/wp-content/themes/unityofthebrethren/pdf/BJ201301.pdf",
      "https://houstonhistoricaltours.com/painted.html",
    ],
  },
  {
    slug: "giddings-first-presbyterian-church",
    name: "First Presbyterian Church",
    city: "Giddings",
    status: "research-lead",
    reason: "Presbyterian archival indexes verify First Presbyterian Church of Giddings as a historic congregation, and local visitor material documents its continuously used 1886 sanctuary. The current source trail does not identify a qualifying painted decorative program; regional material more clearly identifies nearby St. Paul Lutheran at Serbin as a Painted Church. Texas Defined keeps Giddings First Presbyterian as a research lead until exact interior evidence is found.",
    sourceUrls: [
      "https://www.austinseminary.edu/uploaded/stitt_library/archives/pdf/indexcongregationalrecords.pdf",
      "https://www.independencetitle.com/wp-content/uploads/GiddingsTexas.pdf",
    ],
  },
];
