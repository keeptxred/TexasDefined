/**
 * Strict identity check for a lake-specific TPWD fisheries/regulations heading.
 * TPWD spells Lake LBJ out as "Lake Lyndon B. Johnson" on its official lake
 * profile. Preserve the public Lake LBJ slug without treating the real source
 * heading as drift. Do not generalize aliases or bypass domain/HTTP checks.
 */
const generic = new Set(["lake", "reservoir", "state", "park", "international"]);
const normalize = (value) => String(value).normalize("NFKD").toLowerCase().replace(/[^a-z0-9]/g, "");

const exactOfficialHeadings = Object.freeze({
  "lake-lbj": ["Lake Lyndon B. Johnson"],
});

export function matchesTpwdLakeHeading({ slug, kind }, heading) {
  if (typeof slug !== "string" || typeof heading !== "string" || typeof kind !== "string") return false;
  const normalizedHeading = normalize(heading);
  const candidateTokens = slug.split("-").filter((token) => token.length >= 3 && !generic.has(token));
  const slugMatched = candidateTokens.some((token) => normalizedHeading.includes(normalize(token)));
  const exactOfficialNameMatched = (exactOfficialHeadings[slug] ?? []).some((name) => normalizedHeading === normalize(name));
  const kindMatched = kind === "waterbody-regulations"
    ? /fishing regulations for/i.test(heading)
    : kind === "lake-fishery-profile" && /lake|reservoir|fishing/i.test(heading);
  return Boolean(kindMatched && (slugMatched || exactOfficialNameMatched));
}
