import { createServerFn } from "@tanstack/react-start";

import { loadLakeConroePageDataServer } from "./lake-conroe-page-data.server";

export const getLakeConroePageData = createServerFn({ method: "GET" }).handler(async () => {
  return loadLakeConroePageDataServer();
});
