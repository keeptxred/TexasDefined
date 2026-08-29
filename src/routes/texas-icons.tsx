import { createFileRoute } from "@tanstack/react-router";
import { Container } from "@/components/layout/Container";
import { texasDefinedBrand } from "@/brand/texasdefined";
import { getTexasIcons } from "@/data/texas-icons.functions";
import { TEXAS_ICON_CATEGORIES, TEXAS_ICON_CATEGORY_AUTHORITY_HUBS } from "@/data/texas-icons-types";
import { buildMeta, canonicalLink } from "@/lib/seo";

const canonicalPath = "/texas-icons";

export const Route = createFileRoute("/texas-icons")({
  loader: () => getTexasIcons(),
  head: ({ loaderData }) => ({
    meta: buildMeta(texasDefinedBrand, {
      canonicalPath,
      title: "250 Texas Icons: People, Places & Culture",
      description:
        "A curated TexasDefined directory of 250 influential people, places, brands, foods and symbols, with canonical links to deeper verified guides and profiles.",
      robots: loaderData?.stats.total === 250
        ? undefined
        : "noindex, follow, max-image-preview:large",
    }),
    links: [canonicalLink(texasDefinedBrand, canonicalPath)],
  }),
  component: TexasIconsHub,
});

function TexasIconsHub() {
  const { categories, stats } = Route.useLoaderData();

  return (
    <Container className="pb-16 pt-12 sm:pb-24 sm:pt-16">
      <main className="mx-auto max-w-7xl">
        <header className="border-b border-border pb-10">
          <p className="eyebrow text-primary">Texas, through its icons</p>
          <h1 className="mt-3 max-w-5xl font-display text-5xl leading-[0.96] sm:text-7xl">
            250 Texas icons, one canonical network
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-muted-foreground">
            This registry connects influential Texans, cultural institutions, sports figures,
            landmarks, foods and symbols without duplicating profiles TexasDefined already has.
            Existing authority pages stay canonical; researched profiles become indexable only
            after source, image-policy and internal-link certification.
          </p>

          <dl className="mt-8 grid gap-px overflow-hidden border border-border bg-border sm:grid-cols-2 lg:grid-cols-6">
            <Stat value={stats.total} label="Roster entries" />
            <Stat value={stats.canonicalReused} label="Existing canonical pages reused" />
            <Stat value={stats.talentReused} label="Existing Talent records reused" />
            <Stat value={stats.researchedReady} label="Published researched profiles" />
            <Stat value={stats.researchedStaged} label="Researched drafts" />
            <Stat value={stats.researchQueue} label="Still in research queue" />
          </dl>
        </header>

        <section className="border-b border-border py-8">
          <div className="grid gap-5 lg:grid-cols-[14rem_1fr]">
            <div>
              <p className="eyebrow text-primary">Publication rule</p>
              <h2 className="mt-2 font-display text-3xl">No duplicate or thin profile pages</h2>
            </div>
            <div className="max-w-3xl space-y-3 text-sm leading-7 text-muted-foreground">
              <p>
                The complete 250-entry directory is a standalone public index of the Texas Icons
                roster. A roster match to an existing Texas Talent record or knowledge-graph
                destination is reused rather than copied, and direct canonical overrides are
                reserved for high-confidence TexasDefined authority pages.
              </p>
              <p>
                Roster-only starter records are cross-linked for editorial work but stay
                <strong className="text-foreground"> noindex</strong> until the profile has
                substantive biography or subject depth, verified sources, a certified image policy,
                and reviewed internal links. The short roster notes below are intake provenance,
                not substitutes for research.
              </p>
              <p>
                A <strong className="text-foreground">researched draft</strong> remains noindex
                until those separate launch checks are certified. A <strong className="text-foreground">published profile</strong>
                has cleared that additional launch layer; the underlying research record remains
                immutable and the canonical/Talent ownership rules still take precedence.
              </p>
            </div>
          </div>
        </section>

        <nav aria-label="Texas icon categories" className="flex flex-wrap gap-2 border-b border-border py-6">
          {TEXAS_ICON_CATEGORIES.map((category) => (
            <a
              key={category.id}
              href={`#${category.id}`}
              className="rounded-full border border-border px-4 py-2 text-sm font-semibold hover:border-primary hover:text-primary"
            >
              {category.label}
            </a>
          ))}
        </nav>

        <div>
          {categories.map((category) => (
            <section key={category.id} id={category.id} className="scroll-mt-24 border-b border-border py-12">
              <div className="grid gap-7 lg:grid-cols-[16rem_1fr]">
                <div>
                  <p className="eyebrow text-primary">{category.icons.length} profiles</p>
                  <h2 className="mt-2 font-display text-4xl">{category.label}</h2>
                  <p className="mt-3 text-sm leading-6 text-muted-foreground">{category.description}</p>
                  <CategoryAuthorityLink categoryId={category.id} />
                </div>

                <ol className="grid gap-px bg-border sm:grid-cols-2 xl:grid-cols-3">
                  {category.icons.map((icon) => (
                    <li key={icon.slug} className="bg-background">
                      <a href={icon.href} className="group block h-full p-5 hover:bg-muted/40">
                        <div className="flex items-start justify-between gap-4">
                          <span className="text-xs font-semibold tabular-nums text-muted-foreground">
                            #{String(icon.rank).padStart(3, "0")}
                          </span>
                          <ReuseBadge kind={icon.reuseKind} />
                        </div>
                        <strong className="mt-4 block font-display text-2xl leading-tight group-hover:text-primary">
                          {icon.name}
                        </strong>
                        <p className="mt-3 line-clamp-3 text-sm leading-6 text-muted-foreground">
                          {icon.summary}
                        </p>
                        <span className="mt-4 inline-block text-sm font-semibold text-primary">
                          {icon.href.startsWith("/texas-icons/") ? "Open profile" : "Open canonical guide"} →
                        </span>
                      </a>
                    </li>
                  ))}
                </ol>
              </div>
            </section>
          ))}
        </div>
      </main>
    </Container>
  );
}

function CategoryAuthorityLink({ categoryId }: { categoryId: keyof typeof TEXAS_ICON_CATEGORY_AUTHORITY_HUBS | string }) {
  const authorityHub = TEXAS_ICON_CATEGORY_AUTHORITY_HUBS[categoryId as keyof typeof TEXAS_ICON_CATEGORY_AUTHORITY_HUBS];
  if (!authorityHub) return null;

  return (
    <a
      href={authorityHub.href}
      className="mt-4 inline-block text-sm font-semibold text-primary hover:underline"
    >
      {authorityHub.label} →
    </a>
  );
}

function Stat({ value, label }: { value: number; label: string }) {
  return (
    <div className="bg-background p-5">
      <dd className="font-display text-4xl">{value}</dd>
      <dt className="mt-1 text-xs uppercase tracking-[0.12em] text-muted-foreground">{label}</dt>
    </div>
  );
}

function ReuseBadge({ kind }: { kind: string }) {
  const label =
    kind === "editorial-canonical" || kind === "knowledge-graph"
      ? "Canonical"
      : kind === "texas-talent-ready"
        ? "Existing profile"
        : kind === "texas-talent-staged"
          ? "Existing draft"
          : kind === "icon-research-ready"
            ? "Published profile"
            : kind === "icon-research-staged"
              ? "Researched draft"
              : "Research queue";

  return (
    <span className="rounded-full border border-border px-2 py-1 text-[0.64rem] font-semibold uppercase tracking-[0.1em] text-muted-foreground">
      {label}
    </span>
  );
}
