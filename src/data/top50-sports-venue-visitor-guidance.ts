/** Carefully scoped Top-50 visitor Q&A for event-driven venue guides.
 * Checked 2026-10-18. Venue-wide source review timestamps are unchanged;
 * visit-specific ticket and arrival rules are governed by the event organizer.
 */
export const top50VenueGuidance: Record<string, {
 faqs: readonly { question: string; answer: string; sourceUrl: string }[];
 sources: readonly { label: string; href: string }[];
}> = {
  "att-stadium": {
    "faqs": [
      {
        "question": "How long is a guided AT&T Stadium tour?",
        "answer": "The stadium's official guided-tour FAQ estimates approximately 90 minutes. Wear comfortable shoes and reserve for an eligible tour date rather than assuming a game-day visit has the same access.",
        "sourceUrl": "https://attstadium.com/tours/tours-faqs/"
      },
      {
        "question": "Can a stadium tour guarantee access to the playing field or locker rooms?",
        "answer": "No. AT&T Stadium warns that tour locations, stops, dates and times can change without notice due to stadium events. Treat any particular field or locker-room stop as subject to availability.",
        "sourceUrl": "https://attstadium.com/tours/tours-faqs/"
      },
      {
        "question": "Does the stadium apply the same bag rule to every tour and game?",
        "answer": "No. The official tour FAQ distinguishes Rally Day clear-bag restrictions from ordinary tour days, when bags may be allowed after inspection. Follow the rules for your exact event or ticket.",
        "sourceUrl": "https://attstadium.com/tours/tours-faqs/"
      }
    ],
    "sources": [
      {
        "label": "AT&T Stadium official tour FAQ and ticket restrictions",
        "href": "https://attstadium.com/tours/tours-faqs/"
      }
    ]
  },
  "circuit-of-the-americas": {
    "faqs": [
      {
        "question": "Does COTA general admission include grandstand seating or paddock access?",
        "answer": "No. COTA says general admission permits designated general-admission viewing areas around the circuit, but grandstand seating needs an eligible seat ticket and paddock access requires separately issued credentials.",
        "sourceUrl": "https://help.thecircuit.com/hc/en-us/articles/39584380916244-Where-does-my-ticket-allow-me-to-access"
      },
      {
        "question": "Can drivers arrive without a parking pass for a major COTA race weekend?",
        "answer": "For the published 2026 Formula 1 event, the circuit says on-site parking and COTA Boulevard vehicle access require a valid pre-purchased parking pass. Check the precise event plan before you drive.",
        "sourceUrl": "https://circuitoftheamericas.com/event/f1/know-before-you-go-drft/"
      },
      {
        "question": "Where should rideshare visitors go for the 2026 United States Grand Prix?",
        "answer": "The circuit's 2026 race-weekend guide directs rideshare to the North McAngus area and provides a complimentary tram connection to Grand Plaza. Other events may use different lots, so follow your event's current instructions.",
        "sourceUrl": "https://circuitoftheamericas.com/event/f1/know-before-you-go-drft/"
      }
    ],
    "sources": [
      {
        "label": "Circuit of The Americas official ticket-access FAQ",
        "href": "https://help.thecircuit.com/hc/en-us/articles/39584380916244-Where-does-my-ticket-allow-me-to-access"
      },
      {
        "label": "COTA 2026 USGP parking and transit guide",
        "href": "https://circuitoftheamericas.com/event/f1/know-before-you-go-drft/"
      }
    ]
  }
};

export function getTop50VenueGuidance(slug: string) {
 return top50VenueGuidance[slug];
}
