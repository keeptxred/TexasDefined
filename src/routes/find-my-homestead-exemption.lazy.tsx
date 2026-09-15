import { createLazyFileRoute } from '@tanstack/react-router';
import { RelocationServiceFinder } from '@/components/relocation/RelocationServiceFinder';

export const Route = createLazyFileRoute('/find-my-homestead-exemption')({
  component: () => <RelocationServiceFinder kind="homestead" />,
});
