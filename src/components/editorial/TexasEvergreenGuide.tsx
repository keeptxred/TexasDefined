import { Link } from "@tanstack/react-router";

import { hideFailedImageContainer } from "@/lib/image-fallback";
import { editorialImageSrc } from "@/lib/editorial-image-delivery";
import { TexasCultureGuideFieldwork } from "@/components/editorial/TexasCultureGuideFieldwork";

import bbqBrisket from "@/assets/bbq-brisket.jpg";
import bigBend from "@/assets/big-bend.jpg";
import kolacheKlobasnek from "@/assets/kolache-klobasnek-hero-photo.jpg";
import { Container } from "@/components/layout/Container";
import { SchoolSupplyPartners } from "@/components/monetization/SchoolSupplyPartners";
import type { TexasEvergreenGuide as TexasEvergreenGuideData } from "@/data/texas-evergreen-guides";

const siteUrl = "https://texasdefined.com";

const foodHistoryGuideSlugs = new Set([
  "texas-food-trail",
  "texas-chili-con-carne-history",
  "texas-chicken-fried-steak-guide",
  "texas-breakfast-taco-guide",
  "german-czech-texas-towns",
  "dr-pepper-texas-history",
  "texas-ranch-water-guide",
  "san-antonio-puffy-taco-history",
  "barbacoa-big-red-san-antonio",
]);

const musicGuideSlugs = new Set([
  "texas-blues",
  "texas-conjunto-tejano",
  "texas-western-swing",
  "texas-country-outlaw",
  "texas-rock-rockabilly",
  "texas-jazz",
  "texas-gospel-rnb-pop",
  "texas-hip-hop",
]);

const guideDestinationLinks: Partial<Record<string, { href: string; label: string; description: string }>> = {
  "dr-pepper-texas-history": {
    href: "/destination/dr-pepper-museum-waco",
    label: "Explore the Dr Pepper Museum",
    description: "Turn the Waco origin story into a visit with TexasDefined's destination guide to the Dr Pepper Museum.",
  },
};

type GuideImage = {
  src: string;
  alt: string;
  caption: string;
  credit?: string;
  sourceHref?: string;
};

const guideImages: Partial<Record<string, GuideImage>> = {
  "texas-tall-tales-folklore": {
    src: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Pecos_Bill%2C_The_Century_Magazine%2C_October_1923.jpg?width=900",
    alt: "Elmer Hader's 1923 illustrated depiction of Pecos Bill from The Century Magazine",
    caption: "An October 1923 magazine illustration by Elmer Hader accompanies the first known literary appearance of Pecos Bill; it documents publication, not proof of an earlier oral tradition.",
    credit: "Elmer Hader · 1923 · public domain (United States) · Wikimedia Commons",
    sourceHref: "https://commons.wikimedia.org/wiki/File:Pecos_Bill,_The_Century_Magazine,_October_1923.jpg",
  },
  "texas-dance-halls-honky-tonks": {
    src: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Gruene_hall.jpg?width=1200",
    alt: "Historic white wooden exterior of Gruene Hall in Gruene, New Braunfels, Texas",
    caption: "Gruene Hall, photographed in 2006: the preserved building remains a landmark in the state\u2019s dance-hall tradition.",
    credit: "Larry D. Moore · CC BY 4.0 · Wikimedia Commons",
    sourceHref: "https://commons.wikimedia.org/wiki/File:Gruene_hall.jpg",
  },
  "texas-homecoming-mums": {
    src: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Goldthwaite_High_School_Homecoming_Mum.jpg?width=720",
    alt: "Goldthwaite High School homecoming mum with ribbons, charms and school colors",
    caption: "A 2023 Texas high-school homecoming mum shows how a chrysanthemum-centered tradition became a large, personalized display.",
    credit: "Sillyputty1967 · CC BY-SA 4.0 · Wikimedia Commons",
    sourceHref: "https://commons.wikimedia.org/wiki/File:Goldthwaite_High_School_Homecoming_Mum.jpg",
  },
  "texas-brand-origin-stories": {
    src: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Modern_Blue_Bell_Creameries_factory_located_in_Brenham%2C_Texas.jpg?width=1280",
    alt: "Blue Bell Creameries factory in Brenham, Texas, photographed in 2008",
    caption: "Blue Bell's Brenham factory in 2008 illustrates a Texas-born brand with a continuing local production relationship; the photograph does not establish the origin of every Blue Bell product.",
    credit: "Larry D. Moore · CC BY 4.0 · Wikimedia Commons",
    sourceHref: "https://commons.wikimedia.org/wiki/File:Modern_Blue_Bell_Creameries_factory_located_in_Brenham,_Texas.jpg",
  },
  "texas-food-trail": {
    src: bbqBrisket,
    alt: "Sliced Texas barbecue brisket showing dark bark and a smoke ring",
    caption: "Barbecue is one chapter of the Texas food story, not the whole story.",
  },
  "texas-chili-con-carne-history": {
    src: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Pot_of_Chili_Con_Carne.jpg?width=1600",
    alt: "Pot of chili con carne illustrating the bowl-of-red tradition",
    caption: "Representative photograph of chili con carne from 2018, not a historical San Antonio food stand. The dish became a Texas identity marker through street-food history, commercial chili products and cookoffs.",
    credit: "Punkgobliner · CC BY-SA 4.0 · Wikimedia Commons",
    sourceHref: "https://commons.wikimedia.org/wiki/File:Pot_of_Chili_Con_Carne.jpg",
  },
  "texas-chicken-fried-steak-guide": {
    src: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Chicken_fried_steak.jpg?width=1600",
    alt: "Chicken-fried steak served as a classic breaded beef comfort-food plate",
    caption: "Chicken-fried steak is firmly associated with Texas even though its exact origin remains disputed.",
    credit: "Mr. Gray · CC0 · Wikimedia Commons",
    sourceHref: "https://commons.wikimedia.org/wiki/File:Chicken_fried_steak.jpg",
  },
  "texas-breakfast-taco-guide": {
    src: "https://commons.wikimedia.org/wiki/Special:Redirect/file/2009-265-56-_Two_Soft_Tacos_and_a_Microphone_(3310171849).jpg?width=1600",
    alt: "Two chorizo breakfast tacos on flour tortillas in San Antonio",
    caption: "A photographed San Antonio breakfast in February 2009: two chorizo tacos. This historical menu photograph is not a claim about the restaurant’s current operation.",
    credit: "Alan Levine (cogdogblog) · CC0 · Wikimedia Commons",
    sourceHref: "https://commons.wikimedia.org/wiki/File:2009-265-56-_Two_Soft_Tacos_and_a_Microphone_(3310171849).jpg",
  },
  "texas-ranch-water-guide": {
    src: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Ranch_water.jpg?width=1600",
    alt: "Ranch Water cocktail served over ice with citrus",
    caption: "The modern Ranch Water format is simple—tequila, lime and sparkling mineral water—even though the drink's exact origin remains disputed.",
    credit: "BanjoZebra · CC BY 4.0 · Wikimedia Commons",
    sourceHref: "https://commons.wikimedia.org/wiki/File:Ranch_water.jpg",
  },
  "san-antonio-puffy-taco-history": {
    src: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Puffy_taco.jpg?width=1600",
    alt: "Puffy taco served at Los Barrios Mexican Restaurant in San Antonio",
    caption: "A San Antonio puffy taco uses fresh masa fried until the shell expands into a crisp, airy pocket.",
    credit: "y6y6y6 · CC BY 2.0 · Wikimedia Commons",
    sourceHref: "https://commons.wikimedia.org/wiki/File:Puffy_taco.jpg",
  },
  "texas-natural-wonders-bucket-list": {
    src: bigBend,
    alt: "Big Bend landscape with desert terrain and distant mountains",
    caption: "Big Bend is one anchor in a natural-wonders list that stretches from desert mountains to cypress swamps and barrier islands.",
  },
  "german-czech-texas-towns": {
    src: kolacheKlobasnek,
    alt: "Texas Czech-style kolache and klobasnek pastries",
    caption: "Food is one of the most visible surviving links to Czech and German settlement, but the heritage also lives in churches, halls, festivals and town landscapes.",
  },
  "dr-pepper-texas-history": {
    src: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Cupola_Dr_Pepper_Museum_Waco_Texas_2024.jpg?width=1600",
    alt: "Cupola and upper exterior of the Dr Pepper Museum in Waco, Texas",
    caption: "The Dr Pepper Museum preserves the Waco setting behind one of Texas's best-known brand-origin stories.",
    credit: "Larry D. Moore · CC BY 4.0 · Wikimedia Commons",
    sourceHref: "https://commons.wikimedia.org/wiki/File:Cupola_Dr_Pepper_Museum_Waco_Texas_2024.jpg",
  },
};

