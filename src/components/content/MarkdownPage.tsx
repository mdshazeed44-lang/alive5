import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getPageContent } from '@/lib/markdown';
import type { Block, Inline } from '@/lib/markdown';
import { ROUTES } from '@/data/routes';
import { Container } from '@/components/layout/Container';
import { Section } from '@/components/layout/Section';
import { FadeUp, Stagger, staggerItem } from '@/components/motion/FadeUp';
import { InlineText } from './InlineText';
import Placeholder from '@/pages/Placeholder';

type Heading = Extract<Block, { type: 'heading' }>;
type Seg = { heading: Heading | null; items: Block[] };
type Card = { image?: string; title?: Inline[]; body: Block[] };

const plain = (nodes: Inline[]) => nodes.map((n) => ('v' in n ? n.v : '')).join('').trim();

/** Split the linear block list into sections at each H1–H3 heading. */
function segmentize(blocks: Block[]): Seg[] {
  const segs: Seg[] = [];
  let cur: Seg | null = null;
  for (const b of blocks) {
    if (b.type === 'heading' && b.level <= 3) {
      cur = { heading: b, items: [] };
      segs.push(cur);
    } else {
      if (!cur) {
        cur = { heading: null, items: [] };
        segs.push(cur);
      }
      cur.items.push(b);
    }
  }
  return segs;
}

/** Pair images with their sub-headings/text into cards (image, title, body). */
function buildCards(items: Block[]): Card[] {
  const cards: Card[] = [];
  let cur: Card = { body: [] };
  let used = false;
  const push = () => {
    if (used) cards.push(cur);
  };
  for (const it of items) {
    if (it.type === 'image') {
      if (cur.image) {
        push();
        cur = { body: [] };
      }
      cur.image = it.src;
      used = true;
    } else if (it.type === 'heading') {
      if (cur.title) {
        push();
        cur = { body: [] };
      }
      cur.title = it.text;
      used = true;
    } else {
      cur.body.push(it);
      used = true;
    }
  }
  push();
  return cards;
}

function imagesOf(items: Block[]) {
  return items.filter((b): b is Extract<Block, { type: 'image' }> => b.type === 'image');
}
function nonImages(items: Block[]) {
  return items.filter((b) => b.type !== 'image');
}
function paraLen(items: Block[]) {
  return items
    .filter((b): b is Extract<Block, { type: 'para' }> => b.type === 'para')
    .reduce((n, b) => n + plain(b.text).length, 0);
}

type Kind = 'split' | 'cards' | 'gallery' | 'mini' | 'prose';
function classify(seg: Seg): Kind {
  const imgs = imagesOf(seg.items);
  const texts = nonImages(seg.items);
  if (imgs.length === 1) return 'split';
  if (imgs.length >= 2) {
    const cards = buildCards(seg.items);
    const rich = cards.filter((c) => c.image && (c.title || c.body.length)).length;
    if (rich >= 2) return 'cards';
    return 'gallery';
  }
  // no images
  const paras = texts.filter((b) => b.type === 'para').length;
  const lists = texts.filter((b) => b.type === 'list').length;
  if (seg.heading && lists === 0 && paras <= 1 && paraLen(seg.items) < 230) return 'mini';
  return 'prose';
}

/* ---------- block-level renderers ---------- */

function Body({ blocks }: { blocks: Block[] }) {
  return (
    <>
      {blocks.map((b) => {
        if (b.type === 'para')
          return (
            <p key={b.key} className="mt-4 text-body-lg leading-relaxed text-grey-700">
              <InlineText nodes={b.text} />
            </p>
          );
        if (b.type === 'list')
          return (
            <ul key={b.key} className="mt-5 space-y-3">
              {b.items.map((item, i) => (
                <li key={i} className="flex gap-3 text-body-lg leading-relaxed text-grey-700">
                  <span className="mt-2.5 h-1.5 w-1.5 flex-none rounded-full bg-alive5-orange" />
                  <span>
                    <InlineText nodes={item} />
                  </span>
                </li>
              ))}
            </ul>
          );
        if (b.type === 'heading')
          return (
            <h4 key={b.key} className="mt-7 text-h4 text-grey-900">
              <InlineText nodes={b.text} />
            </h4>
          );
        return null;
      })}
    </>
  );
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-3 text-small font-semibold uppercase tracking-[0.18em] text-alive5-orange">{children}</p>
  );
}

function ImageCard({ src, className }: { src: string; className?: string }) {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3, ease: [0.21, 0.47, 0.32, 0.98] }}
      className={`overflow-hidden rounded-2xl border border-grey-100 bg-white shadow-md dark:border-white/10 dark:bg-grey-800 ${className ?? ''}`}
    >
      <img src={src} alt="" loading="lazy" className="mx-auto block max-h-[460px] w-full object-contain" />
    </motion.div>
  );
}

