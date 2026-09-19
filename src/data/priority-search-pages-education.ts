import type { PrioritySearchPageData } from "@/components/editorial/PrioritySearchPage";

export const EDUCATION_PRIORITY_SEARCH_PAGES: Record<string, PrioritySearchPageData> = {
  "texas-colleges-universities": {
    eyebrow: "Texas colleges & universities",
    title: "Texas Colleges & Universities: Programs, Tuition, Admissions & Official Resources",
    intro: "A statewide starting point for comparing Texas colleges and universities, finding degree programs, checking tuition data, applying through official systems and jumping to the correct institution for admissions, housing, campus tours and academic information.",
    updated: "September 17, 2026",
    quickAnswer: "For statewide college research, start with the Texas Higher Education Coordinating Board. Its official tools cover Texas public institutions and authorized private postsecondary institutions, degree-program inventories, tuition and fee data, financial aid and student planning. Institution-specific deadlines, admissions decisions, housing, course schedules and final charges should always be confirmed with the college or university itself.",
    sections: [
      {
        heading: "Find Texas colleges, universities and degree programs",
        paragraphs: [
          "The Texas Higher Education Coordinating Board maintains official course and program inventories that let students search degree and certificate programs across public community, technical and state colleges, public universities, health-related institutions and authorized private postsecondary institutions.",
          "Use the statewide inventory to compare programs, then move to the institution's official catalog for current degree requirements, concentrations, course availability and departmental contacts."
        ],
        links: [
          { label: "THECB course and program inventory", href: "https://www.highered.texas.gov/new-program-development/course-and-program-inventory/", external: true },
          { label: "THECB students and families", href: "https://www.highered.texas.gov/students-families/", external: true }
        ]
      },
      {
        heading: "Texas public-university tuition and college costs",
        paragraphs: [
          "Texas public-university tuition is not one statewide sticker price. The Coordinating Board's comparison data reflects average charges for resident undergraduates at public universities, while an individual student's bill can vary by institution, program, enrollment, fees and personal circumstances.",
          "Use statewide data for comparison and the school's official tuition estimator or cost-of-attendance page for current planning. Financial aid, exemptions and waivers can materially change net cost."
        ],
        links: [
          { label: "THECB tuition and fees data", href: "https://www.highered.texas.gov/legislative-appropriations-overviews/tuition-and-fees-data/", external: true },
          { label: "THECB financial-aid programs", href: "https://www.highered.texas.gov/student-financial-aid-programs/", external: true },
          { label: "THECB exemptions and waivers", href: "https://www.highered.texas.gov/student-financial-aid-programs/exemptions-waivers/", external: true }
        ]
      },
      {
        heading: "Apply to a Texas college or university",
        paragraphs: [
          "ApplyTexas is a statewide college-application platform used by participating Texas institutions. Colleges and universities still set their own deadlines, supplemental requirements, admissions policies and decision schedules.",
          "For institution-specific admissions questions, use the school's official admissions office as the final source rather than a third-party ranking or admissions summary."
        ],
        links: [
          { label: "ApplyTexas", href: "https://www.applytexas.org/", external: true },
          { label: "THECB college-planning resources", href: "https://www.highered.texas.gov/students-families/", external: true }
        ]
      },
      {
        heading: "Major Texas public university systems and campuses",
        paragraphs: [
          "Texas has several major public university systems plus independent public institutions. The University of Texas System and Texas A&M University System each span multiple academic and health institutions, while the Texas Tech University System, University of Houston System, University of North Texas System and Texas State University System serve additional regions and missions.",
          "For majors, course catalogs, housing portals, campus tours or jobs, use the specific campus's official site after identifying the correct institution."
        ],
        links: [
          { label: "University of Texas System institutions", href: "https://www.utsystem.edu/institutions", external: true },
          { label: "Texas A&M University System", href: "https://www.tamus.edu/", external: true },
          { label: "Texas Tech University System", href: "https://www.texastech.edu/", external: true },
          { label: "Texas State University System", href: "https://www.tsus.edu/", external: true }
        ]
      },
      {
        heading: "Technical colleges, workforce programs and career pathways",
        paragraphs: [
          "Texas State Technical College operates multiple campuses, while community colleges and universities offer additional workforce programs. THECB program inventories are useful for locating a credential; current admissions, start dates and campus availability should be confirmed with the school.",
          "For job-market demand and wages after training, pair program research with Texas Workforce Commission labor-market data rather than assuming that every credential has the same employment outlook statewide."
        ],
        links: [
          { label: "Texas State Technical College", href: "https://www.tstc.edu/", external: true },
          { label: "THECB programs of study", href: "https://www.highered.texas.gov/workforce-education-overview/programs-of-study/", external: true },
          { label: "Texas labor-market information", href: "https://lmi.twc.texas.gov/", external: true }
        ]
      },
      {
        heading: "Schools and family planning before college",
        paragraphs: [
          "Families moving to Texas often need to solve school-district boundaries, school taxes and K–12 logistics before college planning begins. Texas Defined already separates those questions so this college hub can stay focused on higher education.",
          "Use the school-district finder for address-based research, the Texas schools and family-life guide for newcomer context, and the school-district property-tax comparison for the tax side of a move."
        ],
        links: [
          { label: "Find your Texas school district", href: "/find-my-school-district" },
          { label: "Texas schools and family life", href: "/article/texas-schools-family-life" },
          { label: "Compare Texas school-district property taxes", href: "/texas-school-district-property-tax-comparison" }
        ]
      }
    ],
    faq: [
      { question: "Where can I compare tuition at Texas public universities?", answer: "Use the Texas Higher Education Coordinating Board's tuition and fees data for statewide comparison, then confirm current charges and cost of attendance with the specific institution." },
      { question: "Where can I search Texas college degree programs?", answer: "THECB maintains official program inventories covering Texas public institutions and authorized private postsecondary institutions. Use those tools as a statewide search starting point before checking a school's current catalog." },
      { question: "Where do I apply to Texas colleges?", answer: "ApplyTexas is a statewide application platform used by participating Texas institutions. Each school still controls its deadlines, required materials and admissions decisions." },
      { question: "How do I find the public school district for a Texas address?", answer: "Use the Texas Defined school-district finder as a research starting point, then verify the exact address with official district or county boundary resources before making a housing or enrollment decision." }
    ],
    related: [
      { label: "Find your school district", href: "/find-my-school-district" },
      { label: "Texas schools and family life", href: "/article/texas-schools-family-life" },
      { label: "Moving to Texas", href: "/moving-to-texas" },
      { label: "Texas salary calculator", href: "/texas-salary-calculator" },
      { label: "Texas resources", href: "/texas-resources" }
    ]
  }
};
