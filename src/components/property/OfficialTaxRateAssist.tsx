import { useEffect, useMemo, useState } from 'react';
import type { TexasTaxRateRecord } from '@/data/property/texas-tax-rates.generated';

export type AppliedOfficialTaxRates = {
  year: number;
  countyRate: number;
  schoolRate: number;
  otherRate: number;
  combinedRate: number;
  selectedUnits: TexasTaxRateRecord[];
};

type ApiResponse = {
  ready?: boolean;
  message?: string;
  metadata?: { latestFinalizedYear?: number; sourceName?: string; sourcePage?: string };
  summary?: {
    year: number;
    county: TexasTaxRateRecord[];
    cities: TexasTaxRateRecord[];
    schoolDistricts: TexasTaxRateRecord[];
    specialDistricts: TexasTaxRateRecord[];
  };
};

function isApplicable(record: TexasTaxRateRecord) {
  return !record.rateUnavailable && !record.variableRate && record.totalRate != null;
}

export function OfficialTaxRateAssist({
  countySlug,
  onApply,
  title = 'Use official local tax rates',
}: {
  countySlug: string;
  onApply: (rates: AppliedOfficialTaxRates) => void;
  title?: string;
}) {
  const [data, setData] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [schoolSlug, setSchoolSlug] = useState('');
  const [citySlug, setCitySlug] = useState('');
  const [specialSlugs, setSpecialSlugs] = useState<string[]>([]);
  const [specialFilter, setSpecialFilter] = useState('');

  useEffect(() => {
    setData(null);
    setSchoolSlug('');
    setCitySlug('');
    setSpecialSlugs([]);
    setSpecialFilter('');
    setError('');
    if (!countySlug) return;
    const controller = new AbortController();
    setLoading(true);
    fetch(`/api/property-tax-rates?county=${encodeURIComponent(countySlug)}`, { signal: controller.signal })
      .then(async (response) => {
        const body = await response.json() as ApiResponse;
        if (!response.ok) throw new Error(body.message || `Rate lookup failed (${response.status})`);
        return body;
      })
      .then((body) => setData(body))
      .catch((reason) => {
        if (reason instanceof DOMException && reason.name === 'AbortError') return;
        setError(reason instanceof Error ? reason.message : 'Official rate data is temporarily unavailable.');
      })
      .finally(() => setLoading(false));
    return () => controller.abort();
  }, [countySlug]);

  const summary = data?.summary;
  const selected = useMemo(() => {
    if (!summary) return [] as TexasTaxRateRecord[];
    const units = summary.county.filter(isApplicable);
    const school = summary.schoolDistricts.find((item) => item.slug === schoolSlug && isApplicable(item));
    const city = summary.cities.find((item) => item.slug === citySlug && isApplicable(item));
    if (school) units.push(school);
    if (city) units.push(city);
    units.push(...summary.specialDistricts.filter((item) => specialSlugs.includes(item.slug) && isApplicable(item)));
    return units;
  }, [summary, schoolSlug, citySlug, specialSlugs]);

  const totals = useMemo(() => {
    const rate = (item: TexasTaxRateRecord) => item.totalRate ?? 0;
    const countyRate = selected.filter((item) => item.type === 'county').reduce((sum, item) => sum + rate(item), 0);
    const schoolRate = selected.filter((item) => item.type === 'school-district').reduce((sum, item) => sum + rate(item), 0);
    const otherRate = selected.filter((item) => item.type !== 'school-district').reduce((sum, item) => sum + rate(item), 0);
    return { countyRate, schoolRate, otherRate, combinedRate: schoolRate + otherRate };
  }, [selected]);

  const filteredSpecial = useMemo(() => {
    const needle = specialFilter.trim().toLowerCase();
    if (!summary) return [];
    return summary.specialDistricts
      .filter((item) => !needle || item.name.toLowerCase().includes(needle))
      .slice(0, 100);
  }, [summary, specialFilter]);

  const unavailableCount = summary
    ? [...summary.county, ...summary.cities, ...summary.schoolDistricts, ...summary.specialDistricts].filter((record) => !isApplicable(record)).length
    : 0;

  if (!countySlug) {
    return <div className="border-t border-border pt-5 text-sm leading-6 text-muted-foreground">Choose a county to load adopted rates reported to the Texas Comptroller.</div>;
  }

  return (
    <div className="border-t border-border pt-5">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-foreground">{title}</p>
          <p className="mt-1 max-w-3xl text-xs leading-5 text-muted-foreground">County rates are included automatically when a usable rate is reported. Choose the school district and city that serve the property, then add only the special districts that actually apply to the parcel.</p>
        </div>
        {summary ? <span className="text-xs font-semibold uppercase tracking-[0.12em] text-primary">{summary.year} finalized rates</span> : null}
      </div>

      {loading ? <p className="mt-4 text-sm text-muted-foreground">Loading official rates…</p> : null}
      {error ? <p className="mt-4 text-sm text-destructive">{error}</p> : null}

      {summary ? <div className="mt-5 space-y-5">
        {unavailableCount ? <p className="border-l-2 border-primary pl-3 text-xs leading-5 text-muted-foreground"><strong className="text-foreground">{unavailableCount} reported taxing {unavailableCount === 1 ? 'unit is' : 'units are'} withheld from automatic calculation.</strong> This includes not-reported, cross-source-conflict, and variable-rate records. They remain visible for research but must be verified against the parcel/local source before use.</p> : null}
        <div className="grid gap-4 md:grid-cols-2">
          <RateSelect label="School district" value={schoolSlug} onChange={setSchoolSlug} records={summary.schoolDistricts} placeholder="Choose the property's school district" />
          <RateSelect label="City / municipality" value={citySlug} onChange={setCitySlug} records={summary.cities} placeholder="Outside city limits / choose city" />
        </div>

        <details className="border-y border-border py-4">
          <summary className="cursor-pointer text-sm font-semibold">Special districts ({summary.specialDistricts.length} reported in county; {specialSlugs.length} selected)</summary>
          <p className="mt-3 text-xs leading-5 text-muted-foreground">Do not select every district in the county. A parcel normally belongs to only a subset. Confirm MUD, ESD, hospital, community-college, flood-control and other district membership on the appraisal/tax record. Unavailable or conflicting rates cannot be auto-applied.</p>
          <input type="search" value={specialFilter} onChange={(event) => setSpecialFilter(event.target.value)} placeholder="Filter special districts" className="mt-4 w-full border-0 border-b border-border bg-background px-0 py-3 text-sm outline-none focus:border-primary" />
          <div className="mt-4 grid max-h-80 gap-x-6 overflow-y-auto sm:grid-cols-2">
            {filteredSpecial.map((record) => {
              const checked = specialSlugs.includes(record.slug);
              const applicable = isApplicable(record);
              return <label key={record.id} className={`flex gap-3 border-t border-border py-3 text-sm ${applicable ? '' : 'opacity-70'}`}>
                <input type="checkbox" checked={checked} disabled={!applicable} onChange={(event) => setSpecialSlugs((current) => event.target.checked ? [...current, record.slug] : current.filter((slug) => slug !== record.slug))} />
                <span><strong className="block font-medium">{record.name}</strong><span className="text-xs text-muted-foreground">{formatRate(record)}</span></span>
              </label>;
            })}
          </div>
          {summary.specialDistricts.length > 100 && !specialFilter ? <p className="mt-3 text-xs text-muted-foreground">Showing the first 100. Search by district name to narrow the list.</p> : null}
        </details>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <RateFact label="County" value={totals.countyRate} />
          <RateFact label="School" value={totals.schoolRate} />
          <RateFact label="Other selected" value={Math.max(0, totals.otherRate - totals.countyRate)} />
          <RateFact label="Combined selected" value={totals.combinedRate} emphasize />
        </div>

        <button type="button" disabled={!selected.length} onClick={() => onApply({ year: summary.year, ...totals, selectedUnits: selected })} className="border-b border-primary pb-1 text-sm font-semibold text-primary disabled:cursor-not-allowed disabled:opacity-50">Apply these official rates to calculator</button>
        <p className="text-xs leading-5 text-muted-foreground">Source: Texas Comptroller Property Tax Assistance Division statewide Tax Rates and Levies. Rates are dollars per $100 of taxable value. Exact parcel jurisdiction and taxable value still control the actual bill.</p>
      </div> : null}
    </div>
  );
}

