import { articleInternalLinks } from "../article-internal-links";
import type { ArticleInternalLink } from "../types";

const additions: Record<string, ArticleInternalLink[]> = {
  "gillespie-county-fredericksburg-stonewall-hill-country-texas": [
    { href: "/article/texas-bluebonnets-complete-guide", label: "Plan Gillespie County during bluebonnet season", description: "Use the statewide bloom guide before driving Fredericksburg, Willow City and the granite-country roads in spring." },
    { href: "/article/texas-bluebonnet-road-trip", label: "Add Fredericksburg to a bluebonnet road trip", description: "Connect Gillespie County with the Highland Lakes and other current-report spring stops." },
    { href: "/article/texas-christmas-road-trip", label: "Return for a Hill Country Christmas road trip", description: "Use Fredericksburg as an anchor for Johnson City, Marble Falls and nearby December traditions." },
    { href: "/article/christmas-in-texas-complete-guide", label: "Compare Christmas destinations across Texas", description: "Put Fredericksburg's German-influenced holiday season in the larger statewide Christmas guide." },
  ],
  "harrison-county-marshall-caddo-lake-railroads-piney-woods-texas": [
    { href: "/article/east-texas-fall-colors", label: "Plan an East Texas fall-color weekend", description: "Use Marshall and Caddo Lake as anchors for Piney Woods foliage drives and current color reports." },
    { href: "/article/fall-in-texas-complete-guide", label: "Compare Harrison County with Texas fall regions", description: "See how Caddo Lake and East Texas hardwoods compare with Lost Maples, the Frio and the Guadalupe corridor." },
    { href: "/article/best-christmas-towns-in-texas", label: "See why Marshall belongs on a Texas Christmas trip", description: "Connect Marshall's courthouse-square holiday tradition with the strongest Christmas towns statewide." },
  ],
  "marion-county-jefferson-caddo-lake-riverport-piney-woods-texas": [
    { href: "/article/east-texas-fall-colors", label: "Build a Caddo Lake fall-color trip", description: "Pair Jefferson and Big Cypress Bayou with current East Texas foliage conditions and nearby park stops." },
    { href: "/article/fall-in-texas-complete-guide", label: "Use the statewide Texas fall guide", description: "Compare the Caddo Lake region with the other Texas landscapes that reliably produce autumn color." },
    { href: "/article/best-christmas-towns-in-texas", label: "Pair historic Jefferson with Texas Christmas towns", description: "Use the statewide holiday-town guide to build a December trip around East Texas historic districts and traditions." },
  ],
  "ellis-county-waxahachie-ennis-blackland-prairie-texas": [
    { href: "/article/bluebonnets-near-dallas-fort-worth", label: "Use Ennis for a DFW bluebonnet day trip", description: "Connect Ellis County with the organized Ennis trail system and North Texas's typically later bloom window." },
    { href: "/article/best-places-to-see-bluebonnets-in-texas", label: "Compare Ennis with Texas bluebonnet regions", description: "See how Ennis timing and trail access compare with Washington County, the Highland Lakes and Big Bend." },
    { href: "/article/texas-bluebonnet-festivals", label: "Pair Ennis trails with bluebonnet festival planning", description: "Use official event schedules alongside current bloom reports rather than assuming festival weekend equals peak bloom." },
  ],
  "washington-county-brenham-washington-brazos-independence-texas": [
    { href: "/article/bluebonnets-near-houston", label: "Plan a Houston-to-Washington County bluebonnet trip", description: "Use Brenham, Chappell Hill and Washington County as the primary west-of-Houston spring strategy." },
    { href: "/article/texas-bluebonnets-complete-guide", label: "Check the statewide bluebonnet season guide", description: "Use current bloom reports, timing guidance and field etiquette before driving the county's farm roads." },
    { href: "/article/texas-bluebonnet-road-trip", label: "Start the bluebonnet road trip in Washington County", description: "Connect Brenham and Chappell Hill with the Highland Lakes and other backup-rich spring stops." },
  ],
  "burnet-county-burnet-marble-falls-highland-lakes-granite-texas": [
    { href: "/article/texas-bluebonnets-complete-guide", label: "Plan Burnet County during bluebonnet season", description: "Use current reports to time the Highland Lakes, Marble Falls and Burnet instead of relying on last year's peak dates." },
    { href: "/article/best-places-to-see-bluebonnets-in-texas", label: "Compare the Highland Lakes bluebonnet region", description: "See how Burnet County fits with Ennis, Washington County, Willow City, Lake Travis and Big Bend." },
    { href: "/article/texas-bluebonnet-road-trip", label: "Drive the Highland Lakes bluebonnet loop", description: "Use Burnet and Marble Falls as flexible spring anchors with multiple nearby routes and backup stops." },
  ],
  "llano-county-llano-river-granite-highland-lakes-texas": [
    { href: "/article/texas-bluebonnets-complete-guide", label: "Follow bluebonnet season into Llano County", description: "Use statewide timing and current reports before exploring granite country and Highland Lakes roads." },
    { href: "/article/best-places-to-see-bluebonnets-in-texas", label: "Compare Llano with Texas bluebonnet regions", description: "Put Llano's Hill Country wildflowers in context with Burnet, Brenham, Ennis, Lake Travis and Big Bend." },
    { href: "/article/texas-bluebonnet-road-trip", label: "Add Llano to the bluebonnet road trip", description: "Connect the Llano River and granite country with Burnet, Marble Falls and the wider Hill Country spring loop." },
  ],
};

for (const [slug, links] of Object.entries(additions)) {
  const existing = articleInternalLinks[slug] ?? [];
  articleInternalLinks[slug] = [
    ...existing,
    ...links.filter((addition) => !existing.some((link) => link.href === addition.href)),
  ];
}
