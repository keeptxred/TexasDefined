import { Link } from '@tanstack/react-router';

export type PropertyRelatedLink = {
  to: string;
  label: string;
  description?: string;
  kind?: 'guide' | 'calculator' | 'county' | 'tool';
};

export function PropertyRelatedLinks({
  links,
  title = 'Related property guides',
}: {
  links: PropertyRelatedLink[];
  title?: string;
}) {
  if (!links.length) return null;
  return (
    <section className="mt-14 border-t border-border pt-8">
      <p className="eyebrow text-primary">Keep going</p>
      <h2 className="mt-2 font-display text-3xl">{title}</h2>
      <div className="mt-5 grid border-t border-border sm:grid-cols-2">
        {links.map((item, index) => (
          <Link
            key={`${item.to}-${item.label}`}
            to={item.to}
            className={`group border-b border-border py-5 ${index % 2 === 0 ? 'sm:border-r sm:pr-6' : 'sm:pl-6'}`}
          >
            {item.kind ? <span className="eyebrow text-muted-foreground">{item.kind}</span> : null}
            <strong className="mt-1 block font-display text-2xl group-hover:text-primary">{item.label}</strong>
            {item.description ? <p className="mt-2 text-sm leading-6 text-muted-foreground">{item.description}</p> : null}
          </Link>
        ))}
      </div>
    </section>
  );
}
