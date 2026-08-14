import electricityHero from "@/assets/generated/texas-electricity-plan.jpg";
import hurricaneHero from "@/assets/generated/texas-hurricane-prep.jpg";
import roofHero from "@/assets/generated/texas-roofs-hail-wind-heat.jpg";
import schoolDistrictsHero from "@/assets/generated/texas-school-districts.jpg";

import type { Article } from "../types";

export const texasHurricanePreparationStub: Article = {
  id: "evergreen-texas-hurricane-preparation",
  brandId: "texasdefined",
  slug: "texas-hurricane-preparation-homeowners-renters",
  title: "A Texas Hurricane Preparation Guide for Homeowners and Renters",
  dek: "Hurricane preparation is easier before the Gulf starts getting busy. Build a practical Texas plan for evacuation, power loss, flooding, pets, medications, insurance records and the first days after a storm.",
  category: "home-garden",
  hero: { src: hurricaneHero, alt: "Texas Gulf Coast home prepared for hurricane wind and rain with emergency supplies", width: 1600, height: 1067 },
  authorId: "a-marisol",
  publishedAt: "2026-08-07",
  readingMinutes: 12,
  tags: ["texas hurricane", "hurricane preparation", "gulf coast", "emergency kit", "evacuation", "home preparedness"],
  featured: true,
  body: [],
  relatedCollections: [],
  relatedDestinations: [],
};

export const texasRoofsHailWindHeatStub: Article = {
  id: "evergreen-texas-roofs-hail-wind-heat",
  brandId: "texasdefined",
  slug: "texas-roofs-hail-wind-heat",
  title: "Texas Roofs: Hail, Wind, Heat and What Homeowners Need to Know",
  dek: "Texas roofs live a hard life. Here is how hail, straight-line wind, hurricanes, sun and heat shorten roof life—and what homeowners should inspect before small damage becomes an expensive leak.",
  category: "home-garden",
  hero: { src: roofHero, alt: "Texas home roof beneath storm clouds, hail and intense sun", width: 1600, height: 1067 },
  authorId: "a-marisol",
  publishedAt: "2026-08-07",
  readingMinutes: 11,
  tags: ["texas roofs", "hail damage", "wind damage", "roof maintenance", "homeowners insurance", "texas weather"],
  featured: true,
  body: [],
  relatedCollections: [],
  relatedDestinations: [],
};

export const texasSchoolDistrictsExplainedStub: Article = {
  id: "evergreen-texas-school-districts-explained",
  brandId: "texasdefined",
  slug: "texas-school-districts-explained",
  title: "What Does ISD Stand For in Texas? Texas School Districts Explained",
  dek: "ISD stands for Independent School District. Here is what that means in Texas, why city limits do not determine your school district and how to verify the schools tied to a specific address.",
  category: "moving-to-texas",
  hero: { src: schoolDistrictsHero, alt: "Texas public school campus, school bus and neighborhood boundary map imagery", width: 1600, height: 900 },
  authorId: "a-marisol",
  publishedAt: "2026-08-07",
  readingMinutes: 10,
  tags: ["what does isd stand for in texas", "texas school districts", "isd", "moving to texas", "texas schools", "school boundaries", "home buying"],
  featured: true,
  body: [],
  relatedCollections: [],
  relatedDestinations: [],
};

export const chooseElectricityPlanTexasStub: Article = {
  id: "evergreen-choose-electricity-plan-texas",
  brandId: "texasdefined",
  slug: "how-to-choose-electricity-plan-texas",
  title: "How to Choose an Electricity Plan in Texas Without Getting Tricked by the Fine Print",
  dek: "The advertised rate is only the beginning. Learn how to read the Electricity Facts Label, compare plans at your real usage and avoid credits, minimums and contract terms that can turn a cheap-looking plan expensive.",
  category: "moving-to-texas",
  hero: { src: electricityHero, alt: "Texas home at dusk with power lines and an electricity bill on a table", width: 1600, height: 900 },
  authorId: "a-marisol",
  publishedAt: "2026-08-07",
  readingMinutes: 11,
  tags: ["texas electricity", "electricity plans", "moving to texas", "utilities", "electricity facts label", "texas power"],
  featured: true,
  body: [],
  relatedCollections: [],
  relatedDestinations: [],
};
