import { useMemo, useState } from 'react';
import { Link } from '@tanstack/react-router';
import { RELOCATION_PLACES } from '@/data/relocation-authority';

const planningLabels = {
  value: 'Value-oriented planning band',
  balanced: 'Balanced planning band',
  'location-first': 'Location-first planning band',
} as const;

const commuteLabels = {
  core: 'Core-city commute pattern',
  corridor: 'Corridor commute pattern',
  regional: 'Regional commute pattern',
} as const;

export function TexasCityComparisonTool() {
  const options = useMemo(() => [...RELOCATION_PLACES].sort((a, b) => a.name.localeCompare(b.name)), []);
  const [leftName, setLeftName] = useState(options[0]?.name ?? '');
  const [rightName, setRightName] = useState(options[1]?.name ?? '');
  const left = options.find((place) => place.name === leftName) ?? options[0];
  const right = options.find((place) => place.name === rightName) ?? options[1] ?? options[0];
  if (!left || !right) return null;

  const rows = [
    ['Metro / market', left.metro, right.metro],
    ['Texas region', left.region, right.region],
    ['Setting', left.setting.replace('-', ' '), right.setting.replace('-', ' ')],
    ['Planning posture', planningLabels[left.planningBand], planningLabels[right.planningBand]],
    ['Commute pattern', commuteLabels[left.commuteStyle], commuteLabels[right.commuteStyle]],
    ['Climate planning', left.climate, right.climate],
    ['County context', left.counties.join(', '), right.counties.join(', ')],
  ] as const;

  return <>
    <div className="grid gap-4 sm:grid-cols-2">
      <label className="text-sm font-semibold">First place<select value={leftName} onChange={(event) => setLeftName(event.target.value)} className="mt-2 min-h-12 w-full border border-border bg-background px-3 font-normal">{options.map((place) => <option key={`left-${place.name}`} value={place.name}>{place.name}</option>)}</select></label>
      <label className="text-sm font-semibold">Second place<select value={rightName} onChange={(event) => setRightName(event.target.value)} className="mt-2 min-h-12 w-full border border-border bg-background px-3 font-normal">{options.map((place) => <option key={`right-${place.name}`} value={place.name}>{place.name}</option>)}</select></label>
    </div>

    <div className="mt-8 overflow-x-auto border-y border-border">
      <table className="w-full min-w-[46rem] border-collapse text-left text-sm">
        <thead><tr className="border-b border-border"><th className="px-4 py-4 font-semibold">Planning factor</th><th className="px-4 py-4 font-display text-xl">{left.name}</th><th className="px-4 py-4 font-display text-xl">{right.name}</th></tr></thead>
        <tbody>{rows.map(([label, leftValue, rightValue]) => <tr key={label} className="border-b border-border last:border-0"><th className="px-4 py-4 font-semibold">{label}</th><td className="px-4 py-4 capitalize text-muted-foreground">{leftValue}</td><td className="px-4 py-4 capitalize text-muted-foreground">{rightValue}</td></tr>)}</tbody>
      </table>
    </div>

    <div className="mt-6 grid gap-3 sm:grid-cols-2">
      <Link to={left.guideHref} className="border border-border p-4 font-semibold hover:border-primary">Research {left.name} →</Link>
      <Link to={right.guideHref} className="border border-border p-4 font-semibold hover:border-primary">Research {right.name} →</Link>
    </div>

    <p className="mt-6 text-sm leading-6 text-muted-foreground">These are editorial planning descriptors, not rankings, prices or promises about a neighborhood. Compare the exact housing cost, taxes, insurance, school assignment, utility service and commute for any address you are seriously considering.</p>
  </>;
}
