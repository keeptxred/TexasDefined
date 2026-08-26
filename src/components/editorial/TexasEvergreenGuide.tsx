import { Link } from "@tanstack/react-router";

import bbqBrisket from "@/assets/bbq-brisket.jpg";
import bigBend from "@/assets/big-bend.jpg";
import kolacheKlobasnek from "@/assets/kolache-klobasnek-hero-photo.jpg";
import { Container } from "@/components/layout/Container";
import type { TexasEvergreenGuide as TexasEvergreenGuideData } from "@/data/texas-evergreen-guides";

const siteUrl = "https://texasdefined.com";

const foodHistoryGuideSlugs = new Set([
  "texas-food-trail",
  "texas-chili-con-carne-history",
  "texas-chicken-fried-steak-guide",
  "texas-breakfast-taco-guide",
  "german-czech-texas-towns",
  "dr-pepper-texas-history",
  "texas-ranch-water-guide",
  "san-antonio-puffy-taco-history",
  "barbacoa-big-red-san-antonio",
]);

const musicGuideSlugs = new Set([
  "texas-blues",
  "texas-conjunto-tejano",
  "texas-western-swing",
]);

const guideDestinationLinks: Partial<Record<string, { href: string; label: string; description: string }>> = {
  "dr-pepper-texas-history": {
    href: "/destination/dr-pepper-museum",
    label: "Explore the Dr Pepper Museum",
    description: "Turn the Waco origin story into a visit with TexasDefined's destination guide to the Dr Pepper Museum.",
  },
};

type GuideImage = {
  src: string;
  alt: string;
  caption: string;
  credit?: string;
  sourceHref?: string;
};

const guideImages: Partial<Record<string, GuideImage>> = {
  "texas-food-trail": {
    src: bbqBrisket,
    alt: "Sliced Texas barbecue brisket showing dark bark and a smoke ring",
    caption: "Barbecue is one chapter of the Texas food story, not the whole story.",
  },
  "texas-chili-con-carne-history": {
    src: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Pot_of_Chili_Con_Carne.jpg?width=1600",
    alt: "Pot of chili con carne representing the Texas bowl-of-red tradition",
    caption: "Chili con carne became a Texas identity marker through San Antonio street-food history, commercial chili products and later cookoff culture.",
    credit: "Punkgobliner · CC BY-SA 4.0 · Wikimedia Commons",
    sourceHref: "https://commons.wikimedia.org/wiki/File:Pot_of_Chili_Con_Carne.jpg",
  },
  "texas-chicken-fried-steak-guide": {
    src: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Chicken_fried_steak.jpg?width=1600",
    alt: "Chicken-fried steak served as a classic breaded beef comfort-food plate",
    caption: "Chicken-fried steak is firmly associated with Texas even though its exact origin remains disputed.",
    credit: "Mr. Gray · CC0 · Wikimedia Commons",
    sourceHref: "https://commons.wikimedia.org/wiki/File:Chicken_fried_steak.jpg",
  },
  "texas-breakfast-taco-guide": {
    src: "https://commons.wikimedia.org/wiki/Special:Redirect/file/BreakfastTaco.jpg?width=1200",
    alt: "Egg and sausage breakfast taco with salsa on a flour tortilla",
    caption: "Breakfast tacos are everyday Texas food built around tortillas, fillings and the salsa habits of the local shop.",
    credit: "Paxsimius · CC BY-SA 4.0 · Wikimedia Commons",
    sourceHref: "https://commons.wikimedia.org/wiki/File:BreakfastTaco.jpg",
  },
  "texas-ranch-water-guide": {
    src: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Ranch_water.jpg?width=1600",
    alt: "Ranch Water cocktail served over ice with citrus",
    caption: "The modern Ranch Water format is simple—tequila, lime and sparkling mineral water—even though the drink's exact origin remains disputed.",
    credit: "BanjoZebra · CC BY 4.0 · Wikimedia Commons",
    sourceHref: "https://commons.wikimedia.org/wiki/File:Ranch_water.jpg",
  },
  "san-antonio-puffy-taco-history": {
    src: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Puffy_taco.jpg?width=1600",
    alt: "Puffy taco served at Los Barrios Mexican Restaurant in San Antonio",
    caption: "A San Antonio puffy taco uses fresh masa fried until the shell expands into a crisp, airy pocket.",
    credit: "y6y6y6 · CC BY 2.0 · Wikimedia Commons",
    sourceHref: "https://commons.wikimedia.org/wiki/File:Puffy_taco.jpg",
  },
  "texas-natural-wonders-bucket-list": {
    src: bigBend,
    alt: "Big Bend landscape with desert terrain and distant mountains",
    caption: "Big Bend is one anchor in a natural-wonders list that stretches from desert mountains to cypress swamps and barrier islands.",
  },
  "german-czech-texas-towns": {
    src: kolacheKlobasnek,
    alt: "Texas Czech-style kolache and klobasnek pastries",
    caption: "Food is one of the most visible surviving links to Czech and German settlement, but the heritage also lives in churches, halls, festivals and town landscapes.",
  },
  "dr-pepper-texas-history": {
    src: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Cupola_Dr_Pepper_Museum_Waco_Texas_2024.jpg?width=1600",
    alt: "Cupola and upper exterior of the Dr Pepper Museum in Waco, Texas",
    caption: "The Dr Pepper Museum preserves the Waco setting behind one of Texas's best-known brand-origin stories.",
    credit: "Larry D. Moore · CC BY 4.0 · Wikimedia Commons",
    sourceHref: "https://commons.wikimedia.org/wiki/File:Cupola_Dr_Pepper_Museum_Waco_Texas_2024.jpg",
  },
};

