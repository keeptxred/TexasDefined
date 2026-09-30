import { createLazyFileRoute } from "@tanstack/react-router";

import TexasExplainedQuestionsPage from "@/components/editorial/TexasExplainedQuestionsPage";

export const Route = createLazyFileRoute("/texas-explained/questions")({
  component: TexasExplainedQuestionsPage,
});
