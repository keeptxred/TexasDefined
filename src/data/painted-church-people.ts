import { paintedChurchCoreGapPeople } from "./painted-church-people-core-gaps";
import { paintedChurchPeople as legacyPaintedChurchPeople } from "./painted-church-people-legacy";
import { masonPaintedChurchPeople } from "./painted-church-people-mason";
import { immaculateHeartOfMaryPeople } from "./painted-church-people-preindex-ihm";
import { preindexPaintedChurchPeople } from "./painted-church-people-preindex";
import { supplementalPreindexPaintedChurchPeople } from "./painted-church-people-preindex-supplemental";
import { paintedChurchRegisterGapPeople } from "./painted-church-people-register-gaps";
import type { PaintedChurchPerson } from "./painted-church-person-types";

export type { PaintedChurchPerson, PaintedChurchPersonRole } from "./painted-church-person-types";

/** Canonical contributor registry across legacy and pre-index authority research. */
export const paintedChurchPeople: PaintedChurchPerson[] = [
  ...legacyPaintedChurchPeople,
  ...preindexPaintedChurchPeople,
  ...supplementalPreindexPaintedChurchPeople,
  ...immaculateHeartOfMaryPeople,
  ...masonPaintedChurchPeople,
  ...paintedChurchCoreGapPeople,
  ...paintedChurchRegisterGapPeople,
];

export const paintedChurchPersonBySlug = new Map(paintedChurchPeople.map((person) => [person.slug, person]));
