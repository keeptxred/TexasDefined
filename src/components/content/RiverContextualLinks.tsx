import { riverLinksForCounty, riverLinksForDestination } from "@/data/river-authority-registry";

type Props = {countySlug?:string; destinationSlug?:string;};
export function RiverContextualLinks({countySlug, destinationSlug}:Props) {
 const links = countySlug ? riverLinksForCounty(countySlug) : destinationSlug ? riverLinksForDestination(destinationSlug) : [];
 if (!links.length) return null;
 return <section aria-label="Related Texas river guides" className="border-b border-border py-9">
  <div className="grid gap-4 md:grid-cols-[12rem_1fr]">
   <div><h2 className="font-display text-xl font-semibold">Nearby rivers &amp; watersheds</h2>
    <p className="mt-2 text-sm text-muted-foreground">Fishing, camping, access, paddling and trip planning</p></div>
   <ul className="grid gap-3 sm:grid-cols-2">
    {links.map((river)=><li key={river.href} className="rounded-lg border border-border p-4">
     <a className="font-semibold text-primary underline-offset-4 hover:underline" href={river.href}>{river.name} guide →</a>
     <p className="mt-1 text-sm text-muted-foreground">{river.summary}</p>
    </li>)}
   </ul>
  </div>
  <p className="mt-3 text-xs text-muted-foreground">Geographic and watershed connections are editorial context; check each river guide for lawful public access.</p>
 </section>;
}
