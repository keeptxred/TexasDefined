import { createServerFn } from '@tanstack/react-start';
import { z } from 'zod';

const accessSchema = z.object({
  accessKey: z.string().trim().min(20).max(200),
});

const issueSchema = accessSchema.extend({
  issueId: z.string().uuid(),
});

const scheduleSchema = issueSchema.extend({
  scheduledFor: z.string().trim().min(1).max(80),
});

async function assertNewsletterAdminAccess(accessKey: string) {
  // Reuse the existing operations-admin key and its server-side constant-time hash check.
  // Keep the verifier behind a dynamic server import so the client bundle never pulls in service-role code.
  const { assertSportsPartnerAccess } = await import('@/data/sports-partner-leads.server');
  await assertSportsPartnerAccess(accessKey);
}

export const getNewsletterAdminDashboard = createServerFn({ method: 'POST' })
  .inputValidator(accessSchema)
  .handler(async ({ data }) => {
    await assertNewsletterAdminAccess(data.accessKey);
    const { getNewsletterOperatorDashboard } = await import('./newsletter-operations.server');
    return getNewsletterOperatorDashboard();
  });

export const getNewsletterAdminIssue = createServerFn({ method: 'POST' })
  .inputValidator(issueSchema)
  .handler(async ({ data }) => {
    await assertNewsletterAdminAccess(data.accessKey);
    const { getNewsletterIssueForOperator } = await import('./newsletter-operations.server');
    return getNewsletterIssueForOperator(data.issueId);
  });

export const markNewsletterAdminIssueReady = createServerFn({ method: 'POST' })
  .inputValidator(issueSchema)
  .handler(async ({ data }) => {
    await assertNewsletterAdminAccess(data.accessKey);
    const { markNewsletterIssueReady } = await import('./newsletter-issue.server');
    return markNewsletterIssueReady(data.issueId);
  });

export const scheduleNewsletterAdminIssue = createServerFn({ method: 'POST' })
  .inputValidator(scheduleSchema)
  .handler(async ({ data }) => {
    await assertNewsletterAdminAccess(data.accessKey);
    const { scheduleNewsletterIssue } = await import('./newsletter-issue.server');
    return scheduleNewsletterIssue(data.issueId, data.scheduledFor);
  });

export const cancelNewsletterAdminIssue = createServerFn({ method: 'POST' })
  .inputValidator(issueSchema)
  .handler(async ({ data }) => {
    await assertNewsletterAdminAccess(data.accessKey);
    const { cancelNewsletterIssue } = await import('./newsletter-issue.server');
    return cancelNewsletterIssue(data.issueId);
  });
