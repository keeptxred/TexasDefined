import { createServerFn } from '@tanstack/react-start';

export const getGolfCourseStarterDirectoryData = createServerFn({ method: 'GET' }).handler(async () => {
  const starter = await import('./knowledge-graph/golf-course-starter.server');
  return {
    count: starter.TEXAS_GOLF_COURSE_STARTER_RECORDS.length,
    entities: starter.TEXAS_GOLF_COURSE_STARTER_ENTITIES,
    cityBySlug: Object.fromEntries(starter.TEXAS_GOLF_COURSE_STARTER_RECORDS.map((course) => [course.slug, course.city])),
  };
});

export const getGolfCourseStarterEntity = createServerFn({ method: 'GET' })
  .inputValidator((data: { slug: string }) => data)
  .handler(async ({ data }) => {
    const starter = await import('./knowledge-graph/golf-course-starter.server');
    return starter.TEXAS_GOLF_COURSE_STARTER_ENTITIES.find((course) => course.slug === data.slug) ?? null;
  });

export const getGolfCourseStarterEntitiesForCounty = createServerFn({ method: 'GET' })
  .inputValidator((data: { countySlug: string }) => data)
  .handler(async ({ data }) => {
    const starter = await import('./knowledge-graph/golf-course-starter.server');
    return starter.TEXAS_GOLF_COURSE_STARTER_ENTITIES.filter((course) => course.countySlug === data.countySlug);
  });
