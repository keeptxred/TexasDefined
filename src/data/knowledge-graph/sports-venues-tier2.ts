import type { TexasEntityRecord } from './types';

const checkedAt = '2026-08-13';

type VenueSeed = readonly [
  name: string,
  slug: string,
  countySlug: string,
  region: string,
  officialUrl: string,
  aliases: readonly string[],
  tags: readonly string[],
  city: string,
  draw: string,
];

function venue([name, slug, countySlug, region, officialUrl, aliases, tags, city, draw]: VenueSeed): TexasEntityRecord {
  const tagSet = new Set(tags);
  const context = tagSet.has('golf')
    ? 'Tournament weeks and destination-golf trips bring spectators and golfers from outside the immediate area, while the surrounding course or resort experience makes the venue useful even beyond a single event.'
    : tagSet.has('high-school')
      ? 'Texas high-school football can turn a district stadium into a regional destination on Friday nights and during the UIL playoffs, with visiting families, bands and fans building trips around the game.'
      : tagSet.has('college-baseball')
        ? 'College baseball weekends, rivalry series and postseason play make the ballpark part of a broader campus and city visit rather than simply a local athletic facility.'
        : tagSet.has('motorsports')
          ? 'Track days, race weekends and spectator events give the facility a genuine motorsports-travel role, especially for enthusiasts willing to drive across Texas for a specific event or driving experience.'
          : tagSet.has('equestrian') || tagSet.has('rodeo')
            ? 'Its recurring rodeo, livestock and equestrian calendar brings competitors and spectators from across Texas and neighboring states, making the grounds an important Western-sports travel anchor.'
            : tagSet.has('tournament-complex')
              ? 'Regional and national tournaments bring teams and families into the area for multi-day stays, making nearby lodging, restaurants and attractions a meaningful part of the visitor experience.'
              : 'The venue draws participants and spectators for distinctive sports experiences that can anchor a day trip or weekend and connect naturally with nearby Texas attractions.';

  return {
    id: `sports-venue:${slug}`,
    kind: 'sports-venue',
    name,
    slug,
    aliases: [...aliases],
    description: `${name} in ${city} is a Texas sports destination centered on ${draw}. ${context} Texas Defined includes it in the statewide venue guide to connect the sporting experience with practical trip planning and the surrounding county and region.`,
    countySlug,
    region,
    officialUrl,
    sourceId: 'official-destination-sites',
    sourceConfidence: 'official',
    sourceCheckedAt: checkedAt,
    status: 'active',
    relationships: [{ type: 'located-in-county', targetId: `county:${countySlug}` }],
    tags: ['sports-venue', ...tags],
  };
}

