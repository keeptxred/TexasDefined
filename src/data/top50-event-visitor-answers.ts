/** Attraction-specific official visitor answers for three Top-50 recurring events.
 * Verified against named organizers 2026-10-18. These are not claims of
 * current ticket stock, parking space availability or future-year prices.
 */
const ANSWERS = {
  "houston-livestock-show-rodeo": {
    "name": "Houston Livestock Show and Rodeo",
    "questions": [
      {
        "question": "Does a rodeo grounds ticket include the nightly stadium concert?",
        "answer": "No. The organizer says grounds admission covers public activities and the carnival area, but not entry to the stadium rodeo performance or concert. Buy the correct rodeo/concert ticket for that experience.",
        "sourceUrl": "https://www.rodeohouston.com/tickets/"
      },
      {
        "question": "Does a rodeo and concert ticket also admit visitors to the fairgrounds?",
        "answer": "Yes. RODEOHOUSTON says its rodeo/concert ticket includes the stadium performance and general access to public grounds activities, with carnival rides and games sold separately.",
        "sourceUrl": "https://www.rodeohouston.com/tickets/"
      },
      {
        "question": "When are the 2027 rodeo and barbecue cook-off scheduled?",
        "answer": "The organizer has announced the Houston Livestock Show and Rodeo for March 2–21, 2027, and the World’s Championship Bar-B-Que Contest for February 25–27. These are separate calendar periods with distinct ticket rules.",
        "sourceUrl": "https://www.rodeohouston.com/the-houston-livestock-show-and-rodeo-announces-2027-dates/"
      }
    ]
  },
  "texas-renaissance-festival": {
    "name": "Texas Renaissance Festival",
    "questions": [
      {
        "question": "When does the 2026 Texas Renaissance Festival operate?",
        "answer": "The festival's published 2026 schedule is Saturdays and Sundays from October 10 through November 29, plus Thanksgiving Friday. Verify the schedule for the date you choose; last admission is earlier than closing.",
        "sourceUrl": "https://www.texrenfest.com/p/the-kingdom/directions--parking"
      },
      {
        "question": "Is parking free, and does premium parking include admission?",
        "answer": "General parking and qualifying accessible parking are offered free. Optional closer premium and preferred parking are separately priced and explicitly do not include festival admission.",
        "sourceUrl": "https://www.texrenfest.com/p/the-kingdom/directions--parking"
      },
      {
        "question": "Does the Texas Renaissance Festival close for rain?",
        "answer": "The organizer advertises the outdoor event as rain or shine and says tickets are not eligible for refunds, exchanges or rain checks under its stated policy. Check alerts for any exceptional closure.",
        "sourceUrl": "https://www.texrenfest.com/p/the-kingdom/directions--parking"
      }
    ]
  },
  "state-fair-of-texas": {
    "name": "State Fair of Texas",
    "questions": [
      {
        "question": "When did the 2026 State Fair of Texas take place?",
        "answer": "The organizer's confirmed 2026 dates were September 25 through October 18 at Fair Park in Dallas. This is historical 2026 information; do not use those dates as the schedule for a future fair.",
        "sourceUrl": "https://bigtex.com/FAQ/"
      },
      {
        "question": "Are the State Fair of Texas concerts included with admission?",
        "answer": "Yes. The official 2026 FAQ says public fairground concerts and stage performances were included with admission; other attractions, rides and special events could carry separate charges.",
        "sourceUrl": "https://bigtex.com/faqs/live-music-concerts/"
      },
      {
        "question": "Can visitors take DART rail directly to Fair Park?",
        "answer": "Yes. The official fair guide identifies Fair Park and MLK Jr. stations on the DART Green Line as visitor arrival points for the Fair Park grounds.",
        "sourceUrl": "https://bigtex.com/FAQ/"
      }
    ]
  }
} as const;
export type Top50EventSlug = keyof typeof ANSWERS;
export function getTop50EventAnswers(slug: string) {
  return ANSWERS[slug as Top50EventSlug] as (typeof ANSWERS)[Top50EventSlug] | undefined;
}
