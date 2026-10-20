import { Link } from "@tanstack/react-router";
import { museumAuthorityDirectory } from "@/data/museum-authority-network";
import { unavailableDestinationSlugs } from "@/data/destination-availability";
import { countyVisitorPlaces } from "@/data/county-visitor-places";

const currentlyClosedMuseumSlugs = new Set(unavailableDestinationSlugs());

/** Automatic county/city -> museum links; museum guide -> county links are in the dossiers. */
export function CountyCityMuseums({ kind, slug, name }: { kind: string; slug: string; name: string }) {
  if (kind !== "county" && kind !== "city") return null;
  const museums = museumAuthorityDirectory.filter((museum) =>
    kind === "county"
      ? museum.county.toLowerCase().replace(/[^a-z]+/g, "-").replace(/-$/,"") === slug
      : museum.city.toLowerCase().replace(/[^a-z]+/g, "-").replace(/-$/,"") === slug,
  );
  const includeElPaso = slug === "el-paso";
  const additionalMuseumSources = includeElPaso
    ? countyVisitorPlaces("el-paso").filter((place) => place.category === "Museums & discovery")
    : [];
  const puebloMuseumHref = "/destination/ysleta-del-sur-pueblo-cultural-center-museum-el-paso";
  const showPuebloMuseum = includeElPaso && !museums.some((museum) => museum.slug === "ysleta-del-sur-pueblo-cultural-center-museum-el-paso");
  if (!museums.length && !additionalMuseumSources.length && !showPuebloMuseum) return null;
  return <section aria-labelledby="county-city-museum-guides" className="border-b border-border py-9">
    <p className="eyebrow text-primary">Museum and heritage guides</p>
    <h2 id="county-city-museum-guides" className="mt-2 font-display text-3xl">Museums connected to {name}</h2>
    <p className="mt-3 max-w-3xl text-sm leading-7 text-muted-foreground">Independent guides to collections, exhibits, visitor planning, accessibility and historical research. Verify each museum's current hours and admissions before traveling.</p>
    <ul className="mt-6 grid gap-5 sm:grid-cols-2">
      {showPuebloMuseum ? <li className="border-t border-border pt-4">
        <a href={puebloMuseumHref} className="font-display text-xl underline decoration-primary/30 underline-offset-4 hover:text-primary">Ysleta del Sur Pueblo Cultural Center Museum</a>
        <p className="mt-2 text-sm text-muted-foreground">Pueblo-led interpretation of Tigua history and living heritage; verify access and program dates.</p>
      </li> : null}
      {additionalMuseumSources.map((place) => <li key={place.name} className="border-t border-border pt-4">
        <a href={place.sourceUrl} target="_blank" rel="noopener noreferrer" className="font-display text-xl underline decoration-primary/30 underline-offset-4 hover:text-primary">{place.name} ↗</a>
        <p className="mt-2 text-sm text-muted-foreground">{place.description} TexasDefined has not yet published an individual authority guide for this museum.</p>
      </li>)}
      {museums.map((museum) => <li key={museum.slug} className="border-t border-border pt-4">
        <Link to="/destination/$slug" params={{ slug: museum.slug }} className="font-display text-xl underline decoration-primary/30 underline-offset-4 hover:text-primary">{museum.name}</Link>
        <p className="mt-2 text-sm text-muted-foreground">{museum.city}, {museum.county} County · {currentlyClosedMuseumSlugs.has(museum.slug) ? "Currently closed — historical guide; no public admission" : "Exhibits and visitor planning"}</p>
      </li>)}
    </ul>
  </section>;
}