const guideSources: Partial<Record<string, { label: string; href: string; note: string }[]>> = {
  "texas-chili-con-carne-history": [
    { label: "Handbook of Texas — San Antonio", href: "https://www.tshaonline.org/handbook/entries/san-antonio-tx", note: "Documents the downtown Chili Queens and San Antonio's open-air chili-stand tradition." },
    { label: "Handbook of Texas — Gebhardt Mexican Foods Company", href: "https://www.tshaonline.org/handbook/entries/gebhardt-mexican-foods-company", note: "Documents William Gebhardt's chili-powder business and its role in commercializing Texas chili products." },
  ],
  "texas-chicken-fried-steak-guide": [
    { label: "Handbook of Texas — Chicken-Fried Steak", href: "https://www.tshaonline.org/handbook/entries/chicken-fried-steak", note: "Explains the disputed origin story and the Southern, German and regional Texas influences associated with the dish." },
  ],
  "texas-brand-origin-stories": [
    { label: "H-E-B — Company history", href: "https://careers.heb.com/about-us?lang=en-US", note: "H-E-B's history timeline documents Florence Butt's 1905 Kerrville grocery and the company's Texas roots." },
    { label: "Blue Bell Creameries — About Us", href: "https://www.bluebell.com/about-us/", note: "Blue Bell documents the 1907 Brenham Creamery Company origin and the 1930 Blue Bell name change." },
    { label: "Shiner — Brewery history", href: "https://shiner.com/brewery/", note: "The brewery's timeline documents brewing in Shiner since 1909 and its German and Czech community roots." },
  ],
  "dr-pepper-texas-history": [
    { label: "Dr Pepper Museum — History", href: "https://drpeppermuseum.com/history/", note: "The museum's history documents the 1885 Waco origin, Morrison's Old Corner Drug Store and Charles Alderton's role." },
  ],
  "texas-ranch-water-guide": [
    { label: "Austin Monthly — How the Ranch Water Was Born in Austin", href: "https://www.austinmonthly.com/ranch-water/", note: "Documents Ranch 616's late-1990s menu history and Kevin Williamson's account while identifying the drink as an Austin and Texas icon." },
    { label: "The Washington Post — Ranch Water origin reporting", href: "https://www.washingtonpost.com/food/2021/07/27/ranch-water-recipe/", note: "Examines competing origin stories and identifies Kevin Williamson and Ranch 616 as the closest documented modern naming/origin claim without treating older West Texas folklore as proven fact." },
  ],
  "san-antonio-puffy-taco-history": [
    { label: "Visit San Antonio — Hill Country road trip and tacos", href: "https://www.visitsanantonio.com/in-the-news/post/the-ultimate-texas-hill-country-road-trip-includes-tree-houses-tubing-and-tacos/", note: "Identifies Ray's Drive Inn with the puffy taco's modern San Antonio origin story and describes the fresh-fried shell." },
    { label: "UTSA — Tacos, Texas and tradition", href: "https://news.utsa.edu/2020/08/everything-you-need-to-know-about-tacos-texas-and-tradition/", note: "Places puffy tacos within San Antonio's broader taco culture and regional food-history conversation." },
    { label: "Texas Standard — An Ode to the Puffy Taco", href: "https://texasstandard.org/stories/opinion-an-ode-to-the-puffy-taco/", note: "Documents Arturo Lopez and Ray's Drive Inn as central to the modern San Antonio puffy-taco story." },
  ],
  "barbacoa-big-red-san-antonio": [
    { label: "Texas A&M University–San Antonio — Barbacoa and Big Red festival", href: "https://mesquite-news.com/big-red-and-barbacoa-headline-festival/", note: "Documents Sunday barbacoa family traditions and the established San Antonio pairing with Big Red." },
    { label: "Dr Pepper Museum — Big Red exhibit", href: "https://drpeppermuseum.com/virtual-tour/", note: "Documents Big Red as another Waco-created beverage and its earlier Sun Tang name." },
    { label: "San Antonio Report — Barbacoa & Big Red Festival", href: "https://sanantonioreport.org/barbacoa-big-red-festival-only-in-sa/", note: "Documents the pairing as a San Antonio family tradition and the festival's role in turning that recurring Sunday ritual into a public celebration." },
  ],
  "texas-blue-norther-weather-guide": [
    { label: "Handbook of Texas — Blue Norther", href: "https://www.tshaonline.org/handbook/entries/blue-norther", note: "Documents the Texas term and historical descriptions while distinguishing the name from the broader meteorological phenomenon." },
    { label: "National Weather Service Amarillo — 50-degree temperature ranges", href: "https://www.weather.gov/ama/50ranges", note: "Documents major rapid temperature changes in the Texas Panhandle and provides meteorological context for sharp frontal passages." },
    { label: "National Weather Service Houston/Galveston — Spring storm signals", href: "https://www.weather.gov/hgx/stormsignals_vol40", note: "Provides official severe-weather context and reinforces that current NWS forecasts and warnings—not folklore—should control safety decisions." },
  ],
  "texas-blues": [
    { label: "Handbook of Texas — Blues", href: "https://www.tshaonline.org/handbook/entries/blues", note: "Documents the Dallas and Deep Ellum blues scene, Blind Lemon Jefferson's commercial breakthrough and the evolution of the Texas guitar tradition through T-Bone Walker." },
    { label: "Handbook of Texas — Blind Lemon Jefferson", href: "https://www.tshaonline.org/handbook/entries/jefferson-blind-lemon", note: "Documents Jefferson's Freestone County roots, Dallas performance history, recording career and influence on later blues and popular music." },
    { label: "Handbook of Texas — Lightnin' Hopkins", href: "https://www.tshaonline.org/handbook/entries/hopkins-sam-lightnin", note: "Documents Hopkins's Texas background and the career that made him one of the state's most recognizable blues musicians." },
  ],
  "texas-conjunto-tejano": [
    { label: "Handbook of Texas — Texas-Mexican Conjunto", href: "https://www.tshaonline.org/handbook/entries/texas-mexican-conjunto", note: "Documents the accordion-and-bajo-sexto tradition, Narciso Martínez's formative role and the evolution of conjunto instrumentation." },
    { label: "Handbook of Texas — Conjunto, Tejano and Border collection", href: "https://www.tshaonline.org/handbook/projects/texas-music/category/music/category/genres-conjunto-tejano-and-border", note: "Provides the wider Texas music authority collection covering musicians, venues, radio, festivals and institutions in the conjunto and Tejano tradition." },
  ],
  "texas-western-swing": [
    { label: "Handbook of Texas — Milton Brown", href: "https://www.tshaonline.org/handbook/entries/brown-william-milton", note: "Documents Brown's Fort Worth career, the Musical Brownies and their foundational role in the early western swing ensemble sound." },
    { label: "Handbook of Texas — Bob Wills", href: "https://www.tshaonline.org/handbook/entries/wills-james-robert", note: "Documents Wills's Texas roots, the musical influences behind his style and the expansion of western swing through the Texas Playboys." },
    { label: "Handbook of Texas — Country Music", href: "https://www.tshaonline.org/handbook/entries/country-music", note: "Places western swing in the larger Texas country-music history and describes its blend of fiddle music, blues, jazz, ragtime, polkas and dance-band influences." },
  ],
};

