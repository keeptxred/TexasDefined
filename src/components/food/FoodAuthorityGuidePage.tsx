import { Link } from "@tanstack/react-router";

import { Container } from "@/components/layout/Container";

type FoodAuthorityGuidePageProps = {
  eyebrow: string;
  title: string;
  description: string;
  authorityHtml: string | null;
};

export function FoodAuthorityGuidePage({ eyebrow, title, description, authorityHtml }: FoodAuthorityGuidePageProps) {
  return <main>
    <Container className="py-10 sm:py-14 lg:py-16">
      <nav aria-label="Breadcrumb" className="text-sm text-muted-foreground">
        <Link to="/">Home</Link> / <Link to="/explore/$category" params={{ category: "food-bbq" }}>Food &amp; BBQ</Link> / <span>{title}</span>
      </nav>
      <article className="mx-auto mt-8 max-w-4xl">
        <p className="eyebrow text-primary">{eyebrow}</p>
        <h1 className="mt-3 font-display text-4xl leading-tight sm:text-5xl">{title}</h1>
        <p className="mt-5 text-lg leading-8 text-muted-foreground">{description}</p>
        {authorityHtml ? <div className="mt-10 space-y-7 text-base leading-8 text-muted-foreground" dangerouslySetInnerHTML={{ __html: authorityHtml }} /> : null}
      </article>
    </Container>
  </main>;
}
