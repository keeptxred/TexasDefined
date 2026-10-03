export type TexasDefinedNewsletterStory = {
  kicker?: string;
  title: string;
  summary: string;
  url: string;
  imageUrl?: string;
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

export function renderTexasDefinedNewsletter(input: TexasDefinedNewsletterTemplateInput) {
  const stories = input.stories.slice(0, 12);
  const cards = stories.map((story) => {
    const href = escapeHtml(safeHttpUrl(story.url));
    const image = story.imageUrl
      ? `<a href="${href}" style="text-decoration:none"><img src="${escapeHtml(safeHttpUrl(story.imageUrl))}" alt="" width="640" style="display:block;width:100%;height:auto;border:0;border-radius:10px;margin:0 0 16px" /></a>`
      : '';
    const kicker = story.kicker ? `<div style="font:700 12px/1.3 Arial,sans-serif;letter-spacing:.12em;text-transform:uppercase;color:#9a4d2d;margin:0 0 8px">${escapeHtml(story.kicker)}</div>` : '';
    return `<tr><td style="padding:0 0 30px">${image}${kicker}<h2 style="font:700 25px/1.14 Georgia,serif;color:#1d2a35;margin:0 0 10px"><a href="${href}" style="color:#1d2a35;text-decoration:none">${escapeHtml(story.title)}</a></h2><p style="font:16px/1.55 Arial,sans-serif;color:#46535d;margin:0 0 12px">${escapeHtml(story.summary)}</p><a href="${href}" style="font:700 14px/1.3 Arial,sans-serif;color:#245b78;text-decoration:none">Read on TexasDefined →</a></td></tr>`;
  }).join('');

  const html = `<!doctype html><html><body style="margin:0;padding:0;background:#f3efe6"><table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#f3efe6"><tr><td align="center" style="padding:24px 12px"><table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:680px;background:#fff;border-radius:14px;overflow:hidden"><tr><td style="padding:34px 34px 22px;border-top:8px solid #245b78"><div style="font:700 13px/1.2 Arial,sans-serif;letter-spacing:.16em;text-transform:uppercase;color:#9a4d2d">TexasDefined</div><div style="font:12px/1.4 Arial,sans-serif;color:#6b756f;margin-top:8px">${escapeHtml(input.issueLabel)}</div><h1 style="font:700 36px/1.08 Georgia,serif;color:#1d2a35;margin:18px 0 14px">${escapeHtml(input.headline)}</h1><p style="font:18px/1.58 Georgia,serif;color:#46535d;margin:0">${escapeHtml(input.intro)}</p></td></tr><tr><td style="padding:16px 34px 8px"><table role="presentation" width="100%" cellspacing="0" cellpadding="0">${cards}</table></td></tr><tr><td style="padding:24px 34px 34px;background:#f8f6f0;border-top:1px solid #e6e0d4"><p style="font:14px/1.55 Arial,sans-serif;color:#52606a;margin:0 0 16px">${escapeHtml(input.closing || 'Thanks for exploring Texas with us.')}</p><p style="font:12px/1.55 Arial,sans-serif;color:#77818a;margin:0">You received this because you subscribed to TexasDefined. <a href="{{{RESEND_UNSUBSCRIBE_URL}}}" style="color:#52606a">Unsubscribe</a>.</p></td></tr></table></td></tr></table></body></html>`;

  const textStories = stories.map((story) => `${story.kicker ? `${story.kicker}\n` : ''}${story.title}\n${story.summary}\n${safeHttpUrl(story.url)}`).join('\n\n');
  const text = `TEXASDEFINED\n${input.issueLabel}\n\n${input.headline}\n${input.intro}\n\n${textStories}\n\n${input.closing || 'Thanks for exploring Texas with us.'}\n\nUnsubscribe: {{{RESEND_UNSUBSCRIBE_URL}}}`;
  return { html, text };
}
