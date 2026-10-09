type RegionReference = {
  name: string;
  anchor: string;
  orientation: string;
  rainfall: string;
  elevation: string;
  terrain: string;
  vegetation: string;
  water: string;
  wildlife: string;
  communities: string;
  pressure: string;
  placeLabel: string;
  placeHref: string;
};

const regionReferences: readonly RegionReference[] = [
  {
    name: "Piney Woods",
    anchor: "1-piney-woods",
    orientation: "Far East Texas",
    rainfall: "36–50 in/yr",
    elevation: "200–500 ft",
    terrain: "Rolling acidic sands and sandy loams with broad river bottomlands.",
    vegetation: "Pine and pine-hardwood forest, bottomland hardwoods and wetlands.",
    water: "Sabine and Neches systems, bayous, sloughs and forested floodplains.",
    wildlife: "White-tailed deer, eastern wild turkey, woodpeckers and wetland-dependent birds, amphibians and reptiles.",
    communities: "Tyler, Longview, Lufkin and Nacogdoches.",
    pressure: "Forest fragmentation, development and changes to fire and bottomland hydrology.",
    placeLabel: "Big Thicket National Preserve",
    placeHref: "/destination/big-thicket-national-preserve",
  },
  {
    name: "Gulf Prairies and Marshes",
    anchor: "2-gulf-prairies-and-marshes",
    orientation: "Texas Gulf Coast",
    rainfall: "30–50 in/yr",
    elevation: "Mostly below 150 ft",
    terrain: "Nearly level coastal plain with sandy soils, clayey bottoms, bays and barrier islands.",
    vegetation: "Coastal tallgrass prairie, marsh, live-oak mottes and river-bottom woodland.",
    water: "Bays, estuaries, marshes, tidal systems and low-gradient coastal rivers.",
    wildlife: "Migratory shorebirds and waterfowl, wading birds, alligators and estuary-dependent fish and shellfish.",
    communities: "Houston coastal edge, Galveston, Victoria and Corpus Christi.",
    pressure: "Wetland and prairie loss, urbanization, subsidence, storm surge and altered freshwater inflows.",
    placeLabel: "Galveston Island State Park",
    placeHref: "/destination/galveston-island-state-park",
  },
  {
    name: "Post Oak Savannah",
    anchor: "3-post-oak-savannah",
    orientation: "East-central Texas",
    rainfall: "28–40 in/yr",
    elevation: "300–800 ft",
    terrain: "Gently rolling to hilly sandy uplands with loam-to-clay bottomlands.",
    vegetation: "Post oak and blackjack oak savannah interspersed with native grassland.",
    water: "Tributaries crossing toward the Trinity, Brazos and lower Colorado systems.",
    wildlife: "White-tailed deer, wild turkey, bobwhite and woodland-edge songbirds.",
    communities: "Bryan-College Station, Bastrop, Palestine and east-central Texas transition communities.",
    pressure: "Prairie conversion, woody thickening, fragmentation and fast-growing metro edges.",
    placeLabel: "Cooper Lake State Park",
    placeHref: "/destination/cooper-lake-south-sulphur-unit-state-park",
  },
  {
    name: "Blackland Prairie",
    anchor: "4-blackland-prairie",
    orientation: "North-central to Central Texas",
    rainfall: "28–40 in/yr",
    elevation: "300–800 ft",
    terrain: "Nearly level to rolling country dominated by deep dark alkaline clays.",
    vegetation: "Former tallgrass prairie with big bluestem, little bluestem, Indiangrass and switchgrass.",
    water: "Upper Trinity and Brazos tributaries plus numerous urban and agricultural reservoirs.",
    wildlife: "Grassland birds, pollinators, white-tailed deer and small mammals associated with prairie remnants.",
    communities: "Dallas, Waco, Temple and the eastern Austin corridor.",
    pressure: "Historic prairie conversion, urban expansion and severe fragmentation of remnant grasslands.",
    placeLabel: "Cedar Hill State Park",
    placeHref: "/destination/cedar-hill-state-park",
  },
  {
    name: "Cross Timbers",
    anchor: "5-cross-timbers",
    orientation: "North-central Texas",
    rainfall: "Moderate but erratic",
    elevation: "Irregular plains and uplands",
    terrain: "Sandy-to-loamy belts of wooded ridges, savannah and prairie.",
    vegetation: "Post oak and blackjack oak woodland alternating with tall- and mixed-grass prairie.",
    water: "Brazos and Trinity tributaries, reservoirs and rocky creek systems.",
    wildlife: "White-tailed deer, wild turkey, bobwhite and species that use woodland-grassland edges.",
    communities: "Fort Worth, Denton, Weatherford and Mineral Wells.",
    pressure: "Metro fragmentation, woody encroachment and loss of connected woodland-prairie mosaics.",
    placeLabel: "Lake Mineral Wells State Park",
    placeHref: "/destination/lake-mineral-wells-state-park",
  },
  {
    name: "South Texas Plains",
    anchor: "6-south-texas-plains",
    orientation: "South Texas and the lower Rio Grande corridor",
    rainfall: "20–32 in/yr",
    elevation: "Mostly low plains and inland uplands",
    terrain: "Clay and clay-loam plains, caliche soils and subtropical lower-valley landscapes.",
    vegetation: "Mesquite, acacia, prickly pear, thornscrub, grassland and subtropical woodland.",
    water: "Rio Grande, Nueces systems, resacas and irrigation-dependent lower-valley habitats.",
    wildlife: "Javelina, white-tailed deer, bobwhite, raptors and subtropical resident and migratory birds.",
    communities: "Laredo, McAllen, Edinburg and the lower Rio Grande Valley.",
    pressure: "Habitat fragmentation, groundwater and surface-water stress, brush alteration and urban growth.",
    placeLabel: "Bentsen-Rio Grande Valley State Park",
    placeHref: "/destination/bentsen-rio-grande-valley-state-park",
  },
  {
    name: "Edwards Plateau",
    anchor: "7-edwards-plateau",
    orientation: "Central Texas and the Hill Country",
    rainfall: "15–34 in/yr",
    elevation: "Under 100 to over 3,000 ft",
    terrain: "Limestone plateau, karst, steep canyonlands, caves and thin rocky soils.",
    vegetation: "Grassland, Ashe juniper, live oak, mesquite savannah and cypress-lined riparian corridors.",
    water: "Edwards and related aquifers, major springs and spring-fed Hill Country rivers.",
    wildlife: "White-tailed deer, golden-cheeked warbler habitat, bats and highly localized cave and spring species.",
    communities: "Kerrville, Fredericksburg, Junction and the western edges of Austin and San Antonio.",
    pressure: "Aquifer demand, rapid development, habitat fragmentation and altered fire/woody-cover patterns.",
    placeLabel: "Pedernales Falls State Park",
    placeHref: "/destination/pedernales-falls-state-park",
  },
  {
    name: "Rolling Plains",
    anchor: "8-rolling-plains",
    orientation: "Northwest Texas east of the Caprock",
    rainfall: "20–28 in/yr",
    elevation: "800–3,000 ft",
    terrain: "Rolling grassland, red soils, river breaks, cliffs and canyons below the Caprock.",
    vegetation: "Mixed- and shortgrass prairie with mesquite savannah and hardwood floodplains.",
    water: "Headwaters and tributaries of the Red, Brazos and Colorado river systems.",
    wildlife: "White-tailed deer, wild turkey, bobwhite and grassland and riparian wildlife of river breaks and open plains.",
    communities: "Wichita Falls, Vernon, Childress and communities below the Caprock.",
    pressure: "Drought, erosion, woody encroachment and long-term grassland condition.",
    placeLabel: "Caprock Canyons State Park",
    placeHref: "/destination/caprock-canyons-state-park",
  },
  {
    name: "High Plains",
    anchor: "9-high-plains",
    orientation: "Panhandle and South Plains",
    rainfall: "15–22 in/yr",
    elevation: "3,000–4,500 ft",
    terrain: "Broad, elevated Llano Estacado tableland with clay-to-sandy soils over caliche.",
    vegetation: "Shortgrass prairie dominated historically by buffalo grass and blue grama.",
    water: "Ogallala Aquifer and thousands of playa-lake depressions.",
    wildlife: "Pronghorn, prairie wildlife and large concentrations of migratory waterfowl using playa lakes.",
    communities: "Amarillo, Lubbock, Plainview and Hereford.",
    pressure: "Groundwater depletion, conversion of native prairie and loss or alteration of playa habitat.",
    placeLabel: "Palo Duro Canyon State Park",
    placeHref: "/destination/palo-duro-canyon-state-park",
  },
  {
    name: "Trans-Pecos",
    anchor: "10-trans-pecos",
    orientation: "Far West Texas",
    rainfall: "Mostly under 12 in/yr",
    elevation: "2,500 to 8,749+ ft",
    terrain: "Chihuahuan Desert basins, volcanic and limestone ranges, mesas and canyon country.",
    vegetation: "Creosote-tarbush desert scrub, desert grassland, yucca-juniper savannah and mountain woodland.",
    water: "Rio Grande, Pecos River, desert springs and isolated mountain watersheds.",
    wildlife: "Mule deer, black bear, javelina, mountain lion and desert- and mountain-adapted birds and reptiles.",
    communities: "El Paso, Alpine, Marfa and Fort Davis.",
    pressure: "Water scarcity, invasive species, extreme heat and fragmentation of desert and riparian habitat.",
    placeLabel: "Big Bend National Park",
    placeHref: "/destination/big-bend-national-park",
  },
] as const;

