// Pure codec for generated official county contact snapshots.
// If a snapshot was valid TypeScript but could not be decoded as JSON-like data,
// the old sync silently treated it as empty and could drop verified records.
// Fail closed instead of allowing a "successful" mass replacement.
export function parseExistingCountySnapshot(text, name='COUNTY_PROPERTY_ENRICHMENT') {
  const marker='export const ' + name;
  const start=text.indexOf(marker);
  if (start<0) throw new Error('Official county source snapshot does not export '+name);
  const open=text.indexOf('= {',start);
  const close=text.lastIndexOf('\n};');
  if (open<0||close<open) throw new Error('Truncated official county source snapshot '+name);
  const literal=text.slice(open+2,close+2);
  const jsonLike=literal
    .replace(/([,{]\s*)([a-z][a-z0-9-]*):/gi,'$1"$2":')
    .replace(/'([^'\\]*(?:\\.[^'\\]*)*)'/g,(_,value)=>JSON.stringify(value.replace(/\\'/g,"'")));
  // Generated TS objects may contain trailing commas; these are not valid
  // JSON. Only strip delimiter commas outside properly escaped JSON strings.
  let cleaned='',quoted=false,escaped=false;
  for(let i=0;i<jsonLike.length;i++){
    const char=jsonLike[i];
    if(quoted){
      cleaned+=char;
      if(escaped)escaped=false;
      else if(char==='\\')escaped=true;
      else if(char==='"')quoted=false;
      continue;
    }
    if(char==='"'){quoted=true;cleaned+=char;continue;}
    if(char===','){
      let next=i+1;
      while(next<jsonLike.length&&/\s/.test(jsonLike[next]))next++;
      if(jsonLike[next]==='}'||jsonLike[next]===']')continue;
    }
    cleaned+=char;
  }
  if(quoted)throw new Error('Unterminated source string in county snapshot '+name);
  let records;
  try{ records=JSON.parse(cleaned); }
  catch(error){ throw new Error('Cannot decode county source snapshot '+name+': '+error.message); }
  if(!records||Array.isArray(records)||typeof records!=='object')throw new Error('County source snapshot is not an object');
  for(const [slug,record] of Object.entries(records)){
    if(!/^[a-z0-9-]+$/.test(slug)||!record||typeof record!=='object'||
      !Array.isArray(record.sourceUrls)||!/^20\d\d-\d\d-\d\d$/.test(record.lastVerifiedAt??'')){
      throw new Error('Corrupt verified county source record: '+slug);
    }
  }
  return records;
}
