import type { TexasEntityRecord } from './types';

const checkedAt = '2026-08-13';
const genericSportsVenueTrackingSentence = ' Texas Defined tracks it as a visitor-facing venue so readers can connect the event experience with the surrounding city and county.';

const sportsVenueEditorialDescriptions: Record<string, string> = {
  'sports-venue:att-stadium': 'AT&T Stadium is the Dallas Cowboys’ home in Arlington and the centerpiece of one of Texas’s densest big-event districts. NFL Sundays, college football, stadium tours, concerts and special events all pull visitors into the same Arlington corridor as Globe Life Field, making parking strategy and the surrounding entertainment district part of the experience.',
  'sports-venue:daikin-park': 'Daikin Park has anchored Houston Astros baseball in downtown Houston since 2000, combining a retractable-roof ballpark with the preserved Union Station setting. The venue took the Daikin Park name for the 2025 season, while its downtown location keeps games closely tied to Houston hotels, restaurants, Discovery Green and the convention district.',
  'sports-venue:toyota-stadium-frisco': 'Toyota Stadium is FC Dallas’s soccer home in Frisco and one of the early generation of Major League Soccer’s soccer-specific stadiums. Opened in 2005, it is now moving through a $182 million phased modernization scheduled to continue through 2028, so match-day access, open concourses and parking patterns can change as construction advances.',
  'sports-venue:frost-bank-center': 'Frost Bank Center is the San Antonio Spurs’ home arena and a key venue for the San Antonio Stock Show & Rodeo, concerts and touring events. Opened in 2002 and substantially renovated in 2015, the arena sits east of downtown beside Freeman Coliseum, giving visitors a different trip pattern from San Antonio’s River Walk-centered attractions.',
  'sports-venue:college-park-center': 'College Park Center gives UT Arlington basketball and volleyball a 7,000-seat home in the university’s downtown Arlington setting. The $78 million, 218,000-square-foot arena opened in 2012 and has also hosted WNBA basketball, postseason tournaments, high-school playoff games, concerts and community events.',
  'sports-venue:american-airlines-center': 'American Airlines Center sits in Dallas’s Victory Park as the shared home of the Mavericks and Stars and a major stop for arena concerts and touring events. Its location next to downtown—and direct access to DART and TRE service—makes transit, nearby hotels and the surrounding entertainment district unusually important parts of event-night planning.',
  'sports-venue:toyota-center-houston': 'Toyota Center is the Houston Rockets’ downtown arena and a major stop for concerts and touring sports events. The adjacent Toyota Tundra Garage, surrounding downtown lots and walkable access to Discovery Green and the convention district make the arena less of a stand-alone destination than a central-city event anchor.',
  'sports-venue:shell-energy-stadium': 'Shell Energy Stadium is Houston’s soccer-focused home for Dynamo FC and the Dash in the EaDo district just east of downtown. METRORail’s Green and Purple lines stop at EaDo/Stadium, while the stadium’s proximity to Daikin Park and downtown gives match days a compact, transit-friendly city setting.',
  'sports-venue:q2-stadium': 'Q2 Stadium is Austin FC’s soccer home at McKalla Place in North Austin, with match-day access built around more than just driving. CapMetro rail, buses, rideshare, bicycles and pre-purchased parking all shape the arrival plan, making transportation choice one of the defining parts of a visit.',
  'sports-venue:moody-center': 'Moody Center sits on the edge of the University of Texas campus as the Longhorns’ basketball home and one of Austin’s major concert arenas. Its campus-and-downtown location means event traffic, nearby garages, road closures and the walk from surrounding districts matter as much as the arena itself when planning a visit.',
  'sports-venue:amon-g-carter-stadium': 'Amon G. Carter Stadium has been the home of TCU football since 1930 and remains one of Fort Worth’s defining college-sports venues. A major redevelopment rebuilt the stadium for the modern Big 12 era, followed by continued investment that includes a 2025 human-performance project and 2026 upgrades to the south video board and full-spectrum LED stadium lighting.',
  'sports-venue:kyle-field': 'Kyle Field is the center of Texas A&M football game day in College Station, with a current capacity of 102,733 after the university’s two-phase $485 million redevelopment debuted for the 2015 season. The stadium experience extends well beyond kickoff through campus traditions such as Spirit Walk, making early arrival part of the trip rather than simply a parking tactic.',
  'sports-venue:circuit-of-the-americas': 'Circuit of The Americas is Austin’s purpose-built home for Formula 1, MotoGP and other major motorsports weekends. The circuit sits southeast of central Austin and operates at a scale where assigned parking routes, pre-purchased passes and heavy race-day traffic can consume a meaningful part of the day, so the venue itself has to anchor the itinerary.',
  'sports-venue:dickies-arena': 'Dickies Arena opened in 2019 beside the Will Rogers Memorial Center as a 14,000-seat multipurpose venue and the arena home for Fort Worth Stock Show & Rodeo performances. Its Cultural District setting also puts museums, restaurants and central Fort Worth within the same visitor weekend, giving the arena a distinctly Fort Worth context beyond the event calendar.',
  'sports-venue:mclane-stadium': 'McLane Stadium opened in 2014 on the Brazos River as Baylor football’s riverfront home in Waco. The 45,140-seat stadium pairs Big 12 game weekends with riverfront tailgating, the Baylor campus and central Waco, creating a college-football setting that is closely tied to the city rather than isolated from it.',
};

export function applyCurrentEntityCorrections(entity: TexasEntityRecord): TexasEntityRecord {
  let corrected = entity;

  if (corrected.id === 'sports-venue:jones-att-stadium') {
    corrected = {
      ...corrected,
      name: 'Galaxy Stadium',
      aliases: [...new Set([...corrected.aliases, 'Jones AT&T Stadium', 'Jones ATT Stadium', 'Jones Stadium', 'Galaxy Stadium'])],
      description: 'Galaxy Stadium in Lubbock is the home of Texas Tech Red Raiders football and one of West Texas’s major college-sports destinations. The venue adopted the Galaxy Stadium name beginning with the 2026 football season under a 15-year naming-rights agreement, while its long history at the heart of the Texas Tech campus continues to make game weekends a regional travel draw.',
      sourceCheckedAt: checkedAt,
    };
  }

  if (corrected.kind === 'sports-venue') {
    const editorialDescription = sportsVenueEditorialDescriptions[corrected.id];
    const description = editorialDescription
      ?? corrected.description?.replace(genericSportsVenueTrackingSentence, '').trim();

    if (description && description !== corrected.description) {
      corrected = { ...corrected, description };
    }
  }

  return corrected;
}
