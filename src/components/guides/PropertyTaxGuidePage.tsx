import { Link } from '@tanstack/react-router';
import { ExternalLink } from 'lucide-react';
import { Container } from '@/components/layout/Container';

type Section = { title: string; paragraphs: string[]; steps?: string[] };

type Props = {
  eyebrow: string;
  title: string;
  intro: string;
  sections: Section[];
  officialUrl: string;
  officialLabel: string;
};

export function PropertyTaxGuidePage({ eyebrow, title, intro, sections, officialUrl, officialLabel }: Props) {
  return (
    <Container className="py-16 sm:py-24">
      <article className="mx-auto max-w-4xl">
        <p className="eyebrow text-primary">{eyebrow}</p>
        <h1 className="mt-3 font-display text-4xl leading-tight sm:text-6xl">{title}</h1>
        <p className="mt-6 max-w-3xl text-lg leading-8 text-muted-foreground">{intro}</p>
        <p className="mt-4 text-sm text-muted-foreground">Last reviewed August 3, 2026. Educational guidance; verify current requirements with the official authority.</p>

        <div className="mt-12 space-y-12">
          {sections.map((section) => (
            <section key={section.title} className="border-t border-border pt-8">
              <h2 className="font-display text-3xl">{section.title}</h2>
              <div className="mt-4 space-y-4 text-base leading-7 text-muted-foreground">
                {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              </div>
              {section.steps && (
                <ol className="mt-6 space-y-3">
                  {section.steps.map((step, index) => (
                    <li key={step} className="flex gap-4 rounded-md border border-border p-4">
                      <strong className="text-primary">{index + 1}</strong><span>{step}</span>
                    </li>
                  ))}
                </ol>
              )}
            </section>
          ))}
        </div>

        <section className="mt-12 rounded-md bg-muted p-6">
          <h2 className="font-display text-2xl">Continue your research</h2>
          <div className="mt-4 flex flex-wrap gap-4 text-sm font-medium">
            <Link to="/decide/property-taxes" className="underline">Property-tax calculator</Link>
            <Link to="/learn/appraisal-districts" className="underline">Appraisal districts</Link>
            <Link to="/do/homestead-exemption" className="underline">Homestead exemption</Link>
            <Link to="/do/property-tax-protest" className="underline">Protest guide</Link>
            <a href={officialUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 underline">{officialLabel}<ExternalLink className="h-4 w-4" /></a>
          </div>
        </section>
      </article>
    </Container>
  );
}
