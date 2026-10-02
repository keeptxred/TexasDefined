import {
  politicalDestinationsForProfile,
  politicalProfilesForDestination,
} from "@/data/political-historic-site-crosslinks";

type PoliticalHistoricSiteContextProps =
  | { surface: "destination"; slug: string }
  | { surface: "profile"; slug: string };

export function PoliticalHistoricSiteContext(props: PoliticalHistoricSiteContextProps) {
  if (props.surface === "destination") {
    const profiles = politicalProfilesForDestination(props.slug);
    if (!profiles.length) return null;

    return (
      <section className="border-y border-border bg-muted/25">
        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
          <p className="eyebrow text-primary">The people behind the place</p>
          <h2 className="mt-3 font-display text-3xl sm:text-4xl">Continue with the biography</h2>
          <div className="mt-6 grid gap-px bg-border sm:grid-cols-2">
            {profiles.map((profile) => (
              <a
                key={profile.slug}
                href={`/texas-icons/${profile.slug}`}
                className="bg-background p-5 transition-colors hover:bg-muted/40"
              >
                <strong className="font-display text-2xl leading-tight">{profile.label}</strong>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{profile.description}</p>
              </a>
            ))}
          </div>
        </div>
      </section>
    );
  }

  const destinations = politicalDestinationsForProfile(props.slug);
  if (!destinations.length) return null;

  return (
    <section className="grid gap-6 border-b border-border py-10 lg:grid-cols-[14rem_1fr]">
      <div>
        <p className="eyebrow text-primary">Visit the story</p>
        <h2 className="mt-2 font-display text-3xl">Historic places tied to this life</h2>
      </div>
      <div className="grid gap-px bg-border sm:grid-cols-2">
        {destinations.map((destination) => (
          <a
            key={destination.path}
            href={destination.path}
            className="bg-background p-5 transition-colors hover:bg-muted/40"
          >
            <strong className="font-display text-2xl leading-tight">{destination.label}</strong>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">{destination.description}</p>
          </a>
        ))}
      </div>
    </section>
  );
}
