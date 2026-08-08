import bigBend from "@/assets/big-bend.jpg";

import type { Article, ArticleBlock } from "../types";

const p = (text: string): ArticleBlock => ({ type: "paragraph", text });
const h = (text: string): ArticleBlock => ({ type: "heading", text });
const list = (...items: string[]): ArticleBlock => ({ type: "list", items });

export const jeffDavisCountyFortDavisMountainsArticle: Article = {
  id: "county-jeff-davis-fort-davis-mountains",
  brandId: "texasdefined",
  slug: "jeff-davis-county-fort-davis-mountains-texas",
  title: "Jeff Davis County: Forts, Dark Skies and the Mountain Side of West Texas",
  dek: "Fort Davis, the Davis Mountains, McDonald Observatory and tiny Valentine make Jeff Davis County one of the clearest examples of how much history, science and scenery can fit inside a sparsely populated corner of Texas.",
  category: "texas-history",
  region: "big-bend",
  hero: {
    src: bigBend,
    alt: "Mountain and desert landscape in the Trans-Pecos region of West Texas",
    width: 1600,
    height: 1067,
  },
  authorId: "a-marisol",
  publishedAt: "2026-08-08",
  readingMinutes: 10,
  tags: ["Jeff Davis County", "Fort Davis", "Davis Mountains", "McDonald Observatory", "Valentine", "Buffalo Soldiers", "Texas counties", "West Texas", "Texas history"],
  featured: false,
  internalLinks: [
    { href: "/article/culberson-county-van-horn-guadalupe-mountains-texas", label: "Explore neighboring Culberson County", description: "Continue north toward Van Horn, Guadalupe Peak and the Salt Basin." },
    { href: "/article/presidio-county-marfa-borderlands-texas", label: "Explore neighboring Presidio County", description: "Continue south and west through Marfa, Fort Leaton and the Rio Grande borderlands." },
    { href: "/article/brewster-county-big-bend-texas", label: "Explore neighboring Brewster County", description: "Continue into Alpine, Terlingua and Big Bend National Park." },
    { href: "/browse/counties", label: "Browse all 254 Texas counties", description: "Explore Texas one county at a time." },
    { href: "/article/why-texas-has-254-counties", label: "Why Texas has 254 counties", description: "How distance and local government shaped the Texas county map." },
    { href: "/explore", label: "Explore Texas", description: "Find parks, towns, landscapes and destinations across the state." },
    { href: "/texas-history", label: "More Texas history", description: "Stories that explain the people and places behind modern Texas." },
  ],
  relatedCollections: [],
  relatedDestinations: [],
  body: [
    p("Jeff Davis County is the kind of place that makes the usual picture of Texas feel incomplete. Instead of endless flatland, much of the county rises into the Davis Mountains. Instead of city glow, its night sky is dark enough to support one of the world's major astronomical observatories. And instead of a single frontier story, the county holds layers of Indigenous history, military history, ranching, railroad development, conservation and science."),
    p("It is also exceptionally lightly populated. The 2020 Census counted 1,996 residents across more than 2,200 square miles. Fort Davis is the county seat and principal community; Valentine is the other town most travelers recognize. Between them lie ranches, mountain roads and long stretches where the scale of the landscape does most of the talking."),

    h("Jeff Davis County was born from a county-seat fight"),
    p("The county's creation in 1887 was tied directly to the rivalry between Fort Davis and Marfa. Both communities were then part of Presidio County. Fort Davis had served as the county seat, but when the Southern Pacific Railroad bypassed it and helped Marfa grow, voters moved the seat to Marfa in 1885."),
    p("Fort Davis residents responded by pushing for a new county. The Texas Legislature created Jeff Davis County on March 15, 1887, with Fort Davis as its seat. The episode is a perfect example of why Texas ended up with so many counties: in a huge state, transportation and access to local government could decide political geography."),
    p("The county, the mountains and the fort all carry the Davis name. Fort Davis was named in 1854 for then-U.S. Secretary of War Jefferson Davis, who later became president of the Confederacy."),

    h("The mountains were a refuge long before they were a destination"),
    p("Human occupation in the Davis Mountains reaches back at least 10,000 years. Springs, creeks, canyons and higher elevations made the range an important refuge in an otherwise demanding part of the Chihuahuan Desert. Indigenous peoples used the mountains and surrounding country for generations before modern towns, ranches or military roads appeared."),
    p("Spanish expeditions also passed through the region. Texas Parks and Wildlife notes that Antonio de Espejo's 1583 expedition camped in what is now Keesey Canyon. Those early routes were part of a much older human geography organized around water, passes and movement through the mountains."),

    h("Fort Davis guarded one of the roads west"),
    p("The U.S. Army established Fort Davis in 1854 along the San Antonio-El Paso Road. The site offered water, wood, forage and a strategic position along a route used by mail coaches, freighters, emigrants and other travelers crossing the Trans-Pecos."),
    p("The first fort operated until the Civil War era. Federal troops left after Texas seceded, and the post was eventually abandoned for several years. In 1867 the Army returned and rebuilt Fort Davis as western travel resumed."),
    p("Among the troops stationed there were soldiers of the Ninth and Tenth Cavalry and the Twenty-fourth and Twenty-fifth Infantry, Black regiments whose members became widely known as Buffalo Soldiers. Their service is central to the fort's post-Civil War history. Fort Davis remained active until 1891."),
    p("Today Fort Davis National Historic Site preserves what the National Park Service calls one of the best surviving examples of a frontier military post in the Southwest. The parade ground, officers' quarters, barracks and hospital ruins make the scale of the old installation easier to grasp than a roadside marker ever could."),

    h("Fort Davis the town outlived Fort Davis the post"),
    p("The civilian settlement beside the military post grew because the fort created demand for food, livestock, freight, labor and services. Even after the Army left, the town remained the county seat and a center for surrounding ranch country."),
    p("That separation matters. The national historic site is the preserved military post; Fort Davis is the living community next to it. The town's identity now combines courthouse life, ranching, tourism, mountain recreation and the astronomy economy farther up the road."),

    h("The New Deal left one of its prettiest Texas footprints here"),
    p("Davis Mountains State Park was established during the Great Depression after local landowners donated acreage to the state. Beginning in the 1930s, Civilian Conservation Corps crews built roads, overlooks, picnic structures and buildings that still shape the park experience."),
    p("Their most distinctive project is Indian Lodge, a white-adobe, pueblo-inspired hotel inside the park. The original lodge opened in 1935 and retains thick adobe walls, hand-crafted details and the kind of architecture that seems inseparable from its mountain setting."),
    p("The CCC also constructed Skyline Drive, a winding road that climbs to broad views over the Davis Mountains. It is a reminder that some of Texas' most beloved park infrastructure was created as both conservation work and employment during the economic crisis of the 1930s."),

    h("Then the mountains became a window into the universe"),
    p("Jeff Davis County's elevation, dry climate and dark skies made the Davis Mountains an extraordinary place for astronomy. McDonald Observatory, a research unit of the University of Texas at Austin, occupies Mount Locke and Mount Fowlkes northwest of Fort Davis."),
    p("The observatory was dedicated in 1939. Its first major telescope, now named for astronomer Otto Struve, helped establish the site as a serious research center. In 1944 astronomer Gerard Kuiper used observations from McDonald to detect an atmosphere around Saturn's moon Titan — the first atmosphere identified around any moon."),
    p("McDonald remains an active research institution rather than a museum of old telescopes. Its facilities include major modern instruments, while the visitors center, tours and public Star Parties turn professional astronomy into one of the county's signature visitor experiences."),

    h("Darkness itself has become something worth protecting"),
    p("The remarkable night sky is not simply a happy accident. Communities, parks, researchers and conservation groups across the region have worked to reduce unnecessary outdoor light. In 2022 the Greater Big Bend International Dark Sky Reserve was designated across more than nine million acres of Texas and northern Mexico."),
    p("Its core includes McDonald Observatory and the Davis Mountains Preserve. The designation recognizes a useful truth about Jeff Davis County: darkness is part of the landscape. Protecting it benefits astronomy, wildlife and the experience of standing outside on a clear night and seeing a sky that many urban Texans rarely encounter."),

    h("Valentine really did get its name on Valentine's Day"),
    p("Southwest of Fort Davis, the town of Valentine grew beside the Southern Pacific Railroad. According to the Handbook of Texas, railroad crews reached the site on February 14, 1882, and the community took the name Valentine."),
    p("The town became a shipping point for area ranches and at times supported several hundred residents. It later shrank dramatically, but its name and roadside setting have given it an outsized cultural presence. Valentine is the sort of Texas place whose fame is much larger than its population."),

    h("Ranch country ties the county together"),
    p("The dramatic attractions can make Jeff Davis County look like a collection of destinations — fort, state park, observatory, tiny town — but ranching is the connective tissue across much of the landscape. Cattle operations expanded in the late nineteenth century and remain part of the county's visual and cultural identity."),
    p("That working landscape also explains why the county feels so open. Large properties, sparse settlement and mountain terrain leave long distances between services. A trip here rewards the traveler who stops treating miles as dead space and starts seeing the ranch roads, fences, grasslands, volcanic slopes and sky as part of the experience."),

    h("A few Jeff Davis County facts worth remembering"),
    list(
      "Jeff Davis County was created in 1887 after Fort Davis lost the Presidio County seat to Marfa.",
      "The 2020 Census counted just 1,996 residents in a county covering more than 2,200 square miles.",
      "Fort Davis was established by the U.S. Army in 1854 and remained active, with a Civil War interruption, until 1891.",
      "Black soldiers later known as Buffalo Soldiers served at Fort Davis after the Civil War.",
      "Davis Mountains State Park was developed as an early Texas Civilian Conservation Corps project in the 1930s.",
      "Indian Lodge opened in 1935 and preserves distinctive CCC-era adobe craftsmanship.",
      "McDonald Observatory was dedicated in 1939 and remains a major astronomical research and public-education center.",
      "The Greater Big Bend International Dark Sky Reserve, designated in 2022, includes McDonald Observatory in its core area.",
      "Valentine was named after railroad crews reached the site on February 14, 1882.",
    ),

    h("Why Jeff Davis County belongs on a Texas map in your head"),
    p("Jeff Davis County is useful because it overturns several Texas clichés at once. It is mountain country in a state often imagined as flat. It is a frontier-history destination where the story includes Buffalo Soldiers and Indigenous travel routes, not merely wagon trains. It is ranch country that also supports internationally important astronomy. And it is a place where conserving darkness has become as important as conserving land."),
    p("It also connects naturally to neighboring Presidio, Brewster and Culberson counties. Drive south toward Marfa and the borderlands story deepens. Continue toward Alpine and Big Bend and the mountains open into desert basins, canyons and the Rio Grande. Head north toward Van Horn and Guadalupe Peak and the mountain story continues into Texas' highest country."),
    p("For a county with fewer than two thousand people at the last census, Jeff Davis County carries an extraordinary amount of Texas: military history, ranching, New Deal architecture, railroad lore, mountain ecology, scientific discovery and one of the darkest night skies most Texans will ever see."),
  ],
};
