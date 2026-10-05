import { Link } from "@tanstack/react-router";

import { Container } from "@/components/layout/Container";
import { SchoolSupplyPartners } from "@/components/monetization/SchoolSupplyPartners";
import { hideFailedImageContainer } from "@/lib/image-fallback";

const siteUrl = "https://texasdefined.com";
const canonicalUrl = `${siteUrl}/texas-homecoming-mums`;
const modifiedDate = "2026-10-05";

const heroImage = {
  src: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Goldthwaite_High_School_Homecoming_Mum.jpg?width=1400",
  alt: "Goldthwaite High School homecoming mum with ribbons, charms and school colors",
  caption: "A 2023 Texas high-school homecoming mum shows how a chrysanthemum-centered corsage became a large, personalized display.",
  credit: "Sillyputty1967 · CC BY-SA 4.0 · Wikimedia Commons",
  sourceHref: "https://commons.wikimedia.org/wiki/File:Goldthwaite_High_School_Homecoming_Mum.jpg",
};

const gradeCards = [
  {
    grade: "Freshman",
    note: "Usually school colors",
    detail: "Many schools keep freshman mums comparatively simple, but local custom controls. Some students start with a single flower and shorter ribbon streamers.",
  },
  {
    grade: "Sophomore",
    note: "School colors, more personalization",
    detail: "Sophomore mums often add more braids, charms, names and activity references while still following the school's dominant color scheme.",
  },
  {
    grade: "Junior",
    note: "School colors, larger designs",
    detail: "Junior mums may become more elaborate, with extra flowers, longer ribbons and more detailed activity or relationship references.",
  },
  {
    grade: "Senior",
    note: "Often white with metallic accents",
    detail: "White-and-gold or white-and-silver senior mums are common in many Texas schools, but this is tradition rather than a statewide rule.",
  },
];

const typeCards = [
  {
    title: "Single mum",
    text: "One central flower with ribbons and personalized decorations. It can still be large, but the design is built around a single main rosette.",
  },
  {
    title: "Double or triple mum",
    text: "Two or three flowers create a wider centerpiece and more room for braids, names, charms and themed sections.",
  },
  {
    title: "Senior mum",
    text: "Often shifts away from normal school colors toward white plus metallic accents, especially gold or silver, depending on school custom.",
  },
  {
    title: "Garter",
    text: "An arm-worn counterpart to the shoulder or chest-worn mum. Garters can carry the same names, charms, ribbons and school-spirit details.",
  },
];

const timeline = [
  {
    label: "Early tradition",
    title: "A real chrysanthemum corsage",
    text: "Homecoming mums began as comparatively simple flower corsages associated with school homecoming celebrations.",
  },
  {
    label: "Mid-century growth",
    title: "Ribbon becomes the message",
    text: "Streamers, names, school colors and decorative touches gradually became as important as the flower itself.",
  },
  {
    label: "Late 20th century",
    title: "Artificial flowers unlock scale",
    text: "Synthetic chrysanthemums and craft materials made it practical to build larger, longer-lasting pieces with multiple layers and heavier decoration.",
  },
  {
    label: "Today",
    title: "A wearable scrapbook",
    text: "Modern mums can record a student's clubs, sports, band, cheer, friends, relationships, class year, mascot and private jokes in one elaborate object.",
  },
];

