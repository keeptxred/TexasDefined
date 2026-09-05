import { Link } from "@tanstack/react-router";
import type { CampingAmenity, CampingProfile, CampingStyle } from "@/data/camping/types";

const STYLE_LABELS: Record<CampingStyle, string> = {
  tent: "Tent",
  rv: "RV",
  primitive: "Primitive",
  beach: "Beach",
  backcountry: "Backcountry",
  group: "Group",
  cabin: "Cabin",
  glamping: "Glamping",
  airstream: "Airstream",
  bungalow: "Bungalow",
};

const AMENITY_LABELS: Record<CampingAmenity, string> = {
  "electric-hookup": "Electric hookup",
  "electric-20": "20-amp electric",
  "electric-30": "30-amp electric",
  "electric-50": "50-amp electric",
  "water-hookup": "Water hookup",
  "sewer-hookup": "Sewer hookup",
  "full-hookup": "Full hookup",
  "dump-station": "Dump station",
  restrooms: "Restrooms",
  showers: "Showers",
  "ada-site": "ADA-designated site",
  pets: "Pets",
  shade: "Shade",
  swimming: "Swimming",
  "lake-access": "Lake access",
  "river-access": "River access",
  "gulf-access": "Gulf access",
  fishing: "Fishing",
  hiking: "Hiking",
};

function checkedDate(value: string) {
  const date = new Date(`${value}T00:00:00`);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}

function unique(values: string[]) {
  return values.filter((value, index, all) => Boolean(value) && all.indexOf(value) === index);
}

export function DestinationCampingDetailsImpl({ destinationSlug, destinationName, profiles }: { destinationSlug: string; destinationName: string; profiles: CampingProfile[] }) {
  if (!profiles.length) return null;

  return (
    <section aria-labelledby="camping-and-overnight-stays" data-camping-destination={destinationSlug} className="mt-16 border-t border-border pt-8">
      <p className="eyebrow text-primary">Camping & overnight stays</p>
      <h2 id="camping-and-overnight-stays" className="mt-3 font-display text-3xl">Verified public camping at {destinationName}</h2>
      <p className="mt-4 max-w-2xl text-sm leading-7 text-muted-foreground">
        TexasDefined ties these camping records to official public sources. Only amenities we have verified are shown; an unlisted amenity means we have not verified it, not that it is unavailable.
      </p>

      <div className="mt-8 space-y-8">
        {profiles.map((profile) => {
          const profileKey = profile.profileSlug ?? profile.name;
          const styleLabels = unique(profile.styles.map((style) => STYLE_LABELS[style]));
          const amenityLabels = unique(profile.amenities.map((amenity) => AMENITY_LABELS[amenity]));
          return (
            <article key={profileKey} id={profile.profileSlug} className="border-t border-border pt-6 first:border-t-0 first:pt-0">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <h3 className="font-display text-2xl">{profile.name}</h3>
                  <p className="mt-2 text-xs uppercase tracking-[0.12em] text-muted-foreground">{profile.managingAgency} · checked {checkedDate(profile.verifiedAt)}</p>
                </div>
                <a href={profile.reservationUrl} target="_blank" rel="noreferrer noopener" className="eyebrow border-b border-primary pb-1 text-primary">Official reservation source</a>
              </div>

              <p className="mt-5 text-sm leading-7 text-foreground/90">{profile.reservationPolicy}</p>
              {styleLabels.length > 0 && <div className="mt-5"><p className="eyebrow text-muted-foreground">Camping types</p><p className="mt-2 text-sm leading-6">{styleLabels.join(" · ")}</p></div>}
              {amenityLabels.length > 0 && <div className="mt-5"><p className="eyebrow text-muted-foreground">Verified amenities & access</p><p className="mt-2 text-sm leading-6">{amenityLabels.join(" · ")}</p></div>}
              {(profile.siteLengthNote || profile.generatorRules) && <dl className="mt-5 grid gap-4 border-y border-border py-4 text-sm sm:grid-cols-2">
                {profile.siteLengthNote && <div><dt className="eyebrow text-muted-foreground">RV / site-length note</dt><dd className="mt-2 leading-6">{profile.siteLengthNote}</dd></div>}
                {profile.generatorRules && <div><dt className="eyebrow text-muted-foreground">Generator note</dt><dd className="mt-2 leading-6">{profile.generatorRules}</dd></div>}
              </dl>}
              {profile.campingNotes.length > 0 && <ul className="mt-5 space-y-2 text-sm leading-6 text-muted-foreground">
                {profile.campingNotes.map((note) => <li key={note} className="flex gap-3"><span aria-hidden className="text-primary">—</span><span>{note}</span></li>)}
              </ul>}
              <div className="mt-5 flex flex-wrap gap-x-6 gap-y-3 text-xs font-semibold uppercase tracking-[0.1em]">
                {profile.sources.map((source) => <a key={source.url} href={source.url} target="_blank" rel="noreferrer noopener" className="border-b border-border pb-1 hover:border-primary hover:text-primary">{source.label}</a>)}
              </div>
            </article>
          );
        })}
      </div>

      <div className="mt-8 border-t border-border pt-6">
        <Link to="/best-places-to-go-camping-in-texas" className="eyebrow border-b border-primary pb-1 text-primary">Compare verified Texas camping & RV destinations →</Link>
      </div>
    </section>
  );
}
