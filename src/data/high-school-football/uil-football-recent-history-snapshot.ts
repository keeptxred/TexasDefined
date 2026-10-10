// Fixed completed state-final results, cross-checked against official UIL state archives
// on 2026-10-10. These historical seasons do not change between website requests.
// Source pages: https://www.uiltexas.org/football/archives/
//               https://www.uiltexas.org/football/archives/P24
//               https://www.uiltexas.org/football/archives/P48
//               https://www.uiltexas.org/football/archives/P72
// Review after the 2026-2027 championships before advancing this window.
// Never infer missing rows, substitute a partial live UIL response or remove
// the per-season count checks.
const UIL_FINALS_CONFERENCES = [
  '1A Six-Man Division 1',
  '1A Six-Man Division 2',
  '2A Division 1',
  '2A Division 2',
  '3A Division 1',
  '3A Division 2',
  '4A Division 1',
  '4A Division 2',
  '5A Division 1',
  '5A Division 2',
  '6A Division 1',
  '6A Division 2',
] as const;

const UIL_FINALS_SEASONS = [
  ['2025-2026', [
    'Gordon|Rankin|69-22 - Mercy Rule 3Q',
    'Jayton|Richland Springs|99-54',
    'Hamilton|Joaquin|21-7',
    'Muenster|Shiner|28-0',
    'Yoakum|Grandview|45-29',
    'Wall|Newton|25-24',
    'Stephenville|Kilgore|10-0',
    'Carthage|West Orange-Stark|49-21',
    'Comal Smithson Valley|Frisco Lone Star|28-6',
    'Dallas South Oak Cliff|Richmond Randle|35-19',
    'Galena Park North Shore|Duncanville|10-7',
    'DeSoto|Sheldon King|55-27',
  ]],
  ['2024-2025', [
    'Gordon|Whiteface|70-24: Mercy Rule-9:45 3rd Quarter',
    'Jayton|Oakwood|54-8: Mercy Rule-Halftime',
    'Ganado|Stamford|30-28 3OT',
    'Muenster|Shiner|36-29',
    'Columbus|Malakoff|48-14',
    'Gunter|Woodville|28-0',
    'Celina|Kilgore|55-21',
    'Carthage|Waco La Vega|28-14',
    'Comal Smithson Valley|Dallas Highland Park|32-20',
    'Richmond Randle|Dallas South Oak Cliff|38-35',
    'North Crowley|Austin Westlake|50-21',
    'Austin Vandegrift|Southlake Carroll|24-17',
  ]],
  ['2023-2024', [
    'Gordon|Westbrook|70-20',
    'Benjamin|Oglesby|82-34',
    'Timpson|Tolar|49-7',
    'Albany|Mart|28-10',
    'Malakoff|Franklin|14-7',
    'Gunter|El Maton Tidehaven|30-14',
    'Anna|Tyler Chapel Hill|26-0',
    'Gilmer|Bellville|28-26',
    'Aledo|Comal Smithson Valley|51-8',
    'Port Neches-Groves|Dallas South Oak Cliff|20-17',
    'Duncanville|Galena Park North Shore|49-33',
    'DeSoto|Humble Summer Creek|74-14',
  ]],
  ['2022-2023', [
    'Westbrook|Abbott|69-24',
    'Benjamin|Loraine|68-20',
    'Hawley|Refugio|54-28',
    'Albany|Mart|41-21',
    'Franklin|Brock|17-14',
    'Gunter|Poth|42-7',
    'China Spring|Boerne|24-21',
    'Carthage|Wimberley|42-0',
    'Aledo|College Station|52-14',
    'Dallas South Oak Cliff|Port Neches-Groves|34-24',
    'Duncanville|Galena Park North Shore|28-21',
    'DeSoto|Austin Vandegrift|42-17',
  ]],
  ['2021-2022', [
    'Westbrook|May|72-66',
    'Strawn|Matador Motley County|73-28',
    'Shiner|Hawley|47-12',
    'Stratford|Falls City|39-27',
    'Lorena|Brock|35-18',
    'Franklin|Gunter|49-35',
    'Stephenville|Austin Johnson|38-21',
    'China Spring|Gilmer|31-7',
    'Katy Paetow|College Station|27-24 (OT)',
    'Dallas South Oak Cliff|Liberty Hill|23-14',
    'Galena Park North Shore|Duncanville|17-10',
    'Austin Westlake|Denton Guyer|40-21',
  ]],
  ['2020-2021', [
    'Sterling City|May|68-22',
    'Balmorhea|Richland Springs|74-38',
    'Shiner|Post|42-20',
    'Windthorst|Mart|22-21',
    'Tuscola Jim Ned|Hallettsville|29-28 (OT)',
    'Canadian|Franklin|35-34',
    'Argyle|Lindale|49-21',
    'Carthage|Gilmer|70-14',
    'Denton Ryan|Cedar Park|59-14',
    'Aledo|Crosby|56-21',
    'Austin Westlake|Southlake Carroll|52-34',
    'Katy|Cedar Hill|51-14',
  ]],
  ['2019-2020', [
    'Blum|McLean|58-52',
    'Richland Springs|Matador Motley County|62-16',
    'Refugio|Post|28-7',
    'Mart|Hamlin|25-20',
    'Grandview|Pottsboro|42-35',
    'Gunter|Omaha Pewitt|43-22',
    'Carthage|Waco La Vega|42-28',
    'Texarkana Pleasant Grove|Wimberley|35-21',
    'Alvin Shadow Creek|Denton Ryan|28-22',
    'Aledo|Fort Bend Marshall|45-42',
    'Galena Park North Shore|Duncanville|31-17',
    'Austin Westlake|Denton Guyer|24-0',
  ]],
  ['2018-2019', [
    'McLean|Milford|100-70',
    'Strawn|Follett|48-0',
    'Mason|New Deal|44-6',
    'Mart|Gruver|76-33',
    'Grandview|Malakoff|35-21',
    'Newton|Canadian|21-16',
    'Waco La Vega|Liberty Hill|35-21',
    'Cuero|Texarkana Pleasant Grove|40-28',
    'Dallas Highland Park|Alvin Shadow Creek|27-17',
    'Aledo|Fort Bend Marshall|55-19',
    'Galena Park North Shore|Duncanville|41-36',
    'Longview|Beaumont West Brook|35-34',
  ]],
] as const;

export const UIL_RECENT_FOOTBALL_FINALS_SNAPSHOT = UIL_FINALS_SEASONS.flatMap(([season, games]) => {
  if (games.length !== UIL_FINALS_CONFERENCES.length) {
    throw new Error(`Incomplete official UIL state finals in ${season}: expected 12, received ${games.length}.`);
  }
  return games.map((entry, index) => {
    const parts = entry.split('|');
    if (parts.length !== 3 || parts.some((part) => !part.trim())) {
      throw new Error(`Malformed verified UIL state final in ${season} at conference ${UIL_FINALS_CONFERENCES[index]}.`);
    }
    const [champion, runnerUp, score] = parts;
    return { season, conference: UIL_FINALS_CONFERENCES[index], champion, runnerUp, score };
  });
});

if (UIL_RECENT_FOOTBALL_FINALS_SNAPSHOT.length !== 96) {
  throw new Error('The reviewed UIL history window must contain exactly 96 complete state finals.');
}
