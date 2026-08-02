import type { ArticleBlock, Author } from "@/data/types";
import { ShopTheStory } from "@/components/commerce/ShopTheStory";

export function PullQuote({ text, attribution }: { text: string; attribution?: string }) {
  return (
    <figure className="my-10 border-l-2 border-primary pl-6">
      <blockquote className="font-display text-2xl leading-snug text-foreground sm:text-3xl">
        “{text}”
      </blockquote>
      {attribution && (
        <figcaption className="mt-3 text-xs uppercase tracking-widest text-muted-foreground">
          {attribution}
        </figcaption>
      )}
    </figure>
  );
}

export function Byline({ author, meta }: { author: Author | null; meta: string }) {
  return (
    <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 text-sm text-muted-foreground">
      {author && (
        <span className="text-foreground">
          By <span className="font-medium">{author.name}</span>
          <span className="text-muted-foreground">, {author.role}</span>
        </span>
      )}
      <span>{meta}</span>
    </div>
  );
}

export function ArticleBody({ blocks }: { blocks: ArticleBlock[] }) {
  return (
    <div className="editorial-body text-foreground/90">
      {blocks.map((block, index) => {
        switch (block.type) {
          case "heading":
            return (
              <h2 key={index} className="mt-12 font-display text-2xl sm:text-3xl">
                {block.text}
              </h2>
            );
          case "quote":
            return (
              <PullQuote
                key={index}
                text={block.text}
                {...(block.attribution ? { attribution: block.attribution } : {})}
              />
            );
          case "list":
            return (
              <ul key={index} className="my-6 list-disc space-y-2 pl-6 marker:text-primary">
                {block.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            );
          case "shop":
            return <ShopTheStory key={index} collectionSlug={block.collectionSlug} />;
          case "paragraph":
          default:
            return (
              <p key={index} className="mt-5">
                {block.text}
              </p>
            );
        }
      })}
    </div>
  );
}
