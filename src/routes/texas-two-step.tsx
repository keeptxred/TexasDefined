import { createFileRoute, notFound } from "@tanstack/react-router";
import { PrioritySearchPage } from "@/components/editorial/PrioritySearchPage";
import { loadPrioritySearchPage } from "@/data/priority-search-page";
import { buildPrioritySearchHead } from "@/lib/priority-search-seo";

const canonicalPath = "/texas-two-step";
const faq = [
  { question: "Is Texas Two Step a lottery game or a dance?", answer: "The Texas Two Step page here covers the Texas Lottery draw game. If you mean the Texas two-step dance, use the linked Texas dance-hall and honky-tonk guide." },
  { question: "How is the Texas Two Step lottery game played?", answer: "A play uses four different numbers from 1 through 35 plus one Bonus Ball number from 1 through 35. The official Texas Lottery rules control the game." },
  { question: "When are Texas Two Step drawings held?", answer: "The Texas Lottery currently advertises Texas Two Step drawings on Monday and Thursday. Verify the current schedule and prize information with the official Texas Lottery before relying on a drawing time or prize amount." },
];

export const Route = createFileRoute("/texas-two-step")({
  loader: async () => {
    const sourceData = await loadPrioritySearchPage("texas-two-step");
    if (!sourceData) throw notFound();
    return {
      ...sourceData,
      quickAnswer: `${sourceData.quickAnswer} If you mean the Texas two-step dance rather than the lottery game, use the dance-hall and honky-tonk guide linked below.`,
      related: [
        { label: "Texas two-step dance, dance halls & honky-tonks", href: "/texas-dance-halls-honky-tonks" },
        ...sourceData.related,
      ],
      faq,
    };
  },
  head: ({ loaderData }) => loaderData ? buildPrioritySearchHead({
    canonicalPath,
    title: "Texas Two Step: How the Texas Lottery Game Works",
    description: loaderData.intro,
    data: loaderData,
    about: ["Texas Two Step", "Texas Lottery", "Texas lottery game", "Texas lottery drawings"],
  }) : {},
  component: TexasTwoStepPage,
});

function TexasTwoStepPage() {
  return <PrioritySearchPage data={Route.useLoaderData()} />;
}
