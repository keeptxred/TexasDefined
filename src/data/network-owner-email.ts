/** Exact owner-contact match used at the Network billing boundary.
 * The verified owner provisioning and checkout SQL use lower(btrim(email)).
 * Do not use PostgREST ilike against an email, whose %/_ can act as wildcards.
 */
export function matchingNetworkOwnerEmail(applicationContact:unknown, verifiedEmail:unknown):boolean {
 return typeof applicationContact==='string' && typeof verifiedEmail==='string'
  && applicationContact.trim().length>0 && verifiedEmail.trim().length>0
  && applicationContact.trim().toLowerCase()===verifiedEmail.trim().toLowerCase();
}
