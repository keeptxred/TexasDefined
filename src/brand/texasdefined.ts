import caddoLake from "@/assets/caddo-lake.jpg";
import paloDuro from "@/assets/palo-duro.jpg";
import roadTrip from "@/assets/road-trip.jpg";
import smallTown from "@/assets/small-town.jpg";
import bbqBrisket from "@/assets/bbq-brisket.jpg";
import wildlife from "@/assets/wildlife.jpg";

import type { BrandConfig } from "./types";

/**
 * The single source of concrete TexasDefined identity, navigation, copy and SEO values.
 */
export const texasDefinedBrand: BrandConfig = {
  identity: {
    id: "texasdefined",
    name: "TexasDefined",
    wordmark: "Texas Defined",
    monogram: "TD",
    tagline: "What defines Texas?",
    domain: "texasdefined.com",
    locale: "en-US",
    social: [
      { label: "Instagram", href: "https://instagram.com/texasdefined" },
      { label: "YouTube", href: "https://youtube.com/@texasdefined" },
      { label: "Pinterest", href: "https://pinterest.com/texasdefined" },
    ],
  },
  seo: {
    titleTemplate: "%s | TexasDefined",
    defaultTitle: "TexasDefined — Explore the Places, Stories & Life of Texas",
    defaultDescription:
      "A friendly guide to the places, food, traditions, homes and everyday experiences that make Texas feel like Texas.",
    twitterSite: "@texasdefined",
    organizationType: "Organization",
  },
  copy: {
    newsletterEyebrow: "The Texas Defined Letter",
    newsletterHeading: "A little more Texas in your inbox",
    newsletterBody:
      "Once a week, we’ll send a place worth the drive, a plate worth the wait and a few good reasons to love where you live.",
    newsletterCta: "Join the list",
    newsletterPlaceholder: "Your email address",
    newsletterSuccess: "You’re on the list. We’ll see you Thursday.",
    readMore: "Read the story",
    viewAll: "See more",
    searchPlaceholder: "Search places, stories and guides",
    searchEmpty: "We couldn’t find a match. Try a town, park, dish or topic.",
    emptyState: "There’s nothing here just yet.",
    comingSoon: "Coming soon",
    comingSoonBody:
      "We’re still putting the finishing touches on this page. More useful Texas information is on the way.",
    shopCta: "Shop the collection",
    shopTheStoryHeading: "Inspired by this story",
    relatedHeading: "More to explore",
    footerNote: "Independent, reader-supported and proudly focused on Texas.",
    skipToContent: "Skip to main content",
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
      label: "Explore Texas",
      to: "/explore",
      description: "Parks, lakes, road trips, small towns and more",
      children: [
        {
          label: "Lakes & Rivers",
          to: "/explore/lakes-rivers",
          description: "Swimming holes, quiet rivers and cypress-lined water",
          image: { src: caddoLake, alt: "Cypress trees on Caddo Lake at dawn" },
        },
        {
          label: "State Parks",
          to: "/explore/state-parks",
          description: "Canyons, coastlines, trails and campsites",
          image: { src: paloDuro, alt: "Red rock walls of Palo Duro Canyon" },
        },
        {
          label: "Road Trips",
          to: "/explore/road-trips",
          description: "Scenic drives and stops worth pulling over for",
          image: { src: roadTrip, alt: "A two-lane Texas farm road at sunset" },
        },
        {
          label: "Small Towns",
          to: "/explore/small-towns",
          description: "Courthouse squares, dance halls and local favorites",
          image: { src: smallTown, alt: "A historic Texas courthouse square" },
        },
        {
          label: "Food & Barbecue",
          to: "/explore/food-bbq",
          description: "Barbecue joints, beloved dishes and places worth the wait",
          image: { src: bbqBrisket, alt: "Sliced smoked brisket on butcher paper" },
        },
        {
          label: "Outdoors & Wildlife",
          to: "/explore/outdoors",
          description: "Wild places, native wildlife and big Texas skies",
          image: { src: wildlife, alt: "White-tailed deer in Texas brush country" },
        },
      ],
    },
    { label: "Sports", to: "/sports" },
    { label: "Things to Do", to: "/events" },
    { label: "Texas History", to: "/texas-history" },
    { label: "Moving to Texas", to: "/moving-to-texas" },
    { label: "Home & Garden", to: "/home-garden" },
    { label: "Real Estate", to: "/real-estate" },
    { label: "Helpful Guides", to: "/guides" },
    { label: "Shop Texas", to: "/shop" },
    { label: "About Us", to: "/about" },
  ],
  footer: [
    {
      title: "Explore Texas",
      items: [
        { label: "Lakes & Rivers", to: "/explore/lakes-rivers" },
        { label: "State Parks", to: "/explore/state-parks" },
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
        { label: "Real Estate", to: "/real-estate" },
        { label: "Helpful Guides", to: "/guides" },
      ],
    },
    {
      title: "More from Texas Defined",
      items: [
        { label: "Sports", to: "/sports" },
        { label: "Things to Do", to: "/events" },
        { label: "Texas History", to: "/texas-history" },
        { label: "Shop Texas", to: "/shop" },
        { label: "About Us", to: "/about" },
      ],
    },
  ],
  legal: [{ label: "Search", to: "/search" }],
};
