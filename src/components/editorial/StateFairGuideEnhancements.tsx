import { Link } from "@tanstack/react-router";

import { Container } from "@/components/layout/Container";
import { editorialImageSrc } from "@/lib/editorial-image-delivery";

type FairPhoto = {
  file: string;
  alt: string;
  caption: string;
};

const commonsSource = (file: string) =>
  `https://commons.wikimedia.org/wiki/File:${encodeURIComponent(file.replaceAll(" ", "_"))}`;

const commonsImage = (file: string, width = 1800) =>
  editorialImageSrc(
    `https://commons.wikimedia.org/wiki/Special:Redirect/file/${encodeURIComponent(file)}?width=${width}`,
  );

const featuredPhotos: FairPhoto[] = [
  {
    file: "State Fair of Texas September 2019 15 (Big Tex).jpg",
    alt: "Big Tex at the State Fair of Texas in Dallas",
    caption: "Big Tex",
  },
  {
    file: "State Fair of Texas September 2019 19 (Midway).jpg",
    alt: "The Midway at the State Fair of Texas",
    caption: "The Midway",
  },
  {
    file: "State Fair of Texas September 2019 25 (Hall of State).jpg",
    alt: "Hall of State at Fair Park during the State Fair of Texas",
    caption: "Hall of State",
  },
  {
    file: "State Fair of Texas September 2019 11 (Deep Fried Nutella Custard Stuffed French Toast).jpg",
    alt: "Deep-fried fair food at the State Fair of Texas",
    caption: "State Fair food",
  },
];

const additionalPhotos: FairPhoto[] = [
  { file: "State Fair of Texas September 2019 01 (Centennial Hall).jpg", alt: "Centennial Hall at the State Fair of Texas", caption: "Centennial Hall" },
  { file: "State Fair of Texas September 2019 02 (Centennial Hall).jpg", alt: "Centennial Hall at Fair Park during the State Fair of Texas", caption: "Centennial Hall" },
  { file: "State Fair of Texas September 2019 03 (Esplanade Fountain).jpg", alt: "Esplanade Fountain at the State Fair of Texas", caption: "Esplanade Fountain" },
  { file: "State Fair of Texas September 2019 04 (Lone Star Boulevard).jpg", alt: "Lone Star Boulevard at the State Fair of Texas", caption: "Lone Star Boulevard" },
  { file: "State Fair of Texas September 2019 05 (vendors).jpg", alt: "Vendors at the State Fair of Texas", caption: "Fair vendors" },
  { file: "State Fair of Texas September 2019 06 (U.S. Marine Corps Jazz Orchestra).jpg", alt: "U.S. Marine Corps Jazz Orchestra performing at the State Fair of Texas", caption: "U.S. Marine Corps Jazz Orchestra" },
  { file: "State Fair of Texas September 2019 07 (Midway).jpg", alt: "Midway rides at the State Fair of Texas", caption: "Midway" },
  { file: "State Fair of Texas September 2019 08 (Fair Park Band Shell).jpg", alt: "Fair Park Band Shell during the State Fair of Texas", caption: "Fair Park Band Shell" },
  { file: "State Fair of Texas September 2019 09 (Dos Equis Pavilion).jpg", alt: "Dos Equis Pavilion during the State Fair of Texas", caption: "Dos Equis Pavilion" },
  { file: "State Fair of Texas September 2019 10 (Midway).jpg", alt: "State Fair of Texas Midway during the day", caption: "Midway" },
  { file: "State Fair of Texas September 2019 12 (Big Tex).jpg", alt: "Big Tex at the State Fair of Texas", caption: "Big Tex" },
  { file: "State Fair of Texas September 2019 13 (Big Tex).jpg", alt: "Big Tex viewed from the State Fair of Texas fairgrounds", caption: "Big Tex" },
  { file: "State Fair of Texas September 2019 14 (Big Tex).jpg", alt: "Big Tex at Fair Park during the State Fair of Texas", caption: "Big Tex" },
  { file: "State Fair of Texas September 2019 16 (Big Tex).jpg", alt: "Big Tex and fairgoers at the State Fair of Texas", caption: "Big Tex and fairgoers" },
  { file: "State Fair of Texas September 2019 17 (Lone Star Boulevard).jpg", alt: "Lone Star Boulevard at the State Fair of Texas", caption: "Lone Star Boulevard" },
  { file: "State Fair of Texas September 2019 18 (Crazy Mouse).jpg", alt: "Crazy Mouse ride at the State Fair of Texas", caption: "Crazy Mouse" },
  { file: "State Fair of Texas September 2019 20 (Redwood Loghouse).jpg", alt: "Redwood Loghouse at the State Fair of Texas", caption: "Redwood Loghouse" },
  { file: "State Fair of Texas September 2019 21 (vendors).jpg", alt: "State Fair of Texas vendors", caption: "Fair vendors" },
  { file: "State Fair of Texas September 2019 22 (State Fair Wine Garden).jpg", alt: "State Fair Wine Garden at Fair Park", caption: "State Fair Wine Garden" },
  { file: "State Fair of Texas September 2019 23 (vendors).jpg", alt: "Vendor booths at the State Fair of Texas", caption: "Fair vendors" },
  { file: "State Fair of Texas September 2019 24 (Esplanade).jpg", alt: "Esplanade at Fair Park during the State Fair of Texas", caption: "Esplanade" },
  { file: "State Fair of Texas September 2019 26 (Hall of State).jpg", alt: "Hall of State at Fair Park during the State Fair of Texas", caption: "Hall of State" },
  { file: "State Fair of Texas September 2019 27 (Esplanade).jpg", alt: "Fair Park Esplanade during the State Fair of Texas", caption: "Esplanade" },
  { file: "State Fair of Texas September 2019 28 (Midway).jpg", alt: "State Fair of Texas Midway illuminated at night", caption: "Midway at night" },
  { file: "State Fair of Texas September 2019 29 (Hall of State).jpg", alt: "Hall of State illuminated at night during the State Fair of Texas", caption: "Hall of State at night" },
  { file: "State Fair of Texas September 2019 30 (Hall of State).jpg", alt: "Night view of the Hall of State at the State Fair of Texas", caption: "Hall of State at night" },
  { file: "State Fair of Texas September 2019 31 (Centennial Hall).jpg", alt: "Centennial Hall illuminated at night during the State Fair of Texas", caption: "Centennial Hall at night" },
];

