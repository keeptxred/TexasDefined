import { useEffect, useMemo, useState } from 'react';
import { ArrowUpRight, Copy } from 'lucide-react';
import { corporateEventProviders } from '@/data/corporate-events';
import { getPublicCorporateEventOffers } from '@/data/corporate-events-offers.functions';

type PublicOffer = {
  providerSlug: string;
  title: string;
  benefit: string;
  code: string | null;
  redemptionUrl: string;
  endsOn: string;
};

/** Explicitly commercial, optional content. No placeholder deals or codes. */
export function ApprovedCorporateEventOffers() {
  const [offers, setOffers] = useState<PublicOffer[]>([]);
  const [copyStatus, setCopyStatus] = useState('');

  useEffect(() => {
    let mounted = true;
    // Fail closed: missing verification or network outages mean no public promotions.
    getPublicCorporateEventOffers()
      .then((verified) => { if (mounted) setOffers(verified); })
      .catch(() => { if (mounted) setOffers([]); });
    return () => { mounted = false; };
  }, []);

  const sourceDirectory = useMemo(
    () => new Map(corporateEventProviders.map((provider) => [provider.slug, provider])),
    [],
  );
  if (!offers.length) return null;

  async function copyCode(code: string) {
    try {
      await navigator.clipboard.writeText(code);
      setCopyStatus('Offer code copied. Confirm terms and eligibility with the business.');
    } catch {
      setCopyStatus('Copy unavailable. You can select the code displayed in the offer.');
    }
  }

  return <section id="corporate-event-offers" aria-label="Approved corporate event partner offers" className="border-y border-border bg-surface">
    <div className="mx-auto max-w-[1200px] px-5 py-12 sm:px-7">
      <p className="eyebrow text-primary">Clearly labeled commercial partnerships</p>
      <h2 className="mt-2 font-display text-3xl sm:text-4xl">Current company-group offers</h2>
      <p className="mt-3 max-w-3xl text-sm leading-7 text-muted-foreground">These offers come from reviewed TexasDefined venue partners and may contain negotiated commercial terms. They do not affect independent directory selection or order. Check dates, group minimums, prices, and restrictions with each partner before committing.</p>
      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {offers.map((offer) => {
          const provider = sourceDirectory.get(offer.providerSlug);
          if (!provider) return null;
          return <article key={offer.providerSlug + ':' + offer.title} className="border border-border bg-background p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.1em] text-primary">TexasDefined partner offer · Commercial</p>
            <h3 className="mt-2 font-display text-2xl">{offer.title}</h3>
            <p className="mt-1 text-sm font-semibold">{provider.name} · {provider.city}</p>
            <p className="mt-3 text-sm leading-7 text-muted-foreground">{offer.benefit}</p>
            <p className="mt-3 text-xs text-muted-foreground">Offer valid through {offer.endsOn}; restrictions and availability apply.</p>
            {offer.code ? <div className="mt-4 flex flex-wrap items-center gap-3">
              <code className="border border-border bg-surface px-3 py-2 text-sm">{offer.code}</code>
              <button type="button" className="inline-flex min-h-10 items-center gap-2 border border-border px-3 text-sm" onClick={() => void copyCode(offer.code!)}>
                <Copy className="size-4" aria-hidden /> Copy code
              </button>
            </div> : null}
            <a href={offer.redemptionUrl} target="_blank" rel="sponsored nofollow noopener noreferrer"
              className="mt-5 inline-flex min-h-11 items-center gap-2 bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground">
              Review offer with partner <ArrowUpRight className="size-4" aria-hidden />
            </a>
          </article>;
        })}
      </div>
      {copyStatus ? <p role="status" className="mt-4 text-sm">{copyStatus}</p> : null}
    </div>
  </section>;
}
