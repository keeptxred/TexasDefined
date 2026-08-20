import type { PaintedChurchTechniqueSlug } from "./painted-churches-expanded";

export type PaintedChurchTechnique = {
  slug: PaintedChurchTechniqueSlug;
  name: string;
  shortDefinition: string;
  answer: string;
  howItWorks: string[];
  whatToLookFor: string[];
  sourceLabel: string;
  sourceUrl: string;
  churchSlugs: string[];
  related: PaintedChurchTechniqueSlug[];
};

const PBS_TECHNIQUES = "https://austinpbs.org/paintedchurches/decorative";
const THEMATIC_NOMINATION = "https://npgallery.nps.gov/GetAsset/0534eaa0-e073-4836-815e-d10985b22d13";

export const paintedChurchTechniques: PaintedChurchTechnique[] = [
  {
    slug: "stenciling",
    name: "Stenciling",
    shortDefinition: "Repeating painted patterns made with a cut template.",
    answer: "Stenciling uses a reusable template cut with a pattern. The template is placed against the wall or ceiling, paint is applied through the openings, and the template is removed to leave a crisp repeating design. The original 1982 statewide nomination specifically documents stenciling at Ammannsville, Fredericksburg, Moravia and Wallis; later church-specific research supports additional examples.",
    howItWorks: ["A pattern is cut into heavy paper, metal or another durable template.", "The template is positioned on the surface and paint is applied through the openings.", "Multiple templates or colors can build a more complex repeating design."],
    whatToLookFor: ["Repeating flat-color motifs", "Regular borders around ceilings or wall panels", "Small variations caused by hand positioning of the stencil"],
    sourceLabel: "Austin PBS techniques + 1982 National Register thematic nomination",
    sourceUrl: PBS_TECHNIQUES,
    churchSlugs: ["dubina-saints-cyril-methodius", "high-hill-nativity-of-mary", "ammannsville-st-john-the-baptist", "praha-st-marys-assumption", "moravia-ascension-of-our-lord", "wallis-guardian-angel", "lindsay-st-peters-catholic-church", "fredericksburg-st-marys-catholic-church", "sweet-home-queen-of-peace", "serbin-st-paul-lutheran-church", "plantersville-st-marys-catholic-church"],
    related: ["infill", "pouncing"],
  },
  {
    slug: "infill",
    name: "Infill painting",
    shortDefinition: "A transferred outline filled and shaded by hand.",
    answer: "Infill is a variation on stenciling. Instead of painting directly through the whole template, the artist transfers an outline and then fills the design by hand. The 1982 thematic nomination identifies infill at Ammannsville, in Moravia's medallions and at Wesley Brethren Church.",
    howItWorks: ["A stencil or pattern establishes the outline.", "The outline is transferred with pencil, charcoal or brush.", "The template is removed and the artist paints inside the transferred shape by hand."],
    whatToLookFor: ["Repeated motifs with hand-painted shading", "Larger ornament than typical small stencil bands", "Small differences between nominally repeated designs"],
    sourceLabel: "1982 National Register thematic nomination + Austin PBS",
    sourceUrl: THEMATIC_NOMINATION,
    churchSlugs: ["ammannsville-st-john-the-baptist", "moravia-ascension-of-our-lord", "wesley-brethren-church"],
    related: ["stenciling", "pouncing", "freehand"],
  },
  {
    slug: "freehand",
    name: "Freehand painting",
    shortDefinition: "Murals and individualized designs painted without a repeating template.",
    answer: "Freehand painting covers individualized representational or ornamental work painted without a repeating stencil. The 1982 nomination explicitly identifies freehand examples at the St. Mary's church in Lavaca County, High Hill, Sweet Home and Wallis; later research documents additional freehand and mural programs statewide.",
    howItWorks: ["The artist lays out a composition directly or from a drawing.", "Forms are modeled and shaded by hand rather than repeated from a single cut template.", "The method accommodates narrative religious scenes and one-of-a-kind ornament."],
    whatToLookFor: ["Narrative religious scenes", "Individualized figures or landscapes", "Shading and brushwork that changes across the composition"],
    sourceLabel: "1982 National Register thematic nomination + Austin PBS",
    sourceUrl: THEMATIC_NOMINATION,
    churchSlugs: ["high-hill-nativity-of-mary", "st-marys-immaculate-conception-lavaca", "wallis-guardian-angel", "praha-st-marys-assumption", "moravia-ascension-of-our-lord", "wesley-brethren-church", "umbarger-st-marys-catholic-church", "fredericksburg-st-marys-catholic-church", "sweet-home-queen-of-peace", "shiner-saints-cyril-methodius", "serbin-st-paul-lutheran-church", "palestine-sacred-heart-catholic-church", "bandera-st-stanislaus-catholic-church", "corpus-christi-sacred-heart-catholic-church"],
    related: ["decorative-murals", "infill"],
  },
  {
    slug: "marbling",
    name: "Marbling",
    shortDefinition: "Paint used to imitate costly polished marble or dressed stone.",
    answer: "Marbling is hand-painted faux stone. Decorative painters used layered color and veining to make inexpensive wood or plaster resemble marble. The 1982 thematic nomination documents marbling at High Hill, Praha, Sweet Home and Wallis, and a related faux-dressed-stone wall treatment at Moravia.",
    howItWorks: ["Base colors establish the stone tone.", "Veins, mottling and translucent layers imitate natural marble.", "Polished-looking highlights make wood or plaster read visually as stone."],
    whatToLookFor: ["Columns that look like stone but are structurally wood", "Vein-like lines and mottled color", "Painted wall blocks designed to imitate dressed masonry"],
    sourceLabel: "1982 National Register thematic nomination + Austin PBS",
    sourceUrl: THEMATIC_NOMINATION,
    churchSlugs: ["high-hill-nativity-of-mary", "ammannsville-st-john-the-baptist", "praha-st-marys-assumption", "moravia-ascension-of-our-lord", "wallis-guardian-angel", "sweet-home-queen-of-peace", "shiner-saints-cyril-methodius", "bandera-st-stanislaus-catholic-church"],
    related: ["graining", "trompe-loeil-architectural-illusion"],
  },
  {
    slug: "graining",
    name: "Wood graining",
    shortDefinition: "Paint used to make common wood resemble more expensive species.",
    answer: "Graining is faux wood painting. Artists used brushes, combs or rollers to imitate expensive woods such as mahogany or rosewood on cheaper material. The original 1982 thematic nomination identifies the pews at St. Joseph's Church in Galveston as the only graining example among its 15 churches.",
    howItWorks: ["A base coat establishes the underlying wood tone.", "Combs, rollers or brushes drag darker pigment into grain patterns.", "Glazes and highlights increase the illusion of depth."],
    whatToLookFor: ["Painted grain that repeats more regularly than natural wood", "Dark faux-wood doors, pews or moldings", "Decorative wood effects on inexpensive pine or cedar"],
    sourceLabel: "1982 National Register thematic nomination",
    sourceUrl: THEMATIC_NOMINATION,
    churchSlugs: ["galveston-st-joseph-church"],
    related: ["marbling", "trompe-loeil-architectural-illusion"],
  },
  {
    slug: "pouncing",
    name: "Pouncing",
    shortDefinition: "A dotted charcoal transfer used to move a design onto a wall or ceiling.",
    answer: "Pouncing transfers a drawing through tiny perforations. Charcoal is rubbed over holes along a pattern's outline, leaving a dotted guide on the surface. The artist then removes the pattern and paints along the transferred dots.",
    howItWorks: ["The design is perforated with small holes along its outline.", "Charcoal or pigment is rubbed through the holes onto the surface.", "The resulting dotted line guides hand painting after the pattern is removed."],
    whatToLookFor: ["Hand-filled repeated ornament", "Complex motifs too detailed for direct stencil painting", "Historic conservation evidence of dotted transfer lines where exposed"],
    sourceLabel: "Austin PBS — Decorative Painting Techniques",
    sourceUrl: PBS_TECHNIQUES,
    churchSlugs: ["ammannsville-st-john-the-baptist"],
    related: ["stenciling", "infill"],
  },
  {
    slug: "gilding-metallic-accents",
    name: "Gilding and metallic accents",
    shortDefinition: "Gold-colored or metallic finishes used to heighten architectural and sacred details.",
    answer: "Metallic-gold accents make capitals, borders, stars and sacred motifs catch light and read as precious material. In Texas Painted Churches these accents often work with faux marble and painted architecture to create a richer interior than the underlying wood and plaster alone would provide.",
    howItWorks: ["Metallic leaf, metallic paint or gilding-like finishes are applied to selected details.", "Highlights concentrate on capitals, borders, stars, frames and devotional objects.", "The reflective finish increases contrast against matte painted fields."],
    whatToLookFor: ["Gold-highlighted capitals", "Metallic borders around ceiling panels", "Stars or sacred details that visibly catch light"],
    sourceLabel: "Austin PBS — High Hill Painted Church",
    sourceUrl: "https://austinpbs.org/paintedchurches/highhill",
    churchSlugs: ["high-hill-nativity-of-mary", "fredericksburg-st-marys-catholic-church"],
    related: ["marbling", "trompe-loeil-architectural-illusion"],
  },
  {
    slug: "trompe-loeil-architectural-illusion",
    name: "Trompe-l’œil and architectural illusion",
    shortDefinition: "Paint that makes flat or simple surfaces appear structurally more elaborate.",
    answer: "Architectural illusion uses perspective, shadow, painted joints and faux architectural elements to make a simple surface appear vaulted, columned or spatially deeper than it really is. The 1982 nomination explicitly discusses this strategy at Lindsay, Wesley, Praha and High Hill.",
    howItWorks: ["Painted ribs, joints, columns, masonry or openings imitate three-dimensional architecture.", "Shadows and perspective create apparent depth.", "The painted system visually upgrades a simpler interior into a more elaborate architectural space."],
    whatToLookFor: ["Vault ribs that are paint rather than masonry", "Painted columns or arches on flat walls", "False apses, side aisles, masonry patterns or stonework"],
    sourceLabel: "1982 National Register thematic nomination + Austin PBS",
    sourceUrl: THEMATIC_NOMINATION,
    churchSlugs: ["high-hill-nativity-of-mary", "wesley-brethren-church", "praha-st-marys-assumption", "lindsay-st-peters-catholic-church"],
    related: ["marbling", "graining", "canvas-applied-decoration"],
  },
  {
    slug: "canvas-applied-decoration",
    name: "Canvas-applied decoration",
    shortDefinition: "Painted canvas attached to wood or another architectural substrate.",
    answer: "Some Painted Church decoration was executed on canvas and then attached to the building rather than painted directly onto the boards. High Hill is the clearest documented example: Austin PBS records parish memory and visible surface evidence of painted canvas glued to the wooden interior.",
    howItWorks: ["The decorative scene or ornament is painted on canvas.", "The canvas is adhered to the wall or ceiling substrate.", "Aging can reveal seams, bubbles or separation between canvas and wood."],
    whatToLookFor: ["Visible canvas seams", "Bubbles or lifting surfaces", "Painted panels whose texture differs from surrounding wood"],
    sourceLabel: "Austin PBS — High Hill Painted Church",
    sourceUrl: "https://austinpbs.org/paintedchurches/highhill",
    churchSlugs: ["high-hill-nativity-of-mary", "plantersville-st-marys-catholic-church"],
    related: ["freehand", "trompe-loeil-architectural-illusion"],
  },
  {
    slug: "decorative-murals",
    name: "Decorative and narrative murals",
    shortDefinition: "Large painted scenes or symbolic compositions integrated into the church interior.",
    answer: "Murals are large-scale painted compositions integrated into the sanctuary, walls or ceiling. They may narrate biblical events, depict saints and angels, or create symbolic sacred landscapes. Unlike repeating stencil work, a mural is read as a particular scene or composition.",
    howItWorks: ["A large composition is planned for a specific architectural field.", "Figures, symbols, landscape and modeled color are painted as a continuous scene.", "The mural is integrated with altars, arches, vaults or sanctuary geometry."],
    whatToLookFor: ["Biblical scenes", "Saints or angels arranged as a narrative", "Large sanctuary paintings rather than repeating ornament"],
    sourceLabel: "Austin PBS — Painted Churches project",
    sourceUrl: "https://austinpbs.org/paintedchurches/",
    churchSlugs: ["praha-st-marys-assumption", "dubina-saints-cyril-methodius", "moravia-ascension-of-our-lord", "wesley-brethren-church", "umbarger-st-marys-catholic-church", "lindsay-st-peters-catholic-church", "shiner-saints-cyril-methodius", "panna-maria-immaculate-conception", "plantersville-st-marys-catholic-church", "corn-hill-holy-trinity-catholic-church", "palestine-sacred-heart-catholic-church", "bandera-st-stanislaus-catholic-church", "corpus-christi-sacred-heart-catholic-church"],
    related: ["freehand", "gilding-metallic-accents"],
  },
];

export const paintedChurchTechniqueBySlug = new Map(paintedChurchTechniques.map((technique) => [technique.slug, technique]));

export function getPaintedChurchTechnique(slug: string) {
  return paintedChurchTechniqueBySlug.get(slug as PaintedChurchTechniqueSlug);
}
