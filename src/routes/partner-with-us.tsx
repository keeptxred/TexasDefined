import { createFileRoute } from '@tanstack/react-router';
import { type FormEvent, useState } from 'react';

import { texasDefinedBrand } from '@/brand/texasdefined';
import { DepartmentHero } from '@/components/editorial/DepartmentHero';
import { Container } from '@/components/layout/Container';
import { submitPartnerInquiry } from '@/data/partner-inquiry.functions';
import { buildMeta, canonicalLink } from '@/lib/seo';

const canonicalPath = '/partner-with-us';
const description = 'Partner with Texas Defined on useful, clearly disclosed Texas home, moving, travel and local-service resources while preserving editorial independence.';

export const Route = createFileRoute('/partner-with-us')({
  head: () => ({
    meta: buildMeta(texasDefinedBrand, { canonicalPath, title: 'Partner With Texas Defined', description }),
    links: [canonicalLink(texasDefinedBrand, canonicalPath)],
  }),
  component: PartnerWithUsPage,
});

const partnershipOptions = [
  ['insurance', 'Insurance'],
  ['mortgage', 'Mortgage / lending'],
  ['real-estate', 'Real estate'],
  ['moving', 'Moving services'],
  ['travel', 'Travel / tourism'],
  ['sponsorship', 'Sponsorship'],
  ['other', 'Other'],
] as const;

function PartnerWithUsPage() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus('sending');
    setErrorMessage('');
    const form = new FormData(event.currentTarget);
    try {
      await submitPartnerInquiry({ data: {
        contactName: String(form.get('contactName') || ''),
        email: String(form.get('email') || ''),
        company: String(form.get('company') || ''),
        website: String(form.get('website') || ''),
        partnershipType: String(form.get('partnershipType') || 'other') as typeof partnershipOptions[number][0],
        message: String(form.get('message') || ''),
        sourcePath: canonicalPath,
        addressLine2: String(form.get('addressLine2') || ''),
      } });
      event.currentTarget.reset();
      setStatus('sent');
    } catch (error) {
      console.error('Partner inquiry submission failed', error);
      setErrorMessage('Your inquiry could not be submitted. Please check the form and try again.');
      setStatus('error');
    }
  }

  return <>
    <DepartmentHero current="Partner With Us" eyebrow="Texas Defined partnerships" title="Useful partnerships, without blurring the editorial line" description={description} tone="surface" />
    <Container className="py-12 sm:py-16">
      <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <section aria-labelledby="partnership-standards-heading">
          <p className="eyebrow text-primary">Partnership standards</p>
          <h2 id="partnership-standards-heading" className="mt-3 font-display text-4xl">A fit for the reader comes first</h2>
          <div className="mt-6 space-y-5 text-sm leading-7 text-muted-foreground">
            <p>Texas Defined builds practical resources around Texas homes, property, moving, travel and local life. We are open to commercial relationships when they add a useful next step for readers.</p>
            <p>Paid relationships do not buy editorial coverage, favorable rankings or changes to factual conclusions. Commercial links are labeled and use appropriate sponsored-link attributes.</p>
            <p>We are especially interested in partners that serve Texans directly and can support statewide or clearly defined local audiences.</p>
          </div>
          <div className="mt-8 border-y border-border py-6">
            <h3 className="font-display text-2xl">Good partnership categories</h3>
            <ul className="mt-4 space-y-2 text-sm leading-6 text-muted-foreground">
              <li>Homeowners insurance and home services</li>
              <li>Mortgage and home-buying services</li>
              <li>Real estate and relocation</li>
              <li>Moving services</li>
              <li>Texas travel and tourism</li>
              <li>Clearly disclosed sponsorships of useful evergreen resources</li>
            </ul>
          </div>
        </section>

        <section aria-labelledby="partnership-form-heading" className="border-t border-border pt-7 lg:border-t-0 lg:pt-0">
          <p className="eyebrow text-primary">Start a conversation</p>
          <h2 id="partnership-form-heading" className="mt-3 font-display text-4xl">Tell us about your organization</h2>
          <p className="mt-4 text-sm leading-7 text-muted-foreground">This form is for business and sponsorship inquiries. Submissions are stored privately for Texas Defined to review.</p>

          {status === 'sent' ? <div className="mt-7 border-y border-border py-6" role="status"><p className="font-semibold">Inquiry received.</p><p className="mt-2 text-sm leading-6 text-muted-foreground">Thank you. Texas Defined can review the details you submitted and follow up using the email address provided.</p></div> : null}

          <form onSubmit={submit} className="mt-8 grid gap-5" noValidate>
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Your name" name="contactName" autoComplete="name" required />
              <Field label="Work email" name="email" type="email" autoComplete="email" required />
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Company or organization" name="company" autoComplete="organization" required />
              <Field label="Website" name="website" type="url" autoComplete="url" placeholder="https://" />
            </div>
            <label className="grid gap-2 text-sm font-semibold" htmlFor="partnershipType">Partnership type
              <select id="partnershipType" name="partnershipType" className="min-h-11 border border-border bg-background px-3 py-2 font-normal text-foreground" defaultValue="other" required>
                {partnershipOptions.map(([value, label]) => <option key={value} value={value}>{label}</option>)}
              </select>
            </label>
            <label className="grid gap-2 text-sm font-semibold" htmlFor="message">What would you like to explore?
              <textarea id="message" name="message" minLength={20} maxLength={5000} rows={7} required className="border border-border bg-background px-3 py-3 font-normal text-foreground" placeholder="Tell us what you offer, the Texas audience you serve and the type of partnership you have in mind." />
            </label>
            <div className="absolute -left-[10000px] top-auto h-px w-px overflow-hidden" aria-hidden="true">
              <label htmlFor="addressLine2">Address line 2</label><input id="addressLine2" name="addressLine2" tabIndex={-1} autoComplete="off" />
            </div>
            {status === 'error' ? <p className="text-sm font-semibold text-destructive" role="alert">{errorMessage}</p> : null}
            <button type="submit" disabled={status === 'sending'} className="min-h-11 justify-self-start border border-primary bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground disabled:opacity-60">
              {status === 'sending' ? 'Submitting…' : 'Submit partnership inquiry'}
            </button>
          </form>
        </section>
      </div>
    </Container>
  </>;
}

function Field({ label, name, type = 'text', autoComplete, placeholder, required = false }: { label: string; name: string; type?: string; autoComplete?: string; placeholder?: string; required?: boolean }) {
  return <label className="grid gap-2 text-sm font-semibold" htmlFor={name}>{label}<input id={name} name={name} type={type} autoComplete={autoComplete} placeholder={placeholder} required={required} className="min-h-11 border border-border bg-background px-3 py-2 font-normal text-foreground" /></label>;
}
