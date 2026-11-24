import { Link } from "@tanstack/react-router";

/**
 * Operator-sourced campground decision guide for one specific RV destination.
 * Keep changing alerts, campsite prices and individual pad fit tied to TPWD.
 * Campground pricing, policies and official links reviewed November 18, 2026.
 */
const CAMPSITES = [
  { name: "Lakefront electric", loop: "Bee Tree", power: "30 amp + water", sites: 13, nightly: "$20", href: "https://tpwd.texas.gov/state-parks/martin-creek-lake/fees-facilities/campsites/premium-lake-front-access-campsites" },
  { name: "50-amp electric", loop: "Bee Tree", power: "50 amp + water", sites: 6, nightly: "$20", href: "https://tpwd.texas.gov/state-parks/martin-creek-lake/fees-facilities/campsites/campsites-with-50-amp-electric-and-water" },
  { name: "Standard electric", loop: "Bee Tree / Broken Bowl", power: "30 amp + water", sites: 37, nightly: "$17", href: "https://tpwd.texas.gov/state-parks/martin-creek-lake/fees-facilities/campsites/campsites-with-hookups" },
] as const;
const PARK = "https://tpwd.texas.gov/state-parks/martin-creek-lake";
const ALERTS = PARK + "/alert";
const SITES = PARK + "/fees-facilities/campsites";
const MAP = "https://tpwd.texas.gov/publications/pwdpubs/media/park_maps/pwd_mp_p4508_111e.pdf";
const RESERVE = "https://texasstateparks.reserveamerica.com/martin-creek-lake-state-park/r/facilityDetails.do?contractCode=TX&parkId=1200121";
const COUNTY_FIRE = "https://www.ruskcountytxfire.gov/rusk-county-burn-ban-status";
const ACCESS = PARK + "/fees-facilities/martin-creek-lake-accessibility";

// Free-to-reuse, real park photograph (Larry D. Moore, CC BY 4.0).
// The image is park context, NOT evidence of a numbered RV campsite.
// Route through the existing same-origin Wikimedia image broker.
const DOCKS_PHOTO_ORIGINAL = "https://upload.wikimedia.org/wikipedia/commons/e/e2/Docks_at_Martin_Creek_Lake_State_Park_2019.jpg";
const DOCKS_PHOTO_PROXY = "/media/remote?url=" + encodeURIComponent(DOCKS_PHOTO_ORIGINAL);
const DOCKS_PHOTO_SOURCE = "https://commons.wikimedia.org/wiki/File:Docks_at_Martin_Creek_Lake_State_Park_2019.jpg";

