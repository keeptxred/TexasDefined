import { lazy, Suspense } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import type { ArticleBlock, Author } from "@/data/types";
import type { TexasEntityRecord } from "@/data/knowledge-graph";
import { AutoEntityLinks } from "@/components/content/AutoEntityLinks";
import { UnusualBusinessAuthorityPanel } from "@/components/authority/UnusualBusinessAuthorityPanel";
import { hideFailedImageContainer } from "@/lib/image-fallback";
import { ShopTheStory } from "@/components/commerce/ShopTheStory";
import { INTERNAL_LINK_POLICIES, policyForSurface } from '@/platform/internal-link-policies';
import { countyLabelHasExplicitContext } from '@/platform/internal-linking';

const articlePolicy = INTERNAL_LINK_POLICIES.article;
const MetroRelocationAuthority = lazy(() => import("@/components/relocation/MetroRelocationAuthority").then((module) => ({ default: module.MetroRelocationAuthority })));
const SixManFootballAuthority = lazy(() => import("@/components/content/SixManFootballAuthority").then((module) => ({ default: module.SixManFootballAuthority })));
const metroRelocationGuidePaths = new Set([
  "/article/moving-to-dallas-fort-worth-guide",
  "/article/moving-to-houston-address-checklist",
  "/article/moving-to-austin-guide",
  "/article/moving-to-san-antonio-guide",
  "/article/moving-to-el-paso-guide",
]);
const SIX_MAN_FOOTBALL_PATH = "/article/texas-six-man-football-rules-explained";
const LOOPS_SPURS_PATH = "/article/texas-loops-spurs-explained";

