import { createLazyFileRoute } from '@tanstack/react-router';
import { type FormEvent, useEffect, useMemo, useState } from 'react';

import { Container } from '@/components/layout/Container';
import { getSportsPartnerLeadDashboard, setSportsPartnerLeadStatus } from '@/data/sports-partner-leads.functions';
import { promoteSportsPartnerLeadToSponsor } from '@/data/sports-partner-promotion.functions';
import type { SportsPartnerLeadDashboard, SportsPartnerLeadStatus } from '@/data/sports-partner-leads.types';

const SESSION_KEY = 'texasdefined:sports-partner-admin-key';
const statuses: SportsPartnerLeadStatus[] = ['new', 'reviewing', 'contacted', 'closed'];

export const Route = createLazyFileRoute('/admin/sports-partners')({ component: SportsPartnerLeadsPage });

function SportsPartnerLeadsPage() {
  const [accessKey, setAccessKey] = useState('');
  const [dashboard, setDashboard] = useState<SportsPartnerLeadDashboard | null>(null);
  const [loading, setLoading] = useState(false);
  const [updatingLeadId, setUpdatingLeadId] = useState<string | null>(null);
  const [promotingLeadId, setPromotingLeadId] = useState<string | null>(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  async function unlock(key: string) {
    setLoading(true); setError(''); setSuccess('');
    try {
      const result = await getSportsPartnerLeadDashboard({ data: { accessKey: key } });
      setDashboard(result); sessionStorage.setItem(SESSION_KEY, key);
    } catch (cause) {
      console.error('Sports partner lead access failed', cause);
      setDashboard(null); sessionStorage.removeItem(SESSION_KEY);
      setError('Access denied or the lead service is temporarily unavailable.');
    } finally { setLoading(false); }
  }

  useEffect(() => { const storedKey = sessionStorage.getItem(SESSION_KEY); if (!storedKey) return; setAccessKey(storedKey); void unlock(storedKey); }, []);

  async function submit(event: FormEvent<HTMLFormElement>) { event.preventDefault(); if (!accessKey.trim()) return; await unlock(accessKey.trim()); }

  async function updateStatus(leadId: string, status: SportsPartnerLeadStatus) {
    if (!dashboard) return;
    const key = sessionStorage.getItem(SESSION_KEY) || accessKey;
    setUpdatingLeadId(leadId); setError(''); setSuccess('');
    try {
      await setSportsPartnerLeadStatus({ data: { accessKey: key, leadId, status } });
      setDashboard(await getSportsPartnerLeadDashboard({ data: { accessKey: key } }));
    } catch (cause) {
      console.error('Sports partner lead status update failed', cause);
      setError('The lead status could not be updated. Unlock the dashboard again if your session expired.');
    } finally { setUpdatingLeadId(null); }
  }

  async function promoteLead(leadId: string) {
    if (!dashboard) return;
    const key = sessionStorage.getItem(SESSION_KEY) || accessKey;
    setPromotingLeadId(leadId); setError(''); setSuccess('');
    try {
      const result = await promoteSportsPartnerLeadToSponsor({ data: { accessKey: key, leadId } });
      setDashboard(await getSportsPartnerLeadDashboard({ data: { accessKey: key } }));
      setSuccess(`${result.companyName} was promoted to a sponsor prospect. Review and approve it in Sports Sponsorships before creating any live placement.`);
    } catch (cause) {
      console.error('Sports partner lead promotion failed', cause);
      setError(cause instanceof Error ? cause.message : 'The lead could not be promoted to a sponsor prospect.');
    } finally { setPromotingLeadId(null); }
  }

  function lock() { sessionStorage.removeItem(SESSION_KEY); setAccessKey(''); setDashboard(null); setError(''); setSuccess(''); }

  return <Container className="py-12 sm:py-16"><main className="mx-auto max-w-6xl">
    <header className="border-b border-border pb-8"><p className="eyebrow text-primary">TexasDefined Operations</p><div className="mt-3 flex flex-wrap items-end justify-between gap-5"><div><h1 className="font-display text-4xl sm:text-6xl">Sports Partner Leads</h1><p className="mt-4 max-w-3xl text-sm leading-7 text-muted-foreground">Review sports-travel partnership inquiries, see which venue guide generated each lead and move opportunities through the existing new → reviewing → contacted → closed workflow. Qualified leads with an HTTPS business website can be promoted directly into the sponsor prospect registry.</p></div>{dashboard ? <button type="button" onClick={lock} className="min-h-11 border border-border px-4 py-2 text-sm font-semibold hover:border-primary hover:text-primary">Lock dashboard</button> : null}</div></header>
    {!dashboard ? <section className="mt-10 max-w-xl border-y border-border py-8" aria-labelledby="unlock-heading"><p className="eyebrow text-primary">Protected lead data</p><h2 id="unlock-heading" className="mt-2 font-display text-3xl">Unlock sports partner leads</h2><p className="mt-3 text-sm leading-7 text-muted-foreground">Lead names, emails and messages are not loaded with this page. Enter the sports-partner admin key to request them from the server. The key is kept only for this browser session.</p><form onSubmit={submit} className="mt-6 grid gap-4"><label className="grid gap-2 text-sm font-semibold" htmlFor="sportsPartnerAccessKey">Admin access key<input id="sportsPartnerAccessKey" type="password" autoComplete="current-password" value={accessKey} onChange={(event) => setAccessKey(event.target.value)} className="min-h-11 border border-border bg-background px-3 py-2 font-normal" required minLength={20} maxLength={200} /></label><button type="submit" disabled={loading} className="min-h-11 justify-self-start bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground disabled:opacity-60">{loading ? 'Unlocking…' : 'Unlock lead dashboard'}</button></form>{error ? <p className="mt-4 text-sm font-semibold text-destructive" role="alert">{error}</p> : null}</section> : <LeadDashboard dashboard={dashboard} updatingLeadId={updatingLeadId} promotingLeadId={promotingLeadId} onStatusChange={updateStatus} onPromote={promoteLead} error={error} success={success} />}
  </main></Container>;
}

function LeadDashboard({ dashboard, updatingLeadId, promotingLeadId, onStatusChange, onPromote, error, success }: { dashboard: SportsPartnerLeadDashboard; updatingLeadId: string | null; promotingLeadId: string | null; onStatusChange: (leadId: string, status: SportsPartnerLeadStatus) => Promise<void>; onPromote: (leadId: string) => Promise<void>; error: string; success: string; }) {
  const venueAttributed = useMemo(() => dashboard.leads.filter((lead) => lead.sourcePath.startsWith('/sports-venue/')).length, [dashboard.leads]);
  return <>
    <section className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-6"><Metric label="Visible leads" value={dashboard.leads.length} /><Metric label="New" value={dashboard.statusCounts.new} /><Metric label="Reviewing" value={dashboard.statusCounts.reviewing} /><Metric label="Contacted" value={dashboard.statusCounts.contacted} /><Metric label="Closed" value={dashboard.statusCounts.closed} /><Metric label="Venue-attributed" value={venueAttributed} /></section>
    {dashboard.truncated ? <p className="mt-5 border-l-2 border-primary pl-4 text-sm text-muted-foreground">Showing the latest {dashboard.limit} sports-travel inquiries. Older leads remain in Supabase.</p> : null}{error ? <p className="mt-5 text-sm font-semibold text-destructive" role="alert">{error}</p> : null}{success ? <p className="mt-5 border-l-2 border-primary pl-4 text-sm font-semibold text-foreground" role="status">{success}</p> : null}
    <section className="mt-10 grid gap-8 lg:grid-cols-[17rem_1fr]"><aside><p className="eyebrow text-primary">Lead sources</p><h2 className="mt-2 font-display text-3xl">What is generating interest</h2><div className="mt-5 border-t border-border">{dashboard.sourceCounts.length ? dashboard.sourceCounts.slice(0, 20).map((source) => <div key={source.sourcePath} className="border-b border-border py-3"><strong className="block text-sm">{sourceLabel(source.sourcePath)}</strong><span className="mt-1 block text-xs text-muted-foreground">{source.count} lead{source.count === 1 ? '' : 's'}</span></div>) : <p className="py-4 text-sm text-muted-foreground">No sports-travel inquiries yet.</p>}</div><p className="mt-4 text-xs leading-5 text-muted-foreground">Generated {formatDateTime(dashboard.generatedAt)}. Attribution comes from the internal source path recorded when the inquiry form is submitted.</p></aside>
      <div><div className="flex items-end justify-between gap-4 border-b border-border pb-4"><div><p className="eyebrow text-primary">Inquiry queue</p><h2 className="mt-2 font-display text-3xl">Sports-travel opportunities</h2></div></div>{dashboard.leads.length ? <div>{dashboard.leads.map((lead) => <article key={lead.id} className="border-b border-border py-7"><div className="grid gap-5 md:grid-cols-[1fr_auto] md:items-start"><div><div className="flex flex-wrap items-center gap-x-3 gap-y-2"><h3 className="font-display text-2xl">{lead.company}</h3><span className="border border-border px-2 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.12em]">{lead.status}</span></div><p className="mt-2 text-sm text-muted-foreground">{lead.contactName} · <a className="font-semibold text-primary hover:underline" href={`mailto:${lead.email}`}>{lead.email}</a></p>{lead.website ? <a className="mt-2 inline-block text-sm font-semibold text-primary hover:underline" href={lead.website} target="_blank" rel="noreferrer">Open company website ↗</a> : null}</div><label className="grid gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground" htmlFor={`status-${lead.id}`}>Status<select id={`status-${lead.id}`} value={lead.status} disabled={updatingLeadId === lead.id || promotingLeadId === lead.id} onChange={(event) => void onStatusChange(lead.id, event.target.value as SportsPartnerLeadStatus)} className="min-h-10 border border-border bg-background px-3 py-2 text-sm font-normal normal-case tracking-normal text-foreground disabled:opacity-60">{statuses.map((status) => <option key={status} value={status}>{statusLabel(status)}</option>)}</select></label></div><p className="mt-5 whitespace-pre-wrap text-sm leading-7 text-foreground">{lead.message}</p><div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-3 text-xs text-muted-foreground"><span>Received {formatDateTime(lead.createdAt)}</span>{sourceHref(lead.sourcePath) ? <a className="font-semibold text-primary hover:underline" href={sourceHref(lead.sourcePath)!}>{sourceLabel(lead.sourcePath)} →</a> : <span>{sourceLabel(lead.sourcePath)}</span>}{lead.website ? <button type="button" disabled={promotingLeadId === lead.id || updatingLeadId === lead.id} onClick={() => void onPromote(lead.id)} className="min-h-10 border border-primary px-3 py-2 font-semibold text-primary hover:bg-primary hover:text-primary-foreground disabled:opacity-60">{promotingLeadId === lead.id ? 'Promoting…' : 'Promote to sponsor prospect →'}</button> : <span className="font-medium">Website required before sponsor promotion</span>}</div></article>)}</div> : <p className="py-8 text-sm text-muted-foreground">No sports-travel partnership inquiries have been submitted yet.</p>}</div>
    </section>
  </>;
}
function Metric({ label, value }: { label: string; value: number }) { return <article className="border-t border-border pt-3"><strong className="font-display text-3xl">{value}</strong><span className="mt-1 block text-xs uppercase tracking-[0.12em] text-muted-foreground">{label}</span></article>; }
function sourceHref(sourcePath: string) { return sourcePath === '/sports-venues' || sourcePath.startsWith('/sports-venue/') ? sourcePath : null; }
function sourceLabel(sourcePath: string) { if (sourcePath === '/sports-venues') return 'Statewide sports venue directory'; if (sourcePath.startsWith('/sports-venue/')) return `${title(sourcePath.replace('/sports-venue/', ''))} venue guide`; if (sourcePath === '/partner-with-us') return 'Partner With Us page'; return sourcePath; }
function statusLabel(status: SportsPartnerLeadStatus) { return status.charAt(0).toUpperCase() + status.slice(1); }
function title(value: string) { return value.replaceAll('-', ' ').replace(/\b\w/g, (character) => character.toUpperCase()); }
function formatDateTime(value: string) { const date = new Date(value); return Number.isNaN(date.getTime()) ? value : date.toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' }); }
