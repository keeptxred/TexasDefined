import { Container } from '@/components/layout/Container';
import { weddingVenueLicensedImage } from '@/data/wedding-venue-images';

export function WeddingVenueImageBlock({ slug, name }: { slug: string; name: string }) {
  const image = weddingVenueLicensedImage(slug);
  if (!image) return null;

  const imageSchema = {
    '@context': 'https://schema.org',
    '@type': 'ImageObject',
    '@id': `${image.sourceUrl}#texasdefined-wedding-venue-image`,
    contentUrl: image.src,
    url: image.sourceUrl,
    caption: image.caption,
    description: image.alt,
    width: image.width,
    height: image.height,
    creditText: image.credit,
    creator: { '@type': 'Person', name: image.creator },
    license: image.licenseUrl,
    acquireLicensePage: image.sourceUrl,
    representativeOfPage: true,
  };

  return <Container className="pb-16 sm:pb-24">
    <section className="mx-auto max-w-5xl border-t border-border pt-8" aria-labelledby={`venue-photo-${slug}`}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(imageSchema) }} />
      <div className="grid gap-7 lg:grid-cols-[14rem_1fr]">
        <div>
          <p className="eyebrow text-primary">Rights-verified photography</p>
          <h2 id={`venue-photo-${slug}`} className="mt-2 font-display text-3xl">See {name}</h2>
          <p className="mt-3 text-xs leading-6 text-muted-foreground">This photograph depicts the listed venue or property itself. TexasDefined verified its item-level reuse terms before publication.</p>
        </div>
        <figure>
          <img
            src={image.src}
            alt={image.alt}
            width={image.width}
            height={image.height}
            loading="lazy"
            decoding="async"
            className="aspect-[4/3] w-full object-cover"
          />
          <figcaption className="mt-3 text-xs leading-6 text-muted-foreground">
            <span className="text-foreground">{image.caption}</span><br />
            {image.credit} · {image.license} · <a href={image.sourceUrl} target="_blank" rel="noreferrer" className="border-b border-primary text-primary">source and license</a>
          </figcaption>
        </figure>
      </div>
    </section>
  </Container>;
}
