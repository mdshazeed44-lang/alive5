import { getMarkdown, parseFrontmatter } from './content';

export type Inline =
  | { t: 'text'; v: string }
  | { t: 'bold'; v: string }
  | { t: 'link'; v: string; href: string; external: boolean };

export type Block =
  | { type: 'heading'; level: number; text: Inline[]; key: string }
  | { type: 'para'; text: Inline[]; key: string }
  | { type: 'list'; items: Inline[][]; key: string }
  | { type: 'image'; src: string; alt: string; key: string };

export interface PageContent {
  title: string;
  description: string;
  hero: { titleLines: Inline[][]; lead: Inline[] | null };
  blocks: Block[];
}

const IMG_RE = /^!\[([^\]]*)\]\(([^)]+)\)$/;
const WRAPPED_IMG_RE = /^\[!\[([^\]]*)\]\(([^)]+)\)\]\(([^)]+)\)$/;
const LINK_ONLY_RE = /^(\[[^\]]*\]\([^)]+\)\s*)+$/;

/** Rewrite alive5.com absolute URLs to in-app routes; everything else stays external. */
export function localizeHref(url: string): { href: string; external: boolean } {
  const m = url.match(/^https?:\/\/(?:www\.)?alive5\.com(\/[^\s?#]*)?/i);
  if (m) {
    const path = (m[1] || '/').replace(/\/$/, '') || '/';
    return { href: path, external: false };
  }
  return { href: url, external: true };
}

/** Tokenize inline markdown: **bold**, [text](href). Images handled at block level. */
function parseInline(raw: string): Inline[] {
  const out: Inline[] = [];
  const re = /\*\*([^*]+)\*\*|\[([^\]]+)\]\(([^)]+)\)/g;
  let last = 0;
  let m: RegExpExecArray | null;
  while ((m = re.exec(raw))) {
    if (m.index > last) out.push({ t: 'text', v: raw.slice(last, m.index) });
    if (m[1] !== undefined) {
      out.push({ t: 'bold', v: m[1] });
    } else {
      const { href, external } = localizeHref(m[3]);
      out.push({ t: 'link', v: m[2], href, external });
    }
    last = re.lastIndex;
  }
  if (last < raw.length) out.push({ t: 'text', v: raw.slice(last) });
  return out.length ? out : [{ t: 'text', v: raw }];
}

const NOISE_EXACT = new Set([
  '* * *',
  'Button',
  'New Paragraph',
  'YouTube',
  'Tap to unmute',
  'Tap to unmute.',
  'reCAPTCHA',
  'Recaptcha requires verification.',
  'protected by **reCAPTCHA**',
  'Please try again.',
  'Verify',
]);

function isNoise(line: string): boolean {
  const t = line.trim();
  if (!t) return true;
  if (NOISE_EXACT.has(t)) return true;
  if (t.startsWith('|')) return true; // tables (recaptcha grids)
  if (t.includes('facebook.com/tr?id=')) return true;
  if (t.includes('recaptcha/enterprise/payload')) return true;
  if (/^Select all images|^Please (select|also check)/.test(t)) return true;
  return false;
}

function cleanTitle(raw: string): string {
  return raw.replace(/\s*\|\s*Alive5.*$/i, '').replace(/\s+/g, ' ').trim();
}

/** Strip the shared nav header and footer, returning only the meaningful body lines. */
function sliceBody(body: string): string[] {
  const lines = body.split('\n');
  // content starts after the LAST nav "Client Login" link
  let start = 0;
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].trim() === '[Client Login](https://app.alive5.com/login)') start = i + 1;
  }
  // content ends at the white footer logo
  let end = lines.length;
  for (let i = start; i < lines.length; i++) {
    if (lines[i].includes('Alive5_Logo_WHT')) {
      end = i;
      break;
    }
  }
  return lines.slice(start, end);
}

