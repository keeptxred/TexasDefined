import { FormEvent, useState } from "react";
import { Link } from "@tanstack/react-router";

import { Container } from "@/components/layout/Container";
import { submitFishingReport } from "@/data/fishing/report-onboarding.functions";
import type { FishingReportOnboardingOptions } from "@/data/fishing/report-onboarding.server";

export function FishingReportOnboardingForm({ pageData }: { pageData: FishingReportOnboardingOptions }) {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const values = new FormData(form);
    setStatus("sending"); setMessage("");
    try {
      await submitFishingReport({ data: {
        intent: values.get("intent") === "request-contributor-approval" ? "request-contributor-approval" : "submit-report",
        contactName: String(values.get("contactName") ?? ""),
        email: String(values.get("email") ?? ""),
        businessName: String(values.get("businessName") ?? ""),
        guideListingUrl: String(values.get("guideListingUrl") ?? ""),
        lakeSlug: String(values.get("lakeSlug") ?? ""),
        speciesSlugs: values.getAll("speciesSlugs").map(String),
        reportDate: String(values.get("reportDate") ?? ""),
        title: String(values.get("title") ?? ""),
        summary: String(values.get("summary") ?? ""),
        conditionsNotes: String(values.get("conditionsNotes") ?? ""),
        techniqueNotes: String(values.get("techniqueNotes") ?? ""),
        sourceUrls: String(values.get("sourceUrls") ?? ""),
        authorized: values.get("authorized") === "on",
        accuracyAttested: values.get("accuracyAttested") === "on",
        addressLine2: String(values.get("addressLine2") ?? ""),
      } });
      form.reset(); setStatus("success"); setMessage("Submission received for verification. It is not public and will not publish automatically.");
    } catch (error) {
      setStatus("error"); setMessage(error instanceof Error ? error.message : "Submission failed. Please review the form and try again.");
    }
  }

  return <>
    <Container className="pt-8 sm:pt-10"><nav aria-label="Breadcrumb" className="text-[0.72rem] uppercase tracking-[0.14em] text-muted-foreground"><ol className="flex flex-wrap items-center gap-2"><li><Link to="/">Front page</Link></li><li aria-hidden>·</li><li><Link to="/fishing">Fishing</Link></li><li aria-hidden>·</li><li><Link to="/fishing/reports">Reports</Link></li><li aria-hidden>·</li><li aria-current="page">Submit</li></ol></nav></Container>
    <header className="mt-5 border-y border-border bg-ink text-ink-foreground"><Container className="py-12 sm:py-16"><p className="eyebrow text-ink-foreground/65">Fishing report contributor intake</p><h1 className="mt-4 max-w-4xl font-display text-5xl leading-[0.96] sm:text-7xl">Submit a dated fishing report for verification.</h1><p className="mt-6 max-w-3xl text-lg leading-8 text-ink-foreground/80">This is an editorial intake form, not instant publishing. TexasDefined verifies the contributor, source trail, lake/species relationships and report date before a report can appear publicly.</p></Container></header>
    <Container className="py-12 sm:py-16">
      <section className="grid gap-5 border-y border-border py-6 md:grid-cols-3">{Object.entries(pageData.policy).map(([key, value]) => <div key={key}><p className="eyebrow text-primary">{key}</p><p className="mt-2 text-sm leading-6 text-muted-foreground">{value}</p></div>)}</section>
      <form onSubmit={onSubmit} className="mt-10 max-w-4xl space-y-8">
        <div className="hidden" aria-hidden="true"><label>Address line 2<input name="addressLine2" tabIndex={-1} autoComplete="off" /></label></div>
        <fieldset className="grid gap-4 sm:grid-cols-2"><legend className="mb-3 font-display text-2xl">What are you submitting?</legend><label className="border border-border p-4"><input type="radio" name="intent" value="submit-report" defaultChecked /> <span className="ml-2 font-semibold">Dated fishing report</span></label><label className="border border-border p-4"><input type="radio" name="intent" value="request-contributor-approval" /> <span className="ml-2 font-semibold">Contributor approval request</span></label></fieldset>
        <div className="grid gap-5 sm:grid-cols-2"><Field label="Contact name" name="contactName" required /><Field label="Email" name="email" type="email" required /><Field label="Guide / business name" name="businessName" required /><Field label="Existing guide listing or official website URL" name="guideListingUrl" type="url" /></div>
        <div className="grid gap-5 sm:grid-cols-2"><label className="text-sm font-semibold">Lake<select name="lakeSlug" required className="mt-2 block w-full border border-border bg-background p-3"><option value="">Choose a complete lake guide</option>{pageData.lakes.map((lake) => <option key={lake.slug} value={lake.slug}>{lake.name}</option>)}</select></label><Field label="Report date" name="reportDate" type="date" required /></div>
        <fieldset><legend className="text-sm font-semibold">Species covered</legend><div className="mt-3 grid gap-2 sm:grid-cols-2 md:grid-cols-3">{pageData.species.map((fish) => <label key={fish.slug} className="border border-border p-3 text-sm"><input type="checkbox" name="speciesSlugs" value={fish.slug} /> <span className="ml-2">{fish.name}</span></label>)}</div></fieldset>
        <Field label="Report title" name="title" required />
        <Area label="Report summary" name="summary" required hint="At least 80 characters. Describe what you directly observed and when." />
        <Area label="Conditions notes (optional)" name="conditionsNotes" hint="Water temperature, clarity, level or weather observations are treated as unverified until reviewed and remain tied to the report date." />
        <Area label="Technique / presentation notes (optional)" name="techniqueNotes" hint="Describe methods used without unsupported guarantees or promotional ranking claims." />
        <Area label="Verification source URLs" name="sourceUrls" required hint="Provide 1–12 public URLs separated by spaces. Use sources that establish contributor identity and/or support the submitted report." />
        <div className="space-y-3 border-y border-border py-5 text-sm"><label className="block"><input type="checkbox" name="authorized" required /> <span className="ml-2">I am authorized to submit this report or contributor request on behalf of the named guide/business.</span></label><label className="block"><input type="checkbox" name="accuracyAttested" required /> <span className="ml-2">I attest that the dated observations above are accurate to the best of my knowledge and are not fabricated, backdated or purchased editorial claims.</span></label></div>
        <button disabled={status === "sending"} className="bg-foreground px-6 py-3 text-sm font-semibold text-background disabled:opacity-50">{status === "sending" ? "Submitting…" : "Submit for verification"}</button>
        {message && <p role="status" className={`text-sm ${status === "error" ? "text-destructive" : "text-muted-foreground"}`}>{message}</p>}
      </form>
      <aside className="mt-14 border-t border-border pt-8"><p className="eyebrow text-primary">Need a guide listing first?</p><p className="mt-3 max-w-3xl text-sm leading-7 text-muted-foreground">Guide listing verification is a separate workflow. A paid sponsorship inquiry never substitutes for contributor verification.</p><div className="mt-4 flex flex-wrap gap-5 text-sm font-semibold"><Link to="/fishing/guides/submit" className="border-b border-primary text-primary">Submit or claim a guide listing →</Link><Link to="/partner-with-us" className="border-b border-border">Sponsorship inquiries →</Link></div></aside>
    </Container>
  </>;
}

function Field({ label, name, type = "text", required = false }: { label: string; name: string; type?: string; required?: boolean }) { return <label className="text-sm font-semibold">{label}<input name={name} type={type} required={required} className="mt-2 block w-full border border-border bg-background p-3 font-normal" /></label>; }
function Area({ label, name, required = false, hint }: { label: string; name: string; required?: boolean; hint?: string }) { return <label className="block text-sm font-semibold">{label}<textarea name={name} required={required} rows={5} className="mt-2 block w-full border border-border bg-background p-3 font-normal" />{hint && <span className="mt-2 block text-xs font-normal leading-5 text-muted-foreground">{hint}</span>}</label>; }
