import orderingBbqHero from "@/assets/ordering-bbq-hero.jpg";

import type { Article, ArticleBlock } from "../types";
const p=(text:string):ArticleBlock=>({type:"paragraph",text});
const h=(text:string):ArticleBlock=>({type:"heading",text});
const list=(...items:string[]):ArticleBlock=>({type:"list",items});

export const orderingTexasBarbecueArticle: Article = {
  id:"evergreen-ordering-texas-barbecue", brandId:"texasdefined", slug:"beginners-guide-ordering-texas-barbecue",
  title:"A Beginner’s Guide to Ordering Texas Barbecue",
  dek:"New to a Texas barbecue counter? Here is how to order brisket, ribs, sausage, sides and sauce without turning lunch into a vocabulary test.",
  category:"food-bbq", hero:{src:orderingBbqHero,alt:"An illustrated Texas barbecue tray with brisket, pickles and sides",width:1600,height:900},
  authorId:"a-marisol", publishedAt:"2026-08-07", readingMinutes:9,
  tags:["texas barbecue","brisket","bbq etiquette","texas food","barbecue guide"], featured:true,
  internalLinks:[
    {href:"/article/texas-barbecue-styles-explained",label:"Texas barbecue styles explained",description:"See how Central, East, South and West Texas traditions differ."},
    {href:"/explore/food-bbq",label:"Explore Food & BBQ",description:"Find more Texas food stories and places worth the drive."},
    {href:"/article/texas-regions-explained",label:"Texas regions explained",description:"Understand the places behind different Texas food traditions."},
    {href:"/explore",label:"Explore Texas",description:"Plan the rest of the trip around the meal."}
  ], relatedCollections:[], relatedDestinations:[],
  body:[
    p("Walking into a serious Texas barbecue joint for the first time can feel oddly high stakes. There is usually a line. Someone in front of you appears to know exactly how many slices of brisket equal half a pound. The cutter is holding a knife the size of your forearm. You are suddenly aware that 'some barbecue' is not an order."),
    p("The ritual is easier than it looks. Most places want you to have a great meal, not pass an exam. Learn a few basics and you can order with confidence."),
    h("Start with brisket"),
    p("If you are trying a Texas barbecue place for the first time, brisket is the natural benchmark. The brisket has two main muscles: the leaner flat and the fattier point. At many counters you can ask for lean, moist or fatty brisket, or simply request a mix."),
    list("Lean brisket comes mostly from the flat and slices neatly.","Moist or fatty brisket usually includes more of the point and richer rendered fat.","A mix is the safest first order if you want to compare both textures.","Order by weight when the restaurant sells meat by the pound."),
    h("How much should you order?"),
    p("A quarter pound of one meat is a tasting portion. A half pound is a substantial serving for many people, especially with sides. If you want to sample several meats, split smaller amounts instead of ordering a half pound of everything."),
    p("For two people, a practical first plate might be half a pound of brisket, one sausage link, a few ribs and two sides. Adjust for appetite and the fact that leftovers are rarely a tragedy."),
    h("Do not skip the sausage"),
    p("Texas sausage can be one of the clearest signals of a pit's personality. Some links are coarse and beefy, others smooth, garlicky, jalapeño-heavy or packed with cheese. In Central Texas especially, sausage connects modern barbecue to older meat-market traditions."),
    h("Ribs: pork or beef?"),
    p("Pork ribs are common, easier to share and usually less expensive. Beef ribs are huge, rich and dramatic. A single beef rib can feed more than one person, so ask about weight and price before treating it like a side item."),
    h("What about turkey, pulled pork and other meats?"),
    p("Good Texas barbecue has never been limited to brisket. Smoked turkey can be excellent when the pit keeps it juicy. Pulled pork appears more often than old stereotypes suggest. Some places specialize in barbacoa, cabrito, boudin, pastrami or creative sausages. If the restaurant is proud of something unusual, try it."),
    h("Sides tell you what kind of place you are in"),
    p("Potato salad, beans, coleslaw and mac and cheese are common, but sides have become one of the most creative parts of modern Texas barbecue. You may find esquites, charro beans, green-chile dishes, dirty rice or vegetables with strong regional influences."),
    p("One rule works almost everywhere: do not fill the tray with sides before you know how much meat you ordered."),
    h("Sauce is not a moral issue"),
    p("The old joke says good Texas barbecue does not need sauce. That is useful only up to a point. Taste the meat first so you understand the bark, smoke and seasoning. Then use sauce if you like it. In East Texas and many other traditions, sauce is part of the style rather than a rescue operation."),
    h("Bread, pickles and onions are there for a reason"),
    p("White bread can look humble next to a carefully smoked brisket, but it works. It catches juices, resets the palate and turns scraps into a quick sandwich. Pickles and onions cut through fat and smoke. Jalapeños add heat and acidity."),
    h("Know the counter flow"),
    list("Decide roughly what meats you want before reaching the cutter.","Order meat by weight or piece depending on the menu.","Move to sides without blocking the line.","Pick up bread, pickles, onions and sauce where the restaurant directs you.","Pay, find a seat and stop worrying about whether you looked like a local."),
    h("The bark and smoke ring are not the whole score"),
    p("A dark bark is a good sign, but barbecue should be judged by the whole bite: seasoning, tenderness, moisture, smoke and balance. A pink smoke ring looks impressive but is not proof by itself that the meat was cooked well."),
    h("The easiest first order"),
    p("If you want one simple formula: ask for a quarter pound each of lean and fatty brisket, one sausage link, one pork rib and two sides for two people. Add more if you are hungry. That plate gives you enough range to understand the restaurant without ordering half the menu."),
    p("Texas barbecue has traditions, but lunch is still lunch. Order what sounds good, taste the meat before drowning it in sauce, and leave room to try something you did not plan on.")
  ]
};
