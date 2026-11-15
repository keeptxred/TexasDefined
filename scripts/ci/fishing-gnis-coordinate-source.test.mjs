import test from "node:test";import assert from "node:assert/strict";
import {gnisQueryForSummary,inspectGnisPoint} from "./fishing-gnis-coordinate-source.mjs";
const casa={lat:27.5492157,lng:-99.4317839,sourceNeedle:"Lake Casa Blanca"},bachman={lat:32.850876,lng:-96.871519,sourceNeedle:"Bachman Lake"};
const feature=(id,name,x,y)=>({features:[{attributes:{gaz_id:id,gaz_name:name,gaz_featureclass:"Reservoir"},geometry:{x,y}}]});
test("only the exact official GNIS summary URL may query the official USGS hydro-point layer",()=>{
 const p=gnisQueryForSummary("https://edits.nationalmap.gov/apps/gaz-domestic/public/summary/1332265");assert.equal(p.sourceId,1332265);
 const u=new URL(p.queryUrl);assert.equal(u.hostname,"carto-wfs.nationalmap.gov");assert.equal(u.pathname,"/arcgis/rest/services/geonames/MapServer/4/query");assert.equal(u.searchParams.get("where"),"gaz_id = 1332265");assert.equal(u.searchParams.get("outSR"),"4326");
 for(const bad of ["http://edits.nationalmap.gov/apps/gaz-domestic/public/summary/1332265","https://evil.gov/apps/gaz-domestic/public/summary/1332265","https://edits.nationalmap.gov/apps/gaz-domestic/public/summary/1332265?x=1","https://edits.nationalmap.gov/apps/gaz-domestic/public/summary/1332265/extra"])assert.equal(gnisQueryForSummary(bad),null);
});
test("two exact USGS GNIS lake identities and numeric-rounded point coordinates pass",()=>{
 assert.equal(inspectGnisPoint(feature(1332265,"Lake Casa Blanca",-99.4317839,27.5492157),1332265,casa).issue,null);
 assert.equal(inspectGnisPoint(feature(1329904,"Bachman Lake",-96.8715190,32.8508760),1329904,bachman).issue,null);
});
test("wrong feature ID, renamed water, shifted coordinate, malformed payload or absent geometry fail closed",()=>{
 const good=feature(1332265,"Lake Casa Blanca",-99.4317839,27.5492157);
 for(const [payload,id] of [[good,1329904],[feature(1332265,"Other",-99.4317839,27.5492157),1332265],[feature(1332265,"Lake Casa Blanca",-99.432,27.5492157),1332265],[feature(1332265,"Lake Casa Blanca",-99.4317839,27.549),1332265],[{features:[]},1332265],[{features:[...good.features,...good.features]},1332265],[{features:[{attributes:good.features[0].attributes}]},1332265],[{error:"forbidden"},1332265]])assert.ok(inspectGnisPoint(payload,id,casa).issue);
});
