const ENDPOINT = 'https://app.ticketmaster.com/discovery/v2/events.json';
const DIRECT_TICKETMASTER_HOSTS = new Set(['www.ticketmaster.com', 'ticketmaster.com']);
const APPROVED_IMPACT_HOST = 'ticketmaster.evyy.net';
const APPROVED_TICKETWEB_HOSTS = new Set(['www.ticketweb.com', 'ticketweb.com']);
const APPROVED_IMPACT_PATH = /^\/c\/7758914\/\d+\/4272\/?$/;

function sanitizedHost(url) {
  return url.hostname.toLowerCase().replace(/[^a-z0-9.-]/g, '') || 'unknown';
}

function directTicketmasterUrlRejectionReason(url) {
  if (!['http:', 'https:'].includes(url.protocol)) return 'scheme';
  if (url.username || url.password || url.port) return 'credentials-or-port';
  if (!DIRECT_TICKETMASTER_HOSTS.has(url.hostname.toLowerCase())) return `host-${sanitizedHost(url)}`;
  if (!url.pathname.includes('/event/')) return 'missing-event-segment';
  if (!/\/event\/[A-Za-z0-9_-]+\/?$/.test(url.pathname)) return 'event-path-shape';
  return null;
}

function ticketWebUrlRejectionReason(url) {
  if (!['http:', 'https:'].includes(url.protocol)) return 'scheme';
  if (url.username || url.password || url.port) return 'credentials-or-port';
  if (!APPROVED_TICKETWEB_HOSTS.has(url.hostname.toLowerCase())) return `host-${sanitizedHost(url)}`;
  if (!/^\/event\/[^/]+\/[A-Za-z0-9_-]+\/?$/.test(url.pathname)) return 'ticketweb-event-path-shape';
  return null;
}

function approvedImpactDestination(url) {
  if (url.protocol !== 'https:') return { reason: 'impact-scheme' };
  if (url.username || url.password || url.port) return { reason: 'impact-credentials-or-port' };
  if (!APPROVED_IMPACT_PATH.test(url.pathname)) return { reason: 'impact-path-shape' };

  const destination = url.searchParams.get('u');
  if (!destination) return { reason: 'impact-missing-destination' };

  let official;
  try {
    official = new URL(destination);
  } catch {
    return { reason: 'impact-destination-unparseable' };
  }

  const host = official.hostname.toLowerCase();
  const reason = DIRECT_TICKETMASTER_HOSTS.has(host)
    ? directTicketmasterUrlRejectionReason(official)
    : ticketWebUrlRejectionReason(official);
  if (reason) return { reason: `impact-destination-${reason}` };
  return { official };
}

export function ticketmasterUrlRejectionReason(value) {
  let url;
  try {
    url = new URL(value);
  } catch {
    return 'unparseable';
  }

  if (url.hostname.toLowerCase() === APPROVED_IMPACT_HOST) {
    return approvedImpactDestination(url).reason ?? null;
  }

  return directTicketmasterUrlRejectionReason(url);
}

export function officialTicketmasterUrl(value) {
  if (ticketmasterUrlRejectionReason(value)) return null;

  let url = new URL(value);
  if (url.hostname.toLowerCase() === APPROVED_IMPACT_HOST) {
    url = approvedImpactDestination(url).official;
  }

  url.protocol = 'https:';
  url.pathname = url.pathname.replace(/\/$/, '');
  url.search = '';
  url.hash = '';
  return url.toString();
}

export function ticketmasterEventRejectionReason(event) {
  const venue = event?._embedded?.venues?.[0];
  const start = event?.dates?.start;
  if (event?.test) return 'test-event';
  if (!event?.id || !event?.name) return 'missing-identity';
  if (venue?.state?.stateCode !== 'TX') return 'non-texas-venue';
  if (venue?.country?.countryCode !== 'US') return 'non-us-venue';
  if (!venue?.city?.name) return 'missing-city';
  const ticketUrlReason = ticketmasterUrlRejectionReason(event?.url);
  if (ticketUrlReason) return `ticket-url-${ticketUrlReason}`;
  if (start?.dateTBD || start?.dateTBA) return 'undetermined-date';
  if (!/^\d{4}-\d{2}-\d{2}$/.test(start?.localDate ?? '')) return 'missing-local-date';
  return null;
}

export function normalizeDiscoveryEvent(event, trackingBase) {
  if (ticketmasterEventRejectionReason(event)) return null;
  const venue = event._embedded.venues[0];
  const start = event.dates.start;
  const officialUrl = officialTicketmasterUrl(event.url);
  const affiliate = new URL(trackingBase);
  if (
    affiliate.origin !== 'https://ticketmaster.evyy.net' ||
    !/^\/c\/7758914\/\d+\/4272$/.test(affiliate.pathname) ||
    affiliate.username ||
    affiliate.password
  ) throw new Error('Invalid approved Impact tracking base');
  affiliate.searchParams.set('u', officialUrl);
  return {
    id: String(event.id),
    name: String(event.name),
    startDate: start.localDate,
    startTime: start.timeTBA || start.noSpecificTime ? undefined : start.localTime,
    city: venue.city.name,
    venue: venue.name ?? '',
    officialUrl,
    affiliateUrl: affiliate.toString(),
    status: event.dates?.status?.code ?? 'unknown',
    segment: event.classifications?.[0]?.segment?.name ?? '',
    genre: event.classifications?.[0]?.genre?.name ?? '',
    publicSaleStart: event.sales?.public?.startDateTime,
  };
}

