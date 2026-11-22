import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";

const PARK = "https://tpwd.texas.gov/state-parks/martin-creek-lake";
const RESERVE = "https://texasstateparks.reserveamerica.com/martin-creek-lake-state-park/r/facilityDetails.do?contractCode=TX&parkId=1200121";
const LAKE = "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/martin_creek/";
const TRAIL_MAP = "https://tpwd.texas.gov/publications/pwdpubs/media/park_maps/pwd_mp_p4508_0111k.pdf";
const BRIDGE_FILE = "Bridge_Martin_Creek_Lake_State_Park_Texas_2025.jpg";
const DOCKS_FILE = "Docks_at_Martin_Creek_Lake_State_Park_2019.jpg";
const LICENSE = "https://creativecommons.org/licenses/by/4.0/";
const photos = [
  { file: BRIDGE_FILE, original: "https://commons.wikimedia.org/wiki/Special:Redirect/file/" + BRIDGE_FILE + "?width=960", width: 960, height: 640, alt: "Wooden pedestrian bridge leading to Island Trails at Martin Creek Lake State Park", caption: "Island Trails pedestrian bridge, April 2025." },
  { file: DOCKS_FILE, original: "https://upload.wikimedia.org/wikipedia/commons/e/e2/" + DOCKS_FILE, width: 1280, height: 720, alt: "Docks beside the forested shoreline of Martin Creek Lake State Park", caption: "Lakefront docks and wooded shoreline, June 2019." },
];
const trails = [
  { name: "Island Trails", distance: "0.9 mile", difficulty: "Easy", use: "Cross the pedestrian bridge; choose this route for a shorter family walk, pine woodland and open grassy areas. The island has no drinking water or restrooms." },
  { name: "Old Henderson Road Loop", distance: "1.4 miles", difficulty: "Moderate", use: "Choose this inland route for a more demanding walk and the surviving alignment of the Henderson–Shreveport trade road." },
  { name: "Harmony Hill Loop", distance: "1.7 miles", difficulty: "Easy", use: "Allow time to explore the former settlement's woodland edge. The cemetery is outside the park boundary; view it from the trail rather than crossing private property." },
];
const sources = [
  ["Park hours, day passes, activities, ranger programs", PARK],
  ["Official trail descriptions", PARK + "/trails-info"],
  ["Trail map (PDF)", TRAIL_MAP],
  ["Park entrances and facility maps", PARK + "/map"],
  ["History of Harmony Hill and the park", PARK + "/history/"],
  ["Wildlife and usual fall foliage season", PARK + "/nature"],
  ["Lake characteristics, fishing regulations and reports", LAKE],
  ["Boat ramp and public access", LAKE + "access.phtml"],
  ["Current park alerts", PARK + "/alert"],
  ["Accessibility", PARK + "/fees-facilities/martin-creek-lake-accessibility"],
  ["Campsites", PARK + "/fees-facilities/campsites"],
  ["Screened shelters", PARK + "/fees-facilities/screened-shelters"],
  ["Cabins and cottages", PARK + "/fees-facilities/martin-creek-lodging/"],
  ["Specific park reservations", RESERVE],
] as const;

function Official({ href, children }: { href: string; children: ReactNode }) {
  return <a href={href} target="_blank" rel="noopener noreferrer" className="font-medium text-primary underline underline-offset-4">{children}</a>;
}

