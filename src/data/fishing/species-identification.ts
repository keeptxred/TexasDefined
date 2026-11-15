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
}
export const FISH_IDENTIFICATION_EDITORIAL_UPDATED_AT = "2026-11-15";
export const fishIdentification: Record<string, FishIdentification> = {
  "bowfin": {
    "sourceUrl": "https://tpwd.texas.gov/huntwild/wild/species/bowfin/",
    "fieldSize": "Usually under 10 lb in the pocket guide; TPWD notes many Texas fish weigh 6–8 lb.",
    "markings": "Long single dorsal fin running more than half the back; rounded tail; broad toothy mouth; olive-brown body. Some fish show a dark eyespot near the upper base of the tail.",
    "texasHabitat": "Slow lowland backwaters, sloughs and swampy sections of the Red, San Jacinto and Sabine systems and lower Brazos and Colorado basins.",
    "similarSpecies": "Unlike gar, bowfin lack a long rigid snout and diamond-shaped armor. Unlike invasive snakeheads, bowfin have a short anal fin and an unscaled head.",
    "approach": "Fish natural baits or lures around woody, weedy margins and slow current. They can gulp air; surfacing alone does not indicate distress.",
    "caution": "Do not mistake this native fish for a prohibited snakehead; TPWD publishes an identification comparison.",
    "naturalHistory": [
      "Bowfin are native predators rather than escaped snakeheads. TPWD describes males preparing shallow, weedy nests in late spring, clearing silt so eggs can adhere to submerged roots, wood and gravel. Males then guard the eggs and newly hatched young.",
      "Early-life food includes tiny aquatic invertebrates. As bowfin grow they switch increasingly to larger prey in the quiet, vegetation-rich water they occupy. Their ability to breathe air helps explain sightings at the surface."
    ]
  },
  "common-carp": {
    "sourceUrl": "https://tpwd.texas.gov/huntwild/wild/species/crp/",
    "fieldSize": "Often 12–25 in; much larger fish occur.",
    "markings": "Heavy body, bronze-to-golden scales, long-based dorsal fin and two pairs of barbels beside the mouth.",
    "texasHabitat": "Introduced and now widespread in Texas ponds, lakes, reservoirs and rivers, often foraging along soft bottoms.",
    "similarSpecies": "Unlike grass carp, common carp have conspicuous mouth barbels and a much longer dorsal fin.",
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
    "caution": "Alligator gar have special area-specific harvest and reporting restrictions; consult TPWD before targeting or keeping one."
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
    ]
  },
  "channel-catfish": {
    "sourceUrl": "https://tpwd.texas.gov/huntwild/wild/species/ccf/",
    "fieldSize": "Often under 24 in in the brochure; adults can be larger.",
    "markings": "Slender scaleless body, whisker-like barbels, deeply forked tail and often scattered small dark spots on younger fish.",
    "texasHabitat": "Texas rivers, ponds and reservoirs, where they use bottom contours and cover.",
    "similarSpecies": "A channel catfish usually has 24–29 soft rays along its anal fin, versus 30–35 in blue catfish. Both have forked tails, and larger channel catfish may lose the usual dark spotting, so do not use color alone.",
    "approach": "Fish natural or prepared bait along channel edges, current seams and bottom structure; adapt tackle to current and fish size.",
    "caution": "Use official species comparisons when identifying a small blue catfish versus a channel catfish."
  },
  "blue-catfish": {
    "sourceUrl": "https://tpwd.texas.gov/huntwild/wild/species/blc/",
    "fieldSize": "Often under 20 lb in the brochure, but can exceed 100 lb.",
    "markings": "Smooth unscaled bluish-gray body, long barbels and a deeply forked tail; adults often appear less spotted than channel catfish.",
    "texasHabitat": "Larger rivers and reservoirs, frequently using channels, dropoffs and open-water forage.",
    "similarSpecies": "Count the anal-fin rays when channel and blue catfish look alike: TPWD gives 30–35 for blue catfish and 24–29 for channel catfish. Both have forked tails; an unspotted body is not conclusive.",
    "approach": "Cut bait and other natural baits can work near forage and channel structure; use stronger tackle for larger fish.",
    "caution": "Large specimens need careful support and current waterbody rules should be checked."
  },
  "flathead-catfish": {
    "sourceUrl": "https://tpwd.texas.gov/huntwild/wild/species/catfish/",
    "fieldSize": "Often under 30 lb in the brochure; exceptionally large fish can exceed 100 lb.",
    "markings": "Broad flat head, projecting lower jaw, mottled olive-brown to yellow body and a tail that is square rather than deeply forked.",
    "texasHabitat": "Texas river channels, reservoirs, submerged logs and cavities with substantial cover.",
    "similarSpecies": "Separate flatheads from channel and blue catfish by the flattened head and unforked tail rather than body color.",
    "approach": "Fish substantial cover and slower channel edges with legal natural baits, especially when larger fish feed.",
    "caution": "Current TPWD gear, bait and waterbody-specific rules take precedence over general fishing advice."
  },
  "largemouth-bass": {
    "sourceUrl": "https://tpwd.texas.gov/huntwild/wild/species/lmb/",
    "fieldSize": "Can reach 16 in within several years; trophy sizes depend on genetics, habitat and forage.",
    "markings": "Large mouth, upper jaw commonly reaching beyond the rear of the eye; green-to-olive body with a dark horizontal lateral band.",
    "texasHabitat": "Common in Texas impoundments, ponds and slow rivers, using timber, vegetation, docks, points and ledges.",
    "similarSpecies": "Guadalupe and spotted bass may show different jaw proportions and broken side markings; rely on several traits, not a single stripe.",
    "approach": "Use cover-oriented soft plastics, crankbaits and other presentations matched to water clarity, season and structure.",
    "caution": "Special black-bass limits may apply on individual waters."
  },
  "guadalupe-bass": {
    "sourceUrl": "https://tpwd.texas.gov/huntwild/wild/species/gdb/",
    "fieldSize": "Generally small stream bass, often under a pound; larger fish occur.",
    "markings": "Compact black bass with dark side blotches and a jaw that typically does not reach as far behind the eye as largemouth bass.",
    "texasHabitat": "Texas-native black bass especially associated with flowing Hill Country streams and the Edwards Plateau.",
    "similarSpecies": "Guadalupe bass can hybridize with smallmouth bass; do not rely on mottling alone where species overlap.",
    "approach": "Fish current breaks, shaded rocks, riffle-to-pool transitions and undercut stream edges with appropriately light tackle.",
    "caution": "Protect this Texas state fish and check river-specific regulations and access."
  },
  "bluegill": {
    "sourceUrl": "https://tpwd.texas.gov/huntwild/wild/species/bgl/",
    "fieldSize": "Usually under 1 lb.",
    "markings": "Deep compressed body, dark spot near the rear of the soft dorsal fin, dark opercular flap and small mouth.",
    "texasHabitat": "Common in Texas ponds, creeks and reservoirs around vegetation, docks and shoreline cover.",
    "similarSpecies": "The dark patch at the rear of the soft dorsal fin, small mouth and vertical body bars help distinguish bluegill. Redear sunfish show a red/orange gill-flap edge, while green sunfish have a larger mouth.",
    "approach": "Small hooks with worms or small flies are useful for beginner-friendly shoreline fishing.",
    "caution": "Sunfish interbreed; mixed appearance may require several diagnostic traits."
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
    ]
  },
  "black-crappie": {
    "sourceUrl": "https://tpwd.texas.gov/huntwild/wild/species/crappie/",
    "fieldSize": "Usually under 2 lb.",
    "markings": "Deep compressed body with many irregular dark spots, without consistent vertical flank bars.",
    "texasHabitat": "Texas reservoirs and slow waters; may favor clearer water and brush or timber.",
    "similarSpecies": "White crappie more commonly show vertical bars and have a different dorsal-spine count; patterns alone may overlap.",
    "approach": "Small jigs and minnows presented beside timber, brush and spawning cover are common tactics.",
    "caution": "Confirm identity with multiple features where fish show ambiguous markings."
  },
  "white-crappie": {
    "sourceUrl": "https://tpwd.texas.gov/huntwild/wild/species/wcp/",
    "fieldSize": "Usually under 2 lb.",
    "markings": "Silvery deep body with several upright dark bars or mottled vertical markings.",
    "texasHabitat": "Rivers and reservoirs throughout Texas, including stained-water creek arms and brush.",
    "similarSpecies": "White crappie typically show upright side bars and have five or six dorsal spines; black crappie have more scattered spots and usually seven or eight dorsal spines. Color and markings alone may mislead.",
    "approach": "Small jigs or minnows near brush, timber, seasonal shallow cover and dropoffs are practical.",
    "caution": "Do not infer a lake-specific bag limit from statewide norms."
  },
  "striped-bass": {
    "sourceUrl": "https://tpwd.texas.gov/huntwild/wild/species/str/",
    "fieldSize": "Often 5–25 lb; can grow much larger.",
    "markings": "Streamlined silvery body with multiple nearly continuous horizontal dark stripes and two separate dorsal fins.",
    "texasHabitat": "Introduced into select large Texas reservoirs, often occupying open water and feeding on schools of baitfish.",
    "similarSpecies": "Striped bass have two distinct tooth patches near the rear of the tongue, versus one in white bass. Several dark side stripes normally reach the tail, but white-bass hybrids require considering all traits together.",
    "approach": "Look for schooling baitfish, depth breaks and open-water activity; choose legal lures or bait appropriate to the reservoir.",
    "caution": "Check species-specific and waterbody regulations for pure and hybrid striped bass."
  },
  "white-bass": {
    "sourceUrl": "https://tpwd.texas.gov/huntwild/wild/species/wtb/",
    "fieldSize": "Often 0.5–2 lb.",
    "markings": "Silvery compressed body, faint gray horizontal stripes and a dark mark on the gill cover.",
    "texasHabitat": "Texas rivers and reservoirs, especially where spring spawning runs connect river channels with impoundments.",
    "similarSpecies": "White bass have one central tooth patch at the back of the tongue; striped bass have two distinct patches. White bass also have a deeper body and usually only one horizontal stripe reaching the tail; hybrids require multiple clues.",
    "approach": "During spring river runs check flows and public access; in reservoirs follow baitfish schools.",
    "caution": "Consult TPWD for current runs, closures and regulations before leaving."
  },
  "freshwater-drum": {
    "sourceUrl": "https://tpwd.texas.gov/huntwild/wild/species/fwd/",
    "fieldSize": "Often under 10 lb.",
    "markings": "Deep silver-gray body, rounded sloping head and a noticeably arched back behind the head.",
    "texasHabitat": "Widespread Texas rivers and reservoirs; feeds around bottom habitat.",
    "similarSpecies": "Freshwater drum differ from striped and white bass in their shape and lack of long side stripes. They also resemble saltwater red drum, but freshwater drum lack the conspicuous dark spot near a red drum's tail.",
    "approach": "Bottom-oriented baits and small lures can work around hard bottom and current; handle safely near dorsal spines.",
    "caution": "Not the same species as saltwater red drum."
  },
  "rainbow-trout": {
    "sourceUrl": "https://tpwd.texas.gov/huntwild/wild/species/rbt/",
    "fieldSize": "Commonly under 5 lb.",
    "markings": "Silvery sides with a pink-to-rose lateral stripe and dark spots on body, dorsal fin and tail.",
    "texasHabitat": "In Texas primarily seasonal cool-weather stockings and a few suitable cool-water habitats rather than a statewide permanent warm-water fishery.",
    "similarSpecies": "Unlike most Texas native panfish, rainbow trout have an adipose fin and a spotted tail; do not confuse stocked trout with other cold-water salmonids.",
    "approach": "Use small flies, spinners or legal baits at current stocked waters; verify the latest TPWD stocking report.",
    "caution": "Do not represent last winter's stocking schedule as a current stocking announcement."
  }
};
