import type { Article, ArticleBlock } from "../types";

const p = (text: string): ArticleBlock => ({ type: "paragraph", text });
const h = (text: string): ArticleBlock => ({ type: "heading", text });
const list = (...items: string[]): ArticleBlock => ({ type: "list", items });

export const texasPorchDogArticle: Article = {
  id: "evergreen-texas-porch-dog-job-description",
  brandId: "texasdefined",
  slug: "the-unofficial-job-description-of-a-texas-porch-dog",
  title: "The Unofficial Job Description of a Texas Porch Dog",
  dek: "Part security department, part weather station, part neighborhood gossip desk: the Texas porch dog has responsibilities nobody assigned and takes every one of them seriously.",
  category: "guides",
  hero: {
    src: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Family_sitting_on_the_porch_with_their_dog_(13674799923).jpg?width=1600",
    alt: "A family sitting on a front porch with a dog at the edge of the porch",
    width: 4441,
    height: 2855,
    credit: "simpleinsomnia · CC BY 2.0 · Wikimedia Commons",
  },
  authorId: "a-marisol",
  publishedAt: "2026-09-13",
  readingMinutes: 9,
  tags: [
    "Texas dogs",
    "porch dogs",
    "Texas dog life",
    "dog humor",
    "Texas Dogs Defined",
    "dog personalities",
    "Texas lifestyle",
  ],
  featured: false,
  internalLinks: [
    {
      href: "/dogs",
      label: "Texas Dogs Defined",
      description: "Meet the breeds, personalities and Texas dog-life ideas behind the whole Dogs Defined collection.",
    },
    {
      href: "/dogs/labrador-retriever",
      label: "Labrador Retriever Defined",
      description: "For the porch dog who is technically stationed at home but would rather be at the lake.",
    },
    {
      href: "/dogs/german-shepherd",
      label: "German Shepherd Defined",
      description: "Meet the breed most likely to treat the driveway like a staffed security checkpoint.",
    },
    {
      href: "/dogs/dachshund",
      label: "Dachshund Defined",
      description: "Short legs, long body and a remarkably expansive definition of porch-patrol jurisdiction.",
    },
    {
      href: "/dogs/golden-retriever",
      label: "Golden Retriever Defined",
      description: "The porch greeter who assumes every arriving human is here specifically to see the dog.",
    },
  ],
  relatedCollections: [],
  relatedDestinations: [],
  body: [
    p("Nobody officially hires a porch dog. There is no application, no interview and certainly no discussion about benefits. One day a dog discovers the front porch, notices that it provides shade, a good view of the driveway and immediate access to every suspicious delivery truck in the county, and the position is filled."),
    p("In Texas, this can become a serious post. A porch sits on the boundary between home and everything outside it. It is where somebody drinks coffee before the heat arrives, where muddy boots stop before coming inside, where a neighbor hollers instead of ringing the bell and where the dog develops a highly detailed theory about which vehicles belong on the street. The porch dog is therefore not merely resting. The porch dog is operating."),

    h("Official title: Director of Front-Porch Operations"),
    p("The first responsibility is presence. A successful porch dog understands that simply being visible solves many problems. Squirrels think twice. Package carriers understand they have been noticed. Passing dogs receive a clear territorial briefing. Family members returning home can see, before they have even parked, that management remains on duty."),
    p("This is not necessarily about looking intimidating. A Golden Retriever may conduct front-porch operations by wagging so hard its entire back half moves. A Chihuahua may choose a more aggressive communications strategy. A Labrador may abandon the entire post if someone opens a cooler. Different breeds bring different management styles, but the office remains the same."),

    h("Primary duty: know what belongs"),
    p("Porch dogs maintain a mental database that no human remembers creating. They know the sound of the family truck, the neighbor's pickup, the school bus, the garbage truck and the particular delivery van that appears just often enough to remain suspicious. A vehicle can be half a block away and the dog has already classified it as ordinary, interesting or absolutely unacceptable."),
    p("The impressive part is not that dogs notice routines. It is how personally they seem to take deviations from them. The neighbor who walks every evening is fine. The same neighbor walking at ten in the morning may trigger a full internal investigation. A cardboard box left near the gate can remain under observation for twenty minutes. A plastic bag moving in the wind may require immediate escalation."),
    list(
      "Known family vehicle: no action required, though tail wagging is encouraged.",
      "Regular delivery truck: announce loudly, then supervise the package transfer.",
      "Unknown truck slowing near the house: elevate to driveway-surveillance status.",
      "Squirrel on fence: suspend all other operations.",
      "Neighbor carrying barbecue: consider abandoning post for diplomatic outreach."
    ),

    h("Secondary duty: operate the unofficial weather station"),
    p("A Texas porch can cycle through perfect morning air, hard afternoon sun, wind, dust, humidity and a thunderstorm that appears to have been personally offended by the county. The porch dog experiences all of it at ground level and develops strong preferences."),
    p("Every household learns the signs. There is the strategic shift from sunny boards to the strip of concrete beside the house. There is the move beneath the chair when thunder starts. There is the dramatic look through the screen door when summer heat has made outside life an unreasonable proposition. There is also the dog who refuses to acknowledge weather entirely and must be persuaded that a 100-degree afternoon is not an invitation to lie in direct sunlight."),
    p("This is where the romance of the porch dog meets actual Texas dog ownership. Shade, fresh water and sensible limits matter more than the image. A good porch is a hangout, not a place to leave a dog exposed to dangerous heat or weather. The fictional job description is funny because the dog acts indispensable; the human job is making sure the employee has the sense not to work a double shift in August."),

    h("Community relations: greet everybody according to an unexplained policy"),
    p("Porch dogs are often inconsistent public-relations professionals. The person who has visited the house twice a week for six years may still receive an announcement loud enough for three neighboring properties. A stranger, meanwhile, might be greeted like a returning war hero because they happen to smell like another dog."),
    p("The porch also gives dogs a front-row seat to the slow social life of a street. People wave. Kids ride bikes. Someone stops to ask about the truck. A neighbor walks over instead of texting. In a world that moves quickly, a dog stretched beside a porch chair gives the whole scene an older rhythm. That is part of why the image works so well in Texas culture: it feels less like decoration and more like a familiar piece of daily life."),

    h("Security department: mostly observation, occasionally theater"),
    p("Some dogs approach porch security with professional seriousness. German Shepherds can look as if they have reviewed the perimeter map before breakfast. Beagles may investigate by scent. Dachshunds can produce the confidence of a much larger department. Great Danes need only stand up and accidentally block the doorway."),
    p("Then there is the theatrical side. A dog may deliver a tremendous warning bark at a person on the sidewalk, then immediately retreat behind the nearest human when the person turns toward the house. Another may spend ten minutes defending the property from a lawn ornament. The gap between the job the dog believes it has and the job it is actually performing is where most porch-dog humor lives."),

    h("Facilities management: choose the least convenient place to lie down"),
    p("No porch dog job description would be complete without blocking traffic. A porch can offer four hundred square feet of open space and the dog will select the exact threshold every person must cross. This is not laziness. This is facilities management through strategic placement."),
    p("The same principle applies to furniture. The dog bed may remain untouched while the dog occupies the cooler lid, the welcome mat, the only chair in the shade or the freshly swept patch of concrete. If a human moves the dog, the dog will wait patiently and return to the same location as soon as the human's attention shifts."),

    h("Wildlife liaison: complicated"),
    p("Texas gives porch dogs plenty to monitor. Lizards race along brick walls. Geckos appear near lights. Squirrels test fences. Birds land just outside the acceptable perimeter. In more rural settings, the evening shift can include sounds and smells that never show themselves at all."),
    p("The best porch dogs eventually develop categories. Some wildlife is beneath notice. Some deserves a head tilt. Some triggers an immediate sprint into the yard followed by a confused return when the target disappears into a tree. The important point is that the dog considers all of this part of the position."),

    h("Break policy: whenever food appears"),
    p("Texas porch culture often involves food, which creates an unavoidable conflict of interest. A dog cannot objectively serve as Director of Front-Porch Operations while also lobbying for brisket, burger, sausage or whatever somebody just carried outside. Yet most dogs attempt this dual role without shame."),
    p("Their negotiation strategy is usually silence and eye contact. A Lab can hold a stare long enough to make a person question every household rule. A Beagle may conduct scent-based auditing from several feet away. A Corgi can project middle-management disappointment. The dog is not begging, according to the dog. The dog is verifying quality."),

    h("Performance review: impossible to fail"),
    p("By ordinary workplace standards, the porch dog is a disaster. It naps on shift. It yells at customers. It leaves its post without approval. It conducts unauthorized wildlife chases and repeatedly attempts to obtain compensation in cheese."),
    p("By household standards, however, the porch dog may be doing the most important job perfectly. It turns an ordinary slab of concrete or a few wooden boards into a place that feels occupied. It notices who comes home. It gives the morning coffee company. It makes the end of the day feel like somebody was waiting for it."),
    p("That is the real Texas porch-dog job description: watch the road, supervise the yard, misunderstand several harmless noises, move into the shade when somebody finally makes you, and be there when your people pull into the driveway."),
  ],
};

