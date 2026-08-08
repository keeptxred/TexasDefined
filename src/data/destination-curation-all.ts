import { applyCuratedDestination } from "./destination-curation";
import { applyCuratedDestinationBatch2 } from "./destination-curation-batch2";
import { applyCuratedDestinationBatch3 } from "./destination-curation-batch3";
import { applyCuratedDestinationBatch4 } from "./destination-curation-batch4";
import { applyCuratedDestinationBatch5 } from "./destination-curation-batch5";
import { applyCuratedDestinationBatch6 } from "./destination-curation-batch6";
import { applyCuratedDestinationBatch7 } from "./destination-curation-batch7";
import { applyCuratedDestinationBatch8 } from "./destination-curation-batch8";
import { applyCuratedDestinationBatch9 } from "./destination-curation-batch9";
import { applyCuratedDestinationBatch10 } from "./destination-curation-batch10";
import { applyCuratedDestinationBatch11 } from "./destination-curation-batch11";
import { applyCuratedDestinationBatch12 } from "./destination-curation-batch12";
import { applyCuratedDestinationBatch13 } from "./destination-curation-batch13";
import { applyCuratedDestinationBatch14 } from "./destination-curation-batch14";
import { applyCuratedDestinationBatch15 } from "./destination-curation-batch15";
import { applyCuratedDestinationBatch16 } from "./destination-curation-batch16";
import { applyCuratedDestinationBatch17 } from "./destination-curation-batch17";
import { applyCuratedDestinationBatch18 } from "./destination-curation-batch18";
import { applyCuratedDestinationBatch19 } from "./destination-curation-batch19";
import { applyCuratedDestinationBatch20 } from "./destination-curation-batch20";
import { applyCuratedDestinationBatch21 } from "./destination-curation-batch21";
import { applyCuratedDestinationBatch22 } from "./destination-curation-batch22";
import { applyCuratedDestinationBatch23 } from "./destination-curation-batch23";
import { applyCuratedDestinationBatch24 } from "./destination-curation-batch24";
import { applyCuratedDestinationBatch25 } from "./destination-curation-batch25";
import { applyCuratedDestinationBatch26 } from "./destination-curation-batch26";
import { applyCuratedDestinationBatch27 } from "./destination-curation-batch27";
import { applyCuratedDestinationBatch28 } from "./destination-curation-batch28";
import { applyCuratedDestinationBatch29 } from "./destination-curation-batch29";
import { applyCuratedDestinationBatch30 } from "./destination-curation-batch30";
import { applyCuratedDestinationBatch31 } from "./destination-curation-batch31";
import { applyCuratedDestinationBatch32 } from "./destination-curation-batch32";
import { applyCuratedDestinationBatch33 } from "./destination-curation-batch33";
import { applyCuratedDestinationBatch34 } from "./destination-curation-batch34";
import { applyCuratedDestinationBatch35 } from "./destination-curation-batch35";
import { applyCuratedDestinationBatch36 } from "./destination-curation-batch36";
import { applyCuratedDestinationBatch37 } from "./destination-curation-batch37";
import { applyCuratedDestinationBatch38 } from "./destination-curation-batch38";
import { applyCuratedDestinationBatch39 } from "./destination-curation-batch39";
import { applyCuratedDestinationBatch40 } from "./destination-curation-batch40";
import { applyCuratedDestinationBatch41 } from "./destination-curation-batch41";
import { applyCuratedDestinationBatch42 } from "./destination-curation-batch42";
import { applyCuratedDestinationBatch43 } from "./destination-curation-batch43";
import { applyCuratedDestinationBatch44 } from "./destination-curation-batch44";
import { applyCuratedDestinationBatch45 } from "./destination-curation-batch45";
import type { Destination } from "./types";

