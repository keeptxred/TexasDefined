import { createLazyFileRoute } from '@tanstack/react-router';
import { type FormEvent, useEffect, useMemo, useState } from 'react';

import { Container } from '@/components/layout/Container';
import {
  createSportsSponsorPlacementDraft,
  createSportsSponsorProspect,
  getSportsSponsorAdminDashboard,
  reviseSportsSponsorPlacementDraft,
  updateSportsSponsorPlacementStatus,
  updateSportsSponsorStatus,
} from '@/data/sports-sponsorship.functions';
import type {
  SportsSponsorAdminDashboard,
  SportsSponsorPlacementRecord,
  SportsSponsorPlacementStatus,
  SportsSponsorStatus,
} from '@/data/sports-sponsorship.types';

const SESSION_KEY = 'texasdefined:sports-partner-admin-key';
const sponsorStatuses: SportsSponsorStatus[] = ['prospect', 'approved', 'inactive'];
const placementStatuses: SportsSponsorPlacementStatus[] = ['draft', 'approved', 'paused', 'ended'];

export const Route = createLazyFileRoute('/admin/sports-sponsors')({ component: SportsSponsorAdminPage });

function SportsSponsorAdminPage() {
  const [accessKey, setAccessKey] = useState('');
  const [dashboard, setDashboard] = useState<SportsSponsorAdminDashboard | null>(null);
  const [loading, setLoading] = useState(false);
  const [busyId, setBusyId] = useState<string | null>(null);
  const [editingPlacementId, setEditingPlacementId] = useState<string | null>(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  async function refresh(key: string) {
    const result = await getSportsSponsorAdminDashboard({ data: { accessKey: key } });
    setDashboard(result);
    return result;
  }

  async function unlock(key: string) {
    setLoading(true);
    setError('');
    try {
      await refresh(key);
      sessionStorage.setItem(SESSION_KEY, key);
    } catch (cause) {
      console.error('Sports sponsorship admin access failed', cause);
      setDashboard(null);
      sessionStorage.removeItem(SESSION_KEY);
      setError('Access denied or sponsorship operations are temporarily unavailable.');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    const storedKey = sessionStorage.getItem(SESSION_KEY);
    if (!storedKey) return;
    setAccessKey(storedKey);
    void unlock(storedKey);
  }, []);

  function currentKey() {
    return sessionStorage.getItem(SESSION_KEY) || accessKey.trim();
  }

  async function runAction(id: string, action: (key: string) => Promise<unknown>, message: string) {
    const key = currentKey();
    setBusyId(id);
    setError('');
    setSuccess('');
    try {
      await action(key);
      await refresh(key);
      setSuccess(message);
    } catch (cause) {
      console.error('Sports sponsorship operation failed', cause);
      setError(cause instanceof Error ? cause.message : 'The sponsorship operation could not be completed.');
    } finally {
      setBusyId(null);
    }
  }

  function lock() {
    sessionStorage.removeItem(SESSION_KEY);
    setAccessKey('');
    setDashboard(null);
    setEditingPlacementId(null);
    setError('');
    setSuccess('');
  }

  async function submitUnlock(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (accessKey.trim()) await unlock(accessKey.trim());
  }

  async function createSponsor(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    await runAction('create-sponsor', (key) => createSportsSponsorProspect({ data: {
      accessKey: key,
      companyName: String(data.get('companyName') || ''),
      website: String(data.get('website') || ''),
      contactEmail: String(data.get('contactEmail') || '').trim() || null,
      sourceInquiryId: String(data.get('sourceInquiryId') || '').trim() || null,
      notes: String(data.get('notes') || '').trim() || null,
    } }), 'Sponsor prospect created. Review it before approving any placement.');
    form.reset();
  }

  async function createPlacement(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    await runAction('create-placement', (key) => createSportsSponsorPlacementDraft({ data: {
      accessKey: key,
      sponsorId: String(data.get('sponsorId') || ''),
      surfacePath: String(data.get('surfacePath') || ''),
      headline: String(data.get('headline') || ''),
      body: String(data.get('body') || ''),
      ctaLabel: String(data.get('ctaLabel') || ''),
      destinationUrl: String(data.get('destinationUrl') || ''),
      startsAt: toIsoOrNull(String(data.get('startsAt') || '')),
      endsAt: toIsoOrNull(String(data.get('endsAt') || '')),
    } }), 'Placement draft created. It is not public until both the sponsor and placement are approved.');
    form.reset();
  }

  async function revisePlacement(event: FormEvent<HTMLFormElement>, placementId: string) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    await runAction(placementId, (key) => reviseSportsSponsorPlacementDraft({ data: {
      accessKey: key,
      placementId,
      surfacePath: String(data.get('surfacePath') || ''),
      headline: String(data.get('headline') || ''),
      body: String(data.get('body') || ''),
      ctaLabel: String(data.get('ctaLabel') || ''),
      destinationUrl: String(data.get('destinationUrl') || ''),
      startsAt: toIsoOrNull(String(data.get('startsAt') || '')),
      endsAt: toIsoOrNull(String(data.get('endsAt') || '')),
    } }), 'Placement revised and returned to draft for reapproval.');
    setEditingPlacementId(null);
  }

  return <Container className="py-12 sm:py-16">
    <main className="mx-auto max-w-7xl">
      <header className="border-b border-border pb-8">
        <p className="eyebrow text-primary">TexasDefined Operations</p>
        <div className="mt-3 flex flex-wrap items-end justify-between gap-5">
          <div>
            <h1 className="font-display text-4xl sm:text-6xl">Sports Sponsorships</h1>
            <p className="mt-4 max-w-3xl text-sm leading-7 text-muted-foreground">Create sponsor prospects, review placement copy, explicitly approve delivery and monitor privacy-light 30-day impression/click totals. Sponsorship is governed separately from editorial venue rankings and visitor recommendations.</p>
          </div>
          {dashboard ? <button type="button" onClick={lock} className="min-h-11 border border-border px-4 py-2 text-sm font-semibold hover:border-primary hover:text-primary">Lock sponsorship console</button> : null}
        </div>
      </header>

      {!dashboard ? <section className="mt-10 max-w-xl border-y border-border py-8">
        <p className="eyebrow text-primary">Protected commercial operations</p>
        <h2 className="mt-2 font-display text-3xl">Unlock sponsorship controls</h2>
        <p className="mt-3 text-sm leading-7 text-muted-foreground">The same sports-partner admin key protects lead PII and sponsorship approvals. No sponsor records are loaded until the server validates it.</p>
        <form onSubmit={submitUnlock} className="mt-6 grid gap-4">
          <label className="grid gap-2 text-sm font-semibold" htmlFor="sportsSponsorAccessKey">Admin access key
            <input id="sportsSponsorAccessKey" type="password" autoComplete="current-password" value={accessKey} onChange={(event) => setAccessKey(event.target.value)} className="min-h-11 border border-border bg-background px-3 py-2 font-normal" required minLength={20} maxLength={200} />
          </label>
          <button type="submit" disabled={loading} className="min-h-11 justify-self-start bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground disabled:opacity-60">{loading ? 'Unlocking…' : 'Unlock sponsorship console'}</button>
        </form>
        {error ? <p className="mt-4 text-sm font-semibold text-destructive" role="alert">{error}</p> : null}
      </section> : <SponsorDashboard
        dashboard={dashboard}
        busyId={busyId}
        editingPlacementId={editingPlacementId}
        setEditingPlacementId={setEditingPlacementId}
        error={error}
        success={success}
        onCreateSponsor={createSponsor}
        onCreatePlacement={createPlacement}
        onRevisePlacement={revisePlacement}
        onSponsorStatus={(sponsorId, status) => runAction(sponsorId, (key) => updateSportsSponsorStatus({ data: { accessKey: key, sponsorId, status } }), `Sponsor status changed to ${status}.`)}
        onPlacementStatus={(placementId, status) => runAction(placementId, (key) => updateSportsSponsorPlacementStatus({ data: { accessKey: key, placementId, status } }), `Placement status changed to ${status}.`)}
      />}
    </main>
  </Container>;
}

