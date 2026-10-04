import { createServerFn } from '@tanstack/react-start';
import { setResponseHeaders } from '@tanstack/react-start/server';
import { z } from 'zod';

import {
  loginNewsletterAdmin,
  logoutNewsletterAdmin,
  newsletterAdminSessionStatus,
  requireNewsletterAdmin,
} from './newsletter-admin-auth.server';
import { newsletterDraftSchema } from './newsletter-compose-contract';

const issueStatusSchema = z.enum(['draft', 'ready', 'scheduled', 'sending', 'sent', 'cancelled']);
const issueIdSchema = z.object({ issueId: z.string().uuid() });
const loginSchema = z.object({ accessKey: z.string().min(32).max(512) });
const listSchema = z.object({
  status: issueStatusSchema.optional(),
  limit: z.number().int().min(1).max(100).optional(),
});
const scheduleSchema = z.object({
  issueId: z.string().uuid(),
  scheduledFor: z.string().datetime({ offset: true }),
});

function privateNoStore() {
  setResponseHeaders(new Headers({
    'Cache-Control': 'private, no-store',
    'CDN-Cache-Control': 'no-store',
    Vary: 'Cookie',
    'X-Robots-Tag': 'noindex, nofollow',
  }));
}

async function authorize() {
  privateNoStore();
  await requireNewsletterAdmin();
}

export const newsletterAdminLogin = createServerFn({ method: 'POST' })
  .inputValidator(loginSchema)
  .handler(async ({ data }) => {
    privateNoStore();
    return loginNewsletterAdmin(data.accessKey);
  });

export const newsletterAdminLogout = createServerFn({ method: 'POST' })
  .handler(async () => {
    privateNoStore();
    return logoutNewsletterAdmin();
  });

export const getNewsletterAdminSession = createServerFn({ method: 'GET' })
  .handler(async () => {
    privateNoStore();
    return newsletterAdminSessionStatus();
  });

export const getNewsletterAdminDashboard = createServerFn({ method: 'GET' })
  .handler(async () => {
    await authorize();
    const { getNewsletterOperatorDashboard } = await import('./newsletter-operations.server');
    return getNewsletterOperatorDashboard();
  });

export const listNewsletterAdminIssues = createServerFn({ method: 'GET' })
  .inputValidator(listSchema)
  .handler(async ({ data }) => {
    await authorize();
    const { listNewsletterIssues } = await import('./newsletter-operations.server');
    return listNewsletterIssues(data);
  });

export const getNewsletterAdminIssue = createServerFn({ method: 'GET' })
  .inputValidator(issueIdSchema)
  .handler(async ({ data }) => {
    await authorize();
    const { getNewsletterIssueForOperator } = await import('./newsletter-operations.server');
    return getNewsletterIssueForOperator(data.issueId);
  });

export const previewNewsletterAdminDraft = createServerFn({ method: 'POST' })
  .inputValidator(newsletterDraftSchema)
  .handler(async ({ data }) => {
    await authorize();
    const { previewTexasDefinedNewsletterDraft } = await import('./newsletter-compose.server');
    return previewTexasDefinedNewsletterDraft(data);
  });

export const saveNewsletterAdminDraft = createServerFn({ method: 'POST' })
  .inputValidator(newsletterDraftSchema)
  .handler(async ({ data }) => {
    await authorize();
    const { saveTexasDefinedNewsletterDraft } = await import('./newsletter-compose.server');
    return saveTexasDefinedNewsletterDraft(data);
  });

export const markNewsletterAdminIssueReady = createServerFn({ method: 'POST' })
  .inputValidator(issueIdSchema)
  .handler(async ({ data }) => {
    await authorize();
    const { markNewsletterIssueReady } = await import('./newsletter-issue.server');
    return markNewsletterIssueReady(data.issueId);
  });

export const scheduleNewsletterAdminIssue = createServerFn({ method: 'POST' })
  .inputValidator(scheduleSchema)
  .handler(async ({ data }) => {
    await authorize();
    const { scheduleNewsletterIssue } = await import('./newsletter-issue.server');
    return scheduleNewsletterIssue(data.issueId, data.scheduledFor);
  });

export const cancelNewsletterAdminIssue = createServerFn({ method: 'POST' })
  .inputValidator(issueIdSchema)
  .handler(async ({ data }) => {
    await authorize();
    const { cancelResendNewsletterIssue } = await import('./newsletter-resend.server');
    const provider = await cancelResendNewsletterIssue(data.issueId);
    const { cancelNewsletterIssue } = await import('./newsletter-issue.server');
    const local = await cancelNewsletterIssue(data.issueId);
    return { ok: true, provider, local } as const;
  });

export const syncNewsletterAdminAudience = createServerFn({ method: 'POST' })
  .handler(async () => {
    await authorize();
    const { syncNewsletterAudienceToResend } = await import('./newsletter-resend.server');
    return syncNewsletterAudienceToResend();
  });

export const stageNewsletterAdminIssueInResend = createServerFn({ method: 'POST' })
  .inputValidator(issueIdSchema)
  .handler(async ({ data }) => {
    await authorize();
    const { publishNewsletterIssueToResend } = await import('./newsletter-resend.server');
    return publishNewsletterIssueToResend(data.issueId, { send: false });
  });

export const sendOrScheduleNewsletterAdminIssue = createServerFn({ method: 'POST' })
  .inputValidator(issueIdSchema)
  .handler(async ({ data }) => {
    await authorize();
    const { publishNewsletterIssueToResend } = await import('./newsletter-resend.server');
    // The provider adapter separately requires NEWSLETTER_SENDING_ENABLED=true.
    return publishNewsletterIssueToResend(data.issueId, { send: true });
  });
