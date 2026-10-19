import type { ImageRef } from "./types";

export const TEXAS_RIVERS_BODY_PHOTO_OVERRIDES: Readonly<Record<string, ImageRef>> = {
  "/images/editorial/texas-guadalupe-river.jpg": {
    src: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Guadalupe_River_of_Texas_IMG_0500.JPG?width=1600",
    alt: "The Guadalupe River at New Braunfels, Texas",
    width: 1600,
    height: 1200,
    credit: "Billy Hathorn · CC BY-SA 3.0 · Wikimedia Commons",
  },
  "/images/editorial/texas-trinity-river.jpg": {
    src: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Trinity-River-Dallas-TX-4667.jpg?width=1600",
    alt: "The Trinity River flowing past downtown Dallas, Texas",
    width: 1600,
    height: 900,
    credit: "Loadmaster (David R. Tribble) · CC BY-SA 3.0 · Wikimedia Commons",
  },
  "/images/editorial/moving/san-antonio.jpg": {
    src: "https://commons.wikimedia.org/wiki/Special:Redirect/file/The_San_Antontio_Riverwalk_at_night.jpg?width=1600",
    alt: "San Antonio River Walk at night with illuminated riverside buildings, paths and reflections on the water",
    width: 1600,
    height: 1067,
    credit: "Yinan Chen · Public domain · Wikimedia Commons",
  },
};
