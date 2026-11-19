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

/** Preserve the complete illustrated navigation while avoiding repeated object-field bytes in the eager client bundle. */
const illustratedNavLinks = (rows: Array<[string, string, string | undefined, string, string]>) =>
  rows.map(([label, to, description, src, alt]) => ({ label, to, ...(description ? { description } : {}), image: { src, alt } }));

const compactTextLinks = (rows: Array<[string, string]>) => rows.map(([label, to]) => ({ label, to }));

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
    emptyState: "Explore more Texas guides.",
    comingSoon: "Coming soon",
    comingSoonBody: "We're verifying details for this guide.",
    shopCta: "Visit the shop",
    shopTheStoryHeading: "From the Texas Defined Shop",
    relatedHeading: "Related stories and places",
    footerNote: "An independent Texas travel and life guide.",
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
      children: illustratedNavLinks([
        ["Trip Planner", "/explore/trip-planner", "Plan Texas stops by interest and drive time", roadTrip, "Two-lane Texas highway"],
        ["Lakes & Rivers", "/explore/lakes-rivers", "Swimming holes, rivers and lakes", caddoLake, "Caddo Lake cypress trees"],
        ["Springs & Swimming", "/explore/major-springs", "Springs and natural swimming pools", blueHole, "Hill Country spring-fed pool"],
        ["State Parks", "/explore/state-parks", "Canyons, coasts and camping", enchantedRock, "Enchanted Rock granite dome"],
        ["Best Camping in Texas", "/best-places-to-go-camping-in-texas", "Find campsites by region and season", paloDuro, "Palo Duro Canyon campsites"],
        ["National Parks", "/explore/national-parks", "National parks and federal lands", bigBend, "Big Bend desert mountains"],
        ["Caverns & Caves", "/explore/caverns", "Show caves and limestone caverns", "/images/explore/caverns/longhorn-cavern-state-park.jpg", "Longhorn Cavern limestone formations"],
        ["Beaches & Coast", "/explore/beaches-coast", "Barrier islands, bays and Gulf Coast towns", "/images/explore/beaches-coast/galveston-island-state-park.jpg", "Galveston Island State Park beach"],
        ["Historic Sites", "/explore/historic-sites", "Missions, museums and monuments", "/images/explore/historic-sites/the-alamo.jpg", "The Alamo in San Antonio"],
        ["Painted Churches", "/explore/painted-churches", "Painted churches and heritage drives", paintedChurchNavImage, "Illustration of a Texas painted church"],
        ["Road Trips", "/explore/road-trips", "Scenic Texas roads", bluebonnets, "Texas roadside bluebonnets"],
        ["Small Towns", "/explore/small-towns", "Town squares and dance halls", courthouseSquare, "Historic Texas courthouse square"],
        ["Food & Barbecue", "/explore/food-bbq", "Barbecue and regional Texas food", bbqBrisket, "Texas smoked brisket"],
        ["Outdoors & Wildlife", "/explore/outdoors", "Texas wildlife and outdoors", wildlife, "White-tailed deer in Texas brush"],
      ]),
    },
    { label: "Fishing", to: "/fishing", description: "Texas fishing lakes, species, guides and reports" },
    { label: "Hunting", to: "/hunting", description: "Public hunting access, species, licenses and regulations" },
    { label: "Music", to: "/texas-music", description: "Texas music and artists" },
    {
      label: "Texas Life",
      to: "/texas-living",
      description: "Texas homes, sports and history",
      children: illustratedNavLinks([
        ["Things That Define Texas", "/things-unique-to-texas", "Foods, places and traditions that define Texas", bbqBrisket, "Texas barbecue brisket"],
        ["Texas Icons", "/texas-icons", undefined, bluebonnets, "Texas bluebonnets"],
        ["Texas Dogs Defined", "/dogs", "Dog breeds and life with dogs in Texas", texasDogsNavImage, "Illustrated Chihuahua"],
        ["Homes & Land", "/real-estate", "Buying and owning Texas homes and land", heroHillCountry, "Texas Hill Country homes"],
        ["Property", "/property", "Taxes, exemptions and homeowner tools", courthouseSquare, "Texas county courthouse"],
        ["Moving Here", "/moving-to-texas", "What to know before the boxes arrive", roadTrip, "Open Texas highway"],
        ["Texas Industries", "/texas-industries", "Texas energy, technology, industry and agriculture", texasIndustriesNavImage, "Permian Basin oil pumpjack illustration"],
        ["Texas vs Every State", "/texas-vs-every-state", "Compare Texas with the other 49 states", bigBend, "Big Bend mountain landscape"],
        ["Texas Resources", "/texas-resources", "Texas DMV and public services", texasSpecialDistricts, "Texas public infrastructure"],
        ["Home & Garden", "/home-garden", "Texas home and garden projects", texasHomeMaintenance, "Texas home exterior"],
        ["History", "/texas-history", "People and events in Texas history", smallTown, "Historic Texas courthouse"],
        ["Sports", "/sports", "Texas teams and sports", highSchoolFootball, "Texas high-school football game"],
      ]),
    },
    { label: "Events", to: "/events" },
    { label: "Group Events", to: "/corporate-events", description: "Corporate events and team-building ideas" },
    { label: "Guides", to: "/guides" },
    { label: "Shop", to: "/shop" },
    { label: "About", to: "/about" },
  ],
  footer: [
    {
      title: "Explore Texas",
      items: compactTextLinks([
        ["Trip Planner", "/explore/trip-planner"],
        ["Lakes & Rivers", "/explore/lakes-rivers"],
        ["Fishing", "/fishing"],
        ["Hunting", "/hunting"],
        ["Texas Music", "/texas-music"],
        ["State Parks", "/explore/state-parks"],
        ["Best Camping in Texas", "/best-places-to-go-camping-in-texas"],
        ["National Parks", "/explore/national-parks"],
        ["Painted Churches", "/explore/painted-churches"],
        ["Road Trips", "/explore/road-trips"],
        ["Small Towns", "/explore/small-towns"],
        ["Food & Barbecue", "/explore/food-bbq"],
        ["Outdoors & Wildlife", "/explore/outdoors"],
      ]),
    },
    {
      title: "Texas Life",
      items: compactTextLinks([
        ["Things That Define Texas", "/things-unique-to-texas"],
        ["Texas Dogs Defined", "/dogs"],
        ["Homes & Land", "/real-estate"],
        ["Property", "/property"],
        ["Moving Here", "/moving-to-texas"],
        ["Texas Industries", "/texas-industries"],
        ["Texas vs Every State", "/texas-vs-every-state"],
        ["Texas Resources", "/texas-resources"],
        ["Home & Garden", "/home-garden"],
        ["History", "/texas-history"],
        ["Sports", "/sports"],
        ["Texas Life Guide", "/texas-living"],
      ]),
    },
    {
      title: "Read & Use",
      items: [
        { label: "Start Here", to: "/texas-resources" },
        { label: "Texas Explained", to: "/texas-explained" },
        ...compactTextLinks([
        ["Events", "/events"],
        ["Corporate Events", "/corporate-events"],
        ["Guides", "/guides"],
        ["Money & Property", "/decide/financial-tools"],
        ["Texas by the Numbers", "/texas-data"],
        ["Shop", "/shop"],
        ["About", "/about"],
        ]),
      ],
    },
  ],
  legal: compactTextLinks([
    ["Privacy & Site Terms", "/about#privacy-terms"],
    ["Returns & Refunds", "/return-refund-policy"],
    ["Network Membership Terms", "/network/terms"],
    ["Search", "/search"],
  ]),
};