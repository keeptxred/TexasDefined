#!/usr/bin/env node

const SUPABASE_URL = String(process.env.KEEP_TX_RED_SUPABASE_URL || '').replace(/\/$/, '');
const SUPABASE_KEY = process.env.KEEP_TX_RED_SUPABASE_SERVICE_ROLE_KEY || '';
const CF_ACCOUNT = process.env.CLOUDFLARE_ACCOUNT_ID || '';
const CF_TOKEN = process.env.CLOUDFLARE_API_TOKEN || '';
const OPENAI_KEY = process.env.OPENAI_API_KEY || '';
const IMAGE_MODEL = '@cf/black-forest-labs/flux-1-schnell';
const OPENAI_IMAGE_MODEL = 'gpt-image-2';
const PLACEHOLDER = 'https://texasdefined.com/images/texasdefined-placeholder.svg';
const limitArg = process.argv.find((arg) => arg.startsWith('--limit='));
const limit = Math.max(1, Math.min(Number(limitArg?.split('=')[1] || 5), 20));

function requireEnv(name, value) {
  if (!value) throw new Error(`${name} is required.`);
}

function serviceHeaders(extra = {}) {
  const headers = { apikey: SUPABASE_KEY, Accept: 'application/json', ...extra };
  if (!SUPABASE_KEY.startsWith('sb_secret_')) headers.Authorization = `Bearer ${SUPABASE_KEY}`;
  return headers;
}

async function supabase(path, init = {}) {
  const response = await fetch(`${SUPABASE_URL}${path}`, { ...init, headers: serviceHeaders(init.headers) });
  if (!response.ok) throw new Error(`Supabase ${path} failed: ${response.status} ${await response.text()}`);
  return response;
}

async function sleep(ms) {
  await new Promise((resolve) => setTimeout(resolve, ms));
}

