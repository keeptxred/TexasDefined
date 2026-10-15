import { spawnSync } from 'node:child_process';

export function governedDiscoverSlugs() {
  const result = spawnSync(process.execPath, ['scripts/assets/materialize-discover-overrides.mjs', '--list-slugs'], {
    encoding: 'utf8',
    timeout: 30_000,
  });
  if (result.status !== 0) throw new Error('Cannot read governed Discover image registry: ' + (result.stderr || result.error?.message || result.status));
  const names = result.stdout.split(/\r?\n/).map((name) => name.trim()).filter(Boolean);
  if (names.length < 42 || new Set(names).size !== names.length || names.some((slug) => !/^[a-z0-9-]+$/.test(slug))) {
    throw new Error('Governed Discover image slug registry is incomplete, duplicated or malformed');
  }
  return names;
}

function webpBytes(buffer) {
  return buffer.length >= 12 && buffer.toString('ascii', 0, 4) === 'RIFF'
    && buffer.toString('ascii', 8, 12) === 'WEBP';
}

/**
 * Verify the actual image response from the deployed Cloudflare assets
 * infrastructure. A local dist/client build check cannot prove this.
 * Pass a controlled fetcher/slugs for deterministic tests.
 */
export async function verifyGovernedDiscoverDelivery({
  origin,
  slugs = governedDiscoverSlugs(),
  fetcher = fetch,
  attempts = 4,
  concurrency = 6,
  timeoutMs = 15_000,
} = {}) {
  if (!/^https:\/\//.test(String(origin ?? ''))) throw new Error('A production HTTPS origin is required');
  const root = new URL(origin);
  const failures = [];
  let passed = 0;
  let cursor = 0;
  async function check(slug) {
    const url = new URL('/images/discover/' + slug + '.webp', root);
    let reason = 'not attempted';
    for (let attempt = 1; attempt <= attempts; attempt++) {
      try {
        const response = await fetcher(url.toString(), {
          headers: {
            'user-agent': 'TexasDefined-Discover-Delivery-Verification/1.0',
            accept: 'image/webp',
            'cache-control': 'no-cache',
          },
          cache: 'no-store',
          signal: AbortSignal.timeout(timeoutMs),
        });
        const type = (response.headers.get('content-type') ?? '').toLowerCase();
        if (!response.ok) reason = 'HTTP ' + response.status;
        else if (!type.startsWith('image/webp')) reason = 'unexpected content-type ' + type;
        else {
          const bytes = Buffer.from(await response.arrayBuffer());
          if (webpBytes(bytes)) {
            passed++;
            return;
          }
          reason = 'invalid or empty WebP bytes';
        }
      } catch (error) {
        reason = error instanceof Error ? error.message : String(error);
      }
      if (attempt < attempts) await new Promise((resolve) => setTimeout(resolve, 2000));
    }
    failures.push({ slug, url: url.toString(), reason });
  }
  async function worker() {
    while (cursor < slugs.length) {
      const slug = slugs[cursor++];
      await check(slug);
    }
  }
  await Promise.all(Array.from({ length: Math.min(Math.max(1, concurrency), slugs.length) }, worker));
  return { origin: root.origin, expected: slugs.length, passed, failures };
}
