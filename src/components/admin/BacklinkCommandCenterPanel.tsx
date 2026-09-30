import { type FormEvent, useEffect, useMemo, useState } from "react";

import {
  addBacklinkProspect,
  getBacklinkCommandCenter,
  saveBacklinkProspect,
} from "@/data/backlink-command-center.functions";
import {
  BACKLINK_LINK_ATTRIBUTES,
  BACKLINK_POLICY,
  BACKLINK_RESPONSE_VALUES,
  BACKLINK_SOURCE_TYPES,
  BACKLINK_STAGE_LABELS,
  BACKLINK_STAGES,
  BACKLINK_STATUS_VALUES,
  type BacklinkCommandCenterDashboard,
  type BacklinkRecord,
  type BacklinkRecordInput,
  type BacklinkStage,
} from "@/data/backlink-command-center";

export function BacklinkCommandCenterPanel({ accessKey }: { accessKey: string }) {
  const [dashboard, setDashboard] = useState<BacklinkCommandCenterDashboard | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showAdd, setShowAdd] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  async function refresh() {
    const data = await getBacklinkCommandCenter({ data: { accessKey } });
    setDashboard(data);
  }

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError("");
    getBacklinkCommandCenter({ data: { accessKey } })
      .then((data) => { if (!cancelled) setDashboard(data); })
      .catch((cause) => {
        console.error("Backlink command center load failed", cause);
        if (!cancelled) setError(cause instanceof Error ? cause.message : "Backlink command center could not be loaded.");
      })
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, [accessKey]);

  async function createRecord(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formElement = event.currentTarget;
    setSaving(true);
    setError("");
    setSuccess("");
    try {
      const record = recordFromForm(new FormData(formElement));
      await addBacklinkProspect({ data: { accessKey, record } });
      formElement.reset();
      setShowAdd(false);
      await refresh();
      setSuccess("Backlink prospect added to the private command center.");
    } catch (cause) {
      console.error("Backlink prospect create failed", cause);
      setError(cause instanceof Error ? cause.message : "Backlink prospect could not be added.");
    } finally {
      setSaving(false);
    }
  }

  async function updateRecord(event: FormEvent<HTMLFormElement>, id: string) {
    event.preventDefault();
    setSaving(true);
    setError("");
    setSuccess("");
    try {
      const record = recordFromForm(new FormData(event.currentTarget));
      await saveBacklinkProspect({ data: { accessKey, id, record } });
      setEditingId(null);
      await refresh();
      setSuccess("Backlink record updated.");
    } catch (cause) {
      console.error("Backlink prospect update failed", cause);
      setError(cause instanceof Error ? cause.message : "Backlink record could not be updated.");
    } finally {
      setSaving(false);
    }
  }

  async function advanceStage(record: BacklinkRecord, stage: BacklinkStage) {
    if (stage === "link-won" && (record.backlinkStatus !== "won" || !record.linkingUrl)) {
      setError("Use Edit record to add the verified linking URL and set backlink status to Won before moving this prospect to Link Won.");
      return;
    }
    setSaving(true);
    setError("");
    setSuccess("");
    try {
      const responseStatus =
        stage === "declined" ? "declined" :
        stage === "no-response" ? "no-response" :
        stage === "replied" || stage === "link-won" ? "replied" :
        record.responseStatus;
      await saveBacklinkProspect({
        data: {
          accessKey,
          id: record.id,
          record: {
            ...stripRecord(record),
            stage,
            responseStatus,
          },
        },
      });
      await refresh();
      setSuccess(`${record.referringDomain} moved to ${BACKLINK_STAGE_LABELS[stage]}.`);
    } catch (cause) {
      console.error("Backlink stage update failed", cause);
      setError(cause instanceof Error ? cause.message : "Backlink stage could not be updated.");
    } finally {
      setSaving(false);
    }
  }

  const staleWon = useMemo(() => {
    if (!dashboard) return 0;
    const cutoff = Date.now() - 1000 * 60 * 60 * 24 * 90;
    return dashboard.records.filter((record) => record.backlinkStatus === "won" && (!record.dateLastVerified || Date.parse(record.dateLastVerified) < cutoff)).length;
  }, [dashboard]);

  if (loading) return <section className="mt-12 border-y border-border py-8"><p className="text-sm text-muted-foreground">Loading backlink command center…</p></section>;
  if (!dashboard) return <section className="mt-12 border-y border-border py-8"><p className="font-semibold text-destructive">Backlink command center unavailable.</p>{error ? <p className="mt-2 text-sm text-muted-foreground">{error}</p> : null}</section>;

  return <section className="mt-12 border-y border-border py-10" aria-labelledby="backlink-command-center-heading">
    <div className="flex flex-wrap items-end justify-between gap-5 border-b border-border pb-6">
      <div>
        <p className="eyebrow text-primary">Earned-link operations</p>
        <h2 id="backlink-command-center-heading" className="mt-2 font-display text-4xl sm:text-5xl">Backlink Command Center</h2>
        <p className="mt-3 max-w-4xl text-sm leading-7 text-muted-foreground">Track prospects, outreach, replies, verified earned links and referring-domain growth without putting contact PII in the public repository. Link quality and relevance matter more than raw link count.</p>
      </div>
      <button type="button" onClick={() => { setShowAdd((value) => !value); setEditingId(null); }} className="min-h-11 border border-primary px-4 py-2 text-sm font-semibold text-primary hover:bg-primary hover:text-primary-foreground">{showAdd ? "Close form" : "Add prospect"}</button>
    </div>

    {error ? <p className="mt-5 border-l-2 border-destructive pl-4 text-sm font-semibold text-destructive" role="alert">{error}</p> : null}
    {success ? <p className="mt-5 border-l-2 border-primary pl-4 text-sm font-semibold" role="status">{success}</p> : null}

    {showAdd ? <div className="mt-7 border border-border bg-surface p-5">
      <h3 className="font-display text-2xl">Add backlink prospect</h3>
      <p className="mt-2 text-sm leading-6 text-muted-foreground">Store private contact details here, not in source files or campaign docs.</p>
      <ProspectForm onSubmit={createRecord} saving={saving} />
    </div> : null}

    <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
      <Metric label="Prospects" value={dashboard.metrics.totalProspects} />
      <Metric label="Contacted" value={dashboard.metrics.contacted} />
      <Metric label="Replies" value={dashboard.metrics.replies} />
      <Metric label="Links won" value={dashboard.metrics.linksWon} />
      <Metric label="Verified domains" value={dashboard.metrics.uniqueWonDomains} />
    </div>

    <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <Rate label="Prospect → Contact" value={dashboard.metrics.prospectToContactRate} />
      <Rate label="Contact → Reply" value={dashboard.metrics.contactToReplyRate} />
      <Rate label="Contact → Link" value={dashboard.metrics.contactToLinkRate} />
      <Rate label="Reply → Link" value={dashboard.metrics.replyToLinkRate} />
    </div>

    <div className="mt-10">
      <p className="eyebrow text-primary">Referring-domain goals</p>
      <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {dashboard.goals.map((goal) => <article key={goal.target} className="border border-border p-4">
          <div className="flex items-baseline justify-between gap-4"><strong className="font-display text-3xl">{goal.current}/{goal.target}</strong><span className="text-sm font-semibold">{goal.percent}%</span></div>
          <div className="mt-3 h-2 overflow-hidden bg-muted"><div className="h-full bg-primary" style={{ width: `${goal.percent}%` }} /></div>
          <p className="mt-2 text-xs text-muted-foreground">{goal.remaining ? `${goal.remaining} more verified domains to goal` : "Goal reached"}</p>
        </article>)}
      </div>
    </div>

    <div className="mt-10">
      <p className="eyebrow text-primary">Pipeline</p>
      <div className="mt-4 grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
        {BACKLINK_STAGES.map((stage) => <div key={stage} className="border-t border-border pt-3"><strong className="font-display text-2xl">{dashboard.stageCounts[stage]}</strong><span className="ml-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">{BACKLINK_STAGE_LABELS[stage]}</span></div>)}
      </div>
    </div>

    <div className="mt-10 grid gap-8 lg:grid-cols-2">
      <div>
        <div className="flex items-end justify-between gap-4 border-b border-border pb-4">
          <div><p className="eyebrow text-primary">Prospect queue</p><h3 className="mt-2 font-display text-3xl">Relationships and earned links</h3></div>
          <span className="text-xs text-muted-foreground">{dashboard.metrics.activeCampaigns} active campaign{dashboard.metrics.activeCampaigns === 1 ? "" : "s"}</span>
        </div>
        {dashboard.records.length ? dashboard.records.map((record) => <article key={record.id} className="border-b border-border py-6">
          <div className="grid gap-4 md:grid-cols-[1fr_auto]">
            <div>
              <div className="flex flex-wrap items-center gap-2"><h4 className="font-display text-2xl">{record.contactOrganization}</h4><span className="border border-border px-2 py-1 text-[0.68rem] font-semibold uppercase tracking-wider">{BACKLINK_STAGE_LABELS[record.stage]}</span></div>
              <p className="mt-1 text-sm text-muted-foreground">{record.referringDomain} · {record.topicCluster} · {record.campaign}</p>
              <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-sm">
                <a href={record.destinationUrl} target="_blank" rel="noreferrer" className="font-semibold text-primary underline underline-offset-4">TexasDefined destination ↗</a>
                {record.linkingUrl ? <a href={record.linkingUrl} target="_blank" rel="noreferrer" className="font-semibold underline underline-offset-4">Linking page ↗</a> : null}
                {record.contactEmail ? <a href={`mailto:${record.contactEmail}`} className="font-semibold underline underline-offset-4">{record.contactEmail}</a> : null}
              </div>
              <p className="mt-4 text-sm leading-7">{record.outreachReason}</p>
              {record.authorityRelevanceNotes ? <p className="mt-2 text-sm leading-7 text-muted-foreground">{record.authorityRelevanceNotes}</p> : null}
              <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-xs text-muted-foreground">
                <span>Backlink: {label(record.backlinkStatus)}</span><span>Attribute: {label(record.linkAttribute)}</span><span>Response: {label(record.responseStatus)}</span>
                {record.dateFirstDiscovered ? <span>First found: {record.dateFirstDiscovered}</span> : null}
                {record.dateLastVerified ? <span>Verified: {record.dateLastVerified}</span> : null}
              </div>
              {record.nextAction ? <p className="mt-3 text-sm"><strong>Next:</strong> {record.nextAction}</p> : null}
            </div>
            <div className="grid gap-3">
              <label className="grid gap-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Stage
                <select value={record.stage} disabled={saving} onChange={(event) => void advanceStage(record, event.target.value as BacklinkStage)} className="min-h-10 border border-border bg-background px-3 py-2 text-sm font-normal normal-case tracking-normal text-foreground">
                  {BACKLINK_STAGES.map((stage) => <option key={stage} value={stage} disabled={stage === "link-won" && (record.backlinkStatus !== "won" || !record.linkingUrl)}>{BACKLINK_STAGE_LABELS[stage]}</option>)}
                </select>
              </label>
              <button type="button" onClick={() => { setEditingId((current) => current === record.id ? null : record.id); setShowAdd(false); }} className="min-h-10 border border-border px-3 py-2 text-sm font-semibold hover:border-primary hover:text-primary">{editingId === record.id ? "Close editor" : "Edit record"}</button>
            </div>
          </div>
          {editingId === record.id ? <div className="mt-5 border border-border bg-surface p-5"><ProspectForm record={record} onSubmit={(event) => updateRecord(event, record.id)} saving={saving} /></div> : null}
        </article>) : <p className="py-8 text-sm text-muted-foreground">No backlink prospects have been added yet. Start with the strongest organizations already surfaced by Editorial Source Outreach.</p>}
      </div>

      <aside>
        <p className="eyebrow text-primary">Quality control</p>
        <h3 className="mt-2 font-display text-3xl">Cross-campaign duplicates</h3>
        <p className="mt-2 text-sm leading-6 text-muted-foreground">Same-domain relationships can support more than one TexasDefined page, but duplicate outreach should be reviewed before another contact.</p>
        <div className="mt-4 border-t border-border">
          {dashboard.duplicateGroups.length ? dashboard.duplicateGroups.map((group) => <div key={group.referringDomain} className="border-b border-border py-4">
            <strong className="text-sm">{group.referringDomain}</strong>
            <p className="mt-1 text-xs text-muted-foreground">{group.campaigns.length} campaigns · {group.destinationUrls.length} destinations</p>
            <p className="mt-2 text-xs leading-5 text-muted-foreground">{group.campaigns.join(" · ")}</p>
          </div>) : <p className="py-4 text-sm text-muted-foreground">No cross-campaign duplicate domains.</p>}
        </div>
        <div className="mt-6 border-t border-border pt-5">
          <p className="text-sm font-semibold">Verification watch</p>
          <p className="mt-1 text-3xl font-display">{staleWon}</p>
          <p className="text-xs leading-5 text-muted-foreground">Won link{staleWon === 1 ? "" : "s"} never verified or not verified in the last 90 days.</p>
        </div>
        <div className="mt-6 border-t border-border pt-5">
          <p className="text-sm font-semibold">Legitimate link standard</p>
          <ul className="mt-3 space-y-2 text-xs leading-5 text-muted-foreground">{BACKLINK_POLICY.legitimateBacklinkDefinition.map((rule) => <li key={rule}>• {rule}</li>)}</ul>
        </div>
      </aside>
    </div>

    <div className="mt-12">
      <p className="eyebrow text-primary">Monthly report</p>
      <h3 className="mt-2 font-display text-3xl">Rolling 12-month acquisition report</h3>
      <div className="mt-5 overflow-x-auto">
        <table className="min-w-full w-full border-collapse text-left text-sm">
          <thead><tr className="border-y border-border text-xs uppercase tracking-wider text-muted-foreground"><th className="py-3 pr-4">Month</th><th className="py-3 pr-4">Added</th><th className="py-3 pr-4">Contacted</th><th className="py-3 pr-4">Replies</th><th className="py-3 pr-4">Links won</th><th className="py-3 pr-4">Won domains</th><th className="py-3 pr-4">Contact→reply</th><th className="py-3">Contact→link</th></tr></thead>
          <tbody>{dashboard.monthlyReports.map((report) => <tr key={report.month} className="border-b border-border"><td className="py-3 pr-4 font-semibold">{report.month}</td><td className="py-3 pr-4">{report.prospectsAdded}</td><td className="py-3 pr-4">{report.contacted}</td><td className="py-3 pr-4">{report.replies}</td><td className="py-3 pr-4">{report.linksWon}</td><td className="py-3 pr-4">{report.uniqueWonDomains}</td><td className="py-3 pr-4">{report.contactToReplyRate}%</td><td className="py-3">{report.contactToLinkRate}%</td></tr>)}</tbody>
        </table>
      </div>
    </div>

    <div className="mt-10 grid gap-6 lg:grid-cols-2">
      <div className="border-t border-border pt-5"><p className="text-xs font-bold uppercase tracking-[0.12em] text-muted-foreground">Reject</p><ul className="mt-3 space-y-2 text-sm leading-6 text-muted-foreground">{BACKLINK_POLICY.rejectedSchemes.map((rule) => <li key={rule}>• {rule}</li>)}</ul></div>
      <div className="border-t border-border pt-5"><p className="text-xs font-bold uppercase tracking-[0.12em] text-muted-foreground">Outreach rule</p><p className="mt-3 text-sm leading-7 text-muted-foreground">{BACKLINK_POLICY.outreachRule}</p><p className="mt-3 text-sm leading-7 text-muted-foreground">{BACKLINK_POLICY.privacyRule}</p></div>
    </div>

    <p className="mt-8 text-xs text-muted-foreground">Command center generated {new Date(dashboard.generatedAt).toLocaleString()}. Cross-campaign duplicates: {dashboard.metrics.duplicateDomainsAcrossCampaigns}.</p>
  </section>;
}

