import assert from 'node:assert/strict';
import { test } from 'node:test';
import { isTexasDefinedDirectEditorialSource } from './texasdefined-editorial-source-eligibility.mjs';

const article = {
  title: "New Texas nature center opens visitor trails",
  link: "https://www.example.org/news/texas-nature-center",
};

test('permits ordinary direct publisher stories', () => {
  assert.equal(isTexasDefinedDirectEditorialSource(article), true);
  assert.equal(isTexasDefinedDirectEditorialSource({ ...article, link: 'https://www.kxan.com/news/texas/parks/' }), true);
});

test('does not treat Google News discovery or government clipping as an original publisher', () => {
  assert.equal(isTexasDefinedDirectEditorialSource({ ...article, link: 'https://news.google.com/rss/articles/abc' }), false);
  assert.equal(isTexasDefinedDirectEditorialSource({ ...article, link: 'http://www.lrl.state.tx.us/cl.cfm?id=454959' }), false);
  assert.equal(isTexasDefinedDirectEditorialSource({ ...article, link: 'https://lrl.texas.gov/currentIssues/clips/abc' }), false);
  assert.equal(isTexasDefinedDirectEditorialSource({ ...article, link: 'https://capitol.texas.gov/BillLookup/History.aspx?LegSess=891' }), true);
});

test('blocks policy boilerplate and transient sports tickers without blocking useful reporting', () => {
  for (const title of ['Privacy Policy 2026', 'Updated Cookie Policy', 'Terms of Use',
    'Week 8 live scores', 'BGC Scores and Schedule: Week 8, 2026', 'Football live updates',
    'High School Football Scoreboard']) {
    assert.equal(isTexasDefinedDirectEditorialSource({ ...article, title }), false, title);
  }
  assert.equal(isTexasDefinedDirectEditorialSource({ ...article, title: 'Historic Muny Golf Course nears ownership agreement' }), true);
  assert.equal(isTexasDefinedDirectEditorialSource({ ...article, title: 'SMU announces future lacrosse program' }), true);
});


test('holds legal actions, criminal allegations, government funding and regulatory decisions even on direct sites', () => {
  for (const title of [
    "Bexar County DA Joe Gonzales seeks to recuse himself from Neil Calfas case, citing potential conflict",
    "El Paso mayor's brother sentenced for wire fraud in NBA Ponzi scheme",
    "FBI raids Midlothian oil and gas business facing multiple fraud lawsuits",
    "Houston considers restrictions on gas stations near residential neighborhoods",
    "METRO approves $40 million plan to repair roads, sidewalks along bus routes",
    "City council approves zoning changes for new housing development",
    "County commissioners vote on budget for bridge project",
  ]) assert.equal(isTexasDefinedDirectEditorialSource({ ...article, title }), false, title);
});
test('excludes recycled sports pairings and events roundup headlines', () => {
  for (const title of [
    "2026 Central Texas HSFB Playoff Pairings",
    "Day Trips & Beyond: November Events Roundup",
    "Week 10 live scores",
    "Scores and Schedule",
  ]) assert.equal(isTexasDefinedDirectEditorialSource({ ...article, title }), false, title);
});
test('retains substantive original Texas visitor science and culture reporting', () => {
  for (const title of [
    "Holly Hop Ice Cream Shoppe closing after 18 years",
    "McKinney National Airport prepares for first commercial passenger flights",
    "Houston Museum of Natural Science opens free Fall to Earth exhibit",
    "Starship launch targeted for November 13 at Starbase",
    "City of Buda unveils public-art dachshund sculpture",
    "Historic Texas railroad museum announces new display",
    "Texas high school football team wins state championship",
  ]) assert.equal(isTexasDefinedDirectEditorialSource({ ...article, title }), true, title);
});


test('public SpaceX parkland transactions are KTR public affairs, not TD visitor news', () => {
  for (const title of [
    'SpaceX confirms it’s eyeing public parkland, but says it won’t buy Boca Chica Beach',
    'SpaceX reveals details on its proposal to buy Boca Chica State Park',
    'Texas Parks and Wildlife weighs the sale of Boca Chica State Park to SpaceX',
    'Boca Chica State Park sold to Starbase for expansion',
    'Hinojosa asks for pause on state park land sale to SpaceX',
    'Texas considers leasing public land near Starbase',
    'Boca Chica public parkland transfer to SpaceX draws questions',
  ]) assert.equal(isTexasDefinedDirectEditorialSource({ ...article, title }), false, title);
  for (const title of [
    'Starship launch targeted for November 13 at Starbase',
    'Boca Chica Beach reopens with updated public access hours',
    'Starship launch planned near Boca Chica State Park',
    'Boca Chica State Park updates access hours for winter visitors',
    'Texas state park expands public wildlife viewing land',
  ]) assert.equal(isTexasDefinedDirectEditorialSource({ ...article, title }), true, title);
});


test('actual violent robbery and fatal local fire headlines never enter TexasDefined unattended news', () => {
  for (const title of [
    'Dallas man shot while being robbed, police say',
    '2 people killed in early morning house fire in Irving, fire officials say',
    'Austin police investigate shooting during armed robbery',
    'Fatal apartment fire in Dallas leaves 2 dead, firefighters say',
  ]) assert.equal(isTexasDefinedDirectEditorialSource({...article,title}),false,title);
  for (const title of [
    'Longhorns shot past the competition in state basketball title game',
    'No. 12 Texas Tech locks in for shootout vs. No. 25 OK State',
    'Historic Texas neighborhood launches community fire-safety festival',
    'Texas high school football team wins state championship',
  ]) assert.equal(isTexasDefinedDirectEditorialSource({...article,title}),true,title);
});
