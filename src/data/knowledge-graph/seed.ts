import type { TexasEntityRecord } from './types';
import { MAJOR_TEXAS_SPORTS_VENUES } from './major-sports-venues';
import { TEXAS_SPORTS_VENUE_TIER2_ENTITIES } from './sports-venues-tier2';

const checkedAt = '2026-08-04';
const official = (record: Omit<TexasEntityRecord, 'sourceConfidence' | 'sourceCheckedAt'>): TexasEntityRecord => ({
  ...record,
  sourceConfidence: 'official',
  sourceCheckedAt: checkedAt,
});

export const TEXAS_REGION_ENTITIES: TexasEntityRecord[] = [
  ['panhandle','Texas Panhandle'],['south-plains','South Plains'],['north-texas','North Texas'],
  ['east-texas','East Texas'],['central-texas','Central Texas'],['hill-country','Texas Hill Country'],
  ['gulf-coast','Texas Gulf Coast'],['south-texas','South Texas'],['west-texas','West Texas'],
  ['rio-grande-valley','Rio Grande Valley'],['big-bend','Big Bend Country'],['piney-woods','Piney Woods'],
].map(([slug,name]) => official({
  id:`region:${slug}`, kind:'region', name, slug, aliases:[], sourceId:'texasdefined-regions',
  status:'active', relationships:[], tags:['geography'],
}));

export const TEXAS_NATURE_ENTITIES: TexasEntityRecord[] = [
  official({id:'lake:caddo-lake',kind:'lake',name:'Caddo Lake',slug:'caddo-lake',aliases:[],countySlug:'harrison',region:'piney-woods',coordinates:{latitude:32.7043,longitude:-94.1302},officialUrl:'https://tpwd.texas.gov/state-parks/caddo-lake',sourceId:'tpwd-parks',status:'active',relationships:[{type:'located-in-region',targetId:'region:piney-woods'},{type:'has-associated-park',targetId:'state-park:caddo-lake-state-park'}],tags:['paddling','fishing','wetlands']}),
  official({id:'river:rio-grande',kind:'river',name:'Rio Grande',slug:'rio-grande',aliases:['Río Bravo'],region:'south-texas',sourceId:'usgs-water',status:'active',relationships:[{type:'forms-border-with',targetId:'country:mexico'}],tags:['river','border']}),
  official({id:'state-park:palo-duro-canyon-state-park',kind:'state-park',name:'Palo Duro Canyon State Park',slug:'palo-duro-canyon-state-park',aliases:['Palo Duro'],countySlug:'randall',region:'panhandle',coordinates:{latitude:34.937,longitude:-101.658},officialUrl:'https://tpwd.texas.gov/state-parks/palo-duro-canyon',sourceId:'tpwd-parks',status:'active',relationships:[{type:'located-in-county',targetId:'county:randall'},{type:'located-in-region',targetId:'region:panhandle'}],tags:['hiking','camping','canyon']}),
  official({id:'state-park:enchanted-rock-state-natural-area',kind:'state-park',name:'Enchanted Rock State Natural Area',slug:'enchanted-rock-state-natural-area',aliases:['Enchanted Rock'],countySlug:'gillespie',region:'hill-country',coordinates:{latitude:30.5063,longitude:-98.8199},officialUrl:'https://tpwd.texas.gov/state-parks/enchanted-rock',sourceId:'tpwd-parks',status:'active',relationships:[{type:'located-in-county',targetId:'county:gillespie'},{type:'located-in-region',targetId:'region:hill-country'}],tags:['hiking','granite-dome']}),
  official({id:'national-park:big-bend-national-park',kind:'national-park',name:'Big Bend National Park',slug:'big-bend-national-park',aliases:['Big Bend'],countySlug:'brewster',region:'big-bend',coordinates:{latitude:29.25,longitude:-103.25},officialUrl:'https://www.nps.gov/bibe/',sourceId:'nps-texas',status:'active',relationships:[{type:'located-in-county',targetId:'county:brewster'},{type:'located-in-region',targetId:'region:big-bend'}],tags:['national-park','desert','mountains']}),
  official({id:'national-forest:sam-houston-national-forest',kind:'national-forest',name:'Sam Houston National Forest',slug:'sam-houston-national-forest',aliases:[],region:'east-texas',officialUrl:'https://www.fs.usda.gov/texas',sourceId:'usfs-texas',status:'active',relationships:[{type:'located-in-region',targetId:'region:east-texas'}],tags:['forest','hiking','camping']}),
  official({id:'cavern:natural-bridge-caverns',kind:'cavern',name:'Natural Bridge Caverns',slug:'natural-bridge-caverns',aliases:[],countySlug:'comal',region:'hill-country',coordinates:{latitude:29.6926,longitude:-98.3427},officialUrl:'https://naturalbridgecaverns.com/',sourceId:'official-destination-sites',status:'active',relationships:[{type:'located-in-county',targetId:'county:comal'}],tags:['cavern','attraction']}),
  official({id:'beach:padre-island-national-seashore',kind:'beach',name:'Padre Island National Seashore',slug:'padre-island-national-seashore',aliases:['PINS'],countySlug:'nueces',region:'gulf-coast',coordinates:{latitude:27.107,longitude:-97.354},officialUrl:'https://www.nps.gov/pais/',sourceId:'nps-texas',status:'active',relationships:[{type:'located-in-region',targetId:'region:gulf-coast'}],tags:['beach','national-seashore','wildlife']}),
];

