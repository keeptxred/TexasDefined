import type { TexasEntityRecord } from './types';

const checkedAt = '2026-08-13';
type VenueSeed = readonly [name: string, slug: string, countySlug: string, region: string, officialUrl: string, aliases: readonly string[], tags: readonly string[], city: string, draw: string];

function venue([name, slug, countySlug, region, officialUrl, aliases, tags, city, draw]: VenueSeed): TexasEntityRecord {
  const tagSet = new Set(tags);
  const visitorContext = tagSet.has('motorsports')
    ? 'It belongs in a statewide Texas motorsports itinerary and is a destination people often plan a full race weekend around.'
    : tagSet.has('horse-racing')
      ? "It is one of the state's established racing destinations and can anchor a day trip or weekend built around live racing and nearby attractions."
      : tagSet.has('rodeo') || tagSet.has('equestrian') || tagSet.has('western-sports')
        ? 'Its calendar ties directly into Texas rodeo, livestock, equestrian and Western-sport tourism, making the venue itself part of the travel experience.'
        : tagSet.has('minor-league')
          ? 'Its smaller scale and local setting make it especially useful for family trips, regional sports weekends and pairing a game with nearby food and attractions.'
          : tagSet.has('college')
            ? 'Game days draw alumni and visiting fans from across Texas, making the surrounding campus, tailgating traditions and nearby districts part of the destination.'
            : 'The venue draws traveling fans for marquee games and events and is a natural anchor for nearby hotels, restaurants, attractions and event-weekend planning.';
  return {
    id: `sports-venue:${slug}`, kind: 'sports-venue', name, slug, aliases: [...aliases],
    description: `${name} in ${city} is a major Texas sports and event destination centered on ${draw}. ${visitorContext} Texas Defined tracks it as a visitor-facing venue so readers can connect the event experience with the surrounding city and county.`,
    countySlug, region, officialUrl, sourceId: 'official-destination-sites', sourceConfidence: 'official', sourceCheckedAt: checkedAt, status: 'active',
    relationships: [{ type: 'located-in-county', targetId: `county:${countySlug}` }], tags: ['sports-venue', ...tags],
  };
}

