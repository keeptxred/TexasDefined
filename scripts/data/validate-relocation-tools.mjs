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
}else{
  errors.push(`Missing ${parentRoute}`);
}

const finder=fs.readFileSync('src/components/relocation/RelocationServiceFinder.tsx','utf8');
for(const token of ['tea.texas.gov','puc.texas.gov','sos.texas.gov','comptroller.texas.gov','211texas.org'])if(!finder.includes(token))errors.push(`Relocation finder missing official source: ${token}`);

if(errors.length){console.error(errors.join('\n'));process.exit(1)}
console.log(`Relocation tool contract passed: ${routes.length} routes, one canonical toolkit route with parent Outlet ownership, plus existing county, DMV and school tools.`);