const CURATION_SLUG_ALIASES: Record<string, string> = {
  "barton-warnock-environmental-educational-center-state-park": "barton-warnock-visitor-center",
  "caprock-canyons-trailway-estelline-terminal-state-park": "caprock-canyons-state-park",
  "choke-canyon-calliham-unit-state-park": "choke-canyon-state-park",
  "choke-canyon-north-shore-unit-state-park": "choke-canyon-state-park",
  "choke-canyon-south-shore-unit-state-park": "choke-canyon-state-park",
  "cooper-lake-doctors-creek-unit-state-park": "cooper-lake-state-park",
  "cooper-lake-johns-creek-unit-state-park": "cooper-lake-state-park",
  "cooper-lake-south-sulphur-unit-state-park": "cooper-lake-state-park",
  "devil-s-sinkhole-state-natural-area": "devils-sinkhole-state-natural-area",
  "devils-river-big-satan-unit-state-natural-area": "devils-river-state-natural-area",
  "devils-river-del-norte-unit-state-natural-area": "devils-river-state-natural-area",
  "goliad-state-park": "goliad-state-park-and-historic-site",
  "goliad-state-park-state-historic-site": "goliad-state-park-and-historic-site",
  "hill-country-louise-merrick-unit-state-natural-area": "hill-country-state-natural-area",
  "hueco-tanks-state-park": "hueco-tanks-state-park-and-historic-site",
  "hueco-tanks-state-park-state-historic-site": "hueco-tanks-state-park-and-historic-site",
  "indian-lodge-state-park-lodge": "indian-lodge",
  "lake-mineral-wells-trailway-garner-th-state-park": "lake-mineral-wells-state-park",
  "lake-somerville-birch-creek-unit": "lake-somerville-state-park",
  "lake-somerville-birch-creek-unit-state-park": "lake-somerville-state-park",
  "lake-somerville-nails-creek-unit": "lake-somerville-state-park",
  "lake-somerville-nails-creek-unit-state-park": "lake-somerville-state-park",
  "lake-somerville-trailway-newman-bottom-th-state-park": "lake-somerville-state-park",
  "lyndon-b-johnson-state-park-historic-site": "lyndon-b-johnson-state-park-and-historic-site",
  "lyndon-b-johnson-state-park-state-historic-site": "lyndon-b-johnson-state-park-and-historic-site",
  "monument-hill-kreische-brewery-state-historic-site": "monument-hill-and-kreische-brewery-state-historic-sites",
  "possum-kingdom-lake": "possums-kingdom-lake",
  "ray-roberts-lake-isle-du-bois-unit": "ray-roberts-lake-state-park-isle-du-bois-unit",
  "ray-roberts-lake-isle-du-bois-unit-state-park": "ray-roberts-lake-state-park-isle-du-bois-unit",
  "ray-roberts-lake-johnson-branch-unit": "ray-roberts-lake-state-park-johnson-branch-unit",
  "ray-roberts-lake-johnson-branch-unit-state-park": "ray-roberts-lake-state-park-johnson-branch-unit",
  "ray-roberts-lake-jordon-unit-state-park": "ray-roberts-lake-state-park",
  "san-jacinto-battleground": "san-jacinto-battleground-state-historic-site",
  "san-jacinto-monument-state-historic-site": "san-jacinto-battleground-state-historic-site",
  "san-marcos-springs-spring-lake": "san-marcos-springs",
  "seminole-canyon-state-park": "seminole-canyon-state-park-and-historic-site",
  "seminole-canyon-state-park-state-historic-site": "seminole-canyon-state-park-and-historic-site",
  "sheldon-lake-state-park-environmental-learning-center": "sheldon-lake-state-park",
  "washington-on-the-brazos": "washington-on-the-brazos-state-historic-site",
  "world-birding-center-bentsen-rio-grande-valley-state-park": "bentsen-rio-grande-valley-state-park",
  "world-birding-center-estero-llano-grande-state-park": "estero-llano-grande-state-park",
  "world-birding-center-resaca-de-la-palma-state-park": "resaca-de-la-palma-state-park"
};
const CURATORS:Array<(destination:Destination)=>Destination>=[applyCuratedDestination,applyCuratedDestinationBatch2,applyCuratedDestinationBatch3,applyCuratedDestinationBatch4,applyCuratedDestinationBatch5,applyCuratedDestinationBatch6,applyCuratedDestinationBatch7,applyCuratedDestinationBatch8,applyCuratedDestinationBatch9,applyCuratedDestinationBatch10,applyCuratedDestinationBatch11,applyCuratedDestinationBatch12,applyCuratedDestinationBatch13,applyCuratedDestinationBatch14,applyCuratedDestinationBatch15,applyCuratedDestinationBatch16,applyCuratedDestinationBatch17,applyCuratedDestinationBatch18,applyCuratedDestinationBatch19,applyCuratedDestinationBatch20,applyCuratedDestinationBatch21,applyCuratedDestinationBatch22,applyCuratedDestinationBatch23,applyCuratedDestinationBatch24,applyCuratedDestinationBatch25,applyCuratedDestinationBatch26,applyCuratedDestinationBatch27,applyCuratedDestinationBatch28,applyCuratedDestinationBatch29,applyCuratedDestinationBatch30,applyCuratedDestinationBatch31,applyCuratedDestinationBatch32,applyCuratedDestinationBatch33,applyCuratedDestinationBatch34,applyCuratedDestinationBatch35,applyCuratedDestinationBatch36,applyCuratedDestinationBatch37,applyCuratedDestinationBatch38,applyCuratedDestinationBatch39,applyCuratedDestinationBatch40,applyCuratedDestinationBatch41,applyCuratedDestinationBatch42,applyCuratedDestinationBatch43,applyCuratedDestinationBatch44,applyCuratedDestinationBatch45];
function runCurators(destination:Destination):Destination{return CURATORS.reduce((current,curate)=>curate(current),destination);}
export function applyAllCuratedDestination(destination:Destination):Destination{const originalSlug=destination.slug;const curationSlug=CURATION_SLUG_ALIASES[originalSlug]??originalSlug;const candidate=curationSlug===originalSlug?destination:{...destination,slug:curationSlug};const curated=runCurators(candidate);return curationSlug===originalSlug?curated:{...curated,slug:originalSlug};}
export function applyAllCuratedDestinations(destinations:Destination[]):Destination[]{return destinations.map(applyAllCuratedDestination);}
