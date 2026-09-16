import { createLazyFileRoute } from '@tanstack/react-router';
import { useEffect, useMemo, useState } from 'react';

import { Container } from '@/components/layout/Container';

type BookingTarget = {
  provider?: string;
  affiliateUrl?: string | null;
  verified?: boolean;
};

type StayContext = {
  kind?: string;
  key?: string;
};

type StayProperty = {
  id?: string;
  name?: string;
  city?: string;
  status?: string;
  image?: { url?: string | null } | null;
  bookingTargets?: BookingTarget[];
  contexts?: StayContext[];
};

type StayRegistry = {
  reviewedAt?: string;
  properties?: StayProperty[];
};

type DashboardState = {
  venue: StayRegistry;
  destination: StayRegistry;
};

export const Route = createLazyFileRoute('/admin/stay-monetization')({ component: StayMonetizationReadinessPage });

function StayMonetizationReadinessPage() {
  const [data, setData] = useState<DashboardState | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;
    Promise.all([
      fetch('/stay-nearby-hotels.json', { cache: 'no-store' }).then(assertJson),
      fetch('/stay-nearby-destination-hotels.json', { cache: 'no-store' }).then(assertJson),
    ])
      .then(([venue, destination]) => {
        if (active) setData({ venue, destination });
      })
      .catch((cause) => {
        if (active) setError(cause instanceof Error ? cause.message : 'Stay monetization readiness could not be loaded.');
      });
    return () => { active = false; };
  }, []);

  const readiness = useMemo(() => data ? summarize(data) : null, [data]);

  return <Container className="py-12 sm:py-16">
    <main className="mx-auto max-w-6xl">
      <header className="border-b border-border pb-8">
        <p className="eyebrow text-primary">TexasDefined Operations</p>
        <h1 className="mt-3 font-display text-4xl sm:text-6xl">Stay monetization readiness</h1>
        <p className="mt-4 max-w-3xl text-sm leading-7 text-muted-foreground">A source-of-truth view of governed Stay Nearby coverage. This page reports registry readiness only; it does not invent traffic, booking, conversion or revenue performance.</p>
      </header>

      {error ? <section className="mt-8 border border-destructive/40 p-5"><strong>Readiness data unavailable</strong><p className="mt-2 text-sm text-muted-foreground">{error}</p></section> : null}
      {!readiness && !error ? <p className="mt-8 text-sm text-muted-foreground">Loading governed stay registries…</p> : null}

      {readiness ? <>
        <section className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Metric label="Curated contexts" value={String(readiness.totalContexts)} detail={`${readiness.venueContexts} venue · ${readiness.destinationContexts} destination`} />
          <Metric label="Active properties" value={String(readiness.activeProperties)} detail={`${readiness.destinationProperties} destination-cohort properties`} />
          <Metric label="Verified property links" value={String(readiness.verifiedAffiliateLinks)} detail="Only account-generated verified links count" />
          <Metric label="Property imagery ready" value={String(readiness.imageReady)} detail="Governed first-party image records only" />
        </section>

        <section className="mt-10 border-y border-border py-7">
          <p className="eyebrow text-primary">Controlled destination cohort</p>
          <h2 className="mt-2 font-display text-4xl">{readiness.destinationContexts} destinations · {readiness.destinationProperties} properties</h2>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-muted-foreground">Destination pages use contextual curated cards only where this registry has a reviewed relationship. Other eligible travel pages keep the generic Expedia/Hotels.com/Vrbo fallback rather than inheriting unsourced local recommendations.</p>
          <p className="mt-3 text-xs text-muted-foreground">Destination registry reviewed: {data?.destination.reviewedAt || 'not recorded'} · Venue registry reviewed: {data?.venue.reviewedAt || 'not recorded'}</p>
        </section>

        <section className="mt-10">
          <h2 className="font-display text-3xl">Destination coverage</h2>
          <div className="mt-5 divide-y divide-border border-y border-border">
            {readiness.destinationRows.map((row) => <article key={row.key} className="grid gap-3 py-5 md:grid-cols-[1fr_auto_auto] md:items-center">
              <div><strong>{row.key.replaceAll('-', ' ')}</strong><p className="mt-1 text-sm text-muted-foreground">{row.properties.join(' · ')}</p></div>
              <span className="text-sm font-semibold">{row.properties.length}/3 curated</span>
              <span className="text-xs text-muted-foreground">{row.verifiedLinks} verified deeplink{row.verifiedLinks === 1 ? '' : 's'}</span>
            </article>)}
          </div>
        </section>

        <section className="mt-10 grid gap-4 sm:grid-cols-3">
          <Metric label="Indexability gate" value="REQUIRED" detail="Self-canonical and not noindex before mount" />
          <Metric label="Editorial fallback" value="PRESERVED" detail="Visit Planner remains independent of affiliate eligibility" />
          <Metric label="Unverified deeplinks" value="BLOCKED" detail="Cards fall back to approved stay search" />
        </section>
      </> : null}
    </main>
  </Container>;
}

async function assertJson(response: Response): Promise<StayRegistry> {
  if (!response.ok) throw new Error(`${response.url} returned HTTP ${response.status}.`);
  return response.json() as Promise<StayRegistry>;
}

function summarize({ venue, destination }: DashboardState) {
  const venueProperties = (venue.properties || []).filter((property) => property.status === 'active');
  const destinationProperties = (destination.properties || []).filter((property) => property.status === 'active');
  const all = [...venueProperties, ...destinationProperties];
  const contextKeys = (properties: StayProperty[], kind: string) => new Set(properties.flatMap((property) => (property.contexts || []).filter((context) => context.kind === kind && context.key).map((context) => context.key as string)));
  const venueContextKeys = contextKeys(venueProperties, 'venue');
  const destinationContextKeys = contextKeys(destinationProperties, 'destination');
  const verifiedAffiliateLinks = all.reduce((total, property) => total + (property.bookingTargets || []).filter((target) => target.verified === true && typeof target.affiliateUrl === 'string' && target.affiliateUrl.startsWith('https://')).length, 0);
  const imageReady = all.filter((property) => typeof property.image?.url === 'string' && property.image.url.startsWith('/')).length;
  const destinationRows = [...destinationContextKeys].sort().map((key) => {
    const matching = destinationProperties.filter((property) => (property.contexts || []).some((context) => context.kind === 'destination' && context.key === key));
    return {
      key,
      properties: matching.map((property) => property.name || property.id || 'Unnamed property'),
      verifiedLinks: matching.reduce((total, property) => total + (property.bookingTargets || []).filter((target) => target.verified === true && typeof target.affiliateUrl === 'string' && target.affiliateUrl.startsWith('https://')).length, 0),
    };
  });
  return {
    venueContexts: venueContextKeys.size,
    destinationContexts: destinationContextKeys.size,
    totalContexts: venueContextKeys.size + destinationContextKeys.size,
    activeProperties: all.length,
    destinationProperties: destinationProperties.length,
    verifiedAffiliateLinks,
    imageReady,
    destinationRows,
  };
}

function Metric({ label, value, detail }: { label: string; value: string; detail: string }) {
  return <article className="border-t border-border pt-4"><p className="text-xs uppercase tracking-[0.14em] text-muted-foreground">{label}</p><p className="mt-2 font-display text-3xl">{value}</p><p className="mt-2 text-xs leading-5 text-muted-foreground">{detail}</p></article>;
}
