import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { ROUTES } from '@/data/routes';
import Home from '@/pages/Home';
import Placeholder from '@/pages/Placeholder';
import MarkdownPage from '@/components/content/MarkdownPage';
import LiveChat from '@/pages/products/LiveChat';

/** Routes with a hand-designed page component. Everything else renders MarkdownPage. */
const CUSTOM_PAGES: Record<string, () => JSX.Element> = {
  '/live-chat': LiveChat,
};

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, [pathname]);
  return null;
}

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.2 }}
      >
        <Routes location={location}>
          <Route path="/" element={<Home />} />
          {ROUTES.filter((r) => r.route !== '/').map((r) => {
            const Custom = CUSTOM_PAGES[r.route];
            return <Route key={r.route} path={r.route} element={Custom ? <Custom /> : <MarkdownPage />} />;
          })}
          <Route path="*" element={<Placeholder />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Navbar />
      <main>
        <AnimatedRoutes />
      </main>
      <Footer />
    </BrowserRouter>
  );
}
