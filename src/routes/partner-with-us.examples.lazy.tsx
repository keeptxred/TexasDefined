import { createLazyFileRoute } from '@tanstack/react-router';

import { Container } from '@/components/layout/Container';

export const Route = createLazyFileRoute('/partner-with-us/examples')({ component: AdvertisingExamplesPage });

type DemoPlacementProps = {
  eyebrow: string;
  title: string;
  body: string;
  partner: string;
  cta: string;
};

function DemoPlacement({ eyebrow, title, body, partner, cta }: DemoPlacementProps) {
  return <article className="border border-border bg-background p-6 sm:p-8">
    <div className="flex flex-wrap items-center justify-between gap-3"><p className="text-[10px] font-bold uppercase tracking-[0.16em] text-primary">Sample advertiser · Demonstration only</p><span className="border border-border px-3 py-1 text-xs text-muted-foreground">{eyebrow}</span></div>
    <p className="mt-5 text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">Presented by {partner}</p>
    <h2 className="mt-2 font-display text-3xl">{title}</h2>
    <p className="mt-4 text-sm leading-7 text-muted-foreground">{body}</p>
    <span className="mt-5 inline-block border border-primary bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground">{cta} →</span>
    <p className="mt-4 text-xs leading-5 text-muted-foreground">Paid placement. Example only; this fictional business is not represented as a Texas Defined client.</p>
  </article>;
}

function AdvertisingExamplesPage() {
  return <main>
    <Container className="py-12 sm:py-16">
      <p className="eyebrow text-primary">Placement examples</p>
      <h1 className="mt-3 max-w-4xl font-display text-4xl sm:text-5xl">See what a Texas Defined partnership can look like before you buy.</h1>
      <p className="mt-4 max-w-3xl text-sm leading-7 text-muted-foreground">Every business shown below is fictional. These are SAMPLE / DEMONSTRATION placements using Texas Defined layout conventions so prospects can understand the treatment without implying that Texas Defined already has these advertisers.</p>

      <div className="mt-10 grid gap-6 lg:grid-cols-2">
        <DemoPlacement eyebrow="Event page" partner="Lone Star Lodge" title="Where to stay near the event" body="A clearly separated lodging module can appear beside event-planning information when the business serves that event audience and the placement is approved." cta="Explore nearby stays" />
        <DemoPlacement eyebrow="Destination guide" partner="Sample Texas Attraction" title="Add one more stop to your Hill Country weekend" body="Destination partners can appear as a contextual next step without changing Texas Defined's editorial recommendations or factual conclusions." cta="Plan a visit" />
        <DemoPlacement eyebrow="Moving to Texas" partner="Texas Moving Co." title="Planning a Texas move?" body="A relocation sponsor can sit beside practical moving resources with a disclosed call to action, destination link and campaign tracking." cta="Request moving information" />
        <DemoPlacement eyebrow="Sports travel" partner="Lone Star Lodge" title="Stay close to game day" body="Sports-travel placements can support venue guides with relevant lodging or visitor-service information while remaining separate from editorial venue coverage." cta="See lodging options" />
        <DemoPlacement eyebrow="RV / campground" partner="Hill Country RV Resort" title="A base camp for the weekend" body="An RV or outdoor partner can appear beside a destination or campground-planning section when geography and reader intent match the campaign." cta="View RV stays" />
        <DemoPlacement eyebrow="Featured hub" partner="Sample Texas Attraction" title="Featured partner for a Texas travel collection" body="Growth, Premier and custom campaigns can use an eligible hub placement when inventory permits, with prominent disclosure and a direct advertiser CTA." cta="Explore the partner" />
      </div>

      <section className="mt-12 border-y border-border py-8">
        <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-primary">Sample advertiser · Demonstration only</p>
        <p className="mt-3 text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">Sponsored feature treatment · Presented by Sample Texas Attraction</p>
        <h2 className="mt-3 max-w-4xl font-display text-4xl">A sponsored feature still looks unmistakably sponsored.</h2>
        <p className="mt-4 max-w-3xl text-sm leading-7 text-muted-foreground">A Premier or custom campaign may include a clearly labeled sponsored feature when editorially appropriate. The advertiser relationship is disclosed at the top; paid material does not masquerade as independent editorial reporting.</p>
        <span className="mt-5 inline-block border-b border-primary text-sm font-semibold text-primary">Example sponsored CTA →</span>
      </section>

      <section className="mt-12">
        <p className="eyebrow text-primary">Desktop and mobile</p>
        <h2 className="mt-3 font-display text-3xl">Designed to remain clear at both sizes.</h2>
        <div className="mt-6 grid gap-6 lg:grid-cols-[1.4fr_0.6fr]">
          <div className="border border-border p-6"><p className="text-xs font-bold uppercase tracking-[0.14em] text-primary">Desktop sample · Demonstration only</p><div className="mt-5 grid gap-5 sm:grid-cols-[140px_1fr]"><div className="aspect-[4/3] bg-surface" aria-hidden="true" /><div><p className="text-xs text-muted-foreground">Presented by Lone Star Lodge</p><h3 className="mt-2 font-display text-2xl">Stay nearby</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">Logo/image area, concise description, destination link and contextual CTA.</p></div></div></div>
          <div className="mx-auto w-full max-w-[360px] border border-border p-5"><p className="text-xs font-bold uppercase tracking-[0.14em] text-primary">Mobile sample · Demonstration only</p><div className="mt-4 aspect-[4/3] bg-surface" aria-hidden="true" /><p className="mt-4 text-xs text-muted-foreground">Presented by Hill Country RV Resort</p><h3 className="mt-2 font-display text-2xl">Camp close to the route</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">The disclosure, partner identity and CTA stay visible without relying on desktop-only placement.</p></div>
        </div>
      </section>

      <div className="mt-12 flex flex-wrap gap-3"><a href="/partner-with-us#pricing" className="border border-primary bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground">Compare packages</a><a href="/partner-with-us/terms" className="border border-border px-5 py-3 text-sm font-semibold text-foreground">Review terms</a><a href="/partner-with-us/billing" className="border border-border px-5 py-3 text-sm font-semibold text-foreground">Review billing</a></div>
    </Container>
  </main>;
}
