/** Confirm that Storage deletion actually removed every unsubmitted file.
 * Supabase Storage can return HTTP 200 and zero deleted rows under RLS.
 * Never infer a successful cleanup from HTTP status alone.
 */
export function wereNetworkUnsubmittedDraftsDeleted(
 attemptedPaths:readonly string[],
 visibleItems:readonly {name:string}[]|null|undefined,
):boolean {
 if(!Array.isArray(visibleItems))return false;
 if(attemptedPaths.length===0)return true;
 const observed=new Set(visibleItems.map(item=>item.name));
 return attemptedPaths.every(path=>{
  if(typeof path!=='string'||!path.includes('/'))return false;
  const basename=path.slice(path.lastIndexOf('/')+1);
  return basename.length>0 && !observed.has(basename);
 });
}
