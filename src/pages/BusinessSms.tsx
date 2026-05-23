import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  ArrowLeftRight,
  Check,
  Sparkles,
  Phone,
  MessageSquare,
  Image as ImageIcon,
  Megaphone,
  Languages,
  CreditCard,
  QrCode,
  ShieldCheck,
  Bot,
  Mail,
  Smartphone,
  Facebook,
  Globe,
  Database,
  Users,
  Target,
  HeadphonesIcon,
  TrendingUp,
  CalendarClock,
  Workflow,
  Repeat2,
} from 'lucide-react';
import { Container } from '@/components/layout/Container';
import { Section } from '@/components/layout/Section';
import { FadeUp, Stagger, staggerItem } from '@/components/motion/FadeUp';
import { Typewriter } from '@/components/motion/Typewriter';
import { StorylaneDemo } from '@/components/marketing/StorylaneDemo';
import { SEOHead } from '@/components/seo/SEOHead';

const CDN = (n: string) => `https://lirp.cdn-website.com/519d3ac1/dms3rep/multi/opt/${n}`;

type VoipProvider = {
  name: string;
  to: string;
  /** Inline brand wordmark — keeps things self-contained and crisp at any size. */
  Wordmark: () => JSX.Element;
};

const VOIP_PROVIDERS: VoipProvider[] = [
  {
    name: 'Vonage',
    to: '/cant-send-sms-vonage',
    Wordmark: () => (
      <div className="flex items-center gap-1.5">
        <svg viewBox="0 0 24 24" className="size-6 text-grey-900 dark:text-white" aria-hidden="true">
          <path
            fill="currentColor"
            d="M9.279 11.617L4.74 1.547H0l6.797 15.296a.084.084 0 0 0 .153 0zM19.177 1.547s-6.148 1.336-10.024 12.108c-.926 2.572-1.526 4.708-2.083 6.79.013 0 .04.013.054.013-.04.135-.067.27-.107.405.04-.013.067-.013.108-.027.04.013.094.014.135.027a16.6 16.6 0 0 1 1.43-3.92c1.443-2.92 3.378-5.504 5.747-6.764 1.55-.811 3.297-1.146 4.74-1.146z"
          />
        </svg>
        <span className="font-display text-h4 font-extrabold tracking-tight text-grey-900 dark:text-white">
          VONAGE
        </span>
      </div>
    ),
  },
  {
    name: 'Comcast Business',
    to: '/comcast-business-sms-texting',
    Wordmark: () => (
      <div className="text-center leading-none">
        <span className="font-display text-h3 font-extrabold tracking-tight text-grey-900 dark:text-white">
          comcast
        </span>
        <p className="mt-1 text-legal font-bold uppercase tracking-[0.18em] text-[#1c69d4]">
          Business
        </p>
      </div>
    ),
  },
  {
    name: 'RingCentral',
    to: '/ringcentral--sms',
    Wordmark: () => (
      <span className="font-display text-h3 font-extrabold tracking-tight">
        <span className="text-[#FF8800]">Ring</span>
        <span className="text-[#066FAC]">Central</span>
      </span>
    ),
  },
  {
    name: 'Zoom',
    to: '/cant-send-sms-zoom-phone',
    Wordmark: () => (
      <span className="font-display text-[2.5rem] font-extrabold leading-none tracking-tight text-[#0B5CFF]">
        zoom
      </span>
    ),
  },
];

const STATS = [
  { value: '85%', label: 'of customers prefer texts over calls or emails' },
  { value: '$67K', label: 'annual revenue gained by preventing no-shows' },
  { value: '98%', label: 'of SMS texts read in the first hour (vs 40% emails)' },
  { value: '33%', label: 'reduction of no-shows with SMS reminders' },
];

const SHARE_TILES = [
  { icon: ImageIcon, label: 'Photos, PDFs, videos', tint: 'bg-orange-100 text-alive5-orange' },
  { icon: MessageSquare, label: 'Commercials, explainers', tint: 'bg-accent-teal/15 text-accent-teal' },
  { icon: Sparkles, label: 'GIFs, demos, emojis', tint: 'bg-accent-purple/15 text-accent-purple' },
  { icon: Globe, label: 'Shortened links', tint: 'bg-accent-green/15 text-accent-green' },
];

const PROMOS_STEPS = [
  {
    title: 'Segment your list',
    body: 'Create a list from existing contacts, or upload from a CSV file.',
  },
  {
    title: 'Craft your message',
    body: 'Compose a personalized message with variables such as name or account info.',
  },
  {
    title: 'Press send!',
    body: 'Execute with a single click, and chat with engaged contacts or let automation take over.',
  },
];

const REACH_CHANNELS = [
  { icon: Phone, title: '2-Way Texting', body: 'Make your office local or toll-free phone number textable.' },
  { icon: Megaphone, title: 'Bulk Broadcasts', body: 'Send personalized, outbound texts to many people at once.' },
  { icon: Globe, title: 'Web Chat Widget', body: 'Embed a click-to-chat icon on your website.' },
  { icon: QrCode, title: 'QR Codes', body: 'Engage on print, commercials, and live TV broadcasts.' },
  { icon: Mail, title: 'Email Campaigns', body: 'Add a chat link to your next emailer.' },
  { icon: Smartphone, title: 'Social Media', body: 'Engage followers by creating a VIP text club.' },
  { icon: Facebook, title: 'Facebook Pages', body: 'Build a chatbot for your fans and escalate to an agent.' },
  { icon: CreditCard, title: 'Capture Payments', body: 'Accept credit cards over SMS, live chat, and social.' },
];

const DEPARTMENTS = [
  {
    icon: Target,
    title: 'Sales teams',
    bullets: ['Automated lead qualification', 'Distribute leads evenly', 'Salesforce & Dynamics CRM integration'],
    gradient: 'from-alive5-orange/20 to-orange-100/30',
  },
  {
    icon: Megaphone,
    title: 'Marketing',
    bullets: ['Engaging, conversational funnels', 'Personalized, outbound bulk SMS', 'Tag & segment audiences'],
    gradient: 'from-accent-purple/20 to-accent-light-blue/30',
  },
  {
    icon: HeadphonesIcon,
    title: 'Service & support',
    bullets: ['Team inbox & conversation management', 'Human, chatbot, and A.I. automation', 'Omni-channel messaging'],
    gradient: 'from-accent-teal/20 to-accent-green/20',
  },
];

