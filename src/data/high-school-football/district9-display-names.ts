// UI-only aliases for official UIL 2026–28 District 9 school names.
// Keep the UIL identity and profile paths unchanged.
const DISTRICT9_DISPLAY_NAMES: Record<string, string> = {
  'Garland Lakeview Cent': 'Lakeview Centennial',
  'Garland Rowlett': 'Rowlett',
  'Garland Sachse': 'Sachse',
};
export const district9DisplayName = (uilName: string) => DISTRICT9_DISPLAY_NAMES[uilName] ?? uilName;
