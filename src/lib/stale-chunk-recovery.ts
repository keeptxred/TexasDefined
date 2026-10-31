/** Early client-only bootstrap, registered in SSR head before Vite module tags.
 * A browser may hold HTML pointing at a previous Worker version's module hash.
 * Recover both Vite dynamic-import failures and initial <script src> failures.
 * One guarded reload per 120s for the entire session, never for external JS.
 */
export const staleChunkRecoveryScript = String.raw`
(()=>{
const k="td:stale-chunk-reload-at:v1";
function grant(){
  if(!navigator.onLine)return false;
  try{
    const t=Date.now(),q=window.sessionStorage,s=+q.getItem(k);
    if(!isFinite(s)||s>0&&t-s<12e4)return false;
    q.setItem(k,String(t));
    return true;
  }catch{return false}
}
window.addEventListener("vite:preloadError",e=>{
  const p=e.payload,m=p?.message||p||"";
  if(!/dynamically imported module|module script/i.test(m)||!grant())return;
  e.preventDefault();
  window.location.reload();
});
window.addEventListener("error",e=>{
  const el=e.target;
  if(!el||el.tagName!=="SCRIPT"||!el.src)return;
  let u;
  try{u=new URL(el.src,window.location.href)}catch{return}
  if(u.origin!==window.location.origin||!/^\/assets\/[A-Za-z0-9._-]+\.js$/.test(u.pathname)||!grant())return;
  window.location.reload();
},true);
})();
`;
