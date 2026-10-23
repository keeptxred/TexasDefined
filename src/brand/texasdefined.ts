import caddoLake from "@/assets/caddo-lake.jpg";
import paloDuro from "@/assets/palo-duro.jpg";
import roadTrip from "@/assets/road-trip.jpg";
import smallTown from "@/assets/small-town.jpg";
import bbqBrisket from "@/assets/bbq-brisket.jpg";
import wildlife from "@/assets/wildlife.jpg";
import blueHole from "@/assets/blue-hole.jpg";
import bigBend from "@/assets/big-bend.jpg";
import highSchoolFootball from "@/assets/high-school-football-hero.jpg";
import bluebonnets from "@/assets/bluebonnets.jpg";
import enchantedRock from "@/assets/enchanted-rock.jpg";
import heroHillCountry from "@/assets/hero-hill-country.jpg";
import courthouseSquare from "@/assets/generated/texas-courthouse-square.jpg";
import texasHomeMaintenance from "@/assets/texas-home-maintenance-photo.jpg";
import texasSpecialDistricts from "@/assets/generated/texas-special-districts.jpg";
import paintedChurchNavImage from "@/assets/navigation-painted-churches.svg?no-inline";
import texasDogsNavImage from "@/assets/navigation-texas-dogs.svg?no-inline";
import texasIndustriesNavImage from "@/assets/navigation-texas-industries.svg?no-inline";

import type { BrandConfig } from "./types";

