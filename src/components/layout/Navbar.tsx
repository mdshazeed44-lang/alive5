import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { ChevronDown, Menu, X } from 'lucide-react';
import { supportsScrollTimeline } from '@/lib/utils';
import { ThemeToggle } from './ThemeToggle';

const LOGO_COLOR =
  'https://lirp.cdn-website.com/519d3ac1/dms3rep/multi/opt/Alive5_Logo_RGB_2023-01-high-01-1920w.png';
const LOGO_WHITE = 'https://lirp.cdn-website.com/519d3ac1/dms3rep/multi/opt/Alive5_Logo_WHT_2023-1920w.png';

interface NavItem {
  label: string;
  to?: string;
  children?: { label: string; to: string }[];
}

const NAV: NavItem[] = [
  {
    label: 'Platform',
    children: [
      { label: 'Live chat', to: '/live-chat' },
      { label: 'Chatbots', to: '/chatbots' },
      { label: 'Business SMS', to: '/business-sms' },
      { label: 'Facebook Messenger', to: '/facebook-messenger' },
      { label: 'QR codes', to: '/qr-codes' },
      { label: 'CRM integration', to: '/crm' },
    ],
  },
  {
    label: 'Industries',
    children: [
      { label: 'Sports', to: '/sports' },
      { label: 'Government', to: '/gov' },
      { label: 'Higher education', to: '/sms-for-admissions-and-recruiting' },
      { label: 'Health & wellness', to: '/sms-for-health-and-wellness' },
      { label: 'Retail', to: '/retail' },
      { label: 'Tourism', to: '/tourism' },
    ],
  },
  {
    label: 'Resources',
    children: [
      { label: 'Blog', to: '/blog' },
      { label: 'Playbooks', to: '/playbooks' },
      { label: 'Case studies', to: '/case-studies' },
      { label: 'Product roadmap', to: '/roadmap' },
    ],
  },
  { label: 'Pricing', to: '/how-pricing-works' },
  { label: 'About', to: '/about-us' },
];

