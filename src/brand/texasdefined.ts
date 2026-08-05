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
    defaultTitle: "TexasDefined — Discover, Explore & Live Texas",
    defaultDescription:
      "A premium Texas lifestyle publication: lakes and state parks, road trips, barbecue, small towns, history, home and garden, and the goods that define Texas living.",
    twitterSite: "@texasdefined",
    organizationType: "Organization",
  },
  copy: {
    newsletterEyebrow: "The Dispatch",
    newsletterHeading: "Texas, in your inbox every Thursday",
    newsletterBody:
      "One considered letter a week: a place worth the drive, a plate worth the wait, and the small things that make this state feel like nowhere else.",
    newsletterCta: "Subscribe",
    newsletterPlaceholder: "you@example.com",
    newsletterSuccess: "You're on the list. Look for the first dispatch Thursday.",
    readMore: "Read the story",
    viewAll: "View all",
    searchPlaceholder: "Search places, stories, guides",
    searchEmpty: "Nothing matched that search — try a place, a town, or a dish.",
    emptyState: "Nothing here yet.",
    comingSoon: "In development",
    comingSoonBody:
      "This tool is being built. The structure is in place; the numbers arrive in a later release.",
    shopCta: "Shop the collection",
    shopTheStoryHeading: "Shop this story",
    relatedHeading: "Keep reading",
    footerNote: "Made in Texas. Independent, reader-supported, and unhurried.",
    skipToContent: "Skip to content",
    menu: "Menu",
    close: "Close",
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
      description: "Lakes, parks, road trips and small towns",
      children: [
        {
          label: "Lakes & Rivers",
          to: "/explore/lakes-rivers",
          description: "Spring-fed swimming holes and cypress bayous",
          image: { src: caddoLake, alt: "Cypress trees on Caddo Lake at dawn" },
        },
        {
          label: "State Parks",
          to: "/explore/state-parks",
          description: "Eighty-nine parks, from canyon rim to coast",
          image: { src: paloDuro, alt: "Red rock walls of Palo Duro Canyon" },
        },
        {
          label: "Road Trips",
          to: "/explore/road-trips",
          description: "Two-lane routes worth the long way around",
          image: { src: roadTrip, alt: "A two-lane Texas farm road at sunset" },
        },
        {
          label: "Small Towns",
          to: "/explore/small-towns",
          description: "Courthouse squares, dance halls and pie",
          image: { src: smallTown, alt: "A historic Texas courthouse square" },
        },
        {
          label: "Food & Barbecue",
          to: "/explore/food-bbq",
          description: "The line, the pit and the plate",
          image: { src: bbqBrisket, alt: "Sliced smoked brisket on butcher paper" },
        },
        {
          label: "Outdoors & Wildlife",
          to: "/explore/outdoors",
          description: "Birding, big skies and brush country",
          image: { src: wildlife, alt: "White-tailed deer in Texas brush country" },
        },
      ],
    },
    { label: "Sports", to: "/sports" },
    { label: "Events", to: "/events" },
    { label: "History", to: "/texas-history" },
    { label: "Moving", to: "/moving-to-texas" },
    { label: "Home & Garden", to: "/home-garden" },
    { label: "Real Estate", to: "/real-estate" },
    { label: "Guides & Tools", to: "/guides" },
    { label: "Shopping", to: "/shop" },
    { label: "About", to: "/about" },
  ],
  footer: [
    {
      title: "Explore",
      items: [
        { label: "Lakes & Rivers", to: "/explore/lakes-rivers" },
        { label: "State Parks", to: "/explore/state-parks" },
        { label: "Road Trips", to: "/explore/road-trips" },
        { label: "Small Towns", to: "/explore/small-towns" },
        { label: "Food & Barbecue", to: "/explore/food-bbq" },
      ],
    },
    {
      title: "Live Here",
      items: [
        { label: "Moving to Texas", to: "/moving-to-texas" },
        { label: "Home & Garden", to: "/home-garden" },
        { label: "Real Estate", to: "/real-estate" },
        { label: "Guides & Tools", to: "/guides" },
      ],
    },
    {
      title: "More",
      items: [
        { label: "Sports", to: "/sports" },
        { label: "Events", to: "/events" },
        { label: "Texas History", to: "/texas-history" },
        { label: "Shop", to: "/shop" },
        { label: "About", to: "/about" },
      ],
    },
  ],
  legal: [{ label: "Search", to: "/search" }],
};
