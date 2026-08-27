const TEXAS_ICON_EDITORIAL_HOLD_SUMMARIES: Readonly<Record<string, string>> = {
  "john-crump": "This owner-supplied intake identity remains under editorial verification. TexasDefined has not confirmed which John Crump, if any, supports the supplied early Texas oil-industry claim.",
  "burt-buddy-crump": "This owner-supplied intake identity remains under editorial verification. TexasDefined has not found authoritative evidence tying Burt ‘Buddy’ Crump to the supplied Texas wildcatter and industrial-builder claim.",
  "cyrus-vance": "This roster row remains under editorial verification because authoritative biographical records do not substantiate the supplied claim of formative Texas business years.",
  "james-truett": "This owner-supplied intake identity remains under editorial verification. TexasDefined has not matched the supplied Fort Worth aerospace-engineer description to an authoritative person record.",
  "margarita-salas": "This roster row remains under editorial verification because the documented scientist Margarita Salas does not match the supplied Houston-laboratory description.",
  "slick-woods": "This roster row remains under editorial verification because the supplied Houston-birth claim conflicts with established biographical records. No Texas profile is being published from that claim.",
  "trey-parker": "This roster row remains under editorial verification because the supplied Texas connection has not been substantiated. TexasDefined will not silently substitute Houston-born collaborator Matt Stone for Trey Parker.",
};

export const TEXAS_ICON_EDITORIAL_HOLD_SLUGS = Object.freeze(
  Object.keys(TEXAS_ICON_EDITORIAL_HOLD_SUMMARIES),
);

export function texasIconEditorialHoldSummary(slug: string) {
  return TEXAS_ICON_EDITORIAL_HOLD_SUMMARIES[slug] ?? null;
}
