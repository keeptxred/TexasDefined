import { createServerFn } from '@tanstack/react-start';

export const getTexasFactsData = createServerFn({ method: 'GET' }).handler(async () => {
  const { loadTexasFactsDataServer } = await import('./texas-essential-facts-provenance.server');
  return loadTexasFactsDataServer();
});
