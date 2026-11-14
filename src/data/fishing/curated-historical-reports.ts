import type { FishingReport, FishingSource } from "./types";

/**
 * First-person/TPWD archives, not newly observed fishing conditions.
 * All records are expired by date and must remain noindex. TPWD stopped
 * publishing new weekly reports after February 2026.
 */
const REVIEWED = "2026-11-05";
type ReportSeed = {slug:string; lakeId:string; lakeName:string; publishedAt:string; sourceUrl:string; sourceName:string; speciesId:string; summary:string; observation:string};
const archived: ReportSeed[] = [
  {
    slug:"tpwd-conroe-february-25-2026", lakeId:"lake-conroe", lakeName:"Lake Conroe", publishedAt:"2026-02-25",
    sourceUrl:"https://tpwd.texas.gov/fishboat/fish/action/reptform2.php?Submit=Go&archive=wholeyear&lake=CONROE&yearcat=current", sourceName:"TPWD Lake Conroe archived weekly report", speciesId:"largemouth-bass",
    summary:"Historical TPWD report from February 25, 2026. Its contributors described shallow-water bass movement during an early-spring warming period; this does not describe today's lake.",
    observation:"The archived account noted bass moving into spawning areas while baitfish moved shallow. Verify modern lake conditions separately."
  },
  {
    slug:"tpwd-fork-february-25-2026", lakeId:"lake-fork", lakeName:"Lake Fork", publishedAt:"2026-02-25",
    sourceUrl:"https://tpwd.texas.gov/fishboat/fish/action/reptform2.php?Submit=Go&archive=wholeyear&lake=FORK&yearcat=current", sourceName:"TPWD Lake Fork archived weekly report", speciesId:"largemouth-bass",
    summary:"Historical TPWD report from February 25, 2026. Bass activity was described as slower early in the day, with warming-water movements toward pockets and cover; not a present-day assessment.",
    observation:"That report referred to variable winter-to-spring bass positioning near flats, wood and channels. The original page contains the dated observations."
  },
  {
    slug:"tpwd-rayburn-february-25-2026", lakeId:"sam-rayburn-reservoir", lakeName:"Sam Rayburn Reservoir", publishedAt:"2026-02-25",
    sourceUrl:"https://tpwd.texas.gov/fishboat/fish/action/reptform2.php?Submit=Go&archive=wholeyear&lake=SAM+RAYBURN&yearcat=current", sourceName:"TPWD Sam Rayburn archived weekly report", speciesId:"largemouth-bass",
    summary:"Historical TPWD report from February 25, 2026, describing muddy, low-water conditions and pre-spawn bass staging. Water levels and conditions may have changed substantially since then.",
    observation:"The archived contributor identified points and pockets as transitional bass areas during that week, not a recommendation based on present conditions."
  },
  {
    slug:"tpwd-texoma-february-25-2026", lakeId:"lake-texoma", lakeName:"Lake Texoma", publishedAt:"2026-02-25",
    sourceUrl:"https://tpwd.texas.gov/fishboat/fish/action/reptform2.php?Submit=Go&archive=wholeyear&lake=TEXOMA&yearcat=current", sourceName:"TPWD Lake Texoma archived weekly report", speciesId:"striped-bass",
    summary:"Historical TPWD report from February 25, 2026, describing variable striped-bass activity amid changing weather. This cannot be used as a current fishing forecast.",
    observation:"The original source separated shallow structure fishing from open-water approaches during that particular week."
  },
  {
    slug:"tpwd-travis-february-25-2026", lakeId:"lake-travis", lakeName:"Lake Travis", publishedAt:"2026-02-25",
    sourceUrl:"https://tpwd.texas.gov/fishboat/fish/action/reptform2.php?Submit=Go&archive=wholeyear&lake=TRAVIS&yearcat=current", sourceName:"TPWD Lake Travis archived weekly report", speciesId:"largemouth-bass",
    summary:"Historical TPWD report from February 25, 2026, describing bass holding around shallow submerged brush during that week. Not a statement about current lake levels or activity.",
    observation:"The dated account described a weighted swimbait approach around shallow brush; current conditions require a new observation."
  },
  {
    slug:"lake-fork-james-caldemeyer-october-2026", lakeId:"lake-fork", lakeName:"Lake Fork", publishedAt:"2026-10-02",
    sourceUrl:"https://officiallakeforktrophybass.com/fishing-report/lake-fork-fishing-report-october-2026/", sourceName:"James Caldemeyer Lake Fork October 2026 first-party report", speciesId:"largemouth-bass",
    summary:"Guide-authored Lake Fork bass observations published October 2, 2026. The source discusses autumn transition, shallow vegetation and deep-water baitfish; these October conditions have expired.",
    observation:"The guide described multiple autumn bass approaches in October, contrasting shallow-cover activity with deeper structure and baitfish. See the original for context."
  },
];
export const curatedHistoricalFishingReports: FishingReport[] = archived.map((item) => {
  const source: FishingSource = {
    id:`history-source-${item.slug}`,name:item.sourceName,url:item.sourceUrl,checkedAt:REVIEWED,sourceType:item.sourceUrl.includes("tpwd.texas.gov") ? "state" : "business"
  };
  return {
    id:`archive-${item.slug}`,brandId:"texasdefined",slug:item.slug,status:"published",verifiedAt:REVIEWED,
    sources:[source],lakeId:item.lakeId,title:`${item.lakeName} fishing report — ${item.publishedAt} (archive)`,
    publishedAt:item.publishedAt,summary:item.summary,
    speciesUpdates:[{speciesId:item.speciesId,summary:item.observation}],
  };
});