const guideSources: Partial<Record<string, { label: string; href: string; note: string }[]>> = {
  "texas-tall-tales-folklore": [
    {
      "label": "Encyclopedia of the Great Plains — Pecos Bill",
      "href": "https://plainshumanities.unl.edu/encyclopedia/doc/egp.fol.031.html",
      "note": "Identifies the first known October 1923 O'Reilly publication and notes scholarly dispute about claimed older oral origins."
    },
    {
      "label": "UNT Press / Texas Folklore Society — Pecos Bill and His Pedigree",
      "href": "https://texashistory.unt.edu/ark:/67531/metadc271470/m1/196/",
      "note": "Book-length historical analysis of the Pecos Bill origin debate and the century of Texas Folklore Society research."
    },
    {
      "label": "Texas State Historical Association — Pecos Bill",
      "href": "https://www.tshaonline.org/handbook/entries/pecos-bill",
      "note": "Covers the folklore hero and associated cowboy tall-tale motifs."
    },
    {
      "label": "Texas State Historical Association — Yellow Rose of Texas",
      "href": "https://www.tshaonline.org/handbook/entries/yellow-rose-of-texas",
      "note": "Examines the song's nineteenth-century history and rejects the later Emily West linkage as established fact."
    },
    {
      "label": "Texas State Historical Association — Emily D. West",
      "href": "https://www.tshaonline.org/handbook/entries/west-emily-d",
      "note": "Biographical record distinguishing the historical free Black woman from later twentieth-century mythmaking."
    },
    {
      "label": "Smithsonian Magazine — make-believe species and the jackalope",
      "href": "https://www.smithsonianmag.com/arts-culture/greetings-from-the-land-of-the-make-believe-species-167869753/",
      "note": "Traces modern jackalope taxidermy popularization to Douglas, Wyoming, in the 1930s."
    }
  ],
  "texas-dance-halls-honky-tonks": [
    {
      "label": "Texas Dance Hall Preservation — find a hall",
      "href": "https://texasdancehall.org/about-dance-halls/find-a-hall/",
      "note": "Statewide historical directory; listings do not guarantee current public operation, tickets or access."
    },
    {
      "label": "Texas Historical Commission — Hill Country heritage guide",
      "href": "https://www.thc.texas.gov/public/upload/publications/hillcountry.pdf",
      "note": "State historical reference identifying Gruene, Luckenbach, Twin Sisters, Kendalia, Anhalt and Floore's among historically significant regional music places."
    },
    {
      "label": "Gruene Hall — official event calendar",
      "href": "https://gruenehall.com/events/month/",
      "note": "Operator calendar for the 1281 Gruene Road hall and its performances."
    },
    {
      "label": "Luckenbach Texas — official directions",
      "href": "https://www.luckenbachtexas.com/maps-directions",
      "note": "Operator confirms the address and provides visitor directions for the dance hall and surrounding venue."
    },
    {
      "label": "Twin Sisters Dance Hall — official calendar and details",
      "href": "https://twinsistersdancehall.com/",
      "note": "Operator documents first-Saturday public dances, with January, July and September exceptions, as well as rentals and community gatherings. Confirm dates on the current calendar."
    },
    {
      "label": "Anhalt Hall — official event listings",
      "href": "https://anhalthalle.com/events/",
      "note": "Venue operator's calendar for current public dances and seasonal performances; always check individual event details and availability."
    },
    {
      "label": "Texas Dance Hall Preservation — Anhalt Hall",
      "href": "https://texasdancehall.org/anhalt-hall-anhalt-halle/",
      "note": "Heritage background for the Germania Farmer Verein hall."
    },
    {
      "label": "MySA — Kendalia Halle closure and September 2026 for-sale update",
      "href": "https://www.mysanantonio.com/realestate/article/kendalia-halle-sale-22421747.php",
      "note": "September 8, 2026 reporting confirms Kendalia Halle has remained closed since July 2024 and was still being offered for sale. Do not present it as a current live dance venue."
    },
    {
      "label": "Texas Dance Hall Preservation — Kendalia Halle",
      "href": "https://texasdancehall.org/kendalia-halle/",
      "note": "Historical context; confirm event availability with the venue rather than relying on a preservation listing."
    },
    {
      "label": "Texas Dance Hall Preservation — National Hall SPJST 92",
      "href": "https://texasdancehall.org/national-hall-spjst-92/",
      "note": "Fort Worth Czech hall and urban Western swing/music connections."
    }
  ],
  "texas-food-trail": [
    { label: "Handbook of Texas — Gebhardt Mexican Foods Company", href: "https://www.tshaonline.org/handbook/entries/gebhardt-mexican-foods-company", note: "San Antonio food history and the commercialization of chili powder, showing why the food trail spans traditions rather than one invention story." },
    { label: "Dr Pepper Museum — Waco history", href: "https://drpeppermuseum.com/history/", note: "Documents Waco's historic soda-fountain origin, supporting the food-history context for a Central Texas stop." },
  ],
  "texas-roadside-oddities": [
    { label: "Visit Amarillo — Cadillac Ranch", href: "https://www.visitamarillo.com/blog/post/cadillac-ranch/", note: "Documents Ant Farm's 1974 installation, later relocation and the present Amarillo I-40 frontage-road location." },
    { label: "Visit Paris Texas — Eiffel Tower", href: "https://visitparistexas.com/eiffel-tower/", note: "Lists the cowboy-hat Eiffel Tower beside Love Civic Center at 2025 South Collegiate Drive." },
    { label: "Texas Time Travel — Roadside Heritage", href: "https://texastimetravel.com/plan/trip-ideas/trip-ideas-roadside-heritage/", note: "State-supported roadside history resources identify Route 66 stops including Shamrock, Adrian and Amarillo." },
    { label: "North Star Mall — Giant Justins sculpture", href: "https://www.northstarmall.com/en/events/39974/", note: "Operator confirms Bob Wade's 1979 sculpture, 1980 San Antonio installation, scale and address." },
    { label: "Billy Bob's Texas — official directions and visitor policies", href: "https://www.billybobstexas.com/directions/", note: "Venue confirms 2520 Rodeo Plaza address and variable admission, event and hour rules." },
    { label: "Texas Historical Commission — Ellis County Courthouse marker", href: "https://atlas.thc.texas.gov/Details?atlasnumber=5139007092&fn=print", note: "Primary record dates the 1895 cornerstone and 1897 completion and describes the architect and materials." },
    { label: "National Park Service — Tower Station and U-Drop Inn Cafe", href: "https://www.nps.gov/places/tower-station-and-u-drop-inn-cafe.htm", note: "National Register resource records the 1936 Shamrock roadside building and architectural history." },
    { label: "Orange Show Center for Visionary Art — visitor information", href: "https://www.orangeshow.org/visit", note: "Operator distinguishes its temporarily closed-for-restoration monument from Smither Park and the Beer Can House." },
  ],
  "texas-slang-explained": [
    { label: "University of Texas at Austin — Spanish in Texas Corpus", href: "https://coerll.utexas.edu/coerll/project/spanishtx/", note: "Documents research with real bilingual speech samples and language variation among Texas speakers." },
    { label: "Texas Department of Transportation — Don't mess with Texas", href: "https://www.txdot.gov/about/campaigns-outreach/dont-mess-with-texas.html", note: "Documents that the familiar Texas phrase originated as an anti-litter campaign, not an official legal motto." },
  ],
  "texas-chili-con-carne-history": [
    { label: "Handbook of Texas — San Antonio", href: "https://www.tshaonline.org/handbook/entries/san-antonio-tx", note: "Documents the downtown Chili Queens and San Antonio's open-air chili-stand tradition." },
    { label: "Handbook of Texas — Gebhardt Mexican Foods Company", href: "https://www.tshaonline.org/handbook/entries/gebhardt-mexican-foods-company", note: "Documents William Gebhardt's chili-powder business and its role in commercializing Texas chili products." },
    {"label":"Texas State Library and Archives Commission — state symbols","href":"https://www.tsl.texas.gov/ref/abouttx/symbols","note":"Identifies the 1977 chili designation and HCR 18."},
    {"label":"Original Terlingua International Championship — history","href":"https://abowlofred.com/about/","note":"Organizer's account of the 1967 tied contest and its own competition."},
    {"label":"CASI — history of chili","href":"https://www.casichili.net/about-casi1.html","note":"Separate organizer's historical account and competition tradition."},
    { label: "University of the Incarnate Word — Popular Chili Queens Graced San Antonio Plazas", href: "https://www.uiw.edu/sanantonio/jenningschiliqueens.html", note: "Documents plaza vendors, municipal sanitation disputes and the final closures in the early 1940s." },
    { label: "Texas Highways — A Look at Terlingua’s Chili Origins", href: "https://texashighways.com/culture/history/a-look-at-terlinguas-chili-origins/", note: "Independent account of the October 1967 contest and the two competitions since 1983." },
  ],
  "texas-chicken-fried-steak-guide": [
    { label: "Texas Legislature — S.C.R. 34 (2011), introduced text", href: "https://capitol.texas.gov/tlodocs/82R/billtext/pdf/SC00034I.pdf", note: "Identifies the 1911 Lamesa invention story as a fictional 1976 newspaper account; celebrates the festival rather than documenting an invention." },
    { label: "Handbook of Texas — Chicken-Fried Steak", href: "https://www.tshaonline.org/handbook/entries/chicken-fried-steak", note: "Explains the disputed origin story and the Southern, German and regional Texas influences associated with the dish." },
    { label: "Blue Bonnet Cafe — official menu", href: "https://www.bluebonnetcafe.net/limited-menu", note: "Documents breakfast and dinner portions and restaurant preparation." },
    { label: "KUT — Austin chicken-fried steak, June 2026", href: "https://www.kut.org/austin/2026-06-18/ausitn-tx-atxplained-chicken-fried-steak-restaurants-food", note: "Independent reporting on local restaurant history and Hoover’s dining-room closure." },
  ],
  "texas-breakfast-taco-guide": [
    { label: "Texas Legislative Reference Library — HCR 123 history", href: "https://www.lrl.texas.gov/legis/billsearch/billdetails.cfm?billFileID=299334&from=advancedsearch", note: "Confirms the proposed state breakfast designation was left pending in committee." },
    {"label":"Texas Legislature — introduced HCR 123, 2019","href":"https://capitol.texas.gov/tlodocs/86R/billtext/html/HC00123I.HTM","note":"Legislative proposal summarizes early historical references; not an enacted designation or direct archive verification."},
    {"label":"University of Texas Press — American Tacos","href":"https://www.jstor.org/stable/10.7560/316528","note":"José R. Ralat's historical survey includes a chapter on breakfast tacos."},
    {"label":"Texas Standard / KUT — José R. Ralat interview","href":"https://www.kut.org/texas/2020-04-16/from-breakfast-to-barbacoa-new-book-dives-into-american-tacos","note":"Explains the borderland context and contested city-origin claims."},
    {"label":"Joe's Bakery — official menu","href":"https://joesbakery.com/menu/","note":"Restaurant's own menu and location information."},
    { label: "Don Pepe’s — McAllen menu", href: "https://ilovedonpepes.com/our-menu/", note: "Documents machacado with eggs as a breakfast plate." },
    { label: "Kiko’s — Corpus Christi menu", href: "https://kikosmexicanfood.com/menu/", note: "Documents several regional breakfast fillings as taquitos." },
    { label: "Joe’s Bakery — breakfast menu details", href: "https://joesbakery.com/our-menu-3/", note: "Documents migas, barbacoa, pork carne guisada and chicharrón breakfast plates." },
  ],
  "texas-homecoming-mums": [
    { label: "UTSA Institute of Texan Cultures — Keeping Texas Traditions", href: "https://texancultures.utsa.edu/blog/2026-03/keeping-texas-traditions", note: "Documents the evolution from chrysanthemum corsage to elaborate Texas mum and the women-led craft, family and community networks sustaining the tradition." },
    { label: "The Mum Queen — About Elizabeth Cleaver", href: "https://www.themumqueen.com/about", note: "Cleaver's own account documents more than 35 years making mums and garters, her Spring-based work and her mentoring of hundreds of other mum makers." },
    { label: "Houston Chronicle — Meet the Mum Queen", href: "https://www.houstonchronicle.com/explained/article/meet-mum-queen-ruling-texas-homecoming-tradition-21041372.php", note: "Profiles Cleaver's Spring studio, decades in the craft, large seasonal order volume and multigenerational customers." },
    { label: "Houston Chronicle — How Texas homecoming mums evolved", href: "https://www.houstonchronicle.com/news/houston-texas/houston/article/history-texas-homecoming-mums-19730689.php", note: "Provides broader Texas history, modern mum and garter conventions, and reporting on how the tradition changed from simpler corsages into highly personalized displays." },
  ],
  "texas-brand-origin-stories": [
    { label: "Blue Bell — dated production facility fact sheet", href: "https://www.bluebell.com/news/food-safety-fact-sheet/", note: "Identifies the three production sites as of June 2022." },
    { label: "Texas Historical Commission — Spoetzl Brewery marker", href: "https://atlas.thc.texas.gov/Details/5285005011", note: "Dates the purchase to 1915 and documents Prohibition and family ownership." },
    { label: "Handbook of Texas — Southland Corporation", href: "https://www.tshaonline.org/handbook/entries/southland-corporation", note: "Documented origin of Dallas-area Southland Ice in 1927, predecessor of 7-Eleven." },
    { label: "H-E-B — Company history", href: "https://careers.heb.com/about-us?lang=en-US", note: "H-E-B's history timeline documents Florence Butt's 1905 Kerrville grocery and the company's Texas roots." },
    { label: "Blue Bell Creameries — About Us", href: "https://www.bluebell.com/about-us/", note: "Blue Bell documents the 1907 Brenham Creamery Company origin and the 1930 Blue Bell name change." },
    { label: "Shiner — Brewery history", href: "https://shiner.com/brewery/", note: "The brewery's timeline documents brewing in Shiner since 1909 and its German and Czech community roots." },
    {"label":"Whataburger — company history","href":"https://stories.whataburger.com/our-history/","note":"Documents first store, franchise and A-frame chronology, and the 2019 majority investment."},
    {"label":"Handbook of Texas — Whataburger","href":"https://www.tshaonline.org/handbook/entries/whataburger","note":"Independent account of the founders and first Corpus Christi business."},
    {"label":"Dickies — brand history","href":"https://www.dickies.com/en-us/pages/dickies-history","note":"Company account of workwear origins in 1922."},
    {"label":"SEC — VF Corporation November 2025 disclosure","href":"https://www.sec.gov/Archives/edgar/data/103379/000010337925000066/vfc-20251112.htm","note":"Records completion of sale of Dickies to Bluestar Alliance."},
    {"label":"Texas A&M — Arch Aplin III","href":"https://www.arch.tamu.edu/alumni/arch-aplin-iii/","note":"Documents the first Buc-ee's store in 1982."},
    {"label":"Southern Living — Buc-ee's history","href":"https://www.southernliving.com/travel/texas/bucees-gas-station-history","note":"Independent reporting on early stores, partners and travel-center expansion."},
    {"label":"Dr Pepper Museum — history","href":"https://drpeppermuseum.com/history/","note":"Documents the Waco origin and subsequent company development."},
    {"label":"FTC — origin-claim guidance","href":"https://www.ftc.gov/business-guidance/resources/complying-made-usa-standard","note":"Distinguishes specific manufacturing processes and unqualified claims."},
  ],
  "dr-pepper-texas-history": [
    { label: "Dr Pepper Museum — History", href: "https://drpeppermuseum.com/history/", note: "The museum's history documents the 1885 Waco origin, Morrison's Old Corner Drug Store and Charles Alderton's role." },
  ],
  "texas-ranch-water-guide": [
    { label: "Austin Monthly — How the Ranch Water Was Born in Austin", href: "https://www.austinmonthly.com/ranch-water/", note: "Documents Ranch 616's late-1990s menu history and Kevin Williamson's account while identifying the drink as an Austin and Texas icon." },
    { label: "The Washington Post — Ranch Water origin reporting", href: "https://www.washingtonpost.com/food/2021/07/27/ranch-water-recipe/", note: "Examines competing origin stories and identifies Kevin Williamson and Ranch 616 as the closest documented modern naming/origin claim without treating older West Texas folklore as proven fact." },
  ],
  "san-antonio-puffy-taco-history": [
    { label: "Visit San Antonio — Hill Country road trip and tacos", href: "https://www.visitsanantonio.com/in-the-news/post/the-ultimate-texas-hill-country-road-trip-includes-tree-houses-tubing-and-tacos/", note: "Identifies Ray's Drive Inn with the puffy taco's modern San Antonio origin story and describes the fresh-fried shell." },
    { label: "UTSA — Tacos, Texas and tradition", href: "https://news.utsa.edu/2020/08/everything-you-need-to-know-about-tacos-texas-and-tradition/", note: "Places puffy tacos within San Antonio's broader taco culture and regional food-history conversation." },
    { label: "Texas Standard — An Ode to the Puffy Taco", href: "https://texasstandard.org/stories/opinion-an-ode-to-the-puffy-taco/", note: "Documents Arturo Lopez and Ray's Drive Inn as central to the modern San Antonio puffy-taco story." },
  ],
  "barbacoa-big-red-san-antonio": [
    { label: "Texas A&M University–San Antonio — Barbacoa and Big Red festival", href: "https://mesquite-news.com/big-red-and-barbacoa-headline-festival/", note: "Documents Sunday barbacoa family traditions and the established San Antonio pairing with Big Red." },
    { label: "Dr Pepper Museum — Big Red exhibit", href: "https://drpeppermuseum.com/virtual-tour/", note: "Documents Big Red as another Waco-created beverage and its earlier Sun Tang name." },
    { label: "San Antonio Report — Barbacoa & Big Red Festival", href: "https://sanantonioreport.org/barbacoa-big-red-festival-only-in-sa/", note: "Documents the pairing as a San Antonio family tradition and the festival's role in turning that recurring Sunday ritual into a public celebration." },
  ],
  "texas-blue-norther-weather-guide": [
    { label: "Handbook of Texas — Blue Norther", href: "https://www.tshaonline.org/handbook/entries/blue-norther", note: "Documents the Texas term and historical descriptions while distinguishing the name from the broader meteorological phenomenon." },
    { label: "National Weather Service Amarillo — 50-degree temperature ranges", href: "https://www.weather.gov/ama/50ranges", note: "Documents major rapid temperature changes in the Texas Panhandle and provides meteorological context for sharp frontal passages." },
    { label: "National Weather Service Houston/Galveston — Spring storm signals", href: "https://www.weather.gov/hgx/stormsignals_vol40", note: "Provides official severe-weather context and reinforces that current NWS forecasts and warnings—not folklore—should control safety decisions." },
  ],
  "texas-blues": [
    { label: "Handbook of Texas — Blues", href: "https://www.tshaonline.org/handbook/entries/blues", note: "Documents the Dallas and Deep Ellum blues scene, Blind Lemon Jefferson's commercial breakthrough and the evolution of the Texas guitar tradition through T-Bone Walker." },
    { label: "Handbook of Texas — Blind Lemon Jefferson", href: "https://www.tshaonline.org/handbook/entries/jefferson-blind-lemon", note: "Documents Jefferson's Freestone County roots, Dallas performance history, recording career and influence on later blues and popular music." },
    { label: "Handbook of Texas — Lightnin' Hopkins", href: "https://www.tshaonline.org/handbook/entries/hopkins-sam-lightnin", note: "Documents Hopkins's Texas background and the career that made him one of the state's most recognizable blues musicians." },
  ],
  "texas-conjunto-tejano": [
    { label: "Handbook of Texas — Texas-Mexican Conjunto", href: "https://www.tshaonline.org/handbook/entries/texas-mexican-conjunto", note: "Documents the accordion-and-bajo-sexto tradition, Narciso Martínez's formative role and the evolution of conjunto instrumentation." },
    { label: "Handbook of Texas — Conjunto, Tejano and Border collection", href: "https://www.tshaonline.org/handbook/projects/texas-music/category/music/category/genres-conjunto-tejano-and-border", note: "Provides the wider Texas music authority collection covering musicians, venues, radio, festivals and institutions in the conjunto and Tejano tradition." },
  ],
  "texas-western-swing": [
    { label: "Handbook of Texas — Milton Brown", href: "https://www.tshaonline.org/handbook/entries/brown-william-milton", note: "Documents Brown's Fort Worth career, the Musical Brownies and their foundational role in the early western swing ensemble sound." },
    { label: "Handbook of Texas — Bob Wills", href: "https://www.tshaonline.org/handbook/entries/wills-james-robert", note: "Documents Wills's Texas roots, the musical influences behind his style and the expansion of western swing through the Texas Playboys." },
    { label: "Handbook of Texas — Country Music", href: "https://www.tshaonline.org/handbook/entries/country-music", note: "Places western swing in the larger Texas country-music history and describes its blend of fiddle music, blues, jazz, ragtime, polkas and dance-band influences." },
  ],
  "texas-country-outlaw": [
    { label: "Handbook of Texas — Country Music", href: "https://www.tshaonline.org/handbook/entries/country-music", note: "Documents Texas country history and Austin's 1970s progressive-country and outlaw movements, including Willie Nelson and Waylon Jennings." },
    { label: "Handbook of Texas — Armadillo World Headquarters", href: "https://www.tshaonline.org/handbook/entries/armadillo-world-headquarters", note: "Documents the Austin venue's cross-genre audience and its central role in the progressive-country and cosmic-cowboy scene." },
    { label: "Handbook of Texas — Austin City Limits", href: "https://www.tshaonline.org/handbook/entries/austin-city-limits", note: "Documents the program's origins in Austin's progressive-country scene and the Willie Nelson pilot that helped carry the sound to a national public-television audience." },
  ],
  "texas-rock-rockabilly": [
    { label: "Handbook of Texas — Rock-and-Roll", href: "https://www.tshaonline.org/handbook/entries/rock-and-roll", note: "Documents Texas contributions to rockabilly, early rock, blues rock and other branches, including Buddy Holly, Roy Orbison and Janis Joplin." },
    { label: "Handbook of Texas — Buddy Holly", href: "https://www.tshaonline.org/handbook/entries/holley-charles-hardin-buddy-holly", note: "Documents Holly's Lubbock upbringing, local radio and performance history, recording career and long influence on later rock bands." },
    { label: "Handbook of Texas Music", href: "https://www.tshaonline.org/handbook/projects/texas-music", note: "Places Holly, Joplin, Doug Sahm, ZZ Top and other Texas rock figures in the larger statewide music history." },
  ],
  "texas-jazz": [
    { label: "Handbook of Texas — Jazz", href: "https://www.tshaonline.org/handbook/entries/jazz", note: "Documents Texas territory-band networks and musicians who entered swing, bebop and later jazz movements." },
    { label: "Handbook of Texas — Arnett Cobb", href: "https://www.tshaonline.org/handbook/entries/cobb-arnett-cleophus", note: "Documents Cobb's Houston training, Milton Larkin Orchestra years, national career and later return to Houston as a bandleader and mentor." },
    { label: "Handbook of Texas — Ornette Coleman", href: "https://www.tshaonline.org/handbook/entries/coleman-ornette", note: "Documents Coleman's Fort Worth upbringing, school and local music connections, and path toward his later innovations in modern jazz." },
    { label: "Handbook of Texas — Teddy Wilson", href: "https://www.tshaonline.org/handbook/entries/wilson-theodore-shaw-teddy", note: "Documents Wilson's Austin birth and his major swing-era career as a pianist, accompanist and improviser." },
  ],
  "texas-gospel-rnb-pop": [
    { label: "Handbook of Texas — Gospel Music", href: "https://www.tshaonline.org/handbook/entries/gospel-music", note: "Documents Texas gospel publishing and radio, Blind Arizona Dranes, the Soul Stirrers' Trinity and Houston history, Peacock's gospel division and the genre's influence on R&B and rock-and-roll." },
    { label: "Handbook of Texas — Blind Arizona Dranes", href: "https://www.tshaonline.org/handbook/entries/dranes-arizona-juanita-blind-arizona", note: "Documents Dranes's Greenville birth, Deep Ellum years, gospel-beat piano style and 1920s OKeh recording sessions in Chicago and Dallas." },
    { label: "Handbook of Texas — Duke-Peacock Records", href: "https://www.tshaonline.org/handbook/entries/duke-peacock-records", note: "Documents Don Robey's Houston record enterprise across gospel, blues, R&B and soul and the role gospel sales played in sustaining the wider label system." },
    { label: "Handbook of Texas — SugarHill Recording Studios", href: "https://www.tshaonline.org/handbook/entries/sugarhill-recording-studios", note: "Documents Gold Star and SugarHill as Houston recording infrastructure used by Duke-Peacock gospel and R&B artists and later by Destiny's Child and Beyoncé." },
    { label: "Recording Academy — Kirk Franklin", href: "https://www.grammy.com/artists/kirk-franklin/9067/", note: "Confirms Franklin's Fort Worth birth, his 1990s national gospel breakthrough and his long career across gospel, contemporary Christian, R&B and rap categories." },
    { label: "Recording Academy — Beyoncé", href: "https://www.grammy.com/artists/beyonce-knowles/12474/", note: "Confirms Beyoncé's Houston birth and her rise through Destiny's Child before her solo career expanded across R&B and pop." },
    { label: "Recording Academy — Leon Bridges interview", href: "https://www.grammy.com/news/coming-home-with-a-grammy-nomination/", note: "Documents Bridges as a Fort Worth-based artist whose local beginnings drew on 1960s R&B, soul and gospel before his national breakthrough." },
  ],
  "texas-hip-hop": [
    { label: "Handbook of Texas — Rap and Hip-Hop", href: "https://www.tshaonline.org/handbook/entries/rap-and-hip-hop", note: "Documents the development of Texas rap, Houston's independent scene, DJ Screw's innovations and the 2000s national breakthrough." },
    { label: "Handbook of Texas — Geto Boys", href: "https://www.tshaonline.org/handbook/entries/geto-boys", note: "Documents the Houston group's Rap-A-Lot origins and role in putting Houston and Southern rap on the national map." },
    { label: "Handbook of Texas — DJ Screw", href: "https://www.tshaonline.org/handbook/entries/davis-robert-earl-jr-dj-screw", note: "Documents Robert Earl Davis Jr.'s Houston career, slowed-down production technique, Grey Tape culture and Screwed Up Click network." },
    { label: "Handbook of Texas — UGK", href: "https://www.tshaonline.org/handbook/entries/ugk-underground-kingz", note: "Documents UGK's Port Arthur origins, Gulf Coast influences, independent beginnings and move into national hip-hop." },
  ],
};

