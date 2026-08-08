import { createFileRoute, Link } from '@tanstack/react-router';
import { type ReactNode } from 'react';
import { texasDefinedBrand } from '@/brand/texasdefined';
import { Container } from '@/components/layout/Container';
import { buildMeta, canonicalLink, jsonLd } from '@/lib/seo';

const description='A plain-English guide to deadlines, escrow, payment options, late charges, agreements, refunds, liens and tax sales.';
const canonicalPath='/learn/property-tax-payments';
const siteUrl=`https://${texasDefinedBrand.identity.domain}`;
const pageUrl=`${siteUrl}${canonicalPath}`;
const paymentSteps=[
  'Verify the account, year and taxing units.',
  'Use the delinquency date printed on the bill.',
  'Confirm exemptions and who is responsible for escrow.',
  'Save receipts and confirmation numbers.',
  'Check that the payment reached the correct account.',
  'Call the collector early when full payment is not possible.',
];

export const Route=createFileRoute('/learn/property-tax-payments')({head:()=>({meta: buildMeta(texasDefinedBrand, {
      canonicalPath,
      title:'Paying Your Property Taxes',description}),
    links: [canonicalLink(texasDefinedBrand, canonicalPath)],
    scripts:[jsonLd({
      '@context':'https://schema.org',
      '@graph':[
        {
          '@type':'HowTo',
          '@id':`${pageUrl}#payment-checklist`,
          name:'Before you send a Texas property-tax payment',
          description:'A practical checklist for checking and documenting a Texas property-tax payment.',
          url:pageUrl,
          isPartOf:{'@id':`${siteUrl}/#website`},
          step:paymentSteps.map((text,index)=>({
            '@type':'HowToStep',
            position:index+1,
            name:text,
            text,
            url:`${pageUrl}#payment-step-${index+1}`,
          })),
        },
        {
          '@type':'BreadcrumbList',
          '@id':`${pageUrl}#breadcrumb`,
          itemListElement:[
            {'@type':'ListItem',position:1,name:'Home',item:`${siteUrl}/`},
            {'@type':'ListItem',position:2,name:'Property taxes',item:`${siteUrl}/learn/property-taxes`},
            {'@type':'ListItem',position:3,name:'Paying the bill',item:pageUrl},
          ],
        },
      ],
    })]}),component:Page});

