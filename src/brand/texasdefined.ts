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
import sixFlagsHero from "@/assets/six-flags-hero-photo.jpg";
import courthouseSquare from "@/assets/generated/texas-courthouse-square.jpg";

import type { BrandConfig } from "./types";

export const texasDefinedBrand: BrandConfig = {
  identity: {
    id: "texasdefined",
    name: "Texas Defined",
    wordmark: "Texas Defined",
    monogram: "TD",
    tagline: "The places, stories and life of Texas.",
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
    defaultDescription: "An editorial guide to the places, food, traditions, homes and everyday experiences that make Texas feel like Texas.",
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
    searchPlaceholder: "Search towns, parks, lakes, music, stories and guides",
    searchEmpty: "No match yet. Try a town, landmark, park, lake, musician or broader Texas subject.",
    emptyState: "There is nothing in this section yet. More Texas Defined coverage is on the way.",
    comingSoon: "Coming soon",
    comingSoonBody: "We are still gathering and checking the details for this guide.",
    shopCta: "Visit the shop",
    shopTheStoryHeading: "From the Texas Defined Shop",
    relatedHeading: "Related stories and places",
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
        { label: "Trip Planner", to: "/explore/trip-planner", description: "Build a Texas itinerary around your interests and driving time", image: { src: roadTrip, alt: "A two-lane Texas road leading toward the horizon" } },
        { label: "Lakes & Rivers", to: "/explore/lakes-rivers", description: "Swimming holes, quiet rivers and cypress-lined water", image: { src: caddoLake, alt: "Cypress trees on Caddo Lake at dawn" } },
        { label: "Springs & Swimming", to: "/explore/major-springs", description: "Clear springs, spring-fed pools and swimming water", image: { src: blueHole, alt: "Clear spring-fed water in the Texas Hill Country" } },
        { label: "State Parks", to: "/explore/state-parks", description: "Canyons, coastlines, trails and campsites", image: { src: enchantedRock, alt: "Granite dome and Hill Country landscape at Enchanted Rock" } },
        { label: "Best Camping in Texas", to: "/best-places-to-go-camping-in-texas", description: "Choose campsites by region, season and camping style", image: { src: paloDuro, alt: "Palo Duro Canyon landscape near Texas campsites" } },
        { label: "National Parks", to: "/explore/national-parks", description: "Big Bend, Guadalupe Mountains and federal lands", image: { src: bigBend, alt: "Desert mountains in Big Bend country" } },
        { label: "Caverns & Caves", to: "/explore/caverns", description: "Show caves and limestone rooms below ground", image: { src: heroHillCountry, alt: "Limestone Hill Country landscape above Texas cave country" } },
        { label: "Beaches & Coast", to: "/explore/beaches-coast", description: "Barrier islands, bays and Gulf Coast towns", image: { src: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Port_Isabel%2C_Texas_Lighthouse.jpg?width=1600", alt: "Port Isabel Lighthouse on the Texas Gulf Coast" } },
        { label: "Historic Sites", to: "/explore/historic-sites", description: "Missions, museums, monuments and battlefields", image: { src: sixFlagsHero, alt: "Historic Texas flags representing layers of state history" } },
        { label: "Painted Churches", to: "/explore/painted-churches", description: "Historic sanctuaries, painted interiors and heritage-driving routes", image: { src: smallTown, alt: "Historic Central Texas architecture along a heritage route" } },
        { label: "Road Trips", to: "/explore/road-trips", description: "Scenic drives and stops worth pulling over for", image: { src: bluebonnets, alt: "Texas bluebonnets along a scenic spring drive" } },
        { label: "Small Towns", to: "/explore/small-towns", description: "Courthouse squares, dance halls and local favorites", image: { src: courthouseSquare, alt: "A classic Texas courthouse square in a small town" } },
        { label: "Food & Barbecue", to: "/explore/food-bbq", description: "Barbecue joints, regional dishes and places worth the wait", image: { src: bbqBrisket, alt: "Sliced smoked brisket on butcher paper" } },
        { label: "Outdoors & Wildlife", to: "/explore/outdoors", description: "Wild places, native wildlife and big Texas skies", image: { src: wildlife, alt: "White-tailed deer in Texas brush country" } },
      ],
    },
    { label: "Fishing", to: "/fishing", description: "Texas lakes, fish species, techniques, guides and fishing reports" },
    { label: "Music", to: "/texas-music", description: "Texas music history, roots, genres, artists and places" },
    {
      label: "Texas Life",
      to: "/texas-living",
      description: "Homes, history, sports and the practical side of making a life in Texas",
      children: [
        { label: "Things That Define Texas", to: "/things-unique-to-texas", description: "250 foods, places, traditions and symbols that define Texas" },
        { label: "Texas Icons", to: "/texas-icons" },
        { label: "Homes & Land", to: "/real-estate", description: "Buying and owning Texas homes and land" },
        { label: "Property", to: "/property", description: "Taxes, exemptions, county guides and homeowner tools" },
        { label: "Moving Here", to: "/moving-to-texas", description: "What to know before the boxes arrive", image: { src: roadTrip, alt: "A Texas highway stretching toward the horizon" } },
        { label: "Texas vs Every State", to: "/texas-vs-every-state", description: "Compare Texas with all 49 other states using one consistent framework", image: { src: roadTrip, alt: "A Texas highway stretching toward the horizon" } },
        { label: "Texas Resources", to: "/texas-resources", description: "Driver licenses, DMV, state agencies and practical services" },
        { label: "Home & Garden", to: "/home-garden", description: "Texas homes, yards, seasons and practical projects" },
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
        { label: "Homes & Land", to: "/real-estate" },
        { label: "Property", to: "/property" },
        { label: "Moving Here", to: "/moving-to-texas" },
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
    { label: "Search", to: "/search" },
  ],
};