const FAQ_ITEMS = [
  {
    q: 'Can I set up multiple lines and users?',
    a: 'Yes, you can have a minimum of one phone line and one user (staff member). You can also set up multiple phone lines and decide which users have access to conversations on each. For example, one main customer service line plus individual lines per sales agent or team.',
  },
  {
    q: 'What type of texting can I do?',
    a: 'Alive5 supports one-to-one messages and bulk broadcasts to one or thousands of contacts at once. Messages can also be sent and received via our API. Alive5 also integrates with Salesforce and Microsoft Dynamics 365 CRMs.',
  },
  {
    q: 'Can I receive SMS from my cell phone?',
    a: 'No — mobile carriers restrict texting to the physical handset. Alive5 cannot send or receive texts from mobile phone numbers (including Xfinity Mobile).',
  },
  {
    q: 'Does Alive5 make phone calls?',
    a: 'No. Alive5 does not handle voice calls — that stays with your existing VoIP/landline provider. We only enable the SMS/MMS portion of your phone numbers.',
  },
  {
    q: 'What type of phone lines are textable?',
    a: 'Alive5 works with almost any VoIP and landline number. Voice service is untouched. Mobile phone numbers are not supported (texting is locked to the carrier handset).',
  },
  {
    q: 'Is Alive5 enterprise ready?',
    a: 'Yes. Features like SSO, SOC 2, GDPR, CCPA, and PCI compliance make Alive5 ready for higher-SLA enterprise deployments.',
  },
  {
    q: 'Do you offer a money-back guarantee?',
    a: 'Yes — up to 60 days money back (excluding 10DLC registration and SMS/MMS credit usage fees).',
  },
];

/* =====================================================================
 * COMPONENT
 * =================================================================== */

