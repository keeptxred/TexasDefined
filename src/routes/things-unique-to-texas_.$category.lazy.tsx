import { Link, createLazyFileRoute } from "@tanstack/react-router";

import { Container } from "@/components/layout/Container";
import { TEXAS_BRAND_DIRECTORY_COUNT, TEXAS_GROCERY_BRAND_EXPANSION } from "@/data/texas-brand-directory";
import { texasIconCanonicalHref } from "@/data/things-unique-to-texas-links";

const FEATURED_GUIDES: Record<string, { href: string; label: string; description: string }[]> = {
  "food-drink": [
    { href: "/texas-food-history", label: "Texas Food History", description: "Start with the parent guide connecting barbecue, chili, chicken-fried steak, breakfast tacos, immigrant foodways and Texas-born brands." },
    { href: "/texas-food-trail", label: "The Texas Food Trail", description: "Turn barbecue, Tex-Mex, Czech bakeries, Gulf seafood and regional specialties into a statewide food trip." },
    { href: "/texas-breakfast-taco-guide", label: "Texas Breakfast Tacos", description: "Learn the tortillas, fillings, salsa habits and ordering logic behind one of the state's most everyday foods." },
    { href: "/texas-chili-con-carne-history", label: "Texas Chili Con Carne", description: "Trace San Antonio Chili Queens, commercial chili powder and cookoff culture without turning folklore into fact." },
    { href: "/texas-chicken-fried-steak-guide", label: "Texas Chicken-Fried Steak", description: "Understand the disputed origin, regional styles, cream gravy and texture that define the classic plate." },
    { href: "/texas-ranch-water-guide", label: "Texas Ranch Water", description: "Separate West Texas cocktail folklore from the better-documented Ranch 616 chapter of the modern drink." },
    { href: "/san-antonio-puffy-taco-history", label: "San Antonio Puffy Tacos", description: "Follow the fried-masa shell into San Antonio's West Side food culture and Ray's Drive Inn history." },
    { href: "/barbacoa-big-red-san-antonio", label: "Barbacoa & Big Red", description: "See how an older Sunday barbacoa tradition and a Waco-born soda became San Antonio cultural shorthand." },
    { href: "/german-czech-texas-towns", label: "German & Czech Texas towns", description: "Connect kolaches, sausage and beer traditions to the communities and institutions that kept them alive." },
  ],
  "texas-brands": [
    { href: "/texas-brand-origin-stories", label: "Texas Brand Origin Stories", description: "Trace H-E-B, Whataburger, Blue Bell, Shiner, Dickies and Buc-ee's back to the Texas places and routines that shaped them." },
    { href: "/article/heb-texas-grocery-history-culture", label: "H-E-B & Texas Grocery Culture", description: "Go deeper on H-E-B's Kerrville roots, grocery growth and role in everyday Texas community life." },
    { href: "/article/bucees-texas-road-trip-history", label: "Buc-ee's & the Texas Road Trip", description: "See how a Lake Jackson-area convenience store grew into a recognizable Texas highway ritual." },
  ],
  "natural-wonders": [
    { href: "/texas-natural-wonders-bucket-list", label: "Texas Natural Wonders Bucket List", description: "Twelve landscapes that show the state's full range, from desert mountains to cypress swamp and barrier island." },
  ],
  "roadside-small-towns": [
    { href: "/texas-roadside-oddities", label: "Texas Roadside Oddities", description: "Use giant, strange and unexpected stops as anchors for better Texas road trips." },
    { href: "/german-czech-texas-towns", label: "German & Czech Texas towns", description: "Build a heritage route through historic Central Texas and Hill Country communities." },
  ],
  "culture-music": [
    { href: "/texas-dance-halls-honky-tonks", label: "Texas Dance Halls & Honky-Tonks", description: "Historic halls, Western swing, two-step culture and the social side of Texas music." },
    { href: "/texas-homecoming-mums", label: "Texas Homecoming Mums Explained", description: "How a simple flower became one of the state's most elaborate school traditions." },
    { href: "/german-czech-texas-towns", label: "German & Czech Texas towns", description: "Food, churches, dance halls and festivals connect immigrant history to living Texas culture." },
  ],
  "slang-folklore": [
    { href: "/texas-slang-explained", label: "Texas Slang Explained", description: "Y'all, fixin' to, ranch imagery, bilingual influence and the context behind familiar Texas sayings." },
    { href: "/texas-blue-norther-weather-guide", label: "Texas Blue Northers & Spring Storms", description: "Separate Texas weather vocabulary and storm-watching culture from the meteorology and safety guidance that should control real decisions." },
  ],
  "landmarks": [
    { href: "/german-czech-texas-towns", label: "German & Czech Texas towns", description: "Historic districts, churches and settlement landscapes connect architecture to immigrant history." },
  ],
};

export const Route = createLazyFileRoute("/things-unique-to-texas/$category")({ component: TexasIconCategoryPage });

