import { getRouteApi, Link } from "@tanstack/react-router";
import { Container } from "@/components/layout/Container";
import texasDogsIllustration from "@/assets/navigation-texas-dogs.svg?no-inline";
import type { DogBreedSummary, DogDesignCollection } from "@/data/texas-dogs";

const routeApi = getRouteApi("/dogs/{-$breed}");
const description = "Practical Texas dog life starts with safety and access: plan heat-aware walks, state-park trips, Gulf Coast outings, adoption and responsible breed choices. Breed humor and creative ideas are a separate, optional part of the magazine.";
const dogDeskStories = [
  {
    slug: "texas-dog-heat-safety",
    eyebrow: "Heat safety",
    title: "Texas Dog Heat Safety: Walks, Trails and Park Days Without the Guesswork",
    dek: "A practical Texas plan for hot pavement, trail water, shade, timing and knowing when the dog should stay home.",
  },
  {
    slug: "taking-your-dog-to-texas-state-parks",
    eyebrow: "State parks",
    title: "Taking Your Dog to a Texas State Park: The Rules and the Better Plan",
    dek: "The statewide pet rules are only the starting point. Build the day around leash rules, water, trail conditions and park-specific restrictions.",
  },
  {
    slug: "best-dog-friendly-texas-trip-ideas",
    eyebrow: "Dog-friendly trips",
    title: "20 Dog-Friendly Texas Trip Ideas Where the Dog Can Actually Be Part of the Weekend",
    dek: "Trip ideas built around outdoor time, realistic pet access, frequent breaks and weather-aware planning instead of a pet-friendly hotel filter alone.",
  },
  {
    slug: "taking-your-dog-to-the-texas-coast",
    eyebrow: "Texas coast",
    title: "Taking Your Dog to the Texas Coast: Beach Rules, Heat, Water and Wildlife",
    dek: "Check the exact beach rule, water quality, heat, wildlife and sand-driving setup before the paws hit the Gulf Coast.",
  },
  {
    slug: "texas-dog-friendly-patios-law",
    eyebrow: "Patio rules",
    title: "Texas Dog-Friendly Patios: What State Law Allows",
    dek: "Texas law lets restaurants choose to allow pet dogs in qualifying outdoor dining areas. It does not make every patio dog-friendly.",
  },
  {
    slug: "texas-dog-lake-river-safety",
    eyebrow: "Lakes & rivers",
    title: "Texas Dogs at Lakes and Rivers: Water, Currents, Algae and the Better Day Plan",
    dek: "Separate pet access from swimming access, then check currents, algae, heat and the exact shoreline before the dog enters the water.",
  },
  {
    slug: "hiking-texas-trails-with-your-dog",
    eyebrow: "Hiking",
    title: "Hiking Texas Trails With Your Dog: Heat, Water, Leashes and Trail Restrictions",
    dek: "Texas trail rules can change by park and by route. Verify dog access, closures, water and heat before choosing the trail.",
  },
  {
    slug: "camping-in-texas-with-your-dog",
    eyebrow: "Camping",
    title: "Camping in Texas With Your Dog: Campsites, Park Rules, Heat and Wildlife",
    dek: "Build the entire campsite day around the dog: leash rules, no-unattended-pet policy, shade, water, wildlife and pet-restricted facilities.",
  },
  {
    slug: "adopting-a-dog-in-texas",
    eyebrow: "Adoption",
    title: "Adopting a Dog in Texas: Shelters, Questions, Rabies Records and a Better Match",
    dek: "Find local shelters, compare the dog's needs with your household and leave with the records and first-week plan that make the match work.",
  },
  {
    slug: "small-dogs-big-texas-attitude",
    eyebrow: "Small dogs",
    title: "Small Dogs, Big Texas Attitude",
    dek: "The smallest dog in the room is often the one acting like it owns the deed, the porch and several neighboring properties.",
  },
  {
    slug: "big-dogs-texas-sized-problems",
    eyebrow: "Big dogs",
    title: "Big Dogs, Texas-Sized Problems",
    dek: "Couch space, truck space, doorway traffic and the mystery of why a giant dog still thinks it is lap-sized.",
  },
  {
    slug: "the-unofficial-job-description-of-a-texas-porch-dog",
    eyebrow: "Texas dog life",
    title: "The Unofficial Job Description of a Texas Porch Dog",
    dek: "Part security department, part weather station, part neighborhood gossip desk: the porch dog has responsibilities nobody assigned.",
  },
  {
    slug: "why-the-best-dog-shirt-joke-feels-like-your-dog-and-nobody-elses",
    eyebrow: "Breed humor",
    title: "Why the Best Dog Shirt Joke Feels Like Your Dog and Nobody Else’s",
    dek: "The strongest dog joke is not the loudest one. It is the one that makes an owner say: that is exactly what mine would do.",
  },
] as const;

