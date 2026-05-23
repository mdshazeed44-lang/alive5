import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  Sparkles,
  AlertCircle,
  Zap,
  ShieldCheck,
  Heart,
  Globe,
  Rocket,
  Users,
  Bot,
  Phone,
  Mail,
  MapPin,
  Check,
} from 'lucide-react';
import { Container } from '@/components/layout/Container';
import { Section } from '@/components/layout/Section';
import { FadeUp, Stagger, staggerItem } from '@/components/motion/FadeUp';
import { SEOHead } from '@/components/seo/SEOHead';

const PARTNERS = [
  { name: 'NBC', src: '/about/proof-nbc-1920w.png' },
  { name: 'Comcast LIFT Labs', src: '/about/proof-liftlabs-1920w.png' },
  { name: 'Capital', src: '/about/proof-capital-1920w.png' },
];

const CUSTOMERS = [
  { name: 'MyPlates', src: '/logos/logo-myplates-640w.png' },
  { name: 'US District Courts', src: '/logos/logo-uscourts-55d77c8a-640w.png' },
  { name: 'Orlando City SC', src: '/logos/logo-orlando-640w.png' },
  { name: 'Collegeboxes', src: '/logos/logo-collegeboxes-640w.png' },
];

const FRANKENCHAT_PROBLEMS = [
  { Icon: AlertCircle, title: 'Buggy API integrations', body: 'Vendor stitch-ups break silently and your team finds out from angry customers.' },
  { Icon: Users, title: 'Disjointed conversations', body: 'Threads scatter across browser tabs — context lost, tickets dropped.' },
  { Icon: Bot, title: 'Notification overload', body: 'Every tool pings independently. Agents miss the messages that actually matter.' },
  { Icon: Rocket, title: 'Months of CRM setup', body: 'Each channel needs its own integration. Quarters slip into years.' },
];

const VALUES = [
  { Icon: Heart, title: 'Customer obsession', body: 'Every roadmap item starts with a real customer pain. We ship for the user, not the changelog.' },
  { Icon: Zap, title: 'Move fast, measure deeper', body: 'Speed without telemetry is just guessing. We instrument everything and learn aloud.' },
  { Icon: ShieldCheck, title: 'Privacy by default', body: 'Your data is yours. SOC 2 Type 2, GDPR, PCI-DSS — not as marketing, as architecture.' },
  { Icon: Globe, title: 'Built for everyone', body: '70+ languages, accessible by design, deployable from cities to government to small shops.' },
];

const STATS = [
  { value: '90%+', label: 'of customer questions resolved by A.I.' },
  { value: '5×', label: 'ROI — $1 spent saves $5, guaranteed' },
  { value: '24/7', label: 'support coverage out of the box' },
  { value: '70+', label: 'languages auto-translated' },
];

