import { Link } from "@tanstack/react-router";

/**
 * Operator-sourced campground decision guide for one specific RV destination.
 * Keep changing alerts, campsite prices and individual pad fit tied to TPWD.
 * Snapshot checked October 31, 2026; the source links are the live authority.
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

export default function MartinCreekRvAuthority() {
  return (
    <section id="martin-creek-rv-guide" aria-labelledby="martin-creek-rv-title" className="border-b border-border bg-surface py-12">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <p className="eyebrow text-primary">Researched RV campground guide · TPWD checked October 31, 2026</p>
        <h2 id="martin-creek-rv-title" className="mt-3 font-display text-3xl sm:text-4xl">Choose the right campsite at Martin Creek Lake</h2>
        <p className="mt-5 max-w-4xl leading-7">
          The RV campground is <strong>inside Martin Creek Lake State Park</strong>, not a separate resort.
          Its 56 water-and-electric sites have three different service and pricing classes. Compare Bee Tree and
          Broken Bowl before reserving; a lakeside view, 50-amp service and a sewer connection are not interchangeable.
          The park also lists six walk-in primitive island sites, which are not RV sites.
        </p>

        <div className="mt-7 overflow-x-auto rounded-md border border-border">
          <table className="w-full min-w-[640px] text-left text-sm">
            <caption className="sr-only">Official Martin Creek Lake State Park RV site types and nightly rates, checked October 31, 2026</caption>
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

        <div className="mt-8 grid gap-7 md:grid-cols-2">
          <div className="border-t border-border pt-5">
            <h3 className="font-display text-2xl">Hookups and rig fit</h3>
            <p className="mt-3 text-sm leading-7">
              These three classes include water plus electricity, <strong>not individual sewer hookups</strong>.
              The official park map marks a shared dump station near Bee Tree. Showers and restrooms are nearby.
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
              6 a.m.–10 p.m. If arriving late, <strong>call (903) 836-4336 before 5 p.m. on arrival day</strong>
              for gate-code instructions. Reserved late arrivals must check in by 9 a.m. the next morning.
              Do not assume the office will be staffed at your arrival time.
            </p>
            <p className="mt-3 text-sm leading-7">
              Coming from Tatum, follow TX-43 southwest, then County Road 2183 toward the park. Download the
              map before travel, and use your actual reservation's loop and site number for navigation.
            </p>
          </div>
        </div>

        <div className="mt-8 border-y border-border py-6" aria-labelledby="martin-creek-alerts">
          <h3 id="martin-creek-alerts" className="font-display text-2xl">Important active park alerts</h3>
          <p className="mt-3 text-sm leading-7">
            <strong>Burn ban (issued August 5, 2026):</strong> TPWD prohibits wood and charcoal fires;
            containerized fuel stoves such as propane are allowed for cooking only.
            A campsite having a fire ring does not mean campfires are currently permitted.
          </p>
          <p className="mt-3 text-sm leading-7">
            <strong>Argentine ants:</strong> The park reports invasive ants in some campsites. Inspect the RV,
            tow vehicle and camping gear carefully before departing; report any ants to park staff.
            Rusk County also has an emerald ash borer quarantine that restricts movement of firewood.
          </p>
          <p className="mt-3 text-sm leading-6">
            These are a <strong>dated snapshot, not a live alert feed</strong>.
            Check <a href={ALERTS} target="_blank" rel="noopener noreferrer" className="font-semibold underline underline-offset-2">TPWD's current park alerts</a> before travel.
          </p>
        </div>

        <div className="mt-8 grid gap-7 md:grid-cols-2">
          <div>
            <h3 className="font-display text-2xl">See the real sites and campground map</h3>
            <p className="mt-3 text-sm leading-7">
              The lead photograph on this page shows the park's lake and fishing pier, <strong>not an RV site</strong>.
              For verified photos of actual Bee Tree and Broken Bowl camping pads, open TPWD's
              <a href={SITES} target="_blank" rel="noopener noreferrer" className="underline"> campground photos by site class</a>.
              The official park map identifies the two loops, 50-amp locations, dump station, showers,
              island footbridge, lake access and boat ramp.
            </p>
            <a href={MAP} target="_blank" rel="noopener noreferrer" className="mt-3 inline-block text-sm font-semibold text-primary underline underline-offset-4">Download the official campground map (PDF) ↗</a>
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
            <p className="mt-3 text-sm leading-7">For swimming, boating, park history and trails rather than RV site comparisons, use our <Link to="/destination/$slug" params={{ slug: "martin-creek-lake-state-park" }} className="font-semibold underline underline-offset-4">Martin Creek Lake State Park guide</Link>. For the broader local area, see <Link to="/$kind/$slug" params={{ kind: "county", slug: "rusk" }} className="font-semibold underline underline-offset-4">Rusk County</Link>.</p>
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
