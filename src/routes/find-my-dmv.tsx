import { createFileRoute, Link } from '@tanstack/react-router';
import { Container } from '@/components/layout/Container';
import { texasDefinedBrand } from '@/brand/texasdefined';
import { buildMeta, canonicalLink } from '@/lib/seo';

const description = 'The basic steps for registering a vehicle after a move, plus the official state and county pages you’ll need along the way.';

export const Route = createFileRoute('/find-my-dmv')({
  head: () => ({
    meta: buildMeta(texasDefinedBrand, {
      canonicalPath: '/find-my-dmv',
      title: 'Register a Vehicle in Texas',
      description,
    }),
    links: [canonicalLink(texasDefinedBrand, '/find-my-dmv')],
  }),
  component: Page,
});

function Page() {
  return (
    <Container className="py-16 sm:py-24">
      <article className="prose prose-gray mx-auto max-w-4xl">
        <p className="eyebrow text-primary">New in Town</p>
        <h1>Getting your car settled in Texas</h1>
        <p className="lead">{description}</p>
        <h2>Two offices, two different jobs</h2>
        <p>County tax offices generally handle vehicle registration. The Texas Department of Public Safety handles driver licenses. Check both official sites before making a trip so you know which documents, fees and appointments apply.</p>
        <h2>Your first steps</h2>
        <ol>
          <li>Arrange insurance that meets Texas requirements.</li>
          <li>Complete any inspection or emissions step that applies to your vehicle and county.</li>
          <li>Gather your title, registration, identification and proof-of-residency documents.</li>
          <li>Check your county tax office for current fees, hours and accepted payment methods.</li>
          <li>Handle your Texas driver license separately through DPS.</li>
        </ol>
        <div className="not-prose my-8 grid gap-4 sm:grid-cols-2">
          <a className="rounded-lg border p-5 font-medium" href="https://www.txdmv.gov/motorists/new-to-texas" rel="noreferrer">See the official TxDMV steps</a>
          <a className="rounded-lg border p-5 font-medium" href="https://www.dps.texas.gov/section/driver-license" rel="noreferrer">Visit Texas driver-license services</a>
          <Link className="rounded-lg border p-5 font-medium" to="/browse/counties">Find your county</Link>
          <Link className="rounded-lg border p-5 font-medium" to="/moving-to-texas-checklist">See the moving checklist</Link>
        </div>
        <aside className="not-prose rounded-lg bg-muted p-5 text-sm text-muted-foreground">Use the official state and county pages for the latest office locations, fees, deadlines and document requirements.</aside>
      </article>
    </Container>
  );
}
