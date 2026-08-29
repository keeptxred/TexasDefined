import { createFileRoute, notFound, redirect } from "@tanstack/react-router";
import { Container } from "@/components/layout/Container";
import { texasDefinedBrand } from "@/brand/texasdefined";
import { getTexasIconProfile } from "@/data/texas-icons.functions";
import {
  TEXAS_ICON_CATEGORIES,
  TEXAS_ICON_CATEGORY_AUTHORITY_HUBS,
  type TexasIconNarrativeProfile,
} from "@/data/texas-icons-types";
import { buildMeta, canonicalLink } from "@/lib/seo";

export const Route = createFileRoute("/texas-icons/$slug")({
  loader: async ({ params }) => {
    const result = await getTexasIconProfile({ data: { slug: params.slug } });
    if (!result) throw notFound();

    const ownPath = `/texas-icons/${params.slug}`;
    if (result.icon.href !== ownPath) {
      throw redirect({ href: result.icon.href, statusCode: 301 });
    }

    // Pure roster/fact data can power lists and editorial systems, but it is not
    // a standalone article. Only a real narrative profile gets a public route.
    if (!result.talentProfile && !result.researchProfile) throw notFound();

    return result;
  },
  head: ({ loaderData }) => {
    if (!loaderData) return {};
    const canonicalPath = `/texas-icons/${loaderData.icon.slug}`;
    return {
      meta: buildMeta(texasDefinedBrand, {
        canonicalPath,
        title: `${loaderData.icon.name}: Texas Icon`,
        description: loaderData.icon.summary,
        type: "article",
      }),
      links: [canonicalLink(texasDefinedBrand, canonicalPath)],
    };
  },
  component: TexasIconProfilePage,
});

function TexasIconProfilePage() {
  const { icon, related, talentProfile, researchProfile } = Route.useLoaderData();
  const category = TEXAS_ICON_CATEGORIES.find((candidate) => candidate.id === icon.category);
  const authorityHub = TEXAS_ICON_CATEGORY_AUTHORITY_HUBS[icon.category];
  const canonicalPath = `/texas-icons/${icon.slug}`;
  const narrativeProfile: TexasIconNarrativeProfile = talentProfile ?? researchProfile!;
  const schema = {
    "@context": "https://schema.org",
    "@type": schemaType(icon.subjectType),
    name: icon.name,
    description: narrativeProfile.dek,
    url: `https://texasdefined.com${canonicalPath}`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <Container className="pb-16 pt-12 sm:pb-24 sm:pt-16">
        <article className="mx-auto max-w-6xl">
          <nav aria-label="Breadcrumb" className="border-b border-border pb-4 text-xs uppercase tracking-[0.14em] text-muted-foreground">
            <a href="/" className="hover:text-foreground">Front page</a>
            <span aria-hidden="true" className="mx-2">/</span>
            <a href="/texas-icons" className="hover:text-foreground">Texas Icons</a>
            <span aria-hidden="true" className="mx-2">/</span>
            <span aria-current="page" className="text-foreground">{icon.name}</span>
          </nav>

          <header className="grid gap-8 border-b border-border py-10 lg:grid-cols-[minmax(0,1fr)_16rem] lg:items-end">
            <div>
              <p className="eyebrow text-primary">{category?.label ?? "Texas Icon"}</p>
              <h1 className="mt-3 max-w-4xl font-display text-5xl leading-[0.98] sm:text-7xl">{icon.name}</h1>
              <p className="mt-6 max-w-3xl text-lg leading-8 text-muted-foreground">{icon.summary}</p>
            </div>
            <dl className="border-y border-border py-4 text-sm lg:border-y-0 lg:border-l lg:py-0 lg:pl-6">
              <Fact label="Roster rank" value={`#${icon.rank}`} />
              <Fact label="Category" value={category?.label} />
              <Fact label="Subject type" value={title(icon.subjectType)} />
              <Fact
                label="Profile source"
                value={
                  icon.reuseKind === "texas-talent-ready"
                    ? "Texas Talent canonical profile"
                    : icon.reuseKind === "texas-talent-staged"
                      ? "Published from Texas Talent research"
                      : "Published Texas Icons profile"
                }
              />
            </dl>
          </header>

          <NarrativeProfile profile={narrativeProfile} subjectType={icon.subjectType} />

          <section className="py-12">
            <div className="flex items-end justify-between gap-6 border-b border-border pb-4">
              <div>
                <p className="eyebrow text-primary">Cross-linked profiles</p>
                <h2 className="mt-2 font-display text-4xl">More {category?.label ?? "Texas icons"}</h2>
              </div>
              <div className="flex flex-col items-end gap-2 text-sm font-semibold text-primary">
                {authorityHub ? <a href={authorityHub.href}>{authorityHub.label} →</a> : null}
                <a href={`/texas-icons#${icon.category}`}>See the category →</a>
              </div>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4">
              {related.map((candidate, index) => (
                <RelatedIcon key={candidate.slug} candidate={candidate} index={index} />
              ))}
            </div>
          </section>
        </article>
      </Container>
    </>
  );
}

