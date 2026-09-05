import { lazy, Suspense } from 'react';
import type { ExpediaStaySearchProps } from './ExpediaStaySearch';

const Search = lazy(() => import('./ExpediaStaySearch').then(({ ExpediaStaySearch }) => ({ default: ExpediaStaySearch })));

export function LazyExpediaStaySearch(props: ExpediaStaySearchProps) {
  return <Suspense fallback={null}><Search {...props} /></Suspense>;
}
