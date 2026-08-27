import type { Article } from "../types";
import { bosqueCountyMeridianCliftonNorwegianHeritageBosqueRiverArticle as sourceArticle } from "./bosque-county-meridian-clifton-norwegian-heritage-bosque-river-source";

const STALE_LINK_DESCRIPTION =
  "Travel south toward Gatesville, the Leon River and the limestone country around Fort Cavazos.";

export const bosqueCountyMeridianCliftonNorwegianHeritageBosqueRiverArticle: Article = {
  id: "county-bosque-meridian-clifton-norwegian-heritage-bosque-river",
  slug: "bosque-county-meridian-clifton-norwegian-heritage-bosque-river-texas",
  title: "Bosque County: Meridian, Clifton, Norwegian Heritage and the Bosque River",
  hero: {
    src: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Bosque_County_Courthouse%2C_Meridian%2C_Texas_%289053454175%29.jpg?width=1600",
    alt: "Bosque County Courthouse in Meridian, Texas",
    width: 3456,
    height: 5184,
    credit: "Nicolas Henderson · Wikimedia Commons · CC BY 2.0",
  },
  ...sourceArticle,
  internalLinks: sourceArticle.internalLinks?.map((link) =>
    link.description === STALE_LINK_DESCRIPTION
      ? { ...link, description: STALE_LINK_DESCRIPTION.replace("Fort Cavazos", "Fort Hood") }
      : link,
  ),
};
