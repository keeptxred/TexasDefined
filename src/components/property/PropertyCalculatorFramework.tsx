import { lazy, Suspense, useCallback, useEffect, useMemo, useState, type ReactNode } from 'react';
import { Link } from '@tanstack/react-router';

import type { CountySelectorFieldProps } from '@/components/property/CountySelectorField';

const LazyCountySelectorField = lazy(() => import('@/components/property/CountySelectorField').then((module) => ({ default: module.CountySelectorField })));

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
  help,
  error,
}: {
  label: string;
  value: number;
  onChange: (value: number) => void;
  step?: number;
  min?: number;
  max?: number;
  prefix?: string;
  suffix?: string;
  help?: string;
  error?: string;
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
          aria-invalid={Boolean(error)}
          onChange={(event) => onChange(Number(event.target.value) || 0)}
        />
        {suffix ? <span className="pl-2 text-muted-foreground" aria-hidden="true">{suffix}</span> : null}
      </span>
      {error ? <span className="mt-2 block text-xs font-normal text-destructive" role="alert">{error}</span> : help ? <span className="mt-2 block text-xs font-normal leading-5 text-muted-foreground">{help}</span> : null}
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

export function CountySelector(props: CountySelectorFieldProps) {
  return (
    <Suspense fallback={
      <label className="block border-t border-border pt-4 text-sm font-semibold">
        <span>{props.label ?? 'Texas county'}</span>
        <select
          aria-label={`${props.label ?? 'Texas county'} loading`}
          className="mt-2 w-full border-0 border-b border-border bg-background px-0 py-3 text-base outline-none"
          disabled
          value=""
          onChange={() => undefined}
        >
          <option value="">Loading counties…</option>
        </select>
      </label>
    }>
      <LazyCountySelectorField {...props} />
    </Suspense>
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
      const parsed = JSON.parse(raw) as Record<string, unknown>;
      const restored = { ...state } as CalculatorState;
      Object.entries(state).forEach(([key, currentValue]) => {
        const savedValue = parsed[key];
        if (typeof currentValue === 'number' && typeof savedValue === 'number' && Number.isFinite(savedValue)) restored[key] = savedValue;
        else if (typeof currentValue === 'boolean' && typeof savedValue === 'boolean') restored[key] = savedValue;
        else if (typeof currentValue === 'string' && typeof savedValue === 'string') restored[key] = savedValue;
      });
      onRestore(restored as T);
      setStatus('Saved inputs restored.');
    } catch {
      setStatus('Saved inputs could not be restored.');
    }
  }, [onRestore, state, storageKey]);

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
  onReset,
}: {
  onSave: () => void;
  onRestore: () => void;
  onShare: () => void;
  onPrint: () => void;
  status?: string;
  onReset?: () => void;
}) {
  const buttonClass = 'border-b border-primary pb-1 text-sm font-semibold text-primary';
  return (
    <div className="border-y border-border py-4 print:hidden">
      <div className="flex flex-wrap gap-x-6 gap-y-3">
        <button type="button" className={buttonClass} onClick={onSave}>Save inputs</button>
        <button type="button" className={buttonClass} onClick={onRestore}>Restore saved</button>
        <button type="button" className={buttonClass} onClick={onShare}>Copy share link</button>
        <button type="button" className={buttonClass} onClick={onPrint}>Print results</button>
        {onReset ? <button type="button" className={buttonClass} onClick={onReset}>Reset</button> : null}
      </div>
      {status ? <p className="mt-3 text-xs text-muted-foreground" role="status">{status}</p> : null}
    </div>
  );
}


export type BreakdownItem = { label: string; value: number; note?: string };

export function BreakdownTable({ items, totalLabel = 'Total', total }: { items: BreakdownItem[]; totalLabel?: string; total?: number }) {
  const computedTotal = total ?? items.reduce((sum, item) => sum + item.value, 0);
  return (
    <div className="overflow-x-auto border-y border-border">
      <table className="w-full text-sm">
        <caption className="sr-only">Calculation breakdown</caption>
        <tbody className="divide-y divide-border">
          {items.map((item) => <tr key={item.label}><th scope="row" className="py-3 pr-4 text-left font-medium">{item.label}{item.note ? <span className="mt-1 block text-xs font-normal text-muted-foreground">{item.note}</span> : null}</th><td className="py-3 text-right font-semibold">{formatMoney(item.value)}</td></tr>)}
        </tbody>
        <tfoot className="border-t border-border"><tr><th scope="row" className="py-4 pr-4 text-left font-semibold">{totalLabel}</th><td className="py-4 text-right font-display text-xl font-bold text-primary">{formatMoney(computedTotal)}</td></tr></tfoot>
      </table>
    </div>
  );
}

