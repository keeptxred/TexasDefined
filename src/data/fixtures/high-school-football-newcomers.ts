import footballHero from "@/assets/high-school-football-hero.jpg";
import type { Article, ArticleBlock } from "../types";
const p=(text:string):ArticleBlock=>({type:"paragraph",text});
const h=(text:string):ArticleBlock=>({type:"heading",text});
const list=(...items:string[]):ArticleBlock=>({type:"list",items});

export const highSchoolFootballNewcomersArticle: Article = {
  id:"evergreen-high-school-football-newcomers", brandId:"texasdefined", slug:"texas-high-school-football-newcomers",
  title:"Texas High School Football for Newcomers: Why Friday Night Matters",
  dek:"The bands, stadium lights and rivalries are only the surface. Texas high school football is part sport, part civic ritual and part small-town calendar.",
  category:"sports", hero:{src:footballHero,alt:"Illustrated Texas high school football players walking toward a lit stadium at sunset",width:1600,height:900},
  authorId:"a-marisol", publishedAt:"2026-08-07", readingMinutes:10,
  tags:["texas high school football","friday night lights","texas sports","uil football","texas culture"], featured:true,
  internalLinks:[
    {href:"/sports",label:"Explore Texas sports",description:"More stories about the games and traditions Texans follow."},
    {href:"/sports-venues/high-school-football",label:"Explore landmark Texas high-school football stadiums",description:"Browse verified stadium guides tied to Friday night lights, playoff trips and regional football culture."},
    {href:"/explore/small-towns",label:"Explore Texas small towns",description:"See the communities where Friday night can still set the weekly rhythm."},
    {href:"/article/texas-regions-explained",label:"Texas regions explained",description:"Football culture changes with the places Texans call home."},
    {href:"/events",label:"See what is happening around Texas",description:"Find events and reasons to get out this weekend."}
  ], relatedCollections:[], relatedDestinations:[],
  body:[
    p("In much of Texas, Friday night is not merely when the high school football game happens. It is when the town gathers."),
    p("The players are teenagers, but the audience can span generations. Parents arrive early. Alumni know the old rivalries. The marching band, drill team, cheerleaders and student section turn the game into a community production. In smaller towns, the stadium may be the brightest place for miles."),
    h("Why football became so large here"),
    p("Texas had the right ingredients for high school football to become unusually important: fast-growing towns, strong school identities, long travel distances, a warm climate and communities that needed shared institutions. Football offered a recurring public event where nearly everyone could take part somehow."),
    p("Over decades, that importance reinforced itself. Better facilities drew bigger crowds. Bigger crowds strengthened rivalries. Successful programs became sources of civic pride. Kids grew up watching older players and imagining their own turn under the lights."),
    h("The UIL gives the season its structure"),
    p("Public-school athletics in Texas are organized largely through the University Interscholastic League. Schools are grouped by enrollment classifications and districts, which shape schedules and playoff paths."),
    p("For newcomers, the classification letters and divisions can feel like alphabet soup. The practical point is simple: schools generally compete against others of similar enrollment, then advance through district play into a large statewide playoff system."),
    h("District games matter more"),
    p("Early-season games can be exciting, but district play usually determines playoff qualification. That changes the atmosphere. A rivalry game inside the district can affect both bragging rights and the postseason."),
    h("Why the stadiums can be enormous"),
    p("Some Texas high school stadiums look closer to small college venues than school fields. That reflects attendance, local tax investment, multipurpose use and the cultural importance of athletics. It also creates recurring debates about priorities and spending."),
    p("The stadium is often used for more than varsity football: bands, soccer, track, graduation and community events can all share the facility."),
    h("The band is not background music"),
    p("A Texas football night is also a marching-band event. Halftime performances can involve hundreds of students, months of preparation and competitions separate from football itself. In many districts, band culture is every bit as serious as the team on the field."),
    h("Homecoming, mums and traditions newcomers may not expect"),
    p("Homecoming in Texas can involve one of the state's strangest-looking traditions to outsiders: oversized mums decorated with ribbons, bells, names and school colors. What began as a floral corsage tradition became something much larger and more elaborate."),
    p("Different schools also have their own rituals—fight songs, hand signs, entrances, victory bells, bonfires or long-running rivalry trophies."),
    h("Small towns and suburbs experience it differently"),
    p("In a small town, one high school may carry the identity of the whole community. In a large suburban district, several major high schools can have intense rivalries only a few miles apart. In big cities, football competes with professional sports and countless other activities, but powerhouse programs can still draw major attention."),
    h("What newcomers should expect on Friday night"),
    list("Buy tickets early for major rivalry games.","Arrive before kickoff if you want parking and time to see pregame traditions.","Expect marching bands, cheer squads, drill teams and student sections to be central to the atmosphere.","District games and rivalry games usually carry the most weight.","Be ready for weather—from September heat to late-season cold fronts."),
    h("Recruiting adds another layer"),
    p("Top Texas players are heavily recruited by college programs. That attention can make a high school game feel connected to the larger football world. Fans may already know which seniors have scholarship offers and which underclassmen are becoming prospects."),
    p("But the majority of players will never become major college stars. For most families and communities, the value of the night is not a pipeline to professional football. It is the shared experience."),
    h("Why Friday night still matters"),
    p("Texas has changed dramatically. Metro areas have exploded, newcomers arrive from around the country and entertainment options are endless. Yet high school football persists because it offers something modern life often lacks: a regular place where a community physically shows up together."),
    p("You do not have to care about football to understand the role it plays. Watch the band line up, the grandparents find their seats, the student section paint its faces and the town go quiet before kickoff. That is the real event."),
    p("The scoreboard decides the game. Friday night explains the culture.")
  ]
};
