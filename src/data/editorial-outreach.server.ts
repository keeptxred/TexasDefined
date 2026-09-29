import { auditDestination } from "@/data/destination-audit";
import { listResolvedDestinations } from "@/data/destination-query-runtime";
import { assertSportsPartnerAccess } from "@/data/sports-partner-leads.server";

import {
  EDITORIAL_OUTREACH_POLICY,
  VERIFIED_EDITORIAL_OUTREACH_TARGETS,
  type EditorialOutreachTarget,
} from "./editorial-outreach";

export interface EditorialOutreachResearchCandidate {
  id: string;
  organization: string;
  pagePath: string;
  officialUrl: string;
  category: string;
  nearestTown: string;
  sourceCheckedAt: string;
  score: number;
  status: "contact-research";
  reason: string;
  suggestedAsks: string[];
}

export interface EditorialOutreachNeedsImprovement {
  pagePath: string;
  name: string;
  organization: string;
  officialUrl: string;
  auditScore: number;
  issues: string[];
}

export interface EditorialOutreachDashboard {
  generatedAt: string;
  policy: typeof EDITORIAL_OUTREACH_POLICY;
  verifiedTargets: EditorialOutreachTarget[];
  automaticIntake: EditorialOutreachResearchCandidate[];
  needsImprovementFirst: EditorialOutreachNeedsImprovement[];
  summary: {
    verifiedTargets: number;
    existingRelationships: number;
    readyToContact: number;
    automaticResearchCandidates: number;
    pagesNeedingImprovementFirst: number;
  };
}

function domainLabel(url: string) {
  try {
    return new URL(url).hostname.replace(/^www./, "");
  } catch {
    return url;
  }
}

function automaticScore(category: string, auditScore: number, hasAuthority: boolean, sourceCheckedAt: string) {
  let score = Math.min(70, auditScore);
  if (hasAuthority) score += 10;
  if (["historic-sites", "state-parks", "national-parks", "small-towns"].includes(category)) score += 8;
  if (["food-bbq", "lakes-rivers", "museums"].includes(category)) score += 5;
  const checked = Date.parse(sourceCheckedAt);
  if (Number.isFinite(checked) && Date.now() - checked <= 1000 * 60 * 60 * 24 * 180) score += 7;
  return Math.min(95, score);
}

export async function loadEditorialOutreachDashboard(accessKey: string): Promise<EditorialOutreachDashboard> {
  await assertSportsPartnerAccess(accessKey);

  const destinations = await listResolvedDestinations({ limit: 5000 });
  const seededPaths = new Set(VERIFIED_EDITORIAL_OUTREACH_TARGETS.map((target) => target.pagePath));
  const automaticIntake: EditorialOutreachResearchCandidate[] = [];
  const needsImprovementFirst: EditorialOutreachNeedsImprovement[] = [];

  for (const destination of destinations) {
    if (!destination.officialUrl || !destination.managingAuthority) continue;
    const pagePath = `/destination/${destination.slug}`;
    if (seededPaths.has(pagePath)) continue;

    const audit = auditDestination(destination);
    if (!audit.readyForIndexing) {
      needsImprovementFirst.push({
        pagePath,
        name: destination.name,
        organization: destination.managingAuthority,
        officialUrl: destination.officialUrl,
        auditScore: audit.score,
        issues: audit.issues.map((issue) => issue.message),
      });
      continue;
    }

    if (!destination.sourceCheckedAt) continue;
    automaticIntake.push({
      id: `destination:${destination.slug}`,
      organization: destination.managingAuthority,
      pagePath,
      officialUrl: destination.officialUrl,
      category: destination.category,
      nearestTown: destination.nearestTown,
      sourceCheckedAt: destination.sourceCheckedAt,
      score: automaticScore(destination.category, audit.score, true, destination.sourceCheckedAt),
      status: "contact-research",
      reason: `Index-ready destination with a named managing authority and current official source (${domainLabel(destination.officialUrl)}). Research the organization's media, communications or visitor-services contact before outreach.`,
      suggestedAsks: [
        "Verify factual and visitor-planning details.",
        "Provide a reliable channel for future corrections and material updates.",
        "Identify approved editorial photography or image-use guidance where useful.",
        "Only after the resource proves useful, invite an optional reference from an appropriate resource page.",
      ],
    });
  }

  automaticIntake.sort((left, right) => right.score - left.score || left.organization.localeCompare(right.organization));
  needsImprovementFirst.sort((left, right) => right.auditScore - left.auditScore || left.name.localeCompare(right.name));

  const verifiedTargets = [...VERIFIED_EDITORIAL_OUTREACH_TARGETS].sort((left, right) =>
    left.priority - right.priority || right.score - left.score || left.organization.localeCompare(right.organization)
  );

  return {
    generatedAt: new Date().toISOString(),
    policy: EDITORIAL_OUTREACH_POLICY,
    verifiedTargets,
    automaticIntake: automaticIntake.slice(0, 60),
    needsImprovementFirst: needsImprovementFirst.slice(0, 40),
    summary: {
      verifiedTargets: verifiedTargets.length,
      existingRelationships: verifiedTargets.filter((target) => target.status === "existing-relationship").length,
      readyToContact: verifiedTargets.filter((target) => target.status === "ready").length,
      automaticResearchCandidates: Math.min(60, automaticIntake.length),
      pagesNeedingImprovementFirst: Math.min(40, needsImprovementFirst.length),
    },
  };
}
