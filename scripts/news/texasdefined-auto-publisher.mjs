#!/usr/bin/env node

const SUPABASE_URL = String(process.env.KEEP_TX_RED_SUPABASE_URL || '').replace(/\/$/, '');
const SUPABASE_KEY = process.env.KEEP_TX_RED_SUPABASE_SERVICE_ROLE_KEY || '';
const CF_ACCOUNT = process.env.CLOUDFLARE_ACCOUNT_ID || '';
const CF_TOKEN = process.env.CLOUDFLARE_API_TOKEN || '';
const SITE_URL = String(process.env.TEXASDEFINED_SITE_URL || 'https://texasdefined.com').replace(/\/$/, '');
const TEXT_MODEL = '@cf/meta/llama-3.1-8b-instruct-fast';
const IMAGE_MODEL = '@cf/black-forest-labs/flux-1-schnell';
const publishRequested = process.argv.includes('--publish');
const limitArg = process.argv.find((arg) => arg.startsWith('--limit='));
const limit = Math.max(1, Math.min(Number(limitArg?.split('=')[1] || 1), 3));

function requireEnv(name, value) {
  if (!value) throw new Error(`${name} is required.`);
}

function serviceHeaders(extra = {}) {
  const headers = { apikey: SUPABASE_KEY, Accept: 'application/json', 'User-Agent': 'TexasDefined-Automation/1.0', ...extra };
  if (!SUPABASE_KEY.startsWith('sb_secret_')) headers.Authorization = `Bearer ${SUPABASE_KEY}`;
  return headers;
}

async function supabase(path, init = {}) {
  const response = await fetch(`${SUPABASE_URL}${path}`, {
    ...init,
    headers: serviceHeaders(init.headers),
  });
  if (!response.ok) throw new Error(`Supabase ${path} failed: ${response.status} ${await response.text()}`);
  return response;
}

async function workersAi(model, input) {
  const response = await fetch(`https://api.cloudflare.com/client/v4/accounts/${CF_ACCOUNT}/ai/run/${model}`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${CF_TOKEN}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(input),
  });
  if (!response.ok) throw new Error(`Workers AI ${model} failed: ${response.status} ${await response.text()}`);
  return response;
}

function parseJson(text) {
  const fenced = text.match(/```(?:json)?\s*([\s\S]*?)```/i)?.[1] || text;
  const start = fenced.indexOf('{');
  const end = fenced.lastIndexOf('}');
  if (start < 0 || end <= start) throw new Error('Workers AI did not return a JSON object.');
  return JSON.parse(fenced.slice(start, end + 1));
}

function slugify(value) {
  return String(value).toLowerCase().normalize('NFKD').replace(/[^a-z0-9\s-]/g, '').trim().replace(/[\s-]+/g, '-').slice(0, 145);
}

function words(value) {
  return String(value).trim().split(/\s+/).filter(Boolean).length;
}

function validateDraft(draft, allowedDestinationSlugs) {
  const errors = [];
  if (String(draft.title || '').trim().length < 20) errors.push('title is too short');
  if (String(draft.dek || '').trim().length < 80) errors.push('dek is too short');
  if (!Array.isArray(draft.body) || draft.body.length < 8) errors.push('body needs at least 8 blocks');
  const bodyText = (draft.body || []).flatMap((block) => block?.items || block?.text || []).join(' ');
  if (words(bodyText) < 750) errors.push(`body has only ${words(bodyText)} words`);
  if (!Array.isArray(draft.relatedDestinations) || draft.relatedDestinations.length < 2) errors.push('at least two destination links are required');
  if ((draft.relatedDestinations || []).some((slug) => !allowedDestinationSlugs.has(slug))) errors.push('relatedDestinations contains an unverified slug');
  const validTypes = new Set(['heading', 'paragraph', 'list']);
  if ((draft.body || []).some((block) => !block || !validTypes.has(block.type) || (block.type === 'list' ? !Array.isArray(block.items) : typeof block.text !== 'string'))) errors.push('body contains an invalid block');
  const validCategories = new Set(['lakes-rivers','major-springs','state-parks','national-parks','caverns','beaches-coast','historic-sites','road-trips','small-towns','food-bbq','outdoors','sports','events','texas-history','moving-to-texas','home-garden','real-estate','guides']);
  if (!validCategories.has(draft.category)) errors.push('category is invalid');
  if (!Number.isInteger(draft.qualityScore) || draft.qualityScore < 85 || draft.qualityScore > 100) errors.push('qualityScore must be 85-100');
  if (String(draft.heroAlt || '').trim().length < 20) errors.push('heroAlt is too short');
  if (errors.length) throw new Error(`Generated draft rejected: ${errors.join('; ')}`);
}

async function readyQueue() {
  const params = new URLSearchParams({
    select: 'id,title,source,link,description,pub_date,extracted_body,target_section,classification_confidence,texas_relevance_score,source_reputation_score',
    order: 'pub_date.asc',
    limit: String(limit),
  });
  return supabase(`/rest/v1/texasdefined_ready_queue?${params}`).then((response) => response.json());
}

async function destinations() {
  const params = new URLSearchParams({
    select: 'slug,name,summary,region',
    visibility: 'eq.public',
    status: 'in.(published,verified)',
    order: 'featured.desc,popularity_score.desc,name.asc',
    limit: '30',
  });
  return supabase(`/rest/v1/explore_entities?${params}`).then((response) => response.json());
}

