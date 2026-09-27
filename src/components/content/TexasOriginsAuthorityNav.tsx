import { Link } from "@tanstack/react-router";

const steps = [
  {
    slug: "indigenous-texas-history-native-nations",
    eyebrow: "13,000+ years → present",
    title: "Indigenous Texas",
    shortTitle: "Indigenous Texas",
  },
  {
    slug: "texas-before-united-states-how-texas-began",
    eyebrow: "Origins overview",
    title: "Texas before the United States",
    shortTitle: "Before the U.S.",
  },
  {
    slug: "spanish-texas-military-battle-medina",
    eyebrow: "1519–1821",
    title: "Spanish Texas",
    shortTitle: "Spanish Texas",
  },
  {
    slug: "mexican-texas-military-history",
    eyebrow: "1821–1835",
    title: "Mexican Texas",
    shortTitle: "Mexican Texas",
  },
  {
    slug: "texas-revolution-historic-sites-road-trip",
    eyebrow: "1835–1836",
    title: "Texas Revolution",
    shortTitle: "Revolution",
  },
  {
    slug: "republic-of-texas-government-trail",
    eyebrow: "1836–1845",
    title: "Republic of Texas",
    shortTitle: "Republic",
  },
  {
    slug: "texas-us-mexican-war-palo-alto-guide",
    eyebrow: "1846–1848",
    title: "U.S.–Mexican War",
    shortTitle: "U.S.–Mexican War",
  },
] as const;

export const texasOriginsAuthoritySlugs = new Set<string>(steps.map((step) => step.slug));

export function TexasOriginsAuthorityNav({ activeSlug }: { activeSlug: string }) {
  const activeIndex = steps.findIndex((step) => step.slug === activeSlug);
  if (activeIndex < 0) return null;

  return (
    <aside className="mt-8 border-y border-border py-6" aria-label="Texas origins history series">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="eyebrow text-primary">Texas origins · authority series</p>
          <h2 className="mt-2 font-display text-2xl">Read the story in chronological order</h2>
        </div>
        <p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">
          Guide {activeIndex + 1} of {steps.length}
        </p>
      </div>
      <p className="mt-3 max-w-2xl text-sm leading-7 text-muted-foreground">
        Indigenous history comes first; colonial flags do not erase Native sovereignty, homelands or continuity. Move through the sequence to follow changing claims, governments and conflicts without treating 1836 as the beginning.
      </p>
      <nav className="mt-5 overflow-x-auto pb-2" aria-label="Texas origins guide navigation">
        <ol className="grid min-w-[64rem] grid-cols-7 gap-px overflow-hidden border border-border bg-border">
          {steps.map((step, index) => {
            const active = step.slug === activeSlug;
            return (
              <li key={step.slug} className="bg-background">
                <Link
                  to="/article/$slug"
                  params={{ slug: step.slug }}
                  aria-current={active ? "page" : undefined}
                  className={`block h-full p-4 transition-colors ${active ? "bg-surface" : "hover:bg-surface"}`}
                >
                  <span className="block text-[0.68rem] font-semibold uppercase tracking-[0.12em] text-primary">
                    {String(index + 1).padStart(2, "0")} · {step.eyebrow}
                  </span>
                  <strong className="mt-2 block font-display text-lg leading-tight text-foreground">
                    {step.shortTitle}
                  </strong>
                  {active ? <span className="mt-2 block text-xs font-semibold text-primary">You are here</span> : null}
                </Link>
              </li>
            );
          })}
        </ol>
      </nav>
    </aside>
  );
}