export function getPageContent(slug: string, fallbackTitle?: string): PageContent | null {
  const raw = getMarkdown(slug);
  if (!raw) return null;
  const { meta, body } = parseFrontmatter(raw);
  const title = cleanTitle(meta.title || fallbackTitle || slug);
  const description = (meta.description || '').trim();

  let lines = sliceBody(body);

  // Drop leftover nav icons/labels (image-only or link-only lines) before the first heading.
  const firstHeading = lines.findIndex((l) => /^#{1,6}\s/.test(l.trim()));
  if (firstHeading > 0) {
    lines = lines.filter((l, i) => {
      if (i >= firstHeading) return true;
      const t = l.trim();
      if (IMG_RE.test(t) || WRAPPED_IMG_RE.test(t) || LINK_ONLY_RE.test(t)) return false;
      if (/zipwhip replacement/i.test(t)) return false;
      return true;
    });
  }

  const blocks: Block[] = [];
  let listBuf: Inline[][] | null = null;
  let lastImg = '';
  let k = 0;

  const flushList = () => {
    if (listBuf && listBuf.length) blocks.push({ type: 'list', items: listBuf, key: `l${k++}` });
    listBuf = null;
  };

  const pushImage = (alt: string, src: string) => {
    if (src === lastImg) return; // dedupe consecutive duplicates
    lastImg = src;
    blocks.push({ type: 'image', src, alt, key: `i${k++}` });
  };

  for (const rawLine of lines) {
    const line = rawLine.trim();
    if (isNoise(line)) continue;

    const heading = line.match(/^(#{1,6})\s+(.*)$/);
    if (heading) {
      flushList();
      const text = heading[2].trim();
      if (!text) continue;
      blocks.push({ type: 'heading', level: heading[1].length, text: parseInline(text), key: `h${k++}` });
      continue;
    }

    const wrapped = line.match(WRAPPED_IMG_RE);
    if (wrapped) {
      flushList();
      pushImage(wrapped[1], wrapped[2]);
      continue;
    }
    const img = line.match(IMG_RE);
    if (img) {
      flushList();
      pushImage(img[1], img[2]);
      continue;
    }

    const li = line.match(/^[-*]\s+(.*)$/);
    if (li) {
      const inner = li[1].trim();
      const liImg = inner.match(IMG_RE) || inner.match(WRAPPED_IMG_RE);
      if (liImg) {
        flushList();
        pushImage(liImg[1], liImg[2]);
        continue;
      }
      if (!listBuf) listBuf = [];
      listBuf.push(parseInline(inner));
      continue;
    }

    // ordered-list item like "01. SOMETHING" -> treat as list item
    const ol = line.match(/^\d+[.)]\s+(.*)$/);
    if (ol) {
      if (!listBuf) listBuf = [];
      listBuf.push(parseInline(ol[1].trim()));
      continue;
    }

    flushList();
    blocks.push({ type: 'para', text: parseInline(line), key: `p${k++}` });
  }
  flushList();

  // Merge consecutive same-level headings (fixes scrape artifacts like "Ring All" + "Agents").
  const merged: Block[] = [];
  for (const b of blocks) {
    const prev = merged[merged.length - 1];
    if (
      b.type === 'heading' &&
      prev &&
      prev.type === 'heading' &&
      prev.level === b.level &&
      b.level >= 4 // only merge sub-heading scrape artifacts (e.g. "Ring All" + "Agents")
    ) {
      const sep: Inline = { t: 'text', v: ' ' };
      prev.text = [...prev.text, sep, ...b.text];
      continue;
    }
    merged.push(b);
  }
  blocks.length = 0;
  blocks.push(...merged);

  // Build hero from leading heading(s) + first paragraph.
  const plain = (nodes: Inline[]) => nodes.map((n) => ('v' in n ? n.v : '')).join('').trim();
  const titleLines: Inline[][] = [];
  let idx = 0;
  while (idx < blocks.length && blocks[idx].type === 'heading' && (blocks[idx] as { level: number }).level <= 2) {
    titleLines.push((blocks[idx] as { text: Inline[] }).text);
    idx++;
  }
  // Fallback: pages with no leading heading (e.g. playbooks) — promote leading short paragraphs.
  if (titleLines.length === 0) {
    while (idx < blocks.length && blocks[idx].type === 'para' && titleLines.length < 2) {
      const text = (blocks[idx] as { text: Inline[] }).text;
      if (plain(text).length > 60) break;
      titleLines.push(text);
      idx++;
    }
  }
  let lead: Inline[] | null = null;
  if (titleLines.length && idx < blocks.length && blocks[idx].type === 'para') {
    lead = (blocks[idx] as { text: Inline[] }).text;
    idx++;
  }
  const rest = titleLines.length ? blocks.slice(idx) : blocks;

  return {
    title,
    description,
    hero: { titleLines, lead },
    blocks: rest,
  };
}
