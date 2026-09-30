import { createFileRoute, notFound } from "@tanstack/react-router";
import { StartBusinessTexasGuide } from "@/components/business/StartBusinessTexasGuide";
import { loadPrioritySearchPage } from "@/data/priority-search-page";
import { buildPrioritySearchHead } from "@/lib/priority-search-seo";

const canonicalPath = "/start-a-business-in-texas";

function StartBusinessPage() {
  return (
    <div>
      <StartBusinessTexasGuide />
      <section className="border-t bg-muted/20">
        <div className="mx-auto max-w-6xl px-5 py-10">
          <div className="rounded-2xl border bg-background p-6 md:p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-muted-foreground">Moving or expanding a company?</p>
            <h2 className="mt-2 font-serif text-2xl font-bold">Connect startup planning with Texas relocation research</h2>
            <p className="mt-3 max-w-3xl leading-7 text-muted-foreground">If the business move includes employees or a new Texas site, use the corporate-relocation resources to compare locations, workforce considerations, employee-move planning and practical arrival tasks alongside entity formation and compliance.</p>
            <div className="mt-5 flex flex-wrap gap-3">
              <a className="rounded-lg border px-4 py-2 font-semibold hover:bg-muted/40" href="/moving-to-texas?companyMove=employer#corporate-relocation">Corporate relocation tools →</a>
              <a className="rounded-lg border px-4 py-2 font-semibold hover:bg-muted/40" href="/article/corporate-relocation-to-texas">Corporate relocation guide →</a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export const Route = createFileRoute("/start-a-business-in-texas")({
  loader: async () => {
    const data = await loadPrioritySearchPage("start-a-business-in-texas");
    if (!data) throw notFound();
    return data;
  },
  head: ({ loaderData }) => loaderData ? buildPrioritySearchHead({
    canonicalPath,
    title: "How to Start a Business in Texas",
    description: "How to start a business in Texas in 2026: entity choices, LLC filing costs, EIN, Texas taxes, licenses, permits, BOI rules and a step-by-step startup checklist.",
    data: loaderData,
    about: ["start a business in Texas", "Texas LLC", "Texas business registration", "Texas business license", "Texas Secretary of State", "Texas Comptroller", "EIN", "Texas franchise tax"],
  }) : {},
  component: StartBusinessPage,
});
