import fs from 'node:fs';

const routes=['moving-to-texas.tools','compare-texas-cities','find-my-emergency-services','find-my-homestead-exemption','find-my-property-tax','find-my-utilities','find-my-voter-registration','texas-zip-code-explorer'];
const errors=[];
for(const route of routes){
  const file=`src/routes/${route}.tsx`;
  if(!fs.existsSync(file))errors.push(`Missing ${file}`);
}

const toolkit='src/routes/moving-to-texas.tools.tsx';
const duplicateToolkit='src/routes/moving-to-texas_.tools.tsx';
const parentRoute='src/routes/moving-to-texas.lazy.tsx';\nconst commandCenter='src/components/relocation/RelocationCommandCenter.tsx';
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
  if(!parent.includes('childMatches.length > 0'))errors.push('Moving to Texas parent must hand active child routes to Outlet before rendering the landing page.');\n  if(!parent.includes('RelocationCommandCenter'))errors.push('Moving to Texas hub must mount the relocation command center.');
}else{
  errors.push(`Missing ${parentRoute}`);
}

if(!fs.existsSync(commandCenter)){\n  errors.push(`Missing ${commandCenter}`);\n}else{\n  const center=fs.readFileSync(commandCenter,'utf8');\n  for(const token of ['Plan My Texas Move','My Texas Move','Texas Match Explorer','Corporate Relocation to Texas','texasdefined:my-texas-move:v1','https://gov.texas.gov/business','https://www.twc.texas.gov/services/find-lmi','https://www.irs.gov/publications/p15b']){\n    if(!center.includes(token))errors.push(`Relocation command center missing protected marker: ${token}`);\n  }\n}\n\nconst finder=fs.readFileSync('src/components/relocation/RelocationServiceFinder.tsx','utf8');
for(const token of ['tea.texas.gov','puc.texas.gov','sos.texas.gov','comptroller.texas.gov','211texas.org'])if(!finder.includes(token))errors.push(`Relocation finder missing official source: ${token}`);

if(errors.length){console.error(errors.join('\n'));process.exit(1)}
console.log(`Relocation tool contract passed: ${routes.length} routes, one canonical toolkit route with parent Outlet ownership, persistent move workspace, corporate-relocation path, plus existing county, DMV and school tools.`);
