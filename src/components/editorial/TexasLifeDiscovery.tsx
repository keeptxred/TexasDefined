import { Link } from "@tanstack/react-router";

import { Section, SectionHeader } from "@/components/editorial/SectionHeader";
import { Container } from "@/components/layout/Container";
import type { CategorySlug } from "@/data/types";

const pathways: Array<{ category?: CategorySlug; to: string; label: string; description: string }> = [
  { to: "/texas-explained", label: "Texas Explained", description: "Ten connected guides to the land, roads, towns, wildlife, homes and cultures that make Texas work." },
  { category: "moving-to-texas", to: "/moving-to-texas", label: "Moving to Texas", description: "Relocation, cost-of-living and settling-in guidance." },
  { category: "real-estate", to: "/real-estate", label: "Homes & Land", description: "Buying, financing and owning a home in Texas." },
  { category: "home-garden", to: "/home-garden", label: "Home & Garden", description: "Texas homes, yards, seasons and practical projects." },
  { category: "texas-history", to: "/texas-history", label: "Texas History", description: "People, places and events that shaped the state." },
  { to: "/texas-symbols", label: "Official Texas Symbols", description: "The bird, flower, foods, wildlife and other symbols Texas made official." },
  { category: "sports", to: "/sports", label: "Texas Sports", description: "Teams, traditions and the games Texans follow." },
  { to: "/property", label: "Property & Taxes", description: "Property taxes, exemptions, county guides and homeowner tools." },
  { to: "/decide/financial-tools", label: "Money & Property Tools", description: "Calculators for housing, moving, taxes and household planning." },
  { to: "/browse/cities", label: "Texas City Directory", description: "Compare cities by county, region and related Texas Defined coverage." },
];

export function TexasLifeDiscovery({ currentCategory }: { currentCategory: CategorySlug }) {
  const links = pathways.filter((item) => item.category !== currentCategory);

  return (
    <Section tone="surface">
      <Container>
        <SectionHeader eyebrow="Keep going" title="More of Texas Life" description="Move from the story you are reading into the practical guides, places and tools that answer the next question." />
        <nav aria-label="Related Texas Life guides" className="mt-8">
          <ul className="grid border-t border-border sm:grid-cols-2 lg:grid-cols-4">
            {links.map((item, index) => (
              <li key={item.to} className={`${index % 4 !== 3 ? "lg:border-r" : ""} border-b border-border sm:px-6 sm:first:pl-0`}>
                <Link to={item.to} className="group block py-6">
                  <span className="font-display text-2xl transition-colors group-hover:text-primary">{item.label}</span>
                  <span className="mt-2 block text-sm leading-6 text-muted-foreground">{item.description}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </Container>
    </Section>
  );
}