function SponsorDashboard({ dashboard, busyId, editingPlacementId, setEditingPlacementId, error, success, onCreateSponsor, onCreatePlacement, onRevisePlacement, onSponsorStatus, onPlacementStatus }: {
  dashboard: SportsSponsorAdminDashboard;
  busyId: string | null;
  editingPlacementId: string | null;
  setEditingPlacementId: (id: string | null) => void;
  error: string;
  success: string;
  onCreateSponsor: (event: FormEvent<HTMLFormElement>) => Promise<void>;
  onCreatePlacement: (event: FormEvent<HTMLFormElement>) => Promise<void>;
  onRevisePlacement: (event: FormEvent<HTMLFormElement>, placementId: string) => Promise<void>;
  onSponsorStatus: (sponsorId: string, status: SportsSponsorStatus) => Promise<void>;
  onPlacementStatus: (placementId: string, status: SportsSponsorPlacementStatus) => Promise<void>;
}) {
  const totals = useMemo(() => dashboard.placements.reduce((sum, placement) => ({
    impressions: sum.impressions + placement.impressions30d,
    clicks: sum.clicks + placement.clicks30d,
  }), { impressions: 0, clicks: 0 }), [dashboard.placements]);
  const approvedSponsors = dashboard.sponsors.filter((sponsor) => sponsor.status === 'approved').length;
  const livePlacements = dashboard.placements.filter((placement) => placement.status === 'approved').length;

  return <>
    <section className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-6">
      <Metric label="Sponsors" value={dashboard.sponsors.length} />
      <Metric label="Approved sponsors" value={approvedSponsors} />
      <Metric label="Placements" value={dashboard.placements.length} />
      <Metric label="Approved placements" value={livePlacements} />
      <Metric label="30d impressions" value={totals.impressions} />
      <Metric label="30d clicks" value={totals.clicks} />
    </section>

    {error ? <p className="mt-5 text-sm font-semibold text-destructive" role="alert">{error}</p> : null}
    {success ? <p className="mt-5 border-l-2 border-primary pl-4 text-sm font-semibold text-foreground" role="status">{success}</p> : null}

    <section className="mt-10 grid gap-10 xl:grid-cols-2">
      <AdminPanel eyebrow="Sponsor onboarding" title="Create a prospect">
        <form onSubmit={onCreateSponsor} className="grid gap-4">
          <Field name="companyName" label="Company name" required />
          <Field name="website" label="HTTPS website" type="url" placeholder="https://" required />
          <Field name="contactEmail" label="Contact email" type="email" />
          <Field name="sourceInquiryId" label="Source inquiry UUID (optional)" />
          <label className="grid gap-2 text-sm font-semibold">Internal notes<textarea name="notes" rows={3} maxLength={2000} className="border border-border bg-background px-3 py-2 font-normal" /></label>
          <button type="submit" disabled={busyId === 'create-sponsor'} className="min-h-11 justify-self-start bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground disabled:opacity-60">Create prospect</button>
        </form>
      </AdminPanel>

      <AdminPanel eyebrow="Placement creation" title="Create a draft placement">
        <form onSubmit={onCreatePlacement} className="grid gap-4">
          <label className="grid gap-2 text-sm font-semibold">Sponsor
            <select name="sponsorId" required className="min-h-11 border border-border bg-background px-3 py-2 font-normal">
              <option value="">Choose sponsor…</option>
              {dashboard.sponsors.map((sponsor) => <option key={sponsor.id} value={sponsor.companyName}>{sponsor.companyName} ({sponsor.status})</option>)}
            </select>
          </label>
          <PlacementFields />
          <button type="submit" disabled={busyId === 'create-placement' || !dashboard.sponsors.length} className="min-h-11 justify-self-start bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground disabled:opacity-60">Create draft placement</button>
        </form>
      </AdminPanel>
    </section>

    <section className="mt-12">
      <p className="eyebrow text-primary">Sponsor registry</p>
      <h2 className="mt-2 font-display text-4xl">Businesses</h2>
      <div className="mt-5 grid gap-5 lg:grid-cols-2">
        {dashboard.sponsors.length ? dashboard.sponsors.map((sponsor) => <article key={sponsor.id} className="border-t border-border pt-5">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div><h3 className="font-display text-2xl">{sponsor.companyName}</h3><a href={sponsor.website} target="_blank" rel="noreferrer" className="mt-1 block text-sm font-semibold text-primary hover:underline">{sponsor.website} ↗</a></div>
            <label className="grid gap-1 text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">Status
              <select value={sponsor.status} disabled={busyId === sponsor.id} onChange={(event) => void onSponsorStatus(sponsor.id, event.target.value as SportsSponsorStatus)} className="min-h-10 border border-border bg-background px-3 py-2 text-sm font-normal normal-case tracking-normal text-foreground">
                {sponsorStatuses.map((status) => <option key={status} value={status}>{labelStatus(status)}</option>)}
              </select>
            </label>
          </div>
          {sponsor.contactEmail ? <a href={`mailto:${sponsor.contactEmail}`} className="mt-3 block text-sm text-primary hover:underline">{sponsor.contactEmail}</a> : null}
          {sponsor.sourceInquiryId ? <p className="mt-2 text-xs text-muted-foreground">Source inquiry: {sponsor.sourceInquiryId}</p> : null}
          {sponsor.notes ? <p className="mt-3 whitespace-pre-wrap text-sm leading-6 text-muted-foreground">{sponsor.notes}</p> : null}
        </article>) : <p className="text-sm text-muted-foreground">No sponsor prospects yet.</p>}
      </div>
    </section>

    <section className="mt-12">
      <p className="eyebrow text-primary">Placement registry</p>
      <h2 className="mt-2 font-display text-4xl">Sponsored surfaces</h2>
      <p className="mt-3 max-w-3xl text-sm leading-7 text-muted-foreground">Only an approved sponsor with an approved placement inside its schedule can render publicly. Revising copy automatically returns a placement to draft. Only one placement can be approved per sports surface at a time.</p>
      <div className="mt-5">
        {dashboard.placements.length ? dashboard.placements.map((placement) => <PlacementCard
          key={placement.id}
          placement={placement}
          busy={busyId === placement.id}
          editing={editingPlacementId === placement.id}
          onEdit={() => setEditingPlacementId(editingPlacementId === placement.id ? null : placement.id)}
          onRevise={(event) => onRevisePlacement(event, placement.id)}
          onStatus={(status) => onPlacementStatus(placement.id, status)}
        />) : <p className="border-t border-border py-6 text-sm text-muted-foreground">No placement drafts yet. Nothing sponsored is eligible to render publicly.</p>}
      </div>
    </section>
  </>;
}

