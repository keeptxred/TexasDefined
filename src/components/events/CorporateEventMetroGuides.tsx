import { corporateEventProviders } from '@/data/corporate-events';

const cityGuides = [
  { key: 'Houston', slug: 'houston', city: 'Houston',
    title: 'Houston corporate events & team building',
    intro: 'From immersive indoor games to chef-led experiences, Houston offers company activities for small teams and large private gatherings. Check whether capacity means one private room or several coordinated groups.',
    tip: 'Ask about parking, peak-hour travel between neighborhoods, rain plans, and whether a facilitator is included.' },
  { key: 'Dallas/Fort Worth', slug: 'dallas-fort-worth', city: 'Dallas/Fort Worth',
    title: 'Dallas–Fort Worth company outings',
    intro: 'Compare North Texas activity venues, indoor entertainment, food experiences and meeting locations. The Dallas–Fort Worth area spans multiple cities, so confirm the address before booking transportation.',
    tip: 'For regional teams, request travel-time estimates, accessible parking and a precise start time for each hosted activity.' },
  { key: 'Austin', slug: 'austin', city: 'Austin',
    title: 'Austin group experiences & company retreats',
    intro: 'Explore Austin activities for team competitions, casual socials and off-site celebrations. Mix practical meeting time with a hosted activity rather than assuming every venue has a presentation space.',
    tip: 'Confirm event minimums, weather alternatives for outdoor activities and audiovisual options if work sessions are required.' },
  { key: 'San Antonio', slug: 'san-antonio', city: 'San Antonio',
    title: 'San Antonio corporate group activities',
    intro: 'Browse group-friendly San Antonio options for business celebrations, client entertainment and collaborative team days. Private-event formats may need coordinated slots for larger groups.',
    tip: 'Request written details on group transportation, dietary needs, activity duration and any exclusivity or private-event fee.' },
  { key: 'El Paso', slug: 'el-paso', city: 'El Paso',
    title: 'El Paso team outings & corporate events',
    intro: 'Book golf experiences, escape-room teamwork or facilitated challenges in the Sun City. Verify whether a posted capacity describes one private event room or simultaneous team rotations.',
    tip: 'For a company of 45, request a complete package quote and confirm travel, indoor climate control and group timing.' },
  { key: 'Corpus Christi', slug: 'corpus-christi', city: 'Corpus Christi',
    title: 'Corpus Christi waterfront company events',
    intro: 'Compare aquarium receptions, museum spaces and a historic aircraft carrier for a Gulf Coast company off-site. Some large published capacities apply only to specific rooms or full-venue events.',
    tip: 'Confirm weather exposure, accessible routes, catering rules and overnight hotel coordination.' },
  { key: 'Galveston', slug: 'galveston', city: 'Galveston',
    title: 'Galveston company gatherings & retreats',
    intro: 'Find island-area corporate meeting space, boardwalk celebrations and after-hours historic museum receptions. Published group sizes can differ substantially between individual rooms and venue-wide buyouts.',
    tip: 'Verify event days, coastal weather backup options, off-site transit and minimum lodging or catering spends.' },
  { key: 'Waco', slug: 'waco', city: 'Waco',
    title: 'Waco creative team-building & company days',
    intro: 'Choose organized mobile team challenges, hands-on painting sessions or a custom activity. Some venues serve larger groups by splitting participants across consecutive activity sessions.',
    tip: 'Ask exactly how 45 attendees will rotate between activities and whether the package includes facilitation and setup.' },
  { key: 'Lubbock', slug: 'lubbock', city: 'Lubbock',
    title: 'Lubbock group activities & corporate socials',
    intro: 'Explore facilitated park activities, outdoor paintball and escape-room challenges. Compare indoor-outdoor options and confirm how many participants can participate at once.',
    tip: 'For group sports, ask about equipment, safety requirements, waivers, weather alternatives and minimum deposits.' },
] as const;

