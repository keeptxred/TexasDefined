import fs from 'node:fs';

const file = 'src/data/hunting/deer-season-dates.json';
const existing = JSON.parse(fs.readFileSync(file, 'utf8'));
const ids = ['archery','generalNorth','generalSouth','earlyYouth','lateYouthNorth','muzzleloader','specialNorth','specialSouth'];
const months = { Jan:1, Feb:2, Mar:3, Apr:4, May:5, Jun:6, Jul:7, Aug:8, Sep:9, Sept:9, Oct:10, Nov:11, Dec:12 };
const datePattern = /\b(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Sept|Oct|Nov|Dec)\.?\s+(\d{1,2})(?:,\s*(\d{4}))?\s*[-–]\s*(?:(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Sept|Oct|Nov|Dec)\.?\s+)?(\d{1,2}),\s*(\d{4})/g;

function checkDataset(data) {
  if (!Number.isInteger(data.startYear) || data.startYear < 2026 || data.startYear > 2100) throw new Error('Invalid deer season year.');
  if (data.seasonYear !== data.startYear + '–' + String(data.startYear + 1).slice(-2)) throw new Error('Deer season-year label mismatch.');
  if (data.rows.length !== ids.length || data.rows.some((row,i)=>row.id!==ids[i])) throw new Error('The eight TPWD deer season row identities/order changed.');
  for (const row of data.rows) {
    for (const date of [row.start,row.end]) {
      if (!/^\d{4}-\d\d-\d\d$/.test(date) || Number.isNaN(Date.parse(date + 'T12:00:00Z')) || ![data.startYear, data.startYear+1].includes(Number(date.slice(0,4)))) throw new Error('Invalid TPWD deer season date: ' + date);
    }
    if (row.start > row.end || (Date.parse(row.end)-Date.parse(row.start)) / 864e5 > 190) throw new Error('Implausible deer season length: ' + row.id);
  }
}
checkDataset(existing);
if (process.argv.includes('--offline')) {
  for (const [name,text] of [
    ['deer guide', fs.readFileSync('src/data/hunting/authority-deer.ts','utf8')],
    ['deer season table', fs.readFileSync('src/components/hunting/HuntingAuthority.tsx','utf8')],
  ]) if (!text.includes('deerSeasonRange(')) throw new Error(name + ' is not using synced dates.');
  console.log('TPWD deer date dataset and all eight route identifiers validated offline.');
  process.exit(0);
}

