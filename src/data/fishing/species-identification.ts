/** Field identification facts independently paraphrased from the visitor-supplied TPWD pocket guide and linked TPWD species accounts.\n * This is durable species biology, not a live fishing report, an image license, or a bag-limit table.\n * Content researched 2026-11-15; new material requires editorial review before future changes. */
export interface FishIdentification {
  sourceUrl: string;
  fieldSize: string;
  markings: string;
  texasHabitat: string;
  similarSpecies: string;
  approach: string;
  caution: string;
  naturalHistory?: string[];
  /** Direct links to published TexasDefined guides for fish readers might confuse. */
  compareSlugs?: string[];
}
export const FISH_IDENTIFICATION_EDITORIAL_UPDATED_AT = "2026-11-25";
export const fishIdentification: Record<string, FishIdentification> = {
  "bowfin": {
    "sourceUrl": "https://tpwd.texas.gov/huntwild/wild/species/bowfin/",
    "fieldSize": "Usually under 10 lb; many Texas bowfin weigh approximately 6–8 lb.",
    "markings": "Long single dorsal fin running more than half the back; rounded tail; broad toothy mouth; olive-brown body. Some fish show a dark eyespot near the upper base of the tail.",
    "texasHabitat": "Slow lowland backwaters, sloughs and swampy sections of the Red, San Jacinto and Sabine systems and lower Brazos and Colorado basins.",
    "similarSpecies": "Unlike gar, bowfin lack a long rigid snout and diamond-shaped armor. Unlike invasive snakeheads, bowfin have a short anal fin and an unscaled head.",
    "approach": "Fish natural baits or lures around woody, weedy margins and slow current. They can gulp air; surfacing alone does not indicate distress.",
    "caution": "Do not mistake this native fish for a prohibited snakehead; TPWD publishes an identification comparison.",
    "naturalHistory": [
      "Bowfin are native predators rather than escaped snakeheads. TPWD describes males preparing shallow, weedy nests in late spring, clearing silt so eggs can adhere to submerged roots, wood and gravel. Males then guard the eggs and newly hatched young.",
      "Early-life food includes tiny aquatic invertebrates. As bowfin grow they switch increasingly to larger prey in the quiet, vegetation-rich water they occupy. Their ability to breathe air helps explain sightings at the surface."
    ],
    "compareSlugs": [
      "spotted-gar",
      "alligator-gar"
    ]
  },
  "common-carp": {
    "sourceUrl": "https://tpwd.texas.gov/huntwild/wild/species/crp/",
    "fieldSize": "Often 12–25 in; much larger fish occur.",
    "markings": "Heavy body, bronze-to-golden scales, long-based dorsal fin and two pairs of barbels beside the mouth.",
    "texasHabitat": "Introduced and now widespread in Texas ponds, lakes, reservoirs and rivers, often foraging along soft bottoms.",
    "similarSpecies": "Common carp have two pairs of mouth barbels and a long-based dorsal fin. Grass carp lack those barbels and have a shorter dorsal fin; native smallmouth buffalo also lack barbels. Do not identify an unfamiliar heavy-bodied fish from color alone.",
    "approach": "Present bait close to the bottom where carp feed; use light, sensitive rigs and handle larger fish with adequate support.",
    "caution": "Do not assume statewide nongame status overrides site-specific restrictions, including Lady Bird Lake.",
    "naturalHistory": [
      "Common carp are omnivorous bottom feeders. Their protrusible mouths and barbels are useful clues when they root around mud and submerged vegetation for food; feeding often clouds shallow water, particularly near shore.",
      "TPWD reports spring-to-early-fall spawning opportunities, sometimes more than once in a season. Common carp were introduced from Europe and Asia and occur broadly across Texas waters, but not every water permits the same harvest or treatment."
    ]
  },
  "alligator-gar": {
    "sourceUrl": "https://tpwd.texas.gov/huntwild/wild/species/alg/",
    "fieldSize": "Often several feet long; exceptionally large fish exceed 200 lb.",
    "markings": "Broad, short-looking snout compared with longnose gar; large armored diamond-shaped scales; olive-brown body.",
    "texasHabitat": "Large Texas rivers, reservoirs and connected floodplains, especially in eastern and southern basins.",
    "similarSpecies": "Compare snout proportions with spotted gar and longnose gar; a fish's size alone is not reliable identification.",
    "approach": "Work deep channels and backwaters where legal; use heavy, fish-safe tackle and minimize handling stress.",
    "caution": "Alligator gar have special area-specific harvest and reporting restrictions; consult TPWD before targeting or keeping one.",
    "naturalHistory": [
      "Alligator gar are long-lived fish that mature slowly. Spring floods over vegetated floodplains create important spawning conditions; in Texas spawning is associated with warm April and May water, but favorable flooding does not occur every year. A missing flood season can therefore mean little or no successful reproduction that year. The largest fish represent decades of survival, which is why harvest pressure on mature animals is a different conservation question from taking a fast-growing panfish.",
      "Juvenile alligator gar eat small fish and aquatic insects; adults are capable predators that mainly consume fish. The broad, flattened snout and two rows of prominent teeth along each side of the upper jaw are stronger identification clues than size alone. Their ability to use air helps explain surface sightings in sluggish water. Harvest, reporting, seasonal closures and allowable methods require checking current TPWD rules for the specific waterbody."
    ],
    "compareSlugs": [
      "spotted-gar",
      "bowfin"
    ]
  },
  "spotted-gar": {
    "sourceUrl": "https://tpwd.texas.gov/huntwild/wild/species/spottedgar/",
    "fieldSize": "Commonly under 3 ft; TPWD describes adults reaching about 3 ft.",
    "markings": "Long toothed snout, elongated armored body and roundish dark spots on head, body, dorsal and paired fins.",
    "texasHabitat": "Slow streams, lakes, swamps and vegetated backwaters, especially in east and coastal-plain Texas.",
    "similarSpecies": "Spots on top of the head and paired fins help distinguish spotted gar from other gar; longnose gar have a relatively longer, narrower snout.",
    "approach": "Watch quiet, shallow edges for surface activity; only use legal gear and avoid careless handling of sharp teeth.",
    "caution": "Gar eggs are toxic and should never be eaten.",
    "naturalHistory": [
      "Spotted gar often drift just below the surface in warm, quiet water. TPWD describes sudden sideways strikes at prey, rather than a continuous chase. Smaller gar feed on aquatic insects and crustaceans before fish become a larger share of the diet.",
      "Reproduction is associated with shallow, slowly flowing, vegetated places in spring. Eggs adhere to submerged plants. A spotted head and spots on the paired fins are more discriminating field marks than body spots alone."
    ],
    "compareSlugs": [
      "alligator-gar",
      "bowfin"
    ]
  },
  "channel-catfish": {
    "sourceUrl": "https://tpwd.texas.gov/huntwild/wild/species/ccf/",
    "fieldSize": "Often under 24 in, although larger adults occur.",
    "markings": "Slender scaleless body, whisker-like barbels, deeply forked tail and often scattered small dark spots on younger fish.",
    "texasHabitat": "Texas rivers, ponds and reservoirs, where they use bottom contours and cover.",
    "similarSpecies": "A channel catfish usually has 24–29 soft rays along its anal fin, versus 30–35 in blue catfish. Both have forked tails, and larger channel catfish may lose the usual dark spotting, so do not use color alone.",
    "approach": "Fish natural or prepared bait along channel edges, current seams and bottom structure; adapt tackle to current and fish size.",
    "caution": "Use official species comparisons when identifying a small blue catfish versus a channel catfish.",
    "naturalHistory": [
      "Channel catfish use sheltered cavities for spawning in late spring or early summer as water warms. Males select protected sites among rocks, logs, debris or undercut banks, guard the egg mass, and continue guarding the young after hatching. This nesting behavior explains why a productive catfish stretch can include both open bottom for feeding and tucked-away cavities that are less obvious from shore. Eggs and young fish are particularly vulnerable if cover is disturbed.",
      "Young channel catfish feed mostly on small insects; adults eat a wide mix of insects, mollusks, crustaceans, fish and occasional plant material. The common dark spots on smaller fish can fade with age, making a large unspotted channel catfish harder to separate from a blue catfish. Count anal-fin rays and examine the fin edge and jaw if rules or records require exact identification; body color or a forked tail alone cannot settle the species."
    ],
    "compareSlugs": [
      "blue-catfish",
      "flathead-catfish"
    ]
  },
  "blue-catfish": {
    "sourceUrl": "https://tpwd.texas.gov/huntwild/wild/species/blc/",
    "fieldSize": "Often under 20 lb, but large adults can exceed 100 lb.",
    "markings": "Smooth unscaled bluish-gray body, long barbels and a deeply forked tail; adults often appear less spotted than channel catfish.",
    "texasHabitat": "Larger rivers and reservoirs, frequently using channels, dropoffs and open-water forage.",
    "similarSpecies": "Count the anal-fin rays when channel and blue catfish look alike: TPWD gives 30–35 for blue catfish and 24–29 for channel catfish. Both have forked tails; an unspotted body is not conclusive.",
    "approach": "Cut bait and other natural baits can work near forage and channel structure; use stronger tackle for larger fish.",
    "caution": "Large specimens need careful support and current waterbody rules should be checked.",
    "naturalHistory": [
      "Blue catfish are strongly associated with main-river channels, major tributaries and large impoundments. TPWD describes a seasonal tendency to move upstream in warmer months toward cooler water and downstream as winter approaches. These movements are not an hourly bite forecast, but they help explain why fish may use different channel stretches through the year. Mature blue catfish may not reproduce until they are substantially larger than spawning channel catfish.",
      "Although invertebrates remain important in the diet, blue catfish begin eating other fish while relatively small. Larger individuals consume fish as well as substantial aquatic invertebrates, connecting their feeding movements to concentrations of available forage. Some blue cats in the Rio Grande drainage have body spots, so a spotted catfish is not automatically a channel catfish. The anal fin usually has 30–35 rays, compared with 24–29 in channel catfish."
    ],
    "compareSlugs": [
      "channel-catfish",
      "flathead-catfish"
    ]
  },
  "flathead-catfish": {
    "sourceUrl": "https://tpwd.texas.gov/huntwild/wild/species/catfish/",
    "fieldSize": "Often under 30 lb; exceptional adults can exceed 100 lb.",
    "markings": "Broad flat head, projecting lower jaw, mottled olive-brown to yellow body and a tail that is square rather than deeply forked.",
    "texasHabitat": "Texas river channels, reservoirs, submerged logs and cavities with substantial cover.",
    "similarSpecies": "Separate flatheads from channel and blue catfish by the flattened head and unforked tail rather than body color.",
    "approach": "Fish substantial cover and slower channel edges with legal natural baits, especially when larger fish feed.",
    "caution": "Current TPWD gear, bait and waterbody-specific rules take precedence over general fishing advice.",
    "naturalHistory": [
      "Flathead catfish are solitary, cover-oriented predators. Young fish eat worms, insects and crayfish, but adults predominantly pursue live fish; this differs from the broader scavenging and omnivorous habits often associated with channel catfish. Logs, undercut banks, slow deep holes and protected river cavities offer ambush places. Large fish may leave deeper cover after dark to feed in shallower water, so river structure and low-light behavior matter more than a generic bait prescription.",
      "Flatheads generally reproduce in the warmer late-spring-to-summer period. Males defend cavity nests in logs, banks or other protected places, fan eggs to keep them oxygenated, and guard newly hatched fry before the young disperse to cover. TPWD notes that environmental stress and poor condition can reduce successful spawning. A broad head, projecting lower jaw and only shallowly notched tail remain the principal differences from fork-tailed channel and blue catfish."
    ],
    "compareSlugs": [
      "blue-catfish",
      "channel-catfish"
    ]
  },
  "largemouth-bass": {
    "sourceUrl": "https://tpwd.texas.gov/huntwild/wild/species/lmb/",
    "fieldSize": "Can reach 16 in within several years; trophy sizes depend on genetics, habitat and forage.",
    "markings": "Large mouth, upper jaw commonly reaching beyond the rear of the eye; green-to-olive body with a dark horizontal lateral band.",
    "texasHabitat": "Common in Texas impoundments, ponds and slow rivers, using timber, vegetation, docks, points and ledges.",
    "similarSpecies": "Guadalupe and spotted bass may show different jaw proportions and broken side markings; rely on several traits, not a single stripe.",
    "approach": "Use cover-oriented soft plastics, crankbaits and other presentations matched to water clarity, season and structure.",
    "caution": "Special black-bass limits may apply on individual waters.",
    "naturalHistory": [
      "Largemouth bass begin life feeding mainly on plankton and insect larvae, then switch toward larger prey as they grow. Adults chiefly eat fish and substantial invertebrates such as crayfish. They typically strike from cover rather than cruising open water continuously; timber, aquatic plants, submerged branches and rock edges offer both ambush sites and protection. This food-web role explains why forage availability and habitat quality are essential when interpreting a reservoir's fishery.",
      "Texas largemouth nesting begins with spring warming, which can arrive much earlier in southern waters than farther north. Males prepare nests in protected water, including vegetation or firm bottom, and guard eggs and fry after spawning. The broad jaw extending past the eye remains a key field mark, but bass genetics, hybridization and individual appearance can complicate identification. Seasonal fishing strategies elsewhere on this page are lake-planning advice, not a guarantee of spawning at any given shoreline."
    ],
    "compareSlugs": [
      "guadalupe-bass",
      "spotted-bass",
      "smallmouth-bass"
    ]
  },
  "guadalupe-bass": {
    "sourceUrl": "https://tpwd.texas.gov/huntwild/wild/species/gdb/",
    "fieldSize": "Generally small stream bass, often under a pound; larger fish occur.",
    "markings": "Compact black bass with dark side blotches and a jaw that typically does not reach as far behind the eye as largemouth bass.",
    "texasHabitat": "Texas-native black bass especially associated with flowing Hill Country streams and the Edwards Plateau.",
    "similarSpecies": "Guadalupe bass can hybridize with smallmouth bass; do not rely on mottling alone where species overlap.",
    "approach": "Fish current breaks, shaded rocks, riffle-to-pool transitions and undercut stream edges with appropriately light tackle.",
    "caution": "Protect this Texas state fish and check river-specific regulations and access.",
    "naturalHistory": [
      "Guadalupe bass are adapted to the rocky, flowing headwaters of the Edwards Plateau and adjoining Texas streams. Unlike largemouth bass, they typically use moving water, including gravelly areas where current brings oxygen to nests. Spawning can begin in spring, with males defending nest sites after females deposit eggs. Young fish start with aquatic invertebrates before more fish enter the diet as they mature, but insect prey remains important in this stream-centered species.",
      "Because this species is endemic to Texas, distinguishing it from introduced smallmouth bass and their hybrids has conservation significance as well as fishing value. Guadalupe bass lack the tall vertical bars of smallmouth bass and the large jaw reach typical of largemouth bass; their side markings often extend farther downward than in spotted bass. Color alone is insufficient in mixed populations. Avoid presenting all black bass in a Hill Country stream as interchangeable."
    ],
    "compareSlugs": [
      "largemouth-bass",
      "spotted-bass",
      "smallmouth-bass"
    ]
  },
  "bluegill": {
    "sourceUrl": "https://tpwd.texas.gov/huntwild/wild/species/bgl/",
    "fieldSize": "Usually under 1 lb.",
    "markings": "Deep compressed body, dark spot near the rear of the soft dorsal fin, dark opercular flap and small mouth.",
    "texasHabitat": "Common in Texas ponds, creeks and reservoirs around vegetation, docks and shoreline cover.",
    "similarSpecies": "The dark patch at the rear of the soft dorsal fin, small mouth and vertical body bars help distinguish bluegill. Redear sunfish show a red/orange gill-flap edge, while green sunfish have a larger mouth.",
    "approach": "Small hooks with worms or small flies are useful for beginner-friendly shoreline fishing.",
    "caution": "Sunfish interbreed; mixed appearance may require several diagnostic traits.",
    "naturalHistory": [
      "Bluegill are colony nesters. When shallow water warms, males fan saucer-shaped depressions in gravel or another suitable firm bottom; dozens of nests can appear close together. Males remain to guard the eggs and young. In Texas the spawning period can continue through much of the warm season, so nests should not be treated as a single statewide calendar event. Dense populations can produce small adults when food and predator balance are unfavorable.",
      "Bluegill fry eat plankton, while larger fish focus on aquatic insects and larvae. Their small mouth fits fine prey and small hooks, though large adults can take a range of foods. For identification, look for the dark patch at the rear of the soft dorsal fin, body bars, short black gill flap and compact mouth. Breeding colors vary widely, and hybrids can blur the appearance of these characters; compare multiple features before applying a species-specific rule."
    ],
    "compareSlugs": [
      "redear-sunfish",
      "green-sunfish",
      "longear-sunfish"
    ]
  },
  "redear-sunfish": {
    "sourceUrl": "https://tpwd.texas.gov/huntwild/wild/species/sunfish/",
    "fieldSize": "Usually under 1 lb; larger individuals occur.",
    "markings": "Deep body, relatively small mouth and a red border on the male's black ear flap (often orange on females).",
    "texasHabitat": "Warm Texas lakes and ponds, often near bottom vegetation and gentle current; native to much of eastern Texas and introduced elsewhere.",
    "similarSpecies": "Unlike longear and redbreast sunfish, the redear ear flap is not markedly elongated; compare the edge color as well as the shape.",
    "approach": "Present worms or other small natural baits near the bottom; snails are important in its diet.",
    "caution": "The red/orange flap border varies by sex and appearance alone can be complicated by hybrids.",
    "naturalHistory": [
      "Redear sunfish are nicknamed shellcrackers because snails are important in their diet. They also consume insect larvae and small crustaceans; bottom habitat in warmer water with vegetation is a good starting point for understanding their location.",
      "TPWD describes spawning in late spring and early summer, usually in colonies of saucer-shaped nests. Their nests may sit deeper than those of some other sunfish, so do not assume every spawning panfish will be right against the bank."
    ],
    "compareSlugs": [
      "bluegill",
      "longear-sunfish",
      "redbreast-sunfish"
    ]
  },
  "green-sunfish": {
    "sourceUrl": "https://tpwd.texas.gov/huntwild/wild/species/greensunfish/",
    "fieldSize": "Often 6–8 in.",
    "markings": "Relatively large mouth for a sunfish, stocky body, blue-green cheek markings and pale edging on portions of the fins.",
    "texasHabitat": "Occurs throughout Texas, including small, sometimes variable streams, ponds and reservoirs.",
    "similarSpecies": "Compare with warmouth: warmouth usually have several dark streaks radiating from the eye and brown mottling.",
    "approach": "Small jigs, flies and worms around rocks or shallow cover are practical choices.",
    "caution": "Green sunfish hybridize readily with other sunfishes, so some fish resist a simple color-based ID.",
    "naturalHistory": [
      "Green sunfish are unusually tolerant of unstable small-stream conditions. TPWD notes their ability to persist in prairie streams where other sunfish have trouble, and they may recolonize waters after difficult conditions.",
      "Adults eat aquatic insects and small fish. Shallow nests are often constructed in close colonies on gravel or rock in late spring and summer; males guard their young. Hybridization can complicate confident identification."
    ],
    "compareSlugs": [
      "warmouth",
      "bluegill"
    ]
  },
  "warmouth": {
    "sourceUrl": "https://tpwd.texas.gov/huntwild/wild/species/war/",
    "fieldSize": "Typically 4–10 in.",
    "markings": "Stocky dark-mottled body, large mouth and several reddish-brown lines radiating backward from the eye.",
    "texasHabitat": "Sheltered weedy or woody waters, stumps, slack water and vegetated river margins, especially in eastern Texas.",
    "similarSpecies": "Distinguish from green sunfish by the streaked head and mottled flanks; do not confuse either with true rock bass.",
    "approach": "Small natural baits or compact lures near cover can reach warmouth without needing deep-water bass tackle.",
    "caution": "Warmouth can hybridize with bluegill and green sunfish.",
    "naturalHistory": [
      "Warmouth prefer hiding places such as roots, stumps, rocks and vegetation. They sit in cover as sight-feeding predators, taking insects, mollusks and smaller fish rather than swimming constantly through open water.",
      "TPWD describes spring-to-summer spawning in shallow nests near submerged structure. Males defend eggs and fry. A useful distinguishing check is the anal fin: warmouth have three spines, compared with six in rock bass."
    ],
    "compareSlugs": [
      "green-sunfish",
      "bluegill"
    ]
  },
  "longear-sunfish": {
    "sourceUrl": "https://tpwd.texas.gov/huntwild/wild/species/longearsunfish/",
    "fieldSize": "Commonly up to about 6 in.",
    "markings": "Colorful orange or red belly, blue-green facial streaks and elongated gill-cover flap with a pale border.",
    "texasHabitat": "Small Texas streams and creek pools, particularly where vegetation and gentle current provide shelter.",
    "similarSpecies": "Redbreast sunfish can have an even longer and narrower ear flap; compare flap shape and body colors together.",
    "approach": "Try small flies or worms in creek pools and beside current seams; release small fish gently.",
    "caution": "Spawning colors vary considerably and sunfish hybrids are common.",
    "naturalHistory": [
      "Small creek pools and low-current inlets are important longear sunfish habitat. Spawning males become especially colorful and sweep out nests in gravel during late spring and early summer, defending them after the young hatch.",
      "Growing longear sunfish feed on insects and occasionally small fish. TPWD notes that they rarely exceed six inches; in the field, prioritize their white-trimmed elongated ear flap and facial markings over a bright breeding color alone."
    ],
    "compareSlugs": [
      "redbreast-sunfish",
      "redear-sunfish"
    ]
  },
  "redbreast-sunfish": {
    "sourceUrl": "https://tpwd.texas.gov/huntwild/wild/species/redbreastsunfish/",
    "fieldSize": "Often under 1 lb.",
    "markings": "Bright yellow-orange or reddish breast and exceptionally long, narrow gill-cover flap with a pale lower edge.",
    "texasHabitat": "Clear streams in eastern and central Texas, notably the San Marcos region; introduced outside its original Atlantic-drainage range.",
    "similarSpecies": "The flap is generally longer and narrower than on longear sunfish, despite the names.",
    "approach": "Light spinning tackle, small bait or flies around gravel-bottom pools and low current are appropriate.",
    "caution": "Check multiple traits before separating colorful sunfish and hybrids.",
    "naturalHistory": [
      "Redbreast sunfish eat aquatic insects, snails, crayfish and small fish. They are introduced to Texas from Atlantic-drainage streams farther east, and TPWD describes established populations in clear Central Texas streams.",
      "Spawning takes place in shallow colonies on sand or gravel. Newly hatched fish may remain together in schools for a period before dispersing. The long narrow ear flap—not the orange belly alone—is a useful identification feature."
    ],
    "compareSlugs": [
      "longear-sunfish",
      "redear-sunfish"
    ]
  },
  "rio-grande-cichlid": {
    "sourceUrl": "https://tpwd.texas.gov/huntwild/wild/species/cichlid/",
    "fieldSize": "Often 6–12 in.",
    "markings": "Olive-to-dark body with turquoise or cream spotting, dark vertical bars and sometimes a prominent adult-male forehead hump.",
    "texasHabitat": "Originally native to the lower Rio Grande; now established in selected spring-fed and warm central Texas drainages.",
    "similarSpecies": "Not a sunfish: compare its interrupted lateral line and five or six anal-fin spines with most Texas sunfish and many tilapia.",
    "approach": "Small bait, flies and compact lures work around warm river margins; cold temperatures can sharply limit survival.",
    "caution": "Do not label this native Texas cichlid as invasive tilapia.",
    "naturalHistory": [
      "Rio Grande cichlids are strongly limited by cold water. TPWD notes that their survival is poor at temperatures below roughly 49°F; warmer spring-fed and some heated habitats can support populations outside the original lower Rio Grande range.",
      "They spawn during early spring, and both parents guard the young. Food includes small aquatic animals and fish eggs. The five or six anal-fin spines are a useful check when separating this native cichlid from tilapia and most sunfishes."
    ],
    "compareSlugs": [
      "green-sunfish"
    ]
  },
  "black-crappie": {
    "sourceUrl": "https://tpwd.texas.gov/huntwild/wild/species/crappie/",
    "fieldSize": "Usually under 2 lb.",
    "markings": "Deep compressed body with many irregular dark spots, without consistent vertical flank bars.",
    "texasHabitat": "Texas reservoirs and slow waters; may favor clearer water and brush or timber.",
    "similarSpecies": "White crappie more commonly show vertical bars and have a different dorsal-spine count; patterns alone may overlap.",
    "approach": "Small jigs and minnows presented beside timber, brush and spawning cover are common tactics.",
    "caution": "Confirm identity with multiple features where fish show ambiguous markings.",
    "naturalHistory": [
      "Black crappie build spring nests as water warms, with TPWD citing spawning around 60°F. Their diet overlaps with white crappie but usually contains more insects and crustaceans and relatively fewer fish. In Texas, black crappie are especially abundant in clear East Texas waters, although they are found more widely. The association with clear water is a tendency rather than an absolute requirement for an individual fish.",
      "Black crappie have a deeper, more robust body and typically seven or eight dorsal spines. Their dark markings form irregular patches rather than the regular upright bars often seen on white crappie. A single side photograph may not show fin-spine counts, and both species may occupy the same reservoir. If exact identification matters, raise the dorsal fin carefully and check the spine count rather than relying on the shade of the fish."
    ],
    "compareSlugs": [
      "white-crappie"
    ]
  },
  "white-crappie": {
    "sourceUrl": "https://tpwd.texas.gov/huntwild/wild/species/wcp/",
    "fieldSize": "Usually under 2 lb.",
    "markings": "Silvery deep body with several upright dark bars or mottled vertical markings.",
    "texasHabitat": "Rivers and reservoirs throughout Texas, including stained-water creek arms and brush.",
    "similarSpecies": "White crappie typically show upright side bars and have five or six dorsal spines; black crappie have more scattered spots and usually seven or eight dorsal spines. Color and markings alone may mislead.",
    "approach": "Small jigs or minnows near brush, timber, seasonal shallow cover and dropoffs are practical.",
    "caution": "Do not infer a lake-specific bag limit from statewide norms.",
    "naturalHistory": [
      "White crappie build shallow nests in spring, often gathering in dense colonies. TPWD describes spawning commonly beginning around 65–70°F, though it can occur in cooler water. Their high reproductive potential can lead to crowded, slow-growing populations in small impoundments. Young fish initially consume tiny aquatic animals, then grow into schooling juveniles; adults feed on insects and small fish, frequently following available forage.",
      "White crappie show dark vertical bars on a silvery compressed body and typically no more than six dorsal spines. Black crappie instead have a more irregular spot pattern and usually seven or eight spines. Identifying the species by appearance alone is not always secure, particularly with unusual markings. Brush, submerged timber and creek channels are practical fishing contexts, but published lake associations should remain limited to individually sourced waters."
    ],
    "compareSlugs": [
      "black-crappie"
    ]
  },
  "striped-bass": {
    "sourceUrl": "https://tpwd.texas.gov/huntwild/wild/species/str/",
    "fieldSize": "Often 5–25 lb; can grow much larger.",
    "markings": "Streamlined silvery body with multiple nearly continuous horizontal dark stripes and two separate dorsal fins.",
    "texasHabitat": "Introduced into select large Texas reservoirs, often occupying open water and feeding on schools of baitfish.",
    "similarSpecies": "Striped bass have two distinct tooth patches near the rear of the tongue, versus one in white bass. Several dark side stripes normally reach the tail, but white-bass hybrids require considering all traits together.",
    "approach": "Look for schooling baitfish, depth breaks and open-water activity; choose legal lures or bait appropriate to the reservoir.",
    "caution": "Check species-specific and waterbody regulations for pure and hybrid striped bass.",
    "naturalHistory": [
      "Striped bass can complete their life cycle in freshwater only where the spawning conditions are suitable. In spring they move into flowing tributaries; their eggs must remain suspended in current while developing. Many Texas reservoir populations cannot maintain natural recruitment and depend on management stockings, whereas Lake Texoma is a prominent exception with successful natural reproduction. A large open-water striper fishery is not by itself evidence of a self-sustaining population.",
      "Adults pursue baitfish such as gizzard and threadfin shad, often feeding over open-water depth changes. This is why locating forage and suitable temperatures matters more than naming one universally best lure. Striped bass have two separate tooth patches on the rear of the tongue, while white bass have one; body stripes and mouth shape also help, but hybrids complicate the distinction. Current size and bag limits may vary by reservoir."
    ],
    "compareSlugs": [
      "white-bass",
      "hybrid-striped-bass"
    ]
  },
  "white-bass": {
    "sourceUrl": "https://tpwd.texas.gov/huntwild/wild/species/wtb/",
    "fieldSize": "Often 0.5–2 lb.",
    "markings": "Silvery compressed body, faint gray horizontal stripes and a dark mark on the gill cover.",
    "texasHabitat": "Texas rivers and reservoirs, especially where spring spawning runs connect river channels with impoundments.",
    "similarSpecies": "White bass have one central tooth patch at the back of the tongue; striped bass have two distinct patches. White bass also have a deeper body and usually only one horizontal stripe reaching the tail; hybrids require multiple clues.",
    "approach": "During spring river runs check flows and public access; in reservoirs follow baitfish schools.",
    "caution": "Consult TPWD for current runs, closures and regulations before leaving.",
    "naturalHistory": [
      "White bass stage a pronounced spring spawning run. Males often reach upstream spawning areas before females, and spawning takes place in flowing water rather than a prepared nest. Adhesive eggs settle onto gravel and rocks; newly hatched fish begin with tiny aquatic prey. The run's timing depends on flow, temperature and access, so a particular week on the calendar should not be promoted as the current peak without new evidence.",
      "Outside the run, white bass are schooling predators that follow shad and other forage through rivers and reservoirs. Feeding schools sometimes break the surface, but they can also remain deep. Identification matters because young striped bass and hybrids can look similar; a single tooth patch toward the back of the tongue is a useful white-bass clue, in contrast to the two distinct patches typical of striped bass."
    ],
    "compareSlugs": [
      "striped-bass",
      "hybrid-striped-bass"
    ]
  },
  "freshwater-drum": {
    "sourceUrl": "https://tpwd.texas.gov/huntwild/wild/species/fwd/",
    "fieldSize": "Often under 10 lb.",
    "markings": "Deep silver-gray body, rounded sloping head and a noticeably arched back behind the head.",
    "texasHabitat": "Widespread Texas rivers and reservoirs; feeds around bottom habitat.",
    "similarSpecies": "Freshwater drum differ from striped and white bass in their shape and lack of long side stripes. They also resemble saltwater red drum, but freshwater drum lack the conspicuous dark spot near a red drum's tail.",
    "approach": "Bottom-oriented baits and small lures can work around hard bottom and current; handle safely near dorsal spines.",
    "caution": "Not the same species as saltwater red drum.",
    "naturalHistory": [
      "Freshwater drum are bottom-oriented fish that feed on aquatic insects, crayfish, small fish and mollusks. Heavy teeth deeper in the throat help them crush hard-shelled prey. Their common grunting or drumming noises are another field clue, although sound alone is not a reliable species test. Freshwater drum lack the dark spot near the tail that often identifies their saltwater relative, the red drum.",
      "Unlike nest-building sunfish, freshwater drum may spawn over open water in Texas during spring, with buoyant eggs suspended in the water until hatching. This difference is useful when comparing the species' life history with crappie or bass. Drum range through many Texas freshwater systems but TPWD describes them as uncommon or absent from the Panhandle. Records from one region should not be turned into a claim of identical fishing everywhere in the state."
    ],
    "compareSlugs": [
      "white-bass",
      "striped-bass"
    ]
  },
  "rainbow-trout": {
    "sourceUrl": "https://tpwd.texas.gov/huntwild/wild/species/rbt/",
    "fieldSize": "Commonly under 5 lb.",
    "markings": "Silvery sides with a pink-to-rose lateral stripe and dark spots on body, dorsal fin and tail.",
    "texasHabitat": "TPWD stocks rainbow trout in many Texas community ponds, selected rivers, and state-park waters during cool winter weather. Warm-water summer survival is generally poor, although suitable cool tailwaters can provide exceptions. Stocking sites and dates change, so check the current TPWD schedule rather than relying on last season's locations.",
    "similarSpecies": "Unlike most Texas native panfish, rainbow trout have an adipose fin and a spotted tail; do not confuse stocked trout with other cold-water salmonids.",
    "approach": "Use small flies, spinners or legal baits at current stocked waters; verify the latest TPWD stocking report.",
    "caution": "Do not represent last winter's stocking schedule as a current stocking announcement.",
    "naturalHistory": [
      "Rainbow trout are cool- to cold-water fish rather than a naturally widespread Texas warm-water species. They perform best in cooler water and require oxygenated gravel riffles for successful reproduction. Much of Texas gets too warm for sustained populations through summer, though suitable tailwater below dams can provide exceptions. Consequently, Texas' winter trout program is primarily a seasonal stocking opportunity, not a promise of wild trout reproduction in each stocked pond.",
      "The pink lateral stripe and spotted tail are useful field marks; the small adipose fin behind the dorsal fin further separates trout from common Texas sunfish. Trout feed on aquatic insects, crustaceans, mollusks and fish rather than consuming only artificial hatchery feed after stocking. Always use a current TPWD stocking schedule and the waterbody's regulations; last winter's release date or a general bag-limit summary should not be represented as this week's conditions."
    ]
  }
};
