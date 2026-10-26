import assert from 'node:assert/strict';
import { createServer } from 'vite';
const server = await createServer({ configFile: false, appType: 'custom', logLevel: 'error', server: { middlewareMode: true } });
try {
  const { loadTicketmasterEventsServer, ticketmasterAuthorityGuidePath } = await server.ssrLoadModule('/src/data/events/ticketmaster-events.server.ts');
  const { mergeEventTicketing } = await server.ssrLoadModule('/src/data/events/ticketing.ts');
  const { ticketmasterVenueMatches, ticketmasterShowtimeMatches, ticketmasterIsPrimaryAdmissionTitle } = await server.ssrLoadModule('/src/data/events/ticketmaster-event-match.ts');
  const { matchChristmasTicketmasterPerformance, isReviewedChristmasTicketmasterDoorTime, getChristmasPerformances2026Server, getVerifiedChristmasPerformanceCalendarRecords2026 } = await server.ssrLoadModule('/src/data/events/christmas-performances-2026.server.ts');
  const { hasCompliantMajorEventImageServer } = await server.ssrLoadModule('/src/data/major-event-schema-enrichment.server.ts');
  const { buildTexasEventCarouselItemsServer, buildGlobalEventCalendarServer } = await server.ssrLoadModule('/src/data/events/texas-event-calendar.server.ts');
  const now = new Date();
  const date = now.toISOString().slice(0, 10);
  const event = { id: 'fixture', name: 'Example event', startDate: date, city: 'San Antonio', venue: 'Frost Bank Center', officialUrl: 'https://www.ticketmaster.com/event/ABC123', affiliateUrl: 'https://ticketmaster.evyy.net/c/7758914/264167/4272?u=https%3A%2F%2Fwww.ticketmaster.com%2Fevent%2FABC123', status: 'onsale', segment: 'Sports', genre: '' };
  const catalog = { fetchedAt: now.toISOString(), events: [event] };
  const records = loadTicketmasterEventsServer(catalog, now);
  assert.equal(records.length, 1);
  assert.equal(records[0].venueId, 'sports-venue:frost-bank-center');
  const cta = buildTexasEventCarouselItemsServer(records)[0].ticketCta;
  assert.equal(cta.isAffiliate, true);
  assert.equal(cta.label, 'Find Tickets →');
  assert.ok(cta.rel.includes('sponsored'));
  assert.ok(cta.disclosure);
  assert.equal(ticketmasterAuthorityGuidePath('Amigo Airsho 2026', 'El Paso'), '/event/amigo-airsho');
  assert.equal(ticketmasterAuthorityGuidePath('CAF Wings Over Houston Airshow', 'Houston'), '/event/wings-over-houston-airshow');
  assert.equal(ticketmasterAuthorityGuidePath('Texas Capital Air Show 2026', 'San Marcos'), '/event/texas-capital-air-show');
  assert.equal(ticketmasterAuthorityGuidePath('Bluebonnet Airshow 2027', 'Burnet'), '/event/bluebonnet-airshow');
  assert.equal(ticketmasterAuthorityGuidePath('Wings Over Cowtown Air Show', 'Fort Worth'), '/event/wings-over-cowtown-airshow');
  assert.equal(ticketmasterAuthorityGuidePath('Amigo Airsho 2026', 'Dallas'), undefined);
  assert.equal(ticketmasterAuthorityGuidePath('Fiesta De Palmas - Presented By The City Of Mcallen', 'McAllen'), '/event/fiesta-de-palmas');
  assert.equal(ticketmasterAuthorityGuidePath('South Pole Illuminated Festival 2026 - McAllen Convention Center', 'McAllen'), '/event/south-pole-illuminated-festival');
  assert.equal(ticketmasterAuthorityGuidePath('Bands Of America: San Antonio Super Regional Championship Prelims', 'San Antonio'), '/event/bands-of-america-san-antonio-super-regional');
  assert.equal(ticketmasterAuthorityGuidePath('El Paso Film Festival - Late Night Shorts', 'El Paso'), '/event/el-paso-film-festival');
  assert.equal(ticketmasterAuthorityGuidePath('Way Out West Festival Featuring Cole Swindell', 'El Paso'), '/event/way-out-west-festival-el-paso');
  assert.equal(ticketmasterAuthorityGuidePath('State Fair Classic', 'Dallas'), '/event/state-fair-classic');
  assert.equal(ticketmasterAuthorityGuidePath('Oklahoma Sooners Football vs. Texas Longhorns Football', 'Dallas'), '/event/red-river-rivalry');
  assert.equal(ticketmasterAuthorityGuidePath('Texas Longhorns Football vs. Oklahoma Sooners Football', 'Dallas'), '/event/red-river-rivalry');
  assert.equal(ticketmasterAuthorityGuidePath('Beaumont Comic Con', 'Beaumont'), '/event/beaumont-comic-con');
  assert.equal(ticketmasterAuthorityGuidePath('Eagle Fest Featuring ZZ Top', 'The Woodlands'), '/event/eagle-fest-the-woodlands');
  assert.equal(ticketmasterAuthorityGuidePath('Austin City Limits Festival', 'Austin'), '/event/austin-city-limits-music-festival');
  assert.equal(ticketmasterAuthorityGuidePath('Austin Food + Wine Festival', 'Austin'), '/event/austin-food-wine-festival');
  assert.equal(ticketmasterAuthorityGuidePath('Red Steagall Cowboy Gathering', 'Fort Worth'), '/event/red-steagall-cowboy-gathering');
  assert.equal(ticketmasterAuthorityGuidePath('Nutcracker Market General Admission: Good for ONE Entry', 'Houston'), '/event/houston-ballet-nutcracker-market');
  assert.equal(ticketmasterAuthorityGuidePath('San Antonio Stock Show & Rodeo Haunted Hayrides', 'San Antonio'), '/event/san-antonio-stock-show-rodeo');
  assert.equal(ticketmasterAuthorityGuidePath('Beer Around The World 2026 - Fiesta De Palmas McAllen TX', 'McAllen'), '/event/fiesta-de-palmas');
  assert.equal(ticketmasterAuthorityGuidePath('Bill Pickett Invitational Rodeo', 'Fort Worth'), '/event/bill-pickett-rodeo-fort-worth');
  assert.equal(ticketmasterAuthorityGuidePath('Hollydays Market Corpus Christi Fri. 11-6 through Sun. 11-8, 2026', 'Corpus Christi'), '/event/hollydays-market-corpus-christi');
  assert.equal(ticketmasterAuthorityGuidePath('Wurstfest 2026', 'New Braunfels'), '/event/wurstfest');
  assert.equal(ticketmasterAuthorityGuidePath('Wurstfest', 'Austin'), undefined);
  assert.equal(ticketmasterAuthorityGuidePath('Example concert', 'San Antonio'), undefined);
  for (const slug of [
    'fiesta-de-palmas',
    'south-pole-illuminated-festival',
    'bands-of-america-san-antonio-super-regional',
    'big-12-football-championship',
    'el-paso-film-festival',
    'way-out-west-festival-el-paso',
    'state-fair-classic',
    'beaumont-comic-con',
    'eagle-fest-the-woodlands',
    'bill-pickett-rodeo-fort-worth',
    'hollydays-market-corpus-christi',
  ]) assert.equal(hasCompliantMajorEventImageServer(slug), true, `${slug} must remain indexable with rights-cleared hero provenance`);
  assert.equal(hasCompliantMajorEventImageServer('mcallen-holiday-parade'), false, 'Holiday parade must remain fail-closed until an exact-location or governed AI hero is approved');

  // Never send readers to a different venue because Ticketmaster and an
  // editorial event happened to share a title, city and date.
  assert.equal(ticketmasterVenueMatches(
    { venueName: 'Alley Theatre · Hubbard Theatre' },
    { venueName: 'Alley Theatre' },
  ), true, 'stage within an exact theatre is a valid match');
  assert.equal(ticketmasterVenueMatches(
    { venueName: 'Bruton Theatre' }, { venueName: 'Music Hall at Fair Park' },
  ), false, 'same-name events across venues must never share checkout');
  assert.equal(ticketmasterVenueMatches(
    { venueId: 'sports-venue:dickies-arena', venueName: 'Dickies Arena' },
    { venueId: 'sports-venue:dickies-arena', venueName: 'Dickies Arena, Fort Worth' },
  ), true, 'shared official venue identity permits enrichment');
  assert.equal(ticketmasterVenueMatches(
    { venueId: 'sports-venue:dickies-arena', venueName: 'Dickies Arena' },
    { venueId: 'sports-venue:at-t-stadium', venueName: 'Dickies Arena' },
  ), false, 'conflicting canonical venue IDs must reject even if titles agree');
  assert.equal(ticketmasterVenueMatches(
    { venueId: 'sports-venue:dickies-arena', venueName: 'Dickies Arena' },
    { venueId: 'sports-venue:dickies-arena', venueName: 'Dickies Arena Parking' },
  ), false, 'shared venue ID cannot turn a parking add-on into admission');
  assert.equal(ticketmasterVenueMatches(
    { venueId: 'sports-venue:alley-theatre', venueName: 'Alley Theatre · Hubbard Theatre' },
    { venueId: 'sports-venue:alley-theatre', venueName: 'Alley Theatre · Neuhaus Theatre' },
  ), false, 'same facility ID must not merge tickets for different stages');
  assert.equal(ticketmasterVenueMatches(
    { venueName: '' }, { venueName: 'Dickies Arena' },
  ), false, 'missing venues are not safe to auto-link');
  assert.equal(ticketmasterVenueMatches(
    { venueName: 'Arena' }, { venueName: 'Arena Parking' },
  ), false, 'parking add-ons must not be mistaken for concert admission');

  assert.equal(ticketmasterShowtimeMatches(
    { startTime: '14:00' }, { startTime: '19:00:00' }, 2,
  ), false, '2pm matinee must never be linked to 7pm tickets');
  assert.equal(ticketmasterShowtimeMatches(
    { startTime: '7:00 PM' }, { startTime: '19:00:00' }, 2,
  ), true, '12-hour editorial clock must match provider 24-hour time');
  assert.equal(ticketmasterShowtimeMatches(
    {}, { startTime: '14:00' }, 2,
  ), false, 'unknown editorial time cannot select among two provider showtimes');
  assert.equal(ticketmasterShowtimeMatches(
    {}, { startTime: '14:00' }, 1,
  ), true, 'unique sole event may enrich an undated editorial showtime');
  assert.equal(ticketmasterShowtimeMatches(
    { startTime: '14:00' }, {}, 1,
  ), false, 'specific editorial showtime cannot assume a provider time');
  assert.equal(ticketmasterShowtimeMatches(
    {}, {}, 1,
  ), true, 'one unique time-unspecified performance can still link safely');

  // The provider's suites listing can have the exact same venue, date and
  // showtime as concert admission; it must not become the ticket CTA.
  for (const parkingOnly of [
    'FIFTH THIRD GARAGE: Dallas Stars v New York Islanders',
    '5th Third Garage - Arena Concert',
    'Arena Parking Garage: Pentatonix',
    'Parking Lot: Holiday Concert',
    'Garage: Dallas Stars v New York Islanders',
  ]) assert.equal(ticketmasterIsPrimaryAdmissionTitle(parkingOnly), false,
    'venue garage or parking lot checkout must not masquerade as primary admission: ' + parkingOnly);
  assert.equal(ticketmasterIsPrimaryAdmissionTitle('Suites: Pentatonix: Christmas in the City Tour'), false);
  assert.equal(ticketmasterIsPrimaryAdmissionTitle('Parking: Pentatonix'), false);
  assert.equal(ticketmasterIsPrimaryAdmissionTitle('Fast Lane: Holiday Concert'), false);
  assert.equal(ticketmasterIsPrimaryAdmissionTitle('VIP Upgrade: Holiday Concert'), false);
  assert.equal(ticketmasterIsPrimaryAdmissionTitle("Fast Lane Pass - Grand Ol' Christmas - Not a Concert Ticket"), false);
  assert.equal(ticketmasterIsPrimaryAdmissionTitle("Signed Poster Add-On - Brett Goldstein - Not a Concert Ticket"), false);
  assert.equal(ticketmasterIsPrimaryAdmissionTitle("Pentatonix VIP Upgrade (Event Ticket Not Included)"), false);
  assert.equal(ticketmasterIsPrimaryAdmissionTitle("Parking Pass - Grand Ol' Christmas"), false);
  for (const addOn of [
    "Pentatonix - Parking",
    "Pentatonix Parking Pass",
    "Grand Ol' Christmas VIP Upgrade",
    "Grand Ol' Christmas - Fast Lane Pass",
    "Cirque Musica Quick Pass",
    "A Jazzy Christmas - Suite Ticket",
    "A Christmas Story Meet & Greet Add-On",
    "Cirque Musica - Parking Only",
    "Pentatonix: Parking Tickets",
  ]) {
    assert.equal(ticketmasterIsPrimaryAdmissionTitle(addOn), false,
      'non-admission add-on must never supply a ticket CTA: ' + addOn);
  }
  for (const primary of [
    "Pentatonix: Christmas in the City Tour",
    "The Parking Lot Music Festival",
    "The Fast Lane - Live in Concert",
    "Suite Sounds - Christmas Concert",
    "A Christmas Story",
  ]) assert.equal(ticketmasterIsPrimaryAdmissionTitle(primary), true,
    'genuine concert titles must remain publishable: ' + primary);


  assert.equal(ticketmasterIsPrimaryAdmissionTitle('Pentatonix: Christmas in the City Tour'), true);
  const pentatonixPrimary = {
    ...event, id: 'regular', name: 'Pentatonix: Christmas in the City Tour',
  };
  const pentatonixSuite = {
    ...event, id: 'suite', name: 'Suites: Pentatonix: Christmas in the City Tour',
  };
  const brandedGarage = {
    ...event, id: 'garage', name: 'FIFTH THIRD GARAGE: Dallas Stars v New York Islanders',
  };
  assert.deepEqual(
    loadTicketmasterEventsServer({ fetchedAt: now.toISOString(), events: [brandedGarage, pentatonixSuite, pentatonixPrimary] }, now).map(x => x.id),
    ['ticketmaster:regular'], 'general calendar must not sell private suites as admission',
  );

  // Holiday hub must not choose an arbitrary Ticketmaster showtime or venue.
  const christmasShow = {
    id: 'christmas-story-conroe-2026', date: '2026-12-13',
    city: 'Conroe', venue: 'Crighton Theatre', ticketmasterNeedle: 'a christmas story',
  };
  const holidayTicket = {
    ...records[0], id: 'ticketmaster:holiday-show', title: 'A Christmas Story',
    city: 'Conroe', startDate: '2026-12-13', startTime: '14:00:00',
    venueName: 'Crighton Theatre', venueId: undefined,
  };
  assert.equal(matchChristmasTicketmasterPerformance(christmasShow, [holidayTicket], '2026-10-25')?.id,
    holidayTicket.id, 'exact show, venue and matinee should permit an affiliate match');
  assert.equal(matchChristmasTicketmasterPerformance(christmasShow,
    [{ ...holidayTicket, startTime: '19:00:00' }], '2026-10-25'), undefined,
    'holiday hub must reject an evening ticket for a reviewed 2pm matinee');
  assert.equal(matchChristmasTicketmasterPerformance(christmasShow,
    [{ ...holidayTicket, venueName: 'Crighton Theatre Parking' }], '2026-10-25'), undefined,
    'holiday hub must not sell parking as admission');
  assert.equal(matchChristmasTicketmasterPerformance(christmasShow,
    [{ ...holidayTicket, venueName: 'Other Theatre' }], '2026-10-25'), undefined,
    'holiday hub must not attach the same-title wrong-venue checkout');
  assert.equal(matchChristmasTicketmasterPerformance(christmasShow,
    [holidayTicket, { ...holidayTicket, id: 'ticketmaster:second-show' }], '2026-10-25'), undefined,
    'duplicate matching provider performances require manual confirmation');
  assert.equal(matchChristmasTicketmasterPerformance(christmasShow, [holidayTicket], '2026-12-14'), undefined,
    'never attach a link for the expired featured performance');
  assert.equal(matchChristmasTicketmasterPerformance({
    ...christmasShow, id: 'grinch-dallas-2026',
  }, [holidayTicket], '2026-10-25'), undefined,
    'multiple performances without a single approved time use official organizer selector');

  // Dallas Grand Ol Christmas has a separately confirmed 6pm show/5pm doors
  // listing. Only its exact reviewed Ticketmaster 5pm event may be affiliated.
  const grandOlShow = {
    id: 'grand-ol-christmas-dallas-2026', date: '2026-12-23', city: 'Dallas',
    venue: 'House of Blues Dallas', ticketmasterNeedle: 'grand ol christmas',
  };
  const grandOlProvider = {
    ...holidayTicket, id: 'ticketmaster:grand-ol-dallas',
    title: "Grand Ol' Christmas", city: 'Dallas', startDate: '2026-12-23',
    venueName: 'House of Blues Dallas', startTime: '17:00:00',
  };
  assert.equal(matchChristmasTicketmasterPerformance(grandOlShow, [grandOlProvider], '2026-10-25')?.id,
    grandOlProvider.id, 'reviewed 5pm Ticketmaster doors listing must match the real 6pm show');
  assert.equal(matchChristmasTicketmasterPerformance(grandOlShow,
    [{ ...grandOlProvider, startTime: '18:00:00' }], '2026-10-25'), undefined,
    'do not generalize the Dallas doors exception to unrelated ticket times');

  const reviewedDallas = { slug: 'grand-ol-christmas-dallas-2026', startDate: '2026-12-23', startTime: '18:00' };
  const listedDallas = { startDate: '2026-12-23', startTime: '17:00' };
  assert.equal(isReviewedChristmasTicketmasterDoorTime(reviewedDallas, listedDallas, 1), true,
    'reviewed Dallas 5pm doors listing may merge with the sole 6pm concert without changing its published showtime');
  assert.equal(isReviewedChristmasTicketmasterDoorTime(reviewedDallas, listedDallas, 2), false,
    'never merge a doors-time mismatch when the venue has multiple provider occurrences');
  assert.equal(isReviewedChristmasTicketmasterDoorTime(reviewedDallas, { ...listedDallas, startTime: '15:00' }, 1), false,
    'do not generalize the reviewed exception into a two-hour window');
  assert.equal(isReviewedChristmasTicketmasterDoorTime({ ...reviewedDallas, slug: 'grand-ol-christmas-houston-2026' }, listedDallas, 1), false,
    'a Dallas-specific exception must not leak to Houston');
  assert.equal(isReviewedChristmasTicketmasterDoorTime({ ...reviewedDallas, startDate: '2026-12-22' }, listedDallas, 1), false,
    'the verified date is part of the ticket identity');
  assert.equal(isReviewedChristmasTicketmasterDoorTime({ ...reviewedDallas, startTime: '17:00' }, listedDallas, 1), false,
    'the editorial curtain time must remain verified as 6pm');

  // Exact 2 PM Conroe Etix event is an admission URL for the Dec 13
  // performance only. Do not leave it as the CTA for remaining shows.
  const directConroe = 'https://www.etix.com/ticket/p/62230269/a-christmas-story-conroe-crighton-theatre';
  const conroeSchedule = 'https://www.etix.com/ticket/v/32639/crighton-theatre';
  const conroeRecord = getVerifiedChristmasPerformanceCalendarRecords2026()
    .find(event => event.slug === 'christmas-story-conroe-2026');
  assert.ok(conroeRecord, 'curated Conroe calendar record exists');
  assert.equal(conroeRecord.ticketing.links[0].officialTicketUrl, directConroe);
  const beforeConroe = getChristmasPerformances2026Server(new Date('2026-12-12T18:00:00Z'))
    .find(show => show.id === 'christmas-story-conroe-2026');
  assert.ok(beforeConroe);
  assert.ok(beforeConroe.ticket.href === directConroe || beforeConroe.ticket.isAffiliate,
    'pre-show link is the direct Etix performance or a freshly matched authorized affiliate');
  const afterConroe = getChristmasPerformances2026Server(new Date('2026-12-14T18:00:00Z'))
    .find(show => show.id === 'christmas-story-conroe-2026');
  assert.ok(afterConroe, 'the run stays visible to Dec 20');
  assert.equal(afterConroe.ticket.href, conroeSchedule,
    'after featured date, the remaining run points to the approved theatre selector');

  const editorialTicketing = {
    links: [{
      provider: 'official',
      officialTicketUrl: 'https://example.org/tickets',
      saleStatus: 'unknown',
      source: { kind: 'official-event', name: 'Official organizer', url: 'https://example.org/tickets' },
      lastVerifiedAt: now.toISOString(),
    }],
    offers: [],
  };
  const mergedTicketing = mergeEventTicketing(editorialTicketing, records[0].ticketing);
  assert.equal(mergedTicketing.links.length, 2);
  const mergedCta = buildTexasEventCarouselItemsServer([{ ...records[0], ticketing: mergedTicketing }])[0].ticketCta;
  assert.equal(mergedCta.isAffiliate, true);
  assert.equal(mergedCta.provider, 'ticketmaster');
  const largeCatalog = [...Array.from({ length: 300 }, (_, index) => ({ ...records[0], id: `other-${index}`, city: 'Austin' })), ...records];
  const view = buildGlobalEventCalendarServer(largeCatalog, { featured: '', location: 'city:San Antonio', start: '', end: '', category: '', venue: '' });
  assert.equal(view.results.length, 1);
  assert.equal(view.results[0].id, records[0].id);
  const guideOnly = buildGlobalEventCalendarServer([
    { ...records[0], id: 'guide-example', guidePath: '/event/example' },
    { ...records[0], id: 'calendar-example', guidePath: '/events?start=' + date },
    { ...records[0], id: 'collection-example', guidePath: '/events/this-weekend' },
  ], { featured: '', location: '', start: '', end: '', category: 'guides', venue: '' });
  assert.deepEqual(guideOnly.results.map(row => row.id), ['guide-example']);
  const all = buildGlobalEventCalendarServer(largeCatalog, { featured: '', location: '', start: '', end: '', category: '', venue: '' });
  assert.equal(all.results.length, 48);
  assert.equal(all.totalCount, 301);
  assert.deepEqual(loadTicketmasterEventsServer(catalog, new Date(now.getTime() + 49 * 3600000)), []);
  assert.deepEqual(loadTicketmasterEventsServer({ ...catalog, events: [{ ...event, status: 'cancelled' }] }, now), []);
  // Correct local-day boundary and no stale ticket inventory, even when the
  // Ticketmaster snapshot itself was refreshed only moments ago.
  const texasMorning = new Date('2026-10-21T03:00:00Z'); // Oct 20 at 10pm in Texas
  const midnightCatalog = { fetchedAt: texasMorning.toISOString(), events: [
    { ...event, id: 'yesterday', startDate: '2026-10-19' },
    { ...event, id: 'texas-today', startDate: '2026-10-20' },
    { ...event, id: 'tomorrow', startDate: '2026-10-21' },
    { ...event, id: 'invalid', startDate: 'not-a-date' },
  ] };
  assert.deepEqual(loadTicketmasterEventsServer(midnightCatalog, texasMorning).map(item => item.id),
    ['ticketmaster:texas-today', 'ticketmaster:tomorrow'], 'Texas-local today remains bookable near UTC midnight');
  const nextTexasMorning = new Date('2026-10-21T15:00:00Z');
  const recentCatalog = { ...midnightCatalog, fetchedAt: nextTexasMorning.toISOString() };
  assert.deepEqual(loadTicketmasterEventsServer(recentCatalog, nextTexasMorning).map(item => item.id),
    ['ticketmaster:tomorrow'], 'expired tickets must disappear while fresh future tickets remain');
  assert.deepEqual(loadTicketmasterEventsServer({ ...catalog, events: [{ ...event, city: 'Unknown city' }] }, now), []);
  const offsale = loadTicketmasterEventsServer({ ...catalog, events: [{ ...event, status: 'offsale' }] }, now);
  assert.equal(buildTexasEventCarouselItemsServer(offsale)[0].ticketCta, null);
  console.log('PASS: Ticketmaster records preserve approved affiliate CTAs and reject expired dates with Texas-local time.');
} finally { await server.close(); }
