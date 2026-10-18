import { useState } from "react";
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
  const park = parks[selected];
  const mapUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${park.lon - 0.10}%2C${park.lat - 0.075}%2C${park.lon + 0.10}%2C${park.lat + 0.075}&layer=mapnik&marker=${park.lat}%2C${park.lon}`;
  return <div className="mt-8 border border-border bg-background p-4 sm:p-6">
    <h3 className="font-display text-2xl">Explore the parks on a map</h3>
    <p className="mt-2 text-sm leading-7 text-muted-foreground">Choose a park to center the interactive OpenStreetMap view. Pins are approximate park locations for trip orientation, not entrance or navigation coordinates. Confirm the official entrance before driving.</p>
    <div role="group" aria-label="Choose park to locate on map" className="mt-4 flex flex-wrap gap-2">
      {parks.map((item, index) => <button type="button" key={item.name} aria-pressed={selected === index} onClick={() => setSelected(index)} className={`border px-3 py-2 text-sm transition-colors ${selected === index ? "border-primary bg-primary text-primary-foreground" : "border-border hover:border-primary"}`}>{item.name}</button>)}
    </div>
    <iframe key={park.name} src={mapUrl} title={`Interactive map around ${park.name}`} loading="lazy" referrerPolicy="no-referrer-when-downgrade" style={{ height: 384 }} className="w-full border border-border" />
    <a href={`https://www.openstreetmap.org/?mlat=${park.lat}&mlon=${park.lon}#map=11/${park.lat}/${park.lon}`} target="_blank" rel="noopener noreferrer" className="inline-block text-sm font-semibold text-primary underline underline-offset-4">Open larger map for {park.name} ↗</a>
    <p className="mt-2 text-xs text-muted-foreground">Map data © OpenStreetMap contributors.</p>
  </div>;
}


export function EastTexasFoliagePhotoGallery() {
  return <>
      <div className="mt-10">
        <h3 className="font-display text-2xl">Photographs of the featured parks</h3>
        <p className="mt-2 text-sm leading-7 text-muted-foreground">Documentary park photographs from the existing credited image library. They show the places, not a verified current-season foliage report.</p>
        <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {(["daingerfield-state-park", "caddo-lake-state-park", "lake-bob-sandlin-state-park", "tyler-state-park", "martin-creek-lake-state-park"] as const).map((slug) => {
            const photo = stateParkHeroMap[slug];
            return photo ? <figure key={slug} className="overflow-hidden border border-border bg-background">
              <img src={photo.src} width={photo.width} height={photo.height} alt={photo.alt} loading="lazy" decoding="async" style={{ aspectRatio: "4 / 3" }} className="w-full object-cover" onError={(event) => recoverOrHideImage(event.currentTarget)} />
              <figcaption className="p-3 text-xs leading-5 text-muted-foreground"><span className="font-semibold text-foreground">{slug.replace(/-/g, " ").replace(/\\b\\w/g, (letter) => letter.toUpperCase())}</span><span className="mt-1 block">{photo.credit}</span></figcaption>
            </figure> : null;
          })}
        </div>
      </div>


  </>;
}