function ProspectForm({ record, onSubmit, saving }: { record?: BacklinkRecord; onSubmit: (event: FormEvent<HTMLFormElement>) => void | Promise<void>; saving: boolean }) {
  return <form onSubmit={(event) => void onSubmit(event)} className="mt-5 grid gap-4 md:grid-cols-2">
    <Field label="Referring domain" name="referringDomain" defaultValue={record?.referringDomain} placeholder="example.org" required />
    <Field label="Campaign" name="campaign" defaultValue={record?.campaign} placeholder="Painted Churches outreach" required />
    <Field label="TexasDefined destination URL" name="destinationUrl" type="url" defaultValue={record?.destinationUrl} placeholder="https://texasdefined.com/..." required />
    <Field label="Linking URL" name="linkingUrl" type="url" defaultValue={record?.linkingUrl ?? ""} placeholder="https://example.org/resources" />
    <Field label="Topic / content cluster" name="topicCluster" defaultValue={record?.topicCluster} placeholder="Painted Churches" required />
    <Field label="Contact organization" name="contactOrganization" defaultValue={record?.contactOrganization} required />
    <Field label="Contact name" name="contactName" defaultValue={record?.contactName ?? ""} />
    <Field label="Contact email" name="contactEmail" type="email" defaultValue={record?.contactEmail ?? ""} />
    <SelectField label="Source type" name="sourceType" values={BACKLINK_SOURCE_TYPES} defaultValue={record?.sourceType ?? "other"} />
    <SelectField label="Stage" name="stage" values={BACKLINK_STAGES} defaultValue={record?.stage ?? "prospect"} labels={BACKLINK_STAGE_LABELS} />
    <SelectField label="Response status" name="responseStatus" values={BACKLINK_RESPONSE_VALUES} defaultValue={record?.responseStatus ?? "none"} />
    <SelectField label="Backlink status" name="backlinkStatus" values={BACKLINK_STATUS_VALUES} defaultValue={record?.backlinkStatus ?? "unknown"} />
    <SelectField label="Follow / nofollow" name="linkAttribute" values={BACKLINK_LINK_ATTRIBUTES} defaultValue={record?.linkAttribute ?? "unknown"} />
    <Field label="Anchor text" name="anchorText" defaultValue={record?.anchorText ?? ""} />
    <Field label="Outreach date" name="outreachDate" type="date" defaultValue={record?.outreachDate ?? ""} />
    <Field label="Last follow-up date" name="lastFollowUpDate" type="date" defaultValue={record?.lastFollowUpDate ?? ""} />
    <Field label="Date link first discovered" name="dateFirstDiscovered" type="date" defaultValue={record?.dateFirstDiscovered ?? ""} />
    <Field label="Date last verified" name="dateLastVerified" type="date" defaultValue={record?.dateLastVerified ?? ""} />
    <TextArea label="Outreach reason" name="outreachReason" defaultValue={record?.outreachReason} placeholder="Why this organization has a genuine reason to know or cite this TexasDefined resource." required />
    <TextArea label="Authority / relevance notes" name="authorityRelevanceNotes" defaultValue={record?.authorityRelevanceNotes} />
    <TextArea label="Next action" name="nextAction" defaultValue={record?.nextAction} />
    <button type="submit" disabled={saving} className="min-h-11 justify-self-start border border-primary bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground disabled:opacity-60">{saving ? "Saving…" : record ? "Save record" : "Add prospect"}</button>
  </form>;
}

