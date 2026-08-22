export type LighthouseVisitorPlan = {
  slug: string;
  publicAccess: string;
  bestFor: string;
  pairWith: string;
  planningNote: string;
};

export const lighthouseVisitorPlans: LighthouseVisitorPlan[] = [
  {
    slug: "sabine-pass-lighthouse",
    publicAccess: "Historical/viewing context only; the tower itself is on the Louisiana side of the Sabine.",
    bestFor: "Civil War, port and border-waterway history",
    pairWith: "Sabine Pass Battleground and the Jefferson County coast",
    planningNote: "Treat this as the eastern historical anchor of a Texas lighthouse trip, not as a conventional public lighthouse attraction. Use public Texas-side sites for interpretation and do not imply tower access.",
  },
  {
    slug: "point-bolivar-lighthouse",
    publicAccess: "View-only historic landmark; no public tower climb.",
    bestFor: "Galveston Bay shipping, hurricane and ferry history",
    pairWith: "Galveston-Port Bolivar Ferry, Galveston harbor and county history",
    planningNote: "The strongest visit is built around the ferry approach and the scale of the bay entrance. Respect private-property boundaries and photograph from lawful public vantage points.",
  },
  {
    slug: "halfmoon-reef-lighthouse",
    publicAccess: "Relocated structure preserved onshore in Port Lavaca.",
    bestFor: "Easy land-based lighthouse history and Matagorda Bay context",
    pairWith: "Port Lavaca waterfront, Indianola history and Calhoun County",
    planningNote: "This is one of the simplest Texas lighthouse structures to incorporate into a road trip because visitors do not need a boat or remote-island logistics to understand the site.",
  },
  {
    slug: "matagorda-island-lighthouse",
    publicAccess: "Remote barrier-island setting; access conditions can change and should be verified before travel.",
    bestFor: "Remote coastal history, barrier islands and serious maritime-history trips",
    pairWith: "Port O'Connor, Pass Cavallo and Calhoun County maritime history",
    planningNote: "Do not plan this like a roadside attraction. Verify transportation, land-management and weather conditions with the responsible public agencies before committing to a visit.",
  },
  {
    slug: "lydia-ann-lighthouse",
    publicAccess: "Private lighthouse; appreciate it from public waterways and nearby paddling areas.",
    bestFor: "Port Aransas waterways, paddling and Civil War lighthouse history",
    pairWith: "Lighthouse Lakes Paddling Trail, Port Aransas and Aransas County",
    planningNote: "The public experience is about the surrounding channels, marsh and Harbor Island setting rather than entering the lighthouse property. Do not trespass or advertise a public tower visit.",
  },
  {
    slug: "port-isabel-lighthouse",
    publicAccess: "Public lighthouse experience with tower climb when weather and operations allow.",
    bestFor: "First-time lighthouse visitors, families and lower-coast road trips",
    pairWith: "Keeper's Cottage, South Padre Island, Brownsville and Cameron County",
    planningNote: "This is the best Texas lighthouse to make the centerpiece of a trip. Check current Texas Historical Commission hours, weather closures and climb requirements before arrival.",
  },
];

export const lighthouseVisitorPlanBySlug = new Map(lighthouseVisitorPlans.map((plan) => [plan.slug, plan]));
