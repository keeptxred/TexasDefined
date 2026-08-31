export type TexasFactSourceKind = 'official-government' | 'institutional' | 'historical-authority' | 'primary-organization';

export interface TexasFactSource {
  name: string;
  url: string;
  kind: TexasFactSourceKind;
  checkedAt: string;
}

const checkedAt = '2026-08-30';
const source = (name: string, url: string, kind: TexasFactSourceKind): TexasFactSource => ({ name, url, kind, checkedAt });

const SOURCES = {
  tslacSixFlags: source('Texas State Library and Archives Commission — Six Flags Over Texas', 'https://www.tsl.texas.gov/ref/abouttx/sixflags.html', 'official-government'),
  tslacStatehood: source('Texas State Library and Archives Commission — Statehood', 'https://www.tsl.texas.gov/lobbyexhibits/homefortexashistory/statehood', 'official-government'),
  tshaTexasRevolution: source('Handbook of Texas — Texas Revolution', 'https://www.tshaonline.org/handbook/entries/texas-revolution', 'historical-authority'),
  tshaSanJacinto: source('Handbook of Texas — Battle of San Jacinto', 'https://www.tshaonline.org/handbook/entries/san-jacinto-battle-of', 'historical-authority'),
  tshaSamHouston: source('Handbook of Texas — Sam Houston', 'https://www.tshaonline.org/handbook/entries/houston-sam', 'historical-authority'),
  tshaDeclaration: source('Handbook of Texas — Texas Declaration of Independence', 'https://www.tshaonline.org/handbook/entries/texas-declaration-of-independence', 'historical-authority'),
  spbCapitolHistory: source('Texas State Preservation Board — Capitol History', 'https://tspb.texas.gov/prop/tc/tc-history/history/index.html', 'official-government'),
  tshaOldThreeHundred: source('Handbook of Texas — Old Three Hundred', 'https://www.tshaonline.org/handbook/entries/old-three-hundred', 'historical-authority'),
  tshaGonzales: source('Handbook of Texas — Battle of Gonzales', 'https://www.tshaonline.org/handbook/entries/gonzales-battle-of', 'historical-authority'),
  tshaJuneteenth: source('Handbook of Texas — Juneteenth', 'https://www.tshaonline.org/handbook/entries/juneteenth', 'historical-authority'),
  tshaArchivesWar: source('Handbook of Texas — Archives War', 'https://www.tshaonline.org/handbook/entries/archives-war', 'historical-authority'),
  tshaZavala: source('Handbook of Texas — Lorenzo de Zavala', 'https://www.tshaonline.org/handbook/entries/zavala-lorenzo-de', 'historical-authority'),
  tshaAnsonJones: source('Handbook of Texas — Anson Jones', 'https://www.tshaonline.org/handbook/entries/jones-anson', 'historical-authority'),
  tshaLamar: source('Handbook of Texas — Mirabeau B. Lamar', 'https://www.tshaonline.org/handbook/entries/lamar-mirabeau-buonaparte', 'historical-authority'),
  tshaCynthiaParker: source('Handbook of Texas — Cynthia Ann Parker', 'https://www.tshaonline.org/handbook/entries/parker-cynthia-ann', 'historical-authority'),
  tshaQuanahParker: source('Handbook of Texas — Quanah Parker', 'https://www.tshaonline.org/handbook/entries/parker-quanah', 'historical-authority'),
  tshaSpindletop: source('Handbook of Texas — Spindletop Oilfield', 'https://www.tshaonline.org/handbook/entries/spindletop-oilfield', 'historical-authority'),
  tshaGalveston1900: source('Handbook of Texas — Galveston Hurricane of 1900', 'https://www.tshaonline.org/handbook/entries/galveston-hurricane-of-1900', 'historical-authority'),
  tshaNewLondon: source('Handbook of Texas — New London School Explosion', 'https://www.tshaonline.org/handbook/entries/new-london-school-explosion', 'historical-authority'),
  tshaRangers: source('Handbook of Texas — Texas Rangers', 'https://www.tshaonline.org/handbook/entries/texas-rangers', 'historical-authority'),
  tshaMedina: source('Handbook of Texas — Battle of Medina', 'https://www.tshaonline.org/handbook/entries/medina-battle-of', 'historical-authority'),
  tshaFredonian: source('Handbook of Texas — Fredonian Rebellion', 'https://www.tshaonline.org/handbook/entries/fredonian-rebellion', 'historical-authority'),
  tshaLaw1830: source('Handbook of Texas — Law of April 6, 1830', 'https://www.tshaonline.org/handbook/entries/law-of-april-6-1830', 'historical-authority'),
  tshaTravis: source('Handbook of Texas — William Barret Travis', 'https://www.tshaonline.org/handbook/entries/travis-william-barret', 'historical-authority'),
  tshaGoliad: source('Handbook of Texas — Goliad Massacre', 'https://www.tshaonline.org/handbook/entries/goliad-massacre', 'historical-authority'),
  tshaPalmito: source('Handbook of Texas — Battle of Palmito Ranch', 'https://www.tshaonline.org/handbook/entries/palmito-ranch-battle-of', 'historical-authority'),
  censusTexas: source('U.S. Census Bureau — Texas profile', 'https://data.census.gov/profile?g=040XX00US48&q=Texas', 'official-government'),
  comptrollerCounties: source('Texas Comptroller — Texas counties', 'https://comptroller.texas.gov/transparency/local/counties.php', 'official-government'),
  censusBrewster: source('U.S. Census Bureau — Brewster County profile', 'https://data.census.gov/profile/Brewster_County%2C_Texas?g=050XX00US48043', 'official-government'),
  censusRockwall: source('U.S. Census Bureau — Rockwall County profile', 'https://data.census.gov/profile/Rockwall_County%2C_Texas?g=050XX00US48397', 'official-government'),
  npsGuadalupePeak: source('National Park Service — Guadalupe Peak', 'https://www.nps.gov/places/gumo_guadalupe_peak.htm', 'official-government'),
  usgsElevations: source('U.S. Geological Survey — Highest and Lowest Elevations', 'https://www.usgs.gov/educational-resources/highest-and-lowest-elevations', 'official-government'),
  tpwdPaloDuro: source('Texas Parks and Wildlife — Palo Duro Canyon nature', 'https://tpwd.texas.gov/state-parks/palo-duro-canyon/nature', 'official-government'),
  tpwdCaddo: source('Texas Parks and Wildlife — Caddo Lake nature', 'https://tpwd.texas.gov/state-parks/caddo-lake/nature', 'official-government'),
  tshaLlano: source('Handbook of Texas — Llano Estacado', 'https://www.tshaonline.org/handbook/entries/llano-estacado', 'historical-authority'),
  tshaBalcones: source('Handbook of Texas — Balcones Escarpment', 'https://www.tshaonline.org/handbook/entries/balcones-escarpment', 'historical-authority'),
  tpwdEnchantedRock: source('Texas Parks and Wildlife — Enchanted Rock', 'https://tpwd.texas.gov/state-parks/enchanted-rock', 'official-government'),
  npsChisos: source('National Park Service — Chisos Mountains', 'https://www.nps.gov/places/chisos-mountains-wayside.htm', 'official-government'),
  govinfoTimeZones: source('U.S. Government Publishing Office — El Paso and Hudspeth time zone law', 'https://www.govinfo.gov/content/pkg/STATUTE-84/pdf/STATUTE-84-Pg119.pdf', 'official-government'),
  usgsGeographicCenter: source('U.S. Geological Survey — Geographic Centers', 'https://www.usgs.gov/educational-resources/geographic-centers', 'official-government'),
  eaaAquifer: source('Edwards Aquifer Authority — Learn About the Aquifer', 'https://www.edwardsaquifer.org/education/learn-about-the-aquifer/', 'official-government'),
  austinGroundwater: source('City of Austin — Groundwater', 'https://www.austintexas.gov/watershed-protection/programs/groundwater', 'official-government'),
  txstJacobsWell: source('Texas State University — Cypress Creek Watershed report', 'https://gato-docs.its.txst.edu/jcr%3A7965dedc-c670-4cba-b1ac-215f1b46ff97/2014CypressCreek.pdf', 'institutional'),
  eiaPermian: source('U.S. Energy Information Administration — Permian production', 'https://www.eia.gov/todayinenergy/detail.php?id=67984', 'official-government'),
  tshaTransPecos: source('Handbook of Texas — Trans-Pecos', 'https://www.tshaonline.org/handbook/entries/trans-pecos', 'historical-authority'),
  tpwdBlackland: source('Texas Parks and Wildlife — Blackland Prairie', 'https://tpwd.texas.gov/landwater/land/habitats/cross_timbers/ecoregions/blackland.phtml', 'official-government'),
  tshaRedRiver: source('Handbook of Texas — Red River', 'https://www.tshaonline.org/handbook/entries/red-river', 'historical-authority'),
  tshaSabine: source('Handbook of Texas — Sabine River', 'https://www.tshaonline.org/handbook/entries/sabine-river', 'historical-authority'),
  tpwdFranklin: source('Texas Parks and Wildlife — Franklin Mountains', 'https://tpwd.texas.gov/state-parks/franklin-mountains', 'official-government'),
  npsBigThicket: source('National Park Service — Big Thicket ecosystems', 'https://www.nps.gov/bith/learn/nature/naturalfeaturesandecosystems.htm', 'official-government'),
  tpwdLonghorn: source('Texas Parks and Wildlife — Longhorn Cavern', 'https://tpwd.texas.gov/state-parks/longhorn-cavern/', 'official-government'),
  tslacSymbols: source('Texas State Library and Archives Commission — Texas State Symbols', 'https://www.tsl.texas.gov/ref/abouttx/symbols', 'official-government'),
  texasFlagCode: source('Texas Government Code Chapter 3100 — State Flag', 'https://statutes.capitol.texas.gov/Docs/GV/pdf/GV.3100.pdf', 'official-government'),
  banderaCvb: source('Bandera County Convention and Visitors Bureau — Cowboy Capital of the World', 'https://www.banderacowboycapital.com/', 'primary-organization'),
  stateFairHistory: source('State Fair of Texas — History', 'https://bigtex.com/about-us/history/', 'primary-organization'),
  smithsonianMargarita: source('Smithsonian National Museum of American History — Frozen Margarita Machine', 'https://americanhistory.si.edu/collections/object/nmah_1294740', 'institutional'),
  visitAmarilloCadillac: source('Visit Amarillo — Cadillac Ranch', 'https://www.visitamarillo.com/listing/cadillac-ranch/625/', 'primary-organization'),
  tshaBobWills: source('Handbook of Texas — Bob Wills', 'https://www.tshaonline.org/handbook/entries/wills-james-robert', 'historical-authority'),
  tshaAstrodome: source('Handbook of Texas — Astrodome', 'https://www.tshaonline.org/handbook/entries/astrodome', 'historical-authority'),
  drPepperMuseum: source('Dr Pepper Museum — History', 'https://drpeppermuseum.com/history/', 'primary-organization'),
  thcMoonlight: source('Texas Historical Commission — Austin Moonlight Towers', 'https://atlas.thc.texas.gov/Details/2076002071', 'official-government'),
  utTexasGerman: source('University of Texas — Texas German Dialect Project', 'https://cola.utexas.edu/germanic/texas-german-dialect-project/', 'institutional'),
  tiKilby: source('Texas Instruments — The chip that changed the world', 'https://www.ti.com/about-ti/behind-chip/articles/the-chip-that-changed-the-world.html', 'primary-organization'),
  nasaJsc: source('NASA — Johnson Space Center', 'https://www.nasa.gov/reference/johnson-space-center/', 'official-government'),
  tamuCotton: source('Texas A&M AgriLife — Texas Cotton', 'https://cotton.tamu.edu/', 'institutional'),
  tshaRanching: source('Handbook of Texas — Ranching', 'https://www.tshaonline.org/handbook/entries/ranching', 'historical-authority'),
  dellTimeline: source('Dell Technologies — Company timeline', 'https://www.dell.com/en-us/lp/dt/timeline', 'primary-organization'),
  wholeFoodsHistory: source('Whole Foods Market — Company history', 'https://www.wholefoodsmarket.com/company-info/whole-foods-market-history', 'primary-organization'),
  southwestHistory: source('Southwest Airlines — History FAQs', 'https://history.southwest.com/faqs/', 'primary-organization'),
  americanOverview: source('American Airlines — American Airlines Group overview', 'https://www.aa.com/web/i18n/customer-service/about-us/american-airlines-group.html', 'primary-organization'),
  tmcAbout: source('Texas Medical Center — About TMC', 'https://www.tmc.edu/about-tmc/', 'primary-organization'),
  toyotaTexas: source('Toyota — Texas manufacturing facility', 'https://pressroom.toyota.com/facility/toyota-motor-manufacturing-texas/', 'primary-organization'),
  peterbiltFaq: source('Peterbilt — FAQ and Denton manufacturing', 'https://www.peterbilt.com/faq', 'primary-organization'),
  lockheedF35: source('Lockheed Martin — F-35 from design to delivery', 'https://www.lockheedmartin.com/f35/about/from-design-to-delivery.html', 'primary-organization'),
  tamuGrapefruit: source('Texas A&M AgriLife — History of Texas grapefruit', 'https://bexar-tx.tamu.edu/homehort/archives-of-weekly-articles-davids-plant-of-the-week/the-history-of-texas-grapefruit/', 'institutional'),
  sevenElevenHistory: source('7-Eleven — About 7-Eleven', 'https://vazata.7-eleven.com/corp/about', 'primary-organization'),
  shinerBrewery: source('Spoetzl Brewery — Shiner brewery', 'https://shiner.com/brewery/', 'primary-organization'),
  txCourtsSystem: source('Texas Judicial Branch — Judicial System pamphlet', 'https://www.txcourts.gov/media/1460294/judicial-system-pamphlet-2025.pdf', 'official-government'),
  texasConstitutionArt3: source('Texas Constitution — Article III', 'https://statutes.capitol.texas.gov/Docs/CN/htm/CN.3.htm', 'official-government'),
  sosElected: source('Texas Secretary of State — Elected officials', 'https://www.sos.texas.gov/elections/voter/elected.shtml', 'official-government'),
  texasConstitution: source('Texas Legislative Council — Texas Constitution publications', 'https://tlc.texas.gov/publications', 'official-government'),
  texasPsf: source('Texas Permanent School Fund Corporation', 'https://texaspsf.org/', 'official-government'),
  utimcoPuf: source('UTIMCO — Permanent University Fund', 'https://www.utimco.org/funds-managed/endowment-funds/permanent-university-fund-puf/', 'institutional'),
  familyCodeCommunity: source('Texas Family Code § 3.002 — Community Property', 'https://statutes.capitol.texas.gov/?artSec=3.002&chapter=FA.3&code=FA&tab=1', 'official-government'),
  spbCapitolHeight: source('Texas State Preservation Board — Capitol Myths and Legends', 'https://tspb.texas.gov/prop/tc/tc-history/myths-legends/index.html', 'official-government'),
} as const;