async function workersAi(input) {
  let lastError = null;
  for (let attempt = 1; attempt <= 3; attempt += 1) {
    try {
      const response = await fetch(`https://api.cloudflare.com/client/v4/accounts/${CF_ACCOUNT}/ai/run/${IMAGE_MODEL}`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${CF_TOKEN}`, 'Content-Type': 'application/json' },
        body: JSON.stringify(input),
      });
      if (response.ok) return response;
      const detail = await response.text();
      lastError = new Error(`Workers AI ${response.status}: ${detail}`);
      if (response.status >= 400 && response.status < 500 && response.status !== 408 && response.status !== 429) throw lastError;
    } catch (error) {
      lastError = error instanceof Error ? error : new Error(String(error));
    }
    if (attempt < 3) await sleep(attempt * 1500);
  }
  throw lastError || new Error('Workers AI failed after retries.');
}

function articleBodyText(article) {
  if (!Array.isArray(article.body_json)) return '';
  const parts = [];
  for (const block of article.body_json) {
    if (!block || typeof block !== 'object') continue;
    if (typeof block.text === 'string') parts.push(block.text);
    if (Array.isArray(block.items)) {
      for (const item of block.items) if (typeof item === 'string') parts.push(item);
    }
    if (typeof block.caption === 'string') parts.push(block.caption);
  }
  return parts.join(' ').replace(/\s+/g, ' ').trim().slice(0, 1400);
}

function promptFor(article) {
  const context = [article.title, article.dek, article.category, article.region, articleBodyText(article)].filter(Boolean).join('. ');
  return [
    `Create a photorealistic documentary-style Texas editorial image representing this article: ${context}`,
    'Use a believable real-world Texas setting and natural camera lighting.',
    'Make the specific subject of this article visually obvious rather than using a generic Texas landscape or reusable fallback motif.',
    'Treat the image as representative editorial context, not as proof of a specific historical moment.',
    'Do not depict a recognizable real person or attempt a likeness of any named person.',
    'Do not reproduce brand logos, trademarks, product packaging, readable signs, captions, maps with labels, or watermarks.',
    'If the topic is historical, use an era-appropriate environment or objects without inventing a specific event.',
    'Wide 16:9 composition, no text overlay, no poster or illustration style.',
  ].join(' ').slice(0, 2048);
}

function openAiFallbackPrompt(article, primaryFailure) {
  const body = articleBodyText(article);
  return [
    'Create a highly relevant editorial hero image for this TexasDefined article.',
    `Headline: ${article.title}`,
    article.dek ? `Summary: ${article.dek}` : '',
    article.category ? `Category: ${article.category}` : '',
    article.region ? `Texas region/location: ${article.region}` : '',
    body ? `Article context: ${body}` : '',
    primaryFailure ? `Primary image pipeline failure: ${String(primaryFailure).slice(0, 500)}` : '',
    'The image must unmistakably fit this specific article. Do not use an unrelated generic Texas landscape, generic skyline, repeated stock-photo motif, newspaper stack, or generic fallback scene.',
    'Use a believable real-world Texas environment and natural photographic lighting.',
    'For a real event or named person, do not fabricate a documentary-looking depiction of something that did not happen and do not attempt a recognizable likeness; use representative editorial context instead.',
    'No logos, watermarks, readable text, captions, collages, infographics, posters, or maps with labels.',
    'Horizontal editorial composition suitable for an article hero and Facebook sharing.',
  ].filter(Boolean).join('\n').slice(0, 4000);
}

async function decodeWorkersImage(response) {
  const type = response.headers.get('content-type') || '';
  if (type.startsWith('image/') || type.includes('application/octet-stream')) return new Uint8Array(await response.arrayBuffer());
  const envelope = await response.json();
  const encoded = envelope?.result?.image || envelope?.image || (typeof envelope?.result === 'string' ? envelope.result : null);
  if (typeof encoded !== 'string') throw new Error('Workers AI image response did not contain image data.');
  return Uint8Array.from(Buffer.from(encoded, 'base64'));
}

async function openAiImage(article, primaryFailure) {
  const response = await fetch('https://api.openai.com/v1/images/generations', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${OPENAI_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: OPENAI_IMAGE_MODEL,
      prompt: openAiFallbackPrompt(article, primaryFailure),
      size: '1536x1024',
    }),
  });
  const raw = await response.text();
  let payload = {};
  try {
    payload = raw ? JSON.parse(raw) : {};
  } catch {
    throw new Error(`OpenAI image fallback returned invalid JSON (HTTP ${response.status}).`);
  }
  if (!response.ok) throw new Error(`OpenAI image fallback failed (${response.status}): ${payload?.error?.message || raw.slice(0, 500)}`);
  const encoded = payload?.data?.[0]?.b64_json;
  if (typeof encoded !== 'string' || !encoded) throw new Error('OpenAI image fallback returned no image data.');
  return Uint8Array.from(Buffer.from(encoded, 'base64'));
}

function imageFormat(bytes) {
  if (bytes.length >= 8 && bytes[0] === 0x89 && bytes[1] === 0x50 && bytes[2] === 0x4e && bytes[3] === 0x47) {
    return { contentType: 'image/png', extension: 'png' };
  }
  if (bytes.length >= 3 && bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff) {
    return { contentType: 'image/jpeg', extension: 'jpg' };
  }
  if (bytes.length >= 12 && Buffer.from(bytes.slice(0, 4)).toString('ascii') === 'RIFF' && Buffer.from(bytes.slice(8, 12)).toString('ascii') === 'WEBP') {
    return { contentType: 'image/webp', extension: 'webp' };
  }
  throw new Error('Generated image format is not PNG, JPEG, or WebP.');
}

async function generateBytes(article) {
  let primaryFailure = null;
  try {
    const response = await workersAi({ prompt: promptFor(article), steps: 8 });
    const bytes = await decodeWorkersImage(response);
    if (bytes.length < 10_000) throw new Error(`Generated image is unexpectedly small (${bytes.length} bytes).`);
    return { bytes, provider: 'Cloudflare Workers AI', model: IMAGE_MODEL };
  } catch (error) {
    primaryFailure = error instanceof Error ? error.message : String(error);
  }

  const bytes = await openAiImage(article, primaryFailure);
  if (bytes.length < 10_000) throw new Error(`OpenAI fallback image is unexpectedly small (${bytes.length} bytes).`);
  return { bytes, provider: 'OpenAI', model: OPENAI_IMAGE_MODEL };
}

async function loadCandidates() {
  const params = new URLSearchParams({
    select: 'id,slug,title,dek,category,region,hero_url,hero_alt,status,body_json',
    hero_url: `eq.${PLACEHOLDER}`,
    status: 'eq.published',
    order: 'published_at.asc',
    limit: String(limit),
  });
  return supabase(`/rest/v1/texasdefined_articles?${params}`).then((response) => response.json());
}

async function storeImage(article, generated) {
  const format = imageFormat(generated.bytes);
  const path = `${article.slug}.${format.extension}`;
  await supabase(`/storage/v1/object/texasdefined-article-images/${encodeURIComponent(path)}`, {
    method: 'POST',
    headers: { 'Content-Type': format.contentType, 'x-upsert': 'true' },
    body: generated.bytes,
  });
  return `${SUPABASE_URL}/storage/v1/object/public/texasdefined-article-images/${encodeURIComponent(path)}`;
}

async function updateArticle(article, heroUrl, generated) {
  await supabase(`/rest/v1/texasdefined_articles?id=eq.${article.id}&hero_url=eq.${encodeURIComponent(PLACEHOLDER)}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json', Prefer: 'return=minimal' },
    body: JSON.stringify({
      hero_url: heroUrl,
      hero_alt: article.hero_alt || `Editorial image for Texas Defined: ${article.title}`,
      hero_credit: `Generated editorial image · ${generated.provider}`,
      generator_model: generated.model,
      updated_at: new Date().toISOString(),
    }),
  });
}

requireEnv('KEEP_TX_RED_SUPABASE_URL', SUPABASE_URL);
requireEnv('KEEP_TX_RED_SUPABASE_SERVICE_ROLE_KEY', SUPABASE_KEY);
requireEnv('CLOUDFLARE_ACCOUNT_ID', CF_ACCOUNT);
requireEnv('CLOUDFLARE_API_TOKEN', CF_TOKEN);
requireEnv('OPENAI_API_KEY', OPENAI_KEY);

const candidates = await loadCandidates();
console.log(JSON.stringify({ candidates: candidates.length, slugs: candidates.map((a) => a.slug) }));
let completed = 0;
for (const article of candidates) {
  try {
    const generated = await generateBytes(article);
    const heroUrl = await storeImage(article, generated);
    await updateArticle(article, heroUrl, generated);
    completed += 1;
    console.log(JSON.stringify({ ok: true, slug: article.slug, bytes: generated.bytes.length, heroUrl, provider: generated.provider, model: generated.model, genericFallback: false }));
  } catch (error) {
    console.error(JSON.stringify({ ok: false, slug: article.slug, error: error instanceof Error ? error.message : String(error), genericFallback: false }));
  }
}
console.log(JSON.stringify({ completed, attempted: candidates.length, genericFallback: false }));
if (candidates.length > 0 && completed === 0) process.exitCode = 1;