function visibleText(html) {
  return html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi,' ')
    .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi,' ')
    .replace(/<!--[^\0]*?-->/g,' ')
    .replace(/<[^>]*>/g,' ')
    .replace(/&(?:nbsp|#160);/gi,' ')
    .replace(/&amp;/gi,'&').replace(/&quot;/gi,'"')
    .replace(/&(?:ndash|mdash|minus|#8211|#8212);/gi,'-')
    .replace(/\s+/g,' ').trim();
}
const take=(s,a,b)=>{
  const i=s.indexOf(a); if(i<0)throw new Error('Official TPWD heading missing: '+a);
  const j=s.indexOf(b,i+a.length);if(j<0)throw new Error('Official TPWD section boundary missing: '+b);
  return s.slice(i+a.length,j);
};
const iso=(year,month,day)=> {
  const n=Number(year),m=months[month],d=Number(day);
  if(!m || d<1 || d>31)throw Error('Invalid TPWD date component');
  const date=new Date(Date.UTC(n,m-1,d));
  if(date.getUTCFullYear()!==n||date.getUTCMonth()!==m-1||date.getUTCDate()!==d) throw Error('Invalid calendar date');
  return [n,String(m).padStart(2,'0'),String(d).padStart(2,'0')].join('-');
};
function ranges(section){
  return Array.from(section.matchAll(datePattern),m=>{
    const endYear=Number(m[6]),endMonth=m[4]||m[1];
    const inferredStartYear=m[3]?Number(m[3]):(months[m[1]]>months[endMonth]?endYear-1:endYear);
    return {start:iso(inferredStartYear,m[1],m[2]),end:iso(endYear,endMonth,m[5])};
  });
}
function parseDeerPage(text) {
  const y=text.match(/White-tailed Deer\s+(\d{4})-(\d{4})\s+Seasons\s*&\s*Regulations/i);
  if(!y||Number(y[2])!==Number(y[1])+1)throw new Error('TPWD deer page does not provide a valid season year');
  const whole=take(text,'Season Dates & County Regulations','View White-tailed Deer hunting regulations for your county.');
  const groups=[
    ['archery',take(whole,'Archery Only','General Season'),1],
    ['general',take(whole,'General Season','Youth-Only'),2],
    ['youth',take(whole,'Youth-Only','Muzzleloader'),3],
    ['muzzleloader',take(whole,'Muzzleloader','Special Late'),1],
    ['special',whole.slice(whole.indexOf('Special Late')+'Special Late'.length),2],
  ];
  const found={};
  for (const [name,s,count] of groups) {
    const dates=ranges(s);if(dates.length!==count)throw new Error('TPWD '+name+' section has '+dates.length+' date ranges, expected '+count+'; manual review needed');
    found[name]=dates;
  }
  if(!groups[1][1].includes('North Zone')||!groups[1][1].includes('South Zone')||!groups[2][1].includes('North Zone')||!groups[2][1].includes('South Zone'))throw new Error('TPWD zone headings changed');
  if(!text.includes('Statewide Bag Limits')||!text.includes('Mandatory Harvest Reporting')||!text.includes('Special Antler Restrictions')||!text.includes('Chronic Wasting Disease'))throw new Error('TPWD regulatory headings changed');
  const safeguards=[
    'No person may exceed the annual bag limit of five white-tailed deer',
    'Collin, Dallas, Grayson, Rockwall',
    '13 inches or greater',
    'reported within 24 hours',
  ];
  for(const needle of safeguards)if(!text.includes(needle))throw Error('TPWD non-date legal fact changed: '+needle+'; manual review needed');
  const values=[found.archery[0],found.general[0],found.general[1],found.youth[0],found.youth[1],found.muzzleloader[0],found.special[0],found.special[1]];
  // The extra early South Zone youth range must equal the North Zone early range.
  if(JSON.stringify(found.youth[2])!==JSON.stringify(found.youth[0]))throw Error('North/South early-youth dates diverged; page schema requires manual review.');
  const rows=existing.rows.map((row,i)=>({...row,...values[i]}));
  return {startYear:Number(y[1]),rows};
}
async function getText(url) {
  if(!url.startsWith('https://tpwd.texas.gov/'))throw new Error('Refusing non-TPWD date source.');
  const resp=await fetch(url,{headers:{'user-agent':'TexasDefined-TPWD-deer-verified-season-sync/1.0'},signal:AbortSignal.timeout(25000)});
  if(!resp.ok)throw new Error('TPWD fetch failed '+resp.status+' at '+url);
  const text=visibleText(await resp.text());
  if(text.length<1500)throw new Error('TPWD response was unexpectedly small at '+url);
  return text;
}
if (process.argv.includes('--self-test')) {
  const sample = [
    'White-tailed Deer 2026-2027 Seasons & Regulations',
    'Season Dates & County Regulations',
    'Archery Only All counties with an open season Oct. 3 - Nov. 6, 2026',
    'General Season North Zone Nov. 7, 2026 - Jan. 3, 2027 South Zone Nov. 7, 2026 - Jan. 17, 2027',
    'Youth-Only North Zone Oct. 30 - Nov. 1, 2026 Jan. 4 - 17, 2027 South Zone Oct. 30 - Nov. 1, 2026',
    'Muzzleloader Jan. 4 - 17, 2027 Special Late North Zone Jan. 4 - 17, 2027 South Zone Jan. 18 - 31, 2027',
    'View White-tailed Deer hunting regulations for your county.',
    'Statewide Bag Limits No person may exceed the annual bag limit of five white-tailed deer',
    'Mandatory Harvest Reporting White-tailed deer must be reported within 24 hours; Collin, Dallas, Grayson, Rockwall',
    'Definition of Buck Deer Special Antler Restrictions legal buck has 13 inches or greater spread',
    'Chronic Wasting Disease',
  ].join(' ');
  const got = parseDeerPage(sample);
  if (got.startYear !== 2026 || got.rows.length !== 8 ||
      got.rows[0].start !== '2026-10-03' || got.rows[0].end !== '2026-11-06' ||
      got.rows[1].end !== '2027-01-03' || got.rows[2].end !== '2027-01-17' ||
      got.rows[7].end !== '2027-01-31') throw new Error('TPWD season range parser self-test failed');
  console.log('TPWD deer parser verified all eight official season date ranges including cross-year and same-month formats.');
  process.exit(0);
}

const official=await getText(existing.officialDeerUrl);
const next=parseDeerPage(official);
if(next.startYear!==existing.startYear)throw new Error('ANNUAL ROLLOVER: TPWD has a new deer season. Do not automatically carry forward last year’s county, bag, tagging, or CWD rules; open an editorial review issue.');
const calendar=await getText(existing.officialCalendarUrl);
const deerCalendar=take(calendar,'White-tailed Deer','Migratory Game Bird');
const calendarDates=ranges(deerCalendar);
for (const row of next.rows) {
  if(!calendarDates.some(item=>item.start===row.start&&item.end===row.end))throw new Error('TPWD statewide calendar conflicts with deer page on '+row.id);
}
const changed=next.rows.some((row,i)=>row.start!==existing.rows[i].start||row.end!==existing.rows[i].end);
if (process.env.GITHUB_OUTPUT)fs.appendFileSync(process.env.GITHUB_OUTPUT, 'changed='+(changed?'true':'false')+'\n');
if (!changed) {
  console.log('Verified TPWD deer page and statewide calendar agree; all eight season ranges unchanged.');
} else {
  const updated={...existing,sourceCheckedAt:new Date().toISOString().slice(0,10),rows:next.rows};
  checkDataset(updated);
  fs.writeFileSync(file,JSON.stringify(updated,null,2)+'\n');
  console.log('Validated matching TPWD source dates and changed only the eight permitted same-season date fields; open a protected PR.');
}
