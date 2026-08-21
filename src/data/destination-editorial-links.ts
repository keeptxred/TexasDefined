export type DestinationEditorialLink = {
  href: string;
  label: string;
  description: string;
};

const DESTINATION_EDITORIAL_LINKS: Record<string, DestinationEditorialLink[]> = {
  "port-isabel-lighthouse-state-park": [
    {
      href: "/article/best-lighthouses-to-visit-in-texas",
      label: "Compare the best Texas lighthouse visits",
      description: "See why Port Isabel ranks first, then compare Bolivar, Halfmoon Reef, Lydia Ann, Matagorda Island and Sabine Pass by access and trip style.",
    },
    {
      href: "/article/port-isabel-lighthouse-guide",
      label: "Read the full Port Isabel Lighthouse history",
      description: "Go deeper on the tower's maritime, military and preservation history before or after your visit.",
    },
    {
      href: "/explore/lighthouses",
      label: "Open the Texas lighthouse map",
      description: "Place Port Isabel in the coastwide network of surviving, relocated and historic lighthouse sites.",
    },
  ],
};

export function destinationEditorialLinks(slug: string): DestinationEditorialLink[] {
  return DESTINATION_EDITORIAL_LINKS[slug] ?? [];
}
