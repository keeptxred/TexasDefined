import { connect } from "node:tls";
import { mkdirSync, writeFileSync, appendFileSync } from "node:fs";
const urls=[
 "https://tpwd.texas.gov/state-parks/abilene/alert",
 "https://tpwd.texas.gov/state-parks/fort-parker/alert",
 "https://tpwd.texas.gov/state-parks/bonham/alert",
 "https://tpwd.texas.gov/state-parks/galveston-island/alert",
];
/** No verification bypass, editorial status writes, or retry loops. */
export function classifySourceResponse(status,body,contentType=""){
 const sample=body.toLowerCase().slice(0,8000);
 if(status<200||status>=300)return "http_error";
 if(!contentType.includes("html")||body.length<=100)return "inconclusive";
 if(/<title>client challenge<\/title>|cf-chl-|cdn-cgi\/challenge-platform|just a moment/.test(sample))return "publisher_challenge";
 if(!/park alerts|park alerts…|this park has active alerts/.test(sample))return "unrecognized_content";
 return "verified_readable_http_content";
}
async function strictTlsProbe(){
 return await new Promise(resolve=>{
  const socket=connect({host:"tpwd.texas.gov",port:443,servername:"tpwd.texas.gov",rejectUnauthorized:true});
  let completed=false;
  const finish=result=>{if(completed)return;completed=true;socket.destroy();resolve(result);};
  socket.setTimeout(12000,()=>finish({status:"timeout"}));
  socket.once("error",e=>finish({status:"failure",code:e.code||"unknown",message:String(e.message).slice(0,240)}));
  socket.once("secureConnect",()=>{
   const peer=socket.getPeerCertificate();
   finish({status:socket.authorized?"authorized":"unauthorized",
     issuer:peer?.issuer?.O||peer?.issuer?.CN||null,
     subject:peer?.subject?.CN||null,
     valid_to:peer?.valid_to||null,
     authorizationError:socket.authorizationError||null});
  });
 });
}
async function inspectUrl(url){
 const result={url,at:new Date().toISOString()};
 try{
  const response=await fetch(url,{redirect:"follow",cache:"no-store",headers:{"Accept":"text/html","User-Agent":"TexasDefined-Park-Primary-Source-Transport-Diagnostic/1.0"},signal:AbortSignal.timeout(15000)});
  const body=await response.text(),type=(response.headers.get("content-type")||"").toLowerCase();
  result.http_status=response.status;result.final_host=new URL(response.url).hostname;
  result.body_length=body.length;result.classification=classifySourceResponse(response.status,body,type);
 }catch(e){
  result.classification="transport_failure";result.error_code=e?.cause?.code||e?.code||"unknown";
  result.error_message=String(e?.cause?.message||e?.message||e).slice(0,300);
 }
 return result;
}
export async function main(){
 const report={purpose:"Compare official TPWD reachability under default Node TLS trust; no authority statuses changed",date:new Date().toISOString(),tls:await strictTlsProbe(),results:[]};
 // Sequential, max four HTTPS GETs and one TLS handshake.
 for(const url of urls)report.results.push(await inspectUrl(url));
 report.readable=report.results.filter(x=>x.classification==="verified_readable_http_content").length;
 report.unresolved=report.results.length-report.readable;
 mkdirSync(".artifacts",{recursive:true});
 writeFileSync(".artifacts/tpwd-tls-transport-diagnostic.json",JSON.stringify(report,null,2));
 console.log(JSON.stringify(report,null,2));
 if(process.env.GITHUB_STEP_SUMMARY){
  appendFileSync(process.env.GITHUB_STEP_SUMMARY,
    "## TPWD strict-TLS certificate diagnostic\nStrict TLS: "+report.tls.status+". Official HTML content readable: "+report.readable+"/"+report.results.length+
    ".\n\nTransport evidence only; no park closure, source baseline or editorial acceptance is inferred.\n");
 }
}
if(process.argv[1]?.endsWith("diagnose-tpwd-tls.mjs"))await main();
