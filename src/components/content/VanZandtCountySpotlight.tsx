/**
 * Independently sourced practical gateway for Van Zandt County.
 * Does not invent internal city routes or assume postal towns are incorporated.
 */
const destinations = [
  {
    name: 'Canton & First Monday Trade Days',
    detail: 'The city-operated market runs Thursday through Sunday before the first Monday. Verify market dates and parking before traveling.',
    href: 'https://www.firstmondaycanton.com/about',
    label: 'City of Canton market information',
  },
  {
    name: 'Lake Tawakoni State Park',
    detail: 'A public lakeshore destination for fishing, camping, birding and hiking near Wills Point; check park alerts and entry availability.',
    href: 'https://tpwd.texas.gov/state-parks/lake-tawakoni',
    label: 'TPWD official park guide',
  },
  {
    name: 'Wills Point railroad history',
    detail: 'Follow the railroad-era town story at the historic depot, then connect local history to the Van Zandt county-seat dispute.',
    href: '/destination/wills-point-depot-museum',
    label: 'TexasDefined Wills Point Depot Museum guide',
  },
  {
    name: 'Grand Saline salt heritage',
    detail: 'Explore how the salt dome, brine production and railroad access shaped the community and the wider county.',
    href: 'https://www.tshaonline.org/handbook/entries/van-zandt-county',
    label: 'Handbook of Texas county history',
  },
] as const;

export function VanZandtCountySpotlight() {
  return (
    <section className="border-b border-border py-10 sm:py-12" aria-labelledby="van-zandt-guide-heading">
      <div className="grid gap-8 lg:grid-cols-[14rem_minmax(0,1fr)]">
        <div>
          <p className="eyebrow text-primary">Start exploring · October 2026 review</p>
          <h2 id="van-zandt-guide-heading" className="mt-2 font-display text-4xl">Van Zandt County essentials</h2>
          <p className="mt-4 text-sm leading-7 text-muted-foreground">Independent research guide · County seat: Canton</p>
        </div>
        <div className="min-w-0">
          <p className="max-w-3xl text-base leading-8 text-muted-foreground">Planning a visit, researching property or comparing communities? Begin with the verified places and local authorities here; the detailed history and citations follow below.</p>
          <nav aria-label="Jump to Van Zandt county guide sections" className="mt-5 flex flex-wrap gap-x-6 gap-y-3 text-sm font-semibold">
            <a href="#van-zandt-guide-places" className="text-primary underline underline-offset-4">Visit & discover</a>
            <a href="#van-zandt-tax-help" className="text-primary underline underline-offset-4">Property tax offices</a>
            <a href="#county-feature-heading" className="text-primary underline underline-offset-4">County history</a>
            <a href="#county-references-heading" className="text-primary underline underline-offset-4">Sources</a>
          </nav>
          <div id="van-zandt-guide-places" className="mt-8 scroll-mt-24">
            <h3 className="font-display text-2xl">Four ways to explore the county</h3>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              {destinations.map((place) => <div key={place.name} className="border-t border-border pt-4">
                <h4 className="font-display text-xl">{place.name}</h4>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{place.detail}</p>
                <a href={place.href} className="mt-3 inline-block text-sm font-semibold text-primary underline decoration-primary/40 underline-offset-4">{place.label} →</a>
              </div>)}
            </div>
          </div>
          <div id="van-zandt-tax-help" className="mt-9 scroll-mt-24 border-t border-border pt-7">
            <p className="eyebrow text-primary">Important local distinction</p>
            <h3 className="mt-2 font-display text-2xl">Where to handle Van Zandt property taxes</h3>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-muted-foreground">The <strong className="text-foreground">Van Zandt County tax assessor-collector does not collect property taxes</strong>. For appraisal values, exemptions, protests and the district's online property-tax payment search, start with the Van Zandt County Appraisal District. The assessor-collector handles vehicle titles and registration. Confirm the collecting unit on your individual bill before paying.</p>
            <div className="mt-4 flex flex-wrap gap-x-7 gap-y-3 text-sm font-semibold">
              <a href="/property-tax/county/van-zandt" className="text-primary underline underline-offset-4">County property-tax guide</a>
              <a href="https://vzcad.org/" className="text-primary underline underline-offset-4">Appraisal district ↗</a>
              <a href="https://vanzandt.propertytaxpayments.net/search" className="text-primary underline underline-offset-4">CAD tax payment search ↗</a>
              <a href="https://www.vanzandtcounty.org/page/vanzandt.County.Assessor.Collector" className="text-primary underline underline-offset-4">Vehicle registration office ↗</a>
            </div>
            <p className="mt-3 text-xs leading-5 text-muted-foreground">Sources: Texas Comptroller county directory, Van Zandt County government and Van Zandt CAD. Links verified October 9, 2026; check official notices for changes.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
