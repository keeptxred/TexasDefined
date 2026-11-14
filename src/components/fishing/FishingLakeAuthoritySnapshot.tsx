type Entry = { label: string; summary: string; href: string };
export function FishingLakeAuthoritySnapshot({
  name, slug, campground, regulation, attraction, reviewedAt,
}: {
  name: string;
  slug: string;
  campground?: Entry;
  regulation?: Entry;
  attraction?: Entry;
  reviewedAt?: string;
}) {
  const sections = [
    { label: "Overnight stay and campground status", route: "camping", data: campground },
    { label: "Fishing rules and source advisories", route: "regulations", data: regulation },
    { label: "A real place to visit", route: "nearby", data: attraction },
  ].filter((item): item is { label: string; route: string; data: Entry } => Boolean(item.data));
  if (!sections.length) return null;
  return <section aria-label={name + " researched trip planning"} className="mt-12 border-t border-border pt-9">
    <p className="eyebrow text-primary">Evidence for this exact lake</p>
    <h2 className="mt-3 max-w-4xl font-display text-3xl sm:text-4xl">Before visiting {name}, know these three things</h2>
    <p className="mt-4 max-w-3xl text-sm leading-7 text-muted-foreground">
      These are selected findings from this lake's individually attributed campground, rules and recreation sources—not generic Texas-lake advice.
      {reviewedAt ? " Source review: " + reviewedAt + "." : ""} Verify changes in fishing laws, operator reservations and conditions before your visit.
    </p>
    <div className="mt-8 grid gap-6 lg:grid-cols-3">{sections.map((item) => <article key={item.route} className="border-t-2 border-foreground pt-5">
      <p className="eyebrow text-primary">{item.label}</p>
      <h3 className="mt-2 font-display text-2xl">{item.data.label}</h3>
      <p className="mt-4 text-sm leading-7 text-muted-foreground">{item.data.summary}</p>
      <div className="mt-5 flex flex-wrap gap-4 text-sm font-semibold">
        <a href={"/fishing/lakes/" + slug + "/" + item.route} className="border-b border-primary pb-1 text-primary">Complete {item.route} guide →</a>
        <a href={item.data.href} target="_blank" rel="noopener noreferrer" className="border-b border-border pb-1">View the operator source →</a>
      </div>
    </article>)}</div>
  </section>;
}
