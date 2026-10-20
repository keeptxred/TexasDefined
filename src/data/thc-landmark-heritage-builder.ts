import type { Destination, DestinationAuthorityGuide } from "./types";

/** Individual THC heritage destinations. A district's map pin is an orientation
 * point, not a legal boundary; a listing never grants access to private property.
 * Facts and visitor controls are site-specific. */
export type ThcHeritageProfile = {
  slug: string; name: string; summary: string; town: string; county: string;
  region: Destination["region"]; coordinates: Destination["coordinates"];
  address: string; imageFile: string; imageAlt: string; imageCredit: string;
  imageWidth: number; imageHeight: number; officialUrl: string; operator: string;
  season: string; entry: string; accessibility: string; highlights: string[];
  body: string[]; faqs: NonNullable<Destination["visitorFaqs"]>;
  sources: DestinationAuthorityGuide["sources"];
  whyVisit: string; firstVisitSteps: [string, string, string];
  physicalEffort?: DestinationAuthorityGuide["assessment"]["physicalEffort"];
};
export const thcSource = (label: string, url: string, scope: string) => ({label,url,scope});
export const thcFaq = (question: string, answer: string, sourceUrl: string) => ({question,answer,sourceUrl});
export const commonsFilePage = (file: string) => "https://commons.wikimedia.org/wiki/File:" + encodeURIComponent(file).replace(/%20/g, "_");
export function makeThcHeritageDestination(site: ThcHeritageProfile): Destination {
  const itineraries: DestinationAuthorityGuide["itineraries"] = [
    {label:"First visit",duration:"One to two hours when access permits",steps:site.firstVisitSteps},
    {label:"Research before arrival",duration:"Before traveling",steps:[
      "Read the official history and designation documents, noting what period each historical claim describes.",
      "Check present-day operator rules, hours, accessible entry and safe parking: National Register listing never promises interior access.",
      "Use the site's county and town history to connect the landmark with the relevant regional heritage collections.",
    ]},
    {label:"Deeper contextual exploration",duration:"Half day or longer",steps:[
      "Begin at a permitted public viewpoint or arranged tour, following all ownership and access rules.",
      "Study the buildings or landscape that best illustrate the site's historical significance, separating alterations from original fabric.",
      "Continue to a separately accessible nearby town or museum, checking its independent hours and entry policies.",
    ]},
  ];
  return {
    id:"thc-nrhp-"+site.slug, brandId:"texasdefined", slug:site.slug,
    name:site.name, summary:site.summary, category:"historic-sites", region:site.region,
    nearestTown:site.town, county:site.county, coordinates:site.coordinates,
    address:site.address,
    hero:{
      src:"https://commons.wikimedia.org/wiki/Special:Redirect/file/"+encodeURIComponent(site.imageFile)+"?width=1600",
      alt:site.imageAlt,credit:site.imageCredit,width:site.imageWidth,height:site.imageHeight,
    },
    bestSeason:site.season,entryNote:site.entry,accessibilityNotes:site.accessibility,
    officialUrl:site.officialUrl,managingAuthority:site.operator,
    sourceCheckedAt:"2026-10-12",highlights:site.highlights,body:site.body,
    visitorFaqs:site.faqs,
    authorityGuide:{
      whyItMatters:site.summary+" "+site.body[0],
      assessment:{
        recommendedVisit:site.whyVisit,
        physicalEffort:site.physicalEffort??"Low to moderate",
        weatherExposure:"Mostly outdoors",
        planningLevel:"Moderate",
        familyFit:"A history-focused visit works for families when public access, weather and traffic are considered.",
        firstTimeValue:site.firstVisitSteps[0],
      },
      itineraries,sources:site.sources,
    },
  };
}
