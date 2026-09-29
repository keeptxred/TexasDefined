import { createServerFn } from "@tanstack/react-start";

import { loadRelocationCityPairPageServer } from "./relocation-city-pair-page.server";

export const getRelocationCityPairPage = createServerFn({ method: "GET" })
  .inputValidator((data: { pair: string }) => data)
  .handler(({ data }) => loadRelocationCityPairPageServer(data.pair));
