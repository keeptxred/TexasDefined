import type { PrioritySearchPageData } from "@/components/editorial/PrioritySearchPage";

export const PUBLIC_SERVICE_PRIORITY_SEARCH_PAGES: Record<string, PrioritySearchPageData> = {
  "track-texas-drivers-license": {
    eyebrow: "Texas driving",
    title: "How to Track Your Texas Driver License or ID Card",
    intro: "Use the official Texas DPS mailing-status system to check whether a newly issued, renewed or replaced driver license or identification card is still being processed or has been mailed.",
    updated: "September 1, 2026",
    quickAnswer: "Texas DPS says a driver license or ID card usually takes two to three weeks from the transaction date to be mailed. Use the official DPS 'Where's my Driver License or ID card?' status tool to check your card rather than a third-party tracker.",
    sections: [
      {
        heading: "Use the official DPS card-status tool",
        paragraphs: ["Texas Department of Public Safety provides a dedicated mailing-status lookup for driver licenses and identification cards. The lookup asks for identifying information that matches the license or ID record; TexasDefined does not collect that information."],
        links: [{ label: "DPS: Where's my Driver License or ID card?", href: "https://www.dps.texas.gov/section/driver-license/wheres-my-driver-license-or-id-card", external: true }],
      },
      {
        heading: "How long a Texas license normally takes",
        paragraphs: ["DPS says it usually takes two to three weeks from the date of the transaction for a driver license or identification card to be mailed. A temporary driver license may be issued while the permanent card is being produced, depending on the transaction."],
        links: [{ label: "DPS driver-license information", href: "https://www.dps.texas.gov/section/driver-license", external: true }],
      },
      {
        heading: "If the card has not arrived",
        paragraphs: ["Check the official status first. If the automated system does not resolve the problem, follow the DPS customer-service instructions shown on the status page. Do not enter driver-license numbers, dates of birth or other identity information into an unofficial tracking website."],
        links: [{ label: "Texas driver-license guide", href: "/texas-drivers-license" }],
      },
    ],
    related: [{ label: "Texas driver license", href: "/texas-drivers-license" }, { label: "Texas by Texas (TxT)", href: "/texas-by-texas-txt" }, { label: "Texas DMV", href: "/texas-dmv" }, { label: "Moving to Texas", href: "/moving-to-texas" }],
    faq: [
      { question: "How long does a Texas driver license take to arrive?", answer: "Texas DPS says it usually takes two to three weeks from the transaction date for a driver license or ID card to be mailed." },
      { question: "Can TexasDefined track my license for me?", answer: "No. Use the official DPS mailing-status tool. TexasDefined does not collect driver-license numbers, dates of birth or other identity information for this purpose." },
      { question: "Does TxDMV track driver licenses?", answer: "No. Texas DPS issues driver licenses and state ID cards. TxDMV handles vehicle titles and registration." },
    ],
  },

  "texas-by-texas-txt": {
    eyebrow: "Texas services",
    title: "What Is Texas by Texas (TxT)?",
    intro: "Texas by Texas, usually called TxT, is the State of Texas account for completing supported government transactions, managing linked services and receiving reminders from one dashboard.",
    updated: "September 1, 2026",
    quickAnswer: "TxT is the State of Texas government's official digital assistant and account system. Texas.gov currently lists services including eligible driver license and ID transactions, vehicle-registration renewal, boat-registration services and additional participating-agency transactions.",
    sections: [
      {
        heading: "What TxT actually is",
        paragraphs: ["Texas.gov describes TxT as an official account for Texas government services. It is designed to let a user sign in once, link supported licenses and registrations, receive reminders and complete eligible transactions through a personalized dashboard."],
        links: [{ label: "Official Texas.gov TxT guide", href: "https://www.texas.gov/texas-by-texas/", external: true }],
      },
      {
        heading: "What you can currently do in TxT",
        paragraphs: ["Texas.gov currently lists driver license and ID renewal, replacement and address changes; certain driver-license upgrades; personal vehicle-registration renewal; and selected services from other participating agencies. Available services can expand, so the official TxT page is the current source of truth."],
        links: [{ label: "Texas.gov driver services", href: "https://www.texas.gov/driver-services/", external: true }],
      },
      {
        heading: "What you need to create an account",
        paragraphs: ["Texas.gov currently says account creation requires a personal email address, mobile phone number, a current Texas driver license or ID and a Social Security number for identity verification. Confirm current requirements with Texas.gov before starting."],
        links: [{ label: "Create or learn about a TxT account", href: "https://www.texas.gov/texas-by-texas/", external: true }],
      },
    ],
    related: [{ label: "Track a Texas driver license", href: "/track-texas-drivers-license" }, { label: "Texas driver license", href: "/texas-drivers-license" }, { label: "Texas vehicle registration", href: "/texas-vehicle-registration" }, { label: "Texas resources", href: "/texas-resources" }],
    faq: [
      { question: "Is TxT an official Texas government service?", answer: "Yes. Texas by Texas (TxT) is provided through Texas.gov as the state's official digital government assistant and account system." },
      { question: "Can I renew my vehicle registration in TxT?", answer: "Texas.gov currently lists personal vehicle-registration renewal as a supported TxT service. Eligibility and available transactions should be confirmed in the official account." },
      { question: "Can I use TxT for a Texas driver license?", answer: "Texas.gov currently lists several eligible driver-license and ID transactions in TxT, including renewal, replacement and address changes. Not every transaction or applicant is necessarily eligible for online completion." },
    ],
  },

  "replace-texas-registration-receipt": {
    eyebrow: "Texas driving",
    title: "How to Replace a Lost Texas Vehicle Registration Receipt",
    intro: "Lost the receipt that proves your Texas vehicle registration? TxDMV provides a duplicate-receipt process using Form VTR-275, identification and the current duplicate-receipt fee.",
    updated: "September 1, 2026",
    quickAnswer: "TxDMV says a duplicate receipt for the current registration period can be requested with Form VTR-275, a copy of current government-issued photo identification and a $2 fee. Requests may be made through TxDMV or a county tax office using the methods the agency allows.",
    sections: [
      {
        heading: "What TxDMV requires for a duplicate receipt",
        paragraphs: ["TxDMV's current FAQ lists three core items: a completed Request for Texas Motor Vehicle Information (Form VTR-275), a copy of the applicant's current driver license or other government-issued photo identification, and the $2 duplicate-receipt fee."],
        links: [{ label: "TxDMV duplicate-registration FAQ", href: "https://www.txdmv.gov/faqs?field_faq_category_target_id=All&find=Registration+duplicate+", external: true }, { label: "Official Form VTR-275", href: "https://www.txdmv.gov/sites/default/files/form_files/VTR-275.pdf", external: true }],
      },
      {
        heading: "Where to submit the request",
        paragraphs: ["TxDMV says duplicate registration receipts may be requested in person or by mail. Its FAQ directs motorists to TxDMV regional service centers or local county tax offices and explains the payment method for mailed requests. County payment methods can differ."],
        links: [{ label: "TxDMV regional service centers", href: "https://www.txdmv.gov/regional-service-centers", external: true }, { label: "Find a Texas county tax office", href: "/find-my-dmv" }],
      },
      {
        heading: "Receipt versus registration sticker",
        paragraphs: ["A duplicate registration receipt is not the same transaction as replacing a lost registration sticker. TxDMV publishes a separate replacement-sticker process and fee, so use the form that matches what is actually missing."],
        links: [{ label: "TxDMV vehicle-registration information", href: "https://www.txdmv.gov/motorists/register-your-vehicle", external: true }, { label: "Texas vehicle-registration guide", href: "/texas-vehicle-registration" }],
      },
    ],
    related: [{ label: "Texas vehicle registration", href: "/texas-vehicle-registration" }, { label: "Texas DMV", href: "/texas-dmv" }, { label: "Find my DMV or county office", href: "/find-my-dmv" }, { label: "Texas by Texas (TxT)", href: "/texas-by-texas-txt" }],
    faq: [
      { question: "How much is a duplicate Texas registration receipt?", answer: "TxDMV currently lists a $2 fee for a duplicate registration receipt for the current registration period." },
      { question: "What form replaces a lost Texas registration receipt?", answer: "TxDMV currently directs applicants to Form VTR-275, Request for Texas Motor Vehicle Information." },
      { question: "Is a lost registration receipt the same as a lost sticker?", answer: "No. TxDMV treats a duplicate registration receipt and a replacement registration sticker as separate transactions with different requirements and fees." },
    ],
  },

  "texas-toll-tags": {
    eyebrow: "Texas driving",
    title: "EZ TAG vs. TxTag vs. TollTag: Which Texas Toll Tag Do You Need?",
    intro: "Texas has several toll-tag brands, but drivers do not generally need a separate tag for Houston, Austin and Dallas. The major Texas systems interoperate on Texas toll roads, while account features and local conveniences can differ by issuer.",
    updated: "September 1, 2026",
    quickAnswer: "You generally do not need three Texas toll tags. NTTA states that a TollTag works on other Texas toll roads, including lanes marked EZ TAG or TxTag, when the account is in good standing and the vehicle plate is correctly listed. Choose an issuer based on account terms and useful local features, not because the tag only works in one Texas region.",
    sections: [
      {
        heading: "The three names describe different issuers, not three isolated road networks",
        paragraphs: ["TollTag is issued by the North Texas Tollway Authority. EZ TAG is associated with the Harris County Toll Road Authority in the Houston area. TxTag is the statewide-branded toll account historically associated with Central Texas operations. For ordinary Texas toll-road travel, interoperability matters more than the logo on the windshield."],
        links: [{ label: "NTTA TollTag travel coverage", href: "https://www.ntta.org/plan-your-trip", external: true }, { label: "HCTRA EZ TAG", href: "https://www.hctra.org/", external: true }, { label: "TxTag", href: "https://www.txtag.org/", external: true }],
      },
      {
        heading: "Can TollTag, EZ TAG and TxTag be used outside their home region?",
        paragraphs: ["Yes, major Texas toll-tag systems are interoperable on Texas toll roads. NTTA explicitly says TollTag can be used on Texas toll roads from Austin to Houston and in lanes displaying EZ TAG or TxTag signs, subject to account and vehicle requirements. HCTRA likewise describes EZ TAG use across participating Texas electronic toll facilities."],
        links: [{ label: "NTTA: other Texas toll roads", href: "https://www.ntta.org/plan-your-trip", external: true }, { label: "HCTRA account information", href: "https://www.hctra.org/", external: true }],
      },
      {
        heading: "How to choose a Texas toll tag",
        paragraphs: ["Compare the issuer's current account requirements, payment settings, customer service, parking or airport features and any local benefits you actually use. For example, NTTA documents TollTag payment options at DFW Airport and Dallas Love Field. Features and terms can change, so verify them before opening an account."],
        links: [{ label: "NTTA TollTag details", href: "https://www.ntta.org/plan-your-trip", external: true }, { label: "Moving to Texas", href: "/moving-to-texas" }],
      },
      {
        heading: "Avoid duplicate-tag billing problems",
        paragraphs: ["If multiple active toll tags are mounted or associated with the same vehicle, verify each issuer's instructions before traveling. Keep the correct license plate and payment method on the account, and close or deactivate accounts you no longer intend to use according to the issuer's current process."],
      },
    ],
    related: [{ label: "Moving to Texas", href: "/moving-to-texas" }, { label: "Texas vehicle registration", href: "/texas-vehicle-registration" }, { label: "Texas DMV", href: "/texas-dmv" }, { label: "Texas resources", href: "/texas-resources" }],
    faq: [
      { question: "Do I need EZ TAG, TxTag and TollTag in Texas?", answer: "Generally, no. Major Texas toll-tag systems are interoperable on Texas toll roads. Choose one account that fits your needs and verify the issuer's current coverage and account terms." },
      { question: "Will a TollTag work in Houston and Austin?", answer: "NTTA says TollTag works on other Texas toll roads, including lanes that display EZ TAG or TxTag signs, when the account is in good standing and the vehicle plate is listed correctly." },
      { question: "Which Texas toll tag is best?", answer: "There is no universally best tag. Compare issuer account terms and extras you may use, such as local customer service or airport-parking features, because basic Texas toll-road interoperability overlaps." },
    ],
  },

  "start-a-business-in-texas": {
    eyebrow: "Texas business",
    title: "How to Start a Business in Texas",
    intro: "A practical map of the Texas business-startup process: choose a structure, register where required, obtain federal and state tax accounts, identify licenses and permits, and check local requirements before opening.",
    updated: "September 1, 2026",
    quickAnswer: "Texas does not require a general statewide business license, but that does not mean every business is license-free. The setup path can involve a Secretary of State or county filing, an IRS EIN, Texas Comptroller tax registration, activity-specific permits or professional licenses, and city or county requirements.",
    sections: [
      {
        heading: "Choose the business structure first",
        paragraphs: ["The filing path depends on whether the business operates as a sole proprietorship, partnership, corporation, LLC or another form. Texas.gov recommends choosing the structure before registration because liability, governance, taxes and filing obligations differ."],
        links: [{ label: "Governor's official Start a Business in Texas guide", href: "https://gov.texas.gov/business/page/start-a-business", external: true }],
      },
      {
        heading: "Register the business where the structure requires",
        paragraphs: ["Texas filing entities such as LLCs and corporations generally file formation documents with the Texas Secretary of State. Other names and structures can involve county-level assumed-name filings. Use the Secretary of State and local county clerk instructions for the structure you actually choose."],
        links: [{ label: "Texas Secretary of State business organizations", href: "https://www.sos.state.tx.us/corp/index.shtml", external: true }],
      },
      {
        heading: "Handle federal and Texas tax registration",
        paragraphs: ["An employer identification number is issued by the IRS, not the State of Texas. Texas tax responsibilities are administered by the Comptroller. Sales-tax permits, franchise-tax obligations and other accounts depend on the entity and business activity."],
        links: [{ label: "IRS employer identification numbers", href: "https://www.irs.gov/businesses/small-businesses-self-employed/employer-id-numbers", external: true }, { label: "Texas Comptroller business resources", href: "https://comptroller.texas.gov/taxes/permit/", external: true }],
      },
      {
        heading: "Texas has no general business license, but specific permits may apply",
        paragraphs: ["The Governor's Business Permit Office states that Texas does not require a general business license. Specific occupations and activities can still require state licenses, permits, certifications or registrations, and local governments may impose additional requirements."],
        links: [{ label: "Texas Business Permit Office", href: "https://gov.texas.gov/business/page/business-permits-office", external: true }],
      },
      {
        heading: "Check the local layer before opening",
        paragraphs: ["City and county rules can affect zoning, certificates of occupancy, food service, signage, health permits and other operating requirements. State formation does not substitute for local approval where a local rule applies."],
        links: [{ label: "Texas resources", href: "/texas-resources" }],
      },
    ],
    related: [{ label: "Texas resources", href: "/texas-resources" }, { label: "Texas sales tax explained", href: "/texas-sales-tax-explained" }, { label: "Moving to Texas", href: "/moving-to-texas" }, { label: "Texas guidebook", href: "/guides" }],
    faq: [
      { question: "Does Texas require a general business license?", answer: "No. The Governor's Business Permit Office says Texas does not require a general business license, although specific activities and professions can require licenses, permits or registrations." },
      { question: "Do I need an LLC to start a business in Texas?", answer: "No single entity type is required for every Texas business. The appropriate structure depends on ownership, liability, tax and governance considerations." },
      { question: "Where do Texas LLCs file?", answer: "Texas LLC formation documents are filed with the Texas Secretary of State. Separate federal, state-tax, licensing and local requirements may also apply." },
    ],
  },

  "everything-bigger-in-texas": {
    eyebrow: "Texas facts",
    title: "Is Everything Really Bigger in Texas? Famous Texas Size Claims Fact-Checked",
    intro: "The slogan is a joke, but some of Texas's best-known size claims are real. Here are a few Texas-scale facts that hold up when checked against authoritative sources—and a reminder not to turn a slogan into a statistic.",
    updated: "September 1, 2026",
    quickAnswer: "No, not literally everything is bigger in Texas. But several famous examples are genuinely enormous: the Texas State Historical Association describes King Ranch at about 825,000 acres, larger than Rhode Island, while Texas Parks and Wildlife identifies Bracken Cave near San Antonio as home to the world's largest known bat colony.",
    sections: [
      {
        heading: "King Ranch really is larger than Rhode Island",
        paragraphs: ["The Texas State Historical Association describes King Ranch as roughly 825,000 acres, or nearly 1,300 square miles, spread across four divisions in South Texas. TSHA states that its area is larger than the state of Rhode Island."],
        links: [{ label: "Texas State Historical Association: King Ranch", href: "https://www.tshaonline.org/handbook/entries/king-ranch", external: true }, { label: "King Ranch official maps", href: "https://king-ranch.com/about-us/maps/", external: true }],
      },
      {
        heading: "Bracken Cave is a world-scale bat colony",
        paragraphs: ["Texas Parks and Wildlife identifies Bracken Cave Preserve near San Antonio as the world's largest known bat colony and says it is home to more than 15 million Mexican free-tailed bats. Colony estimates vary over time, so the current agency figure is more useful than repeating a fixed viral number."],
        links: [{ label: "TPWD: Bracken Cave Preserve", href: "https://tpwd.texas.gov/huntwild/wild/species/bats/bat-watching-sites/bracken-cave-preserve.phtml", external: true }],
      },
      {
        heading: "Texas itself is huge—but second in U.S. land area",
        paragraphs: ["Texas is the largest state in the contiguous United States by area, but Alaska is larger overall. That distinction is a useful example of why 'bigger in Texas' claims should be checked rather than repeated automatically."],
        links: [{ label: "Texas facts", href: "/texas-facts" }, { label: "Texas icons", href: "/texas-icons" }],
      },
      {
        heading: "Treat the slogan as culture, then verify the numbers",
        paragraphs: ["'Everything is bigger in Texas' works because it compresses Texas geography, ranching, highways, cities, food and state pride into one memorable line. TexasDefined treats each specific superlative as a factual claim that needs its own source, date and definition."],
        links: [{ label: "Things unique to Texas", href: "/things-unique-to-texas" }, { label: "Texas history", href: "/texas-history" }],
      },
    ],
    related: [{ label: "Texas facts", href: "/texas-facts" }, { label: "Texas icons", href: "/texas-icons" }, { label: "Things unique to Texas", href: "/things-unique-to-texas" }, { label: "Texas history", href: "/texas-history" }],
    faq: [
      { question: "Is King Ranch really bigger than Rhode Island?", answer: "Yes. The Texas State Historical Association describes King Ranch at about 825,000 acres, nearly 1,300 square miles, and larger in area than Rhode Island." },
      { question: "Does Texas have the world's largest bat colony?", answer: "Texas Parks and Wildlife identifies Bracken Cave Preserve near San Antonio as the world's largest known bat colony and currently describes it as home to more than 15 million Mexican free-tailed bats." },
      { question: "Is Texas the largest U.S. state?", answer: "No. Alaska is larger. Texas is the largest state in the contiguous United States." },
    ],
  },

  "what-does-chud-mean": {
    eyebrow: "Texas slang watch",
    title: "What Does 'Chud' Mean? Why Texans Were Searching the Slang Term in 2026",
    intro: "Chud is contemporary internet slang, not traditional Texas slang. The term drew unusual Texas search interest in 2026, so this guide separates the dictionary meaning, online political usage and Texas search-trend context.",
    updated: "September 1, 2026",
    quickAnswer: "Merriam-Webster defines 'chud' as a generalized insult similar to fool, jerk or troll and notes a more specific political use in which it can be a left-wing insult for someone viewed as far right. A 2026 Google Trends analysis reported by multiple outlets ranked 'chud' as Texas's most-searched slang term for the January 1–August 17 period. That does not make the word Texas slang.",
    sections: [
      {
        heading: "What chud means in current slang",
        paragraphs: ["Merriam-Webster's slang reference describes chud as a disparaging noun for someone viewed as foolish, rude, boorish, regressive or troll-like. The exact force depends on context, and it is normally insulting rather than neutral."],
        links: [{ label: "Merriam-Webster slang: chud", href: "https://www.merriam-webster.com/slang/chud", external: true }],
      },
      {
        heading: "The political meaning is narrower",
        paragraphs: ["Merriam-Webster also notes that in online political discourse the word is often used specifically as a left-wing insult for a far-right person. That political usage is one subset of the broader insult, not the only meaning of the word."],
        links: [{ label: "Merriam-Webster usage and origin", href: "https://www.merriam-webster.com/slang/chud", external: true }],
      },
      {
        heading: "Why the word showed up in Texas search data in 2026",
        paragraphs: ["A 2026 analysis attributed to Unscramblerer.com used Google Trends data from January 1 through August 17 and was reported by Texas-area media as placing 'chud' first among slang searches in Texas. Search-trend rankings are snapshots of a period and methodology; they do not establish regional origin or traditional usage."],
        links: [{ label: "2026 Texas search-trend report", href: "https://www.audacy.com/jackontheweb/latest/chud-larping-and-bird-were-the-most-searched-slang-words-in-texas-in-2026", external: true }],
      },
      {
        heading: "Is chud Texas slang?",
        paragraphs: ["No evidence supports treating chud as a traditional Texas regionalism. Its modern history is tied to internet culture, with Merriam-Webster discussing a possible connection to the 1984 science-fiction film C.H.U.D. Texas search interest in 2026 is a trend story, not an origin story."],
        links: [{ label: "Texas slang explained", href: "/texas-slang-explained" }, { label: "Texas slang and folklore", href: "/things-unique-to-texas/slang-folklore" }],
      },
    ],
    related: [{ label: "Texas slang explained", href: "/texas-slang-explained" }, { label: "Texas slang and folklore", href: "/things-unique-to-texas/slang-folklore" }, { label: "Things unique to Texas", href: "/things-unique-to-texas" }, { label: "Texas facts", href: "/texas-facts" }],
    faq: [
      { question: "What does chud mean?", answer: "In current slang, Merriam-Webster describes chud as a generalized insult similar to fool, jerk or troll. Context can make it more specifically political." },
      { question: "Is chud a political insult?", answer: "It can be. Merriam-Webster notes that in online political discourse it is often used as a left-wing insult for someone viewed as far right, while broader nonpolitical insulting uses also exist." },
      { question: "Is chud Texas slang?", answer: "No. A 2026 search-trend analysis reported high Texas interest in the term, but the word is contemporary internet slang rather than a traditional Texas regional expression." },
    ],
  },
};
