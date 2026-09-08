import { createLazyFileRoute } from '@tanstack/react-router';
import { type FormEvent, useState } from 'react';

import { DepartmentHero } from '@/components/editorial/DepartmentHero';
import { Container } from '@/components/layout/Container';
import { submitPartnerInquiry } from '@/data/partner-inquiry.functions';

const description = 'Partner with Texas Defined on useful, clearly disclosed Texas home, moving, travel, sports-travel, Texas-brand and local-service resources while preserving editorial independence.';

export const Route = createLazyFileRoute('/partner-with-us')({ component: PartnerWithUsPage });

const partnershipOptions = [
  ['insurance', 'Insurance'],
  ['mortgage', 'Mortgage / lending'],
  ['real-estate', 'Real estate'],
  ['moving', 'Moving services'],
  ['travel', 'Travel / tourism'],
  ['sports-travel', 'Sports travel / local visitor business'],
  ['brand-retail', 'Texas brand / grocery / retail'],
  ['sponsorship', 'Sponsorship'],
  ['other', 'Other'],
] as const;

const sportsLaunchPackages = [
  {
    name: 'Single Venue',
    price: '$49/month',
    detail: 'One TexasDefined sports-venue guide. Best for a restaurant, independent hotel, parking, tour or transportation business serving one venue.',
  },
  {
    name: 'Metro Sports Pack',
    price: '$149/month',
    detail: 'Up to five sports-venue guides in one metro or market. Best for hotels, restaurant groups, attractions and transportation companies.',
  },
  {
    name: 'Texas Sports Network',
    price: '$299/month',
    detail: 'The statewide sports directory plus up to ten venue guides for a Texas business serving multiple sports markets.',
  },
  {
    name: 'Founding Statewide Partner',
    price: '$499/month',
    detail: 'The statewide sports directory plus up to twenty venue guides for a genuinely statewide travel or visitor-services brand.',
  },
] as const;

function PartnerWithUsPage() {
  const search = Route.useSearch();
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
        sourcePath: search.sourcePath,
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
            <p>Texas Defined builds practical resources around Texas homes, property, moving, travel, sports destinations, Texas brands and local life. We are open to commercial relationships when they add a useful next step for readers.</p>
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
              <li>Texas-founded or Texas-serving grocery, retail, food and consumer brands</li>
              <li>Hotels, restaurants, attractions, transportation and visitor services near major sports destinations</li>
              <li>Clearly disclosed sponsorships of useful evergreen resources</li>
            </ul>
          </div>

          <div className="mt-8">
            <p className="eyebrow text-primary">Founding sports rates</p>
            <h3 className="mt-2 font-display text-3xl">Launch with one useful placement</h3>
            <p className="mt-3 text-sm leading-7 text-muted-foreground">These introductory rates are designed for TexasDefined's launch stage. They are sponsorship fees, not guaranteed-impression or guaranteed-booking packages. Every placement remains separately disclosed from editorial content and is subject to surface availability and approval.</p>
            <div className="mt-5 grid gap-4">
              {sportsLaunchPackages.map((item) => <article key={item.name} className="border-t border-border pt-4">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h4 className="font-display text-2xl">{item.name}</h4>
                  <p className="text-sm font-bold text-primary">{item.price}</p>
                </div>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{item.detail}</p>
              </article>)}
            </div>
            <p className="mt-5 text-xs leading-6 text-muted-foreground">Launch packages are month-to-month unless otherwise agreed. TexasDefined does not sell editorial rankings, favorable reviews or factual conclusions. One approved sponsored placement may run on a sports surface at a time.</p>
          </div>
        </section>

        <section aria-labelledby="partnership-form-heading" className="border-t border-border pt-7 lg:border-t-0 lg:pt-0">
          <p className="eyebrow text-primary">Start a conversation</p>
          <h2 id="partnership-form-heading" className="mt-3 font-display text-4xl">Tell us about your organization</h2>
          <p className="mt-4 text-sm leading-7 text-muted-foreground">This form is for business and sponsorship inquiries. Submissions are stored privately for Texas Defined to review.</p>

          {search.partnershipType === 'sports-travel' ? <p className="mt-4 border-l-2 border-primary pl-4 text-sm leading-6 text-muted-foreground">Sports-travel partnership is preselected because you arrived from a Texas Defined sports venue resource.</p> : null}
          {search.partnershipType === 'brand-retail' ? <p className="mt-4 border-l-2 border-primary pl-4 text-sm leading-6 text-muted-foreground">Texas brand / grocery / retail is preselected because you arrived from the Texas Brands directory. Inclusion and editorial treatment are not for sale.</p> : null}
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
              <select key={search.partnershipType ?? 'other'} id="partnershipType" name="partnershipType" className="min-h-11 border border-border bg-background px-3 py-2 font-normal text-foreground" defaultValue={search.partnershipType ?? 'other'} required>
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