const homecomingMumGradeCards = [
  { grade: "Freshman", note: "Usually school colors", detail: "Often a simpler single-flower design with shorter streamers and the school's normal palette." },
  { grade: "Sophomore", note: "More personalization", detail: "Names, activities, charms and decorative ribbon work commonly become more prominent." },
  { grade: "Junior", note: "Often more elaborate", detail: "Larger flowers, longer ribbons and denser activity details are common, while school colors still anchor the design." },
  { grade: "Senior", note: "Often white + metallic", detail: "White with gold or silver is common at many schools, but it is a local tradition rather than a statewide rule." },
];

const homecomingMumFormats = [
  { title: "Single mum", text: "One main flower with ribbons and personalized decorations." },
  { title: "Double or triple", text: "Two or three flowers create a wider centerpiece and more room for braids, names and themed sections." },
  { title: "Senior mum", text: "A class-year treatment, often using white with gold or silver accents depending on local custom." },
  { title: "Garter", text: "An arm-worn counterpart that can use the same ribbons, names, charms and school-spirit details." },
];

const homecomingMumFaqs = [
  ["What is a Texas homecoming mum?", "A decorated chrysanthemum-style centerpiece surrounded by ribbons, braids, bells, charms, names and school-spirit details, usually worn during high-school homecoming week."],
  ["Why are Texas homecoming mums so big?", "The tradition evolved from simple corsages into highly personalized displays. Artificial materials, school-spirit culture and maker creativity made larger designs practical."],
  ["Why are senior mums often white?", "Many Texas schools use white with gold or silver accents for seniors. It is common, not universal, and local school custom should control."],
  ["What is the difference between a mum and a garter?", "A mum is usually worn from the shoulder or chest, while a garter is usually worn on the arm. Both can carry the same decorative language."],
  ["Who buys a homecoming mum?", "There is no single modern rule. Dates, families and friends may order them, and many students or parents make their own."],
  ["When do students wear homecoming mums?", "Usually during homecoming week, especially on the school day connected to the homecoming game, pep rally or spirit activities."],
  ["Do girls have to wear mums and boys garters?", "No. That is an older convention, not a requirement. Modern practice is more flexible."],
  ["How much does a homecoming mum cost?", "Cost varies widely. DIY materials may cost only tens of dollars, while custom designs can exceed $100 and elaborate pieces can cost several hundred dollars or more."],
  ["How long does a homecoming mum take to make?", "A simple design can be assembled relatively quickly, while elaborate custom mums with braids, lettering, lights and layered decorations can take many hours."],
  ["What do the ribbons and charms mean?", "They often represent school colors, class year, names, sports, band, cheer, drill team, clubs, mascots and personal interests. There is no statewide code."],
  ["Can you make a homecoming mum yourself?", "Yes. DIY mum-making is a major part of the tradition. Start with a strong backing and flower, then add ribbons, braids, names and balanced decorations."],
  ["How should a homecoming mum be stored?", "Keep it dry, support the backing, avoid crushing the ribbons, remove removable batteries and use a large box or shadow box for long-term preservation."],
  ["Are giant homecoming mums only a Texas tradition?", "Homecoming corsages exist elsewhere, but the oversized ribbon-heavy mum is especially associated with Texas high-school culture."],
  ["Do colleges use homecoming mums?", "The oversized tradition is most strongly associated with Texas high schools. College communities may reference it, but it is less standardized and widespread."],
] as const;

