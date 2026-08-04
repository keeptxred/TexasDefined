import { createFileRoute } from '@tanstack/react-router';
import { texasDefinedBrand } from '@/brand/texasdefined';
import { PropertyTaxGuidePage } from '@/components/guides/PropertyTaxGuidePage';
import { buildMeta, canonicalLink } from '@/lib/seo';
const description='Learn who may qualify for a Texas residence homestead exemption, how to apply, what documents are commonly required, and what to verify after filing.';
export const Route=createFileRoute('/do/homestead-exemption')({head:()=>({meta:buildMeta(texasDefinedBrand,{title:'Texas Homestead Exemption',description}),links:[canonicalLink(texasDefinedBrand,'/do/homestead-exemption')]}),component:()=> <PropertyTaxGuidePage eyebrow="Texas Home & Property" title="Texas Homestead Exemption Guide" intro={description} officialUrl="https://comptroller.texas.gov/taxes/property-tax/exemptions/" officialLabel="Texas Comptroller exemption guidance" sections={[
{title:'What the exemption does',paragraphs:['A residence homestead exemption reduces taxable value for qualifying taxing units. Additional benefits may apply for people age 65 or older, people with disabilities, disabled veterans and certain surviving spouses.']},
{title:'Basic eligibility',paragraphs:['The property generally must be your principal residence, and ownership and occupancy requirements must be met. Rules can differ for inherited property, trusts, manufactured homes and other ownership arrangements.']},
{title:'How to apply',paragraphs:['Apply through the appraisal district for the county where the property is located. Filing is generally free; be cautious of companies charging unnecessary fees.'],steps:['Open the official county appraisal district website.','Download or complete the residence homestead application.','Provide the identification and ownership documentation requested by the district.','Submit the application and retain confirmation.','Check the appraisal account to confirm approval and effective year.']},
{title:'After approval',paragraphs:['Review the account every year to confirm the exemption remains present. Notify the appraisal district when ownership, occupancy or eligibility changes.']}
]} />});
