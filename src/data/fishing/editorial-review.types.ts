export type FishingEditorialSubmissionStatus = 'new' | 'reviewing' | 'contacted' | 'closed';
export type FishingEditorialSubmissionKind = 'guide-listing' | 'fishing-report';

export interface FishingEditorialSubmission {
  id: string;
  createdAt: string;
  contactName: string;
  email: string;
  company: string;
  website: string | null;
  message: string;
  sourcePath: string;
  status: FishingEditorialSubmissionStatus;
  kind: FishingEditorialSubmissionKind;
}

export interface FishingEditorialReviewDashboard {
  generatedAt: string;
  limit: number;
  truncated: boolean;
  submissions: FishingEditorialSubmission[];
  statusCounts: Record<FishingEditorialSubmissionStatus, number>;
  kindCounts: Record<FishingEditorialSubmissionKind, number>;
}
