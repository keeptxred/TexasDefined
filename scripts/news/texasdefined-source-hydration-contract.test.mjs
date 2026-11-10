import { readFileSync } from 'node:fs';
import assert from 'node:assert/strict';
import { test } from 'node:test';

const workflow = readFileSync('.github/workflows/texasdefined-source-evidence-hydration.yml','utf8');
const publisher = readFileSync('scripts/news/texasdefined-auto-publisher.mjs','utf8');
const activation = readFileSync('.github/workflows/texasdefined-auto-publication.yml','utf8');

test('source-only scheduled workflow cannot accidentally publish or generate AI', () => {
  assert.match(workflow, /schedule:\s*\n\s*- cron:/);
  assert.match(workflow, /--hydrate-top=8/);
  assert.doesNotMatch(workflow, /--publish|PUBLISH_TEXASDEFINED|TEXASDEFINED_AUTO_PUBLISH_ENABLED|CLOUDFLARE_API_TOKEN|CLOUDFLARE_ACCOUNT_ID/);
  assert.doesNotMatch(workflow, /--feed-id|--limit=3|create issue|gh api|p_publish_/);
  assert.match(workflow, /aiCalls!==0/);
  assert.match(workflow, /summary\.requested>8/);
  assert.match(workflow, /summary\.updated>summary\.requested/);
  assert.match(workflow, /worker[s]?\.dev\/api\/public\/hooks\/hydrate-newsroom-source-pages/);
});

test('hydratable source selection still requires owner, source, freshness and current editorial approval', () => {
  assert.match(publisher, /if \(hydrateTopArg && \(!Number\.isSafeInteger\(hydrateTop\)/);
  assert.match(publisher, /if \(publishRequested && hydrateTopArg\) throw/);
  assert.match(publisher, /isAutomationSafeQueueItem\(item\)/);
  assert.match(publisher, /signals\.auto_publish_eligible !== true/);
  assert.match(publisher, /signals\.editorial_lane/);
  assert.match(publisher, /isCurrentTexasDefinedAutoNewsSource\(item\?\.pub_date\)/);
  assert.match(publisher, /if \(payload\?\.ok !== true \|\| payload\?\.aiCalls !== 0/);
  assert.match(publisher, /--hydrate-top/);
  assert.doesNotMatch(activation, /^\s*-\s*cron:/m);
});
