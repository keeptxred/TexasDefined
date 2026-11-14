// Read-only production acceptance of three canonical Waco tourism authority pages.
// Runs only after a successful production deployment. Never implies live tickets.
const origin = 'https://texasdefined.com';
const pages = [
  { path: '/waco-attractions', h1: 'Seven Waco attractions worth knowing before you go', links: ['/waco-ghost-tours', '/dallas-to-waco-magnolia-tours', '/destination/cottonland-castle', '/county/mclennan'] },
  { path: '/waco-ghost-tours', h1: 'Waco ghost tours: which experience should you book?', links: ['/waco-attractions', '/destination/dr-pepper-museum-waco', '/dallas-to-waco-magnolia-tours'], affiliate: true },
  { path: '/dallas-to-waco-magnolia-tours', h1: 'Dallas to Waco and Magnolia Market guided day trips', links: ['/waco-attractions', '/destination/magnolia-market-at-the-silos', '/waco-ghost-tours'], affiliate: true },
];
const wait = ms => new Promise(resolve => setTimeout(resolve,ms));
const versions = new Set();
const results = [];
let errors = 0;
for (const item of pages) {
  let last = 'unavailable';
  for (let attempt=1;attempt<=3;attempt++) {
    const url = new URL(item.path,origin);
    url.searchParams.set('waco_live_acceptance', String(process.env.GITHUB_SHA || 'latest').slice(0,12)+'-'+attempt);
    try {
      const response = await fetch(url, { headers:{accept:'text/html','cache-control':'no-cache, no-store','user-agent':'TexasDefined-Waco-Authority-QA/1.0'},signal:AbortSignal.timeout(15000) });
      const html = await response.text();
      const worker = response.headers.get('x-texasdefined-worker-version');
      if (worker) versions.add(worker);
      if (response.status!==200 || response.headers.get('cf-mitigated')==='challenge') throw Error('HTTP '+response.status+' or access challenge');
      const head = html.split('</head>')[0] || '';
      const canonical = [...head.matchAll(/<link\b[^>]*\brel=["']canonical["'][^>]*>/gi)].map(m=>m[0]);
      if (canonical.length!==1 || !canonical[0].includes(origin+item.path)) throw Error('missing unique self canonical');
      if (/<meta\b[^>]*\bname=["']robots["'][^>]*\bcontent=["'][^"']*noindex/i.test(head)) throw Error('unexpected noindex');
      if (!head.includes('<title>') || !/\bname=["']description["']/.test(head)) throw Error('missing title or description');
      if ((html.match(/<h1\b/g)||[]).length!==1 || !html.includes(item.h1)) throw Error('missing unique SSR H1');
      for(const href of item.links) if(!html.includes('href="'+href+'"')) throw Error('missing SSR internal link to '+href);
      if(item.affiliate && !/rel=["'][^"']*sponsored[^"']*nofollow/.test(html)) throw Error('no clearly labeled sponsored Viator links in SSR');
      results.push({path:item.path,http:response.status,worker,links:item.links.length,affiliate:!!item.affiliate,pass:true});
      last=null;
      break;
    } catch(e) {last=String(e?.message||e);if(attempt<3)await wait(1000);}
  }
  if(last){errors++;results.push({path:item.path,pass:false,error:last});}
}
console.log('Waco production authority acceptance',JSON.stringify({results,workerVersions:[...versions],errors}));
if(versions.size!==1)throw Error('Expected one stable production Worker version, saw '+JSON.stringify([...versions]));
if(errors)throw Error(errors+' Waco authority pages failed live canonical, link or affiliate checks');
