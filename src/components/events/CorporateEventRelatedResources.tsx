const resources = [
  {
    href: '/events',
    title: 'Texas events and seasonal calendars',
    description: 'Pair the group outing with a scheduled festival, concert or seasonal event. Verify dates and ticket rules with the organizer.',
  },
  {
    href: '/sports-venues',
    title: 'Texas sports venues and stadiums',
    description: 'Compare the sports venue and destination options if a game day or stadium-area gathering is part of the trip.',
  },
  {
    href: '/explore',
    title: 'Texas attractions, trips and destinations',
    description: 'Find complementary museums, experiences and visitor stops if teammates are traveling in from other cities.',
  },
] as const;

export function CorporateEventRelatedResources() {
  return <section id="corporate-event-related-planning" className="border-t border-border bg-background" aria-labelledby="corporate-event-related-title">
    <div className="mx-auto max-w-[1200px] px-5 py-12 sm:px-7 sm:py-16">
      <p className="eyebrow text-primary">Beyond the event venue</p>
      <h2 id="corporate-event-related-title" className="mt-2 font-display text-3xl sm:text-4xl">Build a complete company outing</h2>
      <p className="mt-4 max-w-3xl text-sm leading-7 text-muted-foreground">Hosting colleagues from out of town? Add a destination or public event to your schedule after you confirm the private group reservation. External attractions and event ticketing are separate from a corporate venue quote.</p>
      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {resources.map((item) => <a key={item.href} href={item.href}
          className="flex flex-col justify-between border border-border bg-surface p-5 transition-colors hover:border-primary">
          <div>
            <h3 className="font-display text-2xl">{item.title}</h3>
            <p className="mt-3 text-sm leading-7 text-muted-foreground">{item.description}</p>
          </div>
          <span className="mt-6 text-sm font-semibold text-primary">Browse TexasDefined guide →</span>
        </a>)}
      </div>
    </div>
  </section>;
}
