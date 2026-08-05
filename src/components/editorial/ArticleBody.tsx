import type { ArticleBlock, Author } from "@/data/types";
import type { TexasEntityRecord } from "@/data/knowledge-graph";
import { AutoEntityLinks } from "@/components/content/AutoEntityLinks";
import { ShopTheStory } from "@/components/commerce/ShopTheStory";
import { INTERNAL_LINK_POLICIES, policyForSurface } from '@/platform/internal-link-policies';

const articlePolicy = INTERNAL_LINK_POLICIES.article;

export function PullQuote({ text, attribution, entities = [] }: { text: string; attribution?: string; entities?: TexasEntityRecord[] }) {
  return (
    <figure className="my-10 border-l-2 border-primary pl-6">
      <blockquote className="font-display text-2xl leading-snug text-foreground sm:text-3xl">“<AutoEntityLinks text={text} entities={entities} maxLinks={2} policy={policyForSurface('article')} />”</blockquote>
      {attribution && <figcaption className="mt-3 text-sm text-muted-foreground">— {attribution}</figcaption>}
    </figure>
  );
}

export function Byline({ author, meta }: { author: Author | null; meta: string }) {
  return (
    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted-foreground">
      {author && <span className="text-foreground">By <span className="font-medium">{author.name}</span></span>}
      {author && <span aria-hidden="true">·</span>}
      <span>{meta}</span>
    </div>
  );
}

export function ArticleBody({ blocks, entities = [] }: { blocks: ArticleBlock[]; entities?: TexasEntityRecord[] }) {
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
  return <div className="editorial-body text-foreground/90">{blocks.map((block, index) => {
    switch (block.type) {
      case "heading": return <h2 key={index} className="mt-12 font-display text-2xl sm:text-3xl">{render(block.text, 2)}</h2>;
      case "quote": return <PullQuote key={index} text={block.text} entities={available()} {...(block.attribution ? { attribution: block.attribution } : {})} />;
      case "list": return <ul key={index} className="my-6 list-disc space-y-2 pl-6 marker:text-primary">{block.items.map((item) => <li key={item}>{render(item, 2)}</li>)}</ul>;
      case "shop": return <ShopTheStory key={index} collectionSlug={block.collectionSlug} />;
      case "paragraph":
      default: return <p key={index} className="mt-5">{render(block.text, 4)}</p>;
    }
  })}</div>;
}