const foodBrandComparisons: Partial<Record<string, { heading: string; columns: string[]; rows: string[][]; note: string }>> = {
  "texas-brand-origin-stories": {
    "heading": "Texas brand founding dates at a glance",
    "columns": [
      "Brand",
      "Origin",
      "Founding milestone"
    ],
    "rows": [
      [
        "Dr Pepper",
        "Waco · 1885",
        "Drugstore soda fountain"
      ],
      [
        "H-E-B",
        "Kerrville · 1905",
        "Family grocery"
      ],
      [
        "Blue Bell",
        "Brenham · 1907",
        "Butter-making creamery"
      ],
      [
        "Shiner",
        "Shiner · 1909",
        "Local brewery"
      ],
      [
        "Dickies",
        "Fort Worth · 1922",
        "Williamson-Dickie workwear"
      ],
      [
        "7-Eleven",
        "Dallas · 1927",
        "Southland Ice convenience retail"
      ],
      [
        "Whataburger",
        "Corpus Christi · 1950",
        "First burger stand"
      ],
      [
        "Buc-ee’s",
        "Lake Jackson area · 1982",
        "First convenience store"
      ]
    ],
    "note": "Six brands receive full case studies in this article; Dr Pepper and 7-Eleven appear as additional Texas-born historical context. Dates identify the original product or business, not present ownership or product manufacture."
  },
  "texas-chili-con-carne-history": {
    "heading": "Three ways to understand a Texas bowl of red",
    "columns": [
      "Setting",
      "What matters",
      "Beans"
    ],
    "rows": [
      [
        "San Antonio plaza tradition",
        "Mexican and Tejano street-food history; varied historical preparations",
        "Historical recipes varied"
      ],
      [
        "Sanctioned competition",
        "Organizer’s rules and blind judging",
        "Check the specific rules before entering"
      ],
      [
        "Home and restaurant",
        "Beef texture, chile flavor and local preferences",
        "Depends on the cook and menu"
      ]
    ],
    "note": "The state-dish designation does not establish a mandatory recipe. A competition rule applies to that contest, not all Texans."
  },
  "texas-chicken-fried-steak-guide": {
    "heading": "Chicken-fried steak styles compared",
    "columns": [
      "Style",
      "Typical coating",
      "What to expect"
    ],
    "rows": [
      [
        "East Texas tradition",
        "Egg and flour",
        "Southern fried-chicken-style crust"
      ],
      [
        "Central Texas tradition",
        "Breadcrumbs or schnitzel-influenced coating",
        "Different texture from flour dredge"
      ],
      [
        "West Texas tradition",
        "Flour dredge and pan frying",
        "A simpler skillet crust"
      ],
      [
        "Wiener schnitzel",
        "Breadcrumb coating",
        "Traditionally veal rather than beef"
      ]
    ],
    "note": "Regional framework attributed to food writer Robb Walsh via the Handbook of Texas; actual restaurants vary."
  },
  "texas-breakfast-taco-guide": {
    "heading": "Breakfast taco ordering glossary",
    "columns": [
      "Menu term",
      "Meaning",
      "Ordering note"
    ],
    "rows": [
      [
        "Huevo con papas",
        "Egg with potatoes",
        "Ask whether potatoes are fried or stewed"
      ],
      [
        "Machacado con huevo",
        "Shredded dried beef with egg",
        "Often saltier than egg alone"
      ],
      [
        "Migas",
        "Eggs with tortilla pieces",
        "Ask whether cheese and peppers are included"
      ],
      [
        "Carne guisada",
        "Stewed meat",
        "Ask which meat and whether gravy is included"
      ],
      [
        "Barbacoa",
        "Slow-cooked meat",
        "Ask about the cut and availability"
      ],
      [
        "Nopales",
        "Edible cactus pads",
        "Often served in egg combinations"
      ]
    ],
    "note": "These translations help interpret menus; ingredients, availability and regional associations are not uniform."
  }
};

