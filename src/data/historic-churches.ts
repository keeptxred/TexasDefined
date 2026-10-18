/** Historic Churches of Texas: evidence-led evergreen seed. Do not copy a church into
 * the Painted Churches census unless its qualifying interior is documented. */
export type HistoricChurchSource = { label: string; url: string; type: "parish" | "historical-marker" | "archive" | "independent" };
export type HistoricChurchImage = { file: string; alt: string; author: string; license: "CC BY-SA 4.0"; sourceUrl: string; width: number; height: number };
export type HistoricChurchPhotoReference = { label: string; pageUrl: string; photographer?: string; reuseStatus: "permission-required" | "noncommercial-only"; note: string };
export type HistoricChurchArchivalVisual = {
  file: string; title: string; alt: string; date: string; credit: string;
  sourceUrl: string; license: "Public domain (U.S.)"; note: string;
};
export type HistoricChurch = {
  slug: string; name: string; shortName: string; locality: string; county: string; address?: string;
  summary: string; quickAnswer: string; denomination: string; foundation: string; presentBuilding: string;
  historicalContext: string[]; timeline: { year: string; detail: string }[];
  architecture: string[]; visitorNotes: string[]; significance: string[];
  sources: HistoricChurchSource[]; image?: HistoricChurchImage; gallery?: HistoricChurchImage[];
  imageStatus: "rights-cleared" | "awaiting-licensed-photos"; photoReferences?: HistoricChurchPhotoReference[]; archivalVisuals?: HistoricChurchArchivalVisual[];
  faq: { question: string; answer: string }[];
  paintedStatus: "not-established" | "research-candidate" | "related-historic";
  related: { href: string; label: string; why: string }[];
  reviewedOn: string;
};
export const historicChurches: HistoricChurch[] = [
  {
    slug: "yoakum-st-joseph-catholic-church",
    name: "St. Joseph Catholic Church", shortName: "St. Joseph's, Yoakum", locality: "Yoakum", county: "DeWitt / Lavaca",
    address: "210 Schrimscher Street, Yoakum, TX 77995", denomination: "Roman Catholic",
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
      "The Diocese of Victoria lists the church at 210 Schrimscher Street, while the parish lists its office at 401 Orth Street. Confirm whether you are navigating to the sanctuary or office before departure; this is an active church, not a ticketed museum.",
      "The older Brushy Church remains, if sought, are associated with the cemetery off FM 318 and should not be treated as guaranteed publicly accessible structures.",
      "Connect a visit with Yoakum, Shiner and the broader Lavaca/DeWitt immigrant heritage corridor."
    ],
    significance: ["A link between nineteenth-century frontier missions and railroad-era urban growth", "A documented example of Catholic parish education and continuity", "Two distinct historic church sites, not a single unchanged building"],
    sources: [
      {label:"St. Joseph parish history",url:"https://stjcatholicchurch.com/about",type:"parish"},
      {label:"St. Joseph parish visitor information",url:"https://stjcatholicchurch.com/",type:"parish"},
      {label:"Parish office address and contacts (401 Orth Street)",url:"https://stjcatholicchurch.com/contact-us",type:"parish"},
      {label:"Diocese of Victoria parish locator (210 Schrimscher Street)",url:"https://www.victoriadiocese.org/parishfinder",type:"parish"}
    ],
    faq:[
      { question:"When was today's St. Joseph church in Yoakum built?", answer:"The present church was completed in 1912. The parish's earlier Brushy Creek mission and 1876 stone church are distinct predecessors, not the same building." },
      { question:"Where is St. Joseph Catholic Church in Yoakum?", answer:"The Diocese of Victoria lists 210 Schrimscher Street for the church; the parish website gives 401 Orth Street for its office. Verify which location you need before traveling." },
      { question:"Can visitors see the historic Brushy Church ruins?", answer:"The former stone church's remains are associated with St. Joseph Cemetery east of Yoakum. Do not assume unrestricted access to ruins; inquire through the parish first." },
      { question:"Is St. Joseph's in Yoakum a verified Painted Church?", answer:"This page documents the parish's mission history, railroad relocation and successive buildings. It does not claim a formal historic decorative-interior classification." }
    ],
    photoReferences:[{label:"Photograph of today's St. Joseph Catholic Church exterior",pageUrl:"https://stjcatholicchurch.com/",reuseStatus:"permission-required",note:"The active parish displays a clear exterior photograph. Its contact page prohibits reproducing the parish site's materials without express pastor consent; link only until permission is documented."}],
    archivalVisuals:[{
      file:"Yoakum_1922_Sheet_14_-_DPLA_-_4457c73a6f6dfbf79394db00a77a51de.jpg",
      title:"Yoakum's built environment in 1922",
      alt:"Sanborn fire insurance map sheet documenting buildings and streets in Yoakum, Texas, in 1922",
      date:"1922",
      credit:"Sanborn Map Company; Dolph Briscoe Center for American History, via Digital Public Library of America and Wikimedia Commons",
      sourceUrl:"https://commons.wikimedia.org/wiki/File:Yoakum_1922_Sheet_14_-_DPLA_-_4457c73a6f6dfbf79394db00a77a51de.jpg",
      license:"Public domain (U.S.)",
      note:"An archival map sheet of Yoakum in the railroad era, not a verified photograph or site plan of St. Joseph Catholic Church. It must not be presented as the church's exterior."
    }],
    imageStatus:"awaiting-licensed-photos",
    paintedStatus:"not-established",
    related:[{href:"/county/lavaca",label:"Lavaca County guide",why:"Nearby Catholic and Czech-German parish networks"},{href:"/explore/painted-churches",label:"Painted Churches of Texas",why:"Compare confirmed decorative interiors without conflating classifications"}],
    reviewedOn:"2026-10-12"
  },
  {
    slug:"ellinger-st-marys-hostyn-hill",
    name:"Immaculate Conception of the Blessed Virgin Mary (St. Mary's) — Hostyn Hill",
    shortName:"St. Mary's at Hostyn Hill", locality:"Near Ellinger", county:"Fayette",
    address:"815 St. Mary's Church Road, Fayetteville, TX 78940",
    foundation:"1850s roots in the Ross Prairie Catholic community; moved to present area by 1864",
    presentBuilding:"1906",
    denomination:"Roman Catholic",
    summary:"The precise history of St. Mary's at Hostyn Hill: early Ross Prairie worship, a 1905 fire, the 1906 Gothic-style replacement, and its relationship to Painted Churches tourism.",
    quickAnswer:"St. Mary's near Ellinger is the historic Immaculate Conception of the Blessed Virgin Mary church at Hostyn Hill, not the similarly named church at Hostyn near La Grange. The Texas Historical Commission records a 1906 Gothic-style building replacing a church destroyed in 1905.",
    historicalContext:[
      "German and Czech Catholic households worshiped in the Ross Prairie area before the parish acquired this Hostyn Hill site. The Texas Historical Commission records an earlier log church called St. Joseph, a move to Live Oak Hill, and the 1879 Immaculate Conception/St. Mary's building.",
      "A 1905 fire destroyed the prior church. The current building dates to 1906. The church is often described informally as 'Ellinger's St. Mary's,' but 'Hostyn Hill' is the more precise location label.",
      "A 2015 Houstonia feature describes the gilded altar, religious statuary and plain blue ceiling, contrasting them with the elaborate frescoes at High Hill. The 1983 National Register Churches with Decorative Interior Painting group does not include this Hostyn Hill church, but the details documented by Houstonia make it a worthwhile companion stop on a regional heritage trip."
    ],
    timeline:[
      {year:"1850s",detail:"German and Czech families received visits from Catholic clergy in the Ross Prairie area."},
      {year:"1864",detail:"The congregation acquired the site associated with Hostyn Hill."},
      {year:"1879",detail:"A larger church named Immaculate Conception of the Blessed Virgin Mary (St. Mary's) was built."},
      {year:"1905",detail:"Fire destroyed the previous building."},
      {year:"1906",detail:"The current Gothic-style church was erected at Hostyn Hill."},
      {year:"2005",detail:"The active parish records a complete renovation of the church, whose intricate altar remains a point of interest."},
      {year:"1986",detail:"A Texas Sesquicentennial historical marker recorded the parish's chronology."}
    ],
    architecture:[
      "The Texas Historical Commission identifies the 1906 church as Gothic-styled; an arched-windowed wooden exterior and pointed steeple appear in independent reporting.",
      "Houstonia describes a richly gilded altar and colorful statues set against a comparatively simple azure ceiling. Rather than equating altar ornament with the extensive murals and stenciling of formally listed Painted Churches, this guide presents Hostyn Hill as a related historic stop worth seeing."
    ],
    visitorNotes:[
      "From Ellinger, the historical marker directions are northeast on FM 2503 for roughly two miles, then east on CR 250 for about half a mile. Independently verify road conditions and access before departure.",
      "The grounds and adjacent cemetery are part of a living religious site. The active parish lists St. Mary's at 815 St. Mary's Church Road; check its service schedule and verify any sightseeing access in advance.",
      "Nearby Ellinger and Fayette County heritage itineraries can be paired with the established Schulenburg-area Painted Churches route without describing this church as part of the verified core six."
    ],
    significance:["Distinctive Ross Prairie/Hostyn Hill German-Czech parish history","A documented 1905 fire and 1906 rebuilding","An excellent companion stop for Painted Churches visitors because of the gilded altar, religious statuary and blue ceiling, without implying a National Register decorative-interior designation"],
    sources:[
      {label:"Texas Historical Commission marker 5149004468",url:"https://atlas.thc.texas.gov/Details/5149004468",type:"historical-marker"},
      {label:"St. Mary's official parish history and 2005 renovation",url:"https://stjohnfayetteville.com/st-mary-history",type:"parish"},
      {label:"St. Mary and St. John parish visitor information",url:"https://stjohnfayetteville.com/",type:"parish"},
      {label:"Houstonia: In Ellinger, the painted church you may have missed",url:"https://www.houstoniamag.com/travel-and-outdoors/2015/12/in-ellinger-the-painted-church-you-may-have-missed",type:"independent"}
    ],
    faq:[
      { question:"Is St. Mary's at Hostyn Hill the same as Hostyn near La Grange?", answer:"No. Hostyn Hill near Ellinger is the St. Mary parish connected with St. John in Fayetteville. The separately named Hostyn parish near La Grange is a different church." },
      { question:"What can visitors see inside St. Mary's at Hostyn Hill?", answer:"Houstonia describes its gilded altar, colorful religious statuary and simple azure ceiling; the parish reports that the sanctuary underwent a complete renovation in 2005." },
      { question:"Is Hostyn Hill part of the official 1983 decorative-interior National Register group?", answer:"No. It is a recommended companion historic-church stop, valued for its own architectural and artistic features, rather than one of the 1983 National Register Churches with Decorative Interior Painting entries." },
      { question:"When was the current church built?", answer:"Both the parish history and the Texas Historical Commission date the Gothic-style replacement to autumn 1906, after the previous church burned at Easter in 1905." },
      { question:"Where is St. Mary's and can visitors enter?", answer:"The parish lists 815 St. Mary's Church Road near Fayetteville. This is an active worship site; confirm current service times and interior access with the parish." }
    ],
    photoReferences:[{label:"53 church, sanctuary, art, and cemetery photographs — Bill Jacomet Flickr album",pageUrl:"https://www.flickr.com/photos/jacofoto/albums/72157626970644639/",photographer:"Bill Jacomet",reuseStatus:"permission-required",note:"Fifty-three photographs of the exact Hostyn Hill property are available for viewing; at least one checked album photo explicitly says All rights reserved. Treat the album as a rights-request source, not a commercial-use image license."},{label:"Current exterior photograph gallery — Poppypics",pageUrl:"https://poppypics.pixieset.com/stmaryscatholicchurchbuilt1906fayettevilletexas/",photographer:"Poppypics",reuseStatus:"permission-required",note:"Church-specific modern exterior photographs on a professional gallery; no transferable commercial publication license confirmed."},{label:"2021 church and Texas historical marker photographs — HMDB",pageUrl:"https://www.hmdb.org/m.asp?m=184104",photographer:"James Hulse",reuseStatus:"permission-required",note:"Four exact-property and marker images; re-publication requires rights authorization."},{label:"Photographs of St. Mary's Hostyn Hill sanctuary and exterior",pageUrl:"https://www.houstoniamag.com/travel-and-outdoors/2015/12/in-ellinger-the-painted-church-you-may-have-missed",reuseStatus:"permission-required",note:"Houstonia published verified photographs of the actual church, but its magazine photographs are not licensed for republication."},{label:"St. Mary's at Hostyn Hill / Ellinger photograph (2017)",pageUrl:"https://www.flickr.com/photos/pallrokk/37289127901/",photographer:"Jason John Paul Haskins",reuseStatus:"noncommercial-only",note:"CC BY-NC-SA 2.0: noncommercial photo, not approved for ad-supported TexasDefined use without separate written permission."}],
    imageStatus:"awaiting-licensed-photos",
    paintedStatus:"related-historic",
    related:[{href:"/explore/painted-churches",label:"Painted Churches of Texas",why:"See Hostyn Hill as a complementary historic stop to the decorated church circuit"},{href:"/explore/painted-churches/census",label:"Painted Churches classification and related stops",why:"Understand the narrower National Register list and nearby heritage suggestions"},{href:"/county/fayette",label:"Fayette County guide",why:"Plan Ellinger and Schulenburg heritage travel"}],
    reviewedOn:"2026-10-12"
  },
  {
    slug:"blessing-st-peters-catholic-church",
    name:"St. Peter's Catholic Church",shortName:"St. Peter's, Blessing",locality:"Blessing",county:"Matagorda",
    address:"206 N. Hickory Street, Blessing, TX 77419",denomination:"Roman Catholic",
    foundation:"Mass in the community by 1912; first church building completed in 1915",
    presentBuilding:"1976",
    summary:"A Matagorda County parish tied to Blessing's early settlement: 1912 home Masses, a donated 1914 church lot, wartime chapel reuse, and today's church.",
    quickAnswer:"St. Peter's in Blessing grew from home Masses recorded in 1912 to a 1915 church, then worshiped in a converted Army chapel in 1948. The 2008 Texas Historical Commission subject marker dates the present building's dedication to 1976.",
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
      "The parish's contact page and the Diocese of Victoria locate the church at 206 Hickory Street. A separate parish event lists its small hall at 306 Hickory Street: do not send readers to the hall for the church entrance. Check official Mass times and interior access before visiting.",
      "Historic photography of the 1915 structure or 1948 Army chapel requires provenance and reproduction permission before publication.",
      "Pair the stop with Blessing's railroad-era community history and Matagorda County cultural sites; the parish is not a public attraction with advertised tour hours."
    ],
    significance:["Early community worship tied to Blessing's townsite development","Documented reuse of a military chapel","Continuing parish service in Matagorda County"],
    sources:[
      {label:"St. Peter's parish and visitor information",url:"https://stpeterblessing.org/",type:"parish"},
      {label:"Current parish contact: church at 206 Hickory Street",url:"https://www.stpeterblessing.org/contact-us",type:"parish"},
      {label:"Parish history index",url:"https://stpeterblessing.org/history-of-st-peters-catholic-church",type:"parish"},
      {label:"THC historical marker number 15337 and Matagorda County research file",url:"https://www.usgenwebsites.org/TXMatagorda/stpeter/church_bl_st_peters.htm",type:"archive"},
      {label:"Photographic record and inscription for marker 15337",url:"https://www.hmdb.org/m.asp?m=168640",type:"independent"},
      {label:"Matagorda County historical marker dedication records",url:"https://www.usgenwebsites.org/TXMatagorda/mchc/mchc.htm",type:"archive"},
      {label:"Parish event address confirmation",url:"https://www.stpeterblessing.org/events/knights-of-columbus-meeting-4/20260915",type:"parish"}
    ],
    faq:[
      { question:"Was St. Peter's church in Blessing built in 1915 or 1976?", answer:"The original dedicated building was completed in 1915. The congregation later used a remodeled Army chapel before the present sanctuary was dedicated in 1976." },
      { question:"Why did this parish worship in an Army chapel?", answer:"After acquiring new property in 1947, the congregation opened a remodeled military chapel there in 1948, using it until the current building replaced it." },
      { question:"Does the church have a historical marker?", answer:"Yes. Texas Historical Commission marker 15337 recounts the local parish history. Matagorda County Historical Commission records its dedication in 2009." },
      { question:"Are sightseeing tours offered?", answer:"The active parish publishes worship information, but no guaranteed tourism hours were established in the reviewed official material. Contact the church before attempting an interior visit." }
    ],
    photoReferences:[{label:"Three photographs of St. Peter's Catholic Church and its historical marker",pageUrl:"https://www.hmdb.org/m.asp?m=168640",photographer:"James Hulse",reuseStatus:"permission-required",note:"The Historical Marker Database includes actual photographs of the sanctuary viewed from the road and its marker; the photographer/site have not granted a commercial republication license."}],
    imageStatus:"awaiting-licensed-photos",
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
    faq:[
      { question:"What year was the present St. Joseph's church in Moulton built?", answer:"The active parish records a cornerstone in 1924. The exact completion year is not inferred from that milestone alone." },
      { question:"What happened to the parish school?", answer:"The Sisters of Divine Providence opened it in 1894; a fire destroyed the first school in 1902, and a replacement followed. The school closed in 1965." },
      { question:"Why does this church matter to Moulton history?", answer:"German and Czech settlers formed the parish during the community's railroad growth. Its church, school and affiliated immigrant communities are documented in parish and Texas Historical Commission records." },
      { question:"Can visitors tour the church?", answer:"It is an active place of worship. Confirm interior access and current service information directly with the parish before visiting." }
    ],
    imageStatus:"rights-cleared",
    paintedStatus:"research-candidate",
    related:[{href:"/county/lavaca",label:"Lavaca County guide",why:"Explore the region's settlement and school histories"},{href:"/explore/painted-churches",label:"Painted Churches of Texas",why:"Distinguish historic churches from documented decorative-painting sites"}],
    reviewedOn:"2026-10-12"
  },
  {
    slug:"frelsburg-sts-peter-and-paul",
    name:"Saints Peter and Paul Catholic Church",shortName:"Sts. Peter and Paul, Frelsburg",locality:"Frelsburg",county:"Colorado",
    address:"1031 Church Lane, Frelsburg, TX",
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
      "The 1927–1928 sanctuary is a post-fire replacement in the parish\'s long sequence. The Texas Historical Commission identifies classical Corinthian columns, dentils and pedimented gable ends alongside Gothic windows and Tudor-arched double doors. Historic imagery from 1844, 1861 and 1912 must never be presented as today\'s sanctuary.",
      "The historic German altars and later stained glass are notable; neither by itself proves a qualifying historic decorative wall/ceiling painting program."
    ],
    visitorNotes:[
      "The parish is in Frelsburg near the FM 109 and FM 1291 area; use the official parish contact and directions before visiting.",
      "This is an active worship space. Current Mass times, events and cemetery access take precedence over tourist expectations.",
      "A broader visit can connect Frelsburg, Columbus and New Ulm, while distinguishing their separate congregations and denominations."
    ],
    significance:["One of the older documented Texas Catholic parishes","Early seminary and wide regional mission influence","Texas Historical Commission Recorded Texas Historic Landmark (RTHL)","1926 fire and the 1927–1928 church's German altars"],
    sources:[
      {label:"Saints Peter and Paul parish history",url:"https://www.peterandpaulparish.com/brief-parish-history",type:"parish"},
      {label:"Texas Historical Commission historical marker 5089004490 (RTHL)",url:"https://atlas.thc.texas.gov/Details/5089004490",type:"historical-marker"},
      {label:"Current parish information",url:"https://www.peterandpaulparish.com/",type:"parish"}
    ],
    image:{file:"Frelsburg TX Catholic Church.jpg",alt:"Saints Peter and Paul Catholic Church in Frelsburg, Texas",author:"Djmaschek",license:"CC BY-SA 4.0",sourceUrl:"https://commons.wikimedia.org/wiki/File:Frelsburg_TX_Catholic_Church.jpg",width:1600,height:1200},
    gallery:[{file:"Frelsburg TX Catholic Marker.jpg",alt:"Historical marker for Saints Peter and Paul in Frelsburg",author:"Djmaschek",license:"CC BY-SA 4.0",sourceUrl:"https://commons.wikimedia.org/wiki/File:Frelsburg_TX_Catholic_Marker.jpg",width:1600,height:1200}],
    faq:[
      { question:"Is the historic Frelsburg church St. Mary's?", answer:"No. The church is Saints Peter and Paul Catholic Church, an early German Catholic community with worship roots dating to 1844." },
      { question:"Why does the present church date to 1928?", answer:"A fire in 1926 destroyed the 1912 sanctuary; the congregation completed the replacement church in 1928." },
      { question:"Why is Frelsburg significant to Catholic history in Texas?", answer:"The early parish was a regional missionary center and established a Catholic theological seminary in Frelsburg in 1854, according to parish history." },
      { question:"What notable architecture survives?", answer:"The Texas Historical Commission records classical Corinthian columns alongside Gothic windows and Tudor-arched double doors. The parish also identifies altars imported from Germany." },
      { question:"Can the church be visited?", answer:"It remains an active Catholic parish. Consult current parish contacts and service information before planning a special interior visit." }
    ],
    imageStatus:"rights-cleared",
    paintedStatus:"research-candidate",
    related:[{href:"/county/colorado",label:"Colorado County guide",why:"Connect Frelsburg with Columbus and New Ulm"},{href:"/explore/painted-churches",label:"Painted Churches of Texas",why:"Compare historic altars with verified decorative-painting interiors"}],
    reviewedOn:"2026-10-12"
  },

  {
    slug:"nacogdoches-zion-hill-baptist-church", name:"Zion Hill Baptist Church Historic Site", shortName:"Zion Hill, Nacogdoches", locality:"Nacogdoches", county:"Nacogdoches", address:"324 N. Lanana Street, Nacogdoches, TX 75961",
    denomination:"Historically African American Baptist", foundation:"Congregation organized in 1878 or 1879 (sources differ)", presentBuilding:"1914",
    summary:"Explore Zion Hill's African American religious and community history, Diedrich Rulfs's 1914 architecture and its restoration as a public historic site.",
    quickAnswer:"Zion Hill is a restored 1914 historic Baptist church building in Nacogdoches, originally serving an African American congregation organized in the late 1870s. The congregation left the building in 1987; the city now interprets it as a public historic site.",
    historicalContext:["The City of Nacogdoches dates the congregation to 1878, while the Texas Historical Commission marker says Reverend Lawson Reed organized it in 1879. Both sources agree on its early importance to the African American community.","German-born architect Diedrich Rulfs designed the present building, completed in 1914. It combines Victorian features with Gothic Revival detailing.","The congregation relocated in 1987. After years of vacancy, the historic sanctuary was restored and opened for public interpretation, events and tours."],
    timeline:[{year:"1878–1879",detail:"Founding dates differ between the city and Texas Historical Commission; Reverend Lawson Reed led the early congregation."},{year:"1914",detail:"Present church building constructed to a Diedrich Rulfs design."},{year:"1977",detail:"Texas Historical Commission Recorded Texas Historic Landmark designation."},{year:"1987",detail:"Congregation moved out of the historic building."},{year:"2020s",detail:"City restoration and public historic-site programming."}],
    architecture:["Rulfs's design combines Victorian massing and Gothic Revival detail; the local heritage survey describes towers, pointed sanctuary windows and an octagonal roof dome.","The Texas Historical Commission identifies this as a Recorded Texas Historic Landmark; no painted-interior census claim is made."],
    visitorNotes:["City historic-site information lists tours Wednesday through Friday and the first two Saturdays of the month, 10 a.m.–4 p.m.; verify before travel.","The historic building is city-managed and is not the congregation's present worship address.","Official site: https://www.nactx.us/882/Zion-Hill-Baptist-Church"],
    significance:["Early African American religious and social life in East Texas","Architect Diedrich Rulfs's historic church design","Restored publicly interpreted historic site"],
    sources:[{label:"City of Nacogdoches historic site and visitor information",url:"https://www.nactx.us/882/Zion-Hill-Baptist-Church",type:"parish"},{label:"Texas Historical Commission marker 9403",url:"https://atlas.thc.texas.gov/Details/5347009403",type:"historical-marker"},{label:"Stephen F. Austin State University heritage survey",url:"https://www.sfasu.edu/heritagecenter/681.asp",type:"archive"}],
    imageStatus:"awaiting-licensed-photos",paintedStatus:"not-established",
    faq:[{question:"When was Zion Hill Baptist Church built?",answer:"The present historic building was constructed in 1914 to a design by Diedrich Rulfs."},{question:"Is Zion Hill still an active church congregation at this address?",answer:"The historic congregation relocated in 1987. The 1914 building is now managed as a public historic site by the City of Nacogdoches."},{question:"Can visitors tour Zion Hill?",answer:"The city advertises free public tours on designated days. Check the official historic-site page for current access."},{question:"Who founded Zion Hill?",answer:"Reverend Lawson Reed led the early congregation; city and state sources differ by one year on its founding date."}],
    related:[{href:"/county/nacogdoches",label:"Nacogdoches County guide",why:"Explore regional heritage sites"}],reviewedOn:"2026-10-18"
  },
  {
    slug:"dallas-st-paul-united-methodist-church",name:"St. Paul United Methodist Church",shortName:"St. Paul UMC, Dallas",locality:"Dallas",county:"Dallas",address:"1816 Routh Street, Dallas, TX 75201",denomination:"United Methodist",foundation:"Congregation organized in 1873",presentBuilding:"Historic church building; confirm construction date with church or designation documentation",
    summary:"Discover the Freedman's Town origins of one of Dallas's earliest African American Methodist congregations and its continuing ministry on Routh Street.",
    quickAnswer:"St. Paul United Methodist Church traces its beginnings to an African American Methodist congregation organized in Dallas's Freedman's Town in 1873. It remains an active church at 1816 Routh Street.",
    historicalContext:["According to the Texas Historical Commission, residents of Freedman's Town gathered under a brush arbor in 1873 with Methodist ministers H. Oliver and William Bush.","Anthony Norton donated an early site; the congregation's first frame sanctuary also served as a school for African American children.","The church's historical marker recognizes its place in African American Dallas and its Gothic Revival architecture; the North Texas Conference confirms its present identity and worship address."],
    timeline:[{year:"1873",detail:"Congregation organized in Freedman's Town under a brush arbor."},{year:"2013",detail:"Texas Historical Commission marker recorded the church's history."},{year:"2026",detail:"North Texas Conference directory continues to list St. Paul UMC at 1816 Routh Street."}],
    architecture:["Texas Historical Commission classifies the historic site under Gothic Revival ecclesiastical architecture.","Do not assume interior photography or unrestricted visitor access; this is an active congregation."],
    visitorNotes:["Consult the North Texas Conference listing for current church contacts and worship times.","The church is an active worship site, not a museum; seek permission for photography and interior visits.","Official conference listing: https://ntcumc.org/churches/st-paul-umc"],
    significance:["Freedman's Town African American faith and education history","Continuing Methodist community in central Dallas","Texas Historical Commission historic landmark record"],
    sources:[{label:"Texas Historical Commission marker 17802",url:"https://atlas.thc.texas.gov/Details?atlasnumber=5507017802",type:"historical-marker"},{label:"North Texas Conference official church listing",url:"https://ntcumc.org/churches/st-paul-umc",type:"parish"},{label:"United Methodist Church official congregation directory",url:"https://www.umc.org/en/find-a-church/church?id=001Um00000PFOVAIA5",type:"parish"}],
    imageStatus:"awaiting-licensed-photos",paintedStatus:"not-established",
    faq:[{question:"When was St. Paul United Methodist Church founded?",answer:"Its congregation was organized in 1873 in Dallas's Freedman's Town."},{question:"Where is St. Paul UMC in Dallas?",answer:"The North Texas Conference lists 1816 Routh Street, Dallas, Texas 75201."},{question:"Why is St. Paul historically significant?",answer:"Its early congregation provided a place of worship and schooling for African American families in post-emancipation Dallas."},{question:"Can visitors enter the church?",answer:"It remains an active congregation; check with church staff for worship times or permission for a special visit."}],
    related:[{href:"/county/dallas",label:"Dallas County guide",why:"Explore Dallas's historic communities"}],reviewedOn:"2026-10-18"
  },

];

export const historicChurchBySlug = (slug: string) => historicChurches.find(church => church.slug === slug);
export const historicChurchHref = (slug: string) => "/explore/historic-churches/" + slug;
export const historicChurchImageSrc = (image: HistoricChurchImage) => "https://commons.wikimedia.org/wiki/Special:Redirect/file/" + encodeURIComponent(image.file);
