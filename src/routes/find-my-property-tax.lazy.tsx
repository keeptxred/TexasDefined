import { createLazyFileRoute } from '@tanstack/react-router';
import { RelocationServiceFinder } from '@/components/relocation/RelocationServiceFinder';

export const Route = createLazyFileRoute('/find-my-property-tax')({
  component: () => <RelocationServiceFinder kind="property-tax" />,
});
