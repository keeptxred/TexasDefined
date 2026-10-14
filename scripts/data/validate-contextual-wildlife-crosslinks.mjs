import fs from 'node:fs';
const article=fs.readFileSync('src/data/fixtures/texas-wildlife-guide.ts','utf8');
const birds=fs.readFileSync('src/components/editorial/TexasHomeNatureGuide.tsx','utf8');
const hunting=fs.readFileSync('src/components/hunting/HuntingAuthority.tsx','utf8');
const source=fs.readFileSync('src/data/knowledge-graph/wildlife-species.ts','utf8');
const sourceSlugs=['american-alligator','black-bear','bobcat','javelina','nine-banded-armadillo','ocelot','painted-bunting','roseate-spoonbill','wild-turkey'];
const failures=[];
for(const slug of sourceSlugs){
  if(!source.includes("slug: '"+slug+"'"))failures.push('Missing wildlife authority entity '+slug);
  if(!article.includes('href: "/wildlife-species/'+slug+'"'))failures.push('Statewide wildlife pillar lacks reciprocal discovery for '+slug);
}
for(const slug of ['painted-bunting','roseate-spoonbill','whooping-crane','wild-turkey'])
  if(!birds.includes('slug: "'+slug+'"'))failures.push('Birdwatching guide lacks relevant '+slug+' species link');
for(const slug of ['javelina','wild-turkey','white-tailed-deer','mule-deer','american-alligator'])
  if(!hunting.includes('slug: "'+slug+'"'))failures.push('Hunting species explanation lacks '+slug+' link');
if(!hunting.includes('Verify all current restrictions directly'))failures.push('Game-species links missing TPWD regulatory distinction');
if(failures.length){failures.forEach(x=>console.error('FAIL '+x));process.exit(1);}
console.log('PASS 9 focused wildlife pillar crosslinks, 4 birding species routes and 5 legal-safe hunting biology pathways');
