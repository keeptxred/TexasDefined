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
            Existing authority pages stay canonical. Pure roster data can remain internal, but once
            TexasDefined writes a substantive sourced profile, that content publishes instead of
            sitting in a permanent unpublished queue.
          </p>

          <dl className="mt-8 grid gap-px overflow-hidden border border-border bg-border sm:grid-cols-2 lg:grid-cols-5">
            <Stat value={stats.total} label="Roster entries" />
            <Stat value={stats.canonicalReused} label="Existing canonical pages reused" />
            <Stat value={stats.talentReused} label="Texas Talent records reused" />
            <Stat value={stats.researchedStaged} label="Written profiles published" />
            <Stat value={stats.researchQueue} label="Data-only records" />
          </dl>
        </header>

        <section className="border-b border-border py-8">
          <div className="grid gap-5 lg:grid-cols-[14rem_1fr]">
            <div>
              <p className="eyebrow text-primary">Publication rule</p>
              <h2 className="mt-2 font-display text-3xl">Data stays data; written profiles publish</h2>
            </div>
            <div className="max-w-3xl space-y-3 text-sm leading-7 text-muted-foreground">
              <p>
                The 250-entry roster can exist as structured data used for directories, related-link
                systems and editorial planning. Those short intake records are not articles and do not get standalone public profile pages.
              </p>
              <p>
                Once a subject has substantive narrative depth, verified sources and the normal
                TexasDefined quality checks, the completed profile publishes at its canonical route.
                We do not write full articles merely to leave them permanently unpublished or noindex.
              </p>
              <p>
                Existing authority pages and Texas Talent ownership still take precedence so one
                subject does not split into competing biographies. When a stronger canonical owner
                exists, Texas Icons links or redirects to it rather than publishing a duplicate.
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
                  {category.icons.map((icon) => <IconCard key={icon.slug} icon={icon} />)}
                </ol>
              </div>
            </section>
          ))}
        </div>
      </main>
    </Container>
  );
}

function IconCard({ icon }: { icon: ReturnType<typeof Route.useLoaderData>["categories"][number]["icons"][number] }) {
  const ownRoute = icon.href === `/texas-icons/${icon.slug}`;
  const hasPublicDestination = !ownRoute || icon.indexableAtOwnRoute;
  const card = (
    <>
      <div className="flex items-start justify-between gap-4">
        <span className="text-xs font-semibold tabular-nums text-muted-foreground">
          #{String(icon.rank).padStart(3, "0")}
        </span>
        <ReuseBadge kind={icon.reuseKind} />
      </div>
      <strong className={`mt-4 block font-display text-2xl leading-tight ${hasPublicDestination ? "group-hover:text-primary" : ""}`}>
        {icon.name}
      </strong>
      <p className="mt-3 line-clamp-3 text-sm leading-6 text-muted-foreground">{icon.summary}</p>
      <span className="mt-4 inline-block text-sm font-semibold text-primary">
        {hasPublicDestination
          ? icon.href.startsWith("/texas-icons/") ? "Open profile →" : "Open canonical guide →"
          : "Data-only roster record"}
      </span>
    </>
  );

  return (
    <li className="bg-background">
      {hasPublicDestination
        ? <a href={icon.href} className="group block h-full p-5 hover:bg-muted/40">{card}</a>
        : <div className="block h-full p-5">{card}</div>}
    </li>
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
        : kind === "texas-talent-staged" || kind === "icon-research-staged"
          ? "Published profile"
          : "Data only";

  return (
    <span className="rounded-full border border-border px-2 py-1 text-[0.64rem] font-semibold uppercase tracking-[0.1em] text-muted-foreground">
      {label}
    </span>
  );
}
