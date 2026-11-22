import fs from 'node:fs';
import path from 'node:path';

// This program is a triage inventory, NOT a source verification or a historical
// accuracy/certification engine. A landmark might be absent because it does not
// exist in this county; the absence is a research question, never a fact.
const input = process.argv[2] || '/tmp/county-profiles.json';
const outputDir = process.argv[3] || '/tmp';
const report = JSON.parse(fs.readFileSync(input, 'utf8'));
const rows = report.rows;
if (!Array.isArray(rows) || rows.length !== 254 || report.effectiveProfiles !== 254) {
  throw new Error('Expected exactly 254 effective, locally inventoried county profiles');
}
const ISO_DAY = new Date().toISOString().slice(0, 10);
const old = (v) => {
  const ms = Date.parse(v || '');
  return !Number.isFinite(ms) || Date.now() - ms > 120 * 86400000;
};
const queries = [
  'courthouse predecessors, fires, storm damage and lost architectural details',
  'historic water towers, fire stations, volunteer fire departments and disaster response',
  'local archives, town founding, railroads, schools, memorials, Black and Indigenous community history',
];
const issueList = [];
for (const row of rows) {
  const sourcePaths = row.fixture.split(' + ').map(s => s.trim()).filter(Boolean);
  const texts = sourcePaths.filter(p => fs.existsSync(p)).map(p => fs.readFileSync(p, 'utf8'));
  if (!texts.length) throw new Error('County profile source is missing for ' + row.countySlug);
  const text = texts.join('\n');
  const body = /\bbody\s*:\s*\[([\s\S]*?)\n\s*\],/.exec(text)?.[1] || text;
  const sources = /\bsources\s*:\s*\[/.test(text);
  const match = /\bupdatedAt\s*:\s*["'](\d{4}-\d\d-\d\d)["']/.exec(text);
  const lastUpdated = match?.[1] || '';
  const hasCourthouse = /courthouse|county court|county seat/i.test(body);
  const hasLossContext = /\bfire(s|fighting|house)?\b|burned|flood|hurricane|tornado|demoli(shed|tion)|lost tower|replacement/i.test(body);
  const hasUtilityContext = /water tower|firehouse|fire station|fire department|waterworks|sanitation|hydrant|emergency services/i.test(body);
  const hasEducationCommunities = /(?:school|college|university|segregat|civil.rights|enslav|freedmen|indigen|tribal|Caddo|Comanche|Karankawa)/i.test(body);
  const gaps = [];
  if (!sources || row.authority.researchSourceCount < 5) gaps.push('research-source-gap');
  if (row.authority.primarySourceCount < 2) gaps.push('primary-evidence-gap');
  if (!hasCourthouse) gaps.push('review-county-seat-and-civic-history');
  if (!hasLossContext) gaps.push('research-fire-storm-demolition-or-absence');
  if (!hasUtilityContext) gaps.push('research-fire-safety-water-utilities-or-absence');
  if (!hasEducationCommunities) gaps.push('research-local-community-education-or-absence');
  if (old(lastUpdated)) gaps.push('date-and-refresh-review');
  if (row.authority.missing?.length) gaps.push(...row.authority.missing);
  const distinct = [...new Set(gaps)];
  issueList.push({
    county: row.countySlug,
    title: row.title,
    canonical: 'https://texasdefined.com/county/' + row.countySlug,
    files: sourcePaths,
    updatedAt: lastUpdated || null,
    sourceCount: row.authority.researchSourceCount,
    primaryCount: row.authority.primarySourceCount,
    paragraphCount: row.paragraphs,
    wordCount: row.words,
    hasCourthouse, hasLossContext, hasUtilityContext, hasEducationCommunities,
    triageFlags: distinct,
    editorialStatus: 'independent-research-required-until-signed-off',
  });
}
issueList.sort((a, b) => b.triageFlags.length - a.triageFlags.length || a.sourceCount - b.sourceCount || a.county.localeCompare(b.county));
const totals = {
  counties: issueList.length,
  zeroPublishedResearchSources: issueList.filter(x => x.sourceCount === 0).length,
  needingDateReview: issueList.filter(x => !x.updatedAt || old(x.updatedAt)).length,
  noMentionOfHistoricDamageOrReplacement: issueList.filter(x => !x.hasLossContext).length,
  noMentionOfUtilitiesOrFireService: issueList.filter(x => !x.hasUtilityContext).length,
  noCountySeatContext: issueList.filter(x => !x.hasCourthouse).length,
  uncategoricallyCertified: issueList.length,
};
fs.mkdirSync(outputDir, {recursive: true});
fs.writeFileSync(path.join(outputDir,'county-civic-history-triage.json'), JSON.stringify({
  generatedAt: new Date().toISOString(), summary: totals, researchQuestionsNotMissingFacts: queries, interpretation:
  'Screening heuristics only. No score or topic flag proves a factual omission or indicates compliance with Google policies; each county requires original source research and post-deployment review.',
  rows: issueList,
}, null, 2) + '\n');
const safe = s => String(s??'').replace(/[\r\n\t]/g,' ').replace(/"/g,'""');
const columns = ['county','canonical','updatedAt','sourceCount','primaryCount','wordCount','hasCourthouse','hasLossContext','hasUtilityContext','hasEducationCommunities','triageFlags'];
fs.writeFileSync(path.join(outputDir,'county-civic-history-triage.tsv'),
  columns.join('\t')+'\n'+issueList.map(r=>columns.map(k=>k==='triageFlags'?r.triageFlags.join(';'):safe(r[k])).join('\t')).join('\n')+'\n');
const top = issueList.slice(0, 15).map(x => '- '+x.county+': '+x.triageFlags.slice(0, 5).join(', ')).join('\n');
fs.writeFileSync(path.join(outputDir,'county-civic-history-issue-comment.md'),
  '## Quarterly 254-county civic-history screen — '+ISO_DAY+'\n\n'+
  'Automated triage, **not** human editorial certification or proof that a town had a fire, tower, or other event.\n\n'+
  '- County profiles checked: **'+totals.counties+'**\n'+
  '- Without individually published research sources: **'+totals.zeroPublishedResearchSources+'**\n'+
  '- With no qualifying recent editorial update date: **'+totals.needingDateReview+'**\n'+
  '- No mention of civic disaster/loss (research, do not infer): **'+totals.noMentionOfHistoricDamageOrReplacement+'**\n'+
  '- No mention of firefighting/water utilities (research, do not infer): **'+totals.noMentionOfUtilitiesOrFireService+'**\n\n'+
  'First 15 source-priority counties:\n'+top+'\n\n'+
  'Review the exact JSON/TSV artifacts on this scheduled GitHub run, research each county in the [254-county implementation ledger](https://github.com/keeptxred/TexasDefined/issues/7540), publish source-grounded page edits, verify public release, and **only then** check off the county.\n');
console.log(JSON.stringify({date:ISO_DAY,...totals}));
