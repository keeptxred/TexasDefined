import type { TexasEvergreenGuide } from "@/data/texas-evergreen-guides";

export const TEXAS_EVERGREEN_GUIDES_BATCH6: Record<string, TexasEvergreenGuide> = {
  "texas-blue-norther-weather-guide": {
    slug: "texas-blue-norther-weather-guide",
    eyebrow: "Weather language under a very large sky",
    title: "Texas Blue Northers, Spring Storms & the Weather Language of a Fast-Changing State",
    dek: "Blue Norther, norther, storm watching: Texas weather vocabulary grew around rapid cold fronts, spring thunderstorms and the habit of reading a huge sky—but folklore should never substitute for an actual forecast or warning.",
    quickAnswer: "A Blue Norther is the Texas name for a fast-moving cold front associated with a sharp temperature drop, strong northerly wind and sometimes precipitation or dramatic sky changes. The weather phenomenon is not unique to Texas; the phrase is the distinctive part. Spring storm watching is also deeply familiar across much of the state because severe thunderstorms are common in spring, but watching clouds from a porch is culture—not a safety plan. When storms threaten, use current National Weather Service forecasts and warnings rather than folklore or visual cues alone.",
    sections: [
      {
        heading: "The Texas part is the name, not ownership of the weather",
        body: [
          "The Handbook of Texas describes blue norther as a Texas expression for a rapidly moving cold front that can send temperatures falling quickly and bring unsettled weather before colder, clearer conditions arrive.",
          "Similar frontal passages happen across the central United States and other temperate regions. Calling the phenomenon uniquely Texan turns regional language into a false meteorological claim, so TexasDefined keeps the distinction explicit."
        ],
        links: [{ href: "/things-unique-to-texas/slang-folklore", label: "Texas slang, symbols & folklore" }]
      },
      {
        heading: "Why a norther can feel so dramatic",
        body: [
          "Texas spans the southern Plains without a major east-west mountain barrier across most of the state. Strong continental cold air can surge south behind a front and replace warm air quickly, especially across the Panhandle and northern half of Texas before reaching farther south.",
          "National Weather Service records from Amarillo document examples of temperatures falling dozens of degrees over short periods. The exact temperature change varies by event, so the useful lesson is the speed of the transition rather than one legendary number."
        ]
      },
      {
        heading: "Where the blue in Blue Norther comes from is unsettled",
        body: [
          "Several explanations survive: a blue-black appearance along the approaching front, clear blue sky behind it, or the idea that people turn blue in the sudden cold. The Handbook of Texas presents these as competing folk explanations rather than a settled etymology.",
          "That uncertainty is part of the cultural history. Weather words often survive because generations repeat them, not because someone left a clean origin document."
        ],
        links: [{ href: "/things-unique-to-texas/methodology", label: "How TexasDefined handles folklore and disputed origins" }]
      },
      {
        heading: "Spring storm watching comes from a real seasonal pattern",
        body: [
          "Across parts of Texas, spring brings warm Gulf moisture together with active fronts and upper-level disturbances, creating a familiar season of thunderstorms, hail, damaging wind, tornadoes and flash flooding. The timing and dominant hazards vary by region.",
          "That repeated seasonal experience helps explain the Texas habit of watching the western or northern sky, noticing wind shifts and talking about what the clouds are doing. Those observations may be culturally familiar, but they cannot tell you reliably whether a storm is severe."
        ]
      },
      {
        heading: "The sky is not a warning system",
        body: [
          "Severe weather can develop at night, behind rain, outside a person's line of sight or faster than visual judgment can interpret. Some dangerous storms look dramatic; others do not.",
          "For current decisions, use National Weather Service warnings, local emergency alerts and reliable radar or forecast information. Do not drive toward storms or remain outside to get a better view when lightning, hail, damaging wind or tornado conditions threaten."
        ]
      },
      {
        heading: "Why the language survives even with weather apps",
        body: [
          "A phone can give a more precise forecast than an old phrase, but 'norther' still communicates a recognizable Texas experience: warm air, a sudden wind shift, a plunging thermometer and everybody remembering where they left a jacket.",
          "That is what makes weather vocabulary belong in Things That Define Texas. The value is cultural memory and regional speech—not pretending local sayings outperform modern meteorology."
        ],
        links: [{ href: "/things-unique-to-texas", label: "Things That Define Texas" }]
      }
    ],
    related: [
      { href: "/texas-slang-explained", label: "Texas Slang Explained", description: "See how regional phrases survive because they remain useful in everyday speech." },
      { href: "/things-unique-to-texas/slang-folklore", label: "Texas slang, symbols & folklore", description: "Browse the chapter containing Blue Northers, storm watching and other recurring Texas phrases and myths." },
      { href: "/things-unique-to-texas/wildlife-landscape", label: "Texas wildlife, plants & geography", description: "Connect weather language to the landscapes and regions that make Texas conditions vary so sharply." }
    ]
  },
};

export function getTexasEvergreenGuideBatch6(slug: string) {
  const guide = TEXAS_EVERGREEN_GUIDES_BATCH6[slug];
  if (!guide) throw new Error(`Unknown Texas evergreen batch 6 guide: ${slug}`);
  return guide;
}
