import { createFileRoute } from "@tanstack/react-router";
import { texasDefinedBrand } from "@/brand/texasdefined";
import { buildMeta, canonicalLink } from "@/lib/seo";

/** Lightweight source and SEO route; lengthy article renders from the lazy route. */
const path = "/destination/davis-hill-state-park";
const url = "https://texasdefined.com" + path;
const sources = [
  {
    label: "TPWD — Future Parks (current development roster)",
    url: "https://tpwd.texas.gov/state-parks/park-information/future-parks",
    why: "Current agency classification: Davis Hill State Natural Area is a future-development holding, not an operating visitor park.",
  },
  {
    label: "TPWD — Commission land-acquisition agenda, March 24, 2022",
    url: "https://tpwd.texas.gov/business/feedback/meetings/2022/0324/agenda/item.phtml?item=10",
    why: "Acquisition date, approximate area, location, James Davis history and the proposed acquisition of about 50 acres.",
  },
  {
    label: "TPWD — Commission meeting transcript, March 24, 2022",
    url: "https://tpwd.texas.gov/business/feedback/meetings/2022/0324/transcripts/commission/",
    why: "Firsthand staff testimony about plant diversity, inholdings, access and conservation.",
  },
  {
    label: "TPWD Magazine — State Parks on the Horizon (2023)",
    url: "https://tpwmagazine.com/parks/texas-state-parks-on-the-horizon/",
    why: "Davis Hill's inaccessible status as published, vegetation, rare plants, a TPWD photograph and the agency's development discussion.",
  },
  {
    label: "TPWD — Wanderlist audio transcript: Future State Parks",
    url: "https://tpwd.texas.gov/newsmedia/utts/wanderlist-future-state-parks/",
    why: "Natural-resources staff explain the salt dome, sandstone uplift, Trinity River habitat and local geography.",
  },
  {
    label: "TPWD — Six State Parks on the Horizon, May 2, 2023",
    url: "https://tpwd.texas.gov/newsmedia/releases/?req=20230502b",
    why: "Agency announcement identifying Davis Hill as one of six future sites.",
  },
  {
    label: "TPWD — August 20, 2025 work-session agenda",
    url: "https://tpwd.texas.gov/business/feedback/meetings/2025/0821/agenda/work_session/index.phtml",
    why: "Later official statewide inventory using the historic 'Davis Hill State Park' designation and Liberty County location.",
  },
] as const;

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": url + "#webpage",
      url,
      name: "Davis Hill State Natural Area: Access, History, Salt Dome & Conservation",
      description: "Independent, primary-source research on the undeveloped Davis Hill property in Liberty County, Texas: access status, 1983 acquisition, Trinity River ecology, salt dome, history and future plans.",
      dateModified: "2026-10-10",
      citation: sources.map((source) => source.url),
      mainEntity: { "@id": url + "#place" },
      breadcrumb: { "@id": url + "#breadcrumbs" },
      author: {
        "@type": "Organization",
        name: "Texas Defined Travel & Outdoors Desk",
        url: "https://texasdefined.com/authors/a-dell",
      },
    },
    {
      "@type": "Place",
      "@id": url + "#place",
      name: "Davis Hill State Natural Area",
      alternateName: "Davis Hill State Park",
      description: "TPWD conservation holding and future state natural area, not an operating visitor destination.",
      address: { "@type": "PostalAddress", addressLocality: "Liberty County", addressRegion: "TX", addressCountry: "US" },
      containedInPlace: { "@type": "AdministrativeArea", name: "Liberty County, Texas" },
      additionalProperty: {
        "@type": "PropertyValue",
        name: "Visitor access",
        value: "Not open for general public visitation; verify any change with TPWD.",
      },
    },
    {
      "@type": "BreadcrumbList",
      "@id": url + "#breadcrumbs",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://texasdefined.com/" },
        { "@type": "ListItem", position: 2, name: "State Parks", item: "https://texasdefined.com/explore/state-parks" },
        { "@type": "ListItem", position: 3, name: "Davis Hill State Natural Area", item: url },
      ],
    },
  ],
};

export const Route = createFileRoute("/destination/davis-hill-state-park")({
  head: () => ({
    meta: buildMeta(texasDefinedBrand, {
      title: "Davis Hill State Natural Area: Access, History & Geology",
      description: "Davis Hill in Liberty County is not open for general visits. Explore its 1983 history, Trinity River habitats, salt dome and TPWD's future park plans.",
      canonicalPath: path,
      modifiedTime: "2026-10-10",
    }),
    links: [canonicalLink(texasDefinedBrand, path)],
    scripts: [{ type: "application/ld+json", children: JSON.stringify(structuredData) }],
  }),
});

