import type {
  TexasIconCategory,
  TexasIconRosterEntry,
  TexasIconSubjectType,
} from "@/data/texas-icons-types";
import { TEXAS_ICON_SOURCE_HISTORY_MUSIC } from "@/data/texas-icons-source-history-music.server";
import { TEXAS_ICON_SOURCE_SPORTS_BUSINESS } from "@/data/texas-icons-source-sports-business.server";
import { TEXAS_ICON_SOURCE_MEDIA_SYMBOLS } from "@/data/texas-icons-source-media-symbols.server";

// The source fragments above are the exact intake supplied by the site owner on 2026-08-25.
// Their Description field is a roster note, not a publishable authority citation.
const RAW_TEXAS_ICON_CSV = [
  "Rank,Name,Category,Description",
  TEXAS_ICON_SOURCE_HISTORY_MUSIC,
  TEXAS_ICON_SOURCE_SPORTS_BUSINESS,
  TEXAS_ICON_SOURCE_MEDIA_SYMBOLS,
].join("\n");

const CATEGORY_MAP: Record<string, TexasIconCategory> = {
  "History & Politics": "history-politics",
  "Music & Culture": "music-culture",
  "Sports": "sports",
  "Business & Science": "business-science",
  "Media & Arts": "media-arts",
  "Symbols & Food": "symbols-food",
};

const ALIASES: Readonly<Record<string, readonly string[]>> = {
  "Beyoncé Knowles": ["Beyoncé", "Beyonce Knowles", "Beyonce"],
  "Selena Quintanilla": ["Selena", "Selena Quintanilla-Pérez", "Selena Quintanilla-Perez"],
  "JJ Watt": ["J.J. Watt"],
  "AJ Foyt": ["A.J. Foyt"],
  "George H.W. Bush": ["George H. W. Bush", "George Herbert Walker Bush"],
  "William 'Bill' Clements": ["Bill Clements", "William P. Clements Jr.", "William Clements"],
  "H.L. Hunt": ["H. L. Hunt"],
  "T. Boone Pickens": ["T Boone Pickens"],
  "Lightnin' Hopkins": ["Lightnin Hopkins"],
  "The Chicks": ["Dixie Chicks"],
  "José Antonio Navarro": ["Jose Antonio Navarro"],
  "Juan Seguín": ["Juan Seguin"],
  "Henry B. González": ["Henry B. Gonzalez"],
  "Flaco Jiménez": ["Flaco Jimenez"],
  "Renée Zellweger": ["Renee Zellweger"],
  "José Altuve": ["Jose Altuve"],
  "Hakeem Olajuwon": ["Akeem Olajuwon"],
  "Shaquille O'Neal": ["Shaquille O-Neal"],
  "Babe Didrikson Zaharias": ["Babe Didrikson"],
  "Davy Crockett": ["David Crockett"],
  "Stephen F. Austin": ["Stephen Fuller Austin"],
  "Lyndon B. Johnson": ["LBJ", "Lyndon Johnson"],
  "George W. Bush": ["George Walker Bush"],
  "Lady Bird Johnson": ["Claudia Alta Taylor Johnson"],
  "J. Frank Dobie": ["James Frank Dobie"],
  "Roy Bedichek": ["Roy Bedichek"],
  "Walter Prescott Webb": ["Walter P. Webb"],
  "Kris Kristofferson": ["Kristoffer Kristofferson"],
  "Lead Belly": ["Huddie Ledbetter", "Huddie William Ledbetter"],
  "T-Bone Walker": ["T Bone Walker"],
  "DJ Screw": ["Robert Earl Davis Jr."],
  "Pimp C": ["Chad Butler"],
  "Erykah Badu": ["Erica Wright"],
  "Patrick Mahomes": ["Patrick Mahomes II"],
  "Deion Sanders": ["Deion Luwynn Sanders"],
  "Michael Dell": ["Michael S. Dell"],
  "Michael DeBakey": ["Michael E. DeBakey"],
  "Denton Cooley": ["Denton A. Cooley"],
  "Gene Kranz": ["Eugene Kranz"],
  "Alan Bean": ["Alan LaVern Bean"],
  "John Young": ["John Watts Young"],
  "Bernard Harris": ["Bernard A. Harris Jr."],
  "Peggy Whitson": ["Peggy A. Whitson"],
  "Matthew McConaughey": ["Matthew David McConaughey"],
  "Tommy Lee Jones": ["Tommy Lee Jones"],
  "Dan Rather": ["Dan Irvin Rather Jr."],
  "Bill Moyers": ["Bill D. Moyers"],
  "Gene Roddenberry": ["Eugene Wesley Roddenberry"],
};

const CANONICAL_PATHS: Readonly<Record<string, string>> = {
  "The Alamo": "/destination/the-alamo",
  "Cadillac Ranch": "/destination/cadillac-ranch",
  "Space Center Houston": "/destination/space-center-houston",
  "Big Bend National Park": "/destination/big-bend-national-park",
  "Palo Duro Canyon": "/destination/palo-duro-canyon-state-park",
  "San Antonio River Walk": "/destination/san-antonio-river-walk",
  "Enchanted Rock": "/destination/enchanted-rock-state-natural-area",
  "Sam Houston": "/article/sam-houston-texas-life-legacy",
  "Stephen F. Austin": "/article/stephen-f-austin-father-of-texas",
  "Davy Crockett": "/article/davy-crockett-texas-alamo-legend",
  "Jim Bowie": "/article/james-bowie-texas-alamo-life-legend",
  "William B. Travis": "/article/william-barret-travis-alamo-commander",
  "Juan Seguín": "/article/juan-seguin-tejano-texas-revolution",
  "Mirabeau B. Lamar": "/article/mirabeau-b-lamar-president-republic-texas",
  "Chester W. Nimitz": "/article/chester-nimitz-texas-fleet-admiral",
  "Audie Murphy": "/article/audie-murphy-texas-war-hero-actor",
  "King Ranch": "/article/king-ranch-texas-history-cattle-legacy",
  "H-E-B": "/article/heb-texas-grocery-history-culture",
  "Blue Bell Ice Cream": "/article/blue-bell-ice-cream-brenham-texas-history",
  "Buc-ee's": "/article/bucees-texas-road-trip-history",
  "Dr Pepper": "/dr-pepper-texas-history",
  "Chili Con Carne": "/texas-chili-con-carne-history",
  "The Lone Star Flag": "/article/history-of-the-texas-flag",
};