type SourceKey = keyof typeof SOURCES;

const SOURCE_KEYS_BY_FACT_ID: Record<number, readonly SourceKey[]> = {
  1: ['tslacSixFlags'], 2: ['tslacStatehood'], 3: ['tshaTexasRevolution'], 4: ['tshaSanJacinto'], 5: ['tshaSamHouston'],
  6: ['tshaDeclaration'], 7: ['spbCapitolHistory'], 8: ['tshaOldThreeHundred'], 9: ['tshaGonzales'], 10: ['tshaJuneteenth'],
  11: ['tshaArchivesWar'], 12: ['tshaZavala'], 13: ['tshaAnsonJones'], 14: ['tshaLamar'], 15: ['tshaCynthiaParker', 'tshaQuanahParker'],
  16: ['tshaSpindletop'], 17: ['tshaGalveston1900'], 18: ['tshaGalveston1900'], 19: ['tshaNewLondon'], 20: ['tshaRangers'],
  21: ['tshaMedina'], 22: ['tshaFredonian'], 23: ['tshaLaw1830'], 24: ['tshaTravis'], 25: ['tshaGoliad'], 26: ['tshaPalmito'],
  27: ['censusTexas'], 28: ['comptrollerCounties'], 29: ['censusBrewster'], 30: ['censusRockwall'], 31: ['npsGuadalupePeak'],
  32: ['usgsElevations'], 33: ['tpwdPaloDuro'], 34: ['tpwdCaddo'], 35: ['tshaLlano'], 36: ['tshaBalcones'], 37: ['tpwdEnchantedRock'],
  38: ['npsChisos'], 39: ['govinfoTimeZones'], 40: ['usgsGeographicCenter'], 41: ['eaaAquifer'], 42: ['austinGroundwater'],
  43: ['txstJacobsWell'], 44: ['eiaPermian'], 45: ['tshaTransPecos'], 46: ['tpwdBlackland'], 47: ['tshaRedRiver'], 48: ['tshaSabine'],
  49: ['tpwdFranklin'], 50: ['npsBigThicket'], 51: ['tpwdLonghorn'],
  52: ['tslacSymbols'], 53: ['tslacSymbols'], 54: ['tslacSymbols'], 55: ['tslacSymbols'], 56: ['tslacSymbols'], 57: ['tslacSymbols'],
  58: ['tslacSymbols'], 59: ['tslacSymbols'], 60: ['tslacSymbols'], 61: ['tslacSymbols'], 62: ['tslacSymbols'], 63: ['texasFlagCode'],
  64: ['tslacSymbols'], 65: ['tslacSymbols'], 66: ['banderaCvb'], 67: ['stateFairHistory'], 68: ['smithsonianMargarita'], 69: ['visitAmarilloCadillac'],
  70: ['tshaBobWills'], 71: ['tshaAstrodome'], 72: ['tshaAstrodome'], 73: ['drPepperMuseum'], 74: ['thcMoonlight'], 75: ['utTexasGerman'],
  76: ['tiKilby'], 77: ['nasaJsc'], 78: ['tamuCotton'], 79: ['tshaRanching'], 80: ['dellTimeline'], 81: ['wholeFoodsHistory'],
  82: ['southwestHistory'], 83: ['americanOverview'], 84: ['tmcAbout'], 85: ['toyotaTexas'], 86: ['peterbiltFaq'], 87: ['lockheedF35'],
  88: ['tamuGrapefruit'], 89: ['sevenElevenHistory'], 90: ['shinerBrewery'],
  91: ['txCourtsSystem'], 92: ['texasConstitutionArt3'], 93: ['sosElected'], 94: ['texasConstitution'], 95: ['texasConstitutionArt3'],
  96: ['texasPsf'], 97: ['utimcoPuf'], 98: ['familyCodeCommunity'], 99: ['comptrollerCounties'], 100: ['spbCapitolHistory', 'spbCapitolHeight'],
};

export function texasEssentialFactSources(factId: number): readonly TexasFactSource[] {
  const keys = SOURCE_KEYS_BY_FACT_ID[factId];
  if (!keys?.length) throw new Error(`Texas essential fact ${factId} has no claim-level source assignment.`);
  return keys.map((key) => SOURCES[key]);
}

export const TEXAS_ESSENTIAL_FACT_SOURCE_ASSIGNMENTS = SOURCE_KEYS_BY_FACT_ID;
export const TEXAS_ESSENTIAL_FACT_SOURCE_REGISTRY = SOURCES;
