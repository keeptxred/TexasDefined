import { createLazyFileRoute } from '@tanstack/react-router';
import { type FormEvent, useMemo, useState } from 'react';

import { Container } from '@/components/layout/Container';
import {
  createFishingSponsorPlacementDraft,
  createFishingSponsorProspect,
  getFishingSponsorAdminDashboard,
  updateFishingSponsorPlacementStatus,
  updateFishingSponsorStatus,
} from '@/data/fishing-sponsorship.functions';
import type { FishingSponsorAdminDashboard, FishingSponsorPlacementStatus, FishingSponsorStatus } from '@/data/fishing-sponsorship.types';

const SESSION_KEY = 'texasdefined:fishing-sponsor-admin-key';

export const Route = createLazyFileRoute('/admin/fishing-sponsors')({ component: FishingSponsorsAdmin });

function FishingSponsorsAdmin() {
  const [accessKey, setAccessKey] = useState('');
  const [dashboard, setDashboard] = useState<FishingSponsorAdminDashboard | null>(null);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');
  const [busy, setBusy] = useState(false);

  async function refresh(key = sessionStorage.getItem(SESSION_KEY) || accessKey.trim()) {
    const result = await getFishingSponsorAdminDashboard({ data: { accessKey: key } });
    setDashboard(result);
    return result;
  }

  async function unlock(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true); setError('');
    try {
      const key = accessKey.trim();
      await refresh(key);
      sessionStorage.setItem(SESSION_KEY, key);
    } catch (cause) {
      setDashboard(null);
      setError(cause instanceof Error ? cause.message : 'Access denied.');
    } finally { setBusy(false); }
  }

  async function run(action: (key: string) => Promise<unknown>, message: string) {
    const key = sessionStorage.getItem(SESSION_KEY) || accessKey.trim();
    setBusy(true); setError(''); setNotice('');
    try { await action(key); await refresh(key); setNotice(message); }
    catch (cause) { setError(cause instanceof Error ? cause.message : 'Operation failed.'); }
    finally { setBusy(false); }
  }

  async function createSponsor(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget; const data = new FormData(form);
    await run((key) => createFishingSponsorProspect({ data: {
      accessKey: key,
      companyName: String(data.get('companyName') || ''),
      website: String(data.get('website') || ''),
      contactEmail: String(data.get('contactEmail') || '').trim() || null,
      sourceInquiryId: String(data.get('sourceInquiryId') || '').trim() || null,
      notes: String(data.get('notes') || '').trim() || null,
    } }), 'Fishing sponsor prospect created.');
    form.reset();
  }

  async function createPlacement(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!dashboard) return;
    const form = event.currentTarget; const data = new FormData(form);
    const kind = String(data.get('kind') || '') as (typeof dashboard.inventory)[number]['kind'];
    const inventory = dashboard.inventory.find((item) => item.kind === kind);
    if (!inventory) return;
    await run((key) => createFishingSponsorPlacementDraft({ data: {
      accessKey: key,
      sponsorId: String(data.get('sponsorId') || ''),
      surfacePath: String(data.get('surfacePath') || ''),
      kind,
      headline: String(data.get('headline') || ''),
      body: String(data.get('body') || ''),
      ctaLabel: String(data.get('ctaLabel') || ''),
      destinationUrl: String(data.get('destinationUrl') || ''),
      priority: Number(data.get('priority') || 0),
      exclusive: inventory.exclusive,
      monthlyPriceCents: Number(data.get('monthlyPriceCents') || inventory.introMonthlyCents),
      startsAt: toIso(String(data.get('startsAt') || '')),
      endsAt: toIso(String(data.get('endsAt') || '')),
      renewalAt: toIso(String(data.get('renewalAt') || '')),
    } }), 'Fishing placement draft created. It cannot render until explicitly approved after the launch hold is removed.');
    form.reset();
  }

  const totals = useMemo(() => dashboard?.placements.reduce((sum, row) => ({ impressions: sum.impressions + row.impressions30d, clicks: sum.clicks + row.clicks30d }), { impressions: 0, clicks: 0 }) ?? { impressions: 0, clicks: 0 }, [dashboard]);
  const renewals = dashboard?.placements.filter((row) => row.renewalAt && new Date(row.renewalAt).getTime() <= Date.now() + 30 * 86400000 && row.status === 'approved').length ?? 0;

  return <Container className="py-12 sm:py-16"><main className="mx-auto max-w-7xl">
    <header className="border-b border-border pb-8"><p className="eyebrow text-primary">TexasDefined Operations</p><h1 className="mt-2 font-display text-5xl">Fishing Sponsorships</h1><p className="mt-4 max-w-3xl text-sm leading-7 text-muted-foreground">Govern fishing advertising separately from editorial rankings. Inventory, approvals, scheduling, aggregate analytics and renewals live here; paid placement never changes planner order, fishery ratings, access facts or guide verification.</p></header>
    {!dashboard ? <form onSubmit={unlock} className="mt-10 max-w-lg grid gap-4"><label className="grid gap-2 text-sm font-semibold">Commercial admin key<input type="password" value={accessKey} onChange={(event) => setAccessKey(event.target.value)} minLength={20} maxLength={200} required className="min-h-11 border border-border bg-background px-3" /></label><button disabled={busy} className="min-h-11 justify-self-start bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground">Unlock console</button>{error ? <p className="text-sm font-semibold text-destructive">{error}</p> : null}</form> : <>
      {dashboard.outreachHold ? <section className="mt-8 border-l-4 border-primary bg-muted/30 p-5"><p className="font-semibold">Commercial delivery hold is ON</p><p className="mt-2 text-sm text-muted-foreground">{dashboard.outreachHoldReason}</p></section> : null}
      <section className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-6"><Metric label="Sponsors" value={dashboard.sponsors.length} /><Metric label="Placements" value={dashboard.placements.length} /><Metric label="30d impressions" value={totals.impressions} /><Metric label="30d clicks" value={totals.clicks} /><Metric label="30d CTR" value={totals.impressions ? `${((totals.clicks / totals.impressions) * 100).toFixed(1)}%` : '—'} /><Metric label="Renewals ≤30d" value={renewals} /></section>
      {error ? <p className="mt-5 text-sm font-semibold text-destructive">{error}</p> : null}{notice ? <p className="mt-5 text-sm font-semibold text-primary">{notice}</p> : null}
      <section className="mt-12"><p className="eyebrow text-primary">Inventory & launch pricing</p><h2 className="mt-2 font-display text-4xl">Rate-card controls</h2><div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">{dashboard.inventory.map((item) => <article key={item.kind} className="border border-border p-5"><p className="text-sm font-semibold">{item.label}</p><p className="mt-2 text-sm leading-6 text-muted-foreground">{item.description}</p><p className="mt-4 text-sm"><strong>${(item.introMonthlyCents / 100).toFixed(0)}</strong> intro · ${(item.standardMonthlyCents / 100).toFixed(0)} standard / month</p><p className="mt-1 text-xs text-muted-foreground">{item.exclusive ? 'Exclusive inventory' : `Up to ${item.maxConcurrent} concurrent placements`}</p></article>)}</div></section>
      <section className="mt-12 grid gap-10 xl:grid-cols-2"><Panel title="Create sponsor prospect"><form onSubmit={createSponsor} className="grid gap-3"><Input name="companyName" label="Company name" required /><Input name="website" label="HTTPS website" type="url" required /><Input name="contactEmail" label="Contact email" type="email" /><Input name="sourceInquiryId" label="Partner inquiry UUID" /><label className="grid gap-2 text-sm font-semibold">Notes<textarea name="notes" maxLength={2000} rows={3} className="border border-border bg-background px-3 py-2 font-normal" /></label><button disabled={busy} className="min-h-11 justify-self-start bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground">Create prospect</button></form></Panel>
      <Panel title="Create placement draft"><form onSubmit={createPlacement} className="grid gap-3"><label className="grid gap-2 text-sm font-semibold">Sponsor<select name="sponsorId" required className="min-h-11 border border-border bg-background px-3 font-normal"><option value="">Choose…</option>{dashboard.sponsors.map((row) => <option key={row.id} value={row.id}>{row.companyName} ({row.status})</option>)}</select></label><label className="grid gap-2 text-sm font-semibold">Inventory<select name="kind" required className="min-h-11 border border-border bg-background px-3 font-normal">{dashboard.inventory.map((item) => <option key={item.kind} value={item.kind}>{item.label}</option>)}</select></label><Input name="surfacePath" label="Fishing surface path" placeholder="/fishing" required /><Input name="headline" label="Headline" required /><Input name="body" label="Body" required /><Input name="ctaLabel" label="CTA label" required /><Input name="destinationUrl" label="HTTPS destination URL" type="url" required /><Input name="priority" label="Priority 0–1000" type="number" defaultValue="0" required /><Input name="monthlyPriceCents" label="Monthly price cents (optional override)" type="number" /><Input name="startsAt" label="Starts at" type="datetime-local" /><Input name="endsAt" label="Ends at" type="datetime-local" /><Input name="renewalAt" label="Renewal at" type="datetime-local" /><button disabled={busy || !dashboard.sponsors.length} className="min-h-11 justify-self-start bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground">Create draft</button></form></Panel></section>
      <section className="mt-12"><h2 className="font-display text-4xl">Sponsors</h2><div className="mt-5 grid gap-4 lg:grid-cols-2">{dashboard.sponsors.map((row) => <article key={row.id} className="border border-border p-5"><div className="flex items-start justify-between gap-4"><div><h3 className="font-display text-2xl">{row.companyName}</h3><p className="mt-1 text-xs text-muted-foreground">{row.website}</p></div><StatusSelect value={row.status} values={['prospect','approved','inactive']} disabled={busy} onChange={(status) => run((key) => updateFishingSponsorStatus({ data: { accessKey: key, sponsorId: row.id, status: status as FishingSponsorStatus } }), `Sponsor changed to ${status}.`)} /></div></article>)}</div></section>
      <section className="mt-12"><h2 className="font-display text-4xl">Placements</h2><div className="mt-5 grid gap-4">{dashboard.placements.map((row) => <article key={row.id} className="border border-border p-5"><div className="flex flex-wrap items-start justify-between gap-4"><div><p className="eyebrow text-primary">{row.kind} · {row.surfacePath}</p><h3 className="mt-1 font-display text-2xl">{row.headline}</h3><p className="mt-2 text-sm text-muted-foreground">30d {row.impressions30d} impressions · {row.clicks30d} clicks · {row.exclusive ? 'exclusive' : 'shared'} · priority {row.priority}</p><p className="mt-1 text-xs text-muted-foreground">Price {row.monthlyPriceCents === null ? 'not set' : `$${(row.monthlyPriceCents / 100).toFixed(0)}/mo`} · renewal {row.renewalAt ? new Date(row.renewalAt).toLocaleDateString() : 'not set'}</p></div><StatusSelect value={row.status} values={['draft','approved','paused','ended']} disabled={busy} onChange={(status) => run((key) => updateFishingSponsorPlacementStatus({ data: { accessKey: key, placementId: row.id, status: status as FishingSponsorPlacementStatus } }), `Placement changed to ${status}.`)} /></div></article>)}</div></section>
    </>}
  </main></Container>;
}

function toIso(value: string) { return value ? new Date(value).toISOString() : null; }
function Metric({ label, value }: { label: string; value: string | number }) { return <div className="border-t border-border pt-3"><p className="eyebrow text-muted-foreground">{label}</p><p className="mt-1 font-display text-3xl">{value}</p></div>; }
function Panel({ title, children }: { title: string; children: React.ReactNode }) { return <section className="border-t border-border pt-5"><h2 className="font-display text-3xl">{title}</h2><div className="mt-5">{children}</div></section>; }
function Input({ name, label, ...props }: { name: string; label: string } & React.InputHTMLAttributes<HTMLInputElement>) { return <label className="grid gap-2 text-sm font-semibold">{label}<input name={name} {...props} className="min-h-11 border border-border bg-background px-3 font-normal" /></label>; }
function StatusSelect({ value, values, disabled, onChange }: { value: string; values: string[]; disabled: boolean; onChange: (value: string) => void }) { return <select value={value} disabled={disabled} onChange={(event) => onChange(event.target.value)} className="min-h-10 border border-border bg-background px-3 text-sm">{values.map((item) => <option key={item}>{item}</option>)}</select>; }