function PhotoCard({ photo, eager = false }: { photo: FairPhoto; eager?: boolean }) {
  return (
    <figure className="overflow-hidden border border-border bg-background">
      <img
        src={commonsImage(photo.file)}
        alt={photo.alt}
        className="w-full object-cover"
        style={{ aspectRatio: "4 / 3" }}
        loading={eager ? "eager" : "lazy"}
        decoding="async"
      />
      <figcaption className="space-y-1 px-4 py-3 text-sm">
        <p className="font-semibold text-foreground">{photo.caption}</p>
        <p className="text-xs leading-5 text-muted-foreground">
          Michael Barera ·{" "}
          <a
            href="https://creativecommons.org/licenses/by-sa/4.0/"
            target="_blank"
            rel="noreferrer"
            className="underline underline-offset-2"
          >
            CC BY-SA 4.0
          </a>
          {" "}·{" "}
          <a
            href={commonsSource(photo.file)}
            target="_blank"
            rel="noreferrer"
            className="underline underline-offset-2"
          >
            Wikimedia Commons
          </a>
          {" "}· cropped for layout
        </p>
      </figcaption>
    </figure>
  );
}

export function StateFairPlanningStrip() {
  return (
    <section className="border-b border-border py-10" data-state-fair-planning-strip>
      <Container>
        <div className="grid gap-8 lg:grid-cols-2">
          <div>
            <p className="eyebrow text-primary">Plan the visit</p>
            <h2 className="mt-2 font-display text-3xl md:text-4xl">Tickets, football and a place to stay</h2>
            <p className="mt-4 max-w-3xl leading-7 text-muted-foreground">
              Buy general admission from the State Fair of Texas. TexasDefined does not resell Fair admission.
              For Cotton Bowl game days, use our event guides to check current ticket availability and trip-planning details.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href="https://bigtex.com/buy-tickets-new/"
                target="_blank"
                rel="noreferrer"
                className="inline-flex min-h-11 items-center rounded-md bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground hover:opacity-90"
                data-state-fair-official-ticket-cta
              >
                Buy State Fair tickets ↗
              </a>
              <Link
                to="/event/state-fair-classic"
                className="inline-flex min-h-11 items-center rounded-md border border-border px-5 py-3 text-sm font-semibold hover:bg-muted"
              >
                State Fair Classic tickets
              </Link>
              <Link
                to="/event/red-river-rivalry"
                className="inline-flex min-h-11 items-center rounded-md border border-border px-5 py-3 text-sm font-semibold hover:bg-muted"
              >
                Red River Rivalry tickets
              </Link>
            </div>
          </div>

          <div
            data-stay-nearby-slot
            data-state-fair-stay-slot
            aria-label="Places to stay for the State Fair of Texas"
          />
        </div>

        <div className="mt-10" data-state-fair-featured-gallery>
          <div className="flex items-end justify-between gap-6">
            <div>
              <p className="eyebrow text-primary">State Fair photo carousel</p>
              <h2 className="mt-2 font-display text-3xl md:text-4xl">A look at the Fair</h2>
            </div>
            <a
              href="https://bigtex.com/about-us/media-room/photo-gallery/"
              target="_blank"
              rel="noreferrer"
              className="hidden text-sm font-semibold text-primary underline underline-offset-4 md:inline"
            >
              Official Fair photo archive ↗
            </a>
          </div>
          <div
            className="mt-6 flex gap-4 overflow-x-auto pb-4"
            aria-label="State Fair of Texas featured photos"
          >
            {featuredPhotos.map((photo, index) => (
              <div key={photo.file} style={{ flex: "0 0 min(82vw, 18rem)" }}>
                <PhotoCard photo={photo} eager={index === 0} />
              </div>
            ))}
          </div>
          <p className="mt-2 text-xs leading-5 text-muted-foreground">
            Historical photos shown here are independently licensed through Wikimedia Commons. The State Fair of Texas
            also maintains an official media photo archive with its own credit requirements.
          </p>
        </div>
      </Container>
    </section>
  );
}