function RelatedIcon({ candidate, index }: { candidate: { slug: string; name: string; rank: number; href: string; indexableAtOwnRoute: boolean; reuseKind: string }; index: number }) {
  const className = `group border-b border-border py-6 sm:px-5 ${index % 4 !== 0 ? "lg:border-l" : ""}`;
  const ownRoute = candidate.href === `/texas-icons/${candidate.slug}`;
  const hasPublicDestination = !ownRoute || candidate.indexableAtOwnRoute;
  const content = (
    <>
      <span className="text-xs font-semibold tabular-nums text-muted-foreground">#{candidate.rank}</span>
      <strong className={`mt-2 block font-display text-2xl leading-tight ${hasPublicDestination ? "group-hover:text-primary" : ""}`}>
        {candidate.name}
      </strong>
      <small className="mt-3 block text-sm leading-6 text-muted-foreground">
        {hasPublicDestination
          ? candidate.href.startsWith("/texas-icons/") ? "Open profile →" : "Open canonical guide →"
          : "Data-only roster record"}
      </small>
    </>
  );
  return hasPublicDestination
    ? <a href={candidate.href} className={className}>{content}</a>
    : <div className={className}>{content}</div>;
}

function NarrativeProfile({
  profile,
  subjectType,
}: {
  profile: TexasIconNarrativeProfile;
  subjectType: string;
}) {
  const storyHeading = subjectType === "person" ? "Life and career" : "Story and significance";
  return (
    <>
      <section className="grid gap-6 border-b border-border py-10 lg:grid-cols-[14rem_1fr]">
        <div>
          <p className="eyebrow text-primary">Texas story</p>
          <h2 className="mt-2 font-display text-3xl">{storyHeading}</h2>
        </div>
        <div className="max-w-3xl space-y-5 text-base leading-8">
          {profile.overview.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
        </div>
      </section>

      <section className="grid gap-6 border-b border-border py-10 lg:grid-cols-[14rem_1fr]">
        <div>
          <p className="eyebrow text-primary">Defining work</p>
          <h2 className="mt-2 font-display text-3xl">What to know</h2>
        </div>
        <ul className="grid gap-px bg-border sm:grid-cols-2">
          {profile.definingWorks.map((work) => (
            <li key={work} className="bg-background p-4 font-semibold">{work}</li>
          ))}
        </ul>
      </section>

      <section className="grid gap-6 border-b border-border py-10 lg:grid-cols-[14rem_1fr]">
        <div>
          <p className="eyebrow text-primary">Timeline</p>
          <h2 className="mt-2 font-display text-3xl">Key milestones</h2>
        </div>
        <ol>
          {profile.timeline.map((item) => (
            <li key={`${item.year}-${item.event}`} className="grid gap-2 border-t border-border py-4 sm:grid-cols-[7rem_1fr]">
              <strong>{item.year}</strong>
              <span className="text-muted-foreground">{item.event}</span>
            </li>
          ))}
        </ol>
      </section>

      <section className="grid gap-6 border-b border-border py-10 lg:grid-cols-[14rem_1fr]">
        <div>
          <p className="eyebrow text-primary">Texas connections</p>
          <h2 className="mt-2 font-display text-3xl">Places in the story</h2>
        </div>
        <div className="grid gap-px bg-border sm:grid-cols-2">
          {profile.texasPlaces.map((place) => (
            <div key={`${place.name}-${place.context}`} className="bg-background p-5">
              {place.href ? (
                <a href={place.href} className="font-display text-2xl hover:text-primary">{place.name}</a>
              ) : (
                <h3 className="font-display text-2xl">{place.name}</h3>
              )}
              <p className="mt-2 text-sm leading-6 text-muted-foreground">{place.context}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="grid gap-6 border-b border-border py-10 lg:grid-cols-[14rem_1fr]">
        <div>
          <p className="eyebrow text-primary">Legacy</p>
          <h2 className="mt-2 font-display text-3xl">Why the story lasts</h2>
        </div>
        <div className="max-w-3xl space-y-5 text-base leading-8">
          {profile.legacy.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
        </div>
      </section>

      <section className="grid gap-6 border-b border-border py-10 lg:grid-cols-[14rem_1fr]">
        <div>
          <p className="eyebrow text-primary">Sources</p>
          <h2 className="mt-2 font-display text-3xl">Research trail</h2>
        </div>
        <div>
          <ul className="space-y-3">
            {profile.sources.map((source) => (
              <li key={source.url}>
                <a href={source.url} target="_blank" rel="noreferrer" className="font-semibold underline decoration-primary/50 underline-offset-4 hover:text-primary">
                  {source.label} ↗
                </a>
              </li>
            ))}
          </ul>
          <p className="mt-5 text-xs uppercase tracking-[0.12em] text-muted-foreground">
            Last reviewed {profile.lastReviewedAt}
          </p>
        </div>
      </section>
    </>
  );
}

function Fact({ label, value }: { label: string; value?: string }) {
  return value ? (
    <div className="border-b border-border py-3 last:border-b-0 lg:first:pt-0 lg:last:pb-0">
      <dt className="text-[0.68rem] uppercase tracking-[0.16em] text-muted-foreground">{label}</dt>
      <dd className="mt-1 font-medium">{value}</dd>
    </div>
  ) : null;
}

function schemaType(subjectType: string) {
  if (subjectType === "person") return "Person";
  if (subjectType === "group") return "Organization";
  if (subjectType === "brand") return "Organization";
  if (subjectType === "place") return "Place";
  return "Thing";
}

function title(value: string) {
  return value.replaceAll("-", " ").replace(/\b\w/g, (character) => character.toUpperCase());
}
