import { ExpediaStaySearch } from '@/components/affiliate/ExpediaStaySearch';
import { TexasExplainedContextLinks } from '@/components/editorial/TexasExplainedContextLinks';
import { SportsTrafficTracker } from '@/components/sports/SportsTrafficTracker';

type SportsVenueQuickAnswersProps = {
  venueName: string;
  canonicalUrl: string;
  city?: string;
  countyName?: string;
  capacity?: string;
  primaryEvents?: readonly string[];
  parking?: string;
  arrival?: string;
  verifiedAt?: string;
};

type QuickAnswer = {
  question: string;
  answer: string;
};

export function SportsVenueQuickAnswers({
  venueName,
  canonicalUrl,
  city,
  countyName,
  capacity,
  primaryEvents = [],
  parking,
  arrival,
  verifiedAt,
}: SportsVenueQuickAnswersProps) {
  const answers = buildAnswers({ venueName, city, countyName, capacity, primaryEvents, parking, arrival, verifiedAt });
  const slug = canonicalUrl.split('/sports-venue/')[1]?.split(/[?#]/)[0];
  const surfacePath = slug ? `/sports-venue/${slug}` : undefined;
  const heroSrc = slug ? `/api/sports-venue-hero?slug=${encodeURIComponent(slug)}` : undefined;
  const absoluteHeroUrl = heroSrc ? new URL(heroSrc, canonicalUrl).toString() : undefined;
  if (!answers.length) return null;

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    '@id': `${canonicalUrl}#quick-answers`,
    mainEntity: answers.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer },
    })),
  };
  const imageJsonLd = absoluteHeroUrl ? {
    '@context': 'https://schema.org',
    '@type': 'ImageObject',
    '@id': `${canonicalUrl}#venue-hero`,
    contentUrl: absoluteHeroUrl,
    url: absoluteHeroUrl,
    caption: `${venueName} — original TexasDefined sports venue illustration`,
    width: 1600,
    height: 900,
    representativeOfPage: true,
    isPartOf: { '@id': canonicalUrl },
  } : undefined;

  return <>
    {surfacePath ? <SportsTrafficTracker surfacePath={surfacePath} /> : null}
    {heroSrc ? <figure className="border-b border-border py-8 sm:py-10">
      {imageJsonLd ? <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(imageJsonLd) }} /> : null}
      <div className="overflow-hidden border border-border bg-muted/30">
        <img
          src={heroSrc}
          alt={`${venueName} — original TexasDefined sports venue illustration`}
          width={1600}
          height={900}
          loading="eager"
          decoding="async"
          fetchPriority="high"
          className="aspect-[16/9] w-full object-cover"
        />
      </div>
      <figcaption className="mt-3 text-xs leading-5 text-muted-foreground">Original TexasDefined editorial illustration. Venue logos, sponsor marks and third-party photography are intentionally not reproduced.</figcaption>
    </figure> : null}

    <section className="grid gap-8 border-b border-border py-10 lg:grid-cols-[15rem_1fr]" aria-labelledby="venue-quick-answers-heading">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <div>
        <p className="eyebrow text-primary">Quick answers</p>
        <h2 id="venue-quick-answers-heading" className="mt-2 font-display text-3xl leading-tight">Planning a visit to {venueName}</h2>
        <p className="mt-3 text-sm leading-6 text-muted-foreground">Answer-first trip details from the verified venue record. Use the official links farther down the guide for information that can change by event.</p>
      </div>
      <div className="grid gap-x-8 md:grid-cols-2">
        {answers.map((item) => <article key={item.question} className="border-t border-border py-5">
          <h3 className="font-display text-2xl leading-tight">{item.question}</h3>
          <p className="mt-3 text-sm leading-7 text-muted-foreground">{item.answer}</p>
        </article>)}
      </div>
    </section>

    <ExpediaStaySearch
      id={slug ? `expedia-${slug}-stays` : 'expedia-sports-venue-stays'}
      compact
      locationLabel={city ?? countyName ?? venueName}
      title={`Find a place to stay near ${venueName}`}
      description={`Compare current hotel and lodging options when a game, tournament, golf trip or event at ${venueName} turns into an overnight visit.`}
    />

    <TexasExplainedContextLinks surface="sports" />
  </>;
}

function buildAnswers({ venueName, city, countyName, capacity, primaryEvents = [], parking, arrival, verifiedAt }: Omit<SportsVenueQuickAnswersProps, 'canonicalUrl'>): QuickAnswer[] {
  const answers: QuickAnswer[] = [];
  const location = [city, countyName].filter(Boolean).join(', ');

  if (location) {
    answers.push({
      question: `Where is ${venueName}?`,
      answer: `${venueName} is in ${location}, Texas. The venue guide below includes access context and an external maps link for trip planning.`,
    });
  }

  if (primaryEvents.length) {
    answers.push({
      question: `What sports or events take place at ${venueName}?`,
      answer: `The verified venue profile currently highlights ${formatList(primaryEvents.slice(0, 3))}. Event calendars change, so confirm the date and event on the official venue or organizer site before traveling.`,
    });
  }

  if (capacity) {
    answers.push({
      question: `What is the capacity of ${venueName}?`,
      answer: `The verified venue record lists a capacity of ${capacity}. Configurations can vary for concerts, tournaments and other special events.`,
    });
  }

  if (parking) {
    answers.push({
      question: `What should I know about parking at ${venueName}?`,
      answer: `${firstSentence(parking)} Use the official venue or event instructions linked in this guide for the current parking map, pass requirements and event-specific changes.`,
    });
  } else {
    answers.push({
      question: `Where should I check parking information for ${venueName}?`,
      answer: `Use the official planning links in this guide for the current event-day parking map, pass requirements and access instructions.`,
    });
  }

  if (arrival) {
    answers.push({
      question: `When should I arrive at ${venueName}?`,
      answer: `${firstSentence(arrival)} Confirm gate times and event-specific entry instructions with the official venue or organizer before traveling.`,
    });
  }

  if (verifiedAt) {
    answers.push({
      question: `How current is this ${venueName} visitor guide?`,
      answer: `TexasDefined reviewed the venue-specific source record on ${formatDate(verifiedAt)}. Because schedules and event-day rules can change after review, the guide points travelers back to official sources for final confirmation.`,
    });
  }

  return answers.slice(0, 6);
}

function firstSentence(value: string) {
  const match = value.trim().match(/^.*?[.!?](?:\s|$)/);
  return (match?.[0] ?? value.trim()).trim();
}

function formatList(items: readonly string[]) {
  if (!items.length) return 'the events listed in the guide';
  if (items.length === 1) return items[0];
  if (items.length === 2) return `${items[0]} and ${items[1]}`;
  return `${items.slice(0, -1).join(', ')}, and ${items.at(-1)}`;
}

function formatDate(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat('en-US', { month: 'long', day: 'numeric', year: 'numeric', timeZone: 'UTC' }).format(date);
}
