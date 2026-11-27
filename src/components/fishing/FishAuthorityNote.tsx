import { FISH_AUTHORITY_NOTES, FISH_AUTHORITY_SOURCES } from "@/data/fishing/species-authority-notes";

export function FishAuthorityNote({ slug }: { slug: string }) {
  const note = FISH_AUTHORITY_NOTES[slug];
  if (!note) return null;
  const sources = [...new Set([note.source, ...(note.extraSources ?? [])])].map(key => FISH_AUTHORITY_SOURCES[key]);
  return <section className="border-b border-border py-10" aria-labelledby="texas-fish-practical-guide">
    <h2 id="texas-fish-practical-guide" className="font-display text-3xl">Texas fishing: where to start</h2>
    <p className="mt-4 max-w-3xl text-base leading-7 text-foreground">{note.guidance}</p>
    <ul className="mt-3 space-y-2 text-sm">{sources.map(source => <li key={source.url}><a className="underline text-primary" href={source.url} target="_blank" rel="noopener noreferrer">TPWD: {source.label}</a></li>)}</ul>
    {note.lakes.length > 0 && <div className="mt-5"><h3 className="font-semibold">Related waterbody planning guides</h3><p className="mt-2 text-sm text-muted-foreground">Use these guides for access and local conditions; historical records and surveys are evidence of occurrence, not a current fishery rating.</p><ul className="mt-3 flex flex-wrap gap-4">{note.lakes.map(lake => <li key={lake}><a className="underline text-primary" href={"/fishing/lakes/" + lake}>{lake.replaceAll("-", " ").replace(/\b\w/g, c => c.toUpperCase())}</a></li>)}</ul></div>}
    {note.riverGuides?.length ? <div className="mt-5"><h3 className="font-semibold">Related river access guides</h3><ul className="mt-3 space-y-2">{note.riverGuides.map(river => <li key={river.slug}><a className="underline text-primary" href={"/article/" + river.slug}>{river.name}</a></li>)}</ul></div> : null}
    {note.related.length > 0 && <div className="mt-5"><h3 className="font-semibold">Related fish and fishing approaches</h3><ul className="mt-3 flex flex-wrap gap-4">{note.related.map(fish => <li key={fish}><a className="underline text-primary" href={"/fishing/species/" + fish}>{fish.replaceAll("-", " ").replace(/\b\w/g, c => c.toUpperCase())}</a></li>)}</ul></div>}
    <p className="mt-5 text-sm leading-6 text-muted-foreground">Before keeping fish, check the <a className="underline text-primary" href={FISH_AUTHORITY_SOURCES.limits.url}>current freshwater limits</a> and <a className="underline text-primary" href={FISH_AUTHORITY_SOURCES.advisories.url}>fish consumption advisories</a> for your waterbody.</p>
  </section>;
}
