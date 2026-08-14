export type SportsSponsorStatus = 'prospect' | 'approved' | 'inactive';
export type SportsSponsorPlacementStatus = 'draft' | 'approved' | 'paused' | 'ended';
export type SportsSponsorMetricEvent = 'impression' | 'click';

export type PublicSportsSponsorPlacement = {
  id: string;
  sponsorName: string;
  surfacePath: string;
  headline: string;
  body: string;
  ctaLabel: string;
  destinationUrl: string;
};

export type SportsSponsorRecord = {
  id: string;
  companyName: string;
  website: string;
  contactEmail: string | null;
  sourceInquiryId: string | null;
  status: SportsSponsorStatus;
  notes: string | null;
  createdAt: string;
  updatedAt: string;
};

export type SportsSponsorPlacementRecord = PublicSportsSponsorPlacement & {
  sponsorId: string;
  status: SportsSponsorPlacementStatus;
  startsAt: string | null;
  endsAt: string | null;
  approvedAt: string | null;
  createdAt: string;
  updatedAt: string;
  impressions30d: number;
  clicks30d: number;
};

export type SportsSponsorAdminDashboard = {
  generatedAt: string;
  sponsors: SportsSponsorRecord[];
  placements: SportsSponsorPlacementRecord[];
};
