# Texas Dogs Defined

## Mission

Texas Dogs Defined is the dog-life department of Texas Defined: useful, entertaining breed coverage grounded in recognizable dog behavior and the way Texans actually live with dogs. The editorial identity is playful, specific and Texas-aware without reducing every idea to a Texas flag or state outline.

Primary tagline: **Big personalities. Bigger attitudes. Dogs, Texas style.**

Secondary line: **Every Dog Has a Story. We Define the Fun Ones.**

Future commerce label: **The Texas Dogs Defined Shop.**

Editorial usefulness comes before commerce.

## URL architecture

- Hub: `/dogs`
- Breed pages: `/dogs/<breed-slug>`
- The implementation uses one TanStack optional route, `/dogs/{-$breed}`, with an eager route shell and lazy page UI.
- Breed registry/detail copy stays server-side where practical so rich editorial data does not inflate the main client bundle.
- Do not create separate thin URLs for slogans, shirt concepts, collections or products merely to capture keywords.

## Editorial standard

Every indexable breed page must earn its URL with original, breed-specific material. At minimum it should include:

- a distinct title, description and canonical URL;
- a recognizable personality angle rather than interchangeable breed copy;
- a Texas-life fit that feels natural to the breed;
- several specific creative/design directions;
- relevant collection assignments;
- related-breed links and contextual links back into Texas Defined where useful;
- breadcrumbs and appropriate WebPage/CollectionPage structured data;
- no fake store inventory, fake product URL, Product schema or implied availability.

If a future breed cannot meet that bar, keep it off the public index until it can.

## Launch breeds

1. Labrador Retriever
2. Golden Retriever
3. Dachshund
4. French Bulldog
5. German Shepherd
6. Australian Shepherd
7. Pembroke Welsh Corgi
8. Beagle
9. Boxer
10. Chihuahua
11. Great Dane
12. Yorkshire Terrier

Future candidates should be added for genuine editorial or audience value, not to manufacture page count. Current candidates include Border Collie, Australian Cattle Dog / Blue Heeler, Poodle, Shih Tzu, Siberian Husky, Boston Terrier, Pug and Miniature Schnauzer.

## Collections

Core creative collections:

- Retro Dogs
- Distinguished Dogs
- Dogs With Jobs
- Dogs With Attitude
- Texas Dogs
- Lake Dogs
- Seasonal Dogs

Dog Mom and Dog Dad may become supporting collections if they have enough distinct creative substance.

Representative concepts include Lab Lifeguard, Border Collie Ranch Manager, German Shepherd Security Department, Corgi Middle Management, Beagle Quality Control, Professional Side-Eye and Chief Barketing Officer.

Texas-specific concepts should feel lived-in: Texas Labrador, Hill Country Hound, Gulf Coast Golden, West Texas Heeler, East Texas Lab, Ranch Dog, Lake Dog, River Dog and Porch Dog. Generic dog-plus-Texas-flag art is not the central strategy.

## Internal linking

Link contextually, not mechanically. Strong connections include:

- `/dogs` to and from launch breed pages;
- breed pages to a small set of genuinely related breeds;
- dog-life articles to the breeds and collections discussed in the story;
- Texas outdoor, lake, beach, camping, park and travel coverage when a dog-specific connection is useful;
- relevant Texas Life surfaces, rather than sitewide link spraying.

Links should help a reader continue a subject, not exist only to manipulate crawl paths.

## Image policy

Use only images with commercial-reuse rights, open licenses that permit the intended use, public-domain material, or media supplied/authorized by the owner. Never scrape Google Images, Yelp, Facebook, Tripadvisor or another publisher's photography. Prefer recognizable breed photography or original illustration when rights are clear; generic stock is a fallback, not a substitute for useful editorial context.

## Commerce guardrails

Texas Dogs Defined may support future merchandise, but commerce must remain subordinate to editorial value.

- Do not publish thin product-intent pages before real products exist.
- Do not invent pricing, inventory, checkout links, reviews or availability.
- Do not add Product schema unless a real product page satisfies the schema.
- Breed and editorial pages may discuss creative directions without pretending those concepts are currently for sale.
- When commerce is introduced, connect products to established editorial pages instead of replacing the editorial page with a catalog.

## SEO and indexing

- `/dogs` and valid launch breed URLs are intended to be indexable.
- Every indexable URL requires a self-canonical, unique metadata, useful body content and working internal discovery path.
- The XML sitemap should include `/dogs` and the current valid breed slugs from a lightweight/server-safe source.
- Invalid breed slugs must not create indexable soft-404 pages.
- Keep the public-route governance registry aligned with the optional TanStack route so both the hub and breed pages are governed.
- Keep generated `src/routeTree.gen.ts` committed exactly as produced by the current TanStack build.
- Never weaken publication, SEO, route-governance or bundle-budget gates to ship this section.

## Authority roadmap

After the launch foundation is healthy and indexed, deepen dog-life authority with practical Texas coverage such as traveling with dogs, lake trips, dog-friendly beaches, state parks, heat safety, hiking and trails, camping, patios, adoption and events. Rules, fees, health guidance and access policies must be checked against current first-party official sources before publication.