function TexasIconCategoryPage() {
  const category = Route.useLoaderData();
  const isTexasBrands = category.slug === "texas-brands";
  const tripPlanningCategory = ["natural-wonders", "landmarks", "roadside-small-towns", "food-drink"].includes(category.slug);
  const featuredGuides = FEATURED_GUIDES[category.slug] ?? [];

  return (
    <main>
      <section className="border-b border-border bg-muted/30 py-16 sm:py-24">
        <Container>
          <nav aria-label="Breadcrumb" className="mb-8 text-sm text-muted-foreground">
            <Link to="/" className="hover:text-foreground">Home</Link><span className="mx-2">/</span>
            <Link to="/things-unique-to-texas" className="hover:text-foreground">Things That Define Texas</Link><span className="mx-2">/</span>
            <span className="text-foreground">{category.title}</span>
          </nav>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">{category.eyebrow}</p>
          <h1 className="mt-4 max-w-5xl font-display text-5xl leading-[0.98] sm:text-6xl lg:text-7xl">{category.title}</h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-muted-foreground">{category.description}</p>
          <p className="mt-8 text-sm font-semibold uppercase tracking-[0.14em] text-muted-foreground">
            {isTexasBrands ? `${TEXAS_BRAND_DIRECTORY_COUNT} brands and Texas retail institutions` : `${category.items.length} entries in this chapter`}
          </p>
        </Container>
      </section>

      <section className="py-16 sm:py-20">
        <Container>
          <div className="grid gap-6 lg:grid-cols-[1fr_320px] lg:items-start">
            <div>
              {isTexasBrands && (
                <section className="mb-8 border border-border bg-muted/20 p-6">
                  <h2 className="font-display text-3xl">Texas roots first, commercial relationships second</h2>
                  <p className="mt-3 text-sm leading-7 text-muted-foreground">Brand inclusion is editorial. Any affiliate or sponsored relationship must be separately labeled and does not buy rankings, favorable coverage or factual changes.</p>
                  <a href="/partner-with-us?type=brand-retail&source=%2Fthings-unique-to-texas%2Ftexas-brands" className="mt-4 inline-block text-sm font-semibold text-primary underline-offset-4 hover:underline">Represent a Texas brand, grocer or retailer? Explore partnership options →</a>
                </section>
              )}

              <div className="grid gap-4 sm:grid-cols-2">
                {category.items.map((entry) => {
                  const href = isTexasBrands && entry.id === 38
                    ? "/article/heb-texas-grocery-history-culture"
                    : isTexasBrands && entry.id === 36
                      ? "/article/bucees-texas-road-trip-history"
                      : texasIconCanonicalHref(entry);
                  const content = (
                    <div className="flex items-start gap-4">
                      <span className="mt-1 min-w-9 text-sm font-semibold tabular-nums text-primary">{entry.id}</span>
                      <div>
                        <h2 className="font-display text-2xl leading-tight">{entry.name}</h2>
                        <p className="mt-3 text-sm leading-6 text-muted-foreground">{entry.note}</p>
                        {href && <p className="mt-4 text-sm font-semibold text-primary">Explore the deeper TexasDefined guide →</p>}
                      </div>
                    </div>
                  );
                  return href ? (
                    <Link key={entry.id} to={href} className="group border border-border bg-card p-6 transition-colors hover:border-primary/50 hover:bg-muted/30">{content}</Link>
                  ) : (
                    <article key={entry.id} className="border border-border bg-card p-6">{content}</article>
                  );
                })}
              </div>

              {isTexasBrands && (
                <section className="mt-12">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">Grocery & Markets</p>
                  <h2 className="mt-2 font-display text-4xl">Texas grocery and market chains</h2>
                  <p className="mt-3 max-w-3xl text-sm leading-7 text-muted-foreground">H-E-B appears above; these additional Texas-rooted or Texas-significant grocery formats expand the brand guide without creating thin store-location pages.</p>
                  <div className="mt-6 grid gap-4 sm:grid-cols-2">
                    {TEXAS_GROCERY_BRAND_EXPANSION.map(([name, note, href]) => (
                      <article key={name} className="border border-border bg-card p-6">
                        <h3 className="font-display text-2xl leading-tight">{href ? <Link to={href} className="hover:text-primary">{name}</Link> : name}</h3>
                        <p className="mt-3 text-sm leading-6 text-muted-foreground">{note}</p>
                      </article>
                    ))}
                  </div>
                </section>
              )}
            </div>

            <aside className="border border-border bg-muted/25 p-6 lg:sticky lg:top-24">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">Related reading</p>
              <h2 className="mt-3 font-display text-3xl">Go beyond the list</h2>
              <div className="mt-6 divide-y divide-border border-y border-border">
                {featuredGuides.map((link) => (
                  <Link key={link.href} to={link.href} className="group block py-5">
                    <span className="font-semibold group-hover:text-primary">{link.label} →</span>
                    <span className="mt-1 block text-sm leading-6 text-muted-foreground">{link.description}</span>
                  </Link>
                ))}
                {category.deepDives.map((link) => (
                  <Link key={link.href} to={link.href} className="group block py-5">
                    <span className="font-semibold group-hover:text-primary">{link.label} →</span>
                    <span className="mt-1 block text-sm leading-6 text-muted-foreground">{link.description}</span>
                  </Link>
                ))}
                {tripPlanningCategory && (
                  <Link to="/explore/trip-planner" className="group block py-5">
                    <span className="font-semibold group-hover:text-primary">Build a trip from these Texas icons →</span>
                    <span className="mt-1 block text-sm leading-6 text-muted-foreground">Turn food stops, natural wonders, landmarks and small-town detours into a Texas itinerary.</span>
                  </Link>
                )}
                <Link to="/things-unique-to-texas/methodology" className="group block py-5">
                  <span className="font-semibold group-hover:text-primary">How this collection is maintained →</span>
                  <span className="mt-1 block text-sm leading-6 text-muted-foreground">Read the inclusion rules, source precedence, cross-link policy and corrections approach behind all 250 entries.</span>
                </Link>
              </div>
              <Link to="/things-unique-to-texas" className="mt-6 inline-block text-sm font-semibold text-primary underline-offset-4 hover:underline">Back to all 250 Texas icons</Link>
            </aside>
          </div>
        </Container>
      </section>
    </main>
  );
}
