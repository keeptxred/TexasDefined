import { createFileRoute } from '@tanstack/react-router';
import { texasDefinedBrand } from '@/brand/texasdefined';
import { PropertyTaxGuidePage } from '@/components/guides/PropertyTaxGuidePage';
import { buildMeta, canonicalLink } from '@/lib/seo';
const description='Prepare a Texas property-tax protest with the right deadline, evidence, informal review strategy, and appraisal review board hearing steps.';
export const Route=createFileRoute('/do/property-tax-protest')({head:()=>({meta:buildMeta(texasDefinedBrand,{title:'Texas Property Tax Protest',description}),links:[canonicalLink(texasDefinedBrand,'/do/property-tax-protest')]}),component:()=> <PropertyTaxGuidePage eyebrow="Challenge an appraisal" title="Texas Property Tax Protest Guide" intro={description} officialUrl="https://comptroller.texas.gov/taxes/property-tax/protests/" officialLabel="Texas Comptroller protest guidance" sections={[
{title:'Start with the deadline',paragraphs:['The appraisal notice and applicable law determine the protest deadline. File on time even when you are still gathering evidence; a late protest may lose ordinary review rights.']},
{title:'Choose the grounds',paragraphs:['Common grounds include excessive appraised value, unequal appraisal, incorrect property description, denied exemption, ownership errors and other actions affecting the property. Select every ground that genuinely applies.']},
{title:'Build an evidence packet',paragraphs:['Organize evidence around the specific issue rather than submitting a large unstructured file.'],steps:['Review the appraisal district evidence and property record.','Select comparable properties or sales with clear adjustments.','Document condition, damage, access, location or factual errors.','Prepare a short written explanation and requested value.','Keep copies of everything submitted.']},
{title:'Informal meeting and ARB hearing',paragraphs:['An informal review may resolve the matter before a formal hearing. If not, present concise evidence to the appraisal review board, answer questions directly and preserve the written order for any further appeal.']},
{title:'After the decision',paragraphs:['Read the order carefully and note deadlines for arbitration, district-court appeal, SOAH review when available, or other remedies. Paying taxes by the required deadline may still be necessary while an appeal continues.']}
]} />});
