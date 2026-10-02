import { canonicalEntityPath, type RankedRelatedEntity } from '@/data/knowledge-graph/relationships';
import type { TexasEntityRecord } from '@/data/knowledge-graph/types';

type Section = { heading: string; body: string[] };
type Answer = { question: string; answer: string };
type WildlifeProfile = {
  intro: string[];
  sections: Section[];
  answers: Answer[];
};

const TARGETED_PROFILES: Record<string, WildlifeProfile> = {
  bobcat: {
    intro: [
      'Bobcats are native wild cats found across Texas, from brush country and ranchland to wooded creek corridors, rocky canyons and the edges of growing communities. Their statewide range does not mean they are easy to see: bobcats are secretive, usually avoid people and can live surprisingly close to developed areas without being noticed.',
      'A useful Texas bobcat guide needs to do more than say the species occurs statewide. Habitat, prey, cover and human development all influence where bobcats spend time, and a sighting is better interpreted by looking at body shape, tail length, markings and behavior rather than relying on size alone.',
    ],
    sections: [
      {
        heading: 'Where bobcats live in Texas',
        body: [
          'Texas Parks and Wildlife Department describes bobcats as broadly distributed in the state. They use many kinds of cover, including brush, wooded drainage corridors, rocky terrain, thickets and mixed ranch or agricultural landscapes. In suburban areas, greenbelts, undeveloped tracts and creek systems can provide travel cover between feeding and resting areas.',
          'Because bobcats are adaptable, the absence of daytime sightings does not mean they are absent. Tracks, trail-camera images and brief dawn or dusk sightings are often more realistic evidence than repeated direct observation.',
        ],
      },
      {
        heading: 'How to identify a bobcat',
        body: [
          'The short tail is the most useful field mark. A bobcat has a compact, muscular build, pointed ears that may show small tufts, mottled or spotted fur and a tail that looks distinctly abbreviated compared with a mountain lion or domestic cat. Color varies from grayish to tawny or reddish-brown, so coat color by itself is not a reliable identification feature.',
          'Perspective can make wildlife look much larger in a photograph than it was in the field. For a Texas wild-cat sighting, compare the tail, leg length, body proportions and surrounding objects before deciding whether the animal was a bobcat or mountain lion.',
        ],
      },
      {
        heading: 'What bobcats eat and how they hunt',
        body: [
          'Bobcats are opportunistic predators. Small mammals and birds make up much of their diet, but available prey changes with region and season. They usually hunt alone, using cover and short bursts of speed rather than long chases across open ground.',
          'That feeding strategy helps explain why brush edges, rocky cover, riparian corridors and other places that concentrate prey can be important even when the surrounding landscape is relatively open.',
        ],
      },
      {
        heading: 'Bobcats near homes, pets and livestock',
        body: [
          'A bobcat passing through a neighborhood is not the same as an animal becoming dependent on people. Residents can reduce attractants by securing pet food, keeping poultry protected, limiting access to unsecured feed and supervising small pets, especially around dawn, dusk and overnight hours.',
          'If a bobcat repeatedly approaches people, appears sick or injured, or creates an immediate conflict, use current Texas Parks and Wildlife Department guidance and local animal-control resources rather than attempting to handle or corner the animal.',
        ],
      },
      {
        heading: 'Bobcat versus mountain lion',
        body: [
          'The tail is the quickest separator. Bobcats have a short tail; mountain lions have a long, heavy tail that can approach the length of the body. Mountain lions are also much larger, longer-legged and more uniformly colored. Bobcats commonly show more obvious spotting or mottling, especially on the legs and underside.',
          'Texas mountain-lion reports draw attention because the species is uncommon and secretive. A clear photograph showing the whole animal, especially the tail, is far more useful for identification than a size estimate made during a brief encounter.',
        ],
      },
      {
        heading: 'Viewing and current Texas rules',
        body: [
          'For wildlife viewing, distance is the goal. Do not feed a bobcat or move closer for a photograph. Give the animal an escape route, bring pets inside if needed and let it continue on its way.',
          'Wildlife regulations can change, and rules may differ by activity and location. TexasDefined therefore does not hardcode hunting, trapping or possession rules into this evergreen profile; use the linked TPWD source and the current Outdoor Annual when a legal question matters.',
        ],
      },
    ],
    answers: [
      { question: 'Are bobcats found throughout Texas?', answer: 'Yes. TPWD describes bobcats as broadly distributed across Texas, although the habitats they use and the chance of seeing one vary by region.' },
      { question: 'Are bobcats dangerous to people?', answer: 'Bobcats normally avoid people. Give any wild bobcat space, never feed it, and use TPWD or local animal-control guidance if an animal repeatedly approaches people or behaves abnormally.' },
      { question: 'How can I tell a bobcat from a mountain lion?', answer: 'Start with the tail. A bobcat has a short tail, while a mountain lion has a long, heavy tail. Body size and coat pattern can help, but perspective often makes size estimates unreliable.' },
      { question: 'What should I do if I see a bobcat near my house?', answer: 'Keep your distance, bring small pets inside if practical, remove food attractants and allow the animal a clear route away. Repeated conflict or abnormal behavior should be handled with current TPWD or local guidance.' },
    ],
  },
  'mule-deer': {
    intro: [
      'Mule deer are one of the defining big-game animals of western and northwestern Texas. Their strongest Texas associations are with the Trans-Pecos and portions of the Panhandle and Rolling Plains, where open country, desert mountains, breaks, grasslands and shrublands create a very different deer landscape from much of whitetail-dominated Central and East Texas.',
      'The practical question is not simply whether mule deer occur in Texas, but where their range overlaps with white-tailed deer, how to identify them correctly and how drought, forage, water and habitat conditions shape local populations.',
    ],
    sections: [
      {
        heading: 'Where mule deer live in Texas',
        body: [
          'Texas mule deer are most closely associated with the Trans-Pecos and the Panhandle region, with populations also extending into portions of the Rolling Plains. They favor relatively open landscapes where shrubs, forbs, grasses and broken terrain provide both food and escape cover.',
          'Distribution is not uniform within those regions. Elevation, rainfall, drought, land use, brush structure and available forage all influence where deer concentrate from one property or season to another.',
        ],
      },
      {
        heading: 'Mule deer versus white-tailed deer',
        body: [
          'Large ears are the feature that gives mule deer their common name, but the tail pattern is often the cleaner identification clue. Mule deer typically show a mostly white tail with a dark tip, while white-tailed deer raise a broad white flag when alarmed. Mule deer also tend to have a more gray-brown appearance and a different gait in open country.',
          'Adult male antlers can help as well: mule deer antlers characteristically fork, with tines branching from branches rather than rising primarily from a single main beam. Antler shape varies, so use several field marks together.',
        ],
      },
      {
        heading: 'Habitat, food and seasonal movement',
        body: [
          'Mule deer feed on a changing mix of browse, forbs and other vegetation. In arid West Texas, the quality and timing of rainfall can strongly affect the plants available to deer and the condition animals carry into breeding and winter periods.',
          'Movement patterns differ by landscape. Some deer make regular seasonal shifts between feeding, bedding and breeding areas, while fences, roads, water distribution and large habitat changes can alter those movements. Property-level observations should not be generalized to the entire region.',
        ],
      },
      {
        heading: 'Why drought matters so much in West Texas',
        body: [
          'Drought affects more than surface water. It changes the quantity and quality of forage, fawn-rearing conditions and the nutritional resources available for antler growth and body condition. A dry year can therefore change what hunters and wildlife watchers see even where the long-term range has not changed.',
          'For that reason, annual population and harvest information is more useful when read alongside current habitat conditions rather than treated as a fixed description of what every ranch or county will hold.',
        ],
      },
      {
        heading: 'Watching mule deer responsibly',
        body: [
          'Open country can tempt viewers to approach too closely because the animal remains visible for a long time. Use binoculars or a telephoto lens, avoid blocking travel routes and give does with fawns extra space. Roadside viewing should never create a traffic hazard or involve entering private land without permission.',
          'Most Texas mule deer habitat is not public wildlife-viewing land. Confirm land status, road access and any site-specific rules before planning a trip around a sighting location.',
        ],
      },
      {
        heading: 'Hunting and management information',
        body: [
          'Mule deer are a managed game species in Texas. Seasons, county rules, bag limits, antler restrictions and other requirements are time-sensitive, so TexasDefined intentionally points readers to current TPWD regulations instead of freezing those details into an evergreen article.',
          'Landowners and managers also use habitat work, harvest data and population observations to manage deer at the property scale. TPWD is the authoritative starting point for current management guidance and regulations.',
        ],
      },
    ],
    answers: [
      { question: 'Where are mule deer found in Texas?', answer: 'Their core Texas range is in the Trans-Pecos and Panhandle, with populations also occurring in parts of the Rolling Plains. Local abundance varies substantially with habitat and conditions.' },
      { question: 'How do I tell a mule deer from a white-tailed deer?', answer: 'Look at several traits together: mule deer have very large ears, a mostly white tail with a dark tip, and bucks usually grow forked antlers. Whitetails show the familiar broad white flag when they raise their tail.' },
      { question: 'Does drought affect Texas mule deer?', answer: 'Yes. Drought changes forage quality and availability and can influence body condition, reproduction and what people observe locally.' },
      { question: 'Where do I check current mule-deer hunting rules?', answer: 'Use the current Texas Parks and Wildlife Department Outdoor Annual and the official mule-deer regulation page linked from this guide. County and season-specific rules can change.' },
    ],
  },
  'nine-banded-armadillo': {
    intro: [
      'The nine-banded armadillo is one of the most recognizable mammals in Texas and is designated the state small mammal. Its armor, digging behavior and habit of appearing in yards, roadsides and brushy country make it familiar even to people who rarely see other native mammals up close.',
      'TexasDefined treats the armadillo as more than a state-symbol fact. Understanding where it lives, what it eats, why it digs and why it is so often seen along roads gives a much better picture of the species and of the habitats it uses across Texas.',
    ],
    sections: [
      {
        heading: 'Where armadillos live in Texas',
        body: [
          'TPWD describes nine-banded armadillos across most of Texas, with the far western Trans-Pecos less suitable in many places. Diggable soil and access to invertebrate prey matter, so local abundance can change with soil type, moisture and habitat even inside the broader range.',
          'They use woodland edges, brush, pasture, riparian areas and developed landscapes where cover and suitable soil occur. A burrow or repeated digging in a yard usually says more about food and soil conditions than about a permanent concentration of animals.',
        ],
      },
      {
        heading: 'What armadillos eat',
        body: [
          'Nine-banded armadillos feed heavily on insects and other invertebrates that they uncover by rooting and digging. Their strong claws and sensitive snout are well suited to searching through loose soil, leaf litter and decaying material.',
          'That diet explains the shallow cone-shaped holes people sometimes find in lawns and beds. The animal is usually searching for prey rather than deliberately damaging plants, although the digging can still be frustrating for homeowners.',
        ],
      },
      {
        heading: 'Burrows and daily behavior',
        body: [
          'Armadillos use burrows as shelter and may maintain more than one refuge within a home range. Activity shifts with weather: in hot periods they are often most active from dusk through the night, while cooler conditions can change when they emerge.',
          'They do not rely on heavy insulating fur, so temperature matters more to armadillos than their armored appearance might suggest. Seasonal and daily movement patterns reflect the need to balance feeding with heat and cold exposure.',
        ],
      },
      {
        heading: 'Why armadillos are common road casualties',
        body: [
          'Armadillos forage close to the ground and often travel at night, putting them in conflict with vehicles. Their tendency to jump upward when startled can make a road encounter even worse because it can place the animal higher into the path of a vehicle.',
          'For drivers, the safest response is the same as with other wildlife: slow when conditions allow, stay in your lane and avoid an abrupt maneuver that creates a greater crash risk.',
        ],
      },
      {
        heading: 'Armadillos in yards and gardens',
        body: [
          'The most visible conflict is digging. Remove accessible food sources, close off inappropriate shelter spaces only after confirming no animal is trapped inside, and use wildlife-exclusion methods that do not require handling the armadillo. Persistent problems are better addressed with current TPWD or local wildlife guidance than with improvised capture.',
          'Because armadillos are wild animals, do not pick one up or allow pets to corner it. Distance also avoids unnecessary exposure to bites, scratches, parasites or other wildlife-health concerns.',
        ],
      },
      {
        heading: 'A Texas symbol with an unusual life history',
        body: [
          'Nine-banded armadillos are famous for regularly producing genetically identical quadruplets from a single fertilized egg. That unusual reproductive pattern is one of the species traits that makes the animal biologically distinctive beyond its armored shell.',
          'Texas chose the nine-banded armadillo as the state small mammal in 1995. The designation reflects how closely the animal had become associated with Texas popular culture, roadsides and everyday wildlife encounters.',
        ],
      },
    ],
    answers: [
      { question: 'Are armadillos native to Texas?', answer: 'The nine-banded armadillo is a native mammal of the Americas whose range expanded into Texas and the southern United States over time. It is now widespread across most of Texas and is the official state small mammal.' },
      { question: 'Why do armadillos dig holes in lawns?', answer: 'They are usually searching for insects and other invertebrates in the soil. Their claws and snout are specialized for rooting and digging.' },
      { question: 'When are armadillos most active?', answer: 'Activity changes with temperature and season. During hot weather they are commonly active from dusk through nighttime, avoiding the hottest part of the day.' },
      { question: 'Should I handle an armadillo I find in my yard?', answer: 'No. Give it space and avoid direct handling. For repeated property conflicts, use current TPWD or local wildlife guidance for exclusion and control options.' },
    ],
  },
};

