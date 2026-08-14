import { createServerFn } from '@tanstack/react-start';

import { loadTexasCountyHousingCostsServer } from '@/data/acs-county-housing-costs.server';

export const getTexasCountyHousingCosts = createServerFn({ method: 'GET' }).handler(async () => {
  return loadTexasCountyHousingCostsServer();
});
