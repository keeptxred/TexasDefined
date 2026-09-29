import type { FishingVisualAsset } from "@/data/fishing/image-library";

export function FishingPhoto({
  image,
  className = "",
  imageClassName = "",
  eager = false,
  showCredit = true,
}: {
  image: FishingVisualAsset;
  className?: string;
  imageClassName?: string;
  eager?: boolean;
  showCredit?: boolean;
}) {
  return (
    <figure className={className}>
      <div className="overflow-hidden border border-border bg-muted/30">
        <img
          src={image.src}
          alt={image.alt}
          width={image.width}
          height={image.height}
          loading={eager ? "eager" : "lazy"}
          fetchPriority={eager ? "high" : "auto"}
          decoding="async"
          referrerPolicy="no-referrer"
          className={imageClassName}
        />
      </div>
      {showCredit ? (
        <figcaption className="mt-2 text-[0.68rem] leading-5 text-muted-foreground">
          {image.credit}
          {image.sourceUrl ? <> · <a href={image.sourceUrl} target="_blank" rel="noreferrer noopener" className="underline decoration-border underline-offset-2 hover:text-foreground">source</a></> : null}
          {" · "}
          <a href={image.licenseUrl} target="_blank" rel="noreferrer noopener" className="underline decoration-border underline-offset-2 hover:text-foreground">{image.licenseName}</a>
        </figcaption>
      ) : null}
    </figure>
  );
}
