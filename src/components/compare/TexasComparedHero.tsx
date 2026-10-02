import type { CSSProperties } from "react";

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

// MIT-licensed state silhouettes from coryetzkorn/state-svg-defs, pinned to a
// specific upstream commit so the artwork cannot change beneath published pages.
const STATE_ICON_ROOT =
  "https://cdn.jsdelivr.net/gh/coryetzkorn/state-svg-defs@5e5141e6117c793abf1892d0e4c8a4ebb76b032a/SVG";

type StateOutlineProps = {
  state: string;
  className?: string;
};

function StateOutline({ state, className = "" }: StateOutlineProps) {
  const abbreviation = STATE_ABBREVIATIONS[state];
  if (!abbreviation) return null;

  const url = `${STATE_ICON_ROOT}/${abbreviation}.svg`;
  const maskStyle: CSSProperties = {
    WebkitMaskImage: `url("${url}")`,
    maskImage: `url("${url}")`,
    WebkitMaskPosition: "center",
    maskPosition: "center",
    WebkitMaskRepeat: "no-repeat",
    maskRepeat: "no-repeat",
    WebkitMaskSize: "contain",
    maskSize: "contain",
  };

  return (
    <div className={`relative aspect-[5/4] ${className}`}>
      <span className="absolute inset-0 bg-foreground/85" style={maskStyle} />
      <span className="absolute inset-[3px] bg-background sm:inset-1" style={maskStyle} />
    </div>
  );
}

type TexasComparedHeroProps = {
  state: string;
  reviewedAt?: string;
};

export function TexasComparedHero({ state, reviewedAt }: TexasComparedHeroProps) {
  return (
    <section className="border-b border-border bg-background">
      <Container>
        <div className="grid min-h-[25rem] items-center gap-8 py-12 md:min-h-[30rem] md:grid-cols-[minmax(10rem,1fr)_minmax(20rem,2.35fr)_minmax(10rem,1fr)] md:gap-10 md:py-16 lg:min-h-[33rem] lg:gap-14">
          <div className="order-2 flex justify-center md:order-1 md:justify-start" aria-hidden="true">
            <StateOutline state="Texas" className="w-36 sm:w-44 md:w-full md:max-w-[18rem] lg:max-w-[21rem]" />
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

          <div className="order-3 flex justify-center md:justify-end" aria-hidden="true">
            <StateOutline state={state} className="w-36 sm:w-44 md:w-full md:max-w-[18rem] lg:max-w-[21rem]" />
          </div>
        </div>
      </Container>
    </section>
  );
}
