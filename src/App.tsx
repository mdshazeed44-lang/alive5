import { Suspense, lazy, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { ROUTES } from '@/data/routes';

/**
 * All hand-built pages are code-split via React.lazy so the initial JS
 * bundle stays small. Routes that fall through to MarkdownPage / Placeholder
 * still need MarkdownPage eagerly available (it's small and shared), but
 * the marquee feature pages are dynamic-imported.
 */
const Home = lazy(() => import('@/pages/Home'));
const Pricing = lazy(() => import('@/pages/Pricing'));
const BusinessSms = lazy(() => import('@/pages/BusinessSms'));
const LiveChat = lazy(() => import('@/pages/products/LiveChat'));
const FacebookMessenger = lazy(() => import('@/pages/FacebookMessenger'));
const Crm = lazy(() => import('@/pages/Crm'));
const Sports = lazy(() => import('@/pages/industries/Sports'));
const HigherEd = lazy(() => import('@/pages/industries/HigherEd'));
const Government = lazy(() => import('@/pages/industries/Government'));
const About = lazy(() => import('@/pages/About'));
const MarkdownPage = lazy(() => import('@/components/content/MarkdownPage'));
const Placeholder = lazy(() => import('@/pages/Placeholder'));

/** Routes with a hand-designed page component. Everything else renders MarkdownPage. */
const CUSTOM_PAGES: Record<string, React.LazyExoticComponent<() => React.JSX.Element>> = {
  '/live-chat': LiveChat,
  '/pricing': Pricing,
  '/pricing-new.html': Pricing,
  '/business-sms': BusinessSms,
  '/facebook-messenger': FacebookMessenger,
  '/crm': Crm,
  '/sports': Sports,
  '/sms-for-admissions-and-recruiting': HigherEd,
  '/gov': Government,
  '/about-us': About,
};

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, [pathname]);
  return null;
}

/** Suspense fallback shown while a lazy chunk is loading. Lightweight
 *  enough to render without flicker even on slow connections. */
function PageSkeleton() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <div className="relative inline-flex size-12">
        <span className="absolute inset-0 animate-ping rounded-full bg-alive5-orange/40" />
        <span className="relative inline-flex size-12 items-center justify-center rounded-full bg-alive5-orange text-h4 font-bold text-white shadow-orange">
          5
        </span>
      </div>
    </div>
  );
}

function AppRoutes() {
  return (
    <Suspense fallback={<PageSkeleton />}>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* explicit /pricing alias — pricing-new.html is the canonical crawled
          route but users expect /pricing too */}
        <Route path="/pricing" element={<Pricing />} />
        {ROUTES.filter((r) => r.route !== '/').map((r) => {
          const Custom = CUSTOM_PAGES[r.route];
          return (
            <Route key={r.route} path={r.route} element={Custom ? <Custom /> : <MarkdownPage />} />
          );
        })}
        <Route path="*" element={<Placeholder />} />
      </Routes>
    </Suspense>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Navbar />
      <main>
        <AppRoutes />
      </main>
      <Footer />
    </BrowserRouter>
  );
}