function recordFromForm(form: FormData): BacklinkRecordInput {
  const optional = (name: string) => {
    const value = String(form.get(name) ?? "").trim();
    return value || null;
  };
  return {
    referringDomain: String(form.get("referringDomain") ?? "").trim(),
    linkingUrl: optional("linkingUrl"),
    destinationUrl: String(form.get("destinationUrl") ?? "").trim(),
    topicCluster: String(form.get("topicCluster") ?? "").trim(),
    contactOrganization: String(form.get("contactOrganization") ?? "").trim(),
    contactName: optional("contactName"),
    contactEmail: optional("contactEmail"),
    sourceType: String(form.get("sourceType")) as BacklinkRecordInput["sourceType"],
    outreachReason: String(form.get("outreachReason") ?? "").trim(),
    outreachDate: optional("outreachDate"),
    lastFollowUpDate: optional("lastFollowUpDate"),
    responseStatus: String(form.get("responseStatus")) as BacklinkRecordInput["responseStatus"],
    backlinkStatus: String(form.get("backlinkStatus")) as BacklinkRecordInput["backlinkStatus"],
    linkAttribute: String(form.get("linkAttribute")) as BacklinkRecordInput["linkAttribute"],
    anchorText: optional("anchorText"),
    authorityRelevanceNotes: String(form.get("authorityRelevanceNotes") ?? "").trim(),
    nextAction: String(form.get("nextAction") ?? "").trim(),
    campaign: String(form.get("campaign") ?? "").trim(),
    stage: String(form.get("stage")) as BacklinkStage,
    dateFirstDiscovered: optional("dateFirstDiscovered"),
    dateLastVerified: optional("dateLastVerified"),
  };
}