export function TexasEvergreenGuide({ guide }: { guide: TexasEvergreenGuideData }) {
  const canonicalUrl = `${siteUrl}/${guide.slug}`;
  const image = guideImages[guide.slug];
  const comparison = foodBrandComparisons[guide.slug];
  // Keep the original Commons URLs and licenses in this source registry,
  // but serve the three verified culture-guide photos through the existing
  // first-party, width-bounded image broker instead of third-party hotlinks.
  // This avoids a blank article hero when Wikimedia rate-limits browsers.
  const licensedCulturePhotoSlugs = new Set([
    "texas-tall-tales-folklore",
    "texas-dance-halls-honky-tonks",
    "texas-homecoming-mums",
    "texas-brand-origin-stories",
    "texas-chili-con-carne-history",
    "texas-chicken-fried-steak-guide",
    "texas-breakfast-taco-guide",
  ]);
  const deliveredImageSrc = image && licensedCulturePhotoSlugs.has(guide.slug)
    ? editorialImageSrc(image.src)
    : image?.src;
  const sources = guideSources[guide.slug] ?? [];
  const destinationLink = guideDestinationLinks[guide.slug];
  const isFoodHistoryChild = foodHistoryGuideSlugs.has(guide.slug);
  const isMusicChild = musicGuideSlugs.has(guide.slug);
  const hasHomecomingMumSupplies = guide.slug === "texas-homecoming-mums";
  const reviewedNovember2026 = new Set(["texas-tall-tales-folklore", "texas-dance-halls-honky-tonks", "texas-homecoming-mums", "texas-natural-wonders-bucket-list"]).has(guide.slug);
  const foodBrandReviewed = new Set(["texas-brand-origin-stories", "texas-chili-con-carne-history", "texas-chicken-fried-steak-guide", "texas-breakfast-taco-guide"]).has(guide.slug);
  const foodBrandLastmod = guide.slug === "texas-brand-origin-stories" ? "2026-11-24" : "2026-11-21";
  const foodBrandReviewLabel = guide.slug === "texas-brand-origin-stories" ? "November 24, 2026" : "November 21, 2026";
  const imageUrl = deliveredImageSrc
    ? deliveredImageSrc.startsWith("http://") || deliveredImageSrc.startsWith("https://")
      ? deliveredImageSrc
      : `${siteUrl}${deliveredImageSrc.startsWith("/") ? deliveredImageSrc : `/${deliveredImageSrc}`}`
    : undefined;
  const breadcrumbItems = [
    { "@type": "ListItem", position: 1, name: "Front page", item: `${siteUrl}/` },
    isMusicChild
      ? { "@type": "ListItem", position: 2, name: "Texas Music", item: `${siteUrl}/texas-music` }
      : { "@type": "ListItem", position: 2, name: "Things That Define Texas", item: `${siteUrl}/things-unique-to-texas` },
    ...(isFoodHistoryChild ? [{ "@type": "ListItem", position: 3, name: "Texas Food History", item: `${siteUrl}/texas-food-history` }] : []),
    { "@type": "ListItem", position: isFoodHistoryChild ? 4 : 3, name: guide.title, item: canonicalUrl },
  ];
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "@id": `${canonicalUrl}#article`,
        headline: guide.title,
        description: guide.dek,
        url: canonicalUrl,
        mainEntityOfPage: { "@id": `${canonicalUrl}#page` },
        publisher: { "@type": "Organization", name: "TexasDefined", url: siteUrl },
        author: { "@type": "Organization", name: "TexasDefined Editorial Desk", url: `${siteUrl}/editorial-policy` },
        articleSection: isFoodHistoryChild ? "Texas Food History" : "Things That Define Texas",
        ...(isMusicChild ? { articleSection: "Texas Music" } : {}),
        image: imageUrl,
        ...(foodBrandReviewed ? { dateModified: foodBrandLastmod } : reviewedNovember2026 ? { dateModified: "2026-11-20" } : {}),
        citation: sources.length ? sources.map((source) => source.href) : undefined,
        ...(isFoodHistoryChild ? { isPartOf: { "@type": "CollectionPage", "@id": `${siteUrl}/texas-food-history#page`, name: "Texas Food History", url: `${siteUrl}/texas-food-history` } } : {}),
        ...(isMusicChild ? { isPartOf: { "@type": "CollectionPage", "@id": `${siteUrl}/texas-music#collection`, name: "Texas Music", url: `${siteUrl}/texas-music` } } : {}),
        ...(destinationLink ? { mentions: [{ "@type": "TouristAttraction", name: destinationLink.label.replace(/^Explore the /, ""), url: `${siteUrl}${destinationLink.href}` }] } : {}),
        about: guide.sections.map((section) => ({ "@type": "Thing", name: section.heading.replace(/^\d+\.\s*/, "") })),
      },
      {
        "@type": "WebPage",
        "@id": `${canonicalUrl}#page`,
        url: canonicalUrl,
        name: guide.title,
        description: guide.dek,
        primaryImageOfPage: imageUrl ? { "@type": "ImageObject", contentUrl: imageUrl } : undefined,
        isPartOf: { "@type": "WebSite", "@id": `${siteUrl}/#website`, name: "TexasDefined", url: siteUrl },
        breadcrumb: { "@id": `${canonicalUrl}#breadcrumb` },
        mainEntity: { "@id": `${canonicalUrl}#article` },
      },
      {
        "@type": "ItemList",
        "@id": `${canonicalUrl}#sections`,
        name: `${guide.title} sections`,
        numberOfItems: guide.sections.length,
        itemListElement: guide.sections.map((section, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: section.heading,
        })),
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${canonicalUrl}#breadcrumb`,
        itemListElement: breadcrumbItems,
      },

    ],
  };

  return <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    <Container className="pb-16 pt-10 sm:pb-24 sm:pt-14">
      <article className={`relative mx-auto ${hasHomecomingMumSupplies ? "max-w-3xl" : "max-w-5xl"}`}>
        <nav aria-label="Breadcrumb" className="border-b border-border pb-4 text-xs uppercase tracking-[0.14em] text-muted-foreground">
          <Link to="/" className="hover:text-foreground">Front page</Link>
          <span aria-hidden="true" className="mx-2">/</span>
          {isMusicChild
            ? <Link to="/texas-music" className="hover:text-foreground">Texas Music</Link>
            : <Link to="/things-unique-to-texas" className="hover:text-foreground">Things That Define Texas</Link>}
          {isFoodHistoryChild ? <>
            <span aria-hidden="true" className="mx-2">/</span>
            <Link to="/texas-food-history" className="hover:text-foreground">Texas Food History</Link>
          </> : null}
          <span aria-hidden="true" className="mx-2">/</span>
          <span aria-current="page" className="text-foreground">{guide.title}</span>
        </nav>

        <header className="border-b border-border py-10 sm:py-14">
          <p className="eyebrow text-primary">{guide.eyebrow}</p>
          <h1 className="mt-3 max-w-4xl font-display text-5xl leading-[0.98] sm:text-7xl">{guide.title}</h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-muted-foreground sm:text-xl">{guide.dek}</p>
          <div className="mt-6 flex flex-wrap gap-x-6 gap-y-3 text-sm font-semibold">
            {isFoodHistoryChild ? <Link to="/texas-food-history" className="border-b border-primary pb-1 text-primary">Explore the full Texas Food History collection →</Link> : null}
            {isMusicChild ? <Link to="/texas-music" className="border-b border-primary pb-1 text-primary">Explore the full Texas Music collection →</Link> : null}
            {destinationLink ? <Link to={destinationLink.href} className="border-b border-primary pb-1 text-primary">{destinationLink.label} →</Link> : null}
          </div>
          {destinationLink ? <p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground">{destinationLink.description}</p> : null}
        </header>

        {foodBrandReviewed ? <p className="border-b border-border py-3 text-xs text-muted-foreground">By <Link to="/editorial-policy" className="font-semibold underline">TexasDefined Editorial Desk</Link> · Historical and source review {foodBrandReviewLabel}. Historical claims are distinguished from oral tradition; company and restaurant details may change.</p> : null}
        {reviewedNovember2026 ? <p className="border-b border-border py-3 text-xs text-muted-foreground">Researched and reviewed by <Link to="/editorial-policy" className="font-semibold underline">TexasDefined Editorial Desk</Link> · Substantive guide update November 20, 2026 (primary-source review November 18). Visitor conditions and event details can change.</p> : null}
        {image ? <figure className="border-b border-border py-8">
          <img src={deliveredImageSrc} alt={image.alt} className={hasHomecomingMumSupplies ? undefined : "aspect-[16/9] w-full object-cover"} width={hasHomecomingMumSupplies ? 1876 : foodBrandReviewed ? 1280 : undefined} height={hasHomecomingMumSupplies ? 3922 : foodBrandReviewed ? 720 : undefined} style={hasHomecomingMumSupplies ? { display: "block", margin: "0 auto", maxHeight: "44rem", maxWidth: "100%", objectFit: "contain", width: "auto" } : undefined} loading="eager" fetchPriority="high" onError={(event) => hideFailedImageContainer(event.currentTarget)} />
          <figcaption className="mt-3 max-w-3xl text-xs leading-5 text-muted-foreground">
            {image.caption}{foodBrandReviewed ? " Display crop for page layout." : ""}
            {image.credit ? <>{" "}{image.sourceHref ? <a href={image.sourceHref} target="_blank" rel="noreferrer noopener" className="underline decoration-border underline-offset-2">{image.credit}</a> : image.credit}{foodBrandReviewed && image.credit.includes("CC BY 4.0") ? <> · <a href="https://creativecommons.org/licenses/by/4.0/" className="underline">License terms</a></> : (foodBrandReviewed || hasHomecomingMumSupplies) && image.credit.includes("CC BY-SA 4.0") ? <> · <a href="https://creativecommons.org/licenses/by-sa/4.0/" className="underline">License terms</a></> : foodBrandReviewed && image.credit.includes("CC0") ? <> · <a href="https://creativecommons.org/publicdomain/zero/1.0/" className="underline">CC0 terms</a></> : null}</> : null}
          </figcaption>
        </figure> : null}

        {hasHomecomingMumSupplies ? <figure className="border-b border-border py-9" aria-labelledby="mum-diagram-heading">
          <p className="eyebrow text-primary">Construction reference</p>
          <h2 id="mum-diagram-heading" className="mt-2 font-display text-3xl">Identify the layers before you build</h2>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-muted-foreground">This original schematic shows the order of parts and balance points; it is an illustration, not a photograph or a universal template. Sizes, hardware and school customs vary.</p>
          <svg viewBox="0 0 800 490" role="img" aria-label="Illustrated homecoming mum: artificial chrysanthemum above layered ribbons, decorated braids and the two attachment points on the rear backing" className="mx-auto mt-6 block h-auto max-w-full border border-border" xmlns="http://www.w3.org/2000/svg">
            <defs><linearGradient id="mum-ribbon-bg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#b63a3a"/><stop offset="1" stopColor="#7c1717"/></linearGradient></defs>
            <rect x="0" y="0" width="800" height="490" rx="10" fill="#fcfaf6"/>
            <path d="M291 205 L320 447 L365 447 L367 203Z" fill="url(#mum-ribbon-bg)"/>
            <path d="M371 200 L386 447 L420 447 L425 205Z" fill="#c89a48"/>
            <path d="M425 201 L438 447 L485 447 L508 200Z" fill="#9d2626"/>
            <path d="M315 211 L350 445" fill="none" stroke="#f7e8c4" strokeWidth="6" strokeDasharray="15 8"/>
            <path d="M455 215 Q417 257 455 302 T455 395" fill="none" stroke="#f3e2c2" strokeWidth="10"/>
            <path d="M460 216 Q422 258 460 303 T460 396" fill="none" stroke="#b48529" strokeWidth="3"/>
            <circle cx="400" cy="168" r="85" fill="#c18a30" opacity=".25"/>
            {Array.from({length:14}, (_,i) => <ellipse key={i} cx="400" cy="169" rx="28" ry="75" fill={i%2 ? "#f8e4b1" : "#e0b861"} stroke="#a77929" strokeWidth="2" transform={`rotate(${i*360/14} 400 169)`} />)}
            <circle cx="400" cy="169" r="33" fill="#b88a2b" stroke="#78551e" strokeWidth="4"/>
            <circle cx="400" cy="169" r="16" fill="#f5db91"/>
            <rect x="390" y="73" width="23" height="19" rx="6" fill="#483b31"/>
            <rect x="390" y="243" width="23" height="19" rx="6" fill="#483b31"/>
            <path d="M250 78 H341 L373 91" stroke="#53453b" strokeWidth="2" fill="none"/>
            <text x="29" y="69" fontSize="23" fontWeight="bold" fill="#2d2925">1. Flower & backing</text>
            <text x="29" y="98" fontSize="16" fill="#504943">Center the lightweight flower</text>
            <path d="M250 280 H294 L315 310" stroke="#53453b" strokeWidth="2" fill="none"/>
            <text x="29" y="269" fontSize="23" fontWeight="bold" fill="#2d2925">2. Ribbon field</text>
            <text x="29" y="295" fontSize="16" fill="#504943">Measure the full drop first</text>
            <path d="M530 280 H590" stroke="#53453b" strokeWidth="2" fill="none"/>
            <text x="590" y="269" fontSize="23" fontWeight="bold" fill="#2d2925">3. Braids</text>
            <text x="590" y="295" fontSize="16" fill="#504943">Decorate without twisting</text>
            <path d="M417 82 H525 L566 86" stroke="#53453b" strokeWidth="2" fill="none"/>
            <text x="563" y="61" fontSize="21" fontWeight="bold" fill="#2d2925">Attachment</text>
            <text x="563" y="86" fontSize="16" fill="#504943">Reinforce both points</text>
            <text x="28" y="464" fontSize="15" fill="#62574b">Not to scale • Test the wearer’s comfort before adding heavy ornaments</text>
          </svg>
          <figcaption className="mt-3 text-sm leading-7 text-muted-foreground">The rear attachment points are shown schematically, not as a recommendation for specific pins or adhesives. For actual construction, choose secure hardware appropriate to the finished piece, cover sharp edges and follow campus rules.</figcaption>
        </figure> : null}
        <div className="relative">
        <section className="border-b border-border py-8" aria-labelledby="quick-answer">
          <p className="eyebrow text-primary">Quick answer</p>
          <h2 id="quick-answer" className="mt-2 font-display text-3xl">The short version</h2>
          <p className="mt-4 max-w-4xl text-base leading-8">{guide.quickAnswer}</p>
        </section>

        {comparison ? <section className="border-b border-border py-8" aria-labelledby="quick-comparison">
          <h2 id="quick-comparison" className="font-display text-3xl">{comparison.heading}</h2>
          <div className="mt-5 overflow-x-auto"><table className="w-full border-collapse text-left text-sm">
            <thead><tr>{comparison.columns.map(column => <th key={column} scope="col" className="border border-border bg-muted p-3">{column}</th>)}</tr></thead>
            <tbody>{comparison.rows.map(row => <tr key={row[0]}>{row.map((cell,index) => index === 0 ? <th key={index} scope="row" className="border border-border p-3">{cell}</th> : <td key={index} className="border border-border p-3">{cell}</td>)}</tr>)}</tbody>
          </table></div><p className="mt-3 text-xs leading-5 text-muted-foreground">{comparison.note}</p>
          <nav aria-label="Article contents" className="mt-6"><h3 className="font-semibold">Explore this guide</h3><ul className="mt-3 grid gap-2 sm:grid-cols-2">{guide.sections.map((s,index) => <li key={s.heading}><a className="text-sm text-primary underline underline-offset-2" href={`#${guide.slug}-section-${index+1}`}>{s.heading}</a></li>)}</ul></nav>
        </section> : null}
        <TexasCultureGuideFieldwork slug={guide.slug} />

        {hasHomecomingMumSupplies ? <section className="border-b border-border py-10" aria-labelledby="mum-grade-guide">
          <p className="eyebrow text-primary">At a glance</p>
          <h2 id="mum-grade-guide" className="mt-2 font-display text-4xl">Grade-level traditions</h2>
          <p className="mt-4 max-w-3xl text-sm leading-7 text-muted-foreground">These are common patterns, not statewide rules. Recent examples from the actual school should control color and size decisions.</p>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {homecomingMumGradeCards.map((card) => <div key={card.grade} className="border border-border p-5">
              <p className="eyebrow text-primary">{card.note}</p>
              <h3 className="mt-2 font-display text-2xl">{card.grade}</h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">{card.detail}</p>
            </div>)}
          </div>
          <h3 className="mt-8 font-display text-3xl">Mum or garter?</h3>
          <div className="mt-4 grid gap-px overflow-hidden border border-border bg-border sm:grid-cols-2">
            {homecomingMumFormats.map((format) => <div key={format.title} className="bg-background p-5">
              <strong className="font-display text-2xl">{format.title}</strong>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">{format.text}</p>
            </div>)}
          </div>
        </section> : null}

        <div>
          {guide.sections.map((section, index) => <section key={section.heading} id={`${guide.slug}-section-${index + 1}`} className="scroll-mt-24 grid gap-6 border-b border-border py-10 lg:grid-cols-[12rem_minmax(0,1fr)]">
            <div>
              <p className="eyebrow text-primary">{String(index + 1).padStart(2, "0")}</p>
              <h2 className="mt-2 font-display text-3xl leading-tight">{section.heading}</h2>
            </div>
            <div className="max-w-3xl space-y-5">
              {section.body.map((paragraph) => <p key={paragraph} className="text-base leading-8 text-muted-foreground">{paragraph}</p>)}
              {section.bullets?.length ? <ul className="grid gap-3 border-l border-primary/40 pl-5 text-sm leading-7">
                {section.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}
              </ul> : null}
              {section.links?.length ? <div className="flex flex-wrap gap-x-6 gap-y-3 pt-1 text-sm font-semibold">
                {section.links.map((link) => link.href.startsWith("https://") ? <a key={link.href} href={link.href} target="_blank" rel="noopener noreferrer" className="border-b border-primary text-primary">{link.label} ↗</a> : <Link key={link.href} to={link.href} className="border-b border-primary text-primary">{link.label}</Link>)}
              </div> : null}
            </div>
          </section>)}
        </div>
        </div>
        {hasHomecomingMumSupplies ? <SchoolSupplyPartners context="homecoming" /> : null}

        {hasHomecomingMumSupplies ? <section className="border-b border-border py-10" aria-labelledby="homecoming-mum-faq">
          <p className="eyebrow text-primary">FAQ</p>
          <h2 id="homecoming-mum-faq" className="mt-2 font-display text-4xl">Texas homecoming mum questions</h2>
          <p className="mt-4 max-w-3xl text-sm leading-7 text-muted-foreground">Short answers to the questions that usually come up when someone encounters the tradition for the first time.</p>
          <div className="mt-6 divide-y divide-border border-y border-border">
            {homecomingMumFaqs.map(([question, answer]) => <details key={question} className="py-5">
              <summary className="cursor-pointer list-none pr-8 font-display text-2xl leading-tight">{question}</summary>
              <p className="mt-3 max-w-3xl text-sm leading-7 text-muted-foreground">{answer}</p>
            </details>)}
          </div>
        </section> : null}

        {sources.length ? <section className="border-b border-border py-10" aria-labelledby="source-notes">
          <p className="eyebrow text-primary">Sources</p>
          <h2 id="source-notes" className="mt-2 font-display text-3xl">Where the historical claims come from</h2>
          <p className="mt-4 max-w-3xl text-sm leading-7 text-muted-foreground">These references support the historical and practical claims above. {guide.slug === "texas-homecoming-mums" ? "School conventions, maker quotes and event restrictions vary locally; check the school and maker directly." : guide.slug === "texas-dance-halls-honky-tonks" ? "Preservation listings document heritage, not a guaranteed operating event; check each venue for live dates, tickets and accessibility." : "Where sources disagree, this guide distinguishes recorded evidence from later cultural retellings."}</p>
          <ul className="mt-6 divide-y divide-border border-y border-border">
            {sources.map((source) => <li key={source.href} className="py-4">
              <a href={source.href} target="_blank" rel="noreferrer noopener" className="font-semibold text-primary underline decoration-primary/40 underline-offset-4">{source.label} ↗</a>
              <p className="mt-1 text-sm leading-6 text-muted-foreground">{source.note}</p>
            </li>)}
          </ul>
        </section> : null}

        <section className="py-12" aria-labelledby="related-reading">
          <p className="eyebrow text-primary">Keep exploring</p>
          <h2 id="related-reading" className="mt-2 font-display text-4xl">Related TexasDefined guides</h2>
          <div className="mt-6 grid gap-px overflow-hidden border border-border bg-border md:grid-cols-3">
            {guide.related.map((item) => <Link key={item.href} to={item.href} className="group bg-background p-6">
              <strong className="font-display text-2xl leading-tight group-hover:text-primary">{item.label}</strong>
              <span className="mt-3 block text-sm leading-6 text-muted-foreground">{item.description}</span>
              <span className="mt-5 block text-sm font-semibold text-primary">Read next →</span>
            </Link>)}
          </div>
        </section>
      </article>
    </Container>
  </>;
}
