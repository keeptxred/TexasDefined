export type KnowledgeBankSourceDomain =
  | 'open-data' | 'wildlife' | 'birds' | 'plants' | 'history' | 'demographics' | 'geography'
  | 'water' | 'transportation' | 'economy' | 'weather' | 'geology' | 'agriculture' | 'emergency-management';

export type KnowledgeBankSource = {
  id: string;
  domain: KnowledgeBankSourceDomain;
  authority: string;
  title: string;
  url: string;
  useFor: string[];
  canonical: boolean;
  notes?: string;
};

export const KNOWLEDGE_BANK_SOURCES: KnowledgeBankSource[] = [
  { id:'texas-open-data', domain:'open-data', authority:'State of Texas', title:'Texas Open Data Portal', url:'https://data.texas.gov/', useFor:['state datasets','agencies','economic and government facts'], canonical:true },
  { id:'tpwd-wildlife', domain:'wildlife', authority:'Texas Parks and Wildlife Department', title:'Texas wildlife information', url:'https://tpwd.texas.gov/huntwild/wild/species/', useFor:['wildlife','snakes','encounter guidance','habitat'], canonical:true },
  { id:'tpwd-plants', domain:'plants', authority:'Texas Parks and Wildlife Department', title:'Texas plants and ecosystems', url:'https://tpwd.texas.gov/huntwild/wild/wildlife_diversity/', useFor:['native plants','ecosystems','wildflowers'], canonical:true },
  { id:'ebird', domain:'birds', authority:'Cornell Lab of Ornithology', title:'eBird', url:'https://ebird.org/home', useFor:['bird occurrence','seasonality','recent sightings'], canonical:true, notes:'Use observation data with appropriate eBird terms and attribution.' },
  { id:'usfws-birds', domain:'birds', authority:'U.S. Fish and Wildlife Service', title:'Birds and migratory bird programs', url:'https://www.fws.gov/program/migratory-birds', useFor:['migratory birds','protected species'], canonical:true },
  { id:'texas-historical-commission', domain:'history', authority:'Texas Historical Commission', title:'Texas Historical Commission', url:'https://thc.texas.gov/', useFor:['historic sites','markers','Texas history'], canonical:true },
  { id:'tslac', domain:'history', authority:'Texas State Library and Archives Commission', title:'Texas State Library and Archives Commission', url:'https://www.tsl.texas.gov/', useFor:['state symbols','archives','government history'], canonical:true },
  { id:'texas-demographic-center', domain:'demographics', authority:'Texas Demographic Center', title:'Texas Demographic Center', url:'https://demographics.texas.gov/', useFor:['population','demographics','projections'], canonical:true },
  { id:'census', domain:'demographics', authority:'U.S. Census Bureau', title:'U.S. Census Bureau', url:'https://www.census.gov/', useFor:['county facts','town facts','population','geography'], canonical:true },
  { id:'tnris', domain:'geography', authority:'Texas Geographic Information Office', title:'Texas Geographic Information Office (TxGIO)', url:'https://geographic.texas.gov/', useFor:['maps','geography','GIS'], canonical:true, notes:'Stable internal source ID retained for compatibility; TNRIS was officially renamed the Texas Geographic Information Office (TxGIO).' },
  { id:'texas-water-data', domain:'water', authority:'Texas Water Development Board and partners', title:'Texas Water Data Hub', url:'https://txwaterdatahub.org/', useFor:['water','lakes','rivers','drought context'], canonical:true },
  { id:'txdot', domain:'transportation', authority:'Texas Department of Transportation', title:'TxDOT', url:'https://www.txdot.gov/', useFor:['roads','travel','transportation statistics'], canonical:true },
  { id:'texas-comptroller', domain:'economy', authority:'Texas Comptroller of Public Accounts', title:'Texas Comptroller', url:'https://comptroller.texas.gov/', useFor:['economy','business','tax and revenue facts'], canonical:true },
  { id:'noaa', domain:'weather', authority:'National Oceanic and Atmospheric Administration', title:'NOAA', url:'https://www.noaa.gov/', useFor:['climate','hurricane history','weather records'], canonical:true },
  { id:'nws-hurricanes', domain:'weather', authority:'National Weather Service', title:'Hurricane Safety', url:'https://www.weather.gov/safety/hurricane', useFor:['hurricane preparedness','warnings','safety'], canonical:true },
  { id:'usgs', domain:'geology', authority:'U.S. Geological Survey', title:'USGS', url:'https://www.usgs.gov/', useFor:['geology','earthquakes','geography','water'], canonical:true },
  { id:'texas-am-agrilife', domain:'agriculture', authority:'Texas A&M AgriLife Extension', title:'Texas A&M AgriLife Extension', url:'https://agrilifeextension.tamu.edu/', useFor:['pests','plants','home and garden','wildlife conflicts'], canonical:true },
  { id:'texas-am-fire-ants', domain:'agriculture', authority:'Texas A&M AgriLife Extension', title:'Texas Imported Fire Ant Research and Management', url:'https://fireant.tamu.edu/', useFor:['fire ants','pest management'], canonical:true },
  { id:'tdem-emergency', domain:'emergency-management', authority:'Texas Division of Emergency Management', title:'Texas Division of Emergency Management', url:'https://tdem.texas.gov/', useFor:['disaster preparedness','hurricane readiness','local emergency guidance'], canonical:true },
];

export function knowledgeSourcesForDomain(domain: KnowledgeBankSourceDomain) {
  return KNOWLEDGE_BANK_SOURCES.filter((source) => source.domain === domain);
}
