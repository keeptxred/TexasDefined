import { getSportsVenueEditorialDescriptionWave7Server } from './sports-venue-editorial-wave7.server';

const sportsVenueEditorialDescriptionsWave6: Record<string, string> = {
  'sports-venue:pga-frisco-fields-ranch': 'PGA Frisco is a 660-acre public-private golf campus built around Fields Ranch East and West, the PGA of America headquarters, PGA District and Omni resort. Fields Ranch East was designed by Gil Hanse and hosts the 2027 PGA Championship, while Beau Welling designed Fields Ranch West; championship golf and public play define the destination more clearly than generic Frisco sports copy.',
  'sports-venue:will-rogers-memorial-center': 'Will Rogers Memorial Center was built in 1936 and has grown into a 120-acre City of Fort Worth sports, livestock and exhibition campus. Its historic 5,652-seat coliseum, multiple performance arenas, extensive livestock facilities and Cultural District location make building-level event information essential rather than one generic arena description.',
  'sports-venue:united-supermarkets-arena': 'United Supermarkets Arena opened in 1999 as the 15,000-seat United Spirit Arena and took its current name in 2014. It is the Texas Tech home for men’s basketball, women’s basketball and volleyball while also functioning as a major Lubbock concert and commencement venue.',
  'sports-venue:sun-bowl-stadium': 'Sun Bowl Stadium opened in 1963 with 30,000 seats and later expanded to a current official capacity of 45,971. Built into the Franklin Mountains beside the UTEP campus, it remains home to Miner football and the annual Sun Bowl, giving the venue a topographic and bowl-game identity unlike any generic El Paso stadium copy.',
  'sports-venue:don-haskins-center': 'The Don Haskins Center opened as UTEP’s Special Events Center in 1977 and has a 12,000-seat basketball capacity. Its name ties the arena to Hall of Fame coach Don Haskins and the legacy of Texas Western’s 1966 national championship, making that basketball history the central editorial story.',
  'sports-venue:southwest-university-park': 'Southwest University Park opened in 2014 on a compact downtown El Paso site and deliberately draws from Union Depot, rail and local baseball history in its architecture. The Triple-A Chihuahuas’ home pairs mountain and skyline views with a walkable downtown setting, a stronger venue story than generic West Texas sports-destination language.',
  'sports-venue:hodgetown': 'HODGETOWN opened in downtown Amarillo in 2019 after affiliated professional baseball had been absent from the city for 37 years. The approximately 9.6-acre, $45.5 million ballpark was named in recognition of Jerry Hodge and conceived as a Panhandle community gathering place, giving it a specific civic story beyond generic minor-league baseball copy.',
};

export function getSportsVenueEditorialDescriptionWave6Server(id: string) {
  return sportsVenueEditorialDescriptionsWave6[id] ?? getSportsVenueEditorialDescriptionWave7Server(id);
}
