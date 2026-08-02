import type { BrandConfig } from "./types";

/**
 * The ONLY file that supplies concrete TexasDefined values.
 * Adding `keeptxred.ts` beside it is the entire brand-onboarding cost.
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
        { label: "Lakes & Rivers", to: "/explore/lakes-rivers" },
        { label: "State Parks", to: "/explore/state-parks" },
        { label: "Road Trips", to: "/explore/road-trips" },
        { label: "Small Towns", to: "/explore/small-towns" },
        { label: "Food & Barbecue", to: "/explore/food-bbq" },
        { label: "Outdoors & Wildlife", to: "/explore/outdoors" },
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
