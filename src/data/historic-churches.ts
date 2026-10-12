/** Historic Churches of Texas: evidence-led evergreen seed. Do not copy a church into
 * the Painted Churches census unless its qualifying interior is documented. */
export type HistoricChurchSource = { label: string; url: string; type: "parish" | "historical-marker" | "archive" | "independent" };
export type HistoricChurchImage = { file: string; alt: string; author: string; license: "CC BY-SA 4.0"; sourceUrl: string; width: number; height: number };
export type HistoricChurch = {
  slug: string; name: string; shortName: string; locality: string; county: string; address?: string;
  summary: string; quickAnswer: string; denomination: string; foundation: string; presentBuilding: string;
  historicalContext: string[]; timeline: { year: string; detail: string }[];
  architecture: string[]; visitorNotes: string[]; significance: string[];
  sources: HistoricChurchSource[]; image?: HistoricChurchImage; gallery?: HistoricChurchImage[];
  paintedStatus: "not-established" | "research-candidate";
  related: { href: string; label: string; why: string }[];
  reviewedOn: string;
};
export const historicChurches: HistoricChurch[] = [
  {
    slug: "yoakum-st-joseph-catholic-church",
    name: "St. Joseph Catholic Church", shortName: "St. Joseph's, Yoakum", locality: "Yoakum", county: "DeWitt / Lavaca",
    address: "401 Orth Street, Yoakum, TX 77995", denomination: "Roman Catholic",
    foundation: "Brushy mission church established about 1850; St. Joseph church dedicated in 1876",
    presentBuilding: "1912",
    summary: "Trace the move from Brushy Creek frontier mission to Yoakum's 1912 parish church, the railroad's role, the older church ruins, and generations of Catholic schooling.",
    quickAnswer: "St. Joseph's in Yoakum occupies a 1912 church, but its roots reach to an approximately 1850 mission at Brushy. Its earlier stone church was completed in 1876. The parish's own history records the railroad-era relocation and the remains of Brushy Church near its cemetery.",
    historicalContext: [
      "The parish's long chronology starts before the railroad town of Yoakum existed: early worship took place near Brushy Creek and was supported by priests associated with St. Mary's in Lavaca County. These are distinct St. Mary's and St. Joseph's communities; do not conflate them with St. Mary's at Hostyn Hill near Ellinger.",
      "The 1876 Brushy stone church served a settlement whose center shifted after the 1886 railroad. Parish resistance delayed construction downtown: an attempted 1906 building stopped before the present church was finished in 1912.",
      "St. Joseph's history includes parish schooling, the Sisters of the Incarnate Word and Sisters of Divine Providence, and connections to St. Ann in Hochheim and the former Santa Ana mission."
    ],
    timeline: [
      {year:"1850",detail:"A log mission church was organized near Brushy Creek, east of present Yoakum."},
      {year:"1869–1876",detail:"The cornerstone of the replacement stone Brushy Church was laid in 1869; the completed church was consecrated as St. Joseph's in 1876."},
      {year:"1886–1887",detail:"The railroad arrived and the town of Yoakum was incorporated."},
      {year:"1895",detail:"The parish acquired its first full-time pastor according to its history."},
      {year:"1912",detail:"The current St. Joseph church was built closer to Yoakum's growing center."},
      {year:"1932",detail:"The abandoned Brushy Church's roof and other woodwork burned; the parish reports surviving stone wall remains near St. Joseph Cemetery."}
    ],
    architecture: [
      "The present church is not the 1876 Brushy stone building. Historic descriptions need to distinguish the mission, the older cemetery-area ruins and the present 1912 campus.",
      "A specifically documented decorative mural or stenciling campaign has not been established for the TexasDefined Painted Churches census."
    ],
    visitorNotes: [
      "Use the active parish's current mass times, contact page and bulletins; this is not a ticketed museum.",
      "The older Brushy Church remains, if sought, are associated with the cemetery off FM 318 and should not be treated as guaranteed publicly accessible structures.",
      "Connect a visit with Yoakum, Shiner and the broader Lavaca/DeWitt immigrant heritage corridor."
    ],
    significance: ["A link between nineteenth-century frontier missions and railroad-era urban growth", "A documented example of Catholic parish education and continuity", "Two distinct historic church sites, not a single unchanged building"],
    sources: [
      {label:"St. Joseph parish history",url:"https://stjcatholicchurch.com/about",type:"parish"},
      {label:"St. Joseph parish visitor information",url:"https://stjcatholicchurch.com/",type:"parish"},
      {label:"Parish location and contacts",url:"https://stjcatholicchurch.com/contact-us",type:"parish"}
    ],
    paintedStatus:"not-established",
    related:[{href:"/county/lavaca",label:"Lavaca County guide",why:"Nearby Catholic and Czech-German parish networks"},{href:"/explore/painted-churches",label:"Painted Churches of Texas",why:"Compare confirmed decorative interiors without conflating classifications"}],
    reviewedOn:"2026-10-12"
  },
  {
    slug:"ellinger-st-marys-hostyn-hill",
    name:"Immaculate Conception of the Blessed Virgin Mary (St. Mary's) — Hostyn Hill",
    shortName:"St. Mary's at Hostyn Hill", locality:"Near Ellinger", county:"Fayette",
    foundation:"1850s roots in the Ross Prairie Catholic community; moved to present area by 1864",
    presentBuilding:"1906",
    denomination:"Roman Catholic",
    summary:"The precise history of St. Mary's at Hostyn Hill: early Ross Prairie worship, a 1905 fire, the 1906 Gothic-style replacement, and its relationship to Painted Churches tourism.",
    quickAnswer:"St. Mary's near Ellinger is the historic Immaculate Conception of the Blessed Virgin Mary church at Hostyn Hill, not the similarly named church at Hostyn near La Grange. The Texas Historical Commission records a 1906 Gothic-style building replacing a church destroyed in 1905.",
    historicalContext:[
      "German and Czech Catholic households worshiped in the Ross Prairie area before the parish acquired this Hostyn Hill site. The Texas Historical Commission records an earlier log church called St. Joseph, a move to Live Oak Hill, and the 1879 Immaculate Conception/St. Mary's building.",
      "A 1905 fire destroyed the prior church. The current building dates to 1906. The church is often described informally as 'Ellinger's St. Mary's,' but 'Hostyn Hill' is the more precise location label.",
      "A 2015 Houstonia feature discusses the blue ceiling and ornate altar and includes the stop in Painted Churches tourism. That travel classification does not establish membership in the formal National Register decorative-interior multiple-property grouping."
    ],
    timeline:[
      {year:"1850s",detail:"German and Czech families received visits from Catholic clergy in the Ross Prairie area."},
      {year:"1864",detail:"The congregation acquired the site associated with Hostyn Hill."},
      {year:"1879",detail:"A larger church named Immaculate Conception of the Blessed Virgin Mary (St. Mary's) was built."},
      {year:"1905",detail:"Fire destroyed the previous building."},
      {year:"1906",detail:"The current Gothic-style church was erected at Hostyn Hill."},
      {year:"1986",detail:"A Texas Sesquicentennial historical marker recorded the parish's chronology."}
    ],
    architecture:[
      "The Texas Historical Commission identifies the 1906 church as Gothic-styled; an arched-windowed wooden exterior and pointed steeple appear in independent reporting.",
      "Houstonia's account describes a blue ceiling and ornate altar. These features merit interpretation, but a sourced historic muralist, stenciling date and documented preservation status are still needed before formal Painted Church classification."
    ],
    visitorNotes:[
      "From Ellinger, the historical marker directions are northeast on FM 2503 for roughly two miles, then east on CR 250 for about half a mile. Independently verify road conditions and access before departure.",
      "The grounds and adjacent cemetery are part of a living religious site. Never imply unrestricted interior access.",
      "Nearby Ellinger and Fayette County heritage itineraries can be paired with the established Schulenburg-area Painted Churches route without describing this church as part of the verified core six."
    ],
    significance:["Distinctive Ross Prairie/Hostyn Hill German-Czech parish history","A documented 1905 fire and 1906 rebuilding","An important borderline example explaining why Painted Churches tourism and verified decorative-interior classification differ"],
    sources:[
      {label:"Texas Historical Commission marker 5149004468",url:"https://atlas.thc.texas.gov/Details/5149004468",type:"historical-marker"},
      {label:"Houstonia: In Ellinger, the painted church you may have missed",url:"https://www.houstoniamag.com/travel-and-outdoors/2015/12/in-ellinger-the-painted-church-you-may-have-missed",type:"independent"}
    ],
    paintedStatus:"research-candidate",
    related:[{href:"/explore/painted-churches",label:"Painted Churches of Texas",why:"Learn why churches with painted features require separate evidence for formal inclusion"},{href:"/explore/painted-churches/census",label:"Painted Churches master census",why:"Check the pending research record for Ellinger / Hostyn Hill"},{href:"/county/fayette",label:"Fayette County guide",why:"Plan Ellinger and Schulenburg heritage travel"}],
    reviewedOn:"2026-10-12"
  },
  {
    slug:"blessing-st-peters-catholic-church",
    name:"St. Peter's Catholic Church",shortName:"St. Peter's, Blessing",locality:"Blessing",county:"Matagorda",
    address:"306 Hickory Street, Blessing, TX 77419",denomination:"Roman Catholic",
    foundation:"Mass in the community by 1912; first church building completed in 1915",
    presentBuilding:"1976",
    summary:"A Matagorda County parish tied to Blessing's early settlement: 1912 home Masses, a donated 1914 church lot, wartime chapel reuse, and today's church.",
    quickAnswer:"St. Peter's in Blessing grew from home Masses recorded in 1912 to a 1915 church, then worshiped in a converted Army chapel in 1948. Local historical-marker transcription dates the present building's dedication to 1976.",
    historicalContext:[
      "The church's history mirrors the early decades of Blessing. A surviving transcription of its historical marker reports that area Catholics first attended Mass in homes when itinerant priests were available.",
      "Town founder Jonathan Edwards Pierce's townsite company donated land for worship in 1914. A first church was built in 1915, and a resident priest arrived in 1930.",
      "After a move to the present property in 1947, a remodeled Army chapel opened in 1948. The later 1976 church replaced that structure. The parish maintains close ties with St. Robert's in nearby Markham."
    ],
    timeline:[
      {year:"1912",detail:"The local historical-marker account identifies early Masses in Blessing homes."},
      {year:"1914–1915",detail:"Church land was donated and a first building completed."},
      {year:"1930",detail:"The Rev. A. J. Weber became the first resident priest, according to the marker transcription."},
      {year:"1947–1948",detail:"The parish moved to its present property and began using a remodeled Army chapel."},
      {year:"1976",detail:"The present church was dedicated."}
    ],
    architecture:[
      "Its current sanctuary should be dated to 1976, not misrepresented as the original 1915 structure.",
      "No reliable evidence found for an historic Painted Church decorative-interior campaign; its significance is parish continuity, community service and successive buildings."
    ],
    visitorNotes:[
      "The active parish publishes current Masses, events, pastoral care and the location of its Blessing campus; check the parish site before visiting.",
      "Historic photography of the 1915 structure or 1948 Army chapel requires provenance and reproduction permission before publication.",
      "Pair the stop with Blessing's railroad-era community history and Matagorda County cultural sites; the parish is not a public attraction with advertised tour hours."
    ],
    significance:["Early community worship tied to Blessing's townsite development","Documented reuse of a military chapel","Continuing parish service in Matagorda County"],
    sources:[
      {label:"St. Peter's parish and visitor information",url:"https://stpeterblessing.org/",type:"parish"},
      {label:"Parish history index",url:"https://stpeterblessing.org/history-of-st-peters-catholic-church",type:"parish"},
      {label:"St. Peter's historical marker transcription (secondary transcription)",url:"https://www.usgenwebsites.org/TXMatagorda/stpeter/church_bl_st_peters.htm",type:"archive"},
      {label:"Parish event address confirmation",url:"https://www.stpeterblessing.org/events/knights-of-columbus-meeting-4/20260915",type:"parish"}
    ],
    paintedStatus:"not-established",
    related:[{href:"/county/matagorda",label:"Matagorda County guide",why:"Regional context for Blessing and the coastal prairie"}],
    reviewedOn:"2026-10-12"
  },
  {
    slug:"moulton-st-joseph-catholic-church",
    name:"St. Joseph Catholic Church",shortName:"St. Joseph's, Moulton",locality:"Moulton",county:"Lavaca",
    address:"601 N. Pecan Street, Moulton, TX 77975",denomination:"Roman Catholic",
    foundation:"1888",presentBuilding:"1924 cornerstone; completion date not established in reviewed sources",
    summary:"An 1888 German-Czech Catholic parish in Moulton with a 1924 present-church cornerstone, an 1894 parish school and verified Texas Historical Commission marker.",
    quickAnswer:"St. Joseph's in Moulton was established in 1888 and became an independent parish in 1892. The active parish dates the cornerstone of its present church to 1924 and records renovations in 1967 and 1992.",
    historicalContext:[
      "As the San Antonio and Aransas Pass Railroad drew residents toward a new Moulton townsite in 1887, German and Czech Catholic families organized an enduring parish. The Texas Historical Commission's 1988 marker describes the initial frame sanctuary and the transition to independence from Hallettsville.",
      "The school run by the Sisters of Divine Providence opened in 1894, burned in 1902, and was replaced. The school closed in 1965 after decades of instruction.",
      "The present-church cornerstone was laid in 1924. The parish documents subsequent remodeling in 1967 and 1992, which should not be mistaken for the original construction dates."
    ],
    timeline:[
      {year:"1887–1888",detail:"Railroad-era settlement accelerated; the first frame Catholic church was built in 1888."},
      {year:"1892",detail:"St. Joseph's became an independent parish."},
      {year:"1894",detail:"The first Sisters of Divine Providence parish school opened."},
      {year:"1902",detail:"A fire destroyed the first school and a replacement followed."},
      {year:"1924",detail:"The cornerstone of the present church was laid."},
      {year:"1965",detail:"The parish school closed."},
      {year:"1967, 1992",detail:"The parish dates two renovations to these years."}
    ],
    architecture:[
      "The current church is a brick historic sanctuary. The 1924 cornerstone is verified; a completion year should not be inferred solely from the cornerstone.",
      "Commercial heritage tours occasionally group Moulton with painted and historic churches, but verified parish and marker records do not yet establish qualifying decorative painting, original artist or surviving scheme."
    ],
    visitorNotes:[
      "The parish is active. Contact it directly for interior viewing or to check liturgical access and special events.",
      "The Texas Historical Commission marker stands at the northwest corner of N. Pecan and Church streets.",
      "A visit pairs naturally with Moulton, Shiner and nearby Lavaca County German-Czech settlement history."
    ],
    significance:["1888 German/Czech immigrant parish at a railroad townsite","Historic parish school and Sisters of Divine Providence education","THC historical-marker documentation"],
    sources:[
      {label:"St. Joseph's parish history and contacts",url:"https://stjosephsmoulton.org/about-st-josephs",type:"parish"},
      {label:"Texas Historical Commission marker 5285005047",url:"https://atlas.thc.texas.gov/Details/5285005047",type:"historical-marker"}
    ],
    image:{file:"Moulton-tx2016-7(st-josephs-church).jpg",alt:"Exterior of St. Joseph Catholic Church in Moulton, Texas",author:"Darrylpearson",license:"CC BY-SA 4.0",sourceUrl:"https://commons.wikimedia.org/wiki/File:Moulton-tx2016-7(st-josephs-church).jpg",width:1279,height:1919},
    gallery:[{file:"Moulton-tx2016-8(st-josephs-church).jpg",alt:"Second exterior view of Saint Joseph Catholic Church in Moulton",author:"Darrylpearson",license:"CC BY-SA 4.0",sourceUrl:"https://commons.wikimedia.org/wiki/File:Moulton-tx2016-8(st-josephs-church).jpg",width:2489,height:1659}],
    paintedStatus:"research-candidate",
    related:[{href:"/county/lavaca",label:"Lavaca County guide",why:"Explore the region's settlement and school histories"},{href:"/explore/painted-churches",label:"Painted Churches of Texas",why:"Distinguish historic churches from documented decorative-painting sites"}],
    reviewedOn:"2026-10-12"
  },
  {
    slug:"frelsburg-sts-peter-and-paul",
    name:"Saints Peter and Paul Catholic Church",shortName:"Sts. Peter and Paul, Frelsburg",locality:"Frelsburg",county:"Colorado",
    denomination:"Roman Catholic",foundation:"1844 log church; parish established 1847",presentBuilding:"1928",
    summary:"One of Texas's pioneer German Catholic communities: an 1844 log chapel, 1847 parish, 1854 seminary and a 1928 church rebuilt after the 1926 fire.",
    quickAnswer:"The historic church in Frelsburg is Saints Peter and Paul—not St. Mary's. Its roots reach to an 1844 log church and an 1847 parish. The current church was built in 1928 following a 1926 fire and contains altars imported from Germany.",
    historicalContext:[
      "The parish's published history dates local missionary visits to the early 1840s and its first log church to 1844. Frelsburg was an important early Catholic base for settlements spanning a wide part of Texas.",
      "The parish reports that Bishop John Mary Odin opened a Catholic theological seminary in Frelsburg in 1854. The site's mission and educational role matters as much as its architecture.",
      "A 1912 church was lost to a July 1926 fire. The current building was erected in 1928; the parish explicitly identifies its altars as imported from Germany."
    ],
    timeline:[
      {year:"1844",detail:"A log church was built for the Frelsburg Catholic community."},
      {year:"1847",detail:"Saints Peter and Paul was established as a parish."},
      {year:"1854",detail:"A Catholic theological seminary was opened in Frelsburg, according to parish history."},
      {year:"1861",detail:"A frame church replaced the first log church."},
      {year:"1912",detail:"A new church was built."},
      {year:"1926",detail:"Fire destroyed the 1912 church on July 27."},
      {year:"1928",detail:"The current church was completed, with altars brought from Germany."}
    ],
    architecture:[
      "The 1928 building is a post-fire reconstruction in the parish's long sequence. Historic imagery from 1844, 1861 and 1912 must never be presented as today's sanctuary.",
      "The historic German altars and later stained glass are notable; neither by itself proves a qualifying historic decorative wall/ceiling painting program."
    ],
    visitorNotes:[
      "The parish is in Frelsburg near the FM 109 and FM 1291 area; use the official parish contact and directions before visiting.",
      "This is an active worship space. Current Mass times, events and cemetery access take precedence over tourist expectations.",
      "A broader visit can connect Frelsburg, Columbus and New Ulm, while distinguishing their separate congregations and denominations."
    ],
    significance:["One of the older documented Texas Catholic parishes","Early seminary and wide regional mission influence","1926 fire and the 1928 church's German altars"],
    sources:[
      {label:"Saints Peter and Paul parish history",url:"https://www.peterandpaulparish.com/brief-parish-history",type:"parish"},
      {label:"Current parish information",url:"https://www.peterandpaulparish.com/",type:"parish"}
    ],
    image:{file:"Frelsburg TX Catholic Church.jpg",alt:"Saints Peter and Paul Catholic Church in Frelsburg, Texas",author:"Djmaschek",license:"CC BY-SA 4.0",sourceUrl:"https://commons.wikimedia.org/wiki/File:Frelsburg_TX_Catholic_Church.jpg",width:1600,height:1200},
    gallery:[{file:"Frelsburg TX Catholic Marker.jpg",alt:"Historical marker for Saints Peter and Paul in Frelsburg",author:"Djmaschek",license:"CC BY-SA 4.0",sourceUrl:"https://commons.wikimedia.org/wiki/File:Frelsburg_TX_Catholic_Marker.jpg",width:1600,height:1200}],
    paintedStatus:"research-candidate",
    related:[{href:"/county/colorado",label:"Colorado County guide",why:"Connect Frelsburg with Columbus and New Ulm"},{href:"/explore/painted-churches",label:"Painted Churches of Texas",why:"Compare historic altars with verified decorative-painting interiors"}],
    reviewedOn:"2026-10-12"
  }
];

export const historicChurchBySlug = (slug: string) => historicChurches.find(church => church.slug === slug);
export const historicChurchHref = (slug: string) => "/explore/historic-churches/" + slug;
export const historicChurchImageSrc = (image: HistoricChurchImage) => "https://commons.wikimedia.org/wiki/Special:Redirect/file/" + encodeURIComponent(image.file);
