// Pure roster and URL identity helpers shared by PSI and local Lighthouse.
// Never import executable audits from another audit: both have top-level jobs.
export const PAGES=Object.freeze([
  "/texas-tall-tales-folklore",
  "/texas-dance-halls-honky-tonks",
  "/texas-homecoming-mums",
  "/texas-natural-wonders-bucket-list",
  "/texas-rock-climbing-bouldering-guide",
]);
export const STRATEGIES=Object.freeze(["mobile","desktop"]);
export function isSameCanonical(actual,expected) {
  try {
    const a=new URL(actual),b=new URL(expected);
    return a.origin===b.origin && a.pathname.replace(/\/$/,"")===b.pathname.replace(/\/$/,"") &&
      !a.search && !a.hash;
  } catch {return false;}
}
