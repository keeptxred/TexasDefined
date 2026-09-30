import { createLazyFileRoute } from "@tanstack/react-router";
import { lazy, Suspense } from "react";

const TexasExplainedQuestionsPage = lazy(() =>
  import("@/components/editorial/TexasExplainedQuestionsPage").then((module) => ({
    default: module.default,
  })),
);

function TexasExplainedQuestionsRoute() {
  return (
    <Suspense
      fallback={(
        <div className="mx-auto max-w-6xl px-5 py-12 text-sm text-muted-foreground" role="status">
          Loading Texas questions…
        </div>
      )}
    >
      <TexasExplainedQuestionsPage />
    </Suspense>
  );
}

export const Route = createLazyFileRoute("/texas-explained/questions")({
  component: TexasExplainedQuestionsRoute,
});
