import { createFileRoute } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { Container } from "@/components/layout/Container";

type PublicProfile = {
  id: string; plan: "basic" | "plus"; business_name: string; category: string;
  city: string; description: string; address: string | null; phone: string | null;
  hours: string | null; website: string | null; social: string | null;
  services: string | null; faq: string | null; offer: string | null;
};
const getProfile = createServerFn({ method: "GET" })
  .inputValidator((input: { id: string }) => input)
  .handler(async ({ data }): Promise<PublicProfile | null> => {
    if (!/^[0-9a-f-]{36}$/i.test(data.id)) return null;
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: row, error } = await supabaseAdmin
      .from("texasdefined_network_applications")
      .select("id,plan,status,paid_entitlement_active,business_name,category,city,description,address,phone,hours,website,social,services,faq,offer")
      .eq("id", data.id)
      .eq("status", "published")
      .maybeSingle();
    if (error || !row) return null;
    const profile = row as unknown as PublicProfile & { paid_entitlement_active: boolean };
    const isPlus = profile.plan === "plus" && profile.paid_entitlement_active;
    return {
      id: profile.id, plan: isPlus ? "plus" : "basic",
      business_name: profile.business_name, category: profile.category, city: profile.city,
      description: profile.description, address: profile.address, phone: profile.phone, hours: profile.hours,
      website: isPlus ? profile.website : null,
      social: isPlus ? profile.social : null,
      services: isPlus ? profile.services : null,
      faq: isPlus ? profile.faq : null,
      offer: isPlus ? profile.offer : null,
    };
  });

export const Route = createFileRoute("/network/business/$id")({
  loader: ({ params }) => getProfile({ data: { id: params.id } }),
  head: ({ loaderData }) => ({
    meta: loaderData ? [
      { title: `${loaderData.business_name} | Texas Defined Network` },
      { name: "description", content: loaderData.description.slice(0, 155) || `Discover ${loaderData.business_name} in ${loaderData.city}, Texas.` },
      { name: "robots", content: "index,follow" },
    ] : [{ title: "Listing unavailable | Texas Defined" }, { name: "robots", content: "noindex,nofollow" }],
  }),
  component: NetworkBusinessPage,
});

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
      <h1 className="mt-4 font-display text-4xl sm:text-6xl">{data.business_name}</h1>
      <p className="mt-5 max-w-3xl text-lg leading-8 text-muted-foreground">{data.description}</p>
    </Container></section>
    <Container className="grid gap-10 py-12 lg:grid-cols-[minmax(0,2fr)_minmax(260px,1fr)]">
      <section className="space-y-8">
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
