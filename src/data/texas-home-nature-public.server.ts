import { getTexasEvergreenGuideBatch8 } from "./texas-evergreen-guides-batch8";
import type { TexasEvergreenGuide } from "./texas-evergreen-guides";
import type { TexasHomeNatureGuideSlug, TexasHomeNaturePublicGuide } from "./texas-home-nature-public";

const reviewedAt = "2026-08-29";

const CANONICAL_LINKS: Record<string, string> = {
  "/texas-hurricane-home-prep": "/article/texas-hurricane-preparation-homeowners-renters",
  "/texas-wildlife-guide": "/article/texas-wildlife-guide",
  "/texas-flowers-wildflowers-guide": "/article/texas-wildflowers-guide",
};

const SOURCE_MAP: Record<TexasHomeNatureGuideSlug, TexasHomeNaturePublicGuide["sources"]> = {
  "texas-pool-guide": [
    { name: "Pool & Hot Tub Alliance", url: "https://www.phta.org/pub/?id=e516e23c-1866-daac-99fb-fb5784d35228", note: "Cold-weather and partial-closing guidance." },
    { name: "Pentair", url: "https://www.pentair.com/en-us/education-support/water-education-center/pool-and-spa-education/pool-freeze-protection.html", note: "Equipment freeze-protection guidance; follow the instructions for your installed system." },
    { name: "Pool & Hot Tub Alliance", url: "https://www.phta.org/pub/?id=42f58173-ff62-26c0-0a5e-fefdb7f212b9", note: "Seasonal pool-opening checklist." },
  ],
  "texas-pests-guide": [
    { name: "Texas A&M AgriLife Extension", url: "https://agrilifeextension.tamu.edu/asset-external/red-imported-fire-ant-management-guide/", note: "Imported fire-ant identification and management." },
    { name: "Texas A&M AgriLife Extension", url: "https://agrilifeextension.tamu.edu/wp-content/uploads/2025/07/Mosquitoes-Backyard-Mosquito-Control-1.pdf", note: "Backyard mosquito source reduction and control." },
    { name: "Texas A&M AgriLife Extension", url: "https://agrilifeextension.tamu.edu/asset-external/subterranean-termites/", note: "Subterranean termite identification and structural guidance." },
  ],
  "texas-snakes-guide": [
    { name: "Texas Parks and Wildlife Department", url: "https://tpwd.texas.gov/education/resources/texas-junior-naturalists/snakes-alive", note: "Texas snake diversity, identification context and safer encounter behavior." },
    { name: "Texas Parks and Wildlife Department", url: "https://tpwd.texas.gov/education/resources/texas-junior-naturalists/be-nature-safe/venomous-snake-safety", note: "Current Texas venomous-snake safety guidance." },
    { name: "CDC / NIOSH", url: "https://www.cdc.gov/niosh/outdoor-workers/about/venomous-snakes.html", note: "Snakebite prevention and first-aid guidance." },
  ],
  "texas-birds-guide": [
    { name: "Texas Parks and Wildlife Department", url: "https://tpwd.texas.gov/huntwild/wild/species/", note: "Official Texas species profiles and wildlife references." },
    { name: "U.S. Fish and Wildlife Service", url: "https://www.fws.gov/program/migratory-birds", note: "Migratory-bird conservation and migration reference." },
  ],
};

function canonicalHref(href: string) {
  return CANONICAL_LINKS[href] ?? href;
}

function sanitizePublicGuide(guide: TexasEvergreenGuide): TexasEvergreenGuide {
  const sections = guide.sections.map((section) => {
    const sanitized = {
      ...section,
      links: section.links?.map((link) => ({ ...link, href: canonicalHref(link.href) })),
    };
    if (guide.slug !== "texas-pool-guide" || section.heading !== "Prepare a pool for hurricanes and severe storms") return sanitized;
    return {
      ...sanitized,
      body: [
        "Bring in loose furniture, umbrellas, toys and maintenance equipment before high winds. Do not make major water-level, plumbing or equipment changes from a generic storm checklist; follow the instructions for your pool, builder and installed equipment.",
        "After severe weather, inspect electrical equipment and remove large debris before restarting anything that appears damaged. If the system lost power during a freeze or storm, use the manufacturer’s shutdown and restart procedure rather than improvising around pressurized or energized equipment.",
      ],
    };
  });

  return {
    ...guide,
    sections,
    related: guide.related.map((item) => ({ ...item, href: canonicalHref(item.href) })),
  };
}

export function loadTexasHomeNatureGuideServer(slug: TexasHomeNatureGuideSlug): TexasHomeNaturePublicGuide {
  const guide = getTexasEvergreenGuideBatch8(slug);
  if (!guide) throw new Error(`Unknown Texas home/nature guide: ${slug}`);
  return { guide: sanitizePublicGuide(guide), sources: SOURCE_MAP[slug], reviewedAt };
}
