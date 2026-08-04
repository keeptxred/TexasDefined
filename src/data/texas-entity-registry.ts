import { TEXAS_COUNTIES, TEXAS_CITIES } from './texas-places';
import { TEXAS_DATA_SOURCES, type TexasDataDomain } from './texas-data-sources';
import { CURATED_KNOWLEDGE_GRAPH_SEED } from './knowledge-graph/seed';
import { GENERATED_KNOWLEDGE_GRAPH_ENTITIES } from './knowledge-graph/generated';
import type { KnowledgeGraphValidation, TexasEntityKind, TexasEntityRecord } from './knowledge-graph/types';

export type { TexasEntityKind, TexasEntityRecord } from './knowledge-graph/types';

const slug=(value:string)=>value.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');
const checkedAt='2026-08-04';

export const CORE_TEXAS_AGENCIES: TexasEntityRecord[] = [
  ['texas-comptroller','Texas Comptroller of Public Accounts','https://comptroller.texas.gov/'],['texas-secretary-of-state','Texas Secretary of State','https://www.sos.state.tx.us/'],['texas-dps','Texas Department of Public Safety','https://www.dps.texas.gov/'],['texas-dmv','Texas Department of Motor Vehicles','https://www.txdmv.gov/'],['texas-parks-wildlife','Texas Parks and Wildlife Department','https://tpwd.texas.gov/'],['texas-workforce-commission','Texas Workforce Commission','https://www.twc.texas.gov/'],['texas-education-agency','Texas Education Agency','https://tea.texas.gov/'],['public-utility-commission','Public Utility Commission of Texas','https://www.puc.texas.gov/'],['texas-commission-environmental-quality','Texas Commission on Environmental Quality','https://www.tceq.texas.gov/'],['texas-general-land-office','Texas General Land Office','https://www.glo.texas.gov/'],['texas-department-insurance','Texas Department of Insurance','https://www.tdi.texas.gov/'],['texas-health-human-services','Texas Health and Human Services','https://www.hhs.texas.gov/'],
].map(([id,name,officialUrl])=>({id:`agency:${id}`,kind:'agency',name,slug:id,aliases:[],officialUrl,sourceId:'texas-agencies',sourceConfidence:'official',sourceCheckedAt:checkedAt,status:'active',relationships:[]}));

export const TEXAS_COUNTY_ENTITIES: TexasEntityRecord[] = TEXAS_COUNTIES.map(county=>({
  id:`county:${county.slug}`,kind:'county',name:county.name,slug:county.slug,aliases:[county.name.replace(/ County$/,'')],officialUrl:county.officialDirectoryUrl,sourceId:'census-counties',sourceConfidence:'official',sourceCheckedAt:checkedAt,status:'active',relationships:[{type:'has-appraisal-district',targetId:`appraisal-district:${county.slug}`},{type:'has-tax-office',targetId:`tax-office:${county.slug}`}]
}));

export const TEXAS_CITY_ENTITIES: TexasEntityRecord[] = TEXAS_CITIES.map(city=>({
  id:`city:${city.slug}`,kind:'city',name:city.name,slug:city.slug,aliases:[],countySlug:slug(city.county),region:slug(city.region),sourceId:'census-places',sourceConfidence:'high',sourceCheckedAt:checkedAt,status:'pending-source-verification',relationships:[{type:'located-in-county',targetId:`county:${slug(city.county)}`},{type:'located-in-region',targetId:`region:${slug(city.region)}`}]
}));

export const TEXAS_LOCAL_OFFICE_ENTITIES: TexasEntityRecord[] = TEXAS_COUNTIES.flatMap(county=>[
  {id:`appraisal-district:${county.slug}`,kind:'appraisal-district',name:`${county.name.replace(/ County$/,'')} Central Appraisal District`,slug:`${county.slug}-appraisal-district`,aliases:[`${county.name.replace(/ County$/,'')} CAD`],countySlug:county.slug,sourceId:'comptroller-appraisal-districts',sourceConfidence:'official',sourceCheckedAt:checkedAt,status:'pending-source-verification',relationships:[{type:'serves-county',targetId:`county:${county.slug}`}]},
  {id:`tax-office:${county.slug}`,kind:'tax-office',name:`${county.name} Tax Office`,slug:`${county.slug}-tax-office`,aliases:[`${county.name} Tax Assessor-Collector`],countySlug:county.slug,sourceId:'txdmv-tax-offices',sourceConfidence:'official',sourceCheckedAt:checkedAt,status:'pending-source-verification',relationships:[{type:'serves-county',targetId:`county:${county.slug}`}]},
]);

