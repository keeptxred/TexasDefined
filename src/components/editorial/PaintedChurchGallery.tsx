import { paintedChurchGalleryBySlug } from "@/data/painted-church-gallery";

export function PaintedChurchGallery({ slug }: { slug: string }) {
  const images = paintedChurchGalleryBySlug(slug);
  if (!images.length) return null;

  return (
    <section aria-labelledby="church-gallery" className="mt-14 border-t border-border pt-8">
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
    </section>
  );
}
