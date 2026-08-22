import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";

type Preview = {
  week: Array<{
    date: string;
    items: Array<{
      id: string;
      slot: string;
      category: string;
      message: string;
      canonicalUrl?: string;
      sourcePostId: string;
      idempotencyKey: string;
    }>;
  }>;
};

export const Route = createFileRoute("/admin/social-calendar")({
  head: () => ({ meta: [
    { title: "Social calendar | TexasDefined" },
    { name: "robots", content: "noindex,nofollow" },
  ] }),
  component: TexasSocialCalendarPage,
});

function TexasSocialCalendarPage() {
  const [preview, setPreview] = useState<Preview | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/admin/social-calendar-preview", { cache: "no-store" })
      .then((response) => {
        if (!response.ok) throw new Error(`Preview request failed (${response.status})`);
        return response.json() as Promise<Preview>;
      })
      .then(setPreview)
      .catch((reason: unknown) => setError(reason instanceof Error ? reason.message : "Preview request failed"));
  }, []);

  return (
    <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <p className="text-sm uppercase tracking-wider text-muted-foreground">Admin · Social planning</p>
      <h1 className="mt-2 font-display text-4xl">TexasDefined social calendar</h1>
      <p className="mt-3 text-muted-foreground">Read-only seven-day preview. Publishing disabled.</p>

      {error ? <p className="mt-8 text-destructive">{error}</p> : null}
      {!preview && !error ? <p className="mt-8 text-muted-foreground">Loading draft calendar…</p> : null}

      <section className="mt-8 grid gap-6" aria-label="Seven-day social draft calendar">
        {preview?.week.map((day) => (
          <article key={day.date} className="rounded-2xl border border-border bg-card p-5">
            <h2 className="font-display text-2xl">{day.date}</h2>
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              {day.items.map((item) => (
                <section key={item.id} className="rounded-xl border border-border/80 p-4">
                  <p className="text-xs uppercase tracking-wide text-muted-foreground">{item.slot} · {item.category} · Draft only</p>
                  <p className="mt-3 whitespace-pre-line leading-7">{item.message}</p>
                  {item.canonicalUrl ? <a className="mt-4 block break-all text-sm underline" href={item.canonicalUrl} target="_blank" rel="noreferrer">{item.canonicalUrl}</a> : null}
                  <p className="mt-4 break-all border-t border-border pt-3 text-xs text-muted-foreground">Source: {item.sourcePostId}<br />Key: {item.idempotencyKey}</p>
                </section>
              ))}
            </div>
          </article>
        ))}
      </section>

      <p className="mt-8 text-sm text-muted-foreground">This page has no Facebook credentials, Graph API calls, scheduling action, or publish control.</p>
    </main>
  );
}
