import { type FormEvent, useState } from "react";

import { Container } from "@/components/layout/Container";
import { submitFishingGuideListing } from "@/data/fishing/guide-onboarding.functions";
import type { FishingGuideOnboardingOptions } from "@/data/fishing/guide-onboarding.server";

export function FishingGuideOnboardingForm({ pageData }: { pageData: FishingGuideOnboardingOptions }) {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    setErrorMessage("");
    const form = new FormData(event.currentTarget);
    try {
      await submitFishingGuideListing({ data: {
        intent: String(form.get("intent") || "new-listing") as "new-listing" | "claim-listing" | "update-listing" | "remove-listing",
        contactName: String(form.get("contactName") || ""),
        email: String(form.get("email") || ""),
        businessName: String(form.get("businessName") || ""),
        guideName: String(form.get("guideName") || ""),
        website: String(form.get("website") || ""),
        phone: String(form.get("phone") || ""),
        bookingUrl: String(form.get("bookingUrl") || ""),
        lakeSlugs: form.getAll("lakeSlugs").map(String),
        speciesSlugs: form.getAll("speciesSlugs").map(String),
        serviceRegions: String(form.get("serviceRegions") || ""),
        boatDescription: String(form.get("boatDescription") || ""),
        maxGuests: String(form.get("maxGuests") || ""),
        startingPrice: String(form.get("startingPrice") || ""),
        sourceUrls: String(form.get("sourceUrls") || ""),
        notes: String(form.get("notes") || ""),
        authorized: form.get("authorized") === "yes",
        addressLine2: String(form.get("addressLine2") || ""),
      } });
      event.currentTarget.reset();
      setStatus("sent");
    } catch (error) {
      console.error("Fishing guide listing submission failed", error);
      setErrorMessage("The request could not be submitted. Check the required fields and source URLs, then try again.");
      setStatus("error");
    }
  }

  return <>
    <header className="border-b border-border bg-ink text-ink-foreground">
      <Container className="py-14 sm:py-20">
        <nav aria-label="Breadcrumb" className="text-[0.72rem] uppercase tracking-[0.14em] text-ink-foreground/60"><a href="/">Front page</a> · <a href="/fishing">Fishing</a> · <a href="/fishing/guides">Fishing guides</a> · Submit or update</nav>
        <p className="mt-10 eyebrow text-ink-foreground/65">Verified guide directory</p>
        <h1 className="mt-4 max-w-5xl font-display text-5xl leading-[0.96] sm:text-7xl">Submit, claim or correct a Texas fishing-guide listing.</h1>
        <p className="mt-6 max-w-3xl text-lg leading-8 text-ink-foreground/80">This is the editorial verification path for the fishing-guide directory. It is not a sponsorship purchase, and submitting a form does not automatically publish a listing.</p>
      </Container>
    </header>

    <Container className="py-12 sm:py-16">
      <section className="grid gap-6 border-y border-border py-8 lg:grid-cols-3" aria-label="Listing standards">
        <Policy title="Verification first" body={pageData.policy.verification} />
        <Policy title="Editorial stays independent" body={pageData.policy.editorial} />
        <Policy title="Source-backed details" body={pageData.policy.accuracy} />
      </section>

      <div className="mt-12 grid gap-12 lg:grid-cols-[0.72fr_1.28fr] lg:gap-16">
        <aside>
          <p className="eyebrow text-primary">What TexasDefined verifies</p>
          <h2 className="mt-3 font-display text-4xl">Enough evidence to publish a useful listing.</h2>
          <div className="mt-6 space-y-4 text-sm leading-7 text-muted-foreground">
            <p>Provide the business's official website and any other source URLs that support the facts you want listed. TexasDefined can verify the business identity, guide identity, lakes served, target species and public contact or booking details before publication.</p>
            <p>Prices, boat details, capacity and booking links are optional. When submitted, they remain unpublished until supported by a source TexasDefined can verify.</p>
            <p>For lakes not yet represented by a complete TexasDefined lake guide, use the “other service regions” field. The current checkbox list intentionally contains only the complete-lake collection.</p>
          </div>
          <div className="mt-8 border-t border-border pt-6">
            <h3 className="font-display text-2xl">Want advertising instead?</h3>
            <p className="mt-3 text-sm leading-7 text-muted-foreground">Sponsorship is a separate commercial workflow and cannot speed up verification or change editorial rank.</p>
            <a href="/partner-with-us" className="mt-4 inline-block border-b border-primary pb-1 text-sm font-semibold text-primary">Ask about sponsorship →</a>
          </div>
        </aside>

        <section aria-labelledby="guide-listing-form-heading" className="border-t border-border pt-7 lg:border-t-0 lg:pt-0">
          <p className="eyebrow text-primary">Listing request</p>
          <h2 id="guide-listing-form-heading" className="mt-3 font-display text-4xl">Tell us what should be verified.</h2>
          {status === "sent" ? <div className="mt-7 border-y border-border py-6" role="status"><p className="font-semibold">Guide listing request received.</p><p className="mt-2 text-sm leading-6 text-muted-foreground">The submission is stored privately for verification. It does not create a public listing automatically.</p></div> : null}

          <form onSubmit={submit} className="mt-8 grid gap-7" noValidate>
            <label className="grid gap-2 text-sm font-semibold" htmlFor="intent">Request type
              <select id="intent" name="intent" defaultValue="new-listing" required className="min-h-11 border border-border bg-background px-3 py-2 font-normal">
                <option value="new-listing">Submit a new listing</option>
                <option value="claim-listing">Claim an existing listing</option>
                <option value="update-listing">Correct or update a listing</option>
                <option value="remove-listing">Request listing removal</option>
              </select>
            </label>

            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Your name" name="contactName" autoComplete="name" required />
              <Field label="Contact email" name="email" type="email" autoComplete="email" required />
              <Field label="Guide business name" name="businessName" autoComplete="organization" required />
              <Field label="Guide / captain name" name="guideName" autoComplete="name" />
              <Field label="Official website" name="website" type="url" placeholder="https://" />
              <Field label="Phone" name="phone" type="tel" autoComplete="tel" />
              <Field label="Booking URL" name="bookingUrl" type="url" placeholder="https://" />
              <Field label="Maximum guests" name="maxGuests" inputMode="numeric" />
            </div>

            <fieldset>
              <legend className="text-sm font-semibold">Complete TexasDefined lakes served</legend>
              <p className="mt-2 text-xs leading-5 text-muted-foreground">Select only lakes the business actually serves. These relationships still require verification.</p>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {pageData.lakes.map((lake) => <label key={lake.slug} className="flex items-start gap-3 border-t border-border pt-3 text-sm"><input type="checkbox" name="lakeSlugs" value={lake.slug} className="mt-1" /><span><strong>{lake.name}</strong><span className="block text-xs text-muted-foreground">{titleCase(lake.region)}</span></span></label>)}
              </div>
            </fieldset>

            <fieldset>
              <legend className="text-sm font-semibold">Target species / fishing groups</legend>
              <p className="mt-2 text-xs leading-5 text-muted-foreground">Choose species explicitly offered by the guide service; do not select fish merely because they occur in a lake.</p>
              <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {pageData.species.map((fish) => <label key={fish.slug} className="flex items-start gap-2 border-t border-border pt-3 text-sm"><input type="checkbox" name="speciesSlugs" value={fish.slug} className="mt-1" /><span>{fish.name}<span className="block text-[0.68rem] uppercase tracking-[0.1em] text-muted-foreground">{fish.taxonKind === "group" ? "Fishing group" : "Species"}</span></span></label>)}
              </div>
            </fieldset>

            <label className="grid gap-2 text-sm font-semibold" htmlFor="serviceRegions">Other lakes or service regions
              <textarea id="serviceRegions" name="serviceRegions" maxLength={1000} rows={3} className="border border-border bg-background px-3 py-3 font-normal" placeholder="Example: Upper Texas Coast; additional lakes not yet in the complete-lake directory" />
            </label>
            <label className="grid gap-2 text-sm font-semibold" htmlFor="boatDescription">Boat description <span className="font-normal text-muted-foreground">(optional; must be verifiable)</span>
              <textarea id="boatDescription" name="boatDescription" maxLength={1000} rows={3} className="border border-border bg-background px-3 py-3 font-normal" />
            </label>
            <Field label="Starting price (optional; submitted value is not automatically published)" name="startingPrice" placeholder="Example: $450 half day" />
            <label className="grid gap-2 text-sm font-semibold" htmlFor="sourceUrls">Verification source URLs
              <textarea id="sourceUrls" name="sourceUrls" minLength={8} maxLength={3000} rows={4} required className="border border-border bg-background px-3 py-3 font-normal" placeholder="Paste the official website and supporting source URLs, separated by spaces or new lines." />
              <span className="text-xs font-normal leading-5 text-muted-foreground">At least one http/https URL is required. TexasDefined uses these sources to verify submitted facts.</span>
            </label>
            <label className="grid gap-2 text-sm font-semibold" htmlFor="notes">Notes or correction details
              <textarea id="notes" name="notes" maxLength={3000} rows={5} className="border border-border bg-background px-3 py-3 font-normal" />
            </label>

            <label className="flex items-start gap-3 border-y border-border py-5 text-sm leading-6"><input type="checkbox" name="authorized" value="yes" required className="mt-1" /><span>I am authorized to submit this listing request for the business, or I am submitting a factual correction/removal request supported by the source URLs above. I understand that submission does not guarantee publication.</span></label>
            <div className="absolute -left-[10000px] top-auto h-px w-px overflow-hidden" aria-hidden="true"><label htmlFor="addressLine2">Address line 2</label><input id="addressLine2" name="addressLine2" tabIndex={-1} autoComplete="off" /></div>
            {status === "error" ? <p className="text-sm font-semibold text-destructive" role="alert">{errorMessage}</p> : null}
            <button type="submit" disabled={status === "sending"} className="min-h-11 justify-self-start border border-primary bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground disabled:opacity-60">{status === "sending" ? "Submitting…" : "Submit for verification"}</button>
          </form>
        </section>
      </div>
    </Container>
  </>;
}

function Policy({ title, body }: { title: string; body: string }) { return <article><h2 className="font-display text-2xl">{title}</h2><p className="mt-3 text-sm leading-7 text-muted-foreground">{body}</p></article>; }
function Field({ label, name, type = "text", autoComplete, placeholder, required = false, inputMode }: { label: string; name: string; type?: string; autoComplete?: string; placeholder?: string; required?: boolean; inputMode?: "numeric" }) { return <label className="grid gap-2 text-sm font-semibold" htmlFor={name}>{label}<input id={name} name={name} type={type} autoComplete={autoComplete} placeholder={placeholder} required={required} inputMode={inputMode} className="min-h-11 border border-border bg-background px-3 py-2 font-normal" /></label>; }
function titleCase(value: string) { return value.replaceAll("-", " ").replace(/\b\w/g, (character) => character.toUpperCase()); }
