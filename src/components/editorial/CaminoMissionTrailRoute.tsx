/** Three verified stops on the local Mission Trail corridor. This is not a
 * map of the full 404-mile National Historic Trail or a recreation trail. */
const stops = [
  {
    number: "01",
    name: "Ysleta Mission",
    address: "131 S. Zaragoza Road, El Paso, TX 79907",
    detail: "1682 mission origins; active Tigua spiritual center",
    site: "https://www.nps.gov/places/ysleta-mission.htm",
    maps: "https://www.google.com/maps/search/?api=1&query=131+S+Zaragoza+Rd+El+Paso+TX+79907",
  },
  {
    number: "02",
    name: "Socorro Mission",
    address: "328 S. Nevarez Road, El Paso, TX 79927",
    detail: "Living parish, with the present adobe church built in 1843",
    site: "https://www.nps.gov/subjects/travelspanishmissions/socorro-mission-mission-nuestra-senora-de-la-limpia-concepcion-del-pueblo-de-socorro.htm",
    maps: "https://www.google.com/maps/search/?api=1&query=328+S+Nevarez+Rd+El+Paso+TX+79927",
  },
  {
    number: "03",
    name: "San Elizario Presidio Chapel",
    address: "1556 San Elizario Road, San Elizario, TX 79849",
    detail: "1789 presidio; existing chapel completed around 1882",
    site: "https://www.nps.gov/places/presidio-chapel-of-san-elizario.htm",
    maps: "https://www.google.com/maps/search/?api=1&query=1556+San+Elizario+Rd+San+Elizario+TX+79849",
  },
] as const;

const drivingDirections = "https://www.google.com/maps/dir/?api=1&origin=131+S+Zaragoza+Rd+El+Paso+TX+79907&destination=1556+San+Elizario+Rd+San+Elizario+TX+79849&waypoints=328+S+Nevarez+Rd+El+Paso+TX+79927&travelmode=driving";

export default function CaminoMissionTrailRoute() {
  return (
    <section aria-label="El Paso Mission Trail map and three historic stops" className="my-8 space-y-6">
      <div className="overflow-hidden rounded-2xl border border-border bg-surface">
        <iframe
          title="Lower El Paso Valley area map around Ysleta, Socorro and San Elizario"
          src="https://www.openstreetmap.org/export/embed.html?bbox=-106.375%2C31.560%2C-106.225%2C31.715&layer=mapnik"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="h-64 w-full border-0 sm:h-80"
        />
        <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3">
          <p className="text-xs leading-5 text-muted-foreground">Area map only — it does not trace the historic road or mark private-land access. © OpenStreetMap contributors.</p>
          <a href={drivingDirections} target="_blank" rel="noopener noreferrer" className="inline-flex items-center rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:opacity-90">Open three-stop driving directions ↗</a>
        </div>
      </div>
      <ol className="grid gap-3 sm:grid-cols-3">
        {stops.map((stop) => (
          <li key={stop.number} className="rounded-xl border border-border bg-surface px-4 py-5">
            <p className="text-xs font-bold tracking-widest text-primary">STOP {stop.number}</p>
            <h3 className="mt-2 font-display text-lg font-semibold leading-snug">{stop.name}</h3>
            <address className="mt-2 text-sm not-italic leading-6 text-foreground">{stop.address}</address>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">{stop.detail}</p>
            <div className="mt-4 flex flex-wrap gap-x-3 gap-y-2 text-sm">
              <a href={stop.maps} target="_blank" rel="noopener noreferrer" className="font-medium text-primary underline underline-offset-4">Map ↗</a>
              <a href={stop.site} target="_blank" rel="noopener noreferrer" className="font-medium text-primary underline underline-offset-4">NPS site details ↗</a>
            </div>
          </li>
        ))}
      </ol>
      <p className="text-sm leading-6 text-muted-foreground">Local Mission Trail: approximately nine miles along Socorro Road (FM 258), rather than the entire historic route. Times, parish access and available services can change; confirm with each property before driving. The original Old Socorro Mission archaeological location is closed and is not on this public-stop list.</p>
    </section>
  );
}
