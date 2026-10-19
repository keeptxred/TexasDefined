import { createFileRoute, Link, Outlet, useRouterState } from "@tanstack/react-router";

import { texasDefinedBrand } from"@/brand/texasdefined";
import { Container } from"@/components/layout/Container";

import { absoluteUrl, buildMeta, canonicalLink, jsonLd } from"@/lib/seo";

const canonicalPath ="/explore/inland-beaches";
const description ="Find researched swimming beaches at Texas lakes, from Ray Roberts and Lake Texoma to Cedar Hill, Tyler and Lake Whitney. Official access sources, safety and county connections.";

export const Route = createFileRoute("/explore/inland-beaches")({
  loader: async () => (await import("@/data/inland-beach-authority")).inlandSwimmingBeaches,
  head: ({ loaderData, matches, match }) => {
    const beaches = loaderData ?? [];
    // A child beach is its own canonical authority page, not the directory.
    if (matches[matches.length - 1]?.routeId !== match.routeId) return {};
    const url = absoluteUrl(texasDefinedBrand, canonicalPath);
    return {
      meta: buildMeta(texasDefinedBrand, {
        canonicalPath,
        title:"Texas Lake Beaches: Verified Inland Swimming Beaches | Texas Defined",
        description,
      }),
      links: [canonicalLink(texasDefinedBrand, canonicalPath)],
      scripts: [jsonLd({
"@context":"https://schema.org",
"@type":"CollectionPage",
"@id": `${url}#collection`,
        name:"Texas Inland Swimming Beaches",
        description,
        url,
        dateModified:"2026-10-17",
        mainEntity: {
"@type":"ItemList",
          numberOfItems: beaches.length,
          itemListElement: beaches.map((beach, index) => ({
"@type":"ListItem",
            position: index + 1,
            name: beach.name,
            url: absoluteUrl(texasDefinedBrand, `/explore/inland-beaches/${beach.slug}`),
          })),
        },
      })],
    };
  },
  component: TexasInlandBeaches,
});

function TexasInlandBeaches() {
  const beaches = Route.useLoaderData();
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  if (pathname !== canonicalPath && pathname !== `${canonicalPath}/`) return <Outlet />;
  return <main>
    <Container className="py-12 sm:py-16">
      <p className="eyebrow text-primary">Freshwater · designated swimming areas · source checked October 17, 2026</p>
      <h1 className="mt-4 max-w-5xl font-display text-5xl leading-tight sm:text-7xl">Texas lake beaches &amp; inland swimming beaches</h1>
      <p className="mt-6 max-w-3xl text-lg leading-8 text-muted-foreground">
        Texas has real inland beaches, from sandy state-park coves to gravel swimming areas and seasonal U.S. Army Corps of Engineers parks. These are not the same as an entire lake being open for swimming. Each entry below has an agency source explicitly documenting a beach, swim cove or swim-beach parking access.
      </p>
      <div className="mt-7 flex flex-wrap gap-x-6 gap-y-3 text-sm font-semibold">
        <Link to="/explore/beaches-coast" className="underline decoration-primary/40 underline-offset-4 hover:text-primary">Gulf Coast beaches →</Link>
        <Link to="/explore/lakes-rivers" className="underline decoration-primary/40 underline-offset-4 hover:text-primary">Texas lakes &amp; rivers →</Link>
        <Link to="/explore/state-parks" className="underline decoration-primary/40 underline-offset-4 hover:text-primary">State-park guides →</Link>
        <Link to="/browse/counties" className="underline decoration-primary/40 underline-offset-4 hover:text-primary">County guides →</Link>
      </div>
      <section className="mt-12 border-y border-border py-8" aria-labelledby="inland-method">
        <h2 id="inland-method" className="font-display text-3xl">What qualifies as a lake beach?</h2>
        <p className="mt-3 max-w-4xl text-base leading-8 text-muted-foreground">
          This is a growing, evidence-checked inventory, not a claim that these are all inland beaches in Texas. A listing qualifies only when a government park, reservoir or recreation-area authority identifies a swimming beach, signed beach access or designated swim cove. We do not turn every state park with swimming or every boat launch into a supposed beach. Status and access can change after floods, drought, maintenance or seasonal operations. An entry being listed here never means it is open or safe to swim today.
        </p>
        <p className="mt-3 max-w-4xl text-base leading-8 text-muted-foreground">
          The <a href="https://tpwd.texas.gov/state-parks/parks/things-to-do/swimming-in-state-parks-1/" target="_blank" rel="noopener noreferrer" className="underline underline-offset-4">TPWD statewide swimming list</a> identifies parks where swimming may be offered, but it is a research starting point rather than a list of individually named beaches. For coastal conditions and public Gulf access, use the <Link to="/explore/beaches-coast" className="underline underline-offset-4">separate coast guide</Link>.
        </p>
      </section>
      <nav aria-label="Jump to inland swimming beach" className="mt-10">
        <h2 className="font-display text-3xl">Browse {beaches.length} documented inland beaches</h2>
        <ul className="mt-6 grid gap-x-8 gap-y-3 sm:grid-cols-2 lg:grid-cols-3">
          {beaches.map((beach) => <li key={beach.slug}><a href={`/explore/inland-beaches/${beach.slug}`} className="text-sm font-semibold underline decoration-border underline-offset-4 hover:text-primary">{beach.name} · {beach.county} County</a></li>)}
        </ul>
      </nav>
      <div className="mt-12 grid gap-x-8 sm:grid-cols-2">
        {beaches.map((beach) => <article key={beach.slug} id={beach.slug} className="border-t border-border py-6">
          <p className="eyebrow text-primary">{beach.lake} · {beach.county} County</p>
          <h2 className="mt-3 font-display text-2xl"><Link to="/explore/inland-beaches/$slug" params={{ slug: beach.slug }} className="underline decoration-border underline-offset-4 hover:text-primary">{beach.name}</Link></h2>
          <p className="mt-3 text-sm leading-7 text-muted-foreground">Officially documented swim-beach access near {beach.nearestTown}. Read the individual page for the correct park unit, current-operator links, parking arrangements, safety considerations and nearby activities.</p>
          <div className="mt-4 flex flex-wrap gap-4 text-sm font-semibold">
            <Link to="/explore/inland-beaches/$slug" params={{ slug: beach.slug }} className="underline decoration-primary/40 underline-offset-4 hover:text-primary">Individual beach guide →</Link>
            {beach.county.split(" / ").map((county) => <a key={county} href={`/county/${county.trim().toLowerCase().replace(/\s+/g, "-")}`} className="underline decoration-primary/40 underline-offset-4 hover:text-primary">{county.trim()} County →</a>)}
          </div>
        </article>)}
      </div>
      <section className="mt-14 border-t border-border pt-8" aria-labelledby="freshwater-safety">
        <h2 id="freshwater-safety" className="font-display text-3xl">Before you get in the water</h2>
        <p className="mt-3 max-w-4xl text-base leading-8 text-muted-foreground">
          Check the operator's alerts and whether swimming is permitted at that exact location today. Water levels, bacterial advisories, submerged debris, boat traffic and storms can change conditions. Never assume a park is staffed by lifeguards. Watch children continuously; wear a properly fitted life jacket when appropriate and avoid swimming in or near boat channels. Accessibility equipment, seasonal bathhouses, parking passes and reservation requirements also vary by park.
        </p>
        <p className="mt-4 text-sm text-muted-foreground">Editorial independence: An official source is provided for each entry. No hotel, ticket, equipment or other affiliate link is presented as verification of swimming access or safety.</p>
      </section>
    </Container>
  </main>;
}