export function StateFairHistoricalGallery() {
  return (
    <section className="border-t border-border py-12" data-state-fair-historical-gallery>
      <Container>
        <div className="max-w-5xl">
          <p className="eyebrow text-primary">Historical gallery</p>
          <h2 className="mt-2 font-display text-3xl md:text-4xl">More scenes from previous State Fairs</h2>
          <p className="mt-4 max-w-3xl leading-7 text-muted-foreground">
            This complete 31-photo September 2019 archival set covers Big Tex, the Midway, food, vendors, entertainment and Fair Park landmarks. For current official
            publication photography, the State Fair media room maintains galleries covering recent highlights,
            historical images, Big Tex, award-winning food, new foods, livestock, Creative Arts and State Fair Cares.
          </p>

          <details className="mt-6 border border-border bg-muted/30 p-5">
            <summary className="cursor-pointer font-semibold">View the full 31-photo historical State Fair gallery</summary>
            <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {additionalPhotos.map((photo) => <PhotoCard key={photo.file} photo={photo} />)}
            </div>
          </details>

          <div className="mt-6 flex flex-wrap gap-4 text-sm">
            <a
              href="https://bigtex.com/about-us/media-room/photo-gallery/"
              target="_blank"
              rel="noreferrer"
              className="font-semibold text-primary underline underline-offset-4"
            >
              Browse the official State Fair photo galleries ↗
            </a>
            <a
              href="https://bigtex.com/about-us/media-room/"
              target="_blank"
              rel="noreferrer"
              className="font-semibold text-primary underline underline-offset-4"
            >
              State Fair media room ↗
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
}
