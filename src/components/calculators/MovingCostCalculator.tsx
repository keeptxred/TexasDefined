import { useMemo, useState } from 'react';

const money = (value: number) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(Number.isFinite(value) ? value : 0);

const number = (value: unknown) => Math.max(0, Number(value) || 0);

function Field({
  label,
  value,
  onChange,
  step = 1,
  suffix,
  help,
}: {
  label: string;
  value: number;
  onChange: (value: number) => void;
  step?: number;
  suffix?: string;
  help?: string;
}) {
  return (
    <label className="block border-t border-border pt-4">
      <span className="text-sm font-semibold">{label}</span>
      {help ? <span className="mt-1 block text-xs leading-5 text-muted-foreground">{help}</span> : null}
      <div className="flex items-center border-b border-border focus-within:border-primary">
        <input
          className="w-full bg-transparent px-0 py-3 text-lg outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          type="number"
          min="0"
          step={step}
          value={value}
          onChange={(event) => onChange(number(event.target.value))}
        />
        {suffix ? <span className="pl-3 text-sm text-muted-foreground">{suffix}</span> : null}
      </div>
    </label>
  );
}

export function MovingCostCalculator() {
  const [distance, setDistance] = useState(500);
  const [bedrooms, setBedrooms] = useState(3);
  const [writtenEstimate, setWrittenEstimate] = useState(0);
  const [packing, setPacking] = useState(1200);
  const [travel, setTravel] = useState(800);
  const [storage, setStorage] = useState(0);
  const [deposits, setDeposits] = useState(1500);
  const [contingency, setContingency] = useState(15);

  const result = useMemo(() => {
    const baselineTransport = 900 + distance * 2.25 + bedrooms * 650;
    const transportation = writtenEstimate > 0 ? writtenEstimate : baselineTransport;
    const subtotal = transportation + packing + travel + storage + deposits;
    const contingencyAmount = subtotal * (contingency / 100);
    return {
      baselineTransport,
      transportation,
      subtotal,
      contingencyAmount,
      total: subtotal + contingencyAmount,
      usesWrittenEstimate: writtenEstimate > 0,
    };
  }, [bedrooms, contingency, deposits, distance, packing, storage, travel, writtenEstimate]);

  return (
    <>
      <section className="mt-10 grid gap-5 border-y border-border py-7 sm:grid-cols-2 lg:grid-cols-3" aria-labelledby="moving-budget-inputs">
        <h2 id="moving-budget-inputs" className="sr-only">Moving budget inputs</h2>
        <Field label="Move distance" value={distance} onChange={setDistance} suffix="miles" help="Used only for the rough transportation baseline." />
        <Field label="Bedrooms" value={bedrooms} onChange={setBedrooms} help="Used only for the rough transportation baseline." />
        <Field label="Written mover or truck estimate" value={writtenEstimate} onChange={setWrittenEstimate} step={100} help="Enter 0 to use the built-in planning baseline." />
        <Field label="Packing & supplies" value={packing} onChange={setPacking} step={100} />
        <Field label="Travel & temporary lodging" value={travel} onChange={setTravel} step={100} />
        <Field label="Storage" value={storage} onChange={setStorage} step={100} />
        <Field label="Deposits & setup" value={deposits} onChange={setDeposits} step={100} />
        <Field label="Contingency" value={contingency} onChange={setContingency} step={1} suffix="%" />
      </section>

      <div className="mt-6 border-b border-border pb-6 text-sm leading-6 text-muted-foreground">
        <p><strong className="text-foreground">Use a written estimate when you have one.</strong> If that field is 0, the calculator uses a rough planning baseline of $900 + $2.25 per mile + $650 per bedroom. That baseline is a budgeting heuristic, not a Texas market average, mover quote or guaranteed price.</p>
        <p className="mt-3">For professional moves, confirm charges, extra services, access conditions, liability or insurance options and payment terms in writing before booking.</p>
      </div>

      <section className="mt-8" aria-live="polite" aria-atomic="true" aria-labelledby="moving-budget-results">
        <h2 id="moving-budget-results" className="sr-only">Updated moving budget estimate</h2>
        <dl className="grid sm:grid-cols-2 lg:grid-cols-3">
          <div className="border-b border-border py-5 sm:px-5">
            <dt className="text-xs uppercase tracking-[0.14em] text-muted-foreground">Transportation</dt>
            <dd className="mt-2 font-display text-3xl font-bold text-primary">{money(result.transportation)}</dd>
            <dd className="mt-1 text-xs leading-5 text-muted-foreground">{result.usesWrittenEstimate ? 'Using your written estimate.' : `Planning baseline: ${money(result.baselineTransport)}.`}</dd>
          </div>
          <div className="border-b border-border py-5 sm:border-l sm:border-border sm:px-5">
            <dt className="text-xs uppercase tracking-[0.14em] text-muted-foreground">Move subtotal</dt>
            <dd className="mt-2 font-display text-3xl font-bold text-primary">{money(result.subtotal)}</dd>
          </div>
          <div className="border-b border-border py-5 sm:border-l sm:border-border sm:px-5">
            <dt className="text-xs uppercase tracking-[0.14em] text-muted-foreground">Contingency</dt>
            <dd className="mt-2 font-display text-3xl font-bold text-primary">{money(result.contingencyAmount)}</dd>
          </div>
          <div className="border-b border-border py-5 sm:px-5 lg:col-span-3">
            <dt className="text-xs uppercase tracking-[0.14em] text-muted-foreground">Target moving budget</dt>
            <dd className="mt-2 font-display text-4xl font-bold text-primary">{money(result.total)}</dd>
          </div>
        </dl>
      </section>
    </>
  );
}
