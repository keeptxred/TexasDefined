import type { Article } from "../types";

/**
 * Article-specific, rights-reviewed imagery shared by the lightweight catalog stubs
 * and full relocation articles. Do not send all three unrelated subjects through
 * the generic road-trip placeholder again.
 *
 * The matching license/source links are declared in heritage-photo-license-links.ts,
 * so each article renders clickable credit and license information.
 */
export const moverVerificationHero: Article["hero"] = {
  src: "https://commons.wikimedia.org/wiki/Special:Redirect/file/U-Haul_Moving_Truck.jpg?width=1280",
  alt: "A moving rental truck, illustrating the vehicle type to verify before hiring a household-goods mover",
  width: 1280,
  height: 960,
  credit: "Tony Webster · Wikimedia Commons · CC BY 2.0 (illustrative photo, not an endorsement)",
};

export const healthCoverageHero: Article["hero"] = {
  src: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Doctor_consults_with_patient.jpg?width=1280",
  alt: "A physician consulting with a patient and other clinical staff",
  width: 1280,
  height: 834,
  credit: "National Cancer Institute / National Institutes of Health · Public Domain",
};

export const militaryFamilyHero: Article["hero"] = {
  src: "https://commons.wikimedia.org/wiki/Special:Redirect/file/BOSP_helps_single-parent_soldiers_manage_Army_and_family_life_120908-A-XZ708-003.jpg?width=1280",
  alt: "A U.S. Army soldier spending time with her children at a Fort Bliss family program in Texas",
  width: 1280,
  height: 848,
  credit: "Spc. Adam Garlington / U.S. Army · Wikimedia Commons · Public Domain",
};