export default function BusinessSms() {
  return (
    <>
      <SEOHead
        title="Business SMS Solutions | Alive5"
        description="Text-enable your office phone for 2-way SMS & chatbot automation. Keep your existing VoIP provider. Done-for-you 10DLC registration. Starts at $5/month."
        canonical="https://www.alive5.com/business-sms"
        jsonLd={[
          {
            '@context': 'https://schema.org',
            '@type': 'Product',
            name: 'Alive5 Business SMS',
            description:
              'Text-enable your office VoIP phone with 2-way SMS, bulk broadcasts, automation, and team inbox.',
            brand: { '@type': 'Brand', name: 'Alive5' },
            offers: {
              '@type': 'AggregateOffer',
              priceCurrency: 'USD',
              lowPrice: '5',
              highPrice: '160',
            },
          },
          {
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: FAQ_ITEMS.map((f) => ({
              '@type': 'Question',
              name: f.q,
              acceptedAnswer: { '@type': 'Answer', text: f.a },
            })),
          },
        ]}
      />

      {/* ============================================================
       * HERO
       * ============================================================ */}
      <section className="relative overflow-hidden bg-gradient-to-b from-orange-50 via-surface-cream to-surface-page pt-32 pb-24 dark:from-[#2a1b14] dark:via-grey-900 dark:to-grey-900 md:pt-40 md:pb-32">
        {/* layered backdrops */}
        <div className="pointer-events-none absolute -left-32 top-12 size-[28rem] rounded-full bg-orange-200/40 blur-3xl dark:bg-orange-900/30" />
        <div className="pointer-events-none absolute right-0 top-40 size-[28rem] rounded-full bg-accent-light-blue/30 blur-3xl dark:bg-accent-teal/20" />
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

        {/* floating sparkles */}
        {[
          { x: 8, y: 22, d: 0 },
          { x: 92, y: 18, d: 1.2 },
          { x: 12, y: 70, d: 2.4 },
          { x: 88, y: 76, d: 0.6 },
        ].map((p, i) => (
          <motion.span
            key={i}
            className="pointer-events-none absolute"
            style={{ left: `${p.x}%`, top: `${p.y}%` }}
            animate={{ y: [0, -14, 0], opacity: [0.4, 1, 0.4], rotate: [0, 12, 0] }}
            transition={{ duration: 4 + i * 0.4, repeat: Infinity, ease: 'easeInOut', delay: p.d }}
          >
            <Sparkles className="size-4 text-alive5-orange/70" />
          </motion.span>
        ))}

        <Container className="relative">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            {/* === LEFT: copy === */}
            <FadeUp>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-orange-200 bg-white/90 px-3.5 py-1.5 text-small font-semibold text-alive5-orange shadow-sm backdrop-blur dark:border-orange-700/40 dark:bg-white/10">
                <Sparkles className="size-3.5" />
                Business SMS, elevated
              </span>

              <h1 className="mt-6 text-h1 leading-[1.0] tracking-tight text-grey-900 md:text-[4rem]">
                Business SMS,
                <br />
                <Typewriter
                  words={['automated.', 'simplified.', 'elevated.']}
                  className="inline-block bg-gradient-to-r from-alive5-orange via-orange-500 to-orange-600 bg-clip-text text-transparent"
                />
              </h1>

              <p className="mt-5 text-body-lg text-grey-700">
                Advanced texting with your existing VoIP numbers — flexible pricing from{' '}
                <strong className="font-semibold text-grey-900">$5/month</strong>. Keep your
                phone provider, gain a team inbox, ship in days.
              </p>

              <ul className="mt-7 space-y-2.5">
                {[
                  'Do-it-for-you 10DLC registration',
                  'Keep your existing phone provider',
                  'Bulk broadcasts + automated reminders',
                ].map((line) => (
                  <li key={line} className="flex items-center gap-2 text-body text-grey-800">
                    <span className="inline-flex size-5 items-center justify-center rounded-md bg-accent-green/15 text-accent-green ring-1 ring-accent-green/20">
                      <Check className="size-3" strokeWidth={3} />
                    </span>
                    {line}
                  </li>
                ))}
              </ul>

              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <a
                  href="https://calendly.com/rohit-consult"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-orange group !px-7 !py-4 text-body"
                >
                  Schedule a Demo
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                </a>
                <Link to="/pricing" className="btn-ghost !px-7 !py-4 text-body">
                  See pricing
                </Link>
              </div>
            </FadeUp>

            {/* === RIGHT: laughing-man image + floating feature stickers === */}
            <FadeUp delay={0.1}>
              <div className="relative mx-auto w-full max-w-xl">
                {/* warm halo behind the person */}
                <div className="pointer-events-none absolute inset-0 -z-10 mx-auto size-[28rem] translate-x-2 rounded-full bg-gradient-to-tr from-orange-300/40 via-orange-200/30 to-transparent blur-3xl" />

                <motion.img
                  src="/business-sms/hero-person.png"
                  alt="Smiling man holding phone — texting with Alive5"
                  loading="eager"
                  width={1240}
                  height={876}
                  initial={{ opacity: 0, scale: 0.92 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }}
                  className="relative z-0 w-full object-contain drop-shadow-[0_25px_50px_rgba(31,31,32,0.25)]"
                />

                {/* === floating feature stickers === */}
                <FloatingSticker
                  className="-left-4 top-2 sm:-left-6 md:-left-10"
                  delay={0.2}
                  icon={<Repeat2 className="size-4 text-alive5-orange" />}
                  label="One-to-One"
                />
                <FloatingSticker
                  className="-right-2 top-0 sm:-right-4 md:-right-6"
                  delay={0.4}
                  icon={<Users className="size-4 text-alive5-orange" />}
                  label="One-to-Many"
                />
                <FloatingSticker
                  className="-bottom-2 left-1/2 -translate-x-1/2"
                  delay={0.6}
                  icon={<CalendarClock className="size-4 text-alive5-orange" />}
                  label="Scheduling"
                />
                <FloatingSticker
                  className="-left-2 bottom-20 md:-left-8"
                  delay={0.8}
                  icon={<Workflow className="size-4 text-alive5-orange" />}
                  label="Integrations"
                />
                <FloatingSticker
                  className="-right-2 bottom-16 md:-right-8"
                  delay={1.0}
                  icon={<Bot className="size-4 text-alive5-orange" />}
                  label="Auto-Replies"
                />
              </div>
            </FadeUp>
          </div>
        </Container>
      </section>

      {/* ============================================================
       * VoIP COMPATIBILITY
       * ============================================================ */}
      <Section className="bg-surface-soft">
        <FadeUp className="mx-auto max-w-2xl text-center">
          <p className="text-legal font-semibold uppercase tracking-[0.18em] text-alive5-orange">
            Universal compatibility
          </p>
          <h2 className="mt-3 text-h2 text-grey-900">
            Works with any{' '}
            <span className="text-alive5-orange">VoIP phone system</span>
          </h2>
          <p className="mt-4 text-body-lg text-grey-700">
            Comcast Business, Vonage, RingCentral, Zoom Phone — we plug into them all.
          </p>
        </FadeUp>

        <Stagger className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4" stagger={0.08}>
          {VOIP_PROVIDERS.map(({ name, to, Wordmark }) => (
            <motion.div
              key={name}
              variants={staggerItem}
              whileHover={{ y: -4 }}
              className="group flex flex-col items-center justify-between gap-5 rounded-2xl border border-grey-200 bg-white p-8 text-center shadow-sm transition-all hover:shadow-md dark:bg-grey-800"
            >
              <div className="flex h-16 items-center justify-center">
                <Wordmark />
              </div>
              <Link
                to={to}
                className="inline-flex items-center gap-1 text-small font-semibold text-alive5-orange opacity-70 transition-opacity hover:underline group-hover:opacity-100"
              >
                Learn more
                <ArrowRight className="size-3 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </motion.div>
          ))}
        </Stagger>
      </Section>

      {/* ============================================================
       * #1 TOOL FOR DAY-TO-DAY — orange banner + embedded Storylane demo
       * ============================================================ */}
      <section className="relative overflow-hidden bg-alive5-orange py-20 text-white md:py-24">
        <div
          className="pointer-events-none absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.6) 1px, transparent 0)',
            backgroundSize: '26px 26px',
          }}
        />
        <Container className="relative">
          <FadeUp className="mx-auto max-w-3xl text-center">
            <h2 className="text-h2 leading-[1.05] text-white md:text-[3rem]">
              The #1 tool for{' '}
              <span className="italic">day-to-day operations</span>
            </h2>
            <p className="mt-5 text-body-lg text-white/90">
              One platform, any conversation. Alive5 handles 1:1 chats, client reminders, bulk
              messaging, and team-wide access — all in one place.
            </p>
          </FadeUp>

          {/* Self-hosted Storylane interactive walkthrough — same demo as Home */}
          <FadeUp delay={0.15} className="mt-12">
            <StorylaneDemo />
          </FadeUp>
        </Container>
      </section>

      {/* ============================================================
       * SAME NUMBER VOICE + TEXT — illustrated routing diagram
       * ============================================================ */}
      <Section>
        <FadeUp className="mx-auto max-w-2xl text-center">
          <p className="text-legal font-semibold uppercase tracking-[0.18em] text-alive5-orange">
            No new numbers
          </p>
          <h2 className="mt-3 text-h2 leading-[1.05] text-grey-900">
            Same phone number for{' '}
            <span className="text-alive5-orange">voice and text</span>
          </h2>
          <p className="mt-4 text-body-lg text-grey-700">
            Make calls through your current phone system and text through Alive5's desktop and
            mobile app — the same business number your customers already know.
          </p>
        </FadeUp>

        <FadeUp delay={0.15} className="mt-14">
          <div className="relative mx-auto w-full max-w-5xl">
            {/* warm halo behind the illustration */}
            <div className="pointer-events-none absolute inset-x-12 -bottom-6 h-12 rounded-full bg-grey-900/15 blur-3xl" />
            <motion.img
              src="/business-sms/voice-text-routing.png"
              alt="Voice and text routing: customer texts a landline, message routes through Alive5 to the team's desktop and mobile app"
              width={1920}
              height={1316}
              loading="lazy"
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }}
              className="relative w-full drop-shadow-[0_30px_60px_rgba(31,31,32,0.18)]"
            />
          </div>
        </FadeUp>
      </Section>

      {/* ============================================================
       * TESTIMONIAL
       * ============================================================ */}
      <Section className="bg-surface-soft">
        <FadeUp className="mx-auto max-w-4xl rounded-3xl border border-grey-200 bg-white p-8 shadow-md dark:bg-grey-800 md:p-12">
          <span className="text-[3rem] leading-none text-alive5-orange">"</span>
          <blockquote className="-mt-4 text-h3 leading-snug text-grey-900">
            TONS of responses and lots of inbound phone calls from that reminder text. I honestly
            underestimated the buzz it would generate — but I'll take those problems any day!
            The text-messaging campaign helped us renew an additional 62 accounts — 186 season
            tickets for{' '}
            <span className="text-alive5-orange">$37K</span>.
          </blockquote>
          <div className="mt-6 flex items-center gap-4">
            <img
              src={CDN('rogers_justin_mug19-1920w.jpeg')}
              alt="Justin Rogers, Director of Ticket Sales"
              loading="lazy"
              className="size-14 rounded-full object-cover ring-2 ring-orange-200"
            />
            <div>
              <p className="text-body font-bold text-grey-900">Justin Rogers</p>
              <p className="text-small text-grey-700">
                Director of Ticket Sales, University of Texas at San Antonio
              </p>
            </div>
          </div>
        </FadeUp>
      </Section>

      {/* ============================================================
       * STATS
       * ============================================================ */}
      <Section>
        <FadeUp className="mx-auto max-w-2xl text-center">
          <p className="text-legal font-semibold uppercase tracking-[0.18em] text-alive5-orange">
            By the numbers
          </p>
          <h2 className="mt-3 text-h2 text-grey-900">
            Text messaging{' '}
            <span className="text-alive5-orange">stats</span>
          </h2>
        </FadeUp>

        <Stagger className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4" stagger={0.1}>
          {STATS.map((s) => (
            <motion.div
              key={s.value}
              variants={staggerItem}
              whileHover={{ y: -6 }}
              className="relative overflow-hidden rounded-3xl border border-grey-200 bg-gradient-to-br from-orange-50 to-white p-7 shadow-sm dark:border-white/10 dark:from-grey-800 dark:to-grey-900"
            >
              <p className="text-[3rem] font-bold leading-none text-alive5-orange md:text-[3.5rem]">
                {s.value}
              </p>
              <p className="mt-4 text-body text-grey-700">{s.label}</p>
            </motion.div>
          ))}
        </Stagger>
      </Section>

      {/* ============================================================
       * TEAM INBOX
       * ============================================================ */}
      <FeatureRow
        reversed
        eyebrow="Team workflow"
        title={
          <>
            Powerful{' '}
            <span className="text-alive5-orange">team inbox</span>
          </>
        }
        body="See all customer conversations in one place. Sort messages with filters and tags. Manage different types of customers across teams using one or many phone numbers."
        image={CDN('Team+Inbox-1920w.png')}
        imageAlt="Alive5 team inbox interface"
        backgroundClass="bg-surface-soft"
      />

      {/* ============================================================
       * PREVENT NO-SHOWS
       * ============================================================ */}
      <FeatureRow
        eyebrow="Automated reminders"
        title={
          <>
            Prevent{' '}
            <span className="text-alive5-orange">no-shows</span>
          </>
        }
        body="Reduce costly no-shows by scheduling automated text reminders before appointments. Customers reply directly to reschedule or confirm — no phone tag."
        image={CDN('a5_feature_schedule-1920w.png')}
        imageAlt="Scheduled appointment reminders interface"
      />

      {/* ============================================================
       * SHARE LINKS AND PHOTOS
       * ============================================================ */}
      <Section className="bg-surface-soft">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <FadeUp>
            <p className="text-legal font-semibold uppercase tracking-[0.18em] text-alive5-orange">
              Rich media
            </p>
            <h2 className="mt-3 text-h2 leading-[1.05] text-grey-900">
              Share{' '}
              <span className="text-alive5-orange">links and photos</span>
            </h2>
            <ul className="mt-7 space-y-3">
              {[
                'Send and receive without getting blocked',
                'Built-in link shortener approved by mobile networks',
                'Office files (PDF, Word, Excel, PowerPoint)',
              ].map((b) => (
                <li key={b} className="flex items-start gap-2.5 text-body text-grey-800">
                  <span className="mt-0.5 inline-flex size-5 flex-none items-center justify-center rounded-md bg-accent-green/15 text-accent-green ring-1 ring-accent-green/20">
                    <Check className="size-3" strokeWidth={3} />
                  </span>
                  {b}
                </li>
              ))}
            </ul>
          </FadeUp>

          <Stagger className="grid grid-cols-2 gap-4" stagger={0.08}>
            {SHARE_TILES.map((t) => (
              <motion.div
                key={t.label}
                variants={staggerItem}
                whileHover={{ y: -4 }}
                className="rounded-2xl border border-grey-200 bg-white p-5 shadow-sm dark:bg-grey-800"
              >
                <span
                  className={`inline-flex size-11 items-center justify-center rounded-xl ${t.tint}`}
                >
                  <t.icon className="size-5" />
                </span>
                <p className="mt-4 text-small font-semibold text-grey-900">{t.label}</p>
              </motion.div>
            ))}
          </Stagger>
        </div>
      </Section>

      {/* ============================================================
       * EFFORTLESS PROMOS - 3 STEPS
       * ============================================================ */}
      <Section>
        <FadeUp className="mx-auto max-w-3xl text-center">
          <p className="text-legal font-semibold uppercase tracking-[0.18em] text-alive5-orange">
            Bulk SMS
          </p>
          <h2 className="mt-3 text-h2 leading-[1.05] text-grey-900">
            Effortless{' '}
            <span className="text-alive5-orange">promos and alerts</span>
          </h2>
          <p className="mt-5 text-body-lg text-grey-700">
            Reach one customer or{' '}
            <strong className="font-semibold text-grey-900">thousands with a click</strong>.
            Targeted promotions, timely reminders, and event updates — all instant.
          </p>
        </FadeUp>

        <Stagger className="mt-14 grid gap-8 md:grid-cols-3" stagger={0.12}>
          {PROMOS_STEPS.map((s, i) => (
            <motion.div
              key={s.title}
              variants={staggerItem}
              whileHover={{ y: -6 }}
              className="relative overflow-hidden rounded-3xl border border-grey-200 bg-white p-8 shadow-sm dark:bg-grey-800"
            >
              <span className="inline-flex size-11 items-center justify-center rounded-full bg-alive5-orange text-body font-bold text-white shadow-orange">
                {i + 1}
              </span>
              <h3 className="mt-5 text-h4 text-grey-900">{s.title}</h3>
              <p className="mt-3 text-body text-grey-700">{s.body}</p>
            </motion.div>
          ))}
        </Stagger>
      </Section>

      {/* ============================================================
       * TEXT IN ANY LANGUAGE
       * ============================================================ */}
      <FeatureRow
        reversed
        eyebrow="Multilingual"
        title={
          <>
            Text in{' '}
            <span className="text-alive5-orange">any language</span>
          </>
        }
        body="Chat with users without knowing their native language. Reply in your language and Alive5 auto-translates both directions. Supports 70+ languages — become multilingual with a click."
        icon={<Languages className="size-7" />}
        image={CDN('translate-1920w.png')}
        imageAlt="Auto-translation between languages"
        backgroundClass="bg-surface-soft"
      />

      {/* ============================================================
       * CARD PAYMENTS
       * ============================================================ */}
      <Section>
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <FadeUp>
            <span className="inline-flex size-12 items-center justify-center rounded-xl bg-orange-100 text-alive5-orange">
              <CreditCard className="size-6" />
            </span>
            <h2 className="mt-5 text-h2 leading-[1.05] text-grey-900">
              Accept secure{' '}
              <span className="text-alive5-orange">card payments</span>
            </h2>
            <p className="mt-5 text-body-lg text-grey-700">
              Securely capture payments, deposits, and past dues via SMS — eliminating phone tag.
            </p>
            <ul className="mt-7 space-y-3">
              {['Close deals on the spot', '0% transaction fees', 'PCI-DSS compliant'].map((b) => (
                <li key={b} className="flex items-start gap-2.5 text-body text-grey-800">
                  <span className="mt-0.5 inline-flex size-5 flex-none items-center justify-center rounded-md bg-accent-green/15 text-accent-green ring-1 ring-accent-green/20">
                    <Check className="size-3" strokeWidth={3} />
                  </span>
                  {b}
                </li>
              ))}
            </ul>
          </FadeUp>
          <FadeUp delay={0.1}>
            <img
              src={CDN('alivepay-ac9a03c3-1920w.png')}
              alt="Alive5 secure SMS payments"
              loading="lazy"
              className="mx-auto w-full max-w-md rounded-3xl shadow-xl ring-1 ring-grey-200 dark:ring-white/10"
            />
          </FadeUp>
        </div>
      </Section>

      {/* ============================================================
       * QR CODES — illustration-led, full-width
       * ============================================================ */}
      <Section className="bg-surface-soft">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <FadeUp>
            <span className="inline-flex size-12 items-center justify-center rounded-xl bg-orange-100 text-alive5-orange">
              <QrCode className="size-6" />
            </span>
            <h2 className="mt-5 text-h2 leading-[1.05] text-grey-900">
              QR codes that
              <br />
              <span className="text-alive5-orange">start conversations</span>
            </h2>
            <div className="mt-4 h-1 w-16 rounded-full bg-alive5-orange" />
            <p className="mt-5 text-body-lg text-grey-700">
              Amplify your business cards and print media with a QR code that triggers an opt-in
              flow.
            </p>
            <Link
              to="/qr-codes"
              className="mt-7 inline-flex items-center gap-1 text-body font-semibold text-alive5-orange underline-offset-4 hover:underline"
            >
              Explore the power of QR codes
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </FadeUp>

          <FadeUp delay={0.1}>
            <div className="relative mx-auto w-full max-w-md">
              <div className="pointer-events-none absolute -inset-4 -z-10 rounded-[3rem] bg-orange-200/30 blur-3xl dark:bg-orange-900/25" />
              <motion.img
                src="/business-sms/qr-widgets.png"
                alt="QR code triggering a live chat conversation"
                loading="lazy"
                width={720}
                height={580}
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                className="w-full drop-shadow-[0_20px_40px_rgba(31,31,32,0.15)]"
              />
            </div>
          </FadeUp>
        </div>
      </Section>

      {/* ============================================================
       * COMPLIANCE — illustration on left, content + tags on right
       * ============================================================ */}
      <Section>
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <FadeUp className="order-2 lg:order-1">
            <div className="relative mx-auto w-full max-w-md">
              <div className="pointer-events-none absolute -inset-4 -z-10 rounded-[3rem] bg-orange-200/30 blur-3xl dark:bg-orange-900/25" />
              <motion.img
                src="/business-sms/sms-compliance.png"
                alt="Compliance lock icon over chat bubbles — SMS compliance built-in"
                loading="lazy"
                width={700}
                height={680}
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
                className="w-full drop-shadow-[0_20px_40px_rgba(31,31,32,0.15)]"
              />
            </div>
          </FadeUp>

          <FadeUp delay={0.1} className="order-1 lg:order-2">
            <span className="inline-flex size-12 items-center justify-center rounded-xl bg-orange-100 text-alive5-orange">
              <ShieldCheck className="size-6" />
            </span>
            <h2 className="mt-5 text-h2 leading-[1.05] text-grey-900">
              Compliance{' '}
              <span className="text-alive5-orange">built-in</span>
            </h2>
            <div className="mt-4 h-1 w-16 rounded-full bg-alive5-orange" />
            <p className="mt-5 text-body-lg text-grey-700">
              Alive5 is developed with all industry standards and best practices built in. You can
              confidently use our tools to grow your business the right way.
            </p>

            {/* compliance tag pills with hover effect */}
            <div className="mt-7 flex flex-wrap gap-2">
              {['TCPA', '10DLC', 'SOC 2', 'GDPR', 'PCI-DSS'].map((tag) => (
                <motion.span
                  key={tag}
                  whileHover={{ y: -2 }}
                  className="inline-flex items-center gap-1 rounded-full bg-orange-100 px-3 py-1.5 text-legal font-bold uppercase tracking-wider text-alive5-orange ring-1 ring-orange-200 dark:bg-orange-950/40 dark:ring-orange-700/40"
                >
                  {tag}
                </motion.span>
              ))}
            </div>

            <p className="mt-6 text-small text-grey-700">
              Learn more about{' '}
              <Link
                to="/understanding-tcpa-compliance-for-sms-texting"
                className="font-semibold text-alive5-orange underline-offset-4 hover:underline"
              >
                TCPA
              </Link>
              ,{' '}
              <Link
                to="/10dlc-and-what-it-means-for-texting"
                className="font-semibold text-alive5-orange underline-offset-4 hover:underline"
              >
                10DLC
              </Link>
              , and{' '}
              <Link
                to="/best-practices-for-sms-opt-ins"
                className="font-semibold text-alive5-orange underline-offset-4 hover:underline"
              >
                Opt-Ins
              </Link>
              .
            </p>
          </FadeUp>
        </div>
      </Section>

      {/* ============================================================
       * SERVE 24/7
       * ============================================================ */}
      <Section>
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <FadeUp>
            <span className="inline-flex size-12 items-center justify-center rounded-xl bg-orange-100 text-alive5-orange">
              <Bot className="size-6" />
            </span>
            <h2 className="mt-5 text-h2 leading-[1.05] text-grey-900">
              Serve customers{' '}
              <span className="text-alive5-orange">24/7</span>
            </h2>
            <p className="mt-5 text-body-lg text-grey-700">
              Build automated text flows with a simple drag-and-drop interface.
            </p>
            <ul className="mt-7 space-y-3">
              {[
                'Automatic responses for off-hours and OOO',
                'Customize replies by keyword (e.g. "promo")',
                'Ask for more details before reaching staff',
              ].map((b) => (
                <li key={b} className="flex items-start gap-2.5 text-body text-grey-800">
                  <span className="mt-0.5 inline-flex size-5 flex-none items-center justify-center rounded-md bg-accent-green/15 text-accent-green ring-1 ring-accent-green/20">
                    <Check className="size-3" strokeWidth={3} />
                  </span>
                  {b}
                </li>
              ))}
            </ul>
            <Link
              to="/chatbots"
              className="mt-7 inline-flex items-center gap-1 text-small font-semibold text-alive5-orange hover:underline"
            >
              More about chatbots
              <ArrowRight className="size-3" />
            </Link>
          </FadeUp>

          <FadeUp delay={0.1}>
            <div className="relative mx-auto w-full max-w-xl">
              {/* warm halo behind the video */}
              <div className="pointer-events-none absolute -inset-4 -z-10 rounded-[3rem] bg-orange-200/40 blur-3xl dark:bg-orange-900/30" />

              <div className="overflow-hidden rounded-3xl border border-grey-200 bg-white shadow-2xl ring-1 ring-grey-200 dark:border-white/10 dark:bg-grey-800 dark:ring-white/10">
                <video
                  src="/videos/video-business-sms.mp4"
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  className="block h-auto w-full bg-white dark:bg-grey-900"
                  aria-label="Alive5 chatbot serving customers 24/7"
                >
                  Your browser does not support embedded video.
                </video>
              </div>
            </div>
          </FadeUp>
        </div>
      </Section>

      {/* ============================================================
       * 7 REACH CHANNELS
       * ============================================================ */}
      <Section className="bg-surface-soft">
        <FadeUp className="mx-auto max-w-2xl text-center">
          <p className="text-legal font-semibold uppercase tracking-[0.18em] text-alive5-orange">
            Omni-channel
          </p>
          <h2 className="mt-3 text-h2 text-grey-900">
            Make it easy for{' '}
            <span className="text-alive5-orange">customers to reach you</span>
          </h2>
        </FadeUp>

        <Stagger className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4" stagger={0.06}>
          {REACH_CHANNELS.map((c) => (
            <motion.div
              key={c.title}
              variants={staggerItem}
              whileHover={{ y: -4 }}
              className="rounded-2xl border border-grey-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md dark:bg-grey-800"
            >
              <span className="inline-flex size-10 items-center justify-center rounded-xl bg-orange-100 text-alive5-orange">
                <c.icon className="size-5" />
              </span>
              <h3 className="mt-4 text-h4 text-grey-900">{c.title}</h3>
              <p className="mt-2 text-small text-grey-700">{c.body}</p>
            </motion.div>
          ))}
        </Stagger>
      </Section>

      {/* ============================================================
       * ONE INBOX, MULTIPLE CHAT CHANNELS — illustrated diagram
       * ============================================================ */}
      <section className="relative overflow-hidden bg-white py-24 dark:bg-grey-900 md:py-28">
        <div className="pointer-events-none absolute right-0 top-1/2 size-96 -translate-y-1/2 rounded-full bg-orange-200/40 blur-3xl dark:bg-orange-900/30" />
        <Container className="relative">
          <FadeUp className="mx-auto max-w-3xl text-center">
            <h2 className="text-h2 leading-[1.05] text-grey-900">
              One inbox,{' '}
              <span className="text-alive5-orange">multiple chat channels</span>
            </h2>
            <p className="mt-4 text-body-lg text-grey-700">
              Alive5 organizes live chat, text messages, and Facebook conversations into one team
              inbox for easy relationship management.
            </p>
          </FadeUp>

          <FadeUp delay={0.15} className="mt-14">
            <div className="relative mx-auto w-full max-w-5xl">
              <div className="pointer-events-none absolute inset-x-12 -bottom-6 h-12 rounded-full bg-grey-900/15 blur-3xl" />
              <motion.img
                src="/business-sms/multichannel.jpg"
                alt="One inbox connecting live chat, SMS, Facebook Messenger, Zoom, and CRM — all in Alive5"
                width={1600}
                height={830}
                loading="lazy"
                initial={{ opacity: 0, scale: 0.96 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }}
                className="relative w-full rounded-2xl drop-shadow-[0_30px_60px_rgba(31,31,32,0.18)]"
              />
            </div>
          </FadeUp>
        </Container>
      </section>

      {/* ============================================================
       * DEPARTMENT CARDS
       * ============================================================ */}
      <Section>
        <FadeUp className="mx-auto max-w-2xl text-center">
          <p className="text-legal font-semibold uppercase tracking-[0.18em] text-alive5-orange">
            Built for every team
          </p>
          <h2 className="mt-3 text-h2 text-grey-900">
            Works across{' '}
            <span className="text-alive5-orange">multiple departments</span>
          </h2>
        </FadeUp>

        <Stagger className="mt-12 grid gap-6 md:grid-cols-3" stagger={0.1}>
          {DEPARTMENTS.map((d) => (
            <motion.div
              key={d.title}
              variants={staggerItem}
              whileHover={{ y: -6 }}
              className={`relative overflow-hidden rounded-3xl border border-grey-200 bg-gradient-to-br ${d.gradient} p-8 shadow-md dark:border-white/10`}
            >
              <span className="inline-flex size-12 items-center justify-center rounded-xl bg-white text-alive5-orange shadow-sm dark:bg-grey-900">
                <d.icon className="size-6" />
              </span>
              <h3 className="mt-5 text-h3 text-grey-900">{d.title}</h3>
              <ul className="mt-5 space-y-2.5">
                {d.bullets.map((b) => (
                  <li key={b} className="flex items-start gap-2 text-small text-grey-800">
                    <span className="mt-0.5 inline-flex size-4 flex-none items-center justify-center rounded-md bg-white text-accent-green ring-1 ring-grey-200 dark:bg-grey-900">
                      <Check className="size-2.5" strokeWidth={3} />
                    </span>
                    {b}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </Stagger>
      </Section>

      {/* ============================================================
       * CRM INTEGRATION
       * ============================================================ */}
      <Section className="bg-surface-soft">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <FadeUp>
            <span className="inline-flex size-12 items-center justify-center rounded-xl bg-orange-100 text-alive5-orange">
              <Database className="size-6" />
            </span>
            <h2 className="mt-5 text-h2 leading-[1.05] text-grey-900">
              CRM{' '}
              <span className="text-alive5-orange">integration</span>
            </h2>
            <p className="mt-5 text-body-lg text-grey-700">
              Keep your customer data in sync across platforms. Conversations automatically flow
              into your CRM with native integration for{' '}
              <strong className="font-semibold text-grey-900">Salesforce</strong> and{' '}
              <strong className="font-semibold text-grey-900">Microsoft Dynamics 365</strong>.
            </p>
            <p className="mt-3 text-body text-grey-700">
              Connect to any CRM using Zapier or our public API.
            </p>
          </FadeUp>

          <FadeUp delay={0.1}>
            <div className="grid grid-cols-2 gap-4">
              {['Salesforce', 'Dynamics 365', 'Zapier', 'Public API'].map((c, i) => (
                <motion.div
                  key={c}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="rounded-2xl border border-grey-200 bg-white p-5 text-center shadow-sm dark:bg-grey-800"
                >
                  <Users className="mx-auto size-7 text-alive5-orange" />
                  <p className="mt-3 text-small font-semibold text-grey-900">{c}</p>
                </motion.div>
              ))}
            </div>
          </FadeUp>
        </div>
      </Section>

      {/* ============================================================
       * CONVERT WEBSITE VISITORS
       * ============================================================ */}
      <Section className="bg-surface-soft">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <FadeUp className="order-1 lg:order-2">
            <span className="inline-flex size-12 items-center justify-center rounded-xl bg-orange-100 text-alive5-orange">
              <ArrowLeftRight className="size-6" />
            </span>
            <h2 className="mt-5 text-h2 leading-[1.05] text-grey-900">
              Convert website visitors{' '}
              <span className="text-alive5-orange">to contacts</span>
            </h2>
            <p className="mt-5 text-body-lg text-grey-700">
              Add a chat widget to your website — customers enter their phone number and the
              conversation continues over SMS. Web traffic in, texting leads out.
            </p>
            <Link
              to="/live-chat"
              className="mt-7 inline-flex items-center gap-1 text-small font-semibold text-alive5-orange hover:underline"
            >
              More about Live Chat
              <ArrowRight className="size-3" />
            </Link>
          </FadeUp>

          <FadeUp delay={0.1} className="order-2 lg:order-1">
            {/* Hand-illustrated widget mockup */}
            <div className="relative mx-auto w-full max-w-md">
              <div className="pointer-events-none absolute -inset-4 -z-10 rounded-[3rem] bg-orange-200/40 blur-3xl dark:bg-orange-900/30" />
              <div className="relative overflow-hidden rounded-3xl border border-grey-200 bg-gradient-to-br from-white to-surface-soft p-6 shadow-2xl ring-1 ring-grey-200 dark:border-white/10 dark:from-grey-800 dark:to-grey-900 dark:ring-white/10">
                <div className="mb-4 flex items-center justify-between">
                  <span className="text-small font-bold text-grey-900">Live Chat</span>
                  <span className="inline-flex items-center gap-1 text-legal text-accent-green">
                    <span className="relative inline-flex size-1.5">
                      <span className="absolute inset-0 animate-ping rounded-full bg-accent-green opacity-60" />
                      <span className="relative inline-flex size-1.5 rounded-full bg-accent-green" />
                    </span>
                    Online
                  </span>
                </div>
                <ChatBubble side="left" text="👋 Hi! How can we help today?" />
                <div className="mt-3">
                  <ChatBubble side="right" text="What's your hours this weekend?" />
                </div>
                <div className="mt-4 rounded-xl border border-grey-200 bg-white p-3 dark:bg-grey-900/40 dark:border-white/10">
                  <p className="text-legal font-semibold text-grey-700">Continue on text?</p>
                  <input
                    type="tel"
                    placeholder="+1 (555) 555-5555"
                    className="mt-2 w-full rounded-lg border border-grey-200 bg-grey-50 px-3 py-2 text-small text-grey-900 outline-none transition-colors focus:border-alive5-orange dark:bg-grey-900 dark:text-white"
                  />
                  <button
                    type="button"
                    className="mt-2 w-full rounded-lg bg-alive5-orange py-2 text-small font-semibold text-white shadow-orange transition-transform hover:scale-[1.02]"
                  >
                    Continue via text →
                  </button>
                </div>
              </div>
            </div>
          </FadeUp>
        </div>
      </Section>

      {/* ============================================================
       * INDUSTRIES WE SERVE — 3 illustrated cards
       * ============================================================ */}
      <Section className="bg-gradient-to-b from-surface-page via-orange-50/40 to-surface-page dark:via-orange-950/15">
        <FadeUp className="mx-auto max-w-2xl text-center">
          <h2 className="text-h2 text-grey-900">
            Industries we{' '}
            <span className="text-alive5-orange">serve</span>
          </h2>
          <div className="mx-auto mt-4 h-1 w-16 rounded-full bg-alive5-orange" />
        </FadeUp>

        <Stagger className="mt-14 grid gap-8 md:grid-cols-3" stagger={0.12}>
          {[
            { title: 'Pro & College Sports', to: '/sports', src: '/business-sms/sports.png', alt: 'Football, soccer ball, and tennis ball illustration' },
            { title: 'Higher Education', to: '/sms-for-admissions-and-recruiting', src: '/business-sms/edu.png', alt: 'Globe, ruler, open book with star illustration' },
            { title: 'Government', to: '/gov', svg: 'gov' },
          ].map((ind) => (
            <motion.div
              key={ind.title}
              variants={staggerItem}
              whileHover={{ y: -6 }}
              className="group text-center"
            >
              <div className="mx-auto flex h-48 items-center justify-center">
                {ind.src ? (
                  <motion.img
                    src={ind.src}
                    alt={ind.alt}
                    loading="lazy"
                    animate={{ y: [0, -6, 0] }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: 'easeInOut',
                      delay: Math.random() * 0.8,
                    }}
                    className="max-h-44 w-auto drop-shadow-[0_8px_20px_rgba(31,31,32,0.12)]"
                  />
                ) : (
                  <GovIllustration />
                )}
              </div>
              <h3 className="mt-4 text-h4 font-bold text-grey-900">{ind.title}</h3>
              <Link
                to={ind.to}
                className="mt-3 inline-flex items-center gap-1 text-small font-semibold text-alive5-orange underline-offset-4 hover:underline"
              >
                Learn more
                <ArrowRight className="size-3 transition-transform group-hover:translate-x-1" />
              </Link>
            </motion.div>
          ))}
        </Stagger>
      </Section>

      {/* ============================================================
       * GET STARTED TODAY — 4 launch steps
       * ============================================================ */}
      <Section>
        <FadeUp className="mx-auto max-w-2xl text-center">
          <p className="text-legal font-semibold uppercase tracking-[0.18em] text-alive5-orange">
            Live in days
          </p>
          <h2 className="mt-3 text-h2 leading-[1.05] text-grey-900">
            Get started{' '}
            <span className="text-alive5-orange">today</span>
          </h2>
          <p className="mt-4 text-body-lg text-grey-700">
            Four simple steps from sign-up to your first text.
          </p>
        </FadeUp>

        <Stagger className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4" stagger={0.1}>
          {[
            { n: 1, title: 'Book a demo', body: 'Quick 30-min call — we map your use case and confirm number compatibility.' },
            { n: 2, title: 'Sign up', body: 'Pick a plan, port or keep your existing VoIP number. Setup takes minutes.' },
            { n: 3, title: '10DLC approval', body: "We handle the registration so you don't have to. Live in 24–72 hours." },
            { n: 4, title: 'Start texting', body: 'Invite your team, send your first broadcast, schedule reminders. Done.' },
          ].map((s) => (
            <motion.div
              key={s.n}
              variants={staggerItem}
              whileHover={{ y: -6 }}
              className="relative overflow-hidden rounded-3xl border border-grey-200 bg-white p-7 shadow-sm transition-shadow hover:shadow-md dark:bg-grey-800"
            >
              <span className="inline-flex size-10 items-center justify-center rounded-full bg-alive5-orange text-small font-bold text-white shadow-orange">
                {s.n}
              </span>
              <h3 className="mt-5 text-h4 text-grey-900">{s.title}</h3>
              <p className="mt-3 text-small text-grey-700">{s.body}</p>
            </motion.div>
          ))}
        </Stagger>
      </Section>

      {/* ============================================================
       * FAQ
       * ============================================================ */}
      <Section>
        <FadeUp className="mx-auto max-w-3xl text-center">
          <p className="text-legal font-semibold uppercase tracking-[0.18em] text-alive5-orange">
            Common questions
          </p>
          <h2 className="mt-3 text-h2 text-grey-900">
            Business SMS{' '}
            <span className="text-alive5-orange">FAQ</span>
          </h2>
          <p className="mt-4 text-body text-grey-700">
            Email us at{' '}
            <a
              href="mailto:sales@alive5.com"
              className="font-semibold text-alive5-orange hover:underline"
            >
              sales@alive5.com
            </a>{' '}
            if you have more questions.
          </p>
        </FadeUp>

        <div className="mx-auto mt-12 max-w-3xl space-y-3">
          {FAQ_ITEMS.map((item, i) => (
            <FAQRow key={item.q} item={item} delay={i * 0.05} />
          ))}
        </div>
      </Section>

      {/* ============================================================
       * FINAL CTA
       * ============================================================ */}
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
              <span className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/15 px-3.5 py-1.5 text-small font-semibold text-white backdrop-blur">
                <TrendingUp className="size-3.5" />
                Live in days
              </span>
              <h2 className="mx-auto mt-6 text-h2 text-white md:text-[3rem] md:leading-[1.05]">
                Ready to text-enable your business?
              </h2>
              <p className="mx-auto mt-5 max-w-xl text-body-lg text-white/90">
                Done-for-you 10DLC. Keep your phone number. Start at $5/month.
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
                  See plans & pricing
                </Link>
              </div>
            </Container>
          </div>
        </FadeUp>
      </Section>
    </>
  );
}

/* ====================================================================
 * Reusable building blocks
 * ================================================================== */

function FeatureRow({
  eyebrow,
  title,
  body,
  image,
  imageAlt,
  reversed,
  icon,
  backgroundClass = '',
}: {
  eyebrow: string;
  title: React.ReactNode;
  body: string;
  image: string;
  imageAlt: string;
  reversed?: boolean;
  icon?: React.ReactNode;
  backgroundClass?: string;
}) {
  return (
    <Section className={backgroundClass}>
      <div className={`grid items-center gap-12 lg:grid-cols-2 lg:gap-16 ${reversed ? '' : ''}`}>
        <FadeUp className={reversed ? 'order-1 lg:order-2' : ''}>
          {icon && (
            <span className="mb-5 inline-flex size-12 items-center justify-center rounded-xl bg-orange-100 text-alive5-orange">
              {icon}
            </span>
          )}
          <p className="text-legal font-semibold uppercase tracking-[0.18em] text-alive5-orange">
            {eyebrow}
          </p>
          <h2 className="mt-3 text-h2 leading-[1.05] text-grey-900">{title}</h2>
          <p className="mt-5 text-body-lg text-grey-700">{body}</p>
        </FadeUp>

        <FadeUp delay={0.1} className={reversed ? 'order-2 lg:order-1' : ''}>
          <div className="relative mx-auto w-full max-w-lg">
            <div className="pointer-events-none absolute -inset-4 -z-10 rounded-[3rem] bg-orange-200/40 blur-3xl dark:bg-orange-900/25" />
            <img
              src={image}
              alt={imageAlt}
              loading="lazy"
              className="w-full rounded-3xl shadow-xl ring-1 ring-grey-200 dark:ring-white/10"
            />
          </div>
        </FadeUp>
      </div>
    </Section>
  );
}


function FloatingSticker({
  className,
  delay,
  icon,
  label,
}: {
  className: string;
  delay: number;
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
      className={`absolute z-10 ${className}`}
    >
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 4 + delay, repeat: Infinity, ease: 'easeInOut', delay }}
        className="flex items-center gap-2 rounded-2xl border border-grey-200 bg-white px-3 py-2 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.25)] ring-1 ring-black/[0.03] backdrop-blur dark:border-white/10 dark:bg-grey-800"
      >
        <span className="inline-flex size-7 items-center justify-center rounded-lg bg-orange-100 dark:bg-orange-950/40">
          {icon}
        </span>
        <span className="text-legal font-bold text-grey-900">{label}</span>
      </motion.div>
    </motion.div>
  );
}

/**
 * Hand-drawn-style government illustration — matches the aesthetic of the
 * sports.png and edu.png imported assets (thick black outlines, orange/peach
 * fill, scattered dot + × decorations).
 */
function GovIllustration() {
  return (
    <motion.svg
      viewBox="0 0 200 200"
      className="max-h-44 w-auto drop-shadow-[0_8px_20px_rgba(31,31,32,0.12)]"
      animate={{ y: [0, -6, 0] }}
      transition={{ duration: 4.3, repeat: Infinity, ease: 'easeInOut' }}
    >
      {/* dot + cross decorations */}
      <g fill="#1f1f20">
        <circle cx="20" cy="40" r="1.5" />
        <circle cx="178" cy="20" r="1.5" />
        <circle cx="160" cy="170" r="1.5" />
        <circle cx="32" cy="170" r="1.5" />
      </g>
      <g stroke="#1f1f20" strokeWidth="2" strokeLinecap="round">
        <path d="M 175 60 l 6 0 M 178 57 l 0 6" />
        <path d="M 25 110 l 6 0 M 28 107 l 0 6" />
        <path d="M 190 130 l 4 0 M 192 128 l 0 4" />
      </g>

      {/* laptop base */}
      <path
        d="M 30 145 L 170 145 L 158 130 L 42 130 Z"
        fill="#FCD7C7"
        stroke="#1f1f20"
        strokeWidth="3.5"
        strokeLinejoin="round"
      />
      <ellipse cx="100" cy="138" rx="6" ry="2" fill="#1f1f20" />

      {/* laptop screen frame */}
      <rect
        x="42"
        y="50"
        width="116"
        height="82"
        rx="6"
        fill="#fff"
        stroke="#1f1f20"
        strokeWidth="3.5"
      />
      <rect x="50" y="58" width="100" height="66" rx="3" fill="#FFF1EA" />

      {/* bar chart bars (3 orange + peach) */}
      <rect x="60" y="100" width="14" height="22" fill="#eb5124" stroke="#1f1f20" strokeWidth="2" />
      <rect x="80" y="85" width="14" height="37" fill="#FCD7C7" stroke="#1f1f20" strokeWidth="2" />
      <rect x="100" y="75" width="14" height="47" fill="#eb5124" stroke="#1f1f20" strokeWidth="2" />
      <rect x="120" y="92" width="14" height="30" fill="#FCD7C7" stroke="#1f1f20" strokeWidth="2" />

      {/* growth arrow */}
      <path
        d="M 56 92 Q 90 70 130 56 L 122 56 M 130 56 L 130 64"
        stroke="#1f1f20"
        strokeWidth="3"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* right-side arrow indicating output */}
      <path
        d="M 158 80 Q 175 80 185 95 L 178 90 M 185 95 L 178 100"
        stroke="#1f1f20"
        strokeWidth="3"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </motion.svg>
  );
}