export const texasDefinedBrand: BrandConfig = {
  identity: {
    id: "texasdefined",
    name: "Texas Defined",
    wordmark: "Texas Defined",
    monogram: "TD",
    tagline: "Texas places, stories and life.",
    domain: "texasdefined.com",
    locale: "en-US",
    social: [
      { label: "Instagram", href: "https://instagram.com/texasdefined" },
      { label: "YouTube", href: "https://youtube.com/@texasdefined" },
      { label: "Pinterest", href: "https://pinterest.com/texasdefined" },
    ],
  },
  seo: {
    titleTemplate: "%s | Texas Defined",
    defaultTitle: "Texas Defined — The Places, Stories and Life of Texas",
    defaultDescription: "Explore Texas places, food, traditions and daily life.",
    twitterSite: "@texasdefined",
    organizationType: "Organization",
  },
  copy: {
    newsletterEyebrow: "The Texas Defined Letter",
    newsletterHeading: "Texas, delivered once a week",
    newsletterBody: "One destination, one story, one good meal and a short list of things worth knowing from around the state.",
    newsletterCta: "Subscribe",
    newsletterPlaceholder: "Email address",
    newsletterSuccess: "You’re subscribed. Watch for the next Texas Defined Letter.",
    readMore: "Read the story",
    viewAll: "View the full guide",
    searchPlaceholder: "Search Texas towns, parks, lakes and guides",
    searchEmpty: "No match. Try a town, park, lake or subject.",
    emptyState: "No stories here yet. Explore other Texas guides.",
    comingSoon: "Coming soon",
    comingSoonBody: "We're still verifying details for this guide.",
    shopCta: "Visit the shop",
    shopTheStoryHeading: "From the Texas Defined Shop",
    relatedHeading: "Related Texas guides",
    footerNote: "An independent magazine and guide to the places, stories and everyday life of Texas.",
    skipToContent: "Skip to content",
    menu: "Menu",
    close: "Close menu",
  },
  features: {
    shop: true,
    events: true,
    guides: true,
    realEstate: true,
    newsletter: true,
    search: true,
    accounts: false,
  },
  nav: [
    {
      label: "Explore",
      to: "/explore",
      description: "Travel, parks, water, small towns and the Texas outdoors",
      children: [
        { label: "Trip Planner", to: "/explore/trip-planner", description: "Plan a Texas road trip by interest and drive time", image: { src: roadTrip, alt: "A two-lane Texas road leading toward the horizon" } },
        { label: "Lakes & Rivers", to: "/explore/lakes-rivers", description: "Texas rivers, lakes and swimming holes", image: { src: caddoLake, alt: "Cypress trees on Caddo Lake at dawn" } },
        { label: "Springs & Swimming", to: "/explore/major-springs", description: "Natural Texas springs and swimming pools", image: { src: blueHole, alt: "Clear spring-fed water in the Texas Hill Country" } },
        { label: "State Parks", to: "/explore/state-parks", description: "Canyons, coasts, trails and camping", image: { src: enchantedRock, alt: "Granite dome and Hill Country landscape at Enchanted Rock" } },
        { label: "Best Camping in Texas", to: "/best-places-to-go-camping-in-texas", description: "Texas campsites by region and season", image: { src: paloDuro, alt: "Palo Duro Canyon landscape near Texas campsites" } },
        { label: "National Parks", to: "/explore/national-parks", description: "Texas national parks and federal lands", image: { src: bigBend, alt: "Desert mountains in Big Bend country" } },
        { label: "Caverns & Caves", to: "/explore/caverns", description: "Texas caves and caverns", image: { src: "/images/explore/caverns/longhorn-cavern-state-park.jpg", alt: "Underground limestone formations inside Longhorn Cavern State Park" } },
        { label: "Beaches & Coast", to: "/explore/beaches-coast", description: "Barrier islands, bays and Gulf Coast towns", image: { src: "/images/explore/beaches-coast/galveston-island-state-park.jpg", alt: "Galveston Island State Park on the Texas Gulf Coast" } },
        { label: "Historic Sites", to: "/explore/historic-sites", description: "Missions, museums and historic sites", image: { src: "/images/explore/historic-sites/the-alamo.jpg", alt: "The Alamo in San Antonio" } },
        { label: "Painted Churches", to: "/explore/painted-churches", description: "Painted churches and heritage trails", image: { src: paintedChurchNavImage, alt: "Illustrated historic Texas church representing the Painted Churches of Texas" } },
        { label: "Road Trips", to: "/explore/road-trips", description: "Scenic Texas drives and stops", image: { src: bluebonnets, alt: "Texas bluebonnets along a scenic spring drive" } },
        { label: "Small Towns", to: "/explore/small-towns", description: "Small-town squares and dance halls", image: { src: courthouseSquare, alt: "A classic Texas courthouse square in a small town" } },
        { label: "Food & Barbecue", to: "/explore/food-bbq", description: "Texas barbecue and regional food", image: { src: bbqBrisket, alt: "Sliced smoked brisket on butcher paper" } },
        { label: "Outdoors & Wildlife", to: "/explore/outdoors", description: "Texas wildlife and outdoor places", image: { src: wildlife, alt: "White-tailed deer in Texas brush country" } },
      ],
    },
    { label: "Fishing", to: "/fishing", description: "Texas fishing lakes, species and guides" },
    { label: "Music", to: "/texas-music", description: "Texas music, artists and places" },
    {
      label: "Texas Life",
      to: "/texas-living",
      description: "Homes, history, sports and the practical side of making a life in Texas",
      children: [
        { label: "Things That Define Texas", to: "/things-unique-to-texas", description: "250 defining Texas foods and traditions", image: { src: bbqBrisket, alt: "Texas barbecue representing one of the foods and traditions that define the state" } },
        { label: "Texas Icons", to: "/texas-icons", image: { src: bluebonnets, alt: "Texas bluebonnets, one of the state’s best-known natural icons" } },
        { label: "Texas Dogs Defined", to: "/dogs", description: "Texas dogs, breeds and everyday care", image: { src: texasDogsNavImage, alt: "Illustrated Chihuahua representing Texas Dogs Defined" } },
        { label: "Homes & Land", to: "/real-estate", description: "Buying and owning Texas homes and land", image: { src: heroHillCountry, alt: "Texas Hill Country land and homes landscape" } },
        { label: "Property", to: "/property", description: "Taxes, exemptions, county guides and homeowner tools", image: { src: courthouseSquare, alt: "Texas courthouse square representing county property and tax resources" } },
        { label: "Moving Here", to: "/moving-to-texas", description: "What to know before the boxes arrive", image: { src: roadTrip, alt: "A Texas highway stretching toward the horizon" } },
        { label: "Texas Industries", to: "/texas-industries", description: "Texas energy, technology and industry", image: { src: texasIndustriesNavImage, alt: "Illustrated Permian Basin pumpjack representing Texas industries" } },
        { label: "Texas vs Every State", to: "/texas-vs-every-state", description: "Compare Texas with all 49 other states", image: { src: bigBend, alt: "Big Bend landscape representing Texas in the fifty-state comparison" } },
        { label: "Texas Resources", to: "/texas-resources", description: "Driver licenses, DMV, state agencies and practical services", image: { src: texasSpecialDistricts, alt: "Texas civic and public-service infrastructure" } },
        { label: "Home & Garden", to: "/home-garden", description: "Texas homes, yards, seasons and practical projects", image: { src: texasHomeMaintenance, alt: "Texas home exterior for seasonal home and garden projects" } },
        { label: "History", to: "/texas-history", description: "The people, places and moments that shaped the state", image: { src: smallTown, alt: "A historic Texas courthouse square" } },
        { label: "Sports", to: "/sports", description: "Teams, traditions and the games Texans follow", image: { src: highSchoolFootball, alt: "Texas high school football under stadium lights" } },
      ],
    },
    { label: "Events", to: "/events" },
    { label: "Guides", to: "/guides" },
    { label: "Shop", to: "/shop" },
    { label: "About", to: "/about" },
  ],
  footer: [
    {
      title: "Explore Texas",
      items: [
        { label: "Trip Planner", to: "/explore/trip-planner" },
        { label: "Lakes & Rivers", to: "/explore/lakes-rivers" },
        { label: "Fishing", to: "/fishing" },
        { label: "Texas Music", to: "/texas-music" },
        { label: "State Parks", to: "/explore/state-parks" },
        { label: "Best Camping in Texas", to: "/best-places-to-go-camping-in-texas" },
        { label: "National Parks", to: "/explore/national-parks" },
        { label: "Painted Churches", to: "/explore/painted-churches" },
        { label: "Road Trips", to: "/explore/road-trips" },
        { label: "Small Towns", to: "/explore/small-towns" },
        { label: "Food & Barbecue", to: "/explore/food-bbq" },
        { label: "Outdoors & Wildlife", to: "/explore/outdoors" },
      ],
    },
    {
      title: "Texas Life",
      items: [
        { label: "Things That Define Texas", to: "/things-unique-to-texas" },
        { label: "Texas Dogs Defined", to: "/dogs" },
        { label: "Homes & Land", to: "/real-estate" },
        { label: "Property", to: "/property" },
        { label: "Moving Here", to: "/moving-to-texas" },
        { label: "Texas Industries", to: "/texas-industries" },
        { label: "Texas vs Every State", to: "/texas-vs-every-state" },
        { label: "Texas Resources", to: "/texas-resources" },
        { label: "Home & Garden", to: "/home-garden" },
        { label: "History", to: "/texas-history" },
        { label: "Sports", to: "/sports" },
        { label: "Texas Life Guide", to: "/texas-living" },
      ],
    },
    {
      title: "Read & Use",
      items: [
        { label: "Start Here", to: "/texas-resources" },
        { label: "Texas Explained", to: "/texas-explained" },
        { label: "Events", to: "/events" },
        { label: "Guides", to: "/guides" },
        { label: "Money & Property", to: "/decide/financial-tools" },
        { label: "Texas Data", to: "/texas-data" },
        { label: "Shop", to: "/shop" },
        { label: "About", to: "/about" },
      ],
    },
  ],
  legal: [
    { label: "Privacy & Site Terms", to: "/about#privacy-terms" },
    { label: "Returns & Refunds", to: "/return-refund-policy" },
    { label: "Network Membership Terms", to: "/network/terms" },
    { label: "Search", to: "/search" },
  ],
};