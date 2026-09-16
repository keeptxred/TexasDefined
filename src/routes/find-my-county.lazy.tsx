import { type FormEvent, useState } from 'react';
import { createLazyFileRoute, Link } from '@tanstack/react-router';
import { Container } from '@/components/layout/Container';
import { description } from './find-my-county';

type CountyLookupSuccess = {
  ok: true;
  countyName: string;
  countySlug: string;
  countyFips: string;
  matchedAddress: string;
  countyUrl: string;
  officialCountyDirectoryUrl: string;
  source: string;
};

type CountyLookupFailure = {
  ok: false;
  error: string;
};

type CountyLookupResponse = CountyLookupSuccess | CountyLookupFailure;

export const Route = createLazyFileRoute('/find-my-county')({ component: Page });

function Page() {
  const [address, setAddress] = useState('');
  const [result, setResult] = useState<CountyLookupSuccess | null>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const value = address.trim();
    if (!value) {
      setResult(null);
      setError('Enter a complete Texas street address.');
      return;
    }

    setLoading(true);
    setError('');
    setResult(null);
    try {
      const response = await fetch('/api/find-my-county', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ address: value }),
      });
      const payload = await response.json() as CountyLookupResponse;
      if (!response.ok || !payload.ok) {
        setError(payload.ok ? 'The county lookup failed.' : payload.error);
        return;
      }
      setResult(payload);
    } catch {
      setError('The county lookup could not be completed. Try again shortly.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <Container className="pb-16 pt-12 sm:pb-24 sm:pt-16">
      <article className="mx-auto max-w-6xl">
        <nav aria-label="Breadcrumb" className="border-b border-border pb-4 text-xs uppercase tracking-[0.14em] text-muted-foreground">
          <Link to="/">Front page</Link><span aria-hidden="true" className="mx-2">/</span><Link to="/moving-to-texas">Moving Here</Link><span aria-hidden="true" className="mx-2">/</span><span aria-current="page" className="text-foreground">Find My County</span>
        </nav>

        <header className="grid gap-8 border-b border-border py-10 lg:grid-cols-[minmax(0,1fr)_19rem] lg:items-end">
          <div>
            <p className="eyebrow text-primary">Texas address lookup</p>
            <h1 className="mt-3 max-w-4xl font-display text-5xl leading-[0.98] sm:text-7xl">What county am I in?</h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-muted-foreground sm:text-xl">{description}</p>
          </div>
          <p className="border-l border-border pl-6 text-sm leading-6 text-muted-foreground">Texas has 254 counties, and a mailing-city name does not always tell you which county government, appraisal district or county office serves an address.</p>
        </header>

        <section className="grid gap-8 border-b border-border py-10 lg:grid-cols-[15rem_1fr]" aria-labelledby="county-lookup-heading">
          <div>
            <p className="eyebrow text-primary">Address tool</p>
            <h2 id="county-lookup-heading" className="mt-2 font-display text-3xl">Find the county for a Texas address</h2>
          </div>
          <div>
            <form onSubmit={submit} className="border border-border bg-card p-5 sm:p-7">
              <label htmlFor="county-address" className="block font-semibold">Street address</label>
              <p className="mt-1 text-sm leading-6 text-muted-foreground">Use a complete address when possible: street number and name, city, Texas and ZIP code.</p>
              <div className="mt-4 flex flex-col gap-3 sm:flex-row">
                <input
                  id="county-address"
                  name="address"
                  type="text"
                  autoComplete="street-address"
                  maxLength={100}
                  value={address}
                  onChange={(event) => setAddress(event.target.value)}
                  placeholder="Example: 1100 Congress Ave, Austin, TX 78701"
                  className="min-w-0 flex-1 border border-border bg-background px-4 py-3 text-base outline-none focus:border-primary"
                  aria-describedby="county-address-help"
                />
                <button type="submit" disabled={loading} className="bg-primary px-6 py-3 font-semibold text-primary-foreground disabled:cursor-wait disabled:opacity-60">
                  {loading ? 'Checking…' : 'Find my county'}
                </button>
              </div>
              <p id="county-address-help" className="mt-3 text-xs leading-5 text-muted-foreground">The lookup is sent through Texas Defined to the U.S. Census Bureau Geocoder. Texas Defined does not write the submitted address or the lookup result to the site database, and the lookup response is marked no-store.</p>
            </form>

            <div aria-live="polite" className="mt-5">
              {error ? <div role="alert" className="border border-destructive/40 bg-destructive/5 p-5 text-sm leading-6 text-foreground"><strong>County not found.</strong> {error}</div> : null}
              {result ? (
                <div className="border border-primary/40 bg-primary/5 p-6">
                  <p className="eyebrow text-primary">Census match</p>
                  <h3 className="mt-2 font-display text-4xl">{result.countyName}</h3>
                  <dl className="mt-5 grid gap-4 text-sm sm:grid-cols-2">
                    <div><dt className="font-semibold text-muted-foreground">Matched address</dt><dd className="mt-1 text-foreground">{result.matchedAddress}</dd></div>
                    <div><dt className="font-semibold text-muted-foreground">County FIPS / GEOID</dt><dd className="mt-1 text-foreground">{result.countyFips}</dd></div>
                    <div><dt className="font-semibold text-muted-foreground">Lookup source</dt><dd className="mt-1 text-foreground">{result.source}</dd></div>
                    <div><dt className="font-semibold text-muted-foreground">Texas county guide</dt><dd className="mt-1"><a href={result.countyUrl} className="font-semibold text-primary underline underline-offset-4">Open {result.countyName} →</a></dd></div>
                  </dl>
                  <div className="mt-6 flex flex-wrap gap-x-6 gap-y-3 text-sm font-semibold">
                    <a href={result.countyUrl} className="text-primary underline underline-offset-4">County profile and local resources →</a>
                    <Link to="/property-tax-calculators" className="underline underline-offset-4">Property-tax tools →</Link>
                    <Link to="/find-my-dmv" className="underline underline-offset-4">Vehicle and county-office guide →</Link>
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </section>

        <section className="grid gap-8 border-b border-border py-10 lg:grid-cols-[15rem_1fr]">
          <div><p className="eyebrow text-primary">Why it matters</p><h2 className="mt-2 font-display text-3xl">County is more than a mailing label</h2></div>
          <div className="space-y-5 font-serif text-base leading-8 md:text-[17px]">
            <p>County matters quickly when you move, buy a home or start dealing with local government in Texas. Vehicle-registration work is commonly handled through the county tax assessor-collector. Property records and appraisals are tied to county appraisal districts. County courts, clerk records, elections administration and many local services also depend on the county that actually contains the property.</p>
            <p>Do not assume the city printed in a postal address answers that question. Postal city names are designed to route mail, while municipal limits and county boundaries are separate geographic systems. Large metropolitan areas can cross several counties, and suburban mailing addresses can make the distinction especially easy to miss.</p>
            <p>Once the tool returns a county, use the Texas Defined county profile as an orientation page and then verify the transaction with the responsible local office. A county result does not by itself identify every taxing unit, school district, emergency-services district, municipality, special district or utility provider that serves the address.</p>
          </div>
        </section>

        <section className="grid gap-8 border-b border-border py-10 lg:grid-cols-[15rem_1fr]">
          <div><p className="eyebrow text-primary">Method</p><h2 className="mt-2 font-display text-3xl">How the county lookup works</h2></div>
          <div className="space-y-5 font-serif text-base leading-8 md:text-[17px]">
            <p>Texas Defined sends the address to the U.S. Census Bureau Geocoding Services API using the current public address benchmark and current Census geography vintage. The Census service first matches the street address and then returns the geographic areas associated with that match. Texas Defined reads the county code from that response and requires the state code to be 48, the federal FIPS code for Texas.</p>
            <p>The returned three-digit county code is then matched against Texas Defined’s governed registry of all 254 Texas counties. That second step prevents the page from inventing a county slug or linking a Census result to the wrong county profile. The five-digit value displayed in the result combines Texas state FIPS 48 with the three-digit county code.</p>
            <p>Address geocoding is not perfect. New subdivisions, recently renamed streets, rural routes, incomplete addresses and unusual postal conventions can fail to match or can match less precisely than expected. If the result affects a legal filing, tax payment, school enrollment, election question or property transaction, confirm it with the relevant county or local authority before acting.</p>
          </div>
        </section>

        <section className="grid gap-8 border-b border-border py-10 lg:grid-cols-[15rem_1fr]">
          <div><p className="eyebrow text-primary">Next steps</p><h2 className="mt-2 font-display text-3xl">After you know the county</h2></div>
          <div className="grid sm:grid-cols-2">
            <Link className="group border-t border-border py-5 sm:px-5" to="/browse/counties"><span className="font-display text-xl group-hover:text-primary">Compare all 254 counties</span><span className="ml-2 text-sm">→</span></Link>
            <Link className="group border-t border-border py-5 sm:px-5" to="/find-my-dmv"><span className="font-display text-xl group-hover:text-primary">Find vehicle and county-office guidance</span><span className="ml-2 text-sm">→</span></Link>
            <Link className="group border-t border-border py-5 sm:px-5" to="/find-my-school-district"><span className="font-display text-xl group-hover:text-primary">Verify the school district</span><span className="ml-2 text-sm">→</span></Link>
            <Link className="group border-t border-border py-5 sm:px-5" to="/property-tax-calculators"><span className="font-display text-xl group-hover:text-primary">Open property-tax tools</span><span className="ml-2 text-sm">→</span></Link>
          </div>
        </section>

        <section className="grid gap-8 py-10 lg:grid-cols-[15rem_1fr]">
          <div><p className="eyebrow text-primary">Official references</p><h2 className="mt-2 font-display text-3xl">Source and verification</h2></div>
          <div className="grid sm:grid-cols-2">
            <a className="group border-t border-border py-5 sm:px-5" href="https://geocoding.geo.census.gov/geocoder/Geocoding_Services_API.html" target="_blank" rel="noreferrer noopener"><span className="font-display text-xl group-hover:text-primary">U.S. Census Geocoding Services API</span><span className="ml-2 text-sm">↗</span><p className="mt-2 text-sm leading-6 text-muted-foreground">Official documentation for address matching, benchmarks, geography vintages and returned Census geography.</p></a>
            <a className="group border-t border-border py-5 sm:px-5" href="https://www.texas.gov/texas-county-websites.html" target="_blank" rel="noreferrer noopener"><span className="font-display text-xl group-hover:text-primary">Official Texas county websites</span><span className="ml-2 text-sm">↗</span><p className="mt-2 text-sm leading-6 text-muted-foreground">Texas.gov directory for county government websites and local verification.</p></a>
          </div>
        </section>
      </article>
    </Container>
  );
}