export function TexasEvergreenGuide({ guide }: { guide: TexasEvergreenGuideData }) {
  const canonicalUrl = `${siteUrl}/${guide.slug}`;
  const image = guideImages[guide.slug];
  const sources = guideSources[guide.slug] ?? [];
  const destinationLink = guideDestinationLinks[guide.slug];
  const isFoodHistoryChild = foodHistoryGuideSlugs.has(guide.slug);
  const isMusicChild = musicGuideSlugs.has(guide.slug);
  const imageUrl = image
    ? image.src.startsWith("http://") || image.src.startsWith("https://")
      ? image.src
      : `${siteUrl}${image.src.startsWith('/') ? image.src : `/${image.src}`}`
    : undefined;
  const breadcrumbItems = [
    { "@type": "ListItem", position: 1, name: "Front page", item: `${siteUrl}/` },
    isMusicChild
      ? { "@type": "ListItem", position: 2, name: "Texas Music", item: `${siteUrl}/texas-music` }
      : { "@type": "ListItem", position: 2, name: "Things That Define Texas", item: `${siteUrl}/things-unique-to-texas` },
    ...(isFoodHistoryChild ? [{ "@type": "ListItem", position: 3, name: "Texas Food History", item: `${siteUrl}/texas-food-history` }] : []),
    { "@type": "ListItem", position: isFoodHistoryChild ? 4 : 3, name: guide.title, item: canonicalUrl },
  ];
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "@id": `${canonicalUrl}#article`,
        headline: guide.title,
        description: guide.dek,
        url: canonicalUrl,
        mainEntityOfPage: { "@id": `${canonicalUrl}#page` },
        publisher: { "@type": "Organization", name: "TexasDefined", url: siteUrl },
        articleSection: isFoodHistoryChild ? "Texas Food History" : "Things That Define Texas",
        ...(isMusicChild ? { articleSection: "Texas Music" } : {}),
        image: imageUrl,
        citation: sources.length ? sources.map((source) => source.href) : undefined,
        ...(isFoodHistoryChild ? { isPartOf: { "@type": "CollectionPage", "@id": `${siteUrl}/texas-food-history#page`, name: "Texas Food History", url: `${siteUrl}/texas-food-history` } } : {}),
        ...(isMusicChild ? { isPartOf: { "@type": "CollectionPage", "@id": `${siteUrl}/texas-music#collection`, name: "Texas Music", url: `${siteUrl}/texas-music` } } : {}),
        ...(destinationLink ? { mentions: [{ "@type": "TouristAttraction", name: destinationLink.label.replace(/^Explore the /, ""), url: `${siteUrl}${destinationLink.href}` }] } : {}),
        about: guide.sections.map((section) => ({ "@type": "Thing", name: section.heading.replace(/^\d+\.\s*/, "") })),
      },
      {
        "@type": "WebPage",
        "@id": `${canonicalUrl}#page`,
        url: canonicalUrl,
        name: guide.title,
        description: guide.dek,
        primaryImageOfPage: imageUrl ? { "@type": "ImageObject", contentUrl: imageUrl } : undefined,
        isPartOf: { "@type": "WebSite", "@id": `${siteUrl}/#website`, name: "TexasDefined", url: siteUrl },
        breadcrumb: { "@id": `${canonicalUrl}#breadcrumb` },
        mainEntity: { "@id": `${canonicalUrl}#article` },
      },
      {
        "@type": "ItemList",
        "@id": `${canonicalUrl}#sections`,
        name: `${guide.title} sections`,
        numberOfItems: guide.sections.length,
        itemListElement: guide.sections.map((section, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: section.heading,
        })),
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${canonicalUrl}#breadcrumb`,
        itemListElement: breadcrumbItems,
      },
    ],
  };

  return <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    <Container className="pb-16 pt-10 sm:pb-24 sm:pt-14">
      <article className="mx-auto max-w-5xl">
        <nav aria-label="Breadcrumb" className="border-b border-border pb-4 text-xs uppercase tracking-[0.14em] text-muted-foreground">
          <Link to="/" className="hover:text-foreground">Front page</Link>
          <span aria-hidden="true" className="mx-2">/</span>
          {isMusicChild
            ? <Link to="/texas-music" className="hover:text-foreground">Texas Music</Link>
            : <Link to="/things-unique-to-texas" className="hover:text-foreground">Things That Define Texas</Link>}
          {isFoodHistoryChild ? <>
            <span aria-hidden="true" className="mx-2">/</span>
            <Link to="/texas-food-history" className="hover:text-foreground">Texas Food History</Link>
          </> : null}
          <span aria-hidden="true" className="mx-2">/</span>
          <span aria-current="page" className="text-foreground">{guide.title}</span>
        </nav>

        <header className="border-b border-border py-10 sm:py-14">
          <p className="eyebrow text-primary">{guide.eyebrow}</p>
          <h1 className="mt-3 max-w-4xl font-display text-5xl leading-[0.98] sm:text-7xl">{guide.title}</h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-muted-foreground sm:text-xl">{guide.dek}</p>
          <div className="mt-6 flex flex-wrap gap-x-6 gap-y-3 text-sm font-semibold">
            {isFoodHistoryChild ? <Link to="/texas-food-history" className="border-b border-primary pb-1 text-primary">Explore the full Texas Food History collection →</Link> : null}
            {isMusicChild ? <Link to="/texas-music" className="border-b border-primary pb-1 text-primary">Explore the full Texas Music collection →</Link> : null}
            {destinationLink ? <Link to={destinationLink.href} className="border-b border-primary pb-1 text-primary">{destinationLink.label} →</Link> : null}
          </div>
          {destinationLink ? <p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground">{destinationLink.description}</p> : null}
        </header>

        {image ? <figure className="border-b border-border py-8">
          <img src={image.src} alt={image.alt} className="aspect-[16/9] w-full object-cover" loading="eager" fetchPriority="high" />
          <figcaption className="mt-3 max-w-3xl text-xs leading-5 text-muted-foreground">
            {image.caption}
            {image.credit ? <>{" "}{image.sourceHref ? <a href={image.sourceHref} target="_blank" rel="noreferrer noopener" className="underline decoration-border underline-offset-2">{image.credit}</a> : image.credit}</> : null}
          </figcaption>
        </figure> : null}

        <section className="border-b border-border py-8" aria-labelledby="quick-answer">
          <p className="eyebrow text-primary">Quick answer</p>
          <h2 id="quick-answer" className="mt-2 font-display text-3xl">The short version</h2>
          <p className="mt-4 max-w-4xl text-base leading-8">{guide.quickAnswer}</p>
        </section>

        <div>
          {guide.sections.map((section, index) => <section key={section.heading} className="grid gap-6 border-b border-border py-10 lg:grid-cols-[12rem_minmax(0,1fr)]">
            <div>
              <p className="eyebrow text-primary">{String(index + 1).padStart(2, "0")}</p>
              <h2 className="mt-2 font-display text-3xl leading-tight">{section.heading}</h2>
            </div>
            <div className="max-w-3xl space-y-5">
              {section.body.map((paragraph) => <p key={paragraph} className="text-base leading-8 text-muted-foreground">{paragraph}</p>)}
              {section.bullets?.length ? <ul className="grid gap-3 border-l border-primary/40 pl-5 text-sm leading-7">
                {section.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}
              </ul> : null}
              {section.links?.length ? <div className="flex flex-wrap gap-x-6 gap-y-3 pt-1 text-sm font-semibold">
                {section.links.map((link) => <Link key={link.href} to={link.href} className="border-b border-primary text-primary">{link.label}</Link>)}
              </div> : null}
            </div>
          </section>)}
        </div>

        {sources.length ? <section className="border-b border-border py-10" aria-labelledby="source-notes">
          <p className="eyebrow text-primary">Source notes</p>
          <h2 id="source-notes" className="mt-2 font-display text-3xl">Where the historical claims come from</h2>
          <p className="mt-4 max-w-3xl text-sm leading-7 text-muted-foreground">These sources support the historical framework above. Current visitor operations, menus, ownership and event details can change and should be checked with the relevant official organization.</p>
          <ul className="mt-6 divide-y divide-border border-y border-border">
            {sources.map((source) => <li key={source.href} className="py-4">
              <a href={source.href} target="_blank" rel="noreferrer noopener" className="font-semibold text-primary underline decoration-primary/40 underline-offset-4">{source.label} ↗</a>
              <p className="mt-1 text-sm leading-6 text-muted-foreground">{source.note}</p>
            </li>)}
          </ul>
        </section> : null}

        <section className="py-12" aria-labelledby="related-reading">
          <p className="eyebrow text-primary">Keep exploring</p>
          <h2 id="related-reading" className="mt-2 font-display text-4xl">Related TexasDefined guides</h2>
          <div className="mt-6 grid gap-px overflow-hidden border border-border bg-border md:grid-cols-3">
            {guide.related.map((item) => <Link key={item.href} to={item.href} className="group bg-background p-6">
              <strong className="font-display text-2xl leading-tight group-hover:text-primary">{item.label}</strong>
              <span className="mt-3 block text-sm leading-6 text-muted-foreground">{item.description}</span>
              <span className="mt-5 block text-sm font-semibold text-primary">Read next →</span>
            </Link>)}
          </div>
        </section>
      </article>
    </Container>
  </>;
}