import type { PrioritySearchPageData } from "@/components/editorial/PrioritySearchPage";

const relatedServices = [
  { label: "Texas resources", href: "/texas-resources" },
  { label: "Find my DMV", href: "/find-my-dmv" },
  { label: "Texas guidebook", href: "/guides" },
  { label: "Texas vs every state", href: "/texas-vs-every-state" },
] as const;

export const PRIORITY_SEARCH_PAGES: Record<string, PrioritySearchPageData> = {
  "texas-fishing-license": {
    eyebrow: "Texas outdoors",
    title: "Texas Fishing License: Requirements, Options and Official Links",
    intro: "What to know before you fish Texas public waters, including freshwater and saltwater endorsements, resident and nonresident options, exceptions, digital licenses and where to buy an official license.",
    updated: "November 12, 2026",
    quickAnswer: "For public waters, most anglers need a Texas fishing license with the freshwater or saltwater endorsement that matches the water. A resident freshwater package is $30, saltwater $35 and all-water $40 under the current TPWD schedule. Exceptions include children under 17 and most fishing within Texas State Park boundaries; check the exceptions and 2026 ID rules below.",
    sections: [
      {
        "heading": "Which license should you buy?",
        "paragraphs": [
          "A freshwater package covers public lakes and rivers. A saltwater package covers coastal waters. If you fish both, an all-water package avoids buying separate endorsements. The numbers below are TPWD's posted recreational package fees, not estimates; confirm the package in the official store before paying.",
          "For example, a Texas resident planning a weekend at Lake Conroe generally needs the $30 resident freshwater package unless an exception applies. A resident fishing Galveston Bay instead generally needs the $35 saltwater package. Someone fishing both could choose the $40 resident all-water package. These examples concern ordinary adult recreational anglers, not commercial fishing or guide licenses."
        ],
        "table": {
          "caption": "Texas Parks and Wildlife recreational fishing license package fees — official fee schedule checked November 12, 2026",
          "columns": [
            "Package",
            "Texas resident",
            "Nonresident"
          ],
          "rows": [
            [
              "Freshwater (standard)",
              "$30",
              "$58"
            ],
            [
              "Saltwater (standard)",
              "$35",
              "$63"
            ],
            [
              "All-water (standard)",
              "$40",
              "$68"
            ],
            [
              "One-day all-water",
              "$11",
              "$16"
            ],
            [
              "Senior resident freshwater (65+)",
              "$12",
              "Not applicable"
            ],
            [
              "Senior resident saltwater (65+)",
              "$17",
              "Not applicable"
            ],
            [
              "Senior resident all-water (65+)",
              "$22",
              "Not applicable"
            ],
            [
              "Year-from-purchase all-water",
              "$47",
              "Not available"
            ]
          ]
        },
        "links": [
          {
            "label": "TPWD official packages and fees",
            "href": "https://tpwd.texas.gov/regulations/outdoor-annual/licenses/fishing-licenses-stamps-tags-packages/fishing-licenses-and-packages",
            "external": true
          }
        ]
      },
      {
        "heading": "Understand the license year before buying",
        "paragraphs": [
          "Most standard annual freshwater, saltwater and all-water packages expire August 31 of the license year, regardless of when you purchase them. That means an ordinary annual license bought late in August has a shorter useful life than one bought in early September. TPWD also sells a $47 year-from-purchase all-water package for Texas residents, valid through the end of the purchase month in the following license year.",
          "A one-day all-water license is a different choice: select the day you intend to fish. For a short visit, compare that cost against an annual package before buying. License fees are nonrefundable and cannot be transferred or exchanged."
        ],
        "links": [
          {
            "label": "TPWD license duration and purchasing options",
            "href": "https://tpwd.texas.gov/regulations/outdoor-annual/licenses/fishing-licenses-stamps-tags-packages/fishing-licenses-and-packages",
            "external": true
          }
        ]
      },
      {
        "heading": "Who can fish without buying a license?",
        "paragraphs": [
          "Everyone under age 17 is exempt from the recreational fishing-license requirement, whether resident or nonresident. Texas residents born before January 1, 1931 are also exempt. Other exemptions are narrower, including specific disability-related supervised fishing and certain older Louisiana or Oklahoma nonresidents. Age 65 alone does not make most Texas residents exempt; discounted senior packages generally apply.",
          "Within the boundaries of a Texas State Park, visitors can generally fish without buying a fishing license or endorsement. This is not a blanket exemption for every city, county or Corps of Engineers park, and the state-park exception does not cancel bag limits, length limits or special tagging rules. Check the park boundary with staff, especially on a shoreline that crosses park property."
        ],
        "links": [
          {
            "label": "TPWD license exemptions",
            "href": "https://tpwd.texas.gov/regulations/outdoor-annual/licenses/fishing-licenses-stamps-tags-packages/fishing-licenses-and-packages",
            "external": true
          },
          {
            "label": "TPWD state park fishing FAQ",
            "href": "https://tpwd.texas.gov/fishboat/fish/programs/familyfish/faqs/",
            "external": true
          }
        ]
      },
      {
        "heading": "ID checks changed on August 3, 2026",
        "paragraphs": [
          "TPWD's new purchase requirement means a recreational hunting or fishing license holder age 17 or older must be present and show valid proof of identification for an in-person purchase. An unexpired REAL ID from a U.S. state or territory satisfies the ID rule. Temporary or limited-term driver licenses and ID documents may require additional supporting documentation.",
          "Online buyers must have each individual license holder's identity verified. TPWD says foreign residents cannot currently purchase online. Check the official ID validation guidance before travelling to a retailer, and avoid a third-party site that requests identity information without an official state checkout."
        ],
        "links": [
          {
            "label": "Official 2026 TPWD purchase and ID requirements",
            "href": "https://tpwd.texas.gov/regulations/outdoor-annual/licenses/purchase-requirements",
            "external": true
          }
        ]
      },
      {
        "heading": "Freshwater versus saltwater endorsements",
        "paragraphs": [
          "A freshwater endorsement is ordinarily required in Texas public fresh water, and a saltwater endorsement is ordinarily required in Texas public salt water when a license is required. These endorsements are already included in the corresponding packages in the table above; do not add the same endorsement twice. A red drum tag and spotted seatrout tag may come with qualifying saltwater packages under TPWD's current rules.",
          "Fish limits still depend on the waterbody and species. A freshwater package does not exempt you from lake-specific length or bag limits; a coastal package does not replace rules for red drum, spotted seatrout or other regulated species. Check the Outdoor Annual before the trip, not only the license receipt."
        ],
        "links": [
          {
            "label": "TPWD fishing endorsements",
            "href": "https://tpwd.texas.gov/regulations/outdoor-annual/licenses/fishing-licenses-stamps-tags-packages/fishing-endorsements-and-tags",
            "external": true
          },
          {
            "label": "2026–27 fishing regulations",
            "href": "https://tpwd.texas.gov/regulations/outdoor-annual/fishing/general-rules-regulations/general-fishing-regulations",
            "external": true
          }
        ]
      },
      {
        "heading": "Where to buy and what to keep",
        "paragraphs": [
          "Buy from TPWD's official online sales system or a listed authorized retailer. Have identification ready, confirm resident status, select the correct water type and season, review any required tags, and save the license or its permitted digital proof before leaving home.",
          "A common mistake is buying an annual freshwater package when you intend to fish a coastal bay, or assuming a state-park fishing exemption applies to a nearby municipal shoreline. Check the actual location on a map before paying; if you change plans after purchase, license fees are not refundable."
        ],
        "links": [
          {
            "label": "Official TPWD online sales",
            "href": "https://tpwd.texas.gov/business/licenses/online_sales/index.phtml",
            "external": true
          },
          {
            "label": "Texas fishing access directory",
            "href": "/fishing/access"
          },
          {
            "label": "Texas fishing regulations",
            "href": "/fishing/regulations"
          }
        ]
      }
    ],
    related: [{ label: "Texas fishing", href: "/fishing" }, { label: "Fishing regulations", href: "/fishing/regulations" }, { label: "Texas lakes", href: "/fishing/lakes" }, { label: "Best places to camp in Texas", href: "/best-places-to-go-camping-in-texas" }],
  },
  "texas-drivers-license": {
    eyebrow: "Texas driving",
    title: "Texas Driver License: Renewals, Appointments, REAL ID and Address Changes",
    intro: "A practical Texas driver-license guide covering who runs the system, online services, office appointments, renewals, replacements, REAL ID and address changes.",
    updated: "November 12, 2026",
    quickAnswer: "Texas driver licenses are issued by the Texas Department of Public Safety, not TxDMV. DPS handles driver-license and ID services; TxDMV handles vehicle titles and registration.",
    sections: [
      {
        "heading": "Choose the correct DPS transaction",
        "paragraphs": [
          "A first Texas driver license is not the same transaction as renewing one you already have. First-time applicants, new residents exchanging an out-of-state license, people changing legal names and applicants needing an in-person vision or identity check may have different appointment and document requirements. Start with DPS, not TxDMV or the county tax office.",
          "If an existing Texas license is still valid or expired less than two years ago, check online renewal eligibility before booking an appointment. For a replacement card or address correction, use the corresponding DPS service instead of a first-time application. Commercial licenses, limited-term documents and applicants age 79 or older have additional restrictions."
        ],
        "table": {
          "caption": "Where to begin: Texas DPS driver license transactions",
          "columns": [
            "Your situation",
            "First step",
            "Common pitfall"
          ],
          "rows": [
            [
              "First Texas license",
              "Check DPS first-time application and documents; book appointment",
              "An online renewal portal cannot issue a first license"
            ],
            [
              "Renew existing Texas license",
              "Check online/phone renewal eligibility",
              "Not everyone can renew online two consecutive times"
            ],
            [
              "Replace lost or damaged card",
              "DPS replacement service",
              "A replacement is not an extension of expiration"
            ],
            [
              "Update residential address",
              "DPS change-of-address process",
              "Mailing address and physical residence rules differ"
            ],
            [
              "Card mailed but missing",
              "DPS card-status tracker",
              "TxDMV does not issue or track driver licenses"
            ]
          ]
        },
        "links": [
          {
            "label": "DPS driver-license applications",
            "href": "https://www.dps.texas.gov/section/driver-license",
            "external": true
          },
          {
            "label": "Texas license delivery tracking",
            "href": "/track-texas-drivers-license",
            "external": false
          }
        ]
      },
      {
        "heading": "Online renewal: the main eligibility rules",
        "paragraphs": [
          "DPS lists a number of conditions for standard online or telephone renewal: the previous renewal was in person, the applicant is generally under age 79, the license is in good standing, and it is within the permitted renewal window. Certain CDL endorsements, provisional or limited-term licenses and records requiring a citizenship or lawful-presence check are excluded.",
          "DPS generally permits standard renewal within two years before expiration or less than two years afterward. Even when a license is eligible by date, an outstanding license-status issue or a changed medical or vision condition may require visiting an office. Confirm eligibility inside the official DPS service rather than assuming the checklist guarantees approval."
        ],
        "links": [
          {
            "label": "DPS renewal rules and options",
            "href": "https://www.dps.texas.gov/section/driver-license/renew-your-texas-dl-cdl-motorcycle-license-or-id",
            "external": true
          },
          {
            "label": "DPS license eligibility",
            "href": "https://www.dps.texas.gov/section/driver-license",
            "external": true
          }
        ]
      },
      {
        "heading": "Documents to check before an appointment",
        "paragraphs": [
          "DPS may require proof of identity, Texas residency, Social Security number, U.S. citizenship or lawful presence and vehicle-registration or insurance-related documentation when applicable. The required combinations depend on whether you are applying for a first license, changing a name, renewing a limited-term credential or replacing a card.",
          "Do not rely on a generic list copied from another state. Use the DPS document checklist for your exact transaction. Bring original or otherwise acceptable documents, confirm names and dates match, and verify that your appointment location performs the service you need."
        ],
        "links": [
          {
            "label": "DPS official driver license checklist",
            "href": "https://www.dps.texas.gov/section/driver-license",
            "external": true
          },
          {
            "label": "DPS appointment and application FAQ",
            "href": "https://www.dps.texas.gov/section/driver-license/faq/section-1-applying-or-renewing-driver-license-identification-card-or",
            "external": true
          }
        ]
      },
      {
        "heading": "REAL ID: what it does and does not mean",
        "paragraphs": [
          "REAL ID is a federal identification standard for certain purposes, including domestic air travel and access to some federal facilities. A compliant Texas license or ID generally has the required star marking. It does not replace a passport for international travel or guarantee that every name-change or identity situation can be handled online.",
          "If your current Texas card is not compliant, check DPS instructions before scheduling a visit. An applicant who needs additional documentation for REAL ID may be unable to renew online even if the card's expiration date is within the ordinary renewal window."
        ],
        "links": [
          {
            "label": "DPS driver license and REAL ID information",
            "href": "https://www.dps.texas.gov/section/driver-license",
            "external": true
          }
        ]
      },
      {
        "heading": "After you apply: temporary credentials and tracking",
        "paragraphs": [
          "A successful online or in-person transaction may provide a temporary credential while DPS prints and mails the permanent card. Preserve the temporary document and follow the restrictions printed on it. DPS says mailing usually takes two to three weeks from the transaction date.",
          "If the permanent card has not arrived, use DPS's card-status lookup. Do not enter your driver license number or birth date on a third-party tracking website. TexasDefined does not receive applications or track individual records."
        ],
        "links": [
          {
            "label": "Track your Texas driver license",
            "href": "/track-texas-drivers-license",
            "external": false
          },
          {
            "label": "DPS official license status",
            "href": "https://www.dps.texas.gov/section/driver-license/wheres-my-driver-license-or-id-card",
            "external": true
          }
        ]
      },
      {
        "heading": "Driver license versus vehicle paperwork",
        "paragraphs": [
          "The Texas Department of Public Safety issues driver licenses and state ID cards. The Texas Department of Motor Vehicles and county tax offices handle vehicle title and registration transactions. A new resident may need both, but should not assume they happen at the same office or on the same timetable.",
          "Use the registration guide for plate, sticker, emissions and title questions; use DPS for driving privileges, identification and appointment booking."
        ],
        "links": [
          {
            "label": "Texas DMV and TxDMV services",
            "href": "/texas-dmv",
            "external": false
          },
          {
            "label": "Texas vehicle registration",
            "href": "/texas-vehicle-registration",
            "external": false
          },
          {
            "label": "Moving to Texas",
            "href": "/moving-to-texas",
            "external": false
          }
        ]
      }
    ],
    related: [{ label: "Texas DMV", href: "/texas-dmv" }, { label: "Texas vehicle registration", href: "/texas-vehicle-registration" }, { label: "Find my DMV", href: "/find-my-dmv" }, { label: "Moving to Texas", href: "/moving-to-texas" }],
  },
  "texas-dmv": {
    eyebrow: "Texas driving",
    title: "Texas DMV: Vehicle Registration, Titles and TxDMV Services",
    intro: "What the Texas Department of Motor Vehicles actually handles, how it differs from DPS, and where to go for registration, titles, dealer and motor-carrier services.",
    updated: "November 12, 2026",
    quickAnswer: "TxDMV handles vehicle registration, titles, dealer licensing and motor-carrier services. Texas DPS handles driver licenses and identification cards.",
    sections: [
      {
        "heading": "Which Texas agency handles your task?",
        "paragraphs": [
          "Texas divides driving paperwork between the Department of Public Safety (DPS), the Texas Department of Motor Vehicles (TxDMV), and county tax assessor-collector offices. DPS issues driver licenses and state IDs. TxDMV sets statewide title and registration rules, while many motorist transactions are completed through county tax offices.",
          "This matters most when a person searches for a nearby “DMV” and arrives at an office that does not provide the requested service. Before you travel, check the responsible agency, office, acceptable payment methods and whether the task is available online."
        ],
        "table": {
          "caption": "Texas driver and vehicle agencies",
          "columns": [
            "Task",
            "Responsible office or system",
            "Start here"
          ],
          "rows": [
            [
              "Driver license, ID or REAL ID",
              "Texas DPS",
              "DPS driver license services"
            ],
            [
              "Vehicle registration renewal",
              "TxDMV / TxT / county tax office",
              "Vehicle registration renewal guide"
            ],
            [
              "Title transfer, registration receipt",
              "County tax office / TxDMV",
              "Texas vehicle registration guide"
            ],
            [
              "Dealer licensing or motor carriers",
              "Texas Department of Motor Vehicles",
              "TxDMV official site"
            ],
            [
              "Property tax or license plate fees",
              "County tax office / published TxDMV fees",
              "Registration fees and taxes guide"
            ]
          ]
        },
        "links": [
          {
            "label": "Official TxDMV",
            "href": "https://www.txdmv.gov/",
            "external": true
          },
          {
            "label": "Official DPS driver license",
            "href": "https://www.dps.texas.gov/section/driver-license",
            "external": true
          }
        ]
      },
      {
        "heading": "Registration and title are separate transactions",
        "paragraphs": [
          "Renewing a registration sticker does not transfer ownership of a vehicle. A buyer or seller handling a Texas title transfer needs the appropriate title paperwork, tax treatment and county submission method. Other cases such as a lost title, out-of-state vehicle or gifted vehicle have separate requirements.",
          "If you only need to renew, use the dedicated renewal instructions. If you bought a vehicle, begin with the title and registration requirements instead of using the renewal portal. A receipt replacement is also distinct from obtaining a new sticker."
        ],
        "links": [
          {
            "label": "Register your vehicle — TxDMV",
            "href": "https://www.txdmv.gov/motorists/register-your-vehicle",
            "external": true
          },
          {
            "label": "Texas registration guide",
            "href": "/texas-vehicle-registration",
            "external": false
          },
          {
            "label": "Renewal instructions",
            "href": "/texas-vehicle-registration-renewal",
            "external": false
          },
          {
            "label": "Replace registration receipt",
            "href": "/replace-texas-registration-receipt",
            "external": false
          }
        ]
      },
      {
        "heading": "Where fees, taxes and emissions rules differ",
        "paragraphs": [
          "Statewide registration rates do not tell you the full amount due. County charges, vehicle type, specialty plates, transfer fees and sales/use tax can change a transaction. Texas also has a separate electric-vehicle registration fee regime.",
          "For most noncommercial vehicles the statewide annual safety-inspection requirement ended January 1, 2025. Emissions inspections can still apply in designated counties; commercial vehicles remain subject to different safety rules. Check the registration guide for the current county list before assuming no inspection is required."
        ],
        "links": [
          {
            "label": "Official TxDMV register your vehicle",
            "href": "https://www.txdmv.gov/motorists/register-your-vehicle",
            "external": true
          },
          {
            "label": "Texas registration fees and taxes",
            "href": "/texas-vehicle-registration-fees-taxes",
            "external": false
          }
        ]
      },
      {
        "heading": "A practical checklist before visiting an office",
        "paragraphs": [
          "Write down the exact transaction, county of residence, vehicle type and whether you have title or registration documents in hand. Then verify the location and hours on the official TxDMV or county page. Some county subcontractor locations only perform renewals and cannot process complicated title corrections.",
          "Use the official online service whenever eligible, but do not assume the state portal can fix every problem. Missing emissions records, an expired registration with a citation, unusual title ownership and certain commercial transactions can require an office visit."
        ],
        "links": [
          {
            "label": "Find your DMV or county office",
            "href": "/find-my-dmv",
            "external": false
          },
          {
            "label": "Texas by Texas services",
            "href": "/texas-by-texas-txt",
            "external": false
          }
        ]
      }
    ],
    related: [{ label: "Texas driver license", href: "/texas-drivers-license" }, { label: "Texas vehicle registration", href: "/texas-vehicle-registration" }, { label: "Find my DMV", href: "/find-my-dmv" }, { label: "Moving to Texas", href: "/moving-to-texas" }],
  },
  "texas-vehicle-registration": {
    eyebrow: "Texas driving",
    title: "Texas Vehicle Registration: Renewals, County Offices and TxDMV",
    intro: "A practical guide to Texas vehicle registration, including online renewal, county tax offices, registration notices, inspections and the difference between TxDMV and DPS.",
    updated: "August 20, 2026",
    quickAnswer: "Texas vehicle registration is a TxDMV program administered with county tax assessor-collector offices. Many registrations can be renewed online; driver-license services are handled separately by Texas DPS.",
    sections: [
      { heading: "How Texas vehicle registration works", paragraphs: ["TxDMV establishes statewide registration requirements while county tax assessor-collector offices handle many local registration and title transactions. The exact documents and fees depend on the transaction."], links: [{ label: "Official TxDMV registration information", href: "https://www.txdmv.gov/motorists/register-your-vehicle", external: true }] },
      { heading: "Renewing registration", paragraphs: ["Eligible vehicles can often be renewed online. Use the official TxDMV renewal system or your county office instructions and check the current inspection and emissions requirements that apply in your county."], links: [{ label: "TxDMV online services", href: "https://www.txdmv.gov/", external: true }, { label: "Find a local office", href: "/find-my-dmv" }] },
      { heading: "Registration is not a driver-license service", paragraphs: ["TxDMV handles registration and titles. DPS handles driver licenses and IDs. Keeping the two agencies straight can save an unnecessary office visit."], links: [{ label: "Texas driver-license guide", href: "/texas-drivers-license" }, { label: "Texas DMV guide", href: "/texas-dmv" }] },
    ],
    related: [{ label: "Texas DMV", href: "/texas-dmv" }, { label: "Texas driver license", href: "/texas-drivers-license" }, { label: "Find my DMV", href: "/find-my-dmv" }, { label: "Moving to Texas", href: "/moving-to-texas" }],
  },
  "texas-flag": {
    eyebrow: "Texas symbols",
    title: "Texas Flag: History, Meaning, Rules and the Lone Star",
    intro: "A complete starting point for the Texas flag: where the Lone Star design came from, what its colors represent, how Texas law describes the flag and how to display it respectfully.",
    updated: "November 12, 2026",
    quickAnswer: "The modern Texas flag uses one vertical blue stripe with a single white five-pointed star and two horizontal stripes, white over red. It was adopted by the Republic of Texas in 1839 and remains the state flag today.",
    sections: [
      {
        "heading": "What the flag looks like — and what the law specifies",
        "paragraphs": [
          "The state flag has a blue vertical field at the hoist containing one white five-pointed star. The remaining fly is split horizontally: white above red. Texas Government Code Chapter 3100 specifies the flag's overall length-to-width ratio as 3:2; the blue stripe spans one-third of the flag's length and the white and red stripes each fill half of the remaining field's height.",
          "A common illustration error is treating the flag as three equal vertical panels, moving the star into the center of the full flag or reversing the white and red horizontal stripes. The historical design file at the Texas State Library offers a reliable visual reference."
        ],
        "links": [
          {
            "label": "Texas Government Code, Chapter 3100",
            "href": "https://statutes.capitol.texas.gov/Docs/GV/pdf/GV.3100.pdf",
            "external": true
          },
          {
            "label": "State Library flag description",
            "href": "https://www.tsl.texas.gov/ref/abouttx/flagdes",
            "external": true
          }
        ]
      },
      {
        "heading": "How the Lone Star flag became the state flag",
        "paragraphs": [
          "The familiar Lone Star design was adopted by the Republic of Texas in 1839, years before Texas joined the United States. The design survived annexation and became central to state symbolism. Texas flags from the revolution and early republic period were not all identical, so the 1839 design should not be projected onto every earlier historic flag.",
          "For primary documents, compare the Republic-era design held by the Texas State Library and Archives Commission with later statutory language. Questions about who drew the earliest version deserve careful sourcing rather than a single unsourced designer attribution."
        ],
        "links": [
          {
            "label": "Texas State Library 1839 design",
            "href": "https://www.tsl.texas.gov/exhibits/texas175/flag.html",
            "external": true
          },
          {
            "label": "Flag history and chronology",
            "href": "/article/history-of-the-texas-flag",
            "external": false
          }
        ]
      },
      {
        "heading": "Blue, white, red and the Lone Star",
        "paragraphs": [
          "Texas law associates blue with loyalty, white with purity and red with bravery. These are statutory meanings, not scientific claims about color psychology. The single white star is the identifying feature of the Lone Star flag and a symbol used across many Texas institutions.",
          "Use the official state description for exact terminology. Historical stories about what particular individuals intended each element to mean may require separate documentary evidence."
        ],
        "links": [
          {
            "label": "Official law for the state flag",
            "href": "https://statutes.capitol.texas.gov/Docs/GV/pdf/GV.3100.pdf",
            "external": true
          }
        ]
      },
      {
        "heading": "Displaying the Texas and United States flags",
        "paragraphs": [
          "Flag order, height, placement, orientation and half-staff decisions depend on the setting. In ordinary joint displays, do not treat Texas as a nation entitled to outrank the United States flag. The dedicated flag etiquette guide walks through separate poles, vertical hanging, folding and half-staff examples.",
          "For schools, businesses and public events, check Texas Government Code requirements as well as the U.S. Flag Code where applicable. Images found through search can mistakenly reverse the flag when viewed from different sides."
        ],
        "links": [
          {
            "label": "Texas flag etiquette guide",
            "href": "/article/texas-flag-etiquette-display-guide",
            "external": false
          },
          {
            "label": "Texas flag statutes",
            "href": "https://statutes.capitol.texas.gov/Docs/GV/pdf/GV.3100.pdf",
            "external": true
          }
        ]
      },
      {
        "heading": "See related Texas symbols and their legal sources",
        "paragraphs": [
          "The Texas flag belongs in a larger set of designated state symbols. Many such emblems have their own legislation or historical records, and a popular nickname is not automatically an official designation.",
          "For the complete history of the flag and its changing design, use the historical article; for practical displays, use the etiquette guide. Those topics are maintained separately rather than repeating the same account on each page."
        ],
        "links": [
          {
            "label": "Texas state symbols",
            "href": "/texas-symbols",
            "external": false
          },
          {
            "label": "Texas history",
            "href": "/texas-history",
            "external": false
          }
        ]
      }
    ],
    related: [{ label: "Texas symbols", href: "/texas-symbols" }, { label: "Texas history", href: "/texas-history" }, { label: "Texas facts", href: "/texas-facts" }, { label: "Things unique to Texas", href: "/things-unique-to-texas" }],
  },
  "texas-state-fair": {
    eyebrow: "Texas events",
    title: "State Fair of Texas 2026: Dates, Hours, Tickets, Food, Rides and Fair Park",
    intro: "A current 2026 State Fair of Texas planning guide for Fair Park in Dallas, including hours, admission, parking and DART, coupons, discounts, new foods, Big Tex Choice Award winners, rides, college football, family planning and first-timer itineraries.",
    updated: "September 25, 2026",
    quickAnswer: "The 2026 State Fair of Texas is now open at Fair Park in Dallas and runs September 25 through October 18. Gates are open 10 a.m.–9 p.m. Sundays through Thursdays and 10 a.m.–10 p.m. Fridays and Saturdays, with last entry at 9 p.m. Ticket prices vary by day and discount, so check the official ticket page before you go.",
    sections: [
      {
        heading: "2026 dates, hours and Fair Park location",
        paragraphs: [
          "The 2026 State Fair of Texas runs Friday, September 25 through Sunday, October 18 at Fair Park in Dallas. The Fair is open 10 a.m.–9 p.m. Sundays through Thursdays and 10 a.m.–10 p.m. Fridays and Saturdays. Last entry is 9 p.m.",
          "Parking gates and ticket booths open daily at 9:30 a.m. The Midway opens at 11 a.m. Sundays through Fridays and 10 a.m. Saturdays. Fair Park museum hours can differ from the Fair's operating hours, so check individual museum schedules if they are part of your visit."
        ],
        links: [
          { label: "Official State Fair hours", href: "https://bigtex.com/faqs/fair-hours/", external: true },
          { label: "Official daily schedule", href: "https://bigtex.com/schedule/", external: true }
        ]
      },
      {
        heading: "2026 ticket prices and admission",
        paragraphs: [
          "State Fair admission is dynamically priced by day and discount. The Fair currently lists general admission from $7 to $25, children ages 3–12 from $7 to $10, children age 2 and younger free, and senior admission from $7 to $20. Season-pass options are also available.",
          "Because prices and promotions can change by date, buy from the official Fair ticket page and compare the day's general admission price with any discount that applies to you before checkout."
        ],
        links: [
          { label: "Official tickets and packages", href: "https://bigtex.com/buy-tickets-new/", external: true },
          { label: "Official discounts and ways to save", href: "https://bigtex.com/discounts/", external: true }
        ]
      },
      {
        heading: "Parking, DART and getting to Fair Park",
        paragraphs: [
          "Public transit is often the simplest option on high-traffic weekends. DART's Green Line serves Fair Park Station and MLK Jr. Station, giving visitors two rail access points near the fairgrounds.",
          "If you drive, use official Fair parking guidance and allow extra time for traffic around Fair Park. The Fair also publishes rideshare and taxi guidance, including designated pickup and drop-off information."
        ],
        links: [
          { label: "Official getting-here and parking guide", href: "https://bigtex.com/plan-your-visit/getting-here/", external: true },
          { label: "Dallas County guide", href: "/county/dallas" }
        ]
      },
      {
        heading: "How Food & Midway Coupons work",
        paragraphs: [
          "Food, Midway rides and Midway games use State Fair coupons rather than ordinary cash at the point of sale. One coupon is currently valued at $1, making the posted coupon price easy to translate into dollars.",
          "Unused coupons do not expire under the Fair's current policy, so older valid coupons can be used on a later visit. Merchandise vendors may use other payment methods, so keep coupons mainly for food, rides and games."
        ],
        links: [
          { label: "Official coupon FAQ", href: "https://bigtex.com/faqs/coupons/", external: true }
        ]
      },
      {
        heading: "Best 2026 State Fair foods and award winners",
        paragraphs: [
          "The 2026 Big Tex Choice Awards winners are Burger Chop Tater Tacos for Best Taste – Savory, Fletcher's Chocolate Corny Dog for Best Taste – Sweet, Tropical Coco Fresca for Best Taste – Sipper, and Berry Me in Matcha for Most Creative.",
          "The broader 2026 new-food lineup includes items such as Texas Brisket Pierogies, Spicy Carbonara Ramen Korean Corn Dog, Triple Chocolate Flautas and Twinkle Twinkle Brisket Star. Use the official food map once you are on the grounds so you do not spend your day backtracking."
        ],
        links: [
          { label: "TexasDefined 2026 State Fair food guide", href: "/article/state-fair-texas-2026-new-foods-guide" },
          { label: "Official 2026 Big Tex Choice winners", href: "https://bigtex.com/big-tex-choice-awards/", external: true },
          { label: "Official 2026 new foods", href: "https://bigtex.com/new-food/", external: true }
        ]
      },
      {
        heading: "Big Tex, the Midway and must-see attractions",
        paragraphs: [
          "Big Tex remains the Fair's most recognizable landmark and an easy meeting point for groups. First-time visitors should also budget time for the Midway, livestock and agriculture exhibits, the Texas Auto Show, creative arts, live shows and Fair Park's historic architecture.",
          "Do not try to see every attraction in one visit. Pick two or three anchors for the day, then use the official schedule to fill gaps with nearby shows and exhibits."
        ],
        links: [
          { label: "Official attraction schedule", href: "https://bigtex.com/schedule/", external: true },
          { label: "Explore Texas", href: "/explore" }
        ]
      },
      {
        heading: "College football at the State Fair",
        paragraphs: [
          "College football is part of the State Fair identity, with major games played at the Cotton Bowl inside Fair Park. Game days create a very different traffic and crowd pattern from an ordinary Fair day, so arrive earlier and plan transportation around kickoff.",
          "If you are attending the State Fair Classic, use the dedicated TexasDefined event guide for game-specific planning and then combine it with this Fair guide for food, rides and attractions before or after the game."
        ],
        links: [
          { label: "State Fair Classic guide", href: "/event/state-fair-classic" },
          { label: "Texas sports venues", href: "/sports-venues" }
        ]
      },
      {
        heading: "Can you bring food, drinks and bags?",
        paragraphs: [
          "The State Fair allows outside food and nonalcoholic beverages subject to its current container, cooler and bag restrictions. That can be useful for families, dietary needs and visitors trying to control costs.",
          "Rules can change and prohibited-item lists are time-sensitive, so check the Fair's current FAQ immediately before leaving home rather than relying on an old screenshot or social post."
        ],
        links: [
          { label: "Official food and drink rules", href: "https://bigtex.com/faqs/food-drinks/", external: true },
          { label: "Official State Fair FAQ", href: "https://bigtex.com/faq/", external: true }
        ]
      },
      {
        heading: "State Fair with kids",
        paragraphs: [
          "For families, a lower-stress visit usually means arriving near opening, doing animal and educational areas before the afternoon crowds, scheduling a few Midway rides rather than unlimited wandering, and building in a sit-down break before evening shows.",
          "Write a phone number on a child's wristband or card, choose a clear family meeting point near a major landmark, and review height requirements before promising a specific ride."
        ],
        links: [
          { label: "Official visitor planning", href: "https://bigtex.com/plan-your-visit/", external: true },
          { label: "Children's Aquarium at Fair Park", href: "/destination/childrens-aquarium-dallas-fair-park" }
        ]
      },
      {
        heading: "Accessibility and sensory planning",
        paragraphs: [
          "Fair Park is large, noisy and crowded, so visitors who need mobility, sensory or accessibility accommodations should review the official accessibility information before arrival and identify quieter breaks in advance.",
          "If stamina is a concern, prioritize one side of the grounds at a time instead of repeatedly crossing Fair Park. A planned meal break and a scheduled indoor exhibit can make a long day easier."
        ],
        links: [
          { label: "Official State Fair FAQ", href: "https://bigtex.com/faq/", external: true }
        ]
      },
      {
        heading: "A first-timer full-day itinerary",
        paragraphs: [
          "Morning: enter near opening, visit Big Tex, livestock and agriculture areas, then the Texas Auto Show or another major indoor exhibit before the biggest crowds arrive.",
          "Afternoon: make lunch your food-sampling window, try one 2026 award winner, then spend a focused block on the Midway or museums. Evening: use the official schedule to choose live music, a parade or another timed attraction instead of wandering without a plan."
        ],
        links: [
          { label: "Official 2026 Visitor's Guide", href: "https://bigtex.com/visitors-guide/", external: true },
          { label: "Texas road trips", href: "/explore/road-trips" }
        ]
      },
      {
        heading: "A half-day or budget-focused visit",
        paragraphs: [
          "For a half-day, choose either a morning-to-afternoon visit centered on exhibits and food or an afternoon-to-evening visit centered on the Midway, dinner and entertainment. Trying to compress the entire Fair into four hours usually produces more walking than enjoyment.",
          "For a budget visit, compare admission discounts, use DART if it is cheaper than parking for your group, bring allowed water or snacks, set a coupon budget before entering the Midway and use included shows and exhibits to fill the day."
        ],
        links: [
          { label: "Official discounts", href: "https://bigtex.com/discounts/", external: true },
          { label: "Official plan-your-visit hub", href: "https://bigtex.com/plan-your-visit/", external: true }
        ]
      },
      {
        heading: "What is new for 2026",
        paragraphs: [
          "The 2026 Fair theme is Stars, Stripes, and Howdies. This year's Fair also includes new food and value programs plus changes to entertainment locations, so returning visitors should not assume every attraction is in the same place or priced the same way as last year.",
          "Use the current Fair schedule and map on the day you visit. Those sources are more reliable than an old map saved from a previous year."
        ],
        links: [
          { label: "Official State Fair news", href: "https://bigtex.com/category/press-releases/", external: true },
          { label: "Official schedule", href: "https://bigtex.com/schedule/", external: true }
        ]
      },
      {
        heading: "Where to stay and what else to do in Dallas",
        paragraphs: [
          "If the Fair is part of a Dallas weekend, staying near a DART Green Line connection can be more useful than choosing a hotel only by straight-line distance from Fair Park. That lets you avoid some event traffic while keeping rail access.",
          "Pair the Fair with nearby Dallas attractions or another city itinerary rather than adding unnecessary cross-town driving during peak event periods."
        ],
        links: [
          { label: "Dallas County guide", href: "/county/dallas" },
          { label: "Texas events calendar", href: "/events" },
          { label: "Explore Texas", href: "/explore" }
        ]
      },
      {
        heading: "State Fair history and why Fair Park matters",
        paragraphs: [
          "The State Fair of Texas dates to 1886 and has become one of the state's most recognizable annual traditions. Fair Park itself is a major part of the experience, with architecture, museums and the Cotton Bowl creating a setting that is more than a temporary carnival site.",
          "That history is why a strong first visit should include at least some time outside the Midway. The livestock, exhibits, buildings and civic history are central to understanding why the Fair has remained important for generations."
        ],
        links: [
          { label: "Official State Fair history and mission", href: "https://bigtex.com/", external: true },
          { label: "Texas history", href: "/texas-history" }
        ]
      }
    ],
    related: [
      { label: "2026 State Fair food guide", href: "/article/state-fair-texas-2026-new-foods-guide" },
      { label: "State Fair Classic", href: "/event/state-fair-classic" },
      { label: "Dallas County", href: "/county/dallas" },
      { label: "Children's Aquarium at Fair Park", href: "/destination/childrens-aquarium-dallas-fair-park" },
      { label: "Texas events", href: "/events" },
      { label: "Texas food trail", href: "/texas-food-trail" },
      { label: "Texas road trips", href: "/explore/road-trips" },
      { label: "Texas sports venues", href: "/sports-venues" }
    ],
  },
  "texas-two-step": {
    eyebrow: "Texas explained",
    title: "Texas Two Step: How the Texas Lottery Game Works",
    intro: "A plain-English guide to Texas Two Step, including the number draw, Bonus Ball, drawing schedule, prize structure, odds and the official rules that control the game.",
    updated: "November 12, 2026",
    quickAnswer: "Texas Two Step is a $1-per-play lottery game with four distinct numbers from 1–35 and a separate Bonus Ball from 1–35. Drawings are Mondays and Thursdays at 10:12 p.m. Central. Overall prize odds are 1 in 32.4; official results and payouts take precedence over this guide.",
    sections: [
      {
        "heading": "What you pay and how the numbers are selected",
        "paragraphs": [
          "A Texas Two Step play costs $1. Choose four different numbers from 1 through 35 and a Bonus Ball number from 1 through 35, or use Quick Pick at a licensed retailer. The Bonus Ball is selected separately from the four main numbers, so it may match one of them.",
          "You can play the same selection for up to 10 consecutive drawings using Multi-Draw. Check the printed ticket against your selections before leaving the counter; the ticket, not the playslip, is the proof of purchase."
        ],
        "links": [
          {
            "label": "Official Texas Two Step rules and how to play",
            "href": "https://www.texaslottery.com/export/sites/lottery/Games/Texas_Two_Step/index.html",
            "external": true
          }
        ]
      },
      {
        "heading": "Draw times and cutoff",
        "paragraphs": [
          "Drawings are scheduled on Mondays and Thursdays at 10:12 p.m. Central Time. The published draw break runs from 10:02 through 10:15 p.m., when tickets are not sold. Verify any special scheduling changes with the official Lottery page rather than relying on a past drawing listing.",
          "Winning numbers and jackpots change after every drawing. TexasDefined intentionally does not publish a static current jackpot in this evergreen explanation."
        ],
        "links": [
          {
            "label": "Official drawing page",
            "href": "https://www.texaslottery.com/export/sites/lottery/Games/Texas_Two_Step/index.html",
            "external": true
          }
        ]
      },
      {
        "heading": "Texas Two Step prize levels and probabilities",
        "paragraphs": [
          "The jackpot is won by matching all four main numbers plus the Bonus Ball. Four main numbers without the Bonus Ball win a separate prize tier, as do three or two main numbers with specified Bonus Ball combinations. Several higher tiers are pari-mutuel: their amount depends on the prize allocation and number of winners rather than an invariant cash value.",
          "The Lottery reports overall odds of winning any prize of approximately 1 in 32.4. That means the majority of tickets do not win; the jackpot odds are approximately 1 in 1,832,600. The two lowest tiers matching the Bonus Ball pay guaranteed $5 or $7 under the published game rules. Never mistake a frequently changing advertised jackpot or estimated pari-mutuel prize for a fixed payout."
        ],
        "table": {
          "caption": "Match combinations, approximate odds and payout type — Texas Lottery game information",
          "columns": [
            "Main matches",
            "Bonus Ball",
            "Prize type",
            "Approximate odds"
          ],
          "rows": [
            [
              "4",
              "Yes",
              "Jackpot (pari-mutuel)",
              "1 in 1,832,600"
            ],
            [
              "4",
              "No",
              "Pari-mutuel",
              "1 in 53,900"
            ],
            [
              "3",
              "Yes",
              "Pari-mutuel",
              "1 in 14,779"
            ],
            [
              "3",
              "No",
              "Pari-mutuel",
              "1 in 435"
            ],
            [
              "2",
              "Yes",
              "Pari-mutuel",
              "1 in 657"
            ],
            [
              "1",
              "Yes",
              "$7 guaranteed",
              "1 in 102"
            ],
            [
              "0",
              "Yes",
              "$5 guaranteed",
              "1 in 58"
            ]
          ]
        },
        "links": [
          {
            "label": "Official game rules and results",
            "href": "https://www.texaslottery.com/export/sites/lottery/Games/Texas_Two_Step/index.html",
            "external": true
          }
        ]
      },
      {
        "heading": "Checking and claiming a prize",
        "paragraphs": [
          "Compare the official winning numbers with your ticket, including the separate Bonus Ball. Prize claims must be submitted within 180 days of the draw date. The Lottery controls ticket validation and instructions for claiming at a retailer, claim center or by mail.",
          "Keep the physical ticket safe, follow the official claim procedure for its value and never share ticket details in messages from strangers offering to process prizes. No mathematical strategy changes the probability of an individual random combination."
        ],
        "links": [
          {
            "label": "Texas Lottery claim instructions",
            "href": "https://www.texaslottery.com/export/sites/lottery/Games/Texas_Two_Step/index.html",
            "external": true
          }
        ]
      },
      {
        "heading": "Looking for the Texas two-step dance instead?",
        "paragraphs": [
          "The Texas two-step dance is a different topic entirely. For the dance, western swing, honky-tonks and venues where people actually dance, use the dance-hall guide. This page covers only the state lottery game.",
          "Lottery play should be treated as discretionary entertainment, not a way to pay living expenses. Check the official rules for age, prize-claim and responsible-play requirements."
        ],
        "links": [
          {
            "label": "Texas dance halls and honky-tonks",
            "href": "/texas-dance-halls-honky-tonks",
            "external": false
          },
          {
            "label": "Texas western swing",
            "href": "/texas-western-swing",
            "external": false
          }
        ]
      }
    ],
    related: [{ label: "Texas facts", href: "/texas-facts" }, { label: "Things unique to Texas", href: "/things-unique-to-texas" }, { label: "Texas history", href: "/texas-history" }, { label: "Texas guidebook", href: "/guides" }],
  },
};
