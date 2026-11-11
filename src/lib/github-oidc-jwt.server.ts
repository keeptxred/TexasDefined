/**
 * GitHub Actions OIDC verifier for a single workflow on protected main.\n * That workflow is gated by its existing publication-environment authorization job.
 * No shared password or CJ credential is ever sent by GitHub.
 */
const ISSUER = 'https://token.actions.githubusercontent.com';
const AUDIENCE = 'texasdefined-cj-reconciliation-v1';
const WORKFLOW_REF =
  'keeptxred/TexasDefined/.github/workflows/sync-partner-referral-analytics.yml@refs/heads/main';
const ENVIRONMENT_SUB = 'repo:keeptxred/TexasDefined:ref:refs/heads/main';
const JWKS_URL = 'https://token.actions.githubusercontent.com/.well-known/jwks';

function decodeJwtPart(part: string): unknown {
  if (!/^[A-Za-z0-9_-]+$/.test(part) || part.length > 16_000) throw new Error('invalid-jwt');
  const base64 = part.replace(/-/g, '+').replace(/_/g, '/').padEnd(Math.ceil(part.length / 4) * 4, '=');
  return JSON.parse(atob(base64));
}

function jwtSignatureBytes(part: string): Uint8Array<ArrayBuffer> {
  if (!/^[A-Za-z0-9_-]+$/.test(part) || part.length > 4_000) throw new Error('invalid-signature');
  const base64 = part.replace(/-/g, '+').replace(/_/g, '/').padEnd(Math.ceil(part.length / 4) * 4, '=');
  const raw = atob(base64);
  const bytes = new Uint8Array(new ArrayBuffer(raw.length));
  for (let index = 0; index < raw.length; index++) bytes[index] = raw.charCodeAt(index);
  return bytes;
}

export async function verifyCjGitHubOidc(
  token: string,
  fetcher: typeof fetch = fetch,
  nowMs: number = Date.now(),
): Promise<boolean> {
  if (typeof token !== 'string' || token.length > 12_000) return false;
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return false;
    const header = decodeJwtPart(parts[0]) as Record<string, unknown>;
    const claim = decodeJwtPart(parts[1]) as Record<string, unknown>;
    if (!header || !claim || header.alg !== 'RS256' || typeof header.kid !== 'string') return false;
    if (header.kid.length > 160 || !/^[a-zA-Z0-9._-]+$/.test(header.kid)) return false;
    const now = Math.floor(nowMs / 1000);
    if (claim.iss !== ISSUER || claim.aud !== AUDIENCE) return false;
    if (claim.repository !== 'keeptxred/TexasDefined' ||
        claim.ref !== 'refs/heads/main' ||
        claim.workflow_ref !== WORKFLOW_REF ||
        claim.sub !== ENVIRONMENT_SUB) return false;
    if (!['schedule', 'workflow_dispatch'].includes(String(claim.event_name))) return false;
    if (!Number.isInteger(claim.exp) || !Number.isInteger(claim.iat)) return false;
    const issued = Number(claim.iat);
    const expiry = Number(claim.exp);
    if (issued > now + 60 || expiry < now || expiry <= issued || expiry - issued > 900) return false;
    if (claim.nbf !== undefined && (!Number.isInteger(claim.nbf) || Number(claim.nbf) > now + 60)) return false;

    const response = await fetcher(JWKS_URL, {
      method: 'GET', redirect: 'error', cache: 'no-store', signal: AbortSignal.timeout(7_000),
    });
    if (!response.ok) return false;
    const document = await response.json() as { keys?: Array<JsonWebKey & { kid?: string; alg?: string }> };
    const key = document.keys?.find(value =>
      value.kid === header.kid && value.kty === 'RSA' && value.alg !== 'HS256');
    if (!key) return false;
    const cryptoKey = await crypto.subtle.importKey(
      'jwk', key, { name: 'RSASSA-PKCS1-v1_5', hash: 'SHA-256' }, false, ['verify'],
    );
    return crypto.subtle.verify(
      'RSASSA-PKCS1-v1_5', cryptoKey, jwtSignatureBytes(parts[2]),
      new TextEncoder().encode(parts[0] + '.' + parts[1]),
    );
  } catch {
    return false;
  }
}

export const CJ_GITHUB_OIDC_AUDIENCE = AUDIENCE;
