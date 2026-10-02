import { canonicalEntityPath, type RankedRelatedEntity } from '@/data/knowledge-graph/relationships';
import type { TexasEntityRecord } from '@/data/knowledge-graph/types';
import { WILDLIFE_CORE_PROFILES } from '@/data/wildlife-authority-core';
import { WILDLIFE_MAMMAL_PROFILES } from '@/data/wildlife-authority-mammals';
import { WILDLIFE_BIRD_REPTILE_PROFILES } from '@/data/wildlife-authority-birds-reptiles';
import { WILDLIFE_AUTHORITY_IMAGES, type WildlifeImage } from '@/data/wildlife-authority-images';
import type { WildlifeAuthorityProfile } from '@/data/wildlife-authority-types';

export const WILDLIFE_AUTHORITY_PROFILES: Record<string, WildlifeAuthorityProfile> = {
  ...WILDLIFE_CORE_PROFILES,
  ...WILDLIFE_MAMMAL_PROFILES,
  ...WILDLIFE_BIRD_REPTILE_PROFILES,
};

export function WildlifeDepthSections({ entity, related }: { entity: TexasEntityRecord; related: RankedRelatedEntity[] }) {
  const profile = WILDLIFE_AUTHORITY_PROFILES[entity.slug] ?? fallbackProfile(entity);
  const imageSet = WILDLIFE_AUTHORITY_IMAGES[entity.slug];
  const relatedItems = related
    .filter(({ entity: candidate }) => ['wildlife-species', 'state-park', 'national-park', 'natural-area', 'wildlife-management-area'].includes(candidate.kind))
    .slice(0, 6);

  return <>
    {imageSet ? <WildlifeHero image={imageSet.hero} /> : null}

    <section className="border-b border-border py-12" aria-labelledby="wildlife-overview-heading">
      <div className="grid gap-8 lg:grid-cols-[14rem_1fr]">
        <div>
          <p className="eyebrow text-primary">Texas wildlife</p>
          <h2 id="wildlife-overview-heading" className="mt-2 font-display text-4xl">Understanding {entity.name}</h2>
        </div>
        <div className="max-w-3xl space-y-4 text-base leading-7 text-muted-foreground">
          {profile.intro.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          {entity.officialUrl ? <p><a className="font-semibold text-primary underline underline-offset-4" href={entity.officialUrl} target="_blank" rel="noreferrer">Check the current TPWD species source ↗</a></p> : null}
        </div>
      </div>
    </section>

    {imageSet ? <WildlifeImageCards images={imageSet.cards} speciesName={entity.name} /> : null}

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
          <p className="max-w-3xl text-base leading-7 text-muted-foreground">Wildlife viewing is safest and most useful when the animal can behave normally. These principles apply on ranch roads, trails, greenbelts, coastlines and in neighborhoods.</p>
          <ul className="mt-6 grid gap-4 sm:grid-cols-2">
            <li className="border border-border p-5"><strong className="font-display text-xl">Keep your distance</strong><p className="mt-2 text-sm leading-6 text-muted-foreground">Use binoculars or a long lens instead of approaching, feeding, touching or blocking an animal's path.</p></li>
            <li className="border border-border p-5"><strong className="font-display text-xl">Protect pets and food</strong><p className="mt-2 text-sm leading-6 text-muted-foreground">Supervise pets where wildlife is active and remove unsecured feed, trash or other attractants that can create repeat encounters.</p></li>
            <li className="border border-border p-5"><strong className="font-display text-xl">Respect land access</strong><p className="mt-2 text-sm leading-6 text-muted-foreground">A wildlife sighting does not create public access. Stay on legal roads, trails and public areas unless you have landowner permission.</p></li>
            <li className="border border-border p-5"><strong className="font-display text-xl">Check current TPWD guidance</strong><p className="mt-2 text-sm leading-6 text-muted-foreground">Regulations, management advice and conflict guidance can change. Use TPWD when the answer affects safety or legality.</p></li>
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

function WildlifeHero({ image }: { image: WildlifeImage }) {
  return <figure className="border-b border-border py-12">
    <img
      src={image.src}
      alt={image.alt}
      style={{ display: 'block', width: '100%', height: 'clamp(14rem, 28vw, 24rem)', objectFit: 'cover', objectPosition: 'center 42%' }}
      loading="eager"
      fetchPriority="high"
      decoding="async"
    />
    <figcaption className="mt-3 text-sm leading-6 text-muted-foreground">
      <span>{image.caption} </span>
      <a href={image.sourceUrl} target="_blank" rel="noreferrer" className="font-semibold text-primary underline underline-offset-4">{image.credit} ↗</a>
    </figcaption>
  </figure>;
}

function WildlifeImageCards({ images, speciesName }: { images: [WildlifeImage, WildlifeImage, WildlifeImage]; speciesName: string }) {
  return <section className="border-b border-border py-12" aria-labelledby="wildlife-photo-notes-heading">
    <div className="grid gap-8 lg:grid-cols-[14rem_1fr]">
      <div>
        <p className="eyebrow text-primary">Field photos</p>
        <h2 id="wildlife-photo-notes-heading" className="mt-2 font-display text-4xl">{speciesName} in context</h2>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(14rem, 1fr))', gap: '1rem' }}>
        {images.map((image) => <figure key={image.src} className="border border-border">
          <img
            src={image.src}
            alt={image.alt}
            style={{ display: 'block', width: '100%', aspectRatio: '3 / 2', objectFit: 'cover' }}
            loading="lazy"
            decoding="async"
          />
          <figcaption className="p-5">
            <p className="text-sm leading-6 text-muted-foreground">{image.caption}</p>
            <p className="mt-3"><a href={image.sourceUrl} target="_blank" rel="noreferrer" className="font-semibold text-primary underline underline-offset-4">{image.credit} ↗</a></p>
          </figcaption>
        </figure>)}
      </div>
    </div>
  </section>;
}

function fallbackProfile(entity: TexasEntityRecord): WildlifeAuthorityProfile {
  return {
    intro: [entity.description ?? `${entity.name} is part of the TexasDefined wildlife reference collection.`, 'This newly added species does not yet have a bespoke Texas authority profile. Its official source remains the governing reference until the species-specific guide is completed.'],
    sections: [
      { heading: 'Texas range and habitat', body: ['Use the verified TPWD source for current range and habitat information. Wildlife distribution is not uniform, and habitat, water, food, weather and land use all affect where an animal is encountered.'] },
      { heading: 'Identification and observation', body: ['Identify wildlife with several traits together, keep a respectful distance and avoid feeding or handling the animal. Use current TPWD material when identification, safety or legality matters.'] },
    ],
    answers: [
      { question: `Where should I verify current information about ${entity.name}?`, answer: 'Use the Texas Parks and Wildlife Department source linked on this page.' },
    ],
  };
}

function title(value: string) {
  return value.replaceAll('-', ' ').replace(/\b\w/g, (character) => character.toUpperCase());
}