const seeds: VenueSeed[] = [
  // Championship and destination golf
  ['PGA Frisco / Fields Ranch', 'pga-frisco-fields-ranch', 'denton', 'north-texas', 'https://www.pgafrisco.com/', ['PGA Frisco', 'Fields Ranch', 'Fields Ranch East', 'Fields Ranch West'], ['golf', 'pga', 'major-championship', 'resort', 'major-tourist-draw'], 'Frisco', 'Fields Ranch championship golf, the PGA of America campus and destination golf experiences'],
  ['Colonial Country Club', 'colonial-country-club', 'tarrant', 'north-texas', 'https://www.colonialfw.com/', ['Colonial'], ['golf', 'pga-tour', 'charles-schwab-challenge', 'historic', 'major-tourist-draw'], 'Fort Worth', 'the historic Colonial course and the annual PGA TOUR stop in Fort Worth'],
  ['Memorial Park Golf Course', 'memorial-park-golf-course', 'harris', 'gulf-coast', 'https://www.memorialparkgolf.com/', ['Memorial Park GC'], ['golf', 'pga-tour', 'lpga', 'major-championship', 'public-course', 'major-tourist-draw'], 'Houston', "the Texas Children's Houston Open, the Chevron Championship and public championship golf"],
  ['TPC San Antonio', 'tpc-san-antonio', 'bexar', 'south-texas', 'https://tpc.com/sanantonio/', [], ['golf', 'pga-tour', 'valero-texas-open', 'resort', 'major-tourist-draw'], 'San Antonio', 'the Valero Texas Open and destination golf at the Oaks and Canyons courses'],

  // Friday Night Lights destinations
  ['Eagle Stadium', 'eagle-stadium-allen', 'collin', 'north-texas', 'https://www.allenisd.org/page/eagle-stadium', ['Allen Eagle Stadium'], ['high-school', 'football', 'friday-night-lights', 'uil', 'major-tourist-draw'], 'Allen', 'Allen ISD football, playoff games and the outsized Friday-night atmosphere associated with North Texas high-school football'],
  ['McKinney ISD Stadium & Community Event Center', 'mckinney-isd-stadium', 'collin', 'north-texas', 'https://www.mckinneyisd.net/page/mckinney-isd-stadium/', ['MISD Stadium'], ['high-school', 'football', 'friday-night-lights', 'uil', 'major-tourist-draw'], 'McKinney', 'McKinney ISD football, playoff games and large community events'],
  ["Children's Health Stadium at PISD", 'childrens-health-stadium-prosper', 'collin', 'north-texas', 'https://www.prosper-isd.net/page/childrens-health-stadium-at-pisd', ['Prosper ISD Stadium', "Children's Health Stadium"], ['high-school', 'football', 'friday-night-lights', 'uil', 'regional-tourist-draw'], 'Prosper', 'Prosper ISD football, playoff games and district events'],
  ['Legacy Stadium', 'legacy-stadium-katy', 'harris', 'gulf-coast', 'https://www.katyisd.org/athletics/facilities/legacy-stadium', ['Katy ISD Legacy Stadium'], ['high-school', 'football', 'friday-night-lights', 'uil', 'major-tourist-draw'], 'Katy', 'Katy ISD football and Houston-area playoff games in one of the state\'s strongest high-school football markets'],
  ['Ratliff Stadium', 'ratliff-stadium', 'ector', 'west-texas', 'https://www.ectorcountyisd.org/departments/athletics-pe/ratliff-stadium-policy-regulations', [], ['high-school', 'football', 'friday-night-lights', 'uil', 'historic', 'major-tourist-draw'], 'Odessa', 'Permian and Odessa high-school football and the Friday Night Lights identity closely associated with West Texas'],
  ['Cy-Fair Federal Credit Union Stadium', 'cy-fair-fcu-stadium', 'harris', 'gulf-coast', 'https://www.cfisd.net/athletics/facilities/cy-fair-federal-credit-union-stadium', ['Cy-Fair FCU Stadium'], ['high-school', 'football', 'soccer', 'track', 'uil', 'regional-tourist-draw'], 'Cypress', 'CFISD football, soccer, marching and track events'],
  ['Mesquite Memorial Stadium', 'mesquite-memorial-stadium', 'dallas', 'north-texas', 'https://www.mesquiteisd.org/facility-locations', ['Memorial Stadium Mesquite'], ['high-school', 'football', 'soccer', 'uil', 'friday-night-lights', 'regional-tourist-draw'], 'Mesquite', 'Mesquite ISD football, soccer and playoff events'],

  // College baseball destinations
  ['UFCU Disch-Falk Field', 'ufcu-disch-falk-field', 'travis', 'central-texas', 'https://texaslonghorns.com/facilities/ufcu-disch-falk-field/11', ['Disch-Falk Field'], ['college', 'college-baseball', 'baseball', 'sec', 'major-tourist-draw'], 'Austin', 'Texas Longhorns baseball, rivalry weekends and NCAA postseason games'],
  ['Olsen Field at Blue Bell Park', 'olsen-field-blue-bell-park', 'brazos', 'central-texas', 'https://12thman.com/facilities/blue-bell-park', ['Blue Bell Park', 'Olsen Field'], ['college', 'college-baseball', 'baseball', 'sec', 'major-tourist-draw'], 'College Station', 'Texas A&M baseball, SEC series and NCAA postseason baseball'],
  ['Lupton Baseball Stadium at Williams-Reilly Field', 'lupton-stadium', 'tarrant', 'north-texas', 'https://gofrogs.com/sports/2018/7/13/facilities-tcu-facilities-baseball-html', ['Lupton Stadium'], ['college', 'college-baseball', 'baseball', 'big-12', 'major-tourist-draw'], 'Fort Worth', 'TCU baseball, NCAA regionals and super regionals'],
  ['Baylor Ballpark', 'baylor-ballpark', 'mclennan', 'central-texas', 'https://baylorbears.com/sports/2018/5/16/facilities-ballpark-html', [], ['college', 'college-baseball', 'baseball', 'big-12', 'regional-tourist-draw'], 'Waco', 'Baylor Bears baseball and major college baseball weekends'],
  ['Reckling Park', 'reckling-park', 'harris', 'gulf-coast', 'https://riceowls.com/facilities/reckling-park/5', [], ['college', 'college-baseball', 'baseball', 'regional-tourist-draw'], 'Houston', 'Rice Owls baseball, high-level college series and postseason games'],

  // Western sports and large equestrian grounds
  ['Will Rogers Memorial Center', 'will-rogers-memorial-center', 'tarrant', 'north-texas', 'https://www.fortworthtexas.gov/departments/public-events/will-rogers-memorial-center', ['Will Rogers Coliseum'], ['equestrian', 'rodeo', 'livestock', 'western-sports', 'major-tourist-draw'], 'Fort Worth', 'national cutting, reined cow horse, paint horse, stock show and other equestrian competitions'],
  ['Amarillo National Center', 'amarillo-national-center', 'potter', 'panhandle', 'https://www.tristatefair.com/p/rentals/amarillo-national-center', ['ANC'], ['equestrian', 'rodeo', 'livestock', 'western-sports', 'major-tourist-draw'], 'Amarillo', 'large rodeo, ranch-horse, livestock and equestrian events at the Tri-State Fairgrounds'],
  ['Extraco Events Center', 'extraco-events-center', 'mclennan', 'central-texas', 'https://www.extracoeventscenter.com/', ['Extraco Coliseum'], ['equestrian', 'rodeo', 'livestock', 'western-sports', 'major-tourist-draw'], 'Waco', "the Heart O' Texas Fair & Rodeo, equestrian competitions, barrel racing and livestock events"],
  ['Expo Center of Taylor County', 'expo-center-taylor-county', 'taylor', 'west-texas', 'https://www.taylorcountyexpocenter.com/', ['Taylor County Expo Center'], ['equestrian', 'rodeo', 'livestock', 'western-sports', 'major-tourist-draw'], 'Abilene', 'the West Texas Fair & Rodeo, Western Heritage Classic and recurring equine competitions'],

  // Additional motorsports destinations
  ['MSR Houston', 'msr-houston', 'brazoria', 'gulf-coast', 'https://msrhouston.com/', ['MotorSport Ranch Houston'], ['motorsports', 'auto-racing', 'road-course', 'karting', 'regional-tourist-draw'], 'Angleton', 'road-course driving, racing schools, track events and karting'],
  ['Eagles Canyon Raceway', 'eagles-canyon-raceway', 'wise', 'north-texas', 'https://eaglescanyon.com/', ['ECR'], ['motorsports', 'auto-racing', 'road-course', 'track-days', 'regional-tourist-draw'], 'Decatur', 'road-course racing, track days, time trials and enthusiast driving events'],
  ['Xtreme Raceway Park', 'xtreme-raceway-park', 'ellis', 'north-texas', 'https://www.xtremeracewaypark.com/', ['XRP'], ['motorsports', 'auto-racing', 'drag-racing', 'regional-tourist-draw'], 'Ferris', 'drag racing and fan-focused race events south of Dallas'],
  ['Houston Motorsports Park', 'houston-motorsports-park', 'harris', 'gulf-coast', 'https://www.houstonmotorsportspark.com/', ['HMP'], ['motorsports', 'auto-racing', 'drag-racing', 'oval-racing', 'regional-tourist-draw'], 'Houston', 'short-track oval racing, drag racing and recurring grassroots motorsports events'],

  // Distinctive sports-trip anchors and tournament complexes
  ['National Shooting Complex', 'national-shooting-complex', 'bexar', 'south-texas', 'https://nsc.nssa-nsca.org/', ['NSC'], ['shooting-sports', 'skeet', 'sporting-clays', 'championships', 'major-tourist-draw'], 'San Antonio', 'world and national championship skeet and sporting-clays competition'],
  ['Waco Surf', 'waco-surf', 'mclennan', 'central-texas', 'https://wacosurf.com/', ['BSR Surf Resort'], ['action-sports', 'surfing', 'water-sports', 'resort', 'major-tourist-draw'], 'Waco', 'wave-pool surfing, surf instruction, water sports and destination resort experiences'],
  ['Lee and Joe Jamail Texas Swimming Center', 'jamail-texas-swimming-center', 'travis', 'central-texas', 'https://tsc.utexas.edu/', ['Texas Swimming Center', 'Jamail Swim Center'], ['college', 'aquatics', 'swimming', 'diving', 'championships', 'major-tourist-draw'], 'Austin', 'elite swimming and diving meets, university competition and major aquatic championships'],
  ['Round Rock Sports Center', 'round-rock-sports-center', 'williamson', 'central-texas', 'https://rrsportscenter.com/', [], ['tournament-complex', 'youth-sports', 'basketball', 'volleyball', 'indoor-sports', 'regional-tourist-draw'], 'Round Rock', 'regional and national indoor tournaments in basketball, volleyball, martial arts and other sports'],
  ['Round Rock Multipurpose Complex', 'round-rock-multipurpose-complex', 'williamson', 'central-texas', 'https://roundrockmpc.com/', ['RRMPC'], ['tournament-complex', 'youth-sports', 'soccer', 'rugby', 'lacrosse', 'regional-tourist-draw'], 'Round Rock', 'regional and national field-sport tournaments, especially soccer, rugby, lacrosse and football'],
];

export const TEXAS_SPORTS_VENUE_TIER2_ENTITIES: TexasEntityRecord[] = seeds.map(venue);
