import type { FishingPlacementKind } from '@/data/fishing/types';

export type FishingSponsorStatus = 'prospect' | 'approved' | 'inactive';
export type FishingSponsorPlacementStatus = 'draft' | 'approved' | 'paused' | 'ended';
export type FishingSponsorMetricEvent = 'impression' | 'click';

export type FishingSponsorInventoryItem = {
  kind: FishingPlacementKind;
  label: string;
  description: string;
  standardMonthlyCents: number;
  introMonthlyCents: number;
  maxConcurrent: number;
  exclusive: boolean;
};

export type PublicFishingSponsorPlacement = {
  id: string;
  sponsorName: string;
  kind: FishingPlacementKind;
  surfacePath: string;
  headline: string;
  body: string;
  ctaLabel: string;
  destinationUrl: string;
  priority: number;
  exclusive: boolean;
};

export type FishingSponsorRecord = {
  id: string;
  companyName: string;
  website: string;
  contactEmail: string | null;
  sourceInquiryId: string | null;
  status: FishingSponsorStatus;
  notes: string | null;
  createdAt: string;
  updatedAt: string;
};

export type FishingSponsorPlacementRecord = PublicFishingSponsorPlacement & {
  sponsorId: string;
  status: FishingSponsorPlacementStatus;
  monthlyPriceCents: number | null;
  startsAt: string | null;
  endsAt: string | null;
  renewalAt: string | null;
  approvedAt: string | null;
  createdAt: string;
  updatedAt: string;
  impressions30d: number;
  clicks30d: number;
};

export type FishingSponsorAdminDashboard = {
  generatedAt: string;
  outreachHold: boolean;
  outreachHoldReason: string;
  sponsors: FishingSponsorRecord[];
  placements: FishingSponsorPlacementRecord[];
  inventory: FishingSponsorInventoryItem[];
};
