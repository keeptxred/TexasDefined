/**
 * Recover provisional institution boundaries from the owner's historical
 * concatenated museum inventory. This is an audit parser, NOT a publication
 * or proof-of-existence mechanism.
 */
const ENDINGS = [
  "Museum", "Museums", "Center", "Gallery", "Galleries", "Mansion", "House",
  "Park", "Farm", "Village", "Ranch", "Archives", "Library", "Foundation",
  "Depot", "Exhibit", "Memorial", "Monument", "Chapel", "Artpace", "Art",
  "Arts", "Theatre", "Square", "Site", "Station", "System", "Palace",
  "Sanctuary", "War", "Texas", "History", "Heritage", "Institute",
  "Association",
].sort((a, b) => b.length - a.length);

const suffixBoundary = new RegExp("(" + ENDINGS.join("|") + ")(?=[A-Z0-9])", "g");
const SURNAME_JOIN = "\uE000";

/**
 * No returned item is a verified or unique Texas museum. Any questionable
 * records must receive operator research, location validation and de-duplication.
 */
export function segmentOwnerMuseumNames(raw) {
  return String(raw).replace(/\r/g, "").split("\n")
    .flatMap((line) => line
      .replace(suffixBoundary, "$1\n")
      .replace(/\)(?=[A-Z0-9])/g, ")\n")
      // Joined compound surnames (GardensDeLeon) mark distinct entries.
      .replace(/([a-z])((?:Mc|Mac|De|Du)[A-Z])/g, "$1\n$2")
      // Proper nouns like McNay, McFaddin-Ward, DeGolyer, DeLeon,
      // DuBois and MacArthur must not be cut into false institutions.
      .replace(/\b(?:Mc|Mac|De|Du)(?=[A-Z])[A-Za-z]+/g, (name) =>
        name.replace(/([a-z])([A-Z])/g, "$1" + SURNAME_JOIN + "$2"))
      .replace(/([a-z])([A-Z])/g, "$1\n$2")
      .replaceAll(SURNAME_JOIN, "")
      .split("\n"))
    .map((name) => name.trim()).filter(Boolean);
}

export function ownerMuseumIdentityKey(name) {
  return String(name).toLowerCase().normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]/g, "");
}

export function provisionalIdentityIssues(name) {
  const issues = [];
  if (/\b(?:wait|skip|substitute|let's|that's)\b|\s->\s/i.test(name))
    issues.push("owner-annotation-or-proposed-substitution");
  if (/\b(?:southern new mexico wing|museum of the red river|museum of the western prairie|mabee-gerrer|mid-america museum of aviation|cade museum of science)\b/i.test(name))
    issues.push("geographic-identity-review");
  if (/[<>]|\bMuseums?\b.*\bMuseums?\b/i.test(name))
    issues.push("possibly-concatenated-or-invalid-record");
  if (name.length < 8) issues.push("suspiciously-short-name");
  return issues;
}
