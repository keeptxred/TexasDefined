import { TEXAS_ICON_CATEGORIES } from "./things-unique-to-texas";
import { texasIconCanonicalHref } from "./things-unique-to-texas-links";

export const TEXAS_ICONS_COLLECTION_URL = "https://texasdefined.com/things-unique-to-texas";
export const TEXAS_ICONS_METHODOLOGY_URL = "https://texasdefined.com/things-unique-to-texas/methodology";

export const TEXAS_ICON_REFERENCE_ROWS = TEXAS_ICON_CATEGORIES.flatMap((category) =>
  category.items.map((entry) => {
    const deeperGuidePath = texasIconCanonicalHref(entry);
    return {
      id: entry.id,
      name: entry.name,
      description: entry.note,
      chapter: category.slug,
      chapterTitle: category.title,
      canonicalCollection: TEXAS_ICONS_COLLECTION_URL,
      methodology: TEXAS_ICONS_METHODOLOGY_URL,
      deeperGuide: deeperGuidePath ? `https://texasdefined.com${deeperGuidePath}` : null,
    };
  }),
);

export const TEXAS_ICON_DEEPER_GUIDE_COUNT = TEXAS_ICON_REFERENCE_ROWS.filter((row) => row.deeperGuide !== null).length;
