import { createFileRoute, Link } from "@tanstack/react-router";

import { texasDefinedBrand } from "@/brand/texasdefined";
import { Container } from "@/components/layout/Container";
import { absoluteUrl, buildMeta, canonicalLink, jsonLd } from "@/lib/seo";

const title = "Best Places to Go Camping in Texas";
const description = "A statewide guide to the best places to camp in Texas, from Big Bend and Palo Duro Canyon to Hill Country rivers, Piney Woods lakes and Gulf Coast beaches.";
const path = "/best-places-to-go-camping-in-texas";
const pageUrl = absoluteUrl(texasDefinedBrand, path);

const picks = [
  ["Big Bend Ranch State Park", "Far West Texas", "Best for dark skies, rugged desert scenery and remote primitive camping."],
  ["Palo Duro Canyon State Park", "Panhandle", "Best for canyon views, hiking access and a classic Texas landscape."],
  ["Garner State Park", "Hill Country", "Best for Frio River swimming, family camping and summer trips."],
  ["Inks Lake State Park", "Hill Country", "Best for easy lake access, paddling and a dependable weekend getaway."],
  ["Caddo Lake State Park", "Piney Woods", "Best for cypress swamps, paddling and a completely different side of Texas."],
  ["Davis Mountains State Park", "Far West Texas", "Best for cooler elevation, mountain scenery and stargazing."],
  ["Mustang Island State Park", "Gulf Coast", "Best for beach camping, salt air and sunrise over the Gulf."],
  ["Colorado Bend State Park", "Hill Country", "Best for hiking, waterfalls, caves and a more adventurous weekend."],
] as const;

export const Route = createFileRoute(path)({
  head: () => ({
    meta: buildMeta(texasDefinedBrand, { canonicalPath: path, title, description }),
    links: [canonicalLink(texasDefinedBrand, path)],
    scripts: [jsonLd({
      "@context": "https://schema.org",
      "@graph": [
        { "@type": "Article", "@id": `${pageUrl}#article`, headline: title, description, mainEntityOfPage: pageUrl, about: ["Texas camping", "Texas state parks", "campgrounds in Texas", "best camping in Texas"] },
        { "@type": "BreadcrumbList", itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl(texasDefinedBrand, "/") },
          { "@type": "ListItem", position: 2, name: "Explore Texas", item: absoluteUrl(texasDefinedBrand, "/explore") },
          { "@type": "ListItem", position: 3, name: title, item: pageUrl },
        ] },
        { "@type": "ItemList", name: "Best places to camp in Texas", numberOfItems: picks.length, itemListElement: picks.map((pick, index) => ({ "@type": "ListItem", position: index + 1, name: pick[0] })) },
      ],
    })],
  }),
  component: CampingGuidePage,
});

function CampingGuidePage() {
  return <main>
    <section className="border-b border-border bg-muted/30 py-14 md:py-20"><Container><p className="eyebrow text-primary">Texas outdoors</p><h1 className="mt-3 max-w-4xl font-display text-5xl leading-none md:text-7xl">Best Places to Go Camping in Texas</h1><p className="mt-6 max-w-3xl text-lg leading-8 text-muted-foreground">Texas camping ranges from remote desert backcountry to spring-fed rivers, pine forests, lakeshores and Gulf beaches. This guide helps you choose the right part of the state, the right season and the right style of campsite.</p></Container></section>
    <section className="py-12 md:py-16"><Container><h2 className="font-display text-4xl">The short list</h2><p className="mt-3 max-w-3xl text-muted-foreground">These are strong starting points for first-time visitors and repeat campers looking for distinctly different Texas landscapes.</p><div className="mt-8 grid gap-5 md:grid-cols-2">{picks.map(([name, region, why]) => <article key={name} className="border border-border p-6"><p className="eyebrow text-muted-foreground">{region}</p><h3 className="mt-2 font-display text-2xl">{name}</h3><p className="mt-3 leading-7 text-muted-foreground">{why}</p></article>)}</div></Container></section>
    <section className="bg-muted/30 py-12 md:py-16"><Container><h2 className="font-display text-4xl">Choose by camping style</h2><div className="mt-8 grid gap-8 md:grid-cols-3"><div><h3 className="font-display text-2xl">Tent camping</h3><p className="mt-3 leading-7 text-muted-foreground">Look first at state parks with shaded loops, water access and trails close to camp. Hill Country and Piney Woods parks are especially approachable.</p></div><div><h3 className="font-display text-2xl">RV camping</h3><p className="mt-3 leading-7 text-muted-foreground">Texas has a deep RV network, but hookups and site lengths vary. Confirm electrical service, pad length and generator rules before booking.</p></div><div><h3 className="font-display text-2xl">Primitive camping</h3><p className="mt-3 leading-7 text-muted-foreground">For solitude, focus on Big Bend country, remote park units and designated backcountry areas. Water planning and weather awareness matter more here.</p></div></div></Container></section>
    <section className="py-12 md:py-16"><Container><h2 className="font-display text-4xl">Best time to camp in Texas</h2><p className="mt-5 max-w-4xl leading-8 text-muted-foreground">There is no single Texas camping season. Fall through spring is usually strongest for the desert and much of Central Texas. Summer works better around rivers, lakes, higher elevations and the coast, but heat can be extreme. Always check current park alerts, burn bans, flood conditions and reservation rules before leaving.</p><div className="mt-10 border-t border-border pt-8"><h2 className="font-display text-3xl">Plan the rest of the trip</h2><div className="mt-5 flex flex-wrap gap-x-6 gap-y-3 text-sm"><Link to="/explore/state-parks" className="text-primary underline-offset-4 hover:underline">Texas State Parks Guide</Link><Link to="/explore/lakes-rivers" className="text-primary underline-offset-4 hover:underline">Texas Lakes & Rivers</Link><Link to="/explore/road-trips" className="text-primary underline-offset-4 hover:underline">Texas Road Trips</Link><Link to="/explore/outdoors" className="text-primary underline-offset-4 hover:underline">Texas Outdoors</Link><Link to="/guides" className="text-primary underline-offset-4 hover:underline">Texas Guidebook</Link></div></div></Container></section>
  </main>;
}
