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

## Remaining 18 Batch 003 campus-to-county verifications

The second county-link tranche was committed in `86b3555396046e4e1b4e2ac1e1fd90096ac0f45f`, `53f34d66f59743b8a853cb7f30d1eb3204e20e1f` and `ca0a71f1f7f7ec085074e8d322eb2e5e2ef73cab`. Sources below are NCES school-level directory or school locator records; links are **draft-code inbound cards**, not production verification.

| School slug | NCES campus county | Government directory / locator evidence |
| --- | --- | --- |
| `amarillo-caprock` | **Randall** | [NCES Caprock H S 480813000149](https://nces.ed.gov/ccd/schoolsearch/school_detail.asp?ID=480813000149) |
| `amarillo-highland-park` | Potter | [NCES Highland Park H S 483556006160](https://nces.ed.gov/ccd/schoolsearch/school_detail.asp?ID=483556006160) — not the Dallas Highland Park campus |
| `amarillo-palo-duro` | Potter | [NCES Amarillo school locator, Palo Duro 1400 N Grant](https://nces.ed.gov/globallocator/index.asp?CS=2DCDAA6&PrivSchool=1&School=1&State=TX&city=Amarillo&miles=15&search=1&zipcode=) |
| `amarillo-river-road` | Potter | [NCES River Road campus in Potter County](https://nces.ed.gov/globallocator/index.asp?CS=C147AF41&College=1&Library=1&PrivSchool=1&School=1&State=&city=&itemname=&miles=5&search=1&sortby=name&zipcode=79124) |
| `amarillo-tascosa` | Potter | [NCES Tascosa H S 480813000181](https://nces.ed.gov/ccd/schoolsearch/school_detail.asp?ID=480813000181) |
| `amherst` | Lamb | [NCES statewide school list, Amherst School](https://nces.ed.gov/ccd/schooLSearch/school_list.asp?ID=480930000389&SchoolPageNum=14&state=48) |
| `anahuac` | Chambers | [NCES Anahuac H S 480819000190](https://nces.ed.gov/ccd/schoolsearch/school_detail.asp?ID=480819000190) |
| `anderson-shiro` | Grimes | [NCES Anderson-Shiro Jr/Sr H S 480823000193](https://nces.ed.gov/ccd/schoolsearch/school_detail.asp?ID=480823000193) |
| `andrews` | Andrews | [NCES statewide school listing, Andrews H S](https://nces.ed.gov/ccd/schooLSearch/school_list.asp?ID=480930000389&SchoolPageNum=16&state=48) |
| `angleton` | Brazoria | [NCES Angleton H S 480831000200](https://nces.ed.gov/ccd/schoolsearch/school_detail.asp?ID=480831000200) |
| `anna` | Collin | [NCES Anna H S public-school locator](https://nces.ed.gov/globallocator/index.asp?CS=FFE8C0A8&School=1&itemname=South&miles=20&search=1&sortby=name&zipcode=Res++) |
| `anson` | Jones | [NCES Jones County school list, Anson H S](https://nces.ed.gov/ccd/schoolsearch/school_list.asp?County=Jones+County&Search=1&State=48) |
| `anthony` | El Paso | [NCES El Paso County school list, Anthony H S](https://nces.ed.gov/ccd/schoolsearch/school_list.asp?County=el+paso&ID=484668006994&Search=1&State=48) |
| `anton` | Hockley | [NCES Anton School 480846000214](https://nces.ed.gov/ccd/schoolsearch/school_detail.asp?ID=480846000214) |
| `apple-springs` | Trinity | [Texas Education Agency 2025 Apple Springs campus report](https://rptsvr1.tea.texas.gov/cgi/sas/broker?_debug=0&_program=perfrept.perfmast.sas&_service=marykay&ccyy=2025&dds_report=D9&id=228905001&lev=C&prgopt=reports%2Facct%2Fdistinctions.sas) |
| `aquilla` | Hill | [NCES Aquilla School 480852000218](https://nces.ed.gov/ccd/schoolsearch/school_detail.asp?ID=480852000218) |
| `aransas-pass` | San Patricio | [NCES Aransas Pass H S 480858000224](https://nces.ed.gov/ccd/schoolsearch/school_detail.asp?ID=480858000224) |
| `archer-city` | Archer | [NCES Archer County school roster](https://nces.ed.gov/ccd/schoolsearch/school_list.asp?County=Archer+County&Search=1&State=48) |

**Important geographic correction:** Caprock High School's campus is in Randall County, not Potter County despite its Amarillo address. Reciprocal links follow campus county, not the city name. Tascosa, Highland Park, Palo Duro and River Road campuses are in Potter County.

**Acceptance still pending:** Independent rendering of new cards on each county and Arlington city page, correct links, SEO and production deployment. Source existence never promotes the school from IMPLEMENTED to VERIFIED.
