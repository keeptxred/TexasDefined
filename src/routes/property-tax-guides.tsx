import { createFileRoute } from '@tanstack/react-router';
import { texasDefinedBrand } from '@/brand/texasdefined';
import { PropertyClusterGuidePage } from '@/components/guides/PropertyClusterGuidePage';
import { buildMeta, canonicalLink } from '@/lib/seo';

const canonicalPath = '/property-tax-guides';
const description = 'A directory of Texas Defined guides for property taxes, exemptions, appraisal districts, protests, land valuation, veterans, seniors, MUDs and homebuyers.';

export const Route = createFileRoute('/property-tax-guides')({
  head: () => ({
    meta: buildMeta(texasDefinedBrand, { canonicalPath, title: 'Texas Property Tax Guide Library', description }),
    links: [canonicalLink(texasDefinedBrand, canonicalPath)],
  }),
  component: () => <PropertyClusterGuidePage
    eyebrow="Property Taxes"
    title="Texas property-tax guide library"
    intro={description}
    officialUrl="https://comptroller.texas.gov/taxes/property-tax/"
    officialLabel="Texas Comptroller Property Tax Assistance"
    faqs={[
      { question: 'Where should I start?', answer: 'Start with the complete Texas property-tax guide, then use the specialized guide matching your exemption, protest, land or homebuying question.' },
      { question: 'Are these official decisions?', answer: 'No. Texas Defined provides educational guidance; appraisal districts, taxing units, tax offices, ARBs and courts make official decisions.' },
    ]}
    sections={[
      { id: 'core', title: 'Core homeowner guides', paragraphs: ['Use the complete property-tax guide, calculator, appraisal-district guide, homestead guide and protest guide as the foundation for understanding the system.'], bullets: ['/learn/property-taxes', '/decide/property-taxes', '/learn/appraisal-districts', '/do/homestead-exemption', '/do/property-tax-protest'] },
      { id: 'land', title: 'Land valuation guides', paragraphs: ['Agricultural and wildlife-management appraisal depend on qualifying use, applications, local intensity standards and continuing documentation.'], bullets: ['/learn/agricultural-valuation', '/learn/wildlife-management-valuation'] },
      { id: 'relief', title: 'Veteran and senior relief', paragraphs: ['Review disabled-veteran exemption tiers, total homestead relief, age-65 exemptions, school tax ceilings, installment options and deferrals.'], bullets: ['/learn/disabled-veteran-property-tax-benefits', '/learn/over-65-property-tax-guide'] },
      { id: 'planning', title: 'Planning and dispute guides', paragraphs: ['Research MUD costs, statutory deadlines, post-ARB appeal paths and the property-tax work a buyer should complete before and after closing.'], bullets: ['/learn/mud-taxes-explained', '/learn/property-tax-deadlines', '/learn/property-tax-appeals-arbitration', '/learn/homebuyer-property-tax-checklist'] },
    ]}
  />,
});
