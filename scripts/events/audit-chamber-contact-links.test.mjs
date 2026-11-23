import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { extractContactPageLinks, auditChamberSources } from "./audit-chamber-event-sources.mjs";

const registry=JSON.parse(readFileSync("ops/editorial/chamber-event-sources.json","utf8"));

test("bounded same-origin media and editor contact routes exclude recipient addresses, foreign hosts and unsafe paths",()=>{
 const html=[
  '<a href="/contact">Contact Us</a>',
  '<a href="/media-relations/">Media Relations</a>',
  '<a href="/newsroom/">Newsroom</a>',
  '<a href="/submit-event">Submit an Event</a>',
  '<a href="/contact">Duplicate Contact</a>',
  '<a href="mailto:info@example.org">Contact by email</a>',
  '<a href="https://offsite.example/contact">Contact</a>',
  '<a href="http://example.org/press">Press</a>',
  '<a href="/privacy">Contact/Privacy</a>',
  '<a href="/admin">Contact the Webmaster</a>',
  '<a href="/contacts.pdf">Media Kit PDF</a>',
  '<a href="/contact?token=secret">Contact via token</a>',
  '<a href="/join-mailing-list">Contact team mailing signup</a>',
  '<a href="/#press">Press contact page anchor</a>',
 ].join("");
 const links=extractContactPageLinks(html,"https://example.org/");
 assert.deepEqual(links.map(x=>x.sourceUrl),[
  "https://example.org/contact","https://example.org/media-relations/",
  "https://example.org/newsroom/","https://example.org/submit-event"
 ]);
 assert.ok(links.every(x=>x.publisherVerified===false&&x.recipientVerified===false&&
  x.pressOptInVerified===false&&x.mediaRightsVerified===false&&
  x.sendable===false&&x.publishable===false));
 assert.ok(links.every(x=>new URL(x.sourceUrl).origin==="https://example.org"));
 assert.ok(!JSON.stringify(links).includes("info@example.org"));
 assert.equal(extractContactPageLinks(Array.from({length:14},(_,i)=>
  '<a href="/contact/team-'+i+'">Contact the team '+i+'</a>').join(""),
  "https://example.org/").length,4);
});

test("daily due pages capture only one-hop original contact URLs without extra network requests or outbound mail",async()=>{
 const requests=[];
 const fetchImpl=async input=>{
  const url=String(input);requests.push(url);
  if(url.includes("marlintexas.com")||url.includes("dimmittchamber.com"))
   throw new Error("Quarantined publisher must never be fetched");
  if(url.endsWith("/robots.txt"))return {status:404,ok:false,url,
   headers:{get:()=>null},text:async()=>""};
  return {status:200,ok:true,url,headers:{get:()=> "text/html"},
   text:async()=>'<a href="/contact">Contact Us</a><a href="/media-relations">Media Relations</a><a href="mailto:hello@example.com">Email press</a><a href="https://remote.example/contact">Remote Contact</a>'};
 };
 const report=await auditChamberSources({offline:false,now:new Date("2026-11-22T12:00:00Z"),fetchImpl});
 const observed=report.observations.filter(o=>o.state==="contact-discovery-only"||o.state==="reachable-discovery-only");
 assert.ok(observed.length>0);
 assert.ok(observed.some(o=>o.sourceKind==="contact-only"));
 assert.ok(observed.some(o=>o.sourceKind==="public-calendar"));
 assert.equal(report.firstPartyContactRouteCandidateCount,observed.reduce((n,o)=>n+o.contactPageCandidates.length,0));
 assert.ok(observed.every(o=>o.contactPageCandidates.length===2));
 assert.ok(observed.every(o=>o.contactPageCandidates.every(x=>x.sendable===false)));
 assert.equal(report.sender,"admin@texasdefined.com");
 assert.match(report.eventPublication,/^NO/);
 assert.equal(report.countiesTotal,254);
 assert.equal(requests.filter(url=>!url.endsWith("/robots.txt")).length,observed.length,
  "Exactly one content fetch per due permitted source, never following contacts");
 assert.ok(requests.every(url=>!url.includes("remote.example")&&!url.endsWith("/contact")&&!url.endsWith("/media-relations")));
 assert.ok(report.observations.filter(o=>o.sourceTrust==="quarantined").every(o=>
  !o.contactPageCandidates?.length));
 assert.ok(!JSON.stringify(report).includes("hello@example.com"));
});

test("robots disallow must not expose even candidate media routes",async()=>{
 const source=registry.sources.find(s=>s.sourceTrust!=="quarantined"&&s.sourceKind==="contact-only"&&
  [...s.id].reduce((n,c)=>(n*31+c.charCodeAt(0))>>>0,0)%7===0);
 assert.ok(source);
 const origin=new URL(source.homeUrl).origin;
 const fetched=[];
 const fetchImpl=async input=>{
  const url=String(input);fetched.push(url);
  if(url===origin+"/robots.txt")return {status:200,ok:true,url,
   headers:{get:()=> "text/plain"},text:async()=>"User-agent: TexasDefined-Events-Research\nDisallow: /"};
  if(url.endsWith("/robots.txt"))return {status:404,ok:false,url,
   headers:{get:()=>null},text:async()=>""};
  return {status:200,ok:true,url,headers:{get:()=> "text/html"},text:async()=>'<a href="/contact">Contact Us</a>'};
 };
 const report=await auditChamberSources({offline:false,now:new Date("2026-11-22T12:00:00Z"),fetchImpl});
 const o=report.observations.find(x=>x.sourceId===source.id);
 assert.equal(o.state,"robots-disallowed");
 assert.ok(!o.contactPageCandidates?.length);
 assert.ok(!fetched.includes(source.homeUrl));
});