export default function MartinCreekParkAuthority() {
  return (
    <section id="martin-creek-park-guide" aria-labelledby="martin-creek-park-guide-title" className="border-b border-border bg-surface py-12">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <p className="eyebrow text-primary">Texas Defined visitor guide · Official sources reviewed November 21, 2026</p>
        <h2 id="martin-creek-park-guide-title" className="mt-3 font-display text-3xl sm:text-4xl">Plan the right day at Martin Creek Lake</h2>
        <p className="mt-4 max-w-4xl leading-7">The advantage of this compact East Texas park is that a short hike, shore fishing and a picnic can fit into one visit. Do not confuse the park with the entire reservoir: its managed facilities occupy 286 acres along a 4,981-acre cooling-water lake. For a trip centered on an RV rather than a day visit, start with our <Link to="/destination/$slug" params={{ slug: "martin-creek-lake-state-park-rv-area" }} className="font-semibold text-primary underline underline-offset-4">Martin Creek Lake RV campsite comparison</Link>, which covers the individual hookup classes, loop choices and arrival rules.</p>
        <div className="mt-6 grid gap-3 md:grid-cols-3">
          <div className="rounded-md border border-border bg-background p-4"><h3 className="font-semibold">Short family outing</h3><p className="mt-2 text-sm leading-6">Reserve a day pass, start at the pier, walk the island route, and return to the main picnic area for lunch. Take drinking water across the bridge; there are no island restrooms.</p></div>
          <div className="rounded-md border border-border bg-background p-4"><h3 className="font-semibold">History and woodland walks</h3><p className="mt-2 text-sm leading-6">Start with Harmony Hill for the gentler forest walk, then add Old Henderson Road if time and terrain permit. Walking both named inland loops totals 3.1 miles before any additional approach distance.</p></div>
          <div className="rounded-md border border-border bg-background p-4"><h3 className="font-semibold">Fishing-focused weekend</h3><p className="mt-2 text-sm leading-6">Fish the pier without launching, or reserve a campsite and use the four-lane ramp. Winter tournaments can create ramp congestion, so check events and allow extra launch time.</p></div>
        </div>
        <h3 className="mt-9 font-display text-2xl">Compare the three hiking and biking routes</h3>
        <p className="mt-3 text-sm leading-7">TPWD's detailed trail listing and trail map are the basis for these distances. The three published routes total 4.0 miles; the park's general overview describes nearly four miles and gives a different Harmony Hill figure. Use the dedicated map's 1.7-mile distance for planning and allow extra time for connections.</p>
        <div role="region" aria-label="Trail comparison" tabIndex={0} className="mt-4 overflow-x-auto rounded-md border border-border focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary">
          <table className="w-full min-w-[40rem] text-left text-sm">
            <caption className="sr-only">Martin Creek Lake State Park official trail distances, difficulty and route-selection advice</caption>
            <thead className="bg-background"><tr><th scope="col" className="p-3">Route</th><th scope="col" className="p-3">Distance</th><th scope="col" className="p-3">Difficulty</th><th scope="col" className="p-3">Which to choose</th></tr></thead>
            <tbody>{trails.map(t => <tr key={t.name} className="border-t border-border"><th scope="row" className="p-3">{t.name}</th><td className="p-3">{t.distance}</td><td className="p-3">{t.difficulty}</td><td className="p-3 leading-6">{t.use}</td></tr>)}</tbody>
          </table>
        </div>
        <p className="mt-3 text-sm"><Official href={TRAIL_MAP}>Download the official trail map (PDF)</Official> · <Official href={PARK + "/trails-info"}>Trail descriptions and GPS points</Official> · <Official href={PARK + "/map"}>Entrance and campground maps</Official></p>
        <p className="mt-3 text-sm leading-7">For parking, TPWD’s map shows headquarters parking beside Harmony Hill, a parking area near the inland campground junction, and another near the island bridge and lakeside recreation facilities. Check the map for the exact starting point rather than following an unmarked shoreline path. The six mapped points of interest also identify an old pine plantation, gas-well pump and the cemetery (earliest known grave: 1844).</p>
        <div className="mt-7 grid gap-5 md:grid-cols-2">
          {photos.map(photo => <figure key={photo.file} className="overflow-hidden rounded-md border border-border bg-background">
            <img src={"/media/remote?url=" + encodeURIComponent(photo.original)} alt={photo.alt} width={photo.width} height={photo.height} loading="lazy" decoding="async" className="h-auto w-full" />
            <figcaption className="px-3 py-2 text-xs leading-5 text-muted-foreground">{photo.caption} Larry D. Moore, resized for web. <Official href={LICENSE}>CC BY 4.0</Official> · <Official href={"https://commons.wikimedia.org/wiki/File:" + photo.file}>Original photograph</Official>.</figcaption>
          </figure>)}
        </div>
        <div className="mt-9 grid gap-8 md:grid-cols-2">
          <div>
            <h3 className="font-display text-2xl">Fishing, boating and swimming</h3>
            <p className="mt-3 text-sm leading-7">The park is the public access point identified by TPWD fisheries. Its four-lane boat ramp serves a reservoir with a maximum depth of 35 feet and standing timber and submerged creek channels. Launch only when conditions are suitable. A lighted fishing pier and cleaning station also serve anglers who do not have a boat. Canoe rental is listed by the park; confirm availability and hours before traveling.</p>
            <p className="mt-3 text-sm leading-7">For beginning anglers, the park's shore or pier is the simplest option: Texas state parks generally exempt shore and pier fishing from the state fishing-license requirement. Boating anglers should check license and other applicable regulations. TPWD reports stronger winter and early-spring bass activity in this unusually warm reservoir, while summer anglers commonly concentrate on cooler parts of the day. Sunfish are a practical choice for young anglers; catfish can be caught year-round. See the <Official href={LAKE}>TPWD lake report and regulations</Official> and <Official href={LAKE + "access.phtml"}>four-lane public ramp details</Official>.</p>
            <p className="mt-3 text-sm leading-7">Lake swimming is permitted under park rules but there are no lifeguards. Supervise children, wear correctly fitted life jackets when boating or paddling, follow posted swimming and boating boundaries, keep clear of power-generation infrastructure and leave the water as thunderstorms approach. Warm water is not evidence of safe swimming conditions. <Link to="/fishing/access" className="text-primary underline">Texas fishing access guide</Link> · <Link to="/fishing/regulations" className="text-primary underline">Fishing regulations</Link>.</p>
          </div>
          <div>
            <h3 className="font-display text-2xl">History and wildlife along the trails</h3>
            <p className="mt-3 text-sm leading-7">TPWD traces human habitation of the area back roughly 13,000 years, including Caddo settlement about 1,200 years ago. Daniel Martin settled nearby in 1833, and the community of Harmony Hill developed beside the road to Shreveport. The settlement declined around the turn of the twentieth century. The surviving road corridor, historic district and cemetery are reasons to slow down on the inland loops rather than treat them simply as mileage.</p>
            <p className="mt-3 text-sm leading-7">Texas Utilities Generating Company conveyed the park's 286 acres to TPWD in 1976, the year the park opened. The reservoir had been impounded in 1974 for power-plant cooling. The generating facility across the water is part of the landscape, not a hidden industrial feature; the park's named trail viewpoint helps explain why the lake differs from many East Texas reservoirs.</p>
            <p className="mt-3 text-sm leading-7">Bring binoculars to the shoreline for herons and egrets; TPWD identifies a birding point at 32.2778, -94.5774 where osprey and bald eagles are sometimes seen during cooler seasons. Red-headed woodpeckers, deer and mixed hardwood-pine forest are other reasons to explore. TPWD identifies late October through the first two weeks of November as the usual fall-color period, not a promise of peak color on any particular date. <Official href={PARK + "/history/"}>Park history</Official> · <Official href={PARK + "/nature"}>Nature and seasonal wildlife</Official> · <Official href={PARK + "/map"}>Visitor maps</Official>.</p>
          </div>
        </div>
        <div className="mt-9 border-t border-border pt-6">
          <h3 className="font-display text-2xl">Overnight choices beyond RV camping</h3>
          <p className="mt-3 text-sm leading-7">TPWD lists six walk-in primitive island sites without restrooms or drinking water, so carry all necessary supplies and plan for the walk from the mainland. Developed electric campsites provide a different level of convenience; the <Link to="/destination/$slug" params={{ slug: "martin-creek-lake-state-park-rv-area" }} className="font-semibold text-primary underline">RV guide</Link> explains their water and power classes. The 19 screened shelters are listed at $30 nightly, provide electricity and outdoor water, and have shared showers nearby. Pets are not allowed at the shelters.</p>
          <p className="mt-3 text-sm leading-7">For a roof and private bathroom, TPWD lists two four-person cabins at $85 nightly with kitchens and bathrooms, and two simpler cottages (listed at $55 nightly) without private restrooms. Bring linens; both lodging classes have a $75 cleaning/damage deposit and prohibit pets. The cottages have non-peak rates from December through February. Confirm capacity and rates when booking. Each listed overnight rate excludes the daily entrance fee. <Official href={PARK + "/fees-facilities/screened-shelters"}>Shelter details</Official> · <Official href={PARK + "/fees-facilities/martin-creek-lodging/"}>Cabin and cottage details</Official> · <Official href={RESERVE}>Reserve Martin Creek Lake directly</Official>.</p>
        </div>
        <div className="mt-8 grid gap-8 md:grid-cols-2 border-t border-border pt-6">
          <div><h3 className="font-display text-2xl">Accessibility: what is verified</h3><p className="mt-3 text-sm leading-7">Wheelchair-accessible features identified by TPWD include headquarters restrooms, the fishing pier, the bridge to the island, and accessible picnic sites. Cabins with bathrooms and the pavilion have accessible features but are not fully ADA compliant. A bridge's accessibility does not certify the entire island trail, primitive campsite or shoreline. Call <a href="tel:+19038364336" className="underline">(903) 836-4336</a> for grades, surfaces, restroom routes and specific accommodation details. <Official href={PARK + "/fees-facilities/martin-creek-lake-accessibility"}>Official accessibility information</Official>.</p></div>
          <div><h3 className="font-display text-2xl">Before leaving home</h3><p className="mt-3 text-sm leading-7">Reserve day use or lodging, download the park and trail maps, and confirm the office schedule for holiday travel. The November 21 source review found TPWD's invasive Argentine ant alert; inspect vehicles and gear before departing and contact staff if ants are found. Rusk County firewood movement is restricted by the emerald ash borer quarantine. Verify park fire restrictions and posted notices independently before using a grill or fire ring. <Official href={PARK + "/alert"}>Current alerts</Official> · <Official href={RESERVE}>Park reservation availability</Official>.</p></div>
        </div>
        <nav className="mt-9 border-t border-border pt-6" aria-label="Martin Creek Lake State Park editorial sources">
          <h3 className="font-display text-2xl">Official planning and research sources</h3>
          <p className="mt-2 text-sm text-muted-foreground">Texas Parks and Wildlife Department sources reviewed November 21, 2026. Visitor recommendations and route comparisons are Texas Defined editorial analysis, not claims of a personal field visit. Fees, alerts and availability may change.</p>
          <ul className="mt-4 grid gap-2 text-sm sm:grid-cols-2">{sources.map(([label, url]) => <li key={url}><Official href={url}>{label}</Official></li>)}</ul>
        </nav>
      </div>
    </section>
  );
}