export default function DogsHubPage() {
  const { breeds, collections } = routeApi.useLoaderData() as { breeds: DogBreedSummary[]; collections: DogDesignCollection[] };
  return <>
    <section className="border-b border-border bg-surface/40">
      <Container className="py-14 sm:py-20">
        <nav aria-label="Breadcrumb" className="text-xs uppercase tracking-[0.14em] text-muted-foreground">
          <Link to="/" className="hover:text-foreground">Front page</Link><span aria-hidden="true" className="mx-2">/</span>
          <Link to="/texas-living" className="hover:text-foreground">Texas Life</Link><span aria-hidden="true" className="mx-2">/</span>
          <span aria-current="page" className="text-foreground">Dogs</span>
        </nav>
        <p className="eyebrow mt-10 text-primary">Texas Dogs Defined</p>
        <h1 className="mt-4 max-w-5xl font-display text-5xl leading-[0.96] sm:text-7xl">Texas dog life: parks, heat, travel and breeds</h1>
        <p className="mt-7 max-w-3xl text-lg leading-8 text-muted-foreground sm:text-xl">{description}</p>
        <p className="mt-5 max-w-3xl font-display text-2xl leading-8">Better Texas days for dogs and their people.</p>
        <figure className="mt-9 max-w-4xl"><img src={texasDogsIllustration} alt="Editorial illustration of a small long-haired Chihuahua against a warm Texas-evening background" width={1200} height={800} loading="lazy" decoding="async" className="h-auto w-full object-cover" /><figcaption className="mt-2 text-xs leading-6 text-muted-foreground">Texas Dogs Defined editorial illustration—not a photograph of a dog-friendly park or a representation of current outdoor conditions.</figcaption></figure>
      </Container>
    </section>

    <section className="border-b border-border bg-background"><Container className="py-10 sm:py-14"><h2 className="font-display text-3xl">Plan a safe Texas dog outing in four checks</h2><ol className="mt-6 grid gap-5 md:grid-cols-2" style={{ listStyleType: "decimal", listStylePosition: "inside" }}><li className="border-t border-border pt-4"><strong>Heat and pavement.</strong><p className="mt-2 text-sm leading-7 text-muted-foreground">Move walks earlier or later, test pavement, carry water and choose a shorter outing or indoor option when conditions are unsafe.</p></li><li className="border-t border-border pt-4"><strong>Actual pet access.</strong><p className="mt-2 text-sm leading-7 text-muted-foreground">Check the specific park, trail, beach or campground; a destination called dog-friendly may still restrict swimming, buildings or particular trails.</p></li><li className="border-t border-border pt-4"><strong>Wildlife and water.</strong><p className="mt-2 text-sm leading-7 text-muted-foreground">Check algae alerts, current, wildlife, leash requirements and whether drinking water is available before visiting a lake or coast.</p></li><li className="border-t border-border pt-4"><strong>Backup plan.</strong><p className="mt-2 text-sm leading-7 text-muted-foreground">Know where to cool down, keep a leash and waste bags handy, and plan veterinary help for emergencies instead of leaving pets in vehicles.</p></li></ol><p className="mt-6 text-sm leading-7 text-muted-foreground">Our guides distinguish official statewide rules from local restrictions. Use the source links within each article before travel; these editorial checklists are not individualized veterinary advice.</p></Container></section>
    <section className="border-b border-border bg-background" aria-labelledby="dog-source-decisions">
      <Container className="py-12 sm:py-16">
        <p className="eyebrow text-primary">The rule changes with the destination</p>
        <h2 id="dog-source-decisions" className="mt-3 font-display text-4xl">Pick the outing before you pack for the dog</h2>
        <p className="mt-4 max-w-4xl text-sm leading-7 text-muted-foreground">A dog-friendly listing does not establish where a dog may walk, swim or stay overnight. These are different permission questions, and statewide guidance is only a starting point. Use the linked public-agency rules before departure, then check the individual destination for current closures and restrictions.</p>
        <div className="mt-7 overflow-x-auto border border-border"><table className="w-full min-w-[42rem] text-left text-sm"><caption className="sr-only">Source-backed Texas dog outing decision comparison</caption><thead className="bg-surface"><tr><th scope="col" className="p-4">Trip</th><th scope="col" className="p-4">What can go wrong</th><th scope="col" className="p-4">Check before leaving</th></tr></thead><tbody className="divide-y divide-border">
          <tr><th scope="row" className="p-4">Ordinary Texas state-park walk</th><td className="p-4">TPWD requires a leash no longer than six feet, prohibits unattended pets and excludes pets from buildings and designated swimming areas.</td><td className="p-4"><a href="https://tpwd.texas.gov/state-parks/park-information/frequently-asked-questions/" target="_blank" rel="noopener noreferrer" className="text-primary underline">TPWD statewide pet rules ↗</a>, then the park's own alerts and trail rules.</td></tr>
          <tr><th scope="row" className="p-4">Big Bend Ranch State Park trail</th><td className="p-4">The park has additional trail-specific dog limits; permission to visit a campsite does not imply access to every backcountry trail.</td><td className="p-4"><a href="https://tpwd.texas.gov/state-parks/big-bend-ranch/dog-policies/" target="_blank" rel="noopener noreferrer" className="text-primary underline">Big Bend Ranch dog policy ↗</a>; choose only permitted routes.</td></tr>
          <tr><th scope="row" className="p-4">Lake, river or Gulf shoreline</th><td className="p-4">Water access, currents and harmful algae are independent of whether dogs are allowed on shore. A safe-looking bank is not evidence of safe water.</td><td className="p-4"><a href="https://www.cdc.gov/harmful-algal-blooms/prevention/preventing-pet-and-livestock-illnesses.html" target="_blank" rel="noopener noreferrer" className="text-primary underline">CDC harmful-algae precautions ↗</a> plus local advisories; keep dogs out of suspect water.</td></tr>
          <tr><th scope="row" className="p-4">Long drive or city visit</th><td className="p-4">Overheated vehicles and pavement can cause serious injury; a patio or hotel allowing dogs does not replace a heat-safe route.</td><td className="p-4"><a href="https://avma.org/resources/pet-owners/petcare/warm-weather-pet-safety" target="_blank" rel="noopener noreferrer" className="text-primary underline">AVMA warm-weather safety ↗</a>; leave the dog at home rather than unattended in a car.</td></tr>
        </tbody></table></div>
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <article className="border-t border-border pt-4"><h3 className="font-display text-2xl">The paperwork check</h3><p className="mt-3 text-sm leading-7 text-muted-foreground">Texas DSHS says dogs and cats must receive rabies vaccination by four months of age, with a signed vaccination certificate. When traveling with a pet, carry the veterinarian's certificate, not just a tag; local requirements can be stricter.</p><a className="mt-4 inline-block text-sm font-semibold text-primary underline" target="_blank" rel="noopener noreferrer" href="https://www.dshs.texas.gov/notifiable-conditions/zoonosis-control/zoonosis-control-diseases-and-conditions/rabies">Texas DSHS rabies requirements ↗</a></article>
          <article className="border-t border-border pt-4"><h3 className="font-display text-2xl">When the outing should be canceled</h3><p className="mt-3 text-sm leading-7 text-muted-foreground">Choose an indoor alternative if the path is too hot, if shade and drinking water are unreliable or if the destination prohibits the dog. Excessive panting, unsteadiness or collapse require urgent veterinary care, not another mile of walking.</p><a className="mt-4 inline-block text-sm font-semibold text-primary underline" target="_blank" rel="noopener noreferrer" href="https://avma.org/resources/pet-owners/petcare/warm-weather-pet-safety">AVMA heat-stress guidance ↗</a><a className="ml-4 inline-block text-sm font-semibold text-primary underline" target="_blank" rel="noopener noreferrer" href="https://www.cdc.gov/heat-health/risk-factors/heat-and-pets.html">CDC hot-car pet precautions ↗</a></article>
        </div>
        <p className="mt-6 text-xs leading-6 text-muted-foreground">Editorial method: compare the trip type with TPWD, DSHS, CDC and AVMA primary guidance; no claim is made that any specific park, shoreline or business is currently open or accepting pets. These source rules require periodic review.</p>
      </Container>
    </section>

    <section className="border-b border-border bg-surface/40">
      <Container className="py-12 sm:py-16">
        <div className="max-w-3xl">
          <p className="eyebrow text-primary">From the Dog Desk</p>
          <h2 className="mt-3 font-display text-4xl leading-tight sm:text-5xl">Texas dog life: useful first, funny when it fits</h2>
          <p className="mt-4 text-base leading-7 text-muted-foreground">Texas Dogs Defined mixes breed personality with practical Texas dog life. Start with heat, parks and trip planning when you need an answer; stay for the porch-dog jobs, big-dog logistics and breed humor.</p>
        </div>
        <div className="mt-9 grid gap-px overflow-hidden border border-border bg-border md:grid-cols-2">
          {dogDeskStories.map((story) => <Link key={story.slug} to="/article/$slug" params={{ slug: story.slug }} className="group bg-background p-7 sm:p-9">
            <p className="eyebrow text-primary">{story.eyebrow}</p>
            <h3 className="mt-3 font-display text-3xl leading-tight transition-colors group-hover:text-primary sm:text-4xl">{story.title}</h3>
            <p className="mt-4 text-sm leading-6 text-muted-foreground">{story.dek}</p>
            <span className="eyebrow mt-7 inline-block text-primary">Read the story →</span>
          </Link>)}
        </div>
      </Container>
    </section>

    <section className="border-b border-border">
      <Container className="py-12 sm:py-16">
        <div className="max-w-3xl">
          <p className="eyebrow text-primary">Choosing a breed</p>
          <h2 className="mt-3 font-display text-4xl leading-tight sm:text-5xl">The personality comes first</h2>
          <p className="mt-4 text-base leading-7 text-muted-foreground">Every breed has different activity, grooming and climate considerations. Compare practical ownership guidance and linked American Kennel Club breed profiles alongside the lighter dog-culture stories; each individual dog still needs its own veterinary advice.</p>
        </div>
        <div className="mt-10 grid gap-px overflow-hidden border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
          {breeds.map((breed) => <Link key={breed.slug} to="/dogs/{-$breed}" params={{ breed: breed.slug }} className="group bg-background p-6 sm:p-7">
            <p className="eyebrow text-muted-foreground">{breed.shortName} Defined</p>
            <h2 className="mt-3 font-display text-3xl leading-tight transition-colors group-hover:text-primary">{breed.name}</h2>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">{breed.deck}</p>
            <span className="eyebrow mt-6 inline-block text-primary">Meet the breed →</span>
          </Link>)}
        </div>
      </Container>
    </section>

    <section className="border-b border-border">
      <Container className="py-12 sm:py-16">
        <div className="max-w-3xl">
          <p className="eyebrow text-primary">Creative ideas · separate from care guidance</p>
          <h2 className="mt-3 font-display text-4xl leading-tight sm:text-5xl">One breed can support a whole shelf of ideas</h2>
          <p className="mt-4 text-base leading-7 text-muted-foreground">The collection structure is intentionally varied. A Labrador can have a lake concept, an office-title joke and a Texas-life design without repeating one template or relying on a generic dog-plus-state-flag formula.</p>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {collections.map((collection) => <article key={collection.slug} id={collection.slug} className="border border-border bg-background p-6">
            <p className="eyebrow text-primary">{collection.tagline}</p><h2 className="mt-3 font-display text-3xl leading-tight">{collection.name}</h2>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">{collection.description}</p>
            <ul className="mt-5 space-y-2 border-t border-border pt-4 text-sm">{collection.examples.map((example) => <li key={example}>— {example}</li>)}</ul>
          </article>)}
        </div>
      </Container>
    </section>

    <section>
      <Container className="py-12 sm:py-16">
        <div className="grid gap-8 lg:grid-cols-[1fr_1fr]">
          <div><p className="eyebrow text-primary">Texas dog life</p><h2 className="mt-3 font-display text-4xl leading-tight">Useful guidance, not just merchandise</h2>
            <p className="mt-4 max-w-2xl text-base leading-7 text-muted-foreground">Use the practical Texas dog guides above for heat, state parks, coastlines, lakes, hiking, camping and adoption before choosing a destination. Breed humor and merchandise belong alongside that reporting, not in place of it.</p>
          </div>
          <div className="border border-border p-6 sm:p-8">
            <p className="eyebrow text-muted-foreground">Keep exploring Texas Defined</p>
            <div className="mt-5 grid gap-4">
              <Link to="/texas-living" className="group border-t border-border pt-4"><strong className="font-display text-2xl group-hover:text-primary">Texas Life</strong><p className="mt-1 text-sm text-muted-foreground">Homes, traditions, sports and everyday life across the state.</p></Link>
              <Link to="/explore/outdoors" className="group border-t border-border pt-4"><strong className="font-display text-2xl group-hover:text-primary">Outdoors & Wildlife</strong><p className="mt-1 text-sm text-muted-foreground">Wild places, trails and the Texas outdoors.</p></Link>
              <Link to="/explore/road-trips" className="group border-t border-border pt-4"><strong className="font-display text-2xl group-hover:text-primary">Road Trips</strong><p className="mt-1 text-sm text-muted-foreground">Two-lane routes and stops worth the drive.</p></Link>
            </div>
          </div>
        </div>
      </Container>
    </section>
  </>;
}