function ChatBubble({ side, text }: { side: 'left' | 'right'; text: string }) {
  return (
    <div className={`flex ${side === 'right' ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-small shadow-sm ${
          side === 'right'
            ? 'rounded-br-md bg-alive5-orange text-white'
            : 'rounded-bl-md bg-grey-100 text-grey-800 dark:bg-grey-900 dark:text-grey-200'
        }`}
      >
        {text}
      </div>
    </div>
  );
}

function FAQRow({ item, delay }: { item: { q: string; a: string }; delay: number }) {
  return (
    <motion.details
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ delay, duration: 0.3 }}
      className="group overflow-hidden rounded-2xl border border-grey-200 bg-white shadow-sm dark:bg-grey-800"
    >
      <summary className="flex cursor-pointer items-center justify-between gap-4 p-5 transition-colors hover:bg-grey-50 dark:hover:bg-grey-900/40">
        <span className="text-body font-semibold text-grey-900">{item.q}</span>
        <span className="inline-flex size-7 flex-none items-center justify-center rounded-full bg-orange-100 text-alive5-orange transition-transform group-open:rotate-180">
          <ArrowRight className="size-4 rotate-90" />
        </span>
      </summary>
      <p className="px-5 pb-5 text-body text-grey-700">{item.a}</p>
    </motion.details>
  );
}
