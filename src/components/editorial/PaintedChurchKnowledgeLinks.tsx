import { Link } from "@tanstack/react-router";

import { PaintedChurchEditorialStatus } from "@/components/editorial/PaintedChurchEditorialStatus";
import { PaintedChurchEvidenceLedger } from "@/components/editorial/PaintedChurchEvidenceLedger";
import { PaintedChurchPreservationChronology } from "@/components/editorial/PaintedChurchPreservationChronology";
import { PaintedChurchSourceBibliography } from "@/components/editorial/PaintedChurchSourceBibliography";
import { paintedChurchKnowledgeForChurch } from "@/data/painted-church-knowledge-graph";

const labels: Record<string, string> = {
  "uses-technique": "Techniques",
  "depicts-symbol": "Symbols & iconography",
  "designed-by": "Architects",
  "built-by": "Builders & contractors",
  "decorated-by": "Artists, decorators & interior craftspeople",
  "restored-by": "Restorers & conservators",
  "researched-by": "Researchers",
  "heritage-context": "Heritage",
  "preservation-example": "Preservation",
  "contains-feature": "Interior objects & artworks",
};

export function PaintedChurchKnowledgeLinks({ slug }: { slug: string }) {
  const connections = paintedChurchKnowledgeForChurch(slug).filter((item) => item.edge.relationship !== "contributor-uses-technique");
  const grouped = new Map<string, typeof connections>();
  for (const item of connections) {
    const current = grouped.get(item.edge.relationship) ?? [];
    current.push(item);
    grouped.set(item.edge.relationship, current);
  }

  return (
    <>
      {connections.length ? (
        <section aria-labelledby="knowledge-graph-links" className="mt-14 border-t border-border pt-8">
          <p className="eyebrow text-primary">Painted Churches knowledge graph</p>
          <h2 id="knowledge-graph-links" className="mt-3 font-display text-4xl">Follow the authorship, symbols, techniques and traditions connected to this church.</h2>
          <div className="mt-8 grid gap-px border border-border bg-border md:grid-cols-2">
            {[...grouped.entries()].map(([relationship, items]) => (
              <div key={relationship} className="bg-background p-6">
                <h3 className="font-display text-2xl">{labels[relationship] ?? relationship}</h3>
                <div className="mt-4 flex flex-wrap gap-x-5 gap-y-3 text-sm">
                  {items.map(({ node }) => (
                    <Link key={node.id} to={node.url as any} className="border-b border-primary text-primary">{node.name}</Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <p className="mt-5 text-xs leading-6 text-muted-foreground">Relationships are published only when Texas Defined has a church-specific source or documented collection-level basis for the connection. Architectural design, construction, decoration, restoration and research are intentionally kept separate.</p>
          <div className="mt-6 flex flex-wrap gap-x-6 gap-y-3 text-sm">
            <Link to="/explore/painted-churches/features" className="border-b border-primary text-primary">Interior objects & artworks</Link>
            <Link to="/explore/painted-churches/inscriptions" className="border-b border-primary text-primary">Inscriptions & languages</Link>
            <Link to="/explore/painted-churches/stained-glass" className="border-b border-primary text-primary">Stained glass</Link>
            <Link to="/explore/painted-churches/sacred-furnishings" className="border-b border-primary text-primary">Altars, pulpits, organs & furnishings</Link>
            <Link to="/explore/painted-churches/preservation" className="border-b border-primary text-primary">Preservation & fabric history</Link>
            <Link to="/explore/painted-churches/national-register-study" className="border-b border-primary text-primary">Original National Register study</Link>
            <Link to="/explore/painted-churches/bibliography" className="border-b border-primary text-primary">Scholarly bibliography</Link>
            <Link to="/explore/painted-churches/sources" className="border-b border-primary text-primary">Source registry</Link>
            <Link to="/explore/painted-churches/fieldwork-protocol" className="border-b border-primary text-primary">Original fieldwork protocol</Link>
            <Link to="/explore/painted-churches/preindex-readiness" className="border-b border-primary text-primary">Pre-index authority audit</Link>
          </div>
        </section>
      ) : null}
      <PaintedChurchPreservationChronology slug={slug} />
      <PaintedChurchEvidenceLedger slug={slug} />
      <PaintedChurchEditorialStatus slug={slug} />
      <PaintedChurchSourceBibliography slug={slug} />
    </>
  );
}
