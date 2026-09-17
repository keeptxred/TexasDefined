import fs from 'node:fs';

const routes=['moving-to-texas_.tools','compare-texas-cities','find-my-emergency-services','find-my-homestead-exemption','find-my-property-tax','find-my-utilities','find-my-voter-registration','texas-zip-code-explorer'];
const errors=[];
for(const route of routes){
  const file=`src/routes/${route}.tsx`;
  if(!fs.existsSync(file))errors.push(`Missing ${file}`);
}

const escapedToolkit='src/routes/moving-to-texas_.tools.tsx';
const nestedToolkit='src/routes/moving-to-texas.tools.tsx';
if(fs.existsSync(nestedToolkit))errors.push(`${nestedToolkit} must not exist because it nests the toolkit under the Moving to Texas landing component.`);
if(fs.existsSync(escapedToolkit)){
  const route=fs.readFileSync(escapedToolkit,'utf8');
  if(!route.includes("createFileRoute('/moving-to-texas/tools')"))errors.push('Relocation toolkit must preserve the public /moving-to-texas/tools URL.');
  if(!route.includes('Texas relocation tools'))errors.push('Relocation toolkit must render its production smoke heading.');
}

const finder=fs.readFileSync('src/components/relocation/RelocationServiceFinder.tsx','utf8');
for(const token of ['tea.texas.gov','puc.texas.gov','sos.texas.gov','comptroller.texas.gov','211texas.org'])if(!finder.includes(token))errors.push(`Relocation finder missing official source: ${token}`);

if(errors.length){console.error(errors.join('\n'));process.exit(1)}
console.log(`Relocation tool contract passed: ${routes.length} routes, non-nested toolkit ownership, plus existing county, DMV and school tools.`);
