export type EditorialOutreachStatus = "existing-relationship" | "ready" | "contact-research";
export type EditorialOutreachPriority = 1 | 2 | 3;

export interface EditorialOutreachTarget {
  id: string;
  organization: string;
  organizationType: string;
  pagePath: string;
  officialUrl: string;
  contactUrl: string;
  contactEmail?: string;
  contactLabel: string;
  priority: EditorialOutreachPriority;
  status: EditorialOutreachStatus;
  score: number;
  pageStrength: string;
  relationshipOpportunity: string;
  asks: string[];
  photoOpportunity: string;
  updateOpportunity: string;
  referenceAsk: string;
  verifiedAt: string;
}

export const EDITORIAL_OUTREACH_POLICY = {
  purpose: "Improve factual accuracy, official-source access, approved imagery and recurring update relationships before any optional reference request.",
  noPaidLinks: true,
  noReciprocalLinkScheme: true,
  noGuaranteedCoverage: true,
  referenceLanguage: "If the TexasDefined resource is useful to your visitors, staff or media partners, you may reference it where appropriate; no link is required.",
  automaticIntake: "A newly published destination can enter contact research when it is index-ready, has a current official URL and identifies a managing authority.",
} as const;

export const VERIFIED_EDITORIAL_OUTREACH_TARGETS: EditorialOutreachTarget[] = [
  {
    id:"state-fair-of-texas", organization:"State Fair of Texas", organizationType:"nonprofit event organization",
    pagePath:"/texas-state-fair", officialUrl:"https://bigtex.com/", contactUrl:"https://bigtex.com/about-us/media-room/", contactEmail:"pr@bigtex.com", contactLabel:"Public Relations / Media Room",
    priority:1, status:"existing-relationship", score:98,
    pageStrength:"Flagship current-year planning page with tickets, transit, parking, food, gallery and ongoing Fair coverage.",
    relationshipOpportunity:"Maintain a year-round editorial relationship for annual dates, presales, press releases, approved photography and major planning changes.",
    asks:["Add TexasDefined to the Fair press-release distribution list.","Share official presale and planning updates before the 2027 Fair cycle.","Provide or confirm approved editorial photography and credit requirements.","Flag material corrections or visitor-planning changes."],
    photoOpportunity:"Very high — the Fair maintains an official photo gallery and media credential workflow.",
    updateOpportunity:"Very high — annual dates, ticketing, food, events, football and operating details recur every year.",
    referenceAsk:"Only after the resource is useful: mention that TexasDefined maintains an independent visitor-planning guide and invite an optional reference from relevant media/resource pages.",
    verifiedAt:"2026-09-29",
  },
  {
    id:"visit-fredericksburg", organization:"Fredericksburg Convention & Visitor Bureau", organizationType:"destination marketing organization",
    pagePath:"/destination/fredericksburg-historic-district", officialUrl:"https://www.visitfredericksburgtx.com/", contactUrl:"https://www.visitfredericksburgtx.com/media/", contactLabel:"Media Assistance / Public Relations",
    priority:1, status:"ready", score:94,
    pageStrength:"Strong Fredericksburg destination network spanning historic district, wineries, road trips, history weekends and Gillespie County.",
    relationshipOpportunity:"Use the CVB as a recurring fact-check, event, image and local-expert source across the Fredericksburg cluster.",
    asks:["Review high-level visitor facts and flag changes.","Provide access to current press releases, approved images and b-roll.","Notify TexasDefined of major destination openings, closures and recurring events.","Offer local-source leads for future Fredericksburg coverage."],
    photoOpportunity:"Very high — Visit Fredericksburg explicitly offers image, b-roll and digital press-kit resources.",
    updateOpportunity:"Very high — events, wineries, lodging, visitor research and destination changes are continuous.",
    referenceAsk:"If a TexasDefined Fredericksburg guide is useful to visitors, invite the CVB to reference it in a media/resource context; do not make the link the main ask.",
    verifiedAt:"2026-09-29",
  },
  {
    id:"space-center-houston", organization:"Space Center Houston", organizationType:"nonprofit museum / visitor center",
    pagePath:"/destination/space-center-houston", officialUrl:"https://spacecenter.org/", contactUrl:"https://spacecenter.org/news-center/media-inquiries/", contactEmail:"communications@spacecenter.org", contactLabel:"Communications Department",
    priority:1, status:"ready", score:94,
    pageStrength:"Top-25 Texas attraction guide with Houston internal links, CityPASS integration and authority-source depth.",
    relationshipOpportunity:"Establish a direct communications channel for exhibits, tram-access changes, NASA visitor operations and approved editorial media.",
    asks:["Verify visitor-planning details and terminology.","Add TexasDefined to media/news release distribution.","Provide approved high-resolution images or point to reusable media assets.","Notify TexasDefined of major exhibits, access changes and time-sensitive NASA visitor updates."],
    photoOpportunity:"Very high — the newsroom provides editorial photo/video assets and media request workflows.",
    updateOpportunity:"High — exhibits, tours, operating access and programming change throughout the year.",
    referenceAsk:"If the independent guide becomes useful as a trip-planning resource, invite an optional reference from a media or visitor-resource page.",
    verifiedAt:"2026-09-29",
  },
  {
    id:"fort-worth-stockyards", organization:"Fort Worth Stockyards / Stockyards Heritage Development Co.", organizationType:"historic visitor district",
    pagePath:"/destination/fort-worth-stockyards", officialUrl:"https://fortworthstockyards.com/", contactUrl:"https://fortworthstockyards.com/contact-us/", contactEmail:"dnewell@stockyardsheritage.com", contactLabel:"Media & Filming Inquiries",
    priority:1, status:"ready", score:92,
    pageStrength:"Top-25 attraction guide plus a dedicated cattle-culture history article and North Texas road-trip links.",
    relationshipOpportunity:"Build a reliable update/photo channel for cattle drives, events, historic interpretation and visitor logistics.",
    asks:["Verify current cattle-drive and visitor-planning details.","Provide approved media imagery or filming/photo guidance.","Share major event, preservation and interpretation updates.","Identify the best historical or visitor-services contact for future fact checks."],
    photoOpportunity:"High — a dedicated media/filming contact is published.",
    updateOpportunity:"High — recurring cattle drives, events, rodeo/music programming and district changes.",
    referenceAsk:"Optionally reference the TexasDefined history or visitor guide if it is useful to visitors; accuracy and updates come first.",
    verifiedAt:"2026-09-29",
  },
  {
    id:"painted-churches-schulenburg", organization:"Schulenburg Chamber of Commerce", organizationType:"chamber / tour operator",
    pagePath:"/explore/painted-churches", officialUrl:"https://schulenburgchamber.org/", contactUrl:"https://schulenburgchamber.org/painted-churches/", contactLabel:"Painted Churches Tour Office",
    priority:1, status:"ready", score:91,
    pageStrength:"Deep statewide Painted Churches authority hub with church profiles, routes, preservation, sources, media and methodology.",
    relationshipOpportunity:"Create an ongoing access-and-corrections relationship with the organization coordinating guided Painted Churches visits.",
    asks:["Verify current tour/access procedures and church-visit etiquette.","Notify TexasDefined when hours, closures or tour policies change.","Discuss approved editorial photography or photography-tour access.","Identify parish or preservation contacts for church-specific corrections."],
    photoOpportunity:"High — the Chamber discusses customized photography tours and church access.",
    updateOpportunity:"High — active churches, tour fees, closures, services and visitor access can change.",
    referenceAsk:"Invite an optional reference to TexasDefined's independent statewide research hub only if staff find it useful for trip preparation or research.",
    verifiedAt:"2026-09-29",
  },
  {
    id:"waco-mammoth", organization:"Waco Mammoth National Monument / National Park Service", organizationType:"federal historic/science site",
    pagePath:"/destination/waco-mammoth-national-monument", officialUrl:"https://www.nps.gov/waco/", contactUrl:"https://www.nps.gov/waco/contacts.htm", contactLabel:"National Park Service Contact",
    priority:2, status:"ready", score:88,
    pageStrength:"Source-backed destination guide with current NPS authority and Waco-area internal links.",
    relationshipOpportunity:"Use NPS staff as the correction/update source for dig-shelter access, interpretation, fees and scientific programming.",
    asks:["Verify visitor-access and interpretation details.","Point TexasDefined to approved NPS public-domain or media imagery.","Notify TexasDefined of major program, fee or access changes.","Identify the appropriate public-affairs or interpretation contact for future questions."],
    photoOpportunity:"High — NPS imagery can often be rights-cleared, with item-specific credit checks.",
    updateOpportunity:"Medium-high — fees, hours, tours and programs change; the paleontology story is durable.",
    referenceAsk:"Optional only: if the guide is useful to visitors, invite NPS staff to reference it from an appropriate third-party/resource context where permitted.",
    verifiedAt:"2026-09-29",
  },
  {
    id:"national-museum-pacific-war", organization:"National Museum of the Pacific War", organizationType:"museum / Texas Historical Commission property",
    pagePath:"/destination/national-museum-of-the-pacific-war", officialUrl:"https://www.pacificwarmuseum.org/", contactUrl:"https://www.pacificwarmuseum.org/news-and-media", contactLabel:"Marketing / News & Media",
    priority:2, status:"ready", score:88,
    pageStrength:"Detailed Fredericksburg museum guide inside a broader history and Hill Country authority cluster.",
    relationshipOpportunity:"Establish a museum-marketing relationship for exhibit updates, expert interviews, approved media and Fredericksburg history coverage.",
    asks:["Review visitor-facing facts and major historical framing.","Share exhibit/event announcements and media materials.","Clarify photo/film permissions for editorial coverage.","Offer curator or subject-matter contacts for deeper future articles."],
    photoOpportunity:"High — the museum has formal media/photo permission procedures.",
    updateOpportunity:"High — exhibitions, events, demonstrations and programming change regularly.",
    referenceAsk:"If an independent TexasDefined guide is useful to prospective visitors, invite an optional resource reference after the accuracy relationship is established.",
    verifiedAt:"2026-09-29",
  },
  {
    id:"san-antonio-missions", organization:"San Antonio Missions National Historical Park", organizationType:"National Park Service unit",
    pagePath:"/destination/san-antonio-missions-national-historical-park", officialUrl:"https://www.nps.gov/saan/", contactUrl:"https://www.nps.gov/saan/contacts.htm", contactLabel:"NPS Contact / Public Affairs",
    priority:2, status:"ready", score:87,
    pageStrength:"Top-25 Texas attraction guide tied to San Antonio history, UNESCO context and metro trip planning.",
    relationshipOpportunity:"Build a public-affairs/update relationship covering programs, preservation, access, World Heritage interpretation and official imagery.",
    asks:["Verify visitor-planning and World Heritage framing.","Point TexasDefined to appropriate NPS media/public-domain imagery.","Share significant preservation, program and access updates.","Identify public-affairs contacts for time-sensitive stories."],
    photoOpportunity:"High — NPS maintains photography guidance and extensive official imagery.",
    updateOpportunity:"High — ranger programs, preservation work, access and public programming evolve.",
    referenceAsk:"Treat any reference as optional and secondary; the primary value is accurate, current visitor information.",
    verifiedAt:"2026-09-29",
  },
  {
    id:"texas-state-capitol", organization:"Texas State Preservation Board", organizationType:"state agency",
    pagePath:"/destination/texas-state-capitol", officialUrl:"https://tspb.texas.gov/", contactUrl:"https://tspb.texas.gov/plan/hours/hours.html", contactEmail:"Contact.SPB@tspb.texas.gov", contactLabel:"State Preservation Board General Inquiries",
    priority:2, status:"ready", score:86,
    pageStrength:"Top-25 attraction guide with historical authority content and Austin trip-planning links.",
    relationshipOpportunity:"Create an official correction/update path for Capitol tours, visitor access, preservation projects and public-use changes.",
    asks:["Verify visitor-services and tour details.","Point TexasDefined to approved Capitol/State Preservation Board imagery.","Notify TexasDefined of major restoration, access or tour-policy changes.","Identify the best visitor-services or communications contact for future fact checks."],
    photoOpportunity:"Medium-high — official state imagery may be available subject to agency guidance.",
    updateOpportunity:"Medium-high — tours, facilities and preservation work change, while core history is durable.",
    referenceAsk:"Do not lead with a link request; only invite an optional resource reference if staff consider the independent guide useful.",
    verifiedAt:"2026-09-29",
  },
  {
    id:"texas-state-aquarium", organization:"Texas State Aquarium", organizationType:"nonprofit aquarium / conservation organization",
    pagePath:"/destination/texas-state-aquarium", officialUrl:"https://www.texasstateaquarium.org/", contactUrl:"https://www.texasstateaquarium.org/press-room/", contactLabel:"Marketing & Communications / Press Room",
    priority:2, status:"ready", score:86,
    pageStrength:"Curated Corpus Christi destination guide connected to North Beach, USS Lexington and Gulf Coast travel content.",
    relationshipOpportunity:"Use the communications team for conservation stories, wildlife rescue updates, exhibits and rights-cleared editorial assets.",
    asks:["Verify major visitor facts and conservation framing.","Add TexasDefined to relevant press-release distribution.","Share approved press photos/video where appropriate.","Notify TexasDefined of major exhibits, wildlife-rescue stories and visitor changes."],
    photoOpportunity:"Very high — the press room explicitly provides press packets, photos and video resources.",
    updateOpportunity:"High — wildlife rescue, exhibits, programs and visitor operations generate recurring updates.",
    referenceAsk:"If TexasDefined's independent guide is useful to visitors or media, invite an optional resource reference after the editorial relationship is established.",
    verifiedAt:"2026-09-29",
  },
];

export const EDITORIAL_OUTREACH_TARGET_IDS = VERIFIED_EDITORIAL_OUTREACH_TARGETS.map((target) => target.id);
