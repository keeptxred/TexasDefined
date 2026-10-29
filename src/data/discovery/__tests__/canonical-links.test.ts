import assert from "node:assert/strict";
import test from "node:test";
import { countyGuidePath, canonicalEventGuidePath, eventPlanningLinks } from "../canonical-links.ts";
import { christmasExperienceSearchBody, normalizeChristmasViatorExperiences } from "../../../lib/viator-seasonal-discovery.ts";

test("county discovery paths use the existing county route form",()=>{
 assert.equal(countyGuidePath("Gillespie County"),"/county/gillespie");
 assert.equal(countyGuidePath("McLennan County"),"/county/mclennan");
 assert.equal(countyGuidePath("DeWitt County"),"/county/dewitt");
 assert.equal(countyGuidePath(undefined),null);
 assert.equal(countyGuidePath("Texas"),null);
 assert.equal(canonicalEventGuidePath("sample-event","/event/sample-event"),"/event/sample-event");
 assert.equal(canonicalEventGuidePath("sample-event","https://viator.com/not-ours"),"/event/sample-event");
 assert.deepEqual(eventPlanningLinks({slug:"sample",href:"/event/sample",city:"Fredericksburg",countyName:"Gillespie County"}),[
 {href:"/event/sample",label:"Event guide"},{href:"/county/gillespie",label:"Gillespie County"},
 ]);
});

test("Christmas supplier query is bounded, market-specific, and not an occurrence calendar",()=>{
 const q=christmasExperienceSearchBody("galveston");
 assert.equal(q.searchTerm,"Christmas");
 assert.deepEqual(q.searchTypes,[{searchType:"PRODUCTS",pagination:{start:1,count:12}}]);
 assert.equal(q.productFiltering.destination,"4385");
 assert.throws(()=>christmasExperienceSearchBody("random-county"));
 const url="https://www.viator.com/tours/Galveston/Holiday/d4385-100P1?mcid=42383&pid=P00318227&medium=api&campaign=texasdefined-api-galveston";
 const result=normalizeChristmasViatorExperiences({products:{results:[
 {productCode:"HOLIDAY1",title:"Galveston Christmas holiday lights tour",productUrl:url},
 {productCode:"NORMAL1",title:"A normal daily sightseeing walk",productUrl:url},
 ]}});
 assert.equal(result.length,1);
 assert.equal(result[0].productCode,"HOLIDAY1");
 assert.ok(!("date" in result[0]));
 assert.ok(!("availability" in result[0]));
});
