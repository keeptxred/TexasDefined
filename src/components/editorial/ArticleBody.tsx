import { Fragment, lazy, Suspense, type ReactNode } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import CaminoMissionTrailRoute from "@/components/editorial/CaminoMissionTrailRoute";
import type { ArticleBlock, Author } from "@/data/types";
import type { TexasEntityRecord } from "@/data/knowledge-graph";
import { AutoEntityLinks } from "@/components/content/AutoEntityLinks";
import { UnusualBusinessAuthorityPanel } from "@/components/authority/UnusualBusinessAuthorityPanel";
import { hideFailedImageContainer } from "@/lib/image-fallback";
import { ShopTheStory } from "@/components/commerce/ShopTheStory";
import { TEXAS_RIVERS_BODY_PHOTO_OVERRIDES } from "@/data/texas-rivers-body-photo-overrides";
import { INTERNAL_LINK_POLICIES, policyForSurface } from '@/platform/internal-link-policies';
import { countyLabelHasExplicitContext } from '@/platform/internal-linking';

// Resolve the Commons description page rather than linking directly to a binary thumbnail.
// This preserves the creator's attribution and license terms alongside each archival image.
function commonsImageDescriptionUrl(src: string): string | null {
  try {
    const delivered = new URL(src, "https://texasdefined.com");
    const original = delivered.pathname === "/media/remote" ? delivered.searchParams.get("url") : delivered.href;
    if (!original) return null;
    const source = new URL(original);
    if (source.hostname !== "commons.wikimedia.org") return null;
    const file = source.pathname.match(/^\/wiki\/Special:Redirect\/file\/(.+)$/);
    return file ? `https://commons.wikimedia.org/wiki/File:${file[1]}` : null;
  } catch {
    return null;
  }
}

function CommonsImageCreditLink({ src }: { src: string }) {
  const href = commonsImageDescriptionUrl(src);
  if (!href) return null;
  return <>{" · "}<a href={href} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2">Image source and reuse terms</a></>;
}

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
const LIGHTHOUSE_VISIT_PATH = "/article/best-lighthouses-to-visit-in-texas";
const LighthouseVisitPlanner = lazy(() => import("@/components/content/LighthouseVisitPlanner"));
// Render the three mission stops in server HTML; a lazy empty fallback hides these links from crawlers.
const LOOPS_SPURS_PATH = "/article/texas-loops-spurs-explained";
const BOLIVAR_HISTORY_PATH = "/article/point-bolivar-lighthouse-history";

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

function BolivarRestorationPhotoSources() {
  return <aside aria-label="Point Bolivar lighthouse photography and restoration status" className="my-7 border-l-2 border-primary bg-muted/20 px-5 py-4 text-sm leading-7">
    <p className="font-semibold text-foreground">Point Bolivar: historic photo versus restored appearance</p>
    <p className="mt-2 text-muted-foreground">The licensed photo on this page was taken in December 2009, before the tower was repainted. The present historic black-and-white stripes are documented in newer photographs; this older image is not a current-condition photograph.</p>
    <p className="mt-3">
      <a href="https://texashistoricalfoundation.org/news-events/event-calendar.html/event/2025/03/18/thf-grant-presentation-bolivar-point-lighthouse-foundation-point-bolivar-" rel="noopener noreferrer" target="_blank" className="font-semibold text-primary underline underline-offset-4">See the March 2025 restoration photograph at the Texas Historical Foundation ↗</a>
      {" · "}
      <a href="https://bolivarpointlighthouse.org/gallery/" rel="noopener noreferrer" target="_blank" className="font-semibold text-primary underline underline-offset-4">Official lighthouse gallery ↗</a>
    </p>
    <p className="mt-2 text-xs text-muted-foreground">Photographs on these external sites remain their owners' work and are linked, not republished, without permission.</p>
  </aside>;
}

