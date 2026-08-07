import type { Destination, ImageRef } from "./types";

const PLACEHOLDER_MARKERS = [
  "texasdefined-destination-placeholder",
  "texasdefined-placeholder",
];

function hash(input: string): number {
  let value = 2166136261;
  for (let index = 0; index < input.length; index += 1) {
    value ^= input.charCodeAt(index);
    value = Math.imul(value, 16777619);
  }
  return value >>> 0;
}

function escapeXml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

function isPlaceholder(src: string): boolean {
  return !src || PLACEHOLDER_MARKERS.some((marker) => src.includes(marker));
}

type Scene = "water" | "canyon" | "coast" | "forest" | "cave" | "historic" | "prairie";

function sceneFor(destination: Destination): Scene {
  const text = `${destination.name} ${destination.summary} ${destination.highlights.join(" ")}`.toLowerCase();
  if (/cavern|cave|sinkhole/.test(text)) return "cave";
  if (/island|beach|coast|gulf|sea rim|shore/.test(text)) return "coast";
  if (/canyon|mountain|rock|mesa|sandhill|desert/.test(text)) return "canyon";
  if (/lake|river|reservoir|paddl|swim|fish|water/.test(text)) return "water";
  if (/historic|fort|mission|battle|ccc|museum/.test(text)) return "historic";
  if (/pine|forest|woods|oak|wooded/.test(text)) return "forest";
  return "prairie";
}

function palette(seed: number) {
  const palettes = [
    ["#e9d8bd", "#d38455", "#743d2b", "#274b43", "#9fc1c0"],
    ["#eadfc9", "#c99a5f", "#755a38", "#365548", "#8fb0a5"],
    ["#f0dfc3", "#c7744d", "#633b30", "#3f5f58", "#9bbec4"],
    ["#ead6b7", "#b98554", "#6b4932", "#2f5148", "#8aaeb1"],
    ["#efe2ca", "#d08a62", "#704335", "#385c50", "#94b6b4"],
  ];
  return palettes[seed % palettes.length];
}

function sceneMarkup(scene: Scene, colors: string[], seed: number): string {
  const [, accent, earth, green, water] = colors;
  const offset = seed % 170;

  if (scene === "water") {
    return `<path d="M0 610 C240 ${545 + (offset % 35)} 420 690 700 620 C920 565 1130 610 1600 555 L1600 900 L0 900Z" fill="${water}"/><path d="M0 650 C260 585 500 720 820 650 C1110 590 1300 655 1600 610" fill="none" stroke="#fff" stroke-opacity=".38" stroke-width="7"/><path d="M0 535 C250 475 390 500 610 445 C850 385 1060 475 1280 420 C1430 385 1525 402 1600 390 L1600 635 C1260 615 1050 600 805 630 C515 665 270 600 0 625Z" fill="${green}" opacity=".92"/>`;
  }
  if (scene === "coast") {
    return `<path d="M0 595 C320 535 520 675 820 615 C1110 555 1360 615 1600 565 L1600 900 L0 900Z" fill="${water}"/><path d="M0 590 C300 520 560 625 790 585 C1030 545 1260 575 1600 520 L1600 650 C1290 680 1080 650 800 700 C520 748 260 690 0 735Z" fill="${colors[0]}"/><path d="M80 575 Q140 500 200 575 M310 590 Q380 500 450 590 M1210 548 Q1270 470 1330 548" fill="none" stroke="${green}" stroke-width="18" stroke-linecap="round"/>`;
  }
  if (scene === "canyon") {
    return `<path d="M0 610 L190 430 L355 500 L520 315 L720 485 L915 300 L1100 490 L1320 350 L1600 530 L1600 900 L0 900Z" fill="${earth}"/><path d="M0 650 L250 520 L430 600 L620 430 L790 590 L1020 440 L1210 575 L1430 465 L1600 550 L1600 900 L0 900Z" fill="${accent}" opacity=".88"/><path d="M0 735 C400 680 760 760 1110 700 C1330 665 1460 690 1600 680 L1600 900 L0 900Z" fill="${green}" opacity=".6"/>`;
  }
  if (scene === "cave") {
    return `<path d="M0 900 V250 Q170 80 360 180 Q520 20 725 170 Q935 20 1110 190 Q1370 55 1600 260 V900Z" fill="${earth}"/><path d="M330 900 V545 Q365 305 800 300 Q1235 305 1270 545 V900Z" fill="#241f1c"/><ellipse cx="800" cy="750" rx="330" ry="62" fill="${water}" opacity=".45"/><circle cx="800" cy="448" r="54" fill="${accent}" opacity=".68"/>`;
  }
  if (scene === "historic") {
    return `<path d="M0 700 C300 640 510 710 800 650 C1120 585 1370 650 1600 610 L1600 900 L0 900Z" fill="${green}"/><rect x="520" y="410" width="560" height="320" rx="8" fill="${earth}"/><path d="M455 430 L800 250 L1145 430Z" fill="${accent}"/><rect x="740" y="535" width="120" height="195" fill="#2a2723"/><rect x="585" y="500" width="95" height="90" fill="${colors[0]}" opacity=".8"/><rect x="920" y="500" width="95" height="90" fill="${colors[0]}" opacity=".8"/>`;
  }
  if (scene === "forest") {
    return `<path d="M0 700 C280 625 550 730 830 655 C1100 585 1320 650 1600 600 L1600 900 L0 900Z" fill="${green}"/><g fill="${earth}"><path d="M160 670 L245 390 L330 670Z"/><path d="M350 690 L455 330 L560 690Z"/><path d="M1090 670 L1190 350 L1290 670Z"/><path d="M1290 700 L1395 405 L1500 700Z"/></g><path d="M0 760 C360 710 630 790 920 735 C1180 685 1380 720 1600 700" fill="none" stroke="${water}" stroke-width="48" opacity=".75"/>`;
  }
  return `<path d="M0 690 C250 595 470 710 700 620 C920 535 1100 650 1320 580 C1440 540 1530 548 1600 550 L1600 900 L0 900Z" fill="${green}"/><path d="M0 770 C360 705 650 790 930 735 C1160 690 1370 720 1600 690 L1600 900 L0 900Z" fill="${accent}" opacity=".62"/><circle cx="${250 + offset * 3}" cy="260" r="74" fill="#f3bd73" opacity=".92"/>`;
}

