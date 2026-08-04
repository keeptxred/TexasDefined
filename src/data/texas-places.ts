export type TexasCounty = { code: string; name: string; slug: string; officialDirectoryUrl: string };
export type TexasCity = { name: string; slug: string; county: string; region: string };

const COUNTY_NAMES = `Anderson|Andrews|Angelina|Aransas|Archer|Armstrong|Atascosa|Austin|Bailey|Bandera|Bastrop|Baylor|Bee|Bell|Bexar|Blanco|Borden|Bosque|Bowie|Brazoria|Brazos|Brewster|Briscoe|Brooks|Brown|Burleson|Burnet|Caldwell|Calhoun|Callahan|Cameron|Camp|Carson|Cass|Castro|Chambers|Cherokee|Childress|Clay|Cochran|Coke|Coleman|Collin|Collingsworth|Colorado|Comal|Comanche|Concho|Cooke|Coryell|Cottle|Crane|Crockett|Crosby|Culberson|Dallam|Dallas|Dawson|Deaf Smith|Delta|Denton|DeWitt|Dickens|Dimmit|Donley|Duval|Eastland|Ector|Edwards|Ellis|El Paso|Erath|Falls|Fannin|Fayette|Fisher|Floyd|Foard|Fort Bend|Franklin|Freestone|Frio|Gaines|Galveston|Garza|Gillespie|Glasscock|Goliad|Gonzales|Gray|Grayson|Gregg|Grimes|Guadalupe|Hale|Hall|Hamilton|Hansford|Hardeman|Hardin|Harris|Harrison|Hartley|Haskell|Hays|Hemphill|Henderson|Hidalgo|Hill|Hockley|Hood|Hopkins|Houston|Howard|Hudspeth|Hunt|Hutchinson|Irion|Jack|Jackson|Jasper|Jeff Davis|Jefferson|Jim Hogg|Jim Wells|Johnson|Jones|Karnes|Kaufman|Kendall|Kenedy|Kent|Kerr|Kimble|King|Kinney|Kleberg|Knox|Lamar|Lamb|Lampasas|La Salle|Lavaca|Lee|Leon|Liberty|Limestone|Lipscomb|Live Oak|Llano|Loving|Lubbock|Lynn|Madison|Marion|Martin|Mason|Matagorda|Maverick|McCulloch|McLennan|McMullen|Medina|Menard|Midland|Milam|Mills|Mitchell|Montague|Montgomery|Moore|Morris|Motley|Nacogdoches|Navarro|Newton|Nolan|Nueces|Ochiltree|Oldham|Orange|Palo Pinto|Panola|Parker|Parmer|Pecos|Polk|Potter|Presidio|Rains|Randall|Reagan|Real|Red River|Reeves|Refugio|Roberts|Robertson|Rockwall|Runnels|Rusk|Sabine|San Augustine|San Jacinto|San Patricio|San Saba|Schleicher|Scurry|Shackelford|Shelby|Sherman|Smith|Somervell|Starr|Stephens|Sterling|Stonewall|Sutton|Swisher|Tarrant|Taylor|Terrell|Terry|Throckmorton|Titus|Tom Green|Travis|Trinity|Tyler|Upshur|Upton|Uvalde|Val Verde|Van Zandt|Victoria|Walker|Waller|Ward|Washington|Webb|Wharton|Wheeler|Wichita|Wilbarger|Willacy|Williamson|Wilson|Winkler|Wise|Wood|Yoakum|Young|Zapata|Zavala`.split('|');

const slugify = (value: string) => value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

export const TEXAS_COUNTIES: TexasCounty[] = COUNTY_NAMES.map((name, index) => ({
  code: String(index + 1).padStart(3, '0'),
  name: `${name} County`,
  slug: slugify(name),
  officialDirectoryUrl: 'https://www.texas.gov/texas-county-websites.html',
}));

export const TEXAS_CITIES: TexasCity[] = [
  ['Abilene','Taylor','West Central'],['Allen','Collin','North Texas'],['Amarillo','Potter','Panhandle'],['Arlington','Tarrant','North Texas'],['Austin','Travis','Central Texas'],['Baytown','Harris','Gulf Coast'],['Beaumont','Jefferson','Southeast Texas'],['Brownsville','Cameron','Rio Grande Valley'],['Bryan','Brazos','Brazos Valley'],['Carrollton','Dallas','North Texas'],['College Station','Brazos','Brazos Valley'],['Conroe','Montgomery','Gulf Coast'],['Corpus Christi','Nueces','Coastal Bend'],['Dallas','Dallas','North Texas'],['Denton','Denton','North Texas'],['Edinburg','Hidalgo','Rio Grande Valley'],['El Paso','El Paso','Far West Texas'],['Fort Worth','Tarrant','North Texas'],['Frisco','Collin','North Texas'],['Galveston','Galveston','Gulf Coast'],['Garland','Dallas','North Texas'],['Georgetown','Williamson','Central Texas'],['Grand Prairie','Dallas','North Texas'],['Harlingen','Cameron','Rio Grande Valley'],['Houston','Harris','Gulf Coast'],['Irving','Dallas','North Texas'],['Katy','Harris','Gulf Coast'],['Killeen','Bell','Central Texas'],['Laredo','Webb','South Texas'],['League City','Galveston','Gulf Coast'],['Lewisville','Denton','North Texas'],['Longview','Gregg','East Texas'],['Lubbock','Lubbock','South Plains'],['McAllen','Hidalgo','Rio Grande Valley'],['McKinney','Collin','North Texas'],['Mesquite','Dallas','North Texas'],['Midland','Midland','Permian Basin'],['Missouri City','Fort Bend','Gulf Coast'],['New Braunfels','Comal','Central Texas'],['Odessa','Ector','Permian Basin'],['Pasadena','Harris','Gulf Coast'],['Pearland','Brazoria','Gulf Coast'],['Plano','Collin','North Texas'],['Port Arthur','Jefferson','Southeast Texas'],['Richardson','Dallas','North Texas'],['Round Rock','Williamson','Central Texas'],['San Angelo','Tom Green','West Central'],['San Antonio','Bexar','South Central'],['San Marcos','Hays','Central Texas'],['Sugar Land','Fort Bend','Gulf Coast'],['Temple','Bell','Central Texas'],['The Woodlands','Montgomery','Gulf Coast'],['Tyler','Smith','East Texas'],['Victoria','Victoria','Coastal Bend'],['Waco','McLennan','Central Texas'],['Wichita Falls','Wichita','North Texas'],
].map(([name, county, region]) => ({ name, county, region, slug: slugify(name) }));

export function findTexasPlaces(query: string) {
  const normalized = query.trim().toLowerCase();
  if (!normalized) return { counties: TEXAS_COUNTIES, cities: TEXAS_CITIES };
  return {
    counties: TEXAS_COUNTIES.filter((county) => county.name.toLowerCase().includes(normalized)),
    cities: TEXAS_CITIES.filter((city) => `${city.name} ${city.county} ${city.region}`.toLowerCase().includes(normalized)),
  };
}

export function validateTexasPlaces() {
  const errors: string[] = [];
  if (TEXAS_COUNTIES.length !== 254) errors.push(`Expected 254 counties; found ${TEXAS_COUNTIES.length}.`);
  if (new Set(TEXAS_COUNTIES.map((county) => county.code)).size !== 254) errors.push('County codes must be unique.');
  if (new Set(TEXAS_COUNTIES.map((county) => county.slug)).size !== 254) errors.push('County slugs must be unique.');
  if (!TEXAS_CITIES.length) errors.push('City directory cannot be empty.');
  return { valid: errors.length === 0, errors };
}
