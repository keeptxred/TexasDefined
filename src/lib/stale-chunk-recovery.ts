/** Client-only early bootstrap. Head must register before Vite module scripts. */
export const staleChunkRecoveryScript = String.raw`
window.addEventListener("vite:preloadError",e=>{let k="td:stale-chunk-reload-at:v1",p=e.payload,m=p?.message||p||"";if(!navigator.onLine||!/dynamically imported module|module script/i.test(m))return;try{let t=Date.now(),q=window.sessionStorage,s=+q.getItem(k);if(!isFinite(s)||s>0&&t-s<12e4)return;q.setItem(k,String(t))}catch{return}e.preventDefault();window.location.reload()});
`;
