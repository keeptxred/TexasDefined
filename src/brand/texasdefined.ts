import caddoLake from "@/assets/caddo-lake.jpg";
import paloDuro from "@/assets/palo-duro.jpg";
import roadTrip from "@/assets/road-trip.jpg";
import smallTown from "@/assets/small-town.jpg";
import bbqBrisket from "@/assets/bbq-brisket.jpg";
import wildlife from "@/assets/wildlife.jpg";
import blueHole from "@/assets/blue-hole.jpg";
import bigBend from "@/assets/big-bend.jpg";

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
    searchPlaceholder: "Search towns, parks, lakes, stories and guides",
    searchEmpty: "No match yet. Try a town, landmark, park, lake or broader Texas subject.",
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
        { label: "State Parks", to: "/explore/state-parks", description: "Canyons, coastlines, trails and campsites", image: { src: paloDuro, alt: "Red rock walls of Palo Duro Canyon" } },
        { label: "National Parks", to: "/explore/national-parks", description: "Big Bend, Guadalupe Mountains and federal lands", image: { src: bigBend, alt: "Desert mountains in Big Bend country" } },
        { label: "Caverns & Caves", to: "/explore/caverns", description: "Show caves and limestone rooms below ground", image: { src: paloDuro, alt: "Layered Texas limestone landscape" } },
        { label: "Beaches & Coast", to: "/explore/beaches-coast", description: "Barrier islands, bays and Gulf Coast towns", image: { src: caddoLake, alt: "Texas water landscape at sunrise" } },
        { label: "Historic Sites", to: "/explore/historic-sites", description: "Missions, museums, monuments and battlefields", image: { src: smallTown, alt: "Historic Texas courthouse square" } },
        { label: "Road Trips", to: "/explore/road-trips", description: "Scenic drives and stops worth pulling over for", image: { src: roadTrip, alt: "A two-lane Texas farm road at sunset" } },
        { label: "Small Towns", to: "/explore/small-towns", description: "Courthouse squares, dance halls and local favorites", image: { src: smallTown, alt: "A historic Texas courthouse square" } },
        { label: "Food & Barbecue", to: "/explore/food-bbq", description: "Barbecue joints, regional dishes and places worth the wait", image: { src: bbqBrisket, alt: "Sliced smoked brisket on butcher paper" } },
        { label: "Outdoors & Wildlife", to: "/explore/outdoors", description: "Wild places, native wildlife and big Texas skies", image: { src: wildlife, alt: "White-tailed deer in Texas brush country" } },
      ],
    },
    {
      label: "Texas Life",
      to: "/texas-living",
      description: "Homes, history, sports and the practical side of making a life in Texas",
      children: [
        { label: "Living Here", to: "/texas-living", description: "Everyday Texas life, useful answers and local know-how", image: { src: smallTown, alt: "A Texas town square and streetscape" } },
        { label: "Moving Here", to: "/moving-to-texas", description: "What to know before the boxes arrive", image: { src: roadTrip, alt: "A Texas highway stretching toward the horizon" } },
        { label: "Home & Garden", to: "/home-garden", description: "Texas homes, yards, seasons and practical projects", image: { src: blueHole, alt: "A shaded Texas Hill Country landscape" } },
        { label: "History", to: "/texas-history", description: "The people, places and moments that shaped the state", image: { src: smallTown, alt: "A historic Texas courthouse square" } },
        { label: "Sports", to: "/sports", description: "Teams, traditions and the games Texans follow", image: { src: wildlife, alt: "A wide Texas landscape under an open sky" } },
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
        { label: "Springs & Swimming", to: "/explore/major-springs" },
        { label: "State Parks", to: "/explore/state-parks" },
        { label: "National Parks", to: "/explore/national-parks" },
        { label: "Caverns & Caves", to: "/explore/caverns" },
        { label: "Beaches & Coast", to: "/explore/beaches-coast" },
        { label: "Historic Sites", to: "/explore/historic-sites" },
        { label: "Road Trips", to: "/explore/road-trips" },
        { label: "Small Towns", to: "/explore/small-towns" },
        { label: "Food & Barbecue", to: "/explore/food-bbq" },
      ],
    },
    {
      title: "Living in Texas",
      items: [
        { label: "Moving to Texas", to: "/moving-to-texas" },
        { label: "Home & Garden", to: "/home-garden" },
        { label: "Living Here", to: "/texas-living" },
        { label: "Guides", to: "/guides" },
      ],
    },
    {
      title: "The Magazine",
      items: [
        { label: "Sports", to: "/sports" },
        { label: "Events", to: "/events" },
        { label: "History", to: "/texas-history" },
        { label: "Shop", to: "/shop" },
        { label: "About", to: "/about" },
      ],
    },
  ],
  legal: [{ label: "Search", to: "/search" }],
};