function Dropdown({ item }: { item: NavItem }) {
  return (
    <div className="group relative">
      <button className="nav-link flex items-center gap-1 py-2">
        {item.label}
        <ChevronDown className="size-3.5 transition-transform group-hover:rotate-180" />
      </button>
      <div className="invisible absolute left-1/2 top-full z-50 w-60 -translate-x-1/2 pt-3 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100">
        <div className="rounded-lg border border-grey-100 bg-white/95 p-2 shadow-lg backdrop-blur-md dark:border-white/10 dark:bg-grey-800/95">
          {item.children!.map((c) => (
            <Link
              key={c.to}
              to={c.to}
              className="block rounded px-3 py-2 text-small font-medium text-grey-700 transition-colors hover:bg-orange-50 hover:text-alive5-orange dark:text-grey-300 dark:hover:bg-white/5"
            >
              {c.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export function Navbar() {
  const [open, setOpen] = useState(false);
  const native = useRef(supportsScrollTimeline());

  // Framer fallback (only drives styles when native scroll-timeline is unsupported)
  const { scrollY } = useScroll();
  const maxWidth = useTransform(scrollY, [0, 320], ['100%', '920px']);
  const radius = useTransform(scrollY, [0, 64, 320], ['0px', '12px', '16px']);
  const bg = useTransform(
    scrollY,
    [0, 64, 320],
    ['rgba(255,255,255,0)', 'rgba(255,255,255,0.55)', 'rgba(255,255,255,0.7)'],
  );
  const blur = useTransform(scrollY, [0, 64], ['blur(0px)', 'blur(24px)']);
  const shadow = useTransform(
    scrollY,
    [0, 64, 320],
    ['0 0 0 0 rgba(72,72,74,0)', '0 4px 24px -8px rgba(72,72,74,0.18)', '0 8px 32px -10px rgba(72,72,74,0.22)'],
  );
  const loginOpacity = useTransform(scrollY, [0, 160], [1, 0]);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const fallbackStyle = native.current
    ? undefined
    : { maxWidth, borderRadius: radius, backgroundColor: bg, backdropFilter: blur, boxShadow: shadow };

  return (
    <header className="fixed inset-x-0 top-0 z-50 flex justify-center px-3 pt-3">
      <motion.div
        data-nav-morph={native.current ? '' : undefined}
        style={fallbackStyle}
        className="flex h-14 w-full max-w-8xl items-center justify-between gap-4 px-4 md:px-5"
      >
        <Link to="/" className="flex shrink-0 items-center" aria-label="Alive5 home">
          <img src={LOGO_COLOR} alt="Alive5" className="h-7 w-auto dark:hidden md:h-8" />
          <img src={LOGO_WHITE} alt="Alive5" className="hidden h-7 w-auto dark:block md:h-8" />
        </Link>

        <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary">
          {NAV.map((item) =>
            item.children ? (
              <Dropdown key={item.label} item={item} />
            ) : (
              <Link key={item.label} to={item.to!} className="nav-link py-2">
                {item.label}
              </Link>
            ),
          )}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle className="size-9" />
          <motion.a
            data-login-morph={native.current ? '' : undefined}
            style={native.current ? undefined : { opacity: loginOpacity }}
            href="https://app.alive5.com/login"
            className="btn-ghost hidden whitespace-nowrap !px-4 !py-2 md:inline-flex"
          >
            Login
          </motion.a>
          <Link to="/thank-you" className="btn-orange hidden whitespace-nowrap !px-5 !py-2.5 sm:inline-flex">
            Schedule a demo
          </Link>
          <button
            className="inline-flex size-10 items-center justify-center rounded text-grey-700 dark:text-grey-200 lg:hidden"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
          >
            <Menu className="size-6" />
          </button>
        </div>
      </motion.div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              className="fixed inset-0 z-40 bg-grey-900/40 backdrop-blur-sm lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
            />
            <motion.div
              className="fixed inset-y-0 right-0 z-50 flex w-[86%] max-w-sm flex-col gap-1 overflow-y-auto bg-white p-6 shadow-2xl dark:bg-grey-900 lg:hidden"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 280 }}
            >
              <div className="mb-4 flex items-center justify-between">
                <img src={LOGO_COLOR} alt="Alive5" className="h-7 w-auto dark:hidden" />
                <img src={LOGO_WHITE} alt="Alive5" className="hidden h-7 w-auto dark:block" />
                <div className="flex items-center gap-2">
                  <ThemeToggle className="size-9" />
                  <button
                    className="inline-flex size-10 items-center justify-center rounded text-grey-700 dark:text-grey-200"
                    onClick={() => setOpen(false)}
                    aria-label="Close menu"
                  >
                    <X className="size-6" />
                  </button>
                </div>
              </div>
              {NAV.map((item) => (
                <div key={item.label} className="border-b border-grey-100 py-2 dark:border-white/10">
                  {item.to ? (
                    <Link
                      to={item.to}
                      onClick={() => setOpen(false)}
                      className="block py-2 text-h4 text-grey-900 dark:text-white"
                    >
                      {item.label}
                    </Link>
                  ) : (
                    <>
                      <p className="py-2 text-small font-semibold uppercase tracking-wider text-grey-400">
                        {item.label}
                      </p>
                      {item.children!.map((c) => (
                        <Link
                          key={c.to}
                          to={c.to}
                          onClick={() => setOpen(false)}
                          className="block py-2 pl-3 text-body text-grey-700 dark:text-grey-300"
                        >
                          {c.label}
                        </Link>
                      ))}
                    </>
                  )}
                </div>
              ))}
              <div className="mt-4 flex flex-col gap-3">
                <a href="https://app.alive5.com/login" className="btn-ghost w-full">
                  Login
                </a>
                <Link to="/thank-you" onClick={() => setOpen(false)} className="btn-orange w-full">
                  Schedule a demo
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
