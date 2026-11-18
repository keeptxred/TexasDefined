import { test } from 'node:test';
import assert from 'node:assert/strict';
import { parseTexasDefinedModelJson } from './texasdefined-ai-response-parse.mjs';

const certifiedShape={
  title:'Rainbow Trout Stocking Heads Back to Texas Waters Nov. 24',
  dek:'Agency-supported visitor and fishing conditions are documented.',
  body:[{type:'heading',text:'Texas winter fishing details'}],
};
test('handles Cloudflare JSON object response without string.match TypeError',()=>{
  const same=parseTexasDefinedModelJson(certifiedShape);
  assert.strictEqual(same,certifiedShape);
  assert.strictEqual(same.body[0].text,'Texas winter fishing details');
});
test('handles plain JSON text and strictly complete fenced JSON',()=>{
  assert.deepEqual(parseTexasDefinedModelJson(JSON.stringify(certifiedShape)),certifiedShape);
  const fence=String.fromCharCode(96).repeat(3);
  assert.deepEqual(parseTexasDefinedModelJson(fence+'json\n'+JSON.stringify(certifiedShape)+'\n'+fence),certifiedShape);
});
test('rejects bogus array, null, missing result, malformed JSON and primitive output',()=>{
  for(const value of [[],null,undefined,false,123,'','[]','null','true','{"title":','no JSON here']) {
    assert.throws(()=>parseTexasDefinedModelJson(value));
  }
});
test('model-provided quality score never certifies itself before independent reviewer',()=>{
  const invalid={...certifiedShape,qualityScore:100};
  const parsed=parseTexasDefinedModelJson(invalid);
  assert.equal(parsed.qualityScore,100);
  // Parsing itself is intentionally not editorial approval or publication.
  assert.equal(parsed.passed,undefined);
  assert.equal(parsed.published,undefined);
});
