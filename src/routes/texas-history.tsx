import { createFileRoute, Link } from "@tanstack/react-router";

import enchantedRock from "@/assets/enchanted-rock.jpg";

import { texasDefinedBrand } from "@/brand/texasdefined";
import { CategoryPage } from "@/components/editorial/CategoryPage";
import { Container } from "@/components/layout/Container";
import { historicSiteClusters } from "@/data/historic-site-clusters";
import { articlesQuery, destinationsQuery, regionsQuery } from "@/data/queries";
import type { Article, Destination } from "@/data/types";
import { buildEditorialCollectionHead, buildMeta, canonicalLink } from "@/lib/seo";

const description = "Missions and cattle trails, oil booms and courthouse squares — the people, places and turning points that still shape how Texas looks and feels today.";
const imageAlt = "The granite dome of Enchanted Rock under a wide sky";
const mergeDestinations = (...groups: Destination[][]) => [...new Map(groups.flat().map((destination) => [destination.slug, destination])).values()];
const historicAuthorityGuides = [
  { slug: "spanish-texas-military-battle-medina", eyebrow: "1519–1821", title: "Military Texas before the Republic", description: "Start with Spanish presidios, imperial rivalry, the Gutiérrez-Magee Expedition and the 1813 Battle of Medina before Mexican independence reshaped the province." },
  { slug: "texas-military-history-timeline", eyebrow: "1835 → modern era", title: "Texas military history", description: "Trace the military story from Gonzales and the Republic through frontier forts, the Civil War, border mobilizations, the world wars and the modern military map." },
  { slug: "texas-revolution-historic-sites-road-trip", eyebrow: "1835–1836", title: "Texas Revolution road trip", description: "Follow the political and military sequence from San Felipe and Washington-on-the-Brazos through Goliad and San Jacinto." },
  { slug: "republic-of-texas-government-trail", eyebrow: "Republic government · 1835–1846", title: "Republic of Texas government trail", description: "Follow government from San Felipe and Washington through Columbia, Austin diplomacy and the final transition from independent republic to statehood." },
  { slug: "republic-of-texas-navy-history", eyebrow: "Republic Navy · 1835–1845", title: "The Republic of Texas Navy", description: "Follow the First and Second Texas Navies from the 1836 Gulf supply line through Edwin Ward Moore, Yucatán and the Battle of Campeche." },
  { slug: "history-of-the-texas-flag", eyebrow: "1836–present", title: "History of the Texas flag", description: "Follow the Lone Star from revolution-era proposals and the Burnet flag through the Republic's 1839 design, statehood, the statutory gap and the modern Texas Flag Code." },
  { slug: "texas-us-mexican-war-palo-alto-guide", eyebrow: "1846–1848", title: "Texas and the U.S.–Mexican War", description: "Start at Palo Alto and Resaca de la Palma to understand annexation, the disputed Rio Grande boundary and the war that redrew a continent." },
  { slug: "texas-frontier-forts-road-trip", eyebrow: "Frontier Texas", title: "Texas frontier forts road trip", description: "Compare four Army posts to understand overland travel, military logistics, ranching and conflict across the western frontier." },
  { slug: "buffalo-soldiers-texas-frontier-guide", eyebrow: "1866 → frontier era", title: "Buffalo Soldiers in Texas", description: "Follow the Black Regulars through Fort Davis, Fort Concho, Fort McKavett and Fort Lancaster while holding military service, citizenship and Native dispossession in the same history." },
  { slug: "texas-red-river-war-guide", eyebrow: "1874–1875", title: "The Red River War in Texas", description: "Connect Adobe Walls, Palo Duro Canyon, bison destruction and the five-column Army campaign to Native removal and the ranching transformation of the Panhandle." },
  { slug: "texas-civil-war-sites-guide", eyebrow: "1861–Reconstruction", title: "Texas in the Civil War & Reconstruction", description: "Connect Galveston, Sabine Pass and Palmito Ranch to slavery, Juneteenth, emancipation, Reconstruction, postwar homes and the later construction of Civil War memory." },
  { slug: "texas-spanish-american-war-guide", eyebrow: "1898–1899", title: "Texas and the Spanish-American War", description: "Follow San Antonio, the Rough Riders, Texas volunteer regiments and the transition from a continental Army toward overseas military service." },
  { slug: "texas-world-war-i-history-guide", eyebrow: "1916–1918", title: "Texas in World War I", description: "Connect border mobilization, Camp Logan, the 36th and 90th Divisions, early military aviation and the wartime home front." },
  { slug: "texas-national-guard-history", eyebrow: "Citizen-soldiers", title: "Texas National Guard history", description: "Follow the state's citizen-soldier tradition from militia companies and Camp Mabry through the 36th Division, disaster response and modern Guard service." },
  { slug: "san-antonio-military-aviation-history", eyebrow: "Military City USA", title: "San Antonio military aviation", description: "See how Kelly, Brooks, Randolph, Lackland and Fort Sam Houston made San Antonio a national center for aviation, training and military medicine." },
  { slug: "presidential-texas-historic-homes", eyebrow: "Public life", title: "Presidential Texas", description: "Use preserved homes to connect Eisenhower, the Bush family and Sam Rayburn to the Texas communities that shaped their public careers." },
  { slug: "brazoria-plantations-slavery-emancipation-history", eyebrow: "Labor · freedom · archaeology", title: "Slavery, emancipation and plantation Texas", description: "Read Levi Jordan and Varner-Hogg through enslaved labor, emancipation, Reconstruction, archaeology and the changing systems that followed." },
  { slug: "texas-borderlands-historic-sites-guide", eyebrow: "Borderlands", title: "Texas borderlands historic sites", description: "Connect Pueblo, Spanish, Mexican, Tejano and Indigenous histories through missions, homes and landscapes from El Paso to South and East Texas." },
  { slug: "texas-world-war-ii-historic-sites-guide", eyebrow: "World War II", title: "Texas and World War II", description: "Connect Battleship Texas, Eisenhower, the Pacific War, Iwo Jima memory and railroad mobility through five Texas places tied to a global conflict." },
  { slug: "texas-world-war-ii-bases-pow-camps", eyebrow: "World War II home front", title: "Bases, training camps and POW camps", description: "Understand the enormous wartime training network—and the separate POW and civilian-internment systems—that reshaped communities across Texas." },
  { slug: "texas-cold-war-military-history", eyebrow: "Cold War · 1946–1991", title: "Cold War Texas", description: "Connect Carswell strategic bombers, Dyess Atlas silos, Pantex, Laughlin U-2 missions and the statewide infrastructure of nuclear deterrence." },
] as const;

