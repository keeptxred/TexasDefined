import assert from 'node:assert/strict';
import { test } from 'node:test';
import { isOriginalInstitutionalEvidenceLead } from './texasdefined-institutional-evidence-hydration.mjs';

const now = Date.parse('2026-11-15T15:00:00Z');
const lead = {
  id: 6965312,
  title: 'Texas Parks and Wildlife releases grassland restoration field guidance',
  link: 'https://tpwd.texas.gov/newsmedia/releases/?req=20261113a',
  pub_date: '2026-11-13T15:37:05Z',
  target_site: 'texasdefined',
  target_section: 'Explore',
  source_reputation_score: 90,
  texas_relevance_score: 100,
  ready_for_rewrite: true,
  classification_confidence: 0.5,
  viral_signals: { editorial_lane: 'REVIEW', auto_publish_eligible: false },
  extracted_body: '',
  texasdefined_slug: null,
  internal_slug: null,
  preflight_json: null,
};

test('real first-party TPWD research pointer may be hydrated without auto-publish approval', () => {
  assert.equal(isOriginalInstitutionalEvidenceLead(lead,now),true);
  assert.equal(lead.viral_signals.auto_publish_eligible,false);
  assert.equal(lead.viral_signals.editorial_lane,'REVIEW');
  assert.equal(isOriginalInstitutionalEvidenceLead({...lead,ready_for_rewrite:false,classification_confidence:0.25},now),true);
  assert.equal(isOriginalInstitutionalEvidenceLead({...lead,link:'https://www.utep.edu/newsfeed/2026/november/mallard-study.html'},now),true);
});

test('reject third-party reporting, relay links, political actions and invented institution hosts', () => {
  for (const variant of [
    {link:'https://www.kwtx.com/2026/11/14/local-story/'},
    {link:'https://news.google.com/rss/articles/abc'},
    {link:'https://tpwd.texas.gov.evil.example/story'},
    {link:'http://tpwd.texas.gov/newsmedia/releases/?req=20261113a'},
    {link:'https://user@tpwd.texas.gov/newsmedia/releases/'},
    {link:'https://tpwd.texas.gov:8443/newsmedia/releases/'},
    {target_site:'keeptxred'},
    {target_section:'Politics'},
    {title:'City council approves new zoning regulation for public park'},
    {title:'SpaceX confirms it is eyeing public parkland sale near Starbase'},
  ]) assert.equal(isOriginalInstitutionalEvidenceLead({...lead,...variant},now),false,JSON.stringify(variant));
});

test('never hydrate published, manually locked, held, stale, poor-reputation or already substantive rows', () => {
  for (const variant of [
    {texasdefined_slug:'published-story'},
    {internal_slug:'ktr-published-story'},
    {viral_signals:{routing_lock:true}},
    {viral_signals:{post_rewrite_review_required:true}},
    {preflight_json:{status:'PUBLICATION_HOLD'}},
    {preflight_json:{publicationHoldReason:'Legal review'}},
    {pub_date:'2026-11-01T15:00:00Z'},
    {pub_date:'2026-11-16T15:00:00Z'},
    {source_reputation_score:60},
    {texas_relevance_score:50},
    {extracted_body:'Verified original. '.repeat(200)},
    {id:null},
  ]) assert.equal(isOriginalInstitutionalEvidenceLead({...lead,...variant},now),false,JSON.stringify(variant));
});
