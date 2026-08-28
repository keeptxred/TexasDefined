export const TEXAS_GATEWAY_CONSOLIDATION_TARGETS: Readonly<Record<string, string>> = {
  "best-texas-anniversary-weekend-trips": "best-romantic-weekend-getaways-in-texas",
  "best-texas-trips-before-school-starts": "best-texas-family-road-trips",
  "best-texas-january-weekend-trips": "best-winter-weekend-trips-in-texas",
  "best-texas-march-weekend-trips": "best-spring-weekend-trips-in-texas",
  "best-texas-october-weekend-trips": "best-fall-weekend-trips-in-texas",
  "best-texas-february-weekend-trips": "best-winter-weekend-trips-in-texas",
  "best-texas-april-weekend-trips": "best-spring-weekend-trips-in-texas",
  "best-texas-may-weekend-trips": "best-spring-weekend-trips-in-texas",
  "best-texas-june-weekend-trips": "things-to-do-in-texas-summer-without-melting",
  "best-texas-july-weekend-trips": "things-to-do-in-texas-summer-without-melting",
  "best-texas-august-weekend-trips": "things-to-do-in-texas-summer-without-melting",
  "best-texas-september-weekend-trips": "best-fall-weekend-trips-in-texas",
  "best-texas-november-weekend-trips": "best-fall-weekend-trips-in-texas",
  "best-texas-december-weekend-trips": "best-winter-weekend-trips-in-texas",
  "things-texans-take-very-seriously": "things-that-define-texas",
  "things-that-confuse-people-from-other-states-about-texas": "things-nobody-tells-you-before-moving-to-texas",
  "signs-youve-lived-in-texas-long-enough": "you-know-youre-a-texan-if",
  "texas-summer-habits-locals-learn": "things-you-understand-after-a-texas-summer",
  "texas-road-trip-habits-locals-learn": "things-you-see-on-a-texas-road-trip",
};

export function getTexasGatewayConsolidationTarget(slug: string): string | null {
  return TEXAS_GATEWAY_CONSOLIDATION_TARGETS[slug] ?? null;
}
