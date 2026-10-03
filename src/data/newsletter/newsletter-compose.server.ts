import { z } from 'zod';
import { saveNewsletterIssueDraft } from './newsletter.server';
import { renderTexasDefinedNewsletter } from './newsletter-template';

const newsletterStorySchema = z.object({
  kicker: z.string().trim().max(80).optional(),
  title: z.string().trim().min(1).max(180),
  summary: z.string().trim().min(1).max(600),
  url: z.string().trim().min(1).max(2_000),
  imageUrl: z.string().trim().max(2_000).optional(),
});

const newsletterDraftSchema = z.object({
  slug: z.string().trim().min(1).max(120).regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  subject: z.string().trim().min(1).max(180),
  preheader: z.string().trim().max(240).optional().nullable(),
  issueLabel: z.string().trim().min(1).max(120),
  headline: z.string().trim().min(1).max(180),
  intro: z.string().trim().min(1).max(1_000),
  stories: z.array(newsletterStorySchema).min(1).max(12),
  closing: z.string().trim().max(600).optional(),
  fromName: z.string().trim().min(1).max(120).optional(),
  replyTo: z.string().email().optional().nullable(),
  audience: z.record(z.string(), z.unknown()).optional(),
  metadata: z.record(z.string(), z.unknown()).optional(),
});

export type TexasDefinedNewsletterDraftInput = z.infer<typeof newsletterDraftSchema>;

function normalizeStoryUrls(input: TexasDefinedNewsletterDraftInput) {
  const seen = new Set<string>();
  const stories = [] as TexasDefinedNewsletterDraftInput['stories'];
  for (const story of input.stories) {
    let normalized: string;
    try {
      normalized = new URL(story.url, 'https://texasdefined.com').toString();
    } catch {
      throw new Error(`Newsletter story has an invalid URL: ${story.url}`);
    }
    if (!/^https?:\/\//.test(normalized)) throw new Error(`Newsletter story must use HTTP(S): ${story.url}`);
    if (seen.has(normalized)) continue;
    seen.add(normalized);
    stories.push({ ...story, url: normalized });
  }
  if (!stories.length) throw new Error('Newsletter draft must contain at least one unique story.');
  return stories;
}

export function previewTexasDefinedNewsletterDraft(rawInput: TexasDefinedNewsletterDraftInput) {
  const parsed = newsletterDraftSchema.parse(rawInput);
  const stories = normalizeStoryUrls(parsed);
  const rendered = renderTexasDefinedNewsletter({
    issueLabel: parsed.issueLabel,
    headline: parsed.headline,
    intro: parsed.intro,
    stories,
    closing: parsed.closing,
  });
  return {
    ...rendered,
    storyCount: stories.length,
    subject: parsed.subject,
    preheader: parsed.preheader ?? null,
  };
}

export async function saveTexasDefinedNewsletterDraft(rawInput: TexasDefinedNewsletterDraftInput) {
  const parsed = newsletterDraftSchema.parse(rawInput);
  const stories = normalizeStoryUrls(parsed);
  const rendered = renderTexasDefinedNewsletter({
    issueLabel: parsed.issueLabel,
    headline: parsed.headline,
    intro: parsed.intro,
    stories,
    closing: parsed.closing,
  });

  const issue = await saveNewsletterIssueDraft({
    slug: parsed.slug,
    subject: parsed.subject,
    preheader: parsed.preheader ?? null,
    fromName: parsed.fromName ?? 'TexasDefined',
    replyTo: parsed.replyTo ?? null,
    content: {
      type: 'texasdefined-story-digest',
      issueLabel: parsed.issueLabel,
      headline: parsed.headline,
      intro: parsed.intro,
      stories,
      closing: parsed.closing ?? null,
    },
    htmlBody: rendered.html,
    textBody: rendered.text,
    audience: parsed.audience ?? {},
    metadata: {
      ...(parsed.metadata ?? {}),
      composer: 'texasdefined-story-digest-v1',
      storyCount: stories.length,
    },
  });

  return {
    ...issue,
    storyCount: stories.length,
    preview: rendered,
  };
}
