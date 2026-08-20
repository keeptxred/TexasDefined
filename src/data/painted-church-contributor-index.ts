import { paintedChurchAuthorityContributors } from "./painted-church-contributors-authority";
import { paintedChurchContributors, type PaintedChurchContributor } from "./painted-church-contributors";

export const canonicalPaintedChurchContributors: PaintedChurchContributor[] = [
  ...new Map(
    [...paintedChurchContributors, ...paintedChurchAuthorityContributors].map((contributor) => [contributor.slug, contributor]),
  ).values(),
];

export const canonicalPaintedChurchContributorBySlug = new Map(
  canonicalPaintedChurchContributors.map((contributor) => [contributor.slug, contributor]),
);
