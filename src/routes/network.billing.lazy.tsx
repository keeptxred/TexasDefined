import "../network.css";
import { createLazyFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { Container } from "@/components/layout/Container";
import { NETWORK_PLUS_RECURRING_DISCLOSURE, NETWORK_TERMS_VERSION } from "@/data/network-terms";
import { supabase } from "@/integrations/supabase/client";

export const Route = createLazyFileRoute("/network/billing")({ component: NetworkBilling });

type Membership = { id: string; name: string; status: string; paid: boolean; manageable: boolean; checkoutEligible: boolean };

function NetworkBilling() {
  const {ownerPortalOpen}=Route.useLoaderData();
  const [email, setEmail] = useState("");
  const [signedIn, setSignedIn] = useState(false);
  const [memberships, setMemberships] = useState<Membership[]>([]);
  const [checkoutAvailable, setCheckoutAvailable] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [termsAccepted,setTermsAccepted]=useState<Record<string,boolean>>({});
  const [recurringAccepted,setRecurringAccepted]=useState<Record<string,boolean>>({});
  // A previous owner's slow membership response must never overwrite the new
  // owner or reappear after sign-out. Every Auth transition invalidates it.
  const refreshSequence = useRef(0);
  async function refresh() {
    const requestSequence = ++refreshSequence.current;
    const { data: { session } } = await supabase.auth.getSession();
    if (requestSequence !== refreshSequence.current) return;
    if (!session) { setSignedIn(false); setMemberships([]); setCheckoutAvailable(false); return; }
    setSignedIn(true);
    setMemberships([]); setCheckoutAvailable(false);
    const response = await fetch("/api/public/network-billing", { headers: { authorization: "Bearer " + session.access_token } });
    if (requestSequence !== refreshSequence.current) return;
    if (!response.ok) throw new Error("Could not load your network memberships.");
    const result = await response.json();
    if (requestSequence !== refreshSequence.current) return;
    setMemberships(Array.isArray(result.memberships) ? result.memberships : []);
    setCheckoutAvailable(result.checkoutAvailable === true);
  }
  useEffect(() => {
    let mounted=true;
    const load=()=>void refresh().catch(()=>{
      if(mounted)setError("Unable to load memberships.");
    });
    load();
    const { data: { subscription } } = supabase.auth.onAuthStateChange(() => {
      // Clear owner-specific data synchronously, before beginning any next read.
      refreshSequence.current++;
      setSignedIn(false); setMemberships([]); setCheckoutAvailable(false);
      setEmail(""); setError(""); setNotice("");
      load();
    });
    return () => {
      mounted=false;
      refreshSequence.current++;
      subscription.unsubscribe();
    };
  }, []);
  async function signIn(event: FormEvent) {
    event.preventDefault(); if(!ownerPortalOpen){setError("Owner email sign-in is not yet active.");return} setBusy(true); setError(""); setNotice("");
    const { error: authError } = await supabase.auth.signInWithOtp({email, options: {emailRedirectTo: window.location.origin + "/network/billing"}});
    setBusy(false);
    if (authError) setError(authError.message);
    else setNotice("Check your email for your secure sign-in link.");
  }
  async function startCheckout(id: string) {
    setBusy(true); setError("");
    try {
      const {data:{session}}=await supabase.auth.getSession();
      if (!session?.user?.email) throw new Error("Sign in with your verified application email.");
      const response=await fetch("/api/public/network-checkout",{
        method:"POST",
        headers:{"authorization":"Bearer "+session.access_token,"content-type":"application/json"},
        body:JSON.stringify({applicationId:id,email:session.user.email,termsVersion:NETWORK_TERMS_VERSION,termsAccepted:termsAccepted[id]===true,recurringBillingAccepted:recurringAccepted[id]===true}),
      });
      const result=await response.json();
      if(!response.ok||!result.url)throw new Error(result.error||"Checkout is unavailable.");
      window.location.assign(result.url);
    }catch(cause){setError(cause instanceof Error?cause.message:"Checkout is unavailable.");}
    finally{setBusy(false);}
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
  return <div><Container className="py-14 sm:py-20">
    <div className="mx-auto max-w-3xl">
      <p className="eyebrow text-primary">Texas Defined Network</p>
      <h1 className="mt-3 font-display text-4xl sm:text-5xl">Manage your membership</h1>
      <p className="mt-5 leading-8 text-muted-foreground">Sign in with the email used for your listing. After separate editorial approval and verified owner provisioning, eligible Plus members can start checkout when Network billing is launched. Existing subscriptions are managed securely through Stripe.</p>
      {!ownerPortalOpen&&!signedIn&&<p role="status" className="mt-6 rounded-xl border border-amber-300 bg-amber-50 p-4 text-sm font-semibold text-amber-950">Owner email sign-in is not available before Network launch. Existing subscriber assistance is available from admin@texasdefined.com.</p>}
      {!signedIn ? <form onSubmit={signIn} className="mt-8 rounded-2xl border border-border bg-surface p-6">
        <label htmlFor="billing-email" className="block text-sm font-semibold">Your business contact email</label>
        <input id="billing-email" type="email" required value={email} onChange={event => setEmail(event.target.value)} className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-3"/>
        <button disabled={!ownerPortalOpen||busy} className="mt-4 rounded-full bg-primary px-6 py-3 font-semibold text-primary-foreground">Email me a secure sign-in link</button>
      </form> : <section className="mt-9 space-y-4">
        <div className="flex items-center justify-between"><h2 className="font-display text-2xl">Your listings</h2><button onClick={() => void supabase.auth.signOut()} className="text-sm text-primary underline">Sign out</button></div>
        {memberships.length===0 && <p className="rounded-xl bg-surface p-6 text-muted-foreground">No Plus memberships are associated with this email address.</p>}
        {memberships.map(item => <div key={item.id} className="rounded-2xl border border-border bg-surface p-6">
          <h3 className="font-display text-2xl">{item.name}</h3>
          <p className="mt-2 text-sm text-muted-foreground">Listing status: {item.status} · Subscription: {item.paid ? "Active" : "Not active"}</p>
          {item.checkoutEligible && <div className="mt-5 space-y-3 border-t border-border pt-4">
            <label className="flex items-start gap-3 text-sm leading-6"><input type="checkbox" checked={termsAccepted[item.id]===true} onChange={e=>setTermsAccepted(old=>({...old,[item.id]:e.target.checked}))} className="mt-1 h-5 w-5"/><span>I agree to the <a href="/network/terms" target="_blank" rel="noreferrer" className="font-semibold text-primary underline">Business Network Membership Terms</a> (version {NETWORK_TERMS_VERSION}), including my responsibility for customer-supplied facts/images and the possibility that published content may be indexed or surfaced by search and discovery services.</span></label>
            <label className="flex items-start gap-3 text-sm leading-6"><input type="checkbox" checked={recurringAccepted[item.id]===true} onChange={e=>setRecurringAccepted(old=>({...old,[item.id]:e.target.checked}))} className="mt-1 h-5 w-5"/><span><strong>Recurring billing authorization:</strong> {NETWORK_PLUS_RECURRING_DISCLOSURE}</span></label>
            <button type="button" disabled={busy||!checkoutAvailable||termsAccepted[item.id]!==true||recurringAccepted[item.id]!==true} onClick={() => void startCheckout(item.id)} className="rounded-full bg-primary px-6 py-3 font-semibold text-primary-foreground disabled:opacity-40">{checkoutAvailable ? "Agree & start secure Plus checkout" : "Checkout not active yet"}</button>
          </div>}
          {item.manageable && <button type="button" disabled={busy} onClick={() => void portal(item.id)} className="mt-4 rounded-full border border-primary px-6 py-3 font-semibold text-primary disabled:opacity-40">Manage subscription</button>}
        </div>)}
      </section>}
      {notice && <p role="status" className="mt-5 rounded-xl bg-surface p-4">{notice}</p>}
      {error && <p role="alert" className="mt-5 rounded-xl bg-surface p-4 text-red-700">{error}</p>}
      <p className="mt-8 text-sm leading-7 text-muted-foreground">If your business access was suspended, you cannot sign in, or you need to cancel or correct an existing subscription, contact <a className="font-semibold text-primary underline" href="mailto:admin@texasdefined.com?subject=TexasDefined%20Network%20subscription%20support">admin@texasdefined.com</a>. This support option remains available even when the owner portal or checkout is closed.</p>
      <a href="/network/join" className="mt-9 inline-block text-primary underline">Return to Network membership</a>
    </div>
  </Container></div>;
}
