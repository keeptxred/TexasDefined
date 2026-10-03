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
const STATE_IMAGE_ROOT =
  "https://cdn.jsdelivr.net/gh/coryetzkorn/state-svg-defs@5e5141e6117c793abf1892d0e4c8a4ebb76b032a/SVG";

function StateOutline({ state }: { state: string }) {
  const abbreviation = STATE_ABBREVIATIONS[state];
  if (!abbreviation) return null;

  const filterId = `texas-compared-outline-${abbreviation}`;

  return (
    <svg
      viewBox="0 0 100 80"
      aria-hidden="true"
      focusable="false"
      style={{
        display: "block",
        width: "100%",
        height: "clamp(8rem, 18vw, 16rem)",
        overflow: "visible",
        color: "currentColor",
        opacity: 0.72,
      }}
    >
      <defs>
        <filter id={filterId} x="-12%" y="-12%" width="124%" height="124%" colorInterpolationFilters="sRGB">
          <feMorphology in="SourceAlpha" operator="dilate" radius="0.65" result="outer" />
          <feMorphology in="SourceAlpha" operator="erode" radius="0.65" result="inner" />
          <feComposite in="outer" in2="inner" operator="out" result="edge" />
          <feFlood floodColor="currentColor" result="ink" />
          <feComposite in="ink" in2="edge" operator="in" />
        </filter>
      </defs>
      <image
        href={`${STATE_IMAGE_ROOT}/${abbreviation}.svg`}
        x="0"
        y="0"
        width="100"
        height="80"
        preserveAspectRatio="xMidYMid meet"
        filter={`url(#${filterId})`}
      />
    </svg>
  );
}

export function TexasComparedHero({ state, reviewedAt }: { state: string; reviewedAt?: string }) {
  return (
    <section className="border-b border-border bg-muted/30 py-14 md:py-20">
      <Container>
        <div className="grid grid-cols-3 items-center gap-4 md:gap-8">
          <div aria-hidden="true" style={{ gridColumn: "1", gridRow: "1", zIndex: 0 }}>
            <StateOutline state="Texas" />
          </div>
          <div
            className="text-center"
            style={{
              gridColumn: "1 / -1",
              gridRow: "1",
              justifySelf: "center",
              maxWidth: "min(76vw, 58rem)",
              zIndex: 1,
            }}
          >
            <p className="eyebrow text-primary">Texas compared</p>
            <h1
              className="mt-3 font-display leading-none"
              style={{
                fontSize: "clamp(2rem, 5vw, 4.5rem)",
                letterSpacing: "-0.035em",
                textTransform: "uppercase",
              }}
            >
              Texas{" "}
              <span className="text-primary" style={{ fontSize: "0.52em", textTransform: "lowercase" }}>
                vs
              </span>{" "}
              {state}
            </h1>
          </div>
          <div aria-hidden="true" style={{ gridColumn: "3", gridRow: "1", zIndex: 0 }}>
            <StateOutline state={state} />
          </div>
        </div>
        <p className="mx-auto mt-6 max-w-3xl text-center text-lg leading-8 text-muted-foreground">
          A practical side-by-side framework for comparing Texas with {state}, with state-specific context for the places, climate and tradeoffs that make this comparison different from the other 48.
        </p>
        {reviewedAt && <p className="mt-4 text-center text-sm text-muted-foreground">Official-source review updated {reviewedAt}.</p>}
      </Container>
    </section>
  );
}
