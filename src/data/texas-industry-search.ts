import type { SearchDocument } from "./types";
import { TEXAS_INDUSTRIES } from "./texas-industries";

const HUB_KEYWORDS = [
  "Texas industries",
  "Texas economy",
  "Texas jobs",
  "Texas business",
  "Texas economic sectors",
  "major Texas industries",
  "Texas employers",
  "Texas industry hubs",
  "Texas manufacturing",
  "Texas energy",
  "Texas technology",
  "Texas agriculture",
  "Texas finance",
  "Texas logistics",
] as const;

const SECTOR_ALIASES: Record<string, readonly string[]> = {
  "energy-power": ["oil and gas", "oilfield services", "electricity", "ERCOT", "wind power", "solar power", "pipelines", "refining", "LNG", "petrochemicals"],
  "technology-semiconductors": ["technology", "tech jobs", "software", "AI", "artificial intelligence", "semiconductors", "chips", "data centers", "telecom"],
  "advanced-manufacturing": ["manufacturing", "factories", "automotive", "vehicles", "electronics manufacturing", "industrial machinery", "fabricated metals"],
  "trade-transportation-logistics": ["logistics", "freight", "ports", "warehousing", "trucking", "rail", "air cargo", "Mexico trade", "border trade", "distribution"],
  "aerospace-aviation-defense": ["aerospace", "aviation", "defense", "NASA", "spaceflight", "aircraft", "military aviation", "space industry"],
  "healthcare-life-sciences": ["healthcare", "health care", "life sciences", "biotech", "biotechnology", "hospitals", "medical research", "pharmaceuticals", "medical devices"],
  "agriculture-livestock": ["agriculture", "farming", "ranching", "cattle", "cotton", "dairy", "poultry", "grains", "food processing"],
  "financial-services": ["finance", "financial services", "banking", "insurance", "investment", "fintech", "mortgage", "corporate finance"],
  "construction-real-estate": ["construction", "real estate", "homebuilding", "commercial development", "infrastructure", "engineering", "building trades"],
  "corporate-professional-services": ["headquarters", "corporate services", "professional services", "consulting", "accounting", "engineering services", "shared services"],
  "hospitality-tourism-culture": ["tourism", "hospitality", "hotels", "visitor economy", "attractions", "festivals", "sports tourism", "music", "film", "conventions"],
};

export function buildTexasIndustrySearchDocuments(): SearchDocument[] {
  const hub: SearchDocument = {
    id: "collection:texas-industries",
    brandId: "texasdefined",
    kind: "collection",
    title: "Texas Industries: Major Sectors & Regional Hubs",
    summary: "Explore the industries that drive Texas, with sourced sector guides, regional hubs and connections to cities, counties, companies and practical relocation research.",
    keywords: [...HUB_KEYWORDS],
    href: "/texas-industries",
  };

  const sectors = TEXAS_INDUSTRIES.map<SearchDocument>((industry) => ({
    id: `industry:${industry.slug}`,
    brandId: "texasdefined",
    kind: "guide",
    title: industry.title,
    summary: industry.description,
    keywords: [...new Set([
      industry.shortTitle,
      industry.title,
      "Texas industries",
      "Texas economy",
      ...industry.clusters,
      ...industry.hubs.map((hub) => hub.name),
      ...(SECTOR_ALIASES[industry.slug] ?? []),
    ])],
    href: industry.href,
  }));

  return [hub, ...sectors];
}
