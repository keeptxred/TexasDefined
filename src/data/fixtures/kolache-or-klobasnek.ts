import kolacheHero from "@/assets/kolache-klobasnek-hero.jpg";
import type { Article, ArticleBlock } from "../types";
const p=(text:string):ArticleBlock=>({type:"paragraph",text});
const h=(text:string):ArticleBlock=>({type:"heading",text});
const list=(...items:string[]):ArticleBlock=>({type:"list",items});

export const kolacheOrKlobasnekArticle: Article = {
  id:"evergreen-kolache-klobasnek", brandId:"texasdefined", slug:"kolache-or-klobasnek-texas-story",
  title:"Kolache or Klobasnek? The Texas Story Behind Both",
  dek:"Fruit-filled kolaches and sausage-filled klobasneks share Czech roots, but they are not the same pastry. Texas made room for both—and blurred the names along the way.",
  category:"food-bbq", hero:{src:kolacheHero,alt:"Illustrated sweet kolaches and a sausage-filled klobasnek on a bakery counter",width:1600,height:900},
  authorId:"a-marisol", publishedAt:"2026-08-07", readingMinutes:9,
  tags:["kolache","klobasnek","czech texas","texas food","west texas","czech heritage"], featured:true,
  internalLinks:[
    {href:"/explore/food-bbq",label:"Explore Texas food",description:"More stories about the dishes and traditions that belong on a Texas table."},
    {href:"/texas-history",label:"Keep exploring Texas history",description:"Follow the communities and migrations that shaped the state."},
    {href:"/article/texas-regions-explained",label:"Texas regions explained",description:"See how culture changes as the landscape changes."},
    {href:"/explore/small-towns",label:"Explore Texas small towns",description:"Find places where local bakeries still tell the story."}
  ], relatedCollections:[], relatedDestinations:[],
  body:[
    p("Order a 'sausage kolache' in Texas and almost everyone will know what you mean. A Czech grandmother may still correct you."),
    p("Traditionally, a kolache is a sweet yeast pastry with an open center holding fruit, cheese or another sweet filling. A klobasnek—plural klobasniky—is the savory cousin, usually dough wrapped around sausage or another meat filling. Texas adopted both, then spent generations calling a lot of sausage-filled pastries kolaches anyway."),
    h("The Czech roots came with immigrants"),
    p("Large numbers of Czech and Moravian immigrants settled in Texas during the nineteenth century, especially in Central Texas communities. They brought language, Catholic parishes, social halls, music, sausage-making traditions and baking techniques that became woven into local life."),
    p("Kolaches were part of that food culture. The dough is soft, slightly sweet and enriched, designed to hold fruit preserves, poppy seed, sweet cheese or other fillings in the center."),
    h("So what exactly is a kolache?"),
    p("The traditional shape is usually round with a depression in the middle rather than a fully enclosed pocket. Fillings vary by family and region, but prune, apricot, poppy seed and cheese are among the classics."),
    list("Kolache: usually sweet, open-faced and filled in the center.","Klobasnek: usually savory, with dough wrapped around sausage or another filling.","Texas usage: the word kolache is often used casually for both."),
    h("Where the klobasnek enters the Texas story"),
    p("The savory pastry became especially associated with Czech-Texan communities and bakeries that served workers, travelers and families looking for portable breakfast food. Sausage wrapped in the same tender dough was practical, filling and easy to eat on the road."),
    p("Over time, Texas bakeries expanded the idea. Jalapeño sausage, cheese, ham, bacon and other fillings joined traditional versions. At that point, the category became as much Texas bakery culture as Czech culinary preservation."),
    h("Why Texans call everything a kolache"),
    p("Language follows use, not dictionaries. For generations, roadside bakeries, gas stations and chains marketed sausage-filled versions as kolaches. Customers repeated the name. Eventually, 'kolache' in everyday Texas English often came to mean almost any soft Czech-style breakfast pastry, sweet or savory."),
    p("That does not erase the distinction. It simply explains why two answers can be true at once: historically, the pastries have different names; conversationally, many Texans use kolache as the umbrella term."),
    h("West, Texas made the pastry a highway ritual"),
    p("The town of West, north of Waco, became one of the best-known centers of Czech-Texan baking. For generations of drivers on Interstate 35, stopping for kolaches became part of the trip between Dallas–Fort Worth and Austin."),
    p("That road-trip habit helped spread the pastries far beyond Czech communities. A food tied to immigrant family kitchens became something Texans of every background recognized as gas-station breakfast, road food and bakery comfort."),
    h("Sweet versus savory: what should you order?"),
    p("If you are at a traditional bakery, try both. A fruit or cheese kolache shows the soft dough and sweet filling balance that defines the original pastry. A sausage klobasnek shows how Texas adapted the same dough into something more substantial."),
    h("The pastry tells a bigger Texas story"),
    p("Texas food is full of traditions that arrived with immigrant communities and then became part of the broader state identity. Czech sausage, German meat markets, Mexican baking, Southern cooking and many other traditions did not stay in separate cultural boxes. They met, mixed and traveled."),
    p("That is why the kolache-versus-klobasnek debate is more interesting than a vocabulary correction. The confusion itself tells the story of how immigrant food becomes regional food."),
    h("What to call it at the counter"),
    p("If it has fruit or sweet cheese in the center, kolache is the easy answer. If sausage is wrapped inside, klobasnek is more historically precise. If you ask for a sausage kolache in Texas, nobody is likely to send you away hungry."),
    p("And if the person behind the counter corrects you, you just learned something before breakfast.")
  ]
};