export const Route = createFileRoute("/texas-history")({
  head: ({ loaderData }: { loaderData?: { articles: Article[]; destinations: Destination[] } }) => loaderData ? buildEditorialCollectionHead(texasDefinedBrand, {
    canonicalPath: "/texas-history",
    title: "Texas History",
    collectionName: "Texas History",
    description,
    image: enchantedRock,
    imageAlt,
    breadcrumbParentName: "Texas Life",
    breadcrumbParentPath: "/texas-living",
    items: [
      { type: "WebPage" as const, name: "Texas Historic Sites & Museums", url: "/explore/historic-sites", description: "A statewide guide to battlefields, missions, museums, homes, forts and monuments." },
      { type: "WebPage" as const, name: "Battleship Texas (BB-35)", url: "/article/battleship-texas-bb-35-history-restoration", description: "A full history of the surviving dreadnought from 1914 through both World Wars, preservation and the Galveston restoration." },
      { type: "WebPage" as const, name: "Painted Churches of Texas", url: "/explore/painted-churches", description: "A source-checked statewide collection connecting church history, immigrant communities, architecture, decorative arts and preservation." },
      { type: "WebPage" as const, name: "Official Texas Capital Designations", url: "/texas-capital-designations", description: "A source-backed directory of current specialty capital titles enacted by the Texas Legislature." },
      { type: "WebPage" as const, name: "German & Czech Texas Towns", url: "/german-czech-texas-towns", description: "A heritage guide connecting food, churches, dance halls and settlement history across Central Texas and the Hill Country." },
      { type: "WebPage" as const, name: "Texas Dance Halls & Honky-Tonks", url: "/texas-dance-halls-honky-tonks", description: "A guide to the music, architecture and social traditions of Texas dance halls and honky-tonks." },
      ...loaderData.articles.map((article) => ({ type: "Article" as const, name: article.title, url: `/article/${article.slug}`, image: article.hero.src, description: article.dek })),
      ...loaderData.destinations.map((destination) => ({ type: "TouristAttraction" as const, name: destination.name, url: `/destination/${destination.slug}`, image: destination.hero.src, description: destination.summary })),
    ],
  }) : ({ meta: buildMeta(texasDefinedBrand, { canonicalPath: "/texas-history", title: "Texas History", description }), links: [canonicalLink(texasDefinedBrand, "/texas-history")] }),
  loader: async ({ context }): Promise<{ articles: Article[]; destinations: Destination[] }> => {
    const [articles, historyDestinations, historicSites] = await Promise.all([
      context.queryClient.ensureQueryData(articlesQuery({ category: "texas-history" })),
      context.queryClient.ensureQueryData(destinationsQuery({ category: "texas-history" })),
      context.queryClient.ensureQueryData(destinationsQuery({ category: "historic-sites" })),
      context.queryClient.ensureQueryData(regionsQuery()),
    ]);
    const destinations = mergeDestinations(historyDestinations, historicSites);
    return { articles, destinations };
  },
  component: TexasHistoryPage,
});

