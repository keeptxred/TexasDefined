# Batch 003 — Primary-source campus county and reciprocal links
Verified on 2026-10-09. Source: US Department of Education NCES public-school directory (2025–26 directory, 2024–25 detail), supplemented by the Arlington ISD school directory. **Campus counties** here are not school-district service limits or stadium locations.

| School / slug | Campus county | Campus/county evidence | New inbound local pages |
| --- | --- | --- | --- |
| Argyle Eagles `argyle` | Denton | [NCES Argyle H S ID 480867008769](https://nces.ed.gov/ccd/schoolsearch/school_detail.asp?ID=480867008769) | `/county/denton` |
| Arlington Colts `arlington` | Tarrant | [NCES Arlington H S ID 480870000232](https://nces.ed.gov/ccd/schoolsearch/school_detail.asp?ID=480870000232) | `/county/tarrant`, `/city/arlington` |
| Arlington Bowie Volunteers `arlington-bowie` | Tarrant | [NCES Bowie H S ID 480870021493](https://nces.ed.gov/ccd/schoolsearch/school_detail.asp?ID=480870021493) | `/county/tarrant`, `/city/arlington` |
| Sam Houston Texans `arlington-houston` | Tarrant | [NCES school locator](https://nces.ed.gov/globallocator/index.asp?CS=8B8DDFB2&College=1&Library=1&PrivSchool=1&School=1&State=&city=&itemname=&miles=5&search=1&sortby=name&zipcode=76015) lists 2000 Sam Houston Dr and Tarrant County | `/county/tarrant`, `/city/arlington` |
| Arlington Lamar Vikings `arlington-lamar` | Tarrant | [NCES Lamar H S ID 480870000253](https://nces.ed.gov/ccd/schoolsearch/school_detail.asp?ID=480870000253) | `/county/tarrant`, `/city/arlington` |
| Arlington Martin Warriors `arlington-martin` | Tarrant | [NCES Martin H S ID 480870005643](https://nces.ed.gov/ccd/schoolsearch/school_detail.asp?ID=480870005643) | `/county/tarrant`, `/city/arlington` |
| Arlington Seguin Cougars `arlington-seguin` | Tarrant | [NCES school locator](https://nces.ed.gov/globallocator/index.asp?CS=CB88C673&PrivSchool=1&School=1&State=&city=&itemname=&miles=20&search=1&sortby=name&zipcode=76015) lists 7001 Silo Rd and Tarrant County | `/county/tarrant`, `/city/arlington` |

Arlington's canonical city authority profile is present in `src/data/city-authority-profiles.ts`; [Arlington ISD's school directory](https://www.aisd.net/district/about/school-directory) also lists the six campuses in Arlington. Reciprocal inbound school cards added to the existing `src/routes/$kind.$slug.lazy.tsx` local-football sections. **Not yet production accepted:** live routing, mobile layouts, functioning links, sitemap/SEO, or server deploy. Other Batch 003 schools remain pending first-party campus location checks and individual reciprocal links. Existing 30 VERIFIED schools and Batch 003 school status values remain unchanged.
