import { useMemo, useState } from 'react';

import {
  AdvancedInputs,
  CurrencyInput,
  FinancialCalculatorScaffold,
  FinancialInput,
  PercentageInput,
  formatCalculatorMoney,
  readCalculatorUrlState,
} from '@/components/calculators/FinancialCalculatorUI';
import { estimateMovingCost } from '@/lib/financial/household';

const DEFAULTS = {
  distance: 500,
  bedrooms: 3,
  writtenEstimate: 0,
  packing: 1200,
  travel: 800,
  storage: 0,
  deposits: 1500,
  contingency: 15,
};

export function MovingCostCalculator() {
  const [state, setState] = useState(() => readCalculatorUrlState(DEFAULTS));
  const set = (key: keyof typeof state, value: number) => setState((current) => ({ ...current, [key]: value }));
  const result = useMemo(() => estimateMovingCost({
    distanceMiles: state.distance,
    bedrooms: state.bedrooms,
    writtenEstimate: state.writtenEstimate,
    packing: state.packing,
    travel: state.travel,
    storage: state.storage,
    deposits: state.deposits,
    contingencyPercent: state.contingency,
  }), [state]);
  const usesWrittenEstimate = state.writtenEstimate > 0;

  return (
    <FinancialCalculatorScaffold
      storageKey="texasdefined:moving-cost-calculator"
      state={state}
      defaults={DEFAULTS}
      onRestore={setState}
      note="Use a written estimate when you have one. If that field is 0, the calculator uses a rough planning baseline of $900 + $2.25 per mile + $650 per bedroom. That baseline is a budgeting heuristic, not a Texas market average, mover quote or guaranteed price."
      issues={result.issues}
      results={[
        { label: 'Target moving budget', value: formatCalculatorMoney(result.total), emphasis: true },
        { label: 'Transportation', value: formatCalculatorMoney(result.transportation), note: usesWrittenEstimate ? 'Using your written estimate.' : 'Planning baseline: ' + formatCalculatorMoney(result.baselineTransport) + '.' },
        { label: 'Move subtotal', value: formatCalculatorMoney(result.subtotal) },
        { label: 'Contingency', value: formatCalculatorMoney(result.contingencyAmount) },
      ]}
      summary={{ 'Target moving budget': formatCalculatorMoney(result.total), 'Transportation': formatCalculatorMoney(result.transportation), 'Contingency': formatCalculatorMoney(result.contingencyAmount) }}
      breakdown={[
        { label: 'Transportation', value: result.transportation },
        { label: 'Packing & supplies', value: state.packing },
        { label: 'Travel & temporary lodging', value: state.travel },
        { label: 'Storage', value: state.storage },
        { label: 'Deposits & setup', value: state.deposits },
        { label: 'Contingency', value: result.contingencyAmount },
      ]}
      methodology={{
        formula: 'A written mover/truck estimate takes priority. Otherwise transportation uses the planning baseline $900 + $2.25 per mile + $650 per bedroom; packing, travel, storage and deposits are then added before contingency.',
        assumptions: ['The built-in transportation baseline is a budgeting heuristic, not a quote or Texas market average.', 'Professional-move charges, access conditions, coverage and special services must be confirmed in writing.'],
      }}
    >
      <FinancialInput label="Move distance" value={state.distance} onChange={(v) => set('distance', v)} suffix="miles" helper="Used only for the rough transportation baseline." />
      <FinancialInput label="Bedrooms" value={state.bedrooms} onChange={(v) => set('bedrooms', v)} helper="Used only for the rough transportation baseline." />
      <CurrencyInput label="Written mover or truck estimate" value={state.writtenEstimate} onChange={(v) => set('writtenEstimate', v)} step={100} helper="Enter 0 to use the built-in planning baseline." />
      <CurrencyInput label="Packing & supplies" value={state.packing} onChange={(v) => set('packing', v)} step={100} />
      <CurrencyInput label="Travel & temporary lodging" value={state.travel} onChange={(v) => set('travel', v)} step={100} />
      <div className="sm:col-span-2 lg:col-span-3"><AdvancedInputs>
        <CurrencyInput label="Storage" value={state.storage} onChange={(v) => set('storage', v)} step={100} />
        <CurrencyInput label="Deposits & setup" value={state.deposits} onChange={(v) => set('deposits', v)} step={100} />
        <PercentageInput label="Contingency" value={state.contingency} onChange={(v) => set('contingency', v)} step={1} />
      </AdvancedInputs></div>
    </FinancialCalculatorScaffold>
  );
}