export const TEXAS_ENTITY_REGISTRY: TexasEntityRecord[] = [
  ...CORE_TEXAS_AGENCIES,
  ...TEXAS_COUNTY_ENTITIES,
  ...TEXAS_CITY_ENTITIES,
  ...TEXAS_LOCAL_OFFICE_ENTITIES,
  ...CURATED_KNOWLEDGE_GRAPH_SEED,
  ...GENERATED_KNOWLEDGE_GRAPH_ENTITIES,
];

const kindDomain:Partial<Record<TexasEntityKind,TexasDataDomain>>={
  county:'counties',city:'places','census-place':'places','zip-code':'places',region:'regions','metro-area':'places',
  lake:'water',river:'water','state-park':'parks','national-park':'parks','national-forest':'forests','wildlife-management-area':'parks',beach:'parks',mountain:'parks',cavern:'tourism',waterfall:'water',
  agency:'agencies','appraisal-district':'appraisal-districts','tax-office':'tax-offices','county-clerk':'counties','dps-office':'agencies',
  museum:'tourism','historic-site':'tourism',courthouse:'tourism',mission:'tourism',battlefield:'tourism',attraction:'tourism','scenic-drive':'tourism',
  fair:'events',rodeo:'events',festival:'events','holiday-event':'events','sporting-event':'events',fairground:'events','sports-venue':'events',
  'school-district':'school-districts',university:'agencies',utility:'utilities',
};

export function findTexasEntity(value:string){
  const normalized=slug(value);
  return TEXAS_ENTITY_REGISTRY.find(entity=>entity.id===value||entity.slug===normalized||entity.aliases.some(alias=>slug(alias)===normalized));
}

export function relationshipsFor(entityId:string){
  return TEXAS_ENTITY_REGISTRY.filter(entity=>entity.id===entityId||entity.relationships.some(relationship=>relationship.targetId===entityId));
}

export function texasDataCoverage(){return [...new Set(TEXAS_DATA_SOURCES.map(source=>source.domain))].map(domain=>{const records=TEXAS_ENTITY_REGISTRY.filter(entity=>kindDomain[entity.kind]===domain);return {domain,records:records.length,active:records.filter(record=>record.status==='active').length,pending:records.filter(record=>record.status==='pending-source-verification').length,sourceCount:TEXAS_DATA_SOURCES.filter(source=>source.domain===domain).length};});}

export function validateTexasEntityRegistry():KnowledgeGraphValidation{
  const errors:string[]=[];const warnings:string[]=[];const ids=new Set<string>();const slugs=new Map<string,string>();const sourceIds=new Set(TEXAS_DATA_SOURCES.map(source=>source.id));const countsByKind:Partial<Record<TexasEntityKind,number>>={};
  for(const record of TEXAS_ENTITY_REGISTRY){
    countsByKind[record.kind]=(countsByKind[record.kind]??0)+1;
    if(ids.has(record.id))errors.push(`Duplicate entity ID: ${record.id}`);ids.add(record.id);
    const slugOwner=slugs.get(record.slug);if(slugOwner&&slugOwner!==record.id)warnings.push(`Shared slug ${record.slug}: ${slugOwner}, ${record.id}`);else slugs.set(record.slug,record.id);
    if(!record.name.trim())errors.push(`${record.id} has no name.`);
    if(!record.slug.trim())errors.push(`${record.id} has no slug.`);
    if(!sourceIds.has(record.sourceId))errors.push(`${record.id} references unknown source ${record.sourceId}.`);
    if(record.officialUrl&&!record.officialUrl.startsWith('https://'))errors.push(`${record.id} official URL must use HTTPS.`);
    if(record.coordinates&&(record.coordinates.latitude < 25 || record.coordinates.latitude > 37 || record.coordinates.longitude < -107 || record.coordinates.longitude > -93))warnings.push(`${record.id} coordinates appear outside Texas.`);
    if(!record.aliases)errors.push(`${record.id} aliases must be an array.`);
    for(const relationship of record.relationships)if(!relationship.type.trim()||!relationship.targetId.trim())errors.push(`${record.id} has an invalid relationship.`);
  }
  for(const record of TEXAS_ENTITY_REGISTRY)for(const relationship of record.relationships){
    if(!ids.has(relationship.targetId)&&!relationship.targetId.startsWith('country:'))warnings.push(`${record.id} references entity not yet loaded: ${relationship.targetId}`);
  }
  if(TEXAS_COUNTY_ENTITIES.length!==254)errors.push(`Expected 254 county entities; found ${TEXAS_COUNTY_ENTITIES.length}.`);
  if(TEXAS_LOCAL_OFFICE_ENTITIES.length!==508)errors.push(`Expected 508 county-office placeholders; found ${TEXAS_LOCAL_OFFICE_ENTITIES.length}.`);
  if((countsByKind.region??0)<10)errors.push('Texas regional taxonomy is incomplete.');
  return {valid:errors.length===0,errors,warnings,countsByKind};
}
