import { paintedChurchPeople as legacyPaintedChurchPeople } from "./painted-church-people-legacy";
import { preindexPaintedChurchPeople } from "./painted-church-people-preindex";
import { supplementalPreindexPaintedChurchPeople } from "./painted-church-people-preindex-supplemental";
import type { PaintedChurchPerson } from "./painted-church-person-types";

export type { PaintedChurchPerson, PaintedChurchPersonRole } from "./painted-church-person-types";

/** Canonical contributor registry across legacy and pre-index authority research. */
export const paintedChurchPeople: PaintedChurchPerson[] = [
  ...legacyPaintedChurchPeople,
  ...preindexPaintedChurchPeople,
  ...supplementalPreindexPaintedChurchPeople,
];

export const paintedChurchPersonBySlug = new Map(paintedChurchPeople.map((person) => [person.slug, person]));
