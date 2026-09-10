import { lazy, Suspense } from "react";

import type { WaterTopic } from "./TexasWaterSearchResource";

const TexasRiverBasinReference = lazy(() =>
  import("./TexasRiverBasinReference").then((module) => ({ default: module.TexasRiverBasinReference })),
);

const topicLinks: Array<{
  id: WaterTopic;
  href: string;
  title: string;
  description: string;
}> = [
  {
    id: "rivers",
    href: "/article/texas-rivers-explained",
    title: "Rivers",
    description: "Individual rivers, boundary rivers, regions and where the water flows.",
  },
  {
    id: "basins",
    href: "/article/texas-river-basins-guide",
    title: "River basins",
    description: "Watersheds, drainage divides and the systems that connect tributaries to the Gulf.",
  },
  {
    id: "reservoirs",
    href: "/article/texas-lakes-reservoirs-explained",
    title: "Lakes & reservoirs",
    description: "Why most familiar inland Texas lakes are reservoirs and how managed water works.",
  },
];

export function TexasWaterSearchResourceContent({ active }: { active: WaterTopic }) {
  return (
    <section className="mt-8 border-y border-border py-7" aria-labelledby="texas-water-topic-heading">
      <p className="eyebrow text-primary">Texas water, organized by the question</p>
      <h2 id="texas-water-topic-heading" className="mt-3 font-display text-2xl sm:text-3xl">
        Pick the water guide you actually need
      </h2>
      <p className="mt-3 text-sm leading-7 text-muted-foreground">
        These pages intentionally cover different search intents so rivers, watersheds and reservoirs do not compete for the same job.
      </p>
      <nav aria-label="Texas river, basin and reservoir guides" className="mt-5 grid gap-3 sm:grid-cols-3">
        {topicLinks.map((topic) => {
          const isActive = topic.id === active;
          return (
            <a
              key={topic.id}
              href={topic.href}
              aria-current={isActive ? "page" : undefined}
              className={`block rounded-sm border p-4 transition-colors ${isActive ? "border-primary bg-surface" : "border-border hover:border-primary"}`}
            >
              <span className="font-display text-lg">{topic.title}</span>
              <span className="mt-1 block text-xs leading-5 text-muted-foreground">{topic.description}</span>
              <span className="mt-3 block text-xs font-semibold uppercase tracking-[0.12em] text-primary">
                {isActive ? "You are here" : "Open guide →"}
              </span>
            </a>
          );
        })}
      </nav>

      {active === "basins" ? (
        <Suspense fallback={<div className="mt-8 min-h-40 border border-border bg-surface" aria-hidden="true" />}>
          <TexasRiverBasinReference />
        </Suspense>
      ) : null}
    </section>
  );
}