export function CorporateEventMetroGuides() {
  return <section id="texas-corporate-event-city-guides" aria-labelledby="texas-city-guides-title" className="border-t border-border bg-surface">
    <div className="mx-auto max-w-[1200px] px-5 py-12 sm:px-7 sm:py-16">
      <p className="eyebrow text-primary">Plan by Texas metro</p>
      <h2 id="texas-city-guides-title" className="mt-2 font-display text-4xl">Corporate events in Texas cities</h2>
      <p className="mt-4 max-w-4xl text-sm leading-7 text-muted-foreground">
        These independent city guides summarize the source-curated directory. Each venue's published capacity is different from live availability; company packages, reservations, pricing and any event services must be confirmed directly.
      </p>
      <nav className="mt-6 flex flex-wrap gap-2" aria-label="Jump to corporate event cities">
        {cityGuides.map((city) => <a key={city.slug} href={'#corporate-events-' + city.slug}
          className="inline-flex min-h-11 items-center border border-border bg-background px-4 text-sm font-semibold hover:border-primary">
          {city.city}
        </a>)}
      </nav>
      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        {cityGuides.map((guide) => {
          const venues = corporateEventProviders.filter((provider) =>
            provider.city === guide.key || provider.metro === guide.key);
          const recommendedCategory = guide.slug === 'corpus-christi' || guide.slug === 'galveston' ? 'company-parties' : 'team-building';
          const link = '/corporate-events?city=' + encodeURIComponent(guide.city) + '&guests=45&type=' + recommendedCategory;
          return <article key={guide.slug} id={'corporate-events-' + guide.slug}
            className="scroll-mt-28 border border-border bg-background p-5 sm:p-7">
            <h3 className="font-display text-2xl sm:text-3xl">{guide.title}</h3>
            <p className="mt-3 text-sm leading-7 text-muted-foreground">{guide.intro}</p>
            <p className="mt-4 text-sm font-semibold">Planning tip: <span className="font-normal text-muted-foreground">{guide.tip}</span></p>
            <h4 className="mt-6 border-t border-border pt-5 text-base font-semibold">{venues.length} currently sourced area venues</h4>
            <ul className="mt-3 space-y-3">
              {venues.slice(0, 5).map((provider) => <li key={provider.slug} className="border-l-2 border-border pl-3 text-sm">
                <a className="font-semibold underline underline-offset-2 hover:text-primary" href={provider.officialUrl} target="_blank" rel="noopener noreferrer">{provider.name} ↗</a>
                <p className="mt-1 text-xs leading-5 text-muted-foreground">{provider.area} · {provider.format} · {provider.maxGroup == null ? 'Capacity requires a quote' : 'Published group cap ' + provider.maxGroup}</p>
              </li>)}
            </ul>
            <p className="mt-4 text-xs leading-6 text-muted-foreground">Source websites open directly; no partner discount, guaranteed rate, or booking is implied. The finder includes additional venues and filter options.</p>
            <a href={link} className="mt-5 inline-flex min-h-11 items-center border border-primary px-4 text-sm font-semibold text-primary">
              Compare {guide.city} options for 45 guests →
            </a>
          </article>;
        })}
      </div>
      <div className="mt-10 max-w-4xl border-t border-border pt-8">
        <h3 className="font-display text-3xl">How to get an accurate company-event quote</h3>
        <ol className="mt-4 list-decimal space-y-3 pl-6 text-sm leading-7 text-muted-foreground">
          <li>Confirm the number of guests, accessibility requirements and a realistic backup date.</li>
          <li>Ask whether the advertised capacity applies to one room, multiple teams or the entire property.</li>
          <li>Request a written, itemized quote with group minimums, taxes, service charges and cancellation terms.</li>
          <li>Compare at least two formats that meet the team's budget, travel needs and desired energy level.</li>
          <li>Only treat a reservation as confirmed when the provider supplies its own confirmation.</li>
        </ol>
      </div>
    </div>
  </section>;
}
