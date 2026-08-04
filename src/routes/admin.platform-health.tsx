import { createFileRoute } from '@tanstack/react-router';
import { Container } from '@/components/layout/Container';
import { CONTENT_HEALTH_RESOURCES, validateAuthoritativeSources } from '@/data/source-governance';
import { TEXAS_CITIES, TEXAS_COUNTIES, validateTexasPlaces } from '@/data/texas-places';
import { TEXAS_ENTITY_REGISTRY, texasDataCoverage, validateTexasEntityRegistry } from '@/data/texas-entity-registry';
import { buildContentHealthReport } from '@/platform/content-health';

export const Route=createFileRoute('/admin/platform-health')({head:()=>({meta:[{title:'Platform Health | TexasDefined'},{name:'robots',content:'noindex,nofollow'}]}),component:Page});

function Page(){
  const places=validateTexasPlaces();
  const sources=validateAuthoritativeSources();
  const entities=validateTexasEntityRegistry();
  const coverage=texasDataCoverage();
  const report=buildContentHealthReport(CONTENT_HEALTH_RESOURCES,new Date());
  const errors=[...places.errors,...sources.errors,...entities.errors];
  const kinds=Object.entries(entities.countsByKind).sort((a,b)=>(b[1]??0)-(a[1]??0));
  return <Container className="py-16 sm:py-24"><p className="eyebrow text-primary">TexasDefined Operations</p><h1 className="mt-3 font-display text-4xl sm:text-6xl">Platform Health</h1>
    <section className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
      <Metric value={places.valid?'Healthy':'Blocked'} label="Statewide place data" detail={`${TEXAS_COUNTIES.length} counties · ${TEXAS_CITIES.length} seeded cities`} />
      <Metric value={entities.valid?'Healthy':'Blocked'} label="Knowledge graph" detail={`${TEXAS_ENTITY_REGISTRY.length} governed entities`} />
      <Metric value={sources.valid?'Healthy':'Blocked'} label="Source governance" detail={`${CONTENT_HEALTH_RESOURCES.length} monitored resources`} />
      <Metric value={String(report.healthy)} label="Healthy resources" detail={`${report.total} total`} />
      <Metric value={String(report.needsAttention)} label="Needs attention" detail="Review, trust, source, or next-step issues" />
    </section>
    {errors.length>0&&<section className="mt-8 rounded-md border border-destructive/40 p-5"><h2 className="font-display text-2xl">Validation errors</h2>{errors.map(error=><p className="mt-2 text-sm" key={error}>{error}</p>)}</section>}
    {entities.warnings.length>0&&<section className="mt-8 rounded-md border border-border bg-muted/40 p-5"><h2 className="font-display text-2xl">Graph warnings</h2>{entities.warnings.slice(0,50).map(warning=><p className="mt-2 text-sm text-muted-foreground" key={warning}>{warning}</p>)}</section>}
    <section className="mt-12"><h2 className="font-display text-3xl">Entity kinds</h2><div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">{kinds.map(([kind,count])=><article key={kind} className="rounded-md border border-border p-5"><strong className="capitalize">{kind.replaceAll('-',' ')}</strong><p className="mt-2 text-sm text-muted-foreground">{count} records</p></article>)}</div></section>
    <section className="mt-12"><h2 className="font-display text-3xl">Source-domain coverage</h2><div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{coverage.map(item=><article key={item.domain} className="rounded-md border border-border p-5"><strong className="capitalize">{item.domain.replaceAll('-',' ')}</strong><p className="mt-2 text-sm text-muted-foreground">{item.records} records · {item.active} active · {item.pending} pending verification · {item.sourceCount} sources</p></article>)}</div></section>
    <section className="mt-12"><h2 className="font-display text-3xl">Resource review queue</h2><div className="mt-6 space-y-3">{report.items.map(item=><article key={item.id} className="grid gap-2 rounded-md border border-border p-5 sm:grid-cols-[1fr_auto]"><div><strong>{item.title}</strong><p className="mt-1 text-sm text-muted-foreground">{item.issues.length?item.issues.join(' · '):'No structural issues found'}</p></div><div className="text-sm"><span className="font-medium capitalize">{item.status.replace('-',' ')}</span><p className="text-muted-foreground">{Number.isFinite(item.daysSinceReview)?`${item.daysSinceReview} days since review`:'Invalid review date'}</p></div></article>)}</div></section>
  </Container>;
}
function Metric({value,label,detail}:{value:string;label:string;detail:string}){return <article className="rounded-md bg-muted p-5"><strong className="font-display text-2xl">{value}</strong><span className="mt-2 block font-medium">{label}</span><small className="mt-1 block text-muted-foreground">{detail}</small></article>}
