// Raw markdown for all crawled pages, keyed by slug. Wired for Phase B+ pages.
const files = import.meta.glob('../content/*.md', { query: '?raw', import: 'default', eager: true });

const bySlug: Record<string, string> = {};
for (const [path, raw] of Object.entries(files)) {
  const slug = path.split('/').pop()!.replace(/\.md$/, '');
  bySlug[slug] = raw as string;
}

export function getMarkdown(slug: string): string | undefined {
  return bySlug[slug];
}

/** Parse YAML-ish frontmatter (url/title/description/slug) + body. */
export function parseFrontmatter(raw: string): { meta: Record<string, string>; body: string } {
  const match = raw.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  if (!match) return { meta: {}, body: raw };
  const meta: Record<string, string> = {};
  for (const line of match[1].split('\n')) {
    const idx = line.indexOf(':');
    if (idx === -1) continue;
    const key = line.slice(0, idx).trim();
    const val = line.slice(idx + 1).trim();
    if (key) meta[key] = val;
  }
  return { meta, body: match[2] };
}
