// Official TPWD youth-only DATE updater. No arbitrary legal text or fees are auto-edited.
import fs from "node:fs";
import { fileURLToPath } from "node:url";

const URL = "https://tpwd.texas.gov/regulations/outdoor-annual/regs/season-types/youth-only";
const PATH = "src/data/hunting/youth-hunting-data.ts";
const months = "(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sept?|Oct|Nov|Dec)";
const dateRe = new RegExp("\\b" + months + "\\.?\\s+\\d{1,2}\\s*[-–]\\s*(?:" + months + "\\.?\\s+)?\\d{1,2},?\\s+20\\d{2}\\b", "g");
const assert = (ok, message) => { if (!ok) throw new Error("TPWD youth calendar: " + message); };
const normalize = (s) => s.replace(/\s+/g, " ").trim();
const dates = (s) => [...s.matchAll(dateRe)].map((m) => normalize(m[0]).replace(/\s*[-–]\s*/g, "–"));
const escapeRe = (s) => [...s].map((ch) => "\\.^$*+?()[]{}|/".includes(ch) ? "\\" + ch : ch).join("");

function visibleText(html) {
  return normalize(html
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, " ")
    .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, " ")
    .replace(/<!--[\s\S]*?-->/g, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&(?:nbsp|#160);/gi, " ")
    .replace(/&(?:ndash|mdash);/gi, "-")
    .replace(/&amp;/gi, "&"));
}
function species(core, name) {
  const match = new RegExp("(?:^|\\s)" + escapeRe(name) + "\\s+([\\s\\S]*?)\\s+View\\s+" + escapeRe(name) + "\\s+Youth-Only", "i").exec(core);
  assert(match, "TPWD species heading/ending changed for " + name);
  return match[1];
}
function zones(section, expected) {
  const matches = [...section.matchAll(/(High Plains Mallard Management Unit|Brooks,\s*Kenedy,\s*Kleberg,\s*and\s*Willacy Counties|South Zone|North Zone|East Texas)/gi)];
  assert(matches.length === expected.length, "zone count changed: " + expected.join(", "));
  matches.forEach((m, i) => assert(normalize(m[0]).toLowerCase() === expected[i].toLowerCase(), "zone order changed: " + m[0]));
  return matches.map((m,i) => dates(section.slice(m.index + m[0].length, matches[i+1]?.index ?? section.length)));
}
const exact = (values,n,label) => { assert(values.length === n,label + " expected " + n + " dates; found " + values.length); return values.join("; "); };
export function parseYouthCalendar(html) {
  const page = visibleText(html);
  const title = /Youth-Only\s+(20\d{2})-(20\d{2})\s+Seasons\s*&\s*Regulations/i.exec(page);
  assert(title,"missing agency season-year title");
  const startYear = Number(title[1]), endYear = Number(title[2]);
  assert(endYear === startYear + 1,"non-consecutive source season years");
  const start = page.indexOf("Youth-Only Seasons & County Regulations", title.index);
  const end = page.indexOf("About Youth-only Seasons", start);
  assert(start >= 0 && end > start,"missing official species boundaries");
  const core = page.slice(start + "Youth-Only Seasons & County Regulations".length, end);
  const duck = zones(species(core,"Duck"),["South Zone","High Plains Mallard Management Unit","North Zone"]);
  const squirrel = zones(species(core,"Squirrel"),["East Texas"]);
  const turkey = zones(species(core,"Wild Turkey"),["North Zone","North Zone","Brooks, Kenedy, Kleberg, and Willacy Counties","South Zone","South Zone"]);
  const deer = zones(species(core,"White-tailed Deer"),["North Zone","South Zone"]);
  assert(deer[0].length === 2 && deer[1].length === 1 && deer[0][0] === deer[1][0],"deer North/South early calendar no longer matches");
  const rows = [
    ["White-tailed deer","North & South — early",exact([deer[0][0]],1,"early deer")],
    ["White-tailed deer","North — late",exact([deer[0][1]],1,"late deer")],
    ["Wild turkey","North — fall",exact(turkey[0],2,"North fall turkey")],
    ["Wild turkey","South — fall",exact(turkey[4],2,"South fall turkey")],
    ["Wild turkey","Brooks, Kenedy, Kleberg & Willacy",exact(turkey[2],1,"special counties")],
    ["Wild turkey","North — spring",exact(turkey[1],2,"North spring turkey")],
    ["Wild turkey","South — spring",exact(turkey[3],2,"South spring turkey")],
    ["Duck / waterfowl","High Plains Mallard Management Unit",exact(duck[1],1,"High Plains duck")],
    ["Duck / waterfowl","South Zone",exact(duck[0],1,"South duck")],
    ["Duck / waterfowl","North Zone",exact(duck[2],1,"North duck")],
    ["Squirrel","East Texas eligible counties",exact(squirrel[0],1,"East Texas squirrel")],
  ];
  for(const [animal,region,value] of rows){
    const years = [...value.matchAll(/\b20\d{2}\b/g)].map((m)=>Number(m[0]));
    assert(years.length > 0 && years.every((y)=>y===startYear || y===endYear),"out-of-period season date "+animal+" "+region);
  }
  return {year:String(startYear)+"–"+String(endYear).slice(2),startYear,rows};
}
export function mergeCalendar(current, calendar, today) {
  const y = /YOUTH_HUNTING_SEASON_YEAR = "(20\d{2})–(\d{2})"/.exec(current);
  assert(y,"missing existing year");
  const prior = Number(y[1]);
  assert(calendar.startYear >= prior && calendar.startYear <= prior + 1,"non-sequential season year update");
  assert(Number(today.slice(0,4)) >= calendar.startYear-1 && Number(today.slice(0,4)) <= calendar.startYear+1,"suspicious update date");
  let next = current;
  for(const [animal,region,value] of calendar.rows){
    const re = new RegExp('(\\{ species: "'+escapeRe(animal)+'", region: "'+escapeRe(region)+'", dates: ")[^"]+(")',"g");
    let count=0;
    next=next.replace(re,(_match,a,b)=>{count++;return a+value+b;});
    assert(count===1,"missing or duplicated local row "+animal+" / "+region);
  }
  next = next.replace(/YOUTH_HUNTING_SEASON_YEAR = "20\d{2}–\d{2}"/,'YOUTH_HUNTING_SEASON_YEAR = "'+calendar.year+'"');
  if(next!==current) next=next.replace(/YOUTH_HUNTING_LAST_CHECKED = "20\d{2}-\d{2}-\d{2}"/,'YOUTH_HUNTING_LAST_CHECKED = "'+today+'"');
  return next;
}
async function main(){
  const res=await fetch(URL,{headers:{"User-Agent":"TexasDefined-Youth-Authority-Calendar/1.0",Accept:"text/html"},signal:AbortSignal.timeout(25000)});
  assert(res.ok,"TPWD returned HTTP "+res.status);
  assert((res.headers.get("content-type")||"").includes("text/html"),"TPWD response not HTML");
  const parsed=parseYouthCalendar(await res.text());
  const before=fs.readFileSync(PATH,"utf8"), after=mergeCalendar(before,parsed,new Date().toISOString().slice(0,10));
  if(before===after) {console.log("TPWD dates unchanged; verification date preserved.");return;}
  if(!process.argv.includes("--write")){console.log("Official dates changed in "+parsed.rows.length+" verified zone rows; --write required.");process.exitCode=2;return;}
  fs.writeFileSync(PATH,after);
  console.log("Updated official youth hunting calendar for "+parsed.year+" using "+parsed.rows.length+" validated rows.");
}
if(process.argv[1] && fileURLToPath(import.meta.url)===fs.realpathSync(process.argv[1])){
 main().catch((error)=>{console.error(error);process.exitCode=1;});
}
