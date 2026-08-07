import caddoLake from "@/assets/caddo-lake.jpg";

import type { Destination, TexasRegion } from "../types";

const BRAND = "texasdefined" as const;
const fallbackHero = { src: caddoLake, alt: "Texas lake and shoreline", width: 1600, height: 1067 };

const regionMap: Record<string, TexasRegion> = {
  "East Texas": "piney-woods",
  "Hill Country": "hill-country",
  "Central Texas": "prairies-lakes",
  "North Texas": "prairies-lakes",
  "South Texas": "south-texas",
  "West Texas": "big-bend",
  Panhandle: "panhandle",
};

const records = `
caddo-lake-state-park|Caddo Lake State Park|Karnack|Harrison|East Texas|32.68|-94.176|Bald cypress wetlands draped in Spanish moss, with paddling trails, fishing, cabins, camping, and exceptional wildlife viewing.|https://tpwd.texas.gov/state-parks/caddo-lake|paddling,fishing,camping,birding,wildlife,hiking
inks-lake-state-park|Inks Lake State Park|Burnet|Burnet|Hill Country|30.737|-98.369|A constant-level Highland Lakes destination with granite outcrops, Devil's Waterhole, swimming, paddling, fishing, hiking, cabins, and camping.|https://tpwd.texas.gov/state-parks/inks-lake|swimming,paddling,fishing,camping,hiking,birding,scenic
lake-bob-sandlin-state-park|Lake Bob Sandlin State Park|Pittsburg|Titus|East Texas|33.058|-95.091|A wooded East Texas lake park with fishing, paddling, swimming, hiking, mountain biking, cabins, and camping.|https://tpwd.texas.gov/state-parks/lake-bob-sandlin|fishing,paddling,camping,hiking,swimming,biking,birding
lake-brownwood-state-park|Lake Brownwood State Park|Brownwood|Brown|Central Texas|31.856|-99.03|Historic CCC facilities and Lake Brownwood recreation with boating, fishing, swimming, hiking, cabins, lodges, and camping.|https://tpwd.texas.gov/state-parks/lake-brownwood|fishing,boating,swimming,camping,hiking,history,birding
lake-corpus-christi-state-park|Lake Corpus Christi State Park|Mathis|San Patricio|South Texas|28.062|-97.872|A South Texas reservoir park with swimming, boating, fishing, birding, camping, and a landmark CCC recreation hall.|https://tpwd.texas.gov/state-parks/lake-corpus-christi|fishing,boating,swimming,camping,birding,hiking
lake-livingston-state-park|Lake Livingston State Park|Livingston|Polk|East Texas|30.656|-95.001|A Pineywoods destination on one of Texas's largest lakes with boating, fishing, swimming, paddling, hiking, cabins, and camping.|https://tpwd.texas.gov/state-parks/lake-livingston|fishing,boating,swimming,camping,hiking,paddling,birding
lake-mineral-wells-state-park|Lake Mineral Wells State Park & Trailway|Mineral Wells|Parker|North Texas|32.812|-98.043|A North Texas park with lake recreation, Penitentiary Hollow climbing, hiking, mountain biking, equestrian trails, camping, and the long Lake Mineral Wells Trailway.|https://tpwd.texas.gov/state-parks/lake-mineral-wells|hiking,biking,climbing,fishing,camping,horseback riding,paddling
lake-somerville-birch-creek-unit|Lake Somerville State Park — Birch Creek Unit|Somerville|Burleson|Central Texas|30.322|-96.635|The north-side Lake Somerville unit offers boating, fishing, swimming, hiking, camping, equestrian trails, and access to the Trailway.|https://tpwd.texas.gov/state-parks/lake-somerville|boating,fishing,swimming,hiking,camping,horseback riding,birding
lake-somerville-nails-creek-unit|Lake Somerville State Park — Nails Creek Unit|Ledbetter|Lee|Central Texas|30.28|-96.66|The south-side Lake Somerville unit provides boating, fishing, swimming, hiking, camping, equestrian facilities, and Trailway access.|https://tpwd.texas.gov/state-parks/lake-somerville|boating,fishing,swimming,hiking,camping,horseback riding,birding
lake-tawakoni-state-park|Lake Tawakoni State Park|Wills Point|Hunt|North Texas|32.836|-95.994|A large reservoir park east of Dallas with boating, fishing, swimming, hiking, birding, camping, and broad shoreline views.|https://tpwd.texas.gov/state-parks/lake-tawakoni|boating,fishing,swimming,hiking,camping,birding
lake-whitney-state-park|Lake Whitney State Park|Whitney|Hill|Central Texas|31.923|-97.356|Clear-water lake recreation with boating, fishing, swimming, scuba diving, hiking, birding, cabins, and camping.|https://tpwd.texas.gov/state-parks/lake-whitney|boating,fishing,swimming,scuba diving,hiking,camping,birding
martin-creek-lake-state-park|Martin Creek Lake State Park|Tatum|Rusk|East Texas|32.278|-94.568|A wooded East Texas lake park with fishing, boating, paddling, swimming, hiking, birding, cabins, and camping.|https://tpwd.texas.gov/state-parks/martin-creek-lake|fishing,boating,paddling,swimming,hiking,camping,birding
martin-dies-jr-state-park|Martin Dies, Jr. State Park|Jasper|Jasper|East Texas|30.853|-94.172|Pineywoods and cypress wetlands on B.A. Steinhagen Lake with paddling trails, fishing, boating, hiking, wildlife, cabins, and camping.|https://tpwd.texas.gov/state-parks/martin-dies-jr|paddling,fishing,boating,hiking,camping,birding,wildlife
meridian-state-park|Meridian State Park|Meridian|Bosque|Central Texas|31.89|-97.698|A wooded CCC-era park around a small lake with fishing, paddling, swimming, hiking, birding, cabins, and camping.|https://tpwd.texas.gov/state-parks/meridian|fishing,paddling,swimming,hiking,camping,birding,history
possum-kingdom-state-park|Possum Kingdom State Park|Caddo|Palo Pinto|North Texas|32.874|-98.559|Clear blue water and limestone cliffs on Possum Kingdom Lake, with boating, fishing, swimming, paddling, hiking, cabins, and camping.|https://tpwd.texas.gov/state-parks/possum-kingdom|boating,fishing,swimming,camping,hiking,paddling,birding
purtis-creek-state-park|Purtis Creek State Park|Eustace|Henderson|East Texas|32.356|-95.997|A quiet East Texas lake park known for catch-and-release bass fishing, paddling, swimming, hiking, birding, and camping.|https://tpwd.texas.gov/state-parks/purtis-creek|fishing,paddling,swimming,hiking,camping,birding
ray-roberts-lake-isle-du-bois-unit|Ray Roberts Lake State Park — Isle du Bois Unit|Pilot Point|Denton|North Texas|33.368|-97.056|The south-side Ray Roberts Lake unit offers boating, fishing, swimming, hiking, biking, equestrian trails, camping, and a large beach area.|https://tpwd.texas.gov/state-parks/ray-roberts-lake|boating,fishing,swimming,hiking,biking,camping,horseback riding,birding
ray-roberts-lake-johnson-branch-unit|Ray Roberts Lake State Park — Johnson Branch Unit|Valley View|Cooke|North Texas|33.43|-97.057|The north-side Ray Roberts Lake unit features boating, fishing, swimming, hiking, biking, camping, and quieter wooded shoreline recreation.|https://tpwd.texas.gov/state-parks/ray-roberts-lake|boating,fishing,swimming,hiking,biking,camping,birding
tyler-state-park|Tyler State Park|Tyler|Smith|East Texas|32.482|-95.301|A pine-and-hardwood forest surrounding a spring-fed lake with swimming, paddling, fishing, hiking, biking, cabins, and camping.|https://tpwd.texas.gov/state-parks/tyler|swimming,paddling,fishing,hiking,biking,camping,birding
amistad-national-recreation-area|Amistad National Recreation Area|Del Rio|Val Verde|West Texas|29.465|-101.05|A vast reservoir for boating, fishing, paddling, camping, and desert scenery.|https://www.nps.gov/amis/index.htm|boating,fishing,paddling,camping,scenic
lake-meredith-national-recreation-area|Lake Meredith National Recreation Area|Fritch|Hutchinson|Panhandle|35.624|-101.705|Panhandle boating, fishing, camping, hiking, and canyon scenery.|https://www.nps.gov/lamr/index.htm|boating,fishing,camping,hiking,scenic
huntsville-state-park|Huntsville State Park|Huntsville|Walker|East Texas|30.628|-95.526|Pineywoods trails, lake swimming, paddling, fishing, and camping.|https://tpwd.texas.gov/state-parks/huntsville|hiking,swimming,paddling,fishing,camping
cedar-hill-state-park|Cedar Hill State Park|Cedar Hill|Dallas|North Texas|32.621|-96.979|Joe Pool Lake recreation, extensive mountain-bike trails, camping, fishing, swimming, and preserved Penn Farm history near Dallas.|https://tpwd.texas.gov/state-parks/cedar-hill|boating,fishing,swimming,biking,camping,hiking,history
eisenhower-state-park|Eisenhower State Park|Denison|Grayson|North Texas|33.819|-96.599|Lake Texoma cliffs, coves, swimming, fishing, boating, wooded trails, OHV routes, cabins, and camping near Denison.|https://tpwd.texas.gov/state-parks/eisenhower|fishing,swimming,hiking,camping,boating,OHV,birding
atlanta-state-park|Atlanta State Park|Atlanta|Cass|East Texas|33.230731|-94.249693|A peaceful pine-and-hardwood retreat on Wright Patman Lake for fishing, boating, swimming, camping, and birding.|https://tpwd.texas.gov/state-parks/atlanta|fishing,boating,swimming,camping,birding,hiking
bonham-state-park|Bonham State Park|Bonham|Fannin|North Texas|33.547|-96.144|A wooded North Texas retreat centered on a small lake, with paddling, fishing, swimming, hiking, biking, and camping.|https://tpwd.texas.gov/state-parks/bonham|fishing,paddling,swimming,hiking,biking,camping
choke-canyon-state-park|Choke Canyon State Park|Three Rivers|Live Oak|South Texas|28.472|-98.245|A South Texas reservoir park with boating, fishing, birding, wildlife viewing, camping, and shoreline recreation across two units.|https://tpwd.texas.gov/state-parks/choke-canyon|boating,fishing,birding,wildlife,camping,hiking,swimming
cleburne-state-park|Cleburne State Park|Cleburne|Johnson|North Texas|32.252|-97.549|A spring-fed lake and wooded limestone hills with hiking, mountain biking, fishing, paddling, swimming, cabins, and camping.|https://tpwd.texas.gov/state-parks/cleburne|hiking,biking,fishing,paddling,swimming,camping
cooper-lake-state-park|Cooper Lake State Park|Sulphur Springs|Hopkins|East Texas|33.286|-95.657|Two East Texas park units on Jim Chapman Lake with boating, fishing, swimming, trails, cabins, equestrian facilities, and camping.|https://tpwd.texas.gov/state-parks/cooper-lake|boating,fishing,swimming,hiking,camping,horseback riding,birding
daingerfield-state-park|Daingerfield State Park|Daingerfield|Morris|East Texas|33.015|-94.694|A forested East Texas park centered on an 80-acre lake, with swimming, paddling, fishing, hiking, cabins, and camping.|https://tpwd.texas.gov/state-parks/daingerfield|swimming,paddling,fishing,hiking,camping,birding
fort-boggy-state-park|Fort Boggy State Park|Centerville|Leon|East Texas|31.314|-95.98|A day-use East Texas park with a spring-fed lake, swimming, fishing, paddling, hiking, picnicking, and limited cabins.|https://tpwd.texas.gov/state-parks/fort-boggy|swimming,fishing,paddling,hiking,picnicking,wildlife
falcon-state-park|Falcon State Park|Falcon Heights|Starr|South Texas|26.586|-99.139|A South Texas reservoir destination on Falcon International Reservoir with boating, fishing, birding, camping, and desert wildlife viewing.|https://tpwd.texas.gov/state-parks/falcon|boating,fishing,birding,camping,wildlife,swimming
fort-parker-state-park|Fort Parker State Park|Mexia|Limestone|Central Texas|31.594|-96.526|A peaceful park on the Navasota River and Fort Parker Lake with paddling, fishing, swimming, hiking, cabins, camping, and CCC history.|https://tpwd.texas.gov/state-parks/fort-parker|paddling,fishing,swimming,hiking,camping,history,birding
lake-arrowhead-state-park|Lake Arrowhead State Park|Wichita Falls|Clay|North Texas|33.758|-98.393|A prairie lake destination near Wichita Falls with boating, fishing, swimming, hiking, disc golf, camping, and wildlife viewing.|https://tpwd.texas.gov/state-parks/lake-arrowhead|boating,fishing,swimming,hiking,camping,birding,disc golf
lake-casa-blanca-international-state-park|Lake Casa Blanca International State Park|Laredo|Webb|South Texas|27.544|-99.452|A South Texas lake park in Laredo with boating, fishing, swimming, mountain biking, hiking, sports facilities, and camping.|https://tpwd.texas.gov/state-parks/lake-casa-blanca|boating,fishing,swimming,biking,hiking,camping,birding
lake-colorado-city-state-park|Lake Colorado City State Park|Colorado City|Mitchell|West Texas|32.318|-100.935|A West Texas reservoir park with boating, fishing, swimming, birding, hiking, cabins, and camping beneath wide-open skies.|https://tpwd.texas.gov/state-parks/lake-colorado-city|boating,fishing,swimming,birding,hiking,camping
`.trim().split("\n");

export const legacyLakeDestinations: Destination[] = records.map((record) => {
  const [slug, name, town, county, regionName, lat, lng, summary, officialUrl, activities] = record.split("|");
  const highlights = activities.split(",").map((item) => item.trim()).filter(Boolean).map((item) => item.replace(/\b\w/g, (c) => c.toUpperCase()));
  return {
    id: `legacy-${slug}`,
    brandId: BRAND,
    slug,
    name,
    summary,
    category: "lakes-rivers",
    region: regionMap[regionName] ?? "prairies-lakes",
    nearestTown: town,
    coordinates: { lat: Number(lat), lng: Number(lng) },
    hero: { ...fallbackHero, alt: `${name} in Texas` },
    bestSeason: "Check current conditions before visiting",
    entryNote: "Confirm current hours, fees, reservations, and water conditions with the official source.",
    highlights,
    body: [summary],
    officialUrl,
    county,
  };
});
