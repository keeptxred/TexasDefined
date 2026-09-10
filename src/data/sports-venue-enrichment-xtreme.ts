import type { SportsVenueEnrichment } from './sports-venue-enrichment';

const xtremeRacewayPark: SportsVenueEnrichment = {
  city: 'Ferris',
  opened: '2018',
  primaryEvents: [
    'NHRA-sanctioned eighth-mile drag racing',
    'Bracket, index and specialty drag-racing events',
    'Test-and-tune and street-car competition',
  ],
  history: 'Xtreme Raceway Park opened in 2018 as a purpose-built drag-racing facility created by racers for racers and fans. The closure of Texas Raceway accelerated construction of the new Ferris track. In March 2026, Xtreme Raceway Park joined the NHRA Member Track Network in the South Central Division (Division 4).',
  parking: 'Parking, pit access and gate layouts can vary by event. Visitors should check the current event listing before traveling rather than assuming every race uses the same parking and access plan.',
  arrival: 'The track is on the northbound I-45 service road in Ferris. Official directions reference exit 262 when approaching from the Dallas/I-20 direction and exit 263A when coming from Ennis. Allow extra time for ticketing and finding the correct spectator or pit area.',
  stayAndEat: 'Ferris is south of Dallas on I-45, so many visitors can make the track a Dallas-area day trip. Multi-day race visitors can also use lodging and dining options along the Ferris-to-Ennis I-45 corridor.',
  nearby: 'Texas Motorplex in Ennis places Xtreme Raceway Park within one of North Texas\'s most recognizable drag-racing corridors, while Ellis County and the southern Dallas area provide additional trip options.',
  planningLinks: [
    { label: 'Xtreme Raceway Park', url: 'https://www.xtremeracewaypark.com/' },
    { label: 'Track information', url: 'https://www.xtremeracewaypark.com/track-info/' },
    { label: 'Track rules', url: 'https://www.xtremeracewaypark.com/track-rules/' },
    { label: 'NHRA Division 4 member-track listing', url: 'https://www.nhradiv4.com/membertrackinfo?trackID=885' },
  ],
  imageBrief: 'Dedicated TexasDefined AI-created editorial image of Xtreme Raceway Park in Ferris, Texas; drag-racing context only, not an oval track.',
  verifiedAt: '2026-09-10',
};

export function getSportsVenueEnrichmentXtreme(slug: string) {
  return slug === 'xtreme-raceway-park' ? xtremeRacewayPark : undefined;
}
