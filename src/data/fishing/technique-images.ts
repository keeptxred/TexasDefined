export type FishingTechniqueImage = {
  src: string;
  alt: string;
  caption: string;
  width: number;
  height: number;
  imageType: "image/avif";
  sourceType: "ai-generated";
  creator: "Texas Defined";
  generator: "OpenAI image generation";
  generatedAt: string;
  subjectScope: "representative" | "educational";
};

export type FishingTechniqueImageSet = {
  hero?: FishingTechniqueImage;
  depthGuide?: FishingTechniqueImage;
};

export const fishingTechniqueImages: Record<string, FishingTechniqueImageSet> = {
  crankbaits: {
    hero: {
      src: "/images/fishing/crankbaits-hero.avif",
      alt: "Largemouth bass approaching a diving crankbait around submerged timber and rock",
      caption: "AI-generated editorial illustration by Texas Defined using OpenAI image generation. Representative crankbait fishing scene; not a photograph of a specific Texas lake or catch.",
      width: 1200,
      height: 675,
      imageType: "image/avif",
      sourceType: "ai-generated",
      creator: "Texas Defined",
      generator: "OpenAI image generation",
      generatedAt: "2026-09-27",
      subjectScope: "representative",
    },
    depthGuide: {
      src: "/images/fishing/crankbait-types-depth-cover.avif",
      alt: "Crankbait depth-and-cover guide showing squarebill, shallow-diving, medium-diving, deep-diving and lipless crankbait zones",
      caption: "AI-generated educational illustration by Texas Defined using OpenAI image generation. Use the depth ranges as a guide; actual running depth varies by lure design, line diameter, cast length and retrieve speed.",
      width: 1200,
      height: 675,
      imageType: "image/avif",
      sourceType: "ai-generated",
      creator: "Texas Defined",
      generator: "OpenAI image generation",
      generatedAt: "2026-09-27",
      subjectScope: "educational",
    },
  },
};
