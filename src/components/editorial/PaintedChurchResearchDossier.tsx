import { Link } from "@tanstack/react-router";

import { PaintedChurchArchivalImageSources } from "@/components/editorial/PaintedChurchArchivalImageSources";
import { PaintedChurchGallery } from "@/components/editorial/PaintedChurchGallery";
import { PaintedChurchKnowledgeLinks } from "@/components/editorial/PaintedChurchKnowledgeLinks";
import { PaintedChurchRegisterEvidence } from "@/components/editorial/PaintedChurchRegisterEvidence";
import { canonicalPaintedChurchProfileBySlug } from "@/data/painted-church-profile-index";
import { schulenburgTourInfo } from "@/data/painted-church-research";
import { canonicalPaintedChurchResearchBySlug } from "@/data/painted-church-research-index";

export function PaintedChurchResearchDossier({ slug, schulenburgCluster }: { slug: string; schulenburgCluster?: boolean }) {
  const dossier = canonicalPaintedChurchResearchBySlug(slug);
  const additionalProfile = canonicalPaintedChurchProfileBySlug(slug);

  return (
    <>
      {additionalProfile ? (
        <section aria-labelledby="verified-profile" className="mt-14 border-t border-border pt-8">
          <p className="eyebrow text-primary">Verified profile</p>
          <h2 id="verified-profile" className="mt-3 font-display text-4xl">The church in documented facts</h2>
          <p className="mt-5 max-w-3xl text-base leading-8 text-foreground/90">{additionalProfile.quickAnswer}</p>
          <dl className="mt-8 grid gap-x-10 gap-y-6 border-y border-border py-7 sm:grid-cols-2">
            {additionalProfile.foundedYear ? <div><dt className="eyebrow text-muted-foreground">Parish founded</dt><dd className="mt-2 text-sm leading-6">{additionalProfile.foundedYear}</dd></div> : null}
            {additionalProfile.builtYear ? <div><dt className="eyebrow text-muted-foreground">Present church</dt><dd className="mt-2 text-sm leading-6">{additionalProfile.builtYear}</dd></div> : null}
            {additionalProfile.architecture ? <div><dt className="eyebrow text-muted-foreground">Architecture</dt><dd className="mt-2 text-sm leading-6">{additionalProfile.architecture}</dd></div> : null}
            {additionalProfile.heritage ? <div><dt className="eyebrow text-muted-foreground">Cultural background</dt><dd className="mt-2 text-sm leading-6">{additionalProfile.heritage}</dd></div> : null}
            {additionalProfile.facts.map((fact) => <div key={`${fact.label}-${fact.value}`}><dt className="eyebrow text-muted-foreground">{fact.label}</dt><dd className="mt-2 text-sm leading-6">{fact.value}</dd></div>)}
          </dl>
        </section>
      ) : null}

      <PaintedChurchGallery slug={slug} />
      <PaintedChurchArchivalImageSources slug={slug} />
      <PaintedChurchRegisterEvidence slug={slug} />
      <PaintedChurchKnowledgeLinks slug={slug} />

      <section aria-labelledby="editorial-standard" className="mt-14 border-l-2 border-primary bg-surface p-6 sm:p-8">
        <p className="eyebrow text-primary">Editorial standard</p>
        <h2 id="editorial-standard" className="mt-3 font-display text-3xl">Verified church, visible source trail.</h2>
        <p className="mt-4 max-w-3xl text-sm leading-7 text-muted-foreground">Texas Defined separates formal National Register designation from the broader Painted Churches tradition, gives primary and official records precedence for hard facts, records meaningful source conflicts instead of hiding them, and checks image rights at the individual-item level before publication.</p>
        <div className="mt-5 flex flex-wrap gap-x-6 gap-y-3 text-sm">
          <Link to="/explore/painted-churches/methodology" className="border-b border-primary text-primary">Research methodology & corrections</Link>
          <Link to="/explore/painted-churches/compare" className="border-b border-primary text-primary">Compare all verified churches</Link>
          <Link to="/explore/painted-churches/how-many" className="border-b border-primary text-primary">Why Painted Church counts differ</Link>
          <Link to="/explore/painted-churches/techniques" className="border-b border-primary text-primary">Decorative painting techniques</Link>
          <Link to="/explore/painted-churches/symbols" className="border-b border-primary text-primary">Symbols & iconography</Link>
          <Link to="/explore/painted-churches/people" className="border-b border-primary text-primary">Artists & architects</Link>
          <Link to="/explore/painted-churches/heritage" className="border-b border-primary text-primary">Heritage communities</Link>
          <Link to="/explore/painted-churches/preservation" className="border-b border-primary text-primary">Preservation & authenticity</Link>
          <Link to="/explore/painted-churches/how-to-read" className="border-b border-primary text-primary">How to read a Painted Church</Link>
          <Link to="/explore/painted-churches/knowledge-graph" className="border-b border-primary text-primary">Knowledge graph</Link>
        </div>
      </section>

      {dossier ? (
        <section aria-labelledby="research-dossier" className="mt-14 border-t border-border pt-8">
          <p className="eyebrow text-primary">Research dossier</p>
          <h2 id="research-dossier" className="mt-3 font-display text-4xl">How to read this church like a historian</h2>
          <p className="mt-5 max-w-3xl text-base leading-8 text-foreground/90">{dossier.researchSummary}</p>

          <div className="mt-9 grid gap-px border border-border bg-border sm:grid-cols-2">
            {dossier.lookFor.map((item) => (
              <div key={item.label} className="bg-background p-6">
                <h3 className="font-display text-2xl">{item.label}</h3>
                <p className="mt-3 text-sm leading-7 text-muted-foreground">{item.detail}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 space-y-10">
            {dossier.interpretation.map((section) => (
              <section key={section.heading}>
                <h3 className="font-display text-3xl">{section.heading}</h3>
                <div className="mt-4 space-y-4">
                  {section.paragraphs.map((paragraph) => <p key={paragraph} className="max-w-3xl text-base leading-8 text-muted-foreground">{paragraph}</p>)}
                </div>
              </section>
            ))}
          </div>

          <div className="mt-10 space-y-10 border-t border-border pt-8">
            <p className="eyebrow text-primary">Community context</p>
            {dossier.communityContext.map((section) => (
              <section key={section.heading}>
                <h3 className="font-display text-3xl">{section.heading}</h3>
                <div className="mt-4 space-y-4">
                  {section.paragraphs.map((paragraph) => <p key={paragraph} className="max-w-3xl text-base leading-8 text-muted-foreground">{paragraph}</p>)}
                </div>
              </section>
            ))}
          </div>

          {dossier.recordNotes?.length ? (
            <div className="mt-10 border-l-2 border-primary bg-surface p-6">
              <p className="eyebrow text-primary">Research notes</p>
              <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-7 text-muted-foreground">
                {dossier.recordNotes.map((note) => <li key={note}>{note}</li>)}
              </ul>
            </div>
          ) : null}

          <div className="mt-10 border-t border-border pt-8">
            <p className="eyebrow text-primary">Research trail</p>
            <h3 className="mt-3 font-display text-3xl">Sources used for this deeper reading</h3>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {dossier.sources.map((source) => (
                <div key={source.url} className="border border-border p-5">
                  <p className="eyebrow text-muted-foreground">{source.tier.replace("-", " ")}</p>
                  <a href={source.url} target="_blank" rel="noreferrer" className="mt-2 inline-block font-display text-xl leading-tight text-primary hover:underline">{source.label}</a>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">Used for {source.use}.</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {schulenburgCluster ? (
        <section aria-labelledby="schulenburg-logistics" className="mt-14 border-t border-border pt-8">
          <p className="eyebrow text-primary">Current Schulenburg touring information</p>
          <h2 id="schulenburg-logistics" className="mt-3 font-display text-4xl">Official local logistics, not copied travel-blog estimates</h2>
          <p className="mt-5 max-w-3xl text-base leading-8 text-muted-foreground">
            The Greater Schulenburg Chamber of Commerce coordinates the official local Painted Churches tours. Its current guidance was checked {new Date(`${schulenburgTourInfo.checkedAt}T12:00:00`).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}.
          </p>
          <dl className="mt-8 grid border-y border-border sm:grid-cols-2">
            <div className="border-b border-border py-5 sm:border-r sm:pr-6"><dt className="eyebrow text-muted-foreground">Chamber office</dt><dd className="mt-2 text-sm leading-7">{schulenburgTourInfo.chamberAddress}</dd></div>
            <div className="border-b border-border py-5 sm:pl-6"><dt className="eyebrow text-muted-foreground">Phone</dt><dd className="mt-2 text-sm leading-7"><a href={`tel:${schulenburgTourInfo.phone.replace(/[^0-9]/g, "")}`} className="text-primary">{schulenburgTourInfo.phone}</a></dd></div>
            <div className="border-b border-border py-5 sm:border-r sm:pr-6"><dt className="eyebrow text-muted-foreground">Self-guided hours</dt><dd className="mt-2 text-sm leading-7">{schulenburgTourInfo.normalSelfGuidedHours}</dd></div>
            <div className="border-b border-border py-5 sm:pl-6"><dt className="eyebrow text-muted-foreground">Self-guided groups</dt><dd className="mt-2 text-sm leading-7">{schulenburgTourInfo.selfGuidedLimit}</dd></div>
            <div className="border-b border-border py-5 sm:border-r sm:pr-6"><dt className="eyebrow text-muted-foreground">Guided tours</dt><dd className="mt-2 text-sm leading-7">{schulenburgTourInfo.guidedTour}</dd></div>
            <div className="border-b border-border py-5 sm:pl-6"><dt className="eyebrow text-muted-foreground">Recommended start</dt><dd className="mt-2 text-sm leading-7">{schulenburgTourInfo.recommendedStart}</dd></div>
            <div className="border-b border-border py-5 sm:border-r sm:pr-6"><dt className="eyebrow text-muted-foreground">Reservation</dt><dd className="mt-2 text-sm leading-7">{schulenburgTourInfo.deposit}</dd></div>
            <div className="border-b border-border py-5 sm:pl-6"><dt className="eyebrow text-muted-foreground">Accessibility</dt><dd className="mt-2 text-sm leading-7">{schulenburgTourInfo.accessibility}</dd></div>
            <div className="py-5 sm:col-span-2"><dt className="eyebrow text-muted-foreground">Printed map</dt><dd className="mt-2 text-sm leading-7">{schulenburgTourInfo.mapNote}</dd></div>
          </dl>
          <p className="mt-7 text-sm leading-7 text-muted-foreground">{schulenburgTourInfo.spanish}</p>

          <div className="mt-8 border-t border-border pt-6">
            <p className="eyebrow text-muted-foreground">Church etiquette from the Chamber</p>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-7 text-muted-foreground">
              {schulenburgTourInfo.etiquette.map((rule) => <li key={rule}>{rule}</li>)}
            </ul>
          </div>

          <div className="mt-7 flex flex-wrap gap-x-6 gap-y-3 text-sm">
            <a href={schulenburgTourInfo.chamberUrl} target="_blank" rel="noreferrer" className="border-b border-primary text-primary">Official Chamber tour information</a>
            <a href={schulenburgTourInfo.texasTimeTravelUrl} target="_blank" rel="noreferrer" className="border-b border-primary text-primary">Texas Historical Commission tourism directory</a>
          </div>
        </section>
      ) : null}
    </>
  );
}
