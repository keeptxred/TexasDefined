import { lazy, Suspense } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import type { ArticleBlock, Author } from "@/data/types";
import type { TexasEntityRecord } from "@/data/knowledge-graph";
import { AutoEntityLinks } from "@/components/content/AutoEntityLinks";
import { ShopTheStory } from "@/components/commerce/ShopTheStory";
import { INTERNAL_LINK_POLICIES, policyForSurface } from '@/platform/internal-link-policies';

const articlePolicy = INTERNAL_LINK_POLICIES.article;
const MetroRelocationAuthority = lazy(() => import("@/components/relocation/MetroRelocationAuthority").then((module) => ({ default: module.MetroRelocationAuthority })));
const WildflowerSpeciesGrid = lazy(() => import("@/components/editorial/WildflowerSpeciesGrid").then((module) => ({ default: module.WildflowerSpeciesGrid })));
const metroRelocationGuidePaths = new Set([
  "/article/moving-to-dallas-fort-worth-guide",
  "/article/moving-to-houston-address-checklist",
  "/article/moving-to-austin-guide",
  "/article/moving-to-san-antonio-guide",
  "/article/moving-to-el-paso-guide",
]);

export function PullQuote({ text, attribution, entities = [] }: { text: string; attribution?: string; entities?: TexasEntityRecord[] }) {
  return (
    <figure className="my-14 border-y border-border py-8 sm:my-16 sm:py-10">
      <blockquote className="font-display text-3xl font-semibold leading-[1.12] text-foreground sm:text-[2.4rem]">“<AutoEntityLinks text={text} entities={entities} maxLinks={2} policy={policyForSurface('article')} />”</blockquote>
      {attribution && <figcaption className="eyebrow mt-5 text-muted-foreground">— {attribution}</figcaption>}
    </figure>
  );
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
  const showMetroRelocationAuthority = metroRelocationGuidePaths.has(pathname);
  const showWildflowerSpeciesGrid = pathname === "/article/texas-wildflowers-guide";
  const linked = new Set<string>();
  let remainingLinks = articlePolicy.pageBudget;
  const available = () => entities.filter((entity) => !linked.has(entity.id));
  const render = (text: string, requestedLinks: number) => {
    if (remainingLinks <= 0) return text;
    const candidates = available();
    const normalized = text.toLowerCase();
    candidates.forEach((entity) => { if ([entity.name, ...entity.aliases].some((label) => label.length >= 4 && normalized.includes(label.toLowerCase()))) linked.add(entity.id); });
    const maxLinks = Math.min(requestedLinks, articlePolicy.blockBudget, remainingLinks);
    remainingLinks -= maxLinks;
    return <AutoEntityLinks text={text} entities={candidates} maxLinks={maxLinks} policy={policyForSurface('article')} />;
  };
  return <div className="editorial-body text-foreground/92">
    {showWildflowerSpeciesGrid ? <Suspense fallback={null}><WildflowerSpeciesGrid /></Suspense> : null}
    {blocks.map((block, index) => {
      switch (block.type) {
        case "heading": return <h2 key={index} className="mb-4 mt-14 font-display text-[2rem] font-semibold leading-[1.08] sm:mt-16 sm:text-[2.45rem]">{render(block.text, 2)}</h2>;
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
