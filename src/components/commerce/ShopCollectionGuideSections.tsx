import { Container } from '@/components/layout/Container';
import { shopCollectionGuideFor } from '@/data/shop-collection-guides';

export function ShopCollectionGuideSections({ slug }: { slug: string }) {
  const guide = shopCollectionGuideFor(slug);
  if (!guide) return null;

  return <>
    <section className="border-y border-border py-14">
      <Container className="grid gap-8 lg:grid-cols-[15rem_1fr]">
        <div><p className="eyebrow text-primary">Collection notes</p><h2 className="mt-2 font-display text-4xl">Why this collection exists</h2></div>
        <div className="max-w-3xl text-base leading-8 text-muted-foreground"><p>{guide.intro}</p><p className="mt-5">{guide.useItFor}</p></div>
      </Container>
    </section>

    <section className="py-14">
      <Container className="grid gap-8 lg:grid-cols-[15rem_1fr]">
        <div><p className="eyebrow text-primary">How we choose</p><h2 className="mt-2 font-display text-4xl">What earns a place here</h2></div>
        <div className="grid gap-x-8 md:grid-cols-2">{guide.principles.map((item) => <div key={item.title} className="border-t border-border py-6"><h3 className="font-display text-2xl">{item.title}</h3><p className="mt-3 text-sm leading-7 text-muted-foreground">{item.text}</p></div>)}</div>
      </Container>
    </section>

    <section className="border-y border-border py-14">
      <Container className="grid gap-8 lg:grid-cols-[15rem_1fr]">
        <div><p className="eyebrow text-primary">Buying checklist</p><h2 className="mt-2 font-display text-4xl">Questions worth asking first</h2></div>
        <ol className="max-w-3xl space-y-4 text-sm leading-7 text-muted-foreground">{guide.checklist.map((item, index) => <li key={item} className="grid grid-cols-[2rem_1fr] gap-3 border-t border-border pt-3"><span className="font-display text-xl text-primary">{index + 1}</span><span>{item}</span></li>)}</ol>
      </Container>
    </section>

    <section className="py-14">
      <Container className="grid gap-8 lg:grid-cols-[15rem_1fr]">
        <div><p className="eyebrow text-primary">Keep reading</p><h2 className="mt-2 font-display text-4xl">The stories behind the shelf</h2></div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3">{guide.relatedLinks.map((link) => <a key={link.href} href={link.href} className="group border-b border-border py-6 sm:px-5 sm:border-l"><strong className="block font-display text-2xl leading-tight group-hover:text-primary">{link.label}</strong><span className="mt-3 block text-sm leading-6 text-muted-foreground">{link.description}</span><span className="mt-4 block text-xs font-semibold uppercase tracking-[0.14em] text-primary">Read next →</span></a>)}</div>
      </Container>
    </section>
  </>;
}
