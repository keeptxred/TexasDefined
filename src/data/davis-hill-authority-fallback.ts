import type { Destination } from "./types";

/** Research-only holding. No public access and no unsupported visitor amenities. */
export const davisHillFallback: Destination = {
  id:"davis-hill-state-park",brandId:"texasdefined",slug:"davis-hill-state-park",
  name:"Davis Hill State Natural Area",
  summary:"Davis Hill is an undeveloped TPWD natural area in Liberty County near the Trinity River. Acquired in 1983, this approximately 1,700-acre protected property is not open for general visits, camping or day-use reservations.",
  category:"state-parks",region:"piney-woods",nearestTown:"Tarkington Prairie",county:"Liberty",
  coordinates:{lat:30.31684,lng:-94.8226},
  hero:{src:"/images/state-parks/davis-hill-conservation-landscape.svg",alt:"Original TexasDefined editorial landscape illustration of forested uplands and Trinity River bottomlands near Davis Hill; not a photograph or access map",width:1600,height:900},
  bestSeason:"Not open to general visitation",
  entryNote:"No public trailheads, campgrounds, entrance, reservation program or opening date are published. Do not enter private property or follow unofficial maps to the site.",
  highlights:["Salt dome and sandstone uplift","Trinity River bottomland hardwood forest","Rare plants and ecological conservation"],
  body:["Davis Hill in Liberty County is a TPWD conservation holding near the Trinity River, not Davis Mountains State Park in West Texas. TPWD acquired the approximately 1,700-acre landscape in 1983.",
  "The site protects sandstone uplands associated with a salt dome above floodplain woods, wetlands and unusual plant associations. TPWD has discussed protecting habitat through possible acquisition of adjacent tracts.",
  "TPWD's current future-parks list calls it Davis Hill State Natural Area. It has no verified general public entrance, trails, campsites, reservations or official opening date."],
  managingAuthority:"Texas Parks and Wildlife Department",
  officialUrl:"https://tpwd.texas.gov/state-parks/park-information/future-parks",
  sourceCheckedAt:"2026-10-20",
  directions:"No public entrance directions; do not use private roads or presumed river access.",
};
