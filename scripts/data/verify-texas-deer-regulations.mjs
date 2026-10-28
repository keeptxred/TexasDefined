import fs from 'node:fs';

const sourcePath = 'src/data/hunting/authority-deer.ts';
const pageUrl = 'https://tpwd.texas.gov/regulations/outdoor-annual/regs/animals/white-tailed-deer';
const source = fs.readFileSync(sourcePath, 'utf8');
const dates = JSON.parse(fs.readFileSync('src/data/hunting/deer-season-dates.json', 'utf8'));
if (dates.rows.length !== 8) throw new Error('Deer season dataset must include eight documented season rows');
if (!dates.regulations || !Number.isInteger(dates.regulations.annualBagMax) || !dates.regulations.antlerlessReportingCounties) throw new Error('Deer guide requires verified TPWD regulatory facts');

// Local contract is always checked, including on PRs without external networking.
for (const marker of [
  'reviewedOn: "2026-10-28"',
  'deerSeasonRange(',
  'regulations.reportingHours',
  'regulations.specialAntlerSpreadInches',
  'regulations.annualBagMax',
  'regulations.annualBuckMax',
  'regulations.antlerlessReportingCounties',
  'Texas Hunt & Fish',
  'TPWD regional study: rut in white-tailed deer',
  pageUrl,
]) {
  if (!source.includes(marker)) throw new Error('Texas deer authority missing checked editorial fact/source: ' + marker);
}

if (process.argv.includes('--offline')) {
  if (!dates.rows.every((row)=>/^20\d\d-\d\d-\d\d$/.test(row.start)&&/^20\d\d-\d\d-\d\d$/.test(row.end))) throw new Error('Deer season dataset contains invalid dates');
  console.log('Deer authority source/season editorial contract passed (offline; no live TPWD check).');
  process.exit(0);
}

function visibleText(html) {
  return html
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, ' ')
    .replace(/<!--[\s\S]*?-->/g, ' ')
    .replace(/<[^>]*>/g, ' ')
    .replace(/&(?:nbsp|#160);/gi, ' ')
    .replace(/&(?:ndash|mdash|minus|#8211|#8212);/gi, '-')
    .replace(/[–—−]/g, '-')
    .replace(/\s+/g, ' ')
    .trim();
}

async function fetchOfficialDeerPage() {
  const delays=[0,4000,9000,18000];
  let lastError;
  for(let attempt=0;attempt<delays.length;attempt++) {
    if(delays[attempt])await new Promise(resolve=>setTimeout(resolve,delays[attempt]));
    try {
      const response=await fetch(pageUrl, {
        headers:{'user-agent':'TexasDefined-deer-regulation-review/1.0 (editorial monitoring)','accept':'text/html'},
        signal:AbortSignal.timeout(25_000),
      });
      if (!response.ok) {
        const error=new Error('TPWD deer page fetch failed: HTTP '+response.status);
        if(response.status!==429&&response.status<500)throw Object.assign(error,{permanent:true});
        throw error;
      }
      if(new URL(response.url).hostname!=='tpwd.texas.gov')throw new Error('TPWD regulatory source redirected off the official domain.');
      if(attempt)console.log('TPWD regulatory spot-check succeeded after retry '+(attempt+1)+'.');
      return visibleText(await response.text());
    }catch(error){
      lastError=error;
      if(error.permanent)throw error;
      if(attempt<delays.length-1)console.warn('TPWD legal spot-check network retry: '+(error.cause?.code||error.message));
    }
  }
  throw lastError;
}
const body=await fetchOfficialDeerPage();
if (body.length < 1500) throw new Error('TPWD deer page returned too little content for trustworthy checks.');

const expected = [
  dates.startYear + '-' + (dates.startYear + 1),
  'Archery Only',
  'General Season',
  'Youth-Only',
  'Muzzleloader',
  'Special Late',
  'Statewide Bag Limits',
  'Mandatory Harvest Reporting',
  'Special Antler Restrictions',
  'Chronic Wasting Disease',
];
const missing = expected.filter((snippet) => !body.includes(snippet));
if (missing.length) {
  throw new Error('TPWD deer regulations need an editor review; expected official facts/headings missing or changed: ' + missing.join(', '));
}
console.log('TPWD deer spot-check passed for the season recorded in the date dataset. This is not a full county-level regulatory review; do not silently advance the separate human-review timestamp.');
