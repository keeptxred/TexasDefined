export type PaintedChurchPersonRole =
  | "architect"
  | "builder"
  | "artist"
  | "decorator"
  | "restorer"
  | "researcher"
  | "clergy-artist"
  | "craftsperson"
  | "studio"
  | "unresolved-attribution";

export type PaintedChurchPerson = {
  slug: string;
  name: string;
  roles: PaintedChurchPersonRole[];
  answer: string;
  significance: string[];
  churchSlugs: string[];
  techniqueSlugs?: string[];
  sourceLabel: string;
  sourceUrl: string;
};
