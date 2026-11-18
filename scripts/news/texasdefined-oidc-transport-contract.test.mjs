import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';

const script=readFileSync('scripts/news/texasdefined-auto-publisher.mjs','utf8');
const manual=readFileSync('.github/workflows/texasdefined-auto-publication.yml','utf8');
const scheduled=readFileSync('.github/workflows/texasdefined-scheduled-authority-news.yml','utf8');
const issue=readFileSync('.github/workflows/flyover-scheduled-publish-bridge.yml','utf8');
const sourceOnly=readFileSync('.github/workflows/texasdefined-source-evidence-hydration.yml','utf8');

test('all owner-activated publishing paths mint short-lived signed GitHub Actions OIDC identities',()=>{
  for(const workflow of [manual,scheduled,issue]){
    assert.match(workflow,/id-token:\s*write/);
    assert.doesNotMatch(workflow, /^\s*CLOUDFLARE_API_TOKEN:/m);
    assert.doesNotMatch(workflow, /^\s*CLOUDFLARE_ACCOUNT_ID:/m);
  }
  assert.match(script,/githubEditorialOidcToken/);
  assert.match(script,/ACTIONS_ID_TOKEN_REQUEST_URL/);
  assert.match(script,/ACTIONS_ID_TOKEN_REQUEST_TOKEN/);
  assert.match(script,/texasdefined-editorial-ai/);
  assert.match(script,/Signed Workers AI editorial bridge unavailable/);
  assert.match(script,/x-texasdefined-ai-transport/);
  assert.match(script,/@cf\/meta\/llama-3\.3-70b-instruct-fp8-fast/);
  assert.doesNotMatch(script,/@cf\/meta\/llama-3\.1-8b-instruct-fast/);
  assert.doesNotMatch(script,/api\.cloudflare\.com\/client\/v4\/accounts/);
  assert.match(script,/TEXASDEFINED_AUTO_PUBLISH_ENABLED/);
  assert.match(script,/TEXASDEFINED_PUBLISH_CONFIRMATION/);
});

test('the zero-AI hydration lane does not gain OIDC rights or paid-model credentials',()=>{
  assert.doesNotMatch(sourceOnly,/id-token:\s*write/);
  assert.doesNotMatch(sourceOnly,/CLOUDFLARE_API_TOKEN|--publish/);
});

test('the latest Flux 2 image hero is still stored only after strict byte signature and public readback',()=>{
  assert.match(script,/@cf\/black-forest-labs\/flux-2-klein-4b/);
  assert.match(script,/verifyTexasDefinedIllustrationBytes\(bytes,/);
  assert.match(script,/verifyTexasDefinedIllustrationBytes\(verifiedBytes,/);
  assert.match(script,/image generated and stored/);
  assert.match(script,/publish_texasdefined_queue_item_v2/);
});
