export type GovernedCjLink = Readonly<{
  program: "rexing" | "abracadabra-nyc";
  advertiserId: string;
  linkId: string;
  label: string;
  destination: string;
  intents: readonly string[];
  activation: "tracking-required";
}>;

const governed = (
  program: GovernedCjLink["program"],
  advertiserId: string,
  linkId: string,
  label: string,
  destination: string,
  intents: readonly string[],
): GovernedCjLink => Object.freeze({
  program,
  advertiserId,
  linkId,
  label,
  destination,
  intents: Object.freeze([...intents]),
  activation: "tracking-required",
});

export const REXING_GOVERNED_LINKS = Object.freeze([
  governed("rexing", "5357356", "15735466", "Rexing evergreen", "https://rexing.com/", ["automotive-general", "fallback"]),
  governed("rexing", "5357356", "17315870", "C1 Plus 4K dash cam", "https://rexing.com/products/rexing-c1-plus-ultra-hd-4k-dash-cam-with-wi-fi-built-in-gps", ["dash-cam", "road-trip-tech"]),
  governed("rexing", "5357356", "17315857", "F30 4K + 1080p dual dash cam", "https://rexing.com/products/rexing-f30-4k-1080p-dual-dash-cam", ["dash-cam", "front-rear"]),
  governed("rexing", "5357356", "17315873", "C3 3-channel dash cam", "https://rexing.com/products/rexing-c3-3-channel-dash-cam-4k-front-1080p-cabin-rear", ["dash-cam", "rideshare", "family-driving"]),
  governed("rexing", "5357356", "17315897", "R4-RD 4-channel dash cam", "https://rexing.com/products/rexing-r4-rd-4-channel-dash-cam-with-all-around-1080p-built-in-360-parking-monitor-wi-fi-gps-ir-night-vision?utm_source=copyToPasteBoard&utm_medium=product-links&utm_content=web", ["dash-cam", "parking-monitor"]),
  governed("rexing", "5357356", "17315886", "4G LTE 2-channel dash cam", "https://rexing.com/products/rexing-4g-lte-2-channel-dash-cam-4k-1080p-with-gps?utm_source=copyToPasteBoard&utm_medium=product-links&utm_content=web", ["dash-cam", "remote-access"]),
  governed("rexing", "5357356", "17315888", "2000A jump starter", "https://rexing.com/products/rexing-2000a-jumpstarter?utm_source=copyToPasteBoard&utm_medium=product-links&utm_content=web", ["road-trip-emergency", "vehicle-readiness"]),
  governed("rexing", "5357356", "17315893", "3-in-1 jump starter, tire inflator and air blower", "https://rexing.com/products/rexing-3-in-1-jump-starter-tire-inflator-air-blower-1500a-peak-12v-car-battery-booster-for-6l-gas-3l-diesel-engines-with-150-psi-air-compressor-led-flashlight-12000mah-portable-power-bank?utm_source=copyToPasteBoard&utm_medium=product-links&utm_content=web", ["road-trip-emergency", "vehicle-readiness"]),
  governed("rexing", "5357356", "17315876", "OBD2 scanner", "https://rexing.com/products/rexing-obdii-scanner", ["vehicle-diagnostics", "vehicle-readiness"]),
  governed("rexing", "5357356", "17315880", "CPW-42 wireless CarPlay and Android Auto adapter", "https://rexing.com/products/rexing-cpw-42-wireless-carplay-android-auto-adapter-for-iphone-ios-10-and-android-android-11", ["carplay", "road-trip-tech"]),
  governed("rexing", "5357356", "15764166", "RoadMate CPDuo CarPlay/Android Auto receiver and dash cam", "https://rexing.com/products/rexing-wireless-multimedia-receiver-roadmate-cpduo-carplay-android-auto-dash-cam-feature", ["carplay", "dash-cam", "road-trip-tech"]),
  governed("rexing", "5357356", "17315896", "BC500 in-car baby monitor", "https://rexing.com/products/rexing-bc500-in-car-baby-monitor-hd-1080p-infrared-night-vision?utm_source=copyToPasteBoard&utm_medium=product-links&utm_content=web", ["family-driving", "road-trip-family"]),
  governed("rexing", "5357356", "15078418", "H1 Blackhawk trail camera", "https://rexing.com/products/rexing-h1-blackhawk-night-vision-trail-camera?utm_source=copyToPasteBoard&utm_medium=product-links&utm_content=web", ["hunting", "outdoors", "trail-camera"]),
  governed("rexing", "5357356", "15218435", "FC1 fishing camera", "https://www.rexingusa.com/product/fc1/", ["fishing", "outdoors"]),
  governed("rexing", "5357356", "16951431", "NACS-to-CCS EV adapter", "https://rexing.com/products/rexing-nacs-to-ccs-adapter-for-evs", ["ev", "road-trip-tech"]),
] satisfies readonly GovernedCjLink[]);

export const ABRACADABRA_GOVERNED_LINKS = Object.freeze([
  governed("abracadabra-nyc", "7889430", "17277658", "Abracadabra NYC evergreen", "https://abracadabranyc.com/", ["cosplay-general", "fallback"]),
  governed("abracadabra-nyc", "7889430", "17267156", "Costumes", "https://abracadabranyc.com/collections/costumes", ["costumes", "cosplay", "halloween"]),
  governed("abracadabra-nyc", "7889430", "17267160", "Character Themes", "https://abracadabranyc.com/collections/popular", ["cosplay", "character-themes"]),
  governed("abracadabra-nyc", "7889430", "17267167", "Halloween Masks", "https://abracadabranyc.com/collections/masks", ["masks", "halloween", "cosplay"]),
  governed("abracadabra-nyc", "7889430", "17267169", "Props", "https://abracadabranyc.com/collections/props", ["props", "cosplay"]),
  governed("abracadabra-nyc", "7889430", "17267170", "FX Makeup", "https://abracadabranyc.com/collections/makeup", ["fx-makeup", "cosplay", "halloween"]),
  governed("abracadabra-nyc", "7889430", "17267171", "Wigs", "https://abracadabranyc.com/collections/wigs", ["wigs", "cosplay"]),
  governed("abracadabra-nyc", "7889430", "17267172", "Hats", "https://abracadabranyc.com/collections/hats", ["hats", "costume-accessories"]),
  governed("abracadabra-nyc", "7889430", "17267159", "Collectibles", "https://abracadabranyc.com/collections/collectibles", ["collectibles", "conventions"]),
  governed("abracadabra-nyc", "7889430", "17267165", "Magic", "https://abracadabranyc.com/collections/magic", ["magic", "events"]),
  governed("abracadabra-nyc", "7889430", "17267163", "Unique Gifts", "https://abracadabranyc.com/collections/unique-gifts", ["gifts", "conventions"]),
] satisfies readonly GovernedCjLink[]);

export const CJ_GOVERNED_LINKS = Object.freeze([
  ...REXING_GOVERNED_LINKS,
  ...ABRACADABRA_GOVERNED_LINKS,
]);

export function governedCjLink(program: GovernedCjLink["program"], linkId: string) {
  return CJ_GOVERNED_LINKS.find((link) => link.program === program && link.linkId === linkId) ?? null;
}

/**
 * These records intentionally contain merchant destinations but no shopper tracking href.
 * Activation requires exact CJ Get Link output (or a verified advertiser-supported DLG)
 * bound to TexasDefined's promotional property. Never turn destination into href directly.
 */
