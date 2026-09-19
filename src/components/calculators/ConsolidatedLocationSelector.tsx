import { useEffect, useMemo, useState } from 'react';
import { useLocation } from '@tanstack/react-router';

import { LOCAL_HOME_AFFORDABILITY_PROFILES } from '@/data/local-home-affordability';
import { LOCAL_HOME_INSURANCE_PROFILES } from '@/data/local-home-insurance';
import { LOCAL_HOMEOWNERSHIP_COST_PROFILES } from '@/data/local-homeownership-cost';
import { LOCAL_MORTGAGE_PROFILES } from '@/data/local-mortgage';
import { LOCAL_COST_OF_LIVING_PROFILES } from '@/data/local-cost-of-living';
import { LOCAL_PROPERTY_TAX_PROFILES } from '@/data/local-property-tax-calculators';
import { LOCAL_SALARY_NEEDED_PROFILES } from '@/data/local-salary-needed';

type LocationOption = {
  slug: string;
  name: string;
  context: string;
  points: readonly string[];
  guideHref?: string;
  guideLabel?: string;
};

type LocationConfig = {
  label: string;
  intro: string;
  options: readonly LocationOption[];
};

const configs: Record<string, LocationConfig> = {
  '/texas-home-affordability-calculator': {
    label: 'Local affordability context',
    intro: 'Choose a Texas city or county to add the address-level context that used to live on separate calculator pages. The calculator stays here on one canonical URL.',
    options: LOCAL_HOME_AFFORDABILITY_PROFILES.map((profile) => ({
      slug: profile.slug,
      name: profile.name,
      context: profile.housingContext,
      points: profile.planningPoints,
      guideHref: profile.relocationHref,
      guideLabel: profile.relocationLabel,
    })),
  },
  '/texas-mortgage-calculator': {
    label: 'Local mortgage context',
    intro: 'Choose a Texas city or county to load local mortgage-planning context without creating another indexable calculator URL.',
    options: LOCAL_MORTGAGE_PROFILES.map((profile) => ({
      slug: profile.slug,
      name: profile.name,
      context: `${profile.mortgageIntro} ${profile.housingContext}`,
      points: profile.mortgagePlanningPoints,
      guideHref: profile.relocationHref,
      guideLabel: profile.relocationLabel,
    })),
  },
  '/texas-home-insurance-calculator': {
    label: 'Local insurance context',
    intro: 'Choose a Texas city or county to load local insurance-planning context while keeping one authoritative calculator page.',
    options: LOCAL_HOME_INSURANCE_PROFILES.map((profile) => ({
      slug: profile.slug,
      name: profile.name,
      context: `${profile.insuranceIntro} ${profile.housingContext}`,
      points: profile.insurancePlanningPoints,
      guideHref: profile.relocationHref,
      guideLabel: profile.relocationLabel,
    })),
  },
  '/texas-homeownership-cost-calculator': {
    label: 'Local ownership-cost context',
    intro: 'Choose a Texas city or county to load local ownership-cost considerations without splitting the calculator into duplicate location pages.',
    options: LOCAL_HOMEOWNERSHIP_COST_PROFILES.map((profile) => ({
      slug: profile.slug,
      name: profile.name,
      context: `${profile.ownershipIntro} ${profile.housingContext}`,
      points: profile.planningPoints,
      guideHref: profile.relocationHref,
      guideLabel: profile.relocationLabel,
    })),
  },
  '/texas-cost-of-living-calculator': {
    label: 'Local cost-of-living context',
    intro: 'Choose a Texas city to load the local budget factors that matter for that market. The household calculator remains one canonical tool.',
    options: LOCAL_COST_OF_LIVING_PROFILES.map((profile) => ({
      slug: profile.slug,
      name: profile.name,
      context: profile.localContext,
      points: profile.planningPoints,
      guideHref: profile.relocationHref,
      guideLabel: profile.relocationLabel,
    })),
  },
  '/texas-salary-needed-calculator': {
    label: 'Local salary context',
    intro: 'Choose a Texas city to load its local budget context while keeping salary planning on one authoritative URL.',
    options: LOCAL_SALARY_NEEDED_PROFILES.map((profile) => ({
      slug: profile.slug,
      name: profile.name,
      context: `${profile.salaryIntro} ${profile.localContext}`,
      points: profile.planningPoints,
      guideHref: profile.relocationHref,
      guideLabel: profile.relocationLabel,
    })),
  },
  '/texas-property-tax-estimator': {
    label: 'Local property-tax context',
    intro: 'Choose a Texas city or county to load jurisdiction guidance for that area. The statewide official-rate estimator remains the only canonical local property-tax calculator URL.',
    options: LOCAL_PROPERTY_TAX_PROFILES.map((profile) => ({
      slug: profile.slug,
      name: profile.name,
      context: `${profile.intro} ${profile.jurisdictionNote}`,
      points: profile.planningPoints,
      guideHref: profile.guideHref,
      guideLabel: profile.guideLabel,
    })),
  },
};

