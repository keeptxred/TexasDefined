import { Container } from "@/components/layout/Container";

const official2026Report =
  "https://bigtex.com/the-2026-state-fair-of-texas-welcomes-nearly-2-1-million-fairgoers-fairgoers-celebrated-140-years-of-texas-tradition-while-helping-the-state-fair-support-students-strengthen-communities-and-invest/";

// Figures are attributed to the Fair's October 18, 2026 closing report.
// Keep estimated, approximate, cumulative and year-specific figures distinct.
const headlineFigures = [
  { figure: "Nearly 2.1 million", label: "2026 fairgoers across 24 days" },
  { figure: "More than $600 million", label: "Fair-estimated annual regional economic activity" },
  { figure: "More than $2.7 million", label: "Raised for 2026 youth livestock auction and scholarship programs" },
  { figure: "About 450,000", label: "Fletcher's Original Corny Dogs enjoyed in 2026" },
] as const;

const details = [
  {
    title: "Crowds and experiences",
    facts: [
      "October 10, the Red River Rivalry game day, was the busiest of the Fair: more than 203,000 visitors.",
      "More than 461,000 printed visitor guides were distributed during the season.",
      "The 24-day Fair offered more than 3,000 activities and performances by over 150 Texas music artists.",
      "The State Fair Classic and Red River Rivalry drew more than 135,000 football fans combined to the Cotton Bowl.",
    ],
  },
  {
    title: "Community and education",
    facts: [
      "An estimated 110,655 pounds of food collected during the Fair went to the North Texas Food Bank.",
      "More than 1.3 million free admission tickets were distributed to North Texas pre-K–8 students, and over 296,000 teachers received admission vouchers.",
      "The Big Tex Scholarship Program awarded more than $1.2 million in new college scholarships to 103 students in 2026.",
      "The Fair reports investing more than $92 million in Fair Park projects since 2015; this is a cumulative figure, not a 2026-only expenditure.",
    ],
  },
  {
    title: "Agriculture, culture and the Midway",
    facts: [
      "Livestock and agriculture programming received more than 14,505 livestock and contest entries; the birthing barn recorded over 90 animal births.",
      "The Grand Champion Market Steer sold for $227,000, a new State Fair record according to organizers.",
      "Fairgoers won approximately 500,000 Midway prizes with an estimated combined value of $1.8 million.",
      "Big Tex turned 74 on October 4, when a Texas Historical Commission marker was unveiled in his honor.",
    ],
  },
] as const;

export function StateFair2026Results() {
  return (
    <section className="border-b border-border bg-muted/20 py-12" data-state-fair-2026-results aria-labelledby="state-fair-2026-results-heading">
      <Container>
        <div className="max-w-5xl">
          <p className="eyebrow text-primary">Official 2026 season recap</p>
          <h2 id="state-fair-2026-results-heading" className="mt-2 font-display text-3xl md:text-4xl">
            2026 Fair by the numbers
          </h2>
          <p className="mt-4 max-w-3xl leading-7 text-muted-foreground">
            The State Fair of Texas closed October 18, 2026, after 24 days at Fair Park.
            These figures come from its October 18 closing report. They describe the completed
            2026 season, except where a number is explicitly an annual estimate or a cumulative total.
          </p>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {headlineFigures.map((item) => (
            <div key={item.label} className="border border-border bg-background p-5">
              <p className="font-display text-2xl font-semibold leading-tight">{item.figure}</p>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">{item.label}</p>
            </div>
          ))}
        </div>

        <figure className="mt-8 max-w-5xl border border-border bg-background" data-state-fair-recap-email-photo>
          <img
            src="https://d31hzlhk6di2h5.cloudfront.net/20261018/48/27/d5/98/5c876f5dfde37488f8634053.JPG"
            alt="Photograph accompanying the State Fair of Texas October 18, 2026, closing-season press release"
            loading="lazy"
            decoding="async"
            referrerPolicy="no-referrer"
            className="w-full h-auto"
          />
          <figcaption className="p-5 text-sm leading-6 text-muted-foreground">
            Photo Credit: State Fair of Texas. Official image distributed with the October 18, 2026, State Fair recap.
            View more imagery and the publication terms in the{" "}
            <a
              href="https://bigtex.com/about-us/media-room/photo-gallery/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-primary underline underline-offset-4"
            >
              State Fair media photo gallery ↗
            </a>.
          </figcaption>
        </figure>

        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          {details.map((group) => (
            <div key={group.title} className="border border-border bg-background p-5">
              <h3 className="font-display text-xl">{group.title}</h3>
              <ul className="mt-4 list-disc space-y-3 pl-5 text-sm leading-7 text-muted-foreground">
                {group.facts.map((fact) => <li key={fact}>{fact}</li>)}
              </ul>
            </div>
          ))}
        </div>

        <p className="mt-6 max-w-5xl text-sm leading-6 text-muted-foreground">
          Source: <a href={official2026Report} target="_blank" rel="noopener noreferrer" className="font-semibold text-primary underline underline-offset-4">
            State Fair of Texas official October 18, 2026, closing report ↗
          </a>. Attendance and fundraising numbers are organizer-reported; the economic-impact amount
          is the Fair's estimate, not an independently verified 2026 revenue figure.
        </p>
      </Container>
    </section>
  );
}
