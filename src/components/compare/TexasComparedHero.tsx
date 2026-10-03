import { Container } from "@/components/layout/Container";

const STATE_NAMES = [
  "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware", "Florida", "Georgia",
  "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland",
  "Massachusetts", "Michigan", "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire",
  "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon", "Pennsylvania",
  "Rhode Island", "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington",
  "West Virginia", "Wisconsin", "Wyoming",
];
const STATE_CODES = "ALAKAZARCACOCTDEFLGAHIIDILINIAKSKYLAMEMDMAMIMNMSMOMTNENVNHNJNMNYNCNDOHOKORPARISCSDTNTXUTVTVAWAWVWIWY";
const STATE_SPRITE_PATH = `/media/remote?url=${encodeURIComponent("https://cdn.jsdelivr.net/gh/coryetzkorn/state-svg-defs@5e5141e6117c793abf1892d0e4c8a4ebb76b032a/state-svg-defs.svg")}`;

function StateOutline({ state }: { state: string }) {
  const index = STATE_NAMES.indexOf(state);
  if (index < 0) return null;
  const abbreviation = STATE_CODES.slice(index * 2, index * 2 + 2);

  return (
    <svg
      viewBox="0 0 100 80"
      style={{
        display: "block",
        width: "100%",
        height: "clamp(8rem, 18vw, 16rem)",
        opacity: 0.72,
      }}
    >
      <use
        href={`${STATE_SPRITE_PATH}#icon-state-${abbreviation}`}
        width="100"
        height="80"
        fill="none"
        stroke="currentColor"
        strokeWidth="0.8"
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
