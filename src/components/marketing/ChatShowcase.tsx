import { motion } from 'framer-motion';
import { Container } from '@/components/layout/Container';

const EASE = [0.21, 0.47, 0.32, 0.98] as const;

type Channel = { tag: string; color: string; text: string; avatar: string };

const CHANNELS: Channel[] = [
  {
    tag: 'A.I. Chatbot',
    color: 'text-accent-teal',
    text: 'Can I still redeem your YouTube promo?',
    avatar: 'https://lirp.cdn-website.com/519d3ac1/dms3rep/multi/opt/cheerful-woman-smiles-warmly-against-bright-orange-background_1082141-69531-68w.jpg',
  },
  {
    tag: 'Live Chat',
    color: 'text-accent-navy',
    text: 'I’ve received a jury summons. Can I bring my phone?',
    avatar: 'https://lirp.cdn-website.com/519d3ac1/dms3rep/multi/opt/man-2-68w.png',
  },
  {
    tag: 'SMS',
    color: 'text-alive5-orange',
    text: '📦 ¿Cuál es el estado de mi pedido?',
    avatar: 'https://lirp.cdn-website.com/519d3ac1/dms3rep/multi/opt/woman3-68w.png',
  },
  {
    tag: 'FB Messenger',
    color: 'text-accent-purple',
    text: 'Is it faster to go into the local tax assessor office?',
    avatar: 'https://lirp.cdn-website.com/519d3ac1/dms3rep/multi/opt/woman2-68w.png',
  },
  {
    tag: 'SMS',
    color: 'text-accent-green',
    text: 'Are you guys open today?',
    avatar: 'https://lirp.cdn-website.com/519d3ac1/dms3rep/multi/opt/man-3-68w.png',
  },
];

export function ChatShowcase() {
  return (
    <section className="border-y border-grey-100 bg-surface-soft py-16 md:py-20">
      <Container>
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: EASE }}
          className="mx-auto max-w-3xl text-center text-h3 text-grey-900"
        >
          One inbox for every question, on every channel
        </motion.h2>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.12 } } }}
          className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-5"
        >
          {CHANNELS.map((c) => (
            <motion.div
              key={c.tag + c.text}
              variants={{
                hidden: { opacity: 0, y: 24, scale: 0.96 },
                show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: EASE } },
              }}
              whileHover={{ y: -4 }}
              className="flex flex-col gap-3 rounded-xl border border-grey-100 bg-white p-5 shadow-sm transition-shadow hover:shadow-md dark:bg-grey-800"
            >
              <span className={`text-legal font-semibold uppercase tracking-wider ${c.color}`}>{c.tag}</span>
              <p className="text-small leading-relaxed text-grey-700">{c.text}</p>
              <img src={c.avatar} alt="" className="mt-auto size-9 rounded-full object-cover" loading="lazy" />
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
