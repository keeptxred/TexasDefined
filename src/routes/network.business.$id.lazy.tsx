import { createLazyFileRoute } from "@tanstack/react-router";
import { Container } from "@/components/layout/Container";
export const Route = createLazyFileRoute("/network/business/$id")({ component: NetworkBusinessPage });

function safeExternal(value: string | null) {
  if (!value) return null;
  try { const parsed = new URL(value); return ["https:", "http:"].includes(parsed.protocol) ? parsed.href : null; }
  catch { return null; }
}

function NetworkBusinessPage() {
  const data = Route.useLoaderData();
  if (!data) return <main><Container className="py-24"><h1 className="font-display text-4xl">This listing is not available.</h1><p className="mt-5 text-muted-foreground">Profiles appear here after verification and publication.</p><a className="mt-6 inline-block text-primary underline" href="/network/join">Explore the Texas Defined Network</a></Container></main>;
  return <main className="bg-background">
    <section className="border-b border-border bg-surface"><Container className="py-12 sm:py-20">
      <p className="eyebrow text-primary">Texas Defined Network · {data.category} · {data.city}</p>
      <div className="mt-5 flex flex-wrap items-center gap-5">{data.logoUrl && <img src={data.logoUrl} alt={`${data.business_name} logo`} className="h-24 w-24 rounded-xl border border-border bg-background object-contain p-2"/>}<h1 className="font-display text-4xl sm:text-6xl">{data.business_name}</h1></div>
      <p className="mt-5 max-w-3xl text-lg leading-8 text-muted-foreground">{data.description}</p>
    </Container></section>
    <Container className="grid gap-10 py-12 lg:grid-cols-[minmax(0,2fr)_minmax(260px,1fr)]">
      <section className="space-y-8">
        {data.plan === "plus" && data.galleryUrls.length > 0 && <div className="grid gap-3 sm:grid-cols-2">{data.galleryUrls.map((url,index) => <img key={url} src={url} alt={`${data.business_name} photo ${index+1}`} className="aspect-[4/3] w-full rounded-xl object-cover"/>)}</div>}
        {data.plan === "plus" && data.services && <div><h2 className="font-display text-3xl">What we offer</h2><p className="mt-4 whitespace-pre-line leading-8 text-muted-foreground">{data.services}</p></div>}
        {data.plan === "plus" && data.faq && <div><h2 className="font-display text-3xl">Common questions</h2><p className="mt-4 whitespace-pre-line leading-8 text-muted-foreground">{data.faq}</p></div>}
        {data.plan === "plus" && data.offer && <div className="rounded-xl border border-border bg-surface p-5"><h2 className="font-display text-2xl">What's happening</h2><p className="mt-3 text-muted-foreground">{data.offer}</p></div>}
        <p className="text-sm text-muted-foreground">This profile contains information supplied by the organization and reviewed for publication by Texas Defined. Contact the organization to confirm current details.</p>
      </section>
      <aside className="self-start rounded-2xl border border-border bg-surface p-6">
        <h2 className="font-display text-2xl">Visit & contact</h2>
        <dl className="mt-5 space-y-4 text-sm">
          <div><dt className="font-semibold">Location</dt><dd className="mt-1 text-muted-foreground">{data.address || data.city + ", Texas"}</dd></div>
          {data.hours && <div><dt className="font-semibold">Hours</dt><dd className="mt-1 whitespace-pre-line text-muted-foreground">{data.hours}</dd></div>}
          {data.phone && <div><dt className="font-semibold">Phone</dt><dd className="mt-1"><a href={`tel:${data.phone.replace(/[^+\d]/g, "")}`} className="text-primary underline">{data.phone}</a></dd></div>}
        </dl>
        {data.plan === "plus" && <div className="mt-6 space-y-3">
          {safeExternal(data.website) && <a href={safeExternal(data.website)!} target="_blank" rel="noopener noreferrer sponsored" className="block rounded-full bg-primary px-5 py-3 text-center font-semibold text-primary-foreground">Official website ↗</a>}
          {safeExternal(data.social) && <a href={safeExternal(data.social)!} target="_blank" rel="noopener noreferrer sponsored" className="block rounded-full border border-border px-5 py-3 text-center font-semibold">Social profile ↗</a>}
        </div>}
      </aside>
    </Container>
  </main>;
}
