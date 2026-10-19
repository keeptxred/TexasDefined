/** Curated reciprocal links across established El Paso county, city, metro and visitor guides.
 * Only add URLs with published canonical TexasDefined pages; no speculative routes.
 */
type GuideLink = { href: string; label: string; summary: string };
const overview: GuideLink[] = [
  { href: "/county/el-paso", label: "El Paso County", summary: "Communities, history, official records and visitor places" },
  { href: "/city/el-paso", label: "City of El Paso", summary: "City history, local attractions and neighborhoods" },
  { href: "/metro-area/el-paso-metro", label: "El Paso metro", summary: "Nearby towns and the wider borderlands region" },
  { href: "/article/moving-to-el-paso-guide", label: "Moving to El Paso", summary: "Housing, costs, schools and relocation essentials" },
];
const history: GuideLink[] = [
  { href: "/destination/chamizal-national-memorial", label: "Chamizal National Memorial", summary: "U.S.–Mexico boundary history" },
  { href: "/destination/old-socorro-mission", label: "Old Socorro Mission", summary: "Mission Valley heritage and planning" },
  { href: "/destination/magoffin-home", label: "Magoffin Home", summary: "A historic home and restoration updates" },
  { href: "/article/el-camino-real-de-tierra-adentro-national-historic-trail", label: "El Camino Real de Tierra Adentro", summary: "Historic trade routes through the borderlands" },
];
const parks: GuideLink[] = [
  { href: "/destination/franklin-mountains-state-park", label: "Franklin Mountains State Park", summary: "Mountain trails and visitor information" },
  { href: "/destination/hueco-tanks-state-park", label: "Hueco Tanks State Park", summary: "Rock imagery, reservations and restricted access" },
];
const culture: GuideLink[] = [
  { href: "/destination/el-paso-museum-of-art", label: "El Paso Museum of Art", summary: "Downtown exhibitions and visitor details" },
  { href: "/destination/ysleta-del-sur-pueblo-cultural-center-museum-el-paso", label: "Ysleta del Sur Pueblo museum", summary: "Pueblo-led history and living culture" },
  { href: "/destination/hotel-paso-del-norte", label: "Hotel Paso del Norte", summary: "Trost architecture and the historic glass dome" },
];

export function isElPasoArticle(slug: string, title: string): boolean {
  return slug.includes("el-paso") || title.toLowerCase().includes("el paso");
}
export function isElPasoDestination(item: { slug: string; county?: string; nearestTown?: string }): boolean {
  return item.county?.replace(/\s+County$/i, "").trim().toLowerCase() === "el paso"
    || item.nearestTown?.trim().toLowerCase() === "el paso"
    || ["old-socorro-mission", "chamizal-national-memorial", "magoffin-home", "franklin-mountains-state-park", "hueco-tanks-state-park"].includes(item.slug);
}

export function ElPasoGuideNetwork({ currentPath, countyHub = false }: { currentPath: string; countyHub?: boolean }) {
  const historyFirst = /mission|historic|chamizal|camino|socorro|magoffin/.test(currentPath);
  const parksFirst = /mountain|hueco|park/.test(currentPath);
  const ordered = historyFirst ? [...history, ...parks, ...culture]
    : parksFirst ? [...parks, ...history, ...culture]
    : [...culture, ...history, ...parks];
  const all = [...overview, ...ordered].filter((link) => link.href !== currentPath);
  const items = countyHub ? all : all.slice(0, 9);
  return <nav aria-label="Connected El Paso County guides" className="my-10 border-y border-border py-8">
    <p className="eyebrow text-primary">El Paso guide network</p>
    <h2 className="mt-2 font-display text-3xl">Continue exploring El Paso County</h2>
    <p className="mt-3 max-w-3xl text-sm leading-7 text-muted-foreground">Find more TexasDefined guides to local communities, parks, museums and historic sites. Check official sources for current visitor access.</p>
    <ul className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((link) => <li key={link.href} className="border-t border-border pt-4">
        <a href={link.href} className="font-display text-xl font-semibold underline decoration-primary/30 underline-offset-4 hover:text-primary">{link.label}</a>
        <p className="mt-2 text-sm leading-6 text-muted-foreground">{link.summary}</p>
      </li>)}
    </ul>
  </nav>;
}
