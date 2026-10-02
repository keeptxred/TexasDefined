import assert from 'node:assert/strict';
import test from 'node:test';
import { WILDLIFE_AUTHORITY_IMAGES } from '../wildlife-authority-images';

test('Ocelot authority imagery stays editorial-quality and color-photo based', () => {
  const ocelot = WILDLIFE_AUTHORITY_IMAGES.ocelot;
  assert.ok(ocelot, 'Ocelot needs an authority image set');
  assert.equal(ocelot.cards.length, 3, 'Ocelot needs exactly three supporting image cards');
  assert.equal(ocelot.hero.sourceUrl, 'https://www.fws.gov/media/ocelot-2');
  assert.match(ocelot.hero.credit, /USFWS.*public domain/i);

  const allImages = [ocelot.hero, ...ocelot.cards];
  for (const image of allImages) {
    assert.match(image.src, /^https:\/\//, `${image.alt} must use an HTTPS image source`);
    assert.ok(image.alt.trim().length >= 20, 'Wildlife imagery needs descriptive alt text');
    assert.ok(image.caption.trim().length >= 40, 'Wildlife imagery needs useful editorial context');
    assert.doesNotMatch(image.caption, /remote camera|trail camera|black[- ]and[- ]white/i);
  }
});
