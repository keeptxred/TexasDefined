import type { Article } from "../types";
import { texasLifeSplitArticles as sourceArticles } from "./texas-life-split-source";

const CURRENT_FORT_NAME_SENTENCE =
  "Joint Base San Antonio, Fort Cavazos, Fort Bliss and other installations support active-duty personnel, civilian employees, contractors, health care, construction, logistics and surrounding service businesses. In military-heavy communities, federal spending and personnel movement can materially shape housing demand and local employment.";

const PROTECTED_FOOTBALL_LINK = { href: "/article/texas-high-school-football-newcomers" };

if (!sourceArticles.some((article) => article.internalLinks?.some((link) => link.href === PROTECTED_FOOTBALL_LINK.href))) {
  throw new Error("Texas Life source contract is missing the high-school-football authority link.");
}

const correctedFortNameSentence = CURRENT_FORT_NAME_SENTENCE.replace("Fort Cavazos", "Fort Hood");

const KTR_POLICY_LINKS: Record<string, NonNullable<Article["internalLinks"]>> = {
  "texas-jobs-economy-industries": [
    {
      href: "https://keeptxred.com/policy/right-to-work",
      label: "Texas right-to-work policy",
      description: "KeepTXRed tracks the legal and legislative side of right-to-work and employment policy while TexasDefined focuses on the practical job market.",
    },
    {
      href: "https://keeptxred.com/policy/energy-ercot",
      label: "Texas energy and ERCOT policy",
      description: "Follow the policy, grid and regulatory side of the energy economy on KeepTXRed.",
    },
  ],
  "texas-schools-family-life": [
    {
      href: "https://keeptxred.com/policy/charter-schools",
      label: "Texas charter-school policy",
      description: "Track authorization, funding and legislative changes affecting Texas charter schools.",
    },
    {
      href: "https://keeptxred.com/policy/homeschool-autonomy",
      label: "Texas homeschool policy",
      description: "See the legal and legislative framework for homeschooling while this guide stays focused on family logistics.",
    },
    {
      href: "https://keeptxred.com/policy/parental-rights",
      label: "Texas parental-rights policy",
      description: "Follow state policy affecting parents, schools and education governance.",
    },
    {
      href: "https://keeptxred.com/policy/property-taxes",
      label: "Texas property-tax policy",
      description: "Understand the policy side of school-district and local property taxes on KeepTXRed.",
    },
  ],
  "texas-health-safety-daily-living": [
    {
      href: "https://keeptxred.com/policy/medical-freedom",
      label: "Texas health-policy tracker",
      description: "Use KeepTXRed for the legal and legislative health-policy layer while TexasDefined covers practical daily living and safety.",
    },
  ],
  "texas-major-cities-regional-differences": [
    {
      href: "https://keeptxred.com/policy/housing",
      label: "Texas housing policy",
      description: "Follow housing, property-rights and regulatory policy separately from the practical city and regional comparison here.",
    },
    {
      href: "https://keeptxred.com/policy/state-federal-power",
      label: "Texas state and federal power",
      description: "Use KeepTXRed for the government-authority questions that overlap with Texas regional and border geography.",
    },
  ],
};

const correctCurrentFortHoodReference = (article: Article): Article => {
  if (article.slug !== "texas-jobs-economy-industries") return article;

  return {
    ...article,
    body: article.body.map((block) =>
      block.type === "paragraph" && block.text === CURRENT_FORT_NAME_SENTENCE
        ? { ...block, text: correctedFortNameSentence }
        : block,
    ),
  };
};

const addReciprocalPolicyLinks = (article: Article): Article => {
  const additions = KTR_POLICY_LINKS[article.slug] ?? [];
  if (!additions.length) return article;

  const existing = article.internalLinks ?? [];
  return {
    ...article,
    internalLinks: [
      ...existing,
      ...additions.filter((addition) => !existing.some((link) => link.href === addition.href)),
    ],
  };
};

export const texasLifeSplitArticles: Article[] = sourceArticles
  .map(correctCurrentFortHoodReference)
  .map(addReciprocalPolicyLinks);
