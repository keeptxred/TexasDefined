import { auditDestination } from "@/data/destination-audit";
import { listResolvedDestinations } from "@/data/destination-query-runtime";
import { assertSportsPartnerAccess } from "@/data/sports-partner-leads.server";
import { loadUpcomingTexasEventRecordsServer } from "@/data/events/texas-event-records.server";
import { platform, scope } from "@/data/index";
import { isArticleIndexReady } from "@/data/fixtures/texas-gateway-index-readiness";

import {
  EDITORIAL_OUTREACH_POLICY,
  VERIFIED_EDITORIAL_OUTREACH_TARGETS,
  type EditorialOutreachTarget,
} from "./editorial-outreach";
import {
  scoreEditorialOutreachTarget,
  type EditorialOutreachScorecard,
} from "./editorial-outreach-scoring";

export type EventProspectResearchKind = "organizer" | "venue" | "tourism-cvb" | "chamber" | "local-community";

export interface EventProspectResearchLane {
  kind: EventProspectResearchKind;
  label: string;
  qualification: string;
}

export interface EditorialOutreachResearchCandidate {
  id: string;
  contentKind: "destination" | "event" | "article-source";
  organization: string;
  pagePath: string;
  officialUrl: string;
  category: string;
  locationLabel: string;
  sourceCheckedAt: string;
  score: number;
  status: "contact-research" | "source-research";
  reason: string;
  suggestedAsks: string[];
  relatedProspectResearch?: EventProspectResearchLane[];
}

export interface EditorialOutreachNeedsImprovement {
  pagePath: string;
  name: string;
  organization: string;
  officialUrl: string;
  auditScore: number;
  issues: string[];
}

export type PrioritizedEditorialOutreachTarget = EditorialOutreachTarget & {
  prioritization: EditorialOutreachScorecard;
};

