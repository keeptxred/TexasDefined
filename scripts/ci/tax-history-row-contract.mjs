// Pure, read-only structural checks for source-qualified historical tax table rows.
// The SSR page includes other historical years and JSON-LD, so global substring
// matches alone cannot prove that the rate belongs to the correct tax year.
function visibleText(html) {
  return String(html ?? '')
    .replace(/<[^>]*>/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&nbsp;/g, ' ')
    .replace(/&#(?:x([a-f0-9]+)|([0-9]+));/gi, (_, hex, dec) =>
      String.fromCodePoint(Number.parseInt(hex ?? dec, hex ? 16 : 10)))
    .replace(/\s+/g, ' ').trim();
}

export function checkYearSpecificTaxRateRow(html, { year, rate, agency, conflict = false, statewideRate = null }) {
  const anchor=html.indexOf('Annual tax rates, with source distinctions');
  if(anchor<0)return {ok:false,reason:'historical rate table heading missing'};
  const table=html.slice(anchor).match(/<table\b[^>]*>([\s\S]*?)<\/table>/i)?.[1];
  if(!table || !table.includes('Reported levy'))
    return {ok:false,reason:'rate-history table or column headers missing'};

  const tbody=table.match(/<tbody\b[^>]*>([\s\S]*?)<\/tbody>/i)?.[1];
  if(tbody == null)return {ok:false,reason:'rate-history table has no body'};
  const matches=[];
  for(const tr of tbody.matchAll(/<tr\b[^>]*>([\s\S]*?)<\/tr>/gi)){
    const cells=[...tr[1].matchAll(/<td\b[^>]*>([\s\S]*?)<\/td>/gi)].map(m=>visibleText(m[1]));
    if(cells.length!==6)continue;
    if(cells[0]===String(year))matches.push(cells);
  }
  if(matches.length!==1)
    return {ok:false,reason:'expected one row for tax year '+year+', found '+matches.length};
  const row=matches[0];
  if(!row[4].includes(agency))
    return {ok:false,reason:'the '+year+' source cell does not identify '+agency};
  if(conflict){
    if(typeof statewideRate!=='string' || !/^\\d+\\.\\d{6,8}$/.test(statewideRate))
      return {ok:false,reason:'conflict requires a verified year-specific statewide rate'};
    if(row[1]!==statewideRate)
      return {ok:false,reason:'year-specific displayed statewide total '+row[1]+' differs from '+statewideRate};
    const required='Local and statewide reports disagree (local '+rate+' vs statewide '+statewideRate+')';
    if(!row[4].includes(required))
      return {ok:false,reason:'year-specific source conflict not disclosed as local '+rate};
  } else {
    if(row[1]!==String(rate))
      return {ok:false,reason:'year-specific displayed total rate '+row[1]+' does not match verified '+rate};
    if(!row[4].includes('Locally verified; absent from statewide file.'))
      return {ok:false,reason:'year-specific local supplement was not labeled'};
  }
  return {ok:true,reason:null};
}
