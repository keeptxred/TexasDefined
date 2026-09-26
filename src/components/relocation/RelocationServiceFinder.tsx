import { useEffect, useMemo, useState } from 'react';
import { Link } from '@tanstack/react-router';

import { Container } from '@/components/layout/Container';
import { readRelocationSavedAddresses } from '@/lib/relocation-workspace';

export type RelocationFinderKind = 'school' | 'utilities' | 'voter' | 'homestead' | 'property-tax' | 'emergency';

type Place = { name: string; slug: string; county?: string; region?: string };

const CONFIG = {
  school: ['Find the school district that serves an address', 'Start with local context, then verify the exact address with the Texas Education Agency.'],
  utilities: ['Find utilities for a Texas address', 'Establish local context, then use official PUCT address tools for exact electric, water and sewer service territories.'],
  voter: ['Find your Texas voter-registration path', 'Find county context, then use the Texas Secretary of State tools for official registration status and requirements.'],
  homestead: ['Find where to file a Texas homestead exemption', 'Find the county where the home is located, then use the local appraisal district for official filing instructions.'],
  'property-tax': ['Find your Texas property-tax offices', 'Find county context for appraisal-district, property-search and tax-office research.'],
  emergency: ['Find Texas emergency and community services', 'Find local context and official community resources. For an immediate emergency call 911.'],
} as const;

const OFFICIAL = {
  school: ['TEA district locator', 'https://tea2.tea.texas.gov/families-and-students/school-district-locator/school-district-locator'],
  utilities: ['PUCT utility lookup', 'https://www.puc.texas.gov/WaterSearch/SearchAddress/Find'],
  voter: ['Texas voter portal', 'https://teamrv-mvp.sos.texas.gov/MVP/mvp.do'],
  homestead: ['Texas property-tax exemptions', 'https://comptroller.texas.gov/taxes/property-tax/exemptions/'],
  'property-tax': ['Texas county property-tax directory', 'https://comptroller.texas.gov/taxes/property-tax/county-directory/'],
  emergency: ['2-1-1 Texas', 'https://www.211texas.org/'],
} as const;

function savedAddressLocality(address: string) {
  const parts = address.split(',').map((part) => part.trim()).filter(Boolean);
  if (parts.length >= 4) return parts[parts.length - 3];
  if (parts.length >= 2) return parts[1];
  return '';
}

