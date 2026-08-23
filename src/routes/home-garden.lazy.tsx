import { createLazyFileRoute } from "@tanstack/react-router";

import bluebonnets from "@/assets/bluebonnets.jpg";
import { CategoryPage } from "@/components/editorial/CategoryPage";

const description = "Native plants that survive August, porches made for evening and rooms designed for Texas heat, light and everyday living.";
const imageAlt = "Bluebonnets running to a fence line in spring";

export const Route = createLazyFileRoute("/home-garden")({
  component: HomeGardenPage,
});

function HomeGardenPage() {
  return <CategoryPage category="home-garden" eyebrow="Home & Garden" title="A distinctly Texas way of living at home" intro={description} image={{ src: bluebonnets, alt: imageAlt, width: 1600, height: 1067 }} />;
}
