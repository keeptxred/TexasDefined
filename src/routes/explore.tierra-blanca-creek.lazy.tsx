import { createLazyFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import { Container } from "@/components/layout/Container";
import { TierraBlancaVisitorEvidence } from "@/components/explore/TierraBlancaVisitorEvidence";

type Source = { name: string; url: string; supports: string };
const sources: Source[] = [
  { name: "Texas State Historical Association — Tierra Blanca Creek", url: "https://www.tshaonline.org/handbook/entries/tierra-blanca-creek", supports: "Course, confluence, settlements, reservoirs and the creek's High Plains setting" },
  { name: "U.S. Fish & Wildlife Service — Buffalo Lake NWR visitor information", url: "https://www.fws.gov/refuge/buffalo-lake/visit-us", supports: "Public access, trails, seasonal hours, fees and directions near Umbarger" },
  { name: "U.S. Fish & Wildlife Service — Buffalo Lake detailed trail descriptions", url: "https://www.fws.gov/refuge/buffalo-lake/visit-us/trails", supports: "Trail names, descriptive lengths, summary-card discrepancies, natural surfaces and mobility notes" },
  { name: "U.S. Fish & Wildlife Service — Buffalo Lake activities", url: "https://www.fws.gov/refuge/buffalo-lake/visit-us/activities", supports: "Primitive camping, toilets and wildlife activities" },
  { name: "U.S. Fish & Wildlife Service — Buffalo Lake winter photograph and license", url: "https://www.fws.gov/media/buffalo-lake-winter", supports: "Actual winter refuge scenery, Christena Stephens; media record explicitly marked public domain" },
  { name: "U.S. Fish & Wildlife Service — Buffalo Lake turkeys photograph and license", url: "https://www.fws.gov/media/rio-grande-turkeys-buffalo-lake-refuge", supports: "Documented refuge wildlife photo credited Robert Burton/USFWS, public domain" },
  { name: "UNT Portal to Texas History — Tierra Blanca flood in 1965", url: "https://texashistory.unt.edu/ark:/67531/metapth13553/", supports: "Named primary-source creek flood photo; linked rather than republished without reuse permission" },
  { name: "U.S. Fish & Wildlife Service — Buffalo Lake refuge history", url: "https://www.fws.gov/refuge/buffalo-lake/about-us", supports: "1937 water-conservation project, 1938 dam, 1970s creek drying, typically dry modern refuge" },
  { name: "U.S. Fish & Wildlife Service — Refuge rules", url: "https://www.fws.gov/refuge/buffalo-lake/visit-us/rules-policies", supports: "No collecting, access boundaries, wildlife and trail protections" },
  { name: "Panhandle-Plains Historical Museum — temporary closure and outreach", url: "https://www.panhandleplains.org/p/about/pphm-temporary-closure-updates", supports: "Closed building, current visitor restrictions and alternatives through traveling exhibitions and off-site programs" },
  { name: "Texas Parks & Wildlife — Palo Duro Canyon State Park", url: "https://tpwd.texas.gov/state-parks/palo-duro-canyon", supports: "Park access, activities, warnings and reservations" },
  { name: "Texas Parks & Wildlife — Palo Duro Canyon maps and directions", url: "https://tpwd.texas.gov/state-parks/palo-duro-canyon/map", supports: "Public park entrance, road approach and boundaries" },
  { name: "Texas Historical Commission — Archeology FAQ", url: "https://thc.texas.gov/preserve/archeology-texas/archeology-faq", supports: "Artifact protections, private land and reporting finds" },
  { name: "Texas Beyond History — Protohistoric Panhandle cultures", url: "https://www.texasbeyondhistory.net/landis/images/proto-spanish-textbox.html", supports: "Tierra Blanca archaeological complex and its distinction from Antelope Creek; affiliation hypotheses remain tentative" },
  { name: "University of Arizona Press — Panhandle–Pueblo interactions", url: "https://open.uapress.arizona.edu/read/farmers-hunters-and-colonists/section/db0936cc-5185-42db-ae75-ed9dc2160b87", supports: "Published research on Tierra Blanca complex, Pueblo trade connections and 15th–17th-century interpretation" },
  { name: "Texas State Historical Association — Antelope Creek phase", url: "https://www.tshaonline.org/handbook/entries/antelope-creek-phase", supports: "Regional Panhandle archaeology; NOT evidence for a particular Tierra Blanca creek bank" },
  { name: "Georgia O'Keeffe Museum — Untitled (Palo Duro Canyon), 1916–1917", url: "https://access-ok.okeeffemuseum.org/object/615/", supports: "Documented artwork and subject, without assuming a Tierra Blanca painting site" },
  { name: "New Mexico Museum of Art — Palo Duro Canyon (Special No. 21)", url: "https://sam.nmartmuseum.org/objects/9470/palo-duro-canyon", supports: "Museum-held Palo Duro Canyon painting, 1916–1917" },
] as const;

const related = [
  { url: "/destination/palo-duro-canyon-state-park", label: "Palo Duro Canyon State Park", detail: "The managed public canyon destination: trails, campsites, entry and safety" },
  { url: "/destination/buffalo-lake-national-wildlife-refuge", label: "Buffalo Lake National Wildlife Refuge", detail: "Managed public trails and protected habitat along the Tierra Blanca drainage" },
  { url: "/explore/near/amarillo/road-trips", label: "Road trips from Amarillo", detail: "Use Canyon and the refuge as a deliberate loop, not a supposed creek-access shortcut" },
  { url: "/explore/near/amarillo/day-trips", label: "Day trips from Amarillo", detail: "Choose a single major outing and check current conditions" },
  { url: "/explore/route-66/texas-road-trip", label: "Texas Route 66 road trip", detail: "Connect the Panhandle landscape with Amarillo's roadside heritage" },
  { url: "/county/randall", label: "Randall County and Canyon history", detail: "Ranching, the county seat and historic developments around the creek junction" },
  { url: "/explore/region/panhandle", label: "Explore the Texas Panhandle", detail: "More landscapes and culture across the High Plains" },
] as const;

const itineraries = [
  {
    time: "Half day",
    heading: "See the upper creek landscape at a public refuge",
    body: "Drive southwest from Amarillo toward Umbarger and use the established entrance to Buffalo Lake National Wildlife Refuge, off FM 168 about 1.5 miles south of Umbarger. From its designated roads, overlook and marked trails, study the grassland-to-drainage transition. The impoundment is not a promise of a full lake: levels and surface water vary. The refuge's Cottonwood Canyon and Grassland Loop trails are different from Palo Duro's cliff trails.",
    action: "Check refuge hours before leaving",
    url: "https://www.fws.gov/refuge/buffalo-lake/visit-us",
  },
  {
    time: "Full day",
    heading: "Canyon's history, then the state park",
    body: "Begin in Canyon for the regional-history context, then take State Highway 217 east to the official Palo Duro Canyon State Park entrance on Park Road 5. The park's developed trails and overlooks show the dramatic downstream canyon landscape. It is not a public trail following Tierra Blanca Creek from the town of Canyon, and the two locations should never be presented as interchangeable.",
    action: "Check Palo Duro maps, access and alerts",
    url: "https://tpwd.texas.gov/state-parks/palo-duro-canyon/map",
  },
  {
    time: "Weekend",
    heading: "Amarillo, Canyon and the creek's two very different faces",
    body: "Give the first day to Canyon's public historical markers and western High Plains setting, with Buffalo Lake refuge as the public-access creek stop. The Panhandle-Plains Historical Museum building remains closed to walk-in visitors; check its official updates for off-site programs. Keep a separate morning for Palo Duro Canyon so heat, daylight and trail choice do not get squeezed by road time. Route 66 sights can fill a flexible final afternoon; they are not physically on Tierra Blanca Creek.",
    action: "Compare Amarillo road-trip choices",
    url: "/explore/near/amarillo/road-trips",
  },
] as const;

export const Route = createLazyFileRoute("/explore/tierra-blanca-creek")({ component: TierraBlancaCreekGuide });

function TierraBlancaCreekGuide() {
  // RootShell hydration can finish before this lazy route's own React tree.
  // Both first-party lodging scripts must wait for this commitment before
  // replacing children in the explicit commercial slot.
  useEffect(() => {
    document.documentElement.dataset.tdTierraBlancaHydrated = "1";
    window.dispatchEvent(new Event("texasdefined:tierra-blanca-hydrated"));
    return () => { delete document.documentElement.dataset.tdTierraBlancaHydrated; };
  }, []);
  return (
    <main className="pb-20">
      <Container className="pt-8">
        <nav aria-label="Breadcrumbs" className="text-sm text-muted-foreground">
          <a href="/" className="hover:text-primary">Home</a> <span aria-hidden="true">/</span> <a href="/explore" className="hover:text-primary">Explore Texas</a> <span aria-hidden="true">/</span> Tierra Blanca Creek
        </nav>
        <article className="mx-auto max-w-5xl">
          <header className="border-b border-border pb-10 pt-10">
            <p className="eyebrow text-primary">Texas Panhandle · Randall County · Geography and history</p>
            <h1 className="mt-3 max-w-4xl font-display text-4xl leading-tight sm:text-5xl">Tierra Blanca Creek: the waterway behind the canyon country near Amarillo</h1>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-muted-foreground">
              The High Plains appear almost level until a drainage cuts into them. Tierra Blanca Creek helps explain that surprise. It flows toward Canyon, meets Palo Duro Creek, and contributes to the river system that carved the Panhandle's best-known canyon.
            </p>
            <p className="mt-4 text-sm text-muted-foreground">By TexasDefined's Travel &amp; Outdoors Desk · Geography, access and museum closure sources checked November 16, 2026 · <a href="#sources" className="text-primary underline underline-offset-4">Research method</a></p>
          </header>

          <figure className="border-b border-border py-10">
            <img src="/images/state-parks/palo-duro-canyon-state-park.jpg" width={1600} height={900} loading="eager" fetchPriority="high" decoding="async" className="aspect-video w-full rounded-lg object-cover" alt="Red and orange canyon cliffs at Palo Duro Canyon State Park, downstream from the Tierra Blanca and Palo Duro Creek confluence" />
            <figcaption className="mt-3 max-w-4xl text-sm leading-6 text-muted-foreground">Palo Duro Canyon State Park shows the dramatic downstream landscape. This is a photo of the state park, not a claimed photograph of Tierra Blanca Creek or a public creek access point. Existing TexasDefined image credit: Larry D. Moore, CC BY 4.0, Wikimedia Commons.</figcaption>
          </figure>

          <section className="grid gap-8 border-b border-border py-10 lg:grid-cols-2" aria-labelledby="first-answer">
            <div>
              <p className="eyebrow text-primary">Start here</p>
              <h2 id="first-answer" className="mt-2 font-display text-3xl">Is Tierra Blanca Creek the same place as Palo Duro Canyon?</h2>
              <p className="mt-4 text-base leading-8">No. Tierra Blanca is an upstream watercourse, not an alternate name for Palo Duro Canyon State Park. The Texas State Historical Association traces the creek from eastern New Mexico through Deaf Smith and Randall counties to a junction with Palo Duro Creek east of Canyon. That meeting forms the Prairie Dog Town Fork of the Red River. The waterway continues into Palo Duro Canyon.</p>
              <p className="mt-4 text-base leading-8">The distinction matters for a visitor. A creek on a geographic map does not establish a trailhead, parking lot or right of entry. Large stretches of rural Panhandle creek land are privately held. For legitimate, managed outings, use Buffalo Lake National Wildlife Refuge west of Canyon or the separately operated Palo Duro Canyon State Park east of Canyon.</p>
            </div>
            <aside className="border border-primary bg-background p-6" aria-label="The watercourse in order">
              <h3 className="font-display text-xl">Read the watercourse</h3>
              <ol className="mt-4 space-y-4 text-sm leading-6" style={{ listStyleType: "decimal", paddingLeft: "1.5rem" }}>
                <li><strong>Tierra Blanca Creek</strong> — flows through Deaf Smith and Randall counties</li>
                <li><strong>Palo Duro Creek</strong> — joins it east of Canyon</li>
                <li><strong>Prairie Dog Town Fork</strong> — formed at their confluence</li>
                <li><strong>Palo Duro Canyon</strong> — the downstream landform through which the river flows</li>
              </ol>
              <a className="mt-5 inline-block text-sm font-semibold text-primary underline underline-offset-4" href="https://www.tshaonline.org/handbook/entries/tierra-blanca-creek" target="_blank" rel="noopener noreferrer">Read the TSHA creek entry</a>
            </aside>
          </section>

          <TierraBlancaVisitorEvidence />

          <section className="border-b border-border py-10" aria-labelledby="landscape">
            <p className="eyebrow text-primary">How the terrain works</p>
            <h2 id="landscape" className="mt-2 font-display text-3xl">Where flat farmland becomes broken canyon country</h2>
            <div className="mt-5 space-y-4 text-base leading-8">
              <p>Much of the Llano Estacado is a broad, high, gently sloping surface. Streams reveal the relief that disappears across a distant horizon: cutbanks, local escarpments and branching valleys. The TSHA describes Tierra Blanca's upper course in flat-to-rolling country with local escarpments, followed by shallow depressions and changing soils. This is not the same exposed rock corridor at every point along its course.</p>
              <p>Water and erosion connect the visual extremes. Tierra Blanca and Palo Duro creeks converge near the old T Anchor Ranch headquarters area; downstream the Prairie Dog Town Fork exposes deeper geological layers in Palo Duro Canyon. The rust, ocher and pale rock bands that visitors photograph at the state park are the visible result of different sediments and long periods of erosion, not evidence that all the creek's banks look like the Lighthouse formation.</p>
              <p>Buffalo Lake, near Umbarger, is an impoundment on Tierra Blanca Creek. The U.S. Fish and Wildlife Service dates the conservation project to 1937 and Umbarger Dam to 1938. Springs and the creek's reliable flow declined in the 1970s as agricultural and urban groundwater use increased. FWS now describes the lake as typically dry, recharged mainly by major storm runoff. Plan around the refuge's birds, grasslands, marked trails and designated public viewing areas, not an expectation of swimming or boating.</p>
            </div>
          </section>

          <section className="border-b border-border py-10" aria-labelledby="people">
            <p className="eyebrow text-primary">Human history</p>
            <h2 id="people" className="mt-2 font-display text-3xl">Water, Indigenous histories and what an arrow point does—and doesn't—tell us</h2>
            <div className="mt-5 space-y-4 text-base leading-8">
              <p>Waterways shaped travel, wildlife movement and human life on the Southern High Plains long before the ranching period. Evidence from documented archaeological sites across the Texas Panhandle includes stone projectile points and tools, pottery and settlement features. The Antelope Creek phase, chiefly dated about A.D. 1200–1500, refers to a regional Plains Village archaeological tradition; it is <em>not</em> another name for Tierra Blanca Creek, and its better-studied core is along the Canadian River/Lake Meredith drainage.</p>
              <p>People may describe finding arrowheads along a creek. Such accounts alone cannot establish the age, cultural affiliation or exact provenience of an artifact. A projectile point could be a hunting implement from a different period than a nearby dwelling or another find. The context in which an object is found matters as much as its appearance. This article does not identify unrecorded artifact concentrations or provide coordinates to archaeological sites.</p>
              <h3 className="mt-7 font-display text-2xl">The Tierra Blanca archaeological complex is real—but it is not a trail of collectible arrowheads</h3>
              <p>Archaeologists also use <em>Tierra Blanca complex</em> for a protohistoric group of sites in the upper Red River headwaters of the Texas Panhandle, broadly dated to about A.D. 1450–1650. The name comes from archaeological investigations in this region, not from a modern attraction or a single legally accessible creek bank. Research describes camps and some village contexts associated with mobile bison hunting, stone tools and pottery indicating interaction with Rio Grande Pueblo communities. The finds are evidence of different human lives along the waterways, not a guarantee that a visitor will see artifacts on a marked public trail.</p>
              <p>Researchers have proposed connections between some Tierra Blanca complex sites and Apachean-speaking groups, including Querechos in early Spanish accounts, but linking archaeological materials to a present-day people is interpretive rather than an automatically established identity. The earlier Antelope Creek phase (approximately A.D. 1200–1500) has its strongest documented concentration farther north along the Canadian River and Lake Meredith; it should not be substituted for Tierra Blanca complex in a creek-specific account. These distinctions draw on <a href="https://www.texasbeyondhistory.net/landis/images/proto-spanish-textbox.html" target="_blank" rel="noopener noreferrer" className="text-primary underline underline-offset-4">Texas Beyond History's interpretation</a> and the <a href="https://open.uapress.arizona.edu/read/farmers-hunters-and-colonists/section/db0936cc-5185-42db-ae75-ed9dc2160b87" target="_blank" rel="noopener noreferrer" className="text-primary underline underline-offset-4">published Southwest–Plains research</a>.</p>
              <p>The later ranching landscape is also tied to water. The XIT Ranch's Escarbada Division was associated with Tierra Blanca Creek; the old T Anchor Ranch headquarters stood near the creek junction. Those ranch-era histories can be interpreted in the Canyon area without suggesting a public path onto working ranch property.</p>
            </div>
            <div className="mt-7 border border-border p-6">
              <h3 className="font-display text-xl">If you find an artifact</h3>
              <p className="mt-3 text-sm leading-7">Do not dig, move or collect archaeological objects in a state park, national wildlife refuge or other protected public place. The Texas Historical Commission explains that public-land artifact collecting generally requires a professional antiquities permit. Private-property rights differ, but landowner permission does not justify damage or trespass. Leave the object undisturbed, avoid sharing precise location coordinates publicly, and contact the appropriate land manager or THC archaeology staff for advice.</p>
              <a className="mt-4 inline-block font-semibold text-primary underline underline-offset-4" href="https://thc.texas.gov/preserve/archeology-texas/archeology-faq" target="_blank" rel="noopener noreferrer">Texas Historical Commission: archaeology and landowner questions</a>
            </div>
          </section>

          <section className="border-b border-border py-10" aria-labelledby="art">
            <p className="eyebrow text-primary">Art history without mythmaking</p>
            <h2 id="art" className="mt-2 font-display text-3xl">What Georgia O'Keeffe actually painted here</h2>
            <div className="mt-5 space-y-4 text-base leading-8">
              <p>Georgia O'Keeffe taught in Canyon in the 1910s and made works based on Palo Duro Canyon. The Georgia O'Keeffe Museum catalogs an <em>Untitled (Palo Duro Canyon)</em> drawing from 1916–1917; the New Mexico Museum of Art holds <em>Palo Duro Canyon (Special No. 21)</em>, also dated 1916–1917. Those museum records substantiate the area's artistic significance without relying on an unattributed quotation.</p>
              <p>Neither record proves that O'Keeffe made a particular sketch on a Tierra Blanca creek bank. The association is geographic and cultural: Canyon and the wider Palo Duro landscape inspired her, while Tierra Blanca helps explain the upstream drainage. Readers wanting the paintings should use museum collection records rather than mislabeled commercial copies.</p>
            </div>
            <div className="mt-6 flex flex-wrap gap-x-8 gap-y-3 text-sm font-semibold">
              <a href="https://access-ok.okeeffemuseum.org/object/615/" target="_blank" rel="noopener noreferrer" className="text-primary underline underline-offset-4">O'Keeffe Museum drawing record</a>
              <a href="https://sam.nmartmuseum.org/objects/9470/palo-duro-canyon" target="_blank" rel="noopener noreferrer" className="text-primary underline underline-offset-4">New Mexico Museum of Art painting record</a>
            </div>
          </section>

          <section className="border-b border-border py-10" aria-labelledby="access">
            <p className="eyebrow text-primary">Visit without trespassing</p>
            <h2 id="access" className="mt-2 font-display text-3xl">Three genuine, different visitor options</h2>
            <div className="mt-7 grid gap-5 md:grid-cols-3">
              <article className="border border-border p-5">
                <p className="eyebrow text-primary">Upper creek setting</p>
                <h3 className="mt-2 font-display text-xl">Buffalo Lake National Wildlife Refuge</h3>
                <p className="mt-3 text-sm leading-7">South of Umbarger on FM 168, roughly 10 miles west of Canyon. Public auto tour, signed trails and refuge-managed viewing areas. Current FWS listing: $2 per vehicle day entry; refuge trails and auto-tour road open 8 a.m.–8 p.m. April–September and 8 a.m.–6 p.m. October–March. Carry water and follow no-collecting, no-drone and no-swimming rules.</p>
                <a href="https://www.fws.gov/refuge/buffalo-lake/visit-us" target="_blank" rel="noopener noreferrer" className="mt-4 inline-block text-sm font-semibold text-primary underline underline-offset-4">Official access, fee and seasonal hours</a>
              </article>
              <article className="border border-border p-5">
                <p className="eyebrow text-primary">Museum and town context</p>
                <h3 className="mt-2 font-display text-xl">Canyon, Texas</h3>
                <p className="mt-3 text-sm leading-7">Visit Canyon's outdoor historic markers and other public sites for local ranching and community history. <strong>Do not plan a walk-in museum visit:</strong> Panhandle-Plains Historical Museum at West Texas A&amp;M has been closed to the public since March 2025 due to fire and life-safety concerns. The museum continues some off-site educational programs. Public landmarks do not grant access to adjacent private creek properties.</p>
                <a href="/county/randall" className="mt-4 inline-block text-sm font-semibold text-primary underline underline-offset-4">Randall County and Canyon guide</a>
                <a href="https://www.panhandleplains.org/p/about/pphm-temporary-closure-updates" target="_blank" rel="noopener noreferrer" className="mt-3 block text-sm font-semibold text-primary underline underline-offset-4">Official museum closure and off-site program updates</a>
              </article>
              <article className="border border-border p-5">
                <p className="eyebrow text-primary">Downstream rock scenery</p>
                <h3 className="mt-2 font-display text-xl">Palo Duro Canyon State Park</h3>
                <p className="mt-3 text-sm leading-7">East of Canyon, with managed overlook access, trails and campsites. TPWD currently lists $8 per adult day entry, children 12 and under free; reservations are strongly recommended and trails may close for heat or weather.</p>
                <a href="/destination/palo-duro-canyon-state-park" className="mt-4 inline-block text-sm font-semibold text-primary underline underline-offset-4">TexasDefined state park guide</a>
              </article>
            </div>
            <p className="mt-5 text-sm leading-7 text-muted-foreground">Important: this is a geographic and historical guide, not a claim that Tierra Blanca Creek has an established continuous public trail, kayak route, fishing access, swimming hole or open archaeological site. The creek's course crosses different properties; seek permission where required. Conditions and fees can change after the source-review date.</p>
          </section>

          <section className="border-b border-border py-10" aria-labelledby="itinerary">
            <p className="eyebrow text-primary">Build a realistic Panhandle route</p>
            <h2 id="itinerary" className="mt-2 font-display text-3xl">Amarillo and Canyon road trips that tell the whole story</h2>
            <p className="mt-4 max-w-4xl text-base leading-8">The right trip depends on whether you want the upper creek's grassland ecology, the county's museums and ranching context, or the state's most spectacular downstream canyon scenery. These are separate outings. No drive-time promise is made because weather, park access and traffic vary.</p>
            <div className="mt-6 divide-y divide-border border-y border-border">
              {itineraries.map((trip) => <section key={trip.heading} className="grid gap-4 py-6 sm:grid-cols-2">
                <div className="text-sm font-semibold text-primary">{trip.time}</div>
                <div>
                  <h3 className="font-display text-2xl">{trip.heading}</h3>
                  <p className="mt-3 text-base leading-8 text-muted-foreground">{trip.body}</p>
                  <a className="mt-4 inline-block text-sm font-semibold text-primary underline underline-offset-4" href={trip.url} {...(trip.url.startsWith("http") ? {target:"_blank", rel:"noopener noreferrer"} : {})}>{trip.action}</a>
                </div>
              </section>)}
            </div>
          </section>

          <section className="border-b border-border py-10" aria-labelledby="questions">
            <p className="eyebrow text-primary">Practical questions</p>
            <h2 id="questions" className="mt-2 font-display text-3xl">What travelers often get wrong</h2>
            <dl className="mt-6 space-y-4">
              <div><dt className="font-display text-xl">Can I walk to the creek from Palo Duro Canyon State Park?</dt><dd className="mt-2 leading-7 text-muted-foreground">Not by assuming that its mapped state-park trails follow Tierra Blanca Creek. That creek meets Palo Duro Creek upstream of the named canyon stretch. Use TPWD's signed trails and property boundaries for the state park; do not invent a trail connection.</dd></div>
              <div><dt className="font-display text-xl">Is Buffalo Lake full of water?</dt><dd className="mt-2 leading-7 text-muted-foreground">Usually not. FWS says the once-impounded lake is typically dry and receives water during major flood events. The refuge emphasizes birding, habitat, auto touring, hiking and established facilities; swimming and wading are prohibited. Do not plan a boating or swimming trip from the name.</dd></div>
              <div><dt className="font-display text-xl">Is Tierra Blanca the same as the Canadian River Breaks?</dt><dd className="mt-2 leading-7 text-muted-foreground">No. The Canadian River valley toward Canadian and Lake Meredith is a different drainage system farther north. Both help explain why the Texas Panhandle is not uniformly flat, but one cannot be used as directions to the other.</dd></div>
              <div><dt className="font-display text-xl">Where should I go if I want the red cliff photographs?</dt><dd className="mt-2 leading-7 text-muted-foreground">Choose Palo Duro Canyon State Park, using TPWD's current park map and access guidance. Buffalo Lake refuge shows another face of the High Plains; it is not a guaranteed substitute for Palo Duro's monumental rock formations.</dd></div>
              <div><dt className="font-display text-xl">Where is the easiest short walk along the upper drainage?</dt><dd className="mt-2 leading-7 text-muted-foreground">Start with Buffalo Lake refuge's Prairie Dog Trail near FM 168, which USFWS describes as an easy crushed-caliche walk. Ask about current surface accessibility before leaving; the Cottonwood and Grassland trails are longer and more uneven.</dd></div>
              <div><dt className="font-display text-xl">Are there restrooms, campsites or safe places to swim?</dt><dd className="mt-2 leading-7 text-muted-foreground">The refuge lists vault toilets and designated primitive camping, without water, sewer or electricity hookups. Swimming and wading are prohibited. The refuge and the state park have different rules, access hours and fees.</dd></div>
              <div><dt className="font-display text-xl">Can I collect arrowheads or artifacts found beside the creek?</dt><dd className="mt-2 leading-7 text-muted-foreground">Do not collect or disturb cultural features in a national refuge or a state park. Additional creek banks are privately owned. Report suspected archaeological discoveries to the relevant land manager or Texas Historical Commission without publishing precise site locations.</dd></div>
            </dl>
          </section>

          <section className="border-b border-border py-10" aria-labelledby="related">
            <h2 id="related" className="font-display text-3xl">Continue exploring the Amarillo–Canyon region</h2>
            <nav aria-label="Related TexasDefined travel guides" className="mt-6 grid gap-px overflow-hidden border border-border bg-border md:grid-cols-2">
              {related.map((item) => <a href={item.url} key={item.url} className="group bg-background p-5">
                <span className="block font-display text-xl group-hover:text-primary">{item.label}</span>
                <span className="mt-2 block text-sm leading-6 text-muted-foreground">{item.detail}</span>
              </a>)}
            </nav>
          </section>

          <p className="mt-6 text-sm leading-7 text-muted-foreground">This research is published by the TexasDefined editorial desk. Read our <a href="/about" className="font-semibold text-primary underline underline-offset-4">publisher information</a>, <a href="/editorial-policy" className="font-semibold text-primary underline underline-offset-4">editorial policy</a> and <a href="/sourcing-methodology" className="font-semibold text-primary underline underline-offset-4">source methodology</a>. No on-the-ground visit or privately accessed archaeological site is claimed.</p>

          <section className="py-10" aria-labelledby="sources">
            <p className="eyebrow text-primary">Editorial verification</p>
            <h2 id="sources" className="mt-2 font-display text-3xl">Primary sources and what each supports</h2>
            <p className="mt-4 max-w-4xl text-sm leading-7 text-muted-foreground"><strong>How this guide was researched:</strong> TexasDefined's Travel &amp; Outdoors Desk compared TSHA watercourse records with federal wildlife refuge access and trail documents, TPWD state-park information, archaeological research, museum catalogs and identified historic photography. We noted discrepancies in FWS trail descriptive lengths versus its summary-card measurements instead of silently selecting a single value. This is desk research, not a claim of first-hand travel, field photography or an archaeological survey. Historical creek imagery is linked rather than republished without rights review. The FWS images reproduced here have official public-domain records.</p>
            <p className="mt-3 max-w-4xl text-sm leading-7 text-muted-foreground">Research, access and substantive content reviewed November 16, 2026. Short-lived visitor details receive an additional monthly source-check workflow; longer-lived heritage material receives quarterly checks. An unchanged HTTP response never automatically advances an editorial review date. Confirm fees, closures, weather and access directly with the land manager before departing.</p>
            <ul className="mt-6 divide-y divide-border border-y border-border">
              {sources.map((s) => <li key={s.url} className="py-4">
                <a href={s.url} target="_blank" rel="noopener noreferrer" className="font-semibold text-primary underline underline-offset-4">{s.name}</a>
                <p className="mt-1 text-sm leading-6 text-muted-foreground">{s.supports}</p>
              </li>)}
            </ul>
          </section>

          {/* Expedia and CJ own this optional booking slot after the complete
              factual guide and citations. Never let generic placement inject
              lodging promotions ahead of geography, photos or access advice. */}
          <div data-stay-nearby-slot aria-label="Optional Amarillo and Canyon lodging comparisons" className="pt-8" />
        </article>
      </Container>
    </main>
  );
}
