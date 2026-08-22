import { articleInternalLinks } from "../article-internal-links";
import type { ArticleInternalLink } from "../types";

const additions: Record<string, ArticleInternalLink[]> = {
  "gillespie-county-fredericksburg-stonewall-hill-country-texas": [
    {
      href: "/article/texas-bluebonnets-complete-guide",
      label: "Plan Gillespie County during bluebonnet season",
      description: "Use the statewide bloom guide before driving Fredericksburg, Willow City and the granite-country roads in spring.",
    },
    {
      href: "/article/texas-bluebonnet-road-trip",
      label: "Add Fredericksburg to a bluebonnet road trip",
      description: "Connect Gillespie County with the Highland Lakes and other current-report spring stops.",
    },
    {
      href: "/article/texas-christmas-road-trip",
      label: "Return for a Hill Country Christmas road trip",
      description: "Use Fredericksburg as an anchor for Johnson City, Marble Falls and nearby December traditions.",
    },
    {
      href: "/article/christmas-in-texas-complete-guide",
      label: "Compare Christmas destinations across Texas",
      description: "Put Fredericksburg's German-influenced holiday season in the larger statewide Christmas guide.",
    },
  ],
  "harrison-county-marshall-caddo-lake-railroads-piney-woods-texas": [
    {
      href: "/article/east-texas-fall-colors",
      label: "Plan an East Texas fall-color weekend",
      description: "Use Marshall and Caddo Lake as anchors for Piney Woods foliage drives and current color reports.",
    },
    {
      href: "/article/fall-in-texas-complete-guide",
      label: "Compare Harrison County with Texas fall regions",
      description: "See how Caddo Lake and East Texas hardwoods compare with Lost Maples, the Frio and the Guadalupe corridor.",
    },
    {
      href: "/article/best-christmas-towns-in-texas",
      label: "See why Marshall belongs on a Texas Christmas trip",
      description: "Connect Marshall's courthouse-square holiday tradition with the strongest Christmas towns statewide.",
    },
  ],
  "marion-county-jefferson-caddo-lake-riverport-piney-woods-texas": [
    {
      href: "/article/east-texas-fall-colors",
      label: "Build a Caddo Lake fall-color trip",
      description: "Pair Jefferson and Big Cypress Bayou with current East Texas foliage conditions and nearby park stops.",
    },
    {
      href: "/article/fall-in-texas-complete-guide",
      label: "Use the statewide Texas fall guide",
      description: "Compare the Caddo Lake region with the other Texas landscapes that reliably produce autumn color.",
    },
    {
      href: "/article/best-christmas-towns-in-texas",
      label: "Pair historic Jefferson with Texas Christmas towns",
      description: "Use the statewide holiday-town guide to build a December trip around East Texas historic districts and traditions.",
    },
  ],
};

for (const [slug, links] of Object.entries(additions)) {
  const existing = articleInternalLinks[slug] ?? [];
  articleInternalLinks[slug] = [
    ...existing,
    ...links.filter((addition) => !existing.some((link) => link.href === addition.href)),
  ];
}
