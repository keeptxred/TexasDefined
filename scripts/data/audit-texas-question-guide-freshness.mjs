import { appendFileSync } from 'node:fs';

const sources = [
  { topic: 'Houston metro BLS May 2025 OEWS', url: 'https://www.bls.gov/regions/southwest/news-release/2026/occupationalemploymentandwages_houston_20260813.htm', markers: ['May 2025', '32.51', '27.41', '30.38', '24.26', '14.70'] },
  { topic: 'Dallas–Fort Worth metro BLS May 2025 OEWS', url: 'https://www.bls.gov/regions/southwest/news-release/occupationalemploymentandwages_dallasfortworth.htm', markers: ['May 2025', '33.96', '27.03', '29.86', '24.17', '15.74'] },
  { topic: 'Austin metro BLS May 2025 OEWS', url: 'https://www.bls.gov/regions/southwest/news-release/OccupationalEmploymentandWages_Austin.htm', markers: ['May 2025', '35.85', '27.53', '29.54', '21.90', '16.50'] },
  { topic: 'San Antonio metro BLS May 2025 OEWS', url: 'https://www.bls.gov/regions/southwest/news-release/2026/occupationalemploymentandwages_sanantonio_20260813.htm', markers: ['May 2025', '29.39', '25.94', '28.18', '21.23', '15.02'] },
  { topic: 'Austin-area parks TPWD', url: 'https://tpwd.texas.gov/state-parks/nearby/austin', markers: ['McKinney Falls', 'Bastrop', 'Pedernales Falls'] },
  { topic: 'DFW-area parks TPWD', url: 'https://tpwd.texas.gov/state-parks/nearby/dfw', markers: ['Cedar Hill', 'Ray Roberts Lake', 'Lake Mineral Wells'] },
  { topic: 'Houston-area parks TPWD', url: 'https://tpwd.texas.gov/state-parks/nearby/houston', markers: ['Brazos Bend', 'Sheldon Lake', 'Galveston Island'] },
  { topic: 'San Antonio-area parks TPWD', url: 'https://tpwd.texas.gov/state-parks/nearby/sanantonio/', markers: ['Government Canyon', 'Guadalupe River', 'Garner'] },
];
const results = await Promise.all(sources.map(async source => {
  try {
    const response = await fetch(source.url, { headers: { 'user-agent': 'TexasDefinedSourceReview/1.0 (editorial source verification)' }, signal: AbortSignal.timeout(16000) });
    if (!response.ok) return { ...source, state: 'REVIEW', detail: 'HTTP ' + response.status };
    const html = await response.text();
    const missing = source.markers.filter(marker => !html.includes(marker));
    return { ...source, state: missing.length ? 'REVIEW' : 'PASS', detail: missing.length ? 'Markers absent: ' + missing.join(', ') : 'Date/facts or referenced park names present' };
  } catch (error) {
    return { ...source, state: 'REVIEW', detail: String(error).slice(0,200) };
  }
}));
const lines = [
  '### Quarterly source audit: Texas job, training and nature guides',
  'Audit at ' + new Date().toISOString() + '. Source sites may block automated requests; REVIEW means manual verification needed, not that the article is necessarily false.',
  ...results.map(result => '- ' + result.state + ' ' + result.topic + ': ' + result.detail + ' — ' + result.url),
  'Do not silently rewrite wages, change factual dates or declare a source verified based only on network HTTP status.',
].join('\n') + '\n';
console.log(lines);
if (process.env.GITHUB_STEP_SUMMARY) appendFileSync(process.env.GITHUB_STEP_SUMMARY, lines);
if (results.some(result => result.state === 'REVIEW')) process.exitCode = 1;
