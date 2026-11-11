// Monthly read-only public-source drift check for /texas-government-jobs.
// Do not automatically restamp dates, report openings, or rewrite guidance.
import { appendFileSync } from 'node:fs';
const sources = [
  { label: 'TWC WorkInTexas state hiring instructions', url: 'https://www.twc.texas.gov/jobseekers/job-search', evidence: ['WorkInTexas','State of Texas'] },
  { label: 'March 2026 simplified state application', url: 'https://gov.texas.gov/news/post/governor-abbott-twc-launch-streamlined-state-of-texas-application', evidence: ['March 10, 2026','WorkInTexas'] },
  { label: 'Texas Department of Insurance CAPPS application', url: 'https://www.tdi.texas.gov/jobs/', evidence: ['CAPPS','Work'] },
  { label: 'Texas Water Development Board hiring', url: 'https://www.twdb.texas.gov/jobs/', evidence: ['CAPPS','Job'] },
  { label: 'Texas State Auditor salary schedules', url: 'https://hr.sao.texas.gov/CompensationSystem/SalarySchedules', evidence: ['2026-2027','Schedule A'] },
  { label: 'ERS state employee health benefits', url: 'https://www.ers.texas.gov/Active-Employees/Health-Benefits', evidence: ['full-time','premiums'] },
];
const results = await Promise.all(sources.map(async source => {
  try {
    const response = await fetch(source.url, { headers: { 'user-agent': 'TexasDefined-Editorial-Freshness/1.0' },
      signal: AbortSignal.timeout(16000), redirect: 'follow' });
    if (!response.ok) return { ...source, result: 'REVIEW', detail: 'HTTP ' + response.status };
    const html = await response.text();
    const decoded = html.replace(/<[^>]*>/g, ' ').replace(/&nbsp;|&#160;/g,' ').replace(/\s+/g,' ');
    const missing = source.evidence.filter(term => !html.includes(term) && !decoded.includes(term));
    return { ...source, result: missing.length ? 'REVIEW' : 'PASS',
      detail: missing.length ? 'Guidance markers absent: '+missing.join(', ') : 'Source reachable; guidance markers present' };
  } catch (error) { return { ...source, result: 'REVIEW', detail: String(error).slice(0,220) }; }
}));
const lines = [
  '### Monthly Texas government jobs editorial-source check',
  'Checked ' + new Date().toISOString() + '. REVIEW can mean real source drift or server bot protections; manual verification required.',
  ...results.map(r => '- ' + r.result + ' ' + r.label + ': ' + r.detail + ' — ' + r.url),
  'No job openings, eligibility claims or source review dates were changed automatically.',
];
const summary = lines.join('\n') + '\n';
console.log(summary);
if(process.env.GITHUB_STEP_SUMMARY) appendFileSync(process.env.GITHUB_STEP_SUMMARY, summary);
if(results.some(r => r.result === 'REVIEW')) process.exitCode = 1;
