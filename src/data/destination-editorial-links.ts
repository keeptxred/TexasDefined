export type DestinationEditorialLink = {
  href: string;
  label: string;
  description: string;
};

const DESTINATION_EDITORIAL_LINKS: Record<string, DestinationEditorialLink[]> = {
  "port-isabel-lighthouse": [
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
  "enchanted-rock-state-natural-area": [
    {
      href: "/article/texas-bluebonnets-complete-guide",
      label: "Use the Texas bluebonnet season guide",
      description: "Check statewide bloom timing, current-report strategy, viewing etiquette and the regions most worth planning around before a spring visit.",
    },
    {
      href: "/article/best-places-to-see-bluebonnets-in-texas",
      label: "Compare the best bluebonnet regions",
      description: "Put Enchanted Rock and the western Hill Country in context with Ennis, Washington County, the Highland Lakes, Lake Travis and Big Bend.",
    },
    {
      href: "/article/texas-bluebonnet-road-trip",
      label: "Build a spring Hill Country road trip",
      description: "Connect current bloom reports with Fredericksburg, Willow City, the Highland Lakes and other backup-rich spring stops.",
    },
  ],
  "caddo-lake-state-park": [
    {
      href: "/article/fall-in-texas-complete-guide",
      label: "Use the Texas fall-color guide",
      description: "Compare East Texas cypress and hardwood color with Lost Maples, the Frio, the Guadalupe corridor and other statewide fall regions.",
    },
    {
      href: "/article/east-texas-fall-colors",
      label: "Plan an East Texas fall weekend",
      description: "Build a Piney Woods foliage trip around Caddo Lake, Daingerfield, Tyler and Lake Bob Sandlin using current color reports.",
    },
    {
      href: "/article/best-texas-state-parks-for-fall-colors",
      label: "Compare Texas state parks for fall color",
      description: "See which public parks combine reliable tree species, water, trails and autumn scenery for a fall trip.",
    },
    {
      href: "/article/texas-fall-foliage-road-trip",
      label: "Turn Caddo Lake into a fall road trip",
      description: "Compare the East Texas alternative with the Frio, Lost Maples and Guadalupe route, then follow the region with the better current color.",
    },
  ],
  "caddo-lake": [
    {
      href: "/article/fall-in-texas-complete-guide",
      label: "Use the Texas fall-color guide",
      description: "Compare Caddo Lake's bald cypress color with the strongest fall regions across Texas.",
    },
    {
      href: "/article/east-texas-fall-colors",
      label: "Go deeper on East Texas fall color",
      description: "Turn Caddo Lake into a wider Piney Woods foliage trip built around current conditions.",
    },
    {
      href: "/article/best-texas-state-parks-for-fall-colors",
      label: "Compare Texas state parks for fall color",
      description: "See how Caddo Lake stacks up against Lost Maples, Garner, Daingerfield, Guadalupe River and other strong public-land autumn stops.",
    },
  ],
  "guadalupe-river-state-park": [
    {
      href: "/explore/swimming-holes-river-tubing",
      label: "Compare Texas swimming and tubing destinations",
      description: "Put the park's Guadalupe River access alongside other verified swimming holes, tubing gateways and float-friendly public destinations.",
    },
    {
      href: "/article/fall-in-texas-complete-guide",
      label: "Use the Texas fall-color guide",
      description: "Compare the Guadalupe River corridor with Lost Maples, the Frio and East Texas using current foliage reports before a fall trip.",
    },
    {
      href: "/article/hill-country-fall-colors",
      label: "Plan a Hill Country fall-color drive",
      description: "Pair Guadalupe River State Park with the strongest Hill Country foliage corridors and backup stops for variable autumn conditions.",
    },
    {
      href: "/article/best-texas-state-parks-for-fall-colors",
      label: "Compare state parks for fall color",
      description: "See how the Guadalupe's cypress-lined riverbanks compare with other public parks that reliably deliver Texas autumn scenery.",
    },
  ],
  "south-llano-river-state-park": [
    {
      href: "/explore/swimming-holes-river-tubing",
      label: "Compare Texas swimming and tubing destinations",
      description: "Connect South Llano's tuber put-ins, float access and swimming with the statewide water-recreation collection.",
    },
    {
      href: "/texas-paddling-guide",
      label: "Plan a Texas paddling trip",
      description: "Use the statewide paddling guide to compare the South Llano with other spring-fed rivers, lakes and public launch corridors.",
    },
  ],
  "new-braunfels": [
    {
      href: "/explore/swimming-holes-river-tubing",
      label: "Explore Texas swimming holes and river tubing",
      description: "Compare New Braunfels' Comal and Guadalupe tubing access with other verified Texas swim and float destinations.",
    },
    {
      href: "/article/christmas-in-texas-complete-guide",
      label: "Plan New Braunfels in the Texas Christmas guide",
      description: "Compare the city's German-Texan holiday traditions with statewide Christmas towns, lights, train rides and coastal celebrations.",
    },
    {
      href: "/article/best-christmas-towns-in-texas",
      label: "Compare Texas Christmas towns",
      description: "See how New Braunfels and nearby Gruene fit alongside Fredericksburg, Grapevine, Johnson City, Marshall and other strong holiday destinations.",
    },
    {
      href: "/article/texas-christmas-road-trip",
      label: "Build a Hill Country Christmas road trip",
      description: "Use New Braunfels as a southern add-on to the Fredericksburg, Johnson City and Marble Falls holiday loop.",
    },
  ],
  "san-marcos": [
    {
      href: "/explore/swimming-holes-river-tubing",
      label: "Explore Texas swimming holes and river tubing",
      description: "Compare San Marcos River tubing and public access with other verified Texas swim and float destinations.",
    },
    {
      href: "/texas-paddling-guide",
      label: "Plan a Texas paddling trip",
      description: "Compare the spring-fed San Marcos River with other Texas paddling routes and public-water destinations.",
    },
  ],
  "gruene-historic-district": [
    {
      href: "/article/christmas-in-texas-complete-guide",
      label: "Put Gruene in a Texas Christmas trip",
      description: "Connect the historic district's Hill Country setting with the statewide holiday guide and current seasonal planning advice.",
    },
    {
      href: "/article/best-christmas-towns-in-texas",
      label: "Compare the best Texas Christmas towns",
      description: "Use the statewide shortlist to pair Gruene with other places where historic streets and local traditions shape the season.",
    },
  ],
};

export function destinationEditorialLinks(slug: string): DestinationEditorialLink[] {
  return DESTINATION_EDITORIAL_LINKS[slug] ?? [];
}
