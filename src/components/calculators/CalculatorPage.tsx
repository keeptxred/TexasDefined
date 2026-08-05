import type { ReactNode } from 'react';
import { Link } from '@tanstack/react-router';
import { Container } from '@/components/layout/Container';

export function CalculatorPage({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow: string;
  title: string;
  description: string;
  children: ReactNode;
}) {
  return (
    <Container className="py-16 sm:py-24">
      <article className="mx-auto max-w-5xl">
        <nav aria-label="Breadcrumb" className="mb-8 text-sm text-muted-foreground">
          <ol className="flex flex-wrap items-center gap-2">
            <li><Link to="/" className="hover:text-foreground">Home</Link></li>
            <li aria-hidden="true">/</li>
            <li><Link to="/decide/financial-tools" className="hover:text-foreground">Money Made Clearer</Link></li>
            <li aria-hidden="true">/</li>
            <li aria-current="page" className="text-foreground">{title}</li>
          </ol>
        </nav>
        <p className="eyebrow text-primary">{eyebrow}</p>
        <h1 className="mt-3 font-display text-4xl sm:text-6xl">{title}</h1>
        <p className="mt-5 max-w-3xl text-lg leading-8 text-muted-foreground">{description}</p>
        {children}
        <div className="mt-10 flex flex-wrap gap-4 text-sm font-medium">
          <Link to="/decide/financial-tools" className="underline">See all the calculators</Link>
          <Link to="/moving-to-texas" className="underline">Plan your move</Link>
          <Link to="/browse/cities" className="underline">Find a city</Link>
        </div>
      </article>
    </Container>
  );
}
