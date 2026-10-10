import type { Article } from "../types";

const moverVerificationHero: Article["hero"] = {
  src: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Movingguardian.org.JPG/1280px-Movingguardian.org.JPG",
  alt: "Professional movers packing household boxes into a moving truck",
  width: 1280,
  height: 960,
  credit: "Rharel1 · public domain · Wikimedia Commons",
};

const healthInsuranceHero: Article["hero"] = {
  src: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ab/RD_CFDL-Lytle_Community_Health_Center_-_Community_Facility_Direct_Loan_%2820171205-RD-LSC-0262%29.jpg/1280px-RD_CFDL-Lytle_Community_Health_Center_-_Community_Facility_Direct_Loan_%2820171205-RD-LSC-0262%29.jpg",
  alt: "Patient registration counter at Lytle Community Health Center in Lytle, Texas",
  width: 1280,
  height: 854,
  credit: "Lance Cheung / USDA · public domain · Wikimedia Commons",
};

const militaryFamilyHero: Article["hero"] = {
  src: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Laughlin_moving_6697549.jpg/1280px-Laughlin_moving_6697549.jpg",
  alt: "Moving truck preparing for a military family's PCS move at Laughlin Air Force Base, Texas",
  width: 1280,
  height: 854,
  credit: "Airman 1st Class David Phaff / U.S. Air Force · public domain · Wikimedia Commons",
};

const renterHero: Article["hero"] = {
  src: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/ce/GulftonApartmentComplexes.JPG/1280px-GulftonApartmentComplexes.JPG",
  alt: "Apartment buildings and rental housing in the Gulfton neighborhood of Houston, Texas",
  width: 1280,
  height: 960,
  credit: "WhisperToMe · public domain · Wikimedia Commons",
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
    hero: renterHero,
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
    hero: moverVerificationHero,
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
    hero: healthInsuranceHero,
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
    hero: militaryFamilyHero,
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
