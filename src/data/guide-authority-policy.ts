import type { Article } from "./types";

/**
 * Sitewide policy, not a particular article or a ten-page exception.
 * An automated audit can identify deficiencies; only actual source/photo
 * research and an editor's signed approval may certify the facts.
 */
export type GuideFamily =
  | "comparative-travel" | "water-and-fishing" | "public-lands" | "museum-and-history"
  | "law-and-finance" | "home-and-safety" | "travel-and-lodging" | "reference";

export type GuideAuthorityGap =
  | "thin-analysis" | "weak-primary-sources" | "no-verification-date"
  | "no-image-license" | "no-image-context" | "no-contextual-links"
  | "missing-comparison-method" | "missing-operational-guidance"
  | "missing-museum-visitor-details" | "no-editorial-signoff";

export type GuideAuthorityAssessment = {
  applies: boolean;
  family: GuideFamily;
  cadenceDays: number;
  gaps: GuideAuthorityGap[];
  structurallyReady: boolean;
  certified: boolean;
};

export function isTexasDefinedGuide(article: Article): boolean {
  if (article.brandId !== "texasdefined") return false;
  if (article.tags.includes("authority-guide")) return true;
  return /\b(guide|best|explained|how to|checklist|comparison|places to|where to)\b/i.test(article.title)
    || /(?:^|[-])(?:guide|best|explained|how-to|checklist|comparison)(?:$|[-])/.test(article.slug);
}

export function guideFamilyFor(article: Article): GuideFamily {
  const text = [article.title, article.slug, ...article.tags].join(" ").toLowerCase();
  if (/museum|historic|church|heritage|history|battle|mission/.test(text)) return "museum-and-history";
  if (/tax|insurance|mortgage|financ|legislat|exemption|protest|property law/.test(text)) return "law-and-finance";
  if (/fishing|lake|river|tubing|paddl|swim/.test(text)) return "water-and-fishing";
  if (/rv |camp|state park|trail|national park|ohv|wilderness|climb|bike/.test(text)) return "public-lands";
  if (/home|pest|pool|snake|weather|safety|storm|foundation|hurricane/.test(text)) return "home-and-safety";
  if (/best |top |compare|rank|versus|vs\./.test(text)) return "comparative-travel";
  if (/road|drive|weekend|town|visit|travel|wine|city|trip|lodging/.test(text)) return "travel-and-lodging";
  return "reference";
}
export function guideReviewCadenceDays(family: GuideFamily): number {
  switch (family) {
    case "water-and-fishing": return 7;
    case "public-lands": return 14;
    case "law-and-finance": return 30;
    case "home-and-safety": return 30;
    case "travel-and-lodging": return 30;
    case "comparative-travel": return 30;
    case "museum-and-history": return 90;
    default: return 90;
  }
}
function countWords(article: Article): number {
  return article.body.reduce((total, block) => {
    const text = block.type === "list" ? block.items.join(" ")
      : block.type === "heading" || block.type === "paragraph" || block.type === "quote" ? block.text
      : "";
    return total + text.trim().split(/\s+/).filter(Boolean).length;
  }, 0);
}
export function assessTexasDefinedGuide(article: Article): GuideAuthorityAssessment {
  const applies = isTexasDefinedGuide(article);
  const family = guideFamilyFor(article);
  if (!applies) return { applies: false, family, cadenceDays: guideReviewCadenceDays(family), gaps: [], structurallyReady: true, certified: false };
  const gaps: GuideAuthorityGap[] = [];
  const text = article.body.map((block) => block.type === "heading" || block.type === "paragraph" ? block.text : "").join(" ").toLowerCase();
  const sourceUrls = [
    ...(article.sources ?? []).map((source) => source.url),
    ...(article.sourceUrl ? [article.sourceUrl] : []),
  ].filter((url) => /^https:\/\//i.test(url));
  const isComparative = /\bbest\b|\btop\b|\bcomparison\b|\bcompare\b/i.test(article.title);
  const isPlaceImage = ["comparative-travel", "water-and-fishing", "public-lands", "museum-and-history", "travel-and-lodging"].includes(family);

  if (countWords(article) < (isComparative ? 850 : 600)) gaps.push("thin-analysis");
  if (sourceUrls.length < (isComparative ? 2 : 1)) gaps.push("weak-primary-sources");
  if (!article.authorityReview?.verifiedAt) gaps.push("no-verification-date");
  if (article.hero?.src && !article.hero.credit) gaps.push("no-image-license");
  if (isPlaceImage && (!article.hero?.src || !article.hero.alt)) gaps.push("no-image-context");
  if ((article.internalLinks?.length ?? 0) + (article.relatedDestinations?.length ?? 0) < 2) gaps.push("no-contextual-links");

  if (isComparative && !/how we (chose|selected|compared)|selection criteria|methodology|how to choose|compare the options/.test(text))
    gaps.push("missing-comparison-method");
  if (["water-and-fishing", "public-lands", "travel-and-lodging"].includes(family)
    && !/access|regulation|reservation|permit|opening|parking|hours|launch|entrance|driving|how to visit/.test(text))
    gaps.push("missing-operational-guidance");
  if (family === "museum-and-history" && /museum/.test([article.title, article.slug].join(" ").toLowerCase())
    && !/accessib|exhibit|admission|visitor|hours|family|children|kid/.test(text))
    gaps.push("missing-museum-visitor-details");

  const signoff = article.authorityReview;
  if (!signoff?.editorApprovedAt || !signoff?.imageRightsVerified || !signoff?.internalLinksReviewed || !signoff?.methodologyReviewed
    || !Array.isArray(signoff.sourceUrlsChecked) || signoff.sourceUrlsChecked.length === 0) gaps.push("no-editorial-signoff");
  return {
    applies: true, family, cadenceDays: guideReviewCadenceDays(family),
    gaps: [...new Set(gaps)], structurallyReady: gaps.every((gap) => gap === "no-verification-date" || gap === "no-editorial-signoff"),
    certified: gaps.length === 0,
  };
}
