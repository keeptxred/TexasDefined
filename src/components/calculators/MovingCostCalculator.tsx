import { useMemo, useState } from 'react';
import { CalculatorActions, CalculatorResult, CurrencyInput, NumberInput, PercentageInput, formatMoney, readCalculatorStateFromUrl, useCalculatorPersistence } from '@/components/property/PropertyCalculatorFramework';
import { calculateMovingBudget } from '@/lib/financial/planning';

type MovingState = { distance: number; bedrooms: number; writtenEstimate: number; packing: number; travel: number; storage: number; deposits: number; contingency: number };
const DEFAULTS: MovingState = { distance: 500, bedrooms: 3, writtenEstimate: 0, packing: 1200, travel: 800, storage: 0, deposits: 1500, contingency: 15 };

export function MovingCostCalculator() {
  const [state, setState] = useState(() => readCalculatorStateFromUrl(DEFAULTS));
  const set = <K extends keyof MovingState>(key: K, value: MovingState[K]) => setState((current) => ({ ...current, [key]: value }));
  const result = useMemo(() => calculateMovingBudget({ distanceMiles: state.distance, bedrooms: state.bedrooms, writtenEstimate: state.writtenEstimate, packing: state.packing, travelLodging: state.travel, storage: state.storage, depositsSetup: state.deposits, contingencyPercent: state.contingency }), [state]);
  const persistence = useCalculatorPersistence({ storageKey: 'texasdefined:moving:v3', state, onRestore: setState });

  return <>
    <section className="mt-10 grid gap-5 border-y border-border py-7 sm:grid-cols-2 lg:grid-cols-3" aria-labelledby="moving-budget-inputs">
      <h2 id="moving-budget-inputs" className="sr-only">Moving budget inputs</h2>
      <NumberInput label="Move distance" value={state.distance} onChange={(v) => set('distance', v)} suffix="miles" help="Used only for the rough transportation baseline."/>
      <NumberInput label="Bedrooms" value={state.bedrooms} onChange={(v) => set('bedrooms', v)} min={0} max={20} help="Used only for the rough transportation baseline."/>
      <CurrencyInput label="Written mover or truck estimate" value={state.writtenEstimate} onChange={(v) => set('writtenEstimate', v)} step={100} help="Enter 0 to use the built-in planning baseline."/>
      <CurrencyInput label="Packing & supplies" value={state.packing} onChange={(v) => set('packing', v)} step={100}/>
      <CurrencyInput label="Travel & temporary lodging" value={state.travel} onChange={(v) => set('travel', v)} step={100}/>
      <CurrencyInput label="Storage" value={state.storage} onChange={(v) => set('storage', v)} step={100}/>
      <CurrencyInput label="Deposits & setup" value={state.deposits} onChange={(v) => set('deposits', v)} step={100}/>
      <PercentageInput label="Contingency" value={state.contingency} onChange={(v) => set('contingency', v)} step={1} max={100}/>
    </section>
    <div className="mt-6 border-b border-border pb-6 text-sm leading-6 text-muted-foreground"><p><strong className="text-foreground">Use a written estimate when you have one.</strong> If that field is 0, the shared engine uses the disclosed planning baseline of $900 + $2.25 per mile + $650 per bedroom. It is a budgeting heuristic, not a Texas market average, mover quote or guaranteed price.</p></div>
    <CalculatorActions onSave={persistence.save} onRestore={persistence.restore} onShare={persistence.share} onPrint={persistence.print} status={persistence.status} onReset={() => setState(DEFAULTS)}/>
    <section className="mt-8 grid gap-x-6 sm:grid-cols-2 lg:grid-cols-4" aria-live="polite" aria-atomic="true" aria-labelledby="moving-budget-results"><h2 id="moving-budget-results" className="sr-only">Updated moving budget estimate</h2><CalculatorResult label="Transportation" value={formatMoney(result.transportation)} note={result.usesWrittenEstimate ? 'Using your written estimate.' : `Planning baseline: ${formatMoney(result.baselineTransport)}.`}/><CalculatorResult label="Move subtotal" value={formatMoney(result.subtotal)}/><CalculatorResult label="Contingency" value={formatMoney(result.contingency)}/><CalculatorResult label="Target moving budget" value={formatMoney(result.total)}/></section>
  </>;
}
