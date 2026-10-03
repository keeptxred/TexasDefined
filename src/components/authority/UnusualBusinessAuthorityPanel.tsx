import { CitationTrustPanel } from "@/components/authority/CitationTrustPanel";
import { unusualBusinessAuthorityProfile } from "@/data/unusual-business-authority";

export function UnusualBusinessAuthorityPanel({ slug, title }: { slug: string; title: string }) {
  const profile = unusualBusinessAuthorityProfile(slug);
  if (!profile) return null;

  const stableUrl = `https://texasdefined.com${profile.canonicalPath}`;
  const recommendedCitation = `Texas Defined Editorial Desk. “${title}.” TexasDefined.com. Last verified ${profile.lastVerified}. ${stableUrl}`;

  return (
    <div className="mt-8 space-y-8">
      <section className="border-y border-border py-7" aria-labelledby={`${slug}-quick-facts`}>
        <p className="eyebrow text-primary">Quick reference</p>
        <h2 id={`${slug}-quick-facts`} className="mt-2 font-display text-3xl">At a glance</h2>
        <dl className="mt-5 grid gap-x-7 gap-y-5 sm:grid-cols-2">
          {profile.quickFacts.map((fact) => (
            <div key={fact.label} className="border-t border-border pt-3">
              <dt className="text-xs font-semibold uppercase tracking-[0.1em] text-muted-foreground">{fact.label}</dt>
              <dd className="mt-2 text-sm leading-7 text-foreground">{fact.value}</dd>
            </div>
          ))}
        </dl>
        <p className="mt-5 text-xs leading-6 text-muted-foreground">Freshness: {profile.freshness}</p>
      </section>

      <CitationTrustPanel
        sources={profile.sources}
        methodology={profile.methodology}
        lastVerified={profile.lastVerified}
        stableUrl={stableUrl}
        recommendedCitation={recommendedCitation}
        reviewedBy="Texas Defined Editorial Desk"
      />
    </div>
  );
}

export default UnusualBusinessAuthorityPanel;
