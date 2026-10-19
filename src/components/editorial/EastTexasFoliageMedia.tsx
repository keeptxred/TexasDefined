import { useEffect, useState } from "react";
import { stateParkHeroMap } from "@/data/state-park-hero-map";
import { recoverOrHideImage } from "@/lib/image-fallback";

export function EastTexasFoliageParkMap() {
  const parks = [
    { name: "Daingerfield", lat: 33.025, lon: -94.725 },
    { name: "Caddo Lake", lat: 32.690, lon: -94.174 },
    { name: "Lake Bob Sandlin", lat: 33.063, lon: -95.058 },
    { name: "Tyler", lat: 32.479, lon: -95.292 },
    { name: "Cooper Lake", lat: 33.321, lon: -95.663 },
    { name: "Martin Creek Lake", lat: 32.274, lon: -94.580 },
  ] as const;
  const [selected, setSelected] = useState(0);
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => setHydrated(true), []);

  const northernRoute = "https://www.google.com/maps/dir/?api=1&origin=Tyler%20State%20Park%2C%20Texas&destination=Daingerfield%20State%20Park%2C%20Texas&waypoints=Cooper%20Lake%20State%20Park%20South%20Sulphur%20Unit%2C%20Texas%7CLake%20Bob%20Sandlin%20State%20Park%2C%20Texas&travelmode=driving";
  const easternRoute = "https://www.google.com/maps/dir/?api=1&origin=Tyler%20State%20Park%2C%20Texas&destination=Caddo%20Lake%20State%20Park%2C%20Texas&waypoints=Martin%20Creek%20Lake%20State%20Park%2C%20Texas&travelmode=driving";
  const park = parks[selected];
  const mapUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${park.lon - 0.10}%2C${park.lat - 0.075}%2C${park.lon + 0.10}%2C${park.lat + 0.075}&layer=mapnik&marker=${park.lat}%2C${park.lon}`;
  return <div className="mt-8 border border-border bg-background p-4 sm:p-6">
    <h3 className="font-display text-2xl">Explore the parks on a map</h3>
    <p className="mt-2 text-sm leading-7 text-muted-foreground">Choose a park to center the interactive OpenStreetMap view. Pins are approximate park locations for trip orientation, not entrance or navigation coordinates. Confirm the official entrance before driving.</p>
    <div role="group" aria-label="Choose park to locate on map" className="mt-4 flex flex-wrap gap-2">
      {parks.map((item, index) => <button type="button" key={item.name} aria-pressed={selected === index} onClick={() => setSelected(index)} disabled={!hydrated} className={`border px-3 py-2 text-sm transition-colors ${selected === index ? "border-primary bg-primary text-primary-foreground" : "border-border hover:border-primary"}`}>{item.name}</button>)}
    </div>
    <iframe key={park.name} src={mapUrl} title={`Interactive map around ${park.name}`} loading="lazy" referrerPolicy="no-referrer-when-downgrade" style={{ height: 384 }} className="w-full border border-border" />
    <a href={`https://www.openstreetmap.org/?mlat=${park.lat}&mlon=${park.lon}#map=11/${park.lat}/${park.lon}`} target="_blank" rel="noopener noreferrer" className="inline-block text-sm font-semibold text-primary underline underline-offset-4">Open larger map for {park.name} ↗</a>
    <p className="mt-2 text-xs text-muted-foreground">Map data © OpenStreetMap contributors.</p>
    <div className="mt-8 border-t border-border pt-5">
      <h4 className="font-display text-xl">Open a multi-stop driving route</h4>
      <p className="mt-2 text-sm leading-7 text-muted-foreground">These are suggested stop sequences, not measured travel-time estimates. The links open live directions with actual roads in Google Maps. Review the route, park entrances, hours, and driving conditions before leaving; either route can be shortened.</p>
      <ol className="mt-4 grid gap-4 sm:grid-cols-2">
        <li className="border border-border p-4">
          <p className="font-semibold">Northeast Texas parks</p>
          <p className="mt-2 text-sm leading-6">Tyler State Park → Cooper Lake (South Sulphur) → Lake Bob Sandlin → Daingerfield</p>
          <a href={northernRoute} target="_blank" rel="noopener noreferrer" className="mt-4 inline-block font-semibold text-primary underline underline-offset-4">Open four-stop driving directions ↗</a>
        </li>
        <li className="border border-border p-4">
          <p className="font-semibold">Eastern Piney Woods</p>
          <p className="mt-2 text-sm leading-6">Tyler State Park → Martin Creek Lake → Caddo Lake State Park</p>
          <a href={easternRoute} target="_blank" rel="noopener noreferrer" className="mt-4 inline-block font-semibold text-primary underline underline-offset-4">Open three-stop driving directions ↗</a>
        </li>
      </ol>
    </div>
  </div>;
}


