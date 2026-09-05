import type { TexasEntityRecord } from './types';

export type GolfCourseStarterRecord = {
  ordinal: number; name: string; slug: string; city: string; countySlug: string;
  region: string; market: string; existingEntity: boolean; href: string;
};

const checkedAt = '2026-09-04';
const existing = new Set(['Memorial Park Golf Course', 'Colonial Country Club']);
const countyByCity: Record<string, string> = {"Trinity":"trinity", "Montgomery":"montgomery", "Columbus":"colorado", "Houston":"harris", "The Woodlands":"montgomery", "Humble":"harris", "Cypress":"harris", "Richmond":"fort-bend", "Sugar Land":"fort-bend", "Missouri City":"fort-bend", "Fulshear":"fort-bend", "Katy":"fort-bend", "Kingwood":"harris", "Atascocita":"harris", "Porter":"montgomery", "Crosby":"harris", "Mont Belvieu":"chambers", "Pasadena":"harris", "La Porte":"harris", "League City":"galveston", "Galveston":"galveston", "Village Mills":"hardin", "Sour Lake":"hardin", "Beaumont":"jefferson", "Lufkin":"angelina", "Dallas":"dallas", "Fort Worth":"tarrant", "Westlake":"tarrant", "Frisco":"collin", "McKinney":"collin", "Irving":"dallas", "Plano":"collin", "Carrollton":"denton", "Lewisville":"denton", "The Colony":"denton", "Prosper":"collin", "Garland":"dallas", "Richardson":"dallas", "Wylie":"collin", "Rockwall":"rockwall", "Royse City":"rockwall", "Rowlett":"dallas", "Mesquite":"dallas", "Farmers Branch":"dallas", "Grapevine":"tarrant", "Euless":"tarrant", "Arlington":"tarrant", "Westworth Village":"tarrant", "North Richland Hills":"tarrant", "Keller":"tarrant", "Runaway Bay":"wise", "Bridgeport":"wise", "Decatur":"wise", "Denton":"denton", "Corinth":"denton", "Lantana":"denton", "Flower Mound":"denton", "Cleburne":"johnson", "Burleson":"johnson", "Azle":"tarrant", "Glen Rose":"somervell", "Lipan":"hood", "Weatherford":"parker", "Spicewood":"travis", "Bee Cave":"travis", "Austin":"travis", "Lakeway":"travis", "Kyle":"hays", "San Marcos":"hays", "Round Rock":"williamson", "Hutto":"williamson", "Pflugerville":"travis", "Manor":"travis", "Georgetown":"williamson", "Salado":"bell", "Temple":"bell", "Killeen":"bell", "Fort Cavazos":"bell", "Copperas Cove":"coryell", "Waco":"mclennan", "Fredericksburg":"gillespie", "Horseshoe Bay":"llano", "San Antonio":"bexar", "Kerrville":"kerr"};
const countyOverride: Record<string, string> = {"PGA Frisco - Field Ranch East":"denton", "PGA Frisco - Field Ranch West":"denton", "Frisco Lakes Golf Club":"denton", "Trails of Frisco Golf Club":"denton", "Avery Ranch Golf Club":"williamson", "The Golf Club at Champions Circle":"denton"};

