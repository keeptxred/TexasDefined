/**
 * Fix the historical Chihuahua NewsArticle's unreliable Wikimedia redirect.
 * Upload real first-party editorial raster into the existing public Supabase
 * Storage bucket, then update ONLY the matching historical article.
 *
 * This does not create or approve news, modify editorial grades, alter
 * publication schedules, overwrite other images, or touch Cloudflare.
 */
import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { renderChihuahuaHero, rasterPath } from '../assets/materialize-newsroom-chihuahua-hero.mjs';

const urlBase = 'https://ftkznprjljkhymknvhye.supabase.co';
const key = process.env.KEEP_TX_RED_SUPABASE_SERVICE_ROLE_KEY || '';
if (!key.trim()) throw new Error('Missing authorized Supabase service role; no image or news edits made.');

const slug = 'most-popular-dog-breeds-in-texas-chihuahua-data';
const oldUrl = 'https://commons.wikimedia.org/wiki/Special:Redirect/file/Chihuahua%20dog.jpg';
const objectPath = 'legacy-news/' + slug + '-v1.png';
const bucket = 'texasdefined-article-images';
const url = urlBase + '/storage/v1/object/public/' + bucket + '/' + objectPath;
const imageApi = urlBase + '/storage/v1/object/' + bucket + '/' + objectPath;
const rest = urlBase + '/rest/v1/texasdefined_articles';
const headers = {apikey:key,Authorization:'Bearer ' + key};
const sha = bytes=>createHash('sha256').update(bytes).digest('hex');
const sleep = ms=>new Promise(resolve=>setTimeout(resolve,ms));

const image = await renderChihuahuaHero();
const bytes = readFileSync(rasterPath);
if (image.bytes !== bytes.length || bytes.length < 10000
  || bytes.subarray(0,8).toString('hex') !== '89504e470d0a1a0a') {
  throw new Error('Original Chihuahua illustration is not a valid full raster PNG.');
}

async function publicObject() {
  const res=await fetch(url,{cache:'no-store',redirect:'manual',signal:AbortSignal.timeout(20_000)});
  if(res.status===404) return null;
  // Supabase Storage responds HTTP 400 with JSON {"statusCode":"404",
  // "error":"not_found","message":"Object not found"} for an absent key.
  // Only that exact absence is allowed to start an immutable upload; every
  // other 400, 401, expired key, upstream challenge or malformed JSON fails.
  if(res.status===400 && String(res.headers.get('content-type')||'').includes('application/json')) {
    const error=await res.json().catch(()=>null);
    if (String(error?.statusCode)==='404' && error?.error==='not_found'
        && error?.message==='Object not found') return null;
    throw new Error('Supabase public object GET denied (HTTP 400, not a recognized missing-key response).');
  }
  if(!res.ok || res.status!==200 || res.headers.get('cf-mitigated')==='challenge'
    || !String(res.headers.get('content-type')||'').toLowerCase().startsWith('image/png')) {
    throw new Error('Published image URL does not return verifiable 200 image/png: HTTP '+res.status);
  }
  const raw=Buffer.from(await res.arrayBuffer());
  if(raw.length<10000 || raw.subarray(0,8).toString('hex')!=='89504e470d0a1a0a') {
    throw new Error('Published Chihuahua hero is not a real 10KB+ PNG.');
  }
  return raw;
}

let remote = await publicObject();
if (!remote) {
  const upload = await fetch(imageApi, {
    method:'POST',redirect:'manual',signal:AbortSignal.timeout(40_000),
    headers:{...headers,'Content-Type':'image/png','x-upsert':'false',
      'cache-control':'public, max-age=31536000'},
    body:bytes,
  });
  if(!upload.ok && upload.status!==409) {
    throw new Error('First-party immutable Chihuahua image upload failed: HTTP '+upload.status);
  }
  // A newly written public object can take a few seconds to appear at edge.
  // Never patch a published article before original SHA-256 bytes are visible.
  for (let attempt=1;attempt<=5;attempt++) {
    remote=await publicObject();
    if(remote) break;
    if(attempt<5) await sleep(1500);
  }
}
if(!remote || sha(bytes)!==sha(remote)) {
  throw new Error('Original Chihuahua PNG bytes do not match public Storage bytes. No DB edit.');
}
console.log('First-party Chihuahua PNG verified: '+remote.length+' bytes, sha256='+sha(remote));

async function article() {
  const q=new URL(rest);
  q.searchParams.set('select','id,slug,hero_url,hero_alt,hero_credit,status');
  q.searchParams.set('id','eq.40');
  q.searchParams.set('slug','eq.'+slug);
  const r=await fetch(q,{headers,signal:AbortSignal.timeout(20_000)});
  if(!r.ok) throw new Error('Cannot read exact historical Chihuahua article: HTTP '+r.status);
  const rows=await r.json();
  if(rows.length!==1 || rows[0].id!==40 || rows[0].slug!==slug || rows[0].status!=='published') {
    throw new Error('Wrong historical news article identity or publication state; no edit.');
  }
  return rows[0];
}

const expectedAlt='TexasDefined original editorial illustration of a long-haired Chihuahua in a Texas evening landscape';
const expectedCredit='TexasDefined original editorial illustration';
const current=await article();
if(current.hero_url!==oldUrl && current.hero_url!==url) {
  throw new Error('Existing Chihuahua hero changed by another editor; refusing to replace it.');
}
if(current.hero_url===oldUrl) {
  const q=new URL(rest);
  q.searchParams.set('id','eq.40');
  q.searchParams.set('slug','eq.'+slug);
  q.searchParams.set('hero_url','eq.'+oldUrl);
  const patch=await fetch(q,{method:'PATCH',headers:{...headers,
    'Content-Type':'application/json','Prefer':'return=representation'},
    body:JSON.stringify({
      hero_url:url,hero_alt:expectedAlt,hero_credit:expectedCredit,
      updated_at:new Date().toISOString(),
    }),signal:AbortSignal.timeout(20_000)});
  if(!patch.ok) throw new Error('Exact-row Chihuahua image patch failed: HTTP '+patch.status);
  const updated=await patch.json();
  if(updated.length!==1 || updated[0].id!==40 || updated[0].hero_url!==url) {
    throw new Error('Optimistic Chihuahua news article patch changed no matching row.');
  }
}
const actual=await article();
if(actual.hero_url!==url || actual.hero_alt!==expectedAlt || actual.hero_credit!==expectedCredit) {
  throw new Error('Historical Chihuahua news attribution did not persist.');
}
let htmlVerified=false;
for(let i=0;i<8;i++){
  const p=new URL('https://texasdefined.com/news/'+slug);
  p.searchParams.set('og_raster_verify',String(Date.now())+'-'+i);
  try{
    const r=await fetch(p,{redirect:'follow',cache:'no-store',signal:AbortSignal.timeout(20_000)});
    if(r.ok && (await r.text()).includes(url)){htmlVerified=true;break;}
  }catch{}
  if(i<7) await sleep(5000);
}
if(!htmlVerified)throw new Error('First-party PNG and database are correct, but live NewsArticle metadata is not verified yet.');
console.log(JSON.stringify({verified:true,slug,storage:'public first-party-controlled',imageUrl:url,imageBytes:remote.length,
  imageSha256:sha(remote),articleExactRow:40,truthfulCredit:expectedCredit,liveOgRendered:true}));
