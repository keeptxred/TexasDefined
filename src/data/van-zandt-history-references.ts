/**
 * Sources placed beside the relevant historical sections on the county page.
 * These provide traceable background for the subject of each section; they are
 * not blanket certification of every editorial interpretation in the prose.
 */
const county = { label: 'Handbook of Texas — Van Zandt County', url: 'https://www.tshaonline.org/handbook/entries/van-zandt-county' };
const towns = { label: 'Van Zandt County Historical Commission — towns', url: 'https://vanzandtcountyhistoricalcommission.wordpress.com/towns-of-van-zandt-county/' };
const wills = { label: 'Handbook of Texas — Wills Point', url: 'https://www.tshaonline.org/handbook/entries/wills-point-tx' };
const courthouse = { label: 'Texas Historical Commission — 1937 courthouse', url: 'https://atlas.thc.texas.gov/Details/4302000092' };
const salt = { label: 'Grand Saline Salt Palace Museum — salt history', url: 'https://grandsalinesaltpalace.com/about' };
const market = { label: 'Canton First Monday — history and visitor information', url: 'https://www.firstmondaycanton.com/about' };
const tawakoni = { label: 'Texas Parks & Wildlife — Lake Tawakoni State Park', url: 'https://tpwd.texas.gov/state-parks/lake-tawakoni' };
const purtis = { label: 'Texas Parks & Wildlife — Purtis Creek State Park', url: 'https://tpwd.texas.gov/state-parks/purtis-creek' };

export const VAN_ZANDT_HISTORY_REFERENCES: Record<string, ReadonlyArray<{ label: string; url: string }>> = {
  'A county carved from Henderson County': [county, towns],
  'Canton grew around county government': [county, courthouse],
  'The Wills Point War was really a fight over transportation': [county, wills],
  "Wills Point became the county's railroad gateway": [wills, towns],
  'Salt made Grand Saline different from every other county town': [county, salt],
  'Grand Saline became Texas salt country': [salt, county],
  'Farming shaped most of the county': [county],
  'Reconstruction changed labor and politics': [county],
  'Van grew from railroad and oil country': [county],
  'First Monday Trade Days gave Canton a second identity': [market],
  'First Monday also shows how rural traditions adapt': [market],
  "Lake Tawakoni changed the county's northwest corner": [tawakoni, county],
  'Purtis Creek adds a quieter outdoor landscape': [purtis],
  'The county sits on a major east-west corridor': [county],
  'Canton, Wills Point and Grand Saline tell three different stories': [county, wills, salt],
  'How to explore Van Zandt County': [market, tawakoni, purtis],
  'What defines Van Zandt County': [county, courthouse, salt],
};
