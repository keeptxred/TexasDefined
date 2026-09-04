import { TEXAS_COUNTIES, TEXAS_CITIES } from './texas-places';
import { TEXAS_DATA_SOURCES, type TexasDataDomain } from './texas-data-sources';
import { TEXAS_TOURNAMENT_ENTITIES } from './texas-tournaments';
import { CURATED_KNOWLEDGE_GRAPH_SEED } from './knowledge-graph/seed';
import { GENERATED_KNOWLEDGE_GRAPH_ENTITIES } from './knowledge-graph/generated';
import type { KnowledgeGraphValidation, TexasEntityKind, TexasEntityRecord } from './knowledge-graph/types';

export type { TexasEntityKind, TexasEntityRecord } from './knowledge-graph/types';

const slug=(value:string)=>value.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');
const checkedAt='2026-08-04';

export const CORE_TEXAS_AGENCIES: TexasEntityRecord[] = [
  {id:'agency:texas-comptroller',kind:'agency',name:'Texas Comptroller of Public Accounts',slug:'texas-comptroller',aliases:['Texas Comptroller','Comptroller of Public Accounts'],officialUrl:'https://comptroller.texas.gov/',description:'The Texas Comptroller of Public Accounts is the state agency responsible for collecting state taxes, overseeing state finances and providing public information on taxes, revenue and local government finance.',tags:['state taxes','sales tax','property taxes','state finances'],sourceId:'texas-agencies',sourceConfidence:'official',sourceCheckedAt:checkedAt,status:'active',relationships:[]},
  {id:'agency:texas-secretary-of-state',kind:'agency',name:'Texas Secretary of State',slug:'texas-secretary-of-state',aliases:['Texas SOS','Secretary of State of Texas'],officialUrl:'https://www.sos.state.tx.us/',description:'The Texas Secretary of State is the state office responsible for elections administration, business filings, state rules and records, and other official filings and public information services.',tags:['elections','business filings','state records','Texas Register'],sourceId:'texas-agencies',sourceConfidence:'official',sourceCheckedAt:checkedAt,status:'active',relationships:[]},
  {id:'agency:texas-dps',kind:'agency',name:'Texas Department of Public Safety',slug:'texas-dps',aliases:['Texas DPS','Department of Public Safety'],officialUrl:'https://www.dps.texas.gov/',description:'The Texas Department of Public Safety provides driver licensing, public-safety services, criminal records, emergency management support and statewide law-enforcement programs.',tags:['driver license','public safety','criminal records','law enforcement'],sourceId:'texas-agencies',sourceConfidence:'official',sourceCheckedAt:checkedAt,status:'active',relationships:[]},
  {id:'agency:texas-dmv',kind:'agency',name:'Texas Department of Motor Vehicles',slug:'texas-dmv',aliases:['Texas DMV','TxDMV'],officialUrl:'https://www.txdmv.gov/',description:'The Texas Department of Motor Vehicles oversees vehicle titles and registration, motor carriers, dealer licensing and other statewide motor-vehicle services.',tags:['vehicle registration','vehicle titles','motor carriers','dealer licensing'],sourceId:'texas-agencies',sourceConfidence:'official',sourceCheckedAt:checkedAt,status:'active',relationships:[]},
  {id:'agency:texas-parks-wildlife',kind:'agency',name:'Texas Parks and Wildlife Department',slug:'texas-parks-wildlife',aliases:['Texas Parks and Wildlife','TPWD'],officialUrl:'https://tpwd.texas.gov/',description:'The Texas Parks and Wildlife Department manages state parks, wildlife and fisheries programs, hunting and fishing licenses, conservation programs and outdoor recreation resources.',tags:['state parks','hunting','fishing','wildlife conservation'],sourceId:'texas-agencies',sourceConfidence:'official',sourceCheckedAt:checkedAt,status:'active',relationships:[]},
  {id:'agency:texas-workforce-commission',kind:'agency',name:'Texas Workforce Commission',slug:'texas-workforce-commission',aliases:['TWC','Texas Workforce'],officialUrl:'https://www.twc.texas.gov/',description:'The Texas Workforce Commission administers unemployment benefits, workforce services, employer programs and labor-market resources for Texas workers and businesses.',tags:['unemployment benefits','jobs','employers','workforce services'],sourceId:'texas-agencies',sourceConfidence:'official',sourceCheckedAt:checkedAt,status:'active',relationships:[]},
  {id:'agency:texas-education-agency',kind:'agency',name:'Texas Education Agency',slug:'texas-education-agency',aliases:['TEA','Texas Education'],officialUrl:'https://tea.texas.gov/',description:'The Texas Education Agency oversees the state public-school system, including school accountability, academic standards, district information, educator resources and statewide education data.',tags:['public schools','school districts','accountability','education data'],sourceId:'texas-agencies',sourceConfidence:'official',sourceCheckedAt:checkedAt,status:'active',relationships:[]},
  {id:'agency:public-utility-commission',kind:'agency',name:'Public Utility Commission of Texas',slug:'public-utility-commission',aliases:['PUCT','Texas Public Utility Commission'],officialUrl:'https://www.puc.texas.gov/',description:'The Public Utility Commission of Texas regulates the state electric, telecommunications, water and sewer utility industries and provides consumer information about regulated utility services.',tags:['electricity','utilities','telecommunications','consumer services'],sourceId:'texas-agencies',sourceConfidence:'official',sourceCheckedAt:checkedAt,status:'active',relationships:[]},
  {id:'agency:texas-commission-environmental-quality',kind:'agency',name:'Texas Commission on Environmental Quality',slug:'texas-commission-environmental-quality',aliases:['TCEQ','Texas Environmental Quality'],officialUrl:'https://www.tceq.texas.gov/',description:'The Texas Commission on Environmental Quality is the state environmental agency responsible for air, water, waste, permitting, compliance and environmental-quality programs across Texas.',tags:['air quality','water quality','environmental permits','waste'],sourceId:'texas-agencies',sourceConfidence:'official',sourceCheckedAt:checkedAt,status:'active',relationships:[]},
  {id:'agency:texas-general-land-office',kind:'agency',name:'Texas General Land Office',slug:'texas-general-land-office',aliases:['Texas GLO','General Land Office'],officialUrl:'https://www.glo.texas.gov/',description:'The Texas General Land Office manages state lands and mineral interests, the Permanent School Fund land portfolio, coastal programs, veterans land programs and disaster-recovery responsibilities.',tags:['state lands','coast','veterans land','disaster recovery'],sourceId:'texas-agencies',sourceConfidence:'official',sourceCheckedAt:checkedAt,status:'active',relationships:[]},
  {id:'agency:texas-department-insurance',kind:'agency',name:'Texas Department of Insurance',slug:'texas-department-insurance',aliases:['TDI','Texas Insurance Department'],officialUrl:'https://www.tdi.texas.gov/',description:'The Texas Department of Insurance regulates the state insurance industry, licenses insurance professionals, reviews insurance products and provides consumer information and complaint resources.',tags:['insurance','consumer complaints','insurance licensing','coverage'],sourceId:'texas-agencies',sourceConfidence:'official',sourceCheckedAt:checkedAt,status:'active',relationships:[]},
  {id:'agency:texas-health-human-services',kind:'agency',name:'Texas Health and Human Services',slug:'texas-health-human-services',aliases:['Texas HHS','HHSC','Texas Health and Human Services Commission'],officialUrl:'https://www.hhs.texas.gov/',description:'Texas Health and Human Services administers health and human-service programs including Medicaid, SNAP, TANF, behavioral health, disability services and other benefits for eligible Texans.',tags:['Medicaid','SNAP','benefits','health services'],sourceId:'texas-agencies',sourceConfidence:'official',sourceCheckedAt:checkedAt,status:'active',relationships:[]},
];

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
  ...TEXAS_TOURNAMENT_ENTITIES,
];

const kindDomain:Partial<Record<TexasEntityKind,TexasDataDomain>>={
  county:'counties',city:'places','census-place':'places','zip-code':'places',region:'regions','metro-area':'places',
  lake:'water',river:'water','state-park':'parks','national-park':'parks','national-forest':'forests','wildlife-management-area':'parks','wildlife-species':'wildlife',beach:'parks',mountain:'parks',cavern:'tourism',waterfall:'water',
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