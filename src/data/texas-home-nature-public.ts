import { createServerFn } from "@tanstack/react-start";

import type { TexasEvergreenGuide } from "./texas-evergreen-guides";

export type TexasHomeNatureGuideSlug =
  | "texas-pool-guide"
  | "texas-pests-guide"
  | "texas-snakes-guide"
  | "texas-birds-guide";

export type TexasHomeNatureGuideSource = {
  name: string;
  url: string;
  note: string;
};

export type TexasHomeNaturePublicGuide = {
  guide: TexasEvergreenGuide;
  sources: TexasHomeNatureGuideSource[];
  reviewedAt: string;
};

const loadTexasHomeNatureGuide = createServerFn({ method: "GET" })
  .inputValidator((data: { slug: TexasHomeNatureGuideSlug }) => data)
  .handler(async ({ data }) => {
    const { loadTexasHomeNatureGuideServer } = await import("./texas-home-nature-public.server");
    return loadTexasHomeNatureGuideServer(data.slug);
  });

export function getTexasHomeNatureGuide(slug: TexasHomeNatureGuideSlug) {
  return loadTexasHomeNatureGuide({ data: { slug } });
}
