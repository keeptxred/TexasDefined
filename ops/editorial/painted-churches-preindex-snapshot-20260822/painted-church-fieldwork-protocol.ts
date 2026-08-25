export type PaintedChurchFieldworkSection = {
  id: string;
  title: string;
  purpose: string;
  required: string[];
  optional: string[];
};

export const paintedChurchFieldworkSections: PaintedChurchFieldworkSection[] = [
  {
    id: "identity-and-access",
    title: "Property identity, access and visitor conditions",
    purpose: "Verify the exact building and document what a visitor can responsibly rely on today.",
    required: [
      "Confirm street address, church name, congregation/parish identity and date of visit.",
      "Record visitor entrance, parking location, accessibility path and any locked/limited areas.",
      "Photograph posted hours, visitor notices and photography rules when permitted.",
      "Record whether information came from signage, staff, clergy, docent or direct observation.",
    ],
    optional: ["Record public restroom availability and group-tour procedures.", "Record an entrance/parking GPS point distinct from the building centroid."],
  },
  {
    id: "exterior-survey",
    title: "Exterior architectural survey",
    purpose: "Create an original, rights-controlled visual record of the building and setting.",
    required: [
      "Straight-on principal elevation.",
      "Three-quarter views from both sides where public access permits.",
      "Tower/steeple, windows, masonry/wood construction and significant additions.",
      "Historic markers, cornerstones, plaques and cemetery/church-complex context.",
    ],
    optional: ["Document visible storm/fire repairs, later additions and accessibility modifications.", "Capture a context view showing the church in its settlement or urban block."],
  },
  {
    id: "interior-overview",
    title: "Interior orientation survey",
    purpose: "Record the whole decorative ensemble before isolating individual objects.",
    required: [
      "Nave looking toward sanctuary/apse.",
      "Sanctuary looking back toward nave, gallery or entrance when allowed.",
      "Ceiling/vault overview.",
      "Both side aisles or principal wall fields.",
      "One scale/context photograph for every later object-level detail sequence.",
    ],
    optional: ["Choir loft/gallery overview.", "Sacristy or side chapel only with explicit permission."],
  },
  {
    id: "paint-and-techniques",
    title: "Decorative painting and technique survey",
    purpose: "Test archival technique claims against the visible fabric without inferring methods from appearance alone.",
    required: [
      "Photograph documented stencil fields, freehand scenes, faux marble, graining and architectural illusion where present.",
      "Capture seams, bubbles, cracks or edges that may reveal canvas-applied decoration when safely visible.",
      "Record exact architectural location for each photographed technique.",
      "Separate observed appearance from technique claims supported by archival/conservation sources.",
    ],
    optional: ["Macro/detail views that show brushwork or transfer-pattern evidence without touching the surface.", "Conservator/docent explanation recorded only with permission and attribution."],
  },
  {
    id: "iconography-and-inscriptions",
    title: "Symbols, narrative scenes and inscriptions",
    purpose: "Build a church-specific iconographic record instead of applying generic symbolism across the collection.",
    required: [
      "Photograph every major narrative mural and named saint/devotional scene that can be identified safely.",
      "Photograph inscriptions straight-on at readable resolution.",
      "Transcribe exactly as visible before translating or normalizing spelling.",
      "Record language, location, adjacent imagery and any biblical/liturgical citation visible on site.",
    ],
    optional: ["Ask parish historian/docent about locally understood symbolism, clearly labeling oral interpretation as such.", "Record uncertain iconography as unresolved rather than guessing."],
  },
  {
    id: "glass-and-furnishings",
    title: "Stained glass, altars and sacred furnishings",
    purpose: "Document the interior as an ensemble rather than reducing the Painted Churches story to wall paint.",
    required: [
      "Stained-glass window overview plus maker/donor inscriptions where visible.",
      "Main altar/reredos and major side altars.",
      "Pulpit, organ/gallery, Stations of the Cross and significant statues/furnishings where relevant.",
      "Record maker, donor, date or origin only when signage, records or authoritative sources support it.",
    ],
    optional: ["Create a window-by-window inventory for churches with substantial historic glass.", "Record evidence that an object was removed, relocated or reconstructed."],
  },
  {
    id: "preservation-condition",
    title: "Preservation and condition evidence",
    purpose: "Separate original work, restoration, reconstruction and modern campaigns using observable evidence plus records.",
    required: [
      "Record visible cracking, water staining, lifting canvas, repaint boundaries or patched surfaces without diagnosing causes beyond evidence.",
      "Photograph restoration plaques or project acknowledgments.",
      "Ask whether conservation reports, treatment records or before/after photographs are available.",
      "Never describe work as original, restored or reconstructed solely from visual appearance.",
    ],
    optional: ["Interview conservator/restorer about materials and treatment philosophy with explicit permission.", "Record environmental/maintenance concerns only when a responsible source confirms them."],
  },
  {
    id: "oral-history",
    title: "Oral history and expert interviews",
    purpose: "Add firsthand evidence while preserving consent, attribution and the distinction between memory and documentary proof.",
    required: [
      "Obtain explicit permission before recording audio/video or publishing quotations.",
      "Record interviewee name, role, relationship to church, interview date and agreed attribution form.",
      "Ask separately for recording permission, quotation permission, photograph permission and future archival use.",
      "Mark recollection, family tradition and documentary fact as different evidence types.",
    ],
    optional: ["Offer interviewee a factual transcript/quotation check when practical.", "Ask about parish archives, restorations, artist descendants and undocumented photographs."],
  },
  {
    id: "closeout",
    title: "Fieldwork closeout and provenance",
    purpose: "Make the field record reproducible and safe to publish.",
    required: [
      "Preserve original image filenames and EXIF capture time before derivative editing.",
      "Create a field-note record with date, researchers present, access conditions and source contacts.",
      "Link each publishable image to church slug, feature/object ID, location and caption evidence.",
      "Log unresolved questions instead of filling them from memory after the visit.",
      "Update visitor-status checkedAt only for facts actually reverified on the visit.",
    ],
    optional: ["Deposit a preservation copy of interviews/releases and high-resolution originals in a controlled archive.", "Create a public change note when field evidence materially changes an existing attribution or integrity classification."],
  },
];

export const paintedChurchFieldworkReleaseRules = [
  "No audio/video recording without explicit participant permission.",
  "No verbatim quotation published beyond the permission granted by the interviewee or source rights holder.",
  "No photography in restricted worship, altar, choir-loft, sacristy or private areas without permission.",
  "No touching, measuring against, moving or staging historic fabric or devotional objects for photography.",
  "No claim of expert conservation assessment unless a qualified named expert actually provided it.",
  "No fieldwork checkbox may be marked complete from web research, archival research or third-party photography alone.",
] as const;

export const paintedChurchCoreInterviewQuestions = [
  "What parts of the interior are believed to be original, restored, reconstructed or later additions, and what records support that distinction?",
  "Who painted, designed, built or restored the interior, and are parish/archive records available for those attributions?",
  "Which images, symbols or inscriptions have a specific local meaning or story documented by the congregation?",
  "What major preservation campaigns, disasters, repaintings or removals changed what visitors see today?",
  "Are there historic photographs, blueprints, invoices, parish chronicles, donor records or restoration reports that researchers may consult?",
  "Are any photography, quotation or publication restrictions important for researchers to understand?",
] as const;
