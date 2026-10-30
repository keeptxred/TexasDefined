import { createFileRoute, notFound } from "@tanstack/react-router";

import { texasDefinedBrand } from "@/brand/texasdefined";
import { YOUTH_HUNTING_IMAGE } from "@/data/hunting/youth-hunting-data";
import { buildMeta, canonicalLink } from "@/lib/seo";

export const Route = createFileRoute("/hunting/$slug")({
  loader: async ({ params }) => {
    const [{ getHuntingAuthorityTopic }, { getHuntingAuthorityTopicV2 }] = await Promise.all([
      import("@/data/hunting/authority"),
      import("@/data/hunting/authority-v2"),
    ]);
    const topic = getHuntingAuthorityTopicV2(params.slug) ?? getHuntingAuthorityTopic(params.slug);
    if (!topic) throw notFound();
    return topic;
  },
  head: ({ loaderData }) => {
    if (!loaderData) return {};
    const canonicalPath = `/hunting/${loaderData.slug}`;
    return {
      meta: buildMeta(texasDefinedBrand, { canonicalPath, title: loaderData.title, description: loaderData.description,
        ...(loaderData.slug === "texas-deer-hunting" ? {
          type: "article" as const,
          image: "https://www.fws.gov/sites/default/files/styles/max_1300x1300/public/banner_images/2021-05/White-tailed%20deer.jpg?itok=tsL8BNDt",
          imageAlt: "White-tailed deer buck in grass, US Fish and Wildlife Service",
          imageType: "image/jpeg",
          imageWidth: 1300,
          imageHeight: 863,
        } : loaderData.slug === "youth-hunting" ? {
          type: "article" as const,
          image: YOUTH_HUNTING_IMAGE.src,
          imageAlt: YOUTH_HUNTING_IMAGE.alt,
          imageType: "image/jpeg",
          imageWidth: YOUTH_HUNTING_IMAGE.width,
          imageHeight: YOUTH_HUNTING_IMAGE.height,
          modifiedTime: loaderData.reviewedOn ? loaderData.reviewedOn + "T12:00:00Z" : undefined,
        } : loaderData.slug === "turkey-hunting" ? {
          type: "article" as const,
          image: "https://www.fws.gov/carp/carp/sites/default/files/2021-06/rio_grande_wild_turkey_pair_buffalo_lake_nwr_robert_burton_usfws.jpg",
          imageAlt: "Rio Grande wild turkey pair at Buffalo Lake National Wildlife Refuge in Texas",
          imageType: "image/jpeg",
          imageWidth: 900,
          imageHeight: 650,
          modifiedTime: loaderData.reviewedOn ? loaderData.reviewedOn + "T12:00:00Z" : undefined,
        } : {}),
      }),
      links: [canonicalLink(texasDefinedBrand, canonicalPath)],
    };
  },
});