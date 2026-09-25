import { useCallback, useState, type ReactNode } from 'react';

import type { ValidationIssue } from '@/lib/financial/validation';

export type CalculatorPrimitive = string | number | boolean;
export type CalculatorState = Record<string, CalculatorPrimitive>;
export type ResultValue = { label: string; value: string; note?: string; emphasis?: boolean };
export type BreakdownValue = { label: string; value: number };

const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0,
});

export function formatCalculatorMoney(value: number) {
  return currencyFormatter.format(Number.isFinite(value) ? value : 0);
}

export function readCalculatorUrlState<T extends CalculatorState>(defaults: T): T {
  if (typeof window === 'undefined') return defaults;
  const params = new URLSearchParams(window.location.search);
  const next = { ...defaults };
  for (const key of Object.keys(defaults) as Array<keyof T>) {
    const raw = params.get(String(key));
    if (raw === null) continue;
    const sample = defaults[key];
    if (typeof sample === 'number') {
      const parsed = Number(raw);
      if (Number.isFinite(parsed)) next[key] = parsed as T[keyof T];
    } else if (typeof sample === 'boolean') {
      next[key] = (raw === 'true') as T[keyof T];
    } else {
      next[key] = raw as T[keyof T];
    }
  }
  return next;
}

function encodeCalculatorState(state: CalculatorState) {
  const params = new URLSearchParams();
  Object.entries(state).forEach(([key, value]) => params.set(key, String(value)));
  return params;
}

export function FinancialInput({
  label,
  value,
  onChange,
  step = 1,
  min = 0,
  max,
  prefix,
  suffix,
  helper,
}: {
  label: string;
  value: number;
  onChange: (value: number) => void;
  step?: number;
  min?: number;
  max?: number;
  prefix?: string;
  suffix?: string;
  helper?: string;
}) {
  return (
    <label className="block min-w-0 border-t border-border pt-4">
      <span className="text-sm font-semibold">{label}</span>
      <span className="mt-2 flex min-h-11 items-center border-b border-border focus-within:border-primary">
        {prefix ? <span className="pr-2 text-muted-foreground" aria-hidden="true">{prefix}</span> : null}
        <input
          className="min-w-0 flex-1 bg-transparent px-0 py-3 text-base outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          type="number"
          inputMode="decimal"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(event) => {
            const parsed = Number(event.target.value);
            onChange(Number.isFinite(parsed) ? parsed : 0);
          }}
        />
        {suffix ? <span className="pl-2 text-sm text-muted-foreground" aria-hidden="true">{suffix}</span> : null}
      </span>
      {helper ? <span className="mt-2 block text-xs leading-5 text-muted-foreground">{helper}</span> : null}
    </label>
  );
}

export function CurrencyInput(props: Omit<Parameters<typeof FinancialInput>[0], 'prefix'>) {
  return <FinancialInput {...props} prefix="$" />;
}

export function PercentageInput(props: Omit<Parameters<typeof FinancialInput>[0], 'suffix'>) {
  return <FinancialInput {...props} suffix="%" />;
}

export function AdvancedInputs({ children, label = 'Advanced assumptions' }: { children: ReactNode; label?: string }) {
  return (
    <details className="border-t border-border pt-5">
      <summary className="cursor-pointer select-none text-sm font-semibold text-primary">{label}</summary>
      <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{children}</div>
    </details>
  );
}

export function ValidationSummary({ issues }: { issues: ValidationIssue[] }) {
  if (!issues.length) return null;
  return (
    <div className="mt-5 border-l-2 border-destructive pl-4" role="alert">
      <strong className="text-sm">Check these inputs</strong>
      <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
        {issues.map((issue) => <li key={issue.field + issue.message}>{issue.message}</li>)}
      </ul>
    </div>
  );
}

export function CalculatorResults({ values }: { values: ResultValue[] }) {
  return (
    <section className="mt-8" aria-live="polite" aria-atomic="true">
      <h2 className="sr-only">Updated estimate</h2>
      <dl className="grid sm:grid-cols-2 lg:grid-cols-3">
        {values.map((item, index) => (
          <div key={item.label} className={'border-b border-border py-5 sm:px-5 ' + (index ? 'sm:border-l sm:border-border' : '')}>
            <dt className="text-xs uppercase tracking-[0.14em] text-muted-foreground">{item.label}</dt>
            <dd className={'mt-2 font-display font-bold text-primary ' + (item.emphasis ? 'text-4xl' : 'text-3xl')}>{item.value}</dd>
            {item.note ? <dd className="mt-2 text-xs leading-5 text-muted-foreground">{item.note}</dd> : null}
          </div>
        ))}
      </dl>
    </section>
  );
}

