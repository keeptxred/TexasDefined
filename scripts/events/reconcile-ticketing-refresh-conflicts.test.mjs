import test from 'node:test';
import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { time, chooseByTimestamp, mergeTicketProbeLedger, validateConflicts, gitText, MAX_GIT_OUTPUT_BYTES }
  from './reconcile-ticketing-refresh-conflicts.mjs';

const iso = '2026-10-26T03:10:51.014Z';
const later = '2026-10-26T03:42:00.836Z';
const dateOnly = '2026-10-26';
const event = i => ({id: 'show-'+i, status:'VERIFIED', publicSaleStatus:'venue-published-on-sale',
  publicSaleEvidence:{sourceUrl:'https://venue.example.org/confirmed',checkedAt:dateOnly}});
const record = (id, checkedAt, status='ACCESS_RESTRICTED_INCONCLUSIVE') =>
  ({eventId:id,checkedAt,probeStatus:status,seatInventory:'NOT_VERIFIED',purchasePrice:'NOT_VERIFIED'});
const main = {updatedAt:dateOnly,events:Array.from({length:12},(_,i)=>event(i)),statewide:{
  ticketLinkProbes:{a:record('a',iso),b:record('b',iso)},ticketLinkProbeCursor:2,
  ticketLinkProbeLatestRun:{checkedAt:iso,count:2,httpReachabilityOnly:true,inventoryVerified:false}
}};
const bot = structuredClone(main);
bot.events[0].status='IN_PROGRESS';
bot.events[0].publicSaleEvidence.sourceUrl='https://different.example.net/unverified';
bot.statewide.ticketLinkProbes={a:record('a',later),c:record('c',later)};
bot.statewide.ticketLinkProbeCursor=3;
bot.statewide.ticketLinkProbeLatestRun={checkedAt:later,count:2,httpReachabilityOnly:true,inventoryVerified:false};

test('only governed generated files can be automatically reconciled',()=>{
  validateConflicts(['ops/editorial/event-ticketing-verification-ledger.json','src/data/generated/ticketmaster-events.json']);
  assert.throws(()=>validateConflicts([]),/Unsafe/);
  assert.throws(()=>validateConflicts(['.github/workflows/deploy-production.yml']),/Unsafe/);
  assert.throws(()=>validateConflicts(['ops/editorial/../secret']),/Unsafe/);
});
test('fresher official source wins, invalid or undated timestamps fail closed',()=>{
  assert.equal(chooseByTimestamp({fetchedAt:later},{fetchedAt:iso},'fetchedAt'),'ours');
  assert.equal(chooseByTimestamp({fetchedAt:iso},{fetchedAt:later},'fetchedAt'),'theirs');
  assert.equal(chooseByTimestamp({fetchedAt:iso},{fetchedAt:iso},'fetchedAt'),'theirs');
  assert.throws(()=>time(dateOnly),/ISO/);
  assert.throws(()=>chooseByTimestamp({fetchedAt:'nonsense'},{fetchedAt:later},'fetchedAt'),/ISO/);
});
test('overlapping HTTP probes deduplicate without erasing distinct newer observations or source-verified editorial fields',()=>{
  const result=mergeTicketProbeLedger(bot,main);
  assert.deepEqual(Object.keys(result.statewide.ticketLinkProbes).sort(),['a','b','c']);
  assert.equal(result.statewide.ticketLinkProbes.a.checkedAt,later);
  assert.equal(result.statewide.ticketLinkProbeLatestRun.checkedAt,later);
  assert.equal(result.statewide.ticketLinkProbeCursor,3);
  assert.deepEqual(result.events,main.events);
  assert.equal(result.events[0].status,'VERIFIED');
  assert.notEqual(result.statewide.ticketLinkProbes.a.probeStatus,'VERIFIED');
  assert.notEqual(result.statewide.ticketLinkProbes.c.seatInventory,'VERIFIED');
});
test('old generated checkpoint cannot roll back a newer main cursor',()=>{
  const result=mergeTicketProbeLedger(main,bot);
  assert.equal(result.statewide.ticketLinkProbeLatestRun.checkedAt,later);
  assert.equal(result.statewide.ticketLinkProbeCursor,3);
  assert.deepEqual(result.events,bot.events);
});
test('broken probe identities or missing curated source inventory fail closed',()=>{
  const malformed=structuredClone(bot);
  malformed.statewide.ticketLinkProbes.c.eventId='wrong-event';
  assert.throws(()=>mergeTicketProbeLedger(malformed,main),/Invalid event probe identity/);
  assert.throws(()=>mergeTicketProbeLedger({...bot,events:[]},main),/12-event/);
});


test('safe reconciliation reads a generated Git JSON snapshot larger than Node default stdout buffer', () => {
  // The original failure was spawnSync git ENOBUFS on a multi-MB generated
  // Ticketmaster events file; synthetic data tests the real execFileSync path.
  const dir = mkdtempSync(join(tmpdir(), 'texas-event-git-buffer-'));
  try {
    const content = JSON.stringify({
      fetchedAt: '2026-10-27T16:43:07.000Z',
      events: Array.from({ length: 30000 }, (_, i) => ({
        id: `ticketmaster-${i}`,
        name: 'Texas event with several details at a venue and verified source',
        date: '2026-11-01',
      })),
    });
    assert.ok(Buffer.byteLength(content) > 1024 * 1024);
    assert.ok(Buffer.byteLength(content) < MAX_GIT_OUTPUT_BYTES);
    execFileSync('git', ['init', '-q', dir]);
    writeFileSync(join(dir, 'generated-events.json'), content);
    execFileSync('git', ['-C', dir, 'add', '--', 'generated-events.json']);
    execFileSync('git', ['-C', dir, '-c', 'user.name=TexasDefined CI', '-c',
      'user.email=actions@users.noreply.github.com', 'commit', '-qm', 'fixture']);
    const actual = gitText(['show', 'HEAD:generated-events.json'], dir);
    assert.deepEqual(JSON.parse(actual), JSON.parse(content));
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});
