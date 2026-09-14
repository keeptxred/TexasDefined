import type { PrioritySearchPageData } from "@/components/editorial/PrioritySearchPage";

export const AUTHORITY_HUB_PRIORITY_SEARCH_PAGES: Record<string, PrioritySearchPageData> = {
  "texas-weather": {
    eyebrow: "Texas weather & conditions",
    title: "Texas Weather: Radar, Alerts, Drought, Floods, Air Quality & Current Conditions",
    intro: "A source-first Texas weather and conditions hub for radar, National Weather Service alerts, hurricanes, drought, burn bans, flood and river conditions, rainfall, air quality and the other statewide checks Texans make before traveling or heading outdoors.",
    updated: "September 14, 2026",
    quickAnswer: "There is no single official Texas weather feed for every hazard. Use the National Weather Service for radar, forecasts and warnings; the National Hurricane Center for tropical systems; Texas A&M Forest Service for wildfire and county burn-ban information; USGS and Texas Water Development Board for water conditions; and TCEQ for current Texas air-quality forecasts.",
    sections: [
      {
        heading: "Live Texas radar, severe-weather alerts and freeze or winter warnings",
        paragraphs: [
          "For a live radar search, severe thunderstorm warning, tornado warning, winter storm warning or freeze warning, start with the National Weather Service. NWS radar combines station data into a national mosaic and local Weather Forecast Offices publish the watches, warnings and forecasts for their Texas service areas.",
          "Weather changes too quickly for TexasDefined to hard-code a statewide alert status. This page routes readers to the live official systems instead of presenting a value that can become stale between visits."
        ],
        links: [
          { label: "National Weather Service radar", href: "https://radar.weather.gov/", external: true },
          { label: "National Weather Service", href: "https://www.weather.gov/", external: true }
        ]
      },
      {
        heading: "Texas hurricane tracking and Gulf Coast conditions",
        paragraphs: [
          "For Gulf tropical storms and hurricanes, the National Hurricane Center is the authoritative source for forecasts, advisories, forecast cones and tropical outlooks. Local NWS offices add coastal flood, wind, rainfall and evacuation-support weather information for affected Texas communities.",
          "Use the storm-specific advisory rather than an old article or screenshot when a system is active. Forecast tracks and hazards can change substantially from one advisory cycle to the next."
        ],
        links: [
          { label: "National Hurricane Center", href: "https://www.nhc.noaa.gov/", external: true },
          { label: "Texas Gulf Coast travel", href: "/explore" }
        ]
      },
      {
        heading: "Drought, wildfire risk and county burn bans",
        paragraphs: [
          "Texas A&M Forest Service maintains the state's operational burn-ban and wildfire information. County burn bans are local government actions, so the statewide map is the right starting point but local county orders control the restriction that applies on the ground.",
          "For broader drought context, use current drought-monitoring products and Texas water-planning sources. Drought status, wildfire danger and a county burn ban are related but they are not interchangeable measures."
        ],
        links: [
          { label: "Texas A&M Forest Service burn bans", href: "https://tfsweb.tamu.edu/wildfire-and-other-disasters/burn-bans-and-information/", external: true },
          { label: "Texas A&M Forest Service wildfire status", href: "https://tfsweb.tamu.edu/wildfire-and-other-disasters/current-wildfire-status/", external: true },
          { label: "U.S. Drought Monitor — Texas", href: "https://droughtmonitor.unl.edu/CurrentMap/StateDroughtMonitor.aspx?TX", external: true }
        ]
      },
      {
        heading: "Flood zones, river flows, rainfall and water conditions",
        paragraphs: [
          "A FEMA flood-zone map answers a different question from current flooding. Flood zones describe mapped flood risk; current river and rainfall conditions come from live gauges, forecasts and local warnings. Check both when property risk and today's conditions matter.",
          "USGS maintains real-time Texas stream, lake, reservoir, precipitation and water-quality monitoring, while the Texas Water Development Board publishes statewide water maps, planning data and TexMesonet weather and rain-gauge tools."
        ],
        links: [
          { label: "USGS Texas water conditions", href: "https://waterdata.usgs.gov/state/texas/", external: true },
          { label: "Texas Water Development Board maps and apps", href: "https://www.twdb.texas.gov/mapping/", external: true },
          { label: "FEMA Flood Map Service Center", href: "https://msc.fema.gov/portal/home", external: true }
        ]
      },
      {
        heading: "Texas air quality today",
        paragraphs: [
          "The Texas Commission on Environmental Quality publishes metropolitan air-quality forecasts using EPA's Air Quality Index. The forecast covers ozone and particulate matter and is updated on normal workdays, with additional updates when pollution levels warrant them.",
          "For health-sensitive decisions, use the latest local AQI and follow current public-health guidance rather than relying on a statewide summary."
        ],
        links: [
          { label: "TCEQ Texas air-quality forecast", href: "https://www.tceq.texas.gov/airquality/monops/forecast_today.html/", external: true }
        ]
      },
      {
        heading: "Seasonal nature conditions: wildflowers, migration, fishing and parks",
        paragraphs: [
          "Bluebonnet timing, hummingbird and monarch migration, fishing conditions and park access are seasonal rather than fixed statewide dates. Use TexasDefined's destination and outdoors guides for planning, then confirm current closures, reservations, regulations and field conditions with the responsible park or agency before a trip.",
          "Texas is large enough that bloom, migration and weather timing can differ by weeks between regions. A statewide date is usually less useful than a regional observation plus the current forecast."
        ],
        links: [
          { label: "Explore Texas", href: "/explore" },
          { label: "Texas state parks", href: "/state-parks" },
          { label: "Texas fishing", href: "/fishing" },
          { label: "Texas wildflowers", href: "/texas-wildflowers" }
        ]
      }
    ],
    faq: [
      { question: "Where can I see live Texas weather radar?", answer: "Use the National Weather Service radar at radar.weather.gov. For a location-specific forecast or warning, use the relevant NWS Weather Forecast Office or weather.gov location search." },
      { question: "Where is the official Texas burn-ban map?", answer: "Texas A&M Forest Service publishes statewide burn-ban information reported by counties. Because county orders control locally, verify the current county order when a restriction affects a specific activity." },
      { question: "Where can I check Texas river flow rates in real time?", answer: "USGS Water Data provides real-time stream, lake, reservoir and precipitation monitoring across Texas. Local flood warnings should still be checked through the National Weather Service and local emergency officials." },
      { question: "Where can I check Texas air quality today?", answer: "TCEQ publishes Texas metropolitan air-quality forecasts based on EPA's AQI, including ozone and particulate matter." }
    ],
    related: [
      { label: "Texas resources", href: "/texas-resources" },
      { label: "Explore Texas", href: "/explore" },
      { label: "Texas state parks", href: "/state-parks" },
      { label: "Texas data", href: "/texas-data" }
    ]
  },

  "texas-colleges-universities": {
    eyebrow: "Texas colleges & universities",
    title: "Texas Colleges & Universities: Programs, Tuition, Admissions & Official Resources",
    intro: "A statewide starting point for comparing Texas colleges and universities, finding degree programs, checking tuition data, applying through official systems and jumping to the correct institution for admissions, housing, campus tours and academic information.",
    updated: "September 14, 2026",
    quickAnswer: "For statewide college research, the Texas Higher Education Coordinating Board is the best authoritative starting point: its tools cover public and authorized institutions, degree-program inventories, tuition and fee data, financial aid and student planning. Institution-specific deadlines, admissions decisions, housing and course schedules should always be confirmed with the university itself.",
    sections: [
      {
        heading: "Find Texas colleges, universities and degree programs",
        paragraphs: [
          "The Texas Higher Education Coordinating Board maintains statewide inventories that let students search degree and certificate programs across public universities, community colleges, technical colleges, health-related institutions and other authorized schools.",
          "Use the statewide inventory to compare programs, then move to the institution's official catalog for current degree requirements, concentrations, course availability and departmental contacts."
        ],
        links: [
          { label: "THECB degree-program inventory", href: "https://www.highered.texas.gov/new-program-development/course-and-program-inventory/", external: true },
          { label: "THECB students and families", href: "https://www.highered.texas.gov/students-families/", external: true }
        ]
      },
      {
        heading: "Texas public-university tuition and college costs",
        paragraphs: [
          "Texas public-university tuition is not one statewide sticker price. Charges vary by institution, program, credit load, residency and fees. THECB publishes comparable tuition and fee data, while each institution's bursar or tuition estimator controls the student's current bill estimate.",
          "Use statewide data for comparison and the school's official cost-of-attendance page for a current planning number. Financial aid, exemptions and waivers can materially change net cost."
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
          "ApplyTexas is the statewide application platform used by Texas public universities and many community colleges and private institutions. Individual schools still set their own deadlines, supplemental requirements and admissions policies.",
          "For searches such as TCU application deadline, Texas Southern admissions, UT Austin admissions or Texas A&M acceptance information, treat the institution's admissions office as the final source rather than a third-party ranking or admissions summary."
        ],
        links: [
          { label: "ApplyTexas", href: "https://www.applytexas.org/", external: true },
          { label: "THECB college-planning resources", href: "https://www.highered.texas.gov/students-families/", external: true }
        ]
      },
      {
        heading: "Major Texas public university systems and campuses",
        paragraphs: [
          "Texas has several major public systems plus independent public universities. The University of Texas System includes UT Austin, UT Dallas, UT San Antonio, UT El Paso and health institutions such as UTMB. The Texas A&M University System includes Texas A&M and other universities and agencies. Texas Tech University System, University of Houston System, University of North Texas System and Texas State University System serve additional regions and missions.",
          "For majors, course catalogs, housing portals, dean's lists, campus tours, rankings or jobs, use the specific campus's official site after identifying the correct institution."
        ],
        links: [
          { label: "University of Texas System", href: "https://www.utsystem.edu/", external: true },
          { label: "Texas A&M University System", href: "https://www.tamus.edu/", external: true },
          { label: "Texas A&M System careers", href: "https://www.tamus.edu/system/careers/", external: true },
          { label: "Texas Tech University System", href: "https://www.texastech.edu/", external: true },
          { label: "Texas State University System", href: "https://www.tsus.edu/", external: true }
        ]
      },
      {
        heading: "Technical colleges, workforce programs and career pathways",
        paragraphs: [
          "Texas State Technical College operates a statewide technical-college network, while community colleges and universities offer additional workforce programs. THECB program inventories are useful for locating a credential; current admissions, start dates and campus availability should be confirmed with the school.",
          "For job-market demand and wages after training, pair program research with Texas Workforce Commission labor-market data rather than assuming that every credential has the same employment outlook statewide."
        ],
        links: [
          { label: "Texas State Technical College", href: "https://www.tstc.edu/", external: true },
          { label: "THECB programs of study", href: "https://www.highered.texas.gov/workforce-education-overview/programs-of-study/", external: true },
          { label: "Texas labor-market information", href: "https://lmi.twc.texas.gov/", external: true }
        ]
      }
    ],
    faq: [
      { question: "Where can I compare tuition at Texas public universities?", answer: "Use the Texas Higher Education Coordinating Board's tuition and fees data for statewide comparison, then confirm current charges and cost of attendance with the specific institution." },
      { question: "Where can I search Texas college degree programs?", answer: "THECB maintains degree-program inventories covering Texas public institutions and other authorized institutions. It is the best statewide search starting point before checking a school's current catalog." },
      { question: "Where do I apply to Texas public universities?", answer: "ApplyTexas is the centralized application platform used by Texas public universities and many other Texas institutions. Each school still controls its deadlines and requirements." }
    ],
    related: [
      { label: "Moving to Texas", href: "/moving-to-texas" },
      { label: "Texas data", href: "/texas-data" },
      { label: "Texas salary calculator", href: "/texas-salary-calculator" },
      { label: "Texas resources", href: "/texas-resources" }
    ]
  },

  "texas-economy": {
    eyebrow: "Texas economy & data",
    title: "Texas Economy: Jobs, GDP, Population, Housing, Energy & Business Data",
    intro: "A source-first guide to the major datasets behind searches about Texas economic growth, jobs, population, housing, oil and gas, wind power, manufacturing, income, business conditions and regional change.",
    updated: "September 14, 2026",
    quickAnswer: "Use different primary datasets for different economic questions: BEA for state GDP and personal income, Census for population and household demographics, Texas Workforce Commission for employment and wages, the Texas Comptroller for statewide and regional economic analysis, Railroad Commission of Texas for oil and gas data, and EIA or ERCOT for energy statistics. TexasDefined's own data briefs add Texas-specific context without replacing those primary sources.",
    sections: [
      {
        heading: "Texas GDP, income and broad economic growth",
        paragraphs: [
          "The Bureau of Economic Analysis is the primary federal source for state GDP and personal-income statistics. For questions such as Texas GDP trends or how fast the state economy is growing, use the latest BEA state release rather than a static number copied into an evergreen article.",
          "The Texas Comptroller adds state and regional interpretation, including population, jobs, wages, income and education indicators across Texas economic regions."
        ],
        links: [
          { label: "BEA GDP by state", href: "https://www.bea.gov/data/gdp/gdp-state", external: true },
          { label: "Texas Comptroller economic data", href: "https://comptroller.texas.gov/economy/", external: true },
          { label: "Texas data center", href: "/texas-data" }
        ]
      },
      {
        heading: "Texas jobs, unemployment, wages and industry growth",
        paragraphs: [
          "Texas Workforce Commission Labor Market Information publishes Current Employment Statistics, occupational wages, projections, Quarterly Census of Employment and Wages data and local economic profiles. Those datasets are the right source for monthly job growth, industry employment and local labor-market comparisons.",
          "Job openings are a separate, faster-changing question from employment statistics. For current openings, use employer career pages or a live job-search source; use TWC data to understand the market around those openings."
        ],
        links: [
          { label: "Texas Workforce Commission labor-market information", href: "https://lmi.twc.texas.gov/", external: true },
          { label: "Texas salary calculator", href: "/texas-salary-calculator" }
        ]
      },
      {
        heading: "Population growth, migration, county demographics and household income",
        paragraphs: [
          "U.S. Census Bureau estimates and American Community Survey data are the foundation for Texas population, migration, household-income and demographic comparisons. TexasDefined maintains source-backed population and migration briefs so readers can move from statewide trends to county context.",
          "For county and ZIP-level searches, confirm the geography and dataset vintage before comparing numbers. A decennial Census count, annual population estimate and ACS survey estimate answer different questions and should not be mixed without labeling."
        ],
        links: [
          { label: "U.S. Census QuickFacts — Texas", href: "https://www.census.gov/quickfacts/fact/table/TX/PST045225", external: true },
          { label: "Texas population and migration data", href: "/texas-data/texas-population-and-migration-2025" },
          { label: "Texas county population growth", href: "/texas-data/county-growth" },
          { label: "Browse Texas counties", href: "/browse/counties" }
        ]
      },
      {
        heading: "Texas housing, real estate and land-market questions",
        paragraphs: [
          "Housing-market searches need both current market data and local context. Statewide headlines can hide large differences among Dallas-Fort Worth, Houston, Austin, San Antonio, smaller metros and rural counties. TexasDefined's housing and affordability tools are designed for household decisions, while market-trend claims should cite a dated market dataset.",
          "For licensed real-estate forms, rules and license status, use the Texas Real Estate Commission. TexasDefined does not republish controlled forms as if they were its own authority."
        ],
        links: [
          { label: "Texas county housing costs", href: "/texas-data/county-housing-costs" },
          { label: "Texas home affordability calculator", href: "/texas-home-affordability-calculator" },
          { label: "Texas mortgage calculator", href: "/texas-mortgage-calculator" },
          { label: "Texas property-tax help", href: "/decide/property-taxes" },
          { label: "Texas Real Estate Commission", href: "https://www.trec.texas.gov/", external: true }
        ]
      },
      {
        heading: "Oil, gas, electricity and wind-energy data",
        paragraphs: [
          "The Railroad Commission of Texas publishes oil and gas regulatory and production data. Electricity questions use a different set of sources: ERCOT provides grid and market information for most of the Texas power system, while the U.S. Energy Information Administration publishes comparable state energy statistics including generation by source.",
          "For a current production or generation number, use the latest source dataset and note the reporting period. Energy statistics are frequently revised and should not be presented as timeless facts."
        ],
        links: [
          { label: "Railroad Commission of Texas data", href: "https://www.rrc.texas.gov/resource-center/research/data-sets-available-for-download/", external: true },
          { label: "ERCOT", href: "https://www.ercot.com/", external: true },
          { label: "EIA Texas state energy profile", href: "https://www.eia.gov/electricity/state/texas/", external: true }
        ]
      },
      {
        heading: "Business formation, costs and economic-development research",
        paragraphs: [
          "Business-registration fees, tax obligations, permits and filing deadlines depend on the entity and activity. Use the responsible Texas agency for the transaction, then use economic-development and labor data to evaluate markets, workforce and regional growth.",
          "TexasDefined's business and cost tools are planning resources. Tax filing, sales-tax permits, franchise-tax due dates and regulated filings should be verified with the Texas Comptroller or other responsible authority before a deadline or transaction."
        ],
        links: [
          { label: "Start a business in Texas", href: "/start-a-business-in-texas" },
          { label: "Texas Comptroller", href: "https://comptroller.texas.gov/", external: true },
          { label: "Texas economic development", href: "https://gov.texas.gov/business", external: true },
          { label: "Texas cost-of-living calculator", href: "/texas-cost-of-living-calculator" }
        ]
      }
    ],
    faq: [
      { question: "Where can I find current Texas GDP data?", answer: "Use the U.S. Bureau of Economic Analysis GDP-by-state release and interactive tables. TexasDefined can explain the trend, but BEA is the primary source for the current state GDP series." },
      { question: "Where can I find current Texas job-growth data?", answer: "Texas Workforce Commission Labor Market Information publishes current employment statistics, wages, projections and local economic profiles." },
      { question: "Where can I compare Texas population growth by county?", answer: "TexasDefined's county-growth data brief uses official Census population estimates and links back to the source. For raw federal data, use the U.S. Census Bureau." },
      { question: "Where can I find Texas oil and gas production data?", answer: "Use Railroad Commission of Texas production and research datasets. For electricity generation and fuel mix, use ERCOT and U.S. Energy Information Administration data." }
    ],
    related: [
      { label: "Texas data", href: "/texas-data" },
      { label: "Moving to Texas", href: "/moving-to-texas" },
      { label: "Money & property tools", href: "/decide/financial-tools" },
      { label: "Texas resources", href: "/texas-resources" }
    ]
  }
};
