import type { TexasKnowledgeRecord } from './types';

const checkedAt = '2026-08-20';
const sourceUrl = 'https://www.tsl.texas.gov/ref/abouttx/countyseats.html';
const countySeat = (county: string, slug: string, seat: string): TexasKnowledgeRecord => ({
  id:`county-${slug}-seat`, kind:'county-fact', domain:'counties', subject:`${county} County`,
  statement:`The county seat of ${county} County is ${seat}.`, countySlug:slug,
  tags:['county-seat','texas-counties',slug], sources:[{sourceId:'tslac',url:sourceUrl,authority:'Texas State Library and Archives Commission',checkedAt}],
  verification:'verified', verifiedAt:checkedAt, temporalScope:'evergreen', evergreen:true, socialReady:true,
  articlePath:`/county/${slug}`, socialFormats:['county-of-the-day','fact-of-the-day','texas-trivia'], usage:{timesUsed:0},
});

export const TEXAS_COUNTY_FACTS_BATCH5: TexasKnowledgeRecord[] = [
  countySeat('Jasper','jasper','Jasper'),
  countySeat('Jeff Davis','jeff-davis','Fort Davis'),
  countySeat('Jefferson','jefferson','Beaumont'),
  countySeat('Jim Hogg','jim-hogg','Hebbronville'),
  countySeat('Jim Wells','jim-wells','Alice'),
  countySeat('Johnson','johnson','Cleburne'),
  countySeat('Jones','jones','Anson'),
  countySeat('Karnes','karnes','Karnes City'),
  countySeat('Kaufman','kaufman','Kaufman'),
  countySeat('Kendall','kendall','Boerne'),
  countySeat('Kenedy','kenedy','Sarita'),
  countySeat('Kent','kent','Jayton'),
  countySeat('Kerr','kerr','Kerrville'),
  countySeat('Kimble','kimble','Junction'),
  countySeat('King','king','Guthrie'),
  countySeat('Kinney','kinney','Brackettville'),
  countySeat('Kleberg','kleberg','Kingsville'),
  countySeat('Knox','knox','Benjamin'),
  countySeat('La Salle','la-salle','Cotulla'),
  countySeat('Lamar','lamar','Paris'),
  countySeat('Lamb','lamb','Littlefield'),
  countySeat('Lampasas','lampasas','Lampasas'),
  countySeat('Lavaca','lavaca','Hallettsville'),
  countySeat('Lee','lee','Giddings'),
  countySeat('Leon','leon','Centerville'),
  countySeat('Liberty','liberty','Liberty'),
  countySeat('Limestone','limestone','Groesbeck'),
  countySeat('Lipscomb','lipscomb','Lipscomb'),
  countySeat('Live Oak','live-oak','George West'),
  countySeat('Llano','llano','Llano'),
];
