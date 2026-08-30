import { useMemo, useState, type ReactNode } from 'react';

const money = (value: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(Number.isFinite(value) ? value : 0);
const number = (value: unknown) => Math.max(0, Number(value) || 0);

function Field({ label, value, onChange, step = 1, suffix }: { label: string; value: number; onChange: (value: number) => void; step?: number; suffix?: string }) {
  return <label className="block border-t border-border pt-4"><span className="text-sm font-semibold">{label}</span><div className="flex items-center border-b border-border focus-within:border-primary"><input className="w-full bg-transparent px-0 py-3 text-lg outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background" type="number" min="0" step={step} value={value} onChange={(event) => onChange(number(event.target.value))} />{suffix ? <span className="pl-3 text-sm text-muted-foreground">{suffix}</span> : null}</div></label>;
}

function Shell({ children, note }: { children: ReactNode; note: string }) {
  return <><section className="mt-10 grid gap-5 border-y border-border py-7 sm:grid-cols-2 lg:grid-cols-3">{children}</section><p className="mt-6 border-b border-border pb-6 text-sm leading-6 text-muted-foreground"><strong className="text-foreground">Planning estimate.</strong> {note}</p></>;
}

function Results({ values }: { values: Array<[string, string]> }) {
  return <section className="mt-8" aria-live="polite" aria-atomic="true"><h2 className="sr-only">Updated estimate</h2><dl className="grid sm:grid-cols-2 lg:grid-cols-3">{values.map(([label, value]) => <div key={label} className="border-b border-border py-5 sm:px-5"><dt className="text-xs uppercase tracking-[0.14em] text-muted-foreground">{label}</dt><dd className="mt-2 font-display text-3xl font-bold text-primary">{value}</dd></div>)}</dl></section>;
}

export function CashToCloseCalculator() {
  const [price, setPrice] = useState(400000);
  const [downPercent, setDownPercent] = useState(10);
  const [closingPercent, setClosingPercent] = useState(3);
  const [prepaids, setPrepaids] = useState(6000);
  const [credits, setCredits] = useState(5000);
  const [depositPaid, setDepositPaid] = useState(5000);
  const [assistance, setAssistance] = useState(0);
  const [reserve, setReserve] = useState(10000);

  const result = useMemo(() => {
    const downPayment = price * downPercent / 100;
    const closingCosts = price * closingPercent / 100;
    const grossCash = downPayment + closingCosts + prepaids;
    const offsets = Math.min(grossCash, credits + depositPaid + assistance);
    const cashAtClosing = Math.max(0, grossCash - offsets);
    return {
      downPayment,
      closingCosts,
      grossCash,
      offsets,
      cashAtClosing,
      withReserve: cashAtClosing + reserve,
      loan: Math.max(0, price - downPayment),
    };
  }, [price, downPercent, closingPercent, prepaids, credits, depositPaid, assistance, reserve]);

  return <>
    <Shell note="Use the Loan Estimate and then the Closing Disclosure for the transaction-specific figures. Credits, assistance, earnest money and other deposits are subject to contract and program rules and cannot always be applied to every cost.">
      <Field label="Purchase price" value={price} onChange={setPrice} step={1000} />
      <Field label="Down payment" value={downPercent} onChange={setDownPercent} step={0.1} suffix="%" />
      <Field label="Buyer closing-cost estimate" value={closingPercent} onChange={setClosingPercent} step={0.1} suffix="%" />
      <Field label="Prepaids and initial escrow" value={prepaids} onChange={setPrepaids} step={500} />
      <Field label="Lender / seller credits" value={credits} onChange={setCredits} step={500} />
      <Field label="Earnest money / deposits already paid" value={depositPaid} onChange={setDepositPaid} step={500} />
      <Field label="Verified assistance applied" value={assistance} onChange={setAssistance} step={500} />
      <Field label="Cash reserve after closing" value={reserve} onChange={setReserve} step={500} />
    </Shell>
    <Results values={[
      ['Down payment', money(result.downPayment)],
      ['Estimated closing costs', money(result.closingCosts)],
      ['Gross transaction cash', money(result.grossCash)],
      ['Credits / deposits / assistance', money(result.offsets)],
      ['Estimated cash at closing', money(result.cashAtClosing)],
      ['Cash needed including reserve', money(result.withReserve)],
      ['Estimated loan amount', money(result.loan)],
    ]} />
  </>;
}

export function SellerNetProceedsCalculator() {
  const [price, setPrice] = useState(450000);
  const [payoff, setPayoff] = useState(250000);
  const [sellerCostPercent, setSellerCostPercent] = useState(6);
  const [buyerCredit, setBuyerCredit] = useState(5000);
  const [repairs, setRepairs] = useState(3000);
  const [other, setOther] = useState(0);

  const result = useMemo(() => {
    const sellerCosts = price * sellerCostPercent / 100;
    const transactionDeductions = sellerCosts + buyerCredit + repairs + other;
    return {
      sellerCosts,
      transactionDeductions,
      beforePayoff: Math.max(0, price - transactionDeductions),
      net: Math.max(0, price - payoff - transactionDeductions),
    };
  }, [price, payoff, sellerCostPercent, buyerCredit, repairs, other]);

  return <>
    <Shell note="Use the actual mortgage payoff statement, title-company settlement figures and contract terms before relying on a sale-proceeds estimate. Taxes, liens, prorations and negotiated obligations can change the final amount.">
      <Field label="Sale price" value={price} onChange={setPrice} step={1000} />
      <Field label="Mortgage / lien payoff" value={payoff} onChange={setPayoff} step={1000} />
      <Field label="Seller transaction-cost estimate" value={sellerCostPercent} onChange={setSellerCostPercent} step={0.1} suffix="%" />
      <Field label="Buyer credit paid by seller" value={buyerCredit} onChange={setBuyerCredit} step={500} />
      <Field label="Repairs / concessions" value={repairs} onChange={setRepairs} step={500} />
      <Field label="Other seller deductions" value={other} onChange={setOther} step={500} />
    </Shell>
    <Results values={[
      ['Estimated seller transaction costs', money(result.sellerCosts)],
      ['All modeled transaction deductions', money(result.transactionDeductions)],
      ['Proceeds before loan payoff', money(result.beforePayoff)],
      ['Estimated seller net proceeds', money(result.net)],
    ]} />
  </>;
}
