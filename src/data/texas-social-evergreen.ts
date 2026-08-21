export type TexasSocialEvergreenCategory =
  | "you-know"
  | "texas-life"
  | "weather"
  | "food"
  | "road-trip"
  | "small-town"
  | "home"
  | "conversation";

export type TexasSocialEvergreenPost = {
  id: string;
  category: TexasSocialEvergreenCategory;
  text: string;
  link?: string;
  prompt?: string;
};

export const texasSocialEvergreenPosts: TexasSocialEvergreenPost[] = [
  { id: "yk-01", category: "you-know", text: "You know you’re in Texas when a 20-minute drive is described as ‘right down the road.’", link: "/things-unique-to-texas" },
  { id: "yk-02", category: "you-know", text: "You know you’ve lived in Texas awhile when you judge distance in hours instead of miles.", link: "/road-trips" },
  { id: "yk-03", category: "you-know", text: "You know you’re from Texas when the weather app is part forecast, part entertainment.", link: "/guides" },
  { id: "yk-04", category: "you-know", text: "You know it’s a Texas summer when parking-lot shade becomes premium real estate.", link: "/home-garden" },
  { id: "yk-05", category: "you-know", text: "You know you’re in a Texas small town when the courthouse square tells you more than the welcome sign.", link: "/small-towns" },
  { id: "yk-06", category: "you-know", text: "You know you’re traveling Texas when one road trip can include pine forest, prairie, desert and coast.", link: "/explore" },
  { id: "yk-07", category: "you-know", text: "You know you’re at a Texas barbecue joint when the tray matters less than what’s on the butcher paper.", link: "/food-bbq" },
  { id: "yk-08", category: "you-know", text: "You know spring has arrived when bluebonnet photos suddenly take over your feed.", link: "/article/bluebonnet-season-field-guide" },
  { id: "tl-01", category: "texas-life", text: "Texas life skill: always know where the nearest shade is.", link: "/guides" },
  { id: "tl-02", category: "texas-life", text: "Texas life skill: keep water in the car even when you’re ‘just running one errand.’", link: "/road-trips" },
  { id: "tl-03", category: "texas-life", text: "Texas life skill: never assume the other side of the state is a quick detour.", link: "/texas-facts" },
  { id: "tl-04", category: "texas-life", text: "Texas life skill: learn which months belong outside and which months belong near air conditioning.", link: "/outdoors" },
  { id: "tl-05", category: "texas-life", text: "Texas life skill: know your barbecue order before you reach the counter.", link: "/food-bbq" },
  { id: "tl-06", category: "texas-life", text: "Texas life skill: treat a cold front like an invitation to go somewhere.", link: "/road-trips" },
  { id: "tl-07", category: "texas-life", text: "Texas life skill: keep a road-trip list longer than your vacation calendar.", link: "/road-trips" },
  { id: "tl-08", category: "texas-life", text: "Texas life skill: know the difference between ‘small town,’ ‘tiny town’ and ‘blink-and-you-missed-it.’", link: "/small-towns" },
  { id: "wx-01", category: "weather", text: "Texas weather rule: if the forecast says 95°, check the humidity before celebrating.", link: "/guides" },
  { id: "wx-02", category: "weather", text: "Texas weather rule: a blue-sky morning does not settle the afternoon forecast.", link: "/guides" },
  { id: "wx-03", category: "weather", text: "Texas weather rule: the first real cold front deserves its own group text.", link: "/road-trips" },
  { id: "wx-04", category: "weather", text: "Texas weather rule: August landscaping decisions should be made with humility.", link: "/article/texas-native-garden-that-survives-august" },
  { id: "wx-05", category: "weather", text: "Texas weather rule: summer errands have a preferred parking direction—toward the shade.", link: "/home-garden" },
  { id: "wx-06", category: "weather", text: "Texas weather question: what temperature finally counts as ‘nice outside’ where you live?", prompt: "Tell us your number.", link: "/outdoors" },
  { id: "food-01", category: "food", text: "Texas food debate: sliced brisket or chopped brisket?", prompt: "Pick one.", link: "/food-bbq" },
  { id: "food-02", category: "food", text: "Texas food debate: breakfast tacos or kolaches for the road?", prompt: "No fence-sitting.", link: "/food-bbq" },
  { id: "food-03", category: "food", text: "Texas food debate: queso is an appetizer, a meal, or both?", prompt: "Defend your answer.", link: "/food-bbq" },
  { id: "food-04", category: "food", text: "Texas food debate: what town is worth driving to just for one meal?", prompt: "Name the town and the order.", link: "/food-bbq" },
  { id: "food-05", category: "food", text: "Texas road-trip rule: if the local place has a line and a short menu, pay attention.", link: "/food-bbq" },
  { id: "food-06", category: "food", text: "The most Texas sentence of the day: ‘We drove two hours for lunch.’", link: "/road-trips" },
  { id: "rt-01", category: "road-trip", text: "Texas road-trip question: what’s the farthest you’ll drive for a weekend?", prompt: "2 hours, 4 hours, 6 hours—or more?", link: "/road-trips" },
  { id: "rt-02", category: "road-trip", text: "Texas road-trip rule: the scenic route only counts if you leave enough daylight to see it.", link: "/road-trips" },
  { id: "rt-03", category: "road-trip", text: "Texas road-trip rule: gas up before the map starts looking empty.", link: "/road-trips" },
  { id: "rt-04", category: "road-trip", text: "Texas road-trip question: Hill Country, Gulf Coast, Piney Woods, Panhandle or Big Bend?", prompt: "Pick your weekend.", link: "/explore" },
  { id: "rt-05", category: "road-trip", text: "A proper Texas road trip should include at least one stop you did not plan.", link: "/road-trips" },
  { id: "rt-06", category: "road-trip", text: "Texas travel math: a three-hour drive can still be considered a weekend getaway.", link: "/road-trips" },
  { id: "st-01", category: "small-town", text: "Texas small-town question: what courthouse square deserves more attention?", prompt: "Name your favorite.", link: "/small-towns" },
  { id: "st-02", category: "small-town", text: "Texas small-town rule: never judge the whole place from the highway exit.", link: "/small-towns" },
  { id: "st-03", category: "small-town", text: "Texas small-town question: which town has the best main street for an unplanned Saturday?", prompt: "Drop the town below.", link: "/small-towns" },
  { id: "st-04", category: "small-town", text: "Texas small-town weekends work best when you leave room for pie, antiques, history and absolutely nothing scheduled.", link: "/small-towns" },
  { id: "st-05", category: "small-town", text: "The best Texas small towns usually give you a reason to walk instead of just drive through.", link: "/small-towns" },
  { id: "home-01", category: "home", text: "Texas homeowner lesson: shade can be part of the landscaping plan, not just a bonus.", link: "/home-garden" },
  { id: "home-02", category: "home", text: "Texas homeowner lesson: the yard you want in March and the yard you can keep alive in August may be different yards.", link: "/article/texas-native-garden-that-survives-august" },
  { id: "home-03", category: "home", text: "Texas homeowner lesson: freeze prep is easier before everyone else remembers the hardware store exists.", link: "/article/prepare-texas-house-freeze" },
  { id: "home-04", category: "home", text: "Texas homeowner lesson: storm prep starts before the forecast cone points at you.", link: "/guides" },
  { id: "home-05", category: "home", text: "Texas backyard question: pool, patio, garden, fire pit or all four?", prompt: "What’s your ideal setup?", link: "/home-garden" },
  { id: "conv-01", category: "conversation", text: "What is the most Texas thing you’ve ever seen on a road trip?", prompt: "We want the story.", link: "/things-unique-to-texas" },
  { id: "conv-02", category: "conversation", text: "What Texas town would you move to tomorrow if work didn’t matter?", prompt: "One town only.", link: "/browse/cities" },
  { id: "conv-03", category: "conversation", text: "What Texas place lived up to the hype?", prompt: "And what place surprised you most?", link: "/explore" },
  { id: "conv-04", category: "conversation", text: "Which Texas region feels most like home to you?", prompt: "Hill Country, Gulf Coast, Piney Woods, Panhandle, Big Bend, South Texas, Central Texas or somewhere else?", link: "/explore" },
  { id: "conv-05", category: "conversation", text: "What’s the one Texas food you’d make an out-of-state visitor try first?", prompt: "Choose carefully.", link: "/food-bbq" },
  { id: "conv-06", category: "conversation", text: "What’s one Texas attraction you think everyone should see once?", prompt: "Your pick can be famous or obscure.", link: "/explore" },
  { id: "conv-07", category: "conversation", text: "Which month is actually the best month to travel Texas?", prompt: "Make your case.", link: "/road-trips" },
  { id: "conv-08", category: "conversation", text: "What’s your definition of a perfect Texas Saturday?", prompt: "Food, town, park, lake, game, road trip—build it.", link: "/things-unique-to-texas" },
];

export function getTexasSocialEvergreenPosts(category?: TexasSocialEvergreenCategory) {
  return category ? texasSocialEvergreenPosts.filter((post) => post.category === category) : texasSocialEvergreenPosts;
}

export function getTexasSocialEvergreenPostById(id: string) {
  return texasSocialEvergreenPosts.find((post) => post.id === id) ?? null;
}
