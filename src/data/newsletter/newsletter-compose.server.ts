import { z } from 'zod';
import { saveNewsletterIssueDraft } from './newsletter.server';
import { renderTexasDefinedNewsletter } from './newsletter-template';
import { hydrateNewsletterStoryVisual } from './newsletter-visual-library';
import {
  INSIDE_TEXASDEFINED_NAME,
  inspectNewsletterVisualCoverage,
} from './newsletter-visual-standard';

const newsletterStorySchema = z.object({
  kicker: z.string().trim().max(80).optional(),
  title: z.string().trim().min(1).max(180),
  summary: z.string().trim().min(1).max(600),
  url: z.string().trim().min(1).max(2_000),
  imageUrl: z.string().trim().max(2_000).optional(),
  imageAlt: z.string().trim().max(300).optional(),
  imageCredit: z.string().trim().max(240).optional(),
  imageKind: z.enum(['photo', 'map', 'chart', 'graphic', 'historic']).optional(),
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

function normalizeHttpUrl(value: string, label: string) {
  try {
    const normalized = new URL(value, 'https://texasdefined.com').toString();
    if (!/^https?:\/\//.test(normalized)) throw new Error('unsupported protocol');
    return normalized;
  } catch {
    throw new Error(`${label} has an invalid HTTP(S) URL: ${value}`);
  }
}

function normalizeStories(input: TexasDefinedNewsletterDraftInput) {
  const seen = new Set<string>();
  const stories = [] as TexasDefinedNewsletterDraftInput['stories'];

  for (const story of input.stories) {
    const normalizedUrl = normalizeHttpUrl(story.url, 'Newsletter story');
    if (seen.has(normalizedUrl)) continue;
    seen.add(normalizedUrl);

    const hydrated = hydrateNewsletterStoryVisual({ ...story, url: normalizedUrl });
    stories.push({
      ...hydrated,
      imageUrl: hydrated.imageUrl ? normalizeHttpUrl(hydrated.imageUrl, 'Newsletter image') : undefined,
    });
  }

  if (!stories.length) throw new Error('Newsletter draft must contain at least one unique story.');
  return stories;
}

export function previewTexasDefinedNewsletterDraft(rawInput: TexasDefinedNewsletterDraftInput) {
  const parsed = newsletterDraftSchema.parse(rawInput);
  const stories = normalizeStories(parsed);
  const visualCoverage = inspectNewsletterVisualCoverage(stories);
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
    visualCoverage,
  };
}

export async function saveTexasDefinedNewsletterDraft(rawInput: TexasDefinedNewsletterDraftInput) {
  const parsed = newsletterDraftSchema.parse(rawInput);
  const stories = normalizeStories(parsed);
  const visualCoverage = inspectNewsletterVisualCoverage(stories);
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
    fromName: parsed.fromName ?? INSIDE_TEXASDEFINED_NAME,
    replyTo: parsed.replyTo ?? null,
    content: {
      type: 'inside-texasdefined-visual-digest',
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
      composer: 'inside-texasdefined-visual-digest-v2',
      storyCount: stories.length,
      imageCount: visualCoverage.imageCount,
      visualWarnings: visualCoverage.warnings,
    },
  });

  return {
    ...issue,
    storyCount: stories.length,
    visualCoverage,
    preview: rendered,
  };
}
