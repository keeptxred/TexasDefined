/** Katy Tigers visitor guide. Schedule, score and standings data live elsewhere. */
export function KatyStadiumGuide() {
  return (
    <section aria-labelledby="katy-stadiums" className="grid gap-8 border-b border-border py-10 lg:grid-cols-[15rem_1fr]">
            <div>
              <p className="eyebrow text-primary">Visit Katy ISD</p>
              <h2 id="katy-stadiums" className="mt-2 font-display text-3xl">Where Katy football plays</h2>
              <p className="mt-4 text-sm leading-7 text-muted-foreground">Katy ISD uses two different football stadiums on Katyland Drive. Your opponent and game date determine which one to visit; do not assume every Katy home game is at Legacy.</p>
            </div>
            <div>
              <div className="grid gap-4 sm:grid-cols-2">
                {[
                  { name: 'Legacy Stadium', address: '1830 Katyland Drive, Katy, TX 77493', official: 'https://www.katyisd.org/athletics/facilities/legacy-stadium', detail: 'West-side seating is designated home and east-side seating visitor on the venue’s published seating guide.' },
                  { name: 'Jack F. Rhodes Memorial Stadium', address: '1733 Katyland Drive, Katy, TX 77493', official: 'https://www.katyisd.org/athletics/facilities/rhodes-stadium', detail: 'The original district football stadium, also used for Katy ISD events and assigned varsity games.' },
                ].map((venue) => <article key={venue.name} className="border-t-2 border-foreground pt-4">
                  <h3 className="font-display text-2xl">{venue.name}</h3>
                  <p className="mt-2 text-sm font-medium">{venue.address}</p>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">{venue.detail}</p>
                  <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm font-semibold">
                    <a href={venue.official} target="_blank" rel="noopener noreferrer" className="text-primary underline underline-offset-4">Official stadium guide ↗</a>
                    <a href={'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(venue.address)} target="_blank" rel="noopener noreferrer" className="text-primary underline underline-offset-4">Directions ↗</a>
                  </div>
                </article>)}
              </div>
              <p className="mt-5 text-sm leading-7 text-muted-foreground"><strong className="text-foreground">Parking, entry and tickets:</strong> Katy ISD's stadium pages link current stadium guidelines and tailgate resources. Confirm the assigned venue, home/visitor side, bags, parking and admission with the district for each game before leaving.</p>
              <a href="https://katyabc.org/features/katy-football-record-book/" target="_blank" rel="noopener noreferrer" className="mt-3 inline-block text-sm font-semibold text-primary underline underline-offset-4">Katy's maintained football record book (updated through 2025) ↗</a>
            </div>
          </section>
  );
}
