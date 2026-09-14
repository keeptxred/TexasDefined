import { createLazyFileRoute } from "@tanstack/react-router";

import TexasExplainedPage from "@/components/editorial/TexasExplainedPage";

export const Route = createLazyFileRoute("/texas-explained")({
  component: TexasExplainedPage,
});
