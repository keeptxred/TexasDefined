import { createServerFn } from '@tanstack/react-start';

const loadTexasHomebuyerJourney = createServerFn({ method: 'GET' }).handler(async () => {
  const { loadTexasHomebuyerJourneyServer } = await import('./texas-homebuyer-journey.server');
  return loadTexasHomebuyerJourneyServer();
});

export function getTexasHomebuyerJourney() {
  return loadTexasHomebuyerJourney();
}
