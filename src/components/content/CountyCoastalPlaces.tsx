import type { TexasEntityRecord } from '@/data/knowledge-graph/types';

type CoastalLink = readonly [slug: string, name: string, destinationSlug?: string];

const COUNTY_COASTAL_LINKS: Record<string, readonly CoastalLink[]> = {
  jefferson: [
    ['sea-rim-state-park', 'Sea Rim State Park'],
    ['mcfaddin-beach', 'McFaddin Beach'],
  ],
  galveston: [
    ['high-island-beach', 'High Island Beach'],
    ['crystal-beach', 'Crystal Beach'],
    ['retillion-road-beach-access', 'Retillion Road Beach Access'],
    ['fort-travis-seashore-park', 'Fort Travis Seashore Park'],
    ['east-beach-galveston', 'East Beach'],
    ['stewart-beach', 'Stewart Beach'],
    ['galveston-seawall-beaches', 'Galveston Seawall Beaches'],
    ['porretto-beach', 'Porretto Beach'],
    ['babes-beach', "Babe's Beach"],
    ['galveston-pocket-park-1', 'Galveston Pocket Park 1'],
    ['galveston-pocket-park-2', 'Galveston Pocket Park 2'],
    ['galveston-pocket-park-3', 'Galveston Pocket Park 3'],
    ['galveston-island-state-park-coast', 'Galveston Island State Park', 'galveston-island-state-park'],
    ['jamaica-beach', 'Jamaica Beach'],
    ['san-luis-pass-beach', 'San Luis Pass Beach'],
    ['mooner-beach', 'Mooner Beach'],
  ],
  harris: [
    ['sylvan-beach-park', 'Sylvan Beach Park'],
    ['el-jardin-beach', 'El Jardin Beach'],
  ],
  brazoria: [
    ['san-luis-pass-beach', 'San Luis Pass Beach'],
    ['surfside-beach', 'Surfside Beach'],
    ['quintana-beach-county-park', 'Quintana Beach County Park'],
    ['bryan-beach', 'Bryan Beach'],
  ],
  matagorda: [
    ['sargent-beach', 'Sargent Beach'],
    ['matagorda-beach', 'Matagorda Beach'],
    ['matagorda-bay-nature-park', 'Matagorda Bay Nature Park'],
    ['palacios-bay-beach', 'Palacios Bay Beach'],
  ],
  calhoun: [
    ['magnolia-beach', 'Magnolia Beach'],
    ['lighthouse-beach-port-lavaca', 'Lighthouse Beach'],
    ['king-fisher-beach', 'King Fisher Beach'],
    ['sunday-beach', 'Sunday Beach'],
  ],
  aransas: [
    ['rockport-beach', 'Rockport Beach'],
    ['fulton-beach-park', 'Fulton Beach Park'],
    ['goose-island-state-park-coast', 'Goose Island State Park', 'goose-island-state-park'],
    ['san-jose-island', 'San José Island / St. Jo Island'],
  ],
  nueces: [
    ['ib-magee-beach-park', 'I.B. Magee Beach Park'],
    ['port-aransas-beach', 'Port Aransas Beach'],
    ['tony-amos-city-beach', 'Tony Amos City Beach'],
    ['mustang-island-state-park', 'Mustang Island State Park'],
    ['north-beach-corpus-christi', 'North Beach'],
    ['mcgee-beach', 'McGee Beach'],
    ['cole-park-beach', 'Cole Park Beach'],
    ['oso-bay-coast', 'Oso Bay Coast & Wetlands Preserve'],
    ['whitecap-beach', 'Whitecap Beach'],
    ['malaquite-beach', 'Malaquite Beach'],
    ['padre-island-national-seashore-backcountry', 'Padre Island National Seashore Backcountry / South Beach'],
  ],
  kleberg: [
    ['padre-island-national-seashore-backcountry', 'Padre Island National Seashore Backcountry / South Beach'],
    ['yarborough-pass', 'Yarborough Pass'],
  ],
  kenedy: [
    ['padre-island-national-seashore-backcountry', 'Padre Island National Seashore Backcountry / South Beach'],
  ],
  cameron: [
    ['south-padre-island-beaches', 'South Padre Island Beaches'],
    ['isla-blanca-park', 'Isla Blanca Park'],
    ['andy-bowie-county-park', 'Andy Bowie County Park'],
    ['ek-atwood-park', 'E.K. Atwood Park'],
    ['boca-chica-beach', 'Boca Chica Beach'],
  ],
};

export function CountyCoastalPlaces({ county }: { county: TexasEntityRecord }) {
  const places = COUNTY_COASTAL_LINKS[county.slug] ?? [];
  if (!places.length) return null;

  return <section className="border-b border-border py-12" aria-labelledby="county-coastal-places-heading">
    <div className="grid gap-8 lg:grid-cols-[14rem_1fr]">
      <div>
        <p className="eyebrow text-primary">Beaches &amp; coast</p>
        <h2 id="county-coastal-places-heading" className="mt-2 font-display text-4xl">Coastal places in {county.name}</h2>
      </div>
      <div>
        <p className="max-w-3xl text-base leading-7 text-muted-foreground">TexasDefined tracks {places.length} {places.length === 1 ? 'coastal place' : 'coastal places'} whose public shoreline, access or management intersects {county.name}. Each destination guide includes verified coordinates, current-source planning guidance and a location-specific rights-cleared hero image.</p>
        <div className="mt-7 grid gap-x-8 sm:grid-cols-2">
          {places.map(([slug, name, destinationSlug]) => <a key={slug} href={`/destination/${destinationSlug ?? slug}`} className="group border-t border-border py-4">
            <strong className="block font-display text-xl leading-tight group-hover:text-primary">{name}</strong>
            <span className="mt-2 block text-xs font-semibold uppercase tracking-[0.12em] text-primary">Open full destination guide →</span>
          </a>)}
        </div>
        <div className="mt-6 flex flex-wrap gap-x-6 gap-y-3 text-sm font-semibold">
          <a href="/explore/beaches-coast#texas-coast-directory" className="underline decoration-primary/40 underline-offset-4 hover:text-primary">Statewide Texas beaches &amp; coast guide</a>
          <a href="/explore/road-trips" className="underline decoration-primary/40 underline-offset-4 hover:text-primary">Texas road trips</a>
          <a href="/fishing" className="underline decoration-primary/40 underline-offset-4 hover:text-primary">Texas fishing</a>
        </div>
      </div>
    </div>
  </section>;
}
