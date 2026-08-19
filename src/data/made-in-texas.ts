export type TexasBusinessRelationship = 'made-or-processed' | 'founded' | 'headquartered' | 'major-operations';

export type TexasBusinessCategory =
  | 'food-drink'
  | 'western-wear'
  | 'home-outdoors'
  | 'technology-manufacturing'
  | 'aerospace-transportation'
  | 'energy-industrial'
  | 'retail-lifestyle';

export interface TexasMadeEntry {
  name: string;
  city: string;
  countySlug: string;
  category: TexasBusinessCategory;
  relationship: TexasBusinessRelationship;
  note: string;
  href?: string;
}

const entry = (
  name: string,
  city: string,
  countySlug: string,
  category: TexasBusinessCategory,
  relationship: TexasBusinessRelationship,
  note: string,
  href?: string,
): TexasMadeEntry => ({ name, city, countySlug, category, relationship, note, href });

// Editorial rule: do not silently turn "Texas-founded" or "Texas-headquartered" into
// "manufactured in Texas." Relationship labels are intentionally explicit so county
// pages can celebrate local companies without making an unsupported plant-level claim.
export const MADE_IN_TEXAS_ENTRIES: TexasMadeEntry[] = [
  entry('Blue Bell Creameries', 'Brenham', 'washington', 'food-drink', 'made-or-processed', 'Brenham is the home base of one of Texas\'s most recognizable ice-cream companies.'),
  entry('Kountry Boys Sausage', 'Brenham', 'washington', 'food-drink', 'made-or-processed', 'A Brenham-area smoked-meat name tied to the county\'s food culture.'),
  entry('Dr Pepper', 'Waco', 'mclennan', 'food-drink', 'founded', 'The soft drink was created in Waco and remains part of the city\'s commercial identity.', '/attraction/dr-pepper-museum'),
  entry('Balcones Distilling', 'Waco', 'mclennan', 'food-drink', 'made-or-processed', 'Waco distillery known for Texas-made whisky.'),
  entry('Spoetzl Brewery / Shiner', 'Shiner', 'lavaca', 'food-drink', 'made-or-processed', 'Shiner beer is brewed in the small Lavaca County city that gave the brand its name.'),
  entry('Whataburger', 'San Antonio', 'bexar', 'food-drink', 'headquartered', 'The Texas-born burger chain is headquartered in San Antonio.'),
  entry('H-E-B', 'San Antonio', 'bexar', 'retail-lifestyle', 'headquartered', 'The grocery company is headquartered in San Antonio and is one of the state\'s largest homegrown retail institutions.'),
  entry('Taco Cabana', 'San Antonio', 'bexar', 'food-drink', 'founded', 'The fast-casual Tex-Mex chain began in San Antonio.'),
  entry('Rebecca Creek Distillery', 'San Antonio', 'bexar', 'food-drink', 'made-or-processed', 'San Antonio-area distillery producing Texas spirits.'),
  entry('Ranger Creek Brewing & Distilling', 'San Antonio', 'bexar', 'food-drink', 'made-or-processed', 'Beer and spirits producer based in San Antonio.'),
  entry('All Seasons Feeders', 'San Antonio', 'bexar', 'home-outdoors', 'major-operations', 'Texas hunting and ranch-equipment company with San Antonio roots.'),
  entry('Texas Hunter Products', 'San Antonio', 'bexar', 'home-outdoors', 'major-operations', 'Texas outdoor-products company associated with San Antonio.'),
  entry('Tito\'s Handmade Vodka', 'Austin', 'travis', 'food-drink', 'made-or-processed', 'Austin distillery that grew into one of the best-known Texas spirits brands.'),
  entry('Deep Eddy Vodka', 'Austin', 'travis', 'food-drink', 'founded', 'Vodka brand founded in Austin and closely tied to Central Texas.'),
  entry('Dell Technologies', 'Round Rock', 'williamson', 'technology-manufacturing', 'headquartered', 'Major technology company headquartered in Round Rock; headquarters status should not be confused with product-level Texas manufacturing.'),
  entry('Round Rock Donuts', 'Round Rock', 'williamson', 'food-drink', 'made-or-processed', 'A locally made Central Texas food institution with a distinctive orange-tinted dough.'),
  entry('Firefly Aerospace', 'Cedar Park', 'williamson', 'aerospace-transportation', 'major-operations', 'Commercial space company with major Central Texas operations.'),
  entry('Samsung Semiconductor', 'Austin / Taylor', 'williamson', 'technology-manufacturing', 'major-operations', 'Semiconductor manufacturing and expansion have made Williamson County a major chip-industry center.'),
  entry('Fischer & Wieser', 'Fredericksburg', 'gillespie', 'food-drink', 'made-or-processed', 'Hill Country specialty-food producer known for sauces, preserves and jellies.'),
  entry('Circle E Candles', 'Fredericksburg', 'gillespie', 'home-outdoors', 'made-or-processed', 'Fredericksburg candle company tied to Hill Country gift culture.'),
  entry('Altstadt Brewery', 'Fredericksburg', 'gillespie', 'food-drink', 'made-or-processed', 'German-style brewery in the Fredericksburg area.'),
  entry('Garrison Brothers Distillery', 'Hye', 'blanco', 'food-drink', 'made-or-processed', 'Hill Country bourbon distillery in Hye.'),
  entry('Real Ale Brewing Company', 'Blanco', 'blanco', 'food-drink', 'made-or-processed', 'Long-running Texas craft brewery based in Blanco.'),
  entry('Texas Hill Country Olive Co.', 'Dripping Springs', 'hays', 'food-drink', 'made-or-processed', 'Dripping Springs producer associated with Texas olive oil and balsamic products.'),
  entry('Salt Lick BBQ', 'Driftwood', 'hays', 'food-drink', 'founded', 'The Driftwood barbecue landmark also sells sauces and rubs tied to its Hays County identity.'),
  entry('Lucchese Bootmaker', 'El Paso', 'el-paso', 'western-wear', 'made-or-processed', 'Historic bootmaker with a longstanding El Paso manufacturing identity.'),
  entry('Tony Lama', 'El Paso', 'el-paso', 'western-wear', 'major-operations', 'Bootmaking brand with deep El Paso roots.'),
  entry('Rancho Boots', 'El Paso', 'el-paso', 'western-wear', 'major-operations', 'Western boot company associated with El Paso.'),
  entry('Resistol', 'Garland', 'dallas', 'western-wear', 'made-or-processed', 'Garland is one of Texas\'s best-known cowboy-hat manufacturing centers.'),
  entry('Stetson hat production', 'Garland', 'dallas', 'western-wear', 'made-or-processed', 'Garland hatmaking connects the Stetson name to North Texas manufacturing.'),
  entry('Mary Kay', 'Dallas', 'dallas', 'retail-lifestyle', 'headquartered', 'Cosmetics company founded and headquartered in the Dallas area.'),
  entry('Texas Instruments', 'Dallas', 'dallas', 'technology-manufacturing', 'headquartered', 'Semiconductor company founded in Dallas and central to the region\'s technology history.'),
  entry('7-Eleven', 'Dallas', 'dallas', 'retail-lifestyle', 'founded', 'The global convenience-store chain traces its origin to Dallas.'),
  entry('Half Price Books', 'Dallas', 'dallas', 'retail-lifestyle', 'founded', 'The used-book retailer began in Dallas.'),
  entry('Wingstop', 'Dallas', 'dallas', 'food-drink', 'founded', 'Restaurant chain founded in the Dallas area.'),
  entry('Dickey\'s Barbecue Pit', 'Dallas', 'dallas', 'food-drink', 'founded', 'Barbecue chain founded in Dallas.'),
  entry('Kendra Scott', 'Austin', 'travis', 'retail-lifestyle', 'headquartered', 'Jewelry and lifestyle company founded and headquartered in Austin.'),
  entry('Lammes Candies', 'Austin', 'travis', 'food-drink', 'made-or-processed', 'Historic Austin confectioner best known for pecan pralines and Longhorn candies.'),
  entry('Yellowbird', 'Austin', 'travis', 'food-drink', 'founded', 'Austin hot-sauce and condiment brand.'),
  entry('Siete Foods', 'Austin', 'travis', 'food-drink', 'founded', 'Austin-founded Mexican-American food brand.'),
  entry('Franklin Barbecue', 'Austin', 'travis', 'food-drink', 'founded', 'Austin barbecue institution whose sauces, rubs and restaurant identity travel far beyond the city.'),
  entry('Chuy\'s', 'Austin', 'travis', 'food-drink', 'founded', 'Tex-Mex restaurant chain founded in Austin.'),
  entry('Tacodeli', 'Austin', 'travis', 'food-drink', 'founded', 'Austin-founded taco company known for its Doña sauce.'),
  entry('Whole Foods Market', 'Austin', 'travis', 'retail-lifestyle', 'founded', 'Natural-grocery company founded in Austin.'),
  entry('Tecovas', 'Austin', 'travis', 'western-wear', 'headquartered', 'Western footwear brand headquartered in Austin; headquarters status does not imply every boot is made in Texas.'),
  entry('Chisos Boots', 'Austin', 'travis', 'western-wear', 'headquartered', 'Austin-based Western boot company.'),
  entry('Howler Brothers', 'Austin', 'travis', 'western-wear', 'headquartered', 'Austin-based outdoor and apparel brand.'),
  entry('Criquet Shirts', 'Austin', 'travis', 'western-wear', 'headquartered', 'Austin apparel company.'),
  entry('YETI', 'Austin', 'travis', 'home-outdoors', 'headquartered', 'Outdoor-products company headquartered in Austin; the brand\'s Texas identity should not be read as a claim that every product is manufactured in Texas.'),
  entry('National Instruments / NI', 'Austin', 'travis', 'technology-manufacturing', 'headquartered', 'Engineering and test-technology company founded and headquartered in Austin.'),
  entry('Southwest Airlines', 'Dallas', 'dallas', 'aerospace-transportation', 'headquartered', 'Texas-born airline headquartered in Dallas.'),
  entry('American Airlines', 'Fort Worth', 'tarrant', 'aerospace-transportation', 'headquartered', 'Major airline headquartered in Fort Worth.'),
  entry('Lockheed Martin Aeronautics', 'Fort Worth', 'tarrant', 'aerospace-transportation', 'made-or-processed', 'Fort Worth plant is one of the state\'s most important aerospace manufacturing centers.'),
  entry('Bell Textron', 'Fort Worth', 'tarrant', 'aerospace-transportation', 'major-operations', 'Helicopter and tiltrotor manufacturer with major Fort Worth operations.'),
  entry('Alcon', 'Fort Worth', 'tarrant', 'technology-manufacturing', 'headquartered', 'Eye-care company with a major Fort Worth headquarters and operations footprint.'),
  entry('Saddleback Leather', 'Fort Worth', 'tarrant', 'western-wear', 'headquartered', 'Texas leather-goods company associated with Fort Worth.'),
  entry('Schaefer Outfitter', 'Fort Worth', 'tarrant', 'western-wear', 'headquartered', 'Western apparel company associated with Fort Worth.'),
  entry('Mrs. Baird\'s', 'Fort Worth', 'tarrant', 'food-drink', 'founded', 'Texas bread brand with Fort Worth roots.'),
  entry('Peterbilt', 'Denton', 'denton', 'aerospace-transportation', 'made-or-processed', 'Heavy-duty trucks are assembled in Denton, one of North Texas\'s signature manufacturing operations.'),
  entry('Toyota Motor Manufacturing Texas', 'San Antonio', 'bexar', 'aerospace-transportation', 'made-or-processed', 'San Antonio vehicle plant is a major Texas manufacturing site.'),
  entry('Igloo', 'Katy', 'harris', 'home-outdoors', 'major-operations', 'Cooler company with deep Katy roots and a major local business identity.'),
  entry('Academy Sports + Outdoors', 'Katy', 'harris', 'retail-lifestyle', 'headquartered', 'Sporting-goods retailer headquartered in the Katy area.'),
  entry('Sysco', 'Houston', 'harris', 'retail-lifestyle', 'headquartered', 'Global food-distribution company headquartered in Houston.'),
  entry('Pappas Restaurants', 'Houston', 'harris', 'food-drink', 'headquartered', 'Houston-based restaurant group with multiple Texas-born concepts.'),
  entry('Shipley Do-Nuts', 'Houston', 'harris', 'food-drink', 'founded', 'Houston-founded doughnut chain.'),
  entry('Saint Arnold Brewing Company', 'Houston', 'harris', 'food-drink', 'made-or-processed', 'Houston craft brewery and a long-running local beer institution.'),
  entry('Texas Tamale Company', 'Houston', 'harris', 'food-drink', 'major-operations', 'Houston-based Texas food brand.'),
  entry('Pitts & Spitts', 'Houston', 'harris', 'home-outdoors', 'made-or-processed', 'Houston smoker and grill maker tied to Texas barbecue equipment.'),
  entry('Klose Smokers', 'Houston', 'harris', 'home-outdoors', 'made-or-processed', 'Houston-built barbecue pits and smokers.'),
  entry('Gator Pit of Texas', 'Houston', 'harris', 'home-outdoors', 'made-or-processed', 'Houston-area maker of custom barbecue pits.'),
  entry('NOV', 'Houston', 'harris', 'energy-industrial', 'headquartered', 'Oilfield technology and equipment company headquartered in Houston.'),
  entry('Baker Hughes', 'Houston', 'harris', 'energy-industrial', 'headquartered', 'Global energy-technology company headquartered in Houston.'),
  entry('Halliburton', 'Houston', 'harris', 'energy-industrial', 'headquartered', 'Energy-services company headquartered in Houston.'),
  entry('Kinder Morgan', 'Houston', 'harris', 'energy-industrial', 'headquartered', 'Major pipeline and energy-infrastructure company headquartered in Houston.'),
  entry('Enterprise Products Partners', 'Houston', 'harris', 'energy-industrial', 'headquartered', 'Houston-based midstream energy company.'),
  entry('Geospace Technologies', 'Houston', 'harris', 'energy-industrial', 'major-operations', 'Houston-based maker of seismic and energy-industry technology.'),
  entry('Buc-ee\'s', 'Lake Jackson', 'brazoria', 'retail-lifestyle', 'founded', 'The travel-center brand began in Lake Jackson.'),
  entry('Imperial Sugar heritage', 'Sugar Land', 'fort-bend', 'food-drink', 'founded', 'Sugar production shaped the city\'s name, economy and historic identity.'),
  entry('Prosperity Bank', 'Sugar Land', 'fort-bend', 'retail-lifestyle', 'headquartered', 'Texas banking company headquartered in Sugar Land.'),
  entry('James Avery Artisan Jewelry', 'Kerrville', 'kerr', 'retail-lifestyle', 'founded', 'Texas jewelry company founded in Kerrville.'),
  entry('Southside Market & Barbeque', 'Elgin', 'bastrop', 'food-drink', 'made-or-processed', 'Historic Elgin sausage and barbecue company.'),
  entry('Meyer\'s Elgin Sausage', 'Elgin', 'bastrop', 'food-drink', 'made-or-processed', 'Elgin meat-market tradition represented by a locally rooted sausage producer.'),
  entry('Meat Church', 'Waxahachie', 'ellis', 'food-drink', 'headquartered', 'Waxahachie barbecue-seasoning and cooking brand.'),
  entry('Ennis Flint', 'Ennis', 'ellis', 'energy-industrial', 'major-operations', 'Traffic-safety materials company with Ennis roots and operations.'),
  entry('American Hat Company', 'Bowie', 'montague', 'western-wear', 'made-or-processed', 'Cowboy-hat maker tied directly to Bowie manufacturing.'),
  entry('King Ranch Saddle Shop', 'Kingsville', 'kleberg', 'western-wear', 'founded', 'Leather and ranch-goods brand rooted in the King Ranch and Kingsville story.'),
  entry('Waterloo Rods', 'Victoria', 'victoria', 'home-outdoors', 'headquartered', 'Texas fishing-rod company associated with Victoria.'),
  entry('Big Tex Trailers', 'Mount Pleasant', 'titus', 'aerospace-transportation', 'major-operations', 'Trailer manufacturer with major Mount Pleasant operations.'),
  entry('Top Hat Trailers', 'Mount Pleasant', 'titus', 'aerospace-transportation', 'major-operations', 'Trailer producer associated with Mount Pleasant.'),
  entry('Lufkin Industries', 'Lufkin', 'angelina', 'energy-industrial', 'founded', 'Historic East Texas industrial company closely associated with oilfield pumping equipment.'),
  entry('Tyler Candle Company', 'Tyler', 'smith', 'home-outdoors', 'headquartered', 'East Texas home-fragrance company associated with Tyler.'),
  entry('Cavender\'s', 'Tyler', 'smith', 'retail-lifestyle', 'headquartered', 'Western-wear retailer headquartered in Tyler.'),
  entry('Llano Estacado Winery', 'Lubbock', 'lubbock', 'food-drink', 'made-or-processed', 'West Texas winery based near Lubbock.'),
  entry('Gandy\'s Dairy', 'Lubbock', 'lubbock', 'food-drink', 'major-operations', 'Longstanding West Texas dairy brand associated with Lubbock.'),
  entry('Adams Extract', 'Gonzales', 'gonzales', 'food-drink', 'made-or-processed', 'Texas flavoring and seasoning company with Gonzales operations.'),
  entry('Dublin Bottling Works', 'Dublin', 'erath', 'food-drink', 'made-or-processed', 'Central Texas bottler carrying forward Dublin\'s soda-making tradition.'),
  entry('Hard Eight BBQ', 'Stephenville', 'erath', 'food-drink', 'founded', 'Texas barbecue restaurant company rooted in the Stephenville area.'),
  entry('Pecos cantaloupe tradition', 'Pecos', 'reeves', 'food-drink', 'made-or-processed', 'Commercial melon growing is part of the Pecos-area agricultural identity.'),
  entry('TexaSweet grapefruit', 'Rio Grande Valley', 'hidalgo', 'food-drink', 'made-or-processed', 'Rio Grande Valley citrus production is closely identified with Texas red grapefruit.'),
  entry('Anderson Bean Boot Company', 'Mercedes', 'hidalgo', 'western-wear', 'made-or-processed', 'Western bootmaker associated with Mercedes in the Rio Grande Valley.'),
  entry('Rios of Mercedes', 'Mercedes', 'hidalgo', 'western-wear', 'made-or-processed', 'Handcrafted boot company with deep Mercedes roots.'),
  entry('Wallis Boots', 'McAllen', 'hidalgo', 'western-wear', 'major-operations', 'Custom Western bootmaker associated with McAllen.'),
  entry('SpaceX Starbase', 'Boca Chica / Brownsville', 'cameron', 'aerospace-transportation', 'major-operations', 'Spaceflight development and launch operations have made Cameron County a major aerospace center.'),
  entry('Marfa Brands', 'Marfa', 'presidio', 'home-outdoors', 'headquartered', 'Small-batch lifestyle and fragrance brand associated with Marfa.'),
];

export const MADE_IN_TEXAS_COUNTIES = new Set(MADE_IN_TEXAS_ENTRIES.map((item) => item.countySlug));

export function madeInTexasForCounty(countySlug: string) {
  return MADE_IN_TEXAS_ENTRIES.filter((item) => item.countySlug === countySlug);
}

export function madeInTexasByCategory(category: TexasBusinessCategory) {
  return MADE_IN_TEXAS_ENTRIES.filter((item) => item.category === category);
}

export const MADE_IN_TEXAS_RELATIONSHIP_LABELS: Record<TexasBusinessRelationship, string> = {
  'made-or-processed': 'Made or processed here',
  founded: 'Founded here',
  headquartered: 'Headquartered here',
  'major-operations': 'Major Texas operations',
};
