import { createElement, type ComponentType } from "react";
import { Outlet, useChildMatches } from "@tanstack/react-router";

import { Route as fishingRoute } from "@/routes/fishing";
import { Route as fishingAccessRoute } from "@/routes/fishing.access";
import { Route as fishingGuidesRoute } from "@/routes/fishing.guides";
import { Route as fishingLakesRoute } from "@/routes/fishing.lakes";
import { Route as fishingLakeRoute } from "@/routes/fishing.lakes.$slug";
import { Route as fishingReportsRoute } from "@/routes/fishing.reports";
import { Route as fishingServicesRoute } from "@/routes/fishing.services";
import { Route as fishingSpeciesRoute } from "@/routes/fishing.species";
import { Route as fishingTechniquesRoute } from "@/routes/fishing.techniques";
import { Route as landscapesRoute } from "@/routes/explore.landscapes";
import { Route as paintedChurchesRoute } from "@/routes/explore.painted-churches";
import { Route as paintedChurchGlossaryRoute } from "@/routes/explore.painted-churches.glossary";
import { Route as paintedChurchHeritageRoute } from "@/routes/explore.painted-churches.heritage";
import { Route as paintedChurchPeopleRoute } from "@/routes/explore.painted-churches.people";
import { Route as paintedChurchPreservationRoute } from "@/routes/explore.painted-churches.preservation";
import { Route as paintedChurchRoutesRoute } from "@/routes/explore.painted-churches.routes";
import { Route as paintedChurchSymbolsRoute } from "@/routes/explore.painted-churches.symbols";
import { Route as paintedChurchTechniquesRoute } from "@/routes/explore.painted-churches.techniques";
import { Route as topAttractionsRoute } from "@/routes/explore.top-attractions";
import { Route as sportsRoute } from "@/routes/sports";
import { Route as sportsVenuesRoute } from "@/routes/sports-venues";
import { Route as texasDataRoute } from "@/routes/texas-data";

const patchedRoutes = new WeakSet<object>();

/**
 * Some page routes also become TanStack layout parents because dot-named route
 * files live below them. Their existing hub component/head should apply only
 * when that parent is the leaf match. Descendants need the Outlet and their own
 * head so child content and self-canonicals can render normally.
 */
function makeLeafOnlyParent(route: any) {
  if (patchedRoutes.has(route)) return;

  const OriginalComponent = route.options.component as ComponentType | undefined;
  const originalHead = route.options.head as ((context: any) => unknown) | undefined;

  route.update({
    component: function LeafOnlyParentRoute() {
      const childMatches = useChildMatches();
      if (childMatches.length > 0) return <Outlet />;
      return OriginalComponent ? createElement(OriginalComponent) : <Outlet />;
    },
    ...(originalHead
      ? {
          head: (context: any) => {
            const leafMatch = context.matches.at(-1);
            if (!leafMatch || leafMatch.id !== context.match.id) return {};
            return originalHead(context);
          },
        }
      : {}),
  });

  patchedRoutes.add(route);
}

const LEAF_ONLY_PARENT_ROUTES = [
  fishingRoute,
  fishingLakesRoute,
  fishingLakeRoute,
  fishingGuidesRoute,
  fishingReportsRoute,
  fishingTechniquesRoute,
  fishingSpeciesRoute,
  fishingAccessRoute,
  fishingServicesRoute,
  landscapesRoute,
  paintedChurchesRoute,
  paintedChurchTechniquesRoute,
  paintedChurchSymbolsRoute,
  paintedChurchPeopleRoute,
  paintedChurchHeritageRoute,
  paintedChurchPreservationRoute,
  paintedChurchGlossaryRoute,
  paintedChurchRoutesRoute,
  topAttractionsRoute,
  sportsRoute,
  sportsVenuesRoute,
  texasDataRoute,
] as const;

export function applyLeafOnlyParentRouteFixes() {
  for (const route of LEAF_ONLY_PARENT_ROUTES) makeLeafOnlyParent(route);
}
