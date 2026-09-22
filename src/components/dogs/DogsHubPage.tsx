import { getRouteApi, Link } from "@tanstack/react-router";
import { Container } from "@/components/layout/Container";
import type { DogBreedSummary, DogDesignCollection } from "@/data/texas-dogs";

const routeApi = getRouteApi("/dogs/{-$breed}");
const description = "Texas Dogs Defined is the playful dog-life department of Texas Defined: breed personalities, Texas dog culture and breed-specific shirt ideas built for dog people.";
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
        <h1 className="mt-4 max-w-5xl font-display text-5xl leading-[0.96] sm:text-7xl">Big personalities. Bigger attitudes. Dogs, Texas style.</h1>
        <p className="mt-7 max-w-3xl text-lg leading-8 text-muted-foreground sm:text-xl">{description}</p>
        <p className="mt-5 max-w-3xl font-display text-2xl leading-8">Every Dog Has a Story. We Define the Fun Ones.</p>
      </Container>
    </section>

    <section className="border-b border-border">
      <Container className="py-12 sm:py-16">
        <div className="max-w-3xl">
          <p className="eyebrow text-primary">Start with the breed</p>
          <h2 className="mt-3 font-display text-4xl leading-tight sm:text-5xl">The personality comes first</h2>
          <p className="mt-4 text-base leading-7 text-muted-foreground">Each breed page is a permanent home for recognizable behavior, Texas dog life, stories and future design ideas. The editorial subject comes first, so the page remains useful even before a single product exists.</p>
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
          <p className="eyebrow text-primary">The shirt universe</p>
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
          <div><p className="eyebrow text-primary">Texas dog life</p><h2 className="mt-3 font-display text-4xl leading-tight">More than shirts</h2>
            <p className="mt-4 max-w-2xl text-base leading-7 text-muted-foreground">Texas Dogs Defined is built to grow into porch dogs, road trips, lake weekends, parks, events, adoption resources and practical Texas dog-life coverage. Merchandise can eventually live inside that useful editorial world, never the other way around.</p>
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