export default function About() {
  return (
    <>
      <SEOHead
        title="About Us | Alive5"
        description="Alive5 helps pro sports teams, universities, governments, and SMBs deliver the best messaging experience — across SMS, live chat, and social. One inbox, one workflow, one CRM integration."
        canonical="https://www.alive5.com/about-us"
        jsonLd={[
          {
            '@context': 'https://schema.org',
            '@type': 'AboutPage',
            name: 'About Alive5',
            url: 'https://www.alive5.com/about-us',
            mainEntity: {
              '@type': 'Organization',
              name: 'Alive5',
              legalName: 'Alive Technologies Inc.',
              telephone: '+1-855-551-8858',
              foundingLocation: 'United States',
              award: 'Comcast NBCUniversal LIFT Labs 2018 powered by Techstars',
            },
          },
        ]}
      />

      {/* ==========================================================
       * HERO — 2-column with laughing-man image
       * ======================================================== */}
      <section className="relative overflow-hidden bg-gradient-to-b from-orange-50 via-surface-cream to-surface-page pt-32 pb-20 dark:from-[#2a1b14] dark:via-grey-900 dark:to-grey-900 md:pt-40 md:pb-28">
        <div className="pointer-events-none absolute -left-32 top-12 size-96 rounded-full bg-orange-200/40 blur-3xl dark:bg-orange-900/30" />
        <div className="pointer-events-none absolute right-0 top-40 size-96 rounded-full bg-accent-light-blue/30 blur-3xl dark:bg-accent-teal/20" />
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.4]"
          style={{
            backgroundImage:
              'radial-gradient(circle at 1px 1px, rgba(72,72,74,0.10) 1px, transparent 0)',
            backgroundSize: '28px 28px',
            maskImage: 'radial-gradient(ellipse 80% 60% at 50% 0%, black 30%, transparent 75%)',
            WebkitMaskImage: 'radial-gradient(ellipse 80% 60% at 50% 0%, black 30%, transparent 75%)',
          }}
        />

        <Container className="relative">
          <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
            <FadeUp>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-orange-200 bg-white/90 px-3.5 py-1.5 text-small font-semibold text-alive5-orange shadow-sm backdrop-blur dark:border-orange-700/40 dark:bg-white/10">
                <Sparkles className="size-3.5" />
                About Alive5
              </span>
              <h1 className="mt-6 text-h1 leading-[1.04] text-grey-900 md:text-[3.75rem]">
                We help organizations create the best{' '}
                <span className="bg-gradient-to-r from-alive5-orange via-orange-500 to-orange-600 bg-clip-text text-transparent">
                  messaging experience
                </span>
                .
              </h1>
              <p className="mt-6 text-body-lg text-grey-700">
                Pro sports teams, universities, government institutions, and SMBs trust Alive5 to
                engage their audiences, drive high-ticket sales, and provide superior support — with
                limited staff and IT resources.
              </p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <a
                  href="https://calendly.com/rohit-consult"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-orange group !px-7 !py-4 text-body"
                >
                  Book a Demo
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                </a>
                <Link to="/pricing" className="btn-ghost !px-7 !py-4 text-body">
                  See pricing
                </Link>
              </div>
            </FadeUp>

            {/* RIGHT: laughing-man image with floating chat overlay */}
            <FadeUp delay={0.1}>
              <div className="relative mx-auto w-full max-w-md">
                <div className="pointer-events-none absolute inset-0 -z-10 size-[28rem] translate-x-2 rounded-full bg-gradient-to-tr from-orange-300/40 via-orange-200/30 to-transparent blur-3xl" />
                <motion.img
                  src="/business-sms/hero-person.png"
                  alt="Alive5 customer messaging in action"
                  loading="eager"
                  initial={{ opacity: 0, scale: 0.94 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }}
                  className="w-full drop-shadow-[0_25px_50px_rgba(31,31,32,0.25)]"
                />

                {/* floating chat bubble */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                  className="absolute -left-2 top-12 max-w-[12rem] sm:-left-6 md:-left-10"
                >
                  <motion.div
                    animate={{ y: [0, -6, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                    className="rounded-2xl rounded-bl-md border border-grey-200 bg-white px-3 py-2 text-small shadow-xl dark:border-white/10 dark:bg-grey-800"
                  >
                    <p className="text-legal font-semibold text-grey-500">Live Chat • now</p>
                    <p className="text-small font-medium text-grey-900">Hey 👋 What time do you open?</p>
                  </motion.div>
                </motion.div>

                {/* floating SMS reply */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.9 }}
                  className="absolute -right-2 bottom-16 max-w-[13rem] sm:-right-6"
                >
                  <motion.div
                    animate={{ y: [0, -6, 0] }}
                    transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 0.6 }}
                    className="rounded-2xl rounded-br-md bg-alive5-orange px-3 py-2 text-small text-white shadow-xl"
                  >
                    <p className="text-legal font-semibold text-white/80">SMS • Alive5 A.I.</p>
                    <p className="text-small font-medium">We're open Mon–Sat, 9 AM–6 PM ✨</p>
                  </motion.div>
                </motion.div>
              </div>
            </FadeUp>
          </div>
        </Container>
      </section>

      {/* ==========================================================
       * STATS STRIP (floats over hero/below band)
       * ======================================================== */}
      <section className="relative -mt-12 px-4">
        <Container className="relative">
          <Stagger
            className="mx-auto grid max-w-5xl gap-3 rounded-3xl border border-grey-200 bg-white p-6 shadow-2xl dark:border-white/10 dark:bg-grey-800 sm:grid-cols-2 md:p-8 lg:grid-cols-4"
            stagger={0.08}
          >
            {STATS.map((s) => (
              <motion.div key={s.label} variants={staggerItem} className="text-center">
                <p className="text-[2.5rem] font-bold leading-none text-alive5-orange">{s.value}</p>
                <p className="mt-2 text-small text-grey-700">{s.label}</p>
              </motion.div>
            ))}
          </Stagger>
        </Container>
      </section>

      {/* ==========================================================
       * TRUSTED BY (customer logos)
       * ======================================================== */}
      <Section>
        <FadeUp className="mx-auto max-w-2xl text-center">
          <p className="text-small font-medium text-grey-500">
            Trusted by professional sports teams, federal courts, retail, and education leaders.
          </p>
        </FadeUp>
        <FadeUp delay={0.1} className="mt-8">
          <div className="flex flex-wrap items-center justify-center gap-x-14 gap-y-8 md:gap-x-20">
            {CUSTOMERS.map((c) => (
              <img
                key={c.name}
                src={c.src}
                alt={c.name}
                loading="lazy"
                className="h-16 w-auto max-w-[200px] object-contain transition-transform duration-300 hover:scale-105 md:h-20"
              />
            ))}
          </div>
        </FadeUp>
      </Section>

      {/* ==========================================================
       * THE PROBLEM — Frankenchat (with chaos illustration)
       * ======================================================== */}
      <Section className="bg-surface-soft">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <FadeUp>
            <p className="text-legal font-semibold uppercase tracking-[0.18em] text-alive5-orange">
              The problem
            </p>
            <h2 className="mt-3 text-h2 leading-[1.05] text-grey-900">
              We've named the mess:{' '}
              <span className="italic text-alive5-orange">"Frankenchat"</span>
            </h2>
            <p className="mt-5 text-body-lg text-grey-700">
              Organizations stitch together separate vendors for SMS, web chat, social messengers,
              A.I., and automation — then bolt them onto a CRM. Buggy APIs, browser-tab chaos, and
              months of integration work.
            </p>
            <p className="mt-3 text-body text-grey-700">
              We built Alive5 because we kept watching teams drown in tabs.
            </p>
          </FadeUp>

          <FadeUp delay={0.1}>
            <div className="relative mx-auto w-full max-w-md">
              <div className="pointer-events-none absolute -inset-4 -z-10 rounded-[3rem] bg-orange-200/30 blur-3xl dark:bg-orange-900/25" />
              {/* Stacked chaotic browser windows */}
              {[
                { rotate: -8, top: 0, left: 0, label: 'SMS Tool', color: 'bg-alive5-orange' },
                { rotate: 4, top: 30, left: 40, label: 'Live Chat', color: 'bg-accent-teal' },
                { rotate: -3, top: 60, left: 20, label: 'Messenger', color: 'bg-[#3B82F6]' },
                { rotate: 6, top: 90, left: 60, label: 'CRM', color: 'bg-accent-purple' },
              ].map((card, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20, rotate: 0 }}
                  whileInView={{ opacity: 1, y: 0, rotate: card.rotate }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.15 }}
                  style={{ top: card.top, left: card.left }}
                  className="absolute w-56 overflow-hidden rounded-xl border border-grey-200 bg-white shadow-2xl dark:border-white/10 dark:bg-grey-800"
                >
                  <div className="flex items-center gap-1.5 border-b border-grey-200 bg-grey-50 px-3 py-2 dark:border-white/10 dark:bg-grey-900">
                    <span className="size-2 rounded-full bg-[#FF5F57]" />
                    <span className="size-2 rounded-full bg-[#FEBC2E]" />
                    <span className="size-2 rounded-full bg-[#28C840]" />
                    <span className={`ml-2 inline-flex size-5 items-center justify-center rounded ${card.color}`}>
                      <span className="size-1.5 rounded-full bg-white" />
                    </span>
                    <span className="text-legal font-semibold text-grey-700 dark:text-grey-300">
                      {card.label}
                    </span>
                  </div>
                  <div className="space-y-1.5 p-3">
                    <div className="h-1.5 w-full rounded-full bg-grey-100 dark:bg-grey-700" />
                    <div className="h-1.5 w-3/4 rounded-full bg-grey-100 dark:bg-grey-700" />
                    <div className="h-1.5 w-1/2 rounded-full bg-grey-100 dark:bg-grey-700" />
                  </div>
                </motion.div>
              ))}
              <div className="invisible">
                <div className="h-[280px]" />
              </div>
              {/* Red error badge */}
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.8, type: 'spring' }}
                className="absolute -right-2 top-8 z-10 inline-flex items-center gap-1 rounded-full bg-red-500 px-2.5 py-1 text-legal font-bold text-white shadow-lg"
              >
                <AlertCircle className="size-3" />
                API broken
              </motion.div>
            </div>
          </FadeUp>
        </div>

        <Stagger className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4" stagger={0.1}>
          {FRANKENCHAT_PROBLEMS.map((p) => (
            <motion.div
              key={p.title}
              variants={staggerItem}
              whileHover={{ y: -6 }}
              className="rounded-2xl border border-grey-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md dark:bg-grey-800"
            >
              <span className="inline-flex size-11 items-center justify-center rounded-xl bg-orange-100 text-alive5-orange">
                <p.Icon className="size-5" />
              </span>
              <h3 className="mt-4 text-h4 text-grey-900">{p.title}</h3>
              <p className="mt-2 text-small text-grey-700">{p.body}</p>
            </motion.div>
          ))}
        </Stagger>
      </Section>

      {/* ==========================================================
       * THE SOLUTION — "ONE AND DONE" with multichannel illustration
       * ======================================================== */}
      <section className="relative overflow-hidden bg-gradient-to-br from-grey-900 via-[#1c1c1f] to-grey-900 py-24 text-white md:py-32">
        <div className="pointer-events-none absolute -right-32 top-0 size-[36rem] rounded-full bg-alive5-orange/25 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-32 -left-16 size-[28rem] rounded-full bg-accent-purple/20 blur-3xl" />
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.18]"
          style={{
            backgroundImage:
              'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.4) 1px, transparent 0)',
            backgroundSize: '22px 22px',
          }}
        />

        <Container className="relative">
          <FadeUp className="mx-auto max-w-3xl text-center">
            <p className="text-legal font-semibold uppercase tracking-[0.18em] text-orange-300">
              The solution
            </p>
            <h2 className="mt-3 text-h2 leading-[1.05] text-white md:text-[3.25rem]">
              Omni-channel engagement.{' '}
              <span className="bg-gradient-to-r from-alive5-orange via-orange-400 to-orange-600 bg-clip-text text-transparent">
                One and Done.
              </span>
            </h2>
            <p className="mt-6 text-body-lg text-grey-300">
              SMS, web chat, social, and A.I. — unified in a single streamlined inbox with one
              workflow, one license set, and one CRM integration across every channel.
            </p>
          </FadeUp>

          {/* Real product illustration */}
          <FadeUp delay={0.15} className="mt-14">
            <div className="relative mx-auto w-full max-w-5xl">
              <div className="pointer-events-none absolute inset-x-12 -bottom-6 h-12 rounded-full bg-black/40 blur-3xl" />
              <motion.img
                src="/business-sms/multichannel.jpg"
                alt="Alive5 unified inbox — SMS, Live Chat, Messenger, Zoom and CRM in one place"
                width={1600}
                height={830}
                loading="lazy"
                initial={{ opacity: 0, scale: 0.96 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="relative w-full rounded-2xl drop-shadow-[0_30px_60px_rgba(0,0,0,0.5)]"
              />
            </div>
          </FadeUp>

          <Stagger className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4" stagger={0.08}>
            {[
              'One streamlined inbox',
              'One workflow',
              'One license set',
              'One CRM integration',
            ].map((label) => (
              <motion.div
                key={label}
                variants={staggerItem}
                className="flex items-center gap-2.5 rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur"
              >
                <span className="inline-flex size-6 flex-none items-center justify-center rounded-md bg-alive5-orange/20 text-alive5-orange ring-1 ring-alive5-orange/40">
                  <Check className="size-3.5" strokeWidth={3} />
                </span>
                <p className="text-small font-semibold">{label}</p>
              </motion.div>
            ))}
          </Stagger>
        </Container>
      </section>

      {/* ==========================================================
       * STORY BEHIND THE NAME — Short Circuit / Johnny 5
       * ======================================================== */}
      <Section>
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <FadeUp className="order-2 lg:order-1">
            <div className="relative mx-auto w-full max-w-md">
              <div className="pointer-events-none absolute -inset-4 -z-10 rounded-[3rem] bg-orange-200/30 blur-3xl dark:bg-orange-900/30" />
              {/* Polished card with retrain image — represents the "alive" software */}
              <motion.img
                src="/features/retrain-382c8e81-652w.png"
                alt="A blue RETRAIN key — software that learns and stays alive"
                loading="lazy"
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                className="w-full rounded-3xl shadow-2xl ring-1 ring-grey-200 dark:ring-white/10"
              />
            </div>
          </FadeUp>

          <FadeUp delay={0.1} className="order-1 lg:order-2">
            <p className="text-legal font-semibold uppercase tracking-[0.18em] text-alive5-orange">
              Pop culture origin
            </p>
            <h2 className="mt-3 text-h2 leading-[1.05] text-grey-900">
              The story behind{' '}
              <span className="text-alive5-orange">the name</span>
            </h2>
            <p className="mt-5 text-body-lg text-grey-700">
              "Alive5" nods to the 1986 cult classic <em>Short Circuit</em> — a military robot
              gains consciousness after a lightning strike and frantically reminds everyone:{' '}
              <strong className="font-semibold text-grey-900">"Johnny 5 is Alive!"</strong>
            </p>
            <p className="mt-4 text-body text-grey-700">
              The metaphor stuck. Software that becomes self-aware, learns from your business, and
              answers customers when you're off the clock — that's what we set out to build.
            </p>
            <a
              href="https://www.imdb.com/title/tt0091949/"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-7 inline-flex items-center gap-1 text-small font-semibold text-alive5-orange hover:underline"
            >
              Watch the trailer on IMDb
              <ArrowRight className="size-3" />
            </a>
          </FadeUp>
        </div>
      </Section>

      {/* ==========================================================
       * VALUES
       * ======================================================== */}
      <Section className="bg-surface-soft">
        <FadeUp className="mx-auto max-w-2xl text-center">
          <p className="text-legal font-semibold uppercase tracking-[0.18em] text-alive5-orange">
            How we work
          </p>
          <h2 className="mt-3 text-h2 leading-[1.05] text-grey-900">
            What we{' '}
            <span className="text-alive5-orange">value</span>
          </h2>
        </FadeUp>

        <Stagger className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4" stagger={0.1}>
          {VALUES.map((v) => (
            <motion.div
              key={v.title}
              variants={staggerItem}
              whileHover={{ y: -6 }}
              className="rounded-3xl border border-grey-200 bg-white p-7 shadow-sm transition-shadow hover:shadow-md dark:bg-grey-800"
            >
              <span className="inline-flex size-12 items-center justify-center rounded-xl bg-orange-100 text-alive5-orange">
                <v.Icon className="size-5" />
              </span>
              <h3 className="mt-5 text-h4 text-grey-900">{v.title}</h3>
              <p className="mt-3 text-small text-grey-700">{v.body}</p>
            </motion.div>
          ))}
        </Stagger>
      </Section>

      {/* ==========================================================
       * PARTNERS / NETWORKS
       * ======================================================== */}
      <Section>
        <FadeUp className="mx-auto max-w-2xl text-center">
          <p className="text-legal font-semibold uppercase tracking-[0.18em] text-alive5-orange">
            Networks & partners
          </p>
          <h2 className="mt-3 text-h2 leading-[1.05] text-grey-900">
            Trusted by{' '}
            <span className="text-alive5-orange">institutional partners</span>
          </h2>
          <p className="mt-4 text-body-lg text-grey-700">
            We graduated from the 2018 Comcast NBCUniversal LIFT Labs accelerator powered by{' '}
            <strong className="font-semibold text-grey-900">Techstars</strong>, and continue to
            partner with leading networks.
          </p>
        </FadeUp>

        <Stagger className="mt-12 grid items-center gap-6 sm:grid-cols-3" stagger={0.12}>
          {PARTNERS.map((p) => (
            <motion.div
              key={p.name}
              variants={staggerItem}
              whileHover={{ y: -4 }}
              className="flex items-center justify-center rounded-2xl border border-grey-200 bg-white p-8 shadow-sm transition-shadow hover:shadow-md dark:bg-grey-800"
            >
              <img
                src={p.src}
                alt={p.name}
                loading="lazy"
                className="h-14 w-auto max-w-full object-contain"
              />
            </motion.div>
          ))}
        </Stagger>
      </Section>

      {/* ==========================================================
       * COMPLIANCE BAND
       * ======================================================== */}
      <Section className="bg-surface-soft">
        <FadeUp className="mx-auto max-w-4xl rounded-3xl border border-grey-200 bg-gradient-to-br from-white to-surface-cream p-8 shadow-md dark:border-white/10 dark:from-grey-800 dark:to-grey-900 md:p-12">
          <div className="grid items-center gap-8 md:grid-cols-[auto_1fr]">
            <span className="inline-flex size-16 items-center justify-center rounded-2xl bg-orange-100 text-alive5-orange">
              <ShieldCheck className="size-8" />
            </span>
            <div>
              <p className="text-legal font-semibold uppercase tracking-[0.18em] text-alive5-orange">
                Enterprise-grade trust
              </p>
              <h3 className="mt-2 text-h3 text-grey-900">
                <span className="text-alive5-orange">SOC 2 Type II</span> &{' '}
                <span className="text-alive5-orange">PCI-DSS</span> certified
              </h3>
              <p className="mt-3 text-body text-grey-700">
                Built with privacy, security, and compliance baked in by design — including GDPR
                and BAA-available workflows for healthcare partners.
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                {['SOC 2 Type II', 'PCI-DSS', 'GDPR', 'TCPA', '10DLC'].map((t) => (
                  <span
                    key={t}
                    className="inline-flex items-center gap-1 rounded-full bg-orange-100 px-3 py-1.5 text-legal font-bold uppercase tracking-wider text-alive5-orange ring-1 ring-orange-200 dark:bg-orange-950/40 dark:ring-orange-700/40"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </FadeUp>
      </Section>

      {/* ==========================================================
       * CONTACT
       * ======================================================== */}
      <Section>
        <FadeUp className="mx-auto max-w-2xl text-center">
          <p className="text-legal font-semibold uppercase tracking-[0.18em] text-alive5-orange">
            Get in touch
          </p>
          <h2 className="mt-3 text-h2 leading-[1.05] text-grey-900">
            Let's start a{' '}
            <span className="text-alive5-orange">conversation</span>
          </h2>
        </FadeUp>

        <Stagger className="mt-12 grid gap-4 md:grid-cols-3" stagger={0.1}>
          {[
            { Icon: Phone, title: 'Call or text us', line: '855-551-8858', href: 'tel:+18555518858' },
            { Icon: Mail, title: 'Sales', line: 'sales@alive5.com', href: 'mailto:sales@alive5.com' },
            { Icon: MapPin, title: 'Headquarters', line: 'Alive Technologies Inc., USA' },
          ].map(({ Icon, title, line, href }) => (
            <motion.div
              key={title}
              variants={staggerItem}
              whileHover={{ y: -4 }}
              className="rounded-2xl border border-grey-200 bg-white p-7 shadow-sm dark:bg-grey-800"
            >
              <span className="inline-flex size-11 items-center justify-center rounded-xl bg-orange-100 text-alive5-orange">
                <Icon className="size-5" />
              </span>
              <p className="mt-4 text-legal font-semibold uppercase tracking-wider text-grey-500">
                {title}
              </p>
              {href ? (
                <a
                  href={href}
                  className="mt-2 inline-block text-h4 font-bold text-grey-900 hover:text-alive5-orange"
                >
                  {line}
                </a>
              ) : (
                <p className="mt-2 text-h4 font-bold text-grey-900">{line}</p>
              )}
            </motion.div>
          ))}
        </Stagger>
      </Section>

      {/* ==========================================================
       * FINAL CTA
       * ======================================================== */}
      <Section bleed className="!py-0">
        <FadeUp>
          <div className="relative overflow-hidden bg-gradient-to-br from-orange-400 via-alive5-orange to-orange-700 px-6 py-24 text-center md:py-28">
            <div
              className="pointer-events-none absolute inset-0 opacity-20"
              style={{
                backgroundImage:
                  'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.6) 1px, transparent 0)',
                backgroundSize: '26px 26px',
              }}
            />
            <Container className="relative max-w-3xl">
              <h2 className="mx-auto text-h2 text-white md:text-[3rem] md:leading-[1.05]">
                Ready to ditch the Frankenchat?
              </h2>
              <p className="mx-auto mt-5 max-w-xl text-body-lg text-white/90">
                One inbox. One workflow. One license set. Book a 30-minute call and we'll show you
                how.
              </p>
              <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <a
                  href="https://calendly.com/rohit-consult"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex min-h-[54px] items-center justify-center gap-2 rounded bg-white px-8 py-4 text-body font-semibold text-alive5-orange shadow-lg transition-all hover:-translate-y-0.5 hover:shadow-xl"
                >
                  Book a Demo
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                </a>
                <Link
                  to="/pricing"
                  className="inline-flex min-h-[54px] items-center justify-center rounded border border-white/40 px-8 py-4 text-body font-semibold text-white transition-colors hover:bg-white/10"
                >
                  See pricing
                </Link>
              </div>
            </Container>
          </div>
        </FadeUp>
      </Section>
    </>
  );
}
