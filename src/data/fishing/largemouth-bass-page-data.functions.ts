import { createServerFn } from "@tanstack/react-start";

import { loadLargemouthBassPageDataServer } from "./largemouth-bass-page-data.server";

export const getLargemouthBassPageData = createServerFn({ method: "GET" }).handler(async () => {
  return loadLargemouthBassPageDataServer();
});
