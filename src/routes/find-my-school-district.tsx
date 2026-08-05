import { createFileRoute, Link } from '@tanstack/react-router';
import { Container } from '@/components/layout/Container';
import { texasDefinedBrand } from '@/brand/texasdefined';
import { buildMeta, canonicalLink } from '@/lib/seo';

const description = 'A dependable way to confirm which public school district serves an address before you buy, rent or enroll.';

export const Route = createFileRoute('/find-my-school-district')({
  head: () => ({
    meta: buildMeta(texasDefinedBrand, {
      canonicalPath: '/find-my-school-district',
      title: 'Find Your Texas School District',
      description,
    }),
    links: [canonicalLink(texasDefinedBrand, '/find-my-school-district')],
  }),
  component: Page,
});

function Page() {
  return (
    <Container className="py-16 sm:py-24">
      <article className="prose prose-gray mx-auto max-w-4xl">
        <p className="eyebrow text-primary">Schools & Communities</p>
        <h1>Find the district that serves your address</h1>
        <p className="lead">{description}</p>
        <h2>Why the city name isn’t enough</h2>
        <p>City limits, ZIP codes, school-district boundaries and attendance zones often overlap in unexpected ways. An address can sit in one city and attend schools in another district, so always verify the exact property.</p>
        <h2>The safest way to check</h2>
        <ol>
          <li>Start with the Texas Education Agency’s official school and district pages.</li>
          <li>Enter the exact property address in an official district or county map.</li>
          <li>Confirm the assigned campus directly with the district.</li>
          <li>Ask about planned boundary changes, transfers or new-campus assignments.</li>
          <li>Keep written confirmation when a home purchase or lease depends on the answer.</li>
        </ol>
        <div className="not-prose my-8 grid gap-4 sm:grid-cols-2">
          <a className="rounded-lg border p-5 font-medium" href="https://tea.texas.gov/texas-schools" rel="noreferrer">Start with the Texas Education Agency</a>
          <a className="rounded-lg border p-5 font-medium" href="https://txschools.gov/" rel="noreferrer">Search TXschools.gov</a>
          <Link className="rounded-lg border p-5 font-medium" to="/browse/cities">Find a city</Link>
          <Link className="rounded-lg border p-5 font-medium" to="/browse/counties">Find your county</Link>
        </div>
        <aside className="not-prose rounded-lg bg-muted p-5 text-sm text-muted-foreground">The school district is the final authority on campus assignments. Confirm directly before making a housing or enrollment decision.</aside>
      </article>
    </Container>
  );
}
