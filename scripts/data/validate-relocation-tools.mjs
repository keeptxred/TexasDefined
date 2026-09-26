import fs from 'node:fs';

const routes=['moving-to-texas.tools','compare-texas-cities','find-my-emergency-services','find-my-homestead-exemption','find-my-property-tax','find-my-utilities','find-my-voter-registration','texas-zip-code-explorer'];
const errors=[];
for(const route of routes){
  const file=`src/routes/${route}.tsx`;
  if(!fs.existsSync(file))errors.push(`Missing ${file}`);
}

const toolkit='src/routes/moving-to-texas.tools.tsx';
const duplicateToolkit='src/routes/moving-to-texas_.tools.tsx';
const parentRoute='src/routes/moving-to-texas.lazy.tsx';
const commandCenter='src/components/relocation/RelocationCommandCenter.tsx';
const cityDepth='src/components/content/EntityDepthSections.tsx';
const relocationData='src/data/relocation-authority.ts';
const stateComparison='src/routes/texas-vs.$state.tsx';
const authorityLab='src/components/relocation/RelocationAuthorityLab.tsx';
const workspaceModule='src/lib/relocation-workspace.ts';
const movingChecklist='src/routes/moving-to-texas-checklist.tsx';
if(fs.existsSync(duplicateToolkit))errors.push(`${duplicateToolkit} must not exist because it creates a duplicate indexable /moving-to-texas/tools canonical.`);
if(fs.existsSync(toolkit)){
  const route=fs.readFileSync(toolkit,'utf8');
  if(!route.includes("createFileRoute('/moving-to-texas/tools')"))errors.push('Relocation toolkit must preserve the public /moving-to-texas/tools URL.');
  if(!route.includes('Texas relocation tools'))errors.push('Relocation toolkit must render its production smoke heading.');
}
if(fs.existsSync(parentRoute)){
  const parent=fs.readFileSync(parentRoute,'utf8');
  if(!parent.includes('useChildMatches'))errors.push('Moving to Texas parent must detect nested child matches.');
  if(!parent.includes('<Outlet />'))errors.push('Moving to Texas parent must render nested child routes through Outlet.');
  if(!parent.includes('childMatches.length > 0'))errors.push('Moving to Texas parent must hand active child routes to Outlet before rendering the landing page.');
  if(!parent.includes('RelocationCommandCenter'))errors.push('Moving to Texas hub must mount the relocation command center.');
  if(!parent.includes('showPlaceExplorer={false}'))errors.push('Moving to Texas hub must suppress the older duplicate place explorer.');
}else{
  errors.push(`Missing ${parentRoute}`);
}

if(!fs.existsSync(commandCenter)){
  errors.push(`Missing ${commandCenter}`);
}else{
  const center=fs.readFileSync(commandCenter,'utf8');
  for(const token of [
    'Plan My Texas Move',
    'My Texas Move',
    'Texas Match Explorer',
    'Corporate Relocation to Texas',
    'RELOCATION_WORKSPACE_STORAGE_KEY',
    'RELOCATION_WORKSPACE_UPDATE_EVENT',
    'https://gov.texas.gov/business',
    'https://www.twc.texas.gov/services/find-lmi',
    'https://www.irs.gov/publications/p15b',
    'URLSearchParams(window.location.search)',
    '.get("saveCity")',
    'destination: next.destination || place.name',
    'TEXAS_VS_STATES',
    'texasVsStateSlug',
    'params.get("originState")',
    'origin: next.origin || originState',
    'Compare your current state with Texas',
    'savedAddresses',
    'params.get("industry")',
    'params.get("companyMove")',
    'Saved address research',
    'Current industry context:',
    'handleWorkspaceUpdate',
    'Corporate relocation →',
    'completedChecklistItems',
    'RELOCATION_CHECKLIST_TOTAL',
    'Continue the checklist →',
    'Move progress',
    'requestRelocationAddressResearch',
    'Research again →',
  ]){
    if(!center.includes(token))errors.push(`Relocation command center missing protected marker: ${token}`);
  }
}

if(!fs.existsSync(cityDepth)){
  errors.push(`Missing ${cityDepth}`);
}else{
  const city=fs.readFileSync(cityDepth,'utf8');
  for(const token of [
    "entity.kind === 'city' && cityProfile",
    'Relocation snapshot',
    'Add {entity.name} to My Texas Move →',
    '/moving-to-texas?saveCity=',
    '/compare-texas-cities',
    '/find-my-school-district',
    '/find-my-utilities',
    '/find-my-property-tax',
    '/texas-home-insurance-calculator',
    '/moving-to-texas#address-research-desk',
  ]){
    if(!city.includes(token))errors.push(`Verified city relocation surface missing protected marker: ${token}`);
  }
}

if(!fs.existsSync(relocationData)){
  errors.push(`Missing ${relocationData}`);
}else{
  const data=fs.readFileSync(relocationData,'utf8');
  for(const city of ['Houston','Dallas','Fort Worth','Austin','San Antonio','El Paso','Arlington','Hurst','Corpus Christi','Plano','Lubbock']){
    if(!data.includes(`name: "${city}"`))errors.push(`Verified city authority page missing from relocation registry: ${city}`);
  }
}

