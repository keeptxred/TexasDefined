import { createFileRoute } from '@tanstack/react-router';
import { texasDefinedBrand } from '@/brand/texasdefined';
import { PropertyTaxGuidePage } from '@/components/guides/PropertyTaxGuidePage';
import { buildMeta, canonicalLink } from '@/lib/seo';
const description='Find Texas appraisal district records, notices, exemptions, protest procedures, forms, and official county contacts.';
export const Route=createFileRoute('/learn/appraisal-districts')({head:()=>({meta:buildMeta(texasDefinedBrand,{title:'Texas Appraisal Districts',description}),links:[canonicalLink(texasDefinedBrand,'/learn/appraisal-districts')]}),component:()=> <PropertyTaxGuidePage eyebrow="Local appraisal" title="Texas Appraisal Districts" intro={description} officialUrl="https://comptroller.texas.gov/taxes/property-tax/county-directory/" officialLabel="Official appraisal district directory" sections={[
{title:'What an appraisal district does',paragraphs:['Each county appraisal district identifies taxable property, maintains ownership and property characteristics, determines appraised values, administers exemptions and supports the protest process. It does not set local tax rates or collect every tax bill.']},
{title:'What to verify in your account',paragraphs:['Confirm ownership, mailing address, legal description, property characteristics, exemptions, taxing units and value history. Incorrect facts can affect value and notices.'],steps:['Locate the account using the official appraisal district website.','Review property characteristics and exemption status.','Download the current appraisal notice and value history.','Contact the district promptly when facts are wrong.']},
{title:'Notices and deadlines',paragraphs:['Read every appraisal notice carefully. Protest deadlines are tied to the notice and Texas law, and waiting for a tax bill is usually too late to challenge the appraisal for that year.']},
{title:'Records and evidence',paragraphs:['Useful records may include comparable sales, photographs, repair estimates, surveys, income and expense information, closing documents and evidence of unequal appraisal.']}
]} />});