const frameworkSources = [
  {
    label: "TPWD — 10 natural regions / ecoregions",
    href: "https://tpwd.texas.gov/education/hunter-education/online-course/wildlife-conservation/texas-ecoregions",
  },
  {
    label: "TPWD — Level III ecoregion GIS vectors",
    href: "https://tpwd.texas.gov/gis/programs/landscape-ecology/by-ecoregion-vector",
  },
  {
    label: "EPA — Level III and IV ecoregions",
    href: "https://www.epa.gov/eco-research/level-iii-and-iv-ecoregions-continental-united-states",
  },
] as const;

export function TexasEcoregionsAuthority() {
  return (
    <section className="mt-10 space-y-10" aria-labelledby="ecoregions-authority-heading">
      <div className="rounded-2xl border border-border bg-surface p-5 sm:p-7">
        <p className="eyebrow text-primary">Classification note</p>
        <h2 id="ecoregions-authority-heading" className="mt-2 font-display text-3xl font-semibold leading-tight">
          Why Texas ecoregion maps show different numbers
        </h2>
        <div className="mt-4 space-y-3 text-sm leading-7 text-muted-foreground sm:text-base">
          <p>
            This guide uses the <strong className="text-foreground">10-region Texas Parks and Wildlife natural-region framework</strong> because it is the clearest statewide orientation system for travelers, landowners and general readers.
          </p>
          <p>
            TPWD also publishes an EPA-style <strong className="text-foreground">Level III GIS layer with 12 Texas ecoregions</strong>. That is a different hierarchical classification, not a contradiction. Older TPWD natural-region maps may also separate features such as the Llano Uplift or Coastal Sand Plain, so a reader can legitimately encounter 10, 11, 12 or many more named ecological units depending on map purpose and scale.
          </p>
          <p>
            Use the 10-region map here for statewide orientation. Use the official TPWD/EPA GIS layers for exact boundary work, environmental analysis or parcel-level decisions.
          </p>
        </div>
        <ul className="mt-5 grid gap-2 text-sm sm:grid-cols-3">
          {frameworkSources.map((source) => (
            <li key={source.href}>
              <a href={source.href} target="_blank" rel="noreferrer" className="block rounded-xl border border-border bg-background px-4 py-3 font-semibold text-foreground transition hover:border-primary hover:text-primary">
                {source.label} ↗
              </a>
            </li>
          ))}
        </ul>
      </div>

      <nav className="rounded-2xl border border-border p-5 sm:p-7" aria-label="Jump to a Texas ecoregion">
        <p className="eyebrow text-primary">Jump to a region</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {regionReferences.map((region, index) => (
            <a key={region.name} href={`#${region.anchor}`} className="rounded-full border border-border px-3 py-2 text-sm font-semibold text-foreground transition hover:border-primary hover:text-primary">
              {index + 1}. {region.name}
            </a>
          ))}
          <a href="#methodology-sources-and-citation" className="rounded-full border border-border px-3 py-2 text-sm font-semibold text-foreground transition hover:border-primary hover:text-primary">
            Methodology
          </a>
        </div>
      </nav>

      <section aria-labelledby="ecoregion-reference-table-heading">
        <p className="eyebrow text-primary">At-a-glance reference</p>
        <h2 id="ecoregion-reference-table-heading" className="mt-2 font-display text-3xl font-semibold leading-tight">
          Compare all 10 TPWD natural regions
        </h2>
        <p className="mt-3 text-sm leading-7 text-muted-foreground sm:text-base">
          Rainfall and elevation values below come from TPWD's statewide 10-region overview where TPWD publishes a range. Cross Timbers and South Texas terrain are summarized without inventing a single statewide elevation band.
        </p>
        <div className="mt-6 overflow-x-auto rounded-2xl border border-border">
          <table className="min-w-[860px] w-full border-collapse text-left text-sm">
            <thead className="bg-surface text-foreground">
              <tr>
                <th className="px-4 py-3 font-semibold">Region</th>
                <th className="px-4 py-3 font-semibold">Where</th>
                <th className="px-4 py-3 font-semibold">Rainfall</th>
                <th className="px-4 py-3 font-semibold">Elevation / terrain</th>
                <th className="px-4 py-3 font-semibold">Landscape clue</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {regionReferences.map((region) => (
                <tr key={region.name} className="align-top">
                  <td className="px-4 py-4 font-semibold text-foreground"><a href={`#${region.anchor}`} className="hover:text-primary">{region.name}</a></td>
                  <td className="px-4 py-4 text-muted-foreground">{region.orientation}</td>
                  <td className="px-4 py-4 text-muted-foreground">{region.rainfall}</td>
                  <td className="px-4 py-4 text-muted-foreground">{region.elevation}</td>
                  <td className="px-4 py-4 text-muted-foreground">{region.terrain}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section aria-labelledby="ecoregion-field-guide-heading">
        <p className="eyebrow text-primary">Field guide</p>
        <h2 id="ecoregion-field-guide-heading" className="mt-2 font-display text-3xl font-semibold leading-tight">
          What defines each region — and where to experience it
        </h2>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {regionReferences.map((region) => (
            <article key={region.name} className="rounded-2xl border border-border p-5">
              <h3 className="font-display text-2xl font-semibold"><a href={`#${region.anchor}`} className="hover:text-primary">{region.name}</a></h3>
              <p className="mt-1 text-sm font-semibold text-primary">{region.orientation} · {region.rainfall} · {region.elevation}</p>
              <dl className="mt-4 space-y-3 text-sm leading-6">
                <div><dt className="font-semibold text-foreground">Vegetation</dt><dd className="text-muted-foreground">{region.vegetation}</dd></div>
                <div><dt className="font-semibold text-foreground">Water</dt><dd className="text-muted-foreground">{region.water}</dd></div>
                <div><dt className="font-semibold text-foreground">Wildlife</dt><dd className="text-muted-foreground">{region.wildlife}</dd></div>
                <div><dt className="font-semibold text-foreground">Major communities</dt><dd className="text-muted-foreground">{region.communities}</dd></div>
                <div><dt className="font-semibold text-foreground">Management pressures</dt><dd className="text-muted-foreground">{region.pressure}</dd></div>
              </dl>
              <p className="mt-4 text-xs leading-5 text-muted-foreground">Region data: <a href={frameworkSources[0].href} target="_blank" rel="noreferrer" className="font-semibold text-foreground underline decoration-border underline-offset-4 hover:text-primary">TPWD 10-region overview</a></p>
              <a href={region.placeHref} className="mt-5 inline-block border-b border-primary pb-1 text-sm font-semibold text-primary">
                Experience it: {region.placeLabel} →
              </a>
            </article>
          ))}
        </div>
      </section>
    </section>
  );
}
