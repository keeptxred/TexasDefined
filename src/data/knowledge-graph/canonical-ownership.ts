const DESTINATION_OWNERS = '|lake:caddo-lake|state-park:palo-duro-canyon-state-park|state-park:enchanted-rock-state-natural-area|national-park:big-bend-national-park|cavern:natural-bridge-caverns|beach:padre-island-national-seashore|historic-site:the-alamo|';

export function explicitCanonicalPath(kind: string, slug: string) {
  return DESTINATION_OWNERS.includes(`|${kind}:${slug}|`) ? `/destination/${slug}` : undefined;
}
