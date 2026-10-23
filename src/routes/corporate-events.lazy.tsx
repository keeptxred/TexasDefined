import { createLazyFileRoute } from '@tanstack/react-router';
import { useMemo, useState, type FormEvent } from 'react';
import { ArrowUpRight, Check, ClipboardList, Copy, Filter, MapPin, Printer, Search, Users, X } from 'lucide-react';

import { Container } from '@/components/layout/Container';
import { corporateEventCategories, corporateEventProviders, type GroupEventCategory, type CorporateEventProvider } from '@/data/corporate-events';
import { submitGroupEventRequest } from '@/data/corporate-events.functions';
import { GroupEventPartnerApplication } from '@/components/events/GroupEventPartnerApplication';
import { ApprovedCorporateEventOffers } from '@/components/events/ApprovedCorporateEventOffers';

const categoryLabel = (id: GroupEventCategory) => corporateEventCategories.find((item) => item.value === id)?.label ?? id;
const dollars = (value: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(value);

export const Route = createLazyFileRoute('/corporate-events')({ component: CorporateEventsPage });

const controlClass = 'min-h-11 w-full rounded-sm border border-border bg-background px-3 py-2 text-sm text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary';
const categories = corporateEventCategories;

function ProviderCard({ provider, selected, onToggle }: { provider: CorporateEventProvider; selected: boolean; onToggle: () => void }) {
  return (
    <article className="flex h-full flex-col justify-between border border-border bg-background p-5 shadow-sm sm:p-6">
      <div>
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="eyebrow text-primary">{provider.format}</p>
            <h3 className="mt-2 font-display text-2xl font-semibold leading-tight">{provider.name}</h3>
            <p className="mt-2 flex items-center gap-1.5 text-sm text-muted-foreground"><MapPin className="size-4 shrink-0" aria-hidden />{provider.area}, {provider.city}</p>
          </div>
          <span className="border border-border bg-surface px-2 py-1 text-[11px] font-semibold text-muted-foreground">Official source</span>
        </div>
        <p className="mt-4 text-sm leading-7 text-muted-foreground">{provider.description}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {provider.categories.map((category) => <span key={category} className="border border-border px-2 py-1 text-xs">{categoryLabel(category)}</span>)}
        </div>
        <dl className="mt-5 grid grid-cols-2 gap-4 border-t border-border pt-4 text-sm">
          <div><dt className="text-xs text-muted-foreground">Published group capacity</dt><dd className="mt-1 font-semibold">{provider.maxGroup == null ? 'Confirm with venue' : 'Up to ' + provider.maxGroup + (provider.maxGroup === 300 ? '+' : '')}</dd></div>
          <div><dt className="text-xs text-muted-foreground">Starting price</dt><dd className="mt-1 font-semibold">{provider.startingPricePerPerson == null ? 'Request a quote' : 'From ' + dollars(provider.startingPricePerPerson) + ' / person'}</dd></div>
        </dl>
        <p className="mt-3 text-xs leading-5 text-muted-foreground">{provider.capacityDetail}</p>
        {provider.ageLimit ? <p className="mt-2 text-xs font-semibold text-foreground">Age requirement: {provider.ageLimit}</p> : null}
      </div>
      <div className="mt-6 grid grid-cols-2 gap-2 border-t border-border pt-4">
        <button type="button" onClick={onToggle} aria-pressed={selected}
          className={'inline-flex min-h-11 items-center justify-center gap-1.5 px-3 text-sm font-semibold ' + (selected ? 'bg-foreground text-background' : 'border border-primary text-primary')}>
          {selected ? <Check className="size-4" aria-hidden /> : <ClipboardList className="size-4" aria-hidden />}{selected ? 'Shortlisted' : 'Compare'}
        </button>
        <a href={provider.officialUrl} target="_blank" rel="noopener noreferrer"
          className="inline-flex min-h-11 items-center justify-center gap-1.5 border border-border px-3 text-center text-sm font-semibold hover:border-primary">
          Venue website <ArrowUpRight className="size-4" aria-hidden />
        </a>
      </div>
      <p className="mt-3 text-[11px] text-muted-foreground">Source reviewed {provider.verifiedOn}. Capacity is not live availability. No TD partnership or discount is implied.</p>
    </article>
  );
}

function CorporateEventsPage() {
  const [city, setCity] = useState('Houston');
  const [headcount, setHeadcount] = useState(45);
  const [category, setCategory] = useState<GroupEventCategory>('team-building');
  const [budget, setBudget] = useState('');
  const [selected, setSelected] = useState<string[]>([]);
  const [includeOtherTypes, setIncludeOtherTypes] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState('');
  const [copyMessage, setCopyMessage] = useState('');
  const [eventDate, setEventDate] = useState('');

  const validHeadcount = Number.isInteger(headcount) && headcount >= 2 && headcount <= 3000;
  const priceCeiling = budget === '' ? null : Number(budget);
  const matches = useMemo(() => {
    const cityTerm = city.trim().toLowerCase();
    if (!validHeadcount || !cityTerm) return [];
    return corporateEventProviders.filter((provider) => {
      const requestedCity = cityTerm.replace(/,?\\s+(?:tx|texas)$/i, '').trim();
      const isHoustonZip = /^77(?:0|2)\\d{2}$/.test(cityTerm);
      const inRequestedMarket = cityTerm === 'texas' || cityTerm === 'tx'
        || (isHoustonZip && provider.city === 'Houston')
        || provider.city.toLowerCase().includes(requestedCity);
      if (!inRequestedMarket) return false;
      if (provider.maxGroup != null && headcount > provider.maxGroup) return false;
      if (provider.minGroup != null && headcount < provider.minGroup) return false;
      if (!includeOtherTypes && !provider.categories.includes(category)) return false;
      // Unknown prices must not be mislabeled as within budget; they remain quote-required candidates.
      if (priceCeiling != null && provider.startingPricePerPerson != null && provider.startingPricePerPerson > priceCeiling) return false;
      return true;
    });
  }, [city, headcount, category, includeOtherTypes, priceCeiling, validHeadcount]);

  const shortlist = useMemo(() => corporateEventProviders.filter((provider) => selected.includes(provider.slug)), [selected]);
  const chosenCategoryLabel = categoryLabel(category);
  const proposalText = useMemo(() => [
    'TexasDefined | Corporate event planning shortlist',
    'Location: ' + (city.trim() || 'Not specified'),
    'Group size: ' + (validHeadcount ? headcount : 'To be confirmed'),
    'Event type: ' + chosenCategoryLabel,
    'Budget per person: ' + (priceCeiling == null ? 'Flexible / not specified' : 'Up to ' + dollars(priceCeiling)),
    'Date: ' + (eventDate || 'To be confirmed'),
    '',
    ...shortlist.map((provider, index) => [
      (index + 1) + '. ' + provider.name,
      provider.area + ', ' + provider.city + ' | ' + provider.format,
      'Capacity: ' + provider.capacityDetail,
      'Price: ' + (provider.startingPricePerPerson == null ? 'Quote required' : 'Published starting rate ' + dollars(provider.startingPricePerPerson) + '/person'),
      'Website: ' + provider.officialUrl,
      'Source: ' + provider.sourceUrl,
      '',
    ].join('\n')),
    'All pricing, package logistics, group format and actual availability must be confirmed directly with the provider.',
    'TexasDefined does not guarantee a booking or claim an exclusive discount.',
  ].join('\n'), [city, validHeadcount, headcount, chosenCategoryLabel, priceCeiling, eventDate, shortlist]);

  const toggleSelected = (slug: string) => {
    setSelected((current) => current.includes(slug) ? current.filter((item) => item !== slug) : current.length < 5 ? [...current, slug] : current);
  };

  async function copyProposal() {
    try {
      await navigator.clipboard.writeText(proposalText);
      setCopyMessage('Shortlist copied. You can paste it into an email to management.');
    } catch {
      setCopyMessage('Copy was unavailable in this browser. Use Print / Save PDF instead.');
    }
  }

  async function sendRequest(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!validHeadcount || !city.trim()) return;
    const form = new FormData(event.currentTarget);
    setSubmitting(true);
    setFormError('');
    try {
      await submitGroupEventRequest({ data: {
        contactName: String(form.get('contactName') ?? ''),
        email: String(form.get('email') ?? ''),
        company: String(form.get('company') ?? ''),
        phone: String(form.get('phone') ?? ''),
        city: city.trim(),
        groupSize: headcount,
        category,
        eventDate,
        budgetPerPerson: priceCeiling,
        providerSlugs: selected,
        notes: String(form.get('notes') ?? ''),
        consentContact: (form.get('consentContact') === 'on') as true,
        companyAddress2: String(form.get('companyAddress2') ?? ''),
      } });
      setSubmitted(true);
    } catch {
      setFormError('Your request could not be saved. Please check your information and try again.');
    } finally {
      setSubmitting(false);
    }
  }

  const structuredData = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    '@id': 'https://texasdefined.com/corporate-events#page',
    name: 'Texas Corporate Events & Team Building Finder',
    url: 'https://texasdefined.com/corporate-events',
    description: 'Source-backed corporate events and team-building venues in Texas.',
    isPartOf: { '@id': 'https://texasdefined.com/#website' },
    mainEntity: {
      '@type': 'ItemList',
      name: 'Houston group event providers',
      numberOfItems: corporateEventProviders.length,
      itemListElement: corporateEventProviders.map((provider, index) => ({
        '@type': 'ListItem', position: index + 1,
        name: provider.name, url: provider.officialUrl,
      })),
    },
  });

  return <main id="main">
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: structuredData }} />
    <section className="bg-foreground text-background">
      <Container className="py-12 sm:py-20">
        <p className="eyebrow text-background/70">Texas Defined • Group experiences</p>
        <h1 className="mt-4 max-w-5xl font-display text-5xl leading-[1.05] sm:text-6xl lg:text-7xl">Plan a company event worth leaving the office for.</h1>
        <p className="mt-6 max-w-3xl text-lg leading-8 text-background/80">Compare Houston team-building activities, company outings, private dining and corporate venues by your group's size. Shortlist options and create a proposal to share with your boss.</p>
        <div className="mt-8 flex flex-wrap gap-4 text-sm text-background/80"><span className="inline-flex items-center gap-2"><Users className="size-4" /> Group-size aware</span><span className="inline-flex items-center gap-2"><ClipboardList className="size-4" /> Shareable shortlist</span><span className="inline-flex items-center gap-2"><Check className="size-4" /> Official venue sources</span></div>
      </Container>
    </section>

    <Container className="py-9 sm:py-12">
      <div className="grid gap-8 lg:grid-cols-[20rem_1fr] lg:gap-10">
        <aside className="h-fit border border-border bg-surface p-5 lg:sticky lg:top-32">
          <div className="flex items-center gap-2"><Filter className="size-4 text-primary" aria-hidden /><h2 className="font-display text-2xl">Find your event</h2></div>
          <div className="mt-5 space-y-5">
            <label className="block text-sm font-semibold">City in Texas
              <input value={city} onChange={(event) => setCity(event.target.value)} placeholder="Houston" maxLength={90} className={'mt-2 ' + controlClass} />
              <span className="mt-1 block text-xs font-normal text-muted-foreground">Houston listings are available now. Other cities are being researched.</span>
            </label>
            <label className="block text-sm font-semibold">Number of guests
              <input type="number" min={2} max={3000} value={headcount} onChange={(event) => setHeadcount(Number(event.target.value))} className={'mt-2 ' + controlClass} />
            </label>
            <label className="block text-sm font-semibold">Event type
              <select value={category} onChange={(event) => setCategory(event.target.value as GroupEventCategory)} className={'mt-2 ' + controlClass}>
                {categories.map((item) => <option key={item.value} value={item.value}>{item.label}</option>)}
              </select>
            </label>
            <label className="flex items-start gap-2 text-xs leading-5 text-muted-foreground">
              <input className="mt-1" type="checkbox" checked={includeOtherTypes} onChange={(event) => setIncludeOtherTypes(event.target.checked)} />
              Show relevant group venues from other event types too
            </label>
            <label className="block text-sm font-semibold">Maximum budget per person
              <select value={budget} onChange={(event) => setBudget(event.target.value)} className={'mt-2 ' + controlClass}>
                <option value="">Flexible / request quote</option>
                <option value="50">$50</option><option value="100">$100</option>
                <option value="200">$200</option><option value="500">$500</option>
              </select>
              <span className="mt-1 block text-xs font-normal text-muted-foreground">Quote-required venues still show: their price has not been verified against this ceiling.</span>
            </label>
            <label className="block text-sm font-semibold">Preferred event date (optional)
              <input type="date" value={eventDate} onChange={(event) => setEventDate(event.target.value)} className={'mt-2 ' + controlClass} />
            </label>
          </div>
          <p className="mt-6 border-t border-border pt-4 text-xs leading-6 text-muted-foreground">Capacity indicates provider-published space or group limits, not an opening on your preferred date. Formats for larger groups may require several teams or rotations.</p>
        </aside>

        <div>
          <div className="flex flex-wrap items-end justify-between gap-4 border-b border-border pb-5">
            <div><p className="eyebrow text-primary">Curated launch directory</p><h2 className="mt-2 font-display text-3xl sm:text-4xl">{matches.length} group event {matches.length === 1 ? 'option' : 'options'}</h2><p className="mt-2 text-sm text-muted-foreground">{city.trim() || 'Your location'} · {validHeadcount ? headcount + ' guests' : 'Enter a valid group size'} · Sourced October 23, 2026</p></div>
            {selected.length ? <a href="#proposal" className="inline-flex min-h-11 items-center gap-2 border border-primary px-4 text-sm font-semibold text-primary">{selected.length}/5 shortlisted <ClipboardList className="size-4" /></a> : null}
          </div>
          {matches.length ? <div className="mt-6 grid gap-5 md:grid-cols-2">{matches.map((provider) =>
            <ProviderCard key={provider.slug} provider={provider} selected={selected.includes(provider.slug)} onToggle={() => toggleSelected(provider.slug)} />
          )}</div> : <div className="mt-6 border border-border bg-surface p-8">
            <Search className="size-8 text-primary" aria-hidden /><h3 className="mt-4 font-display text-3xl">No sourced matches yet.</h3>
            <p className="mt-3 max-w-xl leading-7 text-muted-foreground">We're launching with Houston and adding Texas cities as providers and group sizes are checked. Try Houston, adjust the filters, or submit your event requirements below so we can understand demand in your area.</p>
            <button type="button" onClick={() => { setCity('Houston'); setHeadcount(45); setBudget(''); setIncludeOtherTypes(false); }} className="mt-5 border border-primary px-5 py-3 text-sm font-semibold text-primary">See Houston options</button>
          </div>}
          {matches.length > 0 ? <p className="mt-5 text-xs leading-6 text-muted-foreground">This is an independent editorial directory. No venue shown is represented as a paid TexasDefined partner. Prices are provider-published starting points only; no availability, discounts, or booking is guaranteed.</p> : null}
        </div>
      </div>
    </Container>

    <section id="proposal" className="scroll-mt-24 border-y border-border bg-surface">
      <Container className="py-12">
        <p className="eyebrow text-primary">Management-ready proposal</p>
        <h2 className="mt-2 font-display text-4xl">Your event shortlist</h2>
        <p className="mt-3 max-w-3xl leading-7 text-muted-foreground">Compare up to five options, copy a summary into an email, or print / save it as a PDF. Options here have not been reserved.</p>
        {shortlist.length ? <>
          <div className="mt-6 grid gap-3 md:grid-cols-2">
            {shortlist.map((provider, index) => <div key={provider.slug} className="flex items-start justify-between gap-3 border border-border bg-background p-4">
              <div><p className="eyebrow text-primary">Option {index + 1}</p><h3 className="mt-1 font-display text-xl">{provider.name}</h3><p className="mt-1 text-sm text-muted-foreground">{provider.area} · {provider.format}</p><p className="mt-1 text-xs text-muted-foreground">{provider.startingPricePerPerson == null ? 'Price on request' : 'From ' + dollars(provider.startingPricePerPerson) + '/guest'}</p></div>
              <button type="button" onClick={() => toggleSelected(provider.slug)} aria-label={'Remove ' + provider.name} className="flex size-10 items-center justify-center border border-border print:hidden"><X className="size-4" /></button>
            </div>)}
          </div>
          <div className="mt-5 flex flex-wrap gap-3 print:hidden">
            <button type="button" onClick={copyProposal} className="inline-flex min-h-11 items-center gap-2 bg-primary px-5 text-sm font-semibold text-primary-foreground"><Copy className="size-4" /> Copy proposal</button>
            <button type="button" onClick={() => window.print()} className="inline-flex min-h-11 items-center gap-2 border border-border bg-background px-5 text-sm font-semibold"><Printer className="size-4" /> Print / Save PDF</button>
          </div>
          {copyMessage && <p className="mt-3 text-sm" role="status">{copyMessage}</p>}
          <div className="mt-6 hidden whitespace-pre-wrap border-t border-border pt-6 font-mono text-xs leading-6 print:block">{proposalText}</div>
        </> : <div className="mt-6 border border-dashed border-border bg-background p-6 text-sm text-muted-foreground">Choose Compare on any listing to add it to your shortlist. You can also send a planning request below without choosing venues.</div>}
      </Container>
    </section>

    <ApprovedCorporateEventOffers />

    <section id="planning-request" className="scroll-mt-24">
      <Container className="py-12 sm:py-16">
        <div className="grid gap-10 lg:grid-cols-[.8fr_1.2fr]">
          <div>
            <p className="eyebrow text-primary">Have a specific brief?</p>
            <h2 className="mt-3 font-display text-4xl leading-tight">Tell us what your company needs.</h2>
            <p className="mt-5 leading-8 text-muted-foreground">Save your group size, location, date and shortlisted venues with TexasDefined. Our team may contact you to discuss planning needs as this service expands.</p>
            <p className="mt-4 text-sm leading-7 text-muted-foreground">Submitting this form does not request a quote from a venue, book an event, or authorize us to share your contact information with a third party. For immediate pricing, use the venue's official website.</p>
            <a href="#list-your-business" className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary underline underline-offset-4">Own a group event business? Apply for a listing <ArrowUpRight className="size-4" aria-hidden /></a>
          </div>
          <div className="border border-border bg-surface p-5 sm:p-7">
            {submitted ? <div role="status" className="py-12"><Check className="size-10 text-primary" /><h3 className="mt-4 font-display text-3xl">Your planning request was saved.</h3><p className="mt-3 leading-7 text-muted-foreground">TexasDefined has your details for internal review. No booking or venue outreach has been made. For time-sensitive needs, please contact a provider directly.</p></div> :
              <form onSubmit={sendRequest} className="grid gap-4 sm:grid-cols-2">
                <label className="block text-sm font-semibold">Your name *<input required name="contactName" minLength={2} maxLength={120} autoComplete="name" className={'mt-2 ' + controlClass} /></label>
                <label className="block text-sm font-semibold">Work email *<input required type="email" name="email" maxLength={320} autoComplete="email" className={'mt-2 ' + controlClass} /></label>
                <label className="block text-sm font-semibold">Company *<input required name="company" minLength={2} maxLength={180} autoComplete="organization" className={'mt-2 ' + controlClass} /></label>
                <label className="block text-sm font-semibold">Phone (optional)<input name="phone" maxLength={50} type="tel" autoComplete="tel" className={'mt-2 ' + controlClass} /></label>
                <label className="block text-sm font-semibold sm:col-span-2">Planning details<textarea name="notes" maxLength={3000} rows={4} className={'mt-2 ' + controlClass} placeholder="Accessibility, food, schedule, team goals or budget constraints" /></label>
                <div className="hidden" aria-hidden="true"><label>Office address line 2<input tabIndex={-1} name="companyAddress2" autoComplete="off" /></label></div>
                <label className="flex items-start gap-2 text-sm leading-6 sm:col-span-2"><input type="checkbox" name="consentContact" required className="mt-1.5" /><span>I agree TexasDefined may use this information to contact me about this request. It will not be sent to venues without further permission. *</span></label>
                <div className="sm:col-span-2">
                  <p className="text-xs leading-6 text-muted-foreground">Request: {validHeadcount ? headcount : 'Invalid group size'} people near {city || 'unspecified city'}, {chosenCategoryLabel.toLowerCase()}. {selected.length} selected venues. See <a className="underline" href="/about#privacy-terms">privacy & site terms</a>.</p>
                  {formError && <p role="alert" className="mt-2 text-sm text-destructive">{formError}</p>}
                  <button type="submit" disabled={submitting || !validHeadcount || !city.trim()} className="mt-4 min-h-12 w-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground disabled:cursor-not-allowed disabled:opacity-50">{submitting ? 'Saving request…' : 'Send planning request to TexasDefined'}</button>
                </div>
              </form>}
          </div>
        </div>
      </Container>
    </section>

    <GroupEventPartnerApplication />

    <section className="border-t border-border bg-surface">
      <Container className="py-10">
        <h2 className="font-display text-3xl">Keep planning in Texas</h2>
        <div className="mt-5 flex flex-wrap gap-3 text-sm font-semibold">
          <a href="/events" className="border border-border bg-background px-4 py-3">Texas events calendar ↗</a>
          <a href="/explore/trip-planner" className="border border-border bg-background px-4 py-3">Trip planner ↗</a>
          <a href="/partner-with-us" className="border border-border bg-background px-4 py-3">Business partnerships ↗</a>
        </div>
        <p className="mt-6 text-xs leading-6 text-muted-foreground">Editorial methodology: independently curated entries from the linked official venue pages, checked October 23, 2026. Published capacity is venue-specific; event availability, accessibility, cost and group format require direct confirmation. Request a correction through <a className="underline" href="/corrections-policy">our corrections policy</a>.</p>
      </Container>
    </section>
  </main>;
}
