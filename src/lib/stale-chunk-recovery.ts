/** Client-only early bootstrap. Head must register before Vite module scripts. */
export const staleChunkRecoveryScript = String.raw`
(()=>{let k="td:stale-chunk-reload-at:v1";window.addEventListener("vite:preloadError",e=>{let p=e.payload,m=String(p&&(p.message||p)||"");if(navigator.onLine===false||!/Failed to fetch dynamically imported module|Importing a module script failed|Failed to load module script/i.test(m))return;try{let t=Date.now(),s=Number(window.sessionStorage.getItem(k)||0);if(!Number.isFinite(s)||s>0&&t-s<120000)return;window.sessionStorage.setItem(k,String(t))}catch(_){return}e.preventDefault();window.location.reload()})})();
`;
