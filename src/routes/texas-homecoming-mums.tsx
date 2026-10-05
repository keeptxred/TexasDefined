import { createFileRoute } from "@tanstack/react-router";

const canonicalPath = "/texas-homecoming-mums";
const canonicalUrl = "https://texasdefined.com/texas-homecoming-mums";
const title = "Texas Homecoming Mums: History, Meaning, Colors & Traditions | Texas Defined";
const description = "Texas homecoming mums explained: history, colors, senior traditions, garters, costs, DIY construction, preservation, etiquette and modern school customs.";
const image = "https://commons.wikimedia.org/wiki/Special:Redirect/file/Goldthwaite_High_School_Homecoming_Mum.jpg?width=1400";

// This authority page pins its own metadata so the shared technical SEO override cannot replace topic-specific search copy.
export const Route = createFileRoute(canonicalPath)({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { name: "robots", content: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" },
      { name: "googlebot", content: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "article" },
      { property: "og:site_name", content: "Texas Defined" },
      { property: "og:locale", content: "en_US" },
      { property: "og:url", content: canonicalUrl },
      { property: "og:image", content: image },
      { property: "og:image:secure_url", content: image },
      { property: "og:image:alt", content: "Goldthwaite High School homecoming mum with ribbons, charms and school colors" },
      { property: "og:image:type", content: "image/jpeg" },
      { property: "article:modified_time", content: "2026-10-05" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
      { name: "twitter:image", content: image },
      { name: "twitter:image:alt", content: "Goldthwaite High School homecoming mum with ribbons, charms and school colors" },
      { name: "twitter:site", content: "@texasdefined" },
    ],
    links: [{ rel: "canonical", href: canonicalUrl }],
  }),
});
