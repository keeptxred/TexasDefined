import { createLazyFileRoute } from '@tanstack/react-router';
import { RelocationServiceFinder } from '@/components/relocation/RelocationServiceFinder';

export const Route = createLazyFileRoute('/find-my-emergency-services')({
  component: () => <RelocationServiceFinder kind="emergency" />,
});
