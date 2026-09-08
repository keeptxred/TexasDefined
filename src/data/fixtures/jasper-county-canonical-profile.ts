import type { Article } from "../types";
import { jasperCountyJasperKirbyvilleSamRayburnPineyWoodsTexasArticle } from "./jasper-county-jasper-kirbyville-sam-rayburn-piney-woods-texas";

const BLUE_HOLE_PATH = "/article/blue-hole-jasper-county-east-texas";

const blueHoleLink = {
  href: BLUE_HOLE_PATH,
  label: "Jasper County's Blue Hole quarry lake",
  description: "Read the history of the private blue-green quarry lake, its railroad past, geology, access limits and lost-train legend.",
};

const existingLinks = jasperCountyJasperKirbyvilleSamRayburnPineyWoodsTexasArticle.internalLinks ?? [];

export const jasperCountyCanonicalProfileArticle: Article = {
  ...jasperCountyJasperKirbyvilleSamRayburnPineyWoodsTexasArticle,
  internalLinks: existingLinks.some((link) => link.href === BLUE_HOLE_PATH)
    ? existingLinks
    : [...existingLinks, blueHoleLink],
};