export function articleHeadingId(text: string) {
  return text
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
export function PullQuote({ text, attribution, entities = [] }: { text: string; attribution?: string; entities?: TexasEntityRecord[] }) {
  return (
    <figure className="my-14 border-y border-border py-8 sm:my-16 sm:py-10">
      <blockquote className="font-display text-3xl font-semibold leading-[1.12] text-foreground sm:text-[2.4rem]">“<AutoEntityLinks text={text} entities={entities} maxLinks={2} policy={policyForSurface('article')} />”</blockquote>
      {attribution && <figcaption className="eyebrow mt-5 text-muted-foreground">— {attribution}</figcaption>}
    </figure>
  );
}

function LoopsSpursVisual() {
  return <figure className="my-10 rounded-xl border border-border bg-muted/20 p-5" aria-labelledby="loops-spurs-visual-title">
    <figcaption id="loops-spurs-visual-title" className="font-display text-2xl font-semibold">Loop vs. Spur: read the network, not the shape</figcaption>
    <p className="mt-2 text-sm text-muted-foreground">A Texas Loop usually carries traffic around a place and reconnects with the highway network. A Spur usually branches away to a local road or destination. Neither name guarantees what the road looks like today.</p>
    <div className="mt-6 grid gap-4 sm:grid-cols-2">
      <div className="rounded-xl border border-border p-4">
        <p className="text-xs font-bold uppercase text-primary">Loop</p>
        <div className="mt-4 flex items-center gap-2" aria-hidden="true"><span className="h-3 w-3 rounded-full bg-foreground"/><span className="h-1 flex-1 rounded bg-border"/><span className="rounded-full border-2 border-primary px-5 py-3 font-bold">bypass</span><span className="h-1 flex-1 rounded bg-border"/><span className="h-3 w-3 rounded-full bg-foreground"/></div>
        <p className="mt-4 text-sm">Typically connects with another state highway at both ends. It does <strong>not</strong> have to make a complete circle.</p>
      </div>
      <div className="rounded-xl border border-border p-4">
        <p className="text-xs font-bold uppercase text-primary">Spur</p>
        <div className="mt-4 flex items-center gap-2" aria-hidden="true"><span className="h-3 w-3 rounded-full bg-foreground"/><span className="h-1 flex-1 rounded bg-border"/><span className="h-1 w-12 rounded bg-primary"/><span className="rounded-xl border-2 border-primary px-3 py-2 font-bold">destination</span></div>
        <p className="mt-4 text-sm">Typically branches from a state highway and ends on an off-system road rather than returning to the parent corridor.</p>
      </div>
    </div>
  </figure>;
}

export function Byline({ author, meta }: { author: Author | null; meta: string }) {
  return (
    <div className="flex flex-wrap items-center gap-x-3 gap-y-2 border-b border-border pb-5 text-sm text-muted-foreground">
      {author && <span className="text-foreground">By <Link to="/authors/$author" params={{ author: author.id }} className="font-semibold underline decoration-border underline-offset-4 transition-colors hover:text-primary">{author.name}</Link>{author.role ? <span className="text-muted-foreground"> · {author.role}</span> : null}</span>}
      {author && <span aria-hidden="true">•</span>}
      <span>{meta}</span>
    </div>
  );
}

export function ArticleBody({ blocks, entities = [] }: { blocks: ArticleBlock[]; entities?: TexasEntityRecord[] }) {
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  const articleSlug = pathname.startsWith("/article/") ? pathname.slice("/article/".length).split("/")[0] : "";
  const showMetroRelocationAuthority = metroRelocationGuidePaths.has(pathname);
  const showSixManFootballAuthority = pathname === SIX_MAN_FOOTBALL_PATH;
  const showLoopsSpursVisual = pathname === LOOPS_SPURS_PATH;
  const linked = new Set<string>();
  let remainingLinks = articlePolicy.pageBudget;
  const available = () => entities.filter((entity) => !linked.has(entity.id));
  const render = (text: string, requestedLinks: number) => {
    if (remainingLinks <= 0) return text;
    const candidates = available();
    candidates.forEach((entity) => {
      const matched = [entity.name, ...entity.aliases].some((rawLabel) => {
        const label = rawLabel.trim();
        if (label.length < 4) return false;
        const escaped = label.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const match = new RegExp(`\\b${escaped}\\b`, 'i').exec(text);
        return Boolean(match && countyLabelHasExplicitContext(entity, match[0], text, match.index, match.index + match[0].length));
      });
      if (matched) linked.add(entity.id);
    });
    const maxLinks = Math.min(requestedLinks, articlePolicy.blockBudget, remainingLinks);
    remainingLinks -= maxLinks;
    return <AutoEntityLinks text={text} entities={candidates} maxLinks={maxLinks} policy={policyForSurface('article')} />;
  };
  return <div className="editorial-body text-foreground/92">
    {articleSlug ? <UnusualBusinessAuthorityPanel slug={articleSlug} /> : null}
    {showSixManFootballAuthority ? <Suspense fallback={null}><SixManFootballAuthority /></Suspense> : null}
    {showLoopsSpursVisual ? <LoopsSpursVisual /> : null}
    {blocks.map((block, index) => {
      switch (block.type) {
        case "heading": return <h2 key={index} id={articleHeadingId(block.text)} className="mb-4 mt-14 scroll-mt-28 font-display text-[2rem] font-semibold leading-[1.08] sm:mt-16 sm:text-[2.45rem]">{render(block.text, 2)}</h2>;
        case "quote": return <PullQuote key={index} text={block.text} entities={available()} {...(block.attribution ? { attribution: block.attribution } : {})} />;
        case "list": return <ul key={index} className="my-8 list-disc space-y-3 pl-6 marker:text-primary">{block.items.map((item) => <li key={item}>{render(item, 2)}</li>)}</ul>;
        case "image": return (
          <figure key={index} className="my-10 sm:my-12">
            <div className="overflow-hidden rounded-2xl border border-border bg-muted/20">
              <img
                src={block.image.src}
                alt={block.image.alt}
                width={block.image.width}
                height={block.image.height}
                loading="lazy"
                decoding="async"
                className="h-auto w-full object-contain"
                onError={(event) => hideFailedImageContainer(event.currentTarget)}
              />
            </div>
            {(block.caption || block.image.credit) && (
              <figcaption className="mt-3 text-sm leading-6 text-muted-foreground">
                {block.caption}{block.caption && block.image.credit ? " · " : ""}{block.image.credit}
              </figcaption>
            )}
          </figure>
        );
        case "shop": return <ShopTheStory key={index} collectionSlug={block.collectionSlug} />;
        case "paragraph":
        default: return <p key={index} className="mt-6 first:mt-0">{render(block.text, 4)}</p>;
      }
    })}
    {showMetroRelocationAuthority ? <Suspense fallback={null}><MetroRelocationAuthority articlePath={pathname} /></Suspense> : null}
  </div>;
}