function Page(){return <><Container className="pb-16 pt-12 sm:pb-24 sm:pt-16"><article className="mx-auto max-w-6xl">
<nav aria-label="Breadcrumb" className="border-b border-border pb-4 text-xs uppercase tracking-[0.14em] text-muted-foreground"><Link to="/">Front page</Link><span aria-hidden="true" className="mx-2">/</span><Link to="/learn/property-taxes">Property taxes</Link><span aria-hidden="true" className="mx-2">/</span><span aria-current="page" className="text-foreground">Paying the bill</span></nav>
<header className="grid gap-8 border-b border-border py-10 lg:grid-cols-[minmax(0,1fr)_18rem] lg:items-end"><div><p className="eyebrow text-primary">When the bill arrives</p><h1 className="mt-3 max-w-4xl font-display text-5xl leading-[0.98] sm:text-7xl">Paying your property taxes</h1><p className="mt-6 max-w-3xl text-lg leading-8 text-muted-foreground sm:text-xl">{description}</p></div><p className="border-l border-border pl-6 text-sm leading-6 text-muted-foreground">Reviewed August 3, 2026. Your collecting office has the final word on account-specific dates, balances and payment options.</p></header>
<div className="divide-y divide-border">
<Section eyebrow="Start here" title="Start with the bill itself"><p>Check the owner, account number, legal description, property address, tax year, each taxing unit, taxable value, exemptions, rate, amount due and delinquency date. One statement may include a county, city, school district, MUD, hospital district, emergency-services district, college district and other local units.</p><Callout>Didn’t receive a bill? Contact the collector anyway. A missing bill usually does not erase the tax, penalties, interest or lien.</Callout></Section>
<Section eyebrow="Deadlines" title="Know the deadline"><p>Taxes are generally due when the bill arrives. In an ordinary year, January 31 is the last day to pay before delinquency and unpaid taxes become delinquent February 1. Corrected bills, late-mailed bills, split-payment plans, protests, disasters and other circumstances can change that date, so use the deadline printed on your statement.</p><p>Continuing a value appeal? You may still need to pay a required amount before delinquency to preserve the appeal.</p></Section>
<Section eyebrow="Payment options" title="Choose the payment method that fits"><p>Collectors may accept checks, money orders, cash, electronic transfers, e-checks, bank drafts and credit cards. Online and card payments may include processing fees. Check timestamp rules, mailing addresses, rejected-payment policies and what counts as proof of payment.</p><p>Early-payment discounts, split payments and partial payments are available only when the collector offers them.</p></Section>
<Section eyebrow="Mortgage escrow" title="Keep an eye on escrow"><p>Mortgage servicers commonly collect part of the projected annual taxes and insurance with each monthly payment. Even when escrow is supposed to handle the bill, check the tax account after payment season. Make sure the servicer paid the correct account and received any corrected or supplemental bills.</p><p>Escrow shortages can raise monthly payments when taxes, insurance, values or exemption assumptions change.</p></Section>
<Section eyebrow="Relief options" title="Installments and deferrals"><p>Some homeowners who are 65 or older, disabled, or eligible under certain disabled-veteran provisions may qualify for four installments. Certain disaster-affected owners may qualify too. Eligibility and first-payment deadlines matter.</p><p>A homestead deferral postpones collection; it does not erase the debt. The balance remains tied to the property and generally continues to accrue interest.</p></Section>
<Section eyebrow="Delinquency" title="What happens after delinquency"><p>For an ordinary February 1 delinquency, penalties and interest begin to accumulate. The penalty generally grows monthly until reaching 12 percent on July 1, while interest generally continues at one percent for each month or part of a month. A referral to a delinquent-tax attorney can add collection charges.</p><Callout>Ask for a payoff amount valid through the date you expect to pay. Flag failed escrow, returned payments, ownership errors or corrected bills, and get every agreement in writing.</Callout></Section>
<Section eyebrow="Agreements" title="Payment agreements"><p>Some collectors offer installment agreements that stretch payments over several months. Terms may require a down payment, current-year taxes to stay current and every installment to arrive on time. Read the years, properties, penalties, fees and default terms before signing.</p></Section>
<Section eyebrow="Corrections" title="Waivers and refunds"><p>Limited waivers may apply when a taxpayer relied on incorrect government information or another defined circumstance can be proven. Refund requests have deadlines and documentation requirements. Put the request in writing and keep copies of notices, receipts and supporting evidence.</p></Section>
<Section eyebrow="Enforcement" title="Liens, lawsuits and tax sales"><p>Property taxes are secured by a lien. Continued delinquency can lead to a collection lawsuit, judgment, foreclosure and tax sale. Waiting until a lawsuit begins usually makes the problem more expensive and leaves fewer options.</p></Section>
</div>
<section className="grid gap-8 border-y border-border py-10 lg:grid-cols-[15rem_1fr]"><div><p className="eyebrow text-primary">Before you send payment</p><h2 className="mt-2 font-display text-3xl">Six checks worth making</h2></div><ol className="divide-y divide-border border-y border-border">{paymentSteps.map((step,index)=><li id={`payment-step-${index+1}`} key={step} className="grid gap-3 py-5 sm:grid-cols-[3rem_1fr]"><span className="font-display text-3xl text-primary">{String(index+1).padStart(2,'0')}</span><p className="text-sm leading-6 text-muted-foreground">{step}</p></li>)}</ol></section>
<footer className="flex flex-wrap gap-x-6 gap-y-3 py-7 text-sm font-semibold"><a className="underline decoration-primary/50 underline-offset-4" href="https://comptroller.texas.gov/taxes/property-tax/" target="_blank" rel="noreferrer">Official state guidance ↗</a><Link className="underline underline-offset-4" to="/learn/property-taxes">Understand the full tax bill</Link><Link className="underline underline-offset-4" to="/browse/counties">Find your county office</Link></footer>
</article></Container></>}
function Section({eyebrow,title,children}:{eyebrow:string;title:string;children:ReactNode}){return <section className="grid gap-8 py-10 lg:grid-cols-[15rem_1fr]"><div><p className="eyebrow text-primary">{eyebrow}</p><h2 className="mt-2 font-display text-3xl leading-tight">{title}</h2></div><div className="max-w-3xl space-y-4 text-base leading-7 text-muted-foreground">{children}</div></section>}
function Callout({children}:{children:ReactNode}){return <aside className="border-l-2 border-primary pl-5 text-foreground">{children}</aside>}
