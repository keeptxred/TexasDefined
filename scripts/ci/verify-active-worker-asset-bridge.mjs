/**
 * Before bridging asset history from a separately verified older Worker,
 * independently prove the exact currently active Worker identity on BOTH
 * public origins. Never infer a publication from an old GitHub build.
 */
import { readFileSync } from 'node:fs';

const UUID=/^[a-f0-9]{8}-(?:[a-f0-9]{4}-){3}[a-f0-9]{12}$/i;
const DIRECT='https://texasdefined-site.freddy-coppola.workers.dev';
const CANONICAL='https://texasdefined.com';
const SOURCES=[DIRECT,CANONICAL];
const PAGES=['/','/property-tax/taxing-unit/ennis-isd'];

export function validCurrentWorkerPage({status,mime,workerVersion,html,challenge},expected) {
  return UUID.test(expected)
    && status===200 && challenge!==true
    && typeof mime==='string' && mime.toLowerCase().includes('text/html')
    && workerVersion===expected
    && typeof html==='string' && html.length>200
    && /\/assets\/[^"'\s<>]+\.js/.test(html);
}

export function assertBridgeCapture(snapshot,expected) {
  if (!UUID.test(expected)) throw Error('Missing exact verified original Worker identity');
  const latest=snapshot?.snapshots?.at(-1);
  if (!latest || !Array.isArray(latest.pages) || latest.pages.length<4) {
    throw Error('No complete freshly captured outgoing Worker HTML proof');
  }
  for(const p of latest.pages){
    if(p.version!==expected || !['/','/property-tax/taxing-unit/ennis-isd',
      '/property-tax/taxing-unit/yoakum-hospital-district',
      '/texas-high-school-football-teams/shepherd'].includes(p.path)) {
      throw Error('Outgoing Worker snapshot does not match exact active Worker '+expected);
    }
    if(!Array.isArray(p.assets) || !p.assets.some(x=>String(x.path||'').endsWith('.js'))) {
      throw Error('Outgoing active Worker HTML lacks verified JS asset paths');
    }
  }
  return {expected,verifiedPages:latest.pages.length};
}

async function verifyLive(expected){
  if(!UUID.test(expected))throw Error('Expected exact current Worker version UUID');
  let checked=0;
  for(const origin of SOURCES){
    for(const page of PAGES){
      const u=new URL(page,origin);
      u.searchParams.set('exact_worker_asset_bridge',String(Date.now())+'-'+checked);
      const r=await fetch(u,{redirect:'manual',cache:'no-store',
        headers:{'User-Agent':'TexasDefined-Exact-Asset-Handoff/1.0',
          'Cache-Control':'no-cache, no-store, max-age=0'},
        signal:AbortSignal.timeout(20000)});
      const html=await r.text();
      if(!validCurrentWorkerPage({
        status:r.status,mime:r.headers.get('content-type'),
        workerVersion:r.headers.get('x-texasdefined-worker-version'),
        challenge:r.headers.get('cf-mitigated')==='challenge',html
      },expected)){
        throw Error('Original-byte source bridge refused '+origin+page+
          ': active Worker UUID, HTML, or JS identity mismatched.');
      }
      checked++;
    }
  }
  return {expected,origins:2,checked,readOnly:true};
}
if(process.argv[1]?.endsWith('verify-active-worker-asset-bridge.mjs')){
  const mode=process.argv[2];
  const expected=process.argv[3];
  try{
    if(mode==='live') console.log(JSON.stringify(await verifyLive(expected)));
    else if(mode==='snapshot')console.log(JSON.stringify(assertBridgeCapture(
      JSON.parse(readFileSync(process.argv[4]||'.artifacts/asset-handoff-snapshot.json','utf8')),expected)));
    else throw Error('Expected live or snapshot verification mode');
  }catch(e){console.error('::error title=Reject unsafe Worker handoff::'+String(e?.message||e));process.exitCode=1;}
}
