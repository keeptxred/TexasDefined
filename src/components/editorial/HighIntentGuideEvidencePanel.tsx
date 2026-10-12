import type { ArticleBlock } from "@/data/types";
import { guideEvidenceFor } from "@/data/fixtures/texas-high-intent-authority-evidence";
import { HIGH_INTENT_GUIDE_ROUTES } from "@/data/fixtures/texas-high-intent-guide-links";

/**
 * Primary-source audit surface. Link to the precise fact source and image license
 * rather than asking readers to trust an uncited "best" ranking.
 */
export function HighIntentGuideEvidencePanel({ slug, blocks }: { slug: string; blocks: ArticleBlock[] }) {
  const start = blocks.findIndex((block) => block.type === "heading" && block.text === "How we chose these destinations");
  const end = blocks.findIndex((block, index) => index > start && block.type === "heading" && block.text === "Photography of the places in this guide");
  const picks = start < 0 ? [] : blocks.slice(start + 1, end < 0 ? undefined : end)
    .flatMap((block, index, section) => {
      if (block.type !== "heading" || section[index + 1]?.type !== "paragraph") return [];
      const [place, ...rest] = block.text.split("—");
      const note = section[index + 1];
      return note.type === "paragraph" ? [{ title: block.text, place: place.trim(), fit: rest.join("—").trim(), note: note.text }] : [];
    });
  const sectionAnchor = (value: string) => value.normalize("NFKD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/&/g, " and ").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
  const number = Number(Object.entries(HIGH_INTENT_GUIDE_ROUTES).find(([, guide]) => guide.slug === slug)?.[0]);
  if (!Number.isFinite(number)) return null;
  const evidence = guideEvidenceFor(number);
  if (!evidence) return null;

  return <section className="my-12 border-y-2 border-foreground py-8" aria-labelledby="guide-source-facts">
    <p className="eyebrow text-primary">Independent editorial research · sources last checked {evidence.reviewDate}</p>
    <h2 id="guide-source-facts" className="mt-3 font-display text-3xl sm:text-4xl">Facts you can verify</h2>
    <p className="mt-4 max-w-3xl text-sm leading-7 text-muted-foreground">These published figures are dated reference points, not live rates, permits, water conditions, campsite availability or road closures. Follow the individual primary source before traveling.</p>
    <p className="mt-3 text-sm"><a href="/data/texasdefined-high-intent-authority-facts.csv" download className="font-semibold text-primary underline underline-offset-4">Download the dated, source-linked fact ledger (CSV) ↗</a></p>
    {picks.length > 0 && <section aria-labelledby="quick-guide-comparison" className="mt-8">
      <h3 id="quick-guide-comparison" className="font-display text-2xl">Compare all {picks.length} options at a glance</h3>
      <p className="mt-2 text-sm leading-6 text-muted-foreground">This is an editorial best-fit comparison, not a live ranking. Open each option's full discussion for its access and planning tradeoffs.</p>
      <div className="mt-5 overflow-x-auto">
        <table className="w-full border-collapse text-left text-sm">
          <caption className="sr-only">Best fit and practical planning notes for each recommendation</caption>
          <thead><tr className="border-y border-border"><th scope="col" className="px-3 py-4">Option</th><th scope="col" className="px-3 py-4">Best fit</th><th scope="col" className="px-3 py-4">Before you go</th></tr></thead>
          <tbody>{picks.map((pick) => <tr key={pick.title} className="border-b border-border align-top">
            <th scope="row" className="px-3 py-4"><a href={`#${sectionAnchor(pick.title)}`} className="font-semibold text-primary underline underline-offset-4">{pick.place} ↓</a></th>
            <td className="px-3 py-4">{pick.fit || "Read destination assessment"}</td>
            <td className="px-3 py-4">{pick.note.split(/(?<=[.!?])\s/)[0]}</td>
          </tr>)}</tbody>
        </table>
      </div>
    </section>}
    <div className="mt-7 overflow-x-auto">
      <table className="w-full border-collapse text-left text-sm">
        <caption className="sr-only">Verified reference facts and their controlling primary sources</caption>
        <thead><tr className="border-y border-border"><th scope="col" className="px-3 py-4 font-semibold">Reference fact</th><th scope="col" className="px-3 py-4 font-semibold">Published value</th><th scope="col" className="px-3 py-4 font-semibold">Primary source</th></tr></thead>
        <tbody>{evidence.facts.map((fact) => <tr key={fact.label} className="border-b border-border align-top">
          <th scope="row" className="px-3 py-4 font-semibold">{fact.label}</th>
          <td className="px-3 py-4">{fact.value}</td>
          <td className="px-3 py-4"><a href={fact.sourceUrl} target="_blank" rel="noopener noreferrer" className="text-primary underline underline-offset-4">View original ↗</a><span className="mt-2 block text-xs text-muted-foreground">Checked {fact.verifiedAt}</span></td>
        </tr>)}</tbody>
      </table>
    </div>
    <div className="mt-8 border-t border-border pt-6">
      <h3 className="font-display text-2xl">Photo origins and reuse licenses</h3>
      <p className="mt-2 text-sm leading-6 text-muted-foreground">Images illustrate their actual named subjects. These rights statements apply to the photographs, not to uncredited images elsewhere on the web. Wikimedia photographs may have been taken in earlier years and are not evidence of current conditions.</p>
      <ul className="mt-4 space-y-3 text-sm">{evidence.photos.map((photo) => <li key={photo.image.src} className="border-t border-border pt-3">
        <strong>{photo.exactSubject.replace(/\.[a-z0-9]+$/i, "").replaceAll("-", " ")}</strong>{" · "}{photo.image.credit}
        {" · "}<a className="text-primary underline underline-offset-4" href={photo.licenseUrl} target="_blank" rel="noopener noreferrer">Reuse license ↗</a>
        {photo.status === "item-verified" ? <>{" · "}<a className="text-primary underline underline-offset-4" href={photo.sourceUrl} target="_blank" rel="noopener noreferrer">Original photo record ↗</a></> : <span className="text-muted-foreground"> · Previously governed TexasDefined local photograph</span>}
      </li>)}</ul>
    </div>
  </section>;
}
