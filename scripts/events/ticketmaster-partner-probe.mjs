const PARTNER_BASE = 'https://app.ticketmaster.com/partners/v1/events';

export const PARTNER_TEST_EVENT_IDS = Object.freeze([
  '000051048D991EE7',
  '1AeZZfEGkD0xtGV',
]);

async function cancelBody(response) {
  try {
    await response.body?.cancel();
  } catch {
    // The probe only needs the HTTP status. Ignore body-cancel failures.
  }
}

export async function probeTicketmasterPartnerApi({
  apiKey,
  eventIds = PARTNER_TEST_EVENT_IDS,
  fetchImpl = fetch,
  timeoutMs = 20_000,
} = {}) {
  if (!apiKey) throw new Error('TICKETMASTER_API_KEY is required');

  const attempts = [];

  for (const eventId of eventIds) {
    const url = new URL(`${PARTNER_BASE}/${encodeURIComponent(eventId)}/availability`);

    let response;
    try {
      response = await fetchImpl(url, {
        method: 'GET',
        headers: {
          accept: 'application/json',
          'x-api-key': apiKey,
        },
        redirect: 'error',
        signal: AbortSignal.timeout(timeoutMs),
      });
    } catch (error) {
      attempts.push({
        eventId,
        status: null,
        outcome: 'network-error',
        message: error instanceof Error ? error.name : 'request-failed',
      });
      continue;
    }

    const attempt = {
      eventId,
      status: response.status,
      outcome: response.ok ? 'available' : 'http-error',
    };
    attempts.push(attempt);
    await cancelBody(response);

    if (response.ok) {
      return { ok: true, eventId, status: response.status, attempts };
    }
  }

  return { ok: false, eventId: null, status: null, attempts };
}

async function main() {
  const result = await probeTicketmasterPartnerApi({
    apiKey: process.env.TICKETMASTER_API_KEY,
  });

  for (const attempt of result.attempts) {
    const status = attempt.status === null ? attempt.message : `HTTP ${attempt.status}`;
    console.log(`Ticketmaster Partner API probe ${attempt.eventId}: ${status}`);
  }

  if (!result.ok) {
    throw new Error(
      'Ticketmaster Partner API availability probe failed for all documented production test events',
    );
  }

  console.log(
    `PASS: Ticketmaster Partner API availability is enabled for test event ${result.eventId} (HTTP ${result.status}).`,
  );
}

if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch(error => {
    console.error(error instanceof Error ? error.message : error);
    process.exitCode = 1;
  });
}
