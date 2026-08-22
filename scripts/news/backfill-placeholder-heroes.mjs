#!/usr/bin/env node

const SUPABASE_URL = String(process.env.KEEP_TX_RED_SUPABASE_URL || '').replace(/\/$/, '');
const SUPABASE_KEY = process.env.KEEP_TX_RED_SUPABASE_SERVICE_ROLE_KEY || '';
const CF_ACCOUNT = process.env.CLOUDFLARE_ACCOUNT_ID || '';
const CF_TOKEN = process.env.CLOUDFLARE_API_TOKEN || '';
const IMAGE_MODEL = '@cf/black-forest-labs/flux-1-schnell';
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
  const response = await fetch(`${SUPABASE_URL}${path}`, {
    ...init,
    headers: serviceHeaders(init.headers),
  });
  if (!response.ok) throw new Error(`Supabase ${path} failed: ${response.status} ${await response.text()}`);
  return response;
}

async function workersAi(input) {
  const response = await fetch(`https://api.cloudflare.com/client/v4/accounts/${CF_ACCOUNT}/ai/run/${IMAGE_MODEL}`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${CF_TOKEN}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(input),
  });
  if (!response.ok) throw new Error(`Workers AI ${response.status}: ${await response.text()}`);
  return response;
}

function promptFor(article) {
  const context = [article.title, article.dek, article.category, article.region].filter(Boolean).join('. ');
  return [
    `Create a photorealistic documentary-style Texas editorial image representing this article: ${context}`,
    'Use a believable real-world Texas setting and natural camera lighting.',
    'Treat the image as representative editorial context, not as proof of a specific historical moment.',
    'Do not depict a recognizable real person or attempt a likeness of any named person.',
    'Do not reproduce brand logos, trademarks, product packaging, readable signs, captions, maps with labels, or watermarks.',
    'If the topic is historical, use an era-appropriate environment or objects without inventing a specific event.',
    'Wide 16:9 composition, no text overlay, no poster or illustration style.',
  ].join(' ').slice(0, 2048);
}

async function decodeImage(response) {
  const type = response.headers.get('content-type') || '';
  if (type.startsWith('image/') || type.includes('application/octet-stream')) {
    return new Uint8Array(await response.arrayBuffer());
  }
  const envelope = await response.json();
  const encoded = envelope?.result?.image || envelope?.image || (typeof envelope?.result === 'string' ? envelope.result : null);
  if (typeof encoded !== 'string') throw new Error('Workers AI image response did not contain image data.');
  return Uint8Array.from(Buffer.from(encoded, 'base64'));
}

async function loadCandidates() {
  const params = new URLSearchParams({
    select: 'id,slug,title,dek,category,region,hero_url,hero_alt,status',
    hero_url: `eq.${PLACEHOLDER}`,
    status: 'eq.published',
    order: 'published_at.asc',
    limit: String(limit),
  });
  return supabase(`/rest/v1/texasdefined_articles?${params}`).then((response) => response.json());
}

async function storeImage(article, bytes) {
  if (bytes.length < 10_000) throw new Error(`Generated image is unexpectedly small (${bytes.length} bytes).`);
  const path = `${article.slug}.jpg`;
  await supabase(`/storage/v1/object/texasdefined-article-images/${encodeURIComponent(path)}`, {
    method: 'POST',
    headers: { 'Content-Type': 'image/jpeg', 'x-upsert': 'true' },
    body: bytes,
  });
  return `${SUPABASE_URL}/storage/v1/object/public/texasdefined-article-images/${encodeURIComponent(path)}`;
}

async function updateArticle(article, heroUrl) {
  const body = {
    hero_url: heroUrl,
    hero_alt: article.hero_alt || `Editorial image for Texas Defined: ${article.title}`,
    hero_credit: 'Generated editorial image · Cloudflare Workers AI',
    generator_model: IMAGE_MODEL,
    updated_at: new Date().toISOString(),
  };
  await supabase(`/rest/v1/texasdefined_articles?id=eq.${article.id}&hero_url=eq.${encodeURIComponent(PLACEHOLDER)}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json', Prefer: 'return=minimal' },
    body: JSON.stringify(body),
  });
}

requireEnv('KEEP_TX_RED_SUPABASE_URL', SUPABASE_URL);
requireEnv('KEEP_TX_RED_SUPABASE_SERVICE_ROLE_KEY', SUPABASE_KEY);
requireEnv('CLOUDFLARE_ACCOUNT_ID', CF_ACCOUNT);
requireEnv('CLOUDFLARE_API_TOKEN', CF_TOKEN);

const candidates = await loadCandidates();
console.log(JSON.stringify({ candidates: candidates.length, slugs: candidates.map((a) => a.slug) }));
let completed = 0;
for (const article of candidates) {
  try {
    const response = await workersAi({ prompt: promptFor(article), steps: 8 });
    const bytes = await decodeImage(response);
    const heroUrl = await storeImage(article, bytes);
    await updateArticle(article, heroUrl);
    completed += 1;
    console.log(JSON.stringify({ ok: true, slug: article.slug, bytes: bytes.length, heroUrl }));
  } catch (error) {
    console.error(JSON.stringify({ ok: false, slug: article.slug, error: error instanceof Error ? error.message : String(error) }));
  }
}
console.log(JSON.stringify({ completed, attempted: candidates.length }));
if (candidates.length > 0 && completed === 0) process.exitCode = 1;
