import { useSuspenseQuery } from "@tanstack/react-query";
import { createLazyFileRoute, Link } from "@tanstack/react-router";

import { DepartmentHero } from "@/components/editorial/DepartmentHero";
import { GuideCard } from "@/components/editorial/GuideCard";
import { Section, SectionHeader } from "@/components/editorial/SectionHeader";
import { Container } from "@/components/layout/Container";
import { guidesQuery } from "@/data/queries";

import { description, guideAnchor, practicalGuides, travelGuides, travelIntro } from "./guides";

const TOPIC_LABELS: Record<string, { eyebrow: string; title: string }> = {
  moving: { eyebrow: "Moving Here", title: "Make the move with confidence" },
  housing: { eyebrow: "Homes & Land", title: "Buying, owning and understanding Texas property" },
  "property-taxes": { eyebrow: "Property Taxes", title: "Texas property taxes, explained" },
  money: { eyebrow: "Money & Property", title: "Plan the numbers before you decide" },
  utilities: { eyebrow: "Everyday Costs", title: "What it costs to keep a Texas home running" },
  travel: { eyebrow: "Travel", title: "Plan the next Texas getaway" },
};
const editorialLabel = (value: string) => value.replaceAll("-", " ").replace(/\b\w/g, (letter) => letter.toUpperCase());

export const Route = createLazyFileRoute("/guides")({ component: GuidesPage });

function GuidesPage() {
  const { data: guides } = useSuspenseQuery(guidesQuery());
  const topics = [...new Set(guides.map((guide) => guide.topic))];
  return <>
    <DepartmentHero current="Guides" eyebrow="The Texas Guidebook" title="Travel well. Live well. Know Texas better." description={description} />
    <Section tone="surface"><Container><SectionHeader eyebrow="Travel guides" title="Where to go and how to make the most of it" description={travelIntro} /><ul className="mt-10 divide-y divide-border border-y border-border md:grid md:grid-cols-2 md:divide-y-0 lg:grid-cols-4">{travelGuides.map((guide, index) => <li key={`${guide.label}-${guide.to}`} id={guideAnchor(index)} className="border-border py-6 md:border-b md:p-6 lg:border-r lg:last:border-r-0"><Link to={guide.to} className="group block h-full"><p className="eyebrow text-muted-foreground">Guide {String(index + 1).padStart(2, "0")}</p><h2 className="mt-3 font-display text-2xl leading-tight group-hover:text-primary">{guide.label}</h2><p className="mt-3 text-sm leading-6 text-muted-foreground">{guide.body}</p><p className="mt-4 text-xs leading-5 text-muted-foreground">{guide.note}</p><span className="eyebrow mt-6 inline-block border-b border-primary pb-1 text-primary">Read the guide</span></Link></li>)}</ul></Container></Section>
    <Section><Container><SectionHeader eyebrow="Living here" title="Practical guides for making Texas home" /><ul className="mt-10 grid gap-x-8 gap-y-0 md:grid-cols-2 lg:grid-cols-4">{practicalGuides.map((guide, index) => <li key={guide.to} id={guideAnchor(travelGuides.length + index)} className="border-t border-border py-6"><Link to={guide.to} className="group block"><h2 className="font-display text-2xl leading-tight group-hover:text-primary">{guide.label}</h2><p className="mt-3 text-sm leading-6 text-muted-foreground">{guide.body}</p><span className="eyebrow mt-5 inline-block text-primary">{guide.action} →</span></Link></li>)}</ul></Container></Section>
    {topics.map((topic, index) => {
      const topicCopy = TOPIC_LABELS[topic] ?? { eyebrow: editorialLabel(topic), title: `Explore ${editorialLabel(topic)}` };
      return <Section key={topic} tone={index % 2 === 0 ? "surface" : "default"}><Container><SectionHeader eyebrow={topicCopy.eyebrow} title={topicCopy.title} /><ul className="mt-10 grid gap-8 md:grid-cols-2 lg:grid-cols-3">{guides.filter((guide) => guide.topic === topic).map((guide) => <li key={guide.id}><GuideCard guide={guide} /></li>)}</ul></Container></Section>;
    })}
  </>;
}