async function generateDraft(item, destinationRows) {
  const destinationContext = destinationRows.map((row) => ({ slug: row.slug, name: row.name, summary: row.summary, region: row.region }));
  const prompt = `Create one original TexasDefined lifestyle/editorial article using only the verified source material below. Do not invent facts, quotations, dates, prices, access conditions or attribution. The site is not political breaking news. Return JSON only with: title, dek, category, region, tags (3-8), body (8-14 blocks using {type:"heading"|"paragraph"|"list", text or items}), relatedDestinations (2-5 exact slugs from the supplied catalog), relatedCollections (array), heroPrompt, heroAlt, qualityScore (85-100 only if every requirement is satisfied). Body must contain at least 750 useful words, identify the source, explain Texas relevance, and tell readers to verify changing conditions with the official source.\n\nSOURCE:\n${JSON.stringify({ title: item.title, source: item.source, url: item.link, description: item.description, extractedBody: item.extracted_body }, null, 2)}\n\nVERIFIED INTERNAL DESTINATIONS:\n${JSON.stringify(destinationContext)}`;
  const response = await workersAi(TEXT_MODEL, {
    messages: [
      { role: 'system', content: 'You are the Texas Defined Editorial Desk. Follow the supplied facts and JSON contract exactly.' },
      { role: 'user', content: prompt },
    ],
    temperature: 0.1,
    max_tokens: 5000,
  });
  const envelope = await response.json();
  const draft = parseJson(envelope?.result?.response || '');
  validateDraft(draft, new Set(destinationRows.map((row) => row.slug)));
  draft.slug = `${new Date(item.pub_date || Date.now()).toISOString().slice(0, 10)}-${slugify(draft.title)}`;
  return draft;
}

async function generateAndStoreImage(draft) {
  const response = await workersAi(IMAGE_MODEL, {
    prompt: `${draft.heroPrompt}. Photorealistic natural Texas editorial image, wide 16:9 composition, no text, no logo, no watermark, no recognizable private person.`,
    steps: 4,
  });
  const type = response.headers.get('content-type') || '';
  let bytes;
  if (type.includes('application/json')) {
    const envelope = await response.json();
    const encoded = envelope?.result?.image || envelope?.result;
    if (typeof encoded !== 'string') throw new Error('Workers AI image response did not contain image bytes.');
    bytes = Uint8Array.from(Buffer.from(encoded, 'base64'));
  } else {
    bytes = new Uint8Array(await response.arrayBuffer());
  }
  if (bytes.length < 10_000) throw new Error(`Generated hero is unexpectedly small (${bytes.length} bytes).`);
  const path = `${draft.slug}.png`;
  await supabase(`/storage/v1/object/texasdefined-article-images/${encodeURIComponent(path)}`, {
    method: 'POST',
    headers: { 'Content-Type': 'image/png', 'x-upsert': 'false' },
    body: bytes,
  });
  return `${SUPABASE_URL}/storage/v1/object/public/texasdefined-article-images/${encodeURIComponent(path)}`;
}

async function publish(item, draft, heroUrl) {
  const payload = {
    p_feed_id: item.id,
    p_slug: draft.slug,
    p_title: draft.title,
    p_dek: draft.dek,
    p_category: draft.category,
    p_region: draft.region || '',
    p_hero_url: heroUrl,
    p_hero_alt: draft.heroAlt,
    p_hero_credit: 'Generated editorial image · Cloudflare Workers AI',
    p_author_id: 'a-hollis',
    p_tags: draft.tags,
    p_body_json: draft.body,
    p_related_collections: draft.relatedCollections || [],
    p_related_destinations: draft.relatedDestinations,
    p_generator_model: `${TEXT_MODEL} + ${IMAGE_MODEL}`,
    p_quality_score: draft.qualityScore,
  };
  await supabase('/rest/v1/rpc/publish_texasdefined_queue_item_v2', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  const liveUrl = `${SITE_URL}/news/${draft.slug}`;
  for (let attempt = 1; attempt <= 8; attempt += 1) {
    const response = await fetch(liveUrl, { redirect: 'follow' });
    const html = await response.text();
    if (response.ok && html.includes(draft.title) && html.includes(heroUrl)) return liveUrl;
    if (attempt < 8) await new Promise((resolve) => setTimeout(resolve, 15_000));
  }
  throw new Error(`Published row did not become healthy at ${liveUrl}. Manual rollback is required.`);
}

requireEnv('KEEP_TX_RED_SUPABASE_URL', SUPABASE_URL);
requireEnv('KEEP_TX_RED_SUPABASE_SERVICE_ROLE_KEY', SUPABASE_KEY);
if (publishRequested) {
  if (process.env.TEXASDEFINED_AUTO_PUBLISH_ENABLED !== 'true') throw new Error('Publishing is disabled. Set TEXASDEFINED_AUTO_PUBLISH_ENABLED=true only when activation is approved.');
  if (process.env.TEXASDEFINED_PUBLISH_CONFIRMATION !== 'PUBLISH_TEXASDEFINED') throw new Error('Exact publication confirmation is missing.');
  requireEnv('CLOUDFLARE_ACCOUNT_ID', CF_ACCOUNT);
  requireEnv('CLOUDFLARE_API_TOKEN', CF_TOKEN);
}

const queue = await readyQueue();
console.log(JSON.stringify({ mode: publishRequested ? 'publish' : 'dry-run', eligible: queue.length, ids: queue.map((item) => item.id) }));
if (publishRequested && queue.length > 0) {
  const destinationRows = await destinations();
  if (destinationRows.length < 2) throw new Error('Fewer than two verified TexasDefined destinations are available; publication stopped.');
  for (const item of queue) {
    const draft = await generateDraft(item, destinationRows);
    const heroUrl = await generateAndStoreImage(draft);
    const liveUrl = await publish(item, draft, heroUrl);
    console.log(JSON.stringify({ published: true, feedId: item.id, slug: draft.slug, liveUrl }));
  }
}
