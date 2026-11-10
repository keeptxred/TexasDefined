/**
 * Source-checked November 10, 2026: original Buda EDC October 10 announcement,
 * its live statue-name notice, and City of Buda's official park information.
 * This is a permanent, practical addition to /city/buda, NOT thin breaking news.
 */
export function BudaWienerDogSpotlight() {
  return (
    <section className="border-b border-border py-10" aria-labelledby="buda-wiener-dog-spotlight">
      <div className="grid gap-7 lg:grid-cols-[14rem_1fr]">
        <div>
          <p className="eyebrow text-primary">Visit Buda · Public art</p>
          <h2 id="buda-wiener-dog-spotlight" className="mt-2 font-display text-3xl">
            Buda's giant wiener dog sculpture
          </h2>
        </div>
        <div className="max-w-3xl space-y-5 text-base leading-7">
          <p>
            The steel dachshund at Buda Amphitheater &amp; City Park is a permanent public-art
            landmark, not a temporary installation for the annual races. Unveiled October 10,
            2026 for the Buda Economic Development Corporation's 25th anniversary, it measures
            19 feet from nose to tail, stands 10 feet high and is about five feet wide.
            Austin-area public-art studio Art Seen Alliance built it from more than 400 individual
            parts of Cor-Ten weathering steel. Its surface develops a weathered rust-colored finish.
          </p>
          <p>
            The sculpture celebrates a local tradition begun in 1997 by the Buda Lions Club:
            the Wiener Dog Races. Buda's nickname, the Wiener Dog Capital of Texas, comes from
            those races. The organizers have identified April 2027 as the event's 30th-anniversary
            season, but individual dates, admission and event arrangements must be confirmed
            on the organizer's current event information before planning a race-day visit.
          </p>
          <h3 className="font-display text-2xl">How to see it</h3>
          <p>
            Start at City Park, 204 San Antonio Road, near the intersection of Garison Road and
            San Antonio Street in downtown Buda. The city's published park hours are daily,
            6 a.m. to 10 p.m. This is a stop you can combine with the downtown area, but check
            the city's current park notices for any event setup or access restrictions. A
            sculpture photograph does not require buying a ticket to the annual dog races.
            Do not assume that a parking space or event access is guaranteed on festival days.
          </p>
          <h3 className="font-display text-2xl">What is the sculpture's name?</h3>
          <p>
            Buda EDC invited residents to vote on a name in November 2026.
            Its official naming page says voting has closed and that the name will be announced
            later. The EDC board retained the final naming decision. Until a name is publicly
            confirmed by the organizers, this guide does not label an unannounced name as fact.
          </p>
          <p className="text-sm text-muted-foreground">Official sources reviewed November 10, 2026.</p>
          <nav className="flex flex-wrap gap-x-6 gap-y-3 text-sm font-semibold" aria-label="Buda sculpture and park primary sources">
            <a className="text-primary underline underline-offset-4" href="https://www.budaedc.com/news/the-buda-edc-celebrates-25th-anniversary-with-larger-than-life-sculpture/" target="_blank" rel="noopener noreferrer">Buda EDC announcement</a>
            <a className="text-primary underline underline-offset-4" href="https://www.budatx.gov/285/City-Park" target="_blank" rel="noopener noreferrer">City Park hours and address</a>
            <a className="text-primary underline underline-offset-4" href="https://www.budaedc.com/wiener-dog-statue/" target="_blank" rel="noopener noreferrer">Official name announcement status</a>
            <a className="text-primary underline underline-offset-4" href="/county/hays">Explore Hays County</a>
          </nav>
        </div>
      </div>
    </section>
  );
}
