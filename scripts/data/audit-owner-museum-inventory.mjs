#!/usr/bin/env node
// Audit the owner-supplied concatenated names against canonical museum destination
// source records. Do NOT create museum pages directly from inferred names.
import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { segmentOwnerMuseumNames, ownerMuseumIdentityKey, provisionalIdentityIssues } from "./museum-owner-inventory-parser.mjs";
const normalize=ownerMuseumIdentityKey;
const owner="docs/museums/owner-submitted-museum-names-20261012.txt";
const raw=readFileSync(owner,"utf8").replace(/\r/g,"").trim();
const files=readdirSync("src/data").filter(x=>/museum|destination/i.test(x)&&x.endsWith(".ts"));
const records=[];
for(const file of files){
 const txt=readFileSync(join("src/data",file),"utf8");
 for(const match of txt.matchAll(/\bslug:\s*"([a-z0-9-]+)"\s*,\s*name:\s*"([^"]+)"/g)){
  if(file.startsWith("museum-expansion")||/museum|art|heritage|history|science|cultural|hall of fame/i.test(match[2]))
   records.push({slug:match[1],name:match[2],file});
 }
}
// Existing authority dossier entries use name-before-slug data objects; discover them
// explicitly, otherwise the owner audit falsely reports researched museum names as missing.
const dossierText=readFileSync("src/data/museum-authority-network.ts","utf8");
const dossierEntries=[...dossierText.matchAll(/^  "([a-z0-9-]+)": \{\s*\n\s*name:\s*"([^"]+)"/gm)]
 .map((m)=>({slug:m[1],name:m[2],file:"src/data/museum-authority-network.ts",authorityDossier:true}));
records.push(...dossierEntries);
const authorityDossiers=new Set(dossierEntries.map(r=>r.slug));
const bySlug=new Map(records.map(r=>[r.slug,r]));
const normNames=new Map(records.map(r=>[normalize(r.name),r]));
const aliases={
 "bob bullock texas state history museum":"bullock-texas-state-history-museum",
 "museum of big bend":"museum-of-the-big-bend-alpine",
 "museum of natural science houston":"houston-museum-of-natural-science",
 "kimball art museum":"kimbell-art-museum",
 "african american museum of dallas":"african-american-museum-dallas-fair-park",
 "maritime museum of texas":"texas-maritime-museum-rockport",
 "admiral nimitz gallery":"national-museum-pacific-war",
 "angelina county history center":"the-history-center-diboll",
 "babe didrikson zaharias museum":"babe-didrikson-zaharias-museum-beaumont"
};
const byAlias=new Map(Object.entries(aliases).map(([name,slug])=>[normalize(name),slug]));
const parts=segmentOwnerMuseumNames(raw);
const issueNames=[
 ["mabee-gerrer","Oklahoma location flagged by owner"],
 ["museum of the red river","Owner explicitly marked Oklahoma skip"],
 ["museum of the western prairie","Owner explicitly marked skip"],
 ["mid-america museum of aviation","Owner explicitly marked out-of-state substitution"],
 ["southern new mexico wing","New Mexico location needs exclusion"],
 ["cade museum of science","Cade Museum for Creativity & Invention is in Gainesville, Florida; not a Texas destination"],
 ["art museum of the americas","Organization of American States art museum is in Washington, DC; exclude from Texas"],
 ["texas association of museums exhibit","Professional association is not itself a confirmed visitable museum"]
];
const firstOccurrenceByName=new Map();
const rows=parts.map((title,index)=>{
 const key=normalize(title);
 const firstOccurrence=firstOccurrenceByName.get(key)??null;
 if(firstOccurrence===null)firstOccurrenceByName.set(key,index+1);
 const existing=normNames.get(key),alias=byAlias.get(key);
 const error=issueNames.find(([phrase])=>title.toLowerCase().includes(phrase))?.[1]??null;
 const parseIssues=provisionalIdentityIssues(title);
 return {submittedName:title,rawOccurrence:index+1,duplicateOfOccurrence:firstOccurrence,
         canonicalSlug:existing?.slug??(bySlug.has(alias)?alias:null),
         catalogFile:existing?.file??null,status:error?"identity-or-geography-problem":authorityDossiers.has(existing?.slug??alias)?"existing-authority-dossier-needs-independent-certification":existing||bySlug.has(alias)?"existing-destination-needs-authority-audit":"requires-independent-source-research",
         ...(error?{warning:error}:{}),parseIssues,publicationApproved:false};
});
// Keep every submitted occurrence in rows, including repeat names: nothing from
// the malformed raw source may be silently removed by reconciliation.
const seenNames=new Set();
const distinct=rows.filter(row=>{
  const key=normalize(row.submittedName);
  if(seenNames.has(key)) return false;
  seenNames.add(key);
  return true;
});
const repeatedOccurrences=rows.filter(row=>row.duplicateOfOccurrence!==null);
const unresolved=distinct.filter(r=>r.status==="requires-independent-source-research");
const flagged=distinct.filter(r=>r.status==="identity-or-geography-problem");
const known=distinct.filter(r=>r.status==="existing-destination-needs-authority-audit");
const dossiersAlready=distinct.filter(r=>r.status==="existing-authority-dossier-needs-independent-certification");
if(records.length<50||!raw.includes("1940 Air Terminal Museum"))throw Error("Museum catalog or supplied inventory is missing");
const report={generatedAt:"2026-10-14",rawChars:raw.length,sourceCatalogFiles:files.length,
  sourceMuseumDestinationRecords:records.length,uniqueSourceSlugs:bySlug.size,
  nameSegments:parts.length,uniqueNameSegments:distinct.length,
  repeatedSubmittedNameOccurrences:repeatedOccurrences.length,
  repeatedSubmittedNames:repeatedOccurrences.map(({submittedName,rawOccurrence,duplicateOfOccurrence})=>({submittedName,rawOccurrence,duplicateOfOccurrence})),
  matchingExistingRecords:known.length,matchingExistingAuthorityDossiers:dossiersAlready.length,requiringIndependentResearch:unresolved.length,
  flaggedOutOfStateOrAmbiguous:flagged.length,
  duplicateCanonicalSlugs:[...new Set(records.filter((r,i)=>records.findIndex(v=>v.slug===r.slug)!==i).map(r=>r.slug))],
  flagged,unresolved,known,dossiersAlready,rows,uniqueRows:distinct,
  notice:"Raw names were concatenated without separators. Every candidate is provisional, including parser boundaries and name aliases; this report is a COMPLETE reconciliation backlog, never authority certification or permission to publish."};
console.log(JSON.stringify(report,null,2));
