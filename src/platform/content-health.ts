export type ContentHealthInput = {
  id: string;
  title: string;
  lastReviewed: string;
  reviewEveryDays: number;
  officialUrl?: string;
  goldenRuleComplete: boolean;
  trustFramework: boolean;
  nextSteps: number;
};

export type ContentHealthStatus = 'healthy' | 'review-soon' | 'overdue' | 'blocked';
export type ContentHealthItem = ContentHealthInput & { status: ContentHealthStatus; issues: string[]; daysSinceReview: number };

export function evaluateContentHealth(resource: ContentHealthInput, now = new Date()): ContentHealthItem {
  const issues: string[] = [];
  const reviewed = new Date(resource.lastReviewed);
  const daysSinceReview = Number.isNaN(reviewed.getTime()) ? Number.POSITIVE_INFINITY : Math.floor((now.getTime() - reviewed.getTime()) / 86_400_000);
  if (!resource.goldenRuleComplete) issues.push('Golden Rule incomplete');
  if (!resource.trustFramework) issues.push('Trust Framework missing');
  if (!resource.officialUrl?.startsWith('https://')) issues.push('Secure official source missing');
  if (resource.nextSteps < 1) issues.push('Next steps missing');
  let status: ContentHealthStatus = 'healthy';
  if (issues.length) status = 'blocked';
  else if (daysSinceReview > resource.reviewEveryDays) status = 'overdue';
  else if (daysSinceReview > resource.reviewEveryDays * 0.8) status = 'review-soon';
  return { ...resource, status, issues, daysSinceReview };
}

export function buildContentHealthReport(resources: ReadonlyArray<ContentHealthInput>, now = new Date()) {
  const items = resources.map((resource) => evaluateContentHealth(resource, now));
  return {
    total: items.length,
    healthy: items.filter((item) => item.status === 'healthy').length,
    needsAttention: items.filter((item) => item.status !== 'healthy').length,
    items: [...items].sort((a, b) => severity(b.status) - severity(a.status) || b.daysSinceReview - a.daysSinceReview),
  };
}

function severity(status: ContentHealthStatus) {
  return status === 'blocked' ? 4 : status === 'overdue' ? 3 : status === 'review-soon' ? 2 : 1;
}
