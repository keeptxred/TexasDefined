/**
 * Public, already-routed specialist guides. Do not add unverified draft article
 * slugs or redirected pages; this registry is deliberately linkable today.
 * New guide routes should enter the authority audit AND the guidebook.
 */
export const existingSpecialistGuides = [
  { to: "/texas-paddling-guide", label: "Texas Paddling Trails", topic: "Outdoors", body: "Official paddling routes, launch points, segment lengths, river conditions and access." },
  { to: "/texas-stargazing-guide", label: "Texas Stargazing", topic: "Outdoors", body: "Dark-sky sites, protected areas, seasons, night-sky etiquette and visitor access." },
  { to: "/texas-birds-guide", label: "Texas Birding and Migration", topic: "Nature", body: "Species, habitats, migration timing and locations with state and federal references." },
  { to: "/texas-snakes-guide", label: "Texas Snake Identification", topic: "Nature", body: "Snake identification, venomous species and safer wildlife encounters." },
  { to: "/texas-horseback-riding-guide", label: "Texas Horseback Riding", topic: "Outdoors", body: "Public riding areas, permitted trails, trip planning, conservation and safety." },
  { to: "/texas-mountain-biking-guide", label: "Texas Mountain Biking", topic: "Outdoors", body: "Ride locations, trail types, land managers and changing conditions." },
  { to: "/texas-rock-climbing-bouldering-guide", label: "Texas Climbing and Bouldering", topic: "Outdoors", body: "Legal access, conservation, permitted routes and weather considerations." },
  { to: "/texas-ohv-guide", label: "Texas OHV Riding", topic: "Outdoors", body: "Vehicle classes, land-manager rules, legal riding areas and permits." },
  { to: "/texas-ranch-water-guide", label: "Texas Ranch Water", topic: "Texas Culture", body: "A focused reference on the popular Texas drink and its cultural context." },
  { to: "/texas-breakfast-taco-guide", label: "Texas Breakfast Tacos", topic: "Texas Culture", body: "Local history, regional styles and the defining Texas breakfast tradition." },
  { to: "/texas-chicken-fried-steak-guide", label: "Texas Chicken-Fried Steak", topic: "Texas Culture", body: "How the dish developed and the regional food traditions around it." },
  { to: "/texas-tailgating-guide", label: "Texas Tailgating", topic: "Texas Culture", body: "Game-day customs, practical planning and Texas sporting communities." },
  { to: "/texas-blue-norther-weather-guide", label: "Texas Blue Norther Weather", topic: "Texas Life", body: "Cold-front patterns, forecast context and travel/home readiness." },
  { to: "/texas-pests-guide", label: "Texas Home Pest Guide", topic: "Home & Garden", body: "Identification, seasonality and safer home management using verified sources." },
  { to: "/texas-pool-guide", label: "Texas Pool Ownership", topic: "Home & Garden", body: "Pool maintenance, weather, water and equipment questions for Texas owners." },
  { to: "/property-tax-guides", label: "Texas Property Tax Guide", topic: "Property Taxes", body: "Current exemption, appraisal, protest and payment reference hub." },
  { to: "/do/property-tax-protest", label: "Texas Property Tax Protest", topic: "Property Taxes", body: "Protest process, documentation, official schedules and local variation." },
  { to: "/learn/over-65-property-tax-guide", label: "Over-65 Texas Property Tax", topic: "Property Taxes", body: "Eligibility, deadlines and relief for older homeowners." },
  { to: "/guides/citypass-texas", label: "Texas CityPASS", topic: "Visitor Planning", body: "A comparison of Dallas, Houston and San Antonio attraction ticket bundles." },
] as const;
