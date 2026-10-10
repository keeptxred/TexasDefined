import { createLazyFileRoute } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent } from "react";
import { Container } from "@/components/layout/Container";
import { supabase } from "@/integrations/supabase/client";

export const Route = createLazyFileRoute("/network/billing")({ component: NetworkBilling });

type Membership = { id: string; name: string; status: string; paid: boolean; manageable: boolean };

function NetworkBilling() {
  const [email, setEmail] = useState("");
  const [signedIn, setSignedIn] = useState(false);
  const [memberships, setMemberships] = useState<Membership[]>([]);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  async function refresh() {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) { setSignedIn(false); setMemberships([]); return; }
    setSignedIn(true);
    const response = await fetch("/api/public/network-billing", { headers: { authorization: "Bearer " + session.access_token } });
    if (!response.ok) throw new Error("Could not load your network memberships.");
    const result = await response.json();
    setMemberships(result.memberships || []);
  }
  useEffect(() => {
    void refresh().catch(() => setError("Unable to load memberships."));
    const { data: { subscription } } = supabase.auth.onAuthStateChange(() => { void refresh().catch(() => setError("Unable to load memberships.")); });
    return () => subscription.unsubscribe();
  }, []);
  async function signIn(event: FormEvent) {
    event.preventDefault(); setBusy(true); setError(""); setNotice("");
    const { error: authError } = await supabase.auth.signInWithOtp({email, options: {emailRedirectTo: window.location.origin + "/network/billing"}});
    setBusy(false);
    if (authError) setError(authError.message);
    else setNotice("Check your email for your secure sign-in link.");
  }
  async function portal(id: string) {
    setBusy(true); setError("");
    try {
      const {data:{session}} = await supabase.auth.getSession();
      if (!session) throw new Error("Sign in again to manage billing.");
      const response = await fetch("/api/public/network-billing", {
        method:"POST",
        headers:{"authorization":"Bearer " + session.access_token,"content-type":"application/json"},
        body:JSON.stringify({applicationId:id}),
      });
      const result = await response.json();
      if (!response.ok || !result.url) throw new Error(result.error || "Billing portal unavailable.");
      window.location.assign(result.url);
    } catch (cause) { setError(cause instanceof Error ? cause.message : "Billing portal unavailable."); }
    finally { setBusy(false); }
  }
  return <main><Container className="py-14 sm:py-20">
    <div className="mx-auto max-w-3xl">
      <p className="eyebrow text-primary">Texas Defined Network</p>
      <h1 className="mt-3 font-display text-4xl sm:text-5xl">Manage your membership</h1>
      <p className="mt-5 leading-8 text-muted-foreground">Sign in with the email used for your listing to review your Plus memberships and manage payment methods, invoices or cancellation through Stripe's secure portal.</p>
      {!signedIn ? <form onSubmit={signIn} className="mt-8 rounded-2xl border border-border bg-surface p-6">
        <label htmlFor="billing-email" className="block text-sm font-semibold">Your business contact email</label>
        <input id="billing-email" type="email" required value={email} onChange={event => setEmail(event.target.value)} className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-3"/>
        <button disabled={busy} className="mt-4 rounded-full bg-primary px-6 py-3 font-semibold text-primary-foreground">Email me a secure sign-in link</button>
      </form> : <section className="mt-9 space-y-4">
        <div className="flex items-center justify-between"><h2 className="font-display text-2xl">Your listings</h2><button onClick={() => void supabase.auth.signOut()} className="text-sm text-primary underline">Sign out</button></div>
        {memberships.length===0 && <p className="rounded-xl bg-surface p-6 text-muted-foreground">No Plus memberships are associated with this email address.</p>}
        {memberships.map(item => <div key={item.id} className="rounded-2xl border border-border bg-surface p-6">
          <h3 className="font-display text-2xl">{item.name}</h3>
          <p className="mt-2 text-sm text-muted-foreground">Listing status: {item.status} · Subscription: {item.paid ? "Active" : "Not active"}</p>
          <button type="button" disabled={busy||!item.manageable} onClick={() => void portal(item.id)} className="mt-4 rounded-full bg-primary px-6 py-3 font-semibold text-primary-foreground disabled:opacity-40">Manage subscription</button>
        </div>)}
      </section>}
      {notice && <p role="status" className="mt-5 rounded-xl bg-surface p-4">{notice}</p>}
      {error && <p role="alert" className="mt-5 rounded-xl bg-surface p-4 text-red-700">{error}</p>}
      <a href="/network/join" className="mt-9 inline-block text-primary underline">Return to Network membership</a>
    </div>
  </Container></main>;
}