/* ---------- segment renderers ---------- */

function SplitSection({ seg, flip, soft }: { seg: Seg; flip: boolean; soft: boolean }) {
  const img = imagesOf(seg.items)[0];
  const texts = nonImages(seg.items);
  return (
    <Section className={soft ? 'bg-surface-soft' : ''}>
      <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <FadeUp className={flip ? 'lg:order-2' : ''}>
          {seg.heading && (
            <h2 className="text-h3 text-grey-900 md:text-h2">
              <InlineText nodes={seg.heading.text} />
            </h2>
          )}
          <Body blocks={texts} />
        </FadeUp>
        <FadeUp y={40} className={flip ? 'lg:order-1' : ''}>
          {img && <ImageCard src={img.src} />}
        </FadeUp>
      </div>
    </Section>
  );
}

function CardsSection({ seg, soft }: { seg: Seg; soft: boolean }) {
  const cards = buildCards(seg.items).filter((c) => c.image || c.title || c.body.length);
  const cols = cards.length % 4 === 0 ? 'lg:grid-cols-4' : cards.length % 3 === 0 ? 'lg:grid-cols-3' : 'lg:grid-cols-3';
  return (
    <Section className={soft ? 'bg-surface-soft' : ''}>
      {seg.heading && (
        <FadeUp className="mx-auto max-w-3xl text-center">
          <h2 className="text-h2 text-grey-900">
            <InlineText nodes={seg.heading.text} />
          </h2>
        </FadeUp>
      )}
      <Stagger className={`mt-14 grid gap-6 sm:grid-cols-2 ${cols}`}>
        {cards.map((c, i) => (
          <motion.div
            key={i}
            variants={staggerItem}
            whileHover={{ y: -6 }}
            className="flex flex-col rounded-2xl border border-grey-100 bg-white p-7 shadow-sm transition-shadow hover:shadow-lg dark:border-white/10 dark:bg-grey-800"
          >
            {c.image && (
              <div className="mb-5 flex h-28 items-center justify-center overflow-hidden rounded-xl bg-surface-soft">
                <img src={c.image} alt="" loading="lazy" className="max-h-24 w-auto object-contain" />
              </div>
            )}
            {c.title && (
              <h3 className="text-h4 text-grey-900">
                <InlineText nodes={c.title} />
              </h3>
            )}
            {c.body.map((b) =>
              b.type === 'para' ? (
                <p key={b.key} className="mt-2 text-body text-grey-700">
                  <InlineText nodes={b.text} />
                </p>
              ) : null
            )}
          </motion.div>
        ))}
      </Stagger>
    </Section>
  );
}

function GallerySection({ seg, soft }: { seg: Seg; soft: boolean }) {
  const imgs = imagesOf(seg.items);
  const texts = nonImages(seg.items);
  return (
    <Section className={soft ? 'bg-surface-soft' : ''}>
      {seg.heading && (
        <FadeUp className="mx-auto max-w-3xl text-center">
          <h2 className="text-h2 text-grey-900">
            <InlineText nodes={seg.heading.text} />
          </h2>
          <div className="[&_p]:!text-center">
            <Body blocks={texts} />
          </div>
        </FadeUp>
      )}
      <Stagger className="mt-12 grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4">
        {imgs.map((im, i) => (
          <motion.div key={i} variants={staggerItem}>
            <ImageCard src={im.src} className="!shadow-sm" />
          </motion.div>
        ))}
      </Stagger>
    </Section>
  );
}

function MiniGrid({ segs, soft }: { segs: Seg[]; soft: boolean }) {
  const cols = segs.length % 4 === 0 ? 'lg:grid-cols-4' : 'lg:grid-cols-3';
  return (
    <Section className={soft ? 'bg-surface-soft' : ''}>
      <Stagger className={`grid gap-6 sm:grid-cols-2 ${cols}`}>
        {segs.map((seg, i) => (
          <motion.div
            key={i}
            variants={staggerItem}
            whileHover={{ y: -6 }}
            className="rounded-2xl border border-grey-100 bg-white p-7 shadow-sm transition-shadow hover:shadow-lg dark:border-white/10 dark:bg-grey-800"
          >
            <span className="mb-4 inline-flex size-10 items-center justify-center rounded-md bg-orange-100 text-body font-bold text-alive5-orange">
              {i + 1}
            </span>
            {seg.heading && (
              <h3 className="text-h4 text-grey-900">
                <InlineText nodes={seg.heading.text} />
              </h3>
            )}
            {nonImages(seg.items).map((b) =>
              b.type === 'para' ? (
                <p key={b.key} className="mt-2 text-body text-grey-700">
                  <InlineText nodes={b.text} />
                </p>
              ) : null
            )}
          </motion.div>
        ))}
      </Stagger>
    </Section>
  );
}

