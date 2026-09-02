import type { PrioritySearchPageData } from "@/components/editorial/PrioritySearchPage";

export const TEXAS_SERVICE_PRIORITY_SEARCH_PAGES: Record<string, PrioritySearchPageData> = {
  "texas-birth-certificate": {
    eyebrow: "Texas records",
    title: "How to Get a Texas Birth Certificate",
    intro: "Texas birth certificates are issued through Texas Department of State Health Services Vital Statistics and eligible local registrars. Use an official ordering channel and confirm identity and relationship requirements before submitting payment.",
    updated: "September 1, 2026",
    quickAnswer: "Texas DSHS currently charges $22 for either a certified long-form or short-form birth certificate. Online applicants must satisfy the state's identity and relationship checks; people who do not qualify for online ordering can use an eligible mail or in-person process.",
    sections: [
      {
        heading: "Who handles Texas birth certificates?",
        paragraphs: ["Texas Department of State Health Services Vital Statistics maintains Texas vital records. Depending on the record and location, a local registrar may also be able to issue a certified copy. Use DSHS or the appropriate local government office rather than an unofficial records broker when you need an official certificate."],
        links: [
          { label: "Texas DSHS Vital Statistics", href: "https://www.dshs.texas.gov/vital-statistics", external: true },
          { label: "Texas DSHS birth records", href: "https://www.dshs.texas.gov/vital-statistics/birth-records", external: true },
        ],
      },
      {
        heading: "What do you need to order online?",
        paragraphs: ["DSHS says online certificate orders require identity verification using a state-issued driver license or ID number, Social Security number and the applicant's relationship to the person named on the record. The order also asks for record details such as the person's name, sex, birthplace and parent information. If you cannot satisfy the online requirements, use an eligible mail or in-person option instead."],
        links: [{ label: "DSHS online-order requirements", href: "https://www.dshs.texas.gov/vital-statistics/check-order-status/requirements-online-orders", external: true }],
      },
      {
        heading: "How much does a Texas birth certificate cost?",
        paragraphs: ["DSHS currently lists $22 for a certified long-form birth certificate and $22 for a certified short-form certificate. Fees are non-refundable and non-transferable even if a record is not found or is identified incorrectly. Extra processing or shipping charges can apply to certain service choices."],
        links: [{ label: "DSHS current vital-record fees", href: "https://www.dshs.texas.gov/vital-statistics/costs-fees", external: true }],
      },
      {
        heading: "Long form or short form?",
        paragraphs: ["DSHS describes the long form as a certified copy commonly used for purposes such as a U.S. passport, while the short form may be suitable for uses such as school registration. The organization requesting your record decides what it will accept, so verify that requirement before ordering."],
        links: [{ label: "DSHS birth-record information", href: "https://www.dshs.texas.gov/vital-statistics/birth-records", external: true }],
      },
      {
        heading: "Common mistakes to avoid",
        paragraphs: ["Do not assume a birth verification is the same as a certified birth certificate. Double-check names, dates and birthplace information before paying because DSHS says vital-record fees are non-refundable. For county-specific availability, use the responsible local registrar rather than a generic third-party directory."],
        links: [
          { label: "Browse Texas counties", href: "/browse/counties" },
          { label: "Texas resources", href: "/texas-resources" },
        ],
      },
    ],
    related: [
      { label: "Texas services", href: "/texas-services" },
      { label: "Texas resources", href: "/texas-resources" },
      { label: "Browse Texas counties", href: "/browse/counties" },
      { label: "Moving to Texas", href: "/moving-to-texas" },
    ],
    faq: [
      { question: "How much is a certified Texas birth certificate?", answer: "Texas DSHS currently lists a $22 fee for either a certified long-form or certified short-form birth certificate." },
      { question: "Can I order a Texas birth certificate online?", answer: "Eligible applicants can order online through an official state channel after satisfying DSHS identity, relationship and record-information requirements." },
      { question: "Is a birth verification the same as a certified birth certificate?", answer: "No. DSHS treats a birth verification and a certified copy as different record products. Use the certificate type required by the organization requesting it." },
    ],
  },

  "texas-sales-tax-permit": {
    eyebrow: "Texas business",
    title: "How to Get a Texas Sales Tax Permit",
    intro: "Texas sales and use tax permits are issued by the Texas Comptroller. The permit itself has no application fee, but businesses must determine whether their sales or services require registration and must continue filing required returns after approval.",
    updated: "September 1, 2026",
    quickAnswer: "Apply through the Texas Comptroller's Online Tax Registration Application or use Form AP-201 when the paper process is required. The Comptroller says there is no fee for the permit and currently advises applicants to allow about two to three weeks to receive it.",
    sections: [
      {
        heading: "Who needs a Texas sales tax permit?",
        paragraphs: ["The Comptroller directs businesses to register when they are engaged in business in Texas and sell, lease or rent taxable goods, provide taxable services, or owe use tax on qualifying out-of-state purchases. Some sellers and marketplace-only situations can have different rules, so confirm your facts against the Comptroller guidance."],
        links: [
          { label: "Comptroller sales-tax permit requirements", href: "https://comptroller.texas.gov/help/sales-tax-registration/requirements.php", external: true },
          { label: "Comptroller permit FAQ", href: "https://comptroller.texas.gov/taxes/sales/faq/permit.php", external: true },
        ],
      },
      {
        heading: "Where do you apply?",
        paragraphs: ["The primary application is the Texas Comptroller's Online Tax Registration Application in eSystems. The Comptroller also provides Form AP-201 for applicants who must or prefer to use the non-online process. Do not pay a third party merely because its page looks like a state application."],
        links: [{ label: "Official Texas Online Tax Registration Application", href: "https://comptroller.texas.gov/taxes/permit/", external: true }],
      },
      {
        heading: "What information should you have ready?",
        paragraphs: ["The online application identifies required information such as Social Security or federal employer identification numbers for owners or responsible parties, a Texas Secretary of State file number when applicable, and a NAICS code. The exact required fields depend on the business structure and people involved."],
        links: [{ label: "Comptroller application requirements", href: "https://comptroller.texas.gov/help/sales-tax-registration/requirements.php", external: true }],
      },
      {
        heading: "Cost and typical timing",
        paragraphs: ["The Comptroller says there is no fee for a Texas sales and use tax permit, although a security bond can be required in some cases. Its current online registration page says to allow two to three weeks to receive the permit."],
        links: [
          { label: "Comptroller permit fee FAQ", href: "https://comptroller.texas.gov/taxes/sales/faq/permit.php", external: true },
          { label: "Comptroller registration timing", href: "https://comptroller.texas.gov/taxes/permit/", external: true },
        ],
      },
      {
        heading: "The permit creates ongoing filing obligations",
        paragraphs: ["Getting the permit is not the final step. The Comptroller says permit holders must collect tax on taxable sales, timely report and pay sales and use tax, keep adequate records and file required returns even for a filing period with no taxable sales or purchases."],
        links: [
          { label: "Comptroller permit-holder obligations", href: "https://comptroller.texas.gov/taxes/sales/faq/permit.php", external: true },
          { label: "How to start a business in Texas", href: "/start-a-business-in-texas" },
        ],
      },
    ],
    related: [
      { label: "Texas services", href: "/texas-services" },
      { label: "Start a business in Texas", href: "/start-a-business-in-texas" },
      { label: "Texas sales tax explained", href: "/texas-sales-tax-explained" },
      { label: "Texas Comptroller", href: "/agency/texas-comptroller" },
    ],
    faq: [
      { question: "How much does a Texas sales tax permit cost?", answer: "The Texas Comptroller says there is no fee for the permit, although a security bond may be required in some cases." },
      { question: "How long does a Texas sales tax permit take?", answer: "The Comptroller's current online registration page says to allow about two to three weeks to receive the permit." },
      { question: "Do I still file a return if I had no taxable sales?", answer: "Yes. The Comptroller says a permit holder must file required sales and use tax returns even when there are no taxable sales or purchases to report for that filing period." },
    ],
  },

  "texas-property-tax-lookup": {
    eyebrow: "Texas property",
    title: "How to Look Up Texas Property Taxes and Appraisal Records",
    intro: "Texas property appraisal and tax-bill data is local, not stored in one statewide taxpayer database. Start with the county appraisal district for value and exemption questions and the tax assessor-collector or relevant taxing unit for tax-bill and payment information.",
    updated: "September 1, 2026",
    quickAnswer: "Use the Texas Comptroller's county directory to find the correct appraisal district and county tax office. Appraisal districts handle values, exemptions and protests; tax assessor-collector offices handle many tax bills, payments, receipts and certificates. TexasDefined links to those local authorities instead of creating 254 thin lookup copies.",
    sections: [
      {
        heading: "There is no single statewide property-tax lookup",
        paragraphs: ["The Texas Comptroller explicitly says its office does not have access to local property appraisal or tax information. Texas property taxation is administered locally, which means the correct website depends on the county, appraisal district and taxing unit."],
        links: [{ label: "Comptroller local property appraisal and tax directory", href: "https://comptroller.texas.gov/taxes/property-tax/county-directory/", external: true }],
      },
      {
        heading: "Use the appraisal district for value, exemptions and protests",
        paragraphs: ["The Comptroller directs questions about property values, appraisal methods, exemptions, agricultural or special appraisal, and protests and appeals to the county appraisal district. Many appraisal districts provide searchable property records, but search tools and accepted search fields vary locally."],
        links: [
          { label: "Texas appraisal-district directory", href: "https://comptroller.texas.gov/taxes/property-tax/county-directory/", external: true },
          { label: "How Texas appraisal districts work", href: "/learn/appraisal-districts" },
          { label: "Protest a Texas property appraisal", href: "/do/property-tax-protest" },
        ],
      },
      {
        heading: "Use the tax office for bills, payments and receipts",
        paragraphs: ["For the taxing units they serve, county tax assessor-collector offices can answer questions about payment options, tax bills, certificates, rates and receipts. Some taxing units collect separately, so follow the local directory when it identifies a different office."],
        links: [
          { label: "Comptroller county tax-office directory", href: "https://comptroller.texas.gov/taxes/property-tax/county-directory/", external: true },
          { label: "Texas property-tax payment guide", href: "/learn/property-tax-payments" },
        ],
      },
      {
        heading: "Cross-check deadlines before taking action",
        paragraphs: ["A lookup result is not a substitute for a current notice or deadline. For example, the usual appraisal-protest deadline is May 15 or 30 days after the appraisal district mails the notice of appraised value, whichever is later, with specific exceptions. Use the current Comptroller guidance and your appraisal district notice."],
        links: [{ label: "Comptroller appraisal protest guidance", href: "https://comptroller.texas.gov/taxes/property-tax/protests/", external: true }],
      },
    ],
    related: [
      { label: "Texas services", href: "/texas-services" },
      { label: "Browse Texas counties", href: "/browse/counties" },
      { label: "County property-tax guides", href: "/property-tax/counties" },
      { label: "Property-tax calculators", href: "/property-tax-calculators" },
      { label: "Homestead exemption guide", href: "/do/homestead-exemption" },
    ],
    faq: [
      { question: "Does Texas have one statewide property-tax lookup?", answer: "No. The Texas Comptroller says local appraisal and property-tax information is maintained by local appraisal districts, tax offices and taxing units." },
      { question: "Where do I look up my appraised value?", answer: "Start with the appraisal district for the county where the property is located. The Comptroller's county directory links to local appraisal districts." },
      { question: "Who handles a Texas property-tax bill or receipt?", answer: "The county tax assessor-collector handles many local tax bills, payments and receipts, but some taxing units collect separately. Use the Comptroller directory to identify the responsible office." },
    ],
  },

  "texas-septic-permit": {
    eyebrow: "Texas property",
    title: "How to Get a Septic Permit in Texas",
    intro: "Texas regulates septic systems as on-site sewage facilities, or OSSFs. Permitting is usually local even though TCEQ sets statewide rules, so the key first step is identifying the authorized permitting authority for the property.",
    updated: "September 1, 2026",
    quickAnswer: "TCEQ says a permit and approved plan are generally required to construct, alter, repair, extend or operate an OSSF. TCEQ is often not the permitting authority; submit the application and planning materials to the authorized local authority for the property's location, or to the TCEQ regional OSSF program where TCEQ retains jurisdiction.",
    sections: [
      {
        heading: "Who issues a Texas septic permit?",
        paragraphs: ["TCEQ sets the statewide OSSF framework but says it is not often the permitting authority. Counties, cities, river authorities, public health districts and other authorized agents may administer local OSSF programs. Identify the authority for the actual property before paying for a permit or design."],
        links: [{ label: "TCEQ: getting an OSSF permit", href: "https://www.tceq.texas.gov/permitting/ossf/ossfpermits.html", external: true }],
      },
      {
        heading: "When is a permit required?",
        paragraphs: ["TCEQ says a permit and approved plan are required to construct, alter, repair, extend and operate an OSSF, subject to limited exceptions. Older grandfathered systems and the rule sometimes called the 10-acre exemption have specific conditions; do not assume acreage alone removes the permit requirement."],
        links: [{ label: "TCEQ OSSF permit requirements and exceptions", href: "https://www.tceq.texas.gov/permitting/ossf/ossfpermits.html", external: true }],
      },
      {
        heading: "What happens after you identify the permitting authority?",
        paragraphs: ["Submit the required application and planning materials to that authority. Site evaluation, system design and installation requirements depend on the property and system. TCEQ says the permitting authority must approve or deny submitted planning materials and the permit application within 30 days of receipt."],
        links: [{ label: "TCEQ septic-system permitting guide", href: "https://www.tceq.texas.gov/permitting/ossf/ossfpermits.html", external: true }],
      },
      {
        heading: "Use county authority pages instead of generic local copies",
        paragraphs: ["Local fees, forms, inspection scheduling and authorized-agent contacts differ. TexasDefined therefore keeps the statewide explanation here and routes local research through county and city authority pages rather than publishing hundreds of nearly identical septic-permit pages."],
        links: [
          { label: "Browse Texas counties", href: "/browse/counties" },
          { label: "Browse Texas cities", href: "/browse/cities" },
          { label: "Texas septic systems homeowner guide", href: "/article/texas-septic-systems-homeowner-guide" },
        ],
      },
    ],
    related: [
      { label: "Texas services", href: "/texas-services" },
      { label: "Texas septic systems homeowner guide", href: "/article/texas-septic-systems-homeowner-guide" },
      { label: "Browse Texas counties", href: "/browse/counties" },
      { label: "Texas Commission on Environmental Quality", href: "/agency/texas-commission-environmental-quality" },
      { label: "Moving to Texas", href: "/moving-to-texas" },
    ],
    faq: [
      { question: "Do I need a permit for a septic system in Texas?", answer: "TCEQ says a permit and approved plan are generally required to construct, alter, repair, extend or operate an OSSF, with limited exceptions that must satisfy specific conditions." },
      { question: "Does TCEQ issue every Texas septic permit?", answer: "No. TCEQ says it is often not the permitting authority. An authorized county, city, river authority, health district or other local agent may administer the permit." },
      { question: "How long does septic permit review take?", answer: "TCEQ says the permitting authority must approve or deny the planning materials and permit application within 30 days after receipt." },
    ],
  },

  "texas-flood-information": {
    eyebrow: "Texas property",
    title: "How to Check Flood Risk and Flood Maps in Texas",
    intro: "Use official FEMA flood maps for regulatory flood-hazard information and Texas Water Development Board planning tools for broader statewide flood-risk context. A map is a starting point, not a guarantee that a property will or will not flood.",
    updated: "September 1, 2026",
    quickAnswer: "For an address-level regulatory flood-map check, start with FEMA's Flood Map Service Center. For statewide and regional Texas flood-planning information, use the Texas Water Development Board's State Flood Plan and interactive viewer. Then confirm local floodplain, permit and drainage requirements with the city or county responsible for the property.",
    sections: [
      {
        heading: "Start with FEMA for the official flood map",
        paragraphs: ["FEMA's Flood Map Service Center is the federal source for current effective flood-hazard mapping products. Search the property location and review the effective map and related products. Flood zones are used for floodplain management and insurance decisions, but flooding can occur outside mapped high-risk areas."],
        links: [{ label: "FEMA Flood Map Service Center", href: "https://msc.fema.gov/portal/home", external: true }],
      },
      {
        heading: "Use the Texas State Flood Plan for broader context",
        paragraphs: ["The Texas Water Development Board administers statewide and regional flood planning. Its 2024 State Flood Plan integrates work from 15 regional flood planning groups and includes an interactive viewer and downloadable planning data for understanding broader flood risk and proposed risk-reduction projects."],
        links: [{ label: "TWDB State Flood Plan", href: "https://www.twdb.texas.gov/flood/planning/sfp/index.asp", external: true }],
      },
      {
        heading: "Check the local floodplain authority before building",
        paragraphs: ["Floodplain development permits, elevation requirements, drainage reviews and local map amendments are handled through local jurisdictions. After checking federal and state tools, confirm the current requirements with the city or county responsible for the parcel, especially before building, remodeling or buying in a mapped hazard area."],
        links: [
          { label: "Browse Texas counties", href: "/browse/counties" },
          { label: "Browse Texas cities", href: "/browse/cities" },
        ],
      },
      {
        heading: "Common mistake: treating one map as a flood guarantee",
        paragraphs: ["A property outside a mapped Special Flood Hazard Area can still experience flooding from rainfall, drainage, creeks, dam releases or changing conditions. Use official maps as evidence about mapped risk and regulation, then add local drainage history, insurance information and professional due diligence when a property decision depends on flood exposure."],
        links: [{ label: "TWDB flood planning", href: "https://www.twdb.texas.gov/flood/planning/index.asp", external: true }],
      },
    ],
    related: [
      { label: "Texas services", href: "/texas-services" },
      { label: "Browse Texas counties", href: "/browse/counties" },
      { label: "Browse Texas cities", href: "/browse/cities" },
      { label: "Texas home insurance calculator", href: "/texas-home-insurance-calculator" },
      { label: "Moving to Texas", href: "/moving-to-texas" },
    ],
    faq: [
      { question: "Where do I check the official flood map for a Texas property?", answer: "Start with FEMA's Flood Map Service Center for current effective regulatory flood-hazard mapping products." },
      { question: "Does being outside a mapped high-risk flood zone mean a Texas property cannot flood?", answer: "No. Flooding can occur outside mapped high-risk areas, so use official maps together with local drainage and property-specific due diligence." },
      { question: "Where can I see Texas statewide flood-planning information?", answer: "The Texas Water Development Board publishes the State Flood Plan and an interactive viewer covering statewide and regional flood-planning information." },
    ],
  },

  "texas-hunting-license": {
    eyebrow: "Texas outdoors",
    title: "Texas Hunting License: Requirements, Fees and Official Links",
    intro: "Texas Parks and Wildlife Department issues recreational hunting licenses, endorsements, tags and public-hunting permits. License needs depend on residency, age, species and hunting method, so use the current Outdoor Annual before hunting.",
    updated: "September 1, 2026",
    quickAnswer: "For the 2026-27 license year, TPWD lists the standard Resident Hunting License at $25, the Senior Resident Hunting License at $7 and the Youth Hunting License at $7. Licenses generally run through August 31 unless otherwise noted, and additional endorsements, certifications or tags may be required for the hunt you plan.",
    sections: [
      {
        heading: "Buy through Texas Parks and Wildlife",
        paragraphs: ["TPWD sells official hunting licenses online and through authorized retailers and offices. The 2026-27 licenses went on sale August 15. TPWD currently charges a $5 administrative fee for online transactions."],
        links: [
          { label: "Official TPWD hunting and fishing license sales", href: "https://tpwd.texas.gov/business/licenses/online_sales/index.phtml", external: true },
          { label: "TPWD hunting licenses", href: "https://tpwd.texas.gov/regulations/outdoor-annual/licenses/hunting-licenses-and-permits/hunting-licenses", external: true },
        ],
      },
      {
        heading: "Current 2026-27 resident hunting-license fees",
        paragraphs: ["TPWD currently lists the standard Resident Hunting License at $25 for a Texas resident, the Senior Resident Hunting License at $7 for an eligible resident age 65 or older, and the Youth Hunting License at $7 for a resident or nonresident under age 17 at purchase. Other packages and nonresident licenses have different fees and privileges."],
        links: [{ label: "TPWD current hunting-license fee table", href: "https://tpwd.texas.gov/regulations/outdoor-annual/licenses/hunting-licenses-and-permits/hunting-licenses", external: true }],
      },
      {
        heading: "A hunting license may not be the only requirement",
        paragraphs: ["Species and methods can require endorsements, federal stamps, Harvest Information Program certification, hunter education, tags or other permits. TPWD's 2026-27 Outdoor Annual organizes current seasons and regulations by animal and county. Verify the specific hunt instead of relying on a general license alone."],
        links: [
          { label: "TPWD 2026-27 hunting regulations", href: "https://tpwd.texas.gov/regulations/outdoor-annual/hunting/", external: true },
          { label: "TPWD hunting endorsements and permits", href: "https://tpwd.texas.gov/regulations/outdoor-annual/licenses/hunting-licenses-and-permits", external: true },
        ],
      },
      {
        heading: "New 2026 identity-verification rules matter",
        paragraphs: ["TPWD says that effective August 3, 2026, each individual age 17 or older must be physically present and show valid proof of identification to obtain a recreational hunting or fishing license in person, while online purchasers must have their identity independently validated. TPWD also says foreign residents are not eligible for online purchases."],
        links: [{ label: "TPWD license purchase requirements", href: "https://tpwd.texas.gov/regulations/outdoor-annual/licenses/purchase-requirements", external: true }],
      },
      {
        heading: "Public hunting uses an additional permit system",
        paragraphs: ["A standard hunting license does not by itself create access to every public-hunting property. For 2026-27, TPWD lists the Annual Public Hunting Permit at $48 for qualifying walk-in public-hunting access, with property-specific legal game and rules. Check the current public-hunt map and requirements before traveling."],
        links: [{ label: "TPWD 2026-27 Annual Public Hunting Permit", href: "https://tpwd.texas.gov/huntwild/hunt/public/annual_public_hunting/", external: true }],
      },
    ],
    related: [
      { label: "Texas services", href: "/texas-services" },
      { label: "Texas fishing license", href: "/texas-fishing-license" },
      { label: "Texas Parks and Wildlife", href: "/agency/texas-parks-wildlife" },
      { label: "Explore Texas wildlife", href: "/explore/wildlife" },
      { label: "Texas camping guide", href: "/best-places-to-go-camping-in-texas" },
    ],
    faq: [
      { question: "How much is a Texas resident hunting license in 2026-27?", answer: "TPWD currently lists the standard Resident Hunting License at $25 for the 2026-27 license year." },
      { question: "When do 2026-27 Texas hunting licenses expire?", answer: "TPWD says hunting licenses are generally valid from the purchase date through August 31 unless a specific license states otherwise." },
      { question: "Does a Texas hunting license cover every species and hunt?", answer: "No. Endorsements, certifications, tags, stamps, season rules and property-specific permits can also apply. Verify the exact hunt in the current TPWD Outdoor Annual." },
    ],
  },
};