export interface EditorialOutreachDashboard {
  generatedAt: string;
  policy: typeof EDITORIAL_OUTREACH_POLICY;
  verifiedTargets: PrioritizedEditorialOutreachTarget[];
  automaticIntake: EditorialOutreachResearchCandidate[];
  eventIntake: EditorialOutreachResearchCandidate[];
  authoritySourceIntake: EditorialOutreachResearchCandidate[];
  needsImprovementFirst: EditorialOutreachNeedsImprovement[];
  summary: {
    verifiedTargets: number;
    existingRelationships: number;
    readyToContact: number;
    automaticResearchCandidates: number;
    eventResearchCandidates: number;
    authoritySourceCandidates: number;
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
      contentKind: "destination",
      organization: destination.managingAuthority,
      pagePath,
      officialUrl: destination.officialUrl,
      category: destination.category,
      locationLabel: destination.nearestTown,
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

  const eventIntake: EditorialOutreachResearchCandidate[] = [];
  for (const event of loadUpcomingTexasEventRecordsServer()) {
    if (
      !event.officialEventUrl
      || !event.lastVerifiedAt
      || seededPaths.has(event.guidePath)
      || event.guidePath.startsWith("/events?")
    ) continue;

    const namedSource = event.sourceName && !/^official organizer$/i.test(event.sourceName) ? event.sourceName : null;
    const organizer = namedSource ?? `${event.title} organizer`;
    const relatedProspectResearch: EventProspectResearchLane[] = [
      {
        kind: "organizer",
        label: organizer,
        qualification: "Use the current official organizer URL already attached to the source-qualified event. Before promotion, deduplicate the organization/domain against the Backlink Command Center and verify a current communications or media contact.",
      },
    ];
    if (event.venueName) {
      relatedProspectResearch.push({
        kind: "venue",
        label: event.venueName,
        qualification: "Research only when the venue is a distinct managing organization and an official venue/contact source can be verified. Deduplicate the organization/domain before promotion.",
      });
    }
    relatedProspectResearch.push(
      {
        kind: "tourism-cvb",
        label: `${event.city} tourism/CVB`,
        qualification: "Research only an official destination-marketing or visitor organization with a clear visitor-planning relationship to this event. Verify the official domain/contact and deduplicate before promotion.",
      },
      {
        kind: "chamber",
        label: `${event.city} chamber`,
        qualification: "Research only a legitimate local chamber when the event materially serves its visitor or community audience. Verify the official domain/contact and deduplicate before promotion.",
      },
      {
        kind: "local-community",
        label: `${event.city} relevant community/cultural organization`,
        qualification: "Research only a specific organization with a direct subject-matter, cultural or community relationship to this event. Do not create a generic prospect merely because the event occurs locally.",
      },
    );

    eventIntake.push({
      id: `event:${event.slug}`,
      contentKind: "event",
      organization: organizer,
      pagePath: event.guidePath,
      officialUrl: event.officialEventUrl,
      category: `event:${event.category}`,
      locationLabel: [event.city, event.countyName].filter(Boolean).join(" · "),
      sourceCheckedAt: event.lastVerifiedAt,
      score: Math.min(94, 82 + (namedSource ? 5 : 0) + (event.image?.displayAllowed ? 4 : 0)),
      status: "contact-research",
      reason: "Upcoming source-qualified event with a permanent TexasDefined guide and current official organizer URL. Research the organizer first; venue, tourism/CVB, chamber and community lanes are research flags only and must be independently qualified and deduplicated before promotion to the command center.",
      suggestedAsks: [
        "Verify dates, venue and visitor-planning details.",
        "Add TexasDefined to relevant press-release or organizer-update distribution.",
        "Provide approved event photography or media-use guidance.",
        "Establish a recurring update channel for next year's event before the public planning cycle begins.",
      ],
      relatedProspectResearch,
    });
  }

  const authoritySourceIntake: EditorialOutreachResearchCandidate[] = [];
  const articles = await platform.articles.list(scope);
  for (const article of articles) {
    if (!isArticleIndexReady(article) || !article.sourceName || !article.sourceUrl) continue;
    const checkedAt = article.updatedAt ?? article.publishedAt;
    authoritySourceIntake.push({
      id: `article-source:${article.slug}`,
      contentKind: "article-source",
      organization: article.sourceName,
      pagePath: `/article/${article.slug}`,
      officialUrl: article.sourceUrl,
      category: `article:${article.category}`,
      locationLabel: article.region ? String(article.region).replaceAll("-", " ") : "Texas editorial",
      sourceCheckedAt: checkedAt,
      score: 72,
      status: "source-research",
      reason: "Index-ready TexasDefined authority article names this source explicitly. Confirm the source organization is an appropriate subject-matter relationship before any outreach; citation alone is not sufficient.",
      suggestedAsks: [
        "Confirm the cited material remains current and correctly represented.",
        "Identify a subject-matter or communications contact for future fact checks.",
        "Ask about update feeds, public datasets or reusable media only when relevant to the article topic.",
        "Do not request a backlink unless a later relationship establishes that the TexasDefined resource is independently useful.",
      ],
    });
  }

  automaticIntake.sort((left, right) => right.score - left.score || left.organization.localeCompare(right.organization));
  eventIntake.sort((left, right) => right.score - left.score || left.sourceCheckedAt.localeCompare(right.sourceCheckedAt));
  authoritySourceIntake.sort((left, right) => right.sourceCheckedAt.localeCompare(left.sourceCheckedAt) || left.organization.localeCompare(right.organization));
  needsImprovementFirst.sort((left, right) => right.auditScore - left.auditScore || left.name.localeCompare(right.name));

  const verifiedTargets: PrioritizedEditorialOutreachTarget[] = VERIFIED_EDITORIAL_OUTREACH_TARGETS
    .map((target) => ({ ...target, prioritization: scoreEditorialOutreachTarget(target) }))
    .sort((left, right) =>
      left.priority - right.priority || right.prioritization.total - left.prioritization.total || left.organization.localeCompare(right.organization)
    );

  return {
    generatedAt: new Date().toISOString(),
    policy: EDITORIAL_OUTREACH_POLICY,
    verifiedTargets,
    automaticIntake: automaticIntake.slice(0, 60),
    eventIntake: eventIntake.slice(0, 40),
    authoritySourceIntake: authoritySourceIntake.slice(0, 40),
    needsImprovementFirst: needsImprovementFirst.slice(0, 40),
    summary: {
      verifiedTargets: verifiedTargets.length,
      existingRelationships: verifiedTargets.filter((target) => target.status === "existing-relationship").length,
      readyToContact: verifiedTargets.filter((target) => target.status === "ready").length,
      automaticResearchCandidates: Math.min(60, automaticIntake.length),
      eventResearchCandidates: Math.min(40, eventIntake.length),
      authoritySourceCandidates: Math.min(40, authoritySourceIntake.length),
      pagesNeedingImprovementFirst: Math.min(40, needsImprovementFirst.length),
    },
  };
}
