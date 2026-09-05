import { lazy, Suspense } from "react";
import { Link } from "@tanstack/react-router";

import { DestinationCampingDetails } from "@/components/camping/DestinationCampingDetails";
import { AutoEntityLinks } from "@/components/content/AutoEntityLinks";
import { AnswerSummary } from "@/components/content/AnswerSummary";
import { ArticleCard } from "@/components/editorial/ArticleCard";
import { DestinationRelationships } from "@/components/editorial/DestinationRelationships";
import { DestinationVisitPlanner } from "@/components/editorial/DestinationVisitPlanner";
import { MapPreview } from "@/components/editorial/MapPreview";
import { Section, SectionHeader } from "@/components/editorial/SectionHeader";
import { Container } from "@/components/layout/Container";
import { INTERNAL_LINK_POLICIES, policyForSurface } from "@/platform/internal-link-policies";
import { Route as DestinationRoute } from "@/routes/destination.$slug";

const DestinationViatorBooking = lazy(() =>
  import("@/components/editorial/DestinationViatorBooking").then((module) => ({
    default: module.DestinationViatorBooking,
  })),
);

function validExternalUrl(value?: string) {
  return Boolean(value && /^https?:\/\//i.test(value));
}

function checkedDate(value?: string) {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return date.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}

export function DestinationPageContent() {
  const { destination, graph, categories, regions, relatedArticles, relationshipGroups, campingProfiles } = DestinationRoute.useLoaderData();
  const region = regions.find((item) => item.id === destination.region);
  const categoryName = categories.find((category) => category.slug === destination.category)?.name ?? destination.category.replace(/-/g, " ");
  const excludedEntityIds = [`${destination.category}:${destination.slug}`, `attraction:${destination.slug}`];
  const surfacePolicy = INTERNAL_LINK_POLICIES.destination;
  const destinationPolicy = policyForSurface("destination", { excludedEntityIds, region: destination.region });
  let remainingLinks = surfacePolicy.pageBudget;
  const limit = (requested: number) => Math.max(0, Math.min(requested, surfacePolicy.blockBudget, remainingLinks));
  const spend = (requested: number) => { const value = limit(requested); remainingLinks -= value; return value; };
  const verifiedLabel = checkedDate(destination.sourceCheckedAt);
  const countySlug = destination.county?.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

  return <>
    <Container className="pt-10 sm:pt-14"><nav aria-label="Breadcrumb" className="text-[0.72rem] uppercase tracking-[0.14em] text-muted-foreground"><ol className="flex flex-wrap items-center gap-2"><li><Link to="/" className="hover:text-foreground">Front page</Link></li><li aria-hidden>·</li><li><Link to="/explore" className="hover:text-foreground">Explore</Link></li><li aria-hidden>·</li><li><Link to="/explore/$category" params={{ category: destination.category }} className="hover:text-foreground">{categoryName}</Link></li></ol></nav></Container>

    <section className="relative isolate mt-5 overflow-hidden bg-ink text-ink-foreground">
      <img src={destination.hero.src} alt={destination.hero.alt} width={destination.hero.width} height={destination.hero.height} fetchPriority="high" decoding="async" className="absolute inset-0 size-full object-cover opacity-65" />
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/65 to-ink/15" />
      <Container className="relative flex min-h-[64vh] flex-col justify-end pb-14 pt-40 sm:pb-16">
        <p className="eyebrow text-ink-foreground/80">{region?.name ?? "Texas"} · {categoryName}</p>
        <h1 className="mt-4 max-w-4xl font-display text-5xl leading-[0.98] sm:text-7xl">{destination.name}</h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-ink-foreground/88">{destination.summary}</p>
        {destination.hero.credit && <p className="mt-6 text-[0.7rem] uppercase tracking-[0.12em] text-ink-foreground/60">Photography: {destination.hero.credit}</p>}
      </Container>
    </section>

    <AnswerSummary
      eyebrow="Plan the visit"
      title={`${destination.name} at a glance`}
      items={[
        { question: `Where is ${destination.name}?`, answer: `${destination.name} is near ${destination.nearestTown}, Texas${destination.county ? `, in ${destination.county} County` : ""}.` },
        { question: `When is the best time to visit ${destination.name}?`, answer: destination.bestSeason },
        { question: `Do I need to plan ahead for ${destination.name}?`, answer: destination.entryNote },
        ...(destination.managingAuthority ? [{ question: `Who manages ${destination.name}?`, answer: destination.managingAuthority }] : []),
      ]}
    />

    <Container className="grid gap-14 py-16 lg:grid-cols-[minmax(0,1.65fr)_minmax(260px,.75fr)] lg:py-20">
      <div className="max-w-[44rem]">
        <section aria-labelledby="why-go" className="border-t border-border pt-8">
          <p className="eyebrow text-primary">The place</p>
          <h2 id="why-go" className="mt-3 font-display text-4xl leading-tight">Why {destination.name} belongs on the list</h2>
          <div className="editorial-body mt-7 text-foreground/90">{destination.body.map((paragraph) => <p key={paragraph} className="mt-6 first:mt-0"><AutoEntityLinks text={paragraph} entities={graph} maxLinks={spend(4)} policy={destinationPolicy} /></p>)}</div>
        </section>
        <section aria-labelledby="before-you-go" className="mt-16 border-t border-border pt-8">
          <p className="eyebrow text-primary">The details</p>
          <h2 id="before-you-go" className="mt-3 font-display text-3xl">Plan the visit</h2>
          <dl className="mt-8 grid border-y border-border sm:grid-cols-2">
            <div className="border-b border-border py-5 sm:border-r sm:pr-6"><dt className="eyebrow text-muted-foreground">Nearest town</dt><dd className="mt-2 text-base">Near <AutoEntityLinks text={destination.nearestTown} entities={graph} maxLinks={spend(1)} policy={destinationPolicy} />, Texas</dd></div>
            <div className="border-b border-border py-5 sm:pl-6"><dt className="eyebrow text-muted-foreground">Best season</dt><dd className="mt-2 text-base">{destination.bestSeason}</dd></div>
            {destination.county && <div className="border-b border-border py-5 sm:border-r sm:pr-6"><dt className="eyebrow text-muted-foreground">County</dt><dd className="mt-2 text-base">{countySlug ? <Link to="/$kind/$slug" params={{ kind: "county", slug: countySlug }} className="underline decoration-primary/40 underline-offset-4 hover:text-primary">{destination.county} County</Link> : `${destination.county} County`}</dd></div>}
            {destination.address && <div className="border-b border-border py-5 sm:pl-6"><dt className="eyebrow text-muted-foreground">Address</dt><dd className="mt-2 text-base">{destination.address}</dd></div>}
            <div className="py-5 sm:col-span-2"><dt className="eyebrow text-muted-foreground">Entry & reservations</dt><dd className="mt-2 text-base leading-7">{destination.entryNote}</dd></div>
            {destination.accessibilityNotes && <div className="border-t border-border py-5 sm:col-span-2"><dt className="eyebrow text-muted-foreground">Accessibility</dt><dd className="mt-2 text-base leading-7">{destination.accessibilityNotes}</dd></div>}
            {destination.directions && <div className="border-t border-border py-5 sm:col-span-2"><dt className="eyebrow text-muted-foreground">Getting there</dt><dd className="mt-2 text-base leading-7">{destination.directions}</dd></div>}
          </dl>
          <div className="mt-7 flex flex-wrap gap-6">{validExternalUrl(destination.reservationUrl) && <a href={destination.reservationUrl} target="_blank" rel="noreferrer noopener" className="eyebrow border-b border-primary pb-1 text-primary">Reservations</a>}{validExternalUrl(destination.officialUrl) && <a href={destination.officialUrl} target="_blank" rel="noreferrer noopener" className="eyebrow border-b border-primary pb-1 text-primary">Official visitor information</a>}</div>
        </section>
        <DestinationCampingDetails destinationSlug={destination.slug} destinationName={destination.name} profiles={campingProfiles} />
        <Suspense fallback={null}><DestinationViatorBooking destination={destination} /></Suspense>
        <div className="mt-14"><DestinationVisitPlanner destination={destination} /></div>
      </div>

      <aside className="space-y-8 lg:sticky lg:top-28 lg:self-start">
        <div className="border-t-2 border-foreground pt-5"><p className="eyebrow text-primary">At a glance</p><dl className="mt-5 divide-y divide-border text-sm"><div className="pb-4"><dt className="text-muted-foreground">Nearest town</dt><dd className="mt-1 font-medium"><AutoEntityLinks text={destination.nearestTown} entities={graph} maxLinks={spend(1)} policy={destinationPolicy} /></dd></div><div className="py-4"><dt className="text-muted-foreground">Best season</dt><dd className="mt-1 font-medium">{destination.bestSeason}</dd></div><div className="py-4"><dt className="text-muted-foreground">Before arrival</dt><dd className="mt-1 leading-6">{destination.entryNote}</dd></div>{destination.managingAuthority && <div className="pt-4"><dt className="text-muted-foreground">Managed by</dt><dd className="mt-1 font-medium">{destination.managingAuthority}</dd></div>}</dl></div>
        {(validExternalUrl(destination.officialUrl) || verifiedLabel) && <div className="border-t border-border pt-5 text-sm"><p className="eyebrow text-muted-foreground">Source notes</p>{verifiedLabel && <p className="mt-3 leading-6 text-muted-foreground">Visitor information checked {verifiedLabel}.</p>}{validExternalUrl(destination.officialUrl) && <a href={destination.officialUrl} target="_blank" rel="noreferrer noopener" className="eyebrow mt-4 inline-block border-b border-primary pb-1 text-primary">Official source</a>}</div>}
        <MapPreview markers={[{ id: destination.id, label: destination.name, point: destination.coordinates }]} directionsLabel={`${destination.name}, Texas`} />
      </aside>
    </Container>

    <DestinationRelationships destination={destination} groups={relationshipGroups} regionName={region?.name} />
    {relatedArticles.length > 0 && <Section><SectionHeader eyebrow="Read next" title={`More from ${categoryName}`} /><div className="mt-8 grid gap-6 lg:grid-cols-3">{relatedArticles.map((article) => <ArticleCard key={article.id} article={article} />)}</div></Section>}
  </>;
}
