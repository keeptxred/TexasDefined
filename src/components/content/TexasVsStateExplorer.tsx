import { useEffect, useMemo, useState } from 'react';
import { Link } from '@tanstack/react-router';

import { loadTexasVsStateProfile } from '@/data/texas-vs-state-profile';
import { TEXAS_VS_STATES, texasVsStateName, texasVsStateSlug, type TexasVsStateProfile } from '@/data/texas-vs-states-index';

const canonicalPath = '/texas-vs-every-state';

function slugFromHash() {
  if (typeof window === 'undefined') return 'california';
  const slug = window.location.hash.replace(/^#/, '').trim().toLowerCase();
  return texasVsStateName(slug) ? slug : 'california';
}

export function TexasVsStateExplorer() {
  const [slug, setSlug] = useState('california');
  const [profile, setProfile] = useState<TexasVsStateProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const name = texasVsStateName(slug) ?? 'California';

  useEffect(() => {
    const sync = () => setSlug(slugFromHash());
    sync();
    window.addEventListener('hashchange', sync);
    return () => window.removeEventListener('hashchange', sync);
  }, []);

  useEffect(() => {
    let active = true;
    setLoading(true);
    loadTexasVsStateProfile(name)
      .then((nextProfile) => {
        if (active) setProfile(nextProfile);
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => { active = false; };
  }, [name]);

  const sections = useMemo(() => {
    if (!profile) return [];
    const evidence = profile.evidence;
    return [
      { heading: 'The comparison that actually matters', body: profile.comparisonFocus },
      { heading: 'Compare places, not state averages', body: profile.placeLens },
      ...(evidence ? [{ heading: 'Metro and place matchups', body: evidence.metroLens }] : []),
      { heading: 'Taxes', body: evidence?.taxLens ?? `Texas has no individual state income tax, but that alone does not determine whether a household pays less overall than it would in ${name}. Compare income, sales and property taxes for the places you would actually live.` },
      { heading: 'Housing and cost of living', body: evidence?.housingLens ?? `Compare the Texas city or county you would actually choose with the ${name} community you would actually choose, including home prices or rent, insurance, utilities, property taxes and transportation.` },
      { heading: 'Jobs and pay', body: evidence?.jobsLens ?? `Compare occupation-specific wages, unemployment, major industries and openings in the metro areas that match your career rather than relying on statewide averages alone.` },
      { heading: 'Climate and geography', body: profile.climateLens },
      ...(evidence ? [{ heading: 'Risk, insurance and resilience', body: evidence.riskLens }] : []),
      { heading: 'Transportation and daily life', body: evidence?.transportationLens ?? `Driving distances, transit, airport access and commute patterns can materially change daily costs. Compare the actual places you would use in Texas and ${name}.` },
      { heading: 'Culture and fit', body: `The final choice is not purely financial. Family ties, schools, recreation, food, sports, pace of life and access to the places you value can outweigh a modest difference in taxes or housing costs between Texas and ${name}.` },
    ];
  }, [name, profile]);

  const updateState = (nextSlug: string) => {
    setSlug(nextSlug);
    if (typeof window !== 'undefined') {
      window.history.replaceState(window.history.state, '', `${canonicalPath}#${nextSlug}`);
    }
  };

  const faq = [
    { q: `Is Texas cheaper than ${name}?`, a: `There is no reliable statewide yes-or-no answer for every household. Compare the actual Texas city or county with the actual ${name} community, including housing, insurance, utilities, transportation and taxes.` },
    { q: `What should I compare before moving from ${name} to Texas?`, a: `Compare occupation-specific pay, housing, total taxes, insurance, utilities, commute, weather risks, schools or services you use, and the specific metro or county rather than statewide averages alone.` },
    { q: 'Does Texas have an individual state income tax?', a: 'Texas does not impose an individual state income tax, but that fact alone does not determine total household cost. Sales taxes, property taxes, insurance, housing and local costs still matter.' },
  ];

  return (
    <section className="border-y border-border bg-muted/30 py-12 md:py-16" aria-labelledby="state-comparison-heading">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="eyebrow text-primary">Interactive comparison</p>
        <h2 id="state-comparison-heading" className="mt-2 font-display text-4xl md:text-5xl">Compare Texas with one state at a time</h2>
        <p className="mt-4 max-w-3xl leading-7 text-muted-foreground">Select a state below. The comparison changes in place, so all 49 state choices share one canonical page instead of creating 49 near-duplicate search URLs.</p>

        <label htmlFor="texas-vs-state-selector" className="mt-6 block text-sm font-semibold">Compare Texas with</label>
        <select
          id="texas-vs-state-selector"
          value={slug}
          onChange={(event) => updateState(event.target.value)}
          className="mt-2 w-full max-w-xl border border-border bg-background px-4 py-3 text-base"
        >
          {TEXAS_VS_STATES.map((state) => <option key={state} value={texasVsStateSlug(state)}>{state}</option>)}
        </select>

        <div className="mt-9 border-t border-border pt-8" aria-live="polite">
          <p className="eyebrow text-muted-foreground">Selected comparison</p>
          <h3 className="mt-2 font-display text-4xl md:text-5xl">Texas vs {name}</h3>
          {profile?.evidence && <p className="mt-3 text-sm text-muted-foreground">Official-source review updated {profile.evidence.reviewedAt}.</p>}

          {loading && <p className="mt-6 text-muted-foreground">Loading the {name} comparison…</p>}
          {!loading && !profile && <p className="mt-6 text-muted-foreground">This comparison is temporarily unavailable. Choose another state or return to the statewide tools below.</p>}

          {!loading && profile && (
            <>
              <div className="mt-8 max-w-4xl divide-y divide-border border-y border-border">
                {sections.map((section, index) => (
                  <section key={section.heading} className="py-7">
                    <p className="eyebrow text-muted-foreground">{String(index + 1).padStart(2, '0')}</p>
                    <h4 className="mt-2 font-display text-3xl">{section.heading}</h4>
                    <p className="mt-4 leading-8 text-muted-foreground">{section.body}</p>
                  </section>
                ))}
              </div>

              {profile.evidence && (
                <div className="mt-8 max-w-4xl">
                  <h4 className="font-display text-3xl">{name} official sources</h4>
                  <ul className="mt-4 grid gap-3 text-sm sm:grid-cols-2">
                    {profile.evidence.sources.map((source) => (
                      <li key={source.url}><a href={source.url} target="_blank" rel="noreferrer" className="font-semibold text-primary underline decoration-primary/40 underline-offset-4">{source.label} ↗</a></li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="mt-8 max-w-4xl">
                <h4 className="font-display text-3xl">Texas vs {name} FAQ</h4>
                <div className="mt-5 divide-y divide-border border-y border-border">
                  {faq.map((item) => (
                    <details key={item.q} className="group py-5">
                      <summary className="cursor-pointer list-none pr-8 font-display text-xl marker:hidden">{item.q}<span className="float-right text-primary group-open:rotate-45">+</span></summary>
                      <p className="mt-3 max-w-3xl leading-7 text-muted-foreground">{item.a}</p>
                    </details>
                  ))}
                </div>
              </div>
            </>
          )}

          <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm">
            <Link to="/texas-cost-of-living-calculator" className="font-semibold text-primary hover:underline">Texas cost-of-living calculator</Link>
            <Link to="/texas-home-affordability-calculator" className="font-semibold text-primary hover:underline">Texas home affordability</Link>
            <Link to="/moving-to-texas" className="font-semibold text-primary hover:underline">Moving to Texas guide</Link>
            <Link to="/texas-data" className="font-semibold text-primary hover:underline">Texas Data Center</Link>
          </div>
        </div>
      </div>
    </section>
  );
}
