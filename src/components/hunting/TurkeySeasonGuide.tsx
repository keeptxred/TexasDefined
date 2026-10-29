import { buildCjAccountClick } from "@/lib/cj-account-links";
import { buildHotelsComEvergreenClick, hotelsComPageSid } from "@/lib/cj-hotels-evergreen";
import { trackAffiliateClick } from "@/lib/affiliate-click";
import { TURKEY_SEASONS_2026_27, TURKEY_GUIDE_VERIFIED_LABEL } from "@/data/hunting/turkey-guide";
import turkeyCalendar from "@/data/hunting/turkey-season-calendar.json";

const tpwdTurkeyUrl = "https://tpwd.texas.gov/regulations/outdoor-annual/regs/animals/turkey";
const turkeyGuidePath = "/hunting/turkey-hunting";
const rvshareUrl = buildCjAccountClick("rvshare", turkeyGuidePath, "https://rvshare.com/");
const hotelsUrl = buildHotelsComEvergreenClick("https://www.hotels.com/", hotelsComPageSid(turkeyGuidePath));
const tpwdDrawUrl = "https://tpwd.texas.gov/huntwild/hunt/public/public_hunt_drawing/hunt-category-details.phtml?OCat=NTS";

export function TurkeySeasonGuide() {
  const drawApplicationExpired = Date.now() >= Date.parse("2026-11-02T06:00:00Z");
  // The final listed 2026–27 turkey season (North spring youth-only) ends May 23, 2027.
  const archivedSeason = Date.now() >= Date.parse("2027-05-24T05:00:00Z");
  return (
    <section className="border-b border-border bg-surface py-12 md:py-16" aria-labelledby="turkey-season-heading">
      <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
        {archivedSeason ? <p role="status" className="mb-8 border-l-4 border-primary bg-muted/40 p-5 text-sm leading-7"><strong>This 2026–27 season is archived.</strong> Verify the newest TPWD wild turkey calendar and county rules before hunting; the next season's legal details must be checked and released separately.</p> : null}
        <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="eyebrow text-primary">2026–27 season at a glance</p>
            <h2 id="turkey-season-heading" className="mt-3 font-display text-4xl leading-tight md:text-5xl">Texas turkey dates, without the guesswork</h2>
            <p className="mt-4 max-w-2xl text-base leading-7 text-muted-foreground">Texas has multiple fall, spring, youth-only and archery-only turkey seasons. These dates come from TPWD's 2026–27 Outdoor Annual. <strong className="text-foreground">They apply only where the county and hunt type are open.</strong> Confirm your county and hunt notice before travel.</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href={tpwdTurkeyUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground">Check your county with TPWD ↗</a>
              <a href="#turkey-season-table" className="inline-flex items-center border border-border px-5 py-3 text-sm font-semibold hover:border-primary">See all season dates ↓</a>
            </div>
          </div>
          <figure>
            <img
              src="https://www.fws.gov/carp/carp/sites/default/files/2021-06/rio_grande_wild_turkey_pair_buffalo_lake_nwr_robert_burton_usfws.jpg"
              alt="Rio Grande wild turkey gobbler displaying next to a hen at Buffalo Lake National Wildlife Refuge in Texas"
              width={900}
              height={650}
              loading="lazy"
              decoding="async"
              className="aspect-video w-full rounded-sm object-cover"
            />
            <figcaption className="mt-2 text-xs leading-5 text-muted-foreground">Rio Grande wild turkeys at Buffalo Lake NWR. Photo: Robert Burton / U.S. Fish &amp; Wildlife Service (public domain).</figcaption>
          </figure>
        </div>
        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          <div className="border border-border p-5"><p className="eyebrow text-primary">Mandatory endorsement</p><p className="mt-2 font-display text-2xl">Upland Game Bird</p><p className="mt-2 text-sm leading-6 text-muted-foreground">In addition to an appropriate hunting license; hunter education and property permits may also apply.</p></div>
          <div className="border border-border p-5"><p className="eyebrow text-primary">Critical 2026–27 change</p><p className="mt-2 font-display text-2xl">No unbearded hens</p><p className="mt-2 text-sm leading-6 text-muted-foreground">Matagorda and Wharton are closed. Other counties can limit harvest to gobblers only.</p></div>
          <div className="border border-border p-5"><p className="eyebrow text-primary">After harvest</p><p className="mt-2 font-display text-2xl">Tag and report</p><p className="mt-2 text-sm leading-6 text-muted-foreground">Tag immediately; report within 24 hours for physical licenses or immediately for digital licenses.</p></div>
        </div>
        <div id="turkey-season-table" className="mt-10 ">
          <h3 className="font-display text-3xl">Official 2026–27 wild turkey season dates</h3>
          <p className="mt-2 max-w-4xl text-sm leading-7 text-muted-foreground">A quick reference, not a county-specific hunting authorization. Published TPWD zone maps and county rules control exceptions, legal game and method restrictions.</p>
          <div className="mt-5 overflow-x-auto border border-border">
            <table className="w-full border-collapse text-left text-sm">
              <caption className="sr-only">Texas Parks and Wildlife Department wild turkey season dates for the 2026–2027 hunting year</caption>
              <thead className="bg-muted/50 text-foreground">
                <tr><th scope="col" className="px-4 py-3 font-semibold">Hunt type</th><th scope="col" className="px-4 py-3 font-semibold">Zone / counties</th><th scope="col" className="px-4 py-3 font-semibold">Dates</th></tr>
              </thead>
              <tbody className="divide-y divide-border">
                {TURKEY_SEASONS_2026_27.map((item) => (
                  <tr key={item.season + item.area} className="align-top">
                    <td className="px-4 py-3 font-semibold">{item.season}</td>
                    <td className="px-4 py-3">{item.area}</td>
                    <td className="px-4 py-3 tabular-nums">{item.dates}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-xs leading-6 text-muted-foreground">Regulations editorially checked {TURKEY_GUIDE_VERIFIED_LABEL}; season dates cross-checked {turkeyCalendar.checkedAt}. Source: <a className="underline underline-offset-4" href={tpwdTurkeyUrl} rel="noopener noreferrer" target="_blank">TPWD Wild Turkey 2026–27 regulations and zone maps</a>. The 2026–27 spring youth dates are separate from the regular spring season.</p>
        </div>
        <section className="mt-10 border-t border-border pt-8" aria-labelledby="turkey-zone-maps">
          <h3 id="turkey-zone-maps" className="font-display text-3xl">Official Texas turkey hunting zone maps</h3>
          <p className="mt-3 max-w-4xl text-sm leading-7 text-muted-foreground">TPWD publishes separate spring and fall zone maps. <strong className="text-foreground">Maps identify broad zones, not guaranteed open counties.</strong> Matagorda and Wharton are closed for the 2026–27 season despite appearing in legacy one-gobbler lists. Always use the current county selector for legal dates, means and bag composition.</p>
          <div className="mt-6 grid gap-6 md:grid-cols-2">
            <figure className="border border-border p-4">
              <a href="https://tpwd.texas.gov/regulations/outdoor-annual/hunting/turkey-hunting-map-spring-zone" target="_blank" rel="noopener noreferrer">
                <img src="https://tpwd.texas.gov/regulations/outdoor-annual/hunting/turkey-hunting-map-spring-zone" alt="TPWD spring wild turkey hunting zone map marking North, South, East and one-gobbler regions" width={950} height={920} className="aspect-square w-full object-contain" loading="lazy" decoding="async" />
              </a>
              <figcaption className="mt-3 text-xs leading-5 text-muted-foreground">Spring turkey zones — official TPWD map. <a href="https://tpwd.texas.gov/regulations/outdoor-annual/regs/animals/turkey" target="_blank" rel="noopener noreferrer" className="underline">Confirm county exceptions and closures ↗</a></figcaption>
            </figure>
            <figure className="border border-border p-4">
              <a href="https://tpwd.texas.gov/regulations/outdoor-annual/hunting/turkey-hunting-map-fall-zone" target="_blank" rel="noopener noreferrer">
                <img src="https://tpwd.texas.gov/regulations/outdoor-annual/hunting/turkey-hunting-map-fall-zone" alt="TPWD fall wild turkey hunting zone map marking North, South and Brooks–Kenedy–Kleberg–Willacy special region" width={930} height={1000} className="aspect-square w-full object-contain" loading="lazy" decoding="async" />
              </a>
              <figcaption className="mt-3 text-xs leading-5 text-muted-foreground">Fall turkey zones — official TPWD map. <a href="https://tpwd.texas.gov/regulations/outdoor-annual/regs/animals/turkey" target="_blank" rel="noopener noreferrer" className="underline">Check current county restrictions ↗</a></figcaption>
            </figure>
          </div>
        </section>
        <aside className="mt-10 grid gap-6 border-l-4 border-primary bg-muted/30 p-6 md:grid-cols-2" aria-label="Public turkey hunt opportunity">
          <div><p className="eyebrow text-primary">Specific 2026–27 public hunting lead</p><h3 className="mt-2 font-display text-2xl">National Refuge Spring Turkey drawings</h3><p className="mt-3 text-sm leading-7">{drawApplicationExpired ? <>The November 1, 2026 application deadline for the Hagerman and Lower Rio Grande Valley NWR–East Lake examples has passed. Use the official TPWD drawn-hunt catalog to check the next application cycle; these are not unrestricted public hunts.</> : <>TPWD lists Hagerman NWR and Lower Rio Grande Valley NWR–East Lake in its National Refuge Spring Turkey draw category, with an application deadline of <strong>November 1, 2026</strong>. Limited permits, fees, application requirements and weapon restrictions apply. These are drawn opportunities, not open-access hunts.</>}</p></div>
          <a href={tpwdDrawUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center border border-primary px-5 py-3 text-sm font-semibold text-primary hover:bg-primary hover:text-primary-foreground">See TPWD drawing details ↗</a>
        </aside>
        <section className="mt-10 border-t border-border pt-8" aria-labelledby="turkey-public-hunting-options">
          <h3 id="turkey-public-hunting-options" className="font-display text-3xl">Two verified 2027 public turkey draw opportunities</h3>
          <p className="mt-3 max-w-4xl text-sm leading-7 text-muted-foreground">These are limited-entry TPWD National Refuge Spring Turkey hunts, not open-access public hunting. Both list a November 1, 2026 application deadline, a $3 adult application fee and an $80 adult permit fee if selected. The individual hunt notices control eligibility, restrictions and availability.</p>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <article className="border border-border p-5">
              <h4 className="font-display text-2xl">Hagerman National Wildlife Refuge</h4>
              <p className="mt-2 text-sm leading-7"><strong>April 22–24, 2027</strong> · 24 permits listed · one gobbler only. Archery or shotguns with birdshot; only non-toxic shot no larger than #4. Hunting is confined to designated compartments.</p>
              <a className="mt-4 inline-block text-sm font-semibold text-primary underline underline-offset-4" href="https://tpwd.texas.gov/huntwild/hunt/public/public_hunt_drawing/hunt-area-details.phtml?OArea=UP" rel="noopener noreferrer" target="_blank">Hagerman hunt rules and permit details ↗</a>
            </article>
            <article className="border border-border p-5">
              <h4 className="font-display text-2xl">Lower Rio Grande Valley NWR — East Lake</h4>
              <p className="mt-2 text-sm leading-7"><strong>April 2–4 or April 9–11, 2027</strong> · 8 permits listed · one gobbler or bearded hen. Shotguns with birdshot; no standbys listed.</p>
              <a className="mt-4 inline-block text-sm font-semibold text-primary underline underline-offset-4" href="https://tpwd.texas.gov/huntwild/hunt/public/public_hunt_drawing/hunt-area-details.phtml?OArea=UE" rel="noopener noreferrer" target="_blank">East Lake hunt rules and permit details ↗</a>
            </article>
          </div>
          <div className="mt-6 border-l-4 border-primary bg-muted/30 p-5">
            <h4 className="font-display text-xl">Find walk-in turkey hunting where it is actually legal</h4>
            <p className="mt-2 text-sm leading-7">Open the official TPWD Area / Legal Game Search, filter for turkey, then inspect each unit's legal-game listing, maps, hunt dates, weapon restrictions and access instructions. The $48 APH hunting permit is for eligible properties; the $12 Limited Public Use permit does not authorize hunting. Some properties are drawing-only or youth-only.</p>
            <div className="mt-3 flex flex-wrap gap-x-6 gap-y-3 text-sm">
              <a className="font-semibold text-primary underline underline-offset-4" href="https://tpwd.texas.gov/huntwild/hunt/public/annual_public_hunting/search.phtml" rel="noopener noreferrer" target="_blank">TPWD legal-game and property finder ↗</a>
              <a className="font-semibold text-primary underline underline-offset-4" href="https://tpwd.texas.gov/huntwild/wild/game_management/turkey/turkeyData.phtml" rel="noopener noreferrer" target="_blank">TPWD county harvest data ↗</a>
            </div>
            <p className="mt-3 text-xs leading-6 text-muted-foreground">Historical harvest totals can help research broad trends; they do not prove turkey abundance or public hunting permission on any tract.</p>
          </div>
        </section>
        <section className="mt-10 border-t border-border pt-8" aria-labelledby="turkey-travel-heading">
          <h3 id="turkey-travel-heading" className="font-display text-2xl">Planning an overnight turkey-hunting trip?</h3>
          <p className="mt-3 max-w-4xl text-sm leading-7 text-muted-foreground">Only book travel after confirming lawful hunting access, permits and your actual county. These partner links are broad lodging and rental searches, not recommendations for a particular ranch or evidence that a wildlife area is open to hunting.</p>
          <p className="mt-2 text-xs leading-6 text-muted-foreground"><strong>Affiliate disclosure:</strong> TexasDefined may earn a commission on qualifying hotel bookings or RV reservations at no additional cost to you.</p>
          <div className="mt-5 flex flex-wrap gap-3">
            <a href={hotelsUrl} target="_blank" rel="sponsored nofollow noopener noreferrer" data-commercial-partner="hotels.com" data-commercial-placement="turkey-hunting-travel" onClick={() => trackAffiliateClick({ partner: "hotels.com", label: "Compare Texas lodging for a turkey hunt", placement: "turkey-hunting-travel", module: "turkey-authority" })} className="inline-flex items-center border border-primary px-5 py-3 text-sm font-semibold text-primary hover:bg-primary hover:text-primary-foreground">Compare hotels on Hotels.com ↗</a>
            <a href={rvshareUrl} target="_blank" rel="sponsored nofollow noopener noreferrer" data-commercial-partner="rvshare" data-commercial-placement="turkey-hunting-travel" onClick={() => trackAffiliateClick({ partner: "rvshare", label: "Compare RV rentals for a turkey hunt", placement: "turkey-hunting-travel", module: "turkey-authority" })} className="inline-flex items-center border border-primary px-5 py-3 text-sm font-semibold text-primary hover:bg-primary hover:text-primary-foreground">Compare RV rentals on RVshare ↗</a>
          </div>
        </section>
      </div>
    </section>
  );
}
