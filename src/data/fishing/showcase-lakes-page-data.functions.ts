import { createServerFn } from "@tanstack/react-start";

import { loadShowcaseLakesPageDataServer } from "./showcase-lakes-page-data.server";

export const getShowcaseLakesPageData = createServerFn({ method: "GET" }).handler(async () => {
  return loadShowcaseLakesPageDataServer();
});
