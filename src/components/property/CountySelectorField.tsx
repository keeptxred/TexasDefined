import { TEXAS_COUNTIES } from '@/data/texas-places';

export type CountySelectorFieldProps = {
  label?: string;
  value: string;
  onChange: (slug: string) => void;
};

export function CountySelectorField({
  label = 'Texas county',
  value,
  onChange,
}: CountySelectorFieldProps) {
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