export function WildlifeDepthSections({ entity, related }: { entity: TexasEntityRecord; related: RankedRelatedEntity[] }) {
  const profile = TARGETED_PROFILES[entity.slug] ?? fallbackProfile(entity);
  const relatedItems = related.filter(({ entity: candidate }) => candidate.kind === 'wildlife-species' || candidate.kind === 'state-park' || candidate.kind === 'national-park' || candidate.kind === 'natural-area' || candidate.kind === 'wildlife-management-area').slice(0, 6);

  return <>
    <section className="border-b border-border py-12" aria-labelledby="wildlife-overview-heading">
      <div className="grid gap-8 lg:grid-cols-[14rem_1fr]">
        <div>
          <p className="eyebrow text-primary">Texas wildlife</p>
          <h2 id="wildlife-overview-heading" className="mt-2 font-display text-4xl">Understanding {entity.name}</h2>
        </div>
        <div className="max-w-3xl space-y-4 text-base leading-7 text-muted-foreground">
          {profile.intro.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          {entity.officialUrl ? <p><a className="font-semibold text-primary underline underline-offset-4" href={entity.officialUrl} target="_blank" rel="noreferrer noopener">Check the Texas Parks and Wildlife Department species source ↗</a></p> : null}
        </div>
      </div>
    </section>

    {profile.sections.map((section, index) => <section key={section.heading} className="border-b border-border py-12" aria-labelledby={`wildlife-section-${index}`}>
      <div className="grid gap-8 lg:grid-cols-[14rem_1fr]">
        <div>
          <p className="eyebrow text-primary">Field guide</p>
          <h2 id={`wildlife-section-${index}`} className="mt-2 font-display text-4xl">{section.heading}</h2>
        </div>
        <div className="max-w-3xl space-y-4 text-base leading-7 text-muted-foreground">
          {section.body.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
        </div>
      </div>
    </section>)}

    <section className="border-b border-border py-12" aria-labelledby="wildlife-observation-heading">
      <div className="grid gap-8 lg:grid-cols-[14rem_1fr]">
        <div>
          <p className="eyebrow text-primary">Observe responsibly</p>
          <h2 id="wildlife-observation-heading" className="mt-2 font-display text-4xl">What to do around Texas wildlife</h2>
        </div>
        <div>
          <p className="max-w-3xl text-base leading-7 text-muted-foreground">Wildlife viewing is safest and most useful when the animal can behave normally. These principles apply whether the sighting is on a ranch road, trail, greenbelt or in a neighborhood.</p>
          <ul className="mt-6 grid gap-4 sm:grid-cols-2">
            <li className="border border-border p-5"><strong className="font-display text-xl">Keep your distance</strong><p className="mt-2 text-sm leading-6 text-muted-foreground">Use binoculars or a long lens instead of approaching, feeding, touching or blocking an animal's path.</p></li>
            <li className="border border-border p-5"><strong className="font-display text-xl">Protect pets and food</strong><p className="mt-2 text-sm leading-6 text-muted-foreground">Supervise pets where wildlife is active and remove unsecured feed, trash or other attractants that can create repeat encounters.</p></li>
            <li className="border border-border p-5"><strong className="font-display text-xl">Respect land access</strong><p className="mt-2 text-sm leading-6 text-muted-foreground">A wildlife sighting does not create public access. Stay on legal roads, trails and public areas unless you have landowner permission.</p></li>
            <li className="border border-border p-5"><strong className="font-display text-xl">Check current TPWD guidance</strong><p className="mt-2 text-sm leading-6 text-muted-foreground">Regulations, management advice and conflict guidance can change. Use TPWD for the current rule or response when the answer affects safety or legality.</p></li>
          </ul>
        </div>
      </div>
    </section>

    <section className="border-b border-border py-12" aria-labelledby="wildlife-answers-heading">
      <div className="grid gap-8 lg:grid-cols-[14rem_1fr]">
        <div>
          <p className="eyebrow text-primary">Quick answers</p>
          <h2 id="wildlife-answers-heading" className="mt-2 font-display text-4xl">Common questions about {entity.name}</h2>
        </div>
        <div className="max-w-3xl divide-y divide-border border-y border-border">
          {profile.answers.map(({ question, answer }) => <div key={question} className="py-6"><h3 className="font-display text-2xl">{question}</h3><p className="mt-3 text-base leading-7 text-muted-foreground">{answer}</p></div>)}
        </div>
      </div>
    </section>

    {relatedItems.length ? <section className="border-b border-border py-12" aria-labelledby="wildlife-related-heading">
      <div className="grid gap-8 lg:grid-cols-[14rem_1fr]">
        <div>
          <p className="eyebrow text-primary">Keep exploring</p>
          <h2 id="wildlife-related-heading" className="mt-2 font-display text-4xl">Related Texas wildlife and places</h2>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {relatedItems.map(({ entity: candidate }) => <a key={candidate.id} href={canonicalEntityPath(candidate)} className="border border-border p-5 hover:border-primary/60"><span className="eyebrow text-primary">{title(candidate.kind)}</span><strong className="mt-2 block font-display text-xl leading-tight">{candidate.name}</strong><span className="mt-2 block text-sm leading-6 text-muted-foreground">Open the related guide →</span></a>)}
        </div>
      </div>
    </section> : null}
  </>;
}

function fallbackProfile(entity: TexasEntityRecord): WildlifeProfile {
  const region = entity.region ? title(entity.region) : 'Texas';
  return {
    intro: [
      entity.description ?? `${entity.name} is part of the TexasDefined wildlife reference collection.`,
      `This profile focuses on the animal's Texas range, habitat, identification, observation and current management context rather than treating ${entity.name} as a generic encyclopedia entry.`,
    ],
    sections: [
      { heading: `Range and habitat in ${region}`, body: [`Use the verified Texas range information above as a starting point, then remember that wildlife distribution is rarely uniform inside a region. Habitat, water, food, weather and land use all affect where an animal is actually encountered.`, `TexasDefined keeps time-sensitive population and regulation claims tied to current official sources instead of turning an old observation into a permanent statewide rule.`] },
      { heading: 'Identification in the field', body: [`Identify wildlife with several traits together: body proportions, markings, movement, habitat and behavior. A single blurry photograph or size estimate can be misleading, especially when there is no familiar object for scale.`, `When identification matters, compare your observation with current TPWD species material and avoid handling or closely approaching the animal for a better look.`] },
      { heading: 'Living with and watching wildlife', body: [`Keep wild animals wild by maintaining distance and avoiding feeding. Secure food attractants, supervise pets where appropriate and give animals a clear escape route during close encounters.`, `For an injured animal, repeated conflict or a legal question, use the official TPWD source or local wildlife authorities rather than relying on a static web article.`] },
    ],
    answers: [
      { question: `Where does ${entity.name} occur in Texas?`, answer: entity.region ? `This TexasDefined record associates the species with ${region}. Use the TPWD source linked on the page for the most current distribution information.` : 'Use the TPWD source linked on this page for current Texas distribution information.' },
      { question: `How should I observe ${entity.name}?`, answer: 'Keep a respectful distance, do not feed or handle the animal, and use binoculars or a long lens when you want a closer look.' },
      { question: `Where should I verify current Texas information?`, answer: 'Use the Texas Parks and Wildlife Department source linked on this page for current management guidance, regulations and species information.' },
    ],
  };
}

function title(value: string) {
  return value.replaceAll('-', ' ').replace(/\b\w/g, (character) => character.toUpperCase());
}
