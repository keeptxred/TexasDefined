import type { LakeAuthorityResearch } from "./lake-authority-research-wave1";

/**
 * Dedicated, source-preserving Lake Conroe dossier for the camping cold SSR.
 *
 * Previously this 5KB entry was imported via the entire 291KB multi-lake
 * research registry and its transitive dependencies. Keep the official
 * campground, nearby and fishing rule sources unchanged; the protected
 * parity test checks every value against the original canonical dossier.
 */
export const LAKE_CONROE_RESEARCH: LakeAuthorityResearch = {
  "reviewedAt": "2026-10-31",
  "camping": [
    {
      "name": "Cagle Recreation Area — US Forest Service full-service RV campsite loops",
      "type": "USFS Lake Conroe electric/full-service RV campground",
      "summary": "The US Forest Service's Recreation.gov Cagle campground profile confirms full-service RV hookups in two separate loops, with flush restrooms, hot showers, a two-lane concrete launch and adjacent hiking trails along Lake Conroe. It is reached from FM 1375 west of Interstate 45 near New Waverly; reserve a specific electric site and check the actual facility status.",
      "href": "https://www.recreation.gov/camping/campgrounds/234004"
    },
    {
      "name": "Stubblefield Lake — USFS first-come primitive campground",
      "type": "USFS primitive first-come campground",
      "summary": "Stubblefield is a separate national-forest campground with non-electric sites available only first-come, first-served; Recreation.gov says guests must physically arrive to claim a site and may pay through its Scan and Pay app. TPWD lists a nearby dirt launch for small boats only, not a concrete ramp for larger trailers.",
      "href": "https://www.recreation.gov/camping/campgrounds/10158882"
    },
    {
      "name": "Scott's Ridge — day-use ramp, not an overnight campground",
      "type": "USFS day-use only; camping prohibited",
      "summary": "The US Forest Service's Scott's Ridge is a designated day-use boat access and picnic area with a two-lane concrete ramp west of the FM 1097 bridge. Although it appears alongside Cagle and Stubblefield in TPWD's public-access inventory, visitors should not try to reserve or pitch a tent at Scott's Ridge.",
      "href": "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/conroe/access.phtml"
    }
  ],
  "regulations": [
    {
      "label": "Conroe-specific 16-inch largemouth bass minimum",
      "text": "TPWD's current Conroe waterbody schedule requires a minimum length of 16 inches for largemouth bass, while smallmouth need 14 inches. The daily bag for all black bass species is five combined. This is a specific Conroe exception and must not be replaced with Texas's ordinary 14-inch largemouth minimum.",
      "sourceUrl": "https://tpwd.texas.gov/fishboat/fish/action/fishregs2.php?water=0192"
    },
    {
      "label": "Blue and channel catfish special size distribution",
      "text": "TPWD's Conroe schedule allows 25 blue/channel catfish combined in a day with no minimum length, but only five may be 20 inches or longer and no more than one of those may reach 30 inches. Flathead catfish instead have an 18-inch minimum and five-fish daily limit. Apply the correct species-specific rule.",
      "sourceUrl": "https://tpwd.texas.gov/fishboat/fish/action/fishregs2.php?water=0192"
    },
    {
      "label": "Grass carp immediate release and invasive mussels",
      "text": "TPWD identifies a Triploid Grass Carp Permit at Lake Conroe; caught grass carp must be returned immediately unharmed. The agency also requires draining onboard water to prevent zebra-mussel transfers when departing or approaching freshwater lakes. These rules are independent of campground restrictions.",
      "sourceUrl": "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/conroe/"
    }
  ],
  "nearby": [
    {
      "label": "Cagle Recreation Area — two-mile forest hiking and bicycling trail",
      "description": "The Forest Service's Cagle campground profile identifies a two-mile Cagle Trail accessible from the campground, with hiking and mountain biking through pine and hardwood forest. It is a named on-lake forest outing, with swimming expressly prohibited in the Cagle recreation area.",
      "href": "https://www.recreation.gov/camping/campgrounds/234004",
      "external": true
    },
    {
      "label": "Sam Houston National Forest — Lone Star Hiking Trail",
      "description": "Recreation.gov's Cagle listing identifies the Lone Star Hiking Trail as a roughly 128-mile forest trail system with a section near Lake Conroe, as well as many miles of national-forest equestrian and mountain-bike routes. Check actual trailhead and trail closures rather than treating the entire route as lakefront.",
      "href": "https://www.recreation.gov/camping/campgrounds/234004",
      "external": true
    },
    {
      "label": "FM 830 public boat launch — free TPWD ramp",
      "description": "TPWD lists FM 830 as a no-fee public launch with two concrete ramps at the end of FM 830 west of Interstate 45. It is a separate boat-access option from Cagle's fee-charging forest ramp and is not listed as an overnight camping location.",
      "href": "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/conroe/access.phtml",
      "external": true
    }
  ],
  "sourceUrls": [
    "https://www.recreation.gov/camping/campgrounds/234004",
    "https://www.recreation.gov/camping/campgrounds/10158882",
    "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/conroe/access.phtml",
    "https://tpwd.texas.gov/fishboat/fish/action/fishregs2.php?water=0192",
    "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/conroe/"
  ]
};
