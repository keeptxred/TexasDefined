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
    tagline: "Texas places and stories.",
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
    defaultDescription: "Explore Texas destinations, culture and daily life.",
    twitterSite: "@texasdefined",
    organizationType: "Organization",
  },
  copy: {
    newsletterEyebrow: "The Texas Defined Letter",
    newsletterHeading: "Texas, delivered once a week",
    newsletterBody: "Texas destinations, stories, food and weekly highlights.",
    newsletterCta: "Subscribe",
    newsletterPlaceholder: "Email address",
    newsletterSuccess: "You're subscribed to Texas Defined.",
    readMore: "Read the story",
    viewAll: "View the full guide",
    searchPlaceholder: "Search Texas places, stories and guides",
    searchEmpty: "No matches. Try a town, landmark or topic.",
    emptyState: "No stories yet. Explore more Texas guides.",
    comingSoon: "Coming soon",
    comingSoonBody: "We're verifying details for this guide.",
    shopCta: "Visit the shop",
    shopTheStoryHeading: "From the Texas Defined Shop",
    relatedHeading: "Related stories and places",
    footerNote: "An independent guide to Texas places, stories and life.",
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
      description: "Texas parks, towns and outdoors",
      children: [
        { label: "Trip Planner", to: "/explore/trip-planner", description: "Plan Texas stops by interest and drive time", image: { src: roadTrip, alt: "A two-lane Texas road leading toward the horizon" } },
        { label: "Lakes & Rivers", to: "/explore/lakes-rivers", description: "Swimming holes, rivers and lakes", image: { src: caddoLake, alt: "Cypress trees on Caddo Lake at dawn" } },
        { label: "Springs & Swimming", to: "/explore/major-springs", description: "Springs and natural swimming pools", image: { src: blueHole, alt: "Clear spring-fed water in the Texas Hill Country" } },
        { label: "State Parks", to: "/explore/state-parks", description: "Canyons, coastlines, trails and campsites", image: { src: enchantedRock, alt: "Granite dome and Hill Country landscape at Enchanted Rock" } },
        { label: "Best Camping in Texas", to: "/best-places-to-go-camping-in-texas", description: "Find campsites by region and season", image: { src: paloDuro, alt: "Palo Duro Canyon landscape near Texas campsites" } },
        { label: "National Parks", to: "/explore/national-parks", description: "National parks and federal lands", image: { src: bigBend, alt: "Desert mountains in Big Bend country" } },
        { label: "Caverns & Caves", to: "/explore/caverns", description: "Show caves and limestone caverns", image: { src: "/images/explore/caverns/longhorn-cavern-state-park.jpg", alt: "Underground limestone formations inside Longhorn Cavern State Park" } },
        { label: "Beaches & Coast", to: "/explore/beaches-coast", description: "Barrier islands, bays and Gulf Coast towns", image: { src: "/images/explore/beaches-coast/galveston-island-state-park.jpg", alt: "Galveston Island State Park on the Texas Gulf Coast" } },
        { label: "Historic Sites", to: "/explore/historic-sites", description: "Missions, museums, monuments and battlefields", image: { src: "/images/explore/historic-sites/the-alamo.jpg", alt: "The Alamo in San Antonio" } },
        { label: "Painted Churches", to: "/explore/painted-churches", description: "Painted churches and heritage drives", image: { src: paintedChurchNavImage, alt: "Illustrated historic Texas church representing the Painted Churches of Texas" } },
        { label: "Road Trips", to: "/explore/road-trips", description: "Scenic drives and stops worth pulling over for", image: { src: bluebonnets, alt: "Texas bluebonnets along a scenic spring drive" } },
        { label: "Small Towns", to: "/explore/small-towns", description: "Courthouse squares, dance halls and local favorites", image: { src: courthouseSquare, alt: "A classic Texas courthouse square in a small town" } },
        { label: "Food & Barbecue", to: "/explore/food-bbq", description: "Barbecue and regional Texas food", image: { src: bbqBrisket, alt: "Sliced smoked brisket on butcher paper" } },
        { label: "Outdoors & Wildlife", to: "/explore/outdoors", description: "Wild places, native wildlife and big Texas skies", image: { src: wildlife, alt: "White-tailed deer in Texas brush country" } },
      ],
    },
    { label: "Fishing", to: "/fishing", description: "Texas fishing lakes, species, guides and reports" },
    { label: "Music", to: "/texas-music", description: "Texas music and artists" },
    {
      label: "Texas Life",
      to: "/texas-living",
      description: "Homes, history, sports and Texas living",
      children: [
        { label: "Things That Define Texas", to: "/things-unique-to-texas", description: "250 defining Texas traditions", image: { src: bbqBrisket, alt: "Texas barbecue representing one of the foods and traditions that define the state" } },
        { label: "Texas Icons", to: "/texas-icons", image: { src: bluebonnets, alt: "Texas bluebonnets, one of the state’s best-known natural icons" } },
        { label: "Texas Dogs Defined", to: "/dogs", description: "Dog breeds and life with dogs in Texas", image: { src: texasDogsNavImage, alt: "Illustrated Chihuahua representing Texas Dogs Defined" } },
        { label: "Homes & Land", to: "/real-estate", description: "Buying and owning Texas homes and land", image: { src: heroHillCountry, alt: "Texas Hill Country land and homes landscape" } },
        { label: "Property", to: "/property", description: "Taxes, exemptions and homeowner tools", image: { src: courthouseSquare, alt: "Texas courthouse square representing county property and tax resources" } },
        { label: "Moving Here", to: "/moving-to-texas", description: "What to know before the boxes arrive", image: { src: roadTrip, alt: "A Texas highway stretching toward the horizon" } },
        { label: "Texas Industries", to: "/texas-industries", description: "Texas energy, technology, industry and agriculture", image: { src: texasIndustriesNavImage, alt: "Illustrated Permian Basin pumpjack representing Texas industries" } },
        { label: "Texas vs Every State", to: "/texas-vs-every-state", description: "Compare Texas with the other 49 states", image: { src: bigBend, alt: "Big Bend landscape representing Texas in the fifty-state comparison" } },
        { label: "Texas Resources", to: "/texas-resources", description: "Texas DMV and public services", image: { src: texasSpecialDistricts, alt: "Texas civic and public-service infrastructure" } },
        { label: "Home & Garden", to: "/home-garden", description: "Texas home and garden projects", image: { src: texasHomeMaintenance, alt: "Texas home exterior for seasonal home and garden projects" } },
        { label: "History", to: "/texas-history", description: "People and events in Texas history", image: { src: smallTown, alt: "A historic Texas courthouse square" } },
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