import test from 'node:test';
import assert from 'node:assert/strict';
import { verifyCjGitHubOidc, CJ_GITHUB_OIDC_AUDIENCE } from './github-oidc-jwt.server.ts';

test('only an RSA-signed, unexpired, audience-bound, exact protected-main workflow OIDC token may sync', async () => {
  const keys = await crypto.subtle.generateKey(
    { name: 'RSASSA-PKCS1-v1_5', modulusLength: 2048, publicExponent: new Uint8Array([1, 0, 1]), hash: 'SHA-256' },
    true, ['sign', 'verify'],
  );
  const publicJwk = await crypto.subtle.exportKey('jwk', keys.publicKey);
  const mockFetch = async (url: string) => {
    assert.equal(url, 'https://token.actions.githubusercontent.com/.well-known/jwks');
    return new Response(JSON.stringify({ keys: [{ ...publicJwk, kid: 'test-github-oidc', alg: 'RS256' }] }), { status: 200 });
  };
  const base64url = (value: string | ArrayBuffer) =>
    Buffer.from(typeof value === 'string' ? value : new Uint8Array(value)).toString('base64url');
  const now = Date.parse('2026-11-11T16:00:00Z');
  const nowS = Math.floor(now / 1000);
  const claims = {
    iss: 'https://token.actions.githubusercontent.com',
    aud: CJ_GITHUB_OIDC_AUDIENCE,
    repository: 'keeptxred/TexasDefined',
    ref: 'refs/heads/main',
    workflow_ref: 'keeptxred/TexasDefined/.github/workflows/sync-partner-referral-analytics.yml@refs/heads/main',
    sub: 'repo:keeptxred/TexasDefined:ref:refs/heads/main',
    event_name: 'schedule',
    iat: nowS - 10, exp: nowS + 300,
  };
  const sign = async (customClaims: Record<string, unknown> = claims) => {
    const raw = base64url(JSON.stringify({ alg: 'RS256', kid: 'test-github-oidc', typ: 'JWT' })) + '.' +
      base64url(JSON.stringify(customClaims));
    const signature = await crypto.subtle.sign('RSASSA-PKCS1-v1_5', keys.privateKey, new TextEncoder().encode(raw));
    return raw + '.' + base64url(signature);
  };
  const valid = await sign();
  assert.equal(await verifyCjGitHubOidc(valid, mockFetch as typeof fetch, now), true);
  assert.equal(await verifyCjGitHubOidc(await sign({ ...claims, aud: 'another-service' }), mockFetch as typeof fetch, now), false);
  assert.equal(await verifyCjGitHubOidc(await sign({ ...claims, ref: 'refs/heads/attacker' }), mockFetch as typeof fetch, now), false);
  assert.equal(await verifyCjGitHubOidc(await sign({ ...claims, workflow_ref: 'rogue.yml' }), mockFetch as typeof fetch, now), false);
  assert.equal(await verifyCjGitHubOidc(await sign({ ...claims, event_name: 'pull_request' }), mockFetch as typeof fetch, now), false);
  assert.equal(await verifyCjGitHubOidc(await sign({ ...claims, exp: nowS - 1 }), mockFetch as typeof fetch, now), false);
  // Modify a SIGNIFICANT encoded byte, never the trailing base64url padding
  // bits. For a 2048-bit RSA signature, the final character has unused bits;
  // replacing the last two characters with a constant can accidentally yield
  // an equivalent binary signature or the exact same string (flaky CI).
  const parts = valid.split('.');
  const alteredSignature = (parts[2][0] === 'A' ? 'B' : 'A') + parts[2].slice(1);
  assert.equal(await verifyCjGitHubOidc(parts[0] + '.' + parts[1] + '.' + alteredSignature, mockFetch as typeof fetch, now), false);
  assert.equal(await verifyCjGitHubOidc('not-a-jwt', mockFetch as typeof fetch, now), false);
});
