import { createFileRoute } from "@tanstack/react-router";

import { getTexasSocialCalendarPreview } from "@/data/texas-social-calendar.functions";

export const Route = createFileRoute("/admin/social-calendar")({
  head: () => ({
    meta: [
      { title: "Social calendar | TexasDefined" },
      { name: "robots", content: "noindex,nofollow" },
    ],
  }),
  loader: () => getTexasSocialCalendarPreview(),
  component: TexasSocialCalendarPage,
});

function TexasSocialCalendarPage() {
  const { week } = Route.useLoaderData();
  const totalPosts = week.reduce((sum, day) => sum + day.items.length, 0);

  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <header className="border-b border-border pb-8">
        <p className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
          Admin · Social planning
        </p>
        <h1 className="mt-2 font-display text-4xl">TexasDefined social calendar</h1>
        <p className="mt-3 max-w-3xl text-muted-foreground">
          Read-only preview of the evergreen Facebook queue. The planner selects two posts per day,
          rotates categories and destinations where possible, and avoids repeating source posts across
          this seven-day view.
        </p>
        <div className="mt-5 inline-flex items-center rounded-full border border-border px-3 py-1 text-sm font-medium">
          Publishing disabled · {totalPosts} draft posts prepared
        </div>
      </header>

      <section className="mt-8 grid gap-6" aria-label="Seven-day social draft calendar">
        {week.map((day) => (
          <article key={day.date} className="rounded-2xl border border-border bg-card p-5 shadow-sm">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h2 className="font-display text-2xl">{day.date}</h2>
              <span className="text-sm text-muted-foreground">{day.items.length} drafts</span>
            </div>

            <div className="mt-5 grid gap-4 md:grid-cols-2">
              {day.items.map((item) => (
                <section key={item.id} className="rounded-xl border border-border/80 p-4">
                  <div className="flex flex-wrap items-center gap-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                    <span>{item.slot}</span>
                    <span aria-hidden="true">·</span>
                    <span>{item.category}</span>
                    <span aria-hidden="true">·</span>
                    <span>Draft only</span>
                  </div>

                  <p className="mt-3 whitespace-pre-line text-base leading-7">{item.message}</p>

                  {item.canonicalUrl ? (
                    <a
                      href={item.canonicalUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-4 block break-all text-sm underline underline-offset-4"
                    >
                      {item.canonicalUrl}
                    </a>
                  ) : null}

                  <dl className="mt-4 grid gap-2 border-t border-border pt-4 text-xs text-muted-foreground">
                    <div>
                      <dt className="font-medium text-foreground">Source ID</dt>
                      <dd>{item.sourcePostId}</dd>
                    </div>
                    <div>
                      <dt className="font-medium text-foreground">Idempotency key</dt>
                      <dd className="break-all">{item.idempotencyKey}</dd>
                    </div>
                  </dl>
                </section>
              ))}
            </div>
          </article>
        ))}
      </section>

      <aside className="mt-8 rounded-xl border border-border bg-muted/30 p-4 text-sm text-muted-foreground">
        This page has no Facebook credentials, Graph API calls, scheduling action, or publish control.
        It only renders the deterministic draft queue for review.
      </aside>
    </main>
  );
}
