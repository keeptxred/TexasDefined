/**
 * Conservative TPWD Angling Opportunities grade-table extractor.
 * Only an explicit positive grade marker in exactly one column is evidence.
 * Unsupported tables return [] and must be reported as inconclusive.
 */
const gradeColumns=["poor","fair","good","excellent"];
const clean=s=>String(s||"").replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi," ").replace(/<[^>]+>/g," ")
  .replace(/&(?:nbsp|#160);/g," ").replace(/&amp;/g,"&").replace(/\s+/g," ").trim();

export function parseTpwdGrades(html){
  const results=[];
  for(const table of html.match(/<table\b[^>]*>[\s\S]*?<\/table>/gi)||[]){
    const header=clean(table.slice(0,Math.min(table.length,1700))).toLowerCase();
    if(!["species","poor","fair","good","excellent"].every(word=>header.includes(word)))continue;
    for(const tr of table.match(/<tr\b[^>]*>[\s\S]*?<\/tr>/gi)||[]){
      const cells=[...tr.matchAll(/<t[dh]\b[^>]*>([\s\S]*?)<\/t[dh]>/gi)].map(m=>m[1]);
      if(cells.length<5)continue;
      const name=clean(cells[0]);
      if(!name||/^(species|poor|fair|good|excellent)$/i.test(name))continue;
      const positives=cells.slice(1,5).flatMap((cell,i)=>
        /<img\b[^>]*(?:alt\s*=\s*["']yes["']|(?:yes|check|tick)\.(?:gif|png))/i.test(cell)
          ? [gradeColumns[i]] : []);
      if(positives.length===1)results.push({name,grade:positives[0]});
    }
  }
  return results;
}
