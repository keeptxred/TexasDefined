import { Link } from "@tanstack/react-router";

import { canonicalPaintedChurchGalleryBySlug } from "@/data/painted-church-gallery-index";

const licenseUrl = (license: string) => {
  const normalized = license.toLowerCase();
  if (normalized.includes("cc0")) return "https://creativecommons.org/publicdomain/zero/1.0/";
  if (normalized.includes("cc by-sa 4.0")) return "https://creativecommons.org/licenses/by-sa/4.0/";
  if (normalized.includes("cc by-sa 3.0")) return "https://creativecommons.org/licenses/by-sa/3.0/";
  if (normalized.includes("cc by 4.0")) return "https://creativecommons.org/licenses/by/4.0/";
  if (normalized.includes("cc by 3.0")) return "https://creativecommons.org/licenses/by/3.0/";
  if (normalized.includes("cc by 2.0")) return "https://creativecommons.org/licenses/by/2.0/";
  return undefined;
};

export function PaintedChurchGallery({ slug }: { slug: string }) {
  const images = canonicalPaintedChurchGalleryBySlug(slug);
  if (!images.length) return null;

  const imageSchema = {
    "@context": "https://schema.org",
    "@graph": images.map((image, index) => ({
      "@type": "ImageObject",
      "@id": `${image.sourceUrl}#texas-defined-image-${index + 1}`,
      contentUrl: image.src,
      url: image.sourceUrl,
      caption: image.caption,
      description: image.alt,
      width: image.width,
      height: image.height,
      creditText: image.credit,
      creator: { "@type": "Person", name: image.credit.replace(/\s*·.*$/, "") },
      ...(licenseUrl(image.license) ? { license: licenseUrl(image.license) } : {}),
      acquireLicensePage: image.sourceUrl,
      representativeOfPage: false,
    })),
  };

  return (
    <section aria-labelledby="church-gallery" className="mt-14 border-t border-border pt-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(imageSchema) }} />
      <p className="eyebrow text-primary">Rights-verified photography</p>
      <h2 id="church-gallery" className="mt-3 font-display text-4xl">See the church in detail</h2>
      <p className="mt-4 max-w-3xl text-sm leading-7 text-muted-foreground">
        Every image below is tied to an item-level reuse license and source page. Search-result thumbnails are not published until their individual rights record is verified.
      </p>
      <div className="mt-8 grid gap-8 sm:grid-cols-2">
        {images.map((image) => (
          <figure key={image.sourceUrl} className="border-t border-border pt-4">
            <img src={image.src} alt={image.alt} width={image.width} height={image.height} loading="lazy" decoding="async" className="aspect-[4/3] w-full object-cover" />
            <figcaption className="mt-4 text-sm leading-6 text-muted-foreground">
              <span className="text-foreground">{image.caption}</span><br />
              {image.credit} · {image.license} · <a href={image.sourceUrl} target="_blank" rel="noreferrer" className="border-b border-primary text-primary">source and license</a>
            </figcaption>
          </figure>
        ))}
      </div>
      <p className="mt-6 max-w-3xl text-xs leading-6 text-muted-foreground">Texas Defined verifies the subject, creator and reuse terms at the individual item level before publishing. <Link to="/explore/painted-churches/methodology" className="border-b border-primary text-primary">Read the image-rights and research methodology.</Link></p>
    </section>
  );
}
