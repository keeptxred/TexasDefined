import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

export function SectionHeader({ eyebrow, title, description, actionLabel, actionTo, align = "left", className }: { eyebrow?: string; title: string; description?: string; actionLabel?: string; actionTo?: string; align?: "left" | "center"; className?: string; }) {
  return (
    <div className={cn("flex flex-col gap-5 border-b border-border/70 pb-6 sm:flex-row sm:items-end sm:justify-between", align === "center" && "sm:flex-col sm:items-center sm:text-center", className)}>
      <div className={cn("max-w-3xl", align === "center" && "mx-auto")}>
        {eyebrow && <p className="eyebrow text-primary">{eyebrow}</p>}
        <h2 className="mt-2 font-display text-[2.15rem] font-semibold leading-[1.02] sm:text-[2.75rem] lg:text-[3rem]">{title}</h2>
        {description && <p className="mt-3 max-w-2xl text-base leading-7 text-muted-foreground">{description}</p>}
      </div>
      {actionLabel && actionTo && <Link to={actionTo} className="eyebrow group inline-flex shrink-0 items-center gap-2 border-b border-primary pb-1 text-primary transition-opacity hover:opacity-70">{actionLabel}<span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">→</span></Link>}
    </div>
  );
}

export function Section({ children, className, tone = "default" }: { children: ReactNode; className?: string; tone?: "default" | "surface" | "ink"; }) {
  return <section className={cn("py-14 sm:py-16 lg:py-20", tone === "surface" && "bg-surface text-surface-foreground", tone === "ink" && "bg-ink text-ink-foreground", className)}>{children}</section>;
}
