import type { TexasKnowledgeRecord } from './types';

const checkedAt = '2026-08-20';
const sourceUrl = 'https://www.tsl.texas.gov/ref/abouttx/countyseats.html';
const countySeat = (county: string, slug: string, seat: string): TexasKnowledgeRecord => ({
  id: `county-${slug}-seat`, kind: 'county-fact', domain: 'counties', subject: `${county} County`,
  statement: `The county seat of ${county} County is ${seat}.`, countySlug: slug,
  tags: ['county-seat','texas-counties',slug],
  sources: [{ sourceId:'tslac', url:sourceUrl, authority:'Texas State Library and Archives Commission', checkedAt }],
  verification:'verified', verifiedAt:checkedAt, temporalScope:'evergreen', evergreen:true, socialReady:true,
  articlePath:`/county/${slug}`, socialFormats:['county-of-the-day','fact-of-the-day','texas-trivia'], usage:{ timesUsed:0 },
});

export const TEXAS_COUNTY_FACTS_BATCH4: TexasKnowledgeRecord[] = [
  countySeat('Grayson','grayson','Sherman'),
  countySeat('Gregg','gregg','Longview'),
  countySeat('Grimes','grimes','Anderson'),
  countySeat('Guadalupe','guadalupe','Seguin'),
  countySeat('Hale','hale','Plainview'),
  countySeat('Hall','hall','Memphis'),
  countySeat('Hamilton','hamilton','Hamilton'),
  countySeat('Hansford','hansford','Spearman'),
  countySeat('Hardeman','hardeman','Quanah'),
  countySeat('Hardin','hardin','Kountze'),
  countySeat('Harris','harris','Houston'),
  countySeat('Harrison','harrison','Marshall'),
  countySeat('Hartley','hartley','Channing'),
  countySeat('Haskell','haskell','Haskell'),
  countySeat('Hays','hays','San Marcos'),
  countySeat('Hemphill','hemphill','Canadian'),
  countySeat('Henderson','henderson','Athens'),
  countySeat('Hidalgo','hidalgo','Edinburg'),
  countySeat('Hill','hill','Hillsboro'),
  countySeat('Hockley','hockley','Levelland'),
  countySeat('Hood','hood','Granbury'),
  countySeat('Hopkins','hopkins','Sulphur Springs'),
  countySeat('Houston','houston','Crockett'),
  countySeat('Howard','howard','Big Spring'),
  countySeat('Hudspeth','hudspeth','Sierra Blanca'),
  countySeat('Hunt','hunt','Greenville'),
  countySeat('Hutchinson','hutchinson','Stinnett'),
  countySeat('Irion','irion','Mertzon'),
  countySeat('Jack','jack','Jacksboro'),
  countySeat('Jackson','jackson','Edna'),
];
