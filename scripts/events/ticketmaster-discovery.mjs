const ENDPOINT = 'https://app.ticketmaster.com/discovery/v2/events.json';

export function officialTicketmasterUrl(value) {
  try {
    const url = new URL(value);
    if (url.protocol !== 'https:' || !['www.ticketmaster.com', 'ticketmaster.com'].includes(url.hostname) || url.username || url.password || url.port || !/\/event\/[A-Za-z0-9]+$/.test(url.pathname)) return null;
    url.search = '';
    url.hash = '';
    return url.toString();
  } catch { return null; }
}

export function normalizeDiscoveryEvent(event, trackingBase) {
  const affiliate = new URL(trackingBase);
  if (affiliate.origin !== 'https://ticketmaster.evyy.net' || !/^\/c\/\d+\/\d+\/4272$/.test(affiliate.pathname) || affiliate.username || affiliate.password) throw new Error('Invalid approved Impact tracking base');
  let destination = event.url;
  // Once the developer profile propagates, Discovery returns an Impact URL.
  // Unwrap only this publisher/program and still validate the final destination.
  try {
    const supplied = new URL(destination);
    if (supplied.origin === affiliate.origin && supplied.pathname === affiliate.pathname && !supplied.username && !supplied.password && supplied.searchParams.getAll('u').length === 1) destination = supplied.searchParams.get('u');
  } catch { return null; }
  const venue = event._embedded?.venues?.[0];
  const start = event.dates?.start;
  const officialUrl = officialTicketmasterUrl(destination);
  if (event.test || !event.id || !event.name || venue?.state?.stateCode !== 'TX' || venue?.country?.countryCode !== 'US' || !venue.city?.name || !officialUrl || start?.dateTBD || start?.dateTBA || !/^\d{4}-\d{2}-\d{2}$/.test(start?.localDate ?? '')) return null;
  affiliate.searchParams.set('u', officialUrl);
  return {
    id: String(event.id), name: String(event.name), startDate: start.localDate,
    startTime: start.timeTBA || start.noSpecificTime ? undefined : start.localTime,
    city: venue.city.name, venue: venue.name ?? '', officialUrl,
    affiliateUrl: affiliate.toString(), status: event.dates?.status?.code ?? 'unknown',
    segment: event.classifications?.[0]?.segment?.name ?? '',
    genre: event.classifications?.[0]?.genre?.name ?? '',
    publicSaleStart: event.sales?.public?.startDateTime,
  };
}

/** Fetch bounded weekly windows, splitting busy windows before the 1,000-result limit. */
export async function fetchTexasEvents({ apiKey, trackingBase, now = new Date(), fetchImpl = fetch, pause = (ms) => new Promise(resolve => setTimeout(resolve, ms)) }) {
  if (!apiKey) throw new Error('TICKETMASTER_API_KEY is required');
  const rows = new Map();
  let requests = 0;
  async function page(start, end, number) {
    if (++requests > 500) throw new Error('Ticketmaster refresh exceeded its request budget');
    await pause(600);
    const url = new URL(ENDPOINT);
    url.search = new URLSearchParams({ apikey: apiKey, countryCode: 'US', stateCode: 'TX', source: 'ticketmaster', locale: 'en-us', size: '200', page: String(number), sort: 'date,asc', includeTBA: 'no', includeTBD: 'no', includeTest: 'no', startDateTime: start.toISOString().replace('.000', ''), endDateTime: end.toISOString().replace('.000', '') }).toString();
    let response;
    try { response = await fetchImpl(url, { signal: AbortSignal.timeout(20000), redirect: 'error' }); }
    catch { throw new Error('Ticketmaster request failed; previous catalog preserved'); }
    if (!response.ok) throw new Error(`Ticketmaster returned HTTP ${response.status}; previous catalog preserved`);
    let data;
    try { data = await response.json(); } catch { throw new Error('Invalid Ticketmaster response'); }
    if (!Number.isInteger(data.page?.totalElements) || !Number.isInteger(data.page?.totalPages) || data.page.totalElements < 0) throw new Error('Missing Ticketmaster pagination metadata');
    const events = data._embedded?.events ?? [];
    if (!Array.isArray(events) || (data.page.totalElements > 0 && events.length === 0)) throw new Error('Incomplete Ticketmaster response');
    return { data, events };
  }
  async function window(start, end) {
    const first = await page(start, end, 0);
    if (first.data.page.totalElements > 1000) {
      const middle = new Date(Math.floor((start.getTime() + end.getTime()) / 2000) * 1000);
      if (middle <= start || middle >= end) throw new Error('Ticketmaster time window exceeds pagination limit');
      await window(start, middle);
      await window(new Date(middle.getTime() + 1000), end);
      return;
    }
    let received = 0;
    for (let index = 0; index < Math.max(1, first.data.page.totalPages); index++) {
      if (index >= 5) throw new Error('Ticketmaster pagination changed during refresh');
      const result = index === 0 ? first : await page(start, end, index);
      if (result.data.page.totalElements !== first.data.page.totalElements) throw new Error('Ticketmaster catalog changed during pagination; retry refresh');
      received += result.events.length;
      for (const event of result.events) {
        const row = normalizeDiscoveryEvent(event, trackingBase);
        if (row) rows.set(row.id, row);
      }
    }
    if (received !== first.data.page.totalElements) throw new Error('Incomplete Ticketmaster pagination; previous catalog preserved');
  }
  const start = Math.floor(now.getTime() / 1000) * 1000;
  const horizon = start + 90 * 86400000;
  for (let time = start; time < horizon; time += 7 * 86400000) await window(new Date(time), new Date(Math.min(time + 7 * 86400000 - 1000, horizon)));
  if (!rows.size) throw new Error('Ticketmaster returned no publishable Texas events; previous catalog preserved');
  return { fetchedAt: now.toISOString(), events: [...rows.values()].sort((a, b) => a.startDate.localeCompare(b.startDate) || a.id.localeCompare(b.id)) };
}
