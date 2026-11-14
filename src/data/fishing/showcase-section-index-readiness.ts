import type { ShowcaseLakePrototype } from "./showcase-lakes-prototype";
import type { ShowcaseLakeSection } from "./showcase-lake-routing";

/**
 * An official source URL and a generic planning instruction do not make a
 * standalone, indexable lake authority page. Keep these URLs available to
 * visitors, but index them only after their source-backed section has a
 * distinct answer to the section's search intent.
 *
 * This is a content-evidence gate, not a word-count or AI-detection test.
 */
export function isShowcaseLakeSectionIndexReady(
  lake: ShowcaseLakePrototype,
  section: ShowcaseLakeSection,
): boolean {
  if (section === "fish") {
    // Require several independently described fish targets and real habitat,
    // not a duplicated summary presented as a seasonal insight.
    return lake.fish.length >= 3
      && lake.fish.filter((fish) => fish.summary.trim().length >= 45).length >= 3
      && lake.habitat.filter((note) => note.trim().length >= 35).length >= 2
      && /^https:\/\//.test(lake.sources.tpwdLake.url);
  }

  if (section === "access") {
    return /^https:\/\//.test(lake.sources.tpwdAccess.url)
      && lake.access.some((site) => !/public access inventory|access overview/i.test(site.name)
        && site.launch.trim().length >= 27
        && !/^(?:tpwd-listed|check|verify|varies)/i.test(site.launch.trim()));
  }

  if (section === "boating") {
    // Two statewide template notes interpolate fluctuating water and clarity,
    // and two are identical on every lake. None establishes a standalone
    // lake-specific boating authority without a researched local condition.
    return lake.boatingNotes.some((note) => note.trim().length >= 70
      && !/is the normal lake-level context published by tpwd/i.test(note)
      && !/is the normal clarity pattern/i.test(note)
      && !/check official ramp and managing-agency notices/i.test(note)
      && !/drain boats, livewells and bait containers as required/i.test(note));
  }

  if (section === "camping") {
    // A confirmed prohibition is itself an actionable, lake-specific answer.
    if (lake.campingProhibited) return true;
    return lake.camping.some((site) => {
      const title = `${site.name} ${site.type}`;
      const summary = site.summary.trim();
      const sourceBacked = /^https:\/\//.test(site.href);
      const actualFacility = /(?:state park|national recreation area|campground|camping area|camping park|rv park|recreation area|camping at|camping near|camping facilities)/i.test(title);
      const placeholder = /(?:trip-planning options|camping and lodging planning|access corridor|camping and lodging options|source-listed recreation option)/i.test(title)
        && !/(?:state park|campground|recreation area|rv park)/i.test(site.name);
      return sourceBacked && actualFacility && !placeholder && summary.split(/\s+/).length >= 20;
    });
  }

  if (section === "nearby") {
    return lake.nearby.some((place) => {
      const destination = /^\/destination\/[a-z0-9-]+$/.test(place.href);
      const officialPlace = place.external && /^https:\/\//.test(place.href);
      const substantive = place.description.trim().split(/\s+/).length >= 12
        && !/compare .* with another nearby or regionally related/i.test(place.description)
        && !/is tied to .*county trip planning/i.test(place.description);
      return (destination || officialPlace) && substantive;
    });
  }

  if (section === "regulations") {
    // A separately researched, source-attributed TPWD interpretation
    // qualifies even when the honest answer is 'statewide limits apply'.
    if (lake.sectionResearch?.reviewedAt && lake.regulations.some((row) =>
      /^https:\/\/tpwd\.texas\.gov\//.test(row.sourceUrl ?? "") && row.text.trim().length >= 130
    )) return true;
    // Distinct local regulations or fish-consumption notices have their own
    // independent source. Generic statewide links alone do not qualify.
    if (lake.sources.cityBoatRules || lake.sources.fishConsumption) return true;
    return lake.regulations.some((row) => {
      const text = row.text.trim();
      if (text.length < 85) return false;
      if (/^(?:current rules|freshness|lake-specific notice)$/i.test(row.label)) return false;
      if (/^(?:use|check|verify) (?:the )?current (?:tpwd|outdoor annual|rules)/i.test(text)) return false;
      if (/tpwd identifies .*special regulations|special regulations on some fishes/i.test(text)) return false;
      return /(?:reciprocity|license|prohibited|not allowed|restricted|closed to|must release|slot limit|trophy-bass|catch-and-release|boundary|consumption advisory|local ordinance|fishing is restricted)/i.test(text);
    });
  }

  // Other sections retain their existing publication and data-readiness
  // rules; in particular, guides and reports remain dynamically gated.
  return true;
}
