import fs from "node:fs";
import ts from "typescript";

const failures = [];
const warnings = [];
const dataPath = "src/data/historic-churches.ts";
const data = fs.readFileSync(dataPath, "utf8");
const source = ts.createSourceFile(dataPath, data, ts.ScriptTarget.Latest, true);
const findDeclaration = (name) => {
  for(const stmt of source.statements) {
    if(!ts.isVariableStatement(stmt)) continue;
    for(const dec of stmt.declarationList.declarations) if(dec.name.getText(source) === name) return dec;
  }
  return null;
};
const declaration = findDeclaration("historicChurches");
if(!declaration || !ts.isArrayLiteralExpression(declaration.initializer)) {
  console.error("Historic Church validation: missing static historicChurches array"); process.exit(1);
}
const records = declaration.initializer.elements;
const get = (node,key) => node.properties.find(p => ts.isPropertyAssignment(p) && p.name.getText(source).replace(/^["']|["']$/g,"") === key)?.initializer;
const val = (node) => node && ts.isStringLiteral(node) ? node.text : "";
const arr = (node) => node && ts.isArrayLiteralExpression(node) ? node.elements : [];
const slugs = new Set();
const required = ["slug","name","shortName","locality","county","denomination","summary","quickAnswer","foundation","presentBuilding","historicalContext","timeline","architecture","visitorNotes","significance","sources","faq","paintedStatus","related","reviewedOn"];
if(records.length<5) failures.push("Fewer than five initial church profiles");
for(const [index,node] of records.entries()){
  if(!ts.isObjectLiteralExpression(node)){failures.push("Church entry "+index+" is not a static object");continue}
  const slug = val(get(node,"slug"));
  if(!slug || slugs.has(slug)) failures.push("Duplicate/invalid slug "+slug);
  slugs.add(slug);
  for(const key of required) if(!get(node,key)) failures.push(slug+": missing "+key);
  if(val(get(node,"summary")).length<75) failures.push(slug+": thin summary");
  if(val(get(node,"quickAnswer")).length<140) failures.push(slug+": insufficient direct answer");
  for(const [key,minimum] of [["historicalContext",2],["timeline",4],["architecture",2],["visitorNotes",2],["significance",2],["sources",2],["faq",3],["related",1]]){
    if(arr(get(node,key)).length<minimum) failures.push(slug+": "+key+" below authority minimum "+minimum);
  }
  const faq = arr(get(node,"faq"));
  const faqQuestions = new Set();
  for(const item of faq) {
    if(!ts.isObjectLiteralExpression(item)) { failures.push(slug+": FAQ entry not a static object");continue; }
    const q=val(get(item,"question")), a=val(get(item,"answer"));
    if(q.length<15 || a.length<65) failures.push(slug+": incomplete FAQ answer or question");
    if(faqQuestions.has(q)) failures.push(slug+": repeated FAQ question");
    faqQuestions.add(q);
  }
    const sources = arr(get(node,"sources"));
  for(const item of sources){
    if(!ts.isObjectLiteralExpression(item)){failures.push(slug+": source entry invalid");continue}
    const url=val(get(item,"url"));
    if(!url.startsWith("https://")) failures.push(slug+": source URL must be HTTPS");
  }
  if(!["not-established","research-candidate","related-historic"].includes(val(get(node,"paintedStatus")))) failures.push(slug+": illegal Painted Church promotion");
  if(slug==="ellinger-st-marys-hostyn-hill" && val(get(node,"paintedStatus"))!=="related-historic") failures.push("Hostyn Hill must be recommended as related historic church, not pending research");
  if(!/^\d{4}-\d{2}-\d{2}$/.test(val(get(node,"reviewedOn")))) failures.push(slug+": missing exact review date");
  const image=get(node,"image");
  const gallery=arr(get(node,"gallery"));
  const imageStatus=val(get(node,"imageStatus"));
  if(imageStatus!=="rights-cleared" && imageStatus!=="awaiting-licensed-photos") failures.push(slug+": explicit image clearance status required");
  if(imageStatus==="rights-cleared" && !image) failures.push(slug+": rights-cleared requires a photograph");
  if(imageStatus==="awaiting-licensed-photos") warnings.push(slug+": image clearance pending — not yet complete authority-image standard");
  for(const img of [image,...gallery].filter(Boolean)){
    if(!ts.isObjectLiteralExpression(img)){failures.push(slug+": invalid image record");continue}
    for(const key of ["file","alt","author","license","sourceUrl","width","height"]) if(!get(img,key)) failures.push(slug+": image missing "+key);
    if(val(get(img,"license"))!=="CC BY-SA 4.0") failures.push(slug+": unexpected image license");
    if(!val(get(img,"sourceUrl")).startsWith("https://commons.wikimedia.org/wiki/File:")) failures.push(slug+": image missing licensed Commons record");
  }
}
for(const expected of ["yoakum-st-joseph-catholic-church","ellinger-st-marys-hostyn-hill","blessing-st-peters-catholic-church","moulton-st-joseph-catholic-church","frelsburg-sts-peter-and-paul"])
  if(!slugs.has(expected)) failures.push("Missing required first-wave church: "+expected);

const mustContain = (path,tokens) => {
  const text=fs.readFileSync(path,"utf8");
  for(const token of tokens) if(!text.includes(token)) failures.push(path+": missing "+token);
};
mustContain("src/routes/explore.historic-churches.tsx",["createFileRoute","Historic Churches of Texas","St. Mary","historicChurches.map","Painted Churches"]);
mustContain("src/routes/explore.historic-churches.$slug.tsx",["createFileRoute","historicalContext.map","timeline.map","architecture.map","visitorNotes.map","sources.map","historicChurchImageSrc","church.related.map"]);
mustContain("src/routes/explore.painted-churches.tsx",["You may also be interested in","Hostyn Hill"]);
mustContain("src/routes/explore.painted-churches.census.tsx",["ellinger-st-marys-hostyn-hill"]);
mustContain("src/data/painted-church-census.ts",["paintedChurchRelatedHistoricChurches", "ellinger-st-marys-hostyn-hill"]);
mustContain("src/routes/explore.historic-churches.$slug.tsx",["Suggested companion historic church","related-historic"]);
mustContain("src/routes/explore.historic-churches.$slug.tsx",["church.faq.map","FAQPage","Frequently asked questions"]);
mustContain("src/routes/explore.historic-churches.tsx",["You may also be interested in"]);
mustContain("src/routes/sitemap-explore[.]xml.ts",["historicChurchEntries","historicChurches.map"]);
mustContain("src/lib/public-routes.ts",['"/explore/historic-churches"']);
mustContain("src/components/content/CountyHistoricSites.tsx",["historicChurches.filter","/explore/historic-churches/"]);
mustContain("src/components/editorial/ExploreTopicPaths.tsx",["Historic Churches of Texas"]);
mustContain("src/routes/explore.index.lazy.tsx",["Historic Churches of Texas","/explore/historic-churches"]);
mustContain("src/routes/guides.lazy.tsx",["Historic Churches of Texas","/explore/historic-churches"]);
mustContain("src/routes/texas-sacred-places.tsx",["Historic Churches of Texas","/explore/historic-churches"]);
if(warnings.length) console.warn("Historic Churches outstanding image research:\n"+warnings.join("\n"));
if(process.argv.includes("--strict-images") && warnings.length) failures.push("Strict publication check fails: "+warnings.length+" unlicensed church photo gaps");
if(failures.length){console.error("Historic Churches validation FAILED:\n"+failures.map(s=>" - "+s).join("\n"));process.exit(1)}
console.log("Historic Churches validation: "+records.length+" researched entries; "+warnings.length+" pending photo clearances; classification, source and internal-link checks passed.");
