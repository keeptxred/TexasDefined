import { useEffect, useState } from 'react';

import type { ParkingMapAsset } from '@/data/parking-map-model';
import { getSportsVenueParkingMap } from '@/data/parking-maps.server';

export function useVenueParkingMap(slug: string | undefined) {
  const [map, setMap] = useState<ParkingMapAsset | undefined>();

  useEffect(() => {
    let cancelled = false;
    if (!slug) {
      setMap(undefined);
      return () => { cancelled = true; };
    }

    getSportsVenueParkingMap(slug)
      .then((nextMap) => {
        if (!cancelled) setMap(nextMap);
      })
      .catch(() => {
        if (!cancelled) setMap(undefined);
      });

    return () => { cancelled = true; };
  }, [slug]);

  return map;
}
