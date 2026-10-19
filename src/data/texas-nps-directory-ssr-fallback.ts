import { TEXAS_NPS_DIRECTORY } from "./texas-national-park-service-directory";

/**
 * Server-safe public NPS directory fallback for /explore/national-parks.
 * Public HTML assets can fail on SSR when the loader fetches its own
 * production domain (deployment/caching/network); do not silently reduce
 * 18 federally designated sites to two mapped destination cards.
 * The card gate stays strict: the index does not certify all 18 authority pages.
 */
export const NPS_LOCAL_GUIDES: Readonly<Record<string, string>> = {
  "alibates-flint-quarries-national-monument": "/destination/alibates-flint-quarries-national-monument",
  "chamizal-national-memorial": "/destination/chamizal-national-memorial",
  "fort-davis-national-historic-site": "/destination/fort-davis-national-historic-site",
  "lake-meredith-national-recreation-area": "/destination/lake-meredith-national-recreation-area",
  "lyndon-b-johnson-national-historical-park": "/destination/lyndon-b-johnson-national-historical-park",
  "padre-island-national-seashore": "/destination/padre-island-national-seashore",
  "palo-alto-battlefield-national-historical-park": "/destination/palo-alto-battlefield-national-historical-park",
  "san-antonio-missions-national-historical-park": "/destination/san-antonio-missions-national-historical-park",
  "waco-mammoth-national-monument": "/destination/waco-mammoth-national-monument",
  "big-bend-national-park": "/destination/big-bend-national-park",
  "guadalupe-mountains-national-park": "/destination/guadalupe-mountains-national-park",
  "big-thicket-national-preserve": "/destination/big-thicket-national-preserve",
  "blackwell-school-national-historic-site": "/destination/blackwell-school-national-historic-site",
  "butterfield-overland-national-historic-trail": "/article/butterfield-overland-national-historic-trail",
  "el-camino-real-de-los-tejas-national-historic-trail": "/article/el-camino-real-de-los-tejas-national-historic-trail",
  "el-camino-real-de-tierra-adentro-national-historic-trail": "/article/el-camino-real-de-tierra-adentro-national-historic-trail",
  "rio-grande-wild-and-scenic-river": "/article/rio-grande-wild-and-scenic-river",
};
const category = (designation:string) =>
  designation === "national park" ? "The two designated National Parks"
  : designation.includes("trail") || designation === "wild and scenic river" ? "Historic trails and wild river"
  : "Other federally protected places";

export function getTexasNpsDirectoryFallbackHtml(): string {
  const groups = [
    "The two designated National Parks",
    "Other federally protected places",
    "Historic trails and wild river",
  ] as const;
  const rows = TEXAS_NPS_DIRECTORY.map(item => ({
    ...item,
    group: category(item.designation),
    official: `https://www.nps.gov/${item.npsCode}/`,
    local: NPS_LOCAL_GUIDES[item.slug] ?? null,
  }));
  return `<section class="border-t border-border pt-7" id="complete-texas-nps-inventory">
<h2 class="font-display text-2xl text-foreground">All 18 official NPS Texas designations</h2>
<p class="mt-4 text-base leading-8 text-muted-foreground">Texas has two federally designated National Parks: Big Bend and Guadalupe Mountains. The National Park Service's wider Texas inventory contains 18 distinct park units and designations, including monuments, memorials, historical parks, historic trails, recreation areas, a national seashore and a wild and scenic river. The mapped destination cards above show only the sites that have passed TexasDefined's separate photo, coordinates and content-quality gates; fewer cards do not mean fewer federal sites.</p>
<p class="mt-4 text-base leading-8 text-muted-foreground">This list is an official-inventory reference, not a statement that all 18 destination guides have passed individual editorial acceptance. Follow each federal source for up-to-date fees, opening hours, closures, trailhead access and safety conditions. Multi-state historic trail corridors and the Rio Grande Wild and Scenic River do not have a single shared gate or public trailhead.</p>
${groups.map(group => `<div class="mt-6"><h3 class="font-display text-xl text-foreground">${group}</h3><ul class="mt-3 space-y-2 text-sm text-muted-foreground">${rows.filter(item => item.group === group).map(item => `<li><a class="underline decoration-border underline-offset-4 hover:text-foreground" href="${item.official}" target="_blank" rel="noopener noreferrer">${item.name} — official NPS page</a>${item.local ? ` · <a class="underline decoration-border underline-offset-4 hover:text-foreground" href="${item.local}">TexasDefined guide</a>` : ""}</li>`).join("")}</ul></div>`).join("")}
<p class="mt-5 text-sm text-muted-foreground">Primary inventory: <a class="underline decoration-border underline-offset-4" href="https://www.nps.gov/state/tx/list.htm" target="_blank" rel="noopener noreferrer">National Park Service — Texas</a>. This index is maintained separately from park-specific authority certification.</p></section>`;
}

/** Do not duplicate the 18-entry index when the hosted authority HTML loads. */
export function ensureTexasNpsDirectoryHtml(html: string | null | undefined): string {
  const existing = html ?? "";
  return existing.includes('id="complete-texas-nps-inventory"')
    ? existing
    : `${existing}\n${getTexasNpsDirectoryFallbackHtml()}`;
}
