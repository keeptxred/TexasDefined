/** Restrict automatic compensation to media created by ONE newly inserted
 * Network application. Unexpected or unenumerable files require owner/admin
 * investigation: never delete the parent row and orphan unknown media.
 */
export function networkIntakeCleanupObjectPaths(
  applicationId:string,
  items:readonly {name:string}[]|null|undefined,
):string[]|null {
 if(!/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(applicationId)
    || !Array.isArray(items) || items.length>5)return null;
 const found=new Set<string>();
 for(const item of items){
  const name=item?.name;
  if(typeof name!=='string'||
    !/^(?:logo|gallery-[1-4])\.(?:png|jpg|webp)$/.test(name)
    || found.has(name))return null;
  found.add(name);
 }
 return Array.from(found,name=>applicationId+'/'+name);
}
export function networkIntakeCleanupFolderIsEmpty(
 items:readonly {name:string}[]|null|undefined,
):boolean {
 return Array.isArray(items) && items.length===0;
}