export default function MartinCreekRvAuthority() {
  return (
    <section id="martin-creek-rv-guide" aria-labelledby="martin-creek-rv-title" className="border-b border-border bg-surface py-12">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <p className="eyebrow text-primary">Researched RV campground guide · TPWD campsites, rules and alerts reviewed November 18, 2026</p>
        <h2 id="martin-creek-rv-title" className="mt-3 font-display text-3xl sm:text-4xl">Choose the right campsite at Martin Creek Lake</h2>
        <p className="mt-5 max-w-4xl leading-7">
          The RV campground is <strong>inside Martin Creek Lake State Park</strong>, not a separate resort.
          Its 56 water-and-electric sites have three different service and pricing classes. Compare Bee Tree and
          Broken Bowl before reserving; a lakeside view, 50-amp service and a sewer connection are not interchangeable.
          The park also lists six walk-in primitive island sites, which are not RV sites. The electric campsites
          have water and power but no individual sewer connection; visitors use the shared dump station.
        </p>

        <div role="region" aria-label="RV campsite comparison table; scroll horizontally on small screens" tabIndex={0} className="mt-7 overflow-x-auto rounded-md border border-border focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary">
          <table className="w-full min-w-[40rem] text-left text-sm">
            <caption className="sr-only">Official Martin Creek Lake State Park RV site types and nightly rates, checked November 18, 2026</caption>
            <thead className="bg-background">
              <tr className="border-b border-border">
                <th scope="col" className="p-3">RV campsite class</th>
                <th scope="col" className="p-3">Loop</th>
                <th scope="col" className="p-3">Hookups</th>
                <th scope="col" className="p-3">Sites</th>
                <th scope="col" className="p-3">Nightly rate</th>
              </tr>
            </thead>
            <tbody>
              {CAMPSITES.map((site) => (
                <tr key={site.name} className="border-b border-border last:border-0">
                  <th scope="row" className="p-3 font-semibold"><a href={site.href} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2">{site.name}</a></th>
                  <td className="p-3">{site.loop}</td><td className="p-3">{site.power}</td>
                  <td className="p-3 tabular-nums">{site.sites}</td><td className="p-3 tabular-nums">{site.nightly}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-sm leading-6 text-muted-foreground">
          Rates exclude the daily entrance fee: $4 per adult age 13 or older; children 12 and younger enter free.
          Each electric site class lists up to eight people. Prices and actual availability can change; confirm the selected
          campsite in the <a href={RESERVE} target="_blank" rel="noopener noreferrer" className="underline">official booking system</a>.
        </p>

        <div className="mt-7 grid gap-3 md:grid-cols-3" aria-label="Choose a campsite by what matters most">
          <div className="rounded-md border border-border bg-background p-4">
            <h3 className="font-semibold">Want a lakefront site?</h3>
            <p className="mt-2 text-sm leading-6">Choose one of 13 lakefront 30-amp Bee Tree sites; these are not 50-amp sites. Check the numbered pad and shoreline view before booking.</p>
            <a href={CAMPSITES[0].href} target="_blank" rel="noopener noreferrer" className="mt-2 inline-block text-sm font-semibold underline">See lakefront site photos and details</a>
          </div>
          <div className="rounded-md border border-border bg-background p-4">
            <h3 className="font-semibold">Need 50-amp electric service?</h3>
            <p className="mt-2 text-sm leading-6">Reserve one of six Bee Tree sites listed with 50-amp power. Confirm your RV's electrical requirements and the actual pad size.</p>
            <a href={CAMPSITES[1].href} target="_blank" rel="noopener noreferrer" className="mt-2 inline-block text-sm font-semibold underline">See 50-amp site photos and details</a>
          </div>
          <div className="rounded-md border border-border bg-background p-4">
            <h3 className="font-semibold">Prioritizing price?</h3>
            <p className="mt-2 text-sm leading-6">The 37 standard 30-amp sites cost $17 nightly, compared with $20 for the other electric classes. These span Bee Tree and Broken Bowl.</p>
            <a href={CAMPSITES[2].href} target="_blank" rel="noopener noreferrer" className="mt-2 inline-block text-sm font-semibold underline">See standard site photos and details</a>
          </div>
        </div>

        <div className="mt-8 grid gap-7 md:grid-cols-2">
          <div className="border-t border-border pt-5">
            <h3 className="font-display text-2xl">Hookups and rig fit</h3>
            <p className="mt-3 text-sm leading-7">
              These three classes include water plus electricity, <strong>not individual sewer hookups</strong>.
              The official park map marks a shared dump station serving the campground. Showers and restrooms are nearby.
              Pick 50-amp service only from the six designated sites; never assume a 30-amp site meets a 50-amp rig's requirements.
              Check the exact reserved pad dimensions, shelter and accessibility details with TPWD rather than relying on
              a park-wide maximum RV length.
            </p>
            <p className="mt-3 text-sm leading-7">
              TPWD identifies shade shelters at sites 35, 37, 38, 39, 52, 53, 61, 65 and 72 across its developed-site descriptions;
              verify the specific listing because shelter availability is not uniform.
            </p>
          </div>
          <div className="border-t border-border pt-5">
            <h3 className="font-display text-2xl">Arrival and gate instructions</h3>
            <p className="mt-3 text-sm leading-7">
              The entrance is at <strong>9515 County Road 2181D, Tatum, TX</strong>. The gate is normally open
              6 a.m.–10 p.m. If arriving late, <strong>call (903) 836-4336 before 5 p.m. on arrival day</strong>{" "}for gate-code instructions. Reserved late arrivals must check in by 9 a.m. the next morning.
              Do not assume the office will be staffed at your arrival time.
            </p>
            <p className="mt-3 text-sm leading-7">
              Coming from Tatum, follow TX-43 southwest, then County Road 2183 toward the park. Download the
              map before travel, and use your actual reservation's loop and site number for navigation.
            </p>
          </div>
        </div>

        <div className="mt-8 border-y border-border py-6" aria-labelledby="martin-creek-alerts">
          <h3 id="martin-creek-alerts" className="font-display text-2xl">Check current park alerts and fire rules</h3>
          <p className="mt-3 text-sm leading-7">
            <strong>Argentine ants (TPWD alert checked November 18, 2026):</strong> The park reports
            invasive ants in some campsites. Inspect your RV, tow vehicle and camping gear before
            departing; notify park staff if you find any ants.
          </p>
          <p className="mt-3 text-sm leading-7">
            <strong>Fire restrictions (verified November 18, 2026):</strong> Rusk County rescinded
            its countywide burn ban on November 3, 2026; <a href={COUNTY_FIRE} target="_blank" rel="noopener noreferrer" className="underline">the county fire authority confirms the rescission</a>.
            TPWD's <a href={ALERTS} target="_blank" rel="noopener noreferrer" className="underline">Martin Creek Lake alert page</a> lists Argentine ants but no park fire ban in the reviewed notice.
            <strong> This is not permission to light a fire.</strong> Park-specific and weather-related restrictions can change without notice.
            Check posted rules and ask staff about charcoal, wood and fuel restrictions before your visit.
          </p>
          <p className="mt-3 text-sm leading-7">
            Rusk County's emerald ash borer quarantine restricts moving firewood.
            Buy firewood where you burn it and follow current park rules.
          </p>
          <p className="mt-3 text-sm leading-6">
            This is a <strong>November 18, 2026 snapshot, not a live alert feed</strong>.
            Check <a href={ALERTS} target="_blank" rel="noopener noreferrer" className="font-semibold underline underline-offset-2">TPWD's current park alerts</a> before travel.
          </p>
        </div>

        <div className="mt-8 grid gap-7 md:grid-cols-2">
          <div>
            <h3 className="font-display text-2xl">See actual numbered campsite photos and the map</h3>
            <p className="mt-3 text-sm leading-7">
              The lead photograph shows the park's fishing pier; the footbridge and dock photographs below also document the actual park, <strong>not an RV site</strong>.
              For verified photographs of the actual campground, examine TPWD's numbered-site galleries:
              <a href={CAMPSITES[0].href} target="_blank" rel="noopener noreferrer" className="underline"> lakefront sites (including #54)</a>,
              <a href={CAMPSITES[1].href} target="_blank" rel="noopener noreferrer" className="underline"> 50-amp sites (including #38)</a> and
              <a href={CAMPSITES[2].href} target="_blank" rel="noopener noreferrer" className="underline"> standard 30-amp sites (including #57)</a>.
              These are agency photographs linked at the source, not copied or misrepresented as our own images.
              The official park map identifies both loops, 50-amp locations, the dump station, showers,
              island footbridge, lake access and boat ramp.
            </p>
            <a href={MAP} target="_blank" rel="noopener noreferrer" className="mt-3 inline-block text-sm font-semibold text-primary underline underline-offset-4">Download the official campground map (PDF) ↗</a>
            <figure className="mt-5 overflow-hidden rounded-md border border-border bg-background">
              <img
                src={"/media/remote?url=" + encodeURIComponent("https://commons.wikimedia.org/wiki/Special:Redirect/file/Bridge_Martin_Creek_Lake_State_Park_Texas_2025.jpg?width=960")}
                alt="The footbridge to the Island Trails at Martin Creek Lake State Park, photographed in April 2025; this is a park trail, not an RV campsite"
                loading="lazy"
                decoding="async"
                width="960"
                height="640"
                className="h-auto w-full"
              />
              <figcaption className="px-3 py-2 text-xs leading-5 text-muted-foreground">
                Real park photograph: Island Trails footbridge, April 2025, not an RV parking pad. Larry D. Moore, resized for web,
                <a href="https://creativecommons.org/licenses/by/4.0/" target="_blank" rel="noopener noreferrer" className="ml-1 underline">CC BY 4.0</a>,
                <a href="https://commons.wikimedia.org/wiki/File:Bridge_Martin_Creek_Lake_State_Park_Texas_2025.jpg" target="_blank" rel="noopener noreferrer" className="ml-1 underline">Wikimedia Commons source</a>.
              </figcaption>
            </figure>
          </div>
          <div>
            <h3 className="font-display text-2xl">What to do while camping</h3>
            <p className="mt-3 text-sm leading-7">
              The park has a lighted fishing pier, a boat ramp, a fish-cleaning station, canoe rentals and
              nearly four miles of hiking and biking trails. The Harmony Hill route explores remnants of a historic
              community, while Old Henderson Road follows an early trade route. The lake's power plant warms water
              year-round, making it popular for winter fishing. Fishing from the park shore or pier does not require a
              Texas fishing license; confirm other regulations for boat fishing.
            </p>
            <p className="mt-3 text-sm leading-7">For swimming, boating, park history and trails rather than RV site comparisons, use our <Link to="/destination/$slug" params={{ slug: "martin-creek-lake-state-park" }} className="font-semibold underline underline-offset-4">Martin Creek Lake State Park guide</Link>. Compare other destinations in <Link to="/explore/rv-parks" className="underline">Texas RV parks</Link> and <Link to="/explore/state-parks" className="underline">state parks</Link>; anglers can consult our <Link to="/fishing/access" className="underline">fishing-access directory</Link> and <Link to="/fishing/regulations" className="underline">fishing regulations guide</Link>. For local context, see <Link to="/$kind/$slug" params={{ kind: "county", slug: "rusk" }} className="font-semibold underline underline-offset-4">Rusk County</Link>.</p>
            <figure className="mt-5 overflow-hidden rounded-md border border-border bg-background">
              <img
                src={DOCKS_PHOTO_PROXY}
                alt="Wooded shoreline and docks at Martin Creek Lake State Park, photographed in June 2019; not an RV campsite"
                loading="lazy"
                decoding="async"
                width="1200"
                height="675"
                className="h-auto w-full"
              />
              <figcaption className="px-3 py-2 text-xs leading-5 text-muted-foreground">
                Real park photograph: docks and wooded shoreline, June 2019 — not an RV campsite. Photograph by Larry D. Moore; resized for web.{" "}
                <a href="https://creativecommons.org/licenses/by/4.0/" target="_blank" rel="noopener noreferrer" className="underline">CC BY 4.0 license</a>
                {" · "}
                <a href={DOCKS_PHOTO_SOURCE} target="_blank" rel="noopener noreferrer" className="underline">Wikimedia Commons source</a>.
              </figcaption>
            </figure>
          </div>
        </div>
        <div className="mt-8 grid gap-7 md:grid-cols-2" aria-label="Park rules and accessible facilities">
          <div className="border-t border-border pt-5">
            <h3 className="font-display text-2xl">Park rules RV campers should know</h3>
            <p className="mt-3 text-sm leading-7">The <a href={MAP} target="_blank" rel="noopener noreferrer" className="underline">2026 TPWD park map</a> specifies a <strong>noon campsite checkout</strong>, <strong>10 p.m.–6 a.m. quiet hours</strong>, a maximum of <strong>eight people per campsite</strong> and a requirement for guests to leave by 10 p.m. Gate hours are 6 a.m.–10 p.m.; overnight campers need the park's gate code if entering after closing. Each vehicle needs a valid permit displayed on its windshield, and vehicles must stay on pavement. Campsites must be cleaned before departure.</p>
            <p className="mt-3 text-sm leading-7"><strong>Pets:</strong> keep them on a leash no longer than six feet, clean up after them, and do not bring them into swimming areas, cabins or restricted buildings. Use the shared RV dump station for gray and black water; never discharge at the site. Confirm any restrictions with the <a href="https://tpwd.texas.gov/state-parks/park-information/rules/" target="_blank" rel="noopener noreferrer" className="underline">state-park rules</a>.</p>
          </div>
          <div className="border-t border-border pt-5">
            <h3 className="font-display text-2xl">Accessibility and individual RV pad fit</h3>
            <p className="mt-3 text-sm leading-7">TPWD specifically identifies the park headquarters, fishing pier and footbridge leading to the primitive island area as having wheelchair-accessible features. This <strong>does not establish that every electric RV site is accessible</strong>. The official map shows accessible shared facilities, but site grades, pad approach, restroom routes and space around hookups can differ.</p>
            <p className="mt-3 text-sm leading-7">Before booking an accessible site or towing a long rig, call <a href="tel:+19038364336" className="underline">(903) 836-4336</a> and confirm <strong>the numbered pad's usable length, backing angle, clearance, accessible route and available hookups</strong>. See TPWD's <a href={ACCESS} target="_blank" rel="noopener noreferrer" className="underline">park accessibility information</a>; do not assume the biggest RV that fits elsewhere in the park fits your reservation.</p>
          </div>
        </div>

        <nav aria-label="Official camping planning links" className="mt-8 flex flex-wrap gap-5 border-t border-border pt-6 text-sm font-semibold">
          <a href={RESERVE} target="_blank" rel="noopener noreferrer" className="text-primary underline underline-offset-4">Reserve a Martin Creek Lake campsite ↗</a>
          <a href={SITES} target="_blank" rel="noopener noreferrer" className="text-primary underline underline-offset-4">Compare TPWD campsite photos and rates ↗</a>
          <a href={ALERTS} target="_blank" rel="noopener noreferrer" className="text-primary underline underline-offset-4">Check live park alerts ↗</a>
          <a href={PARK} target="_blank" rel="noopener noreferrer" className="text-primary underline underline-offset-4">TPWD park visitor information ↗</a>
        </nav>
      </div>
    </section>
  );
}