const breakdownClasses = ['bg-primary', 'bg-primary/80', 'bg-secondary', 'bg-accent', 'bg-foreground', 'bg-muted', 'bg-primary/80'] as const;

export function BreakdownChart({ items }: { items: BreakdownItem[] }) {
  const positive = items.filter((item) => item.value > 0);
  const total = positive.reduce((sum, item) => sum + item.value, 0);
  if (total <= 0) return null;
  return (
    <div className="space-y-3" aria-label="Visual calculation breakdown">
      <div className="flex h-4 w-full overflow-hidden bg-muted" aria-hidden="true">
        {positive.map((item, index) => <span key={item.label} className={breakdownClasses[index % breakdownClasses.length]} style={{ width: `${item.value / total * 100}%` }} />)}
      </div>
      <div className="grid gap-x-6 gap-y-2 sm:grid-cols-2">
        {positive.map((item, index) => <div key={item.label} className="flex min-w-0 items-center justify-between gap-3 text-sm"><span className="flex min-w-0 items-center gap-2 text-muted-foreground"><span className={`h-2.5 w-2.5 shrink-0 ${breakdownClasses[index % breakdownClasses.length]}`} aria-hidden="true"/><span className="min-w-0">{item.label}</span></span><strong className="shrink-0">{formatMoney(item.value)} <span className="font-normal text-muted-foreground">({(item.value / total * 100).toFixed(1)}%)</span></strong></div>)}
      </div>
    </div>
  );
}

export function CalculatorModeToggle({ advanced, onChange }: { advanced: boolean; onChange: (advanced: boolean) => void }) {
  return (
    <button type="button" className="mt-5 border-b border-primary py-3 text-sm font-semibold text-primary print:hidden" aria-expanded={advanced} onClick={() => onChange(!advanced)}>
      {advanced ? 'Hide advanced inputs' : 'Show advanced inputs'}
    </button>
  );
}

export function MethodologyPanel({ title = 'How TexasDefined calculates this', children }: { title?: string; children: ReactNode }) {
  return (
    <details className="mt-8 border-y border-border py-5">
      <summary className="cursor-pointer font-display text-xl font-semibold">{title}</summary>
      <div className="mt-4 max-w-3xl space-y-3 text-sm leading-6 text-muted-foreground">{children}</div>
    </details>
  );
}


export type SavedCalculatorScenario<T extends CalculatorState> = { id: string; label: string; state: T };

export function useCalculatorScenarios<T extends CalculatorState>({ storageKey, state, max = 3 }: { storageKey: string; state: T; max?: number }) {
  const [scenarios, setScenarios] = useState<SavedCalculatorScenario<T>[]>([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(storageKey);
      if (raw) setScenarios((JSON.parse(raw) as SavedCalculatorScenario<T>[]).slice(0, max));
    } catch {
      setScenarios([]);
    }
  }, [max, storageKey]);

  const persist = useCallback((next: SavedCalculatorScenario<T>[]) => {
    setScenarios(next);
    try { localStorage.setItem(storageKey, JSON.stringify(next)); } catch { /* comparison still works for this session */ }
  }, [storageKey]);

  const addCurrent = useCallback(() => {
    if (scenarios.length >= max) return;
    const used = new Set(scenarios.map((scenario) => scenario.label));
    const label = ['Scenario A', 'Scenario B', 'Scenario C'].find((candidate) => !used.has(candidate)) ?? `Scenario ${scenarios.length + 1}`;
    const next = [...scenarios, { id: `${Date.now()}-${scenarios.length + 1}`, label, state: { ...state } }];
    persist(next);
  }, [max, persist, scenarios, state]);

  const remove = useCallback((id: string) => persist(scenarios.filter((scenario) => scenario.id !== id)), [persist, scenarios]);
  const clear = useCallback(() => persist([]), [persist]);

  return { scenarios, addCurrent, remove, clear, atLimit: scenarios.length >= max };
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
