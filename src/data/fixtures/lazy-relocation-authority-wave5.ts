import roadTrip from "@/assets/road-trip.jpg";
import smallTown from "@/assets/small-town.jpg";
import type { Article } from "../types";

const moveHero: Article["hero"] = {
  src: roadTrip,
  alt: "A Texas highway leading toward a new city and a new home",
  width: 1600,
  height: 1067,
};

const homeHero: Article["hero"] = {
  src: smallTown,
  alt: "Homes and neighborhood streets in a Texas community",
  width: 1600,
  height: 1067,
};

const stub = (
  id: string,
  record: Omit<Article, "id" | "brandId" | "authorId" | "body" | "relatedCollections" | "relatedDestinations">,
): Article => ({
  id,
  brandId: "texasdefined",
  authorId: "a-hollis",
  body: [],
  relatedCollections: [],
  relatedDestinations: [],
  ...record,
});

export const relocationAuthorityWave5Stubs: Article[] = [
  stub("relocation-authority-renter", {
    slug: "moving-to-texas-renter-guide",
    title: "Moving to Texas as a Renter: Lease, Deposit & Utility Guide",
    dek: "A practical renter-first Texas relocation guide covering lease review, deposits, repairs, utilities, insurance, address verification and move-in documentation.",
    category: "moving-to-texas",
    hero: homeHero,
    publishedAt: "2026-09-29",
    readingMinutes: 9,
    tags: ["renting in texas", "texas renter", "lease", "security deposit", "moving to texas"],
    sourceName: "Texas Attorney General Renter’s Rights",
    sourceUrl: "https://www.texasattorneygeneral.gov/consumer-protection/home-real-estate-and-travel/renters-rights",
  }),
  stub("relocation-authority-mover", {
    slug: "how-to-verify-texas-moving-company",
    title: "How to Verify a Texas Moving Company Before You Hire It",
    dek: "Use TxDMV and FMCSA records to distinguish licensed Texas movers, interstate carriers and brokers before household goods are loaded.",
    category: "moving-to-texas",
    hero: moveHero,
    publishedAt: "2026-09-29",
    readingMinutes: 8,
    tags: ["moving company", "licensed mover", "txdmv", "fmcsa", "moving to texas"],
    sourceName: "Texas Department of Motor Vehicles",
    sourceUrl: "https://www.txdmv.gov/motorists/consumer-protection/dont-make-a-move",
  }),
  stub("relocation-authority-health", {
    slug: "health-insurance-when-moving-to-texas",
    title: "Health Insurance When Moving to Texas: Coverage Transition Guide",
    dek: "How to plan employer, Marketplace and other health coverage when a move to Texas changes your ZIP code, county, job or provider network.",
    category: "moving-to-texas",
    hero: moveHero,
    publishedAt: "2026-09-29",
    readingMinutes: 8,
    tags: ["health insurance", "special enrollment period", "moving to texas", "healthcare", "new resident"],
    sourceName: "Texas Department of Insurance",
    sourceUrl: "https://www.tdi.texas.gov/tips/moving-to-texas.html",
  }),
  stub("relocation-authority-military", {
    slug: "military-family-moving-to-texas",
    title: "Military Family Moving to Texas: PCS & New-Duty-Station Guide",
    dek: "A Texas PCS planning guide for military families covering installation resources, housing, schools, TRICARE, household goods, spouse employment and arrival tasks.",
    category: "moving-to-texas",
    hero: moveHero,
    publishedAt: "2026-09-29",
    readingMinutes: 9,
    tags: ["military family", "pcs", "moving to texas", "tricare", "military relocation"],
    sourceName: "Military OneSource",
    sourceUrl: "https://www.militaryonesource.mil/moving-pcs/",
  }),
];

const slugs = new Set(relocationAuthorityWave5Stubs.map((article) => article.slug));

export async function loadRelocationAuthorityWave5Article(
  brandId: string,
  slug: string,
): Promise<Article | null> {
  if (brandId !== "texasdefined" || !slugs.has(slug)) return null;
  const { relocationAuthorityWave5Articles } = await import("./relocation-authority-wave5");
  return relocationAuthorityWave5Articles.find((article) => article.slug === slug) ?? null;
}
