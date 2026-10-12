import type { Article } from "../types";
import { riverAuthorityRecords } from "../river-authority-registry";

/** Lightweight stubs keep the 10-river visitor body out of the initial bundle. */
import { texasExplainedRiverProfileStubs } from "./texas-explained-river-profile-stubs";
import { texasExplainedRemainingRiverProfileStubs } from "./texas-explained-river-profiles-remaining-stubs";

/** Existing basin guides keep their URLs and full editorial bodies. */
const LEGACY_RIVER_SLUGS = new Set([
  ...texasExplainedRiverProfileStubs,
  ...texasExplainedRemainingRiverProfileStubs,
].map((article) => article.slug));
export const texasRiverVisitorStubs: Article[] = riverAuthorityRecords
 .filter((river) => !LEGACY_RIVER_SLUGS.has(river.slug))
 .map((river) => ({
   id: `evergreen-${river.slug}`, brandId:"texasdefined", slug:river.slug,
   title: `${river.name}: Fishing, Camping & Visitor Guide`,
   dek: `${river.summary}. Plan legal access, fishing, paddling, swimming, campsites and nearby visits using official sources.`,
   category:"lakes-rivers",
   hero:{src:river.image,alt:river.imageAlt,width:1600,height:1067},
   authorId:"a-marisol",publishedAt:"2026-10-12",updatedAt:"2026-10-12",readingMinutes:12,
   tags:[river.name,"Texas rivers","river fishing","river camping","Texas paddling","Texas tourism"],
   featured:false,body:[],relatedCollections:[],relatedDestinations:[],
   sourceName:"Texas Water Development Board",sourceUrl:"https://www.twdb.texas.gov/surfacewater/rivers/river_basins/index.asp",
 }));
