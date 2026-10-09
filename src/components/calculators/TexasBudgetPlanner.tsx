import { Fragment, useEffect, useMemo, useState } from 'react';
import {
  BUDGET_GROUPS, BUDGET_STORAGE_KEY, MAX_BUDGET_VALUE, calculateHouseholdBudget,
  createBudgetDefaults, migrateLegacyBudget, normalizeBudgetValue, sanitizeBudget,
  type BudgetKey, type BudgetState,
} from '@/lib/financial/budget-planner';
import { CurrencyInput, formatMoney } from '@/components/property/PropertyCalculatorFramework';

type Scenario = { label: 'A' | 'B'; budget: BudgetState };
const SCENARIO_KEY = 'texasdefined:budget:scenarios:v3';
const formatPercent = (number: number) => `${number.toFixed(1)}%`;

function readSaved(key: string) {
  try { return localStorage.getItem(key); } catch { return null; }
}

export function BudgetCalculator() {
  const [budget, setBudget] = useState<BudgetState>(createBudgetDefaults);
  const [expanded, setExpanded] = useState<string[]>(['income', 'housing', 'utilities', 'transport', 'food', 'debt', 'savings']);
  const [status, setStatus] = useState('');
  const [shareApproved, setShareApproved] = useState(false);
  const [scenarios, setScenarios] = useState<Scenario[]>([]);

  useEffect(() => {
    // Read URL or browser storage after hydration so SSR and initial client markup agree.
    const urlBudget = new URLSearchParams(window.location.search).get('b3');
    if (urlBudget && urlBudget.length <= 6000) {
      try {
        const value = JSON.parse(urlBudget);
        if (value && typeof value === 'object' && !Array.isArray(value)) {
          setBudget(sanitizeBudget(value));
          setStatus('Budget values loaded from the URL. Review before relying on them.');
        }
      } catch { setStatus('Invalid shared budget; using illustrative starting values.'); }
    } else if (!urlBudget && readSaved(BUDGET_STORAGE_KEY)) {
      // A saved budget should survive a page reload without requiring another click.
      try {
        setBudget(sanitizeBudget(JSON.parse(readSaved(BUDGET_STORAGE_KEY)!)));
        setStatus('Saved budget restored automatically from this browser.');
      } catch {
        setStatus('Saved budget could not be read. Reset or save a fresh budget.');
      }
    } else if (!urlBudget) {
      const legacy = readSaved('texasdefined:budget:v2');
      if (legacy) {
        try {
          const parsed = JSON.parse(legacy);
          if (parsed && typeof parsed === 'object' && !Array.isArray(parsed)) {
            setBudget(migrateLegacyBudget(parsed));
            setStatus('Previous calculator inputs imported. Review the expanded categories, then save.');
          }
        } catch { /* Keep illustrative defaults if former data cannot be read. */ }
      }
    }
    const previousScenarios = readSaved(SCENARIO_KEY);
    if (previousScenarios) {
      try {
        const raw = JSON.parse(previousScenarios);
        if (Array.isArray(raw)) {
          setScenarios(raw.filter(row => (row?.label === 'A' || row?.label === 'B') && row?.budget).slice(0, 2).map(row => ({ label: row.label as 'A' | 'B', budget: sanitizeBudget(row.budget) })));
        }
      } catch { /* Optional saved comparisons. */ }
    }
  }, []);

  const totals = useMemo(() => calculateHouseholdBudget(budget), [budget]);
  const onChange = (key: BudgetKey, value: number) => {
    setBudget(previous => ({ ...previous, [key]: normalizeBudgetValue(value) }));
    setShareApproved(false);
  };

  const save = () => {
    try {
      localStorage.setItem(BUDGET_STORAGE_KEY, JSON.stringify(budget));
      setStatus('Saved in this browser on this device, not to a Texas Defined account.');
    } catch { setStatus('Could not save locally. Browser storage may be disabled.'); }
  };
  const restore = () => {
    const saved = readSaved(BUDGET_STORAGE_KEY);
    if (!saved) { setStatus('No saved v3 budget was found on this device.'); return; }
    try {
      setBudget(sanitizeBudget(JSON.parse(saved)));
      setShareApproved(false);
      setStatus('Saved budget restored from this browser.');
    } catch { setStatus('Saved budget could not be restored.'); }
  };
  const reset = () => {
    setBudget(createBudgetDefaults());
    setShareApproved(false);
    setStatus('Reset to illustrative values. Your previously saved budget remains in local storage until overwritten.');
  };

  const share = async () => {
    if (!shareApproved) { setStatus('Read and acknowledge the URL privacy notice before sharing.'); return; }
    const url = new URL(window.location.pathname, window.location.origin);
    // Only user-entered budget amounts, no names or contact fields; URLs can still be recorded.
    url.searchParams.set('b3', JSON.stringify(budget));
    try {
      await navigator.clipboard.writeText(url.toString());
      setStatus('Budget share URL copied. Anyone with this URL can see the entered amounts.');
    } catch {
      setStatus('Clipboard access was denied. No budget was added to the browser URL.');
    }
  };

  const saveScenario = (label: 'A' | 'B') => {
    const next: Scenario[] = [...scenarios.filter(row => row.label !== label), { label, budget: { ...budget } }].sort((a, b) => a.label.localeCompare(b.label));
    setScenarios(next);
    try { localStorage.setItem(SCENARIO_KEY, JSON.stringify(next)); setStatus(`Scenario ${label} saved locally.`); }
    catch { setStatus(`Scenario ${label} stored for this page session only.`); }
  };
  const downloadCsv = () => {
    const rows = [['Category', 'Item', 'Entered USD', 'Period', 'Monthly USD']];
    for (const group of BUDGET_GROUPS) {
      for (const field of group.fields) {
        const annual = 'cadence' in field;
        rows.push([group.title, field.label, String(budget[field.key]), annual ? 'annual' : 'monthly', (budget[field.key] / (annual ? 12 : 1)).toFixed(2)]);
      }
    }
    rows.push(['Total', 'Monthly income', '', 'monthly', totals.income.toFixed(2)]);
    rows.push(['Total', 'Monthly expenses and bill reserves', '', 'monthly', totals.expenses.toFixed(2)]);
    rows.push(['Total', 'Monthly savings allocations', '', 'monthly', totals.savings.toFixed(2)]);
    rows.push(['Total', 'Remaining after allocations', '', 'monthly', totals.remaining.toFixed(2)]);
    const csv = rows.map(row => row.map(value => `"${value.replace(/"/g, '""')}"`).join(',')).join('\r\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const element = document.createElement('a');
    element.href = url; element.download = 'texas-household-budget.csv';
    document.body.appendChild(element); element.click(); element.remove();
    URL.revokeObjectURL(url);
    setStatus('CSV created on your device. Keep the file private if it contains sensitive financial amounts.');
  };

  const actionClass = 'inline-flex items-center justify-center border border-border px-4 py-2 text-sm font-semibold transition-colors hover:border-primary hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary';
  return (
    <div className="mt-8 space-y-9">
      <section className="border-y border-border bg-surface p-5 sm:p-7 print:hidden" aria-labelledby="budget-start-heading">
        <p className="eyebrow text-primary">Your household, your numbers</p>
        <h2 id="budget-start-heading" className="mt-2 font-display text-3xl">Build a monthly budget</h2>
        <p className="mt-3 max-w-3xl text-sm leading-6 text-muted-foreground">The starting values illustrate a hypothetical household, not Texas averages or a recommendation. Replace them with your actual take-home pay and expenses. Every number can be adjusted, and no login is required.</p>
        <p className="mt-3 text-sm leading-6 text-muted-foreground">All fields accept nonnegative dollar amounts, up to {formatMoney(MAX_BUDGET_VALUE)} per field. Annual bill fields are converted to monthly reserves automatically.</p>
      </section>

      <div className="space-y-3 print:hidden">
        {BUDGET_GROUPS.map(group => {
          const isExpanded = expanded.includes(group.id);
          const subtotal = totals.groups.find(row => row.id === group.id)?.monthly ?? 0;
          return <section key={group.id} className="border border-border" aria-labelledby={`budget-heading-${group.id}`}>
            <h3 id={`budget-heading-${group.id}`}>
              <button type="button" onClick={() => setExpanded(current => isExpanded ? current.filter(id => id !== group.id) : [...current, group.id])}
                aria-expanded={isExpanded} aria-controls={`budget-fields-${group.id}`}
                className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">
                <span className="font-display text-xl">{group.title} <span aria-hidden="true" className="ml-2 text-sm text-primary">{isExpanded ? '−' : '+'}</span></span>
                <span className="shrink-0 text-sm font-semibold tabular-nums">{formatMoney(subtotal)}<span className="block text-right text-xs font-normal text-muted-foreground">per month</span></span>
              </button>
            </h3>
            {isExpanded && <div id={`budget-fields-${group.id}`} className="border-t border-border px-5 pb-6">
              <p className="mt-4 text-sm leading-6 text-muted-foreground">{group.description}</p>
              <div className="mt-4 grid gap-x-6 gap-y-3 sm:grid-cols-2 lg:grid-cols-3">
                {group.fields.map(field => <div key={field.key}>
                  <CurrencyInput label={`${field.label}${'cadence' in field ? ' (annual)' : ' (monthly)'}`} value={budget[field.key]} step={1} min={0} max={MAX_BUDGET_VALUE} onChange={value => onChange(field.key, value)} />
                  {'cadence' in field && <p className="mt-1 text-xs text-muted-foreground">{formatMoney(budget[field.key] / 12)} set aside monthly</p>}
                </div>)}
              </div>
            </div>}
          </section>;
        })}
      </div>

      <section className="hidden print:block" aria-labelledby="budget-print-detail-heading">
        <h2 id="budget-print-detail-heading" className="font-display text-2xl">Detailed monthly budget</h2>
        <p className="text-sm">Only nonzero entries are printed. Annual bills are shown as monthly reserves; all amounts are based on your inputs.</p>
        <table className="w-full border-collapse text-sm">
          <thead><tr className="border-b border-border"><th scope="col" className="py-2 text-left">Budget item</th><th scope="col" className="py-2 text-right">Monthly amount</th></tr></thead>
          <tbody>
            {BUDGET_GROUPS.map(group => {
              const nonzero = group.fields.filter(field => budget[field.key] > 0);
              if (!nonzero.length) return null;
              return <Fragment key={group.id}>
                <tr className="border-b border-border"><th colSpan={2} scope="rowgroup" className="py-2 text-left font-semibold">{group.title}</th></tr>
                {nonzero.map(field => <tr className="border-b border-border" key={field.key}>
                  <th scope="row" className="py-1 text-left font-normal">{field.label}{'cadence' in field ? ' (annual reserve)' : ''}</th>
                  <td className="py-1 text-right tabular-nums">{formatMoney(budget[field.key] / ('cadence' in field ? 12 : 1))}</td>
                </tr>)}
              </Fragment>;
            })}
          </tbody>
        </table>
      </section>

      <section aria-labelledby="budget-results-heading" className="border-y border-foreground py-8" aria-live="polite">
        <p className="eyebrow text-primary">Live budget summary</p>
        <h2 id="budget-results-heading" className="mt-2 font-display text-3xl">Where your monthly income goes</h2>
        <div className="mt-6 grid gap-x-6 gap-y-5 sm:grid-cols-2 lg:grid-cols-4">
          {[
            ['Monthly take-home income', totals.income],
            ['Monthly expenses and reserves', totals.expenses],
            ['Monthly savings allocations', totals.savings],
            ['Remaining after both', totals.remaining],
          ].map(([label, value]) => <div key={label} className="border-t border-border pt-3"><p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{label}</p><strong className="mt-2 block font-display text-3xl tabular-nums text-primary">{formatMoney(Number(value))}</strong></div>)}
        </div>
        <p className="mt-4 text-sm text-muted-foreground">Expenses consume {formatPercent(totals.spendingPercent)} of income; planned savings allocate {formatPercent(totals.savingsPercent)}. These percentages share the same denominator: monthly take-home income.</p>
        <p className="mt-2 text-sm text-muted-foreground">Annualized at unchanged monthly inputs: {formatMoney(totals.annualIncome)} income, {formatMoney(totals.annualExpenses)} expenses, {formatMoney(totals.annualSavings)} saved and {formatMoney(totals.annualRemaining)} remaining. This is a straight 12-month projection, not a growth forecast.</p>
        <div className={`mt-6 border-l-2 p-4 text-sm leading-6 ${totals.remaining < 0 ? 'border-destructive bg-muted' : 'border-primary bg-surface'}`} role="status">
          {totals.remaining < 0 ? <><strong>Budget shortfall: {formatMoney(-totals.remaining)} per month.</strong> Your planned expenses plus savings exceed take-home income. Recheck the categories, especially {totals.largestExpense?.title.toLowerCase() ?? 'your largest expenses'}, and consider adjusting amounts or savings timing. No single spending ratio fits every household.</> :
            totals.income === 0 ? <><strong>Enter take-home income to interpret the result.</strong> Expense totals can be reviewed while income is zero, but percentages of income are not meaningful yet.</> :
            <><strong>{formatMoney(totals.remaining)} remains unallocated each month.</strong> This is not automatically free-to-spend money: confirm irregular bills and emergency needs before assigning the rest.</>}
        </div>
      </section>

      <section aria-labelledby="budget-breakdown-heading">
        <h2 id="budget-breakdown-heading" className="font-display text-3xl">Category-by-category breakdown</h2>
        <p className="mt-2 text-sm text-muted-foreground">Percentages here are also shares of monthly take-home income. The bar scale adjusts if expenses exceed income; values are never hidden or capped.</p>
        <div className="mt-5 space-y-4">
          {totals.groups.filter(row => row.kind !== 'income').map(row => {
            const scale = Math.max(totals.income, totals.allocated, 1);
            return <div key={row.id}>
              <div className="mb-1 flex flex-wrap items-baseline justify-between gap-2 text-sm"><strong>{row.title}</strong><span className="tabular-nums">{formatMoney(row.monthly)} · {totals.income ? formatPercent(row.monthly / totals.income * 100) : '—'} of income</span></div>
              <div className="h-2 bg-muted" aria-hidden="true"><div className="h-2 bg-primary" style={{ width: `${Math.min(100, row.monthly / scale * 100)}%` }} /></div>
            </div>;
          })}
        </div>
      </section>

      <section className="border-t border-border pt-8 print:hidden" aria-labelledby="budget-scenarios-heading">
        <h2 id="budget-scenarios-heading" className="font-display text-3xl">Compare two scenarios</h2>
        <p className="mt-2 text-sm leading-6 text-muted-foreground">Save the current budget as A, modify expenses or income, then save as B. Both stay in this browser only; neither is submitted to a server.</p>
        <div className="mt-4 flex flex-wrap gap-3"><button className={actionClass} type="button" onClick={() => saveScenario('A')}>Save current as A</button><button className={actionClass} type="button" onClick={() => saveScenario('B')}>Save current as B</button></div>
        {scenarios.length > 0 && <div className="mt-5 overflow-x-auto">
          <table className="w-full min-w-full border-collapse text-sm">
            <caption className="sr-only">Saved budget scenario comparison</caption>
            <thead><tr className="border-b border-border"><th scope="col" className="py-3 text-left">Monthly measure</th>{scenarios.map(row => <th key={row.label} scope="col" className="py-3 text-right">Scenario {row.label}</th>)}</tr></thead>
            <tbody>{([
              ['Income', 'income'], ['Expenses', 'expenses'], ['Savings', 'savings'], ['Remaining', 'remaining'],
            ] as const).map(([label, key]) => <tr key={key} className="border-b border-border"><th scope="row" className="py-3 text-left font-normal">{label}</th>{scenarios.map(row => <td key={row.label} className="py-3 text-right tabular-nums">{formatMoney(calculateHouseholdBudget(row.budget)[key])}</td>)}</tr>)}</tbody>
          </table>
        </div>}
      </section>

      <section className="border-t border-border pt-8 print:hidden" aria-labelledby="budget-actions-heading">
        <h2 id="budget-actions-heading" className="font-display text-3xl">Save, print or export</h2>
        <p className="mt-2 text-sm text-muted-foreground">Saving uses browser-local storage. Clearing browser data may remove saved budgets. Files you export contain financial figures.</p>
        <div className="mt-4 flex flex-wrap gap-3">
          <button className={actionClass} type="button" onClick={save}>Save on this device</button>
          <button className={actionClass} type="button" onClick={restore}>Restore saved</button>
          <button className={actionClass} type="button" onClick={downloadCsv}>Download CSV</button>
          <button className={actionClass} type="button" onClick={() => window.print()}>Print budget</button>
          <button className={actionClass} type="button" onClick={reset}>Reset example</button>
        </div>
        <div className="mt-6 border border-border p-5">
          <h3 className="font-display text-xl">Share a budget link — privacy notice</h3>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">The link will contain every entered financial amount as URL data. Recipients can see the numbers, and the link may appear in browser history, analytics or logs. Do not share private household financial information unless you are comfortable with that exposure. This feature does not encrypt values.</p>
          <label className="mt-4 flex items-start gap-3 text-sm"><input type="checkbox" className="mt-1 h-4 w-4 shrink-0 accent-current" checked={shareApproved} onChange={event => setShareApproved(event.target.checked)} /><span>I understand that the copied URL exposes my budget amounts.</span></label>
          <button className={`${actionClass} mt-4 disabled:opacity-50`} disabled={!shareApproved} type="button" onClick={share}>Copy share link</button>
        </div>
        <p className="mt-4 text-sm" aria-live="polite" role="status">{status}</p>
      </section>
    </div>
  );
}
