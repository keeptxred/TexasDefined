/** Single source for visible quick answers and matching FAQ structured data. */
export function buildFishingLakeQuickAnswers(count: number) {
  return [
    { question: "How many complete Texas fishing lake guides are here?", answer: `TexasDefined currently publishes ${count} complete fishing-lake guides spanning East Texas, North and Central Texas, the Hill Country, South Texas and the Rio Grande border region.` },
    { question: "Are these ranked as the best fishing lakes in Texas?", answer: "No. This directory compares completed, source-backed TexasDefined guides. It does not claim a universal best-lake ranking, and the collection will expand as more lake profiles clear the same sourcing standard." },
    { question: "Can I compare what fish each lake is known for?", answer: "Yes. Each lake card shows the strongest source-backed lake-to-species relationships currently in the fishing catalog, while the full lake guide explains seasonal patterns and techniques without presenting them as a live fishing report." },
    { question: "Where should I check current regulations and lake conditions?", answer: "Open the individual lake guide and follow its official source links. TexasDefined keeps current regulations, water levels, access restrictions and fishing reports separate from durable lake facts because those details can change." },
  ];
}