function PlacementCard({ placement, busy, editing, onEdit, onRevise, onStatus }: {
  placement: SportsSponsorPlacementRecord;
  busy: boolean;
  editing: boolean;
  onEdit: () => void;
  onRevise: (event: FormEvent<HTMLFormElement>) => Promise<void>;
  onStatus: (status: SportsSponsorPlacementStatus) => Promise<void>;
}) {
  const ctr = placement.impressions30d > 0 ? (placement.clicks30d / placement.impressions30d) * 100 : 0;
  return <article className="border-t border-border py-6">
    <div className="grid gap-6 lg:grid-cols-[1fr_auto]">
      <div>
        <div className="flex flex-wrap items-center gap-3"><span className="border border-primary px-2 py-1 text-[0.68rem] font-bold uppercase tracking-[0.14em] text-primary">Sponsored</span><span className="text-xs text-muted-foreground">{placement.sponsorName}</span></div>
        <h3 className="mt-3 font-display text-3xl">{placement.headline}</h3>
        <p className="mt-2 max-w-3xl text-sm leading-7 text-muted-foreground">{placement.body}</p>
        <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-xs text-muted-foreground">
          <a href={placement.surfacePath} className="font-semibold text-primary hover:underline">{placement.surfacePath} →</a>
          <a href={placement.destinationUrl} target="_blank" rel="noreferrer" className="font-semibold text-primary hover:underline">Destination ↗</a>
          <span>30d: {placement.impressions30d} impressions · {placement.clicks30d} clicks · {ctr.toFixed(1)}% CTR</span>
          <span>Schedule: {scheduleLabel(placement)}</span>
        </div>
      </div>
      <div className="flex flex-wrap items-start gap-3 lg:flex-col">
        <label className="grid gap-1 text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">Status
          <select value={placement.status} disabled={busy} onChange={(event) => void onStatus(event.target.value as SportsSponsorPlacementStatus)} className="min-h-10 border border-border bg-background px-3 py-2 text-sm font-normal normal-case tracking-normal text-foreground">
            {placementStatuses.map((status) => <option key={status} value={status}>{labelStatus(status)}</option>)}
          </select>
        </label>
        <button type="button" disabled={busy} onClick={onEdit} className="min-h-10 border border-border px-3 py-2 text-sm font-semibold hover:border-primary hover:text-primary">{editing ? 'Cancel revision' : 'Revise copy'}</button>
      </div>
    </div>
    {editing ? <form onSubmit={onRevise} className="mt-6 grid gap-4 border-l-2 border-primary pl-5">
      <p className="text-sm font-semibold">Any saved revision returns this placement to draft and requires explicit reapproval.</p>
      <PlacementFields placement={placement} />
      <button type="submit" disabled={busy} className="min-h-11 justify-self-start bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground disabled:opacity-60">Save revision as draft</button>
    </form> : null}
  </article>;
}

