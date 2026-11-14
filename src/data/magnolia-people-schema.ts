/** Independent subject entities; do not use Person for TexasDefined institutional bylines. */
export function magnoliaPeopleSchemaForArticle(articleUrl: string) {
  return [
    {
      "@type": "Person",
      "@id": `${articleUrl}#chip-gaines`,
      name: "Chip Gaines",
      description: "Entrepreneur, television personality and Magnolia co-founder based in Waco, Texas",
      sameAs: "https://magnolia.com/blogs/article/about-chip-and-joanna",
      subjectOf: { "@id": articleUrl },
    },
    {
      "@type": "Person",
      "@id": `${articleUrl}#joanna-gaines`,
      name: "Joanna Gaines",
      description: "Designer, author, television personality and Magnolia co-founder based in Waco, Texas",
      sameAs: "https://magnolia.com/blogs/article/about-chip-and-joanna",
      subjectOf: { "@id": articleUrl },
    },
  ];
}
