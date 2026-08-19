import { createFileRoute, Link } from "@tanstack/react-router";

import { texasDefinedBrand } from "@/brand/texasdefined";
import { Container } from "@/components/layout/Container";
import { buildMeta, canonicalLink, jsonLd } from "@/lib/seo";

const canonicalPath = "/explore/painted-churches/timeline";
const siteUrl = `https://${texasDefinedBrand.identity.domain}`;
const pageUrl = `${siteUrl}${canonicalPath}`;
const description = "A statewide chronology of Texas Painted Church settlement, construction, decorative campaigns, disasters, restorations and historic designations.";

const events = [
  ["1846", "German Catholic parish life begins at Fredericksburg", "St. Mary's parish traces its origins to German immigrants arriving in Fredericksburg in 1846."],
  ["1854", "Wendish migration and Panna Maria settlement", "Large Wendish and Polish migrations establish two of the most important cultural anchors in the broader Painted Churches story: Serbin and Panna Maria."],
  ["1855", "First Panna Maria church", "Polish settlers build the first church beside the oak associated with their Christmas Eve 1854 Mass."],
  ["1856", "Dubina settlement", "Czech settlers establish the community whose name derives from the Czech word for oak."],
  ["1866", "Wesley Brethren church tradition", "The Wesley congregation's early building history begins; its surviving painted program later becomes one of the most distinctive Protestant examples."],
  ["1870", "St. Paul Lutheran Church at Serbin", "The major Serbin church emerges as a landmark of Wendish Lutheran life and later decorative-interior history."],
  ["1876–1877", "Bandera and Panna Maria present churches", "St. Stanislaus at Bandera dates to 1876; Panna Maria's present Immaculate Conception church is completed in 1877 after an earlier building was destroyed by lightning."],
  ["1889", "Bohuslav Laciak paints Wesley", "Rev. Laciak paints faux architecture, geometric ceiling decoration and Eucharistic imagery at Wesley; the work remains unfinished after his death."],
  ["1895", "Praha church completed", "St. Mary's Church of the Assumption at Praha is completed; its later decorative program becomes one of the best-known Painted Church interiors."],
  ["1906–1908", "Dielmann church campaigns", "High Hill and Fredericksburg become major Gothic Revival landmarks associated with architect Leo M. J. Dielmann."],
  ["1912", "High Hill interior painted", "Ferdinand Stockert and Hermann Kern execute the celebrated High Hill decorative campaign."],
  ["1917–1919", "Disaster and rebuilding era", "Plantersville rebuilds after lightning and fire; Ammannsville's present church follows earlier hurricane and fire losses; Queen of Peace at Sweet Home dates to this period."],
  ["1923", "Moravia painted", "Fred Donecker and his sons execute Moravia's decorative program, later described as among the least altered interiors in the group."],
  ["1930s", "Fredericksburg receives later decorative work", "Oidtmann Studios contributes a later phase of St. Mary's interior decoration, illustrating how Painted Church programs can span multiple campaigns."],
  ["1945", "Italian POW artists at Umbarger", "Italian prisoners of war from the Hereford camp contribute murals and carved figures to St. Mary's at Umbarger."],
  ["1950s", "Dubina interior whitewashed", "The historic decorative program is covered, setting up one of the most important later restoration stories in the collection."],
  ["1979", "Wesley and Lindsay listed in the National Register", "Two formal decorative-interior properties enter the National Register before the larger 1983 thematic listing."],
  ["1980s", "Dubina restoration", "Community members recover surviving designs and stencils and reconstruct the painted interior, while acknowledging artistic decisions where evidence is incomplete."],
  ["1983", "Major National Register Painted Churches listing", "Most properties in the formal Churches with Decorative Interior Painting multiple-property group are listed on June 21, 1983."],
  ["2001", "Austin PBS documentary era", "The Painted Churches of Texas: Echoes of the Homeland brings the churches, their symbols and decorative techniques to a wider audience."],
  ["2003–2008", "Bandera modern painted campaign", "Fr. Antoni Polaniak, Tomek Tederko, and Cezary and Eva Sienkiel create a parish-documented modern interior program at St. Stanislaus."],
  ["2026", "Texas Defined statewide authority project", "Texas Defined organizes verified churches, primary records, images, techniques, symbols, people, preservation and cultural context into one connected reference system."],
] as const;

export const Route = createFileRoute(canonicalPath)({
  head: () => ({
    meta: buildMeta(texasDefinedBrand, { canonicalPath, title: "Texas Painted Churches Timeline", description }),
    links: [canonicalLink(texasDefinedBrand, canonicalPath)],
    scripts: [jsonLd({ "@context": "https://schema.org", "@type": "ItemList", "@id": `${pageUrl}#timeline`, name: "Texas Painted Churches chronology", numberOfItems: events.length, itemListElement: events.map(([date, name, text], index) => ({ "@type": "ListItem", position: index + 1, item: { "@type": "Event", name, description: text, startDate: date.length === 4 ? `${date}-01-01` : undefined } })) })],
  }),
  component: TimelinePage,
});

function TimelinePage() {
  return <main><section className="border-b border-border bg-surface"><Container className="py-16 sm:py-24"><nav aria-label="Breadcrumb" className="text-[0.72rem] uppercase tracking-[0.14em] text-muted-foreground"><ol className="flex flex-wrap gap-2"><li><Link to="/">Front page</Link></li><li aria-hidden>·</li><li><Link to="/explore/painted-churches">Painted Churches</Link></li><li aria-hidden>·</li><li aria-current="page">Timeline</li></ol></nav><p className="eyebrow mt-8 text-primary">Statewide chronology</p><h1 className="mt-4 max-w-5xl font-display text-5xl leading-[0.98] sm:text-7xl">From immigrant settlements to restoration and research.</h1><p className="mt-6 max-w-4xl text-lg leading-8 text-muted-foreground">The Painted Churches story is not one construction boom. It stretches across migration, parish formation, rebuilding after disaster, decorative campaigns, whitewashing, restoration, historic designation and modern preservation.</p></Container></section><Container className="py-14 sm:py-18"><ol className="border-t-2 border-foreground">{events.map(([date, name, text]) => <li key={`${date}-${name}`} className="grid gap-4 border-b border-border py-7 sm:grid-cols-[140px_minmax(0,1fr)]"><div className="font-display text-3xl text-primary">{date}</div><div><h2 className="font-display text-2xl">{name}</h2><p className="mt-3 max-w-4xl text-sm leading-7 text-muted-foreground">{text}</p></div></li>)}</ol><section className="mt-14 border-l-2 border-primary bg-surface p-6 sm:p-8"><p className="eyebrow text-primary">Use the timeline with the entity guides</p><div className="mt-5 flex flex-wrap gap-x-6 gap-y-3 text-sm"><Link to="/explore/painted-churches/people" className="border-b border-primary text-primary">People</Link><Link to="/explore/painted-churches/preservation" className="border-b border-primary text-primary">Preservation</Link><Link to="/explore/painted-churches/heritage" className="border-b border-primary text-primary">Heritage</Link><Link to="/explore/painted-churches/census" className="border-b border-primary text-primary">Master census</Link></div></section></Container></main>;
}
