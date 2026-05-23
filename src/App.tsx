import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { ROUTES } from '@/data/routes';
import Home from '@/pages/Home';
import Placeholder from '@/pages/Placeholder';
import MarkdownPage from '@/components/content/MarkdownPage';
import LiveChat from '@/pages/products/LiveChat';
import Pricing from '@/pages/Pricing';
import BusinessSms from '@/pages/BusinessSms';
import Sports from '@/pages/industries/Sports';
import HigherEd from '@/pages/industries/HigherEd';
import Government from '@/pages/industries/Government';
import About from '@/pages/About';

/** Routes with a hand-designed page component. Everything else renders MarkdownPage. */
const CUSTOM_PAGES: Record<string, () => JSX.Element> = {
  '/live-chat': LiveChat,
  '/pricing': Pricing,
  '/pricing-new.html': Pricing,
  '/business-sms': BusinessSms,
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

/**
 * Plain Routes — NO motion wrapper. Any wrapper that animates transform
 * (or that framer-motion auto-promotes via `will-change: transform`) would
 * become the containing block for descendants and break `position: sticky`
 * inside sections like SlidingDeck. We accept zero route-change animation
 * to keep sticky working reliably.
 */
function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      {/* explicit /pricing alias — pricing-new.html is the canonical crawled
        route but users expect /pricing too */}
      <Route path="/pricing" element={<Pricing />} />
      {ROUTES.filter((r) => r.route !== '/').map((r) => {
        const Custom = CUSTOM_PAGES[r.route];
        return <Route key={r.route} path={r.route} element={Custom ? <Custom /> : <MarkdownPage />} />;
      })}
      <Route path="*" element={<Placeholder />} />
    </Routes>
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
