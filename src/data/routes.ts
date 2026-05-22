import routesMap from './routes-map.json';

export interface RouteMeta {
  route: string;
  title: string;
  slug: string;
  content_file: string;
  status: number;
}

/** All 121 crawled routes — source of truth from audit/routes-map.json. */
export const ROUTES = routesMap as RouteMeta[];

/** Routes that get a hand-built page (everything else renders the Placeholder shell). */
export const CUSTOM_ROUTES = new Set<string>(['/']);

/** Clean the crawl title for use as an H1/label on placeholder pages. */
export function cleanTitle(raw: string): string {
  return raw
    .replace(/\s*\|\s*alive5/i, '')
    .replace(/\s*\|\s*Alive5.*$/i, '')
    .replace(/\s+/g, ' ')
    .trim();
}
