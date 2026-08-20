import { useState } from 'react';
import type { TexasTaxRateRecord, TexasTaxingUnitType } from '@/data/property/texas-tax-rates.generated';

type SearchResponse = { results?: TexasTaxRateRecord[]; message?: string };

export function TaxingUnitSearch({
  label = 'Search taxing units',
  type,
  onSelect,
  placeholder = 'Enter a city, ISD, MUD or district name',
  allowVariableSelection = false,
}: {
  label?: string;
  type?: TexasTaxingUnitType;
  onSelect: (record: TexasTaxRateRecord) => void;
  placeholder?: string;
  allowVariableSelection?: boolean;
}) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<TexasTaxRateRecord[]>([]);
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);

  async function runSearch() {
    const trimmed = query.trim();
    if (trimmed.length < 2) {
      setStatus('Enter at least two characters.');
      return;
    }
    setLoading(true);
    setStatus('');
    try {
      const response = await fetch(`/api/property-tax-rates?q=${encodeURIComponent(trimmed)}`);
      const body = await response.json() as SearchResponse;
      if (!response.ok) throw new Error(body.message || `Search failed (${response.status})`);
      const filtered = (body.results ?? []).filter((record) => !type || record.type === type);
      setResults(filtered.slice(0, 50));
      setStatus(filtered.length ? `${filtered.length} match${filtered.length === 1 ? '' : 'es'}` : 'No matching taxing units found.');
    } catch (error) {
      setStatus(error instanceof Error ? error.message : 'Taxing-unit search is temporarily unavailable.');
      setResults([]);
    } finally {
      setLoading(false);
    }
  }

  return <div className="border-t border-border pt-4">
    <label className="block text-sm font-semibold"><span>{label}</span><div className="mt-2 flex gap-3"><input value={query} onChange={(event) => setQuery(event.target.value)} onKeyDown={(event) => { if (event.key === 'Enter') { event.preventDefault(); void runSearch(); } }} placeholder={placeholder} className="min-w-0 flex-1 border-0 border-b border-border bg-background px-0 py-3 text-sm outline-none focus:border-primary"/><button type="button" onClick={() => void runSearch()} disabled={loading} className="border-b border-primary text-sm font-semibold text-primary disabled:opacity-50">{loading ? 'Searching…' : 'Search'}</button></div></label>
    {status ? <p className="mt-3 text-xs text-muted-foreground">{status}</p> : null}
    {results.length ? <div className="mt-3 max-h-72 overflow-y-auto border-y border-border">{results.map((record) => {
      const applicable = !record.rateUnavailable && !record.variableRate && record.totalRate != null;
      const selectable = applicable || allowVariableSelection;
      const rateLabel = record.rateUnavailable
        ? record.sourceStatus === 'cross-source-conflict' ? 'state-source conflict — verify locally' : 'rate not reported — verify locally'
        : applicable
          ? `${record.totalRate!.toFixed(6)} per $100`
          : record.rateVariants.length
            ? `variable rates: ${record.rateVariants.map((rate) => rate.toFixed(6)).join(', ')} — verify parcel`
            : 'parcel-specific rate verification required';
      return <button key={record.id} type="button" disabled={!selectable} onClick={() => onSelect(record)} className="block w-full border-b border-border px-0 py-3 text-left last:border-b-0 hover:text-primary disabled:cursor-not-allowed disabled:opacity-60"><strong className="block text-sm">{record.name}</strong><span className="mt-1 block text-xs text-muted-foreground">{record.type.replaceAll('-', ' ')} · {rateLabel} · {record.year}</span></button>;
    })}</div> : null}
  </div>;
}
