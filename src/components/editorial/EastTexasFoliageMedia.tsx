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

  // Geographic overview: markers use approximate park-center coordinates.
  // Connecting segments are deliberately schematic, not drivable roads.
  const point = (index: number) => ({
    x: Math.round(80 + (parks[index].lon + 95.8) * 500),
    y: Math.round(55 + (33.5 - parks[index].lat) * 380),
  });
  const routeLine = (indices: number[]) => indices.map(index => {
    const coordinate = point(index);
    return coordinate.x + "," + coordinate.y;
  }).join(" ");
  const northStops = [3, 4, 2, 0];
  const eastStops = [3, 5, 1];
  const park = parks[selected];
  const mapUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${park.lon - 0.10}%2C${park.lat - 0.075}%2C${park.lon + 0.10}%2C${park.lat + 0.075}&layer=mapnik&marker=${park.lat}%2C${park.lon}`;
  return <div className="mt-8 border border-border bg-background p-4 sm:p-6">
    <h3 className="font-display text-2xl">Explore the parks on a map</h3>
    <p className="mt-2 text-sm leading-7 text-muted-foreground">Choose a park to center the interactive OpenStreetMap view. Pins are approximate park locations for trip orientation, not entrance or navigation coordinates. Confirm the official entrance before driving.</p>
    <section className="mt-6 border border-border bg-background p-3 sm:p-5" aria-labelledby="east-texas-all-parks-heading">
      <h4 id="east-texas-all-parks-heading" className="font-display text-xl">All six parks on one map</h4>
      <p className="mt-2 text-sm leading-6 text-muted-foreground">This geographic overview shows every featured park and two possible stop sequences. Connecting lines are straight-line planning guides, <strong>not roads or driving directions</strong>. Use the live Google Maps routes below for real road paths and turn-by-turn navigation.</p>
      <div className="mt-4 overflow-x-auto" aria-label="Scrollable six-park overview">
        <svg viewBox="0 0 1040 610" role="img" aria-label="Approximate locations of Daingerfield, Caddo Lake, Lake Bob Sandlin, Tyler, Cooper Lake, and Martin Creek Lake state parks with northern and eastern suggested stop sequences" className="w-full" style={{ minWidth: 720 }}>
          <rect x={0} y={0} width={1040} height={610} rx={16} fill="#f2f5f0" />
          <text x={45} y={39} fontSize={20} fill="#485e55">NORTH</text>
          <path d="M 62 99 L 62 54 M 53 66 L 62 54 L 71 66" fill="none" stroke="#485e55" strokeWidth={3} />
          {[160,300,440,580,720,860].map(x => <line key={"x"+x} x1={x} x2={x} y1={60} y2={575} stroke="#cbdad4" strokeDasharray="7 9" />)}
          {[130,260,390,520].map(y => <line key={"y"+y} x1={70} x2={980} y1={y} y2={y} stroke="#cbdad4" strokeDasharray="7 9" />)}
          <polyline points={routeLine(northStops)} fill="none" stroke="#ab672c" strokeWidth={9} strokeLinecap="round" strokeLinejoin="round" opacity={0.85}/>
          <polyline points={routeLine(eastStops)} fill="none" stroke="#287885" strokeWidth={9} strokeLinecap="round" strokeLinejoin="round" opacity={0.85}/>
          {parks.map((place, index) => {
            const coordinate = point(index);
            return <g key={place.name}>
              <circle cx={coordinate.x} cy={coordinate.y} r={index === selected ? 17 : 14} fill={index === selected ? "#f6bd50" : "#ffffff"} stroke="#244439" strokeWidth={4} />
              <text x={coordinate.x + (coordinate.x > 800 ? -16 : 16)} y={coordinate.y - 21} textAnchor={coordinate.x > 800 ? "end" : "start"} fontSize={23} fontWeight={index === selected ? 750 : 600} fill="#173e33">{place.name}</text>
            </g>;
          })}
          <text x={68} y={580} fontSize={18} fill="#50625e">Approximate locations · Not to road scale</text>
        </svg>
      </div>
      <div className="mt-3 flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
        <span><span aria-hidden="true" style={{ color: "#ab672c" }}>●</span> Northeast Texas stop sequence</span>
        <span><span aria-hidden="true" style={{ color: "#287885" }}>●</span> Eastern Piney Woods stop sequence</span>
        <span>Highlighted marker = selected park below</span>
      </div>
    </section>
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
  {
    slug: "martin-creek-lake-state-park",
    name: "Martin Creek Lake State Park",
    source: "https://commons.wikimedia.org/wiki/File:Docks_at_Martin_Creek_Lake_State_Park_2019.jpg",
    license: "https://creativecommons.org/licenses/by/4.0/",
    season: "June 2019 lakeshore and trees — not fall foliage",
    overrideSrc: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e2/Docks_at_Martin_Creek_Lake_State_Park_2019.jpg/960px-Docks_at_Martin_Creek_Lake_State_Park_2019.jpg",
    overrideAlt: "Lake shoreline, dock and wooded backdrop at Martin Creek Lake State Park",
  },
  {
    slug: "daingerfield-state-park",
    name: "Daingerfield State Park — October lake reflection",
    source: "https://commons.wikimedia.org/wiki/File:Daingerfield_sp_reflection.jpg",
    license: "https://creativecommons.org/licenses/by/4.0/",
    season: "October 24, 2014 — early autumn with some changing hardwoods, not current conditions",
    overrideSrc: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1c/Daingerfield_sp_reflection.jpg/960px-Daingerfield_sp_reflection.jpg",
    overrideAlt: "October view of Lake Daingerfield, with trees and fall-season color reflected in the water",
  },
] as const;

export function EastTexasFoliagePhotoGallery() {
  return <section className="mt-10" aria-labelledby="east-texas-foliage-gallery">
    <h3 id="east-texas-foliage-gallery" className="font-display text-2xl">Photographs of the featured parks</h3>
    <p className="mt-2 text-sm leading-7 text-muted-foreground">Seven properly attributed photographs cover all six parks, including an October Daingerfield view. The dates are provided for context; none of these images verifies current 2026 color. The Martin Creek image is a woodland lakeshore view rather than the earlier industrial photograph.</p>
    <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {PHOTO_SELECTION.map((item) => {
        const photo = stateParkHeroMap[item.slug];
        if (!photo) return null;
        return <figure key={item.source} className="overflow-hidden border border-border bg-background">
          <img src={"overrideSrc" in item ? item.overrideSrc : photo.src} width={"overrideSrc" in item ? 960 : photo.width} height={"overrideSrc" in item ? 640 : photo.height} alt={"overrideAlt" in item ? item.overrideAlt : photo.alt} loading="lazy" decoding="async" style={{ aspectRatio: "4 / 3" }} className="w-full object-cover" onError={(event) => recoverOrHideImage(event.currentTarget)} />
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
    <p className="mt-4 text-sm leading-7 text-muted-foreground">For Martin Creek, the gallery uses Larry D. Moore's separately licensed 2019 dock and shoreline photograph instead of the industrial-facing park photo. For current conditions, visit the <a href="https://tpwd.texas.gov/state-parks/martin-creek-lake" target="_blank" rel="noopener noreferrer" className="text-primary underline underline-offset-4">official Martin Creek Lake park page ↗</a>.</p>
    <p className="mt-4 text-sm leading-7 text-muted-foreground">For actual autumn examples, view the <a href="https://tpwd.texas.gov/newsmedia/news_images/?g=fall_foliage&i=daingerfield_sp_0344.jpg" target="_blank" rel="noopener noreferrer" className="text-primary underline underline-offset-4">official TPWD Daingerfield fall-foliage photograph ↗</a>. It is linked for reference, not republished or presented as this year's conditions.</p>
  </section>;
}