const faqs = [
  {
    question: "What is a Texas homecoming mum?",
    answer: "It is a decorated chrysanthemum-style homecoming corsage surrounded by ribbons, braids, bells, charms, names and school-spirit decorations. Modern versions are usually built with artificial flowers so they can be larger and kept as mementos.",
  },
  {
    question: "Why are Texas homecoming mums so big?",
    answer: "The tradition evolved from simple corsages into highly personalized displays. School spirit, friendly competition, craft culture and the ability to use artificial materials all encouraged larger designs.",
  },
  {
    question: "Why are senior mums often white?",
    answer: "Many Texas schools use white mums with gold or silver accents for seniors as a class-year tradition. It is common, not universal, and students should follow their own school's custom.",
  },
  {
    question: "What is the difference between a mum and a garter?",
    answer: "A mum is usually worn from the shoulder or chest, while a garter is generally worn on the arm. Both can use the same decorative language: ribbons, names, charms, braids, bells and school colors.",
  },
  {
    question: "Who buys a homecoming mum?",
    answer: "There is no single modern rule. A date may buy one, families may order one, friends may exchange them, and many students or parents make their own.",
  },
  {
    question: "When do students wear homecoming mums?",
    answer: "Students usually wear them during homecoming week, especially on the school day connected to the homecoming game or pep rally. Exact timing varies by school.",
  },
  {
    question: "Do girls have to wear mums and boys garters?",
    answer: "No. That is an older convention, not a requirement. Modern practice is more flexible, and students can follow personal preference and local school custom.",
  },
  {
    question: "How much does a homecoming mum cost?",
    answer: "Cost varies enormously. A simple DIY mum may use only tens of dollars in materials, while custom pieces can cost more than $100 and highly elaborate designs can run into several hundred dollars or more.",
  },
  {
    question: "How long does it take to make a homecoming mum?",
    answer: "A simple design can be assembled relatively quickly, while elaborate custom mums with braids, lettering, lights and layered decorations can require many hours of work.",
  },
  {
    question: "What do the ribbons and charms mean?",
    answer: "They often represent school colors, class year, names, sports, band, cheer, drill team, clubs, mascots, relationships and personal interests. There is no statewide code.",
  },
  {
    question: "Can you make a homecoming mum yourself?",
    answer: "Yes. DIY mum-making is a major part of the tradition. A practical build starts with a sturdy backing and flower, then adds ribbons, braids, names, charms and weight-balanced hanging pieces.",
  },
  {
    question: "How should a homecoming mum be stored?",
    answer: "Keep it dry, support the backing so the ribbons are not crushed, remove batteries from lighted elements when practical, and use a large box or shadow-box frame if it will be preserved long term.",
  },
  {
    question: "Are homecoming mums only a Texas tradition?",
    answer: "Homecoming corsages exist outside Texas, but the giant ribbon-heavy mum is especially associated with Texas high-school culture and has developed an unusually visible craft tradition in the state.",
  },
  {
    question: "Do colleges use homecoming mums?",
    answer: "The oversized mum tradition is most strongly associated with Texas high schools. Some college communities may reference or revive the custom, but it is not as standardized or widespread at the college level.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article",
      "@id": `${canonicalUrl}#article`,
      headline: "Texas Homecoming Mums",
      description: "A complete guide to Texas homecoming mums: history, meaning, colors, grade-level traditions, garters, costs, DIY construction, preservation and modern customs.",
      url: canonicalUrl,
      dateModified: modifiedDate,
      mainEntityOfPage: { "@id": `${canonicalUrl}#page` },
      publisher: { "@type": "Organization", name: "TexasDefined", url: siteUrl },
      articleSection: "Texas traditions",
      image: heroImage.src,
      about: [
        "Texas homecoming mums",
        "Homecoming garters",
        "Texas high school traditions",
        "School spirit",
        "Homecoming",
      ],
      citation: [
        "https://texancultures.utsa.edu/blog/2026-03/keeping-texas-traditions",
        "https://www.themumqueen.com/about",
        "https://www.houstonchronicle.com/explained/article/meet-mum-queen-ruling-texas-homecoming-tradition-21041372.php",
        "https://www.houstonchronicle.com/news/houston-texas/houston/article/history-texas-homecoming-mums-19730689.php",
      ],
    },
    {
      "@type": "WebPage",
      "@id": `${canonicalUrl}#page`,
      url: canonicalUrl,
      name: "Texas Homecoming Mums",
      description: "History, meaning, colors, grade-level traditions, garters, costs and DIY guidance for Texas homecoming mums.",
      mainEntity: { "@id": `${canonicalUrl}#article` },
      breadcrumb: { "@id": `${canonicalUrl}#breadcrumb` },
      isPartOf: { "@type": "WebSite", "@id": `${siteUrl}/#website`, name: "TexasDefined", url: siteUrl },
    },
    {
      "@type": "BreadcrumbList",
      "@id": `${canonicalUrl}#breadcrumb`,
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Front page", item: `${siteUrl}/` },
        { "@type": "ListItem", position: 2, name: "Things That Define Texas", item: `${siteUrl}/things-unique-to-texas` },
        { "@type": "ListItem", position: 3, name: "Texas Homecoming Mums", item: canonicalUrl },
      ],
    },
    {
      "@type": "FAQPage",
      "@id": `${canonicalUrl}#faq`,
      mainEntity: faqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: { "@type": "Answer", text: faq.answer },
      })),
    },
  ],
};