export function RelocationServiceFinder({ kind }: { kind: RelocationFinderKind }) {
  const [q, setQ] = useState('');
  const [places, setPlaces] = useState<{ cities: Place[]; counties: Place[] } | null>(null);
  const [savedAddresses, setSavedAddresses] = useState<string[]>([]);
  const [copiedAddress, setCopiedAddress] = useState('');
  const [copyError, setCopyError] = useState('');
  const needle = q.trim().toLowerCase();

  useEffect(() => {
    setSavedAddresses(readRelocationSavedAddresses());
  }, []);

  useEffect(() => {
    if (!needle || places) return;
    void import('@/data/texas-places').then((module) => {
      setPlaces({ cities: module.TEXAS_CITIES, counties: module.TEXAS_COUNTIES });
    });
  }, [needle, places]);

  const matches = useMemo(() => {
    if (!needle || !places) return [];
    const cities = places.cities
      .filter((city) => `${city.name} ${city.county ?? ''} ${city.region ?? ''}`.toLowerCase().includes(needle))
      .slice(0, 8)
      .map((city) => ({
        name: city.name,
        detail: `${city.county} County · ${city.region}`,
        county: city.county ?? '',
      }));
    const counties = places.counties
      .filter((county) => county.name.toLowerCase().includes(needle))
      .slice(0, 8)
      .map((county) => ({
        name: county.name,
        detail: 'Texas county',
        county: county.name.replace(/ County$/i, ''),
      }));
    return [...cities, ...counties].slice(0, 10);
  }, [needle, places]);

  const copySavedAddress = async (address: string) => {
    setCopyError('');
    try {
      await navigator.clipboard.writeText(address);
      setCopiedAddress(address);
    } catch {
      setCopiedAddress('');
      setCopyError(address);
    }
  };

  const [title, intro] = CONFIG[kind];
  const [label, url] = OFFICIAL[kind];

  return <Container className="pb-16 pt-12 sm:pb-24 sm:pt-16">
    <article className="mx-auto max-w-6xl">
      <nav aria-label="Breadcrumb" className="border-b border-border pb-4 text-xs uppercase tracking-[0.14em] text-muted-foreground">
        <Link to="/">Front page</Link><span className="mx-2">/</span><Link to="/moving-to-texas">Moving to Texas</Link><span className="mx-2">/</span><span>{title}</span>
      </nav>

      <header className="border-b border-border py-10">
        <p className="eyebrow text-primary">Texas relocation tool</p>
        <h1 className="mt-3 max-w-4xl font-display text-5xl leading-none sm:text-7xl">{title}</h1>
        <p className="mt-6 max-w-3xl text-lg leading-8 text-muted-foreground">{intro}</p>
      </header>

      {savedAddresses.length > 0 ? <section className="grid gap-8 border-b border-border bg-surface py-10 lg:grid-cols-[15rem_1fr]" aria-labelledby="saved-relocation-addresses">
        <div>
          <p className="eyebrow text-primary">My Texas Move</p>
          <h2 id="saved-relocation-addresses" className="mt-2 font-display text-3xl">Use a saved address</h2>
        </div>
        <div>
          <p className="max-w-3xl text-sm leading-7 text-muted-foreground">These addresses were saved explicitly in My Texas Move and remain in this browser. Use the city for TexasDefined local context, or copy the exact address before opening the official source. TexasDefined does not place the address in the link or URL.</p>
          <div className="mt-5 divide-y divide-border border-y border-border">
            {savedAddresses.map((address) => {
              const locality = savedAddressLocality(address);
              return <div key={address} className="py-4">
                <p className="text-sm font-semibold">{address}</p>
                <div className="mt-2 flex flex-wrap gap-4 text-xs font-semibold">
                  {locality ? <button type="button" onClick={() => setQ(locality)} className="text-primary underline underline-offset-4">Use {locality} for local context →</button> : null}
                  <button type="button" onClick={() => void copySavedAddress(address)} className="underline underline-offset-4">{copiedAddress === address ? 'Address copied' : 'Copy address'}</button>
                </div>
                {copyError === address ? <p className="mt-2 text-xs text-muted-foreground">Clipboard access was unavailable. Select the saved address above and copy it manually.</p> : null}
              </div>;
            })}
          </div>
        </div>
      </section> : null}

      <section className="grid gap-8 border-b border-border py-10 lg:grid-cols-[15rem_1fr]">
        <div><p className="eyebrow text-primary">Start local</p><h2 className="mt-2 font-display text-3xl">Search TexasDefined</h2></div>
        <div>
          <label htmlFor={`finder-${kind}`} className="text-sm font-semibold">Texas city or county</label>
          <input id={`finder-${kind}`} value={q} onChange={(event) => setQ(event.target.value)} placeholder="Try Katy, Austin, Bexar or Collin" className="mt-2 min-h-11 w-full border border-border bg-background px-4 text-base" />
          {needle && !places ? <p className="mt-5 text-sm text-muted-foreground">Loading Texas place directory…</p> : null}
          {needle && places && matches.length === 0 ? <p className="mt-5 text-sm text-muted-foreground">No local match. Try a county name or nearby major city, then use the official source below.</p> : null}
          {matches.length > 0 ? <div className="mt-6 divide-y divide-border border-y border-border">
            {matches.map((match, index) => <div key={`${match.name}-${index}`} className="flex flex-col gap-2 py-4 sm:flex-row sm:items-center sm:justify-between">
              <div><strong className="font-display text-xl">{match.name}</strong><span className="ml-2 text-sm text-muted-foreground">{match.detail}</span></div>
              {kind === 'school' ? <a href={`/texas-high-school-football-teams?q=${encodeURIComponent(match.name)}`} className="text-sm font-semibold text-primary underline underline-offset-4">See football programs →</a> : null}
            </div>)}
          </div> : null}
        </div>
      </section>

      <section className="grid gap-8 border-b border-border py-10 lg:grid-cols-[15rem_1fr]">
        <div><p className="eyebrow text-primary">Source of record</p><h2 className="mt-2 font-display text-3xl">Verify the exact address</h2></div>
        <div>
          <p className="max-w-3xl text-sm leading-7 text-muted-foreground">Texas cities, counties, ZIP codes, school districts, appraisal districts and utility territories are different geographies. TexasDefined organizes the research; the responsible agency remains the source of record.</p>
          <a href={url} target="_blank" rel="noreferrer noopener" className="mt-5 inline-flex items-center border border-foreground px-4 py-2 text-sm font-semibold">{label} ↗</a>
        </div>
      </section>

      <p className="pt-8 text-sm"><Link to="/moving-to-texas/tools" className="font-semibold text-primary underline underline-offset-4">Open the complete Texas relocation toolkit →</Link></p>
    </article>
  </Container>;
}
