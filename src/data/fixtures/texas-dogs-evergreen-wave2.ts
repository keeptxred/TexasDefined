import type { Article, ArticleBlock } from "../types";

const p = (text: string): ArticleBlock => ({ type: "paragraph", text });
const h = (text: string): ArticleBlock => ({ type: "heading", text });
const list = (...items: string[]): ArticleBlock => ({ type: "list", items });

export const smallDogsBigTexasAttitudeArticle: Article = {
  id: "evergreen-small-dogs-big-texas-attitude",
  brandId: "texasdefined",
  slug: "small-dogs-big-texas-attitude",
  title: "Small Dogs, Big Texas Attitude",
  dek: "The smallest dog in the room is often the one acting like it owns the deed, the porch and several neighboring properties. That mismatch is exactly why little-dog personality is so funny.",
  category: "guides",
  hero: {
    src: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Chihuahua-dog.jpg?width=1600",
    alt: "A black Chihuahua standing alert and looking toward the camera",
    width: 1600,
    height: 1131,
    credit: "Lee Kok Seng Moe · CC BY 4.0 · Wikimedia Commons",
  },
  authorId: "a-marisol",
  publishedAt: "2026-09-13",
  readingMinutes: 9,
  tags: [
    "small dogs",
    "Texas dogs",
    "dog personalities",
    "dog humor",
    "Chihuahua",
    "Dachshund",
    "Yorkshire Terrier",
    "Texas Dogs Defined",
  ],
  featured: false,
  internalLinks: [
    {
      href: "/dogs",
      label: "Texas Dogs Defined",
      description: "Meet the breeds, personalities and Texas dog-life stories behind the Dogs Defined world.",
    },
    {
      href: "/dogs/chihuahua",
      label: "Chihuahua Defined",
      description: "Five pounds of dog, forty pounds of opinion and a natural fit for big-attitude humor.",
    },
    {
      href: "/dogs/dachshund",
      label: "Dachshund Defined",
      description: "Low to the ground, long on confidence and frequently convinced the whole porch is under its jurisdiction.",
    },
    {
      href: "/dogs/yorkshire-terrier",
      label: "Yorkshire Terrier Defined",
      description: "Tiny frame, polished confidence and no interest in being treated like background scenery.",
    },
    {
      href: "/dogs/pembroke-welsh-corgi",
      label: "Corgi Defined",
      description: "A compact manager with a surprisingly expansive understanding of its authority.",
    },
  ],
  relatedCollections: [],
  relatedDestinations: [],
  body: [
    p("Texas has a long-running cultural affection for things that take up space: wide ranches, long highways, big trucks, giant skies and steaks that arrive on plates with structural concerns. Small dogs do not participate in that tradition physically. They participate emotionally."),
    p("A little dog can weigh less than a sack of groceries and still walk into a room as if somebody has been waiting for management. It can occupy one cushion and somehow control the whole couch. It can bark at a truck forty times its size, stare down a Labrador from the safety of a human lap and treat the front window like a privately funded intelligence post."),
    p("That gap between actual size and perceived authority is one of the great engines of dog humor. The dog does not seem to know it is small. More accurately, the dog may know perfectly well and simply regard the information as irrelevant."),

    h("Small is a measurement, not a management philosophy"),
    p("The funniest small-dog stories usually begin when a human assumes compact size means compact personality. The dog immediately corrects the record. A Chihuahua may patrol the room like security. A Yorkie may carry itself like it has a standing salon appointment and three assistants. A Dachshund can stretch across a doorway and somehow make twelve inches of height feel jurisdictional. A Corgi can turn short legs into middle-management energy."),
    p("None of that requires pretending every member of a breed behaves exactly the same way. The point of good dog humor is recognition, not a scientific claim. Owners laugh because the scene resembles something they have watched at home: a tiny dog enforcing a rule nobody else knew existed."),

    h("The front-window intelligence division"),
    p("Every small dog does not work the front window, but the ones who do can be remarkably committed. Their office may be the back of a couch, a chair near the blinds or one strategically chosen patch of floor with a view of the sidewalk. From there, ordinary neighborhood events become actionable intelligence."),
    list(
      "Mail truck: noted and announced.",
      "Neighbor walking the same route as yesterday: somehow still suspicious.",
      "Plastic bag moving in the wind: immediate review required.",
      "Dog across the street: diplomatic relations deteriorating.",
      "Family car turning into the driveway: switch instantly from surveillance to celebration."
    ),
    p("The comedy comes from seriousness. A ten-pound dog can approach a passing bicycle with the gravity of a border incident. Humans may know the cyclist has no interest in the property. The dog has not been briefed and will not lower the readiness level until the threat has moved beyond the next mailbox."),

    h("Lap dog does not mean passive observer"),
    p("Small dogs fit easily into laps, but many of them use the position less like a bed and more like an executive suite. The elevation is useful. It improves the view, places a human within immediate reach and creates a naturally defensible position from which to monitor the room."),
    p("This is also where small-dog ownership develops its own household choreography. People learn how to stand up without dislodging a sleeping dog. Blankets get inspected before anybody sits down. A human who says, “I’ll just move the dog,” discovers that moving the dog requires negotiations with a party that believes possession is nine-tenths of couch law."),

    h("Portable dog, nonportable opinions"),
    p("One practical advantage of a smaller dog is obvious: the physical footprint is smaller. The carrier is smaller. The sleeping spot is smaller. The portion of the back seat occupied by the dog is theoretically smaller. Yet the dog's opinions about where it should sit, who should hold it and whether the trip should include snacks may expand to fill every available inch."),
    p("A road trip can make the contrast especially funny. A little dog may disappear behind a travel pillow and then reappear at every stop convinced it is responsible for inspecting the parking lot. At a cabin or rental, the dog can perform a complete perimeter review in minutes. By bedtime, it has selected the best chair and established local policy."),

    h("Texas attitude works better when Texas is the setting, not the costume"),
    p("Small-dog Texas humor gets weak quickly when every idea is reduced to a cowboy hat, boots and a state outline. The stronger version puts the dog in a recognizable Texas situation and lets the personality do the work."),
    p("A Chihuahua on porch patrol is already a Texas story. A Dachshund stretched beneath a patio chair while monitoring barbecue is already a Texas story. A Yorkie treating a Hill Country weekend like a boutique inspection tour is already a Texas story. A Corgi directing backyard operations while everybody else carries the cooler is already a Texas story."),
    p("The state should feel like the place the dog lives, not a sticker added after the joke was written."),

    h("The best small-dog joke is usually about authority"),
    p("Scale jokes are easy. “Tiny but mighty” has been printed on nearly everything that can hold ink. The more memorable joke asks what the dog believes its job is."),
    list(
      "Chihuahua: Director of Perimeter Communications.",
      "Dachshund: Low-Rise Security Division.",
      "Yorkie: Executive Director of Presentation Standards.",
      "Corgi: Middle Management, naturally.",
      "Frenchie: Senior Patio Critic.",
      "Beagle: Compact but fully staffed Quality Control."
    ),
    p("A title works when the owner can connect it to behavior. The human wearing the shirt does not need strangers to know every detail. The joke only has to trigger the thought: mine does exactly that."),

    h("Confidence is funnier than toughness"),
    p("There is a difference between giving a small dog a big personality and making the joke about aggression. Confidence is broader and warmer. It can mean insisting on the center cushion, supervising a meal, refusing to walk through wet grass, announcing visitors, demanding a particular blanket or looking personally offended when a human closes a door."),
    p("Those moments are more useful because they sound like home. A dog does not need to be threatening to be completely convinced it has rank. In fact, the funniest version is often a tiny animal conducting very ordinary business with wildly disproportionate importance."),

    h("Big attitude still needs a human with good judgment"),
    p("The personality joke should never become an excuse to ignore the practical realities of living with a small dog. Owners still make the decisions about safe spaces, weather, other animals, travel and the situations a dog can handle comfortably. The dog may believe it is Head of Security. The human still owns the actual security plan."),
    p("That balance is part of what makes the relationship funny. The dog projects total authority; the person quietly handles the unglamorous logistics and lets the dog take credit."),

    h("The Texas small-dog résumé"),
    p("If a small Texas dog had to submit a résumé, the qualifications might include porch observation, blanket acquisition, snack detection, visitor notification, couch-space optimization and the ability to convert a five-minute errand into a full operational briefing."),
    p("There would be no line for physical size because, from the dog's point of view, that is not relevant experience."),
    p("That is the whole appeal of small dogs with big Texas attitude. They fit in the passenger seat, under the patio table and in the crook of an arm. Their sense of importance requires considerably more room."),
  ],
};

