import fs from 'node:fs';
const routes=['moving-to-texas.tools','compare-texas-cities','find-my-emergency-services','find-my-homestead-exemption','find-my-property-tax','find-my-utilities','find-my-voter-registration','texas-zip-code-explorer'];
const errors=[];for(const route of routes){const file=`src/routes/${route}.tsx`;if(!fs.existsSync(file))errors.push(`Missing ${file}`)}
const finder=fs.readFileSync('src/components/relocation/RelocationServiceFinder.tsx','utf8');for(const token of ['tea.texas.gov','puc.texas.gov','sos.texas.gov','comptroller.texas.gov','211texas.org'])if(!finder.includes(token))errors.push(`Relocation finder missing official source: ${token}`);
if(errors.length){console.error(errors.join('\n'));process.exit(1)}console.log(`Relocation tool contract passed: ${routes.length} routes plus existing county, DMV and school tools.`);