export const TEXAS_TOURISM_ENTITIES: TexasEntityRecord[] = [
  official({id:'historic-site:the-alamo',kind:'historic-site',name:'The Alamo',slug:'the-alamo',aliases:['Alamo Mission'],countySlug:'bexar',region:'south-texas',coordinates:{latitude:29.4257,longitude:-98.4861},officialUrl:'https://www.thealamo.org/',sourceId:'official-destination-sites',status:'active',relationships:[{type:'located-in-city',targetId:'city:san-antonio'},{type:'located-in-county',targetId:'county:bexar'}],tags:['history','mission','battlefield']}),
  official({id:'museum:bullock-texas-state-history-museum',kind:'museum',name:'Bullock Texas State History Museum',slug:'bullock-texas-state-history-museum',aliases:['Bullock Museum'],countySlug:'travis',region:'central-texas',coordinates:{latitude:30.2803,longitude:-97.7392},officialUrl:'https://www.thestoryoftexas.com/',sourceId:'official-destination-sites',status:'active',relationships:[{type:'located-in-city',targetId:'city:austin'}],tags:['museum','texas-history']}),
  official({id:'mission:san-jose',kind:'mission',name:'Mission San José',slug:'mission-san-jose',aliases:['Queen of the Missions'],countySlug:'bexar',region:'south-texas',officialUrl:'https://www.nps.gov/saan/',sourceId:'nps-texas',status:'active',relationships:[{type:'part-of',targetId:'historic-site:san-antonio-missions'}],tags:['mission','world-heritage']}),
  official({id:'scenic-drive:river-road-big-bend',kind:'scenic-drive',name:'River Road through Big Bend Ranch State Park',slug:'river-road-big-bend',aliases:['FM 170 River Road'],region:'big-bend',officialUrl:'https://tpwd.texas.gov/state-parks/big-bend-ranch',sourceId:'tpwd-parks',status:'active',relationships:[{type:'located-in-region',targetId:'region:big-bend'}],tags:['scenic-drive','road-trip']}),
];

export const TEXAS_EVENT_ENTITIES: TexasEntityRecord[] = [
  official({id:'fair:state-fair-of-texas',kind:'fair',name:'State Fair of Texas',slug:'state-fair-of-texas',aliases:['Texas State Fair'],countySlug:'dallas',region:'north-texas',officialUrl:'https://bigtex.com/',sourceId:'official-event-sites',status:'seasonal',relationships:[{type:'held-at',targetId:'fairground:fair-park'},{type:'located-in-city',targetId:'city:dallas'}],tags:['fair','food','annual-event']}),
  official({id:'rodeo:houston-livestock-show-and-rodeo',kind:'rodeo',name:'Houston Livestock Show and Rodeo',slug:'houston-livestock-show-and-rodeo',aliases:['RodeoHouston'],countySlug:'harris',region:'gulf-coast',officialUrl:'https://www.rodeohouston.com/',sourceId:'official-event-sites',status:'seasonal',relationships:[{type:'held-at',targetId:'sports-venue:nrg-stadium'},{type:'located-in-city',targetId:'city:houston'}],tags:['rodeo','livestock','concerts']}),
  official({id:'festival:wurstfest',kind:'festival',name:'Wurstfest',slug:'wurstfest',aliases:[],countySlug:'comal',region:'hill-country',officialUrl:'https://wurstfest.com/',sourceId:'official-event-sites',status:'seasonal',relationships:[{type:'located-in-city',targetId:'city:new-braunfels'}],tags:['festival','german-heritage','food']}),
  official({id:'fairground:fair-park',kind:'fairground',name:'Fair Park',slug:'fair-park',aliases:[],countySlug:'dallas',region:'north-texas',coordinates:{latitude:32.7795,longitude:-96.7641},officialUrl:'https://www.fairparkdallas.com/',sourceId:'official-destination-sites',status:'active',relationships:[{type:'located-in-city',targetId:'city:dallas'}],tags:['fairground','historic-site']}),
  {id:'sports-venue:nrg-stadium',kind:'sports-venue',name:'Reliant Stadium',slug:'reliant-stadium',aliases:['NRG Stadium','Houston Stadium'],description:'Reliant Stadium in Houston is one of Texas\'s largest sports and event destinations, serving as the home of the Houston Texans and the signature stadium for RODEOHOUSTON while also hosting international soccer, concerts and other major events. Its scale and event calendar make it a major Gulf Coast travel draw.',countySlug:'harris',region:'gulf-coast',coordinates:{latitude:29.6847,longitude:-95.4107},officialUrl:'https://www.houstontexans.com/stadium/a-z-guide',sourceId:'official-destination-sites',sourceConfidence:'official',sourceCheckedAt:'2026-08-13',status:'active',relationships:[{type:'located-in-city',targetId:'city:houston'},{type:'located-in-county',targetId:'county:harris'}],tags:['stadium','sports','events','professional','football','nfl','rodeo','major-tourist-draw']},
];

export const CURATED_KNOWLEDGE_GRAPH_SEED = [
  ...TEXAS_REGION_ENTITIES,
  ...TEXAS_NATURE_ENTITIES,
  ...TEXAS_TOURISM_ENTITIES,
  ...TEXAS_EVENT_ENTITIES,
  ...MAJOR_TEXAS_SPORTS_VENUES,
  ...TEXAS_SPORTS_VENUE_TIER2_ENTITIES,
];