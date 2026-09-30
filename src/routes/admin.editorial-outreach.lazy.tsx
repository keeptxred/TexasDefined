import { createLazyFileRoute } from "@tanstack/react-router";
import { type FormEvent, useEffect, useState } from "react";

import { Container } from "@/components/layout/Container";
import { BacklinkCommandCenterPanel } from "@/components/admin/BacklinkCommandCenterPanel";
import { getEditorialOutreachDashboard } from "@/data/editorial-outreach.functions";
import type { EditorialOutreachDashboard } from "@/data/editorial-outreach.server";
import type { EditorialOutreachTarget } from "@/data/editorial-outreach";

const SESSION_KEY = "texasdefined:editorial-outreach-admin-key";

export const Route = createLazyFileRoute("/admin/editorial-outreach")({ component: EditorialOutreachAdmin });

function EditorialOutreachAdmin() {
  const [accessKey, setAccessKey] = useState("");
  const [dashboard, setDashboard] = useState<EditorialOutreachDashboard | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState("");

  async function unlock(key: string) {
    setLoading(true);
    setError("");
    try {
      const data = await getEditorialOutreachDashboard({ data: { accessKey: key } });
      setDashboard(data);
      sessionStorage.setItem(SESSION_KEY, key);
    } catch (cause) {
      console.error("Editorial outreach access failed", cause);
      setDashboard(null);
      sessionStorage.removeItem(SESSION_KEY);
      setError("Access denied or the editorial outreach service is temporarily unavailable.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    const stored = sessionStorage.getItem(SESSION_KEY);
    if (!stored) return;
    setAccessKey(stored);
    void unlock(stored);
  }, []);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (accessKey.trim()) await unlock(accessKey.trim());
  }

  function lock() {
    sessionStorage.removeItem(SESSION_KEY);
    setAccessKey("");
    setDashboard(null);
    setCopied("");
    setError("");
  }

  async function copyDraft(target: EditorialOutreachTarget) {
    const subject = `TexasDefined editorial resource: ${target.organization}`;
    const body = [
      `Hello ${target.organization} team,`,
      "",
      `TexasDefined maintains an independent Texas resource at https://texasdefined.com${target.pagePath}. We are reaching out primarily to keep the resource accurate and useful over time.`,
      "",
      target.relationshipOpportunity,
      "",
      "What would be most useful from your team:",
      ...target.asks.map((ask) => `- ${ask}`),
      "",
      "We are not asking for paid placement or a reciprocal-link arrangement. If the resource is useful to your visitors, staff or media partners, you are welcome to reference it where appropriate, but no link is required.",
      "",
      "Thank you,",
      "TexasDefined editorial",
      "admin@texasdefined.com",
    ].join("\n");
    await navigator.clipboard.writeText(`Subject: ${subject}\n\n${body}`);
    setCopied(target.id);
    window.setTimeout(() => setCopied((current) => current === target.id ? "" : current), 1800);
  }

  return <Container className="py-12 sm:py-16">
    <main className="mx-auto max-w-7xl">
      <header className="border-b border-border pb-8">
        <p className="eyebrow text-primary">TexasDefined Operations</p>
        <div className="mt-3 flex flex-wrap items-end justify-between gap-5">
          <div>
            <h1 className="font-display text-4xl sm:text-6xl">Editorial Source Outreach</h1>
            <p className="mt-4 max-w-4xl text-sm leading-7 text-muted-foreground">Build long-term source relationships around accuracy, approved imagery and recurring updates. Optional references come last; this is not paid-link or reciprocal-link outreach.</p>
          </div>
          {dashboard ? <button type="button" onClick={lock} className="min-h-11 border border-border px-4 py-2 text-sm font-semibold hover:border-primary hover:text-primary">Lock dashboard</button> : null}
        </div>
      </header>

      {!dashboard ? <section className="mt-10 max-w-xl border-y border-border py-8">
        <p className="eyebrow text-primary">Protected operations</p>
        <h2 className="mt-2 font-display text-3xl">Unlock editorial outreach</h2>
        <p className="mt-3 text-sm leading-7 text-muted-foreground">Use the existing partner-admin key. The key is stored only for this browser session.</p>
        <form onSubmit={submit} className="mt-6 grid gap-4">
          <label className="grid gap-2 text-sm font-semibold">Admin access key
            <input type="password" autoComplete="current-password" value={accessKey} onChange={(event) => setAccessKey(event.target.value)} className="min-h-11 border border-border bg-background px-3 py-2 font-normal" required minLength={20} maxLength={200} />
          </label>
          <button type="submit" disabled={loading} className="min-h-11 justify-self-start bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground disabled:opacity-60">{loading ? "Unlocking…" : "Unlock outreach dashboard"}</button>
        </form>
        {error ? <p className="mt-4 text-sm font-semibold text-destructive" role="alert">{error}</p> : null}
      </section> : <>
        <section className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          <Metric label="Verified targets" value={dashboard.summary.verifiedTargets} />
          <Metric label="Existing relationships" value={dashboard.summary.existingRelationships} />
          <Metric label="Ready to contact" value={dashboard.summary.readyToContact} />
          <Metric label="Auto research queue" value={dashboard.summary.automaticResearchCandidates + dashboard.summary.eventResearchCandidates + dashboard.summary.authoritySourceCandidates} />
          <Metric label="Improve first" value={dashboard.summary.pagesNeedingImprovementFirst} />
        </section>

        <section className="mt-10 border-y border-border py-7">
          <p className="eyebrow text-primary">Editorial rules</p>
          <p className="mt-3 max-w-5xl text-sm leading-7 text-muted-foreground">{dashboard.policy.purpose}</p>
          <p className="mt-2 max-w-5xl text-sm leading-7 text-muted-foreground">{dashboard.policy.referenceLanguage}</p>
        </section>

        <BacklinkCommandCenterPanel accessKey={accessKey} />

        <section className="mt-12">
          <div className="border-b border-border pb-5"><p className="eyebrow text-primary">First-wave relationships</p><h2 className="mt-2 font-display text-4xl">Verified targets ready for editorial outreach</h2></div>
          <div>{dashboard.verifiedTargets.map((target) => <article key={target.id} className="border-b border-border py-7">
            <div className="grid gap-5 lg:grid-cols-[1fr_auto] lg:items-start">
              <div>
                <div className="flex flex-wrap items-center gap-3">
                  <h3 className="font-display text-2xl">{target.organization}</h3>
                  <span className="border border-border px-2 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.12em]">P{target.priority}</span>
                  <span className="border border-border px-2 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.12em] text-muted-foreground">{target.status.replaceAll("-", " ")}</span>
                  <span className="text-xs text-muted-foreground">score {target.score}</span>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">{target.organizationType} · {target.contactLabel}</p>
              </div>
              <button type="button" onClick={() => void copyDraft(target)} className="min-h-10 border border-primary px-3 py-2 text-sm font-semibold text-primary">{copied === target.id ? "Copied" : "Copy outreach draft"}</button>
            </div>
            <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm">
              <a href={target.pagePath} className="font-semibold text-primary underline underline-offset-4">Open TexasDefined page</a>
              <a href={target.contactUrl} target="_blank" rel="noreferrer" className="font-semibold underline underline-offset-4">Official contact/media page ↗</a>
              <a href={target.officialUrl} target="_blank" rel="noreferrer" className="font-semibold underline underline-offset-4">Official site ↗</a>
              {target.contactEmail ? <a href={`mailto:${target.contactEmail}`} className="font-semibold underline underline-offset-4">{target.contactEmail}</a> : null}
            </div>
            <div className="mt-6 grid gap-6 lg:grid-cols-2">
              <div><p className="text-xs font-bold uppercase tracking-[0.12em] text-muted-foreground">Why this page is worth outreach</p><p className="mt-2 text-sm leading-7">{target.pageStrength}</p><p className="mt-3 text-sm leading-7 text-muted-foreground">{target.relationshipOpportunity}</p></div>
              <div><p className="text-xs font-bold uppercase tracking-[0.12em] text-muted-foreground">What to ask for</p><ul className="mt-2 space-y-2 text-sm leading-6 text-muted-foreground">{target.asks.map((ask) => <li key={ask}>• {ask}</li>)}</ul></div>
            </div>
            <div className="mt-5 grid gap-4 sm:grid-cols-3 text-sm">
              <Info label="Photography" value={target.photoOpportunity} />
              <Info label="Recurring updates" value={target.updateOpportunity} />
              <Info label="Optional reference" value={target.referenceAsk} />
            </div>
          </article>)}</div>
        </section>

        <section className="mt-12">
          <div className="border-b border-border pb-5"><p className="eyebrow text-primary">Automatic intake</p><h2 className="mt-2 font-display text-4xl">New authority pages needing contact research</h2><p className="mt-3 max-w-4xl text-sm leading-7 text-muted-foreground">These pages entered automatically because they are index-ready, identify a managing authority and include a current official source. Research the right communications/media contact before sending anything.</p></div>
          <div className="grid gap-4 pt-6 lg:grid-cols-2">
            {dashboard.automaticIntake.map((item) => <article key={item.id} className="border border-border p-5">
              <div className="flex items-start justify-between gap-4"><div><h3 className="font-display text-2xl">{item.organization}</h3><p className="mt-1 text-xs text-muted-foreground">{item.category} · {item.locationLabel}</p></div><span className="text-xs font-semibold">score {item.score}</span></div>
              <p className="mt-4 text-sm leading-7 text-muted-foreground">{item.reason}</p>
              <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm"><a href={item.pagePath} className="font-semibold text-primary underline underline-offset-4">TexasDefined page</a><a href={item.officialUrl} target="_blank" rel="noreferrer" className="font-semibold underline underline-offset-4">Official source ↗</a></div>
            </article>)}
          </div>
        </section>

        <section className="mt-12">
          <div className="border-b border-border pb-5"><p className="eyebrow text-primary">Event organizer intake</p><h2 className="mt-2 font-display text-4xl">Upcoming event guides needing organizer contact research</h2><p className="mt-3 max-w-4xl text-sm leading-7 text-muted-foreground">These permanent event guides have a current official organizer URL and verified occurrence. Research the organizer's communications or media contact before outreach; event listings alone do not justify a backlink request.</p></div>
          <div className="grid gap-4 pt-6 lg:grid-cols-2">
            {dashboard.eventIntake.map((item) => <article key={item.id} className="border border-border p-5">
              <div className="flex items-start justify-between gap-4"><div><h3 className="font-display text-2xl">{item.organization}</h3><p className="mt-1 text-xs text-muted-foreground">{item.category} · {item.locationLabel}</p></div><span className="text-xs font-semibold">score {item.score}</span></div>
              <p className="mt-4 text-sm leading-7 text-muted-foreground">{item.reason}</p>
              <ul className="mt-4 space-y-2 text-sm leading-6 text-muted-foreground">{item.suggestedAsks.map((ask) => <li key={ask}>• {ask}</li>)}</ul>
              <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm"><a href={item.pagePath} className="font-semibold text-primary underline underline-offset-4">TexasDefined event guide</a><a href={item.officialUrl} target="_blank" rel="noreferrer" className="font-semibold underline underline-offset-4">Official organizer ↗</a></div>
            </article>)}
          </div>
        </section>

        <section className="mt-12">
          <div className="border-b border-border pb-5"><p className="eyebrow text-primary">Authority source research</p><h2 className="mt-2 font-display text-4xl">Published articles with named source relationships to evaluate</h2><p className="mt-3 max-w-4xl text-sm leading-7 text-muted-foreground">These are research candidates only. A citation does not mean the source organization should receive outreach. Confirm that the organization is relevant to the article subject and that a long-term fact-check, data or media relationship would be useful before contacting anyone.</p></div>
          <div className="grid gap-4 pt-6 lg:grid-cols-2">
            {dashboard.authoritySourceIntake.map((item) => <article key={item.id} className="border border-border p-5">
              <div className="flex items-start justify-between gap-4"><div><h3 className="font-display text-2xl">{item.organization}</h3><p className="mt-1 text-xs text-muted-foreground">{item.category} · {item.locationLabel}</p></div><span className="text-xs font-semibold">research only</span></div>
              <p className="mt-4 text-sm leading-7 text-muted-foreground">{item.reason}</p>
              <ul className="mt-4 space-y-2 text-sm leading-6 text-muted-foreground">{item.suggestedAsks.slice(0, 3).map((ask) => <li key={ask}>• {ask}</li>)}</ul>
              <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm"><a href={item.pagePath} className="font-semibold text-primary underline underline-offset-4">TexasDefined article</a><a href={item.officialUrl} target="_blank" rel="noreferrer" className="font-semibold underline underline-offset-4">Cited source ↗</a></div>
            </article>)}
          </div>
        </section>

        <section className="mt-12">
          <div className="border-b border-border pb-5"><p className="eyebrow text-primary">Do not outreach yet</p><h2 className="mt-2 font-display text-4xl">Pages that should be improved first</h2><p className="mt-3 max-w-4xl text-sm leading-7 text-muted-foreground">These destinations have an identifiable organization and official source, but the page does not currently clear TexasDefined's own indexing-quality gate.</p></div>
          <div className="grid gap-4 pt-6 lg:grid-cols-2">
            {dashboard.needsImprovementFirst.map((item) => <article key={item.pagePath} className="border border-border p-5">
              <div className="flex items-start justify-between gap-4"><div><h3 className="font-display text-2xl">{item.name}</h3><p className="mt-1 text-xs text-muted-foreground">{item.organization}</p></div><span className="text-xs font-semibold">audit {item.auditScore}</span></div>
              <ul className="mt-4 space-y-2 text-sm leading-6 text-muted-foreground">{item.issues.slice(0, 5).map((issue) => <li key={issue}>• {issue}</li>)}</ul>
              <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm"><a href={item.pagePath} className="font-semibold text-primary underline underline-offset-4">Review page</a><a href={item.officialUrl} target="_blank" rel="noreferrer" className="font-semibold underline underline-offset-4">Official source ↗</a></div>
            </article>)}
          </div>
        </section>

        <p className="mt-10 text-xs text-muted-foreground">Queue generated {new Date(dashboard.generatedAt).toLocaleString()}. No email is sent from this dashboard.</p>
      </>}
    </main>
  </Container>;
}

function Metric({ label, value }: { label: string; value: number }) {
  return <div className="border-t border-border pt-3"><p className="eyebrow text-muted-foreground">{label}</p><p className="mt-1 font-display text-3xl">{value}</p></div>;
}

function Info({ label, value }: { label: string; value: string }) {
  return <div className="border-t border-border pt-3"><p className="text-xs font-bold uppercase tracking-[0.12em] text-muted-foreground">{label}</p><p className="mt-2 leading-6 text-muted-foreground">{value}</p></div>;
}
