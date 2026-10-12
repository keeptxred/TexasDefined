/**
 * Server-only complete school profile payload. Never include the full article
 * manifest in the directory's client JS: the published-team-index is the
 * intentionally tiny allowlist suitable for the frontend and sitemap.
 */
import manifest from './published-team-profiles.json';

export type PublishedSoftballSource = {
  id: string;
  url: string;
  title: string;
  checkedAt: string;
  kind: string;
  evidenceType: 'primary' | 'secondary';
};
export type PublishedSoftballClaim = {
  id: string;
  text: string;
  asOf: string;
  sourceIds: string[];
};
export type PublishedSoftballSection = {
  text: string;
  sourceIds: string[];
};
export type PublishedSoftballMedia = {
  path: string;
  alt: string;
  credit: string;
  sourceUrl: string;
  permissionEvidenceUrl: string;
  rights: string;
  identifiableMinor: boolean;
};
export type PublishedSoftballProfile = {
  slug: string;
  status: 'published';
  ownerApproved: true;
  editor: string;
  title: string;
  canonicalPath: string;
  sport: 'girls-softball';
  season: '2026-27';
  reviewedAt: string;
  uniqueThesis: string;
  identity: {
    uilName: string;
    conference: string;
    district: number;
    region: number;
    schoolOfficialUrl: string;
    city: string;
    county: string;
    schoolDistrict: string;
    mascot: string;
    softballTeamName: string;
  };
  sources: PublishedSoftballSource[];
  claims: PublishedSoftballClaim[];
  sections: Record<string, PublishedSoftballSection>;
  media: PublishedSoftballMedia[];
  relatedPaths: string[];
  correctionsPolicy: string;
  researchAudit: Record<string, unknown>;
};

const approved = (manifest as unknown as { version: number; pages: PublishedSoftballProfile[] }).pages;
const approvedBySlug = new Map(approved.map(p => [p.slug, p]));
export function getPublishedSoftballTeamProfile(slug: string): PublishedSoftballProfile | null {
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) return null;
  return approvedBySlug.get(slug) ?? null;
}
