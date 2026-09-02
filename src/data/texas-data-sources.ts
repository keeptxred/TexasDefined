export type TexasDataDomain =
  | 'places' | 'counties' | 'regions' | 'water' | 'school-districts' | 'agencies'
  | 'parks' | 'forests' | 'wildlife' | 'utilities' | 'appraisal-districts' | 'tax-offices'
  | 'tourism' | 'events' | 'elections' | 'representatives';

export type TexasDataSource = {
  id: string;
  domain: TexasDataDomain;
  authority: string;
  title: string;
  url: string;
  format: 'api' | 'csv' | 'json' | 'html' | 'shared-platform' | 'curated';
  updateCadence: 'daily' | 'weekly' | 'monthly' | 'quarterly' | 'annual' | 'as-needed';
  canonical: boolean;
  notes: string;
};

export const TEXAS_DATA_SOURCES: TexasDataSource[] = [
  { id:'census-places', domain:'places', authority:'U.S. Census Bureau', title:'Texas incorporated places and census-designated places', url:'https://api.census.gov/data.html', format:'api', updateCadence:'annual', canonical:true, notes:'Use Census place GEOIDs, names, population estimates and geographic relationships.' },
  { id:'texas-metro-planning', domain:'places', authority:'Texas Department of Transportation', title:'Texas metropolitan planning organizations', url:'https://www.txdot.gov/about/partnerships/metropolitan-planning-organizations.html', format:'html', updateCadence:'quarterly', canonical:true, notes:'Use TxDOT MPO references to anchor metro-scale transportation-planning context; city and county jurisdiction remains represented by its own canonical entity.' },
  { id:'census-counties', domain:'counties', authority:'U.S. Census Bureau', title:'Texas county geography', url:'https://www.census.gov/geographies/reference-files/time-series/geo/gazetteer-files.html', format:'csv', updateCadence:'annual', canonical:true, notes:'Use official state and county FIPS codes and geographic identifiers.' },
  { id:'texas-counties-directory', domain:'counties', authority:'Texas Association of Counties', title:'Texas county information map and official county website links', url:'https://www.county.org/county-information-map', format:'html', updateCadence:'quarterly', canonical:true, notes:'Use the county-specific TAC profile to verify each county’s official website; TAC profiles link directly to the county website.' },
  { id:'texasdefined-regions', domain:'regions', authority:'TexasDefined editorial geography', title:'TexasDefined regional taxonomy', url:'https://texasdefined.com/explore', format:'curated', updateCadence:'annual', canonical:true, notes:'Editorial region groupings for navigation; county relationships remain grounded in official geography.' },
  { id:'explore-shared-catalog', domain:'tourism', authority:'TexasDefined and Keep TX Red shared Supabase catalog', title:'Published Explore destination catalog', url:'https://texasdefined.com/explore', format:'shared-platform', updateCadence:'daily', canonical:true, notes:'Public published or verified Explore records are mapped into the Texas knowledge graph at runtime and retain official destination links when available.' },
  { id:'usgs-water', domain:'water', authority:'U.S. Geological Survey', title:'National Hydrography and Texas water features', url:'https://www.usgs.gov/national-hydrography', format:'api', updateCadence:'quarterly', canonical:true, notes:'Use for canonical water-feature names and hydrographic relationships.' },
  { id:'tea-districts', domain:'school-districts', authority:'Texas Education Agency', title:'Texas school district directory and AskTED', url:'https://tea.texas.gov/texas-schools/general-information/askted', format:'csv', updateCadence:'monthly', canonical:true, notes:'Use TEA district identifiers, names, addresses and service regions.' },
  { id:'texas-agencies', domain:'agencies', authority:'State of Texas', title:'Texas state agency directory', url:'https://www.texas.gov/texas-agencies.html', format:'html', updateCadence:'quarterly', canonical:true, notes:'Canonical directory for state agencies and official websites.' },
  { id:'tpwd-parks', domain:'parks', authority:'Texas Parks and Wildlife Department', title:'Texas state parks directory', url:'https://tpwd.texas.gov/state-parks/parks-map', format:'html', updateCadence:'monthly', canonical:true, notes:'Use official park names, locations, reservations and closure information.' },
  { id:'tpwd-wildlife-species', domain:'wildlife', authority:'Texas Parks and Wildlife Department', title:'Texas wildlife species profiles and management references', url:'https://tpwd.texas.gov/huntwild/wild/species/', format:'html', updateCadence:'monthly', canonical:true, notes:'Use TPWD species profiles and current regulation pages for Texas distribution, habitat, conservation status and management context. Avoid copying time-sensitive hunting rules into evergreen species copy.' },
  { id:'nps-texas', domain:'parks', authority:'National Park Service', title:'National Park Service sites in Texas', url:'https://www.nps.gov/state/tx/index.htm', format:'html', updateCadence:'monthly', canonical:true, notes:'Use official federal park, seashore, monument and historic-site records.' },
  { id:'usfs-texas', domain:'forests', authority:'U.S. Forest Service', title:'National Forests and Grasslands in Texas', url:'https://www.fs.usda.gov/texas', format:'html', updateCadence:'monthly', canonical:true, notes:'Use official national-forest names, alerts and recreation information.' },
  { id:'official-destination-sites', domain:'tourism', authority:'Official destination operators', title:'Official Texas destination websites', url:'https://www.traveltexas.com/', format:'curated', updateCadence:'monthly', canonical:true, notes:'Registry entries must link to the destination owner, managing agency or official visitor source.' },
  { id:'official-event-sites', domain:'events', authority:'Official event operators', title:'Official Texas event websites', url:'https://www.traveltexas.com/events/', format:'curated', updateCadence:'weekly', canonical:true, notes:'Event dates and operational details must be verified against the official organizer.' },
  { id:'puc-utilities', domain:'utilities', authority:'Public Utility Commission of Texas', title:'Electric utility and retail electric provider information', url:'https://www.puc.texas.gov/industry/electric/', format:'html', updateCadence:'monthly', canonical:true, notes:'Use for regulated utility territories and official provider information.' },
  { id:'tceq-water', domain:'utilities', authority:'Texas Commission on Environmental Quality', title:'Public drinking water systems', url:'https://www.tceq.texas.gov/drinkingwater', format:'html', updateCadence:'monthly', canonical:true, notes:'Use for public water-system authority and compliance references.' },
  { id:'comptroller-appraisal-districts', domain:'appraisal-districts', authority:'Texas Comptroller of Public Accounts', title:'County appraisal district and tax assessor-collector directory', url:'https://comptroller.texas.gov/taxes/property-tax/county-directory/', format:'html', updateCadence:'quarterly', canonical:true, notes:'Use county-specific directory pages for appraisal district and tax assessor-collector names, phones, email, addresses, update dates and official website links.' },
  { id:'txdmv-tax-offices', domain:'tax-offices', authority:'Texas Department of Motor Vehicles', title:'County tax office directory', url:'https://www.txdmv.gov/tax-assessor-collectors/county-tax-offices', format:'html', updateCadence:'quarterly', canonical:true, notes:'Use for county tax office contacts and vehicle title/registration service verification.' },
  { id:'sos-elections', domain:'elections', authority:'Texas Secretary of State', title:'Texas elections and voter information', url:'https://www.sos.state.tx.us/elections/', format:'html', updateCadence:'as-needed', canonical:true, notes:'Use for official election dates, rules and county election contacts.' },
  { id:'keeptxred-government', domain:'representatives', authority:'Keep TX Red shared platform', title:'Texas representatives, districts, bills and elections', url:'https://keeptxred.com/representatives', format:'shared-platform', updateCadence:'daily', canonical:true, notes:'Political and legislative entities remain canonically owned by Keep TX Red.' },
];

export function sourcesForDomain(domain: TexasDataDomain) { return TEXAS_DATA_SOURCES.filter((source) => source.domain === domain); }

export function validateTexasDataSources() {
  const errors: string[] = [];
  const ids = new Set<string>();
  for (const source of TEXAS_DATA_SOURCES) {
    if (!source.id.trim()) errors.push('Every data source requires an ID.');
    if (ids.has(source.id)) errors.push(`Duplicate data source ID: ${source.id}`);
    ids.add(source.id);
    if (!source.url.startsWith('https://')) errors.push(`${source.id} must use HTTPS.`);
    if (!source.authority.trim()) errors.push(`${source.id} requires an authority.`);
    if (!source.canonical) errors.push(`${source.id} must explicitly identify canonical ownership.`);
  }
  const required: TexasDataDomain[] = ['places','counties','regions','water','school-districts','agencies','parks','forests','wildlife','utilities','appraisal-districts','tax-offices','tourism','events','elections','representatives'];
  for (const domain of required) if (!sourcesForDomain(domain).length) errors.push(`Missing authoritative source for ${domain}.`);
  return { valid: errors.length === 0, errors };
}