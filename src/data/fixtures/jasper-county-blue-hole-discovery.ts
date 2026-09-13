import { jasperCountyJasperKirbyvilleSamRayburnPineyWoodsTexasArticle as baseArticle } from "./jasper-county-jasper-kirbyville-sam-rayburn-piney-woods-texas";

const blueHoleLink = {
  href: "/article/blue-hole-jasper-county-east-texas",
  label: "Jasper County's Blue Hole quarry lake",
  description: "Read the history of the private blue-green quarry lake, its railroad past, geology, access limits and lost-train legend.",
};

export const jasperCountyBlueHoleDiscoveryArticle = {
  ...baseArticle,
  internalLinks: baseArticle.internalLinks?.some((link) => link.href === blueHoleLink.href)
    ? baseArticle.internalLinks
    : [...(baseArticle.internalLinks ?? []), blueHoleLink],
};
