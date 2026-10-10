import { createFileRoute } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { Container } from "@/components/layout/Container";

const listProfiles = createServerFn({ method: "GET" }).handler(async () => {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  const { data, error } = await supabaseAdmin.from("texasdefined_network_applications")
    .select("id,business_name,category,city,description,plan,paid_entitlement_active")
    .eq("status", "published").order("business_name").limit(200);
  if (error) throw new Error("Network directory temporarily unavailable.");
  return data || [];
});

export const Route = createFileRoute("/network/directory")({
  loader: () => listProfiles(),
  head: () => ({
    meta: [
      { title: "Explore Texas Businesses & Organizations | Texas Defined Network" },
      { name: "description", content: "Discover Texas businesses, museums, organizations, and places through the Texas Defined Network." },
    ],
  }),
  component: NetworkDirectory,
});

function NetworkDirectory() {
  const profiles = Route.useLoaderData();
  return <main>
    <section className="border-b border-border bg-surface"><Container className="py-16">
      <p className="eyebrow text-primary">One Texas. Everything Connected.</p>
      <h1 className="mt-3 font-display text-5xl">Explore the Texas Defined Network</h1>
      <p className="mt-5 max-w-2xl leading-8 text-muted-foreground">Meet the local businesses, museums, attractions and organizations that shape Texas communities.</p>
      <a href="/network/join" className="mt-6 inline-block rounded-full bg-primary px-6 py-3 font-semibold text-primary-foreground">Join our network</a>
    </Container></section>
    <Container className="py-12">
      {profiles.length === 0 ? <p className="text-muted-foreground">Verified network listings will appear here as they are approved.</p> :
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {profiles.map(profile => <article key={profile.id} className="rounded-2xl border border-border bg-surface p-6">
          <p className="text-xs font-semibold uppercase tracking-wider text-primary">{profile.city} · {profile.category}</p>
          <h2 className="mt-3 font-display text-2xl">{profile.business_name}</h2>
          <p className="mt-3 line-clamp-3 text-sm leading-6 text-muted-foreground">{profile.description}</p>
          <a href={`/network/business/${profile.id}`} className="mt-5 inline-block font-semibold text-primary underline">View profile →</a>
        </article>)}
      </div>}
    </Container>
  </main>;
}