function readHash(options: readonly LocationOption[]) {
  if (typeof window === 'undefined') return '';
  const slug = window.location.hash.replace(/^#/, '').trim().toLowerCase();
  return options.some((option) => option.slug === slug) ? slug : '';
}

export function ConsolidatedLocationSelector() {
  const location = useLocation();
  const config = configs[location.pathname];
  const [selectedSlug, setSelectedSlug] = useState('');

  useEffect(() => {
    if (!config) return;
    const sync = () => setSelectedSlug(readHash(config.options));
    sync();
    window.addEventListener('hashchange', sync);
    return () => window.removeEventListener('hashchange', sync);
  }, [config]);

  const selected = useMemo(
    () => config?.options.find((option) => option.slug === selectedSlug) ?? null,
    [config, selectedSlug],
  );

  if (!config) return null;

  const updateSelection = (slug: string) => {
    setSelectedSlug(slug);
    if (typeof window === 'undefined') return;
    const next = slug ? `${location.pathname}#${slug}` : location.pathname;
    window.history.replaceState(window.history.state, '', next);
  };

  return (
    <section className="mb-10 border border-border bg-muted/25 p-5 sm:p-7" aria-labelledby="local-context-heading">
      <p className="eyebrow text-primary">One calculator, local context</p>
      <h2 id="local-context-heading" className="mt-2 font-display text-3xl">{config.label}</h2>
      <p className="mt-3 max-w-3xl text-sm leading-7 text-muted-foreground">{config.intro}</p>

      <label className="mt-6 block max-w-xl text-sm font-semibold" htmlFor="calculator-location-selector">
        Select a city or county
      </label>
      <select
        id="calculator-location-selector"
        value={selectedSlug}
        onChange={(event) => updateSelection(event.target.value)}
        className="mt-2 w-full max-w-xl border border-border bg-background px-4 py-3 text-base"
      >
        <option value="">Texas-wide planning</option>
        {config.options.map((option) => <option key={option.slug} value={option.slug}>{option.name}</option>)}
      </select>

      {selected && (
        <div className="mt-7 border-t border-border pt-6" aria-live="polite">
          <p className="eyebrow text-muted-foreground">Selected location</p>
          <h3 className="mt-2 font-display text-3xl">{selected.name}</h3>
          <p className="mt-4 max-w-4xl leading-8 text-muted-foreground">{selected.context}</p>
          <ul className="mt-5 max-w-4xl list-disc space-y-2 pl-5 text-sm leading-7 text-muted-foreground">
            {selected.points.map((point) => <li key={point}>{point}</li>)}
          </ul>
          <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-sm">
            <a href={`/texas-property-tax-estimator#${selected.slug}`} className="font-semibold text-primary hover:underline">Property-tax context for {selected.name} →</a>
            {selected.guideHref && selected.guideLabel && <a href={selected.guideHref} className="font-semibold text-primary hover:underline">{selected.guideLabel} →</a>}
          </div>
        </div>
      )}
    </section>
  );
}