function stripRecord(record: BacklinkRecord): BacklinkRecordInput {
  const { id: _id, createdAt: _createdAt, updatedAt: _updatedAt, ...input } = record;
  return input;
}

function Field({ label: fieldLabel, name, type = "text", defaultValue, placeholder, required = false }: { label: string; name: string; type?: string; defaultValue?: string; placeholder?: string; required?: boolean }) {
  return <label className="grid gap-2 text-sm font-semibold">{fieldLabel}<input name={name} type={type} defaultValue={defaultValue} placeholder={placeholder} required={required} className="min-h-11 border border-border bg-background px-3 py-2 font-normal" /></label>;
}

function TextArea({ label: fieldLabel, name, defaultValue, placeholder, required = false }: { label: string; name: string; defaultValue?: string; placeholder?: string; required?: boolean }) {
  return <label className="grid gap-2 text-sm font-semibold md:col-span-2">{fieldLabel}<textarea name={name} rows={4} defaultValue={defaultValue} placeholder={placeholder} required={required} className="border border-border bg-background px-3 py-3 font-normal" /></label>;
}

function SelectField<T extends readonly string[]>({ label: fieldLabel, name, values, defaultValue, labels }: { label: string; name: string; values: T; defaultValue: T[number]; labels?: Partial<Record<T[number], string>> }) {
  return <label className="grid gap-2 text-sm font-semibold">{fieldLabel}<select name={name} defaultValue={defaultValue} className="min-h-11 border border-border bg-background px-3 py-2 font-normal">{values.map((value) => <option key={value} value={value}>{labels?.[value] ?? label(value)}</option>)}</select></label>;
}

function Metric({ label: metricLabel, value }: { label: string; value: number }) {
  return <article className="border-t border-border pt-3"><strong className="font-display text-3xl">{value}</strong><span className="mt-1 block text-xs uppercase tracking-[0.12em] text-muted-foreground">{metricLabel}</span></article>;
}

function Rate({ label: rateLabel, value }: { label: string; value: number }) {
  return <article className="border border-border p-4"><strong className="font-display text-3xl">{value}%</strong><span className="mt-1 block text-xs uppercase tracking-[0.12em] text-muted-foreground">{rateLabel}</span></article>;
}

function label(value: string) {
  return value.replaceAll("-", " ").replace(/\b\w/g, (character) => character.toUpperCase());
}
