// Scoped founding-football pilot: uses reviewed Custom advertiser agreements.
// This module must stay out of the shared eager advertising program bundle.
export const footballFoundingPackages = [
  { id: 'school', name: 'School Page Pilot', monthlyPrice: 49, pages: 1, description: 'One selected high-school football team profile.' },
  { id: 'district', name: 'District Football Pilot', monthlyPrice: 99, pages: 3, description: 'One district guide and up to two relevant team profiles.' },
  { id: 'regional', name: 'Regional Football Pilot', monthlyPrice: 149, pages: 6, description: 'Up to six relevant team or district football pages in one market.' },
] as const;
export type FootballFoundingPackageId = typeof footballFoundingPackages[number]['id'];
