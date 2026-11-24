// Archival sources independently checked against DeGolyer Library / Wikimedia
// metadata, and all three exact original images fetched through the existing
// production media broker as HTTP 200 image/jpeg on 2026-11-24.
const photographs = [
  {
    original: "https://upload.wikimedia.org/wikipedia/commons/9/9a/A_Corner_in_one_of_City_Business_Blocks%2C_Alvin%2C_Tex_%2825635261034%29.jpg",
    source: "https://commons.wikimedia.org/wiki/File:A_Corner_in_one_of_City_Business_Blocks,_Alvin,_Tex_(25635261034).jpg",
    alt: "Historic Alvin business block in a photographic postcard dated circa 1910–1912",
    caption: "An Alvin business block, circa 1910–1912, showing downtown during the railroad town’s early twentieth-century development.",
    credit: "S&B; George W. Cook Dallas–Texas Image Collection, DeGolyer Library, Southern Methodist University",
    rights: "No known copyright restrictions",
    rightsUrl: "https://www.flickr.com/commons/usage/",
    width: 1000, height: 655,
  },
  {
    original: "https://upload.wikimedia.org/wikipedia/commons/f/f0/%27Our_Band%27_Alvin%2C_Tex_St._Scene_%2826147334682%29.jpg",
    source: "https://www.flickr.com/photos/smu_cul_digitalcollections/26147334682/",
    alt: "Historical postcard titled Our Band, Alvin, Texas, street scene",
    caption: "“Our Band,” an Alvin street scene dated approximately 1925–1942 by the library. The archive does not identify the individual musicians.",
    credit: "Unknown photographer; George W. Cook Dallas–Texas Image Collection, DeGolyer Library, Southern Methodist University",
    rights: "No known copyright restrictions",
    rightsUrl: "https://www.flickr.com/commons/usage/",
    width: 1000, height: 651,
  },
  {
    original: "https://upload.wikimedia.org/wikipedia/commons/b/b3/Alvin_RR_Depot_%285822129305%29.jpg",
    source: "https://commons.wikimedia.org/wiki/File:Alvin_RR_Depot_(5822129305).jpg",
    alt: "Restored Alvin Santa Fe Railroad passenger depot photographed in June 2011",
    caption: "The restored passenger depot in June 2011. This photograph shows the historic building, not a current passenger railway service.",
    credit: "Mike Fisher (BFS Man), Wikimedia Commons",
    rights: "CC BY 2.0",
    rightsUrl: "https://creativecommons.org/licenses/by/2.0/",
    width: 720, height: 576,
  },
] as const;

export function AlvinHistoricalPhotographs({ includeDepot = true }: { includeDepot?: boolean }) {
  return <section className="my-9 min-w-0" aria-label="Alvin historical photographs">
    <h3 className="font-display text-2xl">Alvin through historic photographs</h3>
    <p className="mt-3 text-sm leading-6 text-muted-foreground">Archival postcards document Alvin’s commercial and community life. These are views of the town, not photographs of the museum’s interior or its current exhibits.</p>
    <div className="mt-5 grid gap-5 sm:grid-cols-2">
      {(includeDepot ? photographs : photographs.slice(0, 2)).map(photo => <figure key={photo.source} className="min-w-0 overflow-hidden border border-border bg-muted/20">
        <img src={"/media/remote?url=" + encodeURIComponent(photo.original)} alt={photo.alt} width={photo.width} height={photo.height} loading="lazy" decoding="async" className="h-auto w-full" />
        <figcaption className="space-y-2 p-4 text-xs leading-5 text-muted-foreground">
          <p>{photo.caption}</p>
          <p><a href={photo.source} target="_blank" rel="noopener noreferrer" className="underline">{photo.credit}</a> · <a href={photo.rightsUrl} target="_blank" rel="noopener noreferrer" className="underline">{photo.rights}</a></p>
        </figcaption>
      </figure>)}
    </div>
  </section>;
}
