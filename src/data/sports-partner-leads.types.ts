export type SportsPartnerLeadStatus = 'new' | 'reviewing' | 'contacted' | 'closed';

export type SportsPartnerLead = {
  id: string;
  createdAt: string;
  contactName: string;
  email: string;
  company: string;
  website: string | null;
  message: string;
  sourcePath: string;
  status: SportsPartnerLeadStatus;
};

export type SportsPartnerSourceCount = {
  sourcePath: string;
  count: number;
};

export type SportsPartnerLeadDashboard = {
  generatedAt: string;
  limit: number;
  truncated: boolean;
  leads: SportsPartnerLead[];
  statusCounts: Record<SportsPartnerLeadStatus, number>;
  sourceCounts: SportsPartnerSourceCount[];
};
