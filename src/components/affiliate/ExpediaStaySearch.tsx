import { lazy, Suspense } from 'react';
import type { ExpediaStaySearchProps } from './ExpediaStaySearchImpl';

export type { ExpediaStaySearchProps } from './ExpediaStaySearchImpl';

const Search = lazy(() => import('./ExpediaStaySearchImpl').then(({ ExpediaStaySearch }) => ({ default: ExpediaStaySearch })));

export function ExpediaStaySearch(props: ExpediaStaySearchProps) {
  return <Suspense fallback={null}><Search {...props} /></Suspense>;
}
