import { createFileRoute } from "@tanstack/react-router";
import { PrioritySearchPage } from "@/components/editorial/PrioritySearchPage";
import { PRIORITY_SEARCH_PAGES } from "@/data/priority-search-pages";
import { buildPrioritySearchHead } from "@/lib/priority-search-seo";

const canonicalPath = "/texas-two-step";
const sourceData = PRIORITY_SEARCH_PAGES["texas-two-step"];
const data = {
  ...sourceData,
  quickAnswer: `${sourceData.quickAnswer} If you mean the Texas two-step dance rather than the lottery game, use the dance-hall and honky-tonk guide linked below.`,
  related: [
    { label: "Texas two-step dance, dance halls & honky-tonks", href: "/texas-dance-halls-honky-tonks" },
    ...sourceData.related,
  ],
  faq: [
    { question: "Is Texas Two Step a lottery game or a dance?", answer: "The Texas Two Step page here covers the Texas Lottery draw game. If you mean the Texas two-step dance, use the linked Texas dance-hall and honky-tonk guide." },
    { question: "How is the Texas Two Step lottery game played?", answer: "A play uses four different numbers from 1 through 35 plus one Bonus Ball number from 1 through 35. The official Texas Lottery rules control the game." },
    { question: "When are Texas Two Step drawings held?", answer: "The Texas Lottery currently advertises Texas Two Step drawings on Monday and Thursday. Verify the current schedule and prize information with the official Texas Lottery before relying on a drawing time or prize amount." },
  ],
};

export const Route = createFileRoute("/texas-two-step")({
  head: () => buildPrioritySearchHead({
    canonicalPath,
    title: "Texas Two Step: How the Texas Lottery Game Works",
    description: data.intro,
    data,
    about: ["Texas Two Step", "Texas Lottery", "Texas lottery game", "Texas lottery drawings"],
  }),
  component: () => <PrioritySearchPage data={data} />,
});
