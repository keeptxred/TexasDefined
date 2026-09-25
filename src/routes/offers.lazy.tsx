import { createLazyFileRoute } from '@tanstack/react-router';
import { useEffect, useMemo, useState } from 'react';

import { Container } from '@/components/layout/Container';

type OfferRow = {
  id: string;
  title: string;
  description?: string | null;
  kind: string;
  category?: string | null;
  network: string;
  advertiser?: string | null;
  city?: string | null;
  venue?: string | null;
  start_date?: string | null;
  start_at?: string | null;
  offer_label?: string | null;
  promo_code?: string | null;
  affiliate_url?: string | null;
  source_url?: string | null;
  image_url?: string | null;
  commission_status: string;
  is_discount: boolean;
  is_editorial_only: boolean;
  last_verified_at: string;
};

type OffersResponse = {
  ok: boolean;
  generatedAt?: string;
  count?: number;
  results?: OfferRow[];
  error?: string;
};

export const Route = createLazyFileRoute('/offers')({ component: EventOffersPage });

function EventOffersPage() {
  const [query, setQuery] = useState('');
  const [network, setNetwork] = useState('all');
  const [commissionSafeOnly, setCommissionSafeOnly] = useState(false);
  const [discountsOnly, setDiscountsOnly] = useState(false);
  const [data, setData] = useState<OffersResponse | null>(null);
  const [loading, setLoading] = useState(true);

  const requestUrl = useMemo(() => {
    const params = new URLSearchParams({ limit: '120' });
    if (query.trim()) params.set('q', query.trim());
    if (network !== 'all') params.set('network', network);
    if (commissionSafeOnly) params.set('commissionSafeOnly', '1');
    if (discountsOnly) params.set('discountsOnly', '1');
    return `/api/texasdefined/event-offers?${params}`;
  }, [query, network, commissionSafeOnly, discountsOnly]);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    fetch(requestUrl, { headers: { accept: 'application/json' } })
      .then((response) => response.json() as Promise<OffersResponse>)
      .then((payload) => { if (!cancelled) setData(payload); })
      .catch((error: unknown) => {
        if (!cancelled) setData({ ok: false, error: error instanceof Error ? error.message : 'Offers could not be loaded.' });
      })
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, [requestUrl]);

  const rows = data?.results ?? [];
  const verified = data?.generatedAt ? new Date(data.generatedAt).toLocaleString() : null;

  return <Container className="py-12 sm:py-16">
    <main className="mx-auto max-w-7xl">
      <header className="border-b border-border pb-8">
        <p className="eyebrow text-primary">TexasDefined Offers</p>
        <h1 className="mt-2 font-display text-5xl sm:text-6xl">Texas event tickets, discounts and affiliate-safe offers</h1>
        <p className="mt-5 max-w-3xl text-lg leading-8 text-muted-foreground">Search live partner feeds for Texas events, attractions, promo codes and travel offers. The dashboard keeps presale and unknown-commission items separated from verified commission-safe offers.</p>
      </header>

      <section className="mt-8 grid gap-4 rounded-2xl border border-border bg-card p-5 shadow-sm lg:grid-cols-[1fr_auto_auto_auto] lg:items-end">
        <label className="grid gap-2 text-sm font-semibold">What are you searching for?
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="concerts, Houston, CityPASS, hotel, promo code..." className="min-h-11 rounded-xl border border-border bg-background px-3 font-normal" />
        </label>
        <label className="grid gap-2 text-sm font-semibold">Network
          <select value={network} onChange={(event) => setNetwork(event.target.value)} className="min-h-11 rounded-xl border border-border bg-background px-3 font-normal">
            <option value="all">All</option>
            <option value="Impact">Impact</option>
            <option value="CJ">CJ</option>
          </select>
        </label>
        <label className="flex min-h-11 items-center gap-2 rounded-xl border border-border px-3 text-sm font-semibold"><input type="checkbox" checked={commissionSafeOnly} onChange={(event) => setCommissionSafeOnly(event.target.checked)} /> Commission-safe only</label>
        <label className="flex min-h-11 items-center gap-2 rounded-xl border border-border px-3 text-sm font-semibold"><input type="checkbox" checked={discountsOnly} onChange={(event) => setDiscountsOnly(event.target.checked)} /> Discounts only</label>
      </section>

      <section className="mt-6 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
        <span>{loading ? 'Loading live offers…' : `${rows.length} offers/events shown`}</span>
        {verified ? <span>Generated {verified}</span> : null}
        <span>Ticketmaster first-24-hour primary onsales are treated as editorial-only unless commission safety is verified.</span>
      </section>

      {data?.error ? <p className="mt-6 rounded-xl border border-destructive/40 bg-destructive/5 p-4 text-sm font-semibold text-destructive">{data.error}</p> : null}

      <section className="mt-8 grid gap-5 lg:grid-cols-2">
        {rows.map((offer) => <article key={offer.id} className="flex gap-4 rounded-2xl border border-border bg-card p-5 shadow-sm">
          {offer.image_url ? <img src={offer.image_url} alt="" loading="lazy" className="hidden h-28 w-28 rounded-xl object-cover sm:block" /> : null}
          <div className="min-w-0 flex-1">
            <p className="eyebrow text-primary">{offer.network} · {offer.kind}{offer.city ? ` · ${offer.city}` : ''}</p>
            <h2 className="mt-2 font-display text-2xl leading-tight">{offer.title}</h2>
            {offer.description ? <p className="mt-2 line-clamp-3 text-sm leading-6 text-muted-foreground">{offer.description}</p> : null}
            <dl className="mt-4 grid gap-2 text-xs text-muted-foreground sm:grid-cols-2">
              {offer.advertiser ? <div><dt className="font-semibold text-foreground">Advertiser</dt><dd>{offer.advertiser}</dd></div> : null}
              {offer.venue ? <div><dt className="font-semibold text-foreground">Venue</dt><dd>{offer.venue}</dd></div> : null}
              {offer.start_date ? <div><dt className="font-semibold text-foreground">Date</dt><dd>{offer.start_date}</dd></div> : null}
              <div><dt className="font-semibold text-foreground">Commission status</dt><dd>{offer.commission_status}{offer.is_editorial_only ? ' · editorial only' : ''}</dd></div>
            </dl>
            <div className="mt-4 flex flex-wrap gap-2">
              {offer.promo_code ? <span className="rounded-full border border-border px-3 py-1 text-xs font-semibold">Code: {offer.promo_code}</span> : null}
              {offer.is_discount ? <span className="rounded-full border border-border px-3 py-1 text-xs font-semibold">Discount</span> : null}
              {offer.commission_status === 'preserved' ? <span className="rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">Commission-safe</span> : null}
            </div>
            <div className="mt-5 flex flex-wrap gap-3">
              {offer.affiliate_url && !offer.is_editorial_only ? <a href={offer.affiliate_url} target="_blank" rel="sponsored noopener noreferrer" className="rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground">Open offer</a> : null}
              {offer.source_url ? <a href={offer.source_url} target="_blank" rel="noopener noreferrer" className="rounded-full border border-border px-4 py-2 text-sm font-semibold">Source</a> : null}
            </div>
          </div>
        </article>)}
      </section>

      {!loading && !rows.length ? <p className="mt-8 rounded-xl border border-border p-5 text-sm text-muted-foreground">No matching live offers yet. The scheduled ingestion runs every six hours after deployment and will add rows as partner feeds return matching data.</p> : null}
    </main>
  </Container>;
}
