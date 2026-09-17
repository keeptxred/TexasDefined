export type AdvertiserAgreementStatus = 'pending_publisher_acceptance' | 'accepted' | 'declined' | 'void';
export type AdvertiserPaymentStatus = 'not_started' | 'pending' | 'paid' | 'past_due' | 'waived' | 'refunded' | 'failed';
export type AdvertiserInvoiceStatus = 'not_created' | 'draft' | 'open' | 'paid' | 'void' | 'uncollectible';
export type AdvertiserDisclosureStatus = 'pending' | 'approved' | 'live' | 'not_applicable';
export type AdvertiserTierId = 'local' | 'growth' | 'premier' | 'custom';
export type AdvertiserBillingCycle = 'monthly' | 'annual';

export type AdvertiserOperationsRecord = {
  id: string;
  createdAt: string;
  status: AdvertiserAgreementStatus;
  agreementVersion: string;
  agreementSnapshotSha256: string;
  tier: AdvertiserTierId;
  billingCycle: AdvertiserBillingCycle;
  publishedPriceCents: number | null;
  legalName: string;
  businessName: string;
  signerName: string;
  signerTitle: string;
  signerEmail: string;
  billingEmail: string;
  billingAddress: string;
  companyWebsite: string | null;
  requestedStart: string | null;
  campaignNotes: string | null;
  signerAcceptedAt: string;
  publisherAcceptedAt: string | null;
  publisherAcceptedBy: string | null;
  stripeCustomerId: string | null;
  stripeInvoiceId: string | null;
  stripeSubscriptionId: string | null;
  paymentStatus: AdvertiserPaymentStatus;
  invoiceStatus: AdvertiserInvoiceStatus;
  campaignStartDate: string | null;
  campaignEndDate: string | null;
  destinationUrl: string | null;
  assets: string[];
  placementLocations: string[];
  disclosureStatus: AdvertiserDisclosureStatus;
  internalNotes: string | null;
};

export type AdvertiserOperationsDashboard = {
  generatedAt: string;
  limit: number;
  truncated: boolean;
  agreements: AdvertiserOperationsRecord[];
};