function ProseSection({ seg, soft }: { seg: Seg; soft: boolean }) {
  const texts = nonImages(seg.items);
  return (
    <Section className={soft ? 'bg-surface-soft' : ''}>
      <Container className="max-w-3xl">
        <FadeUp>
          {seg.heading && (
            <h2 className="text-h3 text-grey-900 md:text-h2">
              <InlineText nodes={seg.heading.text} />
            </h2>
          )}
          <Body blocks={texts} />
        </FadeUp>
      </Container>
    </Section>
  );
}

/* ---------- page ---------- */

export default function MarkdownPage() {
  const { pathname } = useLocation();
  const meta = ROUTES.find((r) => r.route === pathname);
  const slug = meta?.slug;
  const content = slug ? getPageContent(slug, meta?.title) : null;

  useEffect(() => {
    if (content) document.title = `${content.title} | Alive5`;
  }, [content]);

  if (!content || (content.hero.titleLines.length === 0 && content.blocks.length === 0)) {
    return <Placeholder />;
  }

  const { hero, blocks } = content;
  const segs = segmentize(blocks);

  // Build a render plan, merging consecutive "mini" segments into one card grid.
  type Item = { kind: Kind; segs: Seg[] };
  const plan: Item[] = [];
  for (const seg of segs) {
    const kind = classify(seg);
    const last = plan[plan.length - 1];
    if (kind === 'mini' && last && last.kind === 'mini') last.segs.push(seg);
    else plan.push({ kind, segs: [seg] });
  }
  // A lone "mini" reads better as prose than a single orphan card.
  for (const item of plan) if (item.kind === 'mini' && item.segs.length === 1) item.kind = 'prose';

  let bg = false; // alternate section background
  const next = () => (bg = !bg);

  return (
    <article>
      <section className="relative overflow-hidden bg-gradient-to-b from-orange-50 via-surface-cream to-surface-page pt-40 pb-20 dark:from-[#2a1b14] dark:via-grey-900 dark:to-grey-900">
        <div className="pointer-events-none absolute -right-24 top-12 h-80 w-80 rounded-full bg-alive5-orange/10 blur-3xl" />
        <Container className="max-w-4xl">
          <FadeUp>
            <Eyebrow>Alive5</Eyebrow>
          </FadeUp>
          <FadeUp delay={0.05}>
            <h1 className="text-h1 text-grey-900 md:text-display">
              {hero.titleLines.length ? (
                hero.titleLines.map((line, i) => (
                  <span key={i} className="block">
                    <InlineText nodes={line} />
                  </span>
                ))
              ) : (
                content.title
              )}
            </h1>
          </FadeUp>
          {hero.lead && (
            <FadeUp delay={0.1}>
              <p className="mt-6 max-w-2xl text-body-lg text-grey-700">
                <InlineText nodes={hero.lead} />
              </p>
            </FadeUp>
          )}
          <FadeUp delay={0.15}>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link to="/thank-you" className="btn-orange !px-7 !py-4 text-body">
                Book a demo
              </Link>
              <Link to="/contact-us" className="btn-ghost !px-7 !py-4 text-body">
                Talk to sales
              </Link>
            </div>
          </FadeUp>
        </Container>
      </section>

      {plan.map((item, i) => {
        const soft = next();
        if (item.kind === 'split') return <SplitSection key={i} seg={item.segs[0]} flip={i % 2 === 1} soft={soft} />;
        if (item.kind === 'cards') return <CardsSection key={i} seg={item.segs[0]} soft={soft} />;
        if (item.kind === 'gallery') return <GallerySection key={i} seg={item.segs[0]} soft={soft} />;
        if (item.kind === 'mini') return <MiniGrid key={i} segs={item.segs} soft={soft} />;
        return <ProseSection key={i} seg={item.segs[0]} soft={soft} />;
      })}

      <section className="bg-grey-900 py-20">
        <Container className="max-w-3xl text-center">
          <FadeUp>
            <h2 className="text-h2 text-white">Ready to see Alive5 in action?</h2>
            <p className="mx-auto mt-4 max-w-xl text-body-lg text-grey-300">
              Bring A.I. chat, live chat, SMS, and your team together in one inbox.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link to="/thank-you" className="btn-orange !px-7 !py-4 text-body">
                Book a demo
              </Link>
              <Link to="/" className="btn-ghost !border-white/30 !text-white !px-7 !py-4 text-body">
                Back to home
              </Link>
            </div>
          </FadeUp>
        </Container>
      </section>
    </article>
  );
}
