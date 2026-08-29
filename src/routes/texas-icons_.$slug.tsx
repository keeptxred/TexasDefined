import { createFileRoute, notFound, redirect } from "@tanstack/react-router";
import { Container } from "@/components/layout/Container";
import { texasDefinedBrand } from "@/brand/texasdefined";
import { getTexasIconProfile } from "@/data/texas-icons.functions";
import {
  TEXAS_ICON_CATEGORIES,
  TEXAS_ICON_CATEGORY_AUTHORITY_HUBS,
  type TexasIconNarrativeProfile,
  type TexasIconResearchProfile,
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
        type: loaderData.talentProfile || loaderData.researchProfile ? "article" : "website",
        robots: loaderData.icon.indexableAtOwnRoute
          ? undefined
          : "noindex, follow, max-image-preview:large",
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
  const narrativeProfile: TexasIconNarrativeProfile | null = talentProfile ?? researchProfile;
  const schema = talentProfile
    ? {
        "@context": "https://schema.org",
        "@type": icon.subjectType === "group" ? "MusicGroup" : "Person",
        name: talentProfile.name,
        description: talentProfile.dek,
        url: `https://texasdefined.com${canonicalPath}`,
      }
    : null;

  return (
    <>
      {schema ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ) : null}
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
                    ? "Existing Texas Talent record"
                    : icon.reuseKind === "texas-talent-staged"
                      ? "Existing Texas Talent draft"
                      : icon.reuseKind === "icon-research-ready"
                        ? "Published Texas Icons research"
                        : icon.reuseKind === "icon-research-staged"
                          ? "Texas Icons researched draft"
                          : "Texas Icons research queue"
                }
              />
            </dl>
          </header>

          {researchProfile && icon.reuseKind === "icon-research-staged"
            ? <ResearchDraftNotice profile={researchProfile} />
            : null}
          {researchProfile && icon.reuseKind === "icon-research-ready"
            ? <PublishedResearchNotice profile={researchProfile} />
            : null}

          {narrativeProfile ? (
            <NarrativeProfile profile={narrativeProfile} />
          ) : (
            <section className="grid gap-6 border-b border-border py-10 lg:grid-cols-[14rem_1fr]">
              <div>
                <p className="eyebrow text-primary">Editorial status</p>
                <h2 className="mt-2 font-display text-3xl">Research before indexing</h2>
              </div>
              <div className="max-w-3xl space-y-4 text-base leading-7 text-muted-foreground">
                <p>
                  This subject is part of the 250-icon editorial roster, but TexasDefined has not
                  promoted this starter record into an indexable profile. The route is intentionally
                  noindex while source verification and substantive profile research are incomplete.
                </p>
                <p>
                  Cross-links are live now so the editorial network has one stable slug per subject.
                  A future research pass can deepen this same canonical record rather than creating
                  a second page.
                </p>
                {icon.reuseKind === "texas-talent-staged" ? (
                  <p>
                    TexasDefined already has a Texas Talent research record for this subject. That
                    existing record is being reused here and remains behind its established
                    publication-readiness gate.
                  </p>
                ) : null}
              </div>
            </section>
          )}

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
                <a
                  key={candidate.slug}
                  href={candidate.href}
                  className={`group border-b border-border py-6 sm:px-5 ${index % 4 !== 0 ? "lg:border-l" : ""}`}
                >
                  <span className="text-xs font-semibold tabular-nums text-muted-foreground">#{candidate.rank}</span>
                  <strong className="mt-2 block font-display text-2xl leading-tight group-hover:text-primary">
                    {candidate.name}
                  </strong>
                  <small className="mt-3 block text-sm leading-6 text-muted-foreground">
                    {candidate.href.startsWith("/texas-icons/") ? "Open profile" : "Open canonical guide"} →
                  </small>
                </a>
              ))}
            </div>
          </section>
        </article>
      </Container>
    </>
  );
}

function ResearchDraftNotice({ profile }: { profile: TexasIconResearchProfile }) {
  return (
    <section className="border-b border-border py-8">
      <div className="grid gap-5 lg:grid-cols-[14rem_1fr]">
        <div>
          <p className="eyebrow text-primary">Editorial status</p>
          <h2 className="mt-2 font-display text-3xl">Researched draft · noindex</h2>
        </div>
        <div className="max-w-3xl space-y-3 text-sm leading-7 text-muted-foreground">
          <p>{profile.publicationNote}</p>
          <p>
            This research is visible for editorial review and cross-linking, but it does not emit
            publishable structured data and cannot become indexable merely because the copy exists.
          </p>
        </div>
      </div>
    </section>
  );
}

function PublishedResearchNotice({ profile }: { profile: TexasIconResearchProfile }) {
  return (
    <section className="border-b border-border py-8">
      <div className="grid gap-5 lg:grid-cols-[14rem_1fr]">
        <div>
          <p className="eyebrow text-primary">Editorial status</p>
          <h2 className="mt-2 font-display text-3xl">Source-reviewed profile</h2>
        </div>
        <div className="max-w-3xl space-y-3 text-sm leading-7 text-muted-foreground">
          <p>
            This profile has completed Texas Icons launch certification for sources, internal links,
            and a text-only image policy. The underlying research record remains staged so later
            ownership or quality changes can fail closed without creating a duplicate page.
          </p>
          <p>Research last reviewed {profile.lastReviewedAt}.</p>
        </div>
      </div>
    </section>
  );
}

function NarrativeProfile({ profile }: { profile: TexasIconNarrativeProfile }) {
  return (
    <>
      <section className="grid gap-6 border-b border-border py-10 lg:grid-cols-[14rem_1fr]">
        <div>
          <p className="eyebrow text-primary">Texas story</p>
          <h2 className="mt-2 font-display text-3xl">Life and career</h2>
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

function title(value: string) {
  return value.replaceAll("-", " ").replace(/\b\w/g, (character) => character.toUpperCase());
}
