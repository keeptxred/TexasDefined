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
    titleTemplate: "%s | Texas Defined",
    defaultTitle: "Texas Defined — The Places, Stories and Life of Texas",
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
    viewAll: "Keep exploring",
    searchPlaceholder: "Try a town, park, lake or dish",
    searchEmpty: "We couldn’t find a match. Try a town, park, lake or favorite Texas food.",
    emptyState: "Nothing here just yet. We’re still finding the stories and places worth sharing.",
    comingSoon: "On the way",
    comingSoonBody:
      "We’re still gathering the details that make this useful. Check back for the full story.",
    shopCta: "See what caught our eye",
    shopTheStoryHeading: "Things we’d actually buy",
    relatedHeading: "Keep exploring",
    footerNote: "Independent, reader-supported and proudly focused on Texas.",
    skipToContent: "Skip to the story",
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
      description: "Parks, lakes, road trips, small towns and more",
      children: [
        {
          label: "Lakes & Rivers",
          to: "/explore/lakes-rivers",
          description: "Swimming holes, quiet rivers and cypress-lined water",
          image: { src: caddoLake, alt: "Cypress trees on Caddo Lake at dawn" },
        },
        {
          label: "Springs & Swimming",
          to: "/explore/major-springs",
          description: "Clear springs, spring-fed pools and swimming water",
          image: { src: blueHole, alt: "Clear spring-fed water in the Texas Hill Country" },
        },
        {
          label: "State Parks",
          to: "/explore/state-parks",
          description: "Canyons, coastlines, trails and campsites",
          image: { src: paloDuro, alt: "Red rock walls of Palo Duro Canyon" },
        },
        {
          label: "National Parks",
          to: "/explore/national-parks",
          description: "Big Bend, Guadalupe Mountains and federal lands",
          image: { src: bigBend, alt: "Desert mountains in Big Bend country" },
        },
        {
          label: "Caverns & Caves",
          to: "/explore/caverns",
          description: "Show caves and limestone rooms below ground",
          image: { src: paloDuro, alt: "Layered Texas limestone landscape" },
        },
        {
          label: "Beaches & Coast",
          to: "/explore/beaches-coast",
          description: "Barrier islands, bays and Gulf Coast towns",
          image: { src: caddoLake, alt: "Texas water landscape at sunrise" },
        },
        {
          label: "Historic Sites",
          to: "/explore/historic-sites",
          description: "Missions, museums, monuments and battlefields",
          image: { src: smallTown, alt: "Historic Texas courthouse square" },
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
    { label: "This Weekend", to: "/events" },
    { label: "History", to: "/texas-history" },
    { label: "Moving Here", to: "/moving-to-texas" },
    { label: "Home & Garden", to: "/home-garden" },
    { label: "Living Here", to: "/texas-living" },
    { label: "Guides", to: "/guides" },
    { label: "Shop", to: "/shop" },
    { label: "About", to: "/about" },
  ],
  footer: [
    {
      title: "Start Here",
      items: [
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
      title: "Living Here",
      items: [
        { label: "Moving Here", to: "/moving-to-texas" },
        { label: "Home & Garden", to: "/home-garden" },
        { label: "Living Here", to: "/texas-living" },
        { label: "Guides", to: "/guides" },
      ],
    },
    {
      title: "The Magazine",
      items: [
        { label: "Sports", to: "/sports" },
        { label: "This Weekend", to: "/events" },
        { label: "History", to: "/texas-history" },
        { label: "Shop", to: "/shop" },
        { label: "About", to: "/about" },
      ],
    },
  ],
  legal: [{ label: "Search", to: "/search" }],
};
