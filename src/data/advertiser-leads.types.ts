export type AdvertiserLeadStatus =
  | 'new'
  | 'reviewing'
  | 'contacted'
  | 'approved'
  | 'agreement_sent'
  | 'agreement_signed'
  | 'awaiting_payment'
  | 'paid'
  | 'assets_needed'
  | 'scheduled'
  | 'live'
  | 'completed'
  | 'declined'
  | 'closed';

export type AdvertiserLead = {
  id: string;
  createdAt: string;
  contactName: string;
  email: string;
  phone: string | null;
  company: string;
  website: string | null;
  partnershipType: string;
  targetTexasLocations: string | null;
  requestedTier: 'local' | 'growth' | 'premier' | 'custom' | null;
  billingCycle: 'monthly' | 'annual' | null;
  desiredStartDate: string | null;
  objectives: string;
  notes: string | null;
  sourcePath: string;
  status: AdvertiserLeadStatus;
  advertiserAgreementId: string | null;
};

export type AdvertiserLeadSourceCount = {
  sourcePath: string;
  count: number;
};

export type AdvertiserLeadDashboard = {
  generatedAt: string;
  limit: number;
  truncated: boolean;
  leads: AdvertiserLead[];
  statusCounts: Record<AdvertiserLeadStatus, number>;
  sourceCounts: AdvertiserLeadSourceCount[];
};