function SectionHeading({ eyebrow, title, intro }: { eyebrow: string; title: string; intro?: string }) {
  return <header className="max-w-3xl">
    <p className="eyebrow text-primary">{eyebrow}</p>
    <h2 className="mt-2 font-display text-4xl leading-tight sm:text-5xl">{title}</h2>
    {intro ? <p className="mt-4 text-base leading-8 text-muted-foreground">{intro}</p> : null}
  </header>;
}

export function TexasHomecomingMumsGuide() {
  return <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    <Container className="pb-16 pt-10 sm:pb-24 sm:pt-14">
      <article className="mx-auto max-w-6xl">
        <nav aria-label="Breadcrumb" className="border-b border-border pb-4 text-xs uppercase tracking-[0.14em] text-muted-foreground">
          <Link to="/" className="hover:text-foreground">Front page</Link>
          <span aria-hidden="true" className="mx-2">/</span>
          <Link to="/things-unique-to-texas" className="hover:text-foreground">Things That Define Texas</Link>
          <span aria-hidden="true" className="mx-2">/</span>
          <span aria-current="page" className="text-foreground">Texas Homecoming Mums</span>
        </nav>

        <header className="grid gap-8 border-b border-border py-10 lg:grid-cols-[minmax(0,1fr)_22rem] lg:items-end sm:py-14">
          <div>
            <p className="eyebrow text-primary">Ribbon, bells and Texas school tradition</p>
            <h1 className="mt-3 max-w-4xl font-display text-5xl leading-[0.95] sm:text-7xl">Texas Homecoming Mums</h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-muted-foreground sm:text-xl">
              How a chrysanthemum corsage became a giant wearable scrapbook of school colors, friendships, activities, class year and Texas homecoming culture.
            </p>
          </div>
          <div className="border-l-2 border-primary pl-5 text-sm leading-7 text-muted-foreground">
            <strong className="block text-foreground">Updated October 5, 2026</strong>
            This guide separates common statewide patterns from traditions that vary by school, district and community.
          </div>
        </header>

        <section className="grid gap-8 border-b border-border py-8 lg:grid-cols-[minmax(0,1fr)_22rem]" aria-labelledby="quick-answer">
          <div>
            <p className="eyebrow text-primary">Quick answer</p>
            <h2 id="quick-answer" className="mt-2 font-display text-3xl">What is a Texas homecoming mum?</h2>
            <p className="mt-4 max-w-4xl text-base leading-8">
              A Texas homecoming mum is a decorated chrysanthemum-style centerpiece surrounded by ribbons, braids, bells, charms, names and school-spirit details. It grew from a much smaller flower corsage into an elaborate keepsake, usually worn during high-school homecoming week. A related arm-worn version is called a garter.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-px overflow-hidden border border-border bg-border text-sm">
            <div className="bg-background p-4"><strong className="block font-display text-2xl">Mum</strong><span className="mt-1 block text-muted-foreground">Usually shoulder or chest worn</span></div>
            <div className="bg-background p-4"><strong className="block font-display text-2xl">Garter</strong><span className="mt-1 block text-muted-foreground">Usually worn on the arm</span></div>
            <div className="bg-background p-4"><strong className="block font-display text-2xl">No code</strong><span className="mt-1 block text-muted-foreground">Traditions vary by school</span></div>
            <div className="bg-background p-4"><strong className="block font-display text-2xl">Keepsake</strong><span className="mt-1 block text-muted-foreground">Often saved after homecoming</span></div>
          </div>
        </section>

        <figure className="border-b border-border py-8">
          <img
            src={heroImage.src}
            alt={heroImage.alt}
            className="mx-auto block max-h-[46rem] max-w-full object-contain"
            loading="eager"
            fetchPriority="high"
            onError={(event) => hideFailedImageContainer(event.currentTarget)}
          />
          <figcaption className="mx-auto mt-3 max-w-3xl text-xs leading-5 text-muted-foreground">
            {heroImage.caption}{" "}
            <a href={heroImage.sourceHref} target="_blank" rel="noreferrer noopener" className="underline decoration-border underline-offset-2">{heroImage.credit}</a>
          </figcaption>
        </figure>

        <section className="border-b border-border py-12">
          <SectionHeading
            eyebrow="How it evolved"
            title="From flower corsage to wearable scrapbook"
            intro="There is no single moment when a modest corsage became the giant modern Texas mum. The useful story is an evolution in materials, scale and personalization."
          />
          <div className="mt-8 grid gap-px overflow-hidden border border-border bg-border md:grid-cols-2 xl:grid-cols-4">
            {timeline.map((item) => <div key={item.title} className="bg-background p-6">
              <p className="eyebrow text-primary">{item.label}</p>
              <h3 className="mt-2 font-display text-2xl leading-tight">{item.title}</h3>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">{item.text}</p>
            </div>)}
          </div>
        </section>

        <section className="grid gap-8 border-b border-border py-12 lg:grid-cols-[14rem_minmax(0,1fr)]">
          <div>
            <p className="eyebrow text-primary">Why Texas?</p>
            <h2 className="mt-2 font-display text-3xl leading-tight">Why the tradition became so elaborate here</h2>
          </div>
          <div className="max-w-3xl space-y-5 text-base leading-8 text-muted-foreground">
            <p>Homecoming already brings together football, marching band, cheer, drill team, alumni, pep rallies and school identity. In many Texas communities those activities occupy a large public role, giving the mum a natural place to become more visible and personalized.</p>
            <p>Artificial flowers and craft materials removed the practical limits of a live corsage. Once the flower no longer had to survive as a flower, makers could add longer ribbons, multiple rosettes, braids, stuffed mascots, lights, bells, lettering and entire themed sections.</p>
            <p>The result is less a corsage than a wearable record of the student’s school life. Bigger is not automatically better, but scale became part of the visual language of Texas homecoming.</p>
            <div className="flex flex-wrap gap-x-6 gap-y-3 pt-1 text-sm font-semibold">
              <Link to="/sports/friday-night-lights" className="border-b border-primary text-primary">Friday Night Lights, Defined</Link>
              <Link to="/sports-venues/high-school-football" className="border-b border-primary text-primary">Texas high-school football</Link>
            </div>
          </div>
        </section>

        <section className="border-b border-border py-12">
          <SectionHeading
            eyebrow="Grade-level traditions"
            title="Freshman, sophomore, junior and senior mums"
            intro="Many schools build class-year customs around color and scale, but none of these conventions are statewide rules. Local tradition wins."
          />
          <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {gradeCards.map((card) => <div key={card.grade} className="border border-border p-6">
              <p className="eyebrow text-primary">{card.note}</p>
              <h3 className="mt-2 font-display text-3xl">{card.grade}</h3>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">{card.detail}</p>
            </div>)}
          </div>
          <p className="mt-5 max-w-3xl text-sm leading-7 text-muted-foreground">
            Before ordering an expensive custom mum, check photos from your own school’s recent homecomings or ask students, parents or the maker what the local senior-color convention is.
          </p>
        </section>

        <section className="grid gap-8 border-b border-border py-12 lg:grid-cols-[14rem_minmax(0,1fr)]">
          <div>
            <p className="eyebrow text-primary">Anatomy</p>
            <h2 className="mt-2 font-display text-3xl leading-tight">What all the parts are doing</h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              ["Backing", "The structural base. It carries the flower, ribbon weight and attachment hardware."],
              ["Flower or rosette", "The visual center, usually an artificial chrysanthemum-style bloom in modern mums."],
              ["Ribbons", "School colors, metallic accents, names, class year, messages and long streamers."],
              ["Braids", "Decorative ribbon work that adds texture, craft skill and visual movement."],
              ["Charms", "Sports, clubs, band, cheer, mascots, graduation year, relationships and hobbies."],
              ["Bells and movement", "Sound and motion make the mum more noticeable during pep rallies and crowded hallways."],
              ["Stuffed mascots", "Small mascot figures or themed objects turn the mum into a personalized school-spirit display."],
              ["Lights", "LED elements appear on some modern custom mums; battery placement and weight matter."],
            ].map(([title, text]) => <div key={title} className="border-l-2 border-primary/40 pl-5">
              <h3 className="font-display text-2xl">{title}</h3>
              <p className="mt-2 text-sm leading-7 text-muted-foreground">{text}</p>
            </div>)}
          </div>
        </section>

        <section className="border-b border-border py-12">
          <SectionHeading
            eyebrow="Common formats"
            title="Single, double, triple, senior mum or garter"
            intro="The number of flowers changes the footprint of the design, while a garter changes where it is worn."
          />
          <div className="mt-8 grid gap-px overflow-hidden border border-border bg-border md:grid-cols-2">
            {typeCards.map((card) => <div key={card.title} className="bg-background p-6">
              <h3 className="font-display text-3xl">{card.title}</h3>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">{card.text}</p>
            </div>)}
          </div>
        </section>

        <section className="grid gap-8 border-b border-border py-12 lg:grid-cols-[14rem_minmax(0,1fr)]">
          <div>
            <p className="eyebrow text-primary">Cost</p>
            <h2 className="mt-2 font-display text-3xl leading-tight">How much does a homecoming mum cost?</h2>
          </div>
          <div className="max-w-3xl space-y-5 text-base leading-8 text-muted-foreground">
            <p>There is no standard price because materials, size and labor vary so much. A simple DIY mum can be built from materials costing only tens of dollars. Custom designs commonly move above $100, and highly elaborate pieces with multiple flowers, extensive braiding, specialty lettering, lights or premium decorations can reach several hundred dollars or more.</p>
            <p>Labor is a major part of the price. Experienced makers may spend hours building braids, cutting and layering ribbons, lettering names, balancing weight and assembling a piece that can survive a full school day.</p>
            <p>For a useful quote, give the maker the school, grade, colors, deadline, wearer’s name, activities, preferred size and budget before asking for design options.</p>
          </div>
        </section>

        <section className="grid gap-8 border-b border-border py-12 lg:grid-cols-[14rem_minmax(0,1fr)]">
          <div>
            <p className="eyebrow text-primary">Modern etiquette</p>
            <h2 className="mt-2 font-display text-3xl leading-tight">Who gives whom a mum?</h2>
          </div>
          <div className="max-w-3xl space-y-5 text-base leading-8 text-muted-foreground">
            <p>Older descriptions often reduce the tradition to a boy giving a mum to a girl and receiving a garter in return. That still happens, but it is not a complete description of modern Texas homecoming.</p>
            <p>Families order mums, students make their own, friends exchange them, dates exchange them and some students simply choose the format they prefer. The tradition is flexible enough to preserve the craft without forcing students into an outdated rule about who must wear what.</p>
            <p>Timing varies too. Most students wear mums during homecoming week, especially on the school day tied to the homecoming game, pep rally or spirit activities.</p>
          </div>
        </section>

        <section className="border-b border-border py-12">
          <SectionHeading
            eyebrow="DIY"
            title="How a homecoming mum is built"
            intro="The easiest way to understand a mum is as a load-bearing craft project: build a strong center first, then add decoration without making the finished piece impossible to wear."
          />
          <ol className="mt-8 grid gap-4 md:grid-cols-2">
            {[
              ["Start with a sturdy backing", "Use a firm base that can support the flower, ribbon layers and attachment points."],
              ["Mount the main flower", "Center the chrysanthemum-style bloom or rosette and make sure the attachment is secure before adding weight."],
              ["Build the ribbon field", "Layer school colors, metallics, names and plain streamers so the design has visual depth."],
              ["Add braids and specialty pieces", "Use looped, braided or woven ribbon elements as accents instead of covering every inch with equal visual weight."],
              ["Add names, class year and activities", "Lettering and charms are what turn a generic mum into a personal record of the student."],
              ["Balance bells, mascots and lights", "Heavy objects should be distributed so the mum does not twist or pull sharply on one side."],
              ["Test how it hangs", "Have the wearer stand, walk and sit before the final day. Reposition anything that hits the face, drags or pulls uncomfortably."],
              ["Photograph it before homecoming", "Large mums can be difficult to preserve perfectly. A good photograph captures the details before the piece is worn all day."],
            ].map(([title, text], index) => <li key={title} className="border border-border p-6">
              <p className="eyebrow text-primary">Step {index + 1}</p>
              <h3 className="mt-2 font-display text-2xl">{title}</h3>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">{text}</p>
            </li>)}
          </ol>
        </section>

        <section className="grid gap-8 border-b border-border py-12 lg:grid-cols-[14rem_minmax(0,1fr)]">
          <div>
            <p className="eyebrow text-primary">Wearability</p>
            <h2 className="mt-2 font-display text-3xl leading-tight">Weight, safety and school rules</h2>
          </div>
          <div className="max-w-3xl space-y-5 text-base leading-8 text-muted-foreground">
            <p>Very large mums can become heavy and awkward. The backing and attachment method should spread the load, and the finished piece should not interfere with walking, stairs, classroom seating or visibility.</p>
            <p>Some schools may restrict extremely large designs, noisy accessories or lights. Check current campus guidance rather than assuming last year’s rules still apply.</p>
            <p>If a mum is uncomfortable during a test fitting, reduce weight or change the attachment instead of expecting the wearer to tolerate it for an entire school day.</p>
          </div>
        </section>

        <section className="grid gap-8 border-b border-border py-12 lg:grid-cols-[14rem_minmax(0,1fr)]">
          <div>
            <p className="eyebrow text-primary">After homecoming</p>
            <h2 className="mt-2 font-display text-3xl leading-tight">How to preserve a mum</h2>
          </div>
          <div className="max-w-3xl space-y-5 text-base leading-8 text-muted-foreground">
            <p>Modern artificial mums are built to last longer than the original flower corsages, which is why many families keep them for years. The main risks are crushed ribbons, dust, moisture and battery leakage from lighted accessories.</p>
            <ul className="grid gap-3 border-l border-primary/40 pl-5 text-sm leading-7 text-foreground">
              <li>Let the mum dry completely before boxing it if it was exposed to rain or heavy humidity.</li>
              <li>Support the backing so the weight is not hanging from one pin or loop during storage.</li>
              <li>Use a large shallow box so ribbons can lie naturally instead of being tightly folded.</li>
              <li>Remove batteries from removable light modules before long-term storage.</li>
              <li>For a display piece, a deep shadow box can protect the mum while keeping the front visible.</li>
            </ul>
          </div>
        </section>

        <section className="grid gap-8 border-b border-border py-12 lg:grid-cols-[14rem_minmax(0,1fr)]">
          <div>
            <p className="eyebrow text-primary">Local tradition</p>
            <h2 className="mt-2 font-display text-3xl leading-tight">There is no statewide rulebook</h2>
          </div>
          <div className="max-w-3xl space-y-5 text-base leading-8 text-muted-foreground">
            <p>One of the easiest mistakes in explaining Texas mums is turning a local custom into a statewide law. Schools differ on colors, senior conventions, size, exchange customs and what students consider traditional.</p>
            <p>That variation is part of the culture. A mum is supposed to look specific to a student and school, not like a standardized product issued across Texas.</p>
            <p>When in doubt, use recent local examples as the authority for style and the school itself as the authority for campus rules.</p>
          </div>
        </section>

        <section className="grid gap-8 border-b border-border py-12 lg:grid-cols-[14rem_minmax(0,1fr)]">
          <div>
            <p className="eyebrow text-primary">Maker profile</p>
            <h2 className="mt-2 font-display text-3xl leading-tight">Spring’s Mum Queen: Elizabeth Cleaver</h2>
          </div>
          <div className="max-w-3xl space-y-5 text-base leading-8 text-muted-foreground">
            <p>Elizabeth Cleaver of Spring, known as The Mum Queen, is one of the best-known professional makers in the Texas homecoming-mum world. Cleaver says she has made mums and garters for more than 35 years, turning a family-and-friends craft into a seasonal business with multigenerational customers.</p>
            <p>Her work is useful because it shows that the tradition is not only about the finished object. It supports a network of makers, craft suppliers, family techniques and mentoring communities that pass construction methods from one homecoming season to the next.</p>
            <div className="flex flex-wrap gap-x-6 gap-y-3 pt-1 text-sm font-semibold">
              <Link to="/article/mum-queen-spring-texas-homecoming-mums" className="border-b border-primary text-primary">The Mum Queen in Spring</Link>
              <Link to="/county/harris" className="border-b border-primary text-primary">Explore Harris County</Link>
            </div>
          </div>
        </section>

        <SchoolSupplyPartners context="homecoming" />

        <section className="border-b border-border py-12" aria-labelledby="faq">
          <SectionHeading
            eyebrow="FAQ"
            title="Texas homecoming mum questions"
            intro="Short answers to the questions that usually come up when someone encounters the tradition for the first time."
          />
          <div id="faq" className="mt-8 divide-y divide-border border-y border-border">
            {faqs.map((faq) => <details key={faq.question} className="group py-5">
              <summary className="cursor-pointer list-none pr-8 font-display text-2xl leading-tight marker:hidden">
                {faq.question}
              </summary>
              <p className="mt-3 max-w-3xl text-sm leading-7 text-muted-foreground">{faq.answer}</p>
            </details>)}
          </div>
        </section>

        <section className="border-b border-border py-12" aria-labelledby="sources">
          <p className="eyebrow text-primary">Sources</p>
          <h2 id="sources" className="mt-2 font-display text-4xl">Where the historical claims come from</h2>
          <p className="mt-4 max-w-3xl text-sm leading-7 text-muted-foreground">
            These sources support the history and craft context. School-specific customs, current prices and campus rules can change, so verify those locally.
          </p>
          <ul className="mt-6 divide-y divide-border border-y border-border">
            <li className="py-4">
              <a href="https://texancultures.utsa.edu/blog/2026-03/keeping-texas-traditions" target="_blank" rel="noreferrer noopener" className="font-semibold text-primary underline decoration-primary/40 underline-offset-4">UTSA Institute of Texan Cultures — Keeping Texas Traditions ↗</a>
              <p className="mt-1 text-sm leading-6 text-muted-foreground">Documents the evolution from chrysanthemum corsage to elaborate Texas mum and the craft networks that sustain the tradition.</p>
            </li>
            <li className="py-4">
              <a href="https://www.themumqueen.com/about" target="_blank" rel="noreferrer noopener" className="font-semibold text-primary underline decoration-primary/40 underline-offset-4">The Mum Queen — About Elizabeth Cleaver ↗</a>
              <p className="mt-1 text-sm leading-6 text-muted-foreground">Cleaver’s own account of more than 35 years making mums and garters in the Spring area.</p>
            </li>
            <li className="py-4">
              <a href="https://www.houstonchronicle.com/explained/article/meet-mum-queen-ruling-texas-homecoming-tradition-21041372.php" target="_blank" rel="noreferrer noopener" className="font-semibold text-primary underline decoration-primary/40 underline-offset-4">Houston Chronicle — Meet the Mum Queen ↗</a>
              <p className="mt-1 text-sm leading-6 text-muted-foreground">Profiles Cleaver’s studio, seasonal workload and multigenerational customers.</p>
            </li>
            <li className="py-4">
              <a href="https://www.houstonchronicle.com/news/houston-texas/houston/article/history-texas-homecoming-mums-19730689.php" target="_blank" rel="noreferrer noopener" className="font-semibold text-primary underline decoration-primary/40 underline-offset-4">Houston Chronicle — How Texas homecoming mums evolved ↗</a>
              <p className="mt-1 text-sm leading-6 text-muted-foreground">Provides broader history and reporting on modern mum and garter conventions.</p>
            </li>
          </ul>
        </section>

        <section className="py-12" aria-labelledby="related-reading">
          <p className="eyebrow text-primary">Keep exploring</p>
          <h2 id="related-reading" className="mt-2 font-display text-4xl">Related TexasDefined guides</h2>
          <div className="mt-6 grid gap-px overflow-hidden border border-border bg-border md:grid-cols-3">
            {[
              ["/article/mum-queen-spring-texas-homecoming-mums", "The Mum Queen in Spring", "A practical maker guide to custom mums, garters, ordering and the Spring-area craft business."],
              ["/sports/friday-night-lights", "Friday Night Lights, Defined", "See the game-night culture, marching bands, school identity and season rituals surrounding Texas high-school football."],
              ["/sports-venues/high-school-football", "Texas high-school football", "Explore the stadiums and Friday-night settings that form the backdrop for homecoming."],
              ["/things-unique-to-texas/culture-music", "Texas cultural traditions", "Browse school rituals, music, rodeos and community customs that define everyday Texas culture."],
              ["/article/texas-high-school-football-newcomers", "High-school football for newcomers", "Understand classifications, game-night culture and what to expect if Texas school traditions are new to you."],
              ["/county/harris", "Harris County", "Connect the Spring-area mum tradition to the larger Houston-region county guide."],
            ].map(([href, label, description]) => <Link key={href} to={href} className="group bg-background p-6">
              <strong className="font-display text-2xl leading-tight group-hover:text-primary">{label}</strong>
              <span className="mt-3 block text-sm leading-6 text-muted-foreground">{description}</span>
              <span className="mt-5 block text-sm font-semibold text-primary">Read next →</span>
            </Link>)}
          </div>
        </section>
      </article>
    </Container>
  </>;
}
