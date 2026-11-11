import { test } from 'node:test';
import assert from 'node:assert/strict';
import { isSubstantiveTexasDefinedDraftSource, MIN_ORIGINAL_SOURCE_WORDS, MIN_ORIGINAL_SOURCE_CHARS } from './texasdefined-draft-evidence-gate.mjs';
const body = Array.from({length:420},(_,i)=>'Verified original visitor source fact number '+i+' provides location-specific information.').join(' ');
const story=(title,extracted_body=body)=>({title,extracted_body,source_count:2,link:'https://example.org/report'});
test('requires substantive independently extracted source content before 750-word generation',()=>{
  assert.equal(MIN_ORIGINAL_SOURCE_WORDS,320);
  assert.equal(MIN_ORIGINAL_SOURCE_CHARS,2200);
  assert.equal(isSubstantiveTexasDefinedDraftSource(story('Houston museum opens free exhibit','Brief source report.')),false);
  assert.equal(isSubstantiveTexasDefinedDraftSource(story('Texas museum exhibits meteorite','padding '.repeat(1000))),true);
  assert.equal(isSubstantiveTexasDefinedDraftSource(story('Texas museum exhibits meteorite','Longword'.repeat(3000))),false);
  assert.equal(isSubstantiveTexasDefinedDraftSource(story('Texas museum exhibits meteorite')),true);
});
test('routine results, game previews, thin schedules and national explainers cannot become standalone AI articles',()=>{
  for(const title of [
    '2026 Class 6A Texas high school football Bi-District playoff schedule',
    'Dallas Mavericks host Indiana Pacers in non-conference action',
    'Cooper Flagg has 25 points, career-best 12 assists as Dallas Mavericks beat Nets',
    'Dallas Cowboys triumph over Indianapolis Colts in Sunday afternoon showdown',
    'What is Diwali, the Festival of Lights, and how is it celebrated?',
    'Where to take out-of-town guests in Dallas: The ultimate local dining and drinking guide',
  ]) assert.equal(isSubstantiveTexasDefinedDraftSource(story(title)),false,title);
});
test('does not block valid travel, arts, regional competition or science independently documented stories',()=>{
  for(const title of [
    'El Paso steps back in time for Borderlands Renaissance Faire at Ascarate Park',
    'McKinney National Airport opens commercial passenger terminal',
    'Spring meteorite on free exhibit at Houston Museum of Natural Science',
    'Temple High School BBQ Team qualifies for state competition',
    'A historic Texas neighborhood prepares for annual festival',
  ]) assert.equal(isSubstantiveTexasDefinedDraftSource(story(title)),true,title);
});


test('one source sports promotional report is not sufficient original research for a long-form automatically generated story',()=>{
  assert.equal(isSubstantiveTexasDefinedDraftSource({...story('The Texans Team Identity DeMeco Ryans Has Been Waiting For'),target_section:'Sports',source_count:1}), false);
  assert.equal(isSubstantiveTexasDefinedDraftSource({...story('Texas high school championship story with independent confirmation'),target_section:'Sports',source_count:2}), true);
  assert.equal(isSubstantiveTexasDefinedDraftSource({...story('Houston museum opens rare meteorite exhibit'),target_section:'Explore',source_count:1,link:'https://museum.utexas.edu/news/exhibit'}), true);
  assert.equal(isSubstantiveTexasDefinedDraftSource({...story('Houston museum opens rare meteorite exhibit'),target_section:'Explore',source_count:1,link:'https://example.com/local-report'}), false);
  assert.equal(isSubstantiveTexasDefinedDraftSource({...story('Texas football program launches another single-source opinion'),target_section:'Sports'}), false);
});