function RateSelect({ label, value, onChange, records, placeholder }: { label: string; value: string; onChange: (value: string) => void; records: TexasTaxRateRecord[]; placeholder: string }) {
  return <label className="block text-sm font-semibold"><span>{label}</span><select className="mt-2 w-full border-0 border-b border-border bg-background px-0 py-3 text-sm outline-none focus:border-primary" value={value} onChange={(event) => onChange(event.target.value)}><option value="">{placeholder}</option>{records.map((record) => <option key={record.id} value={record.slug} disabled={!isApplicable(record)}>{record.name} — {formatRate(record)}</option>)}</select></label>;
}

function formatRate(record: TexasTaxRateRecord) {
  if (record.rateUnavailable) return record.sourceStatus === 'cross-source-conflict' ? 'state-source conflict — verify locally' : 'rate not reported — verify locally';
  if (record.totalRate != null && !record.variableRate) return `${record.totalRate.toFixed(6)} per $100`;
  if (record.rateVariants.length) return `variable reported rates: ${record.rateVariants.map((rate) => rate.toFixed(6)).join(', ')} — verify parcel`;
  return 'parcel-specific rate verification required';
}

function RateFact({ label, value, emphasize = false }: { label: string; value: number; emphasize?: boolean }) {
  return <div className="border-t border-border pt-3"><span className="text-xs uppercase tracking-[0.12em] text-muted-foreground">{label}</span><strong className={`mt-1 block font-display text-2xl ${emphasize ? 'text-primary' : ''}`}>{value.toFixed(6)}</strong><span className="text-xs text-muted-foreground">per $100</span></div>;
}
