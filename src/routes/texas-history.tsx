import { createFileRoute } from "@tanstack/react-router";

import enchantedRock from "@/assets/enchanted-rock.jpg";

import { texasDefinedBrand } from "@/brand/texasdefined";
import { articlesQuery, destinationsQuery, regionsQuery } from "@/data/queries";
import type { Article, Destination } from "@/data/types";
import { buildEditorialCollectionHead, buildMeta, canonicalLink } from "@/lib/seo";

const description = "Missions and cattle trails, oil booms and courthouse squares — the people, places and turning points that still shape how Texas looks and feels today.";
const imageAlt = "The granite dome of Enchanted Rock under a wide sky";
const mergeDestinations = (...groups: Destination[][]) => [...new Map(groups.flat().map((destination) => [destination.slug, destination])).values()];

export const Route = createFileRoute("/texas-history")({
  head: ({ loaderData }: { loaderData?: { articles: Article[]; destinations: Destination[] } }) => loaderData ? buildEditorialCollectionHead(texasDefinedBrand, {
    canonicalPath: "/texas-history",
    title: "Texas History",
    collectionName: "Texas History",
    description,
    image: enchantedRock,
    imageAlt,
    breadcrumbParentName: "Texas Life",
    breadcrumbParentPath: "/texas-living",
    items: [
      { type: "WebPage" as const, name: "Texas Historic Sites & Museums", url: "/explore/historic-sites", description: "A statewide guide to battlefields, missions, museums, homes, forts and monuments." },
      { type: "WebPage" as const, name: "Texas Old West", url: "/texas-old-west", description: "A visitor-focused authority guide connecting ranching, cattle trails, frontier forts, Native history, Buffalo Soldiers, rodeo and western culture." },
      { type: "WebPage" as const, name: "Sacred Places in Texas", url: "/texas-sacred-places", description: "A respectful visitor guide to Painted Churches, missions, religious heritage and memorial landscapes." },
      { type: "WebPage" as const, name: "Battleship Texas (BB-35)", url: "/article/battleship-texas-bb-35-history-restoration", description: "A full history of the surviving dreadnought from 1914 through both World Wars, preservation and the Galveston restoration." },
      { type: "WebPage" as const, name: "Painted Churches of Texas", url: "/explore/painted-churches", description: "A source-checked statewide collection connecting church history, immigrant communities, architecture, decorative arts and preservation." },
      { type: "WebPage" as const, name: "Official Texas Capital Designations", url: "/texas-capital-designations", description: "A source-backed directory of current specialty capital titles enacted by the Texas Legislature." },
      { type: "WebPage" as const, name: "German & Czech Texas Towns", url: "/german-czech-texas-towns", description: "A heritage guide connecting food, churches, dance halls and settlement history across Central Texas and the Hill Country." },
      { type: "WebPage" as const, name: "Texas Dance Halls & Honky-Tonks", url: "/texas-dance-halls-honky-tonks", description: "A guide to the music, architecture and social traditions of Texas dance halls and honky-tonks." },
      ...loaderData.articles.map((article) => ({ type: "Article" as const, name: article.title, url: `/article/${article.slug}`, image: article.hero.src, description: article.dek })),
      ...loaderData.destinations.map((destination) => ({ type: "TouristAttraction" as const, name: destination.name, url: `/destination/${destination.slug}`, image: destination.hero.src, description: destination.summary })),
    ],
  }) : ({ meta: buildMeta(texasDefinedBrand, { canonicalPath: "/texas-history", title: "Texas History", description }), links: [canonicalLink(texasDefinedBrand, "/texas-history")] }),
  loader: async ({ context }): Promise<{ articles: Article[]; destinations: Destination[] }> => {
    const [articles, historyDestinations, historicSites] = await Promise.all([
      context.queryClient.ensureQueryData(articlesQuery({ category: "texas-history" })),
      context.queryClient.ensureQueryData(destinationsQuery({ category: "texas-history" })),
      context.queryClient.ensureQueryData(destinationsQuery({ category: "historic-sites" })),
      context.queryClient.ensureQueryData(regionsQuery()),
    ]);
    const destinations = mergeDestinations(historyDestinations, historicSites);
    return { articles, destinations };
  },
});
