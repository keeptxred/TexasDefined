import { decodeEntities } from '../ci/html-entities.mjs';

// Inspect the actual SSR markup seen by crawlers. TSX source ALT checks
// cannot catch undefined dynamic props or images from injected editorial HTML.
// This pure helper NEVER fetches any extra pages or scans the full site.
export function inspectRenderedBingSeo(html, { maxTitleLength = 68 } = {}) {
  const source = String(html ?? '');
  const head = source.match(/<head\b[^>]*>([\s\S]*?)<\/head>/i)?.[1] ?? source;
  const titleTags = [...head.matchAll(/<title\b[^>]*>([\s\S]*?)<\/title>/gi)];
  const title = decodeEntities(titleTags[0]?.[1] ?? '').replace(/\s+/g, ' ').trim();

  // Script strings and comments are not rendered image elements.
  const documentHtml = source
    .replace(/<!--[\s\S]*?-->/g, '')
    .replace(/<script\b[^>]*>[\s\S]*?<\/script\s*>/gi, '')
    .replace(/<style\b[^>]*>[\s\S]*?<\/style\s*>/gi, '');
  const images = [...documentHtml.matchAll(/<img\b(?:[^"'<>]|"[^"]*"|'[^']*')*>/gi)]
    .map((match) => match[0]);
  const missingAlts = images.filter((tag) => !/\s+alt\s*=\s*(?:"[^"]*"|'[^']*'|[^\s>]+)/i.test(tag));
  const findings = [];
  if (titleTags.length !== 1 || !title) findings.push('expected exactly one nonempty <title>');
  if (title.length > maxTitleLength) {
    findings.push('rendered title has ' + title.length + ' characters (budget ' + maxTitleLength + '): ' + title.slice(0, 105));
  }
  if (missingAlts.length) {
    findings.push(missingAlts.length + ' rendered <img> elements lack ALT attributes; first: ' + missingAlts[0].slice(0, 180));
  }
  return { title, titleLength: title.length, imageCount: images.length, missingAltCount: missingAlts.length, findings };
}

export function assertRenderedBingSeo(html, url) {
  const audit = inspectRenderedBingSeo(html);
  if (audit.findings.length) {
    throw new Error('Bing rendered SEO: ' + url + ': ' + audit.findings.join(' | '));
  }
  return audit;
}
