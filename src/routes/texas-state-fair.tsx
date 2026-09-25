import { createFileRoute } from "@tanstack/react-router";
import { buildPrioritySearchHead } from "@/lib/priority-search-seo";
import { jsonLd } from "@/lib/seo";

// PrioritySearchPage UI is intentionally delivered from texas-state-fair.lazy.tsx.
const canonicalPath = "/texas-state-fair";
const seoDescription = "State Fair of Texas 2026 is open Sept. 25–Oct. 18 at Fair Park in Dallas. Current hours, tickets, DART, parking, coupons, food, rides and planning.";

const stateFairData = {
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
};

const faq = [
  { question: "When is the 2026 State Fair of Texas?", answer: "The 2026 State Fair of Texas runs September 25 through October 18, 2026, at Fair Park in Dallas." },
  { question: "What are the 2026 State Fair of Texas hours?", answer: "The Fair is open 10 a.m.–9 p.m. Sundays through Thursdays and 10 a.m.–10 p.m. Fridays and Saturdays. Last entry is 9 p.m. Parking gates and ticket booths open at 9:30 a.m." },
  { question: "How much are 2026 State Fair of Texas tickets?", answer: "Official 2026 prices vary by day and discount. The Fair currently lists general admission from $7 to $25, child admission ages 3–12 from $7 to $10, children age 2 and younger free, and senior admission from $7 to $20." },
  { question: "Where is the State Fair of Texas held?", answer: "The State Fair of Texas is held at Fair Park in Dallas, Texas." },
  { question: "Can I take DART to the State Fair of Texas?", answer: "Yes. DART's Green Line serves Fair Park Station and MLK Jr. Station, both convenient to fairground entrances." },
  { question: "How do State Fair of Texas coupons work?", answer: "Food, Midway rides and Midway games use Fair coupons. One coupon is currently worth $1, and unused coupons do not expire under the Fair's current policy." },
  { question: "Can I bring food and drinks into the State Fair of Texas?", answer: "The Fair allows outside food and nonalcoholic beverages subject to current container, cooler and bag restrictions. Check the official FAQ before your visit because rules can change." },
  { question: "What food won the 2026 Big Tex Choice Awards?", answer: "The 2026 winners are Burger Chop Tater Tacos for savory, Fletcher's Chocolate Corny Dog for sweet, Tropical Coco Fresca for sipper, and Berry Me in Matcha for most creative." },
  { question: "What time does the State Fair Midway open?", answer: "The 2026 Midway opens at 11 a.m. Sundays through Fridays and 10 a.m. Saturdays." },
  { question: "What is the State Fair of Texas known for?", answer: "Big Tex, the Midway, inventive fair food, livestock and agriculture, the Texas Auto Show, live music, college football and historic Fair Park are major parts of the experience." },
];

export const Route = createFileRoute("/texas-state-fair")({
  loader: () => ({
    ...stateFairData,
    faq,
  }),
  head: ({ loaderData }) => {
    if (!loaderData) return {};
    const base = buildPrioritySearchHead({
      canonicalPath,
      title: "State Fair of Texas 2026: Hours, Tickets & Guide",
      description: seoDescription,
      data: loaderData,
      about: ["State Fair of Texas", "Fair Park", "Dallas events", "Big Tex", "Texas State Fair food"],
    });
    return {
      ...base,
      scripts: [
        ...base.scripts,
        jsonLd({
          "@context": "https://schema.org",
          "@type": "Event",
          name: "2026 State Fair of Texas",
          startDate: "2026-09-25",
          endDate: "2026-10-18",
          eventStatus: "https://schema.org/EventScheduled",
          eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
          location: {
            "@type": "Place",
            name: "Fair Park",
            address: {
              "@type": "PostalAddress",
              addressLocality: "Dallas",
              addressRegion: "TX",
              addressCountry: "US",
            },
          },
          url: "https://bigtex.com/",
          description: loaderData.intro,
          organizer: { "@type": "Organization", name: "State Fair of Texas", url: "https://bigtex.com/" },
        }),
      ],
    };
  },
});