export const bigDogsTexasSizedProblemsArticle: Article = {
  id: "evergreen-big-dogs-texas-sized-problems",
  brandId: "texasdefined",
  slug: "big-dogs-texas-sized-problems",
  title: "Big Dogs, Texas-Sized Problems",
  dek: "Living with a very large dog turns ordinary household decisions into logistics: couch space, truck space, doorway traffic and the recurring mystery of why the giant dog still thinks it is lap-sized.",
  category: "guides",
  hero: {
    src: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Great_Dane.jpg?width=1600",
    alt: "A Great Dane standing in profile against a dark background",
    width: 7952,
    height: 5304,
    credit: "Dühring Fotografie · CC BY-SA 4.0 · Wikimedia Commons",
  },
  authorId: "a-marisol",
  publishedAt: "2026-09-13",
  readingMinutes: 9,
  tags: [
    "big dogs",
    "Texas dogs",
    "Great Dane",
    "large dog life",
    "dog humor",
    "dog personalities",
    "Texas Dogs Defined",
  ],
  featured: false,
  internalLinks: [
    {
      href: "/dogs",
      label: "Texas Dogs Defined",
      description: "Explore the breed personalities and Texas dog-life stories behind the Dogs Defined world.",
    },
    {
      href: "/dogs/great-dane",
      label: "Great Dane Defined",
      description: "A horse-sized lap dog with absolutely no concept of personal space.",
    },
    {
      href: "/dogs/german-shepherd",
      label: "German Shepherd Defined",
      description: "Big presence, working-dog seriousness and a natural talent for household security-department humor.",
    },
    {
      href: "/dogs/boxer",
      label: "Boxer Defined",
      description: "Athletic build, expressive face and a strong case for the title of Backyard Activities Director.",
    },
    {
      href: "/dogs/labrador-retriever",
      label: "Labrador Retriever Defined",
      description: "A substantial dog that can still become convinced the best seat in the truck is wherever a human is already sitting.",
    },
  ],
  relatedCollections: [],
  relatedDestinations: [],
  body: [
    p("Texas likes to say everything is bigger here. A Great Dane hears that and appears to take it as a housing recommendation."),
    p("Living with a big dog changes the scale of ordinary life in ways that photographs do not explain. A dog bed becomes furniture. A water bowl becomes a small municipal project. A back seat stops being a row of seats and becomes “the dog's area.” A doorway that looked perfectly normal during the home tour becomes a daily traffic-control problem once eighty or a hundred pounds of enthusiastic animal decides to stand sideways in it."),
    p("The funny part is that the dog often seems unaware of the logistics. Humans see square footage. The dog sees an available lap."),

    h("The couch is now a floor plan"),
    p("With a small dog, couch negotiations may involve one cushion. With a large dog, the couch becomes a land-use question. The dog can occupy two seats while technically sleeping in one position. A single stretch may close the remaining route between the coffee table and the hallway. If the dog rolls over, zoning changes immediately."),
    p("Large-dog owners eventually stop asking whether the dog is allowed on the furniture and start asking whether the humans are. The answer depends on arrival time. Sit down early enough and you may retain a corner. Arrive after the dog has settled and the household follows established precedent: nobody wants to wake the giant baby."),

    h("The lap-dog delusion scales beautifully"),
    p("One of the best big-dog jokes survives because it is so often visually perfect: a very large animal attempting to sit where a much smaller dog once fit. The front half lands on the human. The back half remains on the floor. The dog interprets this as success."),
    p("A Great Dane leaning against somebody can feel less like affection and more like a structural load. A Boxer can launch a greeting that rearranges the room. A Labrador may place only its head in a lap but somehow make the rest of the body part of the same transaction. Large dogs do not need to understand geometry. They only need to know where their people are."),

    h("Truck space: claimed"),
    p("A Texas road trip with a big dog begins before the engine starts. Where does the dog ride? Where does the cooler go? Which bag can survive being used as a pillow? Can the dog turn around without changing the radio station? Is the back seat still technically available to another human?"),
    p("The dog contributes little to this planning. It climbs in, circles twice and chooses the exact location that invalidates the loading strategy. Humans reorganize around it because that is easier than explaining cargo optimization to a dog whose primary concern is whether the windows will open."),
    list(
      "One dog: somehow the entire back seat.",
      "One overnight bag: relocated to the floor.",
      "One cooler: guarded without authorization.",
      "One human passenger: negotiating knee room.",
      "One dog nose near the air vent: trip officially underway."
    ),

    h("A giant dog makes a small house more interesting"),
    p("Big-dog life is not reserved for ranch houses and acreage, but less space makes every movement more deliberate. The dog learns where it can turn around. Humans learn not to leave fragile objects at tail height. Everybody learns that a hallway can hold either a person or a Great Dane performing a full-body stretch, but not always both."),
    p("The size also changes visual scale. A normal dog bed can look like a bath mat. A large crate can become one of the most significant pieces of furniture in the room. The amount of floor visible after the dog lies down can drop dramatically. None of this is inherently a problem. It is simply architecture with a pulse."),

    h("The tail has its own operating radius"),
    p("A happy large dog does not merely wag. It can clear a low table. This is less a criticism than a household design principle. Cups migrate farther from edges. Delicate decorations rise to higher shelves. People carrying drinks develop situational awareness."),
    p("The dog remains innocent. From its perspective, happiness occurred and several objects made unrelated decisions to fall over."),

    h("Everything takes a little more planning"),
    p("The practical side of a large dog is mostly scale. Travel space matters. Sleeping space matters. Housing and rental rules matter. A person choosing a very large breed has more reason to think ahead about the everyday environment instead of assuming every setup will work the same way it did for a smaller animal."),
    p("That does not make big dogs difficult by definition. It makes them difficult to ignore. Their needs occupy visible space, and the household gets better when humans plan for that space rather than treating it as a surprise every day."),

    h("Texas weather does not care how big the dog is"),
    p("The image of a giant ranch dog stretched on a porch looks right, but size does not turn heat into background scenery. The sensible Texas-dog routine still belongs to the human: pay attention to conditions, make shade and water available, choose appropriate activity and do not let a funny “tough dog” idea overrule common sense."),
    p("The dog may vote to stay outside because a squirrel exists. The human gets the deciding vote."),

    h("The best big-dog humor is logistical, not macho"),
    p("It is easy to make large-dog graphics about strength, intimidation or being tougher than somebody else's dog. That is usually the least interesting material. Big dogs are funnier when the joke is about the absurd domestic reality of living with something so physically substantial."),
    list(
      "Great Dane: Lap Dog, Allegedly.",
      "Doorway Supervisor: position requires standing exactly where everyone needs to walk.",
      "Couch Department: now occupying two-thirds of available seating.",
      "Truck Seat Expansion Program: approved without a vote.",
      "Director of Personal Space: no relevant experience required."
    ),
    p("Those jokes work because they describe scenes. A big dog does not have to look fierce. It only has to attempt to curl into a chair that clearly cannot support the plan."),

    h("Bigger presence, softer center"),
    p("The visual drama of a large dog often makes the ordinary affectionate moments even funnier. A giant head appears under a hand for scratches. An enormous body follows one person from room to room. The dog that can block an entire kitchen entrance becomes deeply concerned when the bathroom door closes."),
    p("That contrast is the heart of the gentle-giant idea in everyday dog culture: physically impossible to overlook, emotionally convinced it should remain very close to the household at all times."),

    h("The Texas-sized résumé"),
    p("A big Texas dog could list qualifications in furniture occupation, doorway management, truck-seat acquisition, accidental table clearing, neighborhood visibility and advanced leaning. It might also include “lap dog” under special skills, despite all available evidence."),
    p("The humans would write the footnote: requires room, planning and a willingness to accept that personal space has become a shared resource."),
    p("That is the real big-dog problem, and also most of the charm. The dog takes up more room than expected, then somehow convinces everybody the house would feel empty without it."),
  ],
};

export const texasDogsEvergreenWave2Articles = [
  smallDogsBigTexasAttitudeArticle,
  bigDogsTexasSizedProblemsArticle,
];
