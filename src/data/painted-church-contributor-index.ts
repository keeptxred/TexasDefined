import { paintedChurchAuthorityContributors } from "./painted-church-contributors-authority";
import { masonPaintedChurchContributors } from "./painted-church-contributors-mason";
import { paintedChurchPreindexContributors } from "./painted-church-contributors-preindex";
import { paintedChurchRelationshipContributors } from "./painted-church-contributors-relations";
import { paintedChurchWacoContributors } from "./painted-church-contributors-waco";
import { paintedChurchContributors, type PaintedChurchContributor } from "./painted-church-contributors";

/**
 * Public contributor graph. Later authority layers override legacy records by slug.
 * A contributor is not published as a standalone authority entity until at least one
 * verified church relationship exists; research-only names can remain in private/raw data.
 */
export const canonicalPaintedChurchContributors: PaintedChurchContributor[] = [
  ...new Map(
    [
      ...paintedChurchContributors,
      ...paintedChurchAuthorityContributors,
      ...paintedChurchPreindexContributors,
      ...paintedChurchWacoContributors,
      ...masonPaintedChurchContributors,
      ...paintedChurchRelationshipContributors,
    ].map((contributor) => [contributor.slug, contributor]),
  ).values(),
].filter((contributor) => contributor.churchSlugs.length > 0);

export const canonicalPaintedChurchContributorBySlug = new Map(
  canonicalPaintedChurchContributors.map((contributor) => [contributor.slug, contributor]),
);