export const dogShirtJokeArticle: Article = {
  id: "evergreen-dog-shirt-joke-personality",
  brandId: "texasdefined",
  slug: "why-the-best-dog-shirt-joke-feels-like-your-dog-and-nobody-elses",
  title: "Why the Best Dog Shirt Joke Feels Like Your Dog and Nobody Else’s",
  dek: "The funniest dog shirt is not the one with the loudest slogan. It is the one that makes a dog owner stop and say: that is exactly what mine would do.",
  category: "guides",
  hero: {
    src: "https://commons.wikimedia.org/wiki/Special:Redirect/file/The_World_Through_My_Glasses.jpg?width=1600",
    alt: "A dog looking toward the camera through a pair of eyeglasses",
    width: 3008,
    height: 2000,
    credit: "Anne Debaisieux · CC BY-SA 4.0 · Wikimedia Commons",
  },
  authorId: "a-marisol",
  publishedAt: "2026-09-13",
  readingMinutes: 10,
  tags: [
    "dog shirts",
    "dog humor",
    "dog gifts",
    "breed humor",
    "Texas Dogs Defined",
    "funny dog shirts",
    "dog personalities",
  ],
  featured: false,
  internalLinks: [
    {
      href: "/dogs",
      label: "Texas Dogs Defined",
      description: "Browse the breed-first dog universe that puts personality before slogans.",
    },
    {
      href: "/dogs/pembroke-welsh-corgi",
      label: "Corgi Defined",
      description: "Why a tiny herding dog naturally lends itself to middle-management jokes.",
    },
    {
      href: "/dogs/beagle",
      label: "Beagle Defined",
      description: "A breed whose imaginary job title practically writes itself: Quality Control.",
    },
    {
      href: "/dogs/french-bulldog",
      label: "French Bulldog Defined",
      description: "Compact size, expressive face and executive-level confidence make the personality the punch line.",
    },
    {
      href: "/article/the-unofficial-job-description-of-a-texas-porch-dog",
      label: "The unofficial job description of a Texas porch dog",
      description: "See how a familiar dog role becomes funny when the joke starts with behavior instead of a generic slogan.",
    },
  ],
  relatedCollections: [],
  relatedDestinations: [],
  body: [
    p("There is a particular kind of dog shirt that works instantly. You see the breed, read four or five words and laugh before you have time to decide whether the joke is clever. The reason is usually not the wording by itself. It is recognition. The shirt has described a dog you know."),
    p("That is the difference between dog merchandise and dog culture. A generic slogan can apply to millions of animals. A good breed joke feels strangely specific. It captures the stare a Corgi gives when nobody followed instructions, the Labrador who treats every body of water as an emergency invitation, the Beagle who turns a five-minute walk into a forensic investigation, or the German Shepherd who believes a UPS truck requires a formal security response."),
    p("The best dog shirt joke therefore does not begin with a blank T-shirt. It begins with the dog."),

    h("Breed name is not personality"),
    p("Putting a breed name above a paw print identifies an audience, but it does not say anything interesting about that audience. Dog owners already know what breed they have. They do not need a shirt to provide identification. What they respond to is the feeling that somebody understands the tiny household rituals that came with that dog."),
    p("Consider the difference between “Corgi Mom” and “Corgi Middle Management.” The first phrase labels the human. The second invents a role for the dog. It works because the dog's short stature and oversized confidence create the joke together. The wearer does not merely own a Corgi; the wearer apparently reports to one."),
    p("The same idea works across breeds. “Beagle Quality Control” suggests a dog inspecting every grocery bag and following every scent. “German Shepherd Security Department” turns watchfulness into an office title. “Lab Lifeguard” connects a water-loving reputation with a job that the dog would almost certainly perform without certification."),

    h("The joke should survive without the breed name"),
    p("A useful creative test is to remove the breed name and ask whether the idea still contains a recognizable behavior. “Professional Side-Eye” works because the expression is the product. “Senior Treat Analyst” works because every dog owner understands the seriousness of snack evaluation. “Director of Human Resources” is funny when the dog in the illustration appears to be judging the humans."),
    p("Then the breed adds a second layer. Put “Professional Side-Eye” under a French Bulldog with a flat, unimpressed expression and the concept becomes more specific. Put “Director of Neighborhood Intelligence” under a German Shepherd watching a fence line and the title feels earned. Put “Quality Control” under a Beagle with its nose in a grocery bag and the entire joke becomes a scene."),

    h("Specific beats loud"),
    p("Many novelty shirts try to compensate for a weak idea with more words, bigger letters and extra decoration. Dog humor usually gets better in the opposite direction. The more recognizable the behavior, the less explanation it needs."),
    list(
      "Weak: a long paragraph about how much somebody loves dogs.",
      "Better: “Treat Inspector.”",
      "Weak: a generic Texas flag behind any random breed.",
      "Better: “Dock Supervisor” on a wet Labrador beside a lake ladder.",
      "Weak: the same office joke pasted onto twenty breeds.",
      "Better: a job title that matches what that breed's owners already joke about at home."
    ),
    p("This does not mean every dog of a breed behaves the same way. Obviously they do not. Breed humor works more like a shared shorthand: a familiar reputation, silhouette or habit gives the audience a common starting point, and the specific dog in somebody's house supplies the rest."),

    h("The owner should feel seen, not marketed to"),
    p("The emotional mechanism behind a good dog joke is surprisingly close to the mechanism behind a good gift. The receiver thinks, “You remembered this thing about me.” A strong dog design can create the same response at retail scale because it remembers something about life with the animal."),
    p("That is why “dog lover” is often too broad to be useful creatively. Dog people are not one audience. The person whose Labrador spends every weekend in a truck headed toward the lake is buying a different piece of identity than the person whose Yorkie occupies the best chair in the house and expects salon-level service. Both love dogs. That fact alone is not the interesting part."),
    p("A design gets stronger as it moves from category to recognition: dog → breed → behavior → scene → line. The line is almost the last decision, not the first."),

    h("Texas should be a setting, not a sticker"),
    p("Texas creates another temptation: put a Lone Star, state outline or cowboy hat on everything and call the design regional. Sometimes that works. Most of the time it says less than a real Texas scene would."),
    p("A Texas Lab can be standing on a dock while somebody shakes water off a towel. A Hill Country Hound can ride in the back of an old pickup on a ranch road. A Gulf Coast Golden can be sandy, happy and clearly responsible for ruining the clean interior of the vehicle. A porch dog can be stationed beside a screen door watching the street like the shift never ends."),
    p("Those ideas feel Texan because the dog is doing something in a Texas context. The state is part of the story rather than a graphic pasted behind it. That gives the design a longer life, because the owner can recognize both the place and the behavior."),

    h("Jobs are funny because dogs appoint themselves"),
    p("The Dogs With Jobs idea works especially well because dogs already behave as if the household has assigned them departments. Nobody told the German Shepherd to monitor the driveway. Nobody asked the Beagle to inspect the groceries. Nobody appointed the Corgi to middle management. The dog simply assumed the role."),
    p("A job-title shirt takes an ordinary behavior and gives it unnecessary bureaucracy. That is the joke. “Chief Barketing Officer” is not funny because corporate titles are inherently hilarious. It is funny because a dog can look completely convinced that it holds the position."),
    p("The title also creates visual direction. Distinguished Dogs can wear glasses or ties. Dogs With Jobs can carry props that make sense for the role. A Lab Lifeguard can have a whistle and a dock. A Beagle Quality Control inspector can have a clipboard near a bag of treats. The copy and illustration reinforce each other instead of competing for attention."),

    h("Attitude works when the face does the heavy lifting"),
    p("Some breeds do not need a complicated scene. An expressive face can carry almost everything. French Bulldogs, Boxers, Chihuahuas and Yorkies can support designs where the humor is essentially an opinion made visible."),
    p("That is where lines like “I Heard You. I Don't Care.” or “Professional Side-Eye” become useful. The art should not shout harder than the dog. A clean portrait, strong expression and short line can be more memorable than a design packed with bones, paw prints, flags and seven different fonts."),

    h("A good shirt can be funny before it is for sale"),
    p("This is an important standard for Texas Dogs Defined. The idea should be worth talking about even if there is no product button underneath it. A Corgi Middle Management concept is a character idea. A Texas Porch Dog is a little cultural story. A Lake Dog collection describes a kind of weekend. The eventual shirt is one way to carry the idea, not the reason the idea exists."),
    p("That distinction keeps the dog vertical from turning into hundreds of thin pages built around search phrases and products. Breed pages can hold personality, Texas context, stories and design directions. Editorial stories can explore why those jokes work. Products can appear when there is something genuinely good to sell."),

    h("The five-second test"),
    p("Before a dog joke becomes a design, it should pass a simple test: can a real owner picture their own dog doing it within five seconds? If the answer is yes, the concept has a chance. If the owner has to read a paragraph to understand the premise, it probably belongs somewhere other than a T-shirt."),
    list(
      "Can you picture the dog doing the job?",
      "Does the breed add something to the joke rather than merely labeling it?",
      "Would an owner repeat the line to somebody who knows their dog?",
      "Does the Texas version use a real setting or behavior instead of decoration alone?",
      "Would the concept still be amusing if there were nothing to buy?"
    ),
    p("When all five answers are yes, the design stops feeling like merchandise aimed at dog owners and starts feeling like an inside joke among them. That is the target. The funniest dog shirt in the room should make one person laugh a little harder than everybody else because, somehow, it has been describing their dog all along."),
  ],
};

export const texasDogsEvergreenArticles: Article[] = [
  texasPorchDogArticle,
  dogShirtJokeArticle,
];
