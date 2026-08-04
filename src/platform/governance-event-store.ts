import {
  detectOwnershipDrift,
  summarizeGovernanceEvents,
  validateGovernanceEvent,
  type GovernanceEvent,
} from '@/shared/platform-core';

const MAX_EVENTS = 2_000;
const globalStore = globalThis as typeof globalThis & { __texasDefinedGovernanceEvents?: GovernanceEvent[] };

function store() {
  return (globalStore.__texasDefinedGovernanceEvents ??= []);
}

export function appendGovernanceEvent(event: GovernanceEvent) {
  const validation = validateGovernanceEvent(event);
  if (!validation.valid) throw new Error(`Invalid governance event: ${validation.errors.join(' ')}`);
  const events = store();
  if (!events.some((existing) => existing.id === event.id)) events.push(structuredClone(event));
  if (events.length > MAX_EVENTS) events.splice(0, events.length - MAX_EVENTS);
  return event.id;
}

export function governanceHealth() {
  const events = store().map((event) => structuredClone(event));
  const drift = detectOwnershipDrift(events);
  return {
    storage: 'bounded-process-memory',
    persistent: false,
    maxEvents: MAX_EVENTS,
    eventCount: events.length,
    summary: summarizeGovernanceEvents(events),
    ownershipDrift: drift,
    healthy: drift.length === 0,
    privacy: {
      storesArticleBodies: false,
      storesCaptions: false,
      storesReaderIdentifiers: false,
      storesCredentials: false,
    },
  };
}

export function clearGovernanceEventsForTests() {
  globalStore.__texasDefinedGovernanceEvents = [];
}