const raw = `1|Whispering Pines Golf Club|Trinity
2|Bluejack National|Montgomery
3|Big Easy Ranch - The Covey|Columbus
4|Champions Golf Club - Cypress Creek|Houston
5|Champions Golf Club - Jackrabbit|Houston
6|Memorial Park Golf Course|Houston
7|The Club at Carlton Woods - Nicklaus Course|The Woodlands
8|The Club at Carlton Woods - Fazio Course|The Woodlands
9|Lochinvar Golf Club|Houston
10|River Oaks Country Club|Houston
11|The Woodlands Country Club - Tournament Course|The Woodlands
12|Golf Club of Houston - Tournament Course|Humble
13|Golf Club of Houston - Member Course|Humble
14|BlackHorse Golf Club - North|Cypress
15|BlackHorse Golf Club - South|Cypress
16|Wildcat Golf Club - Lakes Course|Houston
17|Wildcat Golf Club - Highlands Course|Houston
18|Timberlane Country Club|Houston
19|BraeBurn Country Club|Houston
20|Houston Country Club|Houston
21|Lakeside Country Club|Houston
22|Pine Forest Country Club|Houston
23|Shadow Hawk Golf Club|Richmond
24|The Richmond Golf Club|Richmond
25|Sweetwater Country Club - Pecan|Sugar Land
26|Sweetwater Country Club - Cypress|Sugar Land
27|Sienna Golf Club|Missouri City
28|Quail Valley Golf Course - El Dorado|Missouri City
29|Quail Valley Golf Course - La Quinta|Missouri City
30|Weston Lakes Country Club|Fulshear
31|Cinco Ranch Golf Club|Katy
32|The Club at Falcon Point|Katy
33|Meadowbrook Farms Golf Club|Katy
34|Willow Fork Country Club|Katy
35|Kingwood Country Club - Island|Kingwood
36|Kingwood Country Club - Lake|Kingwood
37|Kingwood Country Club - Marsh|Kingwood
38|Kingwood Country Club - Forest|Kingwood
39|Deerwood Golf Club|Kingwood
40|Atascocita Golf Club|Atascocita
41|Walden on Lake Houston Golf and Country Club|Atascocita
42|Oakhurst Golf Club|Porter
43|Newport Golf Club|Crosby
44|Eagle Pointe Golf Club|Mont Belvieu
45|Baywood Country Club|Pasadena
46|The Battleground Golf Course|La Porte
47|Bay Oaks Country Club|Houston
48|South Shore Harbour Country Club|League City
49|Beacon Lakes Golf Club|League City
50|Moody Gardens Golf Course|Galveston
51|Galveston Country Club|Galveston
52|Wildwood Golf Course|Village Mills
53|Idylwild Golf Club|Sour Lake
54|Brentwood Entertainment Complex|Beaumont
55|Bayou Din Golf Club|Beaumont
56|Henry Homberg Municipal Golf Course|Beaumont
57|Beaumont Country Club|Beaumont
58|Crown Colony Country Club|Lufkin
59|Woodstone Country Club|Lufkin
60|Dallas National Golf Club|Dallas
61|Brook Hollow Golf Club|Dallas
62|Trinity Forest Golf Club|Dallas
63|Colonial Country Club|Fort Worth
64|Shady Oaks Country Club|Fort Worth
65|Preston Trail Golf Club|Dallas
66|Vaquero Club|Westlake
67|PGA Frisco - Field Ranch East|Frisco
68|PGA Frisco - Field Ranch West|Frisco
69|TPC Craig Ranch|McKinney
70|TPC Las Colinas|Irving
71|Cottonwood Valley Golf Course|Irving
72|Dallas Country Club|Dallas
73|Northwood Club|Dallas
74|Royal Oaks Country Club|Dallas
75|Bent Tree Country Club|Dallas
76|Prestonwood Country Club - The Creek|Dallas
77|Prestonwood Country Club - The Hills|Plano
78|Gleneagles Country Club - Queens Course|Plano
79|Gleneagles Country Club - Kings Course|Plano
80|The Ridge at Stanmite|Dallas
81|Maridoe Golf Club|Carrollton
82|The Honors Club|Carrollton
83|Indian Creek Golf Club - Creek Course|Carrollton
84|Indian Creek Golf Club - Lakes Course|Carrollton
85|The Lakes at Castle Hills|Lewisville
86|Coyote Ridge Golf Club|Carrollton
87|Stewart Peninsula Golf Course|The Colony
88|The Old American Golf Club|The Colony
89|The Tribute Golf Links|The Colony
90|Frisco Lakes Golf Club|Frisco
91|Trails of Frisco Golf Club|Frisco
92|Plantation Golf Club|Frisco
93|Stonebriar Country Club - Club Course|Frisco
94|Stonebriar Country Club - Fazio Course|Frisco
95|Gentle Creek Country Club|Prosper
96|Ridgeview Ranch Golf Club|Plano
97|Pecan Hollow Golf Course|Plano
98|Chase Oaks Golf Club|Plano
99|Los Rios Country Club|Plano
100|Firewheel Golf Park - Bridges Course|Garland
101|Firewheel Golf Park - Lakes Course|Garland
102|Firewheel Golf Park - Old Course|Garland
103|Sherrill Park Golf Course - Course 1|Richardson
104|Sherrill Park Golf Course - Course 2|Richardson
105|Woodbridge Golf Club|Wylie
106|Buffalo Creek Golf Club|Rockwall
107|The Shores Country Club|Rockwall
108|Stone River Golf Club|Royse City
109|Waterview Golf Club|Rowlett
110|Mesquite Golf Club|Mesquite
111|Keeton Park Golf Course|Dallas
112|Tenison Park Golf Course - Highlands|Dallas
113|Tenison Park Golf Course - Glen|Dallas
114|Stevens Park Golf Course|Dallas
115|Cedar Crest Golf Course|Dallas
116|Luna Vista Golf Course|Dallas
117|Brookhaven Country Club - Masters|Farmers Branch
118|Brookhaven Country Club - Championship|Farmers Branch
119|Brookhaven Country Club - President|Farmers Branch
120|Las Colinas Country Club|Irving
121|Hackberry Creek Country Club|Irving
122|Bear Creek Golf Club - West|Dallas
123|Bear Creek Golf Club - East|Dallas
124|Grapevine Golf Course|Grapevine
125|Cowboys Golf Club|Grapevine
126|Texas Star Golf Course|Euless
127|Cheyenne Crest Golf Club|Arlington
128|Tierra Verde Golf Club|Arlington
129|Lake Arlington Golf Course|Arlington
130|Meadowbrook Park Golf Course|Arlington
131|Ditto Golf Course|Arlington
132|Shady Valley Country Club|Arlington
133|Waterchase Golf Club|Fort Worth
134|River Crest Country Club|Fort Worth
135|Fort Worth Golf Club|Fort Worth
136|Ridglea Country Club - Family Course|Fort Worth
137|Ridglea Country Club - Championship Course|Fort Worth
138|Mira Vista Country Club|Fort Worth
139|Hawks Creek Golf Club|Westworth Village
140|The Golf Club Fossil Creek|Fort Worth
141|The Links at Waterchase|Fort Worth
142|Diamond Oaks Country Club|Fort Worth
143|Iron Horse Golf Club|North Richland Hills
144|Sky Creek Ranch Golf Club|Keller
145|The Parks at Texas Star|Euless
146|The Club at Runaway Bay|Runaway Bay
147|Bridgeport Country Club|Bridgeport
148|Decatur Golf Club|Decatur
149|Denton Country Club|Denton
150|Wildhorse Golf Club at Robson Ranch|Denton
151|Timberlinks Golf Club|Denton
152|Oakmont Country Club|Corinth
153|Lantana Golf Club|Lantana
154|Bridlewood Golf Club|Flower Mound
155|Tour 18 Golf Course|Flower Mound
156|The Golf Club at Champions Circle|Fort Worth
157|The Retreat Country Club|Cleburne
158|Cleburne Golf Links|Cleburne
159|Southern Oaks Golf Club|Burleson
160|Hidden Creek Golf Course|Burleson
161|Cross Timbers Golf Course|Azle
162|Squaw Valley Golf Course - Apache Links|Glen Rose
163|Squaw Valley Golf Course - Comanche Lakes|Glen Rose
164|Sugar Tree Golf Club|Lipan
165|Canyon West Golf Club|Weatherford
166|Oaks Golf Club|Weatherford
167|Austin Golf Club|Spicewood
168|Spanish Oaks Golf Club|Bee Cave
169|Loraloma Golf Club|Spicewood
170|Austin Country Club|Austin
171|Omni Barton Creek Resort - Fazio Canyons|Austin
172|Omni Barton Creek Resort - Fazio Foothills|Austin
173|Omni Barton Creek Resort - Coore Crenshaw|Austin
174|Omni Barton Creek Resort - Palmer Lakeside|Austin
175|The Hills of Lakeway - The Hills Course|Lakeway
176|The Hills of Lakeway - Flintrock Falls|Lakeway
177|The Hills of Lakeway - Live Oak Course|Lakeway
178|The Hills of Lakeway - Yaupon Course|Lakeway
179|University of Texas Golf Club|Austin
180|Lost Creek Country Club|Austin
181|Lions Municipal Golf Course|Austin
182|Morris Williams Golf Course|Austin
183|Jimmy Clay Golf Course|Austin
184|Roy Kizer Golf Course|Austin
185|Hancock Golf Course|Austin
186|Grey Rock Golf Club|Austin
187|Onion Creek Club|Austin
188|Plum Creek Golf Course|Kyle
189|Quarry Golf Club|San Marcos
190|Kissing Tree Golf Club|San Marcos
191|Falconhead Golf Club|Bee Cave
192|Avery Ranch Golf Club|Austin
193|Teravista Golf Club|Round Rock
194|Forest Creek Golf Club|Round Rock
195|Star Ranch Golf Club|Hutto
196|Blackhawk Golf Club|Pflugerville
197|ShadowGlen Golf Club|Manor
198|Berry Creek Country Club|Georgetown
199|Cowan Creek Golf Course|Georgetown
200|White Wing Golf Course|Georgetown
201|Legacy Hills Golf Course|Georgetown
202|Georgetown Country Club|Georgetown
203|Cimarron Hills Golf & Country Club|Georgetown
204|Mill Creek Golf Club|Salado
205|Wildflower Country Club|Temple
206|Sammons Golf Links|Temple
207|Stonetree Golf Club|Killeen
208|Courses at Clear Creek|Fort Cavazos
209|Hills of Cove Golf Course|Copperas Cove
210|Cottonwood Creek Golf Course|Waco
211|Ridgewood Country Club|Waco
212|Lake Waco Golf Club|Waco
213|James Connally Golf Course|Waco
214|Twin Rivers Golf Club|Waco
215|Boot Ranch|Fredericksburg
216|Escondido Golf and Lake Club|Horseshoe Bay
217|Horseshoe Bay Resort - Ram Rock|Horseshoe Bay
218|Horseshoe Bay Resort - Apple Rock|Horseshoe Bay
219|Horseshoe Bay Resort - Slick Rock|Horseshoe Bay
220|Horseshoe Bay Resort - Summit Rock|Horseshoe Bay
221|TPC San Antonio - AT&T Canyons Course|San Antonio
222|TPC San Antonio - AT&T Oaks Course|San Antonio
223|The Quarry Golf Course|San Antonio
224|Brackenridge Park Golf Course|San Antonio
225|The Club at Sonterra - North Course|San Antonio
226|The Club at Sonterra - South Course|San Antonio
227|Oak Hills Country Club|San Antonio
228|San Antonio Country Club|San Antonio
229|The Dominion Country Club|San Antonio
230|Silverhorn Golf Club|San Antonio
231|Cedar Creek Golf Course|San Antonio
232|La Cantera Resort - Resort Course|San Antonio
233|La Cantera Resort - Palmer Course|San Antonio
234|The Golf Club of Texas|San Antonio
235|Gateway Hills Golf Course|San Antonio
236|Fort Sam Houston Golf Club|San Antonio
237|Randolph Aero Club Golf Course|San Antonio
238|Willow Springs Golf Course|San Antonio
239|Riverside Golf Course|San Antonio
240|Mission Del Lago Golf Course|San Antonio
241|Northern Hills Golf Club|San Antonio
242|Olmos Basin Golf Course|San Antonio
243|Canyon Springs Golf Club|San Antonio
244|The Republic Golf Club|San Antonio
245|Hyatt Regency Hill Country Golf Club|San Antonio
246|Comanche Trace - The Hills|Kerrville
247|Comanche Trace - The Valley|Kerrville
248|Comanche Trace - The Creeks|Kerrville
249|Riverhill Country Club|Kerrville
250|Scott Schreiner Golf Course|Kerrville`;

