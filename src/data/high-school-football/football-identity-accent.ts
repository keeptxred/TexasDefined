const EDITORIAL_COLOR_TOKENS: readonly Array<{ token: RegExp; hex: string }> = [
  { token: /\bcolumbia blue\b/i, hex: '#5B8FB9' },
  { token: /\b(?:navy blue|navy)\b/i, hex: '#35506F' },
  { token: /\b(?:texas burnt orange|burnt orange)\b/i, hex: '#A6531A' },
  { token: /\bkelly green\b/i, hex: '#3B7D4A' },
  { token: /\b(?:hunter green|forest green)\b/i, hex: '#365F49' },
  { token: /\bcrimson\b/i, hex: '#8A3344' },
  { token: /\bscarlet\b/i, hex: '#A33E49' },
  { token: /\bmaroon\b/i, hex: '#743B48' },
  { token: /\broyal blue\b/i, hex: '#3F6394' },
  { token: /\broyal\b/i, hex: '#496A99' },
  { token: /\bpurple\b/i, hex: '#675386' },
  { token: /\bred\b/i, hex: '#A4474A' },
  { token: /\b(?:desert orange|orange)\b/i, hex: '#B76530' },
  { token: /\b(?:panther blue|roo blue|frenship blue|bright blue|blue)\b/i, hex: '#456F99' },
  { token: /\bgreen\b/i, hex: '#46765A' },
  { token: /\bbrown\b/i, hex: '#765C43' },
  { token: /\bold gold\b/i, hex: '#9B833F' },
  { token: /\bgold\b/i, hex: '#A88435' },
  { token: /\bteal\b/i, hex: '#397775' },
];

/**
 * Convert a verified school-color label into a restrained TexasDefined accent.
 *
 * These values are intentionally editorial approximations, not school brand hex
 * codes. Neutral-only color labels return undefined, and raw identity strings
 * are never passed through as CSS values.
 */
export function footballIdentityAccentFromColors(colors?: string | null) {
  if (!colors) return undefined;

  let best: { index: number; order: number; hex: string } | undefined;
  EDITORIAL_COLOR_TOKENS.forEach(({ token, hex }, order) => {
    const match = token.exec(colors);
    if (!match) return;
    const candidate = { index: match.index, order, hex };
    if (!best || candidate.index < best.index || (candidate.index === best.index && candidate.order < best.order)) {
      best = candidate;
    }
  });

  return best?.hex;
}
