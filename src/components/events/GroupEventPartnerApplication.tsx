import { useState, type FormEvent } from 'react';
import { Check, Handshake, ShieldCheck } from 'lucide-react';
import { submitGroupEventPartnerApplication } from '@/data/corporate-event-partners.functions';

const inputClass = 'mt-2 min-h-11 w-full border border-border bg-background px-3 py-2 text-sm text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary';

export function GroupEventPartnerApplication() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [error, setError] = useState('');
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const capacity = Number(data.get('publishedCapacity'));
    setStatus('sending');
    setError('');
    try {
      await submitGroupEventPartnerApplication({ data: {
        contactName: String(data.get('contactName') ?? ''),
        email: String(data.get('email') ?? ''),
        phone: String(data.get('phone') ?? ''),
        businessName: String(data.get('businessName') ?? ''),
        city: String(data.get('city') ?? ''),
        website: String(data.get('website') ?? ''),
        publishedCapacity: capacity >= 2 ? capacity : null,
        proposal: String(data.get('proposal') ?? ''),
        proposedPromoCode: String(data.get('proposedPromoCode') ?? ''),
        notes: String(data.get('notes') ?? ''),
        consentContact: (data.get('consentContact') === 'on') as true,
        companyAddress2: String(data.get('companyAddress2') ?? ''),
      } });
      setStatus('sent');
    } catch {
      setError('We could not save your application. Please review the fields, use an HTTPS website and try again.');
      setStatus('error');
    }
  }
  return <section id="list-your-business" className="scroll-mt-24 border-t border-border bg-surface">
    <div className="mx-auto max-w-[1200px] px-5 py-12 sm:px-7 sm:py-16">
      <div className="grid gap-10 lg:grid-cols-[.82fr_1.18fr]">
        <div>
          <div className="flex items-center gap-2 text-primary"><Handshake className="size-5" aria-hidden /><p className="eyebrow">For Texas venues and activity operators</p></div>
          <h2 className="mt-4 font-display text-4xl leading-tight">Put your group experience on the map.</h2>
          <p className="mt-5 leading-8 text-muted-foreground">Own an escape room, activity venue, restaurant, ranch, sports facility or event space? Tell us what group sizes you can handle and what you offer corporate customers.</p>
          <ul className="mt-6 space-y-3 text-sm leading-7 text-muted-foreground">
            <li>• Apply to be considered for a free editorial directory listing.</li>
            <li>• Suggest a custom company package, code or exclusive TD perk for commercial review.</li>
            <li>• We check business identity, terms and capacity before considering a published offer.</li>
          </ul>
          <div className="mt-6 flex items-start gap-2 border-t border-border pt-4 text-sm leading-6 text-muted-foreground"><ShieldCheck className="mt-1 size-5 shrink-0 text-primary" aria-hidden /><span>Application does not guarantee a listing, endorsement, lead volume or partnership. Sponsored placements are disclosed and do not change independent editorial rankings. No offer becomes active without separate approval.</span></div>
          <a className="mt-5 inline-flex min-h-11 items-center text-sm font-semibold text-primary underline underline-offset-4" href="/partner-with-us">Learn about TexasDefined advertising & partnerships ↗</a>
        </div>
        <div className="border border-border bg-background p-5 sm:p-7">
          {status === 'sent' ? <div role="status" className="py-12">
            <Check className="size-10 text-primary" aria-hidden />
            <h3 className="mt-4 font-display text-3xl">Your application was received.</h3>
            <p className="mt-3 leading-7 text-muted-foreground">TexasDefined has your application for internal review. No listing or promotion has been automatically activated. We may contact you for verification.</p>
          </div> :
          <form onSubmit={submit} className="grid gap-4 sm:grid-cols-2">
            <label className="block text-sm font-semibold">Contact name *<input required name="contactName" minLength={2} maxLength={120} autoComplete="name" className={inputClass} /></label>
            <label className="block text-sm font-semibold">Business email *<input required name="email" type="email" maxLength={320} autoComplete="email" className={inputClass} /></label>
            <label className="block text-sm font-semibold">Business name *<input required name="businessName" minLength={2} maxLength={180} autoComplete="organization" className={inputClass} /></label>
            <label className="block text-sm font-semibold">City *<input required name="city" minLength={2} maxLength={90} className={inputClass} /></label>
            <label className="block text-sm font-semibold sm:col-span-2">Official business website (HTTPS) *<input required type="url" name="website" placeholder="https://yourbusiness.com" pattern="https://.*" maxLength={500} className={inputClass} /></label>
            <label className="block text-sm font-semibold">Phone (optional)<input name="phone" type="tel" maxLength={50} autoComplete="tel" className={inputClass} /></label>
            <label className="block text-sm font-semibold">Maximum group size (if known)<input name="publishedCapacity" type="number" min={2} max={100000} placeholder="e.g. 60" className={inputClass} /></label>
            <label className="block text-sm font-semibold sm:col-span-2">Group packages / pricing (optional)<textarea name="proposal" rows={3} maxLength={2000} placeholder="Tell us about your group options and what is included." className={inputClass} /></label>
            <label className="block text-sm font-semibold sm:col-span-2">Proposed TexasDefined-only promo code (optional)<input name="proposedPromoCode" maxLength={60} placeholder="Not active until approved" className={inputClass} /></label>
            <label className="block text-sm font-semibold sm:col-span-2">Proposed offer terms (optional)<textarea name="notes" rows={3} maxLength={2000} placeholder="Discount, dates, exclusions, minimum group size and redemption instructions" className={inputClass} /></label>
            <div className="hidden" aria-hidden="true"><label>Office address 2<input tabIndex={-1} name="companyAddress2" autoComplete="off" /></label></div>
            <label className="flex items-start gap-2 text-sm leading-6 sm:col-span-2"><input type="checkbox" name="consentContact" required className="mt-1.5" /><span>I confirm I am authorized to submit this business information and consent to TexasDefined contacting me about this application. *</span></label>
            <div className="sm:col-span-2">
              {status === 'error' ? <p role="alert" className="text-sm text-destructive">{error}</p> : null}
              <button disabled={status === 'sending'} type="submit" className="mt-3 min-h-12 w-full bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground disabled:opacity-50">{status === 'sending' ? 'Submitting…' : 'Submit business for review'}</button>
              <p className="mt-3 text-xs leading-6 text-muted-foreground">Information is stored for internal review. Please see our <a href="/about#privacy-terms" className="underline">privacy terms</a>.</p>
            </div>
          </form>}
        </div>
      </div>
    </div>
  </section>;
}
