import { createLazyFileRoute } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent } from "react";
import { Container } from "@/components/layout/Container";
export const Route = createLazyFileRoute("/network/directory")({ component: NetworkDirectory });
function NetworkDirectory() {
  const profiles = Route.useLoaderData();
  const [query, setQuery] = useState("");
  useEffect(() => setQuery(new URLSearchParams(window.location.search).get("q") || ""), []);
  const results = profiles.filter(profile => [profile.business_name, profile.category, profile.city, profile.description]
    .some(value => String(value || "").toLowerCase().includes(query.trim().toLowerCase())));
  const submitSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    window.history.replaceState(null, "", "/network/directory?q=" + encodeURIComponent(query.trim()));
  };
  return <main>
    <section className="border-b border-border bg-surface"><Container className="py-16">
      <p className="eyebrow text-primary">One Texas. Everything Connected.</p>
      <h1 className="mt-3 font-display text-5xl">Explore the Texas Defined Network</h1>
      <p className="mt-5 max-w-2xl leading-8 text-muted-foreground">Meet the local businesses, museums, attractions and organizations that shape Texas communities.</p>
      <form role="search" onSubmit={submitSearch} className="mt-7 flex max-w-xl gap-3">
        <label htmlFor="network-query" className="sr-only">Search the network</label>
        <input id="network-query" value={query} onChange={event => setQuery(event.target.value)} placeholder="Search businesses, categories, cities..." className="min-w-0 flex-1 rounded-xl border border-border bg-background px-4 py-3"/>
        <button className="rounded-xl bg-primary px-5 py-3 font-semibold text-primary-foreground">Search</button>
      </form>
      <a href="/network/join" className="mt-6 inline-block rounded-full border border-primary px-6 py-3 font-semibold text-primary">Join our network</a>
    </Container></section>
    <Container className="py-12">
      {results.length === 0 ? <p className="text-muted-foreground">Verified network listings will appear here as they are approved.</p> :
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {results.map(profile => <article key={profile.slug} className="rounded-2xl border border-border bg-surface p-6">
          <p className="text-xs font-semibold uppercase tracking-wider text-primary">{profile.city} · {profile.category}</p>
          <h2 className="mt-3 font-display text-2xl">{profile.business_name}</h2>
          <p className="mt-3 line-clamp-3 text-sm leading-6 text-muted-foreground">{profile.description}</p>
          <a href={`/network/business/${profile.slug}`} className="mt-5 inline-block font-semibold text-primary underline">View profile →</a>
        </article>)}
      </div>}
    </Container>
  </main>;
}
