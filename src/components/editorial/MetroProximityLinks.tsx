import { Link } from "@tanstack/react-router";

import { Container } from "@/components/layout/Container";
import { metroProximityLinksForCategory } from "@/data/metro-proximity";

export function MetroProximityLinks({ category }: { category: string }) {
  const links = metroProximityLinksForCategory(category);
  if (!links.length) return null;

  return <Container className="pb-10 sm:pb-14">
    <section className="border-y border-border py-8">
      <p className="eyebrow text-primary">Plan from a Texas metro</p>
      <h2 className="mt-3 max-w-3xl font-display text-3xl sm:text-4xl">Find destinations by practical trip radius</h2>
      <p className="mt-3 max-w-3xl text-sm leading-7 text-muted-foreground">These guides organize the same source-checked TexasDefined destination catalog around Houston, Dallas–Fort Worth, Austin and San Antonio. Distance bands are approximate planning ranges; verify the live road route before traveling.</p>
      <div className="mt-6 grid gap-x-8 gap-y-3 sm:grid-cols-2 lg:grid-cols-3">
        {links.map((link) => <Link key={link.href} to={link.href} className="border-b border-border pb-3 text-sm font-semibold leading-6 hover:border-primary hover:text-primary">{link.label} →</Link>)}
      </div>
    </section>
  </Container>;
}
