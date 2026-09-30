import { createLazyFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";

import { Container } from "@/components/layout/Container";
import { getBacklinkCommandCenter } from "@/data/backlink-command-center.functions";
import type { BacklinkCommandCenterDashboard, BacklinkPipelineRow } from "@/data/backlink-command-center.server";

const SESSION_KEY = "texasdefined:editorial-outreach-admin-key";

export const Route = createLazyFileRoute("/admin/backlinks")({ component: BacklinkCommandCenter });

function pct(value: number | null) {
  return value == null ? "—" : `${(value * 100).toFixed(1)}%`;
}

function BacklinkCommandCenter() {
  const [dashboard, setDashboard] = useState<BacklinkCommandCenterDashboard | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [needsUnlock, setNeedsUnlock] = useState(false);

  useEffect(() => {
    const key = sessionStorage.getItem(SESSION_KEY);
    if (!key) {
      setNeedsUnlock(true);
      setLoading(false);
      return;
    }
    void getBacklinkCommandCenter({ data: { accessKey: key } })
      .then((data) => setDashboard(data))
      .catch((cause) => {
        console.error("Backlink command center load failed", cause);
        setError("The stored admin session could not open the backlink report. Unlock Editorial Outreach again, then return here.");
      })
      .finally(() => setLoading(false));
  }, []);

  return <Container className="py-12 sm:py-16">
    <main className="mx-auto max-w-7xl">
      <header className="border-b border-border pb-8">
        <p className="eyebrow text-primary">TexasDefined Operations</p>
        <h1 className="mt-3 font-display text-4xl sm:text-6xl">Backlink Command Center</h1>
        <p className="mt-4 max-w-4xl text-sm leading-7 text-muted-foreground">Track verified referring domains, external linking URLs, outreach stages and relationship outcomes. A relationship, reply or press mention is not counted as a backlink until a real external linking URL is recorded.</p>
      </header>

      {loading ? <p className="py-10 text-sm text-muted-foreground">Loading backlink report…</p> : null}
      {needsUnlock ? <section className="mt-10 max-w-2xl border-y border-border py-8">
        <p className="eyebrow text-primary">Protected operations</p>
        <h2 className="mt-2 font-display text-3xl">Unlock Editorial Outreach first</h2>
        <p className="mt-3 text-sm leading-7 text-muted-foreground">The backlink report reuses the existing protected Editorial Outreach session instead of creating another admin credential flow.</p>
        <Link to="/admin/editorial-outreach" className="mt-5 inline-block font-semibold text-primary underline underline-offset-4">Open Editorial Outreach →</Link>
      </section> : null}
      {error ? <p className="mt-8 text-sm font-semibold text-destructive" role="alert">{error}</p> : null}

      {dashboard ? <>
        <section className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          <Metric label="Verified live backlinks" value={dashboard.summary.verifiedLiveBacklinks} />
          <Metric label="Referring domains" value={dashboard.summary.referringDomains} />
          <Metric label="Pipeline targets" value={dashboard.summary.pipelineTargets} />
          <Metric label="Ready to contact" value={dashboard.summary.readyToContact} />
          <Metric label="Relationships" value={dashboard.summary.activeRelationships} />
          <Metric label="Outreach sent" value={dashboard.summary.sent} />
          <Metric label="Replies" value={dashboard.summary.replies} />
          <Metric label="Won links" value={dashboard.summary.wonLinks} />
          <Metric label="Response rate" value={pct(dashboard.summary.responseRate)} />
          <Metric label="Link conversion" value={pct(dashboard.summary.linkConversionRate)} />
        </section>

        <section className="mt-10 border-y border-border py-7">
          <p className="eyebrow text-primary">Counting policy</p>
          <p className="mt-3 max-w-5xl text-sm leading-7 text-muted-foreground">{dashboard.policy.verifiedOnly}</p>
          <p className="mt-2 max-w-5xl text-sm leading-7 text-muted-foreground">{dashboard.policy.relationshipFirst}</p>
        </section>

        <section className="mt-12">
          <div className="border-b border-border pb-5"><p className="eyebrow text-primary">Acquired links</p><h2 className="mt-2 font-display text-4xl">Verified backlink ledger</h2><p className="mt-3 max-w-4xl text-sm leading-7 text-muted-foreground">Every row requires a concrete referring domain and linking URL. Lost links remain in the ledger instead of disappearing from history.</p></div>
          {dashboard.backlinks.length === 0 ? <div className="border-b border-border py-8"><p className="font-display text-2xl">0 verified backlinks recorded</p><p className="mt-2 max-w-3xl text-sm leading-7 text-muted-foreground">That is an intentional zero, not missing data. Add a ledger entry only after a real external page linking to TexasDefined is observed and checked.</p></div> : <div className="overflow-x-auto"><table className="w-full min-w-[960px] border-collapse text-left text-sm"><thead><tr className="border-b border-border text-xs uppercase text-muted-foreground"><th className="py-3 pr-4">Referring domain</th><th className="py-3 pr-4">Destination</th><th className="py-3 pr-4">Cluster</th><th className="py-3 pr-4">Type</th><th className="py-3 pr-4">Status</th><th className="py-3 pr-4">Last checked</th></tr></thead><tbody>{dashboard.backlinks.map((item) => <tr key={item.id} className="border-b border-border align-top"><td className="py-4 pr-4"><a href={item.linkingUrl} target="_blank" rel="noreferrer" className="font-semibold text-primary underline underline-offset-4">{item.referringDomain} ↗</a><p className="mt-1 max-w-sm text-xs text-muted-foreground">{item.anchorContext}</p></td><td className="py-4 pr-4"><a href={item.destinationPath} className="font-semibold underline underline-offset-4">{item.destinationPath}</a></td><td className="py-4 pr-4">{item.topicCluster}</td><td className="py-4 pr-4">{item.sourceType} · {item.linkType}</td><td className="py-4 pr-4">{item.status.replaceAll("-", " ")}</td><td className="py-4 pr-4">{item.lastChecked}</td></tr>)}</tbody></table></div>}
        </section>

        <section className="mt-12">
          <div className="border-b border-border pb-5"><p className="eyebrow text-primary">Acquisition pipeline</p><h2 className="mt-2 font-display text-4xl">Relationships and outreach to work next</h2><p className="mt-3 max-w-4xl text-sm leading-7 text-muted-foreground">This combines verified editorial targets and automatic source research. A pipeline row is not a backlink; won-link requires a concrete external URL in the ledger.</p></div>
          <div className="grid gap-4 pt-6 lg:grid-cols-2">{dashboard.pipeline.slice(0, 60).map((item) => <PipelineCard key={item.id} item={item} />)}</div>
        </section>

        <section className="mt-12 grid gap-8 lg:grid-cols-2">
          <Breakdown title="By topic cluster" rows={dashboard.byTopicCluster} />
          <Breakdown title="By source type" rows={dashboard.bySourceType} />
        </section>

        <section className="mt-12 border-t border-border pt-8">
          <p className="eyebrow text-primary">Ledger contract</p>
          <h2 className="mt-2 font-display text-3xl">What every verified backlink must record</h2>
          <p className="mt-4 max-w-4xl text-sm leading-7 text-muted-foreground">Referring domain, linking URL, TexasDefined destination URL, topic/content cluster, organization when known, source type, link type, anchor/context, status, first-seen date, last-checked date and source evidence.</p>
          <div className="mt-6 flex flex-wrap gap-x-6 gap-y-3 text-sm"><Link to="/admin/editorial-outreach" className="font-semibold text-primary underline underline-offset-4">Open Editorial Outreach</Link><span className="text-muted-foreground">Generated {new Date(dashboard.generatedAt).toLocaleString()}</span></div>
        </section>
      </> : null}
    </main>
  </Container>;
}

function PipelineCard({ item }: { item: BacklinkPipelineRow }) {
  return <article className="border border-border p-5"><div className="flex items-start justify-between gap-4"><div><h3 className="font-display text-2xl">{item.organization}</h3><p className="mt-1 text-xs text-muted-foreground">{item.topicCluster} · {item.sourceType}</p></div><span className="border border-border px-2 py-1 text-xs font-semibold uppercase">{item.stage.replaceAll("-", " ")}</span></div><p className="mt-4 text-sm leading-7 text-muted-foreground">{item.nextAction}</p>{item.relationshipOpportunity ? <p className="mt-3 text-sm leading-7">{item.relationshipOpportunity}</p> : null}<div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm"><a href={item.destinationPath} className="font-semibold text-primary underline underline-offset-4">TexasDefined page</a>{item.contactUrl ? <a href={item.contactUrl} target="_blank" rel="noreferrer" className="font-semibold underline underline-offset-4">Contact/source ↗</a> : null}</div>{item.followUpAt ? <p className="mt-3 text-xs text-muted-foreground">Follow up: {item.followUpAt}</p> : null}</article>;
}

function Breakdown({ title, rows }: { title: string; rows: Array<{ key: string; liveLinks: number; pipelineTargets: number }> }) {
  return <section><div className="border-b border-border pb-4"><h2 className="font-display text-3xl">{title}</h2></div><div>{rows.length === 0 ? <p className="py-6 text-sm text-muted-foreground">No data yet.</p> : rows.map((row) => <div key={row.key} className="flex items-center justify-between gap-5 border-b border-border py-3 text-sm"><span className="font-semibold">{row.key}</span><span className="text-muted-foreground">{row.liveLinks} live · {row.pipelineTargets} pipeline</span></div>)}</div></section>;
}

function Metric({ label, value }: { label: string; value: string | number }) {
  return <div className="border-t-2 border-foreground pt-3"><p className="font-display text-3xl">{value}</p><p className="mt-1 text-xs font-semibold uppercase text-muted-foreground">{label}</p></div>;
}
