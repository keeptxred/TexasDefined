// These links identify the context of historical observations and surveys;
// they must never be converted into current fishery quality grades.
const links: Record<string, readonly { slug: string; name: string; context: string }[]> = {
  "lake-fork": [
    { slug: "bowfin", name: "Bowfin", context: "TPWD historical catch records" },
    { slug: "spotted-gar", name: "Spotted gar", context: "TPWD historical catch records" },
    { slug: "freshwater-drum", name: "Freshwater drum", context: "TPWD historical catch records" },
  ],
  "sam-rayburn-reservoir": [
    { slug: "bowfin", name: "Bowfin", context: "TPWD historical catch records" },
    { slug: "spotted-gar", name: "Spotted gar", context: "TPWD historical catch records" },
    { slug: "freshwater-drum", name: "Freshwater drum", context: "TPWD historical catch records" },
  ],
  "alan-henry-reservoir": [
    { slug: "bluegill", name: "Bluegill", context: "2018–2021 TPWD fisheries survey: forage fish" },
    { slug: "spotted-bass", name: "Spotted bass vs. Alabama bass", context: "Identification distinction; not a spotted-bass occurrence claim" },
  ],
  "lake-corpus-christi": [
    { slug: "common-carp", name: "Common carp", context: "TPWD historical catch, July 2022" },
    { slug: "rio-grande-cichlid", name: "Rio Grande cichlid", context: "TPWD historical catch, May 1993" },
  ],
  "lake-travis": [
    { slug: "rio-grande-cichlid", name: "Rio Grande cichlid", context: "TPWD historical catch, June 2024" },
  ],
  "lake-somerville": [
    { slug: "green-sunfish", name: "Green sunfish", context: "TPWD historical fly-fishing record" },
  ],
};
export function LakeFishEvidenceLinks({ lakeSlug }: { lakeSlug: string }) {
  const rows = links[lakeSlug];
  if (!rows?.length) return null;
  return <section className="mt-10 border-t border-border pt-7" aria-label="Additional fish identification and records">
    <h2 className="font-display text-3xl">Fish identification and historical evidence</h2>
    <p className="mt-3 max-w-3xl text-sm leading-6 text-muted-foreground">The following guides explain source-specific observations and identification distinctions. They are not a current catch forecast or fishery rating.</p>
    <ul className="mt-4 space-y-3">{rows.map(row => <li key={row.slug}><a className="font-semibold underline text-primary" href={"/fishing/species/" + row.slug}>{row.name}</a><span className="ml-2 text-sm text-muted-foreground">{row.context}</span></li>)}</ul>
  </section>;
}
