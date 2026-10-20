import type { Article } from "../types";

/**
 * Subject-specific, rights-documented photographs for Texas Life housing guides.
 * Used by both eager article fixtures and lightweight catalog stubs, avoiding
 * mismatches between article pages and the Texas Life card images.
 * Source and reuse-license URLs: src/data/heritage-photo-license-links.ts.
 */
export const salaryAffordabilityHero: Article["hero"] = {
  src: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Independence_Heights_Residential_HIstoric_District_Houston_(HDR).jpg?width=1280",
  alt: "Houses along a residential street in Houston's Independence Heights neighborhood, illustrating Texas housing affordability",
  width: 1280,
  height: 853,
  credit: "Euthman · Wikimedia Commons · CC BY 3.0 (cropped for display)",
};

export const homeClosingHero: Article["hero"] = {
  src: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Close-up_of_the_key_with_house_keychain.jpg?width=1280",
  alt: "A house-shaped keychain and key in a front door lock, illustrating the final step of buying a home",
  width: 1280,
  height: 854,
  credit: "Shixart1985 · Wikimedia Commons · CC BY 2.0 (cropped for display)",
};

export const mortgageFinancingHero: Article["hero"] = {
  src: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Property_Contract_Law_and_Mortgages.jpg?width=1280",
  alt: "Property-law office desk with house keys and legal documents representing a home mortgage",
  width: 1280,
  height: 853,
  credit: "advokatsmart.no · Wikimedia Commons · CC BY 2.0 (cropped for display)",
};

export const homeEquityHero: Article["hero"] = {
  src: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Hartley_House,_Houston,_TX.jpg?width=1280",
  alt: "A house in Houston, Texas, representing the residential property used as collateral for a home equity loan",
  width: 1280,
  height: 853,
  credit: "25or6to4 · Wikimedia Commons · CC BY-SA 4.0 (cropped for display)",
};

export const privateWellEquipmentHero: Article["hero"] = {
  src: "https://commons.wikimedia.org/wiki/Special:Redirect/file/The_Well_(4679680189).jpg?width=1280",
  alt: "Photograph of well-water pump, pressure tank and plumbing components, illustrating equipment rural buyers should inspect; example outside Texas",
  width: 1280,
  height: 852,
  credit: "Dwight Sipler · Wikimedia Commons · CC BY 2.0 (illustrative equipment photo, taken outside Texas; cropped for display)",
};
