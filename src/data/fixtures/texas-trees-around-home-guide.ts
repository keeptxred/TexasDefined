import type { Article, ArticleBlock } from "../types";

const p = (text: string): ArticleBlock => ({ type: "paragraph", text });
const h = (text: string): ArticleBlock => ({ type: "heading", text });
const list = (...items: string[]): ArticleBlock => ({ type: "list", items });

export const texasTreesAroundHomeGuideArticle: Article = {
  id: "evergreen-texas-trees-around-home-guide",
  brandId: "texasdefined",
  slug: "texas-trees-around-home-guide",
  title: "Texas Trees Around a House: Storm Risk, Oak Wilt, Roots, Drought and When to Call an Arborist",
  dek: "A practical homeowner guide to living with Texas shade trees: storm damage, ice, oak wilt prevention, pruning, drought stress, roots, construction, utilities, insurance records and the warning signs that deserve a certified arborist.",
  category: "home-garden",
  hero: {
    src: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Preston_Hollow,_Dallas,_Texas_tree_tornado_damage.jpg?width=1600",
    alt: "Large tree uprooted in a Dallas neighborhood after the October 2019 tornado",
    width: 1600,
    height: 1200,
    credit: "Sharon Hahn Darlin · CC BY 2.0 · Wikimedia Commons",
  },
  authorId: "a-marisol",
  publishedAt: "2026-08-22",
  readingMinutes: 16,
  tags: ["texas tree care", "texas storm trees", "oak wilt texas", "certified arborist texas", "tree roots foundation", "texas drought trees", "tree pruning texas", "home and garden"],
  featured: true,
  sourceName: "Texas A&M Forest Service",
  sourceUrl: "https://tfsweb.tamu.edu/trees/tree-care/",
  internalLinks: [
    { href: "/article/texas-homeowner-field-manual", label: "Texas Homeowner Field Manual", description: "Connect trees with roofs, drainage, foundations, insurance, utilities and storm preparation." },
    { href: "/article/texas-trees-guide", label: "Texas trees guide", description: "Identify the major native and familiar tree species that shape different Texas regions." },
    { href: "/article/best-native-plants-texas-yard", label: "Best native plants for a Texas yard", description: "Build a landscape around region-appropriate trees, shrubs, grasses and flowers." },
    { href: "/article/texas-roofs-hail-wind-heat", label: "Texas roofs, hail, wind and heat", description: "Understand how weather and nearby limbs affect one of the home's most exposed systems." },
    { href: "/article/texas-hurricane-preparation-guide", label: "Texas hurricane preparation guide", description: "Add tree and limb risk to wind, flood, outage and insurance preparation." },
    { href: "/article/prepare-texas-house-freeze", label: "Prepare a Texas house for a freeze", description: "Plan for ice-loaded limbs, power outages and cold-weather tree damage." },
    { href: "https://tfsweb.tamu.edu/trees/tree-care/trees-and-natural-disasters/", label: "Texas A&M Forest Service storm-tree guidance", description: "Official Texas guidance for assessing and recovering trees after storms and natural disasters." },
    { href: "https://tfsweb.tamu.edu/trees/tree-care/pruning/", label: "Texas A&M Forest Service pruning guidance", description: "Official pruning guidance, oak wound-paint advice and certified-arborist recommendations." },
    { href: "https://tfsweb.tamu.edu/trees/tree-care/trees-and-natural-disasters/trees-and-drought/effects-of-drought-on-trees/", label: "Texas A&M Forest Service drought guidance", description: "Official guidance on drought stress, feeder-root loss, watering and long-term decline." },
    { href: "https://tfsweb.tamu.edu/trees/tree-care/trees-and-natural-disasters/trees-and-flooding/", label: "Texas A&M Forest Service flooding guidance", description: "Official Texas tree-safety and recovery guidance after flooding and major storms." },
  ],
  relatedCollections: [],
  relatedDestinations: [],
  body: [
    p("A mature shade tree can lower heat exposure, define a yard and add enormous character to a Texas home. It can also become one of the largest moving objects on the property during a thunderstorm, tornado, hurricane, ice event or prolonged drought. The practical goal is not to remove every large tree near a house. It is to know which trees are healthy assets, which conditions are changing and which work is too dangerous or specialized for routine DIY maintenance."),
    p("Texas A&M Forest Service treats tree care as both a health and safety issue. Storm damage, pruning wounds, root disturbance, drought and disease interact over years, which is why a tree that looks fine from the driveway can still deserve a closer assessment after construction, flooding, major limb loss or a visible change in lean."),

    h("1. Start with structure, not leaf color"),
    p("Leaves change with heat, drought, pests and season, but homeowner risk often begins with structure. Look at the trunk flare, major unions, visible cavities, dead limbs, hanging branches, root-plate movement and whether the canopy has become dramatically one-sided."),
    list("Watch for newly exposed roots or soil lifting on one side of the trunk.", "Note large dead limbs over roofs, driveways, bedrooms and play areas.", "Look for cracks where major stems divide.", "Compare a tree's lean with older photos instead of assuming every leaning trunk is actively failing.", "Have hidden or high-consequence defects assessed by a qualified arborist."),

    h("2. After a storm, safety comes before cleanup"),
    p("Texas A&M Forest Service warns homeowners not to rush into hazardous tree cleanup. Downed power lines, suspended limbs, split trunks and unstable root plates can turn recovery work into a second emergency."),
    list("Stay away from trees touching or close to power lines and contact the utility.", "Do not work under hanging or partially attached limbs.", "Avoid overhead chainsaw work and large-limb removal without proper training and equipment.", "Photograph damage before cleanup when it is safe, especially if insurance may be involved.", "Use a certified arborist for damage that is high, heavy, hidden or structurally complicated."),

    h("3. A damaged tree is not automatically a dead tree"),
    p("Storms can strip leaves and break branches without destroying the trunk or root system. Texas A&M Forest Service specifically advises assessing whether a damaged tree can be saved before removing it simply because it looks bare immediately after a storm."),
    p("The opposite is also true: a tree with a split trunk, severe root-plate movement or major internal decay may remain green for a while even though its structural risk has changed. Health and stability are related, but they are not the same question."),

    h("4. Oak pruning has a Texas-specific disease consequence"),
    p("Oak wilt is one reason Texas pruning advice differs from generic tree-care advice. Texas A&M Forest Service recommends painting fresh pruning cuts on oak trees immediately to help reduce oak-wilt transmission. Wound paint is not generally recommended for pruning cuts on other tree species."),
    p("If storm cleanup creates new cuts on an oak, the Forest Service guidance is to paint those fresh wounds as they are made. The point is disease prevention, not making the cut look finished."),

    h("5. Do not top a mature tree to make it 'safe'"),
    p("Removing the top or indiscriminately cutting major limbs can create weak regrowth, large wounds and long-term structural problems. Mature-tree pruning should have a reason: remove dead or dangerous wood, improve clearance, correct specific defects or reduce a defined risk while preserving as much healthy canopy as practical."),
    p("Texas A&M Forest Service advises against removing too much live crown at one time and recommends certified arborists for large-tree work requiring climbing or power tools."),

    h("6. The root system extends far beyond the trunk"),
    p("Homeowners often protect the visible trunk while damaging the unseen part of the tree during construction. Trenching for irrigation, utilities, drainage, pools, fences or additions can cut roots. Heavy equipment and repeated vehicle traffic can compact soil over the root zone."),
    list("Map important trees before excavation begins.", "Keep heavy equipment and material storage away from root zones when practical.", "Avoid raising or lowering soil grades around established trees without professional guidance.", "Do not assume a narrow trench is harmless simply because it misses the trunk.", "Include tree protection in contractor scope before work starts rather than after roots are cut."),

    h("7. Tree roots and foundations are usually a water-and-soil conversation too"),
    p("It is tempting to blame every slab crack on the nearest large tree, but Texas foundation behavior is also shaped by expansive soils, drainage, plumbing leaks and long moisture cycles. Roots follow favorable soil conditions and water; removing a mature tree can also change soil moisture demand."),
    p("When a foundation and a large tree are both part of the concern, avoid diagnosing from distance alone. A foundation professional and a certified arborist may be looking at different parts of the same site problem."),

    h("8. Drought stress can outlast the drought"),
    p("Texas A&M Forest Service notes that severe drought can kill fine feeder roots and leave trees stressed for years after rainfall returns. Drought-stressed trees can also become more vulnerable to borers, root rots and canker diseases."),
    list("Watch valuable shade trees during extended dry periods rather than waiting for canopy collapse.", "Water deeply enough to reach the active root zone when supplemental watering is appropriate.", "Use a modest mulch layer to reduce soil moisture loss, but keep mulch away from direct trunk contact.", "Avoid adding construction or pruning stress to a tree already struggling through drought when the work can wait."),

    h("9. Too much water can be as disruptive as too little"),
    p("Flooding and saturated soils reduce oxygen available to roots and can destabilize soil around large trees. After flooding, Texas A&M Forest Service advises watching for root-plate shifting and avoiding heavy equipment on unstable soil."),
    p("Drainage projects around mature trees should solve the property problem without casually burying roots, cutting major roots or directing persistent standing water into a root zone that was previously well drained."),

    h("10. Ice damage creates a different cleanup problem"),
    p("Ice can load limbs until they split or bend, especially in broad-canopied trees. After a winter storm, do not pull on suspended branches or work near conductors. Texas A&M Forest Service also reminds owners that new cleanup cuts on oaks should be painted immediately for oak-wilt prevention."),

    h("11. Utility lines create a hard safety boundary"),
    p("A branch touching or threatening an electric line is not ordinary homeowner pruning. Texas A&M Forest Service says not to remove limbs on or near power lines. Contact the utility or an appropriately qualified professional instead of assuming a small limb is safe because the wire looks insulated."),
    p("When planting new trees, mature size matters. A small nursery tree can become a recurring utility conflict if its natural canopy belongs where conductors already exist."),

    h("12. Choose a certified arborist before the emergency"),
    p("Post-storm neighborhoods attract contractors offering immediate removals. Texas A&M Forest Service recommends an ISA Certified Arborist when professional assessment or large-tree work is needed rather than hiring the first person who appears after a disaster."),
    list("Verify certification rather than relying only on a business name.", "Ask for proof of liability insurance for high-risk work.", "Get the assessment in writing when the decision affects an expensive or high-consequence tree.", "Clarify whether stump removal, debris hauling and restoration are included.", "Be cautious of anyone recommending removal of multiple healthy trees without explaining the specific defect or risk."),

    h("13. Document valuable trees before storm season"),
    p("Texas A&M Forest Service specifically recommends periodic photographs after flood and storm damage because documentation can matter for insurance and tax purposes. The same habit is useful before a storm: photographs establish the pre-loss condition and location of major trees."),
    list("Photograph the whole tree from more than one direction.", "Include its relationship to the house, fence, driveway and utility lines.", "Keep invoices for major pruning, cabling, treatment or removals.", "Save arborist reports when a tree has been professionally assessed.", "Record storm damage before emergency removal when doing so is safe."),

    h("14. New landscaping should respect mature-tree biology"),
    p("Raised beds, patios, pools, irrigation changes and new turf can alter drainage and soil conditions around existing trees. A mature tree that adapted to one environment may decline after grade changes, compaction or chronic overwatering even when no roots were visibly cut."),
    p("Plan the yard as one system. Trees, drainage, foundations, septic fields, pools and utility trenches all compete for physical space below ground."),

    h("15. Know the difference between nuisance and hazard"),
    p("Leaves in gutters, acorns on a driveway, shade over turf and surface roots are maintenance issues. A split trunk over a bedroom, a shifting root plate after flooding, a large dead limb over a walkway or a tree contacting power lines is a safety issue. Keeping those categories separate prevents both needless removals and dangerous delay."),

    h("16. The homeowner decision tree"),
    list("If the issue involves power lines, stop and contact the utility or qualified professional.", "If large limbs are hanging, the trunk is split or roots have shifted, keep people out of the fall zone and seek professional assessment.", "If an oak requires a fresh pruning cut, follow Texas oak-wilt wound-paint guidance.", "If decline follows drought, flooding or construction, investigate the site change rather than only treating the leaves.", "If the work requires climbing, overhead chainsaw use or large-limb rigging, hire a certified arborist.", "If the tree is healthy and the concern is routine clearance, use conservative pruning rather than topping or drastic canopy removal."),

    h("The operating principle: preserve good trees and act early on changing risk"),
    p("Texas homes benefit enormously from mature trees, especially through long hot summers. The safest approach is neither neglect nor aggressive removal. Protect roots, prune for a reason, watch how trees respond to drought and floods, photograph important trees, prevent oak wilt when pruning oaks and use qualified help when the size or consequence of the work moves beyond ordinary yard maintenance."),
  ],
};
