import { useLocation } from '@tanstack/react-router';
import { Container } from '@/components/layout/Container';

type OfficialSource = {
  label: string;
  href: string;
  description: string;
};

type SourceSet = {
  eyebrow: string;
  title: string;
  description: string;
  sources: readonly OfficialSource[];
};

const HOMESTEAD_SOURCES: SourceSet = {
  eyebrow: 'Official filing sources',
  title: 'Use the current Texas forms and your local appraisal district',
  description: 'The Comptroller publishes the statewide forms and the directory that identifies the appraisal district responsible for your property.',
  sources: [
    {
      label: 'Texas Comptroller property-tax forms',
      href: 'https://comptroller.texas.gov/taxes/property-tax/forms/',
      description: 'Get the current residence-homestead application and related affidavits from the statewide forms library.',
    },
    {
      label: 'Local appraisal district and tax-office directory',
      href: 'https://comptroller.texas.gov/taxes/property-tax/county-directory/',
      description: 'Find the appraisal district that receives the exemption application for your county.',
    },
  ],
};

const MOVING_SOURCES: SourceSet = {
  eyebrow: 'Official new-resident sources',
  title: 'Handle vehicle registration and your Texas driver license at the source',
  description: 'These state pages maintain the current requirements for new Texas residents.',
  sources: [
    {
      label: 'TxDMV: New to Texas',
      href: 'https://www.txdmv.gov/motorists/new-to-texas',
      description: 'Current vehicle-registration, county tax-office and new-resident motor-vehicle guidance.',
    },
    {
      label: 'Texas DPS: Moving to Texas driver-license guide',
      href: 'https://www.dps.texas.gov/section/driver-license/moving-texas-guide-driver-licenses-and-ids',
      description: 'Current state guidance for transferring an out-of-state driver license or ID after a move.',
    },
  ],
};

const VETERAN_SOURCES: SourceSet = {
  eyebrow: 'Official veteran sources',
  title: 'Confirm the exemption form and broader Texas veteran benefits',
  description: 'Property-tax eligibility is administered locally under Texas law, while the state veterans portal connects veterans and families with other benefits and services.',
  sources: [
    {
      label: 'Texas Comptroller property-tax forms',
      href: 'https://comptroller.texas.gov/taxes/property-tax/forms/',
      description: 'Use the current statewide forms library for disabled-veteran and residence-homestead exemption applications.',
    },
    {
      label: 'Texas Veterans Portal',
      href: 'https://veterans.portal.texas.gov/',
      description: 'Official State of Texas gateway to veteran, family, caregiver and survivor services and benefits.',
    },
  ],
};

const RESOURCE_HUB_SOURCES: SourceSet = {
  eyebrow: 'Official statewide directories',
  title: 'Go directly to Texas government when you need the responsible office',
  description: 'Texas Defined explains the system; these State of Texas directories are the authoritative starting points for agencies and government services.',
  sources: [
    {
      label: 'Texas.gov state agencies and departments',
      href: 'https://www.texas.gov/texas-state-agencies-departments/index.html',
      description: 'Official directory of Texas state agencies, departments and contact information.',
    },
    {
      label: 'Texas.gov government services directory',
      href: 'https://www.texas.gov/government-services-directory/',
      description: 'Search official Texas government services by need rather than by agency name.',
    },
  ],
};

const COUNTY_SOURCES: SourceSet = {
  eyebrow: 'Official local-government cross-check',
  title: 'Find the county appraisal and tax offices responsible for the address',
  description: 'County pages already link to the verified county website when available. The Comptroller directory is the statewide source for local appraisal districts, tax assessor-collectors and the taxing units they serve.',
  sources: [
    {
      label: 'Texas Comptroller local property appraisal and tax directory',
      href: 'https://comptroller.texas.gov/taxes/property-tax/county-directory/',
      description: 'Choose the county to find its appraisal district, tax office and listed local taxing units.',
    },
  ],
};

function sourceSetFor(pathname: string): SourceSet | null {
  if (pathname === '/do/homestead-exemption') return HOMESTEAD_SOURCES;
  if (pathname === '/moving-to-texas-checklist') return MOVING_SOURCES;
  if (pathname === '/learn/disabled-veteran-property-tax-benefits') return VETERAN_SOURCES;
  if (pathname === '/texas-resources') return RESOURCE_HUB_SOURCES;
  if (/^\/county\/[^/]+\/?$/.test(pathname)) return COUNTY_SOURCES;
  return null;
}

export default function ContextualOfficialSources() {
  const { pathname } = useLocation();
  const sourceSet = sourceSetFor(pathname);
  if (!sourceSet) return <div className="h-20 sm:h-24" aria-hidden="true" />;

  return (
    <aside className="mt-20 border-y border-border bg-background sm:mt-24" aria-label={sourceSet.title}>
      <Container className="py-10 sm:py-12">
        <div className="grid gap-8 lg:grid-cols-[16rem_1fr] lg:gap-12">
          <div>
            <p className="eyebrow text-primary">{sourceSet.eyebrow}</p>
            <h2 className="mt-2 font-display text-3xl leading-tight">{sourceSet.title}</h2>
            <p className="mt-4 text-sm leading-7 text-muted-foreground">{sourceSet.description}</p>
          </div>
          <div className="divide-y divide-border border-y border-border">
            {sourceSet.sources.map((source) => (
              <a key={source.href} href={source.href} target="_blank" rel="noreferrer noopener" className="group block py-5">
                <span className="font-display text-xl group-hover:text-primary">{source.label}</span>
                <span className="ml-2 text-sm text-primary">↗</span>
                <span className="mt-2 block max-w-2xl text-sm leading-6 text-muted-foreground">{source.description}</span>
              </a>
            ))}
          </div>
        </div>
      </Container>
    </aside>
  );
}
