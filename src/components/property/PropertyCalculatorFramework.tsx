import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react';
import { Link } from '@tanstack/react-router';

import { TEXAS_COUNTIES } from '@/data/texas-places';

export type CalculatorStateValue = string | number | boolean;
export type CalculatorState = Record<string, CalculatorStateValue>;

const moneyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0,
});

export function formatMoney(value: number) {
  return moneyFormatter.format(Number.isFinite(value) ? value : 0);
}

function NumericField({
  label,
  value,
  onChange,
  step = 1000,
  min = 0,
  max,
  prefix,
  suffix,
}: {
  label: string;
  value: number;
  onChange: (value: number) => void;
  step?: number;
  min?: number;
  max?: number;
  prefix?: string;
  suffix?: string;
}) {
  return (
    <label className="block border-t border-border pt-4 text-sm font-semibold">
      <span>{label}</span>
      <span className="mt-2 flex items-center border-b border-border focus-within:border-primary">
        {prefix ? <span className="pr-2 text-muted-foreground" aria-hidden="true">{prefix}</span> : null}
        <input
          className="min-w-0 flex-1 border-0 bg-transparent px-0 py-3 text-lg outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          type="number"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(event) => onChange(Number(event.target.value) || 0)}
        />
        {suffix ? <span className="pl-2 text-muted-foreground" aria-hidden="true">{suffix}</span> : null}
      </span>
    </label>
  );
}

export function CurrencyInput(props: Omit<Parameters<typeof NumericField>[0], 'prefix'>) {
  return <NumericField {...props} prefix="$" />;
}

export function PercentageInput(props: Omit<Parameters<typeof NumericField>[0], 'suffix'>) {
  return <NumericField {...props} suffix="%" />;
}

export function NumberInput(props: Parameters<typeof NumericField>[0]) {
  return <NumericField {...props} />;
}

export function CalculatorSlider({
  label,
  value,
  onChange,
  min,
  max,
  step = 1,
  valueLabel,
}: {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min: number;
  max: number;
  step?: number;
  valueLabel?: (value: number) => string;
}) {
  return (
    <label className="block border-t border-border pt-4 text-sm font-semibold">
      <span className="flex items-center justify-between gap-4">
        <span>{label}</span>
        <span className="font-normal text-muted-foreground">{valueLabel ? valueLabel(value) : value}</span>
      </span>
      <input
        className="mt-4 w-full accent-current"
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
      />
    </label>
  );
}

export function CountySelector({
  label = 'Texas county',
  value,
  onChange,
}: {
  label?: string;
  value: string;
  onChange: (slug: string) => void;
}) {
  return (
    <label className="block border-t border-border pt-4 text-sm font-semibold">
      <span>{label}</span>
      <select
        className="mt-2 w-full border-0 border-b border-border bg-background px-0 py-3 text-base outline-none focus:border-primary"
        value={value}
        onChange={(event) => onChange(event.target.value)}
      >
        <option value="">Choose a county</option>
        {TEXAS_COUNTIES.map((county) => <option key={county.slug} value={county.slug}>{county.name}</option>)}
      </select>
    </label>
  );
}

export type ExemptionOption = { value: string; label: string };

