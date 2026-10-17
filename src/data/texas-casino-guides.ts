// Visitor-first editorial references verified against first-party operators and public legal authorities, 2026-10-15.
// Informational travel coverage only: no booking affiliate relationship, betting odds, gambling deposits or operator endorsements.
export interface CasinoGuide {
  slug: string;
  title: string;
  shortTitle: string;
  group: string;
  location: string;
  status: string;
  dek: string;
  facts: string[];
  sections: { heading: string; paragraphs: string[] }[];
  sources: { label: string; url: string }[];
  relatedSlugs: string[];
}
export const CASINO_GUIDES: CasinoGuide[] = [
{
  "slug": "ischoopa-travel-center",
  "title": "Ischoopa Travel Center & Casino: US 190 East Texas Gaming Stop",
  "shortTitle": "Ischoopa Travel Center",
  "group": "Texas gaming destinations",
  "location": "Livingston, Texas",
  "status": "Open · tribal travel center with electronic gaming",
  "dek": "A smaller, 24-hour fuel, food and gaming stop on US 190, operated by the Alabama-Coushatta Tribe. It is not the full-size Naskila Livingston casino or the new Leggett site.",
  "facts": [
    "14071 US 190, Livingston, TX 77351",
    "Travel center with fuel, convenience shopping and 24-hour food service",
    "Operator advertises more than 80 electronic games",
    "Open 24/7 according to the official Naskila website"
  ],
  "sections": [
    {
      "heading": "A gaming stop, not a destination resort",
      "paragraphs": [
        "Ischoopa Travel Center & Casino offers electronic gaming as part of a multi-purpose roadside property. Naskila's official site advertises over 80 games, smoking and nonsmoking areas, a convenience store, fuel, and the Ischoopa Toospa Grill. The operator presents this as a smaller gaming stop rather than a full-service hotel resort.",
        "The Alabama-Coushatta Tribe of Texas identifies Ischoopa as a separate property from its larger Naskila Casino Livingston and newly opened Naskila Casino Leggett. Readers should not expect the same floor size, facilities or events at all three addresses."
      ]
    },
    {
      "heading": "Who should consider it?",
      "paragraphs": [
        "Ischoopa fits travelers already using US 190 near Livingston or driving in the East Texas Piney Woods. It can be a stop for fuel and a meal, but is not comparable to a full Lake Charles or Oklahoma resort weekend.",
        "The operator's listed location is 14071 US 190, Livingston, TX 77351. Do not navigate to Naskila Livingston's State Park Road 56 address or the Leggett site's US 59 address by mistake."
      ]
    },
    {
      "heading": "Confirm the visitor details",
      "paragraphs": [
        "Check the official Ischoopa page for opening hours, dining, gaming availability and access requirements. Its 24-hour status is operator-published and can change; this guide does not invent rates, room availability or special events.",
        "For a larger East Texas gaming visit, compare Naskila Livingston and Leggett. For overnight accommodation and table-game options beyond Texas, use the Houston casino-getaways comparison."
      ]
    }
  ],
  "sources": [
    {
      "label": "Naskila: official Ischoopa Travel Center visitor page",
      "url": "https://www.naskila.com/ischoopa-travel-center/"
    },
    {
      "label": "Alabama-Coushatta Tribe: 2026 casino development announcement",
      "url": "https://www.alabama-coushatta.com/blog/post/the-alabama-coushatta-tribe-of-texas-is-scheduled-to-open-its-new-temporary-casino-facility-in-the-summer-of-2026-in-leggett-tx"
    }
  ],
  "relatedSlugs": [
    "naskila-livingston",
    "naskila-leggett",
    "near-houston"
  ]
},
  {
    "slug": "kickapoo-lucky-eagle",
    "title": "Kickapoo Lucky Eagle Casino Hotel: Eagle Pass Visitor Guide",
    "shortTitle": "Kickapoo Lucky Eagle",
    "group": "Texas gaming destinations",
    "location": "Eagle Pass, Texas",
    "status": "Open · tribal casino hotel",
    "dek": "An Eagle Pass casino hotel with overnight rooms, dining and on-site entertainment. Here's what makes it different from a short gaming stop.",
    "facts": [
      "794 Lucky Eagle Drive, Eagle Pass, TX 78852",
      "Casino hotel with rooms on site",
      "Slots, poker and bingo are listed by the operator",
      "Open 24 hours according to the operator"
    ],
    "sections": [
      {
        "heading": "What kind of visit is this?",
        "paragraphs": [
          "Kickapoo Lucky Eagle is the strongest fit on this list for someone who wants a Texas casino and a hotel under the same roof. The property advertises electronic games, poker, bingo, restaurants and live entertainment. Unlike a day-only gaming room, it can anchor a full overnight trip in South Texas.",
          "The casino is operated by the Kickapoo Traditional Tribe of Texas. Check the operator's current gaming schedule and visitor rules before you travel; poker and bingo offerings may follow different schedules from the main floor."
        ]
      },
      {
        "heading": "How to plan the stay",
        "paragraphs": [
          "Start with the room and event calendar rather than a list of machines. A show, special occasion or longer South Texas visit can be a better reason to stay overnight. Compare the hotel's direct room terms, check-in rules and cancellation policy before booking; Texas Defined has not verified third-party hotel rates.",
          "Eagle Pass is a border community, not a suburb of San Antonio. Allow time for the road trip, verify late-night arrival plans and avoid treating the visit as an easy urban detour."
        ]
      },
      {
        "heading": "What to check before leaving",
        "paragraphs": [
          "Confirm minimum entry age, identification rules, smoking areas, accessible entrances, current restaurant hours, entertainment and any scheduled construction. The operator announced a hotel expansion in July 2026, so arrival access or the guest experience may change while work continues.",
          "For more Texas travel options, compare the full gaming-getaways collection and the site's statewide road-trip guides."
        ]
      }
    ],
    "sources": [
      {
        "label": "Kickapoo Lucky Eagle official site and address",
        "url": "https://luckyeagletexas.com/"
      },
      {
        "label": "Kickapoo hotel expansion announcement, July 2026",
        "url": "https://luckyeagletexas.com/2026/07/kickapoo-lucky-eagle-casino-hotel-breaks-ground-on-new-hotel-tower-expansion/"
      }
    ],
    "relatedSlugs": [
      "texas-gaming-laws",
      "naskila-livingston",
      "near-houston"
    ]
  },
  {
    "slug": "naskila-livingston",
    "title": "Naskila Casino Livingston: What to Know Before You Go",
    "shortTitle": "Naskila Livingston",
    "group": "Texas gaming destinations",
    "location": "Livingston, Texas",
    "status": "Open · tribal electronic-bingo facility",
    "dek": "The original Naskila location near Livingston offers electronic bingo gaming. It is not the same facility as the new Leggett site.",
    "facts": [
      "540 State Park Road 56, Livingston, TX 77351",
      "Original Alabama-Coushatta Tribe of Texas facility",
      "Electronic bingo-based gaming, not a full table-games casino",
      "Operator states visitors must be age 21 or older"
    ],
    "sections": [
      {
        "heading": "The original Naskila, not the new one",
        "paragraphs": [
          "The original Naskila Casino operates on Alabama-Coushatta tribal land near Livingston. Its electronic gaming resembles slot-style play, but the operator describes the machines as bingo-based. Readers should not assume the games or amenities match those at Louisiana or Oklahoma casinos.",
          "Since August 2026, the same operator also has a separate property in Leggett. Enter the exact address before setting out: the two facilities are not interchangeable and do not share the same entrance."
        ]
      },
      {
        "heading": "Is it a day trip from Houston?",
        "paragraphs": [
          "For many Houston-area travelers, Livingston can work as a day outing without reserving a hotel. Travel time varies substantially with departure point, traffic and weather, so use a live mapping service rather than a fixed drive-time promise.",
          "The surrounding Polk County and Piney Woods area is worth planning around separately. If your group is not interested in the gaming floor, build an independent nature or small-town itinerary rather than assuming the casino has all-day resort amenities."
        ]
      },
      {
        "heading": "Visitor essentials",
        "paragraphs": [
          "Naskila publishes its entry-age requirement, address and contact details on the official site. Before traveling, check the current non-smoking areas, dining hours, accessibility arrangements and any change to the property's operating format.",
          "This guide covers the existing Livingston facility. For the new property, read the Leggett guide; for the future resort, follow the separate construction guide."
        ]
      }
    ],
    "sources": [
      {
        "label": "Naskila Livingston official contact and visitor details",
        "url": "https://www.naskila.com/contact/"
      },
      {
        "label": "Naskila official gaming overview",
        "url": "https://www.naskila.com/"
      },
      {
        "label": "Naskila Leggett opening announcement",
        "url": "https://www.naskila.com/press/naskila-casino-and-alabama-coushatta-tribe-of-texas-celebrate-the-grand-opening-of-naskila-casino-leggett/"
      }
    ],
    "relatedSlugs": [
      "naskila-leggett",
      "naskila-resort-leggett",
      "near-houston"
    ]
  },
  {
    "slug": "naskila-leggett",
    "title": "Naskila Casino Leggett: The New East Texas Gaming Location",
    "shortTitle": "Naskila Leggett",
    "group": "Texas gaming destinations",
    "location": "Leggett / Livingston mailing address, Texas",
    "status": "Open since August 25, 2026 · temporary facility",
    "dek": "A separate, newly opened Naskila property with electronic bingo machines and food service at the future resort site.",
    "facts": [
      "10314 US 59 N, Livingston, TX 77351",
      "Opened August 25, 2026",
      "More than 300 electronic bingo machines at opening",
      "Kano Grill and 24-hour operation according to Naskila"
    ],
    "sections": [
      {
        "heading": "What's open today",
        "paragraphs": [
          "Naskila Casino Leggett opened August 25, 2026, at the site of a larger resort development. The Alabama-Coushatta Tribe describes the present facility as a temporary gaming location with more than 300 electronic bingo machines, smoking and non-smoking areas and the 24-hour Kano Grill.",
          "It is important not to describe the completed future resort as operating today. The present-day visitor experience is a smaller, separate facility. The original Naskila Casino Livingston remains open as well."
        ]
      },
      {
        "heading": "Why the location matters",
        "paragraphs": [
          "Leggett sits along US 59 north of Livingston, so mapping the full street address is more reliable than searching a general town name. Houston travelers should also distinguish the operator's two East Texas locations when meeting friends or planning an overnight stay.",
          "The current property is not yet the fully developed hotel, dining, meeting and entertainment complex described in future plans. Do not book a hotel at a future facility on the assumption it has opened."
        ]
      },
      {
        "heading": "Before the drive",
        "paragraphs": [
          "Check Naskila's Leggett page for active hours, dining, floor access and age policies, and confirm any changes caused by construction on the adjoining resort project. Plans and construction timetables can move.",
          "The resort construction guide tracks which facilities are proposed and which are actually open."
        ]
      }
    ],
    "sources": [
      {
        "label": "Naskila official Leggett visitor page",
        "url": "https://www.naskila.com/leggett/"
      },
      {
        "label": "Naskila opening announcement, August 26, 2026",
        "url": "https://www.naskila.com/press/naskila-casino-and-alabama-coushatta-tribe-of-texas-celebrate-the-grand-opening-of-naskila-casino-leggett/"
      }
    ],
    "relatedSlugs": [
      "naskila-livingston",
      "naskila-resort-leggett",
      "near-houston"
    ]
  },
  {
    "slug": "speaking-rock-el-paso",
    "title": "Speaking Rock Entertainment Center: El Paso Visitor Guide",
    "shortTitle": "Speaking Rock",
    "group": "Texas gaming destinations",
    "location": "El Paso, Texas",
    "status": "Open · tribal entertainment and bingo",
    "dek": "An El Paso entertainment venue with live music, food and bingo. Check the official schedule rather than assuming every type of casino game is available.",
    "facts": [
      "122 South Old Pueblo Road, El Paso, TX 79907",
      "Open daily, 24 hours, according to the operator",
      "Live music, food and bingo schedule published online",
      "Speaking Rock warns it does not offer online gambling or an app"
    ],
    "sections": [
      {
        "heading": "More than a gaming stop",
        "paragraphs": [
          "Speaking Rock is operated in the Ysleta del Sur Pueblo community in the El Paso area. The official venue site foregrounds food, bars, concerts and live music alongside its casino branding; visitors should use its current program rather than assuming a Las Vegas-style gaming floor.",
          "The operator lists scheduled bingo sessions, but session times, buy-ins and prizes can change. Treat its schedule as authoritative immediately before the visit."
        ]
      },
      {
        "heading": "Pair the visit with El Paso",
        "paragraphs": [
          "The location works as part of a wider El Paso stay: plan the day around local history, food and the city's own cultural attractions, then choose an entertainment night based on the published lineup.",
          "Booking a hotel in El Paso can make sense for an out-of-town visitor, but this page does not imply an on-site casino hotel. Verify venue and hotel locations separately."
        ]
      },
      {
        "heading": "Avoid impostor sites",
        "paragraphs": [
          "Speaking Rock explicitly says it offers no online gaming and has no app. That is particularly important for readers arriving from a search result or social-media ad that claims to represent the venue.",
          "For access, age restrictions, parking, accessibility and events, contact the venue through its verified official site rather than relying on a third-party gambling promotion."
        ]
      }
    ],
    "sources": [
      {
        "label": "Speaking Rock official site, location and online scam alert",
        "url": "https://www.speakingrock.com/"
      },
      {
        "label": "Speaking Rock current bingo information",
        "url": "https://www.speakingrock.com/general-7"
      }
    ],
    "relatedSlugs": [
      "texas-gaming-laws",
      "kickapoo-lucky-eagle",
      "near-dallas-fort-worth"
    ]
  },
  {
    "slug": "near-houston",
    "title": "Casinos Near Houston: East Texas or Lake Charles?",
    "shortTitle": "Casinos near Houston",
    "group": "Gaming getaways from Texas metros",
    "location": "Houston region, Texas and Lake Charles, Louisiana",
    "status": "Travel comparison · Texas and Louisiana",
    "dek": "Compare the two Naskila locations in East Texas with full-service casino resorts across the Louisiana state line.",
    "facts": [
      "Texas option: Naskila Livingston (Polk County)",
      "Texas option: Naskila Leggett (near US 59)",
      "Texas travel-center stop: Ischoopa on US 190 (80+ electronic games)",
      "Louisiana option: Golden Nugget Lake Charles",
      "Louisiana option: L'Auberge Casino Resort Lake Charles"
    ],
    "sections": [
      {
        "heading": "First choose which experience you want",
        "paragraphs": [
          "For a Texas-based electronic-bingo visit, consider Naskila Livingston or Naskila Leggett. Both are operated by the Alabama-Coushatta Tribe, but they are separate properties. Livingston is the established facility; Leggett opened a new temporary venue in August 2026. Ischoopa Travel Center, also operated by the Tribe, is a third, smaller gaming stop on US 190 with fuel and food service.",
          "For an overnight resort experience with hotel, pools, dining and conventional table games, many Houston travelers instead look east to Lake Charles, Louisiana. Golden Nugget and L'Auberge are full-service Louisiana properties, not Texas casinos."
        ]
      },
      {
        "heading": "Overnight stay or a shorter outing?",
        "paragraphs": [
          "Choose based on whether a hotel and resort amenities matter more than keeping the outing inside Texas. A Lake Charles trip can combine a hotel stay with dining and other leisure; the Naskila properties serve a different, more focused visit.",
          "Do not assume a published drive-time estimate applies to every Houston suburb. Check live traffic and actual destination addresses. Compare hotel resort fees, parking terms, minimum check-in age and cancellation rules before purchasing a room."
        ]
      },
      {
        "heading": "How to build the weekend",
        "paragraphs": [
          "A practical two-night plan might put the first evening at a Lake Charles hotel and reserve daylight for the Louisiana coastline, food or lakefront. For an East Texas outing, build the daytime itinerary around the Piney Woods and Polk County rather than promising a resort pool.",
          "This independent guide does not take betting deposits, provide odds or sell casino credits. The resort links below are official information sources; hotel-booking links on this guide may earn TexasDefined a commission at no extra cost to you."
        ]
      }
    ],
    "sources": [
      {
        "label": "Naskila Livingston official address",
        "url": "https://www.naskila.com/contact/"
      },
      {
        "label": "Naskila Leggett official opening",
        "url": "https://www.naskila.com/leggett/"
      },
      {
        "label": "Golden Nugget Lake Charles hotel and location",
        "url": "https://www.goldennugget.com/lake-charles/hotel/"
      },
      {
        "label": "L'Auberge Lake Charles visitor and resort information",
        "url": "https://www.llakecharles.com/visit"
      }
    ],
    "relatedSlugs": [
      "naskila-livingston",
      "naskila-leggett",
      "texas-gaming-laws"
    ]
  },
  {
    "slug": "near-dallas-fort-worth",
    "title": "Casinos Near Dallas–Fort Worth: Two Oklahoma Resort Options",
    "shortTitle": "Casinos near Dallas–Fort Worth",
    "group": "Gaming getaways from Texas metros",
    "location": "North Texas and southern Oklahoma",
    "status": "Travel comparison · Oklahoma destinations",
    "dek": "For Dallas-area casino-resort trips, compare the actual facilities in Thackerville and Durant rather than searching for a nonexistent Dallas commercial casino.",
    "facts": [
      "WinStar World Casino and Resort — Thackerville, Oklahoma",
      "Choctaw Casino & Resort — Durant, Oklahoma",
      "Both destinations are outside Texas",
      "Check live room, event and venue status before booking"
    ],
    "sections": [
      {
        "heading": "WinStar near the Red River",
        "paragraphs": [
          "WinStar World Casino and Resort is in Thackerville, Oklahoma, near the Texas border. Its official site lists hotel accommodations, concerts, food and gaming along with a notice that certain operations are temporarily closed. As of this review, poker and bingo are among the activities listed as closed, so do not plan a trip around them without a fresh check.",
          "Address: 777 Casino Avenue, Thackerville, OK 73459. That is an Oklahoma address even if the trip begins in Dallas or Denton."
        ]
      },
      {
        "heading": "Choctaw Durant for a full-service overnight",
        "paragraphs": [
          "Choctaw Casino & Resort–Durant is farther into southeastern Oklahoma, at 4216 South Highway 69/75. The operator highlights hotel rooms, restaurants, pools, live shows and family recreation spaces in addition to its gaming floors.",
          "For an actual weekend, compare dated hotel prices, event tickets, pool season and room terms. A concert or spa visit may be the main draw for some groups, independent of gambling."
        ]
      },
      {
        "heading": "Texas rules stop at the border",
        "paragraphs": [
          "Do not mistake Oklahoma tribal casino licensing for permission to offer casino gambling in Texas or online to Texas residents. Travelers must follow the rules of the property and its jurisdiction.",
          "For a broader explanation, read the Texas gambling-law guide, which links to the Texas State Law Library and federal tribal-gaming authorities."
        ]
      }
    ],
    "sources": [
      {
        "label": "WinStar official location and temporary closure notice",
        "url": "https://www.winstar.com/"
      },
      {
        "label": "Choctaw Casino & Resort–Durant official visitor page",
        "url": "https://www.choctawcasinos.com/durant/"
      },
      {
        "label": "Texas State Law Library on gambling",
        "url": "https://guides.sll.texas.gov/gambling/general-information"
      }
    ],
    "relatedSlugs": [
      "texas-gaming-laws",
      "near-houston",
      "speaking-rock-el-paso"
    ]
  },
  {
    "slug": "texas-gaming-laws",
    "title": "Are Casinos Legal in Texas? Tribal Gaming, Bingo and Border Trips",
    "shortTitle": "Texas casino laws",
    "group": "Explainers",
    "location": "Statewide Texas",
    "status": "Legal and visitor explainer · reviewed October 2026",
    "dek": "Why commercial casinos are generally prohibited, what tribal bingo-based gaming means and why Louisiana and Oklahoma resorts are different.",
    "facts": [
      "Texas Penal Code Chapter 47 generally prohibits gambling with defined exceptions",
      "Charitable bingo and state lottery operate under separate authorizations",
      "Federally recognized tribes have a distinct federal legal framework",
      "Casino resorts in Louisiana and Oklahoma are not Texas facilities"
    ],
    "sections": [
      {
        "heading": "Why can't Texas open an ordinary commercial casino?",
        "paragraphs": [
          "Texas law generally prohibits gambling under Chapter 47 of the Penal Code, subject to specific statutory exceptions and defenses. State lottery, certain charitable bingo and other limited activities have their own rules. An ordinary commercial casino cannot simply open a Las Vegas-style floor under a general Texas casino license.",
          "The Texas State Law Library maintains a plain-language summary with links to current law. It also notes that online sports betting remains illegal in Texas as of its latest update. Proposals to change gambling rules are not the same as enacted law."
        ]
      },
      {
        "heading": "What makes tribal facilities different?",
        "paragraphs": [
          "The Kickapoo Traditional Tribe of Texas, Alabama-Coushatta Tribe of Texas, and Ysleta del Sur Pueblo operate within federal tribal-gaming frameworks rather than a statewide commercial-casino system. The legal history is complex and includes the U.S. Supreme Court's 2022 Ysleta del Sur Pueblo v. Texas decision.",
          "Bingo can be conducted electronically under applicable rules; a machine that looks like a slot machine is not necessarily legally equivalent to a traditional slot machine. The National Indian Gaming Commission describes bingo as Class II gaming under federal rules. Do not assume every Texas tribal facility offers roulette, craps, a sportsbook or all forms of poker."
        ]
      },
      {
        "heading": "What about game rooms and poker clubs?",
        "paragraphs": [
          "Texas State Law Library warns that eight-liner machines and local game rooms are subject to restrictions, and that private poker arrangements involve fact-sensitive statutory defenses. They are not substitutes for a licensed commercial casino, and their legality cannot be determined from a business name alone.",
          "Visitors looking for full casino hotels with table games often travel to Louisiana or Oklahoma, where a different jurisdiction's laws apply. Texas Defined does not provide legal advice or gambling services. Check current law and official venue policies before making plans."
        ]
      }
    ],
    "sources": [
      {
        "label": "Texas State Law Library: gambling law overview",
        "url": "https://guides.sll.texas.gov/gambling/general-information"
      },
      {
        "label": "Texas State Law Library: game rooms",
        "url": "https://guides.sll.texas.gov/gambling/game-rooms"
      },
      {
        "label": "Texas State Law Library: sports wagering",
        "url": "https://guides.sll.texas.gov/gambling/sports-gambling"
      },
      {
        "label": "NIGC: federal and Ysleta del Sur Pueblo legal framework",
        "url": "https://www.nigc.gov/wp-content/uploads/2025/07/NIGC_and_Ysleta_del_Sur_Pueblo.pdf"
      }
    ],
    "relatedSlugs": [
      "kickapoo-lucky-eagle",
      "naskila-livingston",
      "near-dallas-fort-worth"
    ]
  },
  {
    "slug": "naskila-resort-leggett",
    "title": "Naskila Casino Resort in Leggett: Construction and Opening Guide",
    "shortTitle": "Future Naskila Resort",
    "group": "New developments",
    "location": "Leggett, East Texas",
    "status": "Future resort · first phases targeted for late 2028",
    "dek": "What is operating now, what the Alabama-Coushatta Tribe has announced for Leggett and what visitors should not yet book.",
    "facts": [
      "Groundbreaking held June 18, 2026",
      "Temporary Naskila Casino Leggett opened August 25, 2026",
      "First resort phase currently targeted for late 2028",
      "Plans include electronic bingo, dining and meeting space"
    ],
    "sections": [
      {
        "heading": "The distinction that matters",
        "paragraphs": [
          "There are three names readers can easily confuse: Naskila Livingston is the original operating property; Naskila Casino Leggett is the smaller temporary facility that opened August 25, 2026; Naskila Casino Resort is the larger planned development on the Leggett site. The future resort is not open today.",
          "The Alabama-Coushatta Tribe held a groundbreaking on June 18, 2026, and says its first resort phase is anticipated in late 2028. This is a target, not a guaranteed date for a guest reservation."
        ]
      },
      {
        "heading": "What has been announced",
        "paragraphs": [
          "The operator describes a first phase planned around approximately 3,400 electronic bingo machines, restaurants and other dining concepts, smoking and non-smoking gaming areas and about 35,000 square feet of event and conference space. Later phases and amenities can change as the project develops.",
          "Future hotel-room details should only appear here once the operator provides a current, specific confirmed opening schedule. Do not treat a drawing, preliminary plan or third-party article as proof that rooms are available to book."
        ]
      },
      {
        "heading": "How Texas Defined will track it",
        "paragraphs": [
          "The operational Leggett guide links to the real address and present-day visitor features. This development page will distinguish announcements, groundbreaking milestones, construction progress and confirmed opening dates, with dated links to the operator's official releases.",
          "If traveling before the resort opens, use the current Leggett or Livingston visitor guide instead of searching for an unfinished property."
        ]
      }
    ],
    "sources": [
      {
        "label": "Naskila official resort groundbreaking announcement, June 2026",
        "url": "https://www.naskila.com/press/a-new-chapter-for-the-luckiest-spot-in-texas-naskila-casino-breaks-ground-on-naskila-casino-resort/"
      },
      {
        "label": "Naskila Leggett opening and future resort site, August 2026",
        "url": "https://www.naskila.com/press/naskila-casino-and-alabama-coushatta-tribe-of-texas-celebrate-the-grand-opening-of-naskila-casino-leggett/"
      }
    ],
    "relatedSlugs": [
      "naskila-leggett",
      "naskila-livingston",
      "near-houston"
    ]
  }
];
export const casinoGuideBySlug = new Map(CASINO_GUIDES.map((guide) => [guide.slug, guide]));
export const CASINO_GUIDE_PATHS = ["/explore/casinos", ...CASINO_GUIDES.map((guide) => `/explore/casinos/${guide.slug}`)];
