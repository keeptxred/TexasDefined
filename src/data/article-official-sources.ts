import type { OfficialSource } from '@/components/editorial/OfficialSourcePanel';

export const articleOfficialSources: Record<string, readonly OfficialSource[]> = {
  'how-to-choose-electricity-plan-texas': [
    {
      label: 'Power to Choose',
      href: 'https://www.powertochoose.org/',
      description: 'Compare retail electricity offers and review plan information for eligible Texas addresses.',
    },
    {
      label: 'Public Utility Commission consumer information',
      href: 'https://www.puc.texas.gov/consumer/electricity/',
      description: 'Consumer guidance on electric service, utilities and retail providers in Texas.',
    },
  ],
};