function marketFor(ordinal: number) {
  if (ordinal <= 59) return { region: 'gulf-coast', market: 'Houston & Southeast Coast' };
  if (ordinal <= 166) return { region: 'north-texas', market: 'Dallas–Fort Worth Metroplex' };
  if (ordinal <= 214) return { region: 'central-texas', market: 'Austin & Central Texas' };
  return { region: 'hill-country', market: 'San Antonio & Hill Country' };
}

export const TEXAS_GOLF_COURSE_STARTER_RECORDS: GolfCourseStarterRecord[] = raw.trim().split('\n').map((line) => {
  const [ordinalText, name, city] = line.split('|');
  const ordinal = Number(ordinalText);
  const { region, market } = marketFor(ordinal);
  const countySlug = countyOverride[name] ?? countyByCity[city];
  const slug = slugify(name);
  return { ordinal, name, slug, city, countySlug, region, market, existingEntity: existing.has(name), href: `/sports-venue/${slug}` };
});

export const TEXAS_GOLF_COURSE_STARTER_ENTITIES: TexasEntityRecord[] = TEXAS_GOLF_COURSE_STARTER_RECORDS
  .filter((course) => !course.existingEntity)
  .map((course) => ({
    id: `sports-venue:${course.slug}`,
    kind: 'sports-venue',
    name: course.name,
    slug: course.slug,
    aliases: [`${course.name} ${course.city}`],
    description: `${course.name} in ${course.city} is part of TexasDefined's statewide starter directory of 250 Texas golf courses. It is grouped with ${title(course.countySlug)} County and the ${course.market} golf market for local discovery, county browsing and trip planning. Course access, operating details, tee-time availability and policies can change, so confirm current information with the course before visiting.`,
    countySlug: course.countySlug,
    region: course.region,
    sourceId: 'official-destination-sites',
    sourceConfidence: 'high',
    sourceCheckedAt: checkedAt,
    status: 'active',
    relationships: [{ type: 'located-in-county', targetId: `county:${course.countySlug}` }],
    tags: ['sports-venue', 'golf', 'golf-course', 'starter-golf-directory', slugify(course.market)],
  }));

export function golfCourseStarterRecord(slug: string) {
  return TEXAS_GOLF_COURSE_STARTER_RECORDS.find((course) => course.slug === slug);
}

export function golfCourseStarterRecordsForCounty(countySlug: string) {
  return TEXAS_GOLF_COURSE_STARTER_RECORDS.filter((course) => course.countySlug === countySlug);
}

function slugify(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

function title(value: string) {
  return value.replaceAll('-', ' ').replace(/\b\w/g, (character) => character.toUpperCase());
}
