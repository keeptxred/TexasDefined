import rodeoHero from "@/assets/rodeo-101-hero.svg";
import type { Article, ArticleBlock } from "../types";
const p=(text:string):ArticleBlock=>({type:"paragraph",text});
const h=(text:string):ArticleBlock=>({type:"heading",text});
const list=(...items:string[]):ArticleBlock=>({type:"list",items});

export const rodeo101Article: Article = {
  id:"evergreen-rodeo-101", brandId:"texasdefined", slug:"rodeo-101-guide-events-rules-traditions",
  title:"Rodeo 101: A Texan’s Guide to the Events, Rules and Traditions",
  dek:"From bronc riding and bull riding to barrels and roping, here is what you are actually watching when the chute opens.",
  category:"sports", hero:{src:rodeoHero,alt:"Illustrated cowboy riding a bucking bronc in a Texas rodeo arena",width:1600,height:900},
  authorId:"a-marisol", publishedAt:"2026-08-07", readingMinutes:11,
  tags:["texas rodeo","bull riding","barrel racing","bronc riding","texas culture","rodeo guide"], featured:true,
  internalLinks:[
    {href:"/sports",label:"Explore Texas sports",description:"More on the competitions and traditions that draw a Texas crowd."},
    {href:"/events",label:"Find Texas events",description:"Look for rodeos, fairs and festivals happening around the state."},
    {href:"/article/texas-regions-explained",label:"Texas regions explained",description:"See the landscapes and ranching country behind the culture."},
    {href:"/explore",label:"Explore Texas",description:"Build a trip around the places and traditions that define the state."}
  ], relatedCollections:[], relatedDestinations:[],
  body:[
    p("A rodeo can move fast if you do not know what you are watching. A gate swings open, an animal explodes into the arena, the clock stops and everyone around you seems to know whether the run was good before the announcer says a word."),
    p("The basics are easier than they look. Rodeo is a group of events built from ranch skills, horsemanship and roughstock competition. Some events are scored by judges. Others are races against the clock. Once you know which is which, the whole night makes more sense."),
    h("Two basic kinds of rodeo events"),
    list("Roughstock events are judged: bareback riding, saddle bronc riding and bull riding.","Timed events race the clock: barrel racing, steer wrestling, tie-down roping and team roping."),
    h("Bareback riding"),
    p("A bareback rider uses a rigging rather than a saddle and tries to stay aboard a bucking horse for eight seconds. Judges score both the rider and the horse. The rider must also follow a mark-out rule at the start of the ride, with the spurs positioned properly as the horse's front feet hit the ground out of the chute."),
    p("What looks chaotic is highly technical. Rhythm, body position and the rider's spur motion all matter."),
    h("Saddle bronc riding"),
    p("Saddle bronc is often called rodeo's classic event because of its roots in ranch horse-breaking traditions. The rider uses a specialized saddle and a single rein, trying to match the horse's movement for eight seconds."),
    p("Like bareback, half the score can come from the animal and half from the rider. A difficult horse can create the opportunity for a bigger score if the rider handles the ride well."),
    h("Bull riding"),
    p("Bull riding is the event most casual fans recognize. The rider attempts to stay on a bucking bull for eight seconds using one hand on a bull rope. Touching the bull or the rider's own body with the free hand can result in disqualification."),
    p("Scores reward both the bull's difficulty and the rider's control. The bullfighters in the arena are not decorative; their job is to distract the bull and protect the rider after a dismount."),
    h("Barrel racing"),
    p("Barrel racing is a timed event built around a cloverleaf pattern of three barrels. Horse and rider sprint into the arena, circle the barrels in sequence and race back across the line."),
    p("Knocking over a barrel usually adds a time penalty. Tiny differences matter, which is why a clean, tight turn can decide the event."),
    h("Steer wrestling"),
    p("Also called bulldogging, steer wrestling begins with a mounted cowboy chasing a steer. The competitor leaves the horse, catches the steer by the horns and uses leverage to bring it to the ground with all four legs positioned correctly."),
    p("A hazer rides alongside the steer to help keep it running straight. The clock makes the event brutally unforgiving."),
    h("Tie-down roping"),
    p("In tie-down roping, a mounted competitor ropes a calf, dismounts, reaches the animal and ties three legs. The tie must remain secure for the required period after the roper remounts and gives slack to the rope."),
    p("The event grew from practical ranch work, though modern rodeo rules are designed around competition and animal handling standards rather than literal ranch necessity."),
    h("Team roping"),
    p("Team roping is the only standard rodeo event with two contestants working together. The header ropes the steer around the horns, neck or a horn-and-neck combination; the heeler then ropes both hind legs. The clock stops when the horses face each other with the ropes tight."),
    p("A one-leg catch by the heeler typically adds a penalty, so accuracy matters as much as speed."),
    h("How scoring works in roughstock"),
    p("Judged rides are commonly scored on a 100-point scale, with points divided between the animal and rider. A powerful animal that spins, kicks and changes direction can score highly, while the rider earns points for control, style and technique."),
    p("That is why a rider can complete eight seconds and still lose to someone whose ride looked more difficult and more controlled."),
    h("Why the animals matter so much"),
    p("Top rodeo animals are athletes with reputations, records and bloodlines. Cowboys and fans know which bulls and broncs are especially difficult. Drawing a famous animal can be both bad luck and a chance at a winning score."),
    h("What to wear if you are just going to watch"),
    p("You do not need to buy cowboy boots for one night. Jeans, comfortable shoes and weather-appropriate clothes are fine. A hat is normal, not mandatory. At outdoor rodeos, heat, dust and sudden weather matter more than costume accuracy."),
    h("Arena traditions worth knowing"),
    p("Many rodeos begin with a grand entry, presentation of the American and Texas flags, the national anthem and recognition of military members or first responders. Large rodeos may combine professional competition with livestock shows, concerts, carnival rides and youth agricultural programs."),
    h("Rodeo is bigger than the eight-second ride"),
    p("In Texas, rodeo connects modern entertainment with ranching history, agricultural education, livestock breeding, scholarship programs and local identity. A small-town rodeo and a massive metropolitan livestock show can feel very different, yet both draw from the same vocabulary of animals, horsemanship and competition."),
    p("Once you understand the events, the arena slows down. You start seeing the setup before the run, the technique inside the chaos and the tiny mistakes that separate a winning time from the rest of the field."),
    p("Then the chute opens again—and eight seconds feels like plenty of time.")
  ]
};