function PlacementFields({ placement }: { placement?: SportsSponsorPlacementRecord }) {
  return <>
    <Field name="surfacePath" label="Sports surface path" placeholder="/sports-venue/att-stadium" defaultValue={placement?.surfacePath} required />
    <Field name="headline" label="Sponsored headline" defaultValue={placement?.headline} required />
    <label className="grid gap-2 text-sm font-semibold">Sponsored body<textarea name="body" rows={4} minLength={10} maxLength={320} defaultValue={placement?.body} required className="border border-border bg-background px-3 py-2 font-normal" /></label>
    <Field name="ctaLabel" label="CTA label" defaultValue={placement?.ctaLabel ?? 'Visit sponsor'} required />
    <Field name="destinationUrl" label="HTTPS destination URL" type="url" placeholder="https://" defaultValue={placement?.destinationUrl} required />
    <div className="grid gap-4 sm:grid-cols-2">
      <Field name="startsAt" label="Starts (optional)" type="datetime-local" defaultValue={toLocalDateTime(placement?.startsAt)} />
      <Field name="endsAt" label="Ends (optional)" type="datetime-local" defaultValue={toLocalDateTime(placement?.endsAt)} />
    </div>
  </>;
}

function AdminPanel({ eyebrow, title, children }: { eyebrow: string; title: string; children: React.ReactNode }) {
  return <section className="border-t border-border pt-6"><p className="eyebrow text-primary">{eyebrow}</p><h2 className="mt-2 font-display text-3xl">{title}</h2><div className="mt-6">{children}</div></section>;
}

