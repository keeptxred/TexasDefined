import type { FishingVisualAsset } from "@/data/fishing/image-library";
import { applyLakePhotoGovernance } from "@/data/fishing/lake-photo-governance";

export function FishingPhoto({
  image,
  className = "",
  imageClassName = "",
  eager = false,
  showCredit = true,
  onDark = false,
}: {
  image: FishingVisualAsset;
  className?: string;
  imageClassName?: string;
  eager?: boolean;
  showCredit?: boolean;
  onDark?: boolean;
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
        <figcaption className={`mt-2 text-[0.68rem] leading-5 ${onDark ? "text-ink-foreground" : "text-muted-foreground"}`}>
          <span className="font-medium">{/\b(?:bathymetric|topographic|topographical|cartographic|map of)\b/i.test(governedImage.alt) ? "Map credit: " : governedImage.kind === "fish" ? "Fish image credit: " : "Photo credit: "}</span>{governedImage.credit}
          {governedImage.sourceUrl ? <> · <a href={governedImage.sourceUrl} target="_blank" rel="noreferrer noopener" className="underline underline-offset-2">source</a></> : null}
          {" · "}
          <a href={governedImage.licenseUrl} target="_blank" rel="noreferrer noopener" className="underline underline-offset-2">{governedImage.licenseName}</a>
        </figcaption>
      ) : null}
    </figure>
  );
}
