import { Link } from "@tanstack/react-router";

import { Container } from "@/components/layout/Container";
import { cn } from "@/lib/utils";

const defaultBackground = "linear-gradient(110deg, color-mix(in oklch, oklch(0.86 0.035 79) 40%, var(--background)), var(--background) 58%, color-mix(in oklch, oklch(0.58 0.105 218) 8%, var(--background)))";
const surfaceBackground = "linear-gradient(110deg, color-mix(in oklch, oklch(0.79 0.09 92) 24%, var(--surface)), var(--surface))";
const texasStripe = "linear-gradient(90deg, oklch(0.48 0.145 278) 0 18%, oklch(0.58 0.105 218) 18% 36%, oklch(0.46 0.09 148) 36% 54%, oklch(0.79 0.09 92) 54% 70%, oklch(0.69 0.15 52) 70% 86%, oklch(0.55 0.13 38) 86%)";

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
    <section
      className={cn("relative overflow-hidden border-b border-border", tone === "surface" && "text-surface-foreground")}
      style={{ background: tone === "surface" ? surfaceBackground : defaultBackground }}
    >
      <div aria-hidden className="absolute inset-x-0 top-0 h-2" style={{ background: texasStripe }} />
      <Container className="relative pb-12 pt-16 sm:pb-14 sm:pt-24">
        <nav aria-label="Breadcrumb" className="text-[0.72rem] font-medium uppercase tracking-[0.12em] text-muted-foreground">
          <ol className="flex items-center gap-2">
            <li><Link to="/" className="hover:text-foreground">Front page</Link></li>
            <li aria-hidden="true">/</li>
            <li aria-current="page" className="text-foreground">{current}</li>
          </ol>
        </nav>
        <div className="mt-10 max-w-5xl border-t border-border pt-8">
          <p className="eyebrow text-primary">{eyebrow}</p>
          <h1 className="mt-4 max-w-5xl font-display text-5xl leading-[0.98] sm:text-7xl">{title}</h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-muted-foreground">{description}</p>
        </div>
      </Container>
    </section>
  );
}