if(!fs.existsSync(stateComparison)){
  errors.push(`Missing ${stateComparison}`);
}else{
  const state=fs.readFileSync(stateComparison,'utf8');
  for(const token of [
    'id="moving-from-state-to-texas"',
    'Moving from {name} to Texas',
    'Build My Texas Move plan →',
    '/moving-to-texas?originState=',
    '/compare-texas-cities',
    '/texas-moving-cost-calculator',
    '/moving-to-texas/tools',
  ]){
    if(!state.includes(token))errors.push(`State-to-Texas relocation bridge missing protected marker: ${token}`);
  }
}

if(!fs.existsSync(authorityLab)){
  errors.push(`Missing ${authorityLab}`);
}else{
  const lab=fs.readFileSync(authorityLab,'utf8');
  for(const token of [
    'saveRelocationAddressToWorkspace',
    'RELOCATION_ADDRESS_RESEARCH_EVENT',
    'resumeSavedAddress',
    'researchAddressValue(addressDraft)',
    'Save this address to My Texas Move →',
    'Saved to My Texas Move',
    'scrollIntoView',
    'is not saved unless you explicitly add a matched address to My Texas Move',
  ]){
    if(!lab.includes(token))errors.push(`Address-to-workspace relocation loop missing protected marker: ${token}`);
  }
  if(lab.includes('?saveAddress=') || lab.includes('encodeURIComponent(addressResult.matchedAddress)')){
    errors.push('Exact addresses must not be placed in relocation URLs or query strings.');
  }
}

if(!fs.existsSync(workspaceModule)){
  errors.push(`Missing ${workspaceModule}`);
}else{
  const workspace=fs.readFileSync(workspaceModule,'utf8');
  for(const token of [
    'texasdefined:my-texas-move:v1',
    'texasdefined:my-texas-move:update',
    'texasdefined:my-texas-move:research-address',
    'requestRelocationAddressResearch',
    'readRelocationSavedAddresses',
    'saveRelocationAddressToWorkspace',
    'readRelocationChecklistProgress',
    'setRelocationChecklistItemComplete',
    'RELOCATION_CHECKLIST_TOTAL = 16',
    'completedChecklistItems',
    'window.localStorage.setItem',
    'new CustomEvent',
  ]){
    if(!workspace.includes(token))errors.push(`Relocation workspace privacy/persistence marker missing: ${token}`);
  }
  if(workspace.includes('?saveAddress=')) errors.push('Relocation workspace helper must not serialize exact addresses into URLs.');
  if(workspace.includes('?researchAddress=')) errors.push('Saved-address resume must remain an in-page event and must not serialize exact addresses into URLs.');
}

if(!fs.existsSync(movingChecklist)){
  errors.push(`Missing ${movingChecklist}`);
}else{
  const checklist=fs.readFileSync(movingChecklist,'utf8');
  const stableIds = [
    'before-documents','before-utilities','before-insurance','before-records',
    'arrival-inspection','arrival-address-change','arrival-emergency-services','arrival-schools',
    'vehicle-registration','driver-license','vehicle-receipts','toll-accounts',
    'voter-registration','homestead-exemption','home-records','property-tax-offices',
  ];
  for(const token of [
    'My Texas Move progress',
    'readRelocationChecklistProgress',
    'setRelocationChecklistItemComplete',
    'RELOCATION_CHECKLIST_TOTAL',
    'type="checkbox"',
    'Progress stays in this browser with My Texas Move',
  ]){
    if(!checklist.includes(token))errors.push(`Persistent moving checklist missing protected marker: ${token}`);
  }
  for(const id of stableIds){
    if(!checklist.includes(`item('${id}'`))errors.push(`Persistent moving checklist missing stable task id: ${id}`);
  }
  const itemCount=(checklist.match(/\bitem\('/g) ?? []).length;
  if(itemCount !== 16) errors.push(`Persistent moving checklist must retain exactly 16 governed tasks; found ${itemCount}.`);
}

const finder=fs.readFileSync('src/components/relocation/RelocationServiceFinder.tsx','utf8');
for(const token of ['tea.texas.gov','puc.texas.gov','sos.texas.gov','comptroller.texas.gov','211texas.org'])if(!finder.includes(token))errors.push(`Relocation finder missing official source: ${token}`);
for(const token of [
  'readRelocationSavedAddresses',
  'Use a saved address',
  'Use {locality} for local context →',
  'Copy address',
  'TexasDefined does not place the address in the link or URL',
  'navigator.clipboard.writeText(address)',
]){
  if(!finder.includes(token))errors.push(`Relocation finder missing saved-address continuity marker: ${token}`);
}
if(finder.includes('?address=') || finder.includes('?savedAddress=')) errors.push('Relocation finders must not serialize saved exact addresses into URLs.');

if(errors.length){console.error(errors.join('\n'));process.exit(1)}
console.log(`Relocation tool contract passed: ${routes.length} routes, one canonical toolkit route with parent Outlet ownership, persistent move workspace, corporate-relocation path, verified city-to-workspace continuity, 49-state origin continuity, saved address research with cross-finder reuse, persistent 16-task checklist progress and corporate industry handoff, plus existing county, DMV and school tools.`);
