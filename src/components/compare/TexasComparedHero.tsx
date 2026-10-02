import { Container } from "@/components/layout/Container";

const STATE_ABBREVIATIONS: Record<string, string> = {
  Alabama: "AL", Alaska: "AK", Arizona: "AZ", Arkansas: "AR", California: "CA", Colorado: "CO",
  Connecticut: "CT", Delaware: "DE", Florida: "FL", Georgia: "GA", Hawaii: "HI", Idaho: "ID",
  Illinois: "IL", Indiana: "IN", Iowa: "IA", Kansas: "KS", Kentucky: "KY", Louisiana: "LA",
  Maine: "ME", Maryland: "MD", Massachusetts: "MA", Michigan: "MI", Minnesota: "MN", Mississippi: "MS",
  Missouri: "MO", Montana: "MT", Nebraska: "NE", Nevada: "NV", "New Hampshire": "NH", "New Jersey": "NJ",
  "New Mexico": "NM", "New York": "NY", "North Carolina": "NC", "North Dakota": "ND", Ohio: "OH",
  Oklahoma: "OK", Oregon: "OR", Pennsylvania: "PA", "Rhode Island": "RI", "South Carolina": "SC",
  "South Dakota": "SD", Tennessee: "TN", Texas: "TX", Utah: "UT", Vermont: "VT", Virginia: "VA",
  Washington: "WA", "West Virginia": "WV", Wisconsin: "WI", Wyoming: "WY",
};

// MIT-licensed state artwork from coryetzkorn/state-svg-defs, pinned to a fixed revision.
// Individual SVG files are rendered as images so production does not depend on
// cross-origin external <use> fragment behavior.
const STATE_IMAGE_ROOT =
  "https://cdn.jsdelivr.net/gh/coryetzkorn/state-svg-defs@5e5141e6117c793abf1892d0e4c8a4ebb76b032a/SVG";

function StateOutline({ state }: { state: string }) {
  const abbreviation = STATE_ABBREVIATIONS[state];
  if (!abbreviation) return null;

  return (
    <img
      src={`${STATE_IMAGE_ROOT}/${abbreviation}.svg`}
      alt=""
      aria-hidden="true"
      loading="eager"
      decoding="async"
      style={{
        display: "block",
        width: "100%",
        height: "clamp(8rem, 18vw, 16rem)",
        objectFit: "contain",
        opacity: 0.72,
      }}
    />
  );
}

export function TexasComparedHero({ state, reviewedAt }: { state: string; reviewedAt?: string }) {
  return (
    <section className="border-b border-border bg-muted/30 py-14 md:py-20">
      <Container>
        <div className="grid grid-cols-3 items-center gap-4 md:gap-8">
          <div aria-hidden="true"><StateOutline state="Texas" /></div>
          <div className="text-center">
            <p className="eyebrow text-primary">Texas compared</p>
            <h1 className="mt-3 font-display text-3xl leading-none md:text-5xl lg:text-7xl">
              <span className="block">Texas</span>
              <span className="text-primary">vs</span>
              <span className="block">{state}</span>
            </h1>
          </div>
          <div aria-hidden="true"><StateOutline state={state} /></div>
        </div>
        <p className="mx-auto mt-6 max-w-3xl text-center text-lg leading-8 text-muted-foreground">
          A practical side-by-side framework for comparing Texas with {state}, with state-specific context for the places, climate and tradeoffs that make this comparison different from the other 48.
        </p>
        {reviewedAt && <p className="mt-4 text-center text-sm text-muted-foreground">Official-source review updated {reviewedAt}.</p>}
      </Container>
    </section>
  );
}