export function ExemptionSelector({
  label = 'Exemption scenario',
  value,
  onChange,
  options,
}: {
  label?: string;
  value: string;
  onChange: (value: string) => void;
  options: ExemptionOption[];
}) {
  return (
    <label className="block border-t border-border pt-4 text-sm font-semibold">
      <span>{label}</span>
      <select
        className="mt-2 w-full border-0 border-b border-border bg-background px-0 py-3 text-base outline-none focus:border-primary"
        value={value}
        onChange={(event) => onChange(event.target.value)}
      >
        {options.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
      </select>
    </label>
  );
}

export function CalculatorResult({
  label,
  value,
  note,
}: {
  label: string;
  value: string;
  note?: string;
}) {
  return (
    <div className="border-t border-border py-4" role="status" aria-live="polite" aria-atomic="true">
      <span className="text-xs uppercase tracking-[0.14em] text-muted-foreground">{label}</span>
      <strong className="mt-1 block font-display text-3xl text-primary">{value}</strong>
      {note ? <p className="mt-1 text-xs leading-5 text-muted-foreground">{note}</p> : null}
    </div>
  );
}

export function ResultGrid({ children }: { children: ReactNode }) {
  return <div className="grid gap-x-6 md:grid-cols-3">{children}</div>;
}

export function ComparisonBars({
  items,
  valueFormatter = formatMoney,
}: {
  items: { label: string; value: number }[];
  valueFormatter?: (value: number) => string;
}) {
  const max = Math.max(1, ...items.map((item) => Math.max(0, item.value)));
  return (
    <div className="space-y-4" aria-label="Result comparison chart">
      {items.map((item) => {
        const width = Math.max(2, Math.min(100, (Math.max(0, item.value) / max) * 100));
        return (
          <div key={item.label}>
            <div className="mb-1 flex items-center justify-between gap-4 text-sm">
              <span>{item.label}</span>
              <strong>{valueFormatter(item.value)}</strong>
            </div>
            <div className="h-2 overflow-hidden bg-muted" aria-hidden="true">
              <div className="h-full bg-primary" style={{ width: `${width}%` }} />
            </div>
          </div>
        );
      })}
    </div>
  );
}

export function CalculatorSection({
  eyebrow,
  title,
  copy,
  children,
}: {
  eyebrow: string;
  title: string;
  copy?: string;
  children: ReactNode;
}) {
  return (
    <section className="grid gap-8 py-10 lg:grid-cols-[15rem_1fr]">
      <div>
        <p className="eyebrow text-primary">{eyebrow}</p>
        <h2 className="mt-2 font-display text-3xl leading-tight">{title}</h2>
        {copy ? <p className="mt-3 text-sm leading-6 text-muted-foreground">{copy}</p> : null}
      </div>
      <div className="space-y-6">{children}</div>
    </section>
  );
}

function encodeState(state: CalculatorState) {
  const params = new URLSearchParams();
  Object.entries(state).forEach(([key, value]) => params.set(key, String(value)));
  return params;
}

export function readCalculatorStateFromUrl<T extends CalculatorState>(defaults: T, search = typeof window === 'undefined' ? '' : window.location.search): T {
  const params = new URLSearchParams(search);
  const result = { ...defaults } as CalculatorState;
  Object.entries(defaults).forEach(([key, defaultValue]) => {
    const raw = params.get(key);
    if (raw === null) return;
    if (typeof defaultValue === 'number') result[key] = Number.isFinite(Number(raw)) ? Number(raw) : defaultValue;
    else if (typeof defaultValue === 'boolean') result[key] = raw === 'true';
    else result[key] = raw;
  });
  return result as T;
}

export function useCalculatorPersistence<T extends CalculatorState>({
  storageKey,
  state,
  onRestore,
}: {
  storageKey: string;
  state: T;
  onRestore: (state: T) => void;
}) {
  const [status, setStatus] = useState('');

  const save = useCallback(() => {
    try {
      localStorage.setItem(storageKey, JSON.stringify(state));
      setStatus('Saved on this device.');
    } catch {
      setStatus('Could not save on this device.');
    }
  }, [state, storageKey]);

  const restore = useCallback(() => {
    try {
      const raw = localStorage.getItem(storageKey);
      if (!raw) {
        setStatus('No saved calculator inputs found.');
        return;
      }
      onRestore(JSON.parse(raw) as T);
      setStatus('Saved inputs restored.');
    } catch {
      setStatus('Saved inputs could not be restored.');
    }
  }, [onRestore, storageKey]);

  const share = useCallback(async () => {
    if (typeof window === 'undefined') return;
    const url = new URL(window.location.href);
    url.search = encodeState(state).toString();
    try {
      await navigator.clipboard.writeText(url.toString());
      setStatus('Share link copied.');
    } catch {
      window.history.replaceState({}, '', url);
      setStatus('Shareable inputs added to the page URL.');
    }
  }, [state]);

  const print = useCallback(() => {
    if (typeof window !== 'undefined') window.print();
  }, []);

  return { save, restore, share, print, status };
}

export function CalculatorActions({
  onSave,
  onRestore,
  onShare,
  onPrint,
  status,
}: {
  onSave: () => void;
  onRestore: () => void;
  onShare: () => void;
  onPrint: () => void;
  status?: string;
}) {
  const buttonClass = 'border-b border-primary pb-1 text-sm font-semibold text-primary';
  return (
    <div className="border-y border-border py-4 print:hidden">
      <div className="flex flex-wrap gap-x-6 gap-y-3">
        <button type="button" className={buttonClass} onClick={onSave}>Save inputs</button>
        <button type="button" className={buttonClass} onClick={onRestore}>Restore saved</button>
        <button type="button" className={buttonClass} onClick={onShare}>Copy share link</button>
        <button type="button" className={buttonClass} onClick={onPrint}>Print results</button>
      </div>
      {status ? <p className="mt-3 text-xs text-muted-foreground" role="status">{status}</p> : null}
    </div>
  );
}

export function CalculatorCountyLink({ countySlug }: { countySlug: string }) {
  if (!countySlug) return null;
  return <Link to="/property-tax/county/$county" params={{ county: countySlug }} className="text-sm font-semibold underline decoration-primary/50 underline-offset-4">Open this county’s property-tax guide →</Link>;
}

export function useUrlStateDefaults<T extends CalculatorState>(defaults: T) {
  return useMemo(() => readCalculatorStateFromUrl(defaults), []);
}

export function useDocumentTitleForPrint(title: string) {
  useEffect(() => {
    if (typeof document === 'undefined') return;
    const original = document.title;
    return () => { document.title = original; };
  }, [title]);
}
