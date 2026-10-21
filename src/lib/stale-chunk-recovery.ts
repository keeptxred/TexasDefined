/** Inline, parser-early Vite chunk recovery. Never load this asynchronously. */
export const staleChunkRecoveryScript = String.raw`(function(){
var k='td:stale-chunk-reload-at:v1';
window.addEventListener('vite:preloadError',function(e){
var p=e&&e.payload,m=String(p&&(p.message||p)||'');
if(!/Failed to fetch dynamically imported module|Importing a module script failed|Failed to load module script/i.test(m)||navigator.onLine===false)return;
try{var t=Number(window.sessionStorage.getItem(k)||'0'),n=Date.now();if(!Number.isFinite(t)||(t>0&&n-t<120000))return;window.sessionStorage.setItem(k,String(n));}catch(_){return;}
e.preventDefault();window.location.reload();
});
})();`;
