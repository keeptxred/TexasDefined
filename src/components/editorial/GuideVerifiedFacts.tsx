import { verifiedGuideFactSets } from "@/data/guide-verified-facts";

/**
 * Readers see the actual first-party evidence behind selected measurements.
 * This is a claim-specific source record, never blanket page certification.
 */
export function GuideVerifiedFacts({ guideSlug }: { guideSlug: string }) {
  const facts = verifiedGuideFactSets[guideSlug] ?? [];
  if (!facts.length) return null;
  return <section className="border-b border-border py-10" aria-labelledby="verified-guide-reference-facts">
    <p className="eyebrow text-primary">Independently checked reference facts</p>
    <h2 id="verified-guide-reference-facts" className="mt-2 font-display text-3xl">Official facts and figures</h2>
    <p className="mt-4 max-w-3xl text-sm leading-7 text-muted-foreground">These are individually source-checked published values, not real-time access, safety, water, road, operating-hours or weather reports. Check conditions before the actual trip.</p>
    <div className="mt-6 overflow-x-auto">
      <table className="w-full border-collapse text-left text-sm">
        <caption className="sr-only">Published guide reference facts, original agency sources and verification dates</caption>
        <thead><tr className="border-y border-border"><th scope="col" className="px-3 py-4">Fact</th><th scope="col" className="px-3 py-4">Published information and qualifications</th><th scope="col" className="px-3 py-4">Official reference</th></tr></thead>
        <tbody>{facts.map((fact) => <tr key={fact.label} className="border-b border-border align-top">
          <th scope="row" className="px-3 py-4 font-semibold">{fact.label}</th>
          <td className="px-3 py-4">{fact.value}{fact.context && <p className="mt-2 text-muted-foreground">{fact.context}</p>}</td>
          <td className="px-3 py-4"><a href={fact.sourceUrl} className="font-semibold text-primary underline" target="_blank" rel="noopener noreferrer">Primary source ↗</a><span className="mt-2 block text-xs text-muted-foreground">Checked {fact.checkedAt}</span></td>
        </tr>)}</tbody>
      </table>
    </div>
  </section>;
}
