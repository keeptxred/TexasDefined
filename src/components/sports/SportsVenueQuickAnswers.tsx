import { lazy, Suspense } from 'react';
import { ParkingMapPanel } from '@/components/parking/ParkingMapPanel';
import { SportsTrafficTracker } from '@/components/sports/SportsTrafficTracker';
import { getParkingMapForVenueSlug } from '@/data/parking-maps';
import { getSportsVenuePhoto } from '@/data/sports-venue-images';

const CityPassContextualCallout = lazy(() =>
  import('@/components/monetization/CityPassContextualCallout').then((module) => ({
    default: module.CityPassContextualCallout,
  })),
);

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

type QuickAnswerInput = Omit<SportsVenueQuickAnswersProps, 'canonicalUrl' | 'verifiedAt'>;

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
  const answers = buildAnswers({ venueName, city, countyName, capacity, primaryEvents, parking, arrival });
  const slug = canonicalUrl.split('/sports-venue/')[1]?.split(/[?#]/)[0];
  const surfacePath = slug ? `/sports-venue/${slug}` : undefined;
  const parkingMap = getParkingMapForVenueSlug(slug);
  const heroSrc = slug ? `/api/sports-venue-hero?slug=${encodeURIComponent(slug)}` : undefined;
  const absoluteHeroUrl = heroSrc ? new URL(heroSrc, canonicalUrl).toString() : undefined;
  const photo = slug ? getSportsVenuePhoto(slug) : undefined;
  const heroAlt = photo?.alt ?? `${venueName} — original TexasDefined sports venue illustration`;
  const heroWidth = photo?.width ?? 1600;
  const heroHeight = photo?.height ?? 900;
  const freshnessNote = verifiedAt
    ? `Source review: core venue facts were last reviewed ${verifiedAt}. Event-day policies can change, so use the official links farther down the guide for current rules.`
    : `Event-day policies can change, so use the official links farther down the guide for current rules.`;
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
    caption: photo ? `${venueName} — photo by ${photo.author}, ${photo.licenseName}` : `${venueName} — original TexasDefined sports venue illustration`,
    width: heroWidth,
    height: heroHeight,
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
          alt={heroAlt}
          width={heroWidth}
          height={heroHeight}
          loading="eager"
          decoding="async"
          fetchPriority="high"
          className="aspect-[16/9] w-full object-cover"
        />
      </div>
      {photo ? <figcaption className="mt-3 text-xs leading-5 text-muted-foreground">
        Photo by <a className="underline underline-offset-2 hover:text-foreground" href={photo.sourcePage} target="_blank" rel="noreferrer">{photo.author}</a> via {photo.sourceName}, licensed under <a className="underline underline-offset-2 hover:text-foreground" href={photo.licenseUrl} target="_blank" rel="noreferrer">{photo.licenseName}</a>. Original source file is served unchanged and may be visually cropped by the page layout.
      </figcaption> : <figcaption className="mt-3 text-xs leading-5 text-muted-foreground">Original TexasDefined editorial illustration. Venue logos, sponsor marks and third-party photography are intentionally not reproduced.</figcaption>}
    </figure> : null}

    <section className="grid gap-8 border-b border-border py-10 lg:grid-cols-[15rem_1fr]" aria-labelledby="venue-quick-answers-heading">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <div>
        <p className="eyebrow text-primary">Quick answers</p>
        <h2 id="venue-quick-answers-heading" className="mt-2 font-display text-3xl leading-tight">Planning a visit to {venueName}</h2>
        <p className="mt-3 text-sm leading-6 text-muted-foreground">Answer-first trip details from the verified venue record. Use the official links farther down the guide for information that can change by event.</p>
        <p className="mt-3 text-xs leading-5 text-muted-foreground">{freshnessNote}</p>
      </div>
      <div className="grid gap-x-8 md:grid-cols-2">
        {answers.map((item) => <article key={item.question} className="border-t border-border py-5">
          <h3 className="font-display text-2xl leading-tight">{item.question}</h3>
          <p className="mt-3 text-sm leading-7 text-muted-foreground">{item.answer}</p>
        </article>)}
      </div>
    </section>

    <ParkingMapPanel map={parkingMap} contextName={venueName} />

    {slug ? <Suspense fallback={null}><CityPassContextualCallout surface="sports-venue" slug={slug} /></Suspense> : null}
  </>;
}

function buildAnswers({ venueName, city, countyName, capacity, primaryEvents = [], parking, arrival }: QuickAnswerInput): QuickAnswer[] {
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

  return answers.slice(0, 5);
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