function Field({ name, label, type = 'text', placeholder, required = false, defaultValue }: { name: string; label: string; type?: string; placeholder?: string; required?: boolean; defaultValue?: string }) {
  return <label className="grid gap-2 text-sm font-semibold">{label}<input name={name} type={type} placeholder={placeholder} required={required} defaultValue={defaultValue} className="min-h-11 border border-border bg-background px-3 py-2 font-normal" /></label>;
}

function Metric({ label, value }: { label: string; value: number }) {
  return <article className="border-t border-border pt-3"><strong className="font-display text-3xl">{value.toLocaleString()}</strong><span className="mt-1 block text-xs uppercase tracking-[0.12em] text-muted-foreground">{label}</span></article>;
}

function labelStatus(value: string) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

function toIsoOrNull(value: string) {
  if (!value) return null;
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? null : date.toISOString();
}

function toLocalDateTime(value?: string | null) {
  if (!value) return undefined;
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return undefined;
  const offset = date.getTimezoneOffset() * 60_000;
  return new Date(date.getTime() - offset).toISOString().slice(0, 16);
}

function scheduleLabel(placement: SportsSponsorPlacementRecord) {
  const start = placement.startsAt ? new Date(placement.startsAt).toLocaleDateString() : 'now';
  const end = placement.endsAt ? new Date(placement.endsAt).toLocaleDateString() : 'open-ended';
  return `${start} → ${end}`;
}