const GROUPS = new Set<string>(["Asleep at the Wheel", "Geto Boys", "Khruangbin", "Pantera", "Spoon", "The Chicks", "ZZ Top"]);
const BRANDS = new Set<string>(["Blue Bell Ice Cream", "Buc-ee's", "Dr Pepper", "H-E-B", "Shiner Bock", "Whataburger"]);
const PLACES = new Set<string>(["Big Bend National Park", "Cadillac Ranch", "Enchanted Rock", "King Ranch", "Palo Duro Canyon", "Prada Marfa", "San Antonio River Walk", "Space Center Houston", "The Alamo", "The Cotton Bowl"]);
const FOODS = new Set<string>(["Chili Con Carne", "Texas Sheet Cake", "Texas Smoked Brisket"]);
const SYMBOLS = new Set<string>(["Big Tex", "Texas Longhorn", "The Bluebonnet", "The Cowboy Boot", "The Lone Star Flag", "The Texas Mockingbird"]);

function subjectType(name: string): TexasIconSubjectType {
  if (GROUPS.has(name)) return "group";
  if (BRANDS.has(name)) return "brand";
  if (PLACES.has(name)) return "place";
  if (FOODS.has(name)) return "food";
  if (SYMBOLS.has(name)) return "symbol";
  return "person";
}

function slugify(value: string) {
  return value
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/['’]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function normalizeTexasIconKey(value: string) {
  return value
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/['’".,()]/g, "")
    .replace(/\b(the)\b/g, " ")
    .replace(/[^a-z0-9]+/g, " ")
    .trim()
    .replace(/\s+/g, " ");
}

function parseCsv(source: string) {
  const rows: string[][] = [];
  let row: string[] = [];
  let field = "";
  let quoted = false;

  for (let index = 0; index < source.length; index += 1) {
    const character = source[index];
    const next = source[index + 1];
    if (quoted) {
      if (character === '"' && next === '"') {
        field += '"';
        index += 1;
      } else if (character === '"') {
        quoted = false;
      } else {
        field += character;
      }
      continue;
    }
    if (character === '"') {
      quoted = true;
    } else if (character === ",") {
      row.push(field);
      field = "";
    } else if (character === "\n") {
      row.push(field.replace(/\r$/, ""));
      rows.push(row);
      row = [];
      field = "";
    } else {
      field += character;
    }
  }
  if (field.length || row.length) {
    row.push(field.replace(/\r$/, ""));
    rows.push(row);
  }
  return rows;
}

function buildRoster(): readonly TexasIconRosterEntry[] {
  const rows = parseCsv(RAW_TEXAS_ICON_CSV);
  const [header, ...dataRows] = rows;
  if (header?.join("|") !== "Rank|Name|Category|Description") {
    throw new Error(`Unexpected Texas Icons CSV header: ${header?.join("|") ?? "missing"}`);
  }

  const roster = dataRows.map(([rankText, name, categoryLabel, rosterNote]) => {
    const category = CATEGORY_MAP[categoryLabel];
    if (!category) throw new Error(`Unknown Texas Icons category: ${categoryLabel}`);
    const rank = Number(rankText);
    if (!Number.isInteger(rank)) throw new Error(`Invalid Texas Icons rank: ${rankText}`);
    if (!name || !rosterNote) throw new Error(`Incomplete Texas Icons source row at rank ${rankText}`);

    return {
      rank,
      slug: slugify(name),
      name,
      category,
      subjectType: subjectType(name),
      rosterNote,
      aliases: ALIASES[name] ?? [],
      ...(CANONICAL_PATHS[name] ? { canonicalPath: CANONICAL_PATHS[name] } : {}),
    } satisfies TexasIconRosterEntry;
  });

  const slugs = roster.map((entry) => entry.slug);
  const names = roster.map((entry) => normalizeTexasIconKey(entry.name));
  if (roster.length !== 250) throw new Error(`Texas Icons roster must contain 250 records; found ${roster.length}.`);
  if (new Set(slugs).size !== roster.length) throw new Error("Texas Icons roster contains duplicate slugs.");
  if (new Set(names).size !== roster.length) throw new Error("Texas Icons roster contains normalized duplicate names.");
  return roster;
}

export const TEXAS_ICON_ROSTER = buildRoster();

export function getTexasIconBySlug(slug: string) {
  return TEXAS_ICON_ROSTER.find((entry) => entry.slug === slug) ?? null;
}

export function getRelatedTexasIcons(entry: TexasIconRosterEntry, limit = 8) {
  return TEXAS_ICON_ROSTER
    .filter((candidate) => candidate.slug !== entry.slug && candidate.category === entry.category)
    .sort((left, right) =>
      Math.abs(left.rank - entry.rank) - Math.abs(right.rank - entry.rank)
      || left.rank - right.rank)
    .slice(0, limit);
}
