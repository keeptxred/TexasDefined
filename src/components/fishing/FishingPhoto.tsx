import type { FishingVisualAsset } from "@/data/fishing/image-library";
import { applyLakePhotoGovernance } from "@/data/fishing/lake-photo-governance";

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
  const governedImage = applyLakePhotoGovernance(image);
  return (
    <figure className={className}>
      <div className="overflow-hidden border border-border bg-muted/30">
        <img
          src={governedImage.src}
          alt={governedImage.alt}
          width={governedImage.width}
          height={governedImage.height}
          loading={eager ? "eager" : "lazy"}
          fetchPriority={eager ? "high" : "auto"}
          decoding="async"
          referrerPolicy="no-referrer"
          className={imageClassName}
        />
      </div>
      {showCredit ? (
        <figcaption className="mt-2 text-[0.68rem] leading-5 text-muted-foreground">
          {governedImage.credit}
          {governedImage.sourceUrl ? <> · <a href={governedImage.sourceUrl} target="_blank" rel="noreferrer noopener" className="underline decoration-border underline-offset-2 hover:text-foreground">source</a></> : null}
          {" · "}
          <a href={governedImage.licenseUrl} target="_blank" rel="noreferrer noopener" className="underline decoration-border underline-offset-2 hover:text-foreground">{governedImage.licenseName}</a>
        </figcaption>
      ) : null}
    </figure>
  );
}