function TexasHistoryPage() {
  const { destinations } = Route.useLoaderData();
  const bySlug = new Map(destinations.map((destination) => [destination.slug, destination]));
  return <>
    <CategoryPage category="texas-history" eyebrow="Texas History" title="The stories that still shape this place" intro={description} image={{ src: enchantedRock, alt: imageAlt, width: 1600, height: 1067 }} />
    <Container className="pb-10 sm:pb-14">
      <section className="grid gap-6 border-y border-border py-7 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center">
        <div><p className="eyebrow text-primary">Go to the places themselves</p><h2 className="mt-2 font-display text-4xl">Historic Sites & Museums across Texas</h2><p className="mt-3 max-w-3xl text-sm leading-7 text-muted-foreground">Explore battlefields, missions, forts, presidential homes, plantations, museums and historic landscapes with visitor context and official sources.</p></div>
        <Link to="/explore/$category" params={{ category: "historic-sites" }} className="eyebrow border-b border-primary pb-1 text-primary">Browse all historic sites →</Link>
      </section>
    </Container>
    <Container className="pb-14 sm:pb-18">
      <section aria-labelledby="historic-authority-guides">
        <div className="mb-6 max-w-3xl"><p className="eyebrow text-primary">Plan history by story</p><h2 id="historic-authority-guides" className="mt-2 font-display text-4xl">{historicAuthorityGuides.length} routes into the statewide collection</h2><p className="mt-3 text-sm leading-7 text-muted-foreground">Start with a narrative, then move into the individual historic sites. These guides connect places that make more sense together than they do as isolated stops.</p></div>
        <div className="grid gap-px overflow-hidden border border-border bg-border md:grid-cols-2">{historicAuthorityGuides.map((guide) => <Link key={guide.slug} to="/article/$slug" params={{ slug: guide.slug }} className="group bg-background p-6 sm:p-7"><span className="eyebrow text-primary">{guide.eyebrow}</span><strong className="mt-2 block font-display text-2xl group-hover:text-primary">{guide.title}</strong><span className="mt-3 block text-sm leading-6 text-muted-foreground">{guide.description}</span><span className="mt-5 block text-sm font-semibold text-primary">Open history guide →</span></Link>)}</div>
      </section>
    </Container>
    <Container className="pb-14 sm:pb-18">
      <section className="grid gap-6 border-y border-border bg-surface p-6 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center sm:p-8" aria-labelledby="battleship-texas-history-feature">
        <div>
          <p className="eyebrow text-primary">Naval history · 1914–present</p>
          <h2 id="battleship-texas-history-feature" className="mt-2 font-display text-4xl">Battleship Texas connects the dreadnought era to Galveston.</h2>
          <p className="mt-3 max-w-4xl text-sm leading-7 text-muted-foreground">Follow USS Texas (BB-35) from World War I and D-Day through Iwo Jima, Okinawa, seven decades at San Jacinto and the current restoration for a permanent Pier 15 museum home in Galveston. Regular tours remain closed while restoration continues.</p>
          <div className="mt-5 flex flex-wrap gap-x-6 gap-y-3 text-sm font-semibold"><Link to="/article/$slug" params={{ slug: "battleship-texas-bb-35-history-restoration" }} className="border-b border-primary text-primary">Read the full Battleship Texas history</Link><Link to="/destination/$slug" params={{ slug: "battleship-texas" }} className="border-b border-primary text-primary">Current restoration and visitor status</Link></div>
        </div>
      </section>
    </Container>
    <Container className="pb-14 sm:pb-18">
      <div className="grid gap-8 lg:grid-cols-2">{historicSiteClusters.map((cluster) => {
        const sites = cluster.slugs.map((slug) => bySlug.get(slug)).filter((site): site is Destination => Boolean(site));
        if (!sites.length) return null;
        return <section key={cluster.id} className="border-t-2 border-foreground pt-6"><p className="eyebrow text-primary">{cluster.eyebrow}</p><h2 className="mt-2 font-display text-3xl">{cluster.title}</h2><p className="mt-3 text-sm leading-7 text-muted-foreground">{cluster.description}</p><div className="mt-5 grid gap-3">{sites.map((site) => <Link key={site.slug} to="/destination/$slug" params={{ slug: site.slug }} className="group border-b border-border pb-3"><span className="font-semibold group-hover:text-primary">{site.name}</span><span className="mt-1 block text-xs leading-5 text-muted-foreground">{site.nearestTown}{site.county ? ` · ${site.county} County` : ""}</span></Link>)}</div></section>;
      })}</div>
    </Container>
    <Container className="pb-16">
      <section className="border-y border-border bg-surface p-6 sm:p-8" aria-labelledby="painted-churches-history">
        <p className="eyebrow text-primary">Immigration · architecture · decorative arts</p>
        <h2 id="painted-churches-history" className="mt-3 font-display text-4xl">The Painted Churches are a Texas history network, not just a road trip.</h2>
        <p className="mt-4 max-w-4xl text-sm leading-7 text-muted-foreground">Follow Czech and Moravian, German, Wendish, Polish and Mexican American histories through 24 verified churches, then trace the architects, painters, symbols, decorative techniques, restorations and archival evidence that connect them.</p>
        <div className="mt-6 flex flex-wrap gap-x-6 gap-y-3 text-sm font-semibold"><Link to="/explore/painted-churches" className="border-b border-primary text-primary">Painted Churches collection</Link><Link to="/explore/painted-churches/heritage" className="border-b border-primary text-primary">Cultural heritage</Link><Link to="/explore/painted-churches/timeline" className="border-b border-primary text-primary">Statewide timeline</Link><Link to="/explore/painted-churches/people" className="border-b border-primary text-primary">Artists & architects</Link><Link to="/explore/painted-churches/harwood-archive" className="border-b border-primary text-primary">Harwood archive guide</Link></div>
      </section>
      <section className="grid gap-8 border-b border-border py-10 lg:grid-cols-[15rem_1fr]" aria-labelledby="official-designations-guide">
        <div><p className="eyebrow text-primary">Legislative designations</p><h2 id="official-designations-guide" className="mt-2 font-display text-3xl">Official Texas specialty capitals</h2></div>
        <Link to="/texas-capital-designations" className="group border border-border bg-background p-6"><strong className="font-display text-2xl group-hover:text-primary">Which places are officially a “Capital of Texas”?</strong><span className="mt-3 block text-sm leading-6 text-muted-foreground">See current source-backed city and county designations such as Cowboy Capital, Fishing Capital, Pie Capital and Garden Capital, with the enacted Legislature resolution for every listing.</span><span className="mt-5 block text-sm font-semibold text-primary">Open official designations guide →</span></Link>
      </section>
      <section className="grid gap-8 border-b border-border py-10 lg:grid-cols-[15rem_1fr]" aria-labelledby="living-heritage-guides">
        <div><p className="eyebrow text-primary">Living heritage</p><h2 id="living-heritage-guides" className="mt-2 font-display text-3xl">History you can still eat, hear and visit</h2></div>
        <div className="grid gap-px overflow-hidden border border-border bg-border md:grid-cols-2"><Link to="/german-czech-texas-towns" className="group bg-background p-6"><strong className="font-display text-2xl group-hover:text-primary">German & Czech Texas towns</strong><span className="mt-3 block text-sm leading-6 text-muted-foreground">Connect settlement history with bakeries, meat markets, churches, festivals, architecture and Central Texas communities.</span><span className="mt-5 block text-sm font-semibold text-primary">Open heritage guide →</span></Link><Link to="/texas-dance-halls-honky-tonks" className="group bg-background p-6"><strong className="font-display text-2xl group-hover:text-primary">Texas dance halls & honky-tonks</strong><span className="mt-3 block text-sm leading-6 text-muted-foreground">See how community halls, Western swing, country music and the two-step preserve another layer of Texas social history.</span><span className="mt-5 block text-sm font-semibold text-primary">Open music-history guide →</span></Link></div>
      </section>
    </Container>
  </>;
}