/** Fetch bounded weekly windows, splitting busy windows before the 1,000-result limit. */
export async function fetchTexasEvents({
  apiKey,
  trackingBase,
  now = new Date(),
  fetchImpl = fetch,
  pause = (ms) => new Promise(resolve => setTimeout(resolve, ms)),
}) {
  if (!apiKey) throw new Error('TICKETMASTER_API_KEY is required');

  const rows = new Map();
  const rejectionCounts = new Map();
  let requests = 0;
  let received = 0;

  function recordRejection(reason) {
    rejectionCounts.set(reason, (rejectionCounts.get(reason) ?? 0) + 1);
  }

  async function page(start, end, number) {
    if (++requests > 500) throw new Error('Ticketmaster refresh exceeded its request budget');
    await pause(600);
    const url = new URL(ENDPOINT);
    url.search = new URLSearchParams({
      apikey: apiKey,
      countryCode: 'US',
      stateCode: 'TX',
      locale: 'en-us',
      size: '200',
      page: String(number),
      sort: 'date,asc',
      includeTBA: 'no',
      includeTBD: 'no',
      includeTest: 'no',
      startDateTime: start.toISOString().replace('.000', ''),
      endDateTime: end.toISOString().replace('.000', ''),
    }).toString();

    let response;
    try {
      response = await fetchImpl(url, { signal: AbortSignal.timeout(20000), redirect: 'error' });
    } catch {
      throw new Error('Ticketmaster request failed; previous catalog preserved');
    }

    if (!response.ok) {
      throw new Error(`Ticketmaster returned HTTP ${response.status}; previous catalog preserved`);
    }

    let data;
    try {
      data = await response.json();
    } catch {
      throw new Error('Invalid Ticketmaster response');
    }

    if (
      !Number.isInteger(data.page?.totalElements) ||
      !Number.isInteger(data.page?.totalPages) ||
      data.page.totalElements < 0
    ) throw new Error('Missing Ticketmaster pagination metadata');

    const events = data._embedded?.events ?? [];
    if (!Array.isArray(events) || (data.page.totalElements > 0 && events.length === 0)) {
      throw new Error('Incomplete Ticketmaster response');
    }
    return { data, events };
  }

  async function window(start, end) {
    const first = await page(start, end, 0);
    if (first.data.page.totalElements > 1000) {
      const middle = new Date(Math.floor((start.getTime() + end.getTime()) / 2000) * 1000);
      if (middle <= start || middle >= end) {
        throw new Error('Ticketmaster time window exceeds pagination limit');
      }
      await window(start, middle);
      await window(new Date(middle.getTime() + 1000), end);
      return;
    }

    let pageReceived = 0;
    for (let index = 0; index < Math.max(1, first.data.page.totalPages); index++) {
      if (index >= 5) throw new Error('Ticketmaster pagination changed during refresh');
      const result = index === 0 ? first : await page(start, end, index);
      if (result.data.page.totalElements !== first.data.page.totalElements) {
        throw new Error('Ticketmaster catalog changed during pagination; retry refresh');
      }

      pageReceived += result.events.length;
      received += result.events.length;
      for (const event of result.events) {
        const rejectionReason = ticketmasterEventRejectionReason(event);
        if (rejectionReason) {
          recordRejection(rejectionReason);
          continue;
        }
        const row = normalizeDiscoveryEvent(event, trackingBase);
        if (row) rows.set(row.id, row);
      }
    }

    if (pageReceived !== first.data.page.totalElements) {
      throw new Error('Incomplete Ticketmaster pagination; previous catalog preserved');
    }
  }

  const start = Math.floor(now.getTime() / 1000) * 1000;
  const horizon = start + 90 * 86400000;
  for (let time = start; time < horizon; time += 7 * 86400000) {
    await window(
      new Date(time),
      new Date(Math.min(time + 7 * 86400000 - 1000, horizon)),
    );
  }

  if (!rows.size) {
    const rejected = [...rejectionCounts.entries()]
      .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
      .map(([reason, count]) => `${reason}=${count}`)
      .join(', ');
    const detail = rejected ? `; rejected: ${rejected}` : '';
    throw new Error(
      `Ticketmaster returned no publishable Texas events (received ${received} API events${detail}); previous catalog preserved`,
    );
  }

  return {
    fetchedAt: now.toISOString(),
    events: [...rows.values()].sort(
      (a, b) => a.startDate.localeCompare(b.startDate) || a.id.localeCompare(b.id),
    ),
  };
}