export function Byline({ author, meta }: { author: Author | null; meta: string }) {
  return (
    <div className="flex flex-wrap items-center gap-x-3 gap-y-2 border-b border-border pb-5 text-sm text-muted-foreground">
      {author && <span className="text-foreground">By <Link to="/authors/$author" params={{ author: author.id }} className="font-semibold underline decoration-border underline-offset-4 transition-colors hover:text-primary">{author.name}</Link>{author.role && !author.name.toLocaleLowerCase().includes(author.role.toLocaleLowerCase()) ? <span className="text-muted-foreground"> · {author.role}</span> : null}</span>}
      {author && <span aria-hidden="true">•</span>}
      <span>{meta}</span>
    </div>
  );
}

export function ArticleBody({ blocks, entities = [], insertBeforeIndex, insertBefore }: { blocks: ArticleBlock[]; entities?: TexasEntityRecord[]; insertBeforeIndex?: number; insertBefore?: ReactNode }) {
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  const articleSlug = pathname.startsWith("/article/") ? pathname.slice("/article/".length).split("/")[0] : "";
  const showMetroRelocationAuthority = metroRelocationGuidePaths.has(pathname);
  const showSixManFootballAuthority = pathname === SIX_MAN_FOOTBALL_PATH;
  const showLoopsSpursVisual = pathname === LOOPS_SPURS_PATH;
  const showBolivarHistoryPhotoSources = pathname === BOLIVAR_HISTORY_PATH;
  const showLighthouseVisitPlanner = pathname === LIGHTHOUSE_VISIT_PATH;
  const showCaminoMissionTrail = pathname === "/article/el-camino-real-de-tierra-adentro-national-historic-trail";
  const linked = new Set<string>();
  let remainingLinks = articlePolicy.pageBudget;
  // The six-man article opens with two editorial lead paragraphs before its reference graphics.
  const sixManLeadCount = showSixManFootballAuthority && blocks[0]?.type === "paragraph" && blocks[1]?.type === "paragraph" ? 2 : 0;
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
    {blocks.slice(0, sixManLeadCount).map((block, index) => block.type === "paragraph"
      ? <p key={`six-man-lead-${index}`} className={index === 0 ? "mt-0" : "mt-6"}>{render(block.text, 4)}</p>
      : null)}
    {showSixManFootballAuthority ? <Suspense fallback={null}><SixManFootballAuthority /></Suspense> : null}
    {showLoopsSpursVisual ? <LoopsSpursVisual /> : null}
    {showBolivarHistoryPhotoSources ? <BolivarRestorationPhotoSources /> : null}
    {blocks.map((block, index) => {
      if (index < sixManLeadCount) return null;
      const rendered = (() => {
        switch (block.type) {
        case "heading":
          if (showCaminoMissionTrail && block.text === "Route map and three confirmed stops") {
            return <div key={index}><h2 id={articleHeadingId(block.text)} className="mb-4 mt-14 scroll-mt-28 font-display text-[2rem] font-semibold leading-[1.08] sm:mt-16 sm:text-[2.45rem]">{render(block.text, 2)}</h2><CaminoMissionTrailRoute /></div>;
          }
          if (showLighthouseVisitPlanner && block.text === "Texas lighthouses at a glance: access, climbs and trip difficulty") {
            return <div key={index}><h2 id={articleHeadingId(block.text)} className="mb-4 mt-14 scroll-mt-28 font-display text-[2rem] font-semibold leading-[1.08] sm:mt-16 sm:text-[2.45rem]">{render(block.text, 2)}</h2><Suspense fallback={null}><LighthouseVisitPlanner /></Suspense></div>;
          }
          if (block.text.endsWith("?") && (
            (articleSlug === "chip-and-joanna-gaines-magnolia-waco" && blocks.slice(0, index).some(item => item.type === "heading" && item.text === "Frequently asked questions about Chip and Joanna Gaines"))
            || (articleSlug === "texas-high-school-football-playoffs-explained" && blocks.slice(0, index).some(item => item.type === "heading" && item.text === "Frequently asked questions"))
            || (articleSlug === "moving-to-el-paso-guide" && blocks.slice(0, index).some(item => item.type === "heading" && item.text === "Frequently asked questions about moving to El Paso"))
          )) {
            return <h3 key={index} id={articleHeadingId(block.text)} className="mb-3 mt-8 scroll-mt-28 font-display text-xl font-semibold">{render(block.text, 2)}</h3>;
          }
          return <h2 key={index} id={articleHeadingId(block.text)} className="mb-4 mt-14 scroll-mt-28 font-display text-[2rem] font-semibold leading-[1.08] sm:mt-16 sm:text-[2.45rem]">{render(block.text, 2)}</h2>;
        case "quote": return <PullQuote key={index} text={block.text} entities={available()} {...(block.attribution ? { attribution: block.attribution } : {})} />;
        case "list":
          if (articleSlug === "texas-rivers-explained"
            && blocks[index - 1]?.type === "heading"
            && blocks[index - 1]?.text === "Texas Rivers at a Glance") {
            return (
              <dl key={index} className="my-8 grid gap-3 sm:grid-cols-2">
                {block.items.map((item) => {
                  const questionEnd = item.indexOf("?");
                  const question = questionEnd >= 0 ? item.slice(0, questionEnd + 1) : item;
                  const answer = questionEnd >= 0 ? item.slice(questionEnd + 1).trim() : "";
                  return (
                    <div key={item} className="rounded-sm border border-border bg-surface p-4 sm:p-5">
                      <dt className="font-display text-lg font-semibold leading-snug">{render(question, 1)}</dt>
                      {answer ? <dd className="mt-2 text-sm leading-6 text-muted-foreground">{render(answer, 2)}</dd> : null}
                    </div>
                  );
                })}
              </dl>
            );
          }
          return <ul key={index} className="my-8 list-disc space-y-3 pl-6 marker:text-primary">{block.items.map((item) => <li key={item}>{render(item, 2)}</li>)}</ul>;
        case "image": {
          const articleImage = articleSlug === "texas-rivers-explained"
            ? TEXAS_RIVERS_BODY_PHOTO_OVERRIDES[block.image.src] ?? block.image
            : block.image;
          return (
            <figure key={index} className="my-10 sm:my-12">
              <div className="overflow-hidden rounded-2xl border border-border bg-muted/20">
                <img
                  src={articleImage.src}
                  alt={articleImage.alt}
                  width={articleImage.width}
                  height={articleImage.height}
                  loading="lazy"
                  decoding="async"
                  className="h-auto w-full object-contain"
                  onError={(event) => hideFailedImageContainer(event.currentTarget)}
                />
              </div>
              {(block.caption || articleImage.credit) && (
                <figcaption className="mt-3 text-sm leading-6 text-muted-foreground">
                  {block.caption}{block.caption && articleImage.credit ? " · " : ""}{articleImage.credit}<CommonsImageCreditLink src={articleImage.src} />
                </figcaption>
              )}
              {articleSlug === "best-lighthouses-to-visit-in-texas" && articleImage.src.includes("Port_Bolivar_TX_-_Point_Bolivar_Lighthouse.jpg") ? <BolivarRestorationPhotoSources /> : null}
            </figure>
          );
        }
        case "shop": return <ShopTheStory key={index} collectionSlug={block.collectionSlug} />;
        case "paragraph":
        default: return <p key={index} className="mt-6 first:mt-0">{render(block.text, 4)}</p>;
        }
      })();
      if (insertBeforeIndex === index && insertBefore) {
        return <Fragment key={`article-insert-${index}`}>{insertBefore}{rendered}</Fragment>;
      }
      return rendered;
    })}
    {showMetroRelocationAuthority ? <Suspense fallback={null}><MetroRelocationAuthority articlePath={pathname} /></Suspense> : null}
  </div>;
}