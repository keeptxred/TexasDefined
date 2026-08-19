import { paintedChurches } from "./painted-churches";
import type { SearchDocument } from "./types";

export const paintedChurchSearchDocuments: SearchDocument[] = paintedChurches.map((church) => {
  const keywords = [
    "painted church",
    "painted churches",
    "Texas painted churches",
    church.shortName,
    church.city,
    `${church.county} County`,
    church.denomination,
    church.schulenburgCluster ? "Schulenburg painted churches" : undefined,
    church.nationalRegister?.multipleProperty ? "National Register decorative interior" : undefined,
    church.recordedTexasHistoricLandmark ? "Recorded Texas Historic Landmark" : undefined,
  ].filter((value): value is string => Boolean(value));

  return {
    id: `painted-church:${church.slug}`,
    brandId: "texasdefined",
    kind: "destination",
    title: church.name,
    summary: church.summary,
    keywords: [...new Set(keywords)],
    href: `/explore/painted-churches/${church.slug}`,
  };
});
