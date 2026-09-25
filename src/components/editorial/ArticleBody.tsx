import { Fragment, lazy, Suspense, type ReactNode } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import type { ArticleBlock, Author } from "@/data/types";
import type { TexasEntityRecord } from "@/data/knowledge-graph";
import { publicAuthorSlug } from "@/data/editorial-author-slugs";
import { AutoEntityLinks } from "@/components/content/AutoEntityLinks";
import { hideFailedImageContainer } from "@/lib/image-fallback";
import { ShopTheStory } from "@/components/commerce/ShopTheStory";
import { INTERNAL_LINK_POLICIES, policyForSurface } from '@/platform/internal-link-policies';
import { countyLabelHasExplicitContext } from '@/platform/internal-linking';

const articlePolicy = INTERNAL_LINK_POLICIES.article;
const MetroRelocationAuthority = lazy(() => import("@/components/relocation/MetroRelocationAuthority").then((module) => ({ default: module.MetroRelocationAuthority })));
const metroRelocationGuidePaths = new Set([
  "/article/moving-to-dallas-fort-worth-guide",
  "/article/moving-to-houston-address-checklist",
  "/article/moving-to-austin-guide",
  "/article/moving-to-san-antonio-guide",
  "/article/moving-to-el-paso-guide",
]);


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

export function Byline({ author, meta, showRole = true }: { author: Author | null; meta: string; showRole?: boolean }) {
  return (
    <div className="flex flex-wrap items-center gap-x-3 gap-y-2 border-b border-border pb-5 text-sm text-muted-foreground">
      {author && <span className="text-foreground">By <Link to="/authors/$author" params={{ author: publicAuthorSlug(author.id) }} className="font-semibold underline decoration-border underline-offset-4 transition-colors hover:text-primary">{author.name}</Link>{showRole && author.role ? <span className="text-muted-foreground"> · {author.role}</span> : null}</span>}
      {author && <span aria-hidden="true">•</span>}
      <span>{meta}</span>
    </div>
  );
}

export function ArticleBody({ blocks, entities = [], insertBeforeHeading }: { blocks: ArticleBlock[]; entities?: TexasEntityRecord[]; insertBeforeHeading?: { heading: string; content: ReactNode } }) {
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  const showMetroRelocationAuthority = metroRelocationGuidePaths.has(pathname);
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
    {blocks.map((block, index) => {
      const beforeHeading = block.type === "heading" && block.text === insertBeforeHeading?.heading
        ? insertBeforeHeading.content
        : null;
      return <Fragment key={index}>
        {beforeHeading}
        {(() => {
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
        })()}
      </Fragment>;
    })}
    {showMetroRelocationAuthority ? <Suspense fallback={null}><MetroRelocationAuthority articlePath={pathname} /></Suspense> : null}
  </div>;
}