const PHOTO_SELECTION = [
  {
    slug: "daingerfield-state-park",
    name: "Daingerfield State Park",
    source: "https://commons.wikimedia.org/wiki/File:View_in_Daingerfield_State_Park_Texas_2023.jpg",
    license: "https://creativecommons.org/licenses/by/4.0/",
    season: "May photograph — park setting, not fall foliage",
  },
  {
    slug: "caddo-lake-state-park",
    name: "Caddo Lake State Park",
    source: "https://commons.wikimedia.org/wiki/File:Bald_cypress_(Taxodium_distichum),_Saw_Mill_Pond,_Caddo_Lake_State_Park,_Harrison_County,_Texas,_USA_(April_2017).jpg",
    license: "https://creativecommons.org/licenses/by-sa/4.0/",
    season: "April photograph — bald cypress, not fall color",
  },
  {
    slug: "lake-bob-sandlin-state-park",
    name: "Lake Bob Sandlin State Park",
    source: "https://commons.wikimedia.org/wiki/File:Pier_Lake_Bob_Sandlin_State_Park_Texas_2023.jpg",
    license: "https://creativecommons.org/licenses/by/4.0/",
    season: "Park setting photograph — not a current foliage report",
  },
  {
    slug: "tyler-state-park",
    name: "Tyler State Park",
    source: "https://commons.wikimedia.org/wiki/File:Tyler_state_park_tx.jpg",
    license: "https://creativecommons.org/licenses/by/4.0/",
    season: "Park setting photograph — not a current foliage report",
  },
  {
    slug: "cooper-lake-south-sulphur-unit-state-park",
    name: "Cooper Lake State Park (South Sulphur Unit)",
    source: "https://commons.wikimedia.org/wiki/File:Cooper_Lake_State_Park_July_2015_1.jpg",
    license: "https://creativecommons.org/licenses/by-sa/4.0/",
    season: "July photograph — not fall foliage",
  },
] as const;

export function EastTexasFoliagePhotoGallery() {
  return <section className="mt-10" aria-labelledby="east-texas-foliage-gallery">
    <h3 id="east-texas-foliage-gallery" className="font-display text-2xl">Photographs of the featured parks</h3>
    <p className="mt-2 text-sm leading-7 text-muted-foreground">These location-specific, licensed documentary photographs show park settings, not verified peak foliage. We do not present green-season photos as evidence of 2026 fall color. Source and license links accompany each photo.</p>
    <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {PHOTO_SELECTION.map((item) => {
        const photo = stateParkHeroMap[item.slug];
        if (!photo) return null;
        return <figure key={item.slug} className="overflow-hidden border border-border bg-background">
          <img src={photo.src} width={photo.width} height={photo.height} alt={photo.alt} loading="lazy" decoding="async" style={{ aspectRatio: "4 / 3" }} className="w-full object-cover" onError={(event) => recoverOrHideImage(event.currentTarget)} />
          <figcaption className="p-3 text-xs leading-5 text-muted-foreground">
            <strong className="block text-foreground">{item.name}</strong>
            <span className="block">{item.season}</span>
            <span className="block">{photo.credit}</span>
            <span className="block">Displayed image resized/cropped for layout.</span>
            <a href={item.source} target="_blank" rel="noopener noreferrer" className="text-primary underline underline-offset-4">Wikimedia source ↗</a>
            {" · "}
            <a href={item.license} target="_blank" rel="noopener noreferrer" className="text-primary underline underline-offset-4">License terms ↗</a>
          </figcaption>
        </figure>;
      })}
    </div>
    <p className="mt-4 text-sm leading-7 text-muted-foreground">Martin Creek Lake is covered in the park comparison and the driving routes; we are withholding its industrial-view photo from this nature gallery until an appropriate, rights-cleared alternative is verified. Check <a href="https://tpwd.texas.gov/state-parks/martin-creek-lake" target="_blank" rel="noopener noreferrer" className="text-primary underline underline-offset-4">the official Martin Creek Lake park page ↗</a> for visitor information.</p>
    <p className="mt-4 text-sm leading-7 text-muted-foreground">For actual autumn examples, view the <a href="https://tpwd.texas.gov/newsmedia/news_images/?g=fall_foliage&i=daingerfield_sp_0344.jpg" target="_blank" rel="noopener noreferrer" className="text-primary underline underline-offset-4">official TPWD Daingerfield fall-foliage photograph ↗</a>. It is linked for reference, not republished or presented as this year's conditions.</p>
  </section>;
}
