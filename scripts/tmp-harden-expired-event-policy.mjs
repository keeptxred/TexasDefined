import fs from 'node:fs';

function replaceOnce(path, before, after) {
  const text = fs.readFileSync(path, 'utf8');
  const count = text.split(before).length - 1;
  if (count !== 1) throw new Error(`${path}: expected exactly one match, found ${count}`);
  fs.writeFileSync(path, text.replace(before, after));
}

const pagePath = 'src/data/major-event-page.server.ts';
replaceOnce(
  pagePath,
  'const esc = (value: string | undefined) => (value ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\\\"/g, "&quot;").replace(/\'/g, "&#39;");\n',
  'const esc = (value: string | undefined) => (value ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\\\"/g, "&quot;").replace(/\'/g, "&#39;");\n\nfunction currentTexasDateIso() {\n  const parts = new Intl.DateTimeFormat("en-US", {\n    timeZone: "America/Chicago",\n    year: "numeric",\n    month: "2-digit",\n    day: "2-digit",\n  }).formatToParts(new Date());\n  const values = Object.fromEntries(parts.map((part) => [part.type, part.value]));\n  return `${values.year}-${values.month}-${values.day}`;\n}\n'
);
replaceOnce(
  pagePath,
  '  const occurrenceWindows = getMajorEventOccurrenceWindowsServer(event);\n  const dateLabel = formatMajorEventDateLabelServer(event);',
  '  const occurrenceWindows = getMajorEventOccurrenceWindowsServer(event);\n  const latestOccurrenceDate = occurrenceWindows.reduce((latest, window) => {\n    const candidate = window.endDate ?? window.startDate;\n    return candidate > latest ? candidate : latest;\n  }, event.endDate ?? event.startDate);\n  const occurrenceHasEnded = latestOccurrenceDate < currentTexasDateIso();\n  const dateLabel = formatMajorEventDateLabelServer(event);'
);
replaceOnce(
  pagePath,
  '  const displayOffers = [\n    ...(schemaEnrichment?.offers ?? []),\n    ...Object.values(schemaEnrichment?.occurrences ?? {}).flatMap((item) => item.offers ?? []),\n  ].filter((offer, index, offers) => offers.findIndex((candidate) => `${candidate.name}|${candidate.url}|${candidate.price}` === `${offer.name}|${offer.url}|${offer.price}`) === index);\n  const displayPerformers = [\n    ...(schemaEnrichment?.performers ?? []),\n    ...Object.values(schemaEnrichment?.occurrences ?? {}).flatMap((item) => item.performers ?? []),\n  ].filter((item, index, performers) => performers.findIndex((candidate) => `${candidate.type}|${candidate.name}|${candidate.url ?? ""}` === `${item.type}|${item.name}|${item.url ?? ""}`) === index);',
  '  const displayOffers = occurrenceHasEnded ? [] : [\n    ...(schemaEnrichment?.offers ?? []),\n    ...Object.values(schemaEnrichment?.occurrences ?? {}).flatMap((item) => item.offers ?? []),\n  ].filter((offer, index, offers) => offers.findIndex((candidate) => `${candidate.name}|${candidate.url}|${candidate.price}` === `${offer.name}|${offer.url}|${offer.price}`) === index);\n  const displayPerformers = occurrenceHasEnded ? [] : [\n    ...(schemaEnrichment?.performers ?? []),\n    ...Object.values(schemaEnrichment?.occurrences ?? {}).flatMap((item) => item.performers ?? []),\n  ].filter((item, index, performers) => performers.findIndex((candidate) => `${candidate.type}|${candidate.name}|${candidate.url ?? ""}` === `${item.type}|${item.name}|${item.url ?? ""}`) === index);'
);
replaceOnce(
  pagePath,
  '    city: event.city,\n    title: `${event.name} ${eventYear}: Dates & Texas Travel Guide`,',
  '    city: event.city,\n    occurrenceHasEnded,\n    title: `${event.name} ${eventYear}: Dates & Texas Travel Guide`,'
);

const authorityPath = 'src/data/major-event-authority.ts';
replaceOnce(
  authorityPath,
  '// These authority guides expose useful organizer-backed recurrence rules for trip\n// planning, but the displayed future occurrence has not been published as a\n// dedicated year-specific schedule. Keep the evergreen guide indexable while\n// withholding scheduled Event rich-result markup until first-party confirmation.',
  '// Keep useful event guides indexable while withholding scheduled Event rich-result\n// markup when a future date is recurrence-derived or the last verified occurrence\n// has already ended. A newly verified occurrence restores scheduled Event markup.'
);
replaceOnce(
  authorityPath,
  '  description: string;\n  jsonLd: string;\n}>(page: T): T {\n  if (!isRecurrenceDerivedMajorEventSlug(page.slug)) return page;',
  '  description: string;\n  jsonLd: string;\n  occurrenceHasEnded: boolean;\n}>(page: T): T {\n  if (!isRecurrenceDerivedMajorEventSlug(page.slug) && !page.occurrenceHasEnded) return page;'
);

const verifyPath = 'scripts/ci/verify-event-structured-data-production.mjs';
const verifyText = fs.readFileSync(verifyPath, 'utf8');
const verifyStart = verifyText.indexOf('async function verifyFreeOfferLeaf() {');
const verifyEnd = verifyText.indexOf('\nasync function verifyPaidOfferAndPerformersLeaf()', verifyStart);
if (verifyStart < 0 || verifyEnd < 0) throw new Error('Could not isolate Bandera production verifier');
const replacement = `async function verifyFreeOfferLeaf() {
  const path = '/event/bandera-round-up-cattle-drive';
  const html = await fetchProduction(path, 'bandera-round-up-cattle-drive');
  assert(canonicalHref(html) === \`${'${origin}'}${'${path}'}\`, \`Bandera Round-Up canonical must be ${'${origin}'}${'${path}'}\`);
  assert(html.includes('Organizer:'), 'Bandera Round-Up visible page must expose the verified organizer');
  assert(!html.includes('Verified admission options'), 'Expired Bandera Round-Up occurrence must not keep advertising its prior occurrence admission');
  assert(!html.includes('Announced performers'), 'Expired Bandera Round-Up occurrence must not keep advertising a prior occurrence lineup');

  const blocks = extractJsonLd(html);
  assert(blocks.length > 0, 'Expired Bandera Round-Up guide must expose JSON-LD');
  const nodes = blocks.flatMap((block) => collectTypedNodes(block));
  assert(nodes.some((node) => hasType(node, 'WebPage')), 'Expired Bandera Round-Up guide must expose WebPage schema');
  assert(nodes.some((node) => hasType(node, 'Thing')), 'Expired Bandera Round-Up guide must describe the event as a Thing');
  assert(!nodes.some((node) => hasType(node, 'Event')), 'Expired Bandera Round-Up occurrence must not expose scheduled Event markup');
  assert(nodes.every((node) => !Object.hasOwn(node, 'startDate') && !Object.hasOwn(node, 'endDate')), 'Expired Bandera Round-Up JSON-LD must not publish stale occurrence dates');
  console.log('[bandera-round-up-cattle-drive] expired-occurrence evergreen schema policy verified');
}
`;
fs.writeFileSync(verifyPath, verifyText.slice(0, verifyStart) + replacement + verifyText.slice(verifyEnd));

for (const path of [pagePath, authorityPath, verifyPath]) {
  const text = fs.readFileSync(path, 'utf8');
  if (!text.trim()) throw new Error(`${path} became empty`);
}