export function BreakdownChart({ items }: { items: BreakdownValue[] }) {
  const visible = items.filter((item) => item.value > 0);
  const total = visible.reduce((sum, item) => sum + item.value, 0);
  if (!visible.length || total <= 0) return null;
  return (
    <section className="mt-8 border-t border-border pt-7" aria-labelledby="calculator-breakdown-chart">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="eyebrow text-primary">Visual breakdown</p>
          <h3 id="calculator-breakdown-chart" className="mt-2 font-display text-2xl">Where the monthly total goes</h3>
        </div>
        <span className="text-sm text-muted-foreground">{formatCalculatorMoney(total)}/mo total</span>
      </div>
      <div className="mt-6 space-y-4">
        {visible.map((item) => {
          const share = item.value / total * 100;
          return (
            <div key={item.label}>
              <div className="mb-1 flex flex-wrap items-center justify-between gap-2 text-sm">
                <span>{item.label}</span>
                <strong>{formatCalculatorMoney(item.value)} · {share.toFixed(1)}%</strong>
              </div>
              <div className="h-2 overflow-hidden bg-muted" aria-hidden="true">
                <div className="h-full bg-primary" style={{ width: Math.max(2, share) + '%' }} />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export function BreakdownTable({ items }: { items: BreakdownValue[] }) {
  const visible = items.filter((item) => item.value > 0);
  const total = visible.reduce((sum, item) => sum + item.value, 0);
  if (!visible.length || total <= 0) return null;
  return (
    <div className="mt-7 overflow-x-auto">
      <table className="w-full min-w-[34rem] border-collapse text-sm">
        <caption className="sr-only">Monthly and annual calculator breakdown</caption>
        <thead>
          <tr className="border-b border-border text-left text-xs uppercase tracking-[0.12em] text-muted-foreground">
            <th className="py-3 pr-4">Cost</th>
            <th className="py-3 pr-4 text-right">Monthly</th>
            <th className="py-3 pr-4 text-right">Annual</th>
            <th className="py-3 text-right">Share</th>
          </tr>
        </thead>
        <tbody>
          {visible.map((item) => (
            <tr key={item.label} className="border-b border-border/60">
              <td className="py-3 pr-4 font-medium">{item.label}</td>
              <td className="py-3 pr-4 text-right">{formatCalculatorMoney(item.value)}</td>
              <td className="py-3 pr-4 text-right">{formatCalculatorMoney(item.value * 12)}</td>
              <td className="py-3 text-right">{(item.value / total * 100).toFixed(1)}%</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function SensitivityTable({ items }: { items: Array<{ label: string; value: number; delta: number }> }) {
  if (!items.length) return null;
  return (
    <section className="mt-8 border-t border-border pt-7">
      <p className="eyebrow text-primary">Sensitivity check</p>
      <h3 className="mt-2 font-display text-2xl">What changes the result most?</h3>
      <div className="mt-5 overflow-x-auto">
        <table className="w-full min-w-[32rem] text-sm">
          <thead><tr className="border-b border-border text-left"><th className="py-3 pr-4">Scenario</th><th className="py-3 pr-4 text-right">New monthly total</th><th className="py-3 text-right">Change</th></tr></thead>
          <tbody>{items.map((item) => <tr key={item.label} className="border-b border-border/60"><td className="py-3 pr-4">{item.label}</td><td className="py-3 pr-4 text-right">{formatCalculatorMoney(item.value)}</td><td className="py-3 text-right">{item.delta >= 0 ? '+' : ''}{formatCalculatorMoney(item.delta)}</td></tr>)}</tbody>
        </table>
      </div>
    </section>
  );
}

type Scenario = { label: string; summary: Record<string, string> };

function useCalculatorWorkspace<T extends CalculatorState>({
  storageKey,
  state,
  defaults,
  onRestore,
}: {
  storageKey: string;
  state: T;
  defaults: T;
  onRestore: (state: T) => void;
}) {
  const [status, setStatus] = useState('');
  const [scenarios, setScenarios] = useState<Scenario[]>([]);

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
      if (!raw) return setStatus('No saved inputs found.');
      onRestore({ ...defaults, ...JSON.parse(raw) } as T);
      setStatus('Saved inputs restored.');
    } catch {
      setStatus('Saved inputs could not be restored.');
    }
  }, [defaults, onRestore, storageKey]);

  const share = useCallback(async () => {
    if (typeof window === 'undefined') return;
    const url = new URL(window.location.href);
    url.search = encodeCalculatorState(state).toString();
    try {
      await navigator.clipboard.writeText(url.toString());
      setStatus('Share link copied.');
    } catch {
      window.history.replaceState({}, '', url);
      setStatus('Shareable inputs added to the page URL.');
    }
  }, [state]);

  const reset = useCallback(() => {
    onRestore({ ...defaults });
    setStatus('Calculator reset.');
  }, [defaults, onRestore]);

  const print = useCallback(() => {
    if (typeof window !== 'undefined') window.print();
  }, []);

  const addScenario = useCallback((summary: Record<string, string>) => {
    setScenarios((current) => {
      const next = [...current, { label: 'Scenario ' + (current.length + 1), summary }];
      return next.slice(-3).map((scenario, index) => ({ ...scenario, label: 'Scenario ' + (index + 1) }));
    });
    setStatus('Scenario added for comparison.');
  }, []);

  return { save, restore, share, reset, print, addScenario, scenarios, status };
}

function CalculatorActions({
  onSave,
  onRestore,
  onShare,
  onReset,
  onPrint,
  onAddScenario,
  status,
}: {
  onSave: () => void;
  onRestore: () => void;
  onShare: () => void;
  onReset: () => void;
  onPrint: () => void;
  onAddScenario: () => void;
  status: string;
}) {
  const buttonClass = 'min-h-11 border-b border-primary px-1 text-sm font-semibold text-primary';
  return (
    <div className="mt-8 border-y border-border py-4 print:hidden">
      <div className="flex flex-wrap gap-x-5 gap-y-2">
        <button type="button" className={buttonClass} onClick={onAddScenario}>Add comparison</button>
        <button type="button" className={buttonClass} onClick={onSave}>Save inputs</button>
        <button type="button" className={buttonClass} onClick={onRestore}>Restore saved</button>
        <button type="button" className={buttonClass} onClick={onShare}>Copy share link</button>
        <button type="button" className={buttonClass} onClick={onPrint}>Print results</button>
        <button type="button" className={buttonClass} onClick={onReset}>Reset</button>
      </div>
      {status ? <p className="mt-3 text-xs text-muted-foreground" role="status">{status}</p> : null}
    </div>
  );
}

function ScenarioComparison({ scenarios }: { scenarios: Scenario[] }) {
  if (!scenarios.length) return null;
  return (
    <section className="mt-8 border-t border-border pt-7" aria-labelledby="scenario-comparison-heading">
      <p className="eyebrow text-primary">Scenario comparison</p>
      <h3 id="scenario-comparison-heading" className="mt-2 font-display text-2xl">Compare up to three snapshots</h3>
      <div className="mt-5 grid gap-4 md:grid-cols-3">
        {scenarios.map((scenario) => (
          <div key={scenario.label} className="border border-border p-5">
            <strong className="font-display text-xl">{scenario.label}</strong>
            <dl className="mt-4 space-y-3">{Object.entries(scenario.summary).map(([label, value]) => <div key={label}><dt className="text-xs uppercase tracking-[0.12em] text-muted-foreground">{label}</dt><dd className="mt-1 font-semibold">{value}</dd></div>)}</dl>
          </div>
        ))}
      </div>
    </section>
  );
}

export function MethodologyPanel({
  formula,
  assumptions,
  sources = [],
}: {
  formula: string;
  assumptions: string[];
  sources?: string[];
}) {
  return (
    <details className="mt-8 border-t border-border pt-6">
      <summary className="cursor-pointer text-sm font-semibold text-primary">How TexasDefined calculates this</summary>
      <div className="mt-5 max-w-3xl space-y-4 text-sm leading-6 text-muted-foreground">
        <p><strong className="text-foreground">Method.</strong> {formula}</p>
        <div><strong className="text-foreground">Assumptions.</strong><ul className="mt-2 list-disc space-y-1 pl-5">{assumptions.map((item) => <li key={item}>{item}</li>)}</ul></div>
        {sources.length ? <div><strong className="text-foreground">Data and sources.</strong><ul className="mt-2 list-disc space-y-1 pl-5">{sources.map((item) => <li key={item}>{item}</li>)}</ul></div> : null}
      </div>
    </details>
  );
}

export function FinancialCalculatorScaffold<T extends CalculatorState>({
  storageKey,
  state,
  defaults,
  onRestore,
  note,
  issues,
  results,
  summary,
  breakdown,
  sensitivity,
  methodology,
  children,
}: {
  storageKey: string;
  state: T;
  defaults: T;
  onRestore: (state: T) => void;
  note: string;
  issues: ValidationIssue[];
  results: ResultValue[];
  summary: Record<string, string>;
  breakdown?: BreakdownValue[];
  sensitivity?: Array<{ label: string; value: number; delta: number }>;
  methodology: { formula: string; assumptions: string[]; sources?: string[] };
  children: ReactNode;
}) {
  const workspace = useCalculatorWorkspace({ storageKey, state, defaults, onRestore });
  return (
    <>
      <section className="mt-10 border-y border-border py-7">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{children}</div>
        <p className="mt-6 border-b border-border pb-6 text-sm leading-6 text-muted-foreground"><strong className="text-foreground">A good starting point.</strong> {note}</p>
      </section>
      <ValidationSummary issues={issues} />
      <CalculatorResults values={results} />
      {breakdown?.length ? <><BreakdownChart items={breakdown} /><BreakdownTable items={breakdown} /></> : null}
      {sensitivity?.length ? <SensitivityTable items={sensitivity} /> : null}
      <CalculatorActions onSave={workspace.save} onRestore={workspace.restore} onShare={workspace.share} onReset={workspace.reset} onPrint={workspace.print} onAddScenario={() => workspace.addScenario(summary)} status={workspace.status} />
      <ScenarioComparison scenarios={workspace.scenarios} />
      <MethodologyPanel {...methodology} />
    </>
  );
}
