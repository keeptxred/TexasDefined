import {
  INSIDE_TEXASDEFINED_NAME,
  INSIDE_TEXASDEFINED_TAGLINE,
  NEWSLETTER_VISIBLE_IMAGE_SLOTS,
  type NewsletterImageKind,
} from './newsletter-visual-standard';

export type TexasDefinedNewsletterStory = {
  kicker?: string;
  title: string;
  summary: string;
  url: string;
  imageUrl?: string;
  imageAlt?: string;
  imageCredit?: string;
  imageKind?: NewsletterImageKind;
};

export type TexasDefinedNewsletterTemplateInput = {
  issueLabel: string;
  headline: string;
  intro: string;
  stories: TexasDefinedNewsletterStory[];
  closing?: string;
};

const escapeHtml = (value: string) => value
  .replaceAll('&', '&amp;')
  .replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;')
  .replaceAll('"', '&quot;')
  .replaceAll("'", '&#039;');

const safeHttpUrl = (value: string) => {
  try {
    const url = new URL(value, 'https://texasdefined.com');
    if (url.protocol !== 'https:' && url.protocol !== 'http:') return 'https://texasdefined.com/';
    return url.toString();
  } catch {
    return 'https://texasdefined.com/';
  }
};

const imageKindLabel = (kind?: NewsletterImageKind) => {
  if (kind === 'map') return 'TexasDefined map';
  if (kind === 'chart') return 'TexasDefined data';
  if (kind === 'graphic') return 'TexasDefined graphic';
  if (kind === 'historic') return 'Historic image';
  return '';
};

function renderStoryImage(story: TexasDefinedNewsletterStory, href: string) {
  if (!story.imageUrl) return '';
  const label = imageKindLabel(story.imageKind);
  const credit = story.imageCredit?.trim();
  const caption = [label, credit].filter(Boolean).join(' · ');
  return `<a href="${href}" style="text-decoration:none"><img src="${escapeHtml(safeHttpUrl(story.imageUrl))}" alt="${escapeHtml(story.imageAlt?.trim() || story.title)}" width="612" style="display:block;width:100%;height:auto;border:0;border-radius:12px;margin:0 0 10px" /></a>${caption ? `<div style="font:11px/1.4 Arial,sans-serif;color:#7b817c;margin:0 0 16px">${escapeHtml(caption)}</div>` : '<div style="height:6px;line-height:6px">&nbsp;</div>'}`;
}

function renderStory(story: TexasDefinedNewsletterStory, index: number) {
  const href = escapeHtml(safeHttpUrl(story.url));
  const image = index < NEWSLETTER_VISIBLE_IMAGE_SLOTS ? renderStoryImage(story, href) : '';
  const kicker = story.kicker ? `<div style="font:700 12px/1.3 Arial,sans-serif;letter-spacing:.12em;text-transform:uppercase;color:#9a4d2d;margin:0 0 8px">${escapeHtml(story.kicker)}</div>` : '';
  const titleSize = index === 0 ? 30 : 24;
  const divider = index === NEWSLETTER_VISIBLE_IMAGE_SLOTS
    ? `<tr><td style="padding:8px 0 22px"><div style="border-top:1px solid #ddd5c8;padding-top:18px;font:700 12px/1.3 Arial,sans-serif;letter-spacing:.13em;text-transform:uppercase;color:#6d756e">More from TexasDefined</div></td></tr>`
    : '';
  const storyRow = `<tr><td style="padding:0 0 ${index === 0 ? 36 : 30}px">${image}${kicker}<h2 style="font:700 ${titleSize}px/1.14 Georgia,serif;color:#1d2a35;margin:0 0 10px"><a href="${href}" style="color:#1d2a35;text-decoration:none">${escapeHtml(story.title)}</a></h2><p style="font:16px/1.58 Arial,sans-serif;color:#46535d;margin:0 0 12px">${escapeHtml(story.summary)}</p><a href="${href}" style="font:700 14px/1.3 Arial,sans-serif;color:#245b78;text-decoration:none">Read on TexasDefined →</a></td></tr>`;
  return `${divider}${storyRow}`;
}

export function renderTexasDefinedNewsletter(input: TexasDefinedNewsletterTemplateInput) {
  const stories = input.stories.slice(0, 12);
  const cards = stories.map(renderStory).join('');

  const html = `<!doctype html><html><body style="margin:0;padding:0;background:#efe9dd"><table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#efe9dd"><tr><td align="center" style="padding:24px 12px"><table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:680px;background:#fff;border-radius:14px;overflow:hidden"><tr><td style="height:8px;line-height:8px;background:#9a4d2d">&nbsp;</td></tr><tr><td style="padding:30px 34px 18px"><div style="font:700 15px/1.2 Arial,sans-serif;letter-spacing:.14em;text-transform:uppercase;color:#245b78">${escapeHtml(INSIDE_TEXASDEFINED_NAME)}</div><div style="font:italic 15px/1.45 Georgia,serif;color:#6b756f;margin-top:7px">${escapeHtml(INSIDE_TEXASDEFINED_TAGLINE)}</div><div style="font:12px/1.4 Arial,sans-serif;color:#7d837d;margin-top:18px">${escapeHtml(input.issueLabel)}</div><h1 style="font:700 38px/1.06 Georgia,serif;color:#1d2a35;margin:14px 0 14px">${escapeHtml(input.headline)}</h1><p style="font:18px/1.6 Georgia,serif;color:#46535d;margin:0">${escapeHtml(input.intro)}</p></td></tr><tr><td style="padding:16px 34px 8px"><table role="presentation" width="100%" cellspacing="0" cellpadding="0">${cards}</table></td></tr><tr><td style="padding:24px 34px 34px;background:#f8f5ee;border-top:1px solid #e4ded2"><div style="font:700 13px/1.3 Arial,sans-serif;letter-spacing:.1em;text-transform:uppercase;color:#245b78;margin:0 0 10px">${escapeHtml(INSIDE_TEXASDEFINED_NAME)}</div><p style="font:14px/1.55 Arial,sans-serif;color:#52606a;margin:0 0 16px">${escapeHtml(input.closing || 'Thanks for exploring Texas with us.')}</p><p style="font:12px/1.55 Arial,sans-serif;color:#77818a;margin:0">You received this because you subscribed to TexasDefined. <a href="{{{RESEND_UNSUBSCRIBE_URL}}}" style="color:#52606a">Unsubscribe</a>.</p></td></tr></table></td></tr></table></body></html>`;

  const textStories = stories.map((story) => `${story.kicker ? `${story.kicker}\n` : ''}${story.title}\n${story.summary}\n${safeHttpUrl(story.url)}`).join('\n\n');
  const text = `${INSIDE_TEXASDEFINED_NAME.toUpperCase()}\n${INSIDE_TEXASDEFINED_TAGLINE}\n${input.issueLabel}\n\n${input.headline}\n${input.intro}\n\n${textStories}\n\n${input.closing || 'Thanks for exploring Texas with us.'}\n\nUnsubscribe: {{{RESEND_UNSUBSCRIBE_URL}}}`;
  return { html, text };
}
