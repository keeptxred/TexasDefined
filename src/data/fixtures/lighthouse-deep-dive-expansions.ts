import type { ArticleBlock } from "../types";

const h = (text: string): ArticleBlock => ({ type: "heading", text });
const p = (text: string): ArticleBlock => ({ type: "paragraph", text });
const list = (...items: string[]): ArticleBlock => ({ type: "list", items });

export const lighthouseDeepDiveExpansionBySlug: Record<string, ArticleBlock[]> = {
  "point-bolivar-lighthouse-history": [
    h("What makes Point Bolivar different from a generic lighthouse stop"),
    p("Point Bolivar is useful because the maritime geography is still legible. The tower stands beside the entrance to Galveston Bay, directly across from Galveston Island, where ferries and oceangoing traffic make the old navigation problem visible in real time. Even without climbing the tower, a visitor can understand why a fixed light on this low peninsula mattered to ships trying to identify the bay entrance."),
    p("The surviving tower is also an unusually strong place to connect transportation history with disaster history. Its cast-iron shell and brick lining were built for a navigational purpose, but during the catastrophic 1900 and 1915 hurricanes the structure also became refuge for people on the peninsula. That gives the lighthouse a local meaning far beyond its original federal function."),
    h("A practical Point Bolivar lighthouse visit"),
    list(
      "Treat the lighthouse as a historic landmark to view, not as a public climb.",
      "Use the Galveston-Port Bolivar Ferry approach to understand the relationship between the tower, the bay entrance and modern vessel traffic.",
      "Pair the stop with Galveston hurricane history, the Port of Galveston and the wider Bolivar Peninsula rather than making a special trip for the tower alone.",
      "Respect private property and posted boundaries around the lighthouse site."
    ),
    h("Point Bolivar Lighthouse FAQ"),
    p("When was the current Point Bolivar Lighthouse first lit? The present cast-iron tower entered service in 1873 after the earlier station had been disrupted during the Civil War."),
    p("Is Point Bolivar Lighthouse open for climbing? It should be treated as a view-only historic landmark unless an authorized public-access program specifically says otherwise. TexasDefined does not recommend entering private or restricted property."),
    p("Why is the tower black? The dark cast-iron exterior is one of the defining visual characteristics of the surviving structure and makes it easy to distinguish from the white masonry and frame lighthouses found elsewhere on the Gulf Coast."),
  ],

  "lydia-ann-lighthouse-port-aransas": [
    h("Why Lydia Ann feels remote even beside a major tourism town"),
    p("Port Aransas is busy, accessible and built around the water, but Lydia Ann Lighthouse occupies a different landscape. The tower sits across channels and marshes on Harbor Island, so the historic station remains visually tied to the water routes it was built to serve. That separation is one reason the lighthouse feels more authentic than a roadside reconstruction: the surrounding geography still explains the job."),
    p("The station also preserves a direct Civil War story. After the light was extinguished, Confederate forces attempted to make the tower unusable to Federal vessels. The structure survived severe damage, was repaired after the war and returned to service in 1867. That makes Lydia Ann one of the clearest places on the Texas coast to connect navigation infrastructure with wartime control of ports and passes."),
    h("How to experience Lydia Ann without trespassing"),
    list(
      "Do not treat the privately owned lighthouse as a walk-up attraction.",
      "Use public waterways and lawful viewpoints around Port Aransas to understand the tower's relationship to the pass and ship channel.",
      "Lighthouse Lakes is the natural interpretive companion because its paddling landscape shows the mangrove, marsh and channel environment around the historic light.",
      "Check current paddling, weather and navigation conditions before launching; the Coastal Bend is an active maritime environment."
    ),
    h("Lydia Ann Lighthouse FAQ"),
    p("When did the light begin operating? The Aransas Pass station was established in 1855 and first lit in 1857 with a fourth-order Fresnel lens."),
    p("Did the lighthouse survive the Civil War? Yes. It was damaged during Confederate demolition attempts, then rebuilt and relit in 1867."),
    p("Is it still a federal lighthouse? No. The federal light station was disestablished in 1952. The historic structure later continued as a private aid to navigation, which is different from being an active federal station open to visitors."),
  ],

  "matagorda-island-lighthouse-history": [
    h("Why Matagorda Island is one of the strongest lighthouse landscapes in Texas"),
    p("Matagorda Island preserves the relationship between a lighthouse and a barrier-island coast better than almost any easy roadside stop could. The tower was built for vessels using Pass Cavallo, once a crucial entrance into Matagorda Bay. Ports rose and declined, channels shifted and shorelines eroded, but the surviving lighthouse still stands in the kind of exposed coastal environment that made a powerful fixed light necessary."),
    p("The present 1873 tower also embodies adaptation. The original lighthouse had been damaged during the Civil War, and erosion threatened the earlier location. Rebuilding farther inland using surviving cast-iron panels was both a restoration and a response to a changing shoreline. That makes the tower a useful case study in how Texas coastal infrastructure had to move with the coast itself."),
    h("Restoration and the return of a light"),
    p("By the late twentieth century, corrosion and decades of Gulf weather had placed the cast-iron tower at risk. Texas Parks and Wildlife undertook a major restoration in the early 2000s, a project reported at roughly $1.23 million. A modern solar-powered marine lantern had already returned a visible light to the tower around the turn of the millennium, while the historic Fresnel lens remained removed for preservation."),
    h("Planning around a remote barrier island"),
    list(
      "There is no bridge carrying ordinary road traffic to Matagorda Island.",
      "Transportation, landing rules, public access and agency management can change, so verify current conditions before treating the lighthouse as a visitable stop.",
      "Do not assume that a visible historic structure is open for climbing or interior access.",
      "The strongest interpretation pairs the tower with Pass Cavallo, Indianola, Port O'Connor and the rise and fall of middle-coast shipping routes."
    ),
    h("Matagorda Island Lighthouse FAQ"),
    p("When was the first lighthouse built? Construction began in 1852, and the first light entered service that year. The surviving tower dates to the post-Civil War rebuild completed in 1873."),
    p("Why was the lighthouse moved inland? The rebuild addressed both wartime damage and the practical threat of shoreline erosion to the earlier station location."),
    p("When did the Coast Guard decommission it? The federal light was decommissioned in 1995, though a modern light later returned as part of preservation efforts."),
  ],

  "halfmoon-reef-lighthouse-port-lavaca": [
    h("A lighthouse designed for shallow water, not the open Gulf"),
    p("Halfmoon Reef is valuable because it broadens the usual idea of what a lighthouse is. The structure was not a towering coastal beacon on a high headland. It was a screw-pile light built out in Matagorda Bay to warn vessels about a specific reef and help them navigate shallow interior water. Texas' bays required an entire second layer of aids after ships had already found their way in from the Gulf."),
    p("That functional difference explains the building's compact appearance. The keeper's living space and lantern were combined in a low structure supported over the water rather than separated into a tall tower and dwelling. Its survival gives TexasDefined a way to explain the everyday navigation hazards of bays, reefs and channels rather than focusing only on dramatic Gulf-facing towers."),
    h("Why moving the lighthouse saved it"),
    p("A 1942 hurricane severely damaged the station and ended its active career. After the structure spent time away from its original reef, preservationists ultimately moved it to Port Lavaca and repaired it in 1979. Relocation changed the setting, but without that move the lighthouse might not have survived at all."),
    h("How to read Halfmoon Reef today"),
    list(
      "Look at the building as a preserved piece of bay infrastructure rather than a decorative coastal pavilion.",
      "Use maps of Matagorda Bay to identify Halfmoon Reef and understand why the original station stood over water.",
      "Pair the lighthouse with Indianola, Port Lavaca and Port O'Connor to see how communities depended on safe bay navigation.",
      "Compare it with Matagorda Island Lighthouse to see two very different lighthouse solutions inside the same county."
    ),
    h("Halfmoon Reef Lighthouse FAQ"),
    p("When did it begin service? The screw-pile lighthouse was built in 1858 and later returned to service after the Civil War in 1868."),
    p("Why is it in Port Lavaca now? Hurricane damage ended its life as an active reef light, and relocation to shore ultimately preserved the historic structure."),
  ],

  "sabine-pass-lighthouse-texas-border": [
    h("The most important fact: the tower is in Louisiana"),
    p("Sabine Pass Lighthouse belongs in a Texas coastal guide only with a precise geographic caveat. The historic tower stands on the Louisiana side of the Sabine. TexasDefined includes it because the Sabine is the interstate boundary and because the light served the same Gulf entrance used by vessels moving toward Texas communities and the later Sabine-Neches industrial waterway. That is a shared navigation history, not a claim that the structure is physically inside Texas."),
    h("Why the pass became more important than the lighthouse"),
    p("The lighthouse was built for a navigational problem, but the waterway later became famous for larger military and industrial stories. During the Civil War, Sabine Pass was the site of the 1863 battle in which Confederate defenders stopped a Federal attempt to move through the pass. In the twentieth century, the region became part of one of the country's major refining and shipping corridors through Port Arthur, Beaumont and the Sabine-Neches system."),
    p("That evolution helps explain why the lighthouse is best understood as an early layer of infrastructure in a waterway that eventually required far more complex channels, aids to navigation, port facilities and industrial navigation systems."),
    h("How to include Sabine Pass in a Texas lighthouse itinerary"),
    list(
      "Use Sabine Pass Battleground and public Texas-side locations for historical interpretation rather than promising access to the lighthouse itself.",
      "Keep the Louisiana-location caveat visible in maps, captions and itinerary language.",
      "Treat Sabine Pass as the eastern historical endpoint of a Texas lighthouse road trip, then continue southwest toward Point Bolivar and Galveston Bay.",
      "Pair the lighthouse story with the Civil War battle and the rise of the Sabine-Neches port complex."
    ),
    h("Sabine Pass Lighthouse FAQ"),
    p("Is Sabine Pass Lighthouse in Texas? No. The historic tower is on the Louisiana side of the border waterway. It is included here because the light served a shared Gulf entrance directly tied to Texas navigation."),
    p("Can travelers treat it like a normal public lighthouse attraction? No. This is best presented as a historical and geographic feature of the pass, with access claims verified separately before any trip."),
  ],
};
