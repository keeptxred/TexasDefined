export type AgencyGuideContent = {
  summary: string;
  responsibilities: { title: string; text: string }[];
  commonReasons: string[];
  beforeYouStart: string[];
  distinction: string;
  verificationNote: string;
  internalLinks: { href: string; label: string; description: string }[];
};

const guides: Record<string, AgencyGuideContent> = {
  'texas-comptroller': {
    summary: 'The Texas Comptroller of Public Accounts sits at the center of the state’s tax and financial system. For residents and businesses, the office is most visible through sales and franchise tax administration, unclaimed property, state spending data, and the statewide property-tax resources that connect homeowners with appraisal districts and local tax offices. The Comptroller also produces revenue estimates used in the state budget process and publishes large collections of local-government, economic, and tax data. That makes the agency useful for two very different kinds of visitors: people trying to complete a specific tax or property task, and people trying to understand how Texas raises and spends money.',
    responsibilities: [
      { title: 'State taxes and taxpayer accounts', text: 'The Comptroller administers major state taxes and provides filing, payment, registration, account-management, and taxpayer-information resources. Businesses commonly interact with the agency for sales and use tax, franchise tax, and other state tax obligations.' },
      { title: 'Property-tax assistance and local data', text: 'Texas property taxes are local, not collected by the state, but the Comptroller publishes statewide property-tax information, appraisal-district directories, tax-rate data, exemption guidance, and administrative resources that help taxpayers navigate the local system.' },
      { title: 'Unclaimed property', text: 'The agency operates Texas’s unclaimed-property program. Texans can search for property reported to the state and follow the official claim process when money or other property has been turned over after an account became dormant.' },
      { title: 'Revenue, transparency, and economic data', text: 'The Comptroller publishes revenue estimates, state spending information, economic indicators, local sales-tax allocations, and other datasets used by residents, businesses, journalists, researchers, and local governments.' },
    ],
    commonReasons: [
      'Register for or manage a Texas sales-tax permit or taxpayer account.',
      'Look up statewide property-tax resources, local appraisal-district information, or tax-rate data.',
      'Search Texas unclaimed property and begin an official claim.',
      'Research state revenue, spending, local sales-tax allocations, or economic trends.',
      'Find official forms, deadlines, publications, and taxpayer assistance.'
    ],
    beforeYouStart: [
      'Know whether your question concerns a state tax or a local property tax. Property values, exemptions, protests, and most property-tax bills are handled locally even though the Comptroller publishes statewide guidance.',
      'For a business-tax task, have the legal business name, taxpayer or permit number if one already exists, and the filing period you are working with.',
      'For property-tax research, start with the county and the name of the appraisal district or taxing unit. The local office usually controls the parcel-level record.'
    ],
    distinction: 'The most common point of confusion is the division between the Comptroller and local property-tax offices. The Comptroller does not appraise your home and does not set your city, county, school-district, or special-district tax rate. County appraisal districts determine taxable values and administer exemptions; local taxing units adopt rates; tax assessor-collectors generally send and collect bills. The Comptroller provides statewide oversight, standards, directories, studies, and data that tie those local systems together.',
    verificationNote: 'For a filing, payment, permit, claim, deadline, or legal requirement, use the official Comptroller website linked on this page. Texas Defined is an independent reference that organizes the agency’s role and connects it with related Texas guides; it is not a state agency and does not accept tax filings or payments.',
    internalLinks: [
      { href: '/texas-comptroller', label: 'Texas Comptroller practical guide', description: 'A task-oriented overview of Comptroller services, taxes, revenue, and property-tax resources.' },
      { href: '/texas-sales-tax-explained', label: 'How Texas sales tax works', description: 'Understand state and local sales-tax structure before using the official filing resources.' },
      { href: '/property-tax-guides', label: 'Texas property-tax guide library', description: 'Move from statewide guidance to exemptions, protests, deadlines, payments, and county resources.' },
      { href: '/texas-property-tax-estimator', label: 'Texas property-tax estimator', description: 'Estimate a bill with local-rate data before checking the authoritative parcel record.' },
    ],
  },
  'texas-secretary-of-state': {
    summary: 'The Texas Secretary of State is one of the state’s central filing and records offices. It administers statewide election functions, receives business-entity and commercial filings, publishes the Texas Register, commissions notaries, and handles a range of authentication and public-record services. The office is especially important because several unrelated tasks share the same agency: a business owner forming an entity, a voter looking for official election information, an attorney checking a filing, and someone seeking an apostille may all begin at the Secretary of State website.',
    responsibilities: [
      { title: 'Business and entity filings', text: 'The office receives formation, registration, amendment, merger, assumed-name, and other filings for entities that fall under Texas business-organization law. It also maintains public business-entity records and related filing systems.' },
      { title: 'Elections administration', text: 'The Secretary of State serves as the state’s chief election office, publishing official voter and election resources and supporting county election officials in administering Texas elections.' },
      { title: 'Texas Register and state rules', text: 'The office publishes the Texas Register, which provides public notice of proposed and adopted state-agency rules, executive actions, and other official notices.' },
      { title: 'Notary and authentication services', text: 'The Secretary of State commissions Texas notaries and provides authentication services, including apostilles and certifications used for documents that must be recognized in another jurisdiction.' },
    ],
    commonReasons: [
      'Form, register, amend, or research a Texas business entity.',
      'Find official statewide election and voter information.',
      'Research proposed or adopted state rules in the Texas Register.',
      'Apply for or verify a Texas notary commission.',
      'Request an apostille, authentication, or certified state filing.'
    ],
    beforeYouStart: [
      'Identify the exact filing type before paying a fee. Business formation, assumed names, UCC records, trademarks, and local permits can involve different filing systems or offices.',
      'For election questions, distinguish statewide information from county-administered tasks such as many polling-place and local ballot details.',
      'For document authentication, confirm the destination country or jurisdiction and whether the underlying document must first be certified by another official.'
    ],
    distinction: 'The Secretary of State is a filing and administrative office, not a general licensing department for every Texas business. Forming an entity with the state does not automatically create tax accounts, professional licenses, city permits, employer registrations, or federal identification numbers. Those may involve the Comptroller, a professional licensing agency, local government, the Texas Workforce Commission, or the federal government.',
    verificationNote: 'Use the official Secretary of State website for current filing forms, fees, election notices, authentication rules, and deadlines. Texas Defined summarizes the office’s role and points readers toward the correct system; it does not file entities, register voters, commission notaries, or issue apostilles.',
    internalLinks: [
      { href: '/texas-secretary-of-state', label: 'Texas Secretary of State guide', description: 'A practical overview of elections, business filings, records, and official links.' },
      { href: '/texas-resources', label: 'Texas state resources directory', description: 'Find the state agency that owns a task when it does not belong with the Secretary of State.' },
      { href: '/texas-comptroller', label: 'Texas Comptroller guide', description: 'Business formation and state-tax registration are separate steps; use this guide for the tax side.' },
    ],
  },
  'texas-dps': {
    summary: 'The Texas Department of Public Safety is the statewide public-safety agency most residents encounter through driver licenses and identification cards, but its responsibilities are much broader. DPS includes the Driver License Division, Highway Patrol, the Texas Rangers, criminal-history and records functions, regulatory programs, and other statewide law-enforcement services. For everyday users, the key is knowing which task belongs to DPS and which belongs to the Texas Department of Motor Vehicles: DPS handles the driver; TxDMV and county tax offices handle most vehicle-title and registration matters.',
    responsibilities: [
      { title: 'Driver licenses and identification', text: 'DPS operates the Texas driver-license and identification-card system, including applications, renewals, replacements, testing, eligibility questions, and driver-license office services.' },
      { title: 'Statewide law enforcement', text: 'Highway Patrol, the Texas Rangers, and specialized DPS units provide statewide law-enforcement, investigative, and public-safety functions.' },
      { title: 'Criminal-history and records services', text: 'DPS maintains statewide criminal-history systems and provides public or authorized access to records and background-information services under applicable law.' },
      { title: 'Regulatory and safety programs', text: 'The agency administers additional public-safety programs and licenses that do not fit the ordinary driver-license workflow. The official DPS site is the authoritative place to identify the correct division for those tasks.' },
    ],
    commonReasons: [
      'Apply for, renew, replace, or update a Texas driver license or identification card.',
      'Check driver-license eligibility or locate an official driver-license office.',
      'Request eligible criminal-history or public-safety records.',
      'Find official information about Highway Patrol, Texas Rangers, or other DPS programs.',
      'Resolve confusion over whether a task belongs to DPS, TxDMV, or a county tax office.'
    ],
    beforeYouStart: [
      'For a license or ID visit, confirm the current document requirements and whether your transaction can be completed online before traveling to an office.',
      'Do not use a DPS appointment for a vehicle-registration or title problem unless the official instructions specifically direct you there. Those tasks generally belong to TxDMV or the county tax assessor-collector.',
      'For records requests, identify the exact record type and the legal access route; different DPS record systems have different eligibility and identification requirements.'
    ],
    distinction: 'Texas splits driver and vehicle administration between agencies. DPS is responsible for driver licenses and state identification. TxDMV oversees vehicle titles, registration systems, dealers, and motor carriers, while county tax offices perform many front-line title and registration transactions. Keeping those roles separate prevents one of the most common wasted trips in Texas government.',
    verificationNote: 'Driver-license document rules, appointment availability, fees, eligibility, and office procedures can change. Always confirm the current requirements on the official DPS site before relying on an older checklist or third-party article.',
    internalLinks: [
      { href: '/texas-dps', label: 'Texas DPS practical guide', description: 'Start with the main Texas Defined guide to driver-license, ID, and public-safety services.' },
      { href: '/texas-drivers-license', label: 'Texas driver license guide', description: 'A focused checklist for renewals, replacements, appointments, and REAL ID questions.' },
      { href: '/find-my-dmv', label: 'Find the right motor-vehicle office', description: 'Use this when the issue is registration, title, or another vehicle transaction rather than your license.' },
      { href: '/texas-dmv', label: 'Texas DMV guide', description: 'Understand the division between DPS and TxDMV before choosing an office.' },
    ],
  },
  'texas-dmv': {
    summary: 'The Texas Department of Motor Vehicles oversees the state systems that follow the vehicle rather than the driver. TxDMV administers vehicle titles and registration, dealer licensing and enforcement, motor-carrier programs, temporary permits and other motor-vehicle services. Many of the transactions Texans call “DMV” work are actually completed through county tax assessor-collector offices using TxDMV systems, which is why searching for a generic DMV office can send people to the wrong place.',
    responsibilities: [
      { title: 'Vehicle titles and registration', text: 'TxDMV maintains statewide title and registration systems and publishes the rules, forms, and procedures used for ownership changes, registration renewals, specialty plates, and related vehicle records.' },
      { title: 'County transaction network', text: 'County tax assessor-collectors perform many title and registration services for residents. TxDMV supplies the statewide program and systems; the county office often handles the in-person transaction.' },
      { title: 'Dealers and motor carriers', text: 'The agency licenses and regulates motor-vehicle dealers and administers programs for commercial motor carriers, permits, credentials, and other industry-facing requirements.' },
      { title: 'Consumer vehicle programs', text: 'TxDMV publishes consumer guidance for buying, selling, titling, registering, and resolving certain vehicle-related problems. The official site should be used for current forms and transaction rules.' },
    ],
    commonReasons: [
      'Renew or replace a Texas vehicle registration.',
      'Transfer a title after buying, selling, inheriting, or gifting a vehicle.',
      'Find the county office that performs an in-person title or registration transaction.',
      'Research dealer licensing, complaints, or motor-carrier requirements.',
      'Check official forms, fees, specialty plates, permits, and vehicle records.'
    ],
    beforeYouStart: [
      'Determine whether the issue belongs to the vehicle or the driver. Driver licenses and state IDs belong to DPS, not TxDMV.',
      'For a title transaction, gather the ownership document, identification, required signatures, lien information if applicable, and any tax or fee documentation identified by the official instructions.',
      'For county service, verify the correct county tax office and its local appointment or payment procedures before visiting.'
    ],
    distinction: '“Texas DMV” is often used as a catch-all phrase, but there is no single walk-in office network that handles every driver and vehicle task. TxDMV runs the vehicle programs, county tax offices conduct many local vehicle transactions, and DPS handles driver licenses and IDs. Texas Defined keeps separate guides for each so you can start with the right agency.',
    verificationNote: 'Use TxDMV and your county tax office for current forms, fees, title requirements, registration procedures, and office availability. Requirements can depend on the transaction and vehicle, so a general checklist should never replace the official instructions for the specific case.',
    internalLinks: [
      { href: '/texas-dmv', label: 'Texas DMV practical guide', description: 'A task-oriented guide to titles, registration, county offices, and TxDMV services.' },
      { href: '/texas-vehicle-registration', label: 'Texas vehicle registration guide', description: 'Renewals, local offices, and the division between state and county services.' },
      { href: '/find-my-dmv', label: 'Find the correct office', description: 'Use the office finder before making an unnecessary trip.' },
      { href: '/texas-dps', label: 'Texas DPS guide', description: 'Go here instead when the problem is your driver license or state ID.' },
    ],
  },
  'texas-parks-wildlife': {
    summary: 'The Texas Parks and Wildlife Department manages much of the public-facing system for state parks, wildlife, fisheries, hunting, fishing, boating, and conservation. It is the agency Texans use to reserve many state-park visits, buy hunting and fishing licenses, review regulations, identify public recreation opportunities, and find official wildlife-management information. Because seasons, closures, limits, reservations, and local conditions change, TPWD is also one of the agencies where an official-source check immediately before a trip matters most.',
    responsibilities: [
      { title: 'State parks and recreation', text: 'TPWD operates the Texas state-park system and publishes park alerts, reservations, maps, camping information, accessibility details, trail guidance, and visitor rules.' },
      { title: 'Hunting and fishing', text: 'The department issues licenses and publishes statewide and location-specific hunting and fishing regulations, seasons, limits, public-access resources, and species information.' },
      { title: 'Wildlife and fisheries conservation', text: 'TPWD manages wildlife, inland fisheries, coastal fisheries, habitat, research, stocking, restoration, and conservation programs across the state.' },
      { title: 'Boating and water recreation', text: 'The agency administers boating-related programs, safety information, and boat registration and titling services, in addition to water-access and aquatic-resource programs.' },
    ],
    commonReasons: [
      'Reserve or plan a visit to a Texas state park.',
      'Buy or verify hunting and fishing licenses and endorsements.',
      'Check current seasons, bag or length limits, closures, and special regulations.',
      'Find official wildlife, fisheries, boating, or conservation information.',
      'Research public hunting, paddling, fishing, camping, and outdoor-recreation opportunities.'
    ],
    beforeYouStart: [
      'For a park trip, check alerts and reservation availability for the exact park and date; popular parks can reach capacity and weather can change access.',
      'For hunting or fishing, verify the current license, endorsement, season, location, species, and method rules rather than relying on a previous year’s summary.',
      'For boating, distinguish operator-safety requirements from vessel title or registration requirements and use the official instructions for the specific transaction.'
    ],
    distinction: 'TPWD is both a land-management agency and a regulatory agency. A Texas Defined destination guide can help you decide where to go, compare parks, or plan a route; TPWD remains the authority for current park access, reservations, regulations, hunting and fishing rules, and official wildlife information.',
    verificationNote: 'Outdoor rules and conditions are time-sensitive. Always check the official TPWD page for the specific park, water body, species, season, or license before acting on a summary.',
    internalLinks: [
      { href: '/explore/state-parks', label: 'Texas state parks guide', description: 'Compare parks and decide where to go before opening the official reservation page.' },
      { href: '/texas-fishing-license', label: 'Texas fishing license guide', description: 'Understand the license question, then verify the current requirement with TPWD.' },
      { href: '/fishing', label: 'Texas fishing guide', description: 'Explore lakes, species, access, techniques, and planning resources.' },
      { href: '/best-places-to-go-camping-in-texas', label: 'Best places to camp in Texas', description: 'Use the editorial camping guide to narrow your trip options.' },
    ],
  },
  'texas-workforce-commission': {
    summary: 'The Texas Workforce Commission connects unemployment insurance, workforce development, job-search services, employer programs, labor-market information, and several employment-related regulatory functions. Individuals often arrive at TWC after a job loss or while looking for work; employers use the agency for unemployment-tax accounts, workforce programs, and compliance resources. The most important practical distinction is between applying for benefits, requesting payment, appealing a decision, and simply searching for work—those are related but separate workflows.',
    responsibilities: [
      { title: 'Unemployment benefits', text: 'TWC administers the Texas unemployment-insurance program, including claims, eligibility decisions, benefit-payment processes, employer responses, and appeals.' },
      { title: 'Workforce and job services', text: 'The agency works with the statewide workforce system to connect job seekers and employers, provide training and reemployment resources, and publish labor-market information.' },
      { title: 'Employer unemployment taxes', text: 'Texas employers interact with TWC for unemployment-tax registration, wage reporting, contribution information, and responses to benefit claims.' },
      { title: 'Employment-related programs', text: 'TWC administers additional workforce, vocational-rehabilitation, education, and civil-rights functions. The official site routes users to the correct division based on the issue.' },
    ],
    commonReasons: [
      'Apply for unemployment benefits after a qualifying job separation.',
      'Request benefit payments, review claim status, or respond to agency correspondence.',
      'Appeal an unemployment decision or prepare for an appeal hearing.',
      'Find workforce centers, job-search resources, training, or labor-market data.',
      'Register or manage an employer unemployment-tax account.'
    ],
    beforeYouStart: [
      'For an unemployment claim, gather employment dates, employer information, pay information, and the facts surrounding the job separation.',
      'Read every deadline and request in TWC correspondence. Benefit applications, payment requests, document responses, and appeals can have different timelines.',
      'Keep job-search and claim records organized. If an issue is disputed, the timeline and documentation often matter as much as the initial application.'
    ],
    distinction: 'TWC is the state agency for unemployment insurance and workforce programs, but it is not the same thing as a local workforce center. Local centers provide front-line employment and training services within the broader Texas workforce system, while TWC administers statewide programs and systems.',
    verificationNote: 'Unemployment eligibility and procedural deadlines depend on the facts of the claim and current agency rules. Use the official TWC account and instructions for filing, payment requests, appeals, and employer responses.',
    internalLinks: [
      { href: '/texas-unemployment', label: 'Texas unemployment guide', description: 'A plain-language starting point for applications, eligibility, payment requests, and TWC.' },
      { href: '/texas-salary-calculator', label: 'Texas salary calculator', description: 'Estimate take-home pay when comparing a new job or compensation offer.' },
      { href: '/texas-resources', label: 'Texas state resources directory', description: 'Find adjacent benefit, licensing, and state-service agencies.' },
    ],
  },
  'texas-education-agency': {
    summary: 'The Texas Education Agency oversees the statewide public-education system and is the central source for school accountability, district data, academic standards, school finance information, educator systems, and many state education rules and reports. Families often use TEA data to research a district or campus; educators and administrators interact with the agency for certification, accountability, funding, reporting, and program requirements. Local school districts still make many day-to-day decisions, so the practical challenge is knowing when a question belongs to TEA and when it belongs to the district itself.',
    responsibilities: [
      { title: 'School and district accountability', text: 'TEA publishes statewide accountability information, district and campus data, performance reports, and other resources used to compare and understand Texas public schools.' },
      { title: 'Academic standards and assessment', text: 'The agency administers state academic standards, assessment programs, curriculum-related guidance, and statewide reporting tied to public-school performance.' },
      { title: 'School finance and administration', text: 'TEA administers major state public-education funding systems and publishes guidance and data for districts, charter schools, and education administrators.' },
      { title: 'Educator and parent resources', text: 'The agency provides educator-certification and professional resources as well as parent-facing information about schools, programs, rights, data, and complaint or resolution pathways.' },
    ],
    commonReasons: [
      'Research a Texas public-school district or campus using official data.',
      'Review accountability, academic, assessment, or school-finance information.',
      'Find educator certification and professional requirements.',
      'Locate state rules, reports, datasets, and parent resources.',
      'Determine whether a concern should be handled locally or through a state process.'
    ],
    beforeYouStart: [
      'For an address-based school question, first identify the actual district and attendance boundary. City names, ZIP codes, and school-district boundaries do not line up cleanly in Texas.',
      'For a campus or district comparison, use the same school year and metric across schools; accountability and performance measures can change between reporting cycles.',
      'For a complaint or dispute, review the local district process and the TEA instructions before assuming the state agency is the first step.'
    ],
    distinction: 'TEA oversees the state system, but Texas school districts are local governmental entities with their own boards, boundaries, campuses, calendars, policies, and many operational decisions. TEA data is excellent for statewide comparison; enrollment, zoning, transfer, transportation, and day-to-day campus questions often require the district directly.',
    verificationNote: 'School boundaries, ratings, accountability systems, calendars, and program rules change. Use TEA and the local district as the authoritative sources for a current decision, especially before buying a home based on an assumed school assignment.',
    internalLinks: [
      { href: '/find-my-school-district', label: 'Find my school district', description: 'Start with the district that actually serves an address rather than the city or ZIP code.' },
      { href: '/moving-to-texas', label: 'Moving to Texas guide', description: 'Put schools in context with taxes, housing, utilities, insurance, and commuting.' },
      { href: '/browse/cities', label: 'Texas cities and towns directory', description: 'Compare city context while keeping municipal and school-district boundaries separate.' },
    ],
  },
  'public-utility-commission': {
    summary: 'The Public Utility Commission of Texas regulates major parts of the state’s electric, telecommunications, water, and sewer utility industries. For households, the agency is most visible when a utility complaint, retail-electric question, service-quality issue, or regulated-rate matter goes beyond ordinary customer service. Texas’s utility structure is unusually fragmented: some residents have retail electric choice, others are served by municipally owned utilities or electric cooperatives, and water service can come from cities, districts, or regulated utilities. The PUC’s role depends on which system serves the address.',
    responsibilities: [
      { title: 'Electric utility regulation', text: 'The PUC regulates investor-owned electric utilities and oversees significant parts of the Texas electric market and transmission system, including matters involving reliability, rates, service, and retail-market rules within its jurisdiction.' },
      { title: 'Consumer assistance', text: 'The agency provides consumer information and complaint pathways for utility matters within PUC jurisdiction, often after a customer has first tried to resolve the issue with the provider.' },
      { title: 'Telecommunications', text: 'The commission regulates certain telecommunications matters and administers programs and consumer resources established under Texas law.' },
      { title: 'Water and sewer utilities', text: 'The PUC regulates certain retail public water and sewer utilities, including rate and service matters that are not handled solely by a city or other local authority.' },
    ],
    commonReasons: [
      'Understand whether an electric service area has retail choice or a single local provider.',
      'Escalate a utility complaint after working with the provider.',
      'Research regulated utility rates, dockets, service areas, or commission proceedings.',
      'Find consumer information about electricity, telecommunications, water, or sewer service.',
      'Determine which regulator has jurisdiction over a specific utility problem.'
    ],
    beforeYouStart: [
      'Identify the actual utility provider and service address. Jurisdiction depends heavily on the type of provider and location.',
      'Keep bills, account numbers, dates, provider correspondence, and the result of any customer-service complaint before escalating an issue.',
      'For electricity shopping, distinguish the retail electric provider from the transmission and distribution utility; they perform different roles on the same account.'
    ],
    distinction: 'Not every Texas utility is regulated in the same way. Municipally owned utilities, electric cooperatives, retail electric providers, transmission and distribution utilities, water districts, and private utilities can fall under different rules or complaint routes. Start with the provider type before assuming the PUC is the correct destination.',
    verificationNote: 'Utility tariffs, rates, complaint processes, service territories, and market rules are time-sensitive. Use the PUC and the utility provider for current terms and legal requirements; use Texas Defined for context and planning.',
    internalLinks: [
      { href: '/texas-utility-cost-calculator', label: 'Texas utility cost calculator', description: 'Estimate a household utility budget before comparing providers and local conditions.' },
      { href: '/moving-to-texas', label: 'Moving to Texas guide', description: 'Understand how electricity, water districts, housing, taxes, and climate fit together.' },
      { href: '/texas-resources', label: 'Texas state resources directory', description: 'Find the correct state office when a utility issue overlaps with environmental, consumer, or local-government regulation.' },
    ],
  },
  'texas-commission-environmental-quality': {
    summary: 'The Texas Commission on Environmental Quality is the state’s primary environmental regulatory agency for air quality, water quality, waste, drinking-water systems, wastewater, permits, compliance, and many pollution-control programs. Residents may encounter TCEQ when researching a nearby permitted facility, filing an environmental complaint, checking public drinking-water information, or trying to understand a municipal utility district or water-system issue. Businesses and local governments interact with the agency through permits, reporting, compliance, enforcement, and technical programs.',
    responsibilities: [
      { title: 'Air quality and emissions', text: 'TCEQ administers air permits, emissions programs, monitoring, compliance, and public information for regulated sources and statewide air-quality programs.' },
      { title: 'Water and drinking-water systems', text: 'The agency regulates public drinking-water systems and many wastewater, stormwater, water-quality, and utility matters, while other water responsibilities are shared with additional state and local agencies.' },
      { title: 'Waste and environmental permits', text: 'TCEQ administers permitting and compliance programs for municipal, industrial, hazardous, and other regulated wastes and environmental activities.' },
      { title: 'Complaints, compliance, and enforcement', text: 'Residents can use TCEQ resources to identify regulated facilities, review public records, report environmental concerns, and understand how inspections and enforcement processes work.' },
    ],
    commonReasons: [
      'Research a permitted industrial, waste, water, or air facility near a property.',
      'Check public drinking-water system information or environmental compliance records.',
      'File or follow up on an environmental complaint.',
      'Find permit, application, public-notice, or enforcement documents.',
      'Understand environmental requirements for a business, development, or local utility system.'
    ],
    beforeYouStart: [
      'Collect the exact address, facility name, permit number, water-system name, or other identifier when possible. Environmental records are much easier to locate with a specific entity.',
      'Separate an environmental-regulation question from a billing or customer-service dispute. A utility bill may belong with the provider or PUC even when the system also has TCEQ environmental obligations.',
      'For a complaint, document dates, locations, photographs if appropriate and safe, and any prior contact with the responsible party or local authority.'
    ],
    distinction: 'Texas water and environmental responsibilities are divided across several agencies and local governments. TCEQ regulates environmental quality and many utility systems; the Texas Water Development Board focuses on planning, data, and financing; the PUC regulates certain utility rates and service; river authorities, groundwater districts, cities, and counties can have additional roles. The correct office depends on the problem.',
    verificationNote: 'Permits, enforcement status, public notices, and water-system records change. Use the official TCEQ databases and documents for a current property, facility, or compliance decision.',
    internalLinks: [
      { href: '/texas-resources', label: 'Texas state resources directory', description: 'Separate environmental, utility, land, and local-government responsibilities.' },
      { href: '/moving-to-texas', label: 'Moving to Texas guide', description: 'Add water systems, special districts, utilities, and environmental research to a relocation checklist.' },
      { href: '/home-garden', label: 'Texas home and garden', description: 'Practical Texas property guidance that complements official environmental and water-system records.' },
    ],
  },
  'texas-general-land-office': {
    summary: 'The Texas General Land Office is the state agency responsible for managing major state land and mineral interests, coastal programs, parts of the Permanent School Fund land portfolio, veterans land programs, and significant disaster-recovery responsibilities. Its work reaches from West Texas mineral leases to Gulf Coast beaches and from historic state records to housing recovery after major disasters. For most residents, the agency becomes relevant through coastal access, veterans programs, land records, disaster-recovery programs, or questions involving state-owned land and minerals.',
    responsibilities: [
      { title: 'State lands and mineral interests', text: 'The GLO manages millions of acres of state land and mineral interests, including leasing and revenue-generating activities tied to public land assets.' },
      { title: 'Coastal management', text: 'The agency administers coastal programs involving beaches, dunes, public access, coastal planning, erosion, and restoration along the Texas Gulf Coast.' },
      { title: 'Veterans land programs', text: 'Through the Veterans Land Board, the GLO supports programs for eligible Texas veterans involving land, housing, home improvement, and state veterans facilities and cemeteries.' },
      { title: 'Disaster recovery and historic records', text: 'The agency has major responsibilities in long-term disaster-recovery programs and preserves extensive land, map, and archival records connected to Texas history.' },
    ],
    commonReasons: [
      'Research a Texas Veterans Land Board program.',
      'Find coastal, beach-access, dune, or erosion information.',
      'Research state land, mineral, lease, or historical land records.',
      'Find long-term disaster-recovery program information.',
      'Explore GLO maps, archives, and historic documents.'
    ],
    beforeYouStart: [
      'For a land or mineral question, gather the county, legal description, survey, tract, lease, or other record identifier if available.',
      'For coastal property, distinguish public-beach and state coastal rules from city, county, FEMA, insurance, and private-title requirements.',
      'For disaster recovery or veterans programs, verify the exact program and current eligibility period before collecting documents.'
    ],
    distinction: 'The General Land Office is not the general deed-recording office for private Texas property. County clerks record most private real-property instruments, appraisal districts maintain appraisal records, and title companies or attorneys handle private title research. The GLO becomes central when the issue involves state land, state mineral interests, the coast, veterans programs, historical land records, or assigned recovery programs.',
    verificationNote: 'Land, coastal, veterans, and recovery programs can be highly specific. Use the official GLO or Veterans Land Board documents for eligibility, legal boundaries, application periods, and current program rules.',
    internalLinks: [
      { href: '/explore/beaches-coast', label: 'Texas beaches and coast guide', description: 'Plan coastal travel while keeping official beach and coastal rules separate.' },
      { href: '/texas-history', label: 'Texas history', description: 'Explore the broader historical context behind GLO maps, land records, and state development.' },
      { href: '/texas-resources', label: 'Texas state resources directory', description: 'Find county and state offices that handle private property, environmental, or utility questions outside the GLO.' },
    ],
  },
  'texas-department-insurance': {
    summary: 'The Texas Department of Insurance regulates the insurance industry in Texas and provides consumer help with policies, companies, agents, complaints, and coverage questions. Homeowners often reach TDI after a claim problem, a renewal or cancellation issue, a major premium change, or confusion about windstorm, flood, roof, deductible, or replacement-cost terms. Businesses and professionals use the agency for licensing, regulatory filings, forms, rates, workers’ compensation, and other industry requirements. TDI is a regulator and consumer-information source; it is not an insurance company and does not replace the policy contract.',
    responsibilities: [
      { title: 'Consumer insurance help', text: 'TDI publishes plain-language guidance on homeowners, auto, health, life, commercial, and other insurance topics and provides complaint and consumer-assistance channels.' },
      { title: 'Company and agent regulation', text: 'The department licenses and regulates insurers, agents, adjusters, and other insurance professionals and maintains tools for checking license and company information.' },
      { title: 'Rates, forms, and market oversight', text: 'TDI reviews or regulates insurance rates and policy forms where Texas law requires it and monitors insurance-market conduct and financial condition.' },
      { title: 'Property and workers’ compensation programs', text: 'The agency has specialized responsibilities involving property insurance, windstorm issues, workers’ compensation, safety, fraud, and other programs established by Texas law.' },
    ],
    commonReasons: [
      'Understand a homeowners, auto, health, or other insurance policy issue.',
      'Check an insurance company, agent, adjuster, or license.',
      'File a complaint after attempting to resolve a problem with the insurer.',
      'Research Texas insurance rates, forms, consumer protections, or market information.',
      'Find official guidance about deductibles, claims, repairs, roofs, windstorm, or disaster recovery.'
    ],
    beforeYouStart: [
      'Have the policy, declarations page, claim number if applicable, insurer correspondence, dates, and a written timeline of the issue.',
      'Separate flood insurance from homeowners insurance and identify any windstorm or specialty policy; different coverages can be issued by different programs or companies.',
      'Read the policy language and the insurer’s written decision before filing a complaint so the disputed provision or claim issue is clear.'
    ],
    distinction: 'TDI can explain Texas insurance rules, regulate companies and professionals, and receive eligible complaints, but it does not automatically decide every private coverage dispute in a consumer’s favor. Policy language, claim facts, contractual rights, federal programs, and court remedies can all matter. Texas Defined calculators estimate scenarios; they do not quote or bind insurance.',
    verificationNote: 'Insurance premiums, forms, deductibles, catastrophe programs, and legal requirements change. Use TDI, the insurer, and the actual policy documents for a current coverage or claim decision.',
    internalLinks: [
      { href: '/texas-home-insurance-calculator', label: 'Texas home insurance calculator', description: 'Build a planning estimate, then compare it with real quotes and policy terms.' },
      { href: '/article/texas-homeowners-insurance-guide', label: 'Texas homeowners insurance guide', description: 'A deeper explanation of premiums, deductibles, roofs, wind, flood, and shopping considerations.' },
      { href: '/moving-to-texas', label: 'Moving to Texas guide', description: 'Put insurance costs beside property taxes, utilities, climate, and housing decisions.' },
    ],
  },
  'texas-health-human-services': {
    summary: 'Texas Health and Human Services is the statewide system responsible for many health, food, cash-assistance, long-term-care, behavioral-health, disability, and human-service programs. HHSC administers major benefits such as Medicaid, CHIP, SNAP, and TANF and oversees or coordinates a large network of service providers, facilities, contractors, and regulatory programs. For residents, the practical challenge is that “HHS” is an umbrella: the right path depends on whether the task is applying for benefits, managing an existing case, finding a provider, reporting a change, locating a local office, or resolving a program-specific issue.',
    responsibilities: [
      { title: 'Medicaid and CHIP', text: 'HHSC administers Texas Medicaid and the Children’s Health Insurance Program, including eligibility systems, managed-care structures, provider programs, and member resources.' },
      { title: 'Food and cash assistance', text: 'The agency administers SNAP food benefits and TANF cash-assistance programs and provides eligibility, application, renewal, and case-management systems for qualifying households.' },
      { title: 'Long-term care, disability, and behavioral health', text: 'Texas HHS administers and coordinates programs serving older Texans, people with disabilities, people needing long-term services and supports, and people seeking behavioral-health services.' },
      { title: 'Regulation and service systems', text: 'HHSC regulates or oversees many health and human-service facilities and programs and maintains complaint, provider, inspection, and public-information systems.' },
    ],
    commonReasons: [
      'Apply for or renew Medicaid, CHIP, SNAP, TANF, or another eligible benefit.',
      'Report a household change or manage an existing benefits case.',
      'Find long-term-care, disability, behavioral-health, or aging services.',
      'Locate an HHS office, provider, facility, or program contact.',
      'Research a regulated facility, complaint process, or program requirement.'
    ],
    beforeYouStart: [
      'Identify the exact program. Medicaid, CHIP, SNAP, TANF, long-term care, and disability services have different eligibility rules and documentation.',
      'For benefits, gather household identity, residency, income, expense, and program-specific documents before beginning an application or renewal.',
      'Keep notices and case numbers. If a benefit is denied, reduced, or closed, the written notice normally identifies the reason and the available review or appeal process.'
    ],
    distinction: 'Texas Health and Human Services includes multiple agencies, programs, contractors, managed-care organizations, providers, and local service networks. A doctor, health plan, local authority, benefits office, or state agency may each own a different part of the same problem. Start with the program name and the most recent official notice rather than treating “HHS” as a single front desk.',
    verificationNote: 'Benefit eligibility, renewal procedures, covered services, provider networks, and regulatory requirements can change. Use the official Texas HHS benefits and program systems for current eligibility and case actions.',
    internalLinks: [
      { href: '/texas-resources', label: 'Texas state resources directory', description: 'Find adjacent state agencies and official service starting points.' },
      { href: '/moving-to-texas', label: 'Moving to Texas guide', description: 'A broader relocation checklist for families comparing services, schools, housing, and costs.' },
    ],
  },
};

export function agencyGuideFor(slug: string) {
  return guides[slug];
}
