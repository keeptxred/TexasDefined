import { Link } from "@tanstack/react-router";

import { Container } from "@/components/layout/Container";
import { cn } from "@/lib/utils";

export function DepartmentHero({
  current,
  eyebrow,
  title,
  description,
  tone = "default",
}: {
  current: string;
  eyebrow: string;
  title: string;
  description: string;
  tone?: "default" | "surface";
}) {
  return (
    <section className={cn("border-b border-border", tone === "surface" && "bg-surface text-surface-foreground")}>
      <Container className="pb-12 pt-16 sm:pb-14 sm:pt-24">
        <nav aria-label="Breadcrumb" className="text-[0.72rem] font-medium uppercase tracking-[0.12em] text-muted-foreground">
          <ol className="flex items-center gap-2">
            <li><Link to="/" className="hover:text-foreground">Front page</Link></li>
            <li aria-hidden="true">/</li>
            <li aria-current="page" className="text-foreground">{current}</li>
          </ol>
        </nav>
        <div className="mt-10 max-w-5xl border-t border-border pt-8">
          <p className="eyebrow text-primary">{eyebrow}</p>
          <h1 className="mt-4 max-w-4xl font-display text-5xl leading-[0.98] sm:text-7xl">{title}</h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-muted-foreground">{description}</p>
        </div>
      </Container>
    </section>
  );
}
