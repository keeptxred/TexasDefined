// Decode HTML entities before measuring visible SEO metadata or comparing
// rendered content. Chromium decodes numeric hex entities such as &#x27;
// (an apostrophe) as one character; counting source bytes creates false
// "title-extreme-length" failures in the live whole-site audit.
const NAMED_ENTITIES = Object.freeze({
  amp: "&", lt: "<", gt: ">", quot: '"', apos: "'",
  nbsp: "\u00a0", ndash: "–", mdash: "—",
  lsquo: "‘", rsquo: "’", ldquo: "“", rdquo: "”",
  hellip: "…",
});

export function decodeEntities(value = "") {
  return String(value).replace(/&(#(?:x[0-9a-f]+|[0-9]+)|[a-z][a-z0-9]+);/gi, (whole, entity) => {
    if (entity.startsWith("#")) {
      const hex = /^#x/i.test(entity);
      const codepoint = Number.parseInt(entity.slice(hex ? 2 : 1), hex ? 16 : 10);
      if (!Number.isFinite(codepoint) || codepoint === 0 || codepoint > 0x10ffff || (codepoint >= 0xd800 && codepoint <= 0xdfff)) return "\ufffd";
      return String.fromCodePoint(codepoint);
    }
    return NAMED_ENTITIES[entity.toLowerCase()] ?? whole;
  });
}
