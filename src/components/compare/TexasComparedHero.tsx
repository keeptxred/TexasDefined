import { Container } from "@/components/layout/Container";

const STATE_ABBREVIATIONS: Record<string, string> = {
  Alabama: "AL",
  Alaska: "AK",
  Arizona: "AZ",
  Arkansas: "AR",
  California: "CA",
  Colorado: "CO",
  Connecticut: "CT",
  Delaware: "DE",
  Florida: "FL",
  Georgia: "GA",
  Hawaii: "HI",
  Idaho: "ID",
  Illinois: "IL",
  Indiana: "IN",
  Iowa: "IA",
  Kansas: "KS",
  Kentucky: "KY",
  Louisiana: "LA",
  Maine: "ME",
  Maryland: "MD",
  Massachusetts: "MA",
  Michigan: "MI",
  Minnesota: "MN",
  Mississippi: "MS",
  Missouri: "MO",
  Montana: "MT",
  Nebraska: "NE",
  Nevada: "NV",
  "New Hampshire": "NH",
  "New Jersey": "NJ",
  "New Mexico": "NM",
  "New York": "NY",
  "North Carolina": "NC",
  "North Dakota": "ND",
  Ohio: "OH",
  Oklahoma: "OK",
  Oregon: "OR",
  Pennsylvania: "PA",
  "Rhode Island": "RI",
  "South Carolina": "SC",
  "South Dakota": "SD",
  Tennessee: "TN",
  Texas: "TX",
  Utah: "UT",
  Vermont: "VT",
  Virginia: "VA",
  Washington: "WA",
  "West Virginia": "WV",
  Wisconsin: "WI",
  Wyoming: "WY",
};

// MIT-licensed state silhouettes from coryetzkorn/state-svg-defs.
// Keeping the sprite remote avoids adding a large all-state SVG payload to every page bundle.
const STATE_SPRITE_URL =
  "https://raw.githubusercontent.com/coryetzkorn/state-svg-defs/master/state-svg-defs.svg";

type StateOutlineProps = {
  state: string;
  className?: string;
};

function StateOutline({ state, className = "" }: StateOutlineProps) {
  const abbreviation = STATE_ABBREVIATIONS[state];
  if (!abbreviation) return null;

  return (
    <svg
      aria-label={`${state} outline`}
      className={className}
      role="img"
      viewBox="0 0 100 80"
      preserveAspectRatio="xMidYMid meet"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.45"
      strokeLinejoin="round"
      strokeLinecap="round"
    >
      <use href={`${STATE_SPRITE_URL}#icon-state-${abbreviation}`} width="100" height="80" />
    </svg>
  );
}

type TexasComparedHeroProps = {
  state: string;
  reviewedAt?: string;
};

export function TexasComparedHero({ state, reviewedAt }: TexasComparedHeroProps) {
  return (
    <section className="border-b border-border bg-muted/30">
      <Container>
        <div className="grid min-h-[25rem] items-center gap-8 py-12 md:min-h-[30rem] md:grid-cols-[minmax(10rem,1fr)_minmax(20rem,2.35fr)_minmax(10rem,1fr)] md:gap-10 md:py-16 lg:min-h-[33rem] lg:gap-14">
          <div className="order-2 flex justify-center text-foreground/85 md:order-1 md:justify-start" aria-hidden="true">
            <StateOutline state="Texas" className="h-auto w-36 sm:w-44 md:w-full md:max-w-[18rem] lg:max-w-[21rem]" />
          </div>

          <div className="order-1 text-center md:order-2">
            <p className="eyebrow text-primary">Texas compared</p>
            <h1 className="mt-4 font-display text-[clamp(2.9rem,6vw,5.35rem)] leading-[0.92] tracking-[-0.035em]">
              <span className="block sm:inline">Texas</span>{" "}
              <span className="mx-1 inline-block font-display text-[0.58em] italic tracking-normal text-primary sm:mx-2">vs</span>{" "}
              <span className="block sm:inline">{state}</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
              A practical side-by-side framework for comparing Texas with {state}, with state-specific context for the places, climate and tradeoffs that make this comparison different from the other 48.
            </p>
            {reviewedAt && (
              <p className="mt-4 text-sm text-muted-foreground">Official-source review updated {reviewedAt}.</p>
            )}
          </div>

          <div className="order-3 flex justify-center text-foreground/85 md:justify-end" aria-hidden="true">
            <StateOutline state={state} className="h-auto w-36 sm:w-44 md:w-full md:max-w-[18rem] lg:max-w-[21rem]" />
          </div>
        </div>
      </Container>
    </section>
  );
}
