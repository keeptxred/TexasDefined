import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";

import { exploreDestinations } from "@/data/explore/all-destinations";
import { geographyPath } from "@/lib/explore/geography-pages";
import { BASE_URL, renderUrlset, toIsoDate, xmlResponse, type UrlEntry } from "@/lib/sitemap-shared";

export const Route = createFileRoute("/sitemap-explore-locations.xml")({
  server: {
    handlers: {
      GET: () => {
        const generatedAt = toIsoDate(new Date());
        const counties = new Set<string>();
        const regions = new Set<string>();
        for (const entity of exploreDestinations) {
          if (entity.county) counties.add(entity.county);
          if (entity.region) regions.add(entity.region);
        }

        const entries: UrlEntry[] = [
          ...[...regions].map((region) => ({
            loc: `${BASE_URL}${geographyPath("region", region)}`,
            lastmod: generatedAt,
          })),
          ...[...counties].map((county) => ({
            loc: `${BASE_URL}${geographyPath("county", county)}`,
            lastmod: generatedAt,
          })),
        ];
        return xmlResponse(renderUrlset(entries));
      },
    },
  },
});
