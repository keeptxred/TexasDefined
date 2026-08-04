import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";

import { exploreDestinations } from "@/data/explore/all-destinations";
import { BASE_URL, renderUrlset, toIsoDate, xmlResponse, type UrlEntry } from "@/lib/sitemap-shared";

const STATIC_PATHS = [
  "/explore",
  "/explore/caverns",
  "/explore/lighthouses",
  "/explore/major-springs",
  "/explore/hill-country-springs",
  "/explore/spring-fed-swimming",
  "/explore/spring-conservation-and-education",
  "/explore/scenic-rivers",
  "/explore/texas-camping-guide",
  "/explore/texas-dark-sky-stargazing",
  "/explore/texas-lakes-guide",
  "/explore/texas-scenic-drives",
  "/explore/texas-state-parks-guide",
  "/explore/texas-wildflower-seasons",
  "/explore/trip-planner",
];

export const Route = createFileRoute("/sitemap-explore.xml")({
  server: {
    handlers: {
      GET: () => {
        const generatedAt = toIsoDate(new Date());
        const entries: UrlEntry[] = [
          ...STATIC_PATHS.map((path) => ({ loc: `${BASE_URL}${path}`, lastmod: generatedAt })),
          ...exploreDestinations.map((entity) => ({
            loc: `${BASE_URL}/explore/${entity.slug}`,
            lastmod: toIsoDate(entity.sourceUpdatedAt ?? generatedAt),
          })),
        ];
        return xmlResponse(renderUrlset(entries));
      },
    },
  },
});
