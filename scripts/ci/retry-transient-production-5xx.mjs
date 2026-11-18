/**
 * Keep production postdeploy checks fail-closed while distinguishing one
 * transient canonical edge 500 from a persistent broken route.
 * Retries only verified 5xx HTTP responses (never a bot challenge, 4xx,
 * malformed HTML, missing SEO/authority markers, or a failed JS checksum).
 * Caller must still enforce HTTP 200 and all original page assertions.
 */
export async function retryTransientProduction5xx(action,{
  attempts=3,
  pause=ms=>new Promise(done=>setTimeout(done,ms)),
  delays=[800,1800],
}={}) {
  if (!Number.isInteger(attempts)||attempts<1||attempts>3)throw Error('Unbounded production verifier retries rejected');
  let response;
  for(let tryIndex=0;tryIndex<attempts;tryIndex++){
    response=await action();
    const retryable=[500,502,503,504].includes(response.status)
      && response.headers.get('cf-mitigated')!=='challenge';
    if(!retryable||tryIndex===attempts-1)return response;
    // Drain the rejected response; never accept its content as a successful page.
    try { await response.body?.cancel(); } catch { /* best-effort cleanup only */ }
    await pause(delays[tryIndex]??1800);
  }
  return response;
}
