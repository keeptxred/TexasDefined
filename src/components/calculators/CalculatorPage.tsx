import { Link } from '@tanstack/react-router';
import { Container } from '@/components/layout/Container';

export function CalculatorPage({ eyebrow, title, description, children }: { eyebrow: string; title: string; description: string; children: React.ReactNode }) {
  return <Container className="py-16 sm:py-24"><article className="mx-auto max-w-5xl"><p className="eyebrow text-primary">{eyebrow}</p><h1 className="mt-3 font-display text-4xl sm:text-6xl">{title}</h1><p className="mt-5 max-w-3xl text-lg leading-8 text-muted-foreground">{description}</p>{children}<div className="mt-10 flex flex-wrap gap-4 text-sm font-medium"><Link to="/decide/financial-tools" className="underline">All financial tools</Link><Link to="/moving-to-texas" className="underline">Moving to Texas</Link><Link to="/browse/cities" className="underline">Texas city directory</Link></div></article></Container>;
}