function generatedHero(destination: Destination): ImageRef {
  const seed = hash(destination.slug);
  const colors = palette(seed);
  const scene = sceneFor(destination);
  const title = escapeXml(destination.name);
  const town = escapeXml(destination.nearestTown || "Texas");
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 900" role="img" aria-labelledby="title desc"><title id="title">${title}</title><desc id="desc">Illustrated landscape inspired by ${title} in Texas.</desc><defs><linearGradient id="sky" x1="0" y1="0" x2="0" y2="1"><stop stop-color="#9fc4d1"/><stop offset=".58" stop-color="${colors[0]}"/><stop offset="1" stop-color="#f1c995"/></linearGradient></defs><rect width="1600" height="900" fill="url(#sky)"/>${sceneMarkup(scene, colors, seed)}<rect x="58" y="58" width="1484" height="784" rx="18" fill="none" stroke="#fff" stroke-opacity=".35" stroke-width="3"/><text x="88" y="118" font-family="Georgia,serif" font-size="34" letter-spacing="5" fill="#3a2b24" opacity=".82">TEXAS DEFINED · STATE PARKS</text><text x="88" y="790" font-family="Georgia,serif" font-size="54" font-weight="700" fill="#fff">${title}</text><text x="90" y="836" font-family="Arial,sans-serif" font-size="27" letter-spacing="2" fill="#fff" opacity=".88">${town.toUpperCase()} · TEXAS</text></svg>`;
  return {
    src: `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`,
    alt: `Illustrated hero for ${destination.name} in Texas`,
    width: 1600,
    height: 900,
    credit: "Texas Defined illustration",
  };
}

export function ensureStateParkHero(destination: Destination): Destination {
  if (destination.category !== "state-parks") return destination;
  if (!isPlaceholder(destination.hero.src)) return destination;
  return { ...destination, hero: generatedHero(destination) };
}

export function ensureUniqueStateParkHeroes(destinations: Destination[]): Destination[] {
  const used = new Set<string>();
  return destinations.map((destination) => {
    if (destination.category !== "state-parks") return destination;
    const candidate = ensureStateParkHero(destination);
    if (!used.has(candidate.hero.src)) {
      used.add(candidate.hero.src);
      return candidate;
    }
    const unique = { ...candidate, hero: generatedHero({ ...candidate, slug: `${candidate.slug}-hero` }) };
    used.add(unique.hero.src);
    return unique;
  });
}
