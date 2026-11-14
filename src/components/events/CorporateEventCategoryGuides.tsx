import { corporateEventCategories, corporateEventProviders, type GroupEventCategory } from '@/data/corporate-events';

/**
 * Category education stays on the canonical index rather than manufacturing
 * near-duplicate SEO landing pages. Example venues inherit the verified
 * directory record and link to its official source.
 */
const planningGuidance: Record<GroupEventCategory, {
  introduction: string;
  questions: readonly [string, string, string];
  fortyFive: string;
}> = {
  'team-building': {
    introduction: 'The best team-building format depends on whether everyone participates together or small teams rotate through challenges. A hosted activity and a free-play venue are different products.',
    questions: [
      'How many people can participate at the same time, and how many sessions will a larger team need?',
      'Does the quote include a facilitator, equipment, setup time, private use and any required waivers?',
      'What is the backup plan for absences, mobility needs or a last-minute change in team size?',
    ],
    fortyFive: 'For 45 guests, request a written rotation schedule if the activity is designed for smaller squads.',
  },
  'company-parties': {
    introduction: 'Compare food, conversation space and activities separately. A venue that can welcome a large crowd may have fewer seats for a private dinner, stage or awards presentation.',
    questions: [
      'Is the published limit for your reserved room, the entire property or a combined indoor-outdoor space?',
      'Are catering minimums, service charges, staffing, security and gratuity included?',
      'What are the music, alcohol, cleanup, cancellation and weather policies?',
    ],
    fortyFive: 'For 45 guests, confirm seated capacity, standing capacity and whether nonparticipants have a comfortable place to gather.',
  },
  'private-dining': {
    introduction: 'A private restaurant room, a catered event venue and a hands-on cooking class meet different goals. Published menu prices rarely establish a full corporate group cost.',
    questions: [
      'Is the room exclusive, and is the limit based on seated dining rather than standing reception?',
      'What are the food-and-beverage minimum, tax, service fee, deposit and final-headcount deadline?',
      'How does the venue accommodate dietary restrictions, accessibility needs and menu substitutions?',
    ],
    fortyFive: 'For 45 guests, request a seating diagram and the all-in minimum spend rather than comparing menu prices alone.',
  },
  meetings: {
    introduction: 'Start with the working session: seating layout, audio and reliable presentation equipment. An attractive event space is not automatically an effective meeting room.',
    questions: [
      'Is the capacity based on classroom, boardroom, theater or banquet seating?',
      'Are microphones, screens, Wi-Fi, power, breakout rooms and onsite technical support included?',
      'What are the room access times, catering rules, parking arrangements and lodging requirements?',
    ],
    fortyFive: 'For 45 guests, ask for a room diagram in the exact layout you need, plus an itemized AV estimate.',
  },
  'outdoor-adventure': {
    introduction: 'Outdoor challenges can work well for company groups, but safety, weather and individual participation options should be decided before deposits are paid.',
    questions: [
      'Are the activities staffed, and what safety equipment, waivers and age or physical restrictions apply?',
      'What is the rain, heat, lightning or high-wind plan, including cancellation fees?',
      'Can nonparticipants take part in a suitable alternative without leaving the company event?',
    ],
    fortyFive: 'For 45 guests, verify the instructor-to-participant ratio and whether sessions must run in waves.',
  },
  'client-entertainment': {
    introduction: 'Client hospitality needs flexible conversation time and clear expectations. Distinguish admission to an attraction from a reserved corporate hosting package.',
    questions: [
      'Which parts of the experience are genuinely private and which remain shared with the public?',
      'Are catering, invitations, signage, parking, accessibility and client-facing staff included?',
      'What is the cancellation deadline and what guest data, if any, does the venue actually require?',
    ],
    fortyFive: 'For 45 guests, check whether the venue can comfortably support a reception before or after the main activity.',
  },
};

export function CorporateEventCategoryGuides() {
  return <section id="corporate-event-types" aria-labelledby="corporate-event-types-title" className="border-t border-border bg-background">
    <div className="mx-auto max-w-[1200px] px-5 py-12 sm:px-7 sm:py-16">
      <p className="eyebrow text-primary">Choose the right format</p>
      <h2 id="corporate-event-types-title" className="mt-2 font-display text-4xl">A practical guide to corporate event types</h2>
      <p className="mt-4 max-w-4xl text-sm leading-7 text-muted-foreground">
        These planning checklists are editorial guidance, not venue guarantees. All examples come from the source-linked directory above; prices, group capacity, accessibility and available dates still require a direct quote.
      </p>
      <nav aria-label="Jump to event type" className="mt-6 flex flex-wrap gap-2">
        {corporateEventCategories.map(({ value, label }) => <a key={value} href={'#corporate-type-' + value} className="inline-flex min-h-11 items-center border border-border px-3 py-2 text-sm font-semibold hover:border-primary">{label}</a>)}
      </nav>
      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        {corporateEventCategories.map(({ value, label }) => {
          const guide = planningGuidance[value];
          const venues = corporateEventProviders.filter((provider) => provider.categories.includes(value));
          const examplesFor45 = venues.filter((provider) =>
            (provider.minGroup == null || provider.minGroup <= 45) &&
            (provider.maxGroup == null || provider.maxGroup >= 45));
          return <article key={value} id={'corporate-type-' + value} className="scroll-mt-28 border border-border bg-surface p-5 sm:p-7">
            <h3 className="font-display text-2xl sm:text-3xl">{label}</h3>
            <p className="mt-3 text-sm leading-7 text-muted-foreground">{guide.introduction}</p>
            <p className="mt-4 text-sm font-semibold">Planning for a 45-person group: <span className="font-normal text-muted-foreground">{guide.fortyFive}</span></p>
            <h4 className="mt-5 border-t border-border pt-5 text-base font-semibold">Ask before you commit</h4>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-6 text-muted-foreground">
              {guide.questions.map((question) => <li key={question}>{question}</li>)}
            </ul>
            <h4 className="mt-6 text-base font-semibold">Directory examples to research</h4>
            <p className="mt-1 text-xs leading-6 text-muted-foreground">{venues.length} source-listed venues tagged for this event type statewide. The examples below pass a published-capacity screen for 45 only when the venue has reported limits; unknown limits require confirmation. This is not date availability.</p>
            <ul className="mt-3 space-y-2">
              {examplesFor45.slice(0, 3).map((provider) => <li key={provider.slug} className="text-sm">
                <a href={provider.officialUrl} target="_blank" rel="noopener noreferrer" className="font-semibold underline underline-offset-2 hover:text-primary">{provider.name} ↗</a>
                <span className="text-muted-foreground"> · {provider.city} · {provider.maxGroup == null ? 'Group capacity unverified' : 'Published limit ' + provider.maxGroup}</span>
              </li>)}
            </ul>
            <a href={'/corporate-events?city=Texas&guests=45&type=' + value} className="mt-5 inline-flex min-h-11 items-center border border-primary px-4 text-sm font-semibold text-primary">
              Compare Texas {label.toLowerCase()} options →
            </a>
          </article>;
        })}
      </div>
      <p className="mt-8 text-sm leading-7 text-muted-foreground">
        For location-specific tradeoffs, use the <a className="font-semibold underline underline-offset-2" href="#texas-corporate-event-city-guides">Texas metro planning guides</a>, or compare overnight needs with the <a className="font-semibold underline underline-offset-2" href="/explore/trip-planner">Texas trip planner</a>.
      </p>
    </div>
  </section>;
}