const seeds: VenueSeed[] = [
  ['AT&T Stadium', 'att-stadium', 'tarrant', 'north-texas', 'https://attstadium.com/', ['Cowboys Stadium'], ['professional', 'football', 'nfl', 'major-tourist-draw'], 'Arlington', 'the Dallas Cowboys'],
  ['Globe Life Field', 'globe-life-field', 'tarrant', 'north-texas', 'https://globelifefield.com/', [], ['professional', 'baseball', 'mlb', 'major-tourist-draw'], 'Arlington', 'the Texas Rangers'],
  ['American Airlines Center', 'american-airlines-center', 'dallas', 'north-texas', 'https://www.americanairlinescenter.com/', ['AAC'], ['professional', 'basketball', 'hockey', 'nba', 'nhl', 'wnba', 'major-tourist-draw'], 'Dallas', 'the Dallas Mavericks and Dallas Stars, with select Dallas Wings games'],
  ['Toyota Stadium', 'toyota-stadium-frisco', 'collin', 'north-texas', 'https://www.toyotastadium.com/', [], ['professional', 'soccer', 'mls', 'major-tourist-draw'], 'Frisco', 'FC Dallas and major soccer events'],
  ['Dickies Arena', 'dickies-arena', 'tarrant', 'north-texas', 'https://dickiesarena.com/', [], ['arena', 'rodeo', 'basketball', 'concerts', 'major-tourist-draw'], 'Fort Worth', 'major rodeo, sports, concert and touring events'],
  ['Cotton Bowl Stadium', 'cotton-bowl-stadium', 'dallas', 'north-texas', 'https://www.fairparkdallas.com/venues/cotton-bowl-stadium', ['Cotton Bowl'], ['football', 'soccer', 'historic', 'major-tourist-draw'], 'Dallas', 'major football, soccer and special events at Fair Park'],
  ['Choctaw Stadium', 'choctaw-stadium', 'tarrant', 'north-texas', 'https://globelifefield.com/choctaw-stadium/', ['Globe Life Park', 'The Ballpark in Arlington'], ['football', 'soccer', 'historic', 'major-tourist-draw'], 'Arlington', 'sports and special events in the former Texas Rangers ballpark'],
  ['Ford Center at The Star', 'ford-center-at-the-star', 'collin', 'north-texas', 'https://www.thestarinfrisco.com/ford-center/', ['Ford Center'], ['football', 'indoor-sports', 'cowboys', 'major-tourist-draw'], 'Frisco', 'Dallas Cowboys practices, high-school football and major indoor events'],
  ['College Park Center', 'college-park-center', 'tarrant', 'north-texas', 'https://utamavs.com/facilities/college-park-center/1', [], ['basketball', 'wnba', 'college', 'major-tourist-draw'], 'Arlington', 'UT Arlington basketball and Dallas Wings home games'],
  ['Comerica Center', 'comerica-center', 'collin', 'north-texas', 'https://www.comericacenter.com/', ['Dr Pepper Arena'], ['basketball', 'hockey', 'indoor-sports', 'regional-tourist-draw'], 'Frisco', 'Texas Legends basketball, youth hockey and touring events'],
  ['Amon G. Carter Stadium', 'amon-g-carter-stadium', 'tarrant', 'north-texas', 'https://gofrogs.com/facilities/amon-g-carter-stadium/1', ['Amon Carter Stadium'], ['college', 'football', 'big-12', 'major-tourist-draw'], 'Fort Worth', 'TCU Horned Frogs football'],
  ['Gerald J. Ford Stadium', 'gerald-j-ford-stadium', 'dallas', 'north-texas', 'https://smumustangs.com/facilities/gerald-j-ford-stadium/3', ['Ford Stadium'], ['college', 'football', 'acc', 'major-tourist-draw'], 'University Park', 'SMU Mustangs football'],
  ['DATCU Stadium', 'datcu-stadium', 'denton', 'north-texas', 'https://meangreensports.com/facilities/datcu-stadium/5', ['Apogee Stadium'], ['college', 'football', 'major-tourist-draw'], 'Denton', 'North Texas Mean Green football'],
  ['Riders Field', 'riders-field', 'collin', 'north-texas', 'https://www.milb.com/frisco/ballpark', ['Dr Pepper Ballpark'], ['minor-league', 'baseball', 'regional-tourist-draw'], 'Frisco', 'Frisco RoughRiders baseball'],
  ['Lone Star Park', 'lone-star-park', 'dallas', 'north-texas', 'https://www.lonestarpark.com/', ['Lone Star Park at Grand Prairie'], ['horse-racing', 'racing', 'major-tourist-draw'], 'Grand Prairie', 'live Thoroughbred and Quarter Horse racing'],
  ['Texas Motor Speedway', 'texas-motor-speedway', 'denton', 'north-texas', 'https://www.texasmotorspeedway.com/', ['TMS'], ['motorsports', 'auto-racing', 'nascar', 'major-tourist-draw'], 'Fort Worth', 'major stock-car and motorsports weekends'],
  ['Cowtown Coliseum', 'cowtown-coliseum', 'tarrant', 'north-texas', 'https://www.cowtowncoliseum.com/', [], ['rodeo', 'western-sports', 'historic', 'major-tourist-draw'], 'Fort Worth', 'year-round rodeo and Western sports in the Stockyards'],
  ['Credit Union of Texas Event Center', 'credit-union-of-texas-event-center', 'collin', 'north-texas', 'https://www.cutxeventcenter.com/', ['Allen Event Center'], ['arena', 'indoor-sports', 'regional-tourist-draw'], 'Allen', 'sports, skating, concerts and touring events'],
  ['Moody Coliseum', 'moody-coliseum-smu', 'dallas', 'north-texas', 'https://smumustangs.com/facilities/moody-coliseum/5', [], ['college', 'basketball', 'arena', 'regional-tourist-draw'], 'University Park', 'SMU basketball and campus events'],
  ['UNT Coliseum', 'unt-coliseum', 'denton', 'north-texas', 'https://meangreensports.com/facilities/the-super-pit/6', ['The Super Pit', 'Super Pit'], ['college', 'basketball', 'arena', 'regional-tourist-draw'], 'Denton', 'North Texas basketball and major campus events'],
  ['Daikin Park', 'daikin-park', 'harris', 'gulf-coast', 'https://www.mlb.com/astros/ballpark', ['Minute Maid Park', 'Enron Field'], ['professional', 'baseball', 'mlb', 'major-tourist-draw'], 'Houston', 'the Houston Astros'],
  ['Toyota Center', 'toyota-center-houston', 'harris', 'gulf-coast', 'https://www.toyotacenter.com/', [], ['professional', 'basketball', 'nba', 'arena', 'major-tourist-draw'], 'Houston', 'the Houston Rockets and major touring events'],
  ['Shell Energy Stadium', 'shell-energy-stadium', 'harris', 'gulf-coast', 'https://www.shellenergystadium.com/', ['BBVA Stadium', 'PNC Stadium'], ['professional', 'soccer', 'mls', 'nwsl', 'major-tourist-draw'], 'Houston', 'Houston Dynamo FC, Houston Dash and other field events'],
  ['TDECU Stadium', 'tdecu-stadium', 'harris', 'gulf-coast', 'https://uhcougars.com/sports/2018/6/12/TDECU-Stadium-Info-html', [], ['college', 'football', 'big-12', 'major-tourist-draw'], 'Houston', 'University of Houston football'],
  ['Fertitta Center', 'fertitta-center', 'harris', 'gulf-coast', 'https://uhcougars.com/facilities/fertitta-center/4', ['Hofheinz Pavilion'], ['college', 'basketball', 'arena', 'major-tourist-draw'], 'Houston', 'University of Houston basketball and volleyball'],
  ['Rice Stadium', 'rice-stadium', 'harris', 'gulf-coast', 'https://riceowls.com/facilities/rice-stadium/3', [], ['college', 'football', 'historic', 'regional-tourist-draw'], 'Houston', 'Rice Owls football and major campus events'],
  ['Constellation Field', 'constellation-field', 'fort-bend', 'gulf-coast', 'https://www.milb.com/sugar-land/ballpark', [], ['minor-league', 'baseball', 'regional-tourist-draw'], 'Sugar Land', 'Sugar Land Space Cowboys baseball'],
  ['Sam Houston Race Park', 'sam-houston-race-park', 'harris', 'gulf-coast', 'https://www.shrp.com/', ['SHRP'], ['horse-racing', 'racing', 'major-tourist-draw'], 'Houston', 'live horse racing and racing-related events'],
  ['Moody Center', 'moody-center', 'travis', 'central-texas', 'https://moodycenteratx.com/', [], ['arena', 'college', 'basketball', 'concerts', 'major-tourist-draw'], 'Austin', 'Texas Longhorns basketball plus major concerts and touring events'],
  ['Q2 Stadium', 'q2-stadium', 'travis', 'central-texas', 'https://www.q2stadium.com/', [], ['professional', 'soccer', 'mls', 'major-tourist-draw'], 'Austin', 'Austin FC and major soccer events'],
  ['Circuit of The Americas', 'circuit-of-the-americas', 'travis', 'central-texas', 'https://circuitoftheamericas.com/', ['COTA', 'Circuit of the Americas'], ['motorsports', 'auto-racing', 'formula-1', 'motogp', 'major-tourist-draw'], 'Austin', 'Formula 1, MotoGP and other major motorsports and entertainment events'],
  ['Darrell K Royal–Texas Memorial Stadium', 'darrell-k-royal-texas-memorial-stadium', 'travis', 'central-texas', 'https://texaslonghorns.com/facilities/darrell-k-royal-texas-memorial-stadium/8', ['DKR', 'Texas Memorial Stadium'], ['college', 'football', 'sec', 'major-tourist-draw'], 'Austin', 'Texas Longhorns football'],
  ['H-E-B Center at Cedar Park', 'heb-center-at-cedar-park', 'williamson', 'central-texas', 'https://www.hebcenter.com/', ['Cedar Park Center'], ['arena', 'hockey', 'basketball', 'rodeo', 'major-tourist-draw'], 'Cedar Park', 'Texas Stars hockey, Austin Spurs basketball, rodeo and touring events'],
  ['Dell Diamond', 'dell-diamond', 'williamson', 'central-texas', 'https://www.milb.com/round-rock/ballpark', [], ['minor-league', 'baseball', 'major-tourist-draw'], 'Round Rock', 'Round Rock Express baseball and regional events'],
  ['UFCU Stadium', 'ufcu-stadium', 'hays', 'central-texas', 'https://txst.com/facilities/ufcu-stadium/1', ['Bobcat Stadium'], ['college', 'football', 'major-tourist-draw'], 'San Marcos', 'Texas State Bobcats football'],
  ['McLane Stadium', 'mclane-stadium', 'mclennan', 'central-texas', 'https://mclanestadium.com/', [], ['college', 'football', 'big-12', 'major-tourist-draw'], 'Waco', 'Baylor Bears football on the Brazos River'],
  ['Foster Pavilion', 'foster-pavilion', 'mclennan', 'central-texas', 'https://baylorbears.com/facilities/foster-pavilion/40', [], ['college', 'basketball', 'arena', 'major-tourist-draw'], 'Waco', 'Baylor men\'s and women\'s basketball'],
  ['Kyle Field', 'kyle-field', 'brazos', 'central-texas', 'https://12thman.com/facilities/kyle-field/1', [], ['college', 'football', 'sec', 'major-tourist-draw'], 'College Station', 'Texas A&M Aggies football'],
  ['Reed Arena', 'reed-arena', 'brazos', 'central-texas', 'https://12thman.com/facilities/reed-arena/3', [], ['college', 'basketball', 'arena', 'major-tourist-draw'], 'College Station', 'Texas A&M basketball and major campus events'],
  ['Frost Bank Center', 'frost-bank-center', 'bexar', 'south-texas', 'https://www.frostbankcenter.com/', ['AT&T Center'], ['professional', 'basketball', 'nba', 'arena', 'major-tourist-draw'], 'San Antonio', 'the San Antonio Spurs and major arena events'],
  ['Alamodome', 'alamodome', 'bexar', 'south-texas', 'https://www.alamodome.com/', [], ['football', 'college', 'concerts', 'major-tourist-draw'], 'San Antonio', 'UTSA football, major football games, concerts and large touring events'],
  ['Freeman Coliseum', 'freeman-coliseum', 'bexar', 'south-texas', 'https://www.freemancoliseum.com/', [], ['arena', 'rodeo', 'livestock', 'major-tourist-draw'], 'San Antonio', 'rodeo, livestock, sports and entertainment events'],
  ['Nelson W. Wolff Municipal Stadium', 'nelson-wolff-stadium', 'bexar', 'south-texas', 'https://www.milb.com/san-antonio/ballpark', ['Wolff Stadium'], ['minor-league', 'baseball', 'regional-tourist-draw'], 'San Antonio', 'San Antonio Missions baseball'],
  ['Retama Park', 'retama-park', 'bexar', 'south-texas', 'https://www.retamapark.com/', [], ['horse-racing', 'racing', 'regional-tourist-draw'], 'Selma', 'live and simulcast horse racing'],
  ['Jones AT&T Stadium', 'jones-att-stadium', 'lubbock', 'south-plains', 'https://texastech.com/facilities/jones-at-t-stadium/2', ['Jones Stadium'], ['college', 'football', 'big-12', 'major-tourist-draw'], 'Lubbock', 'Texas Tech Red Raiders football'],
  ['United Supermarkets Arena', 'united-supermarkets-arena', 'lubbock', 'south-plains', 'https://www.depts.ttu.edu/unitedsupermarketsarena/', ['United Spirit Arena'], ['college', 'basketball', 'arena', 'major-tourist-draw'], 'Lubbock', 'Texas Tech basketball and major West Texas arena events'],
  ['Sun Bowl Stadium', 'sun-bowl-stadium', 'el-paso', 'west-texas', 'https://utepminers.com/facilities/sun-bowl/2', ['Sun Bowl'], ['college', 'football', 'bowl-game', 'major-tourist-draw'], 'El Paso', 'UTEP football and the annual Sun Bowl'],
  ['Don Haskins Center', 'don-haskins-center', 'el-paso', 'west-texas', 'https://utepminers.com/facilities/don-haskins-center/1', [], ['college', 'basketball', 'arena', 'major-tourist-draw'], 'El Paso', 'UTEP basketball and major indoor entertainment events'],
  ['Southwest University Park', 'southwest-university-park', 'el-paso', 'west-texas', 'https://www.milb.com/el-paso/ballpark', [], ['minor-league', 'baseball', 'major-tourist-draw'], 'El Paso', 'El Paso Chihuahuas baseball in downtown El Paso'],
  ['HODGETOWN', 'hodgetown', 'potter', 'panhandle', 'https://www.milb.com/amarillo/ballpark', [], ['minor-league', 'baseball', 'major-tourist-draw'], 'Amarillo', 'Amarillo Sod Poodles baseball and downtown events'],
  ['Momentum Bank Ballpark', 'momentum-bank-ballpark', 'midland', 'west-texas', 'https://www.milb.com/midland/ballpark', ['Security Bank Ballpark'], ['minor-league', 'baseball', 'regional-tourist-draw'], 'Midland', 'Midland RockHounds baseball'],
  ['Whataburger Field', 'whataburger-field', 'nueces', 'gulf-coast', 'https://www.milb.com/corpus-christi/ballpark', [], ['minor-league', 'baseball', 'major-tourist-draw'], 'Corpus Christi', 'Corpus Christi Hooks baseball on the waterfront'],
  ['Elliott T. Bowers Stadium', 'bowers-stadium', 'walker', 'east-texas', 'https://gobearkats.com/facilities/elliott-t-bowers-stadium/2', ['Bowers Stadium'], ['college', 'football', 'regional-tourist-draw'], 'Huntsville', 'Sam Houston Bearkats football'],
  ['Texas Motorplex', 'texas-motorplex', 'ellis', 'north-texas', 'https://www.texasmotorplex.com/', [], ['motorsports', 'drag-racing', 'nhra', 'major-tourist-draw'], 'Ennis', 'major drag-racing events, including NHRA competition'],
  ['Will Rogers Memorial Center', 'will-rogers-memorial-center', 'tarrant', 'north-texas', 'https://www.fortworthtexas.gov/departments/public-events/will-rogers-memorial-center', ['Will Rogers Center'], ['equestrian', 'rodeo', 'western-sports', 'major-tourist-draw'], 'Fort Worth', 'major equestrian, livestock, rodeo and Western-sport events'],
];

export const MAJOR_TEXAS_SPORTS_VENUES: TexasEntityRecord[] = seeds.map(venue